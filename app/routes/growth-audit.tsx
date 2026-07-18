import type { MetaFunction } from "react-router";
import { Container, Section } from "~/components/forge/section";
import { PromiseChip, WhatsAppLink } from "~/components/forge/button";
import { AuditForm } from "~/components/forge/audit-form";
import { Faq } from "~/components/forge/accordion";
import { pageMeta } from "~/lib/seo";
import { waPrefills } from "~/lib/wa";

export const meta: MetaFunction = () =>
  pageMeta({
    title: "Book a Free Growth Audit",
    description:
      "Thirty minutes. We map your business, show you exactly where revenue is leaking, and hand you the blueprint — whether you work with us or not.",
    path: "/growth-audit",
  });

/* The conversion hub (IA §5.8): most conservative layout on the site —
   single centered column, dual rail with equal weight, nothing animated
   but field feedback. Sticky bar suppressed here (it checks the path). */

const miniFaq = [
  { q: "How long does the audit take?", a: "Thirty minutes, on WhatsApp or a call — your pick. The blueprint follows within 48 hours." },
  { q: "What should I prepare?", a: "Nothing formal. A rough sense of your weekly bookings, your no-show feel, and the tools you currently use is plenty." },
  { q: "What does it cost?", a: "Nothing. And the blueprint is yours to keep whether we work together or not — that's the point of it." },
];

export default function GrowthAudit() {
  return (
    <>
      <Section className="pt-32 md:pt-40" labelledBy="ga-h1">
        <Container className="max-w-[640px]">
          <p className="overline text-slate">Free Growth Audit</p>
          <h1 id="ga-h1" className="mt-3 text-[36px] font-bold leading-[1.08] md:text-[44px]">
            See where your growth is leaking — free.
          </h1>
          <p className="mt-5 text-[18px] leading-relaxed text-slate">
            We map your business, show you exactly where revenue is slipping, and hand you the
            blueprint — whether you work with us or not.
          </p>
          <PromiseChip className="mt-5" />

          {/* Dual rail — equal weight ("which door", not "main door + fallback"). */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-[16px] border border-mist bg-white p-6 shadow-e1">
              <h2 className="text-[20px] font-semibold">Fastest: WhatsApp</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate">
                One message starts it. A person replies — within fifteen minutes, 9am–9pm — and the
                audit gets scheduled in the chat.
              </p>
              <WhatsAppLink prefill={waPrefills.general} placement="audit-rail" className="mt-5">
                WhatsApp us now
              </WhatsAppLink>
            </div>
            <div className="rounded-[16px] border border-mist bg-white p-6 shadow-e1">
              <h2 className="text-[20px] font-semibold">Or book it here</h2>
              <p className="mt-2 mb-5 text-[15px] leading-relaxed text-slate">
                Four fields. We confirm your slot on WhatsApp.
              </p>
              <AuditForm />
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-[20px] font-semibold">What happens next</h2>
            <ol className="mt-4 space-y-3">
              {[
                "We reply within 15 minutes (9am–9pm GST) and agree a time.",
                "The audit: thirty minutes on your numbers, tools and leaks.",
                "Your blueprint arrives within 48 hours — yours to keep, either way.",
              ].map((s, i) => (
                <li key={i} className="flex gap-3 text-[17px]">
                  <span className="overline mt-1 text-copperdeep">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12 rounded-[16px] border border-mist bg-white p-6">
            <p className="overline text-slate">What this is not</p>
            <p className="mt-3 text-[17px] leading-relaxed">
              Not a sales pitch. The audit ends with your leak map and blueprint, not a contract.
              If the numbers say you don't need a system yet, that's what we'll tell you.
            </p>
          </div>

          <div className="mt-12"><Faq items={miniFaq} /></div>
        </Container>
      </Section>
    </>
  );
}
