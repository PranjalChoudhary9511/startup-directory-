import {
  ArrowUpRight,
  EnvelopeSimple,
  FacebookLogo,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  LinkSimple,
  MapPin,
  NotePencil,
  Phone,
  TelegramLogo,
  ThreadsLogo,
  TiktokLogo,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import type { Block, Book, Channel, Photo, Social } from "@/content/billionaires/book-schema";
import { formatWorth, LIST_META, type Person, photoUrl, snapThumb } from "@/content/billionaires/shared";
import { Silhouette } from "./avatar";
import { Dots } from "./dots";

// Everything that goes ON a page of a Billion Dollar PDF. The reader (book-reader.tsx) decides
// where pages break and how they turn; these are the words, doodles and cards.

/** **bold**, __hand underline__, ==highlighter== */
export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|__(.+?)__|==(.+?)==/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={m.index}>{m[1]}</strong>);
    else if (m[2]) out.push(<span key={m.index} className="bk-u">{m[2]}</span>);
    else out.push(<mark key={m.index} className="bk-hl" style={{ color: "inherit" }}>{m[3]}</mark>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export function Cites({ src }: { src?: number[] }) {
  if (!src?.length) return null;
  return <sup className="bk-cite">{src.map((i) => i + 1).join(",")}</sup>;
}

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M20 13C14 13 7 11 3.5 4.2M3 9.5 3.2 3.4l5.6 1.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhotoCard({ p, tilt }: { p: Photo; tilt?: boolean }) {
  return (
    <figure className={`bk-photo ${tilt ? "is-tilt-r" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Wikimedia Commons file, credited below */}
      <img src={snapThumb(p.url, 500)} alt={p.caption} loading="lazy" referrerPolicy="no-referrer" />
      <figcaption>
        {p.caption}
        <small>
          {p.author} · {p.license} · Wikimedia Commons
        </small>
      </figcaption>
    </figure>
  );
}

const OUTCOME: Record<Extract<Block, { t: "venture" }>["outcome"], [string, string]> = {
  failed: ["Failed", "is-bad"],
  shut: ["Shut down", "is-bad"],
  sold: ["Sold", "is-good"],
  merged: ["Merged", "is-mid"],
  pivoted: ["Pivoted", "is-mid"],
  running: ["Still running", "is-good"],
  public: ["Went public", "is-good"],
};

export function BlockView({ b, i }: { b: Block; i: number }) {
  switch (b.t) {
    case "p":
      return (
        <p>
          <Inline text={b.text} />
          <Cites src={b.src} />
        </p>
      );
    case "h":
      return <h3 className="bk-h">{b.text}</h3>;
    case "note":
      return (
        <span className={`bk-note ${i % 4 === 1 ? "is-left" : ""}`}>
          <Arrow flip={i % 4 === 1} />
          {b.text}
        </span>
      );
    case "quote":
      return (
        <figure className="bk-quote">
          <blockquote>{b.text}</blockquote>
          <figcaption>
            — {b.who}
            <Cites src={b.src} />
          </figcaption>
        </figure>
      );
    case "facts":
      return (
        <div className="bk-facts bk-box">
          {b.items.map((x, j) => (
            <div key={j}>
              <b>{x.value}</b>
              <span>
                {x.label}
                <Cites src={x.src} />
              </span>
            </div>
          ))}
        </div>
      );
    case "timeline":
      return (
        <ul className="bk-timeline">
          {b.items.map((x, j) => (
            <li key={j}>
              <b>{x.when}</b>
              <Inline text={x.text} />
              <Cites src={x.src} />
            </li>
          ))}
        </ul>
      );
    case "example":
      return (
        <div className="bk-example">
          <b>For example:</b>
          <Inline text={b.text} />
          <Cites src={b.src} />
        </div>
      );
    case "photo":
      return <PhotoCard p={b.photo} tilt={i % 2 === 1} />;
    case "venture": {
      const [label, tone] = OUTCOME[b.outcome] ?? ["", "is-mid"];
      return (
        <article className="bk-venture bk-box">
          <header>
            <div>
              <h4>{b.name}</h4>
              <span className="bk-pen text-[17px] font-semibold text-[var(--ink-2)]">{b.years}</span>
            </div>
            <span className={`bk-stamp ${tone}`}>{label}</span>
          </header>
          <dl>
            {(
              [
                ["The idea", b.idea],
                ["Why they did it", b.decision],
                ["How it started", b.howStarted],
                ["The first money", b.funding],
                ["What happened", b.whatHappened],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>
                  <Inline text={v} />
                </dd>
              </div>
            ))}
            <div>
              <dt>The lesson</dt>
              <dd className="font-semibold">
                <Inline text={b.lesson} />
                <Cites src={b.src} />
              </dd>
            </div>
          </dl>
        </article>
      );
    }
    case "lesson":
      return <Lesson n={i + 1} title={b.title} text={b.text} />;
  }
}

export function Lesson({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="bk-lesson">
      <h5>
        <span>{n}.</span>
        <span>{title}</span>
      </h5>
      <p>
        <Inline text={text} />
      </p>
    </div>
  );
}

export function ChapterHead({ kicker, title, seed }: { kicker?: string; title: string; seed: number }) {
  return (
    <>
      {kicker && <span className="bk-kicker">{kicker}</span>}
      <h2 className="bk-ch-title">
        <Dots seed={seed} />
        <span>{title}</span>
      </h2>
    </>
  );
}

/* ───────── Front matter ───────── */

const CHANNEL_ICON = { phone: Phone, email: EnvelopeSimple, form: NotePencil, address: MapPin, website: Globe, whatsapp: WhatsappLogo };
const SOCIAL_ICON = {
  x: XLogo,
  linkedin: LinkedinLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  youtube: YoutubeLogo,
  threads: ThreadsLogo,
  telegram: TelegramLogo,
  tiktok: TiktokLogo,
  weibo: Globe,
  website: Globe,
  other: LinkSimple,
};

function channelHref(c: Channel) {
  if (c.url) return c.url;
  if (c.kind === "phone") return `tel:${c.value.replace(/[^\d+]/g, "")}`;
  if (c.kind === "email") return `mailto:${c.value}`;
  if (c.kind === "whatsapp") return `https://wa.me/${c.value.replace(/\D/g, "")}`;
  if (c.kind === "website" || c.kind === "form") return c.value.startsWith("http") ? c.value : `https://${c.value}`;
  return null;
}

export function firstName(name: string) {
  return name.replace(/\s*&.*$/, "").split(/\s+/)[0];
}

export function ContactFlow({ book }: { book: Book }) {
  const groups = new Map<string, Channel[]>();
  for (const c of book.contact.channels) groups.set(c.whose, [...(groups.get(c.whose) ?? []), c]);
  return (
    <>
      <ChapterHead kicker="Before you start" title={`How to reach ${firstName(book.name)}`} seed={3} />
      <div className="bk-card bk-box">
        <h4>Honest advice first</h4>
        <p className="!mb-2 text-[15.5px] leading-[1.38]">
          <Inline text={book.contact.howToReach} />
        </p>
      </div>
      {[...groups].map(([whose, list]) => (
        <div key={whose} className="bk-card bk-box">
          <h4>{whose}</h4>
          {list.map((c, i) => {
            const Icon = CHANNEL_ICON[c.kind] ?? LinkSimple;
            const href = channelHref(c);
            return (
              <div key={i} className="bk-channel">
                <Icon size={15} weight="bold" className="mt-[2px]" />
                <div>
                  <small>{c.label}</small>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {c.value}
                    </a>
                  ) : (
                    <span>{c.value}</span>
                  )}
                  <Cites src={c.src} />
                </div>
              </div>
            );
          })}
        </div>
      ))}
      {book.contact.socials.length > 0 && (
        <>
          <h3 className="bk-h">Find them online</h3>
          <div className="mb-3">
            {book.contact.socials.map((s, i) => (
              <SocialChip key={i} s={s} />
            ))}
          </div>
        </>
      )}
      <span className="bk-note">Only channels they publish themselves. No private numbers, ever.</span>
    </>
  );
}

function SocialChip({ s }: { s: Social }) {
  const Icon = SOCIAL_ICON[s.platform] ?? LinkSimple;
  return (
    <a className="bk-chip" href={s.url} target="_blank" rel="noreferrer" title={s.whose}>
      <Icon size={13} weight="bold" />
      {s.handle}
      <span className="text-[10px] font-normal text-[var(--pencil)]">{s.whose.replace(/\s*\(.*\)$/, "")}</span>
    </a>
  );
}

export function GlanceFlow({ book, person }: { book: Book; person?: Person }) {
  return (
    <>
      <ChapterHead kicker="The short version" title="At a glance" seed={5} />
      {book.portrait && <PhotoCard p={book.portrait} />}
      <div className="bk-example">
        <b>The thing most people don&apos;t know:</b>
        <Inline text={book.hook} />
        <Cites src={book.hookSrc} />
      </div>
      <dl className="mt-3">
        {book.glance.map((g, i) => (
          <div key={i} className="mb-2 grid grid-cols-[112px_1fr] gap-3 border-b border-dashed border-[#1e1c1926] pb-2" style={{ breakInside: "avoid" }}>
            <dt className="bk-pen text-[18px] leading-[1.05] font-bold">{g.label}</dt>
            <dd className="text-[15.5px] leading-[1.3]">
              <Inline text={g.value} />
              <Cites src={g.src} />
            </dd>
          </div>
        ))}
        {person && (
          <div className="mb-2 grid grid-cols-[112px_1fr] gap-3 pb-2" style={{ breakInside: "avoid" }}>
            <dt className="bk-pen text-[18px] leading-[1.05] font-bold">Net worth</dt>
            <dd className="text-[15.5px] leading-[1.3]">
              <mark className="bk-hl" style={{ color: "inherit" }}>
                {formatWorth(person.worth)}
              </mark>
              , No. {person.rank} in the world ({LIST_META.source}, {LIST_META.asOf})
            </dd>
          </div>
        )}
      </dl>
    </>
  );
}

export function LessonsFlow({ book }: { book: Book }) {
  return (
    <>
      <ChapterHead kicker={`From ${firstName(book.name)}'s life`} title="Straight Forward Business Lessons!" seed={8} />
      {book.lessons.map((l, i) => (
        <Lesson key={i} n={i + 1} title={l.title} text={l.text} />
      ))}
      <span className="bk-note">Keep calm and keep building forward!</span>
    </>
  );
}

export function AboutFlow({ book }: { book: Book }) {
  return (
    <>
      <ChapterHead kicker="How we made this book" title="Checked, then checked again" seed={2} />
      <p>
        <Inline text={book.factCheck.method} />
      </p>
      <p className="text-[15px]">
        Last fact-checked on <mark className="bk-hl" style={{ color: "inherit" }}>{new Date(book.verifiedAt + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</mark>. Net worth figures move daily; ours come from the {LIST_META.source} list as of {LIST_META.asOf}.
      </p>
      {book.factCheck.disputed.length > 0 && (
        <>
          <h3 className="bk-h">Where the sources disagree</h3>
          <span className="bk-note is-left">
            <Arrow flip />
            We tell you instead of guessing.
          </span>
          {book.factCheck.disputed.map((d, i) => (
            <div key={i} className="mb-3 text-[15px] leading-[1.34]" style={{ breakInside: "avoid" }}>
              <b>{d.claim}</b> <span className="text-[var(--ink-2)]">{d.note}</span>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export function SourcesFlow({ book }: { book: Book }) {
  const photos = [book.portrait, ...book.photos, ...book.chapters.flatMap((c) => c.blocks.flatMap((b) => (b.t === "photo" ? [b.photo] : [])))].filter(
    (p, i, all): p is Photo => !!p && all.findIndex((q) => q?.url === p.url) === i,
  );
  return (
    <>
      <ChapterHead kicker={`${book.sources.length} sources`} title="Where every fact comes from" seed={6} />
      {book.sources.map((s, i) => (
        <p key={i} className="bk-src">
          <b className="inline-block w-[22px] indent-0">{i + 1}.</b>
          {s.label}.{" "}
          <a href={s.url} target="_blank" rel="noreferrer">
            {s.url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 60)}
            {s.url.length > 70 ? "…" : ""}
          </a>
        </p>
      ))}
      {photos.length > 0 && (
        <>
          <h3 className="bk-h">Photo credits</h3>
          {photos.map((p, i) => (
            <p key={i} className="bk-src">
              <b className="inline-block w-[22px] indent-0">◦</b>
              {p.caption}: {p.author}, {p.license}.{" "}
              <a href={p.page} target="_blank" rel="noreferrer">
                Wikimedia Commons
              </a>
            </p>
          ))}
        </>
      )}
    </>
  );
}

/* ───────── Short edition (no researched book yet) ───────── */

export function PersonGlanceFlow({ person }: { person: Person }) {
  const rows: [string, ReactNode][] = [
    ["Rank", `No. ${person.rank} of ${LIST_META.source.split(" ")[0]}'s real-time list`],
    ["Net worth", formatWorth(person.worth)],
    ["Wealth from", person.source],
    ["Industry", person.industry],
    ["Country", [person.city, person.country].filter(Boolean).join(", ")],
    ["Age", person.age != null ? `${person.age}` : "Not published"],
    ["Self-made?", person.selfMade == null ? "Not stated" : person.selfMade ? "Yes, built it themselves" : "No, inherited or family wealth"],
  ];
  return (
    <>
      <ChapterHead kicker="The short version" title="At a glance" seed={5} />
      <dl>
        {rows.map(([k, v]) => (
          <div key={k} className="mb-2 grid grid-cols-[112px_1fr] gap-3 border-b border-dashed border-[#1e1c1926] pb-2">
            <dt className="bk-pen text-[18px] leading-[1.05] font-bold">{k}</dt>
            <dd className="text-[16px] leading-[1.3]">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[13px] leading-snug text-[var(--ink-2)]">
        Source:{" "}
        <a className="underline" href={LIST_META.url} target="_blank" rel="noreferrer">
          {LIST_META.source}
        </a>
        , {LIST_META.asOf}.
        {person.wiki && (
          <>
            {" "}
            More background:{" "}
            <a className="underline" href={`https://en.wikipedia.org/wiki/${encodeURIComponent(person.wiki.replace(/ /g, "_"))}`} target="_blank" rel="noreferrer">
              Wikipedia <ArrowUpRight size={10} className="inline" />
            </a>
          </>
        )}
      </p>
      <span className="bk-note">Numbers move every day. Stories don&apos;t.</span>
    </>
  );
}

export function ComingFlow({ person }: { person: Person }) {
  const first = firstName(person.name);
  return (
    <>
      <ChapterHead kicker="Being written" title={`${first}'s full book is on its way`} seed={7} />
      <p>
        Every Billion Dollar PDF is researched by four writers working in parallel and then re-checked, claim by claim, by an independent fact-checker. Only
        then does it go on the shelf. {first}&apos;s turn is coming.
      </p>
      <h3 className="bk-h">What the full book will have</h3>
      {[
        ["How to reach them", "every official channel their companies publish, and honest advice on what actually works."],
        ["The childhood", "what they were like at 10, at 15, at 17, and the scenes that shaped them."],
        ["Every company", "including the failures: the idea, the decision, where the first money came from, what went wrong."],
        ["How they work", "their routines, their teams, their decisions, their mindset."],
        ["What went wrong", "the mistakes and controversies, told fairly."],
        ["The lessons", "straight-forward business lessons for your first ₹."],
      ].map(([t, d], i) => (
        <Lesson key={t} n={i + 1} title={t} text={d} />
      ))}
      <span className="bk-note">Worth the wait. Promise.</span>
    </>
  );
}

/* ───────── Fixed pages ───────── */

export function Cover({ person, book }: { person: Person; book: Book | null }) {
  const portrait = book?.portrait?.url ? snapThumb(book.portrait.url, 500) : person.photo ? photoUrl(person.photo, 500) : null;
  return (
    <div className="absolute inset-0 flex flex-col px-[46px] pt-[44px] pb-[40px]">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-[var(--ink-2)] uppercase">
        <span>A Billion Dollar PDF</span>
        <span>No. {person.rank}</span>
      </div>
      <div className="mt-7 flex items-start gap-3">
        <Dots seed={person.rank} size={34} />
        <h1 className="bk-hand text-[44px] leading-[0.98] font-bold tracking-[-0.01em]">{book?.title ?? person.name}</h1>
      </div>
      <p className="mt-3 font-[family-name:var(--font-book-serif)] text-[18px] leading-snug text-[var(--ink-2)] italic">
        {book?.subtitle ?? `${person.source}. ${person.country}.`}
      </p>
      <div className="relative mx-auto mt-auto mb-2 grid place-items-center">
        <svg viewBox="0 0 260 260" className="absolute h-[262px] w-[262px]" aria-hidden>
          <path d="M131 8c66 1 119 52 120 121 1 70-53 123-121 123C61 252 8 199 9 130 10 61 61 9 136 11" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <div className="h-[232px] w-[232px] overflow-hidden rounded-full bg-[var(--paper-2)]">
          {portrait ? (
            // eslint-disable-next-line @next/next/no-img-element -- Wikimedia Commons file, credited in the book
            <img src={portrait} alt={person.name} className="h-full w-full object-cover object-[50%_22%] mix-blend-multiply contrast-[1.08] grayscale" referrerPolicy="no-referrer" />
          ) : (
            <Silhouette />
          )}
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="font-[family-name:var(--font-book-serif)] text-[15px] tracking-[0.22em] uppercase">{person.name}</p>
        <p className="bk-hand mt-1 text-[30px] leading-none font-bold">
          <span className="bk-u">{formatWorth(person.worth)}</span>
        </p>
        <p className="bk-pen mt-1 text-[16px] text-[var(--ink-2)]">net worth, {LIST_META.asOf}</p>
      </div>
      <p className="mt-auto pt-4 text-center font-mono text-[9px] tracking-[0.14em] text-[var(--pencil)] uppercase">
        {book ? "Researched · fact-checked · sourced" : "Short edition · full book being written"} · firstrupee
      </p>
    </div>
  );
}

export function Contents({ items, onJump }: { items: { label: string; kicker?: string; page: number }[]; onJump: (page: number) => void }) {
  return (
    <div className="absolute inset-x-[50px] top-[58px] bottom-[60px] flex flex-col">
      <ChapterHead kicker="Inside this book" title="Contents" seed={4} />
      <ol className="flex-1 space-y-[5px]">
        {items.map((it) => (
          <li key={it.page + it.label}>
            <button type="button" onClick={() => onJump(it.page)} className="group flex w-full items-baseline gap-2 text-left font-[family-name:var(--font-book-serif)] text-[16.5px] leading-tight">
              <span className="decoration-[1.5px] underline-offset-[3px] group-hover:underline">{it.label}</span>
              <span className="mb-[3px] flex-1 border-b border-dotted border-[#1e1c1966]" />
              <span className="font-[family-name:var(--font-overused)] text-[12px] font-semibold">{it.page}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BackCover({ next }: { next: Person | null }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-[54px] text-center">
      <Dots seed={11} size={38} />
      <p className="bk-hand mt-6 text-[40px] leading-[1.02] font-bold">Now close the book. Go build something.</p>
      <svg width="150" height="22" viewBox="0 0 150 22" className="mt-3" aria-hidden>
        <path d="M3 13c22-8 40 6 62-1s44-9 82 2" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {next && (
        <a href={`/billion-dollar-pdfs/${next.slug}`} className="bk-chip mt-10 !h-9 !px-4 !text-[13px]">
          Next on the list: {next.name} →
        </a>
      )}
      <p className="mt-auto mb-10 font-mono text-[10px] tracking-[0.16em] text-[var(--pencil)] uppercase">firstrupee · Billion Dollar PDFs</p>
    </div>
  );
}
