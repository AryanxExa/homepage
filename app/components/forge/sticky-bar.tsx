import { Link, useLocation } from "react-router";
import { WhatsApp } from "~/components/forge/icons";
import { useScrollIntent } from "~/hooks/use-scroll-intent";
import { track } from "~/lib/analytics";
import { trackWaClick, waHref, waPrefills } from "~/lib/wa";
import { cn } from "~/lib/utils";

/* Mobile dual-rail bar (IA §4): WhatsApp primary, audit secondary.
   Scroll-intent reveal; suppressed on conversion pages; safe-area aware. */
export function StickyBar() {
  const intent = useScrollIntent();
  const { pathname } = useLocation();
  if (pathname.startsWith("/growth-audit")) return null;

  const wa = waHref(waPrefills.general);
  return (
    <div
      aria-hidden={!intent}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-mist bg-canvas p-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-e2 transition-transform duration-200 lg:hidden",
        intent ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-[480px] gap-3">
        {wa ? (
          <a
            href={wa}
            onClick={() => { trackWaClick("sticky"); track({ name: "sticky_bar_click", rail: "whatsapp" }); }}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-[12px] bg-whatsapp font-semibold text-white"
          >
            <WhatsApp /> WhatsApp us
          </a>
        ) : (
          <Link
            to="/growth-audit"
            onClick={() => track({ name: "sticky_bar_click", rail: "whatsapp" })}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-[12px] bg-whatsapp font-semibold text-white"
          >
            <WhatsApp /> WhatsApp us
          </Link>
        )}
        <Link
          to="/growth-audit"
          onClick={() => track({ name: "sticky_bar_click", rail: "calendar" })}
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-[12px] bg-molten font-semibold text-ink"
        >
          Book audit
        </Link>
      </div>
    </div>
  );
}
