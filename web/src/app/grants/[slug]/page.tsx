import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { fundingPillarSlug, getGrant, grants } from "@/lib/content";

export function generateStaticParams() {
  return grants.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: PageProps<"/grants/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const g = getGrant(slug);
  return g ? { title: g.name, description: g.gives } : {};
}

export default function GrantPage(props: PageProps<"/grants/[slug]">) {
  return (
    <Suspense fallback={<div className="mx-auto h-96 max-w-3xl" />}>
      <GrantContent params={props.params} />
    </Suspense>
  );
}

async function GrantContent({ params }: { params: PageProps<"/grants/[slug]">["params"] }) {
  const { slug } = await params;
  const g = getGrant(slug);
  if (!g) notFound();

  const rows: [string, string | null][] = [
    ["What it gives", g.gives],
    ["Run by", g.runBy],
    ["Eligibility", g.eligibility],
    ["Stage", g.stage],
    ["Type", g.type],
    ["Level", g.level === "State" ? `State · ${g.state}` : g.level],
    ["Status", g.statusNote],
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/grants" className="eyebrow hover:text-ink">
        ← All grants
      </Link>
      <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{g.name}</h1>
      <p className="mt-2 text-muted">{g.runBy}</p>

      {g.unverified && (
        <p className="mt-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Some figures for this scheme come from secondary sources and are unverified. Check the official site before
          applying.
        </p>
      )}

      <dl className="mt-8 divide-y divide-line border-y border-line">
        {rows
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr]">
              <dt className="eyebrow pt-0.5">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={g.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas hover:bg-ink/85"
        >
          Official site ↗
        </a>
        <Link
          href={`/p/${fundingPillarSlug}#m04`}
          className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium hover:border-ink"
        >
          Learn: Funding module
        </Link>
      </div>
      <p className="mt-4 font-mono text-xs text-muted">SOURCE: RESEARCH DOC, 26 OCT 2026 · NOT YET RE-VERIFIED</p>
    </div>
  );
}
