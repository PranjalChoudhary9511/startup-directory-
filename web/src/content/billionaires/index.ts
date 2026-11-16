import fs from "node:fs";
import path from "node:path";
import type { Book } from "./book-schema";
import LIST from "./list.json";
import type { Person } from "./shared";

export type { Block, Book, Chapter, Channel, Photo, Social } from "./book-schema";
export * from "./shared";

export const PEOPLE = LIST as Person[];
const BY_SLUG = new Map(PEOPLE.map((p) => [p.slug, p]));

export function getPerson(slug: string) {
  return BY_SLUG.get(slug);
}

// Books live as one JSON file per person in ./books (researched + fact-checked; see
// book-schema.ts for the SOP and `node scripts/check-books.mjs` to validate). Production shows only
// books with a fact-check date; development also shows drafts so they can be previewed. Read once
// in production; re-read on every call in development so new books show up without a restart.
const DIR = path.join(process.cwd(), "src/content/billionaires/books");
let cache: Map<string, Book> | null = null;

function load() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  cache = new Map(
    (fs.existsSync(DIR) ? fs.readdirSync(DIR) : [])
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Book)
      .filter((b) => b?.slug && b.chapters?.length && (b.verifiedAt || process.env.NODE_ENV !== "production"))
      .map((b) => [b.slug, b]),
  );
  return cache;
}

export function getBook(slug: string) {
  return load().get(slug);
}

export function bookSlugs() {
  return [...load().keys()].sort((a, b) => (getPerson(a)?.rank ?? 1e9) - (getPerson(b)?.rank ?? 1e9));
}
