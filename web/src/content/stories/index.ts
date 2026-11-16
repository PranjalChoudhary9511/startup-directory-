import failuresFinance from "./data/failures-finance.json";
import global from "./data/global.json";
import india from "./data/india.json";
import library from "./data/library.json";
import { COLLECTIONS } from "./labels";
import type { CollectionKey, CompanyStory, StoryVideo } from "./schema";

export type { CollectionKey, CompanyStory, StoryVideo } from "./schema";
export * from "./labels";

const ID = /^[A-Za-z0-9_-]{11}$/;
const KEYS = new Set<CollectionKey>(COLLECTIONS.map((c) => c.key));

function cleanVideos(v: unknown): StoryVideo[] {
  return (Array.isArray(v) ? v : []).filter((x): x is StoryVideo => !!x && ID.test(x.youtubeId) && !!x.title && !!x.channel);
}

/** Merge all sources by company slug; later files only add new videos to an existing company. */
function build(...sources: unknown[][]): CompanyStory[] {
  const bySlug = new Map<string, CompanyStory>();
  for (const raw of sources.flat()) {
    const s = raw as Partial<CompanyStory>;
    if (!s?.slug || !s.company || !s.hook || !s.collection || !KEYS.has(s.collection)) continue;
    const videos = cleanVideos(s.videos);
    const existing = bySlug.get(s.slug);
    if (existing) {
      const seen = new Set(existing.videos.map((v) => v.youtubeId));
      existing.videos.push(...videos.filter((v) => !seen.has(v.youtubeId)));
      continue;
    }
    if (!videos.length) continue;
    bySlug.set(s.slug, {
      slug: s.slug,
      company: s.company,
      collection: s.collection,
      country: s.country === "India" ? "India" : "Global",
      sector: s.sector ?? "",
      founded: typeof s.founded === "number" ? s.founded : null,
      founders: s.founders ?? "",
      hook: s.hook,
      summary: s.summary ?? "",
      learn: Array.isArray(s.learn) ? s.learn.slice(0, 3) : [],
      videos,
    });
  }
  // Keep a video in only one company, so the same film never appears twice.
  const used = new Set<string>();
  for (const s of bySlug.values()) {
    s.videos = s.videos.filter((v) => (used.has(v.youtubeId) ? false : (used.add(v.youtubeId), true))).slice(0, 8);
  }
  return [...bySlug.values()].filter((s) => s.videos.length).sort((a, b) => a.company.localeCompare(b.company));
}

export const STORIES: CompanyStory[] = build(library, india, global, failuresFinance);

export function getStory(slug: string) {
  return STORIES.find((s) => s.slug === slug);
}

export function storiesIn(key: CollectionKey) {
  return STORIES.filter((s) => s.collection === key);
}

/** The guided "Start here" path for a first-time visitor, in order. Missing slugs are skipped. */
const START_HERE = ["rolex", "tata-group", "nike", "the-leela", "infosys", "airbnb", "amul", "nvidia", "theranos", "zerodha", "blackrock", "reliance"];

export const START_PATH: CompanyStory[] = START_HERE.map((s) => getStory(s)).filter((s): s is CompanyStory => !!s).slice(0, 10);

/** Next/previous story within the visitor's flow: the start path first, then the collection. */
export function neighbours(slug: string) {
  const inPath = START_PATH.findIndex((s) => s.slug === slug);
  const list = inPath >= 0 ? START_PATH : storiesIn(getStory(slug)!.collection);
  const i = list.findIndex((s) => s.slug === slug);
  return { list, index: i, prev: list[i - 1] ?? null, next: list[i + 1] ?? null, inPath: inPath >= 0 };
}

export function totals() {
  const films = STORIES.reduce((n, s) => n + s.videos.length, 0);
  const minutes = STORIES.reduce((n, s) => n + s.videos.reduce((m, v) => m + (v.minutes ?? 0), 0), 0);
  return { companies: STORIES.length, films, hours: Math.round(minutes / 60) };
}
