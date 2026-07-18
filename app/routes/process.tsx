import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Container, Section, SectionHead } from "~/components/forge/section";
import { CtaBand } from "~/components/forge/cta-band";
import { Faq } from "~/components/forge/accordion";
import { Reveal } from "~/components/motion/primitives";
import { processSteps } from "~/content/home";
import { pageMeta } from "~/lib/seo";

export const meta: MetaFunction = () =>
  pageMeta({
    title: "How We Work",
    description:
      "Audit → Blueprint → Forge → Launch → Optimise: how a YanForge engagement runs, what you do, what we do, and why nothing disrupts your business on the way.",
    path: "/process",
  });

const detail = [
  { who: "You give us thirty minutes and honest numbers. We give you the leak map and the blueprint — yours to keep either way." },
  { who: "You review it with anyone you like. We put every cost and every expected return on the same page." },
  { who: "You run your business as normal. We build and connect, quietly, in a sandbox next to your live operation." },
  { who: "Your team gets a short, human walkthrough. The system switches on in phases — reminders first, then booking, then the rest." },
  { who: "You see a monthly review in plain numbers. We tune what the data says to tune, and retire what isn't earning." },
];

const processFaq = [
  {
    q: "How much of my time does this actually take?",
    a: "The audit is thirty minutes. The blueprint review is about an hour. After that, your involvement is a monthly review — the operating is our job.",
  },
  {
    q: "What if my staff resist it?",
    a: "They usually resist tools that add work. This removes work — the reminders they chase, the DMs they juggle. The walkthrough is short, and the phased launch means nobody's routine changes overnight.",
  },
  {
    q: "What does the engagement look like contractually?",
    a: "Phased, with the terms agreed in the blueprint before anything is built. You're never locked into a promise we haven't kept yet.",
  },
];

export default function Process() {
  return (
    <>
      <Section className="pt-32 md:pt-40" labelledBy="pr-h1">
        <Container className="max-w-[760px]">
          <p className="overline text-slate">How we work</p>
          <h1 id="pr-h1" className="mt-3 text-[36px] font-bold leading-[1.08] md:text-[48px]">
            A clear path from chaos to system.
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-slate">
            Five steps. No big bang. Your business keeps running the whole way through —
            the system arrives around it, not on top of it.
          </p>
        </Container>
      </Section>

      <Section labelledBy="pr-steps" className="pt-0">
        <Container className="max-w-[880px]">
          <h2 id="pr-steps" className="sr-only">The five steps</h2>
          <ol className="space-y-0">
            {processSteps.map((s, i) => (
              <Reveal key={s.n}>
                <li className="grid gap-4 border-l-2 border-copper py-8 pl-6 md:grid-cols-[140px_1fr] md:gap-8">
                  <p className="overline text-copperdeep">{s.n} · {s.label}</p>
                  <div>
                    <p className="text-[18px] font-medium leading-relaxed">{s.text}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate">{detail[i].who}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section labelledBy="pr-audit">
        <Container className="max-w-[68ch]">
          <Reveal>
            <SectionHead
              headline="What the audit itself looks like."
              lead="Thirty minutes, on WhatsApp or a call. We ask about your bookings, your no-shows, your tools and your team. You get the leak map and the blueprint within 48 hours — whether you work with us or not."
              id="pr-audit"
            />
            <p className="mt-6 text-[17px] text-slate">
              Wondering what it costs after that?{" "}
              <Link to="/pricing" className="textlink font-medium">The engagement terms, honestly →</Link>
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section labelledBy="pr-faq">
        <Container className="max-w-[760px]">
          <Reveal><SectionHead headline="Process questions." id="pr-faq" /></Reveal>
          <div className="mt-10"><Faq items={processFaq} /></div>
        </Container>
      </Section>

      <CtaBand placement="process" />
    </>
  );
}
