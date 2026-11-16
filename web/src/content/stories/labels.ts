// Display helpers for Stories. No data imports, so client components can use them freely.
import type { CollectionKey, CompanyStory, StoryVideo } from "./schema";

export const COLLECTIONS: { key: CollectionKey; title: string; line: string; tint: string }[] = [
  { key: "india-legends", title: "Indian legends", line: "The families and founders who built modern India.", tint: "#E8A33D" },
  { key: "new-india", title: "New India", line: "Startups that changed how India pays, eats and shops.", tint: "#E4572E" },
  { key: "global-icons", title: "Global icons", line: "Brands everyone knows. Stories nobody tells.", tint: "#2F7CF6" },
  { key: "luxury-hospitality", title: "Luxury & hotels", line: "Why some things cost more and stay worth it.", tint: "#9C7A2F" },
  { key: "money-finance", title: "Money & finance", line: "Banks, funds and the people who move the world's money.", tint: "#1F7A4D" },
  { key: "tech-titans", title: "Tech titans", line: "Chips, software and AI: the companies building the future.", tint: "#6E56CF" },
  { key: "failures", title: "Failures that teach", line: "The fastest way to learn is to watch it go wrong.", tint: "#C0392B" },
  { key: "b2b-b2g", title: "B2B & government", line: "Selling to companies, and selling to the state.", tint: "#0F5B66" },
];

export const collectionMeta = (key: CollectionKey) => COLLECTIONS.find((c) => c.key === key)!;

/** The light shape sent to client components. */
export type StoryCard = Pick<CompanyStory, "slug" | "company" | "collection" | "country" | "sector" | "hook"> & {
  lead: Pick<StoryVideo, "youtubeId" | "channel" | "minutes" | "language" | "kind">;
  films: number;
};

/**
 * The film a newcomer should start with: the best-ranked one that runs 50 minutes or less,
 * so a student isn't dropped into a 5-hour podcast. Falls back to the top pick.
 */
export function starterIndex(videos: Pick<StoryVideo, "minutes">[]) {
  const i = videos.findIndex((v) => v.minutes !== null && v.minutes <= 50);
  return i === -1 ? 0 : i;
}

export function toStoryCard(s: CompanyStory): StoryCard {
  const v = s.videos[starterIndex(s.videos)];
  return {
    slug: s.slug,
    company: s.company,
    collection: s.collection,
    country: s.country,
    sector: s.sector,
    hook: s.hook,
    lead: { youtubeId: v.youtubeId, channel: v.channel, minutes: v.minutes, language: v.language, kind: v.kind },
    films: s.videos.length,
  };
}

export const thumb = (id: string, q: "hq" | "maxres" = "hq") => `https://i.ytimg.com/vi/${id}/${q === "hq" ? "hqdefault" : "maxresdefault"}.jpg`;

export function runtime(min: number | null) {
  if (!min) return null;
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export const KIND_LABEL: Record<StoryVideo["kind"], string> = {
  documentary: "Documentary",
  podcast: "Deep-dive podcast",
  "founder-talk": "Founder talk",
  "oral-history": "Oral history",
  explainer: "Story explainer",
};
