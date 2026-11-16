"use client";

import { ArrowLeft, CaretLeft, CaretRight, DownloadSimple, ListBullets, X } from "@phosphor-icons/react";
import Link from "next/link";
import { memo, type ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Book } from "@/content/billionaires/book-schema";
import type { Person } from "@/content/billionaires/shared";
import {
  AboutFlow,
  BackCover,
  BlockView,
  ChapterHead,
  ComingFlow,
  ContactFlow,
  Contents,
  Cover,
  firstName,
  GlanceFlow,
  LessonsFlow,
  PersonGlanceFlow,
  SourcesFlow,
} from "./book-pages";

// The page-turning reader. Each section's text is laid out by the browser into fixed-size CSS
// columns (one column = one page), measured once off-screen, then shown a spread at a time.
// Turning a page is a real 3D leaf: drag or swipe it, click a page, scroll, or use ← →.

const PW = 500; // one page, in book pixels (scaled to fit the screen)
const PH = 730;
const PAD = { top: 58, side: 50, bottom: 62 };
const CW = PW - 2 * PAD.side;
const CH = PH - PAD.top - PAD.bottom;
const GAP = 60;

type Sec = { key: string; label: string; kicker?: string; fixed?: "cover" | "contents" | "back"; flow?: ReactNode; toc?: boolean };
type Pg = { s: number; col: number };
type Side = "left" | "right" | "single";
type Ctx = { pages: Pg[]; sections: Sec[]; person: Person; book: Book | null; next: Person | null; toc: { label: string; kicker?: string; page: number }[]; jump: (p: number) => void };

function buildSections(person: Person, book: Book | null): Sec[] {
  const first = firstName(person.name);
  const s: Sec[] = [{ key: "cover", label: "Cover", fixed: "cover" }];
  if (book) {
    s.push({ key: "reach", label: `How to reach ${first}`, flow: <ContactFlow book={book} />, toc: true });
    s.push({ key: "glance", label: "At a glance", flow: <GlanceFlow book={book} person={person} />, toc: true });
    s.push({ key: "contents", label: "Contents", fixed: "contents" });
    book.chapters.forEach((ch, ci) => {
      let lesson = 0;
      s.push({
        key: `ch-${ch.id}`,
        label: ch.title,
        kicker: ch.kicker,
        toc: true,
        flow: (
          <>
            <ChapterHead kicker={ch.kicker} title={ch.title} seed={ci + 1} />
            {ch.blocks.map((b, i) => (
              <BlockView key={i} b={b} i={b.t === "lesson" ? lesson++ : i} />
            ))}
          </>
        ),
      });
    });
    s.push({ key: "lessons", label: "Straight Forward Business Lessons", flow: <LessonsFlow book={book} />, toc: true });
    s.push({ key: "about", label: "How this book was checked", flow: <AboutFlow book={book} />, toc: true });
    s.push({ key: "sources", label: "Sources & photo credits", flow: <SourcesFlow book={book} />, toc: true });
  } else {
    s.push({ key: "glance", label: "At a glance", flow: <PersonGlanceFlow person={person} />, toc: true });
    s.push({ key: "coming", label: "The full book", flow: <ComingFlow person={person} />, toc: true });
  }
  s.push({ key: "back", label: "Back cover", fixed: "back" });
  return s;
}

const flowStyle = { width: CW, height: CH, columnWidth: CW, columnGap: GAP } as const;

const PageView = memo(function PageView({ idx, side, ctx }: { idx: number | null; side: Side; ctx: Ctx }) {
  const left = side === "right" ? PW : 0;
  if (idx === null) return null;
  const pg = ctx.pages[idx];
  const sec = ctx.sections[pg.s];
  return (
    <div className={`bk-page is-${side}`} style={{ left, width: PW, height: PH }}>
      {sec.fixed === "cover" && <Cover person={ctx.person} book={ctx.book} />}
      {sec.fixed === "contents" && <Contents items={ctx.toc} onJump={ctx.jump} />}
      {sec.fixed === "back" && <BackCover next={ctx.next} />}
      {sec.flow && (
        <>
          {pg.col > 0 && <div className="bk-runhead">{side === "left" ? ctx.person.name.replace(/\s*&.*$/, "") : sec.label}</div>}
          <div className="bk-content" style={{ top: PAD.top, left: PAD.side, width: CW, height: CH }}>
            <div className="bk-flow" style={{ ...flowStyle, transform: `translateX(${-pg.col * (CW + GAP)}px)` }}>
              {sec.flow}
            </div>
          </div>
        </>
      )}
      {idx > 0 && sec.fixed !== "back" && <div className="bk-folio">{idx}</div>}
    </div>
  );
});

function BlankBack() {
  return <div className="bk-page is-single is-blank" style={{ left: 0, width: PW, height: PH }} />;
}

function savedPage(key: string, n: number) {
  try {
    const v = Number(localStorage.getItem(key));
    return v > 0 && v < n ? v : 0;
  } catch {
    return 0;
  }
}

const easeInOut =(t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const easeOut = (t: number) => 1 - (1 - t) ** 3;

export function BookReader({ person, book, next, prev }: { person: Person; book: Book | null; next: Person | null; prev: Person | null }) {
  const sections = useMemo(() => buildSections(person, book), [person, book]);
  const [counts, setCounts] = useState<number[] | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const storeKey = `bdp:${person.slug}`;

  // 1. Measure: how many pages (columns) does each flowing section need?
  useEffect(() => {
    let off = false;
    document.fonts.ready.then(() =>
      requestAnimationFrame(() => {
        if (off || !measureRef.current) return;
        const els = measureRef.current.querySelectorAll<HTMLElement>("[data-measure]");
        const byKey = new Map([...els].map((el) => [el.dataset.measure!, Math.max(1, Math.round((el.scrollWidth + GAP) / (CW + GAP)))]));
        setCounts(sections.map((s) => (s.flow ? (byKey.get(s.key) ?? 1) : 1)));
      }),
    );
    return () => {
      off = true;
    };
  }, [sections]);

  const pages = useMemo<Pg[]>(() => (counts ? counts.flatMap((n, s) => Array.from({ length: n }, (_, col) => ({ s, col }))) : []), [counts]);
  const starts = useMemo(() => {
    const out: number[] = [];
    let n = 0;
    for (const c of counts ?? []) {
      out.push(n);
      n += c;
    }
    return out;
  }, [counts]);
  const N = pages.length;

  // 2. Where we are, and the screen we're on.
  // `picked` is null until the reader turns a page; until then we open where they last left off.
  const [picked, setAt] = useState<number | null>(null);
  const at = picked ?? (N ? savedPage(storeKey, N) : 0);
  const atRef = useRef(at);
  useLayoutEffect(() => {
    atRef.current = at;
  }, [at]);
  const [drawer, setDrawer] = useState(false);
  const [printing, setPrinting] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setStage({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const single = stage.w > 0 && stage.w < 860;

  useEffect(() => {
    if (picked === null) return;
    try {
      localStorage.setItem(storeKey, String(picked));
    } catch {}
  }, [picked, storeKey]);

  // Spread geometry: the cover sits alone on the right, then pages pair up (1|2, 3|4, …).
  const spreadOf = (i: number) => Math.floor((i + 1) / 2);
  const L = useCallback((s: number) => (s === 0 ? null : 2 * s - 1 < N ? 2 * s - 1 : null), [N]);
  const R = useCallback((s: number) => (s === 0 ? 0 : 2 * s < N ? 2 * s : null), [N]);
  const maxS = Math.ceil((N - 1) / 2);
  const shiftOf = useCallback((s: number) => (s === 0 ? -PW / 2 : R(s) === null ? PW / 2 : 0), [R]);
  const s = spreadOf(at);
  const canNext = single ? at < N - 1 : s < maxS;
  const canPrev = at > 0;

  // 3. The turning leaf. React renders which pages sit where; the animation itself writes
  // transforms straight to the DOM so the heavy page content never re-renders mid-turn.
  const [flip, setFlip] = useState<{ dir: 1 | -1 } | null>(null);
  const live = useRef<{ dir: 1 | -1; p: number; raf: number; busy: boolean } | null>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const leafShade = useRef<HTMLDivElement>(null);
  const underShade = useRef<HTMLDivElement>(null);
  const shiftRef = useRef<HTMLDivElement>(null);

  const paint = useCallback(
    (p: number) => {
      const f = live.current;
      if (!f) return;
      const angle = single ? (f.dir === 1 ? -180 * p : -180 * (1 - p)) : f.dir === 1 ? -180 * p : 180 * p;
      const k = Math.sin(Math.PI * p);
      if (leafRef.current) leafRef.current.style.transform = `rotateY(${angle}deg)`;
      if (leafShade.current) leafShade.current.style.opacity = String(0.55 * k);
      if (underShade.current) underShade.current.style.opacity = String(single ? (f.dir === 1 ? 1 - p : p) * 0.5 : 0.6 * (1 - p));
      if (shiftRef.current && !single) {
        const a = shiftOf(spreadOf(at));
        const b = shiftOf(spreadOf(at) + f.dir);
        shiftRef.current.style.transform = `translateX(${a + (b - a) * p}px)`;
      }
    },
    [single, shiftOf, at],
  );

  useLayoutEffect(() => {
    if (shiftRef.current) shiftRef.current.style.transform = `translateX(${single ? 0 : shiftOf(s)}px)`;
  }, [s, single, shiftOf, N]);
  useLayoutEffect(() => {
    if (flip && live.current) paint(live.current.p);
  }, [flip, paint]);

  const start = useCallback(
    (dir: 1 | -1) => {
      if (live.current || !N) return false;
      if (dir === 1 ? !canNext : !canPrev) return false;
      live.current = { dir, p: 0, raf: 0, busy: false };
      setFlip({ dir });
      return true;
    },
    [N, canNext, canPrev],
  );

  const settle = useCallback(
    (target: 0 | 1, ease = easeInOut) => {
      const f = live.current;
      if (!f || f.busy) return;
      f.busy = true;
      const from = f.p;
      const dur = Math.max(160, 720 * Math.abs(target - from));
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / dur);
        f.p = from + (target - from) * ease(t);
        paint(f.p);
        if (t < 1) {
          f.raf = requestAnimationFrame(step);
          return;
        }
        live.current = null;
        if (target === 1) {
          const a = atRef.current;
          const ns = spreadOf(a) + f.dir;
          setAt(single ? a + f.dir : ns === 0 ? 0 : 2 * ns - 1);
        }
        setFlip(null);
      };
      f.raf = requestAnimationFrame(step);
    },
    [paint, single],
  );

  const go = useCallback(
    (dir: 1 | -1) => {
      if (start(dir)) requestAnimationFrame(() => settle(1));
    },
    [start, settle],
  );

  const jump = useCallback(
    (p: number) => {
      if (live.current) return;
      setAt(Math.max(0, Math.min(N - 1, p)));
      setDrawer(false);
    },
    [N],
  );

  // Keyboard, wheel and pointer (drag / swipe / click).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") jump(0);
      else if (e.key === "End") jump(N - 1);
      else if (e.key === "Escape") setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, jump, N]);

  const wheel = useRef({ acc: 0, until: 0 });
  const onWheel = (e: React.WheelEvent) => {
    const w = wheel.current;
    const now = performance.now();
    if (now < w.until || live.current) return;
    w.acc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(w.acc) > 40) {
      go(w.acc > 0 ? 1 : -1);
      w.acc = 0;
      w.until = now + 820;
    }
  };

  const scale = useMemo(() => {
    if (!stage.w) return 0;
    const bookW = single ? PW : 2 * PW;
    return Math.min((stage.w - (single ? 20 : 132)) / bookW, (stage.h - 14) / PH, 1.45);
  }, [stage, single]);

  const drag = useRef<{ x: number; y: number; t: number; started: boolean; dir: 1 | -1 } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("a,button,input,select,.bk-drawer")) return;
    drag.current = { x: e.clientX, y: e.clientY, t: performance.now(), started: false, dir: 1 };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.started) {
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(e.clientY - d.y)) return;
      const dir = dx < 0 ? 1 : -1;
      if (!start(dir)) {
        drag.current = null;
        return;
      }
      d.started = true;
      d.dir = dir;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    const f = live.current;
    if (!f || f.busy) return;
    const travel = PW * scale * (single ? 0.9 : 1.25);
    f.p = Math.max(0, Math.min(1, (d.dir === 1 ? -dx : dx) / travel));
    paint(f.p);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.started) {
      const f = live.current;
      if (!f) return;
      const speed = Math.abs(e.clientX - d.x) / Math.max(1, performance.now() - d.t);
      settle(f.p > 0.28 || speed > 0.6 ? 1 : 0, easeOut);
      return;
    }
    const box = stageRef.current?.getBoundingClientRect();
    if (!box) return;
    go(e.clientX > box.left + box.width / 2 ? 1 : -1);
  };

  // Print / Save as PDF renders the whole book as continuous pages.
  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(false);
    window.addEventListener("afterprint", done, { once: true });
    const t = setTimeout(() => window.print(), 300);
    return () => {
      clearTimeout(t);
      window.removeEventListener("afterprint", done);
    };
  }, [printing]);

  const toc = useMemo(() => sections.flatMap((sec, i) => (sec.toc && starts[i] != null ? [{ label: sec.label, kicker: sec.kicker, page: starts[i] }] : [])), [sections, starts]);
  const ctx = useMemo<Ctx>(() => ({ pages, sections, person, book, next, toc, jump }), [pages, sections, person, book, next, toc, jump]);

  // Which pages sit where right now.
  let slots: { left: number | null; right: number | null; front: number | null; back: number | null | "blank" } = { left: null, right: null, front: null, back: null };
  if (N) {
    if (single) {
      if (!flip) slots = { left: null, right: at, front: null, back: null };
      else if (flip.dir === 1) slots = { left: null, right: at + 1, front: at, back: "blank" };
      else slots = { left: null, right: at, front: at - 1, back: "blank" };
    } else if (!flip) slots = { left: L(s), right: R(s), front: null, back: null };
    else if (flip.dir === 1) slots = { left: L(s), right: R(s + 1), front: R(s), back: L(s + 1) };
    else slots = { left: L(s - 1), right: R(s), front: L(s), back: R(s - 1) };
  }
  const leafOnLeft = !single && flip?.dir === -1;
  const curSec = N ? sections[pages[at].s] : null;
  const label = at === 0 ? "Cover" : single || !L(s) ? `Page ${at}` : `Pages ${L(s)}${R(s) != null ? `–${R(s)}` : ""}`;

  return (
    <>
      <div className="bk-desk">
        <header className="bk-bar">
          <Link href="/billion-dollar-pdfs" className="bk-bar-btn">
            <ArrowLeft size={15} /> <span className="hidden sm:inline">All billionaires</span>
          </Link>
          <button type="button" className="bk-bar-btn" onClick={() => setDrawer((v) => !v)} aria-expanded={drawer}>
            <ListBullets size={16} /> <span className="hidden sm:inline">Contents</span>
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-[13.5px] font-semibold">{person.name}</p>
            <p className="truncate font-mono text-[10px] tracking-[0.08em] text-fg3 uppercase">{curSec ? (at === 0 ? "A Billion Dollar PDF" : curSec.label) : "Binding the book…"}</p>
          </div>
          <button type="button" className="bk-bar-btn" onClick={() => setPrinting(true)} disabled={!N}>
            <DownloadSimple size={15} /> <span className="hidden sm:inline">Save as PDF</span>
          </button>
          {/* .bk-bar-btn sets display, so the responsive hide lives on a wrapper */}
          <span className="hidden md:inline-flex">
            {prev && (
              <Link href={`/billion-dollar-pdfs/${prev.slug}`} className="bk-bar-btn" title={`Previous: ${prev.name}`}>
                <CaretLeft size={13} /> No. {prev.rank}
              </Link>
            )}
            {next && (
              <Link href={`/billion-dollar-pdfs/${next.slug}`} className="bk-bar-btn" title={`Next: ${next.name}`}>
                No. {next.rank} <CaretRight size={13} />
              </Link>
            )}
          </span>
        </header>

        <div
          ref={stageRef}
          className="bk-stage"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current = null;
            if (live.current && !live.current.busy) settle(0, easeOut);
          }}
        >
          {N > 0 && scale > 0 ? (
            <div
              className="bk-book"
              style={{ width: single ? PW : 2 * PW, height: PH, transform: `translate(${(-(single ? PW : 2 * PW) * scale) / 2}px, ${(-PH * scale) / 2}px) scale(${scale})` }}
            >
              <div ref={shiftRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                <PageView idx={slots.left} side="left" ctx={ctx} />
                <PageView idx={slots.right} side={single ? "single" : "right"} ctx={ctx} />
                {flip && (
                  <div
                    ref={underShade}
                    className="bk-shade"
                    style={{
                      left: single ? 0 : leafOnLeft ? 0 : PW,
                      width: PW,
                      height: PH,
                      opacity: 0,
                      background: leafOnLeft ? "linear-gradient(270deg,#0000,#1e1c1966)" : "linear-gradient(90deg,#1e1c1966,#0000 70%)",
                    }}
                  />
                )}
                {flip && (
                  <div
                    ref={leafRef}
                    className="bk-leaf"
                    style={{ left: leafOnLeft || single ? 0 : PW, width: PW, height: PH, transformOrigin: leafOnLeft ? "100% 50%" : "0 50%" }}
                  >
                    <div className="bk-face">
                      <PageView idx={slots.front} side={single ? "single" : leafOnLeft ? "left" : "right"} ctx={ctx} />
                    </div>
                    <div className="bk-face is-back">
                      {slots.back === "blank" ? <BlankBack /> : <PageView idx={slots.back} side={leafOnLeft ? "right" : "left"} ctx={ctx} />}
                    </div>
                    <div
                      ref={leafShade}
                      className="bk-shade"
                      style={{ opacity: 0, background: leafOnLeft ? "linear-gradient(270deg,#0000 40%,#1e1c1940)" : "linear-gradient(90deg,#1e1c1940,#0000 60%)" }}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <p className="bk-pen animate-pulse text-[26px] text-[var(--ink-2)]">Binding the book…</p>
            </div>
          )}

          <button type="button" className="bk-arrow left-3 sm:left-5" onClick={() => go(-1)} disabled={!canPrev || !N} aria-label="Previous page">
            <CaretLeft size={18} weight="bold" />
          </button>
          <button type="button" className="bk-arrow right-3 sm:right-5" onClick={() => go(1)} disabled={!canNext || !N} aria-label="Next page">
            <CaretRight size={18} weight="bold" />
          </button>

          <nav className={`bk-drawer ${drawer ? "is-open" : ""}`} aria-label="Contents" aria-hidden={!drawer}>
            <div className="mb-4 flex items-center justify-between">
              <p className="bk-hand text-[26px] font-bold">Contents</p>
              <button type="button" className="bk-bar-btn" onClick={() => setDrawer(false)} aria-label="Close contents">
                <X size={15} />
              </button>
            </div>
            <ol className="space-y-0.5">
              <li>
                <button type="button" onClick={() => jump(0)} className="flex w-full items-baseline gap-3 rounded-lg px-2 py-1.5 text-left text-[14px] hover:bg-[#0000000a]">
                  <span className="flex-1">Cover</span>
                </button>
              </li>
              {toc.map((t) => (
                <li key={t.page + t.label}>
                  <button
                    type="button"
                    onClick={() => jump(t.page)}
                    className={`flex w-full items-baseline gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-[#0000000a] ${curSec?.label === t.label ? "bg-[#0000000d]" : ""}`}
                  >
                    <span className="min-w-0 flex-1">
                      {t.kicker && <span className="block font-mono text-[9.5px] tracking-[0.08em] text-fg3 uppercase">{t.kicker}</span>}
                      <span className="text-[14px] leading-snug">{t.label}</span>
                    </span>
                    <span className="font-mono text-[11px] text-fg3">{t.page}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <footer className="flex flex-none items-center gap-3 px-4 pt-1 pb-3 sm:px-6">
          <span className="w-[92px] font-mono text-[10.5px] tracking-[0.06em] text-fg2 uppercase">{N ? label : ""}</span>
          <input
            type="range"
            className="bk-scrub flex-1"
            min={0}
            max={Math.max(0, N - 1)}
            value={at}
            onChange={(e) => jump(Number(e.target.value))}
            aria-label="Go to page"
            disabled={!N}
          />
          <span className="hidden font-mono text-[10px] tracking-[0.04em] text-fg3 lg:inline">Drag a page, swipe, scroll or press ← →</span>
          <span className="font-mono text-[10px] tracking-[0.04em] text-fg3 sm:hidden">Tap or swipe</span>
          <span className="w-[72px] text-right font-mono text-[10.5px] tracking-[0.06em] text-fg3 uppercase">{N ? `${N - 1} pages` : ""}</span>
        </footer>
      </div>

      {/* Off-screen measuring room: one copy of each flowing section at true page size. */}
      <div ref={measureRef} className="bk-measure" aria-hidden>
        {sections
          .filter((sec) => sec.flow)
          .map((sec) => (
            <div key={sec.key} data-measure={sec.key} className="bk-flow" style={{ ...flowStyle, overflow: "hidden" }}>
              {sec.flow}
            </div>
          ))}
      </div>

      {printing && (
        <div className="bk-print">
          <section>
            <h1 className="bk-hand text-[40px] font-bold">{book?.title ?? person.name}</h1>
            <p className="font-[family-name:var(--font-book-serif)] text-[18px] italic">{book?.subtitle}</p>
            <p className="mt-2 font-mono text-[11px] uppercase">
              {person.name} · A Billion Dollar PDF · firstrupee
            </p>
          </section>
          {sections
            .filter((sec) => sec.flow)
            .map((sec) => (
              <section key={sec.key} className="bk-flow">
                {sec.flow}
              </section>
            ))}
        </div>
      )}
    </>
  );
}
