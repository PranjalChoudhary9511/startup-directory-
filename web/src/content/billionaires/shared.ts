// Client-safe helpers for Billion Dollar PDFs (no fs). Server-side loading lives in ./index.ts.

// One row per person on the Forbes real-time list (built by scripts/build-billionaires.mjs).
// `photo` is a Commons path "a/ab/File_name.jpg" matched by name + birth year; null → placeholder.
export type Person = {
  slug: string;
  name: string;
  rank: number;
  worth: number; // US$ millions
  country: string;
  source: string;
  industry: string;
  age: number | null;
  selfMade: boolean | null;
  city: string | null;
  photo: string | null;
  credit: string | null; // "Author · Licence"
  wiki: string | null; // English Wikipedia title
};

export const LIST_META = { source: "Forbes Real-Time Billionaires", url: "https://www.forbes.com/real-time-billionaires/", asOf: "29 Oct 2026" };

// Wikimedia only serves thumbnails at its standard widths (others return 400), so snap up to one.
const THUMB_WIDTHS = [120, 250, 330, 500, 960];

export function photoUrl(path: string, width = 330) {
  const parts = path.split("/");
  const file = encodeURIComponent(parts.pop()!);
  const w = THUMB_WIDTHS.find((x) => x >= width) ?? 960;
  const png = /\.(svg|tiff?)$/i.test(file) ? ".png" : "";
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${parts.join("/")}/${file}/${w}px-${file}${png}`;
}

/**
 * Any Commons image URL → a standard-width thumbnail, so it actually loads (and loads fast).
 * …/thumb/a/ab/File.jpg/1000px-File.jpg and full-size …/a/ab/File.jpg both become …/500px-File.jpg.
 */
export function snapThumb(url: string, width = 500) {
  const w = THUMB_WIDTHS.find((x) => x >= width) ?? 960;
  if (/\/thumb\//.test(url)) return url.replace(/\/\d+px-([^/]+)$/, `/${w}px-$1`);
  const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([0-9a-f]\/[0-9a-f]{2})\/([^/]+)$/);
  if (!m) return url;
  const png = /\.(svg|tiff?)$/i.test(m[3]) ? ".png" : "";
  return `${m[1]}/thumb/${m[2]}/${m[3]}/${w}px-${m[3]}${png}`;
}

export function commonsPage(path: string) {
  return `https://commons.wikimedia.org/wiki/File:${path.split("/").pop()}`;
}

/** $924B / $12.4B / $980M / $1.20T */
export function formatWorth(millions: number) {
  if (millions >= 1_000_000) return `$${(millions / 1_000_000).toFixed(2)}T`;
  if (millions >= 100_000) return `$${Math.round(millions / 1000)}B`;
  if (millions >= 1000) return `$${(millions / 1000).toFixed(1)}B`;
  return `$${Math.round(millions)}M`;
}
