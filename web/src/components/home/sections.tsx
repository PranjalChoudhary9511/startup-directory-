import { ArrowRight, CaretDown } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getTotals } from "@/lib/curriculum";
import { SURFACE_ART } from "./surface-art";

/* ───────── Inside the learning box ───────── */

const BOX_ITEMS = [
  {
    num: "01", title: "Notes", sub: "annotated tracks", pos: { top: 0, left: 8, width: 184 },
    token: (
      <span className="box-token" style={{ background: "linear-gradient(90deg, transparent 0 72%, #f5b912f5 72% 84%, transparent 84%), #ffec4f", transform: "rotate(-2deg)" }}>
        <span className="absolute bottom-[18px] left-[13px] h-[2px] w-[19px] -rotate-12 bg-[#78520d80]" />
        <span className="absolute bottom-[26px] left-[13px] h-[2px] w-[26px] -rotate-6 bg-[#78520d60]" />
      </span>
    ),
  },
  {
    num: "02", title: "Weekly drops", sub: "new tracks every Friday", pos: { top: -28, right: 0, width: 150, gridTemplateColumns: "1fr", gap: 9, justifyItems: "start" },
    token: (
      <span className="box-token" style={{ background: "#e9f111", transform: "rotate(4deg)", display: "grid", gridTemplateColumns: "repeat(4, 8px)", gap: 4, placeContent: "center" }}>
        {Array.from({ length: 16 }).map((_, i) => <i key={i} className="block h-2 w-2" style={{ background: i === 7 || i === 14 ? "#d79f1e" : "#fff9cf" }} />)}
      </span>
    ),
  },
  {
    num: "03", title: "Grants map", sub: "every scheme, by state", pos: { top: 152, left: 48 },
    token: (
      <span className="box-token" style={{ background: "#fff8ea", transform: "rotate(5deg)" }}>
        <span className="h-[34px] w-[36px] border-4 border-[#d6db37]" style={{ boxShadow: "0 0 0 4px #8fc1ff" }} />
        <span className="absolute top-[22px] left-[30px] text-[13px] font-bold text-[#c0392b]">₹</span>
      </span>
    ),
  },
  {
    num: "04", title: "Weekend arena", sub: "challenges, judged", pos: { top: 234, right: -10 },
    token: (
      <span className="box-token rounded-full" style={{ background: "#e4402c", transform: "rotate(-4deg)", width: 70, height: 70 }}>
        <span className="font-mono text-[11px] font-bold text-white">WIN</span>
      </span>
    ),
  },
  {
    num: "05", title: "Founder Dossier", sub: "proof you built it", pos: { top: 326, left: 74 },
    token: (
      <span className="box-token" style={{ background: "#2f7cf6", transform: "rotate(3deg)", clipPath: "polygon(50% 0, 61% 10%, 76% 6%, 80% 21%, 95% 26%, 90% 41%, 100% 52%, 90% 62%, 94% 78%, 79% 81%, 74% 96%, 60% 91%, 50% 100%, 39% 91%, 25% 96%, 21% 81%, 6% 77%, 10% 62%, 0 51%, 10% 41%, 5% 26%, 20% 21%, 24% 6%, 39% 10%)" }}>
        <span className="text-[20px] text-white">✓</span>
      </span>
    ),
  },
];

export function LearningBox() {
  return (
    <section className="box-section" aria-labelledby="box-title">
      <div className="box-copy">
        <h2 id="box-title">Inside the First Rupee learning box</h2>
        <p>First Rupee is not a course, a motivational channel, or another ed-tech platform.</p>
        <p>
          It brings together what founders usually learn over years of expensive mistakes: how to find a real problem, read a market, build with AI, brand, market and sell. Sequenced, practical and Indian.
        </p>
        <p>
          You can enter at 17 or at 30, from any background, and move at your own speed. The point is to leave with a working business, not a certificate.
        </p>
        <div className="box-links">
          <Link href="/pillars">Explore roadmap</Link>
          <Link href="/p/problem">Open the first pillar</Link>
        </div>
        <div className="box-signature">
          <span>— built for</span>
          <strong>builders.</strong>
        </div>
      </div>
      <div className="box-board" aria-hidden>
        <div className="box-back" />
        <div className="box-paper" />
        <div className="box-folder">
          <span className="box-folder-pocket" />
          <span className="box-folder-label">@ FIRSTRUPEE LABS</span>
          <ul className="box-items">
            {BOX_ITEMS.map((item) => (
              <li key={item.num} className="box-item" style={item.pos}>
                {item.token}
                <span>
                  <span className="num">{item.num}</span>
                  <strong>{item.title}</strong>
                  <small>{item.sub}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────── Beyond the tracks ───────── */

const SURFACES = [
  { n: "01", kicker: "Free directory", title: "Grants", sub: "Every scheme, decoded", art: "grants", href: "/grants", bg: "color-mix(in srgb, #e4402c 38%, #fbfbfb)", ink: "#1d1d1d" },
  { n: "02", kicker: "Founder cases", title: "Stories", sub: "Watch how they built it", art: "stories", href: "/stories", bg: "#e8822a", ink: "#1d1d1d" },
  { n: "03", kicker: "Reading order", title: "Books", sub: "A shelf for every pillar", art: "books", bg: "#fbfbfb", ink: "#1d1d1d" },
  { n: "04", kicker: "Weekend arena", title: "Challenges", sub: "Build, get judged, win", art: "challenges", bg: "#2b67c6", ink: "#ffffff" },
  { n: "05", kicker: "Learning paths", title: "Roadmap", sub: "Learn in order", art: "roadmap", bg: "#5cc794", ink: "#1d1d1d" },
  { n: "06", kicker: "Your proof", title: "Dossier", sub: "Show what you built", art: "dossier", bg: "#c0b6e9", ink: "#1d1d1d" },
  { n: "07", kicker: "AI review", title: "AI Coach", sub: "Feedback in seconds", art: "coach", bg: "#68bce0", ink: "#1d1d1d" },
  { n: "08", kicker: "Community signal", title: "Build wall", sub: "Build in public", art: "wall", bg: "#efce82", ink: "#1d1d1d" },
];

export function Beyond() {
  return (
    <section id="beyond" className="scroll-mt-16 bg-bg px-[max(24px,calc(50vw-580px))] pt-[86px] pb-[104px]" aria-labelledby="beyond-title">
      <p className="mono-eyebrow">Beyond the tracks</p>
      <h2 id="beyond-title" className="mt-3 max-w-[660px] text-[38px] leading-[1.06] font-semibold tracking-[-0.025em] text-balance">
        Everything else on <span className="accent-display">firstrupee.</span>
      </h2>
      <div className="surface-grid">
        {SURFACES.map((s) => (
          <Link
            key={s.n}
            href={("href" in s && s.href) || "/#beyond"}
            className="surface-card"
            style={{ "--surface-bg": s.bg, "--surface-ink": s.ink } as React.CSSProperties}
          >
            <span className="surface-art block" style={{ color: s.ink }} aria-hidden>
              {SURFACE_ART[s.art]}
            </span>
            <span className="surface-meta">
              <span>{s.n}</span>
              <span>{s.kicker}</span>
            </span>
            <span className="surface-bottom">
              <span>
                <strong>{s.title}</strong>
                <small>{s.sub}</small>
              </span>
              <span className="surface-arrow" aria-hidden>
                <ArrowRight size={15} />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ───────── Pricing ───────── */

export function PricingPreview() {
  const totals = getTotals();
  return (
    <section id="pricing" className="scroll-mt-16 bg-bg px-[max(24px,calc(50vw-580px))] pt-[84px] pb-[90px]" aria-labelledby="pricing-title">
      <div className="flex items-end justify-between gap-6">
        <p id="pricing-title" className="mono-eyebrow">Plans</p>
        <Link href="/#pricing" className="flex items-center gap-1.5 text-[13px] font-semibold">
          View full pricing <ArrowRight size={14} />
        </Link>
      </div>
      <div className="trust-strip">
        <span>{totals.pillars} pillars · {totals.tracks} tracks</span>
        <span>New tracks every week</span>
        <span>Priced for India · UPI accepted</span>
      </div>
      <div className="price-grid">
        <article className="price-card">
          <div className="price-head"><span>Monthly</span></div>
          <div className="price-discount"><span>Full paid access</span></div>
          <div className="price-amount"><strong>₹499</strong><span>/month</span></div>
          <small className="price-note">Billed monthly (₹499)</small>
          <p>Every pillar and every track, with the shortest commitment.</p>
          <Link href="/login" className="price-link">Choose Monthly <ArrowRight size={14} /></Link>
        </article>
        <article className="price-card">
          <div className="price-head"><span>Annual</span></div>
          <div className="price-discount"><s>₹499</s><strong>50% off</strong></div>
          <div className="price-amount"><strong>₹250</strong><span>/month</span></div>
          <small className="price-note">₹2,999 billed yearly</small>
          <p>The same full access at the lowest recurring rate, plus the weekend challenges.</p>
          <Link href="/login" className="price-link">Choose Annual <ArrowRight size={14} /></Link>
        </article>
        <article className="price-card is-strong">
          <div className="price-head"><span>Founding member</span><strong>First 1,000 only</strong></div>
          <div className="price-discount"><strong>All future pillars included</strong></div>
          <div className="price-amount"><strong>₹4,999</strong><span>paid once</span></div>
          <small className="price-note">One payment, no renewal</small>
          <p>Every current track, every future pillar, the founders&apos; community and every update.</p>
          <Link href="/login" className="price-link">See founding offer <ArrowRight size={14} /></Link>
        </article>
      </div>
    </section>
  );
}

/* ───────── Build wall ───────── */

const SKELETONS: { pos: React.CSSProperties; rotate: number }[] = [
  { pos: { top: 44, left: 0 }, rotate: -1.4 },
  { pos: { top: 8, right: 0 }, rotate: 1.2 },
  { pos: { top: 300, left: "6%" }, rotate: 0.7 },
  { pos: { top: 270, right: "2%" }, rotate: -1 },
];

export function BuildWall() {
  return (
    <section id="together" className="together scroll-mt-16" aria-labelledby="together-title">
      <div className="together-inner">
        <div className="together-collage" aria-hidden>
          {SKELETONS.map((s, i) => (
            <div key={i} className="wall-skeleton" style={{ ...s.pos, transform: `rotate(${s.rotate}deg)` }}>
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full bg-chip" />
                <i className="!mt-0 w-20" />
              </div>
              <i className="w-full" />
              <i className="w-4/5" />
              <i className="w-3/5" />
            </div>
          ))}
          <div className="wall-empty">
            <p className="text-[13px]">The build wall opens with the first cohort: daily logs from people finding problems, talking to customers and shipping.</p>
            <Link href="/login" className="text-[13px] font-semibold text-fg1 underline underline-offset-3">Get yourself on the list</Link>
          </div>
        </div>
        <div className="max-w-[490px]">
          <p className="mono-eyebrow">Build wall</p>
          <h2 id="together-title" className="mt-3 text-[clamp(32px,3.3vw,48px)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
            Keep company with people building.
          </h2>
          <p className="mt-[22px] max-w-[450px] text-[14px] leading-[1.72] text-fg2">
            Public build logs from people interviewing customers, getting supplier quotes, running their first ad and making their first sale. Learn in public, together.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link href="/login" className="btn-primary is-sm">Enter the build wall <ArrowRight size={14} /></Link>
            <Link href="/login" className="btn-secondary !h-10 !px-4">Get yourself on the list</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */

const FAQS = [
  {
    q: "Where should I start?",
    a: "Start free with Pillar 1, Problem. If you already have a validated idea, jump to Market Research. If building is the blocker, open Basics of AI. The first module of every pillar is free.",
  },
  {
    q: "I'm 17. Is this for me?",
    a: "Yes. Every track is written so a Class 11 student can follow it, with real Indian examples. You won't need money to start: the early tasks are interviews, observation and research.",
  },
  {
    q: "I have a full-time job. How much time does it take?",
    a: "Each track is a 12–20 minute video, a short read and a task under an hour. Two or three tracks a week moves you through a pillar in about a month.",
  },
  {
    q: "Is this only for tech startups?",
    a: "No. Tracks cover D2C brands, services, manufacturing, chemicals, agriculture, B2B and selling to the government, alongside tech.",
  },
  {
    q: "Can I use it before paying?",
    a: "Yes. The first module of all eight pillars, the grants directory, the books shelf and the founder stories are free.",
  },
  {
    q: "How often does the material change?",
    a: "New tracks ship every week. Tool walkthroughs in Basics of AI are re-recorded every few months so they stay current.",
  },
];

export function Faq() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="max-w-[390px]">
        <p className="mono-eyebrow">FAQ</p>
        <h2 id="faq-title" className="mt-3 text-[30px] leading-[1.12] font-semibold text-balance">Questions people ask before joining.</h2>
        <p className="mt-[18px] text-[13px] leading-[1.65] text-fg2">Still unsure? Open track 01.01. It takes 18 minutes and costs nothing.</p>
      </div>
      <div className="faq-list">
        {FAQS.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>
              {f.q}
              <CaretDown size={16} />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ───────── Closing CTA ───────── */

export function RoadmapCta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-4 pb-24 sm:px-6 2xl:max-w-[1480px]" aria-labelledby="cta-title">
      <div className="grid-card p-6 sm:p-9">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="mono-eyebrow">Eight pillars / one map</p>
            <h2 id="cta-title" className="accent-display mt-4 text-2xl leading-tight sm:text-3xl">Check out the roadmap.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-fg2">See what to learn, in what order, then start with the first useful pillar.</p>
          </div>
          <Link href="/pillars" className="btn-primary is-sm !text-[15px]">
            Get started <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
