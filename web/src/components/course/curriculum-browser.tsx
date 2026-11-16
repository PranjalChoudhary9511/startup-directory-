"use client";

import { ArrowRight, Desktop, FilmSlate, ListBullets, SquaresFour, Star } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import type { Pillar, Track } from "@/lib/curriculum";
import { TrackTick } from "../progress";

type Filter = "all" | "free" | "stories" | "walkthroughs";
const pad = (n: number) => String(n).padStart(2, "0");

function Badges({ free, track }: { free: boolean; track: Track }) {
  return (
    <span className="flex items-center gap-1.5">
      {track.kind === "screen" && (
        <span className="rounded-full border border-divider px-2 py-[1px] font-mono text-[9px] tracking-[0.06em] text-fg2 uppercase">Walkthrough</span>
      )}
      {free ? (
        <span className="rounded-full bg-[#e4ecfd] px-2 py-[1px] font-mono text-[9px] font-semibold tracking-[0.06em] text-[#1062fe] uppercase">Free</span>
      ) : (
        <Star size={12} weight="fill" className="text-[#e9b949]" aria-label="Pro" />
      )}
    </span>
  );
}

export function CurriculumBrowser({ pillar }: { pillar: Pillar }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const all = pillar.modules.flatMap((m) => m.tracks.map((t) => ({ m, t })));
  const counts = {
    all: all.length,
    free: all.filter(({ m }) => m.isFree).length,
    stories: all.filter(({ t }) => t.story).length,
    walkthroughs: all.filter(({ t }) => t.kind === "screen").length,
  };
  const keep = (free: boolean, t: Track) =>
    filter === "all" || (filter === "free" && free) || (filter === "stories" && !!t.story) || (filter === "walkthroughs" && t.kind === "screen");

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "free", label: "Free" },
    { key: "stories", label: "Founder stories" },
    ...(counts.walkthroughs ? [{ key: "walkthroughs" as const, label: "Walkthroughs" }] : []),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter tracks">
          {tabs.map((tab) => (
            <button key={tab.key} type="button" role="tab" aria-selected={filter === tab.key} onClick={() => setFilter(tab.key)} className={`tab ${filter === tab.key ? "is-active" : ""}`}>
              {tab.label} <span className="count">{counts[tab.key]}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-1" aria-label="Layout">
          <button type="button" onClick={() => setView("list")} aria-pressed={view === "list"} className={`tab ${view === "list" ? "is-active" : ""}`}>
            <ListBullets size={14} /> List
          </button>
          <button type="button" onClick={() => setView("grid")} aria-pressed={view === "grid"} className={`tab ${view === "grid" ? "is-active" : ""}`}>
            <SquaresFour size={14} /> Grid
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-12">
        {pillar.modules.map((m) => {
          const tracks = m.tracks.filter((t) => keep(m.isFree, t));
          if (!tracks.length) return null;
          return (
            <section key={m.number} id={`module-${pad(m.number)}`} className="scroll-mt-20">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-fg3 uppercase">
                Module <span className="text-fg1">{pad(m.number)}</span> · {m.tracks.length} tracks
              </p>
              <h2 className="mt-1.5 text-[20px] font-[640] tracking-[-0.01em]">{m.title}</h2>

              {view === "grid" ? (
                <ul className="mt-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
                  {tracks.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/p/${pillar.slug}/${t.slug}`} className="grid-card unit-card">
                        <div className="relative flex h-[132px] flex-col justify-between overflow-hidden rounded-[9px] p-3.5" style={{ background: pillar.cardBg }}>
                          <span className="flex items-center justify-between">
                            <span className="accent-display text-[22px] leading-none text-[#1d1d1d]">{t.code}</span>
                            {t.kind === "screen" ? <Desktop size={18} className="text-[#1d1d1d]" /> : <FilmSlate size={18} className="text-[#1d1d1d]" />}
                          </span>
                          {t.story && (
                            <span className="self-start rounded-md bg-surface/85 px-2 py-1 text-[11px] font-medium backdrop-blur">Story: {t.story}</span>
                          )}
                          <span aria-hidden className="absolute -right-6 -bottom-8 h-24 w-24 rounded-full border-[10px] border-white/30" />
                        </div>
                        <p className="mt-3.5 text-[15px] leading-snug font-semibold">{t.title}</p>
                        <span className="mt-auto flex items-center justify-between pt-4">
                          <TrackTick pillar={pillar.slug} track={t.slug} />
                          <Badges free={m.isFree} track={t} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid-card mt-4 divide-y divide-divider">
                  {tracks.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/p/${pillar.slug}/${t.slug}`} className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-sidebar">
                        <TrackTick pillar={pillar.slug} track={t.slug} />
                        <span className="w-11 font-mono text-[12px] text-fg3">{t.code}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] font-medium">{t.title}</span>
                          {t.story && <span className="mt-0.5 block text-[12px] text-fg2">Story: {t.story}</span>}
                        </span>
                        <Badges free={m.isFree} track={t} />
                        <ArrowRight size={14} className="text-fg3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {m.deliverable && (
                <div className="mt-3 flex items-start gap-3 rounded-xl border border-dashed border-line-strong bg-surface/60 px-4 py-3 text-[13px]">
                  <span className="font-mono text-[10px] tracking-[0.08em] text-fg3 uppercase">Deliverable</span>
                  <span>{m.deliverable}</span>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
