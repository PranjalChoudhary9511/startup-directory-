"use client";

import { useSyncExternalStore } from "react";

// Completed tracks, stored in the browser until accounts exist.
// Keys are "<pillar-slug>/<track-slug>". Supabase `progress` replaces this once auth ships.
const STORAGE_KEY = "fr.progress.v1";
const EMPTY: ReadonlySet<string> = new Set();

let cache: ReadonlySet<string> | null = null;
const listeners = new Set<() => void>();

function read(): ReadonlySet<string> {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    cache = new Set();
  }
  return cache;
}

function write(next: Set<string>) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  } catch {
    // Storage blocked (private mode etc.): keep progress for this tab only.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function progressKey(pillarSlug: string, trackSlug: string) {
  return `${pillarSlug}/${trackSlug}`;
}

export function useCompleted(): ReadonlySet<string> {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function setCompleted(key: string, done: boolean) {
  const next = new Set(read());
  if (done) next.add(key);
  else next.delete(key);
  write(next);
}
