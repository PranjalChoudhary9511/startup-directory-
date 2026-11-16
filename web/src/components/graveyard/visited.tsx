"use client";

import { useEffect, useSyncExternalStore } from "react";

// Which autopsies this reader has opened, kept in localStorage. Read ones get a white flower
// on their stone. Nothing leaves the browser.
const KEY = "gy-visited";
const EVENT = "gy-visited-change";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

let snapshot = "[]";
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
function getSnapshot() {
  const next = JSON.stringify(read());
  if (next !== snapshot) snapshot = next;
  return snapshot;
}

export function useVisited() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  return new Set<string>(JSON.parse(raw));
}

/** Drop this on an autopsy page: marks the grave as read. */
export function MarkVisited({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const v = read();
      if (!v.includes(slug)) {
        localStorage.setItem(KEY, JSON.stringify([...v, slug]));
        window.dispatchEvent(new Event(EVENT));
      }
    } catch {
      // private mode: the flower just won't appear
    }
  }, [slug]);
  return null;
}
