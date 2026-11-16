import { ArrowDown, BookOpenText } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Avatar } from "@/components/billionaires/avatar";
import { Dots } from "@/components/billionaires/dots";
import { Directory } from "@/components/billionaires/directory";
import "@/components/billionaires/billionaires.css";
import { bookSlugs, formatWorth, getBook, getPerson, LIST_META, PEOPLE, type Person, photoUrl } from "@/content/billionaires";
import { BOOK_FONTS } from "@/fonts/book";

export const metadata: Metadata = {
  title: "Billion Dollar PDFs: every billionaire, and how they did it",
  description:
    "Every billionaire on Earth, from No. 1 to the last. Open any of them to read a researched, fact-checked book: how to reach them, their childhood, every company (including the failures), how they think, and the lessons.",
};

function CoverCard({ p, title, small }: { p: Person; title: string; small?: boolean }) {
  return (
    <div className="bdp-cover">
      <div className="flex items-center justify-between font-mono text-[8px] tracking-[0.14em] text-[var(--ink-2)] uppercase">
        <span>Billion Dollar PDF</span>
        <span>No. {p.rank}</span>
      </div>
      <div className="mt-2.5 flex items-start gap-1.5">
        <Dots seed={p.rank} size={small ? 16 : 20} />
        <p className={`bk-hand leading-[1] font-bold ${small ? "text-[17px]" : "text-[21px]"}`}>{title}</p>
      </div>
      <div className="mt-auto flex items-center gap-2.5">
        <Avatar src={p.photo ? photoUrl(p.photo, 160) : null} name={p.name} size={small ? 34 : 42} />
        <div className="min-w-0">
          <p className="truncate font-[family-name:var(--font-book-serif)] text-[11px] tracking-[0.14em] uppercase">{p.name.replace(/\s*&.*$/, "")}</p>
          <p className="bk-hand text-[15px] leading-none font-bold">{formatWorth(p.worth)}</p>
        </div>
      </div>
    </div>
  );
}

export default function BillionDollarPdfsPage() {
  const books = bookSlugs();
  const shelf = books.flatMap((slug) => {
    const p = getPerson(slug);
    const b = getBook(slug);
    return p && b ? [{ p, title: b.title }] : [];
  });
  const fan = (shelf.length >= 3 ? shelf : PEOPLE.slice(0, 3).map((p) => ({ p, title: p.name }))).slice(0, 3);
  const countries = new Set(PEOPLE.map((p) => p.country)).size;
  const withPhoto = PEOPLE.filter((p) => p.photo).length;

  return (
    <div className={BOOK_FONTS}>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden border-b border-divider">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div>
            <p className="mono-eyebrow">Billion Dollar PDFs</p>
            <h1 className="mt-3 max-w-[580px] text-[38px] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-[52px]">
              Every billionaire on Earth. <span className="accent-display">Read how they did it.</span>
            </h1>
            <p className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-fg2">
              All {PEOPLE.length.toLocaleString("en-IN")} of them, from No. 1 to the last. Open anyone to read their book, page by page: how to reach them, who they were at 10 and at 17, every company they started (the failures too), how they think, and what to copy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {shelf[0] ? (
                <Link href={`/billion-dollar-pdfs/${shelf[0].p.slug}`} className="btn-primary">
                  <BookOpenText size={16} /> Open No. {shelf[0].p.rank}: {shelf[0].p.name.replace(/\s*&.*$/, "")}
                </Link>
              ) : (
                <Link href={`/billion-dollar-pdfs/${PEOPLE[0].slug}`} className="btn-primary">
                  <BookOpenText size={16} /> Open No. 1
                </Link>
              )}
              <a href="#everyone" className="btn-secondary !h-12 !px-4 !text-[14px]">
                Browse everyone <ArrowDown size={13} />
              </a>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
              {[
                [PEOPLE.length.toLocaleString("en-IN"), "billionaires"],
                [countries, "countries"],
                [shelf.length, "books ready"],
                ["0", "private numbers"],
              ].map(([v, l]) => (
                <div key={l as string}>
                  <dd className="accent-display text-[28px] leading-none">{v}</dd>
                  <dt className="mt-1 font-mono text-[10px] tracking-[0.1em] text-fg3 uppercase">{l}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* A small fan of books on the desk */}
          <div className="relative mx-auto hidden h-[400px] w-full max-w-[460px] lg:block" aria-hidden>
            {fan.map(({ p, title }, i) => (
              <div
                key={p.slug}
                className="absolute top-1/2 left-1/2 w-[220px]"
                style={{ transform: `translate(-50%,-50%) translateX(${(i - 1) * 118}px) translateY(${i === 1 ? -14 : 10}px) rotate(${(i - 1) * 7}deg)`, zIndex: i === 1 ? 3 : 1 }}
              >
                <CoverCard p={p} title={title} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── The shelf: books that are written ───────── */}
      {shelf.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mono-eyebrow">On the shelf</p>
              <h2 className="mt-2 text-[28px] leading-tight font-semibold tracking-[-0.02em]">
                {shelf.length} books, <span className="accent-display">researched and fact-checked.</span>
              </h2>
              <p className="mt-2 max-w-xl text-[14px] text-fg2">
                Four writers research every book at once, then an independent fact-checker re-checks it claim by claim. Every fact links to its source.
              </p>
            </div>
          </div>
          <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {shelf.map(({ p, title }) => (
              <li key={p.slug}>
                <Link href={`/billion-dollar-pdfs/${p.slug}`} className="block" prefetch={false}>
                  <CoverCard p={p} title={title} small />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ───────── Everyone ───────── */}
      <section id="everyone" className="mx-auto max-w-6xl scroll-mt-[var(--topbar-h)] px-5 pt-16 pb-24 sm:px-6">
        <p className="mono-eyebrow">The full list</p>
        <h2 className="mt-2 text-[28px] leading-tight font-semibold tracking-[-0.02em]">
          From No. 1 <span className="accent-display">to No. {PEOPLE.length.toLocaleString("en-IN")}.</span>
        </h2>
        <p className="mt-2 mb-6 max-w-2xl text-[14px] text-fg2">
          Net worth from {LIST_META.source}, {LIST_META.asOf}. Photos are free-licence images from Wikimedia Commons, matched by name and birth year ({withPhoto.toLocaleString("en-IN")} found). Where no free photo exists, you&apos;ll see a blank profile instead of a guess.
        </p>
        <Directory people={PEOPLE} books={books} />
      </section>
    </div>
  );
}
