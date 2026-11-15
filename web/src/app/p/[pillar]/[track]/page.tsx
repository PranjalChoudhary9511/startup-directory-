import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { estMinutes, getPillar, getTrack, pad, pillars } from "@/lib/content";

export function generateStaticParams() {
  return pillars.flatMap((p) =>
    p.modules.flatMap((m) => m.tracks.map((t) => ({ pillar: p.slug, track: t.slug }))),
  );
}

export async function generateMetadata(props: PageProps<"/p/[pillar]/[track]">): Promise<Metadata> {
  const { pillar: ps, track: ts } = await props.params;
  const pillar = getPillar(ps);
  const found = pillar && getTrack(pillar, ts);
  return found ? { title: `${found.track.code} ${found.track.title}` } : {};
}

export default function TrackPage(props: PageProps<"/p/[pillar]/[track]">) {
  return (
    <Suspense fallback={<div className="mx-auto h-96 max-w-6xl" />}>
      <TrackContent params={props.params} />
    </Suspense>
  );
}

async function TrackContent({ params }: { params: PageProps<"/p/[pillar]/[track]">["params"] }) {
  const { pillar: ps, track: ts } = await params;
  const pillar = getPillar(ps);
  if (!pillar) notFound();
  const found = getTrack(pillar, ts);
  if (!found) notFound();
  const { track, module, prev, next } = found;
  const locked = !module.isFree;

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr]">
      {/* Sidebar: this module's tracks */}
      <aside className="order-2 lg:order-1">
        <div className="lg:sticky lg:top-20">
          <Link href={`/p/${pillar.slug}`} className="eyebrow hover:text-ink">
            ← {pillar.title}
          </Link>
          <p className="mt-4 font-mono text-xs" style={{ color: pillar.color }}>
            MODULE {pad(module.number)}
          </p>
          <p className="font-display font-semibold">{module.title}</p>
          <ol className="mt-3 space-y-0.5 text-sm">
            {module.tracks.map((t) => {
              const active = t.slug === track.slug;
              return (
                <li key={t.slug}>
                  <Link
                    href={`/p/${pillar.slug}/${t.slug}`}
                    className={`flex gap-2 rounded-md px-2 py-1.5 ${active ? "bg-paper font-medium shadow-sm" : "text-muted hover:text-ink"}`}
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full border"
                      style={{ borderColor: pillar.color, background: active ? pillar.color : "transparent" }}
                    />
                    <span className="font-mono text-xs leading-5">{t.code}</span>
                    <span className="leading-5">{t.title}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </aside>

      {/* Main */}
      <article className="order-1 min-w-0 lg:order-2">
        <p className="font-mono text-xs text-muted">
          <span style={{ color: pillar.color }}>P{pad(pillar.number)}</span> · TRACK {track.code} ·{" "}
          {track.kind === "screen" ? "SCREEN WALKTHROUGH" : "FILM"} · ~{estMinutes(track)} MIN
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{track.title}</h1>

        {/* Video placeholder */}
        <div
          className="relative mt-6 grid aspect-video place-items-center overflow-hidden rounded-2xl text-white"
          style={{ background: `linear-gradient(135deg, ${pillar.color}, #141414)` }}
        >
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15 text-2xl backdrop-blur">
              {locked ? "🔒" : "▶"}
            </div>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-white/70">
              {locked ? "Pro track · video not produced yet" : "Video not produced yet"}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {track.story && (
            <section className="rounded-xl border border-line bg-paper p-5">
              <p className="eyebrow">The story</p>
              <p className="mt-2 font-display text-lg font-semibold">{track.story}</p>
              <p className="mt-1 text-sm text-muted">
                One deep, verified real-world story anchors this track.
              </p>
            </section>
          )}
          <section className="rounded-xl border border-line bg-paper p-5">
            <p className="eyebrow">Do this now</p>
            <p className="mt-2 text-sm text-muted">
              Each track ends with one task. The task for this track will be written alongside its script.
            </p>
          </section>
          {module.deliverable && (
            <section className="rounded-xl border border-dashed border-line p-5 md:col-span-2">
              <p className="eyebrow">Module deliverable → your Dossier</p>
              <p className="mt-2">{module.deliverable}</p>
            </section>
          )}
        </div>

        <nav className="mt-10 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
          {prev ? (
            <Link href={`/p/${pillar.slug}/${prev.track.slug}`} className="rounded-xl border border-line p-4 hover:bg-paper">
              <span className="eyebrow">← Previous · {prev.track.code}</span>
              <span className="mt-1 block text-sm font-medium">{prev.track.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/p/${pillar.slug}/${next.track.slug}`}
              className="rounded-xl border border-line p-4 text-right hover:bg-paper"
            >
              <span className="eyebrow">Next · {next.track.code} →</span>
              <span className="mt-1 block text-sm font-medium">{next.track.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
