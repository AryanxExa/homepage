import { useEffect } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Container, Section, SectionHead } from "~/components/forge/section";
import { MoltenLink } from "~/components/forge/button";
import { CtaBand } from "~/components/forge/cta-band";
import { Faq } from "~/components/forge/accordion";
import { Reveal, Stagger } from "~/components/motion/primitives";
import { gates } from "~/config/gates";
import { track } from "~/lib/analytics";
import { pageMeta } from "~/lib/seo";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () =>
  pageMeta({
    title: "Pricing",
    description:
      "Three growth systems for UAE service businesses, with honest engagement terms. Every engagement starts with a free Growth Audit — the blueprint is yours to keep either way.",
    path: "/pricing",
  });

/* Anchor values are §19.3 founder input, gated (gates.pricingAnchors).
   Until they land, tiers show founding-terms framing — honest, not vague. */
const tiers: { name: string; promise: string; anchorAED: number | null; badge?: string; includes: string[] }[] = [
  {
    name: "FORGE STARTER",
    promise: "Stop the biggest leaks.",
    anchorAED: null,
    includes: ["Self-running bookings", "WhatsApp reminders & deposits", "The essentials, connected"],
  },
  {
    name: "FORGE GROWTH",
    promise: "The full operating system.",
    anchorAED: null,
    badge: "Most complete for single-location businesses",
    includes: ["Everything in Starter", "AI follow-up & qualification", "Client reactivation", "Review generation", "Numbers you can act on"],
  },
  {
    name: "FORGE SCALE",
    promise: "Multi-branch. Higher volume.",
    anchorAED: null,
    includes: ["The full system across locations", "Deeper operations work", "Custom automations", "Priority everything"],
  },
];

const pricingFaq = [
  {
    q: "Why don't I see numbers on this page yet?",
    a: "Because we're in our founding-partner phase: the first five businesses get founding terms agreed openly in the blueprint, and those terms set the public anchors. We'd rather show you a real price in the audit than a placeholder on a website.",
  },
  {
    q: "Setup fee, monthly fee, or both?",
    a: "Both, agreed in the blueprint before anything is built: a one-time setup for the forge phase, and a monthly fee for the operating. Nothing appears later.",
  },
  {
    q: "Is VAT included?",
    a: "Prices are quoted with VAT stated separately, the way UAE business expects. The blueprint shows the full number.",
  },
];

export default function Pricing() {
  useEffect(() => track({ name: "pricing_view" }), []);
  return (
    <>
      <Section className="pt-32 md:pt-40" labelledBy="prc-h1">
        <Container className="max-w-[760px]">
          <p className="overline text-slate">Pricing</p>
          <h1 id="prc-h1" className="mt-3 text-[36px] font-bold leading-[1.08] md:text-[48px]">
            An investment that pays for itself in filled chairs.
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-slate">
            Three systems. Honest terms. No "contact us for pricing" games — the audit tells you
            which tier fits and what it should return before you commit a dirham.
          </p>
        </Container>
      </Section>

      <Section labelledBy="prc-tiers" className="pt-0">
        <Container>
          <h2 id="prc-tiers" className="sr-only">The systems</h2>
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <div
                key={t.name}
                className={cn(
                  "flex h-full flex-col rounded-[16px] border border-mist bg-white p-6",
                  i === 1 ? "shadow-e2" : "shadow-e1",
                )}
              >
                <p className="overline text-slate">{t.name}</p>
                <p className="mt-2 text-[20px] font-semibold">{t.promise}</p>
                {t.badge && (
                  <p className="mt-2 self-start rounded-[8px] bg-mist px-2 py-1 text-[13px] text-ink">{t.badge}</p>
                )}
                <p className="mt-4 text-[24px] font-bold tabular text-copperdeep">
                  {gates.pricingAnchors && t.anchorAED
                    ? `From AED ${t.anchorAED.toLocaleString()}/month`
                    : "Founding-partner terms"}
                </p>
                <ul className="mt-4 flex flex-col gap-2 text-[15px] text-slate">
                  {t.includes.map((line) => (
                    <li key={line} className="border-t border-mist pt-2">{line}</li>
                  ))}
                </ul>
                <MoltenLink to="/growth-audit" placement={`pricing-${t.name.toLowerCase().replace(/\s/g, "-")}`} className="mt-6">
                  Start with the free audit
                </MoltenLink>
              </div>
            ))}
          </Stagger>
          <Reveal className="mt-12">
            <p className="max-w-[62ch] text-[18px] leading-relaxed">
              The month your system prevents its own price in no-shows, it's free.
              The <Link to="/#calculator" className="textlink font-medium">calculator</Link> already told you how close you are.
            </p>
            <p className="mt-4 max-w-[62ch] text-[17px] text-slate">
              Every engagement starts with the free audit. If the audit says you don't need us yet —
              we'll tell you that, and you'll keep the blueprint anyway.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section labelledBy="prc-faq">
        <Container className="max-w-[760px]">
          <Reveal><SectionHead headline="Pricing questions." id="prc-faq" /></Reveal>
          <div className="mt-10"><Faq items={pricingFaq} /></div>
        </Container>
      </Section>

      <CtaBand placement="pricing" />
    </>
  );
}
