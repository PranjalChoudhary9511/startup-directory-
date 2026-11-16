"use client";

import { progressKey, setCompleted, useCompleted } from "@/lib/progress";

export function TrackTick({ pillar, track }: { pillar: string; track: string }) {
  const done = useCompleted().has(progressKey(pillar, track));
  return (
    <span
      aria-label={done ? "Completed" : "Not completed"}
      className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px] ${
        done ? "border-transparent bg-ink text-white" : "border-line"
      }`}
    >
      {done ? "✓" : null}
    </span>
  );
}

export function PillarProgress({ pillar, total }: { pillar: string; total: number }) {
  const completed = useCompleted();
  const done = [...completed].filter((k) => k.startsWith(`${pillar}/`)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between font-mono text-[11px] text-fg2">
        <span>{done} / {total} tracks</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-chip">
        <div className="h-full rounded-full bg-ink transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function MarkComplete({ pillar, track }: { pillar: string; track: string }) {
  const key = progressKey(pillar, track);
  const done = useCompleted().has(key);
  return (
    <button
      type="button"
      onClick={() => setCompleted(key, !done)}
      aria-pressed={done}
      className={done ? "btn-secondary !h-10 !px-4" : "btn-primary is-sm"}
    >
      {done ? "✓ Completed" : "Mark as complete"}
    </button>
  );
}
