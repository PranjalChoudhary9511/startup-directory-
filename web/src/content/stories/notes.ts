import fs from "node:fs";
import path from "node:path";
import type { BrandNotes } from "./notes-schema";

export type { BrandNotes, Photo } from "./notes-schema";

// Brand notes live as one JSON file per company in ./notes (researched + fact-checked; see
// notes-schema.ts for the SOP and `node scripts/check-notes.mjs` to validate). Adding a file is
// all it takes to light up a company's notes button. Read once in production; re-read on every
// call in development so new or edited files show up without a restart.
const DIR = path.join(process.cwd(), "src/content/stories/notes");
let cache: Map<string, BrandNotes> | null = null;

function load() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  cache = new Map(
    (fs.existsSync(DIR) ? fs.readdirSync(DIR) : [])
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as BrandNotes)
      .filter((n) => n?.slug && n.founder && n.palette)
      .map((n) => [n.slug, n]),
  );
  return cache;
}

export function getNotes(slug: string) {
  return load().get(slug);
}

export function notesSlugs() {
  return [...load().keys()];
}
