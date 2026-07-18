import { site } from "~/config/site";
import { track } from "~/lib/analytics";

/* The only place wa.me URLs are built (EA §5). Pre-filled text names the
   source page — attribution that survives leaving the site (IA §7.4). */

export function waHref(prefill: string): string | null {
  if (!site.whatsappNumber) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(prefill)}`;
}

export const waPrefills = {
  general: "Hi YanForge — I'd like a free Growth Audit for my business.",
  calculator: "Hi YanForge — I just ran the leak calculator. Send me my report?",
  vertical: (name: string, page: string) =>
    `Hi YanForge — I run a ${name} and came from your ${page} page. I'd like a Growth Audit.`,
  audit: (fields: { name: string; businessType: string; area: string }) =>
    `Hi YanForge — I'd like a free Growth Audit.\nName: ${fields.name}\nBusiness: ${fields.businessType}\nArea: ${fields.area}`,
} as const;

export function trackWaClick(placement: string) {
  track({ name: "whatsapp_click", placement });
}
