import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Container, Section, SectionHead } from "~/components/forge/section";
import { GhostLink, MoltenLink, PromiseChip, WhatsAppLink } from "~/components/forge/button";
import { ThreadPlayer } from "~/components/forge/thread-player";
import { Calculator } from "~/components/forge/calculator";
import { SystemMap } from "~/components/forge/system-map";
import { Faq } from "~/components/forge/accordion";
import { CtaBand } from "~/components/forge/cta-band";
import { ArrowRight } from "~/components/forge/icons";
import { Reveal, Stagger } from "~/components/motion/primitives";
import { faq, hero, honesty, journey, pillars, problem, processSteps } from "~/content/home";
import { verticalList } from "~/config/verticals";
import { faqJsonLd, JsonLd, pageMeta } from "~/lib/seo";
import { waPrefills } from "~/lib/wa";

export const meta: MetaFunction = () => pageMeta({ path: "/" });

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />

      {/* §H1 Hero — light, product demo as the visual (PD §H1). */}
      <Section className="pt-32 md:pt-40 lg:pt-44" labelledBy="hero-h1">
        <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="overline text-slate">{hero.overline}</p>
            <h1 id="hero-h1" className="mt-3 text-[40px] font-bold leading-[1.05] tracking-[-0.01em] md:text-[56px] lg:text-[72px]">
              {hero.h1}
            </h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-relaxed text-slate md:text-[20px]">{hero.sub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink prefill={waPrefills.general} placement="hero">
                WhatsApp us — free Growth Audit
              </WhatsAppLink>
              <MoltenLink to="/growth-audit" placement="hero">Get my free Growth Audit</MoltenLink>
            </div>
            <a href="#demo" className="textlink mt-4 inline-block text-[15px] font-medium">See it run ↓</a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PromiseChip />
              {hero.chips.map((c) => (
                <span key={c} className="rounded-full border border-mist px-4 py-2 text-[14px] text-slate">{c}</span>
              ))}
            </div>
          </div>
          <div className="justify-self-center lg:justify-self-end">
            <ThreadPlayer auto placement="hero" caption={hero.caption} />
          </div>
        </Container>
      </Section>

      {/* §H2 Problem + calculator. Story runs as pure type (PD §H2). */}
      <Section labelledBy="problem-h2">
        <Container>
          <Reveal>
            <SectionHead headline={problem.h2} id="problem-h2" />
            <div className="mt-8 max-w-[62ch] space-y-4 text-[18px] leading-relaxed md:text-[20px]">
              {problem.story.map((line, i) => (
                <p key={i} className={i === problem.story.length - 1 ? "font-semibold" : undefined}>{line}</p>
              ))}
            </div>
            <p className="mt-8 max-w-[68ch] text-[17px] text-slate">{problem.leadIn}</p>
          </Reveal>
          <ul className="mt-6 max-w-[760px] divide-y divide-mist border-y border-mist">
            {problem.leaks.map((leak, i) => (
              <li key={i} className="py-4 text-[17px] leading-relaxed">{leak}</li>
            ))}
          </ul>
          <p className="mt-8 max-w-[68ch] text-[18px] font-medium md:text-[20px]">{problem.close}</p>
          <div className="mt-12 lg:mx-auto lg:max-w-[880px]">
            <Reveal><Calculator /></Reveal>
          </div>
        </Container>
      </Section>

      {/* §H3 The System — THE dark band (PD §H3): shift → modules → journey. */}
      <Section band="engine" labelledBy="system-h2" id="system-map" className="lg:py-40">
        <Container>
          <Reveal className="mx-auto max-w-[640px] text-center">
            <SectionHead
              center
              overline="From scattered tools to one system"
              headline="One connected system that runs your growth."
              lead="We connect what you have, replace what's broken, and run it with you."
              id="system-h2"
            />
          </Reveal>
          <div className="mt-16"><SystemMap /></div>
          <p className="mt-6 max-w-[62ch] text-[14px] text-invsec">
            Already using Fresha, Zenoti, or a calendar that works? We connect it. You don't throw away
            what's working — that's the point of a system.
          </p>
          <div className="mt-20">
            <h3 className="text-[24px] font-semibold">{journey.h3}</h3>
            <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {journey.steps.map((s) => (
                <li key={s.label} className="border-t border-steel pt-4">
                  <p className="overline text-teal">{s.label}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-invsec">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-12">
            <Link to="/system" className="textlink text-[15px] font-medium">
              See the full system, module by module →
            </Link>
          </div>
        </Container>
      </Section>

      {/* §H4 Proof — demo + the candor letter (not a card, PD §H4). */}
      <Section id="demo" labelledBy="proof-h2">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          <Reveal>
            <SectionHead headline="Don't take our word for it. Watch it work." id="proof-h2" />
            <p className="mt-6 max-w-[52ch] text-[17px] text-slate">
              This is the exact flow your clients would experience — enquiry to booked to reminded —
              running in real time. Thirty seconds.
            </p>
            <div className="mt-8"><ThreadPlayer placement="proof" /></div>
          </Reveal>
          <Reveal className="border-t border-mist pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="overline text-slate">{honesty.overline}</p>
            <h3 className="mt-3 text-[24px] font-semibold leading-snug">{honesty.h3}</h3>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed">
              {honesty.body.map((p, i) => <p key={i}>{p}</p>)}
              <p className="font-medium">Founding partners get:</p>
              <ul className="ml-5 list-disc space-y-2 text-slate">
                {honesty.gets.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
              <p>{honesty.ask}</p>
              <p className="font-medium">{honesty.close}</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* §H5 Industries — five tiles, no carousel (PD §H5). */}
      <Section labelledBy="industries-h2">
        <Container>
          <Reveal><SectionHead headline="Engineered for your kind of business." id="industries-h2" /></Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {verticalList.map((v) => (
              <Link
                key={v.slug}
                to={`/industries/${v.slug}`}
                className="group flex h-full flex-col rounded-[16px] border border-mist bg-white p-6 shadow-e1 transition-[transform,box-shadow] duration-[120ms] hover:-translate-y-0.5 hover:shadow-e2"
              >
                <p className="overline text-slate">{v.name}</p>
                <p className="mt-3 text-[20px] font-semibold leading-snug">{v.tileHeadline}</p>
                <p className="mt-3 text-[15px] text-slate">{v.tileLine}</p>
                <span className="mt-auto flex items-center gap-1 pt-5 text-[15px] font-medium text-copperdeep">
                  How it works <ArrowRight className="transition-transform duration-[120ms] group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </Stagger>
          <p className="mt-8 text-[17px] text-slate">
            Don't see your business? If you take bookings and hate empty slots, we should talk.{" "}
            <Link to="/growth-audit" className="textlink font-medium">Message us →</Link>
          </p>
        </Container>
      </Section>

      {/* §H6 Why + process (merged, PD §H6). */}
      <Section labelledBy="why-h2">
        <Container>
          <Reveal><SectionHead headline="Not another agency. A growth engineer." id="why-h2" /></Reveal>
          <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-[16px] border border-mist bg-white p-6 shadow-e1">
                <h3 className="text-[20px] font-semibold">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{p.text}</p>
              </div>
            ))}
          </Stagger>
          <h3 className="mt-20 text-[24px] font-semibold">A clear path from chaos to system.</h3>
          <ol className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((s) => (
              <li key={s.n} className="border-t-2 border-copper pt-4">
                <p className="overline text-slate">{s.n} · {s.label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Link to="/process" className="textlink text-[15px] font-medium">What happens after yes, in detail →</Link>
          </div>
        </Container>
      </Section>

      {/* §H7 Pricing anchor. */}
      <Section labelledBy="pricing-h2">
        <Container className="max-w-[880px]">
          <Reveal>
            <SectionHead
              headline="An investment that pays for itself in filled chairs."
              lead="Three systems. Honest engagement terms. No “contact us for pricing” games — every engagement starts with the free audit, and if it says you don't need us yet, we'll tell you that too."
              id="pricing-h2"
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GhostLink to="/pricing">See the systems & terms</GhostLink>
              <MoltenLink to="/growth-audit" placement="home-pricing">Start with the free audit</MoltenLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* §H9 FAQ — narrowed measure (PD §H9). */}
      <Section labelledBy="faq-h2" id="faq">
        <Container className="max-w-[760px]">
          <Reveal><SectionHead headline="The questions owners actually ask." id="faq-h2" /></Reveal>
          <div className="mt-10"><Faq items={faq} /></div>
        </Container>
      </Section>

      {/* §H10 Final CTA — dark bookend. */}
      <CtaBand placement="home-final" />
    </>
  );
}
