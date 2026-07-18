/* Typed event emitter (spec §16 + IA §12). Events not in this union are
   compile errors. Emits to dataLayer when present; silent otherwise. */

export type AnalyticsEvent =
  | { name: "cta_book_audit_click"; placement: string }
  | { name: "whatsapp_click"; placement: string }
  | { name: "calculator_start" }
  | { name: "calculator_complete"; leakAED: number }
  | { name: "leak_report_whatsapp_send"; leakAED: number }
  | { name: "demo_start"; placement: string }
  | { name: "demo_complete"; placement: string }
  | { name: "system_module_open"; module: string }
  | { name: "pricing_view" }
  | { name: "audit_form_start" }
  | { name: "audit_form_submit" }
  | { name: "industry_page_view"; vertical: string }
  | { name: "sticky_bar_click"; rail: "whatsapp" | "calendar" }
  | { name: "menu_open" }
  | { name: "booked_page_view" };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event: event.name, ...event });
}
