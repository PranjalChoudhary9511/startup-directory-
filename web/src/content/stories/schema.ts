// Stories: the best business-story videos on the internet, played on-site.
// Selection rule: quality of storytelling and research only. Views, subscribers and likes are ignored.
//
// Data files in ./data/*.json are arrays of CompanyStory. Every youtubeId must be:
//   1. live (YouTube oEmbed returns the same title + channel), and
//   2. embeddable (oEmbed does not refuse it), and
//   3. an official upload by the creator/rights holder (no re-uploads of others' work).

export type CollectionKey =
  | "india-legends" // Tata, Reliance, Infosys, Amul, Asian Paints, HDFC, Maruti…
  | "new-india" // Zerodha, Zomato, Flipkart, Blinkit, Zoho, Freshworks…
  | "global-icons" // Nike, Apple, Amazon, Toyota, IKEA, Coca-Cola…
  | "luxury-hospitality" // Rolex, Patek Philippe, Hermès, LVMH, Taj, The Leela…
  | "money-finance" // BlackRock, JPMorgan, Goldman, Berkshire, Visa, HDFC…
  | "tech-titans" // Nvidia, TSMC, ASML, Microsoft, Meta, OpenAI, Anthropic…
  | "failures" // Theranos, FTX, Wirecard, Boeing, Byju's, Nokia, Kodak…
  | "b2b-b2g"; // Palantir, Salesforce, McKinsey, defence, India Stack…

export type VideoKind = "documentary" | "podcast" | "founder-talk" | "oral-history" | "explainer";

export type StoryVideo = {
  youtubeId: string; // 11-char ID
  title: string; // exact YouTube title (from oEmbed)
  channel: string; // exact channel name (from oEmbed author_name)
  kind: VideoKind;
  language: "en" | "hi";
  minutes: number | null; // runtime in minutes if known
  why: string; // one sentence: why THIS video is worth the time
};

export type CompanyStory = {
  slug: string; // kebab-case company slug, e.g. "rolex"
  company: string; // "Rolex"
  collection: CollectionKey;
  country: "India" | "Global";
  sector: string; // "Luxury watches"
  founded: number | null;
  founders: string; // "Hans Wilsdorf & Alfred Davis"
  hook: string; // ONE line a Class 11 student instantly gets, <= 90 chars
  summary: string; // 2–3 plain sentences: the arc (origins, struggle/failure, breakthrough, lesson)
  learn: string[]; // exactly 3 short bullets: what you'll learn from the main video
  videos: StoryVideo[]; // 1–5, best first. videos[0] is the main track.
};
