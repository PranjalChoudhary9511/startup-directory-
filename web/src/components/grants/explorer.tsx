"use client";

import { ArrowCounterClockwise, MagnifyingGlass } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { isEquityFree, STAGE_LABEL, type GrantCard as Card } from "@/content/grants/labels";
import type { ProviderType, Stage } from "@/content/grants/schema";
import { GrantCard } from "./grant-card";

// Stylised tile map (not to scale): [state, short label, column, row].
const TILES: [string, string, number, number][] = [
  ["Jammu & Kashmir", "J&K", 3, 0],
  ["Chandigarh", "CH", 1, 1], ["Punjab", "PB", 2, 1], ["Himachal Pradesh", "HP", 3, 1], ["Uttarakhand", "UK", 4, 1],
  ["Rajasthan", "RJ", 1, 2], ["Haryana", "HR", 2, 2], ["Delhi", "DL", 3, 2], ["Uttar Pradesh", "UP", 4, 2], ["Bihar", "BR", 5, 2], ["Sikkim", "SK", 6, 2], ["Assam", "AS", 7, 2], ["Arunachal Pradesh", "AR", 8, 2],
  ["Gujarat", "GJ", 1, 3], ["Madhya Pradesh", "MP", 2, 3], ["Chhattisgarh", "CG", 3, 3], ["Jharkhand", "JH", 4, 3], ["West Bengal", "WB", 5, 3], ["Meghalaya", "ML", 6, 3], ["Nagaland", "NL", 8, 3],
  ["Maharashtra", "MH", 2, 4], ["Telangana", "TS", 3, 4], ["Odisha", "OD", 4, 4], ["Tripura", "TR", 6, 4], ["Manipur", "MN", 7, 4],
  ["Goa", "GA", 1, 5], ["Karnataka", "KA", 2, 5], ["Andhra Pradesh", "AP", 3, 5], ["Mizoram", "MZ", 7, 5],
  ["Kerala", "KL", 2, 6], ["Tamil Nadu", "TN", 3, 6], ["Puducherry", "PY", 4, 6],
];

type Need = "any" | "cash" | "loan" | "credits" | "support";
const NEEDS: { key: Need; label: string; match: string[] }[] = [
  { key: "any", label: "Anything", match: [] },
  { key: "cash", label: "Free cash", match: ["grant", "prize", "fellowship", "subsidy"] },
  { key: "loan", label: "Loans & debt", match: ["seed-loan", "loan", "guarantee", "convertible"] },
  { key: "credits", label: "Cloud & AI credits", match: ["credits"] },
  { key: "support", label: "Incubation & tax", match: ["incubation", "tax-benefit", "equity"] },
];
const TYPES: { key: ProviderType | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "central", label: "Central govt" },
  { key: "state", label: "State govt" },
  { key: "private", label: "Private · India" },
  { key: "global", label: "Global" },
];
const STAGES: Stage[] = ["student", "idea", "prototype", "early-revenue", "growth"];
// "Open first" ordering: what a founder can act on today comes first.
const STATUS_RANK: Record<Card["status"], number> = { open: 0, rolling: 0, "call-based": 1, unverified: 2, closed: 3 };
type Sort = "open" | "amount" | "name";

function Question({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[13px] font-semibold">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0d3b2e] font-mono text-[10px] text-white">{n}</span>
        {title}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export function GrantsExplorer({ grants }: { grants: Card[] }) {
  const [type, setType] = useState<ProviderType | "all">("all");
  const [stage, setStage] = useState<Stage | null>(null);
  const [need, setNeed] = useState<Need>("any");
  const [equityFree, setEquityFree] = useState(false);
  const [region, setRegion] = useState<string | null>(null);
  const [openOnly, setOpenOnly] = useState(false);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("open");

  const stateCounts = useMemo(() => {
    const m = new Map<string, number>();
    grants.forEach((g) => g.state && m.set(g.state, (m.get(g.state) ?? 0) + 1));
    return m;
  }, [grants]);

  const results = useMemo(() => {
    const needMatch = NEEDS.find((n) => n.key === need)!.match;
    const term = q.trim().toLowerCase();
    return grants
      .filter((g) => type === "all" || g.providerType === type)
      .filter((g) => !stage || g.stages.includes(stage))
      .filter((g) => !needMatch.length || g.instrument.some((i) => needMatch.includes(i)))
      .filter((g) => !equityFree || isEquityFree(g))
      .filter((g) => !region || g.state === region || g.state === null)
      .filter((g) => !openOnly || g.status === "open" || g.status === "rolling")
      .filter((g) => !term || `${g.name} ${g.shortName} ${g.provider} ${g.oneLiner} ${g.sectors.join(" ")} ${g.state ?? ""}`.toLowerCase().includes(term))
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        const byAmount = (b.maxAmountINR ?? -1) - (a.maxAmountINR ?? -1);
        return sort === "amount" ? byAmount : STATUS_RANK[a.status] - STATUS_RANK[b.status] || byAmount;
      });
  }, [grants, type, stage, need, equityFree, region, openOnly, q, sort]);

  const typeCount = (k: ProviderType | "all") => (k === "all" ? grants.length : grants.filter((g) => g.providerType === k).length);
  const dirty = type !== "all" || stage || need !== "any" || equityFree || region || openOnly || q;
  const reset = () => {
    setType("all"); setStage(null); setNeed("any"); setEquityFree(false); setRegion(null); setOpenOnly(false); setQ("");
  };

  return (
    <div>
      {/* Finder */}
      <section id="finder" className="grid scroll-mt-20 gap-6 lg:grid-cols-[1.25fr_1fr]">
        <div className="grid-card p-6 sm:p-8">
          <p className="mono-eyebrow">Grant finder</p>
          <h2 className="mt-2 text-[26px] leading-tight font-semibold tracking-[-0.02em]">
            Three taps. <span className="accent-display">Your shortlist.</span>
          </h2>
          <div className="mt-6 space-y-5">
            <Question n="1" title="Where are you right now?">
              {STAGES.map((s) => (
                <button key={s} type="button" onClick={() => setStage(stage === s ? null : s)} className={`chip ${stage === s ? "is-on" : ""}`}>
                  {STAGE_LABEL[s]}
                </button>
              ))}
            </Question>
            <Question n="2" title="What do you need most?">
              {NEEDS.map((n) => (
                <button key={n.key} type="button" onClick={() => setNeed(n.key)} className={`chip ${need === n.key ? "is-on" : ""}`}>
                  {n.label}
                </button>
              ))}
            </Question>
            <Question n="3" title="Must you keep 100% of your company?">
              <button type="button" onClick={() => setEquityFree(true)} className={`chip ${equityFree ? "is-on" : ""}`}>Yes, no equity</button>
              <button type="button" onClick={() => setEquityFree(false)} className={`chip ${!equityFree ? "is-on" : ""}`}>Open to equity</button>
            </Question>
          </div>
        </div>

        <div className="grid-card p-6">
          <div className="flex items-baseline justify-between">
            <p className="mono-eyebrow">Your state</p>
            {region && (
              <button type="button" onClick={() => setRegion(null)} className="text-[12px] font-medium text-fg2 underline underline-offset-2">
                Clear
              </button>
            )}
          </div>
          <p className="mt-1 text-[13px] text-fg2">
            {region ? (
              <>
                <strong className="text-fg1">{region}</strong> schemes, plus everything open to all of India.
              </>
            ) : (
              "Tap your state to add its schemes to national ones."
            )}
          </p>
          <div className="tile-map mt-4" role="group" aria-label="Filter by state">
            {TILES.map(([name, short, c, r]) => {
              const count = stateCounts.get(name) ?? 0;
              const on = region === name;
              return (
                <button
                  key={name}
                  type="button"
                  disabled={!count}
                  onClick={() => setRegion(on ? null : name)}
                  title={`${name}: ${count} scheme${count === 1 ? "" : "s"}`}
                  aria-pressed={on}
                  className="tile"
                  style={{
                    gridColumn: c + 1,
                    gridRow: r + 1,
                    background: on ? "#0d3b2e" : count ? `color-mix(in srgb, #1f6b4f ${Math.min(18 + count * 14, 70)}%, #eef4ee)` : "#f1f1f3",
                    color: on || count > 3 ? "#fff" : count ? "#0d3b2e" : "#b5b5bb",
                    cursor: count ? "pointer" : "default",
                  }}
                >
                  <span>
                    {short}
                    {count > 0 && <span className="block text-[8px] font-medium opacity-80">{count}</span>}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 font-mono text-[9px] tracking-[0.08em] text-fg3 uppercase">Stylised tile map · not to scale · darker = more schemes</p>
        </div>
      </section>

      {/* Filter row */}
      <div className="sticky top-16 z-20 -mx-2 mt-12 rounded-2xl bg-bg/90 px-2 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-1" role="tablist" aria-label="Grant type">
            {TYPES.map((t) => (
              <button key={t.key} type="button" role="tab" aria-selected={type === t.key} onClick={() => setType(t.key)} className={`tab ${type === t.key ? "is-active" : ""}`}>
                {t.label} <span className="count">{typeCount(t.key)}</span>
              </button>
            ))}
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <label className="flex h-9 items-center gap-2 rounded-[9px] border border-line bg-surface px-3">
              <MagnifyingGlass size={14} className="text-fg3" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search grants, sectors…" aria-label="Search grants" className="w-44 bg-transparent text-[13px] outline-none placeholder:text-fg3" />
            </label>
            <button type="button" onClick={() => setOpenOnly(!openOnly)} className={`chip ${openOnly ? "is-on" : ""}`}>Open now</button>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort" className="h-[30px] rounded-full border border-line bg-surface px-3 text-[12.5px] text-fg2">
              <option value="open">Open first</option>
              <option value="amount">Biggest first</option>
              <option value="name">A–Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[13px] text-fg2">
        <p>
          <strong className="text-fg1">{results.length}</strong> of {grants.length} grants & schemes
        </p>
        {dirty && (
          <button type="button" onClick={reset} className="flex items-center gap-1.5 font-medium hover:text-fg1">
            <ArrowCounterClockwise size={13} /> Reset filters
          </button>
        )}
      </div>

      {results.length ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((g) => <GrantCard key={g.slug} g={g} />)}
        </div>
      ) : (
        <div className="grid-card mt-4 p-10 text-center">
          <p className="text-[15px] font-semibold">No grant matches all of that.</p>
          <p className="mt-1 text-[13px] text-fg2">Loosen one filter, often the equity or stage one, and you&apos;ll see options.</p>
          <button type="button" onClick={reset} className="btn-secondary mt-4 !h-9">Reset filters</button>
        </div>
      )}
    </div>
  );
}
