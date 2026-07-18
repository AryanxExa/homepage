import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Close, WhatsApp } from "~/components/forge/icons";
import { MoltenLink, PromiseChip, WhatsAppLink } from "~/components/forge/button";
import { gates } from "~/config/gates";
import { site } from "~/config/site";
import { track } from "~/lib/analytics";
import { waPrefills } from "~/lib/wa";
import { cn } from "~/lib/utils";

/* IA §3: five links, no dropdowns, one P0. The "See it run" slot swaps to
   Results when the case gate opens. Hysteresis on condense (MI §2.1). */

const links = [
  { to: "/system", label: "The System" },
  { to: "/industries", label: "Industries" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  gates.results ? { to: "/results", label: "Results" } : { to: "/#demo", label: "See it run" },
];

function useCondensed(): boolean {
  const [condensed, setCondensed] = useState(false);
  useEffect(() => {
    let current = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (!current && y > 64) {
        current = true;
        setCondensed(true);
      } else if (current && y < 32) {
        current = false;
        setCondensed(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return condensed;
}

export function Nav() {
  const condensed = useCondensed();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[height,background-color,box-shadow] duration-200",
        condensed
          ? "border-b border-mist bg-canvas/80 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-canvas"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 sm:px-6 lg:px-12",
          condensed ? "h-[60px]" : "h-[72px]",
          "transition-[height] duration-200",
        )}
      >
        <Link to="/" className="text-[20px] font-bold tracking-tight text-ink">
          {site.name}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-[15px] font-medium text-ink/80 hover:text-ink",
                  isActive && !l.to.includes("#") && "text-ink underline decoration-copper decoration-2 underline-offset-8",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <MoltenLink to="/growth-audit" placement="nav" className="min-h-[44px] px-5 text-[15px]">
            Get my free Growth Audit
          </MoltenLink>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <WhatsAppLink
            prefill={waPrefills.general}
            placement="nav-mobile"
            className="min-h-[44px] w-[44px] rounded-full px-0"
          >
            <span className="sr-only">Message YanForge on WhatsApp</span>
          </WhatsAppLink>

          <Dialog.Root open={open} onOpenChange={(o) => { setOpen(o); if (o) track({ name: "menu_open" }); }}>
            <Dialog.Trigger className="flex min-h-[44px] items-center gap-2 rounded-[8px] border border-mist px-4 text-[15px] font-medium">
              Menu
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[400px] flex-col bg-canvas p-6 pt-5 focus:outline-none">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-[20px] font-bold">{site.name}</Dialog.Title>
                  <Dialog.Close className="flex h-[44px] w-[44px] items-center justify-center rounded-[8px] border border-mist" aria-label="Close menu">
                    <Close />
                  </Dialog.Close>
                </div>
                <ul className="mt-8 flex flex-col gap-1">
                  {links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="block rounded-[8px] px-3 py-3 text-[20px] font-semibold hover:bg-ink/5">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-3 pb-[env(safe-area-inset-bottom)]">
                  <MoltenLink to="/growth-audit" placement="menu">Get my free Growth Audit</MoltenLink>
                  <WhatsAppLink prefill={waPrefills.general} placement="menu">
                    Message us on WhatsApp
                  </WhatsAppLink>
                  <PromiseChip className="self-center" />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
