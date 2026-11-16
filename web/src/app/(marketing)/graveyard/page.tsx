import { ArrowDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Cemetery } from "@/components/graveyard/cemetery";
import { PreMortem } from "@/components/graveyard/interactive";
import { NightSky } from "@/components/graveyard/night-sky";
import "@/components/graveyard/graveyard.css";
import { CAUSES, cemeteryStats, graves, toCard, usd } from "@/content/graveyard";

export const metadata: Metadata = {
  title: "The Graveyard: why famous startups died",
  description:
    "The most famous failed startups from India and the world, from Byju's and Dunzo to Theranos and WeWork. Open any grave for a plain-language autopsy: what went wrong, the mistakes, the numbers, and what to learn.",
};

export default function GraveyardPage() {
  const all = graves();
  const cards = all.map(toCard);
  const s = cemeteryStats();
  const flagship = all.find((g) => g.slug === "byjus") ?? all[0];
  const maxCause = s.causes[0]?.deaths ?? 1;
  const maxYear = Math.max(1, ...s.deathsByYear.map((d) => d.count));
  const maxRaised = s.biggest[0]?.raisedUsdM ?? 1;

  return (
    <div className="gy">
      {/* ───────── Night ───────── */}
      <section className="gy-sky">
        <NightSky />
        <div className="relative mx-auto flex max-w-[var(--content-max)] flex-col px-5 pt-20 pb-56 sm:px-6 lg:pt-28">
          <p className="gy-eyebrow">The Graveyard · {s.count} startups, laid to rest</p>
          <h1 className="mt-4 max-w-[760px] text-[42px] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-[64px]">
            Here lie <span className="gy-serif text-[var(--moon)]">{usd(s.raised)}</span> of good ideas.
          </h1>
          <p className="mt-6 max-w-[560px] text-[16.5px] leading-relaxed text-[var(--on-night-2)]">
            Every company here raised money, hired people, and believed. Then it died. Open any grave to read why, in plain words: the mistakes, the numbers, the warning signs. Their failures cost billions. Reading them costs you nothing.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#cemetery" className="gy-btn-moon">
              Walk the graveyard <ArrowDown size={15} />
            </a>
            {flagship && (
              <Link href={`/graveyard/${flagship.slug}`} className="gy-btn-ghost">
                Start with {flagship.name} <ArrowRight size={14} />
              </Link>
            )}
          </div>
          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
            {[
              [s.count, "graves"],
              [s.india, "from India"],
              [usd(s.raised), "raised, then lost"],
              [`${s.medianLife} yrs`, "typical lifespan"],
            ].map(([v, l]) => (
              <div key={l as string}>
                <dd className="accent-display text-[30px] leading-none text-[var(--on-night)]">{v}</dd>
                <dt className="mt-1.5 font-mono text-[10px] tracking-[0.12em] text-[var(--on-night-3)] uppercase">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── What kills a startup ───────── */}
      <section className="gy-night">
        <div className="mx-auto max-w-[var(--content-max)] px-5 pt-20 pb-16 sm:px-6">
          <p className="gy-eyebrow">Before you walk in</p>
          <h2 className="mt-3 max-w-[640px] text-[30px] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-[38px]">
            They died of <span className="gy-serif">the same few things.</span>
          </h2>
          <p className="mt-3 max-w-[560px] text-[15px] text-[var(--on-night-2)]">
            Brilliant founders, different countries, different decades. Line up the causes of death and the same patterns repeat. Learn the patterns and you can spot them early in your own company.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
            <div className="gy-panel p-6 sm:p-7">
              <p className="text-[15px] font-semibold">What killed them</p>
              <p className="mt-0.5 text-[12.5px] text-[var(--on-night-3)]">Share of all {s.count} deaths. Most had more than one cause; each grave&apos;s causes are split by weight.</p>
              <ul className="mt-6 space-y-3.5">
                {s.causes.slice(0, 9).map((c) => (
                  <li key={c.key} className="grid grid-cols-[130px_1fr_44px] items-center gap-3 sm:grid-cols-[170px_1fr_48px]">
                    <span className="truncate text-[13.5px]" title={CAUSES[c.key].line}>
                      {CAUSES[c.key].label}
                    </span>
                    <span className="gy-bar-track">
                      <span className="gy-bar-fill block" style={{ width: `${(c.deaths / maxCause) * 100}%` }} />
                    </span>
                    <span className="text-right font-mono text-[12px] text-[var(--on-night-2)]">{Math.round((c.deaths / s.count) * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-5">
              <div className="gy-panel p-6 sm:p-7">
                <p className="text-[15px] font-semibold">When they died</p>
                <p className="mt-0.5 text-[12.5px] text-[var(--on-night-3)]">Graves per year. The tall bars line up with funding crashes: India&apos;s 2015–16 shakeout and the 2022–23 funding winter.</p>
                <div className="mt-6 flex h-[120px] items-end gap-[2px]">
                  {s.deathsByYear.map((d) => (
                    <span key={d.year} className="group relative flex h-full flex-1 items-end" title={`${d.year}: ${d.count}`}>
                      <span className="gy-col w-full" style={{ height: d.count ? `${(d.count / maxYear) * 100}%` : 0 }} />
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--on-night-3)]">
                  <span>{s.deathsByYear[0]?.year}</span>
                  <span>{s.deathsByYear[s.deathsByYear.length - 1]?.year}</span>
                </div>
              </div>

              <div className="gy-panel p-6 sm:p-7">
                <p className="text-[15px] font-semibold">The biggest burns</p>
                <ul className="mt-4 space-y-2.5">
                  {s.biggest.slice(0, 6).map((g) => (
                    <li key={g.slug}>
                      <Link href={`/graveyard/${g.slug}`} className="group grid grid-cols-[96px_1fr_56px] items-center gap-3">
                        <span className="truncate text-[13px] group-hover:underline">{g.name}</span>
                        <span className="gy-bar-track !h-[6px]">
                          <span className="gy-bar-fill block" style={{ width: `${((g.raisedUsdM ?? 0) / maxRaised) * 100}%` }} />
                        </span>
                        <span className="text-right font-mono text-[11.5px] text-[var(--on-night-2)]">{usd(g.raisedUsdM)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ───────── The cemetery ───────── */}
        <section id="cemetery" className="scroll-mt-[var(--topbar-h)]">
          <div className="mx-auto max-w-[var(--content-max)] px-5 pt-8 pb-8 sm:px-6">
            <p className="gy-eyebrow">The cemetery</p>
            <h2 className="mt-3 text-[30px] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-[38px]">
              Pick a stone. <span className="gy-serif">Read how it ended.</span>
            </h2>
          </div>
          <Cemetery graves={cards} />
        </section>
      </section>

      {/* ───────── Dawn: your turn ───────── */}
      <section className="gy-dawn relative overflow-hidden">
        <div className="gy-sun" aria-hidden />
        <div className="relative mx-auto max-w-[920px] px-5 pt-28 pb-28 sm:px-6">
          <div className="text-center text-[var(--on-night)]">
            <p className="gy-eyebrow !text-[#f3dccb]">Morning</p>
            <h2 className="mx-auto mt-3 max-w-[640px] text-[32px] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[44px]">
              The sun still comes up <span className="gy-serif">for the next founder.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[15.5px] leading-relaxed text-[#f6e6da]">
              Nobody here was stupid. Most were brilliant, and brave enough to try. What they lacked was a map of the traps. Now you have one. Run a quick pre-mortem (imagine your startup died, then ask why) before you build.
            </p>
          </div>
          <div className="mt-12">
            <PreMortem graves={cards.map(({ slug, name, cause, causes, died }) => ({ slug, name, cause, causes, died }))} />
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <Link href="/stories" className="btn-primary">
              Now watch how the winners did it <ArrowRight size={15} />
            </Link>
            <Link href="/pillars" className="btn-secondary !h-12 !px-4">
              Start learning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
