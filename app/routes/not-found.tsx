import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Container, Section } from "~/components/forge/section";
import { WhatsAppLink } from "~/components/forge/button";
import { pageMeta } from "~/lib/seo";
import { waPrefills } from "~/lib/wa";

export const meta: MetaFunction = () => [
  ...pageMeta({ title: "Page Not Found", path: "/404" }),
  { name: "robots", content: "noindex" },
];

export default function NotFound() {
  return (
    <Section className="pt-32 md:pt-40" labelledBy="nf-h1">
      <Container className="flex min-h-[40vh] max-w-[640px] flex-col items-start justify-center">
        <h1 id="nf-h1" className="text-[32px] font-bold leading-tight md:text-[44px]">
          This page doesn't exist. <span className="text-slate">Your growth system should.</span>
        </h1>
        <nav aria-label="Recovery" className="mt-8 flex flex-wrap gap-6 text-[17px]">
          <Link className="textlink" to="/">Home</Link>
          <Link className="textlink" to="/industries">Industries</Link>
          <Link className="textlink" to="/growth-audit">Book a Growth Audit</Link>
        </nav>
        <WhatsAppLink prefill={waPrefills.general} placement="404" className="mt-8">
          Message us on WhatsApp
        </WhatsAppLink>
      </Container>
    </Section>
  );
}
