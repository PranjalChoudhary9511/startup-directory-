import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Clock,
  Flag,
  Flask,
  House,
  Quotes,
  RocketLaunch,
  SealCheck,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Guilloche } from "@/components/grants/guilloche";
import type { BrandNotes, Photo } from "@/content/stories/notes";
import { alpha, onColor } from "@/content/stories/notes-color";
import type { CompanyStory } from "@/content/stories/schema";
import { CountUp, FlipCard, FlipHint, type Moment, Moments, PrintButton, TiltStage } from "./notes-client";

type Kind = BrandNotes["founder"]["journey"][number]["kind"];

const KIND: Record<Kind, { label: string; icon: typeof House }> = {
  life: { label: "Life", icon: House },
  job: { label: "Job", icon: Briefcase },
  attempt: { label: "Attempt", icon: Flask },
  failure: { label: "Failure", icon: XCircle },
  breakthrough: { label: "Breakthrough", icon: RocketLaunch },
  now: { label: "Now", icon: Flag },
};

const CHAPTERS = [
  ["founder", "Founder"],
  ["life-map", "Life map"],
  ["darkest-hour", "Darkest hour"],
  ["mindset", "Mindset"],
  ["company", "Company"],
  ["failures", "Failures"],
  ["moments", "Moments"],
  ["lessons", "Lessons"],
  ["sources", "Sources"],
] as const;

/** Superscript source markers, linking to the numbered list at the end. */
function Cites({ src }: { src: number[] }) {
  return (
    <>
      {src.map((i) => (
        <a key={i} href={`#src-${i + 1}`} className="notes-cite">
          [{i + 1}]
        </a>
      ))}
    </>
  );
}

/** First + last initial, ignoring titles: "Captain C. P. Krishnan Nair" → "CN". */
function initials(name: string) {
  const words = name
    .replace(/^(dr|capt|captain|sir|mr|mrs|ms|shri)\.?\s+/i, "")
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w));
  if (!words.length) return "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (words[0][0] + last).toUpperCase();
}

/** A Commons photo with its credit on hover (and in the credits list). Falls back to an initials disc. */
function Pic({ p, name, className, duotone }: { p: Photo | null; name: string; className?: string; duotone?: boolean }) {
  if (!p) {
    return (
      <div className={`relative grid place-items-center overflow-hidden ${className ?? ""}`} style={{ background: "var(--b1)", color: "var(--on1)" }}>
        <Guilloche size={420} color="currentColor" spin={false} className="absolute h-[140%] w-[140%] opacity-25" />
        <span className="accent-display relative text-[clamp(40px,8vw,96px)] leading-none">{initials(name)}</span>
      </div>
    );
  }
  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- Wikimedia Commons file (credited below)
    <img src={p.url} alt={p.caption} title={`${p.caption}. Photo: ${p.author} (${p.license}), Wikimedia Commons`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover object-[50%_25%]" />
  );
  return duotone ? <div className={`notes-duotone ${className ?? ""}`}>{img}</div> : <div className={`overflow-hidden ${className ?? ""}`}>{img}</div>;
}

function Shapes() {
  return (
    <div aria-hidden className="no-print pointer-events-none absolute inset-0">
      <div className="shape shape-rings top-[8%] right-[6%]" style={{ "--s": "170px", "--c": "var(--b3)" } as CSSProperties}>
        <i /><i /><i />
      </div>
      <div className="shape shape-cube bottom-[16%] left-[48%] hidden md:block" style={{ "--s": "70px", "--c": "var(--on1)" } as CSSProperties}>
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="shape shape-orb right-[34%] bottom-[8%] hidden lg:block" style={{ "--s": "64px", "--c": "var(--b3)" } as CSSProperties} />
      <div className="shape shape-coin top-[14%] left-[46%] hidden lg:block" style={{ "--s": "54px", "--c": "var(--b2)" } as CSSProperties} />
    </div>
  );
}

function SectionHead({ n, eyebrow, title, children }: { n: number; eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="notes-eyebrow opacity-70">
          {String(n).padStart(2, "0")} · {eyebrow}
        </p>
        <h2 className="notes-h2 mt-3">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function NotesView({ n, story, moments, next }: { n: BrandNotes; story: CompanyStory; moments: Moment[]; next: { slug: string; company: string } | null }) {
  const p = n.palette;
  const on1 = onColor(p.primary);
  const F = n.founder;
  const theme = { "--b1": p.primary, "--b2": p.secondary, "--b3": p.accent, "--bi": p.ink, "--bp": p.paper, "--on1": on1 } as CSSProperties;
  const photos = [F.portrait, ...F.photos].filter((x): x is Photo => !!x);
  const allPhotos = [...photos, ...n.cast.map((c) => c.photo).filter((x): x is Photo => !!x)];
  const steps = F.journey.filter((j) => j.kind !== "life" && j.kind !== "now");
  const mix = (["job", "attempt", "failure", "breakthrough"] as const)
    .map((k) => ({ k, count: steps.filter((j) => j.kind === k).length }))
    .filter((x) => x.count);
  const MIX_COLOR: Record<string, string> = { job: p.primary, attempt: p.secondary, failure: "#b42318", breakthrough: p.accent };
  // With no free portrait of the founder, the first archive photo (a hotel, a factory) leads.
  const lead = F.portrait ?? F.photos[0] ?? null;
  const sideA = photos.find((x) => x !== lead) ?? null;
  const sideB = lead;
  const name = story.company; // short display name ("The Leela", not the legal name)
  const ticker = F.journey.map((j) => `${j.year} · ${j.title}`);

  return (
    <article className="notes" style={theme}>
      {/* ───────── Cover ───────── */}
      <section className="relative overflow-hidden" style={{ background: "var(--b1)", color: "var(--on1)" }}>
        <Guilloche size={900} color="currentColor" className="pointer-events-none absolute -top-40 -left-60 opacity-[0.12]" />
        <Shapes />
        <div className="relative mx-auto grid min-h-[calc(100svh-var(--topbar-h))] max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <Link href={`/stories/${story.slug}`} className="no-print inline-flex items-center gap-1.5 text-[13px] opacity-75 hover:opacity-100">
              <ArrowLeft size={13} /> Back to the films
            </Link>
            <p className="notes-eyebrow mt-8 opacity-75">First Rupee notes · {story.founded ?? ""}{story.founded ? " → today" : ""}</p>
            <h1 className="accent-display mt-4 text-[clamp(52px,9vw,124px)] leading-[0.92] tracking-[-0.03em]">{name}</h1>
            <p className="mt-5 max-w-xl text-[clamp(18px,2vw,24px)] leading-snug font-medium opacity-90">{n.tagline}</p>
            <p className="mt-8 max-w-xl rounded-2xl px-5 py-4 text-[16px] leading-relaxed" style={{ background: alpha(on1, 0.1), boxShadow: `inset 0 0 0 1px ${alpha(on1, 0.18)}` }}>
              {n.hook}
              <Cites src={n.hookSrc} />
            </p>
            <div className="no-print mt-8 flex flex-wrap items-center gap-3">
              <a href="#founder" className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-semibold" style={{ background: "var(--on1)", color: "var(--b1)" }}>
                Start reading <ArrowDown size={14} weight="bold" />
              </a>
              <PrintButton className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-semibold" style={{ boxShadow: `inset 0 0 0 1.5px ${alpha(on1, 0.5)}` }} />
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] opacity-70">
              <span className="inline-flex items-center gap-1.5"><SealCheck size={13} weight="fill" /> Fact-checked {new Date(n.verifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              <span>{n.sources.length} sources</span>
              <span>{allPhotos.length} archive photos</span>
            </p>
          </div>

          <div className="notes-stage relative mx-auto w-full max-w-[420px]">
            <TiltStage>
              <figure className="notes-polaroid rotate-[2deg]" style={{ color: "var(--bi)" }}>
                <Pic p={lead} name={F.name} className="aspect-[4/5] w-full rounded-[3px]" />
                <figcaption className="absolute right-4 bottom-3 left-4 flex items-baseline justify-between gap-3">
                  <span className={F.portrait ? "accent-display truncate text-[16px]" : "truncate text-[12.5px] font-medium"}>{F.portrait ? F.name : lead?.caption}</span>
                  <span className="shrink-0 font-mono text-[10px] opacity-60">{lead?.year ?? ""}</span>
                </figcaption>
              </figure>
              {sideA && (
                <div className="notes-polaroid absolute -bottom-10 -left-10 hidden w-[44%] -rotate-[8deg] sm:block" style={{ transform: "translateZ(60px) rotate(-8deg)", paddingBottom: 12 }}>
                  <Pic p={sideA} name={F.name} className="aspect-square w-full rounded-[3px]" />
                </div>
              )}
            </TiltStage>
          </div>
        </div>

        {/* Years ticker */}
        <div className="no-print relative overflow-hidden border-t py-3" style={{ borderColor: alpha(on1, 0.15) }}>
          <div className="notes-ticker gap-10 font-mono text-[12px] whitespace-nowrap opacity-75">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="pr-10">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Chapter rail ───────── */}
      <nav aria-label="Chapters" className="notes-rail">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 py-2 sm:px-6">
          {CHAPTERS.map(([id, label], i) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full px-3 py-1.5 text-[12.5px] font-medium opacity-70 transition hover:opacity-100" style={{ color: "var(--bi)" }}>
              <span className="font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span> {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ───────── 01 Founder ───────── */}
      <section id="founder" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-20 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div className="relative">
            <Pic p={lead} name={F.name} className="aspect-[4/5] w-full rounded-[20px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]" duotone />
            <div className="absolute -right-3 -bottom-3 rounded-full px-4 py-2 font-mono text-[11px] shadow-lg" style={{ background: "var(--b3)", color: onColor(p.accent) }}>
              {F.role}
            </div>
          </div>
          <div>
            <p className="notes-eyebrow opacity-70">01 · The founder</p>
            <h2 className="notes-h2 mt-3">{F.name}</h2>
            <div className="mt-5 flex flex-wrap gap-2 text-[13px]">
              <span className="rounded-full px-3 py-1.5" style={{ background: alpha(p.primary, 0.1) }}>Born {F.born}</span>
              {F.died && <span className="rounded-full px-3 py-1.5" style={{ background: alpha(p.primary, 0.1) }}>Died {F.died}</span>}
            </div>
            <p className="mt-6 font-article text-[18px] leading-[1.75]">
              {F.background}
              <Cites src={F.backgroundSrc} />
            </p>

            {photos.length > 1 && (
              <div className="mt-10 flex flex-wrap gap-5">
                {photos.filter((x) => x !== lead).slice(0, 4).map((ph, i) => (
                  <figure key={ph.url} className="notes-polaroid w-[46%] sm:w-[200px]" style={{ transform: `rotate(${i % 2 ? 2.5 : -2.5}deg)`, paddingBottom: 12 }}>
                    <Pic p={ph} name={F.name} className="aspect-[4/3] w-full rounded-[3px]" />
                    <figcaption className="mt-2 line-clamp-2 text-[11.5px] leading-snug opacity-75">
                      {ph.year ? <span className="font-mono">{ph.year} · </span> : null}
                      {ph.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {n.cast.length > 0 && (
              <div className="mt-12">
                <p className="notes-eyebrow opacity-60">The people around them</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {n.cast.map((c) => (
                    <li key={c.name} className="flex items-center gap-3 rounded-2xl p-3" style={{ background: alpha(p.primary, 0.06) }}>
                      <Pic p={c.photo} name={c.name} className="h-14 w-14 shrink-0 rounded-full text-[14px] [&_span]:!text-[18px]" />
                      <span className="min-w-0">
                        <span className="block text-[14.5px] font-semibold">{c.name}</span>
                        <span className="block text-[12.5px] leading-snug opacity-70">
                          {c.role}
                          <Cites src={c.src} />
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── 02 Life map ───────── */}
      <section id="life-map" className="scroll-mt-28 print-break py-20" style={{ background: alpha(p.primary, 0.05) }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHead n={2} eyebrow="Every job, attempt and fall" title="The life map" />

          {/* What the road was made of */}
          <div className="mt-8 max-w-2xl">
            <div className="mix-bar flex h-3 overflow-hidden rounded-full">
              {mix.map((m) => (
                <span key={m.k} style={{ flex: m.count, background: MIX_COLOR[m.k] }} />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px]">
              {mix.map((m) => (
                <li key={m.k} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: MIX_COLOR[m.k] }} />
                  <b>{m.count}</b> {KIND[m.k].label.toLowerCase()}{m.count > 1 ? "s" : ""}
                </li>
              ))}
            </ul>
          </div>

          <ol className="relative mt-14">
            <span aria-hidden className="life-spine" />
            {F.journey.map((j, i) => {
              const Icon = KIND[j.kind].icon;
              const left = i % 2 === 0;
              const card = (
                <div className={`reveal rounded-2xl p-5 ${j.kind === "failure" ? "" : "bg-white/70"}`} style={j.kind === "failure" ? { background: "#b423180d", boxShadow: "inset 0 0 0 1px #b4231833" } : { boxShadow: `0 1px 0 ${alpha(p.ink, 0.06)}, 0 20px 40px -30px ${alpha(p.ink, 0.35)}` }}>
                  <p className="flex items-center gap-2">
                    <span className="accent-display text-[26px] leading-none" style={{ color: j.kind === "failure" ? "#b42318" : "var(--b1)" }}>{j.year}</span>
                    <span className="rounded-full px-2 py-0.5 font-mono text-[9.5px] tracking-[0.08em] uppercase" style={{ background: alpha(p.ink, 0.07) }}>{KIND[j.kind].label}</span>
                  </p>
                  <p className="mt-2 text-[16px] leading-snug font-semibold">{j.title}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed opacity-80">
                    {j.detail}
                    <Cites src={j.src} />
                  </p>
                </div>
              );
              return (
                <li key={i} className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 pb-8 min-[900px]:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] min-[900px]:gap-8">
                  <div className={`hidden min-[900px]:block ${left ? "" : "invisible"}`}>{left && card}</div>
                  <div className="life-node" data-kind={j.kind}>
                    {j.kind === "now" && F.portrait ? (
                      // eslint-disable-next-line @next/next/no-img-element -- founder photo (credited)
                      <img src={F.portrait.url} alt="" className="h-full w-full rounded-full object-cover object-[50%_25%]" referrerPolicy="no-referrer" />
                    ) : (
                      <Icon size={20} weight={j.kind === "breakthrough" || j.kind === "now" ? "fill" : "regular"} />
                    )}
                  </div>
                  <div className="min-[900px]:hidden">{card}</div>
                  <div className={`hidden min-[900px]:block ${left ? "invisible" : ""}`}>{!left && card}</div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ───────── 03 Darkest hour ───────── */}
      <section id="darkest-hour" className="scroll-mt-28 relative overflow-hidden text-white" style={{ background: `color-mix(in srgb, ${p.primary} 22%, #090909)` }}>
        {sideB && (
          <div aria-hidden className="absolute inset-y-0 right-0 w-full opacity-30 md:w-[55%]" style={{ maskImage: "linear-gradient(90deg, transparent, #000 45%)" }}>
            <Pic p={sideB} name={F.name} className="h-full w-full [&_img]:grayscale" />
          </div>
        )}
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6">
          <p className="notes-eyebrow" style={{ color: p.accent }}>03 · The darkest hour</p>
          <h2 className="notes-h2 mt-3 max-w-3xl">{F.darkestHour.title}</h2>
          <p className="mt-8 max-w-2xl font-article text-[19px] leading-[1.75] text-white/85">
            {F.darkestHour.story}
            <Cites src={F.darkestHour.src} />
          </p>
          {n.quotes[0] && (
            <blockquote className="mt-12 max-w-2xl border-l-2 pl-6" style={{ borderColor: p.accent }}>
              <p className="accent-display text-[22px] leading-snug">“{n.quotes[0].text}”</p>
              <footer className="mt-3 font-mono text-[11px] text-white/60">
                {n.quotes[0].who}
                <Cites src={n.quotes[0].src} />
              </footer>
            </blockquote>
          )}
        </div>
      </section>

      {/* ───────── 04 Mindset ───────── */}
      <section id="mindset" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-20 sm:px-6">
        <SectionHead n={4} eyebrow="How they thought" title="Mindset" />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {F.mindset.map((m, i) => (
            <li key={m.idea} className="tilt-card reveal relative overflow-hidden rounded-[20px] p-6" style={{ background: i === 0 ? "var(--b1)" : "#ffffffb3", color: i === 0 ? "var(--on1)" : undefined, boxShadow: i === 0 ? undefined : `inset 0 0 0 1px ${alpha(p.ink, 0.08)}` }}>
              <span className="accent-display text-[54px] leading-none opacity-20">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 text-[19px] leading-snug font-semibold">{m.idea}</p>
              <p className="mt-2 text-[14px] leading-relaxed opacity-80">
                {m.explain}
                <Cites src={m.src} />
              </p>
            </li>
          ))}
        </ol>

        {(F.habits.length > 0 || F.genuineness) && (
          <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {F.habits.length > 0 && (
              <div className="rounded-[20px] p-6" style={{ background: alpha(p.primary, 0.06) }}>
                <p className="notes-eyebrow flex items-center gap-2 opacity-70"><Clock size={14} /> How they worked</p>
                <ul className="mt-4 space-y-4">
                  {F.habits.map((h) => (
                    <li key={h.habit} className="grid grid-cols-[10px_minmax(0,1fr)] gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full" style={{ background: "var(--b3)" }} />
                      <span>
                        <span className="block text-[15px] font-semibold">{h.habit}</span>
                        <span className="block text-[14px] leading-relaxed opacity-80">
                          {h.detail}
                          <Cites src={h.src} />
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {F.genuineness && (
              <div className="relative overflow-hidden rounded-[20px] p-6" style={{ background: "var(--b2)", color: onColor(p.secondary) }}>
                <Guilloche size={300} color="currentColor" className="absolute -right-20 -bottom-20 opacity-20" />
                <p className="notes-eyebrow relative flex items-center gap-2 opacity-80"><SealCheck size={14} weight="fill" /> Character</p>
                <p className="relative mt-4 font-article text-[17px] leading-[1.7]">
                  {F.genuineness.story}
                  <Cites src={F.genuineness.src} />
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ───────── 05 Company ───────── */}
      <section id="company" className="scroll-mt-28 print-break py-20" style={{ background: alpha(p.primary, 0.05) }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHead n={5} eyebrow="The company today" title={`${name} in numbers`} />
          <dl className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {n.numbers.map((x, i) => (
              <div key={x.label} className="tilt-card rounded-[20px] p-5 sm:p-6" style={i === 0 ? { background: "var(--b1)", color: "var(--on1)" } : { background: "#ffffffcc", boxShadow: `inset 0 0 0 1px ${alpha(p.ink, 0.07)}` }}>
                <dd className="accent-display text-[clamp(26px,3.6vw,44px)] leading-none">
                  <CountUp value={x.value} />
                </dd>
                <dt className="mt-3 text-[13.5px] leading-snug opacity-80">
                  {x.label}
                  <Cites src={x.src} />
                </dt>
                <p className="mt-1 font-mono text-[10px] opacity-55">{x.asOf}</p>
              </div>
            ))}
          </dl>

          {/* Milestones rail */}
          <p className="notes-eyebrow mt-16 opacity-60">Milestones</p>
          <ol className="shelf mt-4 flex snap-x gap-4 overflow-x-auto pb-4">
            {n.milestones.map((m) => (
              <li key={m.year + m.title} className="w-[250px] shrink-0 snap-start">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: "var(--b1)", boxShadow: `0 0 0 4px ${alpha(p.accent, 0.35)}` }} />
                  <span className="h-px flex-1" style={{ background: alpha(p.ink, 0.2) }} />
                </div>
                <p className="accent-display mt-3 text-[28px] leading-none" style={{ color: "var(--b1)" }}>{m.year}</p>
                <p className="mt-2 text-[15px] leading-snug font-semibold">{m.title}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed opacity-75">
                  {m.detail}
                  <Cites src={m.src} />
                </p>
              </li>
            ))}
          </ol>

          {/* How it makes money */}
          <div className="mt-14 rounded-[24px] p-6 sm:p-8" style={{ background: "#ffffffcc", boxShadow: `inset 0 0 0 1px ${alpha(p.ink, 0.07)}` }}>
            <p className="notes-eyebrow opacity-60">How the money flows</p>
            <p className="mt-3 max-w-3xl text-[17px] leading-relaxed">
              {n.howItMakesMoney.summary}
              <Cites src={n.howItMakesMoney.src} />
            </p>
            <ul className="mt-8 space-y-4">
              {n.howItMakesMoney.flows.map((f, i) => (
                <li key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(80px,1.2fr)_minmax(0,1fr)] items-center gap-2 sm:gap-4">
                  <span className="rounded-xl px-3 py-3 text-center text-[13.5px] font-semibold" style={{ background: alpha(p.primary, 0.1) }}>{f.from}</span>
                  <span className="relative text-center">
                    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="h-3 w-full" aria-hidden>
                      <line x1="0" y1="6" x2="192" y2="6" stroke={p.primary} strokeWidth="2" className="flow-line" />
                      <path d="M190 1 L200 6 L190 11 Z" fill={p.primary} />
                    </svg>
                    <span className="mt-1 block text-[12px] leading-snug opacity-75">{f.what}</span>
                  </span>
                  <span className="rounded-xl px-3 py-3 text-center text-[13.5px] font-semibold" style={{ background: "var(--b1)", color: "var(--on1)" }}>{f.to}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── 06 Failures + myths ───────── */}
      <section id="failures" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-20 sm:px-6">
        <SectionHead n={6} eyebrow="What went wrong, and what it taught" title="Failures">
          <FlipHint />
        </SectionHead>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {n.failures.map((f) => (
            <li key={f.title} className="min-h-[240px]">
              <FlipCard
                label={f.title}
                front={
                  <span className="flex h-full flex-col rounded-[20px] p-6" style={{ background: "#ffffffcc", boxShadow: "inset 0 0 0 1px #b4231833" }}>
                    <span className="flex items-center gap-2 font-mono text-[11px] text-[#b42318]"><XCircle size={14} weight="fill" /> {f.year}</span>
                    <span className="mt-3 block text-[19px] leading-snug font-semibold">{f.title}</span>
                    <span className="mt-2 block text-[14px] leading-relaxed opacity-80">
                      {f.whatHappened}
                      <Cites src={f.src} />
                    </span>
                  </span>
                }
                back={
                  <span className="flex h-full flex-col justify-center rounded-[20px] p-6" style={{ background: "var(--b1)", color: "var(--on1)" }}>
                    <span className="notes-eyebrow opacity-70">The lesson</span>
                    <span className="accent-display mt-3 block text-[22px] leading-snug">{f.lesson}</span>
                  </span>
                }
              />
            </li>
          ))}
        </ul>

        {n.mythVsFact.length > 0 && (
          <div className="mt-14">
            <p className="notes-eyebrow opacity-60">Myth vs fact</p>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {n.mythVsFact.map((m) => (
                <li key={m.myth} className="overflow-hidden rounded-[20px]" style={{ boxShadow: `inset 0 0 0 1px ${alpha(p.ink, 0.08)}` }}>
                  <p className="px-6 pt-5 pb-4 text-[15px] leading-snug line-through decoration-[#b42318] decoration-2 opacity-60">{m.myth}</p>
                  <p className="px-6 py-5 text-[15px] leading-relaxed" style={{ background: alpha(p.primary, 0.08) }}>
                    <b className="font-mono text-[10.5px] tracking-[0.1em] uppercase" style={{ color: "var(--b1)" }}>Fact · </b>
                    {m.fact}
                    <Cites src={m.src} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {n.quotes.length > 1 && (
          <ul className="mt-14 grid gap-4 md:grid-cols-2">
            {n.quotes.slice(1).map((q) => (
              <li key={q.text} className="relative rounded-[20px] p-6" style={{ background: alpha(p.accent, 0.14) }}>
                <Quotes size={30} weight="fill" style={{ color: "var(--b1)" }} />
                <p className="accent-display mt-3 text-[19px] leading-snug">“{q.text}”</p>
                <p className="mt-3 flex items-center gap-2 font-mono text-[11px] opacity-70">
                  {F.portrait && q.who.includes(F.name.split(" ").slice(-1)[0]) && (
                    // eslint-disable-next-line @next/next/no-img-element -- founder photo (credited)
                    <img src={F.portrait.url} alt="" className="h-6 w-6 rounded-full object-cover object-[50%_25%]" referrerPolicy="no-referrer" />
                  )}
                  {q.who}
                  <Cites src={q.src} />
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ───────── 07 Moments ───────── */}
      <section id="moments" className="scroll-mt-28 print-break py-20" style={{ background: `color-mix(in srgb, ${p.primary} 14%, #0b0b0b)`, color: "#fff" }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHead n={7} eyebrow="Jump into the films" title="Watch the moments" />
          <div className="mt-10">
            {moments.length > 0 ? (
              <Moments moments={moments} company={name} />
            ) : (
              <p className="text-[15px] text-white/70">
                The films on this story don&apos;t publish chapters yet.{" "}
                <Link href={`/stories/${story.slug}`} className="underline">Watch them from the start</Link>.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ───────── 08 Lessons ───────── */}
      <section id="lessons" className="scroll-mt-28 relative overflow-hidden" style={{ background: "var(--b1)", color: "var(--on1)" }}>
        <Guilloche size={700} color="currentColor" className="pointer-events-none absolute -right-60 -bottom-60 opacity-[0.12]" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-6">
          <p className="notes-eyebrow opacity-75">08 · Take these with you</p>
          <h2 className="notes-h2 mt-3">5 lessons for your first ₹</h2>
          <ol className="mt-12 space-y-3">
            {n.lessons.map((l, i) => (
              <li key={l.title} className="reveal grid grid-cols-[56px_minmax(0,1fr)] gap-4 rounded-[20px] p-5 sm:grid-cols-[88px_minmax(0,1fr)] sm:p-6" style={{ background: alpha(on1, 0.08) }}>
                <span className="accent-display text-[44px] leading-none sm:text-[64px]" style={{ color: "var(--b3)" }}>{i + 1}</span>
                <span>
                  <span className="block text-[19px] leading-snug font-semibold">{l.title}</span>
                  <span className="mt-1.5 block text-[15px] leading-relaxed opacity-85">{l.detail}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="no-print mt-12 flex flex-wrap gap-3">
            <Link href={`/stories/${story.slug}`} className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-semibold" style={{ background: "var(--on1)", color: "var(--b1)" }}>
              <ArrowLeft size={14} /> Back to the films
            </Link>
            {next && (
              <Link href={`/stories/${next.slug}`} className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-semibold" style={{ boxShadow: `inset 0 0 0 1.5px ${alpha(on1, 0.5)}` }}>
                Next story: {next.company} <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ───────── 09 Sources ───────── */}
      <section id="sources" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-20 sm:px-6">
        <SectionHead n={9} eyebrow="Every claim, traceable" title="Sources & fact-check" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <ol className="space-y-2 text-[13.5px]">
            {n.sources.map((s, i) => (
              <li key={s.url + i} id={`src-${i + 1}`} className="grid scroll-mt-32 grid-cols-[32px_minmax(0,1fr)] gap-2 target:rounded-md target:bg-[color:var(--b3)]/20">
                <span className="font-mono text-[11px] opacity-50">[{i + 1}]</span>
                <a href={s.url} target="_blank" rel="noreferrer" className="break-words underline decoration-[color:var(--b1)]/30 underline-offset-2 hover:decoration-[color:var(--b1)]">{s.label}</a>
              </li>
            ))}
          </ol>
          <div className="space-y-6">
            <div className="rounded-[20px] p-5" style={{ background: alpha(p.primary, 0.06) }}>
              <p className="notes-eyebrow flex items-center gap-2 opacity-70"><SealCheck size={14} weight="fill" /> How we checked</p>
              <p className="mt-3 text-[14px] leading-relaxed">{n.factCheck.method}</p>
              {n.factCheck.disputed.length > 0 && (
                <>
                  <p className="notes-eyebrow mt-5 opacity-70">Disputed or unproven</p>
                  <ul className="mt-2 space-y-2 text-[13.5px] leading-relaxed">
                    {n.factCheck.disputed.map((d) => (
                      <li key={d.claim}>
                        <b>{d.claim}</b> <span className="opacity-75">{d.note}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            {allPhotos.length > 0 && (
              <div>
                <p className="notes-eyebrow opacity-60">Photo credits (Wikimedia Commons)</p>
                <ul className="mt-3 space-y-1.5 text-[12px] leading-snug opacity-80">
                  {allPhotos.map((ph) => (
                    <li key={ph.url}>
                      <a href={ph.page} target="_blank" rel="noreferrer" className="underline underline-offset-2">{ph.caption}</a> · {ph.author} · {ph.license}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-[12px] leading-relaxed opacity-60">Brand colours: {p.note}. Brand names belong to their owners; these are independent educational notes, not endorsed by {n.company}.</p>
          </div>
        </div>
      </section>
    </article>
  );
}
