import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getPillars } from "@/lib/curriculum";
import { FolderCover } from "../folder-cover";

export function PillarFolders() {
  const pillars = getPillars();
  return (
    <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-6 md:pb-16 2xl:max-w-[1480px]">
      <section className="py-16" aria-labelledby="pillar-directory-title">
        <div className="mono-eyebrow mb-3">Pick your path</div>
        <h2 id="pillar-directory-title" className="text-2xl font-semibold tracking-tight">
          Choose where to start
        </h2>
        <div className="folder-grid">
          {pillars.map((p) => {
            const free = p.modules.filter((m) => m.isFree).reduce((n, m) => n + m.tracks.length, 0);
            return (
              <Link key={p.slug} href={`/p/${p.slug}`} className="grid-card folder-card" style={{ background: p.cardBg }}>
                <div className="folder-preview" aria-hidden>
                  <FolderCover slug={p.slug} color={p.color} className="folder-art" />
                </div>
                <div className="folder-body">
                  {!p.isPublished && <span className="folder-status">Soon</span>}
                  <h3>{p.cardTitle}</h3>
                  <ul className="mt-3.5 space-y-1.5 text-[13px] leading-[1.55] text-[color-mix(in_srgb,var(--fg1)_80%,var(--fg2))]">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-baseline gap-2">
                        <span aria-hidden className="font-mono">+</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="stat-pill mt-3 self-start">
                    {p.modules.length} modules · {p.trackCount} tracks · <strong className="font-semibold text-fg1">{free} free</strong>
                  </div>
                  <div className="folder-footer">
                    <span>Open</span>
                    <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
