import { useSyncExternalStore } from "react";

/* MO §6 degradation ladder, resolved once per session.
   static  = prefers-reduced-motion: completed states everywhere
   lite    = in-app WebView or save-data: fades only
   full    = everything in the catalog */
export type MotionTier = "full" | "lite" | "static";

function resolveTier(): MotionTier {
  if (typeof window === "undefined") return "static";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  const ua = navigator.userAgent;
  const inApp = /(Instagram|FBAN|FBAV|TikTok|musical_ly)/i.test(ua);
  const saveData =
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  if (inApp || saveData) return "lite";
  return "full";
}

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function useMotionTier(): MotionTier {
  return useSyncExternalStore(subscribe, resolveTier, () => "static");
}

export function isPointerFine(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}
