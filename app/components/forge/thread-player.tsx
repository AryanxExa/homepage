import { useEffect, useRef, useState } from "react";
import { useMotionTier } from "~/hooks/use-motion-tier";
import { track } from "~/lib/analytics";
import { cn } from "~/lib/utils";

/* DS §8.9: one component, configured for hero (auto-once) and proof
   (user-triggered). SIMULATION badge is part of the anatomy — the
   no-fabrication rule, structurally enforced. Tap completes (MI §2.9). */

export interface ThreadMessage {
  from: "client" | "system";
  text: string;
  time: string;
}

export const bookingScript: ThreadMessage[] = [
  { from: "client", text: "Hi! Do you have anything tomorrow afternoon for balayage?", time: "9:47 PM" },
  { from: "system", text: "Welcome back, Sara 👋 Tomorrow we have 2:30 or 5:00 with Rita. Which works?", time: "9:47 PM" },
  { from: "client", text: "5pm please", time: "9:48 PM" },
  { from: "system", text: "Done — Rita, tomorrow at 5:00 ✓ We'll send you a reminder at 2pm.", time: "9:48 PM" },
];

export function ThreadPlayer({
  script = bookingScript,
  auto = false,
  placement,
  caption,
}: {
  script?: ThreadMessage[];
  auto?: boolean;
  placement: string;
  caption?: string;
}) {
  const tier = useMotionTier();
  const instant = tier === "static";
  const [shown, setShown] = useState(instant || !auto ? (instant ? script.length : 0) : 0);
  const [started, setStarted] = useState(instant);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const start = () => {
    if (started && shown >= script.length) {
      setShown(0);
    }
    setStarted(true);
    track({ name: "demo_start", placement });
  };

  useEffect(() => {
    if (instant || !auto) return;
    const t = setTimeout(() => { setStarted(true); track({ name: "demo_start", placement }); }, 700);
    return () => clearTimeout(t);
  }, [auto, instant, placement]);

  useEffect(() => {
    if (instant || !started || shown >= script.length) {
      if (started && shown >= script.length) track({ name: "demo_complete", placement });
      return;
    }
    // First reply lands fast (MI §2.9); the rest at reading pace (MO §4.1).
    timer.current = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 300 : 900);
    return () => clearTimeout(timer.current);
  }, [started, shown, script.length, instant, placement]);

  const complete = () => setShown(script.length);

  return (
    <figure className="w-full max-w-[380px]">
      <div
        role="img"
        aria-label="Simulated WhatsApp conversation: a client books an appointment in under a minute, answered automatically"
        onClick={started ? complete : undefined}
        className="relative flex min-h-[360px] flex-col gap-3 rounded-[16px] border border-mist bg-white p-4 shadow-e1 [data-band=engine]_&:border-steel"
      >
        <span className="overline absolute right-3 top-3 rounded-[6px] bg-mist px-2 py-0.5 text-slate">
          Simulation
        </span>
        <p className="text-[14px] font-semibold text-ink">Aura Salon</p>
        <div className="flex flex-1 flex-col justify-end gap-2">
          {script.slice(0, shown).map((msg, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-[12px] px-3 py-2 text-[14px] leading-snug",
                msg.from === "client"
                  ? "self-end bg-[#d7f5cc] text-ink"
                  : "self-start bg-mist text-ink",
              )}
            >
              <p>{msg.text}</p>
              <p className="mt-1 text-right text-[11px] text-slate">{msg.time}</p>
            </div>
          ))}
        </div>
        {!auto && !instant && (
          <button
            type="button"
            onClick={start}
            className="mt-2 min-h-[44px] rounded-[8px] border-[1.5px] border-ink text-[15px] font-semibold text-ink hover:bg-ink/5"
          >
            {started && shown >= script.length ? "Replay" : "Run the demo"}
          </button>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-[14px] italic text-slate">{caption}</figcaption>}
    </figure>
  );
}
