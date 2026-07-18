import { useEffect } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Container, Section } from "~/components/forge/section";
import { WhatsAppLink } from "~/components/forge/button";
import { Check } from "~/components/forge/icons";
import { track } from "~/lib/analytics";
import { pageMeta } from "~/lib/seo";
import { waPrefills } from "~/lib/wa";

export const meta: MetaFunction = () => [
  ...pageMeta({ title: "Request Received", path: "/growth-audit/booked" }),
  { name: "robots", content: "noindex" },
];

/* IA §5.8: the confirmation flow IS a product demo — instant confirmation,
   clear next steps, under two viewports. Conversion pixel page. */
export default function Booked() {
  useEffect(() => track({ name: "booked_page_view" }), []);
  return (
    <Section className="pt-32 md:pt-40" labelledBy="bk-h1">
      <Container className="max-w-[560px]">
        <p className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-molten text-ink">
          <Check size={28} />
        </p>
        <h1 id="bk-h1" className="mt-6 text-[32px] font-bold leading-tight md:text-[40px]">
          Done. Your audit request is in.
        </h1>
        <p className="mt-4 text-[18px] leading-relaxed text-slate">
          A person — not a pipeline — replies within fifteen minutes during working hours
          (9am–9pm GST) to confirm your slot on WhatsApp.
        </p>

        <div className="mt-8">
          <h2 className="text-[18px] font-semibold">While you wait</h2>
          <ul className="mt-3 space-y-2 text-[17px]">
            <li><Link className="textlink" to="/#demo">Watch the system book a client →</Link></li>
            <li><Link className="textlink" to="/system">See what's inside the system →</Link></li>
            <li><Link className="textlink" to="/process">What happens after the audit →</Link></li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-[18px] font-semibold">Three things to have handy</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-[17px] text-slate">
            <li>A rough sense of your weekly bookings and no-shows</li>
            <li>The tools you currently use (booking, WhatsApp, payments)</li>
            <li>The one thing that annoys you most about your current setup</li>
          </ol>
        </div>

        <WhatsAppLink prefill={waPrefills.general} placement="booked" className="mt-10">
          Open our WhatsApp thread
        </WhatsAppLink>
      </Container>
    </Section>
  );
}
