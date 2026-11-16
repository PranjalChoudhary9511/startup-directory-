// Banknote-style guilloche rosettes: overlaid hypotrochoid curves, generated (no image assets).

function hypotrochoid(R: number, r: number, d: number, scale: number) {
  const k = (R - r) / r;
  // Number of turns needed for the curve to close.
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const turns = r / gcd(R, r);
  const steps = 260 * turns;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * turns;
    const x = (R - r) * Math.cos(t) + d * Math.cos(k * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin(k * t);
    pts.push(`${(x * scale).toFixed(2)},${(y * scale).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

const LAYERS = [
  { R: 96, r: 36, d: 52, opacity: 0.55 },
  { R: 90, r: 35, d: 44, opacity: 0.38 },
  { R: 84, r: 32, d: 30, opacity: 0.3 },
  { R: 100, r: 28, d: 72, opacity: 0.2 },
];

export function Guilloche({ size = 360, color = "currentColor", spin = true, className }: { size?: number; color?: string; spin?: boolean; className?: string }) {
  const scale = size / 2 / 150;
  return (
    <svg viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`} width={size} height={size} className={className} aria-hidden>
      <g className={spin ? "guilloche-spin" : undefined} fill="none" stroke={color} strokeWidth={0.6}>
        {LAYERS.map((l, i) => (
          <path key={i} d={hypotrochoid(l.R, l.r, l.d, scale)} opacity={l.opacity} />
        ))}
        <circle r={size * 0.47} opacity={0.35} />
        <circle r={size * 0.455} opacity={0.2} strokeDasharray="1 3" />
      </g>
    </svg>
  );
}

/** Wavy security-line band, like the fine print lines on a note. */
export function SecurityLines({ color = "currentColor", className }: { color?: string; className?: string }) {
  const lines = Array.from({ length: 9 }, (_, i) => {
    const y = 6 + i * 6;
    let d = `M0 ${y}`;
    for (let x = 0; x <= 600; x += 20) d += ` Q ${x + 10} ${y + (i % 2 ? 3 : -3)} ${x + 20} ${y}`;
    return d;
  });
  return (
    <svg viewBox="0 0 600 60" preserveAspectRatio="none" className={className} aria-hidden>
      <g fill="none" stroke={color} strokeWidth="0.6" opacity="0.5">
        {lines.map((d, i) => <path key={i} d={d} />)}
      </g>
    </svg>
  );
}
