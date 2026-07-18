import { useEffect, useState } from "react";

/* Sticky-bar reveal (IA §4) with hysteresis (MI §2.1): shows past 120% of
   the first viewport, hides again only below 80% — no boundary flapping. */
export function useScrollIntent(): boolean {
  const [intent, setIntent] = useState(false);
  useEffect(() => {
    let current = false;
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (!current && y > vh * 1.2) {
        current = true;
        setIntent(true);
      } else if (current && y < vh * 0.8) {
        current = false;
        setIntent(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return intent;
}
