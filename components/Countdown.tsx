"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function split(ms: number): Parts {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(split(target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!parts) {
    return (
      <div className="grid grid-cols-4 gap-3 text-center" aria-hidden>
        {["Days", "Hours", "Mins", "Secs"].map((label) => (
          <div key={label} className="border border-gold/25 bg-ink-50 px-2 py-4">
            <div className="font-display text-2xl text-gold-light tabular-nums">—</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-mist">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  const cells: { label: string; value: number }[] = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Mins", value: parts.minutes },
    { label: "Secs", value: parts.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 text-center" role="timer" aria-live="polite">
      {cells.map((cell) => (
        <div key={cell.label} className="border border-gold/25 bg-ink-50 px-2 py-4">
          <div className="font-display text-2xl text-gold-light tabular-nums md:text-3xl">
            {String(cell.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs uppercase tracking-wider text-mist">{cell.label}</div>
        </div>
      ))}
    </div>
  );
}
