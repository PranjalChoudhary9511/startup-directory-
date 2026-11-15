import pillarsData from "@/content/pillars.json";
import grantsData from "@/content/grants.json";
import storiesData from "@/content/stories.json";

export type Track = {
  number: number;
  code: string;
  slug: string;
  title: string;
  story: string | null;
  kind: "cinematic" | "screen" | string;
};

export type Module = {
  number: number;
  title: string;
  isFree: boolean;
  plannedTracks: number;
  deliverable: string | null;
  tracks: Track[];
};

export type Pillar = {
  number: number;
  slug: string;
  title: string;
  plannedTracks: number;
  note: string | null;
  question: string | null;
  color: string;
  deliverable: string | null;
  modules: Module[];
};

export type Grant = {
  slug: string;
  name: string;
  runBy: string;
  level: "Central" | "State" | "Private" | string;
  state: string | null;
  gives: string;
  eligibility: string | null;
  stage: string | null;
  url: string;
  statusNote: string;
  type: string;
  status: "Open" | "Closed" | "Check" | string;
  unverified: boolean;
};

export type StorySector = {
  sector: string;
  slug: string;
  stories: { company: string; founder: string | null; failureStudy: boolean }[];
};

export const pillars = pillarsData as Pillar[];
export const grants = grantsData as Grant[];
export const storySectors = storiesData as StorySector[];

export const pad = (n: number) => String(n).padStart(2, "0");

export const trackCount = (p: Pillar) => p.modules.reduce((n, m) => n + m.tracks.length, 0);
export const totalTracks = pillars.reduce((n, p) => n + trackCount(p), 0);
export const totalModules = pillars.reduce((n, p) => n + p.modules.length, 0);

export const getPillar = (slug: string) => pillars.find((p) => p.slug === slug);
export const getGrant = (slug: string) => grants.find((g) => g.slug === slug);

/** Finds a track plus its module and the previous/next tracks within the pillar. */
export function getTrack(pillar: Pillar, slug: string) {
  const flat = pillar.modules.flatMap((m) => m.tracks.map((t) => ({ track: t, module: m })));
  const i = flat.findIndex((x) => x.track.slug === slug);
  if (i < 0) return null;
  return { ...flat[i], prev: flat[i - 1] ?? null, next: flat[i + 1] ?? null };
}

/** Grants that a pillar's funding module should point to. */
export const fundingPillarSlug = "money";

/** Rough watch time (minutes) for display until real durations exist. */
export const estMinutes = (t: Track) => (t.kind === "screen" ? 12 : 18);
