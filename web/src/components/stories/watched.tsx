"use client";

import { Check } from "@phosphor-icons/react";
import { progressKey, setCompleted, useCompleted } from "@/lib/progress";

const key = (slug: string) => progressKey("story", slug);

export function WatchedTick({ slug }: { slug: string }) {
  const done = useCompleted().has(key(slug));
  if (!done) return null;
  return (
    <span className="flex items-center gap-1 rounded-full bg-[#0f7a43] px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.06em] text-white">
      <Check size={10} weight="bold" /> WATCHED
    </span>
  );
}

export function WatchedToggle({ slug }: { slug: string }) {
  const done = useCompleted().has(key(slug));
  return (
    <button type="button" onClick={() => setCompleted(key(slug), !done)} aria-pressed={done} className={done ? "btn-secondary !h-10 !px-4" : "btn-primary is-sm"}>
      {done ? (<><Check size={14} weight="bold" /> Watched</>) : "Mark as watched"}
    </button>
  );
}

export function PathProgress({ slugs }: { slugs: string[] }) {
  const done = useCompleted();
  const n = slugs.filter((s) => done.has(key(s))).length;
  const pct = slugs.length ? Math.round((n / slugs.length) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-chip">
        <div className="h-full rounded-full bg-ink transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-[11px] text-fg2">{n} / {slugs.length} watched</span>
    </div>
  );
}
