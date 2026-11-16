import type { CSSProperties } from "react";
import { type GraveCard, seeded, usd } from "@/content/graveyard/labels";

// A carved headstone, drawn in CSS: the body is a div clipped to one of five silhouettes, so
// texture, shading and hover light are plain backgrounds. Height encodes money raised (log
// scale), a crack means fraud, and a white flower means this reader has opened the autopsy.

const W = 160;
type Shape = (t: number, b: number) => string;
const SHAPES: { d: Shape; inset: number }[] = [
  { d: (t, b) => `M16 ${b} V${t + 64} A64 64 0 0 1 144 ${t + 64} V${b} Z`, inset: 30 }, // round
  { d: (t, b) => `M16 ${b} V${t + 56} Q16 ${t + 14} 80 ${t} Q144 ${t + 14} 144 ${t + 56} V${b} Z`, inset: 30 }, // gothic arch
  { d: (t, b) => `M16 ${b} V${t + 44} C16 ${t + 20} 58 ${t + 26} 80 ${t} C102 ${t + 26} 144 ${t + 20} 144 ${t + 44} V${b} Z`, inset: 30 }, // ogee
  { d: (t, b) => `M16 ${b} V${t + 34} H32 V${t + 16} Q80 ${t - 6} 128 ${t + 16} V${t + 34} H144 V${b} Z`, inset: 24 }, // shouldered
  { d: (t, b) => `M20 ${b} V${t + 10} L30 ${t} H130 L140 ${t + 10} V${b} Z`, inset: 18 }, // bevelled slab
];
const MATERIALS = ["limestone", "granite", "slate", "sandstone"] as const;

/** Taller for bigger burns: ~$1M → 182px, ~$20B → 272px. Unknown → a modest stone. */
export function stoneHeight(raisedUsdM: number | null) {
  if (!raisedUsdM) return 186;
  return Math.round(Math.min(274, Math.max(178, 178 + Math.log10(raisedUsdM + 1) * 22)));
}

function onBrand(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 165 ? "#1d1d1d" : "#fff";
}

type StoneData = Pick<GraveCard, "slug" | "name" | "founded" | "died" | "epitaph" | "raisedUsdM" | "brandColor" | "causes">;

export function Tombstone({ g, visited, size = 1, still }: { g: StoneData; visited?: boolean; size?: number; still?: boolean }) {
  const H = stoneHeight(g.raisedUsdM);
  const shape = SHAPES[Math.floor(seeded(g.slug, 1) * SHAPES.length)];
  const material = MATERIALS[Math.floor(seeded(g.slug, 2) * MATERIALS.length)];
  const tilt = still ? 0 : (seeded(g.slug, 3) - 0.5) * 4.5;
  const cracked = g.causes.slice(0, 2).includes("fraud");
  const top = 2;
  const bottom = H;
  // Fit the longest word on one line (108px of face, Sora bold caps ≈ 0.86em per letter).
  const longest = Math.max(...g.name.split(/\s+/).map((w) => w.length));
  const nameSize = Math.min(16, 100 / (longest * 0.86), g.name.length > 14 ? 13 : 16);

  return (
    <div
      className={`gy-stone gy-${material}`}
      style={{ width: W, height: H + 14, "--tilt": `${tilt}deg`, "--brand": g.brandColor, zoom: size === 1 ? undefined : size } as CSSProperties}
    >
      <div className="gy-stone-glow" aria-hidden />
      <div className="gy-stone-body" style={{ clipPath: `path("${shape.d(top, bottom)}")`, height: H }}>
        <div className="gy-stone-grain" aria-hidden />
        {cracked && (
          <svg className="absolute inset-0" width={W} height={H} aria-hidden>
            <path
              d={`M${108 + seeded(g.slug, 4) * 20} ${top} l-9 ${H * 0.14} l11 ${H * 0.1} l-14 ${H * 0.16} l8 ${H * 0.12} l-12 ${H * 0.2}`}
              fill="none"
              stroke="rgba(255,255,255,.35)"
              strokeWidth="1.2"
              transform="translate(1 1)"
            />
            <path
              d={`M${108 + seeded(g.slug, 4) * 20} ${top} l-9 ${H * 0.14} l11 ${H * 0.1} l-14 ${H * 0.16} l8 ${H * 0.12} l-12 ${H * 0.2} m12 -${H * 0.2} l9 ${H * 0.06}`}
              fill="none"
              stroke="rgba(15,15,25,.62)"
              strokeWidth="1.3"
              strokeLinejoin="bevel"
            />
          </svg>
        )}
        <svg className="absolute bottom-0 left-0" width={W} height={46} aria-hidden>
          <ellipse cx={20 + seeded(g.slug, 5) * 30} cy={46} rx={34} ry={14} className="gy-moss" />
          <ellipse cx={120 + seeded(g.slug, 6) * 20} cy={48} rx={22} ry={8} className="gy-moss" />
        </svg>
        <div className="gy-engrave" style={{ paddingTop: shape.inset }}>
          <span className="gy-medal" style={{ background: g.brandColor, color: onBrand(g.brandColor) }}>
            {g.name.replace(/^the\s+/i, "")[0]}
          </span>
          <span className="gy-name" style={{ fontSize: nameSize }}>
            {g.name}
          </span>
          <span className="gy-years">
            {g.founded} — {g.died}
          </span>
          <span className="gy-rule" />
          <span className="gy-epitaph">{g.epitaph}</span>
          <span className="gy-raised">{g.raisedUsdM ? `raised ${usd(g.raisedUsdM)}` : " "}</span>
        </div>
      </div>
      <div className="gy-plinth" />
      <svg className="gy-grass" width={W + 40} height={26} viewBox={`0 0 ${W + 40} 26`} aria-hidden>
        {/* Two tufts at the corners, fanned, never a fence of blades. */}
        {[8, W + 18, 26 + seeded(g.slug, 9) * 60].map((cx, t) => {
          const blades = t === 2 ? 4 : 7;
          return Array.from({ length: blades }, (_, i) => {
            const spread = (i / (blades - 1) - 0.5) * 2;
            const h = (t === 2 ? 8 : 14) + seeded(g.slug, 20 + t * 10 + i) * 9 - Math.abs(spread) * 5;
            const lean = spread * 9 + (seeded(g.slug, 60 + t * 10 + i) - 0.5) * 4;
            const x = cx + spread * 4;
            return <path key={`${t}-${i}`} d={`M${x - 1.6} 26 Q${x + lean * 0.4} ${26 - h * 0.6} ${x + lean} ${26 - h} Q${x + lean * 0.4 + 1.4} ${26 - h * 0.5} ${x + 1.6} 26 Z`} />;
          });
        })}
      </svg>
      {visited && (
        <svg className="gy-flower" width="34" height="30" viewBox="0 0 34 30" aria-label="You've read this one">
          <path d="M6 28 Q14 18 22 8" stroke="#3d5a3a" strokeWidth="1.4" fill="none" />
          <path d="M12 21 Q6 18 4 12 Q10 14 12 21Z" fill="#4c6b45" />
          <g transform="translate(22 8)">
            <path d="M0 0 Q-7 -2 -9 -8 Q-2 -7 0 0Z M0 0 Q-2 -8 2 -12 Q4 -5 0 0Z M0 0 Q6 -5 11 -4 Q7 2 0 0Z M0 0 Q3 4 9 6 Q2 7 0 0Z" fill="#f6f3ea" stroke="#d8d1bf" strokeWidth=".5" />
            <circle r="1.6" fill="#e9b949" />
          </g>
        </svg>
      )}
    </div>
  );
}

