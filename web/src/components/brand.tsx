import Link from "next/link";
import { SITE } from "@/content/site";

/** Stacked-coin mark: three coins rising, the top one carrying a ₹ tick. */
export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 40 32" fill="none" aria-hidden className="shrink-0">
      <g stroke="#272727" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M3 22.5c0 2 4 3.5 9 3.5s9-1.5 9-3.5v3c0 2-4 3.5-9 3.5s-9-1.5-9-3.5z" fill="#e1e1e1" />
        <ellipse cx="12" cy="22.5" rx="9" ry="3.5" fill="#fbfbfb" />
        <path d="M11 15c0 2 4 3.5 9 3.5s9-1.5 9-3.5v3c0 2-4 3.5-9 3.5s-9-1.5-9-3.5z" fill="#cfcfcf" />
        <ellipse cx="20" cy="15" rx="9" ry="3.5" fill="#fbfbfb" />
        <path d="M19 7.5c0 2 4 3.5 9 3.5s9-1.5 9-3.5v3c0 2-4 3.5-9 3.5s-9-1.5-9-3.5z" fill="#adadad" />
        <ellipse cx="28" cy="7.5" rx="9" ry="3.5" fill="#fbfbfb" />
      </g>
      <circle cx="33.5" cy="7.2" r="1.1" fill="#2ab673" />
    </svg>
  );
}

export function Brand({ beta = true }: { beta?: boolean }) {
  return (
    <Link href="/" className="flex min-h-11 shrink-0 items-center gap-2" aria-label={`${SITE.name} home`}>
      <BrandMark />
      <span className="font-mono text-[17px] font-medium tracking-[-0.02em] text-fg1">{SITE.wordmark}</span>
      {beta && (
        <span className="rounded-[5px] bg-ink px-1.5 py-[1px] font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white">
          beta
        </span>
      )}
    </Link>
  );
}
