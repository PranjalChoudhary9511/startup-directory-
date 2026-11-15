import Link from "next/link";
import { type Pillar, pad, trackCount } from "@/lib/content";

export function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <Link
      href={`/p/${pillar.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper p-5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: pillar.color }} />
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>P{pad(pillar.number)}</span>
        <span>{trackCount(pillar)} TRACKS</span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{pillar.title}</h3>
      <p className="mt-2 text-sm text-muted">{pillar.question}</p>
      <div className="mt-auto flex items-center gap-2 pt-5 font-mono text-[0.68rem]">
        <span className="rounded-full px-2 py-0.5 text-white" style={{ background: pillar.color }}>
          MODULE 01 FREE
        </span>
        {pillar.note && <span className="text-muted uppercase">{pillar.note}</span>}
        <span className="ml-auto text-muted transition group-hover:translate-x-1 group-hover:text-ink">→</span>
      </div>
    </Link>
  );
}
