"use client";

import { type CSSProperties, useState } from "react";
import { CAUSES, KIND, usd } from "@/content/graveyard/labels";
import type { Grave } from "@/content/graveyard/schema";

// Every chart here plots only numbers from the grave's sources (the cause donut is our analysis
// and says so). One axis per chart, thin marks, hover for exact values, a table fallback.

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
/** "Mar 2015" / "2015-03-12" / "Q3 2019" / "2015" → fractional year. */
function when(date: string) {
  const y = Number(date.match(/(19|20)\d{2}/)?.[0] ?? NaN);
  const iso = date.match(/\d{4}-(\d{2})/);
  if (iso) return y + (Number(iso[1]) - 1) / 12;
  const m = MONTHS.findIndex((mm) => date.toLowerCase().includes(mm));
  if (m >= 0) return y + m / 12;
  const q = date.match(/Q([1-4])/i);
  if (q) return y + (Number(q[1]) - 1) / 4 + 0.12;
  return y + 0.5;
}

/* ───────────────────────── The heartbeat that goes flat ───────────────────────── */

export function Lifeline({ g }: { g: Grave }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 1000;
  const H = 190;
  const base = 120;
  const events = g.timeline.map((t, i) => ({ ...t, i, t: when(t.date) })).filter((e) => !Number.isNaN(e.t));
  const alive = events.filter((e) => e.kind !== "after");
  const endT = Math.max(g.died + 0.5, ...alive.map((e) => e.t));
  const t0 = Math.min(g.founded, ...alive.map((e) => e.t));
  const span = Math.max(1, endT - t0);
  const left = 24;
  const right = W - 150; // room for the flatline
  const x = (t: number) => left + ((t - t0) / span) * (right - left);

  // Place pulses on the time axis, nudging apart ones that would overlap.
  const placed: ((typeof alive)[number] & { px: number })[] = [];
  let last = -Infinity;
  for (const e of alive) {
    last = Math.max(x(e.t), last + 34);
    placed.push({ ...e, px: Math.min(last, right) });
  }

  let d = `M0 ${base} L${left} ${base}`;
  const peaks: { px: number; py: number; e: (typeof placed)[number] }[] = [];
  for (const e of placed) {
    const a = KIND[e.kind].amp;
    const p = e.px;
    d += ` L${p - 14} ${base} Q${p - 11} ${base - 6} ${p - 8} ${base}`; // small P wave
    if (e.kind === "crisis") {
      d += ` L${p - 4} ${base + 10} L${p} ${base - a} L${p + 3} ${base + 22} L${p + 6} ${base - a * 0.6} L${p + 9} ${base + 12} L${p + 12} ${base}`;
      peaks.push({ px: p, py: base - a, e });
    } else if (e.kind === "warning") {
      d += ` L${p - 2} ${base + 6} L${p + 1} ${base - a} L${p + 4} ${base + 8} L${p + 7} ${base - a * 0.5} L${p + 10} ${base}`;
      peaks.push({ px: p + 1, py: base - a, e });
    } else {
      d += ` L${p - 3} ${base + 8} L${p} ${base - a} L${p + 4} ${base + 16} L${p + 7} ${base}`;
      peaks.push({ px: p, py: base - a, e });
    }
    d += ` Q${p + 13} ${base - 8} ${p + 19} ${base}`; // T wave
  }
  const flatFrom = Math.max(x(g.died + 0.5), last + 26);
  d += ` L${flatFrom} ${base}`;

  const years: number[] = [];
  const stepY = span > 16 ? 4 : span > 8 ? 2 : 1;
  for (let y = Math.ceil(t0); y <= Math.floor(endT); y += stepY) years.push(y);
  const h = hover === null ? null : peaks.find((p) => p.e.i === hover);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="au-ekg w-full overflow-visible" role="img" aria-label={`Timeline of ${g.name}, ${g.founded} to ${g.died}, ending in a flat line.`}>
        {/* faint ECG paper */}
        <defs>
          <pattern id="au-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#b4231812" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="20" width={W} height={H - 40} fill="url(#au-grid)" rx="8" />
        <path className="beat" d={d} pathLength={1} fill="none" stroke="#1d1d1f" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" style={{ "--len": 1 } as CSSProperties} />
        <path d={`M${flatFrom} ${base} H${W - 8}`} stroke="#b42318" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx={W - 8} cy={base} r="4" fill="#b42318" />
        <circle cx={W - 8} cy={base} r="4" fill="#b42318" className="blip" />
        <text x={W - 8} y={base - 14} textAnchor="end" className="fill-[#b42318] font-mono text-[12px] tracking-[0.1em] uppercase">
          Flatline · {g.died}
        </text>
        {years.map((y) => (
          <g key={y}>
            <line x1={x(y)} x2={x(y)} y1={H - 22} y2={H - 16} stroke="#c9c9cf" />
            <text x={x(y)} y={H - 2} textAnchor="middle" className="fill-[#929292] font-mono text-[11px]">
              {y}
            </text>
          </g>
        ))}
        {peaks.map((p) => (
          <g key={p.e.i} onMouseEnter={() => setHover(p.e.i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(p.e.i)} onBlur={() => setHover(null)} tabIndex={0} className="cursor-pointer outline-none">
            <circle cx={p.px} cy={p.py} r="14" fill="transparent" />
            <circle cx={p.px} cy={p.py} r={hover === p.e.i ? 6 : 4.5} fill={KIND[p.e.kind].color} stroke="#fbfaf7" strokeWidth="2" />
          </g>
        ))}
      </svg>
      {h && (
        <div className="au-tip" style={{ left: `${(h.px / W) * 100}%`, top: `${(h.py / H) * 100}%`, whiteSpace: "normal", width: 260 }}>
          <span className="block font-mono text-[10px] tracking-[0.08em] text-white/60 uppercase">
            {h.e.date} · {KIND[h.e.kind].label}
          </span>
          {h.e.event}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── The money: in, at the top, at the end ───────────────────────── */

export function MoneyFall({ g }: { g: Grave }) {
  const rows = [
    { label: "Money raised", v: g.raisedUsdM, color: "#2a78d6" },
    { label: "Peak valuation", v: g.peakValuationUsdM, color: "#1d1d1f" },
    { label: "Worth at the end", v: g.endValueUsdM, color: "#b42318" },
  ];
  const max = Math.max(1, ...rows.map((r) => r.v ?? 0));
  const lost = g.peakValuationUsdM && g.endValueUsdM !== null ? 1 - g.endValueUsdM / g.peakValuationUsdM : null;

  return (
    <div>
      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[120px_1fr] items-center gap-4 sm:grid-cols-[150px_1fr]">
            <span className="flex items-center gap-2 text-[13px] text-fg2">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.color }} />
              {r.label}
            </span>
            <div className="flex items-center gap-3">
              {r.v === null ? (
                <span className="h-6 flex-1 rounded-[4px] border border-dashed border-line" />
              ) : (
                <span className="h-6 rounded-r-[4px] transition-[width] duration-700" style={{ width: `${Math.max(0.6, (r.v / max) * 82)}%`, background: r.color, minWidth: 3 }} />
              )}
              <span className="font-mono text-[13px] whitespace-nowrap text-fg1">{r.v === null ? "Not disclosed" : usd(r.v)}</span>
            </div>
          </div>
        ))}
      </div>
      {lost !== null && lost > 0 && (
        <p className="mt-6 text-[15px] text-fg2">
          From its peak, <span className="font-semibold text-[#b42318]">{lost >= 0.995 ? "all" : `${Math.round(lost * 100)}%`}</span> of the value was wiped out.
        </p>
      )}
      <p className="mt-3 text-[12px] leading-relaxed text-fg3">{g.moneyNote}</p>
    </div>
  );
}

/* ───────────────────────── Cause of death (our analysis) ───────────────────────── */

// One ordinal ramp, darkest = biggest cause. Identity is carried by the labelled legend.
const RAMP = ["#7a1a12", "#b42318", "#d9532f", "#e8845f"];

export function CauseDonut({ causes }: { causes: Grave["causes"] }) {
  const [hover, setHover] = useState<number | null>(null);
  const list = [...causes].sort((a, b) => b.weight - a.weight);
  const R = 70;
  const r = 46;
  const gap = 0.025; // radians of surface between slices
  const p = (rad: number, rr: number) => `${100 + rr * Math.cos(rad)} ${100 + rr * Math.sin(rad)}`;
  const arcs: { c: (typeof list)[number]; i: number; d: string }[] = [];
  let a0 = -Math.PI / 2;
  for (const [i, c] of list.entries()) {
    const sweep = (c.weight / 100) * Math.PI * 2;
    const s = a0 + gap / 2;
    const e = a0 + sweep - gap / 2;
    a0 += sweep;
    const big = e - s > Math.PI ? 1 : 0;
    arcs.push({ c, i, d: `M${p(s, R)} A${R} ${R} 0 ${big} 1 ${p(e, R)} L${p(e, r)} A${r} ${r} 0 ${big} 0 ${p(s, r)} Z` });
  }
  const top = list[hover ?? 0];

  return (
    <div className="grid items-center gap-8 sm:grid-cols-[220px_1fr]">
      <svg viewBox="0 0 200 200" className="mx-auto w-[220px]" role="img" aria-label={list.map((c) => `${CAUSES[c.key].label} ${c.weight}%`).join(", ")}>
        {arcs.map(({ c, i, d }) => (
          <path
            key={c.key}
            d={d}
            fill={RAMP[i] ?? RAMP[RAMP.length - 1]}
            opacity={hover === null || hover === i ? 1 : 0.35}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="cursor-pointer transition-opacity"
          />
        ))}
        <text x="100" y="98" textAnchor="middle" className="fill-[#1d1d1f] text-[26px] font-semibold">
          {top.weight}%
        </text>
        <text x="100" y="116" textAnchor="middle" className="fill-[#6e6e6e] font-mono text-[7.5px] tracking-[0.04em] uppercase">
          {CAUSES[top.key].short}
        </text>
      </svg>
      <ul className="space-y-3">
        {list.map((c, i) => (
          <li key={c.key} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="flex gap-3">
            <span className="mt-1.5 h-3 w-3 shrink-0 rounded-[3px]" style={{ background: RAMP[i] ?? RAMP[RAMP.length - 1] }} />
            <span className="min-w-0">
              <span className="flex items-baseline gap-2">
                <span className="text-[15px] font-medium">{CAUSES[c.key].label}</span>
                <span className="font-mono text-[12px] text-fg2">{c.weight}%</span>
              </span>
              <span className="block text-[13px] text-fg2">{CAUSES[c.key].line}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────── Data charts (bar / line), one axis ───────────────────────── */

function ticks(min: number, max: number, n = 4) {
  const raw = (max - min) / n || 1;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const out = [];
  for (let v = lo; v <= hi + step / 2; v += step) out.push(Number(v.toFixed(6)));
  return out;
}
const compact = (v: number) => (Math.abs(v) >= 1000 ? `${(v / 1000).toFixed(Math.abs(v) >= 10000 ? 0 : 1).replace(/\.0$/, "")}K` : `${Number(v.toFixed(1))}`);

const SERIES = ["var(--s1)", "var(--s2)"];

export function DataChart({ c }: { c: Grave["charts"][number] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);
  const W = 640;
  const H = 260;
  const m = { l: 44, r: 12, t: 16, b: 28 };
  const vals = c.series.flatMap((s) => s.values).filter((v): v is number => v !== null);
  if (!vals.length) return null;
  const tk = ticks(Math.min(0, ...vals), Math.max(0, ...vals));
  const lo = tk[0];
  const hi = tk[tk.length - 1];
  const y = (v: number) => m.t + (1 - (v - lo) / (hi - lo || 1)) * (H - m.t - m.b);
  const band = (W - m.l - m.r) / c.labels.length;
  const cx = (i: number) => m.l + band * i + band / 2;
  const nS = c.series.length;
  const bw = Math.min(24, (band * 0.7) / nS);

  return (
    <figure>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-3">
        <span>
          <span className="block text-[16px] font-semibold tracking-[-0.01em]">{c.title}</span>
          <span className="font-mono text-[11px] text-fg3">{c.unit}</span>
        </span>
        <span className="flex items-center gap-4">
          {nS > 1 &&
            c.series.map((s, i) => (
              <span key={s.name} className="flex items-center gap-1.5 text-[12.5px] text-fg2">
                <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: SERIES[i] }} />
                {s.name}
              </span>
            ))}
          <button type="button" onClick={() => setTable(!table)} className="font-mono text-[10.5px] tracking-[0.06em] text-fg3 uppercase hover:text-fg1">
            {table ? "Chart" : "Table"}
          </button>
        </span>
      </figcaption>

      {table ? (
        <table className="mt-4 w-full text-[13px]">
          <thead>
            <tr className="border-b border-line text-left text-fg2">
              <th className="py-2 font-medium">Year</th>
              {c.series.map((s) => (
                <th key={s.name} className="py-2 text-right font-medium">
                  {s.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.labels.map((l, i) => (
              <tr key={l} className="border-b border-divider">
                <td className="py-1.5">{l}</td>
                {c.series.map((s) => (
                  <td key={s.name} className="py-1.5 text-right font-mono">
                    {s.values[i] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="relative mt-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" onMouseLeave={() => setHover(null)}>
            {tk.map((t) => (
              <g key={t}>
                <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#c9c9cf" : "#ebe8e1"} />
                <text x={m.l - 8} y={y(t) + 4} textAnchor="end" className="fill-[#929292] font-mono text-[10.5px]">
                  {compact(t)}
                </text>
              </g>
            ))}
            {c.labels.map((l, i) => (
              <text key={l} x={cx(i)} y={H - 8} textAnchor="middle" className="fill-[#6e6e6e] font-mono text-[10.5px]">
                {l}
              </text>
            ))}
            {hover !== null && <rect x={m.l + band * hover} y={m.t} width={band} height={H - m.t - m.b} fill="#1d1d1f08" />}

            {c.kind === "bar"
              ? c.series.map((s, si) =>
                  s.values.map((v, i) => {
                    if (v === null) return null;
                    const x0 = cx(i) - (bw * nS + 2 * (nS - 1)) / 2 + si * (bw + 2);
                    const top = Math.min(y(v), y(0));
                    const h = Math.max(1, Math.abs(y(v) - y(0)));
                    const r = Math.min(4, h);
                    // 4px rounded data-end, square at the baseline (both directions).
                    const d =
                      v >= 0
                        ? `M${x0} ${top + h} V${top + r} Q${x0} ${top} ${x0 + r} ${top} H${x0 + bw - r} Q${x0 + bw} ${top} ${x0 + bw} ${top + r} V${top + h} Z`
                        : `M${x0} ${top} V${top + h - r} Q${x0} ${top + h} ${x0 + r} ${top + h} H${x0 + bw - r} Q${x0 + bw} ${top + h} ${x0 + bw} ${top + h - r} V${top} Z`;
                    return <path key={`${si}-${i}`} d={d} fill={SERIES[si]} />;
                  }),
                )
              : c.series.map((s, si) => {
                  const pts = s.values.map((v, i) => (v === null ? null : [cx(i), y(v)] as const));
                  const segs = pts.reduce<string>((acc, p, i) => (p ? acc + `${acc && pts[i - 1] ? "L" : "M"}${p[0]} ${p[1]} ` : acc), "");
                  const lastI = pts.map((p, i) => (p ? i : -1)).filter((i) => i >= 0).pop();
                  return (
                    <g key={s.name}>
                      <path d={segs} fill="none" stroke={SERIES[si]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                      {pts.map((p, i) => p && (hover === i || i === lastI) && <circle key={i} cx={p[0]} cy={p[1]} r="4.5" fill={SERIES[si]} stroke="#fff" strokeWidth="2" />)}
                    </g>
                  );
                })}

            {c.labels.map((l, i) => (
              <rect key={l} x={m.l + band * i} y={0} width={band} height={H} fill="transparent" onMouseEnter={() => setHover(i)} />
            ))}
          </svg>
          {hover !== null && (
            <div className="au-tip" style={{ left: `${(cx(hover) / W) * 100}%`, top: `${(m.t / H) * 100}%` }}>
              <span className="block font-mono text-[10px] text-white/60">{c.labels[hover]}</span>
              {c.series.map((s, si) => (
                <span key={s.name} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: SERIES[si] }} />
                  {s.name}: <b className="font-mono font-medium">{s.values[hover] ?? "n/a"}</b>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <p className="mt-3 text-[14px] text-fg2">{c.takeaway}</p>
    </figure>
  );
}

/* ───────────────────────── Funding rounds ───────────────────────── */

export function Rounds({ rounds }: { rounds: Grave["rounds"] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...rounds.map((r) => r.amountUsdM ?? 0));
  return (
    <div className="relative">
      <div className="flex h-[200px] items-end gap-[2px] border-b border-line" onMouseLeave={() => setHover(null)}>
        {rounds.map((r, i) => (
          <button
            type="button"
            key={i}
            className="relative flex h-full flex-1 items-end justify-center"
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            aria-label={`${r.round}, ${r.date}: ${usd(r.amountUsdM)}`}
          >
            {hover === i && <span className="absolute inset-0 rounded-t-md bg-[#1d1d1f08]" />}
            <span
              className="relative w-full max-w-[24px] rounded-t-[4px]"
              style={{
                height: r.amountUsdM ? `${Math.max(2, (r.amountUsdM / max) * 100)}%` : 6,
                background: r.amountUsdM ? "var(--s1)" : "transparent",
                boxShadow: r.amountUsdM ? undefined : "inset 0 0 0 1px #c9c9cf",
              }}
            />
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-[2px]">
        {rounds.map((r, i) => (
          <span key={i} className="min-w-0 flex-1 text-center" title={`${r.round}, ${r.date}`}>
            <span className="block truncate text-[11px] text-fg2">{r.round.replace(/^Series\s+/i, "")}</span>
            <span className="block font-mono text-[9.5px] text-fg3">{r.date.match(/(19|20)\d{2}/)?.[0] ?? r.date}</span>
          </span>
        ))}
      </div>
      {hover !== null && (
        <div className="au-tip" style={{ left: `${((hover + 0.5) / rounds.length) * 100}%`, top: 0, whiteSpace: "normal", width: 240 }}>
          <span className="block font-mono text-[10px] text-white/60">
            {rounds[hover].date} · {rounds[hover].round}
          </span>
          Raised <b>{usd(rounds[hover].amountUsdM)}</b>
          {rounds[hover].valuationUsdM ? ` at a ${usd(rounds[hover].valuationUsdM)} valuation` : ""}
          {rounds[hover].investors.length > 0 && <span className="mt-1 block text-white/70">{rounds[hover].investors.slice(0, 4).join(", ")}</span>}
        </div>
      )}
    </div>
  );
}
