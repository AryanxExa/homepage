import { createContext, useContext, type ReactNode } from "react";
import { cn } from "~/lib/utils";

/* Theme bands (DS §9): dark is editorial, applied per section, consumed
   via context — components never hard-code a theme. */
const BandContext = createContext<"clarity" | "engine">("clarity");
export const useBand = () => useContext(BandContext);

export function Section({
  band = "clarity",
  className,
  children,
  id,
  labelledBy,
}: {
  band?: "clarity" | "engine";
  className?: string;
  children: ReactNode;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <BandContext.Provider value={band}>
      <section
        id={id}
        aria-labelledby={labelledBy}
        data-band={band}
        className={cn(
          "py-16 md:py-24 lg:py-32",
          band === "engine" ? "bg-ink text-canvas" : "bg-canvas text-ink",
          className,
        )}
      >
        {children}
      </section>
    </BandContext.Provider>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-12", className)}>{children}</div>;
}

/** One voice per altitude (PD §1.3): overline → headline → lead. */
export function SectionHead({
  overline,
  headline,
  lead,
  center = false,
  id,
}: {
  overline?: string;
  headline: string;
  lead?: string;
  center?: boolean;
  id?: string;
}) {
  const band = useBand();
  return (
    <div className={cn("max-w-[60ch]", center && "mx-auto text-center")}>
      {overline && (
        <p className={cn("overline mb-3", band === "engine" ? "text-invsec" : "text-slate")}>{overline}</p>
      )}
      <h2 id={id} className="text-[28px] leading-[1.12] font-semibold tracking-[-0.005em] md:text-[36px] lg:text-[40px]">
        {headline}
      </h2>
      {lead && (
        <p className={cn("mt-6 text-[18px] leading-relaxed md:text-[20px]", band === "engine" ? "text-invsec" : "text-slate")}>
          {lead}
        </p>
      )}
    </div>
  );
}
