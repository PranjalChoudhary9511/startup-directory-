"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One registry for every live YouTube player on the site.
//
// Why this exists: with Cache Components, Next.js hides pages on navigation instead of
// unmounting them (React Activity). A hidden iframe keeps playing, and when React/Next moves
// the hidden page's DOM the browser *reloads* the iframe; with autoplay=1 it then starts
// playing again, invisibly. Pausing is therefore not enough. A stop must be a hard stop:
// pause, then point the iframe at about:blank so any later reload loads nothing.

export const PLAYER_ORIGIN = "https://www.youtube-nocookie.com";

type Player = {
  el: HTMLIFrameElement;
  path: string; // page the player belongs to
  time: number; // last reported playback position (seconds)
  onStop: (resumeAt: number) => void; // lets the component show its poster again
};

const players = new Set<Player>();
let listening = false;

function listen() {
  if (listening) return;
  listening = true;
  // The embed reports its position after the "listening" handshake; keep it so a stopped
  // film can resume where it was.
  window.addEventListener("message", (e) => {
    if (e.origin !== PLAYER_ORIGIN) return;
    for (const p of players) {
      if (p.el.contentWindow !== e.source) continue;
      try {
        const t = JSON.parse(String(e.data))?.info?.currentTime;
        if (typeof t === "number") p.time = t;
      } catch {
        // Not a player message.
      }
    }
  });
}

/**
 * Hard-stops an iframe even if it was never registered (e.g. it hadn't finished loading).
 *
 * Simply setting `src` would add an entry to the browser's Back history (iframe navigations
 * are recorded in the session history), so the visitor's next Back press would "un-stop" the
 * frame instead of leaving the page. Detaching the frame, changing src, and re-inserting it in
 * the same spot is an initial load, which browsers do not record. Removing it also silences it
 * immediately. React keeps working because it is the same node in the same place.
 */
export function killFrame(el: HTMLIFrameElement | null) {
  if (!el || el.getAttribute("src") === "about:blank") return;
  el.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), PLAYER_ORIGIN);
  const parent = el.parentNode;
  const next = el.nextSibling;
  if (parent) parent.removeChild(el);
  el.setAttribute("src", "about:blank");
  if (parent) parent.insertBefore(el, next);
}

export function registerPlayer(el: HTMLIFrameElement, startAt: number, onStop: Player["onStop"]) {
  listen();
  const p: Player = { el, path: window.location.pathname, time: startAt, onStop };
  players.add(p);
  el.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: "fr", channel: "widget" }), PLAYER_ORIGIN);
  return p;
}

export function stopPlayer(p: Player) {
  if (!players.delete(p)) return;
  killFrame(p.el);
  p.onStop(Math.floor(p.time));
}

/** Stops every player matching `which` (all of them by default). */
export function stopPlayers(which: (p: Player) => boolean = () => true) {
  for (const p of [...players]) if (which(p)) stopPlayer(p);
}

/**
 * Mounted once in the site layout, which is never hidden. On every route change (links,
 * Back, Forward) it stops players that don't belong to the page now on screen, and it stops
 * everything when the visitor leaves the tab, the window or the site.
 */
export function PlaybackGuard() {
  const pathname = usePathname();

  useEffect(() => {
    stopPlayers((p) => p.path !== pathname);
  }, [pathname]);

  useEffect(() => {
    const all = () => stopPlayers();
    const onVisibility = () => document.hidden && all();
    // Clicking into a player moves focus to its iframe and blurs the window; only stop when
    // focus has left the page entirely (another app or window).
    const onBlur = () =>
      setTimeout(() => {
        const active = document.activeElement;
        const intoPlayer = active instanceof HTMLIFrameElement && [...players].some((p) => p.el === active);
        if (!intoPlayer && !document.hasFocus()) all();
      }, 0);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", all);
    window.addEventListener("blur", onBlur);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", all);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return null;
}
