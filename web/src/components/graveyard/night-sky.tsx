import type { CSSProperties } from "react";
import { seeded } from "@/content/graveyard/labels";

// The hero's night: stars, moon, drifting fog, fireflies and three hills of silhouettes with an
// iron fence in front. Pure CSS/SVG, deterministic (no hydration mismatch), motion-safe.

function stars(n: number, salt: number, color: string) {
  return Array.from({ length: n }, (_, i) => {
    const x = (seeded("x", salt + i) * 100).toFixed(2);
    const y = Math.round(seeded("y", salt + i * 7) * 520);
    const big = seeded("s", salt + i * 3) > 0.9 ? " 0 0.5px" : "";
    return `${x}vw ${y}px${big} ${color}`;
  }).join(",");
}

const FLIES = Array.from({ length: 16 }, (_, i) => ({
  left: `${4 + seeded("fl", i) * 92}%`,
  bottom: `${6 + seeded("fb", i) * 30}%`,
  "--d": `${9 + seeded("fd", i) * 10}s`,
  "--x1": `${(seeded("fx", i) - 0.5) * 120}px`,
  "--y1": `${(seeded("fy", i) - 0.5) * 80}px`,
  "--x2": `${(seeded("fx2", i) - 0.5) * 160}px`,
  "--y2": `${(seeded("fy2", i) - 0.5) * 70}px`,
  animationDelay: `${-seeded("fdl", i) * 10}s`,
}));

/** A row of small headstone silhouettes along a hill line. */
function distantStones(y: (x: number) => number, from: number, to: number, step: number, salt: number) {
  const out: string[] = [];
  for (let x = from; x < to; x += step + seeded("ds", salt + x) * step) {
    const h = 14 + seeded("dh", salt + x) * 16;
    const w = 9 + seeded("dw", salt + x) * 7;
    const base = y(x) + 3;
    out.push(
      seeded("dk", salt + x) > 0.5
        ? `M${x} ${base} V${base - h + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${base - h + w / 2} V${base} Z`
        : `M${x} ${base} V${base - h} H${x + w} V${base} Z`,
    );
  }
  return out.join(" ");
}

export function NightSky() {
  const midHill = (x: number) => 250 - Math.sin(x / 260) * 26 - Math.cos(x / 120) * 8;
  const pickets = Array.from({ length: 145 }, (_, i) => i * 10);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="gy-stars" style={{ boxShadow: stars(120, 1, "#ffffffb3") }} />
      <div className="gy-stars b" style={{ boxShadow: stars(80, 500, "#cfd8ffcc") }} />
      <div className="gy-moon" />
      <div className="gy-fog" style={{ bottom: "18%" }} />
      <div className="gy-fog two" style={{ bottom: "6%" }} />

      <svg className="gy-hills" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
        {/* Far hill */}
        <path d="M0 210 C 200 150, 380 190, 560 170 S 900 120, 1100 160 S 1340 150, 1440 140 V400 H0 Z" fill="#1a2040" />
        {/* Middle hill with its stones and one bare tree */}
        <path d={`M0 ${midHill(0)} ${Array.from({ length: 37 }, (_, i) => `L${i * 40} ${midHill(i * 40).toFixed(1)}`).join(" ")} L1440 ${midHill(1440)} V400 H0 Z`} fill="#121733" />
        <path d={distantStones(midHill, 40, 1400, 46, 11)} fill="#121733" />
        <g fill="none" stroke="#121733" strokeLinecap="round">
          <path d="M1180 240 C1178 200 1186 170 1182 130" strokeWidth="7" />
          <path d="M1182 175 C1160 160 1150 150 1138 128 M1183 160 C1205 148 1214 132 1228 118 M1182 140 C1170 120 1172 108 1162 92 M1183 132 C1194 116 1200 104 1214 96 M1140 130 l-10 -8 M1226 120 l10 -10" strokeWidth="3" />
        </g>
        {/* Near ground + iron fence */}
        <path d="M0 330 C 300 300, 600 320, 900 305 S 1300 300, 1440 310 V400 H0 Z" fill="#0b0f1f" />
        <g stroke="#0b0f1f" strokeWidth="2.5">
          <path d={`M0 300 H1440 M0 326 H1440`} />
          {pickets.map((x) => (
            <path key={x} d={`M${x} 334 V292 M${x - 3} 294 L${x} 286 L${x + 3} 294`} fill="#0b0f1f" />
          ))}
        </g>
      </svg>

      {FLIES.map((s, i) => (
        <span key={i} className="gy-firefly" style={s as CSSProperties} />
      ))}
    </div>
  );
}
