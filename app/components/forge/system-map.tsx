import { useState } from "react";
import { track } from "~/lib/analytics";
import { cn } from "~/lib/utils";

/* DS §8.8: desktop = tablist index + panel; mobile = vertical accordion of
   the same panels (no pinch-diagrams). Connections concept expressed as
   the selected node lighting teal — SVG diagram deferred with imagery. */

export interface SystemModule {
  id: string;
  label: string;
  line: string;
  outcome: string;
}

export const systemModules: SystemModule[] = [
  { id: "website", label: "WEBSITE", line: "A site built to book, not to win design awards.", outcome: "Visitors become appointments." },
  { id: "booking", label: "BOOKING", line: "Clients book themselves, day or night. Deposits protect your day.", outcome: "A full calendar, fewer gaps." },
  { id: "crm", label: "CRM", line: "Every client, every visit, every preference — in one place, not in someone's head.", outcome: "Nobody slips through." },
  { id: "ai", label: "AI", line: "Answers in seconds at 2am, in your tone. It has read your price list; it never gets tired.", outcome: "First to reply wins the booking." },
  { id: "whatsapp", label: "WHATSAPP", line: "Reminders, rebookings, review requests — on the app your clients already live in.", outcome: "Fewer no-shows. More returns." },
  { id: "analytics", label: "ANALYTICS", line: "Which offer filled chairs, and which one just felt busy.", outcome: "Spend on what works." },
  { id: "operations", label: "OPERATIONS", line: "The workflows tying it together, so your team doesn't have to.", outcome: "Less admin. More calm." },
];

export function SystemMap() {
  const [active, setActive] = useState(0);
  const mod = systemModules[active];

  const select = (i: number) => {
    setActive(i);
    track({ name: "system_module_open", module: systemModules[i].id });
  };

  return (
    <div>
      {/* Desktop: index left, one persistent panel right (MI §2.8). */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div role="tablist" aria-label="System modules" aria-orientation="vertical" className="flex flex-col gap-1">
          {systemModules.map((m, i) => (
            <button
              key={m.id}
              role="tab"
              id={`tab-${m.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${m.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") select((active + 1) % systemModules.length);
                if (e.key === "ArrowUp") select((active + systemModules.length - 1) % systemModules.length);
              }}
              className={cn(
                "flex items-center justify-between rounded-[8px] px-4 py-3 text-left transition-colors duration-[120ms]",
                i === active ? "bg-graphite text-teal" : "text-invsec hover:bg-graphite/60 hover:text-canvas",
              )}
            >
              <span className="overline">{m.label}</span>
              <span aria-hidden className={cn("text-[13px]", i === active ? "text-teal" : "text-steel")}>
                {i === active ? "●" : "○"}
              </span>
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`panel-${mod.id}`}
          aria-labelledby={`tab-${mod.id}`}
          className="flex flex-col justify-center rounded-[16px] border border-steel bg-graphite p-10"
        >
          <p className="overline text-teal">{mod.label}</p>
          <p className="mt-4 text-[24px] font-semibold leading-snug text-canvas">{mod.line}</p>
          <p className="mt-4 text-[17px] text-invsec">
            <span className="font-semibold text-canvas">Outcome:</span> {mod.outcome}
          </p>
        </div>
      </div>

      {/* Mobile: the map linearizes (DS §8.8). */}
      <ul className="flex flex-col gap-3 lg:hidden">
        {systemModules.map((m) => (
          <li key={m.id} className="rounded-[12px] border border-steel bg-graphite p-5">
            <p className="overline text-teal">{m.label}</p>
            <p className="mt-2 text-[17px] font-medium text-canvas">{m.line}</p>
            <p className="mt-2 text-[15px] text-invsec">{m.outcome}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
