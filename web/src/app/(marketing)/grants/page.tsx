import { ArrowDown, ArrowRight, ArrowUpRight, SealCheck, ShieldWarning } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { GrantsExplorer } from "@/components/grants/explorer";
import { Guilloche, SecurityLines } from "@/components/grants/guilloche";
import { GIANTS, GRANTS, isEquityFree, toCard } from "@/content/grants";

export const metadata: Metadata = {
  title: "Grants Vault: every startup grant in India",
  description:
    "Central and state government grants, seed funds, fellowships, prizes and credits for Indian founders and students, each explained in plain words with eligibility, steps, pros, cons and performance data.",
};

const SOP = [
  ["01", "What it is", "One plain sentence, then what it pays for"],
  ["02", "Who can get it", "Eligibility, and the disqualifiers people miss"],
  ["03", "Why get it", "Beyond the money: credibility, network, follow-on"],
  ["04", "How it works", "Who decides and how the money flows"],
  ["05", "Step by step", "From preparing to your first rupee"],
  ["06", "Documents", "A checklist to keep ready"],
  ["07", "Pros & cons", "Honest trade-offs, side by side"],
  ["08", "Should you apply?", "Good fit if, skip if, and a self-check"],
  ["09", "Performance", "Year-wise data since launch, with sources"],
  ["10", "Apply", "Official links only. Never an agent."],
];

export default function GrantsPage() {
  const grants = GRANTS.map(toCard);
  const states = new Set(GRANTS.map((g) => g.state).filter(Boolean)).size;
  const central = GRANTS.filter((g) => g.providerType === "central").length;
  const privateGlobal = GRANTS.filter((g) => g.providerType === "private" || g.providerType === "global").length;
  const equityFree = GRANTS.filter(isEquityFree).length;
  const lastVerified = GRANTS.map((g) => g.lastVerified).sort().at(-1);

  const stats = [
    { value: GRANTS.length, label: "Grants & schemes" },
    { value: central, label: "Central govt" },
    { value: states, label: "States & UTs" },
    { value: privateGlobal, label: "Private & global" },
    { value: equityFree, label: "Need no equity" },
  ];

  return (
    <>
      {/* ───────── Vault hero ───────── */}
      <section className="vault-hero">
        <span className="security-thread left-[62%] hidden lg:block" />
        <SecurityLines className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-[#e8d08a]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pt-16 pb-24 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-20">
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-[#e8d08a] uppercase">
              <SealCheck size={14} weight="fill" /> The Grants Vault · verified {lastVerified ?? "—"}
            </p>
            <h1 className="mt-5 text-[38px] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-[52px]">
              Free money is real.
              <br />
              <span className="accent-display text-[#f3dc95]">Know where it is.</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-[#cfe3d2]">
              Every grant, seed fund, fellowship and credit programme an Indian founder or student can use, from the Government of India and your state to private and global funds.
              Each one decoded: who gets it, how to apply, what can go wrong, and how it has really performed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#finder" className="inline-flex h-12 items-center gap-2 rounded-[9px] bg-[#f3dc95] px-5 text-[15px] font-semibold text-[#0d3b2e] transition-[filter] hover:brightness-105">
                Find my grants <ArrowDown size={16} />
              </a>
              <a href="#sop" className="inline-flex h-12 items-center gap-2 rounded-[9px] border border-[#ffffff33] px-5 text-[14px] font-medium text-[#eef6ee] hover:bg-[#ffffff12]">
                How we verify
              </a>
            </div>
          </div>

          <div className="relative mx-auto grid w-full max-w-[400px] min-w-0 place-items-center text-[#e8d08a]" aria-hidden>
            <Guilloche size={400} className="h-auto w-full" />
            <div className="absolute grid place-items-center">
              <span className="accent-display text-[96px] leading-none text-[#f3dc95] drop-shadow-[0_2px_0_#0a2a20]">₹</span>
              <span className="mt-1 font-mono text-[11px] tracking-[0.3em] text-[#cfe3d2]">FR {String(GRANTS.length).padStart(3, "0")} 2026</span>
            </div>
            <span className="absolute top-6 left-2 font-mono text-[10px] tracking-[0.2em] text-[#cfe3d2]/70">8FR 284551</span>
            <span className="absolute right-2 bottom-6 font-mono text-[10px] tracking-[0.2em] text-[#cfe3d2]/70">FIRST RUPEE · VAULT</span>
          </div>
        </div>

        <div className="relative mx-auto -mt-10 max-w-6xl px-5 pb-12 sm:px-6">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#ffffff1f] bg-[#ffffff1f] sm:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#0d3b2e]/80 px-5 py-4 backdrop-blur">
                <dd className="accent-display text-[30px] leading-none text-[#f3dc95]">{s.value}</dd>
                <dt className="mt-2 font-mono text-[10px] tracking-[0.1em] text-[#cfe3d2] uppercase">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── Giants took the cheque ───────── */}
      {GIANTS.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mono-eyebrow">Before they were giants</p>
              <h2 className="mt-2 text-[24px] leading-tight font-semibold tracking-[-0.02em]">
                Even the biggest names <span className="accent-display">took the first cheque.</span>
              </h2>
            </div>
            <p className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-fg3 uppercase">
              {GIANTS.length} stories · scroll <ArrowRight size={12} />
            </p>
          </div>
          {/* Compact, equal-height cheques; the right edge fades so the row reads as scrollable. */}
          <div className="mt-5 flex snap-x gap-3.5 overflow-x-auto pb-3 [mask-image:linear-gradient(90deg,#000_90%,transparent)] [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]">
            {GIANTS.map((g) => (
              <a
                key={g.name + g.year}
                href={g.source.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${g.story} ${g.lesson}`}
                className="cheque h-[276px] w-[280px] shrink-0 snap-start !min-h-0 !pt-4 !pb-3.5"
                style={{ "--cheque-ink": "#7a5a12", "--cheque-paper": "#fbf3df" } as React.CSSProperties}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="accent-display truncate text-[20px]">{g.name}</span>
                  <span className="font-mono text-[11px] text-[#7a5a12]">{g.year}</span>
                </div>
                <p className="mt-0.5 truncate font-mono text-[9.5px] tracking-[0.08em] text-fg3 uppercase">{g.program}</p>
                <p className="mt-2.5 line-clamp-1 text-[16px] font-semibold tracking-tight">{g.amount}</p>
                <p className="mt-1.5 line-clamp-3 text-[12.5px] leading-[1.55] text-fg2">{g.story}</p>
                <p className="mt-auto line-clamp-2 pt-2 text-[12.5px] leading-snug font-medium text-fg1">→ {g.lesson}</p>
                <span className="micr mt-2 flex min-w-0 items-center gap-1">
                  <span className="truncate">Source: {g.source.label}</span> <ArrowUpRight size={10} className="shrink-0" />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <a href="#finder" className="chip !h-9 !px-4 !text-[13px]">
              {GRANTS.length} grants &amp; schemes below <ArrowDown size={13} />
            </a>
          </div>
        </section>
      )}

      {/* ───────── Finder + list ───────── */}
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-8 sm:px-6">
        {grants.length ? (
          <GrantsExplorer grants={grants} />
        ) : (
          <div className="grid-card p-10 text-center text-[14px] text-fg2">The vault is being stocked. Check back shortly.</div>
        )}
      </section>

      {/* ───────── SOP ───────── */}
      <section id="sop" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-6">
        <div className="grid-card overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mono-eyebrow">Our grant SOP</p>
              <h2 className="mt-2 text-[28px] leading-tight font-semibold tracking-[-0.02em]">
                Every grant, decoded <span className="accent-display">the same way.</span>
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-fg2">
                Compare any two grants line by line. Numbers come only from official or cited sources, with an &ldquo;as of&rdquo; date. If something isn&apos;t published, we say so instead of guessing.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#b26a00]/30 bg-[#b26a00]/8 p-4 text-[13px] leading-relaxed">
                <ShieldWarning size={20} className="mt-0.5 shrink-0 text-[#b26a00]" />
                <p>
                  <strong>Never pay an agent to &ldquo;get&rdquo; a government grant.</strong> Every scheme here is applied for on its official site, and none of them charge you to apply. We link only to official pages.
                </p>
              </div>
            </div>
            <ol className="grid gap-2 sm:grid-cols-2">
              {SOP.map(([n, title, sub]) => (
                <li key={n} className="flex gap-3 rounded-xl bg-sidebar px-4 py-3">
                  <span className="accent-display text-[18px] leading-none text-[#0d3b2e]">{n}</span>
                  <span>
                    <span className="block text-[13.5px] font-semibold">{title}</span>
                    <span className="block text-[12px] text-fg2">{sub}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="mt-6 text-center text-[13px] text-fg2">
          Not sure yet? Learn how funding works in{" "}
          <Link href="/p/money-and-ops" className="font-semibold text-fg1 underline underline-offset-2">Pillar 08 · Money &amp; Ops</Link>.
        </p>
      </section>
    </>
  );
}
