"use client";

import { BookOpenText, MagnifyingGlass, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { formatWorth, type Person, photoUrl } from "@/content/billionaires/shared";
import { Avatar } from "./avatar";

const PAGE = 96;
type Sort = "rank" | "name" | "young" | "old";

function norm(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** The full list: search, filters and an endlessly growing grid of profile tiles. */
export function Directory({ people, books }: { people: Person[]; books: string[] }) {
  const withBook = useMemo(() => new Set(books), [books]);
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [sort, setSort] = useState<Sort>("rank");
  const [onlyBooks, setOnlyBooks] = useState(false);
  const [win, setWin] = useState({ key: "", n: PAGE });
  const query = useDeferredValue(q);
  const more = useRef<HTMLDivElement>(null);

  const countries = useMemo(() => tally(people.map((p) => p.country)), [people]);
  const industries = useMemo(() => tally(people.map((p) => p.industry)), [people]);
  const index = useMemo(() => people.map((p) => norm(`${p.name} ${p.source} ${p.country} ${p.city ?? ""}`)), [people]);

  const shown = useMemo(() => {
    const words = norm(query).split(/\s+/).filter(Boolean);
    const out = people.filter(
      (p, i) =>
        (!country || p.country === country) &&
        (!industry || p.industry === industry) &&
        (!onlyBooks || withBook.has(p.slug)) &&
        words.every((w) => index[i].includes(w)),
    );
    if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "young") out.sort((a, b) => (a.age ?? 999) - (b.age ?? 999));
    if (sort === "old") out.sort((a, b) => (b.age ?? -1) - (a.age ?? -1));
    return out;
  }, [people, index, query, country, industry, onlyBooks, sort, withBook]);

  // The rendered window starts over whenever the filters change, and grows as the reader nears the end.
  const filterKey = [query, country, industry, onlyBooks, sort].join("|");
  const limit = win.key === filterKey ? win.n : PAGE;
  useEffect(() => {
    const el = more.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e[0].isIntersecting && setWin((w) => ({ key: filterKey, n: (w.key === filterKey ? w.n : PAGE) + PAGE })), { rootMargin: "900px" });
    io.observe(el);
    return () => io.disconnect();
  }, [shown.length, filterKey]);

  const filtered = q || country || industry || onlyBooks;

  return (
    <div>
      <div className="sticky top-[var(--topbar-h)] z-30 -mx-5 border-b border-divider bg-[#f7f7f8eb] px-5 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
          <label className="relative block lg:w-[340px]">
            <MagnifyingGlass size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-fg3" />
            <input className="bdp-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a name, company or country" aria-label="Search billionaires" />
          </label>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <select className="bdp-select" value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country">
              <option value="">All countries</option>
              {countries.map(([c, n]) => (
                <option key={c} value={c}>
                  {c} ({n})
                </option>
              ))}
            </select>
            <select className="bdp-select" value={industry} onChange={(e) => setIndustry(e.target.value)} aria-label="Industry">
              <option value="">All industries</option>
              {industries.map(([c, n]) => (
                <option key={c} value={c}>
                  {c} ({n})
                </option>
              ))}
            </select>
            <select className="bdp-select" value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort">
              <option value="rank">Richest first</option>
              <option value="name">Name A–Z</option>
              <option value="young">Youngest first</option>
              <option value="old">Oldest first</option>
            </select>
            <button
              type="button"
              onClick={() => setOnlyBooks((v) => !v)}
              className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border px-3 text-[13px] font-medium transition-colors ${onlyBooks ? "border-ink bg-ink text-white" : "border-line-strong bg-surface hover:bg-hover"}`}
              aria-pressed={onlyBooks}
            >
              <BookOpenText size={14} /> Books ready ({books.length})
            </button>
          </div>
          <p className="font-mono text-[11px] tracking-[0.06em] text-fg3 uppercase lg:ml-auto">
            {shown.length.toLocaleString("en-IN")} {shown.length === 1 ? "person" : "people"}
            {filtered && (
              <button
                type="button"
                className="ml-2 inline-flex items-center gap-1 text-fg2 normal-case hover:text-fg1"
                onClick={() => {
                  setQ("");
                  setCountry("");
                  setIndustry("");
                  setOnlyBooks(false);
                }}
              >
                <X size={11} /> clear
              </button>
            )}
          </p>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="py-24 text-center text-[15px] text-fg2">No one matches that. Try a company name, like &quot;Reliance&quot; or &quot;Tesla&quot;.</p>
      ) : (
        <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {shown.slice(0, limit).map((p) => (
            <li key={p.slug}>
              <Tile p={p} book={withBook.has(p.slug)} />
            </li>
          ))}
        </ol>
      )}
      <div ref={more} aria-hidden className="h-px" />
      {limit < shown.length && <p className="py-10 text-center font-mono text-[11px] tracking-[0.08em] text-fg3 uppercase">Loading more…</p>}
    </div>
  );
}

function Tile({ p, book }: { p: Person; book: boolean }) {
  return (
    <Link href={`/billion-dollar-pdfs/${p.slug}`} className="bdp-tile h-full" prefetch={false}>
      {book && (
        <span className="bdp-book-badge">
          <BookOpenText size={10} weight="bold" /> Book
        </span>
      )}
      <span className="absolute top-3 left-3 font-mono text-[10px] text-fg3">#{p.rank}</span>
      <Avatar src={p.photo ? photoUrl(p.photo, 240) : null} name={p.name} size={84} credit={p.credit} ring={book} />
      <span className="line-clamp-2 min-h-[2.5em] text-[13.5px] leading-[1.25] font-medium">{p.name}</span>
      <span className="accent-display -mt-1 text-[19px] leading-none">{formatWorth(p.worth)}</span>
      <span className="line-clamp-1 text-[11.5px] text-fg3">
        {p.source} · {p.country}
      </span>
    </Link>
  );
}

function tally(values: string[]) {
  const m = new Map<string, number>();
  for (const v of values) if (v) m.set(v, (m.get(v) ?? 0) + 1);
  return [...m].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
