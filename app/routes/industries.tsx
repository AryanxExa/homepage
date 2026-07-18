import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Container, Section, SectionHead } from "~/components/forge/section";
import { CtaBand } from "~/components/forge/cta-band";
import { ArrowRight } from "~/components/forge/icons";
import { Reveal, Stagger } from "~/components/motion/primitives";
import { verticalList } from "~/config/verticals";
import { pageMeta } from "~/lib/seo";

export const meta: MetaFunction = () =>
  pageMeta({
    title: "Industries",
    description:
      "Growth systems engineered for UAE salons, med spas, dental clinics, gyms and premium service businesses — pick your business and see exactly how the system works for it.",
    path: "/industries",
  });

export default function Industries() {
  return (
    <>
      <Section className="pt-32 md:pt-40" labelledBy="ind-h1">
        <Container className="max-w-[760px]">
          <p className="overline text-slate">Industries</p>
          <h1 id="ind-h1" className="mt-3 text-[36px] font-bold leading-[1.08] md:text-[48px]">
            Engineered for your kind of business.
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-slate">
            The leaks look different in a salon than in a dental clinic. The system adapts;
            the outcome doesn't: a full calendar, clients who come back, and numbers you can trust.
          </p>
        </Container>
      </Section>

      <Section labelledBy="ind-grid" className="pt-0">
        <Container>
          <h2 id="ind-grid" className="sr-only">Choose your industry</h2>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <Reveal className="mt-12">
            <p className="max-w-[62ch] text-[17px] text-slate">
              Don't see your business? If you take bookings and hate empty slots, the system fits —
              the audit maps your specific journey before anything is proposed.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand placement="industries-hub" />
    </>
  );
}
