/** The little 3×3 circle doodle from the margins of a well-used notebook. */
export function Dots({ seed = 0, size = 30 }: { seed?: number; size?: number }) {
  const on = [seed % 9, (seed * 5 + 2) % 9, (seed * 7 + 4) % 9];
  return (
    <svg viewBox="0 0 30 30" width={size} height={size} className="bk-dots flex-none" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={5 + (i % 3) * 10} cy={5 + Math.floor(i / 3) * 10} r={3.3 - (i % 2) * 0.4} className={on.includes(i) ? "on" : ""} />
      ))}
    </svg>
  );
}
