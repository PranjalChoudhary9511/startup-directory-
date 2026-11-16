import {
  Bank,
  Buildings,
  ChartLineUp,
  Cloud,
  Cpu,
  Factory,
  Flask,
  GenderFemale,
  Globe,
  GraduationCap,
  HandCoins,
  Leaf,
  MapTrifold,
  Medal,
  Plant,
  Receipt,
  Rocket,
  ShieldStar,
  Trophy,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { createElement } from "react";
import { STATUS_LABEL } from "@/content/grants/labels";
import type { Grant, GrantStatus, ProviderType } from "@/content/grants/schema";

export const PROVIDER_THEME: Record<ProviderType, { ink: string; paper: string; tint: string; label: string }> = {
  central: { ink: "#0d3b2e", paper: "#eaf2ea", tint: "#cfe3d2", label: "Government of India" },
  state: { ink: "#1f3a8a", paper: "#ebeefa", tint: "#cfd7f3", label: "State government" },
  private: { ink: "#6b2148", paper: "#f7ebf0", tint: "#ecd0dc", label: "Private · India" },
  global: { ink: "#0f5b66", paper: "#e5f2f3", tint: "#c7e4e7", label: "Global programme" },
};

const STATUS_TONE: Record<GrantStatus, string> = {
  open: "#0f7a43",
  rolling: "#0f7a43",
  "call-based": "#b26a00",
  closed: "#a12a2a",
  unverified: "#6e6e6e",
};

/** Rubber-stamp status mark. */
export function StatusStamp({ status, size = "md" }: { status: GrantStatus; size?: "sm" | "md" | "lg" }) {
  const tone = STATUS_TONE[status];
  const cls = size === "lg" ? "px-3 py-1.5 text-[13px]" : size === "sm" ? "px-1.5 py-[2px] text-[9px]" : "px-2 py-1 text-[10px]";
  return (
    <span
      className={`stamp inline-flex items-center font-mono font-bold tracking-[0.14em] uppercase ${cls}`}
      style={{ color: tone, borderColor: tone }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

/* ───────── Mint seal ─────────
   A coin-like emblem per grant: serrated rim, an engraved rosette generated from the
   grant's slug (unique per grant, like a banknote watermark) and a centre icon that says
   what the grant is about. No real logos or government emblems are used. */

type SealGrant = Pick<Grant, "slug" | "name" | "providerType" | "instrument" | "sectors" | "stages">;

const DEFAULT_ICON: Record<ProviderType, Icon> = { central: Bank, state: MapTrifold, private: Buildings, global: Globe };

const SECTOR_ICONS: [RegExp, Icon][] = [
  [/biotech|\bbio|health|medtech|\bmed\b|pharma|life science/, Flask],
  [/agri|food|farm|fisher|dairy/, Plant],
  [/defen|aerospace|military|\bidex\b/, ShieldStar],
  [/climate|clean ?tech|energy|sustainab|green/, Leaf],
  [/\bai\b|deep ?tech|\bict\b|electronic|semicon|software|digital/, Cpu],
  [/manufactur/, Factory],
];

/**
 * Picks the icon by what the grant is about: audience (from its name), then a sector named
 * in its title, then loans, then a single clear sector, then the instrument.
 */
export function sealIcon(g: SealGrant): Icon {
  // Drop parentheticals like "(including Women/Transgender …)" so they don't set the audience.
  const name = g.name.toLowerCase().replace(/\(including[^)]*\)/g, "");
  const has = (i: string) => g.instrument.includes(i as Grant["instrument"][number]);
  if (/women|mahila|\bshe\b|we hub|cartier/.test(name)) return GenderFemale;
  if ((g.stages.length && g.stages.every((s) => s === "student")) || /school|student|hackathon|inspire|tinkering|junior|yuva/.test(name)) return GraduationCap;
  if (has("credits")) return Cloud;
  const byName = SECTOR_ICONS.find(([re]) => re.test(name));
  if (byName) return byName[1];
  if (has("guarantee") || has("loan") || has("seed-loan")) return Bank;
  if (has("prize")) return Trophy;
  if (has("fellowship")) return Medal;
  // A sector icon only when the grant points at exactly one sector family.
  const sectorText = g.sectors.join(" ").toLowerCase();
  const families = SECTOR_ICONS.filter(([re]) => re.test(sectorText));
  if (families.length === 1 && g.sectors.length <= 3) return families[0][1];
  if (has("tax-benefit")) return Receipt;
  if (has("equity")) return ChartLineUp;
  if (has("incubation")) return Rocket;
  if (has("subsidy")) return HandCoins;
  if (g.providerType === "state") return MapTrifold;
  if (has("grant")) return HandCoins;
  return DEFAULT_ICON[g.providerType];
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

/** Hypotrochoid path fitted inside a circle of radius `fit`, centred at 50,50. */
function rosette(R: number, r: number, d: number, fit: number, rot: number) {
  const k = (R - r) / r;
  const turns = r / gcd(R, r);
  const steps = 140 * turns;
  const scale = fit / (R - r + d);
  const c = Math.cos(rot), s = Math.sin(rot);
  let p = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * turns;
    const x = ((R - r) * Math.cos(t) + d * Math.cos(k * t)) * scale;
    const y = ((R - r) * Math.sin(t) - d * Math.sin(k * t)) * scale;
    p += `${i ? "L" : "M"}${(50 + x * c - y * s).toFixed(2)},${(50 + x * s + y * c).toFixed(2)}`;
  }
  return p + "Z";
}

/** Serrated coin rim. */
function rim(teeth: number, outer: number, inner: number) {
  let p = "";
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const rad = i % 2 ? inner : outer;
    p += `${i ? "L" : "M"}${(50 + rad * Math.cos(a)).toFixed(2)},${(50 + rad * Math.sin(a)).toFixed(2)}`;
  }
  return p + "Z";
}

// Small-circle radii that divide 60 nicely, so every rosette closes in a few turns.
const R_CHOICES = [12, 15, 20, 24, 25, 30, 36, 40, 45, 48];

export function Seal({ grant, size = 52 }: { grant: SealGrant; size?: number }) {
  const t = PROVIDER_THEME[grant.providerType];
  const h = hash(grant.slug);
  const r1 = R_CHOICES[h % R_CHOICES.length];
  const r2 = R_CHOICES[(h >>> 4) % R_CHOICES.length];
  const d1 = 14 + ((h >>> 8) % 18);
  const d2 = 8 + ((h >>> 13) % 12);
  const rot = ((h >>> 17) % 60) * (Math.PI / 180);

  return (
    <span className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 100 100" width={size} height={size} className="absolute inset-0">
        <path d={rim(30, 49.5, 46)} fill={t.paper} stroke={t.ink} strokeWidth="1.1" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="42.5" fill="none" stroke={t.ink} strokeWidth="1.6" />
        <circle cx="50" cy="50" r="39.6" fill="none" stroke={t.ink} strokeWidth="0.7" strokeDasharray="0.9 1.9" />
        <g fill="none" stroke={t.ink} strokeLinejoin="round">
          <path d={rosette(60, r1, d1, 37, rot)} strokeWidth="0.65" opacity="0.7" />
          <path d={rosette(60, r2, d2, 30, -rot)} strokeWidth="0.5" opacity="0.45" />
        </g>
        <circle cx="50" cy="50" r="18.5" fill={t.ink} />
        <circle cx="50" cy="50" r="16.2" fill="none" stroke={t.paper} strokeWidth="0.6" opacity="0.6" />
      </svg>
      {createElement(sealIcon(grant), { size: Math.round(size * 0.27), weight: "bold", color: "#fff", className: "relative" })}
    </span>
  );
}
