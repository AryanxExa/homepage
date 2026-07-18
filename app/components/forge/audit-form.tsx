import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { track } from "~/lib/analytics";
import { waHref, waPrefills } from "~/lib/wa";
import { cn } from "~/lib/utils";

/* IA §5.8: 4 fields max, owner vocabulary, validate on blur then re-validate
   on input (MI §2.4). Submission composes a structured WhatsApp handoff —
   the production conversion rail until a backend endpoint exists (EA note). */

const schema = z.object({
  name: z.string().min(2, "Your name helps us say hello properly."),
  businessType: z.enum(["Salon", "Med spa / clinic", "Dental clinic", "Gym / studio", "Other service business"], {
    errorMap: () => ({ message: "Pick the closest fit — the audit adapts." }),
  }),
  area: z.string().min(2, "Which area is the business in?"),
  whatsapp: z
    .string()
    .regex(/^[+0-9][0-9\s-]{7,15}$/, "A WhatsApp number we can reply to, e.g. 050 123 4567."),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  "h-[52px] w-full rounded-[8px] border border-mist bg-white px-4 text-[17px] focus:border-copperdeep";

export function AuditForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onTouched", reValidateMode: "onChange" });

  const onSubmit = (values: FormValues) => {
    track({ name: "audit_form_submit" });
    const wa = waHref(waPrefills.audit(values));
    if (wa) window.open(wa, "_blank", "noopener");
    void navigate("/growth-audit/booked", { state: values });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={() => track({ name: "audit_form_start" })}
      noValidate
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor="af-name" className="mb-1 block text-[14px] font-medium">Your name</label>
        <input id="af-name" autoComplete="name" className={inputCls} {...register("name")} />
        {errors.name && <p role="alert" className="mt-1 text-[14px] text-[#c22f35]">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="af-type" className="mb-1 block text-[14px] font-medium">Business type</label>
        {/* Native select, all breakpoints (DS §8.12). */}
        <select id="af-type" className={cn(inputCls, "appearance-auto")} defaultValue="" {...register("businessType")}>
          <option value="" disabled>Choose…</option>
          <option>Salon</option>
          <option>Med spa / clinic</option>
          <option>Dental clinic</option>
          <option>Gym / studio</option>
          <option>Other service business</option>
        </select>
        {errors.businessType && <p role="alert" className="mt-1 text-[14px] text-[#c22f35]">{errors.businessType.message}</p>}
      </div>
      <div>
        <label htmlFor="af-area" className="mb-1 block text-[14px] font-medium">Area</label>
        <input id="af-area" autoComplete="address-level2" placeholder="e.g. Jumeirah, Dubai" className={inputCls} {...register("area")} />
        {errors.area && <p role="alert" className="mt-1 text-[14px] text-[#c22f35]">{errors.area.message}</p>}
      </div>
      <div>
        <label htmlFor="af-wa" className="mb-1 block text-[14px] font-medium">WhatsApp number</label>
        <input id="af-wa" type="tel" autoComplete="tel" inputMode="tel" placeholder="050 123 4567" className={inputCls} {...register("whatsapp")} />
        {errors.whatsapp && <p role="alert" className="mt-1 text-[14px] text-[#c22f35]">{errors.whatsapp.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-molten mt-2 inline-flex min-h-[52px] items-center justify-center rounded-[12px] px-6 text-[17px] font-semibold text-ink"
      >
        Book my free Growth Audit
      </button>
      <p className="text-[13px] text-slate">
        By sending this you agree to our privacy policy. We'll never spam your WhatsApp — we hate that more than you do.
      </p>
    </form>
  );
}
