import { Link } from "react-router";
import type { ReactNode } from "react";
import { cn } from "~/lib/utils";
import { WhatsApp } from "~/components/forge/icons";
import { site } from "~/config/site";
import { track } from "~/lib/analytics";
import { trackWaClick, waHref } from "~/lib/wa";
import { useBand } from "~/components/forge/section";

/* DS §8.1. P0 molten carries an Ink label (white fails contrast — §2.6).
   Every conversion action is a plain anchor: works before hydration (PF §6). */

const baseBtn =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[12px] px-6 text-[17px] font-semibold transition-transform duration-[120ms] active:scale-[0.98] md:min-h-[44px]";

export function MoltenLink({
  to,
  children,
  placement,
  className,
}: {
  to: string;
  children: ReactNode;
  placement: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(baseBtn, "bg-molten text-ink", className)}
      onClick={() => track({ name: "cta_book_audit_click", placement })}
    >
      {children}
    </Link>
  );
}

export function GhostLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  const band = useBand();
  return (
    <Link
      to={to}
      className={cn(
        baseBtn,
        "border-[1.5px]",
        band === "engine"
          ? "border-canvas text-canvas hover:bg-canvas/5"
          : "border-ink text-ink hover:bg-ink/5",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** WhatsApp rail. Renders a wa.me anchor when the number is configured;
    falls back to the audit page otherwise (config-driven honesty). */
export function WhatsAppLink({
  prefill,
  placement,
  children,
  className,
}: {
  prefill: string;
  placement: string;
  children: ReactNode;
  className?: string;
}) {
  const href = waHref(prefill);
  const classes = cn(baseBtn, "bg-whatsapp text-white", className);
  if (!href) {
    return (
      <Link to="/growth-audit" className={classes} onClick={() => trackWaClick(placement)}>
        <WhatsApp /> {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} onClick={() => trackWaClick(placement)}>
      <WhatsApp /> {children}
    </a>
  );
}

export function PromiseChip({ className }: { className?: string }) {
  const band = useBand();
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px]",
        band === "engine" ? "border-steel text-invsec" : "border-mist text-slate",
        className,
      )}
    >
      <span aria-hidden>◷</span> {site.replyPromise}
    </p>
  );
}
