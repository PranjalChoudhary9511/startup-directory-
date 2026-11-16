import { useId } from "react";

// Folder-style pillar covers, drawn in SVG (fanout-like layout, original artwork).
// viewBox: 236 × 260. The front cover spans x 0–204, y 6–258; the back panel and tab peek out on the right.

const FONT = {
  sans: "var(--font-overused), sans-serif",
  serif: "var(--font-instrument-serif), Georgia, serif",
  display: "var(--font-sora), sans-serif",
  mono: "var(--font-plex-mono), monospace",
};

function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount);
  const r = mix(n >> 16), g = mix((n >> 8) & 255), b = mix(n & 255);
  return `rgb(${r}, ${g}, ${b})`;
}

type ArtProps = { id: string; color: string };

function ProblemArt({ id }: ArtProps) {
  return (
    <>
      <filter id={`${id}-noise`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.024" numOctaves="3" seed="11" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.66  0 0 0 0 0.27  0 0 0 0 0.22  13 0 0 0 -6.2" />
      </filter>
      <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="3" />
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.35 -0.08" />
      </filter>
      <rect x="0" y="6" width="204" height="252" filter={`url(#${id}-noise)`} />
      <rect x="0" y="6" width="204" height="252" filter={`url(#${id}-grain)`} />
      <rect x="22" y="108" width="160" height="58" rx="4" fill="#f2c7bd" opacity="0.55" />
      <text x="102" y="149" textAnchor="middle" fontFamily={FONT.sans} fontSize="38" fontWeight="500" letterSpacing="-1.6" fill="#5e1c14">Problem</text>
      <text x="102" y="186" textAnchor="middle" fontFamily={FONT.mono} fontSize="8.5" letterSpacing="2.2" fill="#5e1c14">WORTH SOLVING</text>
    </>
  );
}

function SolutionArt() {
  const rings = [18, 32, 46, 60, 74, 88];
  return (
    <>
      <g stroke="#4a3608" strokeWidth="0.7" fill="none" opacity="0.4">
        {rings.map((r) => <ellipse key={r} cx="150" cy="212" rx={r} ry={r * 0.42} />)}
        {[-60, -30, 0, 30, 60].map((dx) => <path key={dx} d={`M${150 + dx * 0.2} 150 Q ${150 + dx} 212 ${150 + dx * 0.25} 262`} />)}
      </g>
      <g fontFamily={FONT.serif} fontSize="39" fill="#3a2a05" letterSpacing="-0.8">
        <text x="14" y="52">The</text>
        <text x="14" y="92">smallest</text>
        <text x="14" y="132">thing that</text>
        <text x="14" y="172">works</text>
      </g>
      <path d="M14 184 q 30 9 62 -1 t 30 3" stroke="#d62828" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  );
}

function MarketArt() {
  const bars = [30, 48, 38, 62, 54, 76];
  return (
    <>
      <text x="14" y="44" fontFamily={FONT.sans} fontSize="29" fontWeight="500" letterSpacing="-1" fill="#1d2414">MARKET</text>
      <text x="62" y="76" fontFamily={FONT.display} fontSize="25" fontWeight="700" letterSpacing="-1" fill="#1d2414">research</text>
      <rect x="14" y="90" width="176" height="96" fill="none" stroke="#1d2414" strokeWidth="1.2" />
      <g stroke="#1d2414" strokeWidth="0.5" opacity="0.35">
        {[106, 122, 138, 154, 170].map((y) => <line key={y} x1="14" x2="190" y1={y} y2={y} />)}
      </g>
      <g fill="#8b3dff">
        {bars.map((h, i) => <rect key={i} x={28 + i * 24} y={182 - h} width="12" height={h} />)}
      </g>
      <circle cx="150" cy="118" r="16" fill="none" stroke="#1d2414" strokeWidth="2.2" />
      <line x1="161" y1="130" x2="176" y2="146" stroke="#1d2414" strokeWidth="3" strokeLinecap="round" />
      <g stroke="#1d2414" strokeWidth="0.8">
        {[198, 210, 222, 234, 246].map((y) => <line key={y} x1="14" x2="190" y1={y} y2={y} />)}
        <line x1="102" x2="102" y1="192" y2="252" />
      </g>
      <rect x="128" y="226" width="58" height="20" fill="#f4d35e" stroke="#1d2414" strokeWidth="0.8" />
      <text x="157" y="240" textAnchor="middle" fontFamily={FONT.mono} fontSize="8.5" fontWeight="600" fill="#1d2414">TAM ₹</text>
    </>
  );
}

function AiArt() {
  const nodes: [number, number][] = [[40, 132], [92, 112], [150, 128], [66, 176], [124, 170], [176, 182], [96, 214], [40, 206]];
  const edges = [[0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 6], [6, 7], [3, 7]];
  return (
    <>
      <rect x="0" y="6" width="204" height="252" fill="#1d3557" opacity="0.38" />
      <g fill="#ffffff" opacity="0.18">
        {Array.from({ length: 13 }).flatMap((_, x) => Array.from({ length: 17 }).map((__, y) => <circle key={`${x}-${y}`} cx={8 + x * 16} cy={14 + y * 15} r="0.9" />))}
      </g>
      <text x="14" y="50" fontFamily={FONT.display} fontWeight="700" fontSize="34" letterSpacing="-1.2" fill="#ffffff">Basics</text>
      <text x="14" y="88" fontFamily={FONT.sans} fontSize="34" fontWeight="600" letterSpacing="-1.2" fill="#f4d35e">of AI</text>
      <g stroke="#ffffff" strokeWidth="1" opacity="0.75">
        {edges.map(([a, b]) => <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />)}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 6 : 4.5} fill={i % 3 === 0 ? "#f4d35e" : "#ffffff"} stroke="#1d3557" strokeWidth="1.2" />
      ))}
      <rect x="14" y="222" width="124" height="16" rx="3" fill="#0d1b2a" opacity="0.85" />
      <text x="20" y="233.5" fontFamily={FONT.mono} fontSize="8.5" fill="#9ef0c0">&gt; build my website_</text>
    </>
  );
}

function BrandingArt({ id }: ArtProps) {
  return (
    <>
      <path id={`${id}-ring`} d="M102 72 a 68 68 0 1 1 -0.1 0" fill="none" />
      <circle cx="102" cy="140" r="80" fill="none" stroke="#2b0f3a" strokeWidth="1" opacity="0.5" />
      <circle cx="102" cy="140" r="56" fill="#f1e4f8" />
      <circle cx="102" cy="140" r="56" fill="none" stroke="#2b0f3a" strokeWidth="1.2" />
      <text fontFamily={FONT.mono} fontSize="10" letterSpacing="2.6" fill="#2b0f3a">
        <textPath href={`#${id}-ring`}>BRAND · POSITION · IDENTITY · PACKAGING · VOICE ·</textPath>
      </text>
      <text x="102" y="148" textAnchor="middle" fontFamily={FONT.display} fontWeight="700" fontSize="19" letterSpacing="-0.8" fill="#2b0f3a">Branding</text>
      <g fill="#fff6c2">
        <path d="M30 34 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" />
        <path d="M176 220 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" />
      </g>
      <text x="14" y="246" fontFamily={FONT.mono} fontSize="8" letterSpacing="1.5" fill="#2b0f3a" opacity="0.7">PILLAR 05</text>
    </>
  );
}

function MarketingArt() {
  const rays = Array.from({ length: 46 }, (_, i) => {
    const a = (i / 46) * Math.PI * 2;
    const len = 60 + ((i * 37) % 70);
    return { x2: 148 + Math.cos(a) * len, y2: 74 + Math.sin(a) * len, c: ["#fff7ef", "#ffd166", "#ff9fb2", "#ffffff"][i % 4], w: 1 + (i % 3) * 0.8 };
  });
  return (
    <>
      <rect x="0" y="6" width="204" height="252" fill="#7a1f12" opacity="0.28" />
      <g strokeLinecap="round">
        {rays.map((r, i) => <line key={i} x1="148" y1="74" x2={r.x2} y2={r.y2} stroke={r.c} strokeWidth={r.w} opacity="0.85" />)}
      </g>
      <circle cx="148" cy="74" r="9" fill="#fff7ef" />
      <text x="14" y="206" fontFamily={FONT.display} fontWeight="700" fontSize="28" letterSpacing="-1.2" fill="#fff7ef">Marketing</text>
      <text x="16" y="226" fontFamily={FONT.mono} fontSize="8.5" letterSpacing="2" fill="#fff7ef" opacity="0.85">LOUD, THEN LOYAL</text>
    </>
  );
}

function SalesArt() {
  const pts: [number, number][] = [[14, 226], [44, 214], [70, 220], [98, 186], [124, 192], [150, 140], [176, 112], [192, 84]];
  return (
    <>
      <g stroke="#06373a" strokeWidth="0.5" opacity="0.25">
        {Array.from({ length: 12 }).map((_, i) => <line key={`h${i}`} x1="0" x2="204" y1={90 + i * 14} y2={90 + i * 14} />)}
        {Array.from({ length: 13 }).map((_, i) => <line key={`v${i}`} y1="84" y2="258" x1={i * 17} x2={i * 17} />)}
      </g>
      <text x="12" y="62" fontFamily={FONT.sans} fontSize="50" fontWeight="800" letterSpacing="-2.5" fill="#06373a">SALES</text>
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinejoin="round" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.4" fill="#06373a" stroke="#ffffff" strokeWidth="1.6" />)}
      <rect x="134" y="54" width="62" height="20" rx="4" fill="#f4d35e" />
      <text x="165" y="68" textAnchor="middle" fontFamily={FONT.display} fontWeight="700" fontSize="11" fill="#06373a">first ₹</text>
    </>
  );
}

function MoneyArt() {
  const rows = ["₹ 12,400", "₹ 3,150", "₹ 860", "₹ 18,900", "₹ 2,275", "₹ 7,040", "₹ 640", "₹ 9,980"];
  return (
    <>
      <g stroke="#3b3b3b" strokeWidth="0.6" opacity="0.4">
        {rows.map((_, i) => <line key={i} x1="0" x2="204" y1={110 + i * 17} y2={110 + i * 17} />)}
      </g>
      <line x1="40" x2="40" y1="92" y2="258" stroke="#c0392b" strokeWidth="1" opacity="0.7" />
      <text x="14" y="46" fontFamily={FONT.mono} fontSize="30" fontWeight="600" letterSpacing="-1" fill="#1d1d1d">Money</text>
      <text x="14" y="78" fontFamily={FONT.mono} fontSize="30" fontWeight="600" letterSpacing="-1" fill="#1d1d1d">&amp; Ops</text>
      <g fontFamily={FONT.mono} fontSize="9" fill="#1d1d1d">
        {rows.map((r, i) => (
          <g key={r}>
            <text x="16" y={106 + i * 17} opacity="0.55">{String(i + 1).padStart(2, "0")}</text>
            <text x="186" y={106 + i * 17} textAnchor="end">{r}</text>
          </g>
        ))}
      </g>
    </>
  );
}

const ART: Record<string, (p: ArtProps) => React.ReactNode> = {
  problem: ProblemArt,
  solution: SolutionArt,
  "market-research": MarketArt,
  "build-with-ai": AiArt,
  branding: BrandingArt,
  marketing: MarketingArt,
  sales: SalesArt,
  "money-and-ops": MoneyArt,
};

const DARK_COVERS = new Set(["build-with-ai", "marketing"]);

export function FolderCover({ slug, color, className }: { slug: string; color: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const Art = ART[slug] ?? ProblemArt;
  return (
    <svg viewBox="0 0 236 260" className={className} role="img" aria-hidden>
      <defs>
        <clipPath id={`${id}-front`}>
          <rect x="0" y="6" width="204" height="252" rx="8" />
        </clipPath>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Back panel with tab */}
      <rect x="22" y="0" width="196" height="254" rx="9" fill={shade(color, -0.22)} />
      <rect x="208" y="24" width="24" height="86" rx="7" fill={shade(color, -0.22)} />
      <rect x="208" y="24" width="24" height="86" rx="7" fill="#000" opacity="0.06" />
      {/* Paper peeking out */}
      <rect x="12" y="2" width="196" height="250" rx="4" fill="#f7f3ea" transform="rotate(1.6 110 128)" />

      {/* Front cover */}
      <g clipPath={`url(#${id}-front)`}>
        <rect x="0" y="6" width="204" height="252" fill={color} />
        <Art id={id} color={color} />
        <rect x="0" y="6" width="204" height="252" fill={`url(#${id}-sheen)`} />
      </g>
      <rect x="0.5" y="6.5" width="203" height="251" rx="7.5" fill="none" stroke="#000" strokeOpacity="0.14" />
      {slug !== "branding" && (
        <text
          x="14"
          y="248"
          fontFamily={FONT.mono}
          fontSize="8.5"
          letterSpacing="0.6"
          fill={DARK_COVERS.has(slug) ? "#ffffff" : "#1d1d1d"}
          opacity={DARK_COVERS.has(slug) ? 0.8 : 0.6}
        >
          firstrupee
        </text>
      )}
    </svg>
  );
}
