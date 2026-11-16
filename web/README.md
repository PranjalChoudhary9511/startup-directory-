# First Rupee: website (working name)

Next.js 16 (App Router, Cache Components) + Tailwind v4 + Supabase. Spec: [../04-website-spec.md](../04-website-spec.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # prerenders all ~428 pages
```

## How content flows

```
../02-curriculum-map.md ──npm run curriculum──▶ src/content/curriculum.generated.json  (the site reads this)
                                            └──▶ supabase/seed.sql                      (same rows for Supabase)
```

- **Edit the curriculum** in `02-curriculum-map.md`, then run `npm run curriculum`.
- **Pillar names and colours:** `src/content/pillars.ts` (keep in sync with the pillars insert in the migration).
- **Track notes, tasks and quizzes:** `src/content/track-content.ts`, keyed by `"<pillar>/<track>"`. Tracks without an entry show an outline.
- **Site name:** `src/content/site.ts`.

## Routes

| Route | What |
|---|---|
| `/` | Home: hero, pillars, how it works, inside the box, pricing |
| `/pillars` | Roadmap of all 8 pillars |
| `/p/[pillar]` | Pillar overview: module grid + full track list |
| `/p/[pillar]/[track]` | Track: video, notes, task, quiz, prev/next; Pro tracks show a locked state |

## Design

The UI follows fanout.sh's design system, measured from the live site: #F7F7F8 canvas, #272727 ink, Overused Grotesk + IBM Plex Mono, with Sora SemiBold as the clean accent (`.accent-display`), 12px cards with layered shadows, a 248px course sidebar. All artwork (folder covers, hero cards, illustrations, brand mark) is original; nothing is copied from fanout's assets.

- Tokens and component styles: `src/app/globals.css`. Component classes are unlayered, so they beat Tailwind utilities: don't put a responsive `hidden`/`md:flex` on an element whose component class sets `display`; wrap it instead.
- Fonts: `src/fonts` (SIL OFL, licences included).
- Pillar folder covers: `src/components/folder-cover.tsx`. Card colours and bullets: `src/content/pillars.ts`.
- Moving logo wall: `src/content/marquee.ts`. It shows companies decoded in the tracks. Switch it to learners' colleges and companies only once real learners exist.

## Stories (`/stories`)

- Data: `src/content/stories/data/*.json` (`CompanyStory` in `schema.ts`), merged by company slug in `index.ts`. Selection rule: storytelling quality only, never views.
- Every video must be live, embeddable and an official upload. Re-check before shipping with YouTube oEmbed (`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=ID&format=json`: 200 = OK, 401 = embedding disabled, 404 = gone).
- Player: `src/components/stories/player.tsx` shows a poster, then the privacy-enhanced `youtube-nocookie.com` embed on play. Opening an embed URL directly shows "Error 153" (no referring site); inside the page it plays normally.
- The "Start here" path is the `START_HERE` list in `src/content/stories/index.ts`.

### Brand notes (`/stories/[slug]/notes`)

Each company can have one set of immersive notes, shared by all its films. A brand-coloured button under the video opens them (companies without notes show "Notes coming soon").

- Data: one file per company, `src/content/stories/notes/<slug>.json`, typed by `BrandNotes` in `src/content/stories/notes-schema.ts`. That file's header is the research SOP: every claim cited, verbatim quotes only, Wikimedia Commons photos with free licences only (credited on the page), video "moments" only at the creators' own chapter times.
- Validate: `node scripts/check-notes.mjs [slug…] --online` (checks shape, citations, licences, and that every photo and source URL loads; it retries Wikimedia 429s).
- Every file so far went through two passes: a research agent, then an independent fact-checker who re-verified claim by claim. `factCheck.method` and `factCheck.disputed` on each page say what was checked and what is contested.
- Page: `src/components/stories/notes-view.tsx` (themed through the file's `palette`), with client pieces in `notes-client.tsx` (3D tilt, count-up numbers, flip cards, the "watch this moment" player). "Save as PDF" prints a clean version (`@media print` rules at the end of `globals.css`).
- Validator output: `✗` lines are real problems; `!` lines are sources behind a bot wall (401/403) that should be opened in a browser once to confirm. An occasional `ERR` or 429 is a network blip: re-run that file.
- Video moments: every `moments[].at` must equal a timestamp the creator wrote in the YouTube description; check with `node scripts/yt-chapters.mjs <youtubeId…>`.
- Done so far (20): the 10 "Start here" companies, plus BlackRock, JPMorgan Chase, Reliance, Taj Hotels, Tesla, Apple, Patek Philippe, Philips, Zomato and Flipkart.

## Supabase

1. Create a project, then run `supabase/migrations/0001_initial_schema.sql` and `supabase/seed.sql` in the SQL editor (or use the Supabase CLI).
2. Copy `.env.example` to `.env.local` and fill in the URL and anon key.

Curriculum content is served from the repo. Supabase holds user data (profiles, progress, deliverables, subscriptions). Until auth is wired, "Mark as complete" stores progress in the browser (`src/lib/progress.ts`).
