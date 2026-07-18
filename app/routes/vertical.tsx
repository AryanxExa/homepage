import { useEffect } from "react";
import type { MetaFunction } from "react-router";
import { Link, useParams } from "react-router";
import { Container, Section, SectionHead } from "~/components/forge/section";
import { Calculator } from "~/components/forge/calculator";
import { Faq } from "~/components/forge/accordion";
import { CtaBand } from "~/components/forge/cta-band";
import { Reveal } from "~/components/motion/primitives";
import { verticals, type VerticalSlug, VERTICAL_SLUGS } from "~/config/verticals";
import { track } from "~/lib/analytics";
import { faqJsonLd, JsonLd, pageMeta, serviceJsonLd } from "~/lib/seo";
import { waPrefills } from "~/lib/wa";

/* One template, five pages — the vertical-delta pattern (EA §7). */

export const meta: MetaFunction = ({ params }) => {
  const v = verticals[(params.vertical ?? "salons") as VerticalSlug];
  if (!v) return pageMeta({ path: "/industries" });
  return pageMeta({
    title: `Growth Systems for ${v.name} in the UAE`,
    description: v.answer,
    path: `/industries/${v.slug}`,
  });
};

export default function Vertical() {
  const params = useParams();
  const slug = params.vertical as VerticalSlug;
  const v = VERTICAL_SLUGS.includes(slug) ? verticals[slug] : null;

  useEffect(() => {
    if (v) track({ name: "industry_page_view", vertical: v.slug });
  }, [v]);

  if (!v) {
    return (
      <Section className="pt-40" labelledBy="nf">
        <Container>
          <h1 id="nf" className="text-[36px] font-bold">We don't have a page for that industry — yet.</h1>
          <p className="mt-4 text-[17px] text-slate">
            <Link to="/industries" className="textlink">See the industries we serve →</Link>
          </p>
        </Container>
      </Section>
    );
  }

  const waPrefill = waPrefills.vertical(v.short, v.name.toLowerCase());

  return (
    <>
      <JsonLd data={serviceJsonLd(`Growth system for ${v.name.toLowerCase()}`, v.answer, `/industries/${v.slug}`)} />
      <JsonLd data={faqJsonLd(v.faq)} />

      <Section className="pt-32 md:pt-40" labelledBy="v-h1">
        <Container className="max-w-[760px]">
          <p className="overline text-slate">{v.name} · UAE</p>
          <h1 id="v-h1" className="mt-3 text-[36px] font-bold leading-[1.08] md:text-[48px]">{v.heroPromise}</h1>
          <p className="mt-6 text-[18px] leading-relaxed text-slate md:text-[20px]">{v.heroSub}</p>
          {/* AEO answer block (AI §4.2) — self-contained, extraction-ready. */}
          <p className="mt-6 border-l-2 border-copper pl-4 text-[17px] leading-relaxed">{v.answer}</p>
        </Container>
      </Section>

      <Section labelledBy="v-pains">
        <Container>
          <Reveal><SectionHead headline="The leaks, in your vocabulary." id="v-pains" /></Reveal>
          <ul className="mt-8 max-w-[760px] divide-y divide-mist border-y border-mist">
            {v.pains.map((p, i) => (
              <li key={i} className="py-4 text-[17px] leading-relaxed">{p}</li>
            ))}
          </ul>
          <div className="mt-12 lg:mx-auto lg:max-w-[880px]">
            <Reveal><Calculator defaults={v.calcDefaults} /></Reveal>
          </div>
        </Container>
      </Section>

      <Section band="engine" labelledBy="v-flagship">
        <Container className="max-w-[760px]">
          <Reveal>
            <SectionHead overline="One automation, end to end" headline={v.flagship.title} id="v-flagship" />
          </Reveal>
          <ol className="mt-10 space-y-6">
            {v.flagship.steps.map((s, i) => (
              <li key={i} className="flex gap-4 border-t border-steel pt-4">
                <span className="overline shrink-0 text-teal">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[17px] leading-relaxed text-canvas">{s}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section labelledBy="v-week1">
        <Container className="max-w-[760px]">
          <Reveal>
            <SectionHead
              headline="What changes in week one."
              lead="Nothing dramatic — that's the point. The system arrives in phases, alongside what you have."
              id="v-week1"
            />
          </Reveal>
          <ol className="mt-8 space-y-4">
            {v.weekOne.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="overline mt-1 shrink-0 text-copperdeep">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[17px] leading-relaxed">{s}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[17px] text-slate">
            <Link to="/process" className="textlink font-medium">The full path, step by step →</Link>
          </p>
        </Container>
      </Section>

      <Section labelledBy="v-faq">
        <Container className="max-w-[760px]">
          <Reveal><SectionHead headline={`Questions ${v.short} owners ask.`} id="v-faq" /></Reveal>
          <div className="mt-10"><Faq items={v.faq} /></div>
        </Container>
      </Section>

      <CtaBand placement={`vertical-${v.slug}`} waPrefill={waPrefill} />
    </>
  );
}
