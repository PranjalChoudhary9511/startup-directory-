import { ArrowRight, Play } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { FolderCover } from "@/components/folder-cover";
import { getPillars, getTotals, trackHref } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Start learning free",
  description: "Pick a pillar and start its first free module: Problem, Solution, Market Research, Basics of AI, Branding, Marketing, Sales.",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function PillarsPage() {
  const pillars = getPillars();
  const totals = getTotals();

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
      <p className="mono-eyebrow">Start learning free</p>
      <h1 className="mt-3 text-[38px] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-[48px]">
        Pick where you want <span className="accent-display">to start.</span>
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg2">
        Every pillar opens with a free module. Start with Problem if you&apos;re new, or jump straight to where you&apos;re stuck.
      </p>
      <p className="mt-4 font-mono text-[11px] tracking-[0.04em] text-fg3 uppercase">
        {totals.pillars} pillars · {totals.modules} chapters · {totals.tracks} tracks
      </p>

      <div className="mt-10 grid gap-3 md:grid-cols-2">
        {pillars.map((p) => {
          const freeModule = p.modules.find((m) => m.isFree) ?? p.modules[0];
          const first = freeModule.tracks[0];
          return (
            <article key={p.slug} className="grid-card flex gap-5 p-5" style={{ background: `linear-gradient(135deg, ${p.cardBg}, var(--surface) 62%)` }}>
              <Link href={`/p/${p.slug}`} aria-label={`${p.title} overview`} className="shrink-0">
                <FolderCover slug={p.slug} color={p.color} className="h-[130px] w-[118px]" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="font-mono text-[10px] tracking-[0.08em] text-fg3 uppercase">
                  Pillar {pad(p.number)} · {p.isPublished ? `${freeModule.tracks.length} free tracks` : "After launch"}
                </p>
                <h2 className="mt-1.5 text-xl font-semibold tracking-tight">{p.cardTitle}</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-fg2">{p.coreQuestion}</p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                  <Link href={trackHref(p, first)} className="btn-primary is-sm !h-9 !px-3.5 !text-[13px]">
                    <Play size={12} weight="fill" /> Start free · {first.code}
                  </Link>
                  <Link href={`/p/${p.slug}`} className="btn-secondary !h-9 !px-3.5 !text-[13px]">
                    Overview <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-6 text-[12px] text-fg3">Free tracks need no account. Progress is saved in this browser.</p>
    </section>
  );
}
