import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Container, Section, SectionHead } from "~/components/forge/section";
import { SystemMap, systemModules } from "~/components/forge/system-map";
import { CtaBand } from "~/components/forge/cta-band";
import { Faq } from "~/components/forge/accordion";
import { Reveal } from "~/components/motion/primitives";
import { JsonLd, pageMeta, serviceJsonLd } from "~/lib/seo";

export const meta: MetaFunction = () =>
  pageMeta({
    title: "The System",
    description:
      "How YanForge connects website, booking, CRM, AI and WhatsApp into one growth operating system for UAE service businesses — what each module does, and what it keeps.",
    path: "/system",
  });

const integrations = ["Fresha", "Zenoti", "Google Calendar", "Instagram", "WhatsApp Business", "Stripe", "Tabby", "Telr"];

const systemFaq = [
  {
    q: "Do you replace our existing tools or connect to them?",
    a: "Connect first, replace only what leaks. The audit maps your current tools; the blueprint marks each one keep, connect, or replace — with the reason in plain language.",
  },
  {
    q: "Is there downtime when the system goes live?",
    a: "No. The system runs in parallel with your current process and switches over in phases. Your calendar never goes dark.",
  },
  {
    q: "Who maintains it after launch?",
    a: "We do — that's the operated part. You see the results in a monthly review; your team runs the business, not the software.",
  },
];

export default function System() {
  return (
    <>
      <JsonLd data={serviceJsonLd("Growth operating system for service businesses", "One connected system: website, booking, CRM, AI, WhatsApp automation, analytics and operations — engineered and operated by YanForge.", "/system")} />
      <Section className="pt-32 md:pt-40" labelledBy="sys-h1">
        <Container className="max-w-[760px]">
          <p className="overline text-slate">The system</p>
          <h1 id="sys-h1" className="mt-3 text-[36px] font-bold leading-[1.08] md:text-[48px]">
            One machine. Seven modules. Zero gaps between them.
          </h1>
          {/* AEO answer block (AI §4.2). */}
          <p className="mt-6 text-[18px] leading-relaxed text-slate md:text-[20px]">
            YanForge connects a service business's website, booking, client records, AI replies,
            WhatsApp automation, analytics and daily operations into one system — so every enquiry
            is answered in seconds, every appointment is protected, and every dirham is tracked.
            We build it, connect it to what you already use, and run it with you.
          </p>
        </Container>
      </Section>

      <Section labelledBy="sys-principle">
        <Container className="max-w-[68ch]">
          <Reveal>
            <SectionHead headline="Why connection beats collection." id="sys-principle" />
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed">
              <p>
                Most businesses don't lack tools. They own a booking app, a spreadsheet, a WhatsApp
                number, an Instagram inbox — a collection. The revenue leaks live in the gaps
                <em> between</em> them: the enquiry that never became a booking, the cancellation
                that never reached the waitlist, the regular nobody noticed drifting away.
              </p>
              <p>
                A system closes the gaps. When the pieces talk to each other, the follow-up happens
                because it's wired to happen — not because somebody remembered.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section band="engine" labelledBy="sys-modules">
        <Container>
          <Reveal><SectionHead headline="What's inside." id="sys-modules" /></Reveal>
          <div className="mt-12"><SystemMap /></div>
          <ul className="mt-16 grid gap-x-8 gap-y-6 md:grid-cols-2">
            {systemModules.map((m) => (
              <li key={m.id} className="border-t border-steel pt-4">
                <p className="overline text-teal">{m.label}</p>
                <p className="mt-2 text-[17px] text-canvas">{m.line}</p>
                <p className="mt-1 text-[15px] text-invsec">Outcome: {m.outcome}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="sys-integrations">
        <Container>
          <Reveal>
            <SectionHead
              headline="We connect what you have."
              lead="If a tool is working, it stays. The system is the layer that makes your tools act like one."
              id="sys-integrations"
            />
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-3">
            {integrations.map((name) => (
              <li key={name} className="rounded-[8px] border border-mist px-4 py-2 text-[15px] text-slate">{name}</li>
            ))}
          </ul>
          <p className="mt-10 text-[17px] text-slate">
            Curious what an engagement looks like week by week?{" "}
            <Link to="/process" className="textlink font-medium">See how we work →</Link>
          </p>
        </Container>
      </Section>

      <Section labelledBy="sys-faq">
        <Container className="max-w-[760px]">
          <Reveal><SectionHead headline="System questions." id="sys-faq" /></Reveal>
          <div className="mt-10"><Faq items={systemFaq} /></div>
        </Container>
      </Section>

      <CtaBand placement="system" />
    </>
  );
}
