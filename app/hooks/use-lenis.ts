import { useEffect } from "react";
import { isPointerFine, useMotionTier } from "~/hooks/use-motion-tier";

/* Lenis: desktop pointer-fine + full tier only (MO §2). Destroyed, not
   paused, everywhere else — native scroll IS the mobile design. */
export function useLenis() {
  const tier = useMotionTier();
  useEffect(() => {
    if (tier !== "full" || !isPointerFine()) return;
    let raf = 0;
    let destroyed = false;
    let cleanup = () => {};
    void import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({ duration: 0.9 });
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanup = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });
    return () => {
      destroyed = true;
      cleanup();
    };
  }, [tier]);
}
