"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import Link from "next/link";
import { type CSSProperties, useMemo, useState } from "react";
import { CAUSE_ORDER, CAUSES, type GraveCard, STATUS } from "@/content/graveyard/labels";
import type { CauseKey } from "@/content/graveyard/schema";
import { Tombstone } from "./tombstone";
import { useVisited } from "./visited";

type Region = "all" | "india" | "global";
type Sort = "money" | "recent" | "short" | "az";

const SORTS: { key: Sort; label: string }[] = [
  { key: "money", label: "Most money burned" },
  { key: "recent", label: "Most recent deaths" },
  { key: "short", label: "Shortest lives" },
  { key: "az", label: "A to Z" },
];

export function Cemetery({ graves }: { graves: GraveCard[] }) {
  const visited = useVisited();
  const [region, setRegion] = useState<Region>("all");
  const [cause, setCause] = useState<CauseKey | null>(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("money");

  const inRegion = useMemo(() => graves.filter((g) => region === "all" || g.region === region), [graves, region]);
  const causeCounts = useMemo(() => {
    const m = new Map<CauseKey, number>();
    for (const g of inRegion) m.set(g.cause, (m.get(g.cause) ?? 0) + 1);
    return CAUSE_ORDER.filter((k) => m.get(k)).map((k) => ({ key: k, n: m.get(k)! })).sort((a, b) => b.n - a.n);
  }, [inRegion]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = inRegion.filter(
      (g) =>
        (!cause || g.causes.includes(cause)) &&
        (!needle || `${g.name} ${g.sector} ${g.country} ${g.epitaph} ${g.oneLiner}`.toLowerCase().includes(needle)),
    );
    const by: Record<Sort, (a: GraveCard, b: GraveCard) => number> = {
      money: (a, b) => (b.raisedUsdM ?? -1) - (a.raisedUsdM ?? -1),
      recent: (a, b) => b.died - a.died,
      short: (a, b) => a.died - a.founded - (b.died - b.founded),
      az: (a, b) => a.name.localeCompare(b.name),
    };
    return [...list].sort((a, b) => by[sort](a, b) || a.name.localeCompare(b.name));
  }, [inRegion, cause, q, sort]);

  const read = graves.filter((g) => visited.has(g.slug)).length;

  return (
    <div>
      {/* ───────── Filters ───────── */}
      <div className="gy-filters">
        <div className="mx-auto max-w-[var(--content-max)] px-5 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex gap-1.5" role="group" aria-label="Region">
              {(
                [
                  ["all", "Everywhere", graves.length],
                  ["india", "India", graves.filter((g) => g.region === "india").length],
                  ["global", "World", graves.filter((g) => g.region === "global").length],
                ] as const
              ).map(([k, label, n]) => (
                <button key={k} type="button" className="gy-chip" aria-pressed={region === k} onClick={() => (setRegion(k), setCause(null))}>
                  {label} <span className="n">{n}</span>
                </button>
              ))}
            </div>
            <div className="relative ml-auto min-w-[180px] flex-1 sm:max-w-[260px]">
              <MagnifyingGlass size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--on-night-3)]" />
              <input className="gy-input w-full" placeholder="Search a company or sector" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search graves" />
            </div>
            <select className="gy-select" value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort">
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="gy-scroll mt-2.5 flex gap-1.5 overflow-x-auto" role="group" aria-label="Cause of death">
            <span className="mr-1 self-center font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-[var(--on-night-3)] uppercase">Died of</span>
            {causeCounts.map(({ key, n }) => (
              <button key={key} type="button" className="gy-chip" aria-pressed={cause === key} onClick={() => setCause(cause === key ? null : key)} title={CAUSES[key].line}>
                {CAUSES[key].short} <span className="n">{n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ───────── The plots ───────── */}
      <div className="mx-auto max-w-[var(--content-max)] px-5 pt-10 pb-24 sm:px-6">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3 text-[12.5px] text-[var(--on-night-2)]">
          <p>
            {shown.length === graves.length ? `All ${graves.length} graves` : `${shown.length} of ${graves.length} graves`}
            {cause && (
              <>
                {" "}
                · died mainly or partly of <span className="text-[var(--on-night)]">{CAUSES[cause].label.toLowerCase()}</span>{" "}
                <button type="button" onClick={() => setCause(null)} className="ml-1 inline-flex items-center gap-1 underline-offset-2 hover:underline">
                  <X size={11} /> clear
                </button>
              </>
            )}
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase">
            Taller stone = more money raised · cracked = fraud ·{" "}
            <span className="text-[var(--on-night)]">
              {read ? `flowers laid: ${read} of ${graves.length}` : "a flower appears on each one you read"}
            </span>
          </p>
        </div>

        {shown.length ? (
          <ul className="gy-plots">
            {shown.map((g, i) => (
              <li key={g.slug}>
                <Link
                  href={`/graveyard/${g.slug}`}
                  prefetch={false}
                  className="gy-plot"
                  style={{ "--delay": `${Math.min(i, 24) * 35}ms` } as CSSProperties}
                  aria-label={`${g.name}, ${g.founded} to ${g.died}. ${STATUS[g.status]}. ${g.causeOfDeath}`}
                >
                  <Tombstone g={g} visited={visited.has(g.slug)} />
                  <span className="gy-caption">
                    <span className="block truncate font-mono text-[9.5px] tracking-[0.1em] uppercase opacity-80">
                      {g.sector} · {g.region === "india" ? "India" : g.country}
                    </span>
                    <span className="mt-1 line-clamp-2 block">{CAUSES[g.cause].label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-24 text-center text-[14px] text-[var(--on-night-2)]">No graves match that. Which is, for once, good news.</p>
        )}
      </div>
    </div>
  );
}
