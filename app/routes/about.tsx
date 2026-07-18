import type { MetaFunction } from "react-router";
import { Container, Section, SectionHead } from "~/components/forge/section";
import { CtaBand } from "~/components/forge/cta-band";
import { Reveal } from "~/components/motion/primitives";
import { site } from "~/config/site";
import { honesty } from "~/content/home";
import { pageMeta } from "~/lib/seo";
import { waPrefills } from "~/lib/wa";

export const meta: MetaFunction = () =>
  pageMeta({
    title: "About",
    description:
      "Why YanForge exists: UAE service businesses losing bookings to response time, not quality. Who we are, how we work, and why we only take five founding partners.",
    path: "/about",
  });

export default function About() {
  return (
    <>
      <Section className="pt-32 md:pt-40" labelledBy="ab-h1">
        <Container className="max-w-[760px]">
          <p className="overline text-slate">About</p>
          <h1 id="ab-h1" className="mt-3 text-[36px] font-bold leading-[1.08] md:text-[48px]">
            Built by people who understand UAE service businesses.
          </h1>
          {/* Facts block (AI §4.3) — machine-quotable identity, mirrored in schema. */}
          <p className="mt-6 text-[18px] leading-relaxed text-slate">{site.description}</p>
        </Container>
      </Section>

      <Section labelledBy="ab-story" className="pt-0">
        <Container className="max-w-[68ch]">
          <Reveal>
            <SectionHead headline="The pattern we couldn't unsee." id="ab-story" />
            <div className="mt-6 space-y-4 text-[18px] leading-relaxed">
              <p>
                The best operators in this country lose bookings to average ones — not on quality,
                on response time. The salon with the better colourist goes quiet at 9pm; the average
                one across the road answers in eight seconds, because a system does it.
              </p>
              <p>
                YanForge exists to put that system on the side of the businesses that deserve it.
                Not another website, not another ad budget — the connected machine underneath:
                booking, follow-up, reactivation, numbers.
              </p>
              <p>
                We're based in {site.city}. We answer our own WhatsApp. And we measure our work in
                your revenue, not our deliverables.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section labelledBy="ab-how">
        <Container className="max-w-[880px]">
          <Reveal><SectionHead headline="How we work." id="ab-how" /></Reveal>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { t: "Engineer-operated", d: "The people who build your system are the people who run it. No account-manager relay." },
              { t: "Measured in revenue", d: "Monthly reviews in bookings and dirhams — the numbers you'd check anyway." },
              { t: "Candid", d: "If the audit says you don't need us, we say so. The blueprint is yours regardless." },
            ].map((x) => (
              <li key={x.t} className="rounded-[16px] border border-mist bg-white p-6 shadow-e1">
                <h3 className="text-[18px] font-semibold">{x.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{x.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="ab-founding" id="founding-partners">
        <Container className="max-w-[68ch]">
          <Reveal>
            <p className="overline text-slate">{honesty.overline}</p>
            <h2 id="ab-founding" className="mt-3 text-[28px] font-semibold leading-tight md:text-[36px]">{honesty.h3}</h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed">
              {honesty.body.map((p, i) => <p key={i}>{p}</p>)}
              <ul className="ml-5 list-disc space-y-2 text-slate">
                {honesty.gets.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
              <p>{honesty.ask}</p>
              <p className="font-medium">{honesty.close}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        placement="about"
        headline="Talk to a person, not a pipeline."
        sub="Message us on WhatsApp — a founder replies, within fifteen minutes during working hours. Or book the audit directly."
        waPrefill={waPrefills.general}
      />
    </>
  );
}
