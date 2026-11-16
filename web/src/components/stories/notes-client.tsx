"use client";

import { ArrowsClockwise, FilePdf, Play, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { StoryVideo } from "@/content/stories/schema";
import { stopPlayers } from "./playback";
import { Screen } from "./player";

const clock = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
};

/** Cover stage that tilts toward the pointer (3D parallax). Static when motion is reduced. */
export function TiltStage({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${-14 + x * 16}deg`);
      el.style.setProperty("--rx", `${6 - y * 12}deg`);
    };
    const leave = () => {
      el.style.removeProperty("--ry");
      el.style.removeProperty("--rx");
    };
    const host = el.parentElement ?? el;
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div ref={ref} className={`notes-tilt ${className ?? ""}`}>
      {children}
    </div>
  );
}

/** Counts the leading number of a value like "₹1,00,000 crore" or "$4.3 trillion" up when seen. */
export function CountUp({ value }: { value: string }) {
  const m = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!m || !el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const locale = /\d,\d{2},\d{3}/.test(num) ? "en-IN" : "en-US";
    const grouped = num.includes(",");
    const fmt = (n: number) => (grouped ? n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : n.toFixed(decimals));
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        const eased = 1 - (1 - p) ** 3;
        setShown(p < 1 ? `${pre}${fmt(target * eased)}${post}` : value);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per value
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}

/** Failure on the front, the lesson on the back. Click (or tap) to flip. */
export function FlipCard({ front, back, label }: { front: ReactNode; back: ReactNode; label: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`flip h-full ${flipped ? "is-flipped" : ""}`}>
      <button type="button" onClick={() => setFlipped((f) => !f)} aria-pressed={flipped} aria-label={`${label}: show ${flipped ? "what happened" : "the lesson"}`} className="flip-inner w-full text-left">
        <span className="flip-face block h-full">{front}</span>
        <span className="flip-face flip-back block h-full">{back}</span>
      </button>
    </div>
  );
}

export function FlipHint() {
  return (
    <span className="no-print inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.08em] uppercase opacity-60">
      <ArrowsClockwise size={12} /> Tap a card to flip it
    </span>
  );
}

export function PrintButton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <button type="button" onClick={() => window.print()} className={className} style={style}>
      <FilePdf size={16} weight="bold" /> Save as PDF
    </button>
  );
}

export type Moment = { video: StoryVideo; at: number; label: string };

/** "Watch this moment": thumbnails that open the film at the exact second, in place. */
export function Moments({ moments, company }: { moments: Moment[]; company: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const m = open === null ? null : moments[open];

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {moments.map((x, i) => (
          <li key={`${x.video.youtubeId}-${x.at}`}>
            <button
              type="button"
              onClick={() => {
                stopPlayers();
                setOpen(i);
              }}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-video overflow-hidden rounded-xl bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail */}
                <img src={`https://i.ytimg.com/vi/${x.video.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/95 text-[#1d1d1d] shadow-lg transition-transform group-hover:scale-110">
                    <Play size={18} weight="fill" className="ml-0.5" />
                  </span>
                </span>
                <span className="absolute bottom-2 left-2 rounded-md bg-black/75 px-2 py-0.5 font-mono text-[11px] text-white">{clock(x.at)}</span>
              </span>
              <span className="mt-2.5 block text-[15px] leading-snug font-semibold">{x.label}</span>
              <span className="mt-0.5 block truncate text-[12px] opacity-60">{x.video.channel} · {x.video.title}</span>
            </button>
          </li>
        ))}
      </ol>

      {m && (
        <div role="dialog" aria-modal="true" aria-label={m.label} className="no-print fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4 text-white">
              <p className="min-w-0 truncate text-[15px] font-semibold">
                <span className="font-mono text-[12px] text-white/60">{clock(m.at)} · </span>
                {m.label}
              </p>
              <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 hover:bg-white/25">
                <X size={16} />
              </button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              <Screen key={`${m.video.youtubeId}-${m.at}`} v={m.video} company={company} startAt={m.at} autoStart />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
