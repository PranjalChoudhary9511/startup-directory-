import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { estMinutes, getPillar, pad, pillars, trackCount } from "@/lib/content";

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata(props: PageProps<"/p/[pillar]">): Promise<Metadata> {
  const { pillar: slug } = await props.params;
  const p = getPillar(slug);
  return p ? { title: `${p.title} pillar`, description: p.question ?? undefined } : {};
}

export default function PillarPage(props: PageProps<"/p/[pillar]">) {
  return (
    <Suspense fallback={<div className="mx-auto h-96 max-w-6xl" />}>
      <PillarContent params={props.params} />
    </Suspense>
  );
}

async function PillarContent({ params }: { params: PageProps<"/p/[pillar]">["params"] }) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const idx = pillars.indexOf(pillar);
  const next = pillars[idx + 1];

  return (
    <div>
      <section className="border-b border-line" style={{ background: `${pillar.color}12` }}>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Link href="/pillars" className="eyebrow hover:text-ink">
            ← All pillars
          </Link>
          <p className="mt-6 font-mono text-sm" style={{ color: pillar.color }}>
            PILLAR {pad(pillar.number)}
            {pillar.note && <span className="text-muted"> · {pillar.note.toUpperCase()}</span>}
          </p>
          <h1 className="mt-2 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{pillar.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{pillar.question}</p>
          <p className="mt-6 font-mono text-xs text-muted">
            {pillar.modules.length} MODULES · {trackCount(pillar)} TRACKS
          </p>
        </div>
      </section>

      {/* Module grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="eyebrow">Modules</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillar.modules.map((m) => (
            <a
              key={m.number}
              href={`#m${pad(m.number)}`}
              className="rounded-xl border border-line bg-paper p-4 transition hover:border-ink/30"
            >
              <div className="flex justify-between font-mono text-xs text-muted">
                <span>{pad(m.number)}</span>
                <span>
                  {m.tracks.length} TRACKS
                  {m.isFree && (
                    <span className="ml-2 rounded px-1.5 py-0.5 text-white" style={{ background: pillar.color }}>
                      FREE
                    </span>
                  )}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{m.title}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* Full track list */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {pillar.modules.map((m) => (
          <div key={m.number} id={`m${pad(m.number)}`} className="scroll-mt-24 border-t border-line py-8">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-sm" style={{ color: pillar.color }}>
                MODULE {pad(m.number)}
              </span>
              <h2 className="font-display text-2xl font-bold">{m.title}</h2>
              {m.isFree && <span className="font-mono text-xs text-muted">FREE</span>}
            </div>
            <ol className="mt-4 divide-y divide-line">
              {m.tracks.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/p/${pillar.slug}/${t.slug}`}
                    className="group flex items-center gap-4 py-3 hover:bg-paper"
                  >
                    <span className="w-12 font-mono text-xs text-muted">{t.code}</span>
                    <span className="flex-1">
                      {t.title}
                      {t.story && <span className="ml-2 text-sm text-muted">· {t.story}</span>}
                    </span>
                    <span className="hidden font-mono text-xs text-muted sm:inline">
                      {t.kind === "screen" ? "SCREEN" : "FILM"} · {estMinutes(t)} MIN
                    </span>
                    {!m.isFree && <span className="text-xs text-muted" title="Pro">🔒</span>}
                  </Link>
                </li>
              ))}
            </ol>
            {m.deliverable && (
              <p className="mt-4 rounded-lg border border-dashed border-line px-4 py-3 text-sm">
                <span className="eyebrow mr-2">Dossier deliverable</span>
                {m.deliverable}
              </p>
            )}
          </div>
        ))}
        {pillar.deliverable && (
          <p className="rounded-lg border border-dashed border-line px-4 py-3 text-sm">
            <span className="eyebrow mr-2">Pillar deliverable</span>
            {pillar.deliverable}
          </p>
        )}

        {next && (
          <Link
            href={`/p/${next.slug}`}
            className="mt-10 flex items-center justify-between rounded-2xl border border-line bg-paper p-6 hover:shadow-md"
          >
            <span>
              <span className="eyebrow">Next pillar</span>
              <span className="mt-1 block font-display text-2xl font-bold">{next.title}</span>
            </span>
            <span className="font-mono" style={{ color: next.color }}>
              P{pad(next.number)} →
            </span>
          </Link>
        )}
      </section>
    </div>
  );
}
