import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { formatINR, INSTRUMENT_LABEL, isEquityFree, PROVIDER_LABEL, type GrantCard as Card } from "@/content/grants/labels";
import { PROVIDER_THEME, Seal, StatusStamp } from "./bits";

/** Cheque-style card: perforated stub, provider seal, amount, rubber stamp, MICR line. */
export function GrantCard({ g }: { g: Card }) {
  const t = PROVIDER_THEME[g.providerType];
  const equityFree = isEquityFree(g);
  return (
    <Link
      href={`/grants/${g.slug}`}
      className="cheque group"
      style={{ "--cheque-ink": t.ink, "--cheque-paper": t.paper } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-3">
        <Seal grant={g} size={46} />
        <StatusStamp status={g.status} size="sm" />
      </div>

      <p className="mt-4 font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: t.ink }}>
        {g.state ? `${g.state} · ` : ""}{PROVIDER_LABEL[g.providerType]}
      </p>
      <h3 className="mt-1 text-[17px] leading-snug font-semibold tracking-[-0.01em] text-fg1">{g.name}</h3>
      <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-fg2">{g.oneLiner}</p>

      <div className="mt-auto pt-5">
        <p className="font-mono text-[9px] tracking-[0.12em] text-fg3 uppercase">Up to</p>
        <p className="accent-display text-[26px] leading-none text-fg1">{formatINR(g.maxAmountINR)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {g.instrument.slice(0, 2).map((i) => (
            <span key={i} className="rounded-full px-2 py-[2px] text-[10.5px] font-medium" style={{ background: t.tint, color: t.ink }}>
              {INSTRUMENT_LABEL[i] ?? i}
            </span>
          ))}
          {equityFree && (
            <span className="rounded-full border border-[#0f7a43]/40 bg-[#0f7a43]/10 px-2 py-[2px] text-[10.5px] font-medium text-[#0f7a43]">
              No equity
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-dashed pt-2.5" style={{ borderColor: `${t.ink}33` }}>
        <span className="micr truncate">
          ⑆{g.shortName.toUpperCase()}⑆ {g.launchedYear ?? "—"} ⑈ {g.lastVerified.replaceAll("-", "")}
        </span>
        <ArrowUpRight size={15} className="shrink-0 text-fg2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
