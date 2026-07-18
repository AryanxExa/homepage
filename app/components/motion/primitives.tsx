import { LazyMotion, m, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionTier } from "~/hooks/use-motion-tier";
import { formatAED } from "~/lib/utils";

/* The ONLY module that imports framer-motion (EA §12). Sections declare
   intent; physics values live here, from MO tokens. */

const loadFeatures = () => import("./features").then((m) => m.default);

export function MotionRoot({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}

const EASE_ENTER = [0.22, 1, 0.36, 1] as const;

/** Section/element entrance: MO §4.2. Once-only, fires just before reading position. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const tier = useMotionTier();
  if (tier === "static") return <div className={className}>{children}</div>;
  const distance = tier === "lite" ? 0 : 24;
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: tier === "lite" ? 0.2 : 0.32, ease: EASE_ENTER, delay }}
    >
      {children}
    </m.div>
  );
}

/** Staggered children: 60ms unit, max 6 staggered (7th+ arrive together). */
export function Stagger({ children, className }: { children: ReactNode[]; className?: string }) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={Math.min(i, 5) * 0.06}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

/** Count-up (MO §4.3): 800–1200ms, linear value, fires once, tabular-safe. */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const tier = useMotionTier();
  const [display, setDisplay] = useState(tier === "static" ? value : 0);

  useEffect(() => {
    if (tier === "static") {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(value * t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, tier]);

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {formatAED(display)}
    </span>
  );
}
