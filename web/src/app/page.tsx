import Link from "next/link";
import { PillarCard } from "@/components/PillarCard";
import { grants, pillars, storySectors, totalModules, totalTracks } from "@/lib/content";

const STEPS = [
  { n: "01", title: "Learn", body: "Short, story-led tracks. One core idea, one real founder story, one task per track." },
  { n: "02", title: "Do", body: "Every track ends with a “do this now” task. You build as you learn, not after." },
  { n: "03", title: "Build your Dossier", body: "Each module produces a deliverable that goes into your Founder Dossier." },
  { n: "04", title: "Launch", body: "Finish with a working business and your first rupee, not a certificate." },
];

const INSIDE = [
  ["Tracks", `${totalTracks} video tracks across ${totalModules} modules`],
  ["Notes", "Written notes and sources for every track"],
  ["AI Coach", "Feedback on your deliverables against clear rubrics"],
  ["Challenges", "Weekend challenges, judged on published rubrics"],
  ["Stories", "Long-form stories of real founders, mistakes included"],
  ["Grants", `${grants.length}+ government and private schemes, with filters`],
];

const PLANS = [
  { name: "Pro Monthly", price: "₹499", per: "/month", note: "Try it out", cta: "Start monthly" },
  { name: "Pro Annual", price: "₹2,999", per: "/year", note: "≈ ₹250/month. The main plan.", cta: "Go annual", featured: true },
  { name: "Founding Member", price: "₹4,999", per: " once", note: "Lifetime access. Pre-launch only, limited seats.", cta: "Join the founders" },
];

const FAQ = [
  ["I'm 16. Is this for me?", "Yes. The first module of every pillar is free, and the tracks assume no prior business knowledge."],
  ["I have a job. How much time does it take?", "Tracks are 10–20 minutes. Most people do 3–4 a week and finish a module in two weeks."],
  ["Is this only for tech startups?", "No. There are full modules on manufacturing, suppliers, offline retail, B2B and government (B2G) sales."],
  ["Is it free?", "Module 01 of every pillar, the grants directory and the founder stories are free. Pro unlocks everything else."],
];

export default function Home() {
  const problem = pillars[0];
  const firstTrack = problem.modules[0].tracks[0];
  const sampleGrant = grants.find((g) => g.slug === "ksum-grants") ?? grants[0];
  const sampleStory = storySectors.find((s) => s.slug.startsWith("consumer"))?.stories[0];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-[1.2fr_1fr] md:pt-24">
        <div>
          <p className="eyebrow">The founder curriculum India never had</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
            From problem
            <br />
            to first <span className="text-accent">₹</span>.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">
            {pillars.length} pillars, {totalTracks} tracks and a real deliverable at every step. Plus a free grants
            directory and deep stories of real founders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/p/problem" className="rounded-full bg-accent px-6 py-3 font-medium text-accent-ink hover:brightness-95">
              Start free
            </Link>
            <Link
              href={`/p/problem/${firstTrack.slug}`}
              className="rounded-full border border-ink/20 px-6 py-3 font-medium hover:border-ink"
            >
              ▶ Play the first track
            </Link>
          </div>
        </div>

        {/* Floating cards */}
        <div className="relative hidden min-h-[360px] md:block">
          <Link
            href={`/p/problem/${firstTrack.slug}`}
            className="absolute left-0 top-0 w-64 -rotate-3 rounded-xl border border-line bg-paper p-4 shadow-lg transition hover:rotate-0"
          >
            <div className="flex justify-between font-mono text-[0.68rem] text-muted">
              <span style={{ color: problem.color }}>TRACK {firstTrack.code}</span>
              <span>FREE</span>
            </div>
            <p className="mt-3 font-display text-lg font-semibold leading-snug">{firstTrack.title}</p>
            {firstTrack.story && <p className="mt-2 text-xs text-muted">Story: {firstTrack.story}</p>}
          </Link>
          <Link
            href={`/grants/${sampleGrant.slug}`}
            className="absolute right-0 top-28 w-60 rotate-2 rounded-xl border border-line bg-paper p-4 shadow-lg transition hover:rotate-0"
          >
            <div className="font-mono text-[0.68rem] text-muted">GRANT · {sampleGrant.state ?? sampleGrant.level}</div>
            <p className="mt-2 font-display text-lg font-semibold">{sampleGrant.name}</p>
            <p className="mt-1 line-clamp-2 text-xs text-muted">{sampleGrant.gives}</p>
          </Link>
          {sampleStory && (
            <Link
              href="/stories"
              className="absolute bottom-0 left-10 w-60 -rotate-1 rounded-xl bg-ink p-4 text-canvas shadow-lg transition hover:rotate-0"
            >
              <div className="font-mono text-[0.68rem] text-canvas/60">REAL STORY</div>
              <p className="mt-2 font-display text-lg font-semibold">{sampleStory.company}</p>
              {sampleStory.founder && <p className="text-xs text-canvas/70">{sampleStory.founder}</p>}
            </Link>
          )}
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Pick your path</p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">The {pillars.length} pillars</h2>
          </div>
          <Link href="/pillars" className="text-sm text-muted hover:text-ink">
            See the full roadmap →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <PillarCard key={p.slug} pillar={p} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="eyebrow">How it works</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n}>
                <span className="font-mono text-sm text-accent">{s.n}</span>
                <h3 className="mt-2 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside the box */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="eyebrow">Inside the box</p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {INSIDE.map(([title, body]) => (
            <div key={title} className="bg-canvas p-6">
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">Priced for the UPI generation</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`flex flex-col rounded-2xl border p-6 ${p.featured ? "border-ink bg-ink text-canvas" : "border-line bg-canvas"}`}
              >
                <span className={`font-mono text-xs uppercase ${p.featured ? "text-canvas/60" : "text-muted"}`}>{p.name}</span>
                <p className="mt-4 font-display text-4xl font-extrabold">
                  {p.price}
                  <span className={`text-base font-normal ${p.featured ? "text-canvas/60" : "text-muted"}`}>{p.per}</span>
                </p>
                <p className={`mt-2 text-sm ${p.featured ? "text-canvas/70" : "text-muted"}`}>{p.note}</p>
                <button
                  type="button"
                  disabled
                  title="Payments (Razorpay) are not connected in this preview"
                  className={`mt-6 cursor-not-allowed rounded-full px-4 py-2.5 text-sm font-medium opacity-80 ${p.featured ? "bg-accent text-accent-ink" : "bg-ink text-canvas"}`}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">Student plan: ₹1,999/year with a college ID. Payments are not connected in this preview.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="eyebrow">FAQ</p>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {q}
                <span className="font-mono text-muted transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl bg-ink px-6 py-14 text-center text-canvas">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your first track takes 18 minutes.</h2>
          <Link
            href={`/p/problem/${firstTrack.slug}`}
            className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-medium text-accent-ink hover:brightness-95"
          >
            Start now
          </Link>
        </div>
      </section>
    </>
  );
}
