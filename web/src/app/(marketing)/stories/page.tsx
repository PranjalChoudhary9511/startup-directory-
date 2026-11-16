import { ArrowDown, ArrowRight, Play } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { FilmWall } from "@/components/stories/film-wall";
import { StoryLibrary } from "@/components/stories/library";
import { StoryCard } from "@/components/stories/story-card";
import { PathProgress } from "@/components/stories/watched";
import { COLLECTIONS, START_PATH, starterIndex, STORIES, storiesIn, toStoryCard, totals } from "@/content/stories";

export const metadata: Metadata = {
  title: "Real Stories: how great companies were built",
  description:
    "The world's best business-story films, hand-picked for depth, not views. Founders' lives, failures and breakthroughs, from Tata and Rolex to Nvidia and Zerodha. Watch on-site.",
};

export default function StoriesPage() {
  const t = totals();
  const wallIds = STORIES.slice(0, 40).map((s) => s.videos[starterIndex(s.videos)].youtubeId);
  const [feature, ...path] = START_PATH;

  return (
    <>
      {/* ───────── Hero: the screening room ───────── */}
      <section className="relative overflow-hidden border-b border-divider bg-bg">
        <FilmWall ids={wallIds} />
        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-6 lg:pt-20">
          <p className="mono-eyebrow">Real Stories</p>
          <h1 className="mt-3 max-w-[600px] text-[38px] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-[52px]">
            Learn from the people <span className="accent-display">who built it.</span>
          </h1>
          <p className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-fg2">
            The world&apos;s best business-story films, chosen for depth, not views. How founders grew up, the jobs they quit, the failures that nearly ended them, and the moment it worked. Watch them right here.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {feature && (
              <Link href={`/stories/${feature.slug}`} className="btn-primary">
                <Play size={15} weight="fill" /> Start with episode 01
              </Link>
            )}
            <a href="#library" className="btn-secondary !h-12 !px-4 !text-[14px]">
              Browse all {t.companies} companies <ArrowDown size={13} />
            </a>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
            {[
              [t.companies, "companies"],
              [t.films, "hand-picked films"],
              [`${t.hours}+`, "hours of stories"],
              ["0", "redirects to YouTube"],
            ].map(([v, l]) => (
              <div key={l as string}>
                <dd className="accent-display text-[28px] leading-none">{v}</dd>
                <dt className="mt-1 font-mono text-[10px] tracking-[0.1em] text-fg3 uppercase">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── Start here: the guided path ───────── */}
      {feature && (
        <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mono-eyebrow">Start here</p>
              <h2 className="mt-2 text-[28px] leading-tight font-semibold tracking-[-0.02em]">
                {START_PATH.length} stories, <span className="accent-display">in the right order.</span>
              </h2>
              <p className="mt-2 max-w-lg text-[14px] text-fg2">New here? Watch these one after another. Each ends with a button to the next one.</p>
            </div>
            <PathProgress slugs={START_PATH.map((s) => s.slug)} />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
            <StoryCard s={toStoryCard(feature)} n={1} size="lg" />
            <ol className="relative space-y-1 border-l border-divider pl-6">
              {path.map((s, i) => (
                <li key={s.slug} className="relative">
                  <span className="absolute top-3.5 -left-[29px] h-2.5 w-2.5 rounded-full border-2 border-bg bg-line-strong" />
                  <Link href={`/stories/${s.slug}`} className="group flex items-baseline gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface hover:shadow-[var(--shadow-sm)]">
                    <span className="w-8 shrink-0 font-mono text-[11px] text-fg3">EP {String(i + 2).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className="accent-display block text-[17px] leading-tight">{s.company}</span>
                      <span className="mt-0.5 line-clamp-1 block text-[13px] text-fg2">{s.hook}</span>
                    </span>
                    <ArrowRight size={14} className="shrink-0 text-fg3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ───────── Collections ───────── */}
      <div className="mx-auto max-w-6xl space-y-16 px-5 pt-20 sm:px-6">
        {COLLECTIONS.map((c) => {
          const list = storiesIn(c.key);
          if (!list.length) return null;
          return (
            <section key={c.key} aria-labelledby={`col-${c.key}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.1em] text-fg3 uppercase">
                    <span className="h-2 w-2 rounded-full" style={{ background: c.tint }} /> {list.length} stories
                  </p>
                  <h2 id={`col-${c.key}`} className="mt-1.5 text-[24px] leading-tight font-semibold tracking-[-0.02em]">{c.title}</h2>
                  <p className="mt-1 text-[14px] text-fg2">{c.line}</p>
                </div>
                {list.length > 4 && <span className="hidden font-mono text-[11px] text-fg3 sm:block">scroll →</span>}
              </div>
              <div className="shelf mt-5 flex snap-x gap-5 overflow-x-auto pb-4">
                {list.map((s) => (
                  <div key={s.slug} className="w-[280px] shrink-0 snap-start">
                    <StoryCard s={toStoryCard(s)} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ───────── Full library ───────── */}
      <section id="library" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-20 pb-24 sm:px-6">
        <p className="mono-eyebrow">The full library</p>
        <h2 className="mt-2 mb-6 text-[28px] leading-tight font-semibold tracking-[-0.02em]">
          Every company, <span className="accent-display">one search away.</span>
        </h2>
        <StoryLibrary stories={STORIES.map(toStoryCard)} />
        <p className="mt-14 text-center text-[12.5px] text-fg3">
          Films play through YouTube&apos;s privacy-enhanced player and belong to their creators. We pick them; we don&apos;t re-upload them.
        </p>
      </section>
    </>
  );
}
