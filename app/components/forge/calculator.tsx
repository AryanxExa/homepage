import { useMemo, useRef, useState } from "react";
import { CountUp } from "~/components/motion/primitives";
import { WhatsAppLink } from "~/components/forge/button";
import { track } from "~/lib/analytics";
import { waPrefills } from "~/lib/wa";

/* The leak calculator (copy deck §3b): the visitor's own numbers, counted
   up in AED. Recompute debounced by settled input (MI §2.4). */

function Field({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  suffix?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[14px] font-medium text-ink">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={Number.isNaN(value) ? "" : value}
          onChange={(e) => onChange(e.target.valueAsNumber)}
          className="h-[52px] w-full rounded-[8px] border border-mist bg-white px-4 text-[17px] tabular focus:border-copperdeep"
        />
        {suffix && <span className="shrink-0 text-[14px] text-slate">{suffix}</span>}
      </div>
    </div>
  );
}

export function Calculator({
  defaults = { bookings: 80, noShowPerTen: 2, ticket: 250 },
}: {
  defaults?: { bookings: number; noShowPerTen: number; ticket: number };
}) {
  const [bookings, setBookings] = useState(defaults.bookings);
  const [noShow, setNoShow] = useState(defaults.noShowPerTen);
  const [ticket, setTicket] = useState(defaults.ticket);
  const startedRef = useRef(false);

  const monthly = useMemo(() => {
    const valid = [bookings, noShow, ticket].every((n) => Number.isFinite(n) && n >= 0);
    if (!valid) return null;
    return Math.round(bookings * (Math.min(noShow, 10) / 10) * ticket * 4.33);
  }, [bookings, noShow, ticket]);

  const onFirstTouch = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track({ name: "calculator_start" });
    }
  };

  return (
    <div
      id="calculator"
      onFocusCapture={onFirstTouch}
      className="rounded-[16px] border border-mist bg-white p-6 shadow-e1 md:p-8"
    >
      <p className="overline text-slate">The leak, in numbers</p>
      <h3 className="mt-2 text-[24px] font-semibold leading-tight">
        What are no-shows costing you — in dirhams?
      </h3>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Field label="Bookings per week" value={bookings} onChange={setBookings} min={0} max={2000} />
          <Field label="No-shows out of every 10 bookings" value={noShow} onChange={setNoShow} min={0} max={10} />
          <Field label="Average ticket" value={ticket} onChange={setTicket} min={0} max={100000} suffix="AED" />
        </div>
        <div className="flex flex-col justify-center rounded-[12px] bg-canvas p-6">
          {monthly === null ? (
            <p className="text-[17px] text-slate">Three numbers. Ten seconds. Worth knowing.</p>
          ) : (
            <>
              <p className="text-[15px] text-slate">You're losing about</p>
              <p className="mt-1 text-[36px] font-bold leading-none text-copperdeep md:text-[44px]">
                <CountUp value={monthly} key={monthly} />
              </p>
              <p className="mt-1 text-[15px] text-slate">a month to no-shows alone.</p>
              <p className="mt-3 text-[14px] text-slate">
                That's before we count the enquiries nobody answered.
              </p>
              <WhatsAppLink
                prefill={waPrefills.calculator}
                placement="calculator"
                className="mt-5"
              >
                Send my leak report on WhatsApp
              </WhatsAppLink>
              <p className="mt-2 text-[13px] text-slate">
                The full math, plus the three fixes that recover the most. Free, on WhatsApp, no forms.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
