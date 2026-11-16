"use client";

import { ArrowCounterClockwise, Play, SpeakerHigh } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { KIND_LABEL, runtime, starterIndex, thumb } from "@/content/stories/labels";
import type { StoryVideo } from "@/content/stories/schema";
import { killFrame, PLAYER_ORIGIN, registerPlayer, stopPlayer, stopPlayers } from "./playback";

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/**
 * Lite YouTube player: a poster until the visitor presses play, then the privacy-enhanced
 * embed (youtube-nocookie) plays in place. Videos never open on youtube.com.
 *
 * A film only plays while the visitor is on it. It is hard-stopped (see ./playback) when they
 * navigate anywhere (links, Back, Forward), switch tabs or apps, close the page, pick another
 * film, or start a film elsewhere. It never resumes by itself: the poster offers
 * "Resume at m:ss" and continues from there when pressed.
 */
export function Screen({ v, company, startAt = 0, autoStart = false }: { v: StoryVideo; company: string; startAt?: number; autoStart?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [resumeAt, setResumeAt] = useState(startAt);
  const [poster, setPoster] = useState(thumb(v.youtubeId, "maxres"));
  const frame = useRef<HTMLIFrameElement>(null);
  const player = useRef<ReturnType<typeof registerPlayer> | null>(null);

  // Runs synchronously when Next.js hides this page on navigation, or when this film
  // unmounts (another film picked). The element is captured now because React may detach
  // the ref before cleanup runs.
  useLayoutEffect(() => {
    const el = frame.current;
    if (!playing || !el) return;
    return () => {
      if (player.current) stopPlayer(player.current);
      else killFrame(el);
      player.current = null;
      setPlaying(false);
    };
  }, [playing]);

  const start = () => {
    stopPlayers(); // one film at a time across the whole site
    setPlaying(true);
  };

  // Opened from a "moment": play straight away. Done after mount (not as initial state) so a
  // mount/unmount check (React Strict Mode) can't hard-stop the film before it starts.
  useEffect(() => {
    if (!autoStart) return;
    const id = requestAnimationFrame(start);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount
  }, []);

  if (playing) {
    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      enablejsapi: "1",
      origin: window.location.origin,
      ...(resumeAt > 0 ? { start: String(resumeAt) } : {}),
    });
    return (
      <iframe
        ref={frame}
        className="absolute inset-0 h-full w-full"
        src={`${PLAYER_ORIGIN}/embed/${v.youtubeId}?${params}`}
        title={v.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={(e) => {
          const el = e.currentTarget;
          if (el.getAttribute("src") === "about:blank" || player.current) return;
          player.current = registerPlayer(el, resumeAt, (at) => {
            player.current = null;
            setResumeAt(at);
            setPlaying(false);
          });
        }}
      />
    );
  }
  return (
    <button type="button" onClick={start} className="group absolute inset-0 h-full w-full" aria-label={`${resumeAt ? "Resume" : "Play"}: ${v.title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- poster swaps to a fallback size on error */}
      <img
        src={poster}
        alt=""
        onError={() => setPoster(thumb(v.youtubeId, "hq"))}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      <span className="absolute inset-0 grid place-items-center">
        {resumeAt > 0 ? (
          <span className="flex items-center gap-2.5 rounded-full bg-white/95 py-3 pr-5 pl-4 text-[14px] font-semibold text-[#1d1d1d] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105">
            <ArrowCounterClockwise size={17} weight="bold" /> Resume at {clock(resumeAt)}
          </span>
        ) : (
          <span className="grid h-20 w-20 place-items-center rounded-full bg-white/95 text-[#1d1d1d] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105">
            <Play size={28} weight="fill" className="ml-1" />
          </span>
        )}
      </span>
      <span className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-left text-white">
        <span>
          <span className="block font-mono text-[10.5px] tracking-[0.12em] text-white/70 uppercase">{company} · {KIND_LABEL[v.kind]}</span>
          <span className="mt-1 line-clamp-2 block text-[17px] leading-snug font-semibold">{v.title}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-white/85">
          {runtime(v.minutes)}
          {v.language === "hi" && <span className="rounded bg-white/20 px-1.5 py-0.5">HINDI</span>}
        </span>
      </span>
    </button>
  );
}

export function StoryPlayer({ videos, company, notes }: { videos: StoryVideo[]; company: string; notes?: ReactNode }) {
  const [i, setI] = useState(() => starterIndex(videos));
  const v = videos[i];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <div className="relative aspect-video overflow-hidden rounded-[18px] bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]">
          <Screen key={v.youtubeId} v={v} company={company} />
        </div>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[15px] leading-snug font-semibold">{v.title}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[13px] text-fg2">
              <SpeakerHigh size={13} /> {v.channel}
              <span className="text-fg3">·</span> {KIND_LABEL[v.kind]}
              {v.minutes && (<><span className="text-fg3">·</span> {runtime(v.minutes)}</>)}
            </p>
          </div>
          {notes}
        </div>
        <p className="mt-3 rounded-xl bg-sidebar px-4 py-3 text-[14px] leading-relaxed text-fg1">
          <span className="font-mono text-[10px] tracking-[0.1em] text-fg3 uppercase">Why this film · </span>
          {v.why}
        </p>
      </div>

      <aside>
        <p className="font-mono text-[10.5px] tracking-[0.1em] text-fg3 uppercase">
          {videos.length > 1 ? `${videos.length} films on ${company}` : `The film on ${company}`}
        </p>
        <ol className="mt-3 space-y-2">
          {videos.map((f, j) => (
            <li key={f.youtubeId}>
              <button
                type="button"
                onClick={() => setI(j)}
                aria-current={j === i}
                className={`flex w-full gap-3 rounded-xl p-2 text-left transition-colors ${j === i ? "bg-surface shadow-[var(--shadow-md)]" : "hover:bg-hover"}`}
              >
                <span className="relative aspect-video w-[118px] shrink-0 overflow-hidden rounded-lg bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element -- small list thumbnail */}
                  <img src={thumb(f.youtubeId)} alt="" className="h-full w-full object-cover" loading="lazy" />
                  {j === i && <span className="absolute inset-0 grid place-items-center bg-black/45 font-mono text-[9px] font-semibold tracking-[0.1em] text-white">NOW</span>}
                </span>
                <span className="min-w-0">
                  <span className="line-clamp-2 text-[12.5px] leading-snug font-medium">{f.title}</span>
                  <span className="mt-1 block truncate text-[11px] text-fg3">
                    {f.channel}{f.minutes ? ` · ${runtime(f.minutes)}` : ""}{f.language === "hi" ? " · Hindi" : ""}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
