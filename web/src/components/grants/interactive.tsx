"use client";

import { Check, Table, ChartBar } from "@phosphor-icons/react";
import { useState } from "react";
import type { Series } from "@/content/grants/schema";

/* ───────── "Should I apply?" self-check ───────── */

export function SelfCheck({ criteria, ink }: { criteria: string[]; ink: string }) {
  const [checked, setChecked] = useState<boolean[]>(() => criteria.map(() => false));
  const score = checked.filter(Boolean).length;
  const pct = criteria.length ? Math.round((score / criteria.length) * 100) : 0;
  const verdict =
    score === 0
      ? "Tick every line that's true for you."
      : score === criteria.length
        ? "You meet every listed criterion. This is worth applying for."
        : pct >= 60
          ? "Close. Check the lines you missed; some can be fixed, like registering or joining an incubator."
          : "Probably not yet. Look at similar grants below that fit your stage.";

  return (
    <div>
      <ul className="space-y-2">
        {criteria.map((c, i) => (
          <li key={c}>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-divider bg-surface px-4 py-3 transition-colors hover:border-line-strong">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                className="peer sr-only"
              />
              <span
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-colors"
                style={checked[i] ? { background: ink, borderColor: ink, color: "#fff" } : { borderColor: "var(--border-strong)" }}
                aria-hidden
              >
                {checked[i] && <Check size={12} weight="bold" />}
              </span>
              <span className="text-[14px] leading-relaxed">{c}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl p-4" style={{ background: `color-mix(in srgb, ${ink} 8%, white)` }}>
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.06em] uppercase" style={{ color: ink }}>
          <span>Your match</span>
          <span>{score} / {criteria.length}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: ink }} />
        </div>
        <p className="mt-3 text-[13.5px] font-medium" aria-live="polite">{verdict}</p>
      </div>
    </div>
  );
}

/* ───────── Documents checklist ───────── */

export function DocChecklist({ docs }: { docs: string[] }) {
  const [done, setDone] = useState<Set<number>>(new Set());
  return (
    <div>
      <p className="mb-3 font-mono text-[11px] tracking-[0.06em] text-fg3 uppercase">
        {done.size} of {docs.length} ready
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {docs.map((d, i) => {
          const on = done.has(i);
          return (
            <li key={d}>
              <button
                type="button"
                onClick={() => setDone((prev) => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; })}
                aria-pressed={on}
                className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-2.5 text-left text-[13.5px] leading-snug transition-colors ${on ? "border-[#0f7a43]/40 bg-[#0f7a43]/8 text-fg2 line-through" : "border-divider bg-surface hover:border-line-strong"}`}
              >
                <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${on ? "border-[#0f7a43] bg-[#0f7a43] text-white" : "border-line-strong"}`}>
                  {on && <Check size={9} weight="bold" />}
                </span>
                {d}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ───────── Performance column chart ───────── */

const compact = (n: number) =>
  Math.abs(n) >= 1e7 ? `${+(n / 1e7).toFixed(1)}Cr` : Math.abs(n) >= 1e5 ? `${+(n / 1e5).toFixed(1)}L` : Math.abs(n) >= 1e3 ? `${+(n / 1e3).toFixed(1)}K` : `${+n.toFixed(1)}`;

function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
}

export function SeriesChart({ series, color }: { series: Series; color: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const [asTable, setAsTable] = useState(false);
  const pts = series.points;
  const W = 600, H = 240, L = 44, R = 12, T = 28, B = 34;
  const max = niceMax(Math.max(...pts.map((p) => p.value)));
  const ticks = [0, max / 2, max];
  const band = (W - L - R) / pts.length;
  const bw = Math.min(24, band * 0.55);
  const y = (v: number) => T + (H - T - B) * (1 - v / max);
  const maxIdx = pts.reduce((m, p, i) => (p.value > pts[m].value ? i : m), 0);
  const labelEvery = pts.length > 10 ? 2 : 1;

  return (
    <figure className="grid-card p-5">
      <figcaption className="flex items-start justify-between gap-3">
        <span>
          <span className="block text-[14px] font-semibold">{series.label}</span>
          <span className="block text-[12px] text-fg2">{series.unit}</span>
        </span>
        <button type="button" onClick={() => setAsTable(!asTable)} className="chip !h-7 !px-2.5 !text-[11.5px]">
          {asTable ? <><ChartBar size={12} /> Chart</> : <><Table size={12} /> Table</>}
        </button>
      </figcaption>

      {asTable ? (
        <table className="mt-4 w-full text-[13px]">
          <thead>
            <tr className="border-b border-divider text-left font-mono text-[10px] tracking-[0.06em] text-fg3 uppercase">
              <th className="py-2 font-medium">Period</th>
              <th className="py-2 text-right font-medium">{series.unit}</th>
            </tr>
          </thead>
          <tbody>
            {pts.map((p) => (
              <tr key={p.period} className="border-b border-divider last:border-0">
                <td className="py-1.5">{p.period}</td>
                <td className="py-1.5 text-right tabular-nums">{p.value.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="relative mt-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${series.label}, ${series.unit}, ${pts.map((p) => `${p.period}: ${p.value}`).join("; ")}`}>
            {ticks.map((t) => (
              <g key={t}>
                <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="#ececef" strokeWidth="1" />
                <text x={L - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#929292">{compact(t)}</text>
              </g>
            ))}
            {pts.map((p, i) => {
              const cx = L + band * i + band / 2;
              const h = Math.max(1, y(0) - y(p.value));
              const top = y(p.value);
              const r = Math.min(4, h);
              const showLabel = i === maxIdx || i === pts.length - 1;
              return (
                <g key={p.period}>
                  <path
                    d={`M${cx - bw / 2},${y(0)} V${top + r} Q${cx - bw / 2},${top} ${cx - bw / 2 + r},${top} H${cx + bw / 2 - r} Q${cx + bw / 2},${top} ${cx + bw / 2},${top + r} V${y(0)} Z`}
                    fill={color}
                    opacity={hover === null || hover === i ? 1 : 0.45}
                    style={{ transition: "opacity .15s" }}
                  />
                  {showLabel && (
                    <text x={cx} y={top - 7} textAnchor="middle" fontSize="11" fontWeight="600" fill="#272727">{compact(p.value)}</text>
                  )}
                  {i % labelEvery === 0 && (
                    <text x={cx} y={H - 12} textAnchor="middle" fontSize="10.5" fill="#6e6e6e">{p.period}</text>
                  )}
                  <rect
                    x={L + band * i}
                    y={T - 10}
                    width={band}
                    height={H - T - B + 10}
                    fill="transparent"
                    tabIndex={0}
                    onPointerEnter={() => setHover(i)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    aria-label={`${p.period}: ${p.value.toLocaleString("en-IN")} ${series.unit}`}
                  />
                </g>
              );
            })}
            <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke="#c9c9cf" strokeWidth="1" />
          </svg>
          {hover !== null && (
            <div
              className="pointer-events-none absolute -translate-x-1/2 rounded-lg bg-[#1d1d1d] px-2.5 py-1.5 text-white shadow-lg"
              style={{ left: `${((L + band * hover + band / 2) / W) * 100}%`, top: 0 }}
            >
              <span className="block text-[13px] font-semibold tabular-nums">{pts[hover].value.toLocaleString("en-IN")}</span>
              <span className="block text-[10.5px] text-white/70">{pts[hover].period}</span>
            </div>
          )}
        </div>
      )}
      <p className="mt-3 text-[11.5px] text-fg3">
        Source:{" "}
        <a href={series.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-fg1">
          {series.source.label}
        </a>
      </p>
    </figure>
  );
}
