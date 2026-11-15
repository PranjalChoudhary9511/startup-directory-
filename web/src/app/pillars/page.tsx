import type { Metadata } from "next";
import Link from "next/link";
import { pad, pillars, totalModules, totalTracks, trackCount } from "@/lib/content";

export const metadata: Metadata = { title: "All pillars" };

export default function PillarsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Roadmap</p>
      <h1 className="mt-2 font-display text-5xl font-extrabold tracking-tight">All pillars</h1>
      <p className="mt-3 text-muted">
        {pillars.length} pillars · {totalModules} modules · {totalTracks} tracks. Module 01 of every pillar is free.
      </p>

      <ol className="mt-10 space-y-4">
        {pillars.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/p/${p.slug}`}
              className="group grid gap-4 rounded-2xl border border-line bg-paper p-5 transition hover:shadow-md md:grid-cols-[120px_1fr_auto]"
            >
              <div className="font-mono text-sm" style={{ color: p.color }}>
                P{pad(p.number)}
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">{p.title}</h2>
                <p className="mt-1 text-sm text-muted">{p.question}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.modules.map((m) => (
                    <span key={m.number} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                      {pad(m.number)} {m.title}
                    </span>
                  ))}
                </div>
              </div>
              <div className="font-mono text-xs text-muted md:text-right">
                {p.modules.length} MODULES
                <br />
                {trackCount(p)} TRACKS
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
