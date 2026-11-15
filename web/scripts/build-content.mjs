// Turns the planning docs in the repo root into JSON seed data for the site.
// Run: npm run content   (re-run whenever 02-curriculum-map.md or 05-grants-and-competitors.md change)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const out = join(here, "..", "src", "content");
mkdirSync(out, { recursive: true });

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const pad = (n) => String(n).padStart(2, "0");

// One colour per pillar, used everywhere that pillar appears.
const PILLAR_COLORS = [
  "#E4572E", // Problem: vermilion
  "#F2A541", // Solution: marigold
  "#2A9D8F", // Market research: teal
  "#5B5FEF", // Build with AI: indigo
  "#D6457A", // Branding: rose
  "#3F8F4F", // Marketing: green
  "#1F6FB2", // Sales: blue
  "#7A5C3E", // Money & ops: earth
];

// ---------- Curriculum ----------
function parseCurriculum(md) {
  const lines = md.split("\n");
  const pillars = [];
  let pillar = null;
  let mod = null;

  for (const raw of lines) {
    const line = raw.trim();

    const p = line.match(/^## PILLAR (\d+): (.+?) \((\d+) tracks\)(.*)$/);
    if (p) {
      const title = p[2]
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace(/\bWith Ai\b/, "with AI");
      pillar = {
        number: Number(p[1]),
        slug: slugify(p[2].split("&")[0]),
        title,
        plannedTracks: Number(p[3]),
        note: p[4].replace(/[,*]/g, "").trim() || null,
        question: null,
        color: PILLAR_COLORS[Number(p[1]) - 1],
        modules: [],
        deliverable: null,
      };
      pillars.push(pillar);
      mod = null;
      continue;
    }
    if (line.startsWith("## ")) {
      pillar = null;
      mod = null;
      continue;
    }
    if (!pillar) continue;

    const q = line.match(/^\*Core question: (.+)\*$/);
    if (q) {
      pillar.question = q[1];
      continue;
    }

    const m = line.match(/^### Module (\d+): (.+?)( 🆓)? \((\d+)\)$/);
    if (m) {
      mod = {
        number: Number(m[1]),
        title: m[2].trim(),
        isFree: Boolean(m[3]),
        plannedTracks: Number(m[4]),
        deliverable: null,
        tracks: [],
      };
      pillar.modules.push(mod);
      continue;
    }

    if (line.startsWith("📦")) {
      const text = line.replace(/^📦\s*/, "").replace(/\*/g, "").trim();
      if (/^Pillar deliverable:/i.test(text)) pillar.deliverable = text.replace(/^Pillar deliverable:\s*/i, "");
      else if (mod) mod.deliverable = text;
      continue;
    }

    if (!mod) continue;

    const t = line.match(/^(\d+)\. (.+)$/);
    if (t) {
      let title = t[2];
      let kind = "cinematic";
      if (title.startsWith("🖥️")) kind = "screen";
      title = title.replace(/^(🎬|🖥️)\s*/u, "");
      const story = title.match(/\*\((.+?)\)\*/);
      title = title.replace(/\s*\*\(.+?\)\*/g, "").trim();
      mod.tracks.push({ number: Number(t[1]), title, story: story ? story[1] : null, kind });
      continue;
    }

    // Pillar 8 lists its topics on one line, separated by " · ".
    if (line.includes(" · ") && mod.tracks.length === 0) {
      line
        .split(" · ")
        .map((s) => s.replace(/\s*\*\(.+?\)\*/g, "").trim())
        .filter(Boolean)
        .forEach((title, i) => {
          title = title.charAt(0).toUpperCase() + title.slice(1);
          mod.tracks.push({ number: i + 1, title, story: null, kind: "cinematic" });
        });
    }
  }

  for (const pl of pillars) {
    for (const md of pl.modules) {
      for (const tr of md.tracks) {
        tr.code = `${pad(md.number)}.${pad(tr.number)}`;
        tr.slug = `${pad(md.number)}-${pad(tr.number)}`;
      }
    }
  }
  return pillars;
}

function parseStories(md) {
  const start = md.indexOf("## Real Stories backlog");
  if (start < 0) return [];
  const rows = md.slice(start).split("\n").filter((l) => l.startsWith("| ") && !l.startsWith("| Sector") && !l.startsWith("|---"));
  return rows.map((row) => {
    const [sector, list] = row.split("|").slice(1, 3).map((s) => s.trim());
    const names = list.split(/,(?![^(]*\))/).map((s) => s.trim()).filter(Boolean);
    return {
      sector,
      slug: slugify(sector),
      stories: names.map((n) => {
        const failure = /failure stud/i.test(n);
        const clean = n.replace(/\*\((as a )?failure stud(y|ies)\)\*/i, "").trim();
        const m = clean.match(/^(.+?)\s*\((.+)\)$/);
        return { company: m ? m[1].trim() : clean, founder: m ? m[2].trim() : null, failureStudy: failure };
      }),
    };
  });
}

// ---------- Grants ----------
function tableAfter(md, heading) {
  const i = md.indexOf(heading);
  if (i < 0) return [];
  const rest = md.slice(i + heading.length).split("\n");
  const rows = [];
  let started = false;
  for (const l of rest) {
    if (l.startsWith("|")) {
      started = true;
      rows.push(l);
    } else if (started) break;
  }
  return rows.slice(2).map((r) => r.split("|").slice(1, -1).map((c) => c.trim()));
}

const clean = (s) => s.replace(/\*\*/g, "").trim();
const unverified = (...cells) => cells.some((c) => /unverified/i.test(c));

function guessType(text) {
  const t = text.toLowerCase();
  if (/guarantee/.test(t)) return "Guarantee";
  if (/fellowship|allowance|sustenance|eir/.test(t)) return "Fellowship";
  if (/credits/.test(t)) return "Credits";
  if (/equity|fund of funds/.test(t)) return "Equity";
  if (/loan|debt/.test(t)) return "Loan";
  if (/accelerator|incubation|programme|program/.test(t) && !/grant/.test(t)) return "Programme";
  if (/recognition|tax/.test(t)) return "Recognition";
  return "Grant";
}

function guessStatus(text) {
  const t = text.toLowerCase();
  if (/closed/.test(t)) return "Closed";
  if (/current|policy to|twice-yearly|approved|rolled out/.test(t)) return "Open";
  return "Check";
}

function parseGrants(md) {
  const grants = [];
  for (const [name, runBy, gives, eligibility, stage, url, status] of tableAfter(md, "### Central government")) {
    grants.push({
      name: clean(name), runBy: clean(runBy), level: "Central", state: null,
      gives: clean(gives), eligibility: clean(eligibility), stage: clean(stage),
      url: clean(url), statusNote: clean(status),
      type: guessType(`${name} ${gives}`), status: guessStatus(status),
      unverified: unverified(gives, status),
    });
  }
  for (const [state, name, gives, url, status] of tableAfter(md, "### State government")) {
    grants.push({
      name: clean(name), runBy: `${clean(state)} government`, level: "State", state: clean(state),
      gives: clean(gives), eligibility: null, stage: null,
      url: clean(url), statusNote: clean(status),
      type: guessType(`${name} ${gives}`), status: guessStatus(status),
      unverified: unverified(gives, status),
    });
  }
  for (const [name, gives, url] of tableAfter(md, "### Corporate & foundation programmes")) {
    grants.push({
      name: clean(name), runBy: clean(name).split(/[:(]/)[0].trim(), level: "Private", state: null,
      gives: clean(gives), eligibility: null, stage: null,
      url: clean(url), statusNote: "Rolling",
      type: guessType(gives), status: "Open",
      unverified: unverified(gives),
    });
  }
  // Where keyword guessing gets the primary support type wrong.
  const TYPE_OVERRIDES = {
    "startup-india-seed-fund": "Grant",
    "meity-tide-2-0": "Grant",
    "msme-idea-hackathon": "Grant",
    "google-for-startups-accelerator-india": "Programme",
    "microsoft-for-startups": "Credits",
    "wadhwani-foundation": "Programme",
  };
  return grants.map((g) => {
    const slug = slugify(g.name.split(/[/(]/)[0]);
    return { slug, ...g, type: TYPE_OVERRIDES[slug] ?? g.type };
  });
}

const curriculum = readFileSync(join(root, "02-curriculum-map.md"), "utf8");
const grantsMd = readFileSync(join(root, "05-grants-and-competitors.md"), "utf8");

const pillars = parseCurriculum(curriculum);
const stories = parseStories(curriculum);
const grants = parseGrants(grantsMd);

writeFileSync(join(out, "pillars.json"), JSON.stringify(pillars, null, 2));
writeFileSync(join(out, "stories.json"), JSON.stringify(stories, null, 2));
writeFileSync(join(out, "grants.json"), JSON.stringify(grants, null, 2));

const trackCount = pillars.reduce((n, p) => n + p.modules.reduce((m, md) => m + md.tracks.length, 0), 0);
console.log(
  `pillars: ${pillars.length}, modules: ${pillars.reduce((n, p) => n + p.modules.length, 0)}, tracks: ${trackCount}, ` +
    `story sectors: ${stories.length}, stories: ${stories.reduce((n, s) => n + s.stories.length, 0)}, grants: ${grants.length}`,
);
