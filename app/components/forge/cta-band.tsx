import { Section, Container } from "~/components/forge/section";
import { MoltenLink, PromiseChip, WhatsAppLink } from "~/components/forge/button";
import { waPrefills } from "~/lib/wa";

/* The standard closing ask (IA rule 3): dual rail + risk reversal +
   promise. Dark bookend variant for page ends (PD §H10). */
export function CtaBand({
  headline = "See where your growth is leaking — free.",
  sub = "Book a Growth Audit. We'll map your business, show you exactly where revenue is slipping, and hand you the blueprint — whether you work with us or not.",
  placement,
  waPrefill = waPrefills.general,
}: {
  headline?: string;
  sub?: string;
  placement: string;
  waPrefill?: string;
}) {
  return (
    <Section band="engine" className="py-16 md:py-20 lg:py-24">
      <Container className="flex max-w-[760px] flex-col items-center text-center">
        <h2 className="text-[28px] font-semibold leading-tight md:text-[36px]">{headline}</h2>
        <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-invsec md:text-[18px]">{sub}</p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <WhatsAppLink prefill={waPrefill} placement={placement}>
            WhatsApp us — free Growth Audit
          </WhatsAppLink>
          <MoltenLink to="/growth-audit" placement={placement}>
            Get my free Growth Audit
          </MoltenLink>
        </div>
        <PromiseChip className="mt-6" />
        <p className="mt-6 text-[14px] italic text-invsec">
          The audit takes half an hour. The leaks are running around the clock.
        </p>
      </Container>
    </Section>
  );
}
