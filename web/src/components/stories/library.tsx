"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { COLLECTIONS, type StoryCard as Card } from "@/content/stories/labels";
import type { CollectionKey } from "@/content/stories/schema";
import { StoryCard } from "./story-card";

export function StoryLibrary({ stories }: { stories: Card[] }) {
  const [q, setQ] = useState("");
  const [col, setCol] = useState<CollectionKey | "all">("all");
  const [hindi, setHindi] = useState(false);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return stories
      .filter((s) => col === "all" || s.collection === col)
      .filter((s) => !hindi || s.lead.language === "hi")
      .filter((s) => !term || `${s.company} ${s.hook} ${s.sector} ${s.lead.channel}`.toLowerCase().includes(term));
  }, [stories, q, col, hindi]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-line bg-surface px-3 sm:max-w-sm">
          <MagnifyingGlass size={15} className="text-fg3" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a company, founder or industry…" aria-label="Search stories" className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-fg3" />
        </label>
        <button type="button" onClick={() => setHindi(!hindi)} className={`chip ${hindi ? "is-on" : ""}`}>हिंदी films</button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <button type="button" onClick={() => setCol("all")} className={`chip ${col === "all" ? "is-on" : ""}`}>All · {stories.length}</button>
        {COLLECTIONS.map((c) => {
          const n = stories.filter((s) => s.collection === c.key).length;
          if (!n) return null;
          return (
            <button key={c.key} type="button" onClick={() => setCol(c.key)} className={`chip ${col === c.key ? "is-on" : ""}`}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.tint }} /> {c.title} · {n}
            </button>
          );
        })}
      </div>

      {results.length ? (
        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      ) : (
        <p className="mt-10 text-center text-[14px] text-fg2">No story matches that yet. Try a broader word, like &ldquo;bank&rdquo; or &ldquo;India&rdquo;.</p>
      )}
    </div>
  );
}
