import {
  BookOpen,
  Books,
  CaretDown,
  CaretRight,
  CaretUpDown,
  MagnifyingGlass,
  MapTrifold,
  Package,
  SquaresFour,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SITE } from "@/content/site";
import { trackHref, type Pillar } from "@/lib/curriculum";
import { BrandMark } from "../brand";
import { PillarProgress, TrackTick } from "../progress";

export const pad = (n: number) => String(n).padStart(2, "0");

export function CourseHeader({ pillar, crumbs }: { pillar: Pillar; crumbs: { label: string; href?: string }[] }) {
  return (
    <header className="topbar sticky top-0 z-40">
      <div className="flex h-full items-center gap-2 px-4 sm:px-5">
        <Link href="/" className="flex items-center gap-2 rounded-md px-1.5 py-1 hover:bg-hover">
          <BrandMark size={26} />
          <span className="hidden font-mono text-[14px] font-medium tracking-[-0.02em] sm:inline">{SITE.wordmark}</span>
          <CaretDown size={11} className="text-fg2" />
        </Link>
        <span className="h-5 w-px bg-divider" />
        <Link href="/pillars" className="flex items-center gap-2 rounded-md px-2 py-1 text-[13px] font-medium hover:bg-hover">
          <span className="h-2 w-2 rounded-full" style={{ background: pillar.color }} />
          {pillar.title}
          <CaretUpDown size={12} className="text-fg2" />
        </Link>
        <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-2 text-[13px] md:flex">
          {crumbs.map((c, i) => (
            <span key={i} className="flex min-w-0 items-center gap-2">
              <span className="text-fg3">/</span>
              {c.href ? (
                <Link href={c.href} className="truncate text-fg2 hover:text-fg1">{c.label}</Link>
              ) : (
                <span className="truncate font-medium text-fg1">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/pillars" className="icon-btn" aria-label="Search the curriculum">
            <MagnifyingGlass size={15} />
          </Link>
          <Link href="/login" className="btn-secondary">Sign in</Link>
        </div>
      </div>
    </header>
  );
}

export function CourseSidebar({ pillar, current }: { pillar: Pillar; current?: { slug?: string; overview?: boolean } }) {
  const freeCount = pillar.modules.filter((m) => m.isFree).reduce((n, m) => n + m.tracks.length, 0);
  const currentModule = current?.slug ? Number(current.slug.split("-")[0]) : undefined;

  return (
    <aside className="course-sidebar" aria-label={`${pillar.title} navigation`}>
      <div className="flex-1 overflow-y-auto px-[11px] pt-1 pb-4">
        <Link href="/pillars" className="side-link mt-1">
          <MapTrifold size={16} /> <span className="flex-1 truncate">Course roadmap</span>
        </Link>

        <div className="side-label">Workspace</div>
        <Link href={`/p/${pillar.slug}`} className={`side-link ${current?.overview ? "is-active" : ""}`}>
          <SquaresFour size={16} /> <span className="flex-1 truncate">Overview</span>
        </Link>
        <Link href="/#beyond" className="side-link">
          <BookOpen size={16} /> <span className="flex-1 truncate">Founder stories</span>
        </Link>
        <Link href={`/p/${pillar.slug}#deliverables`} className="side-link">
          <Package size={16} /> <span className="flex-1 truncate">Deliverables</span>
        </Link>
        <Link href="/#beyond" className="side-link">
          <Books size={16} /> <span className="flex-1 truncate">Resources</span>
        </Link>

        <div className="mx-1 mt-4 flex items-center gap-2.5 rounded-xl bg-chip px-2.5 py-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-surface font-mono text-[10px] font-semibold shadow-[var(--shadow-sm)]">{freeCount}</span>
          <span className="min-w-0">
            <strong className="block text-[11px] font-medium">{freeCount} tracks open</strong>
            <small className="flex items-center gap-1 text-[9px] text-fg2">
              <Star size={9} weight="fill" className="text-[#e9b949]" /> marks Pro tracks
            </small>
          </span>
        </div>

        <div className="side-label">
          Pillar {pad(pillar.number)} · {pillar.title}
        </div>
        {pillar.modules.map((m) => (
          <details key={m.number} className="side-module mb-0.5" open={m.number === currentModule}>
            <summary>
              <CaretRight size={10} className="caret shrink-0 text-fg3 transition-transform" />
              <span className="w-4 shrink-0 font-mono text-[9px] font-medium text-fg2">{pad(m.number)}</span>
              <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-[#272727b3]">{m.title}</span>
              <span className="font-mono text-[9px] font-medium text-fg2">{m.tracks.length}</span>
            </summary>
            <ul className="mt-0.5 mb-1 ml-[22px] border-l border-divider pl-1.5">
              {m.tracks.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={trackHref(pillar, t)}
                    aria-current={t.slug === current?.slug ? "page" : undefined}
                    className={`side-track ${t.slug === current?.slug ? "is-active" : ""}`}
                  >
                    <TrackTick pillar={pillar.slug} track={t.slug} />
                    <span className="min-w-0 flex-1">{t.title}</span>
                    {!m.isFree && <Star size={10} weight="fill" className="shrink-0 text-[#e9b949]" />}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      <div className="border-t border-divider px-4 py-3">
        <PillarProgress pillar={pillar.slug} total={pillar.trackCount} />
      </div>
    </aside>
  );
}
