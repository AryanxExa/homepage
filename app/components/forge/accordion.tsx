import * as RadixAccordion from "@radix-ui/react-accordion";
import { Chevron } from "~/components/forge/icons";
import { useBand } from "~/components/forge/section";
import { cn } from "~/lib/utils";

/* FAQ accordion (DS §8.6): Radix semantics, hairline separators, chevron
   rotate; multiple rows may open. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const band = useBand();
  return (
    <RadixAccordion.Root type="multiple" className={cn("divide-y border-y", "divide-mist border-mist", band === "engine" && "divide-steel border-steel")}>
      {items.map((item, i) => (
        <RadixAccordion.Item key={i} value={`item-${i}`}>
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-[18px] font-semibold md:text-[20px]">
              {item.q}
              <Chevron className="shrink-0 text-slate transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-none">
            <p className={cn("pb-5 pr-8 text-[17px] leading-relaxed", band === "engine" ? "text-invsec" : "text-slate")}>
              {item.a}
            </p>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
