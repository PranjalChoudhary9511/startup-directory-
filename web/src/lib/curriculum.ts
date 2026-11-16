import generated from "@/content/curriculum.generated.json";
import { PILLAR_META, type PillarMeta } from "@/content/pillars";

export type TrackKind = "cinematic" | "screen";

export type Track = {
  number: number;
  code: string;
  slug: string;
  title: string;
  kind: TrackKind;
  story: string | null;
};

export type Module = {
  number: number;
  title: string;
  isFree: boolean;
  deliverable: string;
  tracks: Track[];
};

export type Pillar = PillarMeta & {
  coreQuestion: string;
  deliverable: string;
  modules: Module[];
  trackCount: number;
};

/** A track with everything a track page needs to render and link around. */
export type TrackContext = {
  pillar: Pillar;
  module: Module;
  track: Track;
  prev: { pillar: Pillar; track: Track } | null;
  next: { pillar: Pillar; track: Track } | null;
};

type GeneratedPillar = Omit<Pillar, keyof PillarMeta | "trackCount"> & { number: number };

const PILLARS: Pillar[] = (generated as GeneratedPillar[]).map((p) => {
  const meta = PILLAR_META.find((m) => m.number === p.number);
  if (!meta) throw new Error(`No pillar metadata for pillar ${p.number}`);
  return {
    ...meta,
    ...p,
    trackCount: p.modules.reduce((n, m) => n + m.tracks.length, 0),
  };
});

export function getPillars(): Pillar[] {
  return PILLARS;
}

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}

export function getTotals() {
  return {
    pillars: PILLARS.length,
    modules: PILLARS.reduce((n, p) => n + p.modules.length, 0),
    tracks: PILLARS.reduce((n, p) => n + p.trackCount, 0),
  };
}

export function trackHref(pillar: Pick<Pillar, "slug">, track: Pick<Track, "slug">) {
  return `/p/${pillar.slug}/${track.slug}`;
}

export function trackModule(track: Pick<Track, "slug">) {
  return Number(track.slug.split("-")[0]);
}

export function isTrackFree(pillar: Pillar, track: Track) {
  return pillar.modules.find((m) => m.number === trackModule(track))?.isFree ?? false;
}

const FLAT = PILLARS.flatMap((pillar) =>
  pillar.modules.flatMap((module) => module.tracks.map((track) => ({ pillar, module, track }))),
);

export function getTrackContext(pillarSlug: string, trackSlug: string): TrackContext | undefined {
  const i = FLAT.findIndex((t) => t.pillar.slug === pillarSlug && t.track.slug === trackSlug);
  if (i === -1) return undefined;
  const pick = (j: number) => (FLAT[j] ? { pillar: FLAT[j].pillar, track: FLAT[j].track } : null);
  return { ...FLAT[i], prev: pick(i - 1), next: pick(i + 1) };
}

export function getAllTrackParams() {
  return FLAT.map(({ pillar, track }) => ({ pillar: pillar.slug, track: track.slug }));
}

/** Rough runtime estimate used until real video durations exist. */
export function estimatedMinutes(track: Track) {
  return track.kind === "screen" ? 10 : 16;
}
