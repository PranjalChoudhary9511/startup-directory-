// Builds Track-01-Script.docx from track-01-script.txt.
// Run: NODE_PATH=<folder with docx installed>/node_modules node build-track-01-docx.js
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, AlignmentType, PageOrientation, HeadingLevel, BorderStyle,
  Footer, PageNumber, LevelFormat, TableLayoutType, VerticalAlign, PageBreak,
} = require("docx");

const DIR = __dirname;
const SRC = path.join(DIR, "track-01-script-en.txt");
const OUT = path.join(DIR, "..", "Track-01-Script-English.docx");
const OUT_RAW = path.join(DIR, "..", "Track-01-Script-English-SpokenWordsOnly.docx");

// ---------- palette ----------
const C = {
  ink: "1A1A1A", grey: "6B6B6B", light: "F2ECE1", stress: "B45309",
  cue: "4B5D82", pause: "7A7A7A", pauseBg: "ECECEC", head: "0E1433",
  chapterBg: "24356B", rowAlt: "FAF7F1", border: "D9D2C3", red: "C1272D",
};
const FONT = "Arial";

// ---------- parse ----------
const raw = fs.readFileSync(SRC, "utf8").replace(/\r/g, "");
const chapters = [];
let cur = null, row = null;
for (const line of raw.split("\n")) {
  if (line.startsWith("# ")) {
    const [name, , desc, emo] = line.slice(2).split("|").map(s => s.trim());
    cur = { name, desc, emo, rows: [] };
    chapters.push(cur);
  } else if (line.startsWith("### ROW")) {
    row = {};
    cur.rows.push(row);
  } else if (/^(T|B|S|V|D|SRC): /.test(line)) {
    const k = line.slice(0, line.indexOf(":"));
    row[k] = line.slice(k.length + 2).trim();
  }
}

// ---------- timing (English ~155 wpm incl. natural phrasing; explicit pauses added) ----------
const WPM = 155;
function spokenWords(v) {
  return v.replace(/\[[\d.]+\]|\{[^}]*\}|@[A-Z ()]+:/g, "").split(/\s+/).filter(Boolean).length;
}
function pauseSecs(v) {
  return [...v.matchAll(/\[(\d+(?:\.\d+)?)\]/g)].reduce((a, m) => a + (parseFloat(m[1]) >= 1 ? parseFloat(m[1]) : 0.2), 0);
}
let clock = 0, totalWords = 0;
for (const ch of chapters) {
  ch.start = clock;
  for (const r of ch.rows) {
    r.start = clock;
    const w = spokenWords(r.V || "");
    totalWords += w;
    r.dur = (w / WPM) * 60 + pauseSecs(r.V || "") + 0.5; // +0.5 s visual breathing room per beat
    clock += r.dur;
  }
  ch.end = clock;
}
const fmt = s => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`.replace(/:60$/, ":59");
const TOTAL = clock;

// ---------- run helpers ----------
const t = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || 20, bold: o.bold, italics: o.italics, color: o.color || C.ink, shading: o.shading, smallCaps: o.smallCaps, allCaps: o.allCaps });
const P = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], spacing: { before: o.before ?? 0, after: o.after ?? 80, line: o.line || 276 }, alignment: o.align, keepNext: o.keepNext, numbering: o.numbering, indent: o.indent, border: o.border });
const para = (text, o = {}) => P([t(text, o)], o);

// Parse spoken markup into runs.
function voiceRuns(text, size = 22) {
  const runs = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[\d.]+\]|\{[^}]*\})/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) runs.push(t(text.slice(last, m.index), { size }));
    const tok = m[0];
    if (tok.startsWith("**")) runs.push(t(tok.slice(2, -2), { size, bold: true, color: C.stress }));
    else if (tok.startsWith("*")) runs.push(t(tok.slice(1, -1), { size, italics: true }));
    else if (tok.startsWith("[")) {
      const s = parseFloat(tok.slice(1, -1));
      const long = s >= 2;
      if (s < 1) runs.push(t(" / ", { size: 20, bold: true, color: "A8A8A8" }));
      else runs.push(t(` ${s}s `, { size: 16, bold: true, color: long ? "FFFFFF" : C.pause, shading: { type: ShadingType.CLEAR, fill: long ? (s >= 3 ? C.red : "8A8A8A") : C.pauseBg, color: "auto" } }));
    } else runs.push(t(`(${tok.slice(1, -1)})`, { size: 17, italics: true, color: C.cue }));
    last = m.index + tok.length;
  }
  if (last < text.length) runs.push(t(text.slice(last), { size }));
  return runs;
}
function voiceParas(v) {
  const parts = v.split(/(@[A-Z ()]+:)/).filter(s => s.trim());
  const out = [];
  let label = null;
  for (const p of parts) {
    if (/^@[A-Z ()]+:$/.test(p)) { label = p.slice(1, -1); continue; }
    const children = [];
    if (label) children.push(t(label + "  ", { size: 15, bold: true, color: "FFFFFF", shading: { type: ShadingType.CLEAR, fill: label.startsWith("STUDENT") ? "7C3AED" : "3A8FA0", color: "auto" } }), t(" "));
    out.push(P([...children, ...voiceRuns(p.trim())], { after: 100, line: 300 }));
    label = null;
  }
  return out;
}

// ---------- table helpers ----------
const cellBorders = { top: { style: BorderStyle.SINGLE, size: 4, color: C.border }, bottom: { style: BorderStyle.SINGLE, size: 4, color: C.border }, left: { style: BorderStyle.SINGLE, size: 4, color: C.border }, right: { style: BorderStyle.SINGLE, size: 4, color: C.border } };
function cell(children, width, o = {}) {
  return new TableCell({ children, width: { size: width, type: WidthType.DXA }, borders: cellBorders, shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined, margins: { top: 90, bottom: 90, left: 110, right: 110 }, columnSpan: o.span, verticalAlign: o.vAlign });
}
function simpleTable(widths, rows, o = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED,
    rows: rows.map((r, i) => new TableRow({
      tableHeader: o.header && i === 0, cantSplit: o.cantSplit,
      children: r.map((c, j) => cell(Array.isArray(c) ? c : [para(String(c), { size: o.size || 19, bold: o.header && i === 0, color: o.header && i === 0 ? "FFFFFF" : C.ink })], widths[j], { fill: o.header && i === 0 ? C.head : (i % 2 === 0 && o.zebra ? C.rowAlt : undefined) })),
    })),
  });
}

// ---------- styles ----------
const styles = {
  default: { document: { run: { font: FONT, size: 20, color: C.ink } } },
  paragraphStyles: [
    { id: "Title", name: "Title", basedOn: "Normal", run: { font: FONT, size: 52, bold: true, color: C.head }, paragraph: { spacing: { before: 0, after: 120 } } },
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 32, bold: true, color: C.head }, paragraph: { spacing: { before: 320, after: 140 }, keepNext: true, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 25, bold: true, color: "24356B" }, paragraph: { spacing: { before: 240, after: 100 }, keepNext: true, outlineLevel: 1 } },
  ],
};
const numbering = { config: [
  { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 260 } } } }] },
  { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 440, hanging: 300 } } } }] },
] };
const H1 = s => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: s, font: FONT })] });
const H2 = s => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: s, font: FONT })] });
const bullet = (runs) => P(Array.isArray(runs) ? runs : [t(runs)], { numbering: { reference: "bul", level: 0 }, after: 60 });
const numbered = (runs) => P(Array.isArray(runs) ? runs : [t(runs)], { numbering: { reference: "num", level: 0 }, after: 60 });
const rule = () => P([t("")], { border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.border, space: 4 } }, after: 160 });

const footer = new Footer({ children: [P([t("Track 01 · Everyone Saw It. Few Decoded It. · English recording script v1.0 · page ", { size: 16, color: C.grey }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: C.grey })], { align: AlignmentType.CENTER })] });

// ======================================================================
// SECTION 1 — front matter (portrait)
// ======================================================================
const PORTRAIT_W = 11906 - 2 * 1134; // A4, 2 cm margins
const front = [];
front.push(P([t("PILLAR 1 · PROBLEM  ·  ACT 1 · PROBLEM VISION  ·  TRACK 01  ·  FREE FLAGSHIP", { size: 17, bold: true, color: C.stress })], { after: 160 }));
front.push(new Paragraph({ style: "Title", children: [new TextRun({ text: "Everyone Saw It. Few Decoded It.", font: FONT })] }));
front.push(para("English word-by-word recording script, with visuals, pauses, stress and delivery for every line", { size: 24, color: C.grey, after: 240 }));
front.push(simpleTable([2600, PORTRAIT_W - 2600], [
  ["Runtime (estimated)", `≈ ${fmt(TOTAL)} (roughly 21 to 23 minutes, depending on your pace), calculated at an average English pace of ~${WPM} wpm plus every marked pause. An 18-minute cut is in Appendix B.`],
  ["Spoken words", `${totalWords.toLocaleString("en-IN")}`],
  ["Language", "English only. Indian number words (lakh, crore) are kept because the audience is Indian. Every quote is the speaker's original English (Nehru's line is the official translation)."],
  ["Stories", "Tata Nano (a tribute) → Airbnb → Amul and Verghese Kurien"],
  ["The one sentence to leave with", "\"You can see the right problem and still lose, if you answer it at the wrong depth.\""],
  ["Version", "v1.0 · 7 November 2026 · built on the verified research in pillar-1-problem/track-01/research/"],
], { size: 19 }));

front.push(H1("How to read this script"));
front.push(para("Each beat is one row with four columns. Read across the row: the clock, what the audience sees and hears, the exact words you say, and how to say them.", { after: 120 }));
front.push(simpleTable([2300, PORTRAIT_W - 2300], [
  ["Column", "What it holds"],
  ["TIME · BEAT", "Estimated start time (calculated from the word count and pauses) and the beat's name."],
  ["ON SCREEN + SOUND", "Every visual, super, graphic, music cue and SFX, for the editor and motion designer. \"Fact refs\" link each claim to Appendix A."],
  ["WHAT YOU SAY", "The exact spoken words, with markup (below)."],
  ["HOW TO SAY IT", "Pace in words per minute, pitch, volume, face, framing and music under the line."],
], { header: true, zebra: true }));
front.push(H2("Markup inside \"What you say\""));
front.push(simpleTable([3000, PORTRAIT_W - 3000], [
  ["You see", "It means"],
  [[P(voiceRuns("**word**"))], "The one stressed word in the sentence. Hit it, then relax. Never stress more than two words in a sentence."],
  [[P(voiceRuns("[0.5]"))], "A slash is a micro-pause, comma length. Natural phrasing: breathe through it, don't stop."],
  [[P(voiceRuns("[1]"))], "A 1-second pause. Let the fact land."],
  [[P(voiceRuns("[2]"))], "A 2-second pause, which feels endless to you and deliberate to them. Count it silently."],
  [[P(voiceRuns("[3]"))], "Total silence: music and SFX out, room tone only. There are only four in the whole video."],
  [[P(voiceRuns("{lean in, quieter}"))], "A delivery cue. Don't read it aloud."],
  [[P([t("VO  ", { size: 15, bold: true, color: "FFFFFF", shading: { type: ShadingType.CLEAR, fill: "3A8FA0", color: "auto" } })])], "Voice-over: your voice over visuals. ON CAM means you're on camera. STUDENT is a second voice, recorded with a real 16–18-year-old."],
  [[P(voiceRuns("\"quoted words\""))], "Someone's real words, quoted exactly. The same quote is on screen with its source."],
], { header: true, zebra: true }));
front.push(H2("The four total silences (protect them in the edit)"));
for (const s of [
  "The opening: after \"A promise is a promise\", the hard cut to \"June 2018 · 1 car\".",
  "The Nano decode: before \"Let's go deeper\", the drop to Depth 4.",
  "The main chill: before \"Five lakh farmers. Two rupees each.\"",
  "The close: around \"one depth deeper\".",
]) front.push(bullet(s));

front.push(H1("The track at a glance"));
front.push(simpleTable([3300, 1200, 1200, PORTRAIT_W - 5700], [
  ["Chapter", "Starts", "Ends", "Emotional arc (1–10)"],
  ...chapters.map(c => [c.name, fmt(c.start), fmt(c.end), c.emo.replace("Emotion ", "")]),
], { header: true, zebra: true, size: 18 }));
front.push(para("", { after: 80 }));
front.push(simpleTable([2600, PORTRAIT_W - 2600], [
  ["Shape", "\"Man in Hole\". The Nano is the fall, Airbnb is the hand reaching down, Amul is the climb out. The video ends higher than it started."],
  ["Main question (opens in the first 30 seconds)", "\"All three saw what millions of people saw every day. One of them spotted the right problem — and his car still lost.\" It is answered in two halves: the Nano decode (Chapter 2) and the three-iceberg reveal (Close)."],
  ["Smaller loops", "\"What is a problem?\" · \"Did Einstein even say it?\" · \"Where did ₹1 lakh come from?\" · \"2 lakh bookings — so who bought?\" · \"7 investors said no — what did they see?\" · \"The Milkman who didn't drink milk\" · the teaser: \"five lakh farmers… reached Cannes\". Every loop closes inside this video. (\"The smartest people in the world make it too\" pays off with the Silicon Valley investors.)"],
  ["Goosebump moments", "(1) A small chill at the 2008 unveiling. (2) A moved, respectful beat at the Nano tribute. (3) THE MAIN CHILL at about 90% of runtime: 5 lakh farmers × ₹2 → Manthan → Cannes → India No. 1."],
], { size: 19 }));

front.push(H1("Before you record: eight rules"));
for (const r of [
  [t("Talk to one person. ", { bold: true }), t("Tape a photo of one real 17-year-old beside the lens and talk only to them. Never say \"hey guys\" or \"welcome back\".")],
  [t("Pace is a dial. ", { bold: true }), t("Explain at 150–170 wpm, push tension to 170–190, slow reveals and sad beats to 110–130. Your explain pace and sad pace should differ by at least 40 wpm (see the two-week drill plan in the master dossier, section 6.5).")],
  [t("Land the last word. ", { bold: true }), t("End statements with a falling pitch. Kill uptalk. Don't let your volume fade on the last word, because that's usually the key word.")],
  [t("One stress per sentence. ", { bold: true }), t("The orange words are the only ones you hit.")],
  [t("Understate the sad parts. ", { bold: true }), t("Never perform tears. The facts and the silence do the work.")],
  [t("Never shout the triumph. ", { bold: true }), t("The energy comes from breath and an open face, not volume. Pause before the big line and let the music swell after it.")],
  [t("Read one line ahead. ", { bold: true }), t("On the teleprompter, your eyes lead your voice by a line. For the two most emotional beats (the Nano tribute, the Amul climax), try a take with bullet points instead of full text and keep whichever sounds more alive.")],
  [t("Shoot paragraph by paragraph. ", { bold: true }), t("Do 2–3 takes per row. Punch in to a tight close-up for reveals and sad lines. Record 30 s of room tone at every setup.")],
]) front.push(numbered(r));
front.push(H2("Pronunciation"));
front.push(simpleTable([3400, PORTRAIT_W - 3400], [
  ["Name", "Say it"],
  ["Verghese Kurien", "Var-geez Koo-ree-en"], ["Tribhuvandas Patel", "Tri-bhu-van-daas Pa-tel"],
  ["H.M. Dalaya", "Da-laa-ya"], ["Kheda / Kaira", "Khay-da / Kai-ra"], ["Sanand · Singur", "Saa-nand · Sin-goor"],
  ["Ajarpura", "A-jar-poo-ra"], ["Joe Gebbia", "Geb-ee-ah"], ["Brian Chesky", "Ches-kee"], ["Amol Surve", "A-mol Sur-vay"], ["Girish Wagh", "Gi-reesh Waag"],
], { header: true, zebra: true }));
front.push(H2("10-minute warm-up before every take"));
for (const s of [
  "1 min humming on \"mmm\", low to high. 1 min lip trills. 2 min straw phonation (humming through a narrow straw).",
  "Tongue twisters, slow then fast: \"Red leather, yellow leather\" · \"Unique New York\" · \"She sells seashells by the seashore\".",
  "Read the first row once with a pencil between your teeth, then once without it.",
  "Water. No heavy meal or dairy right before recording.",
]) front.push(bullet(s));

// ======================================================================
// SECTION 2 — the script (landscape)
// ======================================================================
const LAND_W = 16838 - 2 * 720;
const W = [1500, 3550, 7350, LAND_W - 1500 - 3550 - 7350];
const scriptRows = [];
scriptRows.push(new TableRow({ tableHeader: true, children: ["TIME · BEAT", "ON SCREEN + SOUND", "WHAT YOU SAY", "HOW TO SAY IT"].map((h, i) => cell([para(h, { size: 17, bold: true, color: "FFFFFF", after: 0 })], W[i], { fill: C.head })) }));
let rowIdx = 0;
for (const ch of chapters) {
  scriptRows.push(new TableRow({ cantSplit: true, children: [cell([
    P([t(ch.name, { size: 24, bold: true, color: "FFFFFF" })], { after: 40 }),
    P([t(`${fmt(ch.start)} – ${fmt(ch.end)}   ·   ${ch.desc}   ·   ${ch.emo}`, { size: 17, color: "DCE3F5" })], { after: 0 }),
  ], LAND_W, { fill: C.chapterBg, span: 4 })] }));
  for (const r of ch.rows) {
    const fill = rowIdx++ % 2 ? C.rowAlt : undefined;
    const screen = [para(r.S || "", { size: 17, after: 60, line: 264 })];
    if (r.SRC && r.SRC !== "—") screen.push(P([t("Fact refs: " + r.SRC, { size: 15, bold: true, color: C.grey })], { after: 0 }));
    scriptRows.push(new TableRow({ children: [
      cell([P([t(fmt(r.start), { size: 22, bold: true, color: C.head })], { after: 40 }), para(r.B || "", { size: 16, bold: true, color: C.grey, after: 0 })], W[0], { fill }),
      cell(screen, W[1], { fill }),
      cell(voiceParas(r.V || ""), W[2], { fill }),
      cell([para(r.D || "", { size: 17, color: "2F3B52", line: 264, after: 0 })], W[3], { fill }),
    ] }));
  }
}
const scriptSection = [
  H1("The Script"),
  para(`Estimated total runtime ≈ ${fmt(TOTAL)}. The times are calculated from the words and pauses, so your real takes will drift by a few seconds; that's fine.`, { size: 18, color: C.grey, after: 120 }),
  new Table({ width: { size: LAND_W, type: WidthType.DXA }, columnWidths: W, layout: TableLayoutType.FIXED, rows: scriptRows }),
  P([t("— END OF TRACK 01 —", { size: 18, bold: true, color: C.grey })], { align: AlignmentType.CENTER, before: 200 }),
];

// ======================================================================
// SECTION 3 — appendices (portrait)
// ======================================================================
const V_ = "✅ Verified", S_ = "⚠️ Single source — attribute on screen";
const FACTS = [
  ["F01", "Nano unveiled 10 Jan 2008, Auto Expo, New Delhi; Tata drove it on stage: \"a promise is a promise\"", V_, "Tribune 11 Jan 2008; Business Standard"],
  ["F02", "June 2018: one Nano produced in the whole month", V_, "Bloomberg via Ada Derana; Autocar Pro"],
  ["F03", "1946 Kaira strike: 15 days, not a drop sold to milk merchants", V_, "Amul Dairy official history; ThePrint; HT 2024"],
  ["F04", "Oct 2007: Airbnb began with 3 airbeds in the founders' SF flat", V_, "Airbnb S-1 (2020); Airbnb newsroom"],
  ["F05", "CB Insights (2014), 101 self-reported founder post-mortems: No. 1 reason \"no market need\", 42%. (CB Insights later withdrew this version; its newest analysis calls running out of money the final symptom and puts poor product-market fit as the leading root cause at 43%.)", V_, "CB Insights via Angel Capital Assn PDF; later coverage"],
  ["F06", "A problem = a gap between how things are and how they're wanted (that costs something)", V_, "Adapted from Gause & Weinberg, Are Your Lights On?"],
  ["F07", "Paul Graham: \"By far the most common mistake startups make is to solve problems no one has.\"", V_, "paulgraham.com/startupideas.html (2012)"],
  ["F08", "The \"55 minutes on the problem\" quote is not Einstein's: earliest 1945 (Robert J. Aley); first linked to Einstein in 1973", V_, "Quote Investigator (2014); Barry Popik"],
  ["F09", "Ratan Tata kept seeing families of 4–5 on scooters, the child sandwiched between the parents, on slippery roads in the dark", V_, "Cornell Chronicle, 10 Mar 2011; Instagram 12 May 2022"],
  ["F10", "Bangalore, rainy day: a scooter skidded in front of his car — \"we could have run over the whole family\"", V_, "Globe and Mail, 11 Apr 2008; Nat Geo India 2020"],
  ["F11", "FY2007-08: ~72.5 lakh two-wheelers vs ~12 lakh cars sold", V_, "SIAM via Just Auto"],
  ["F12", "Two-wheeler riders ≈ 45% of India's road deaths (44.5% in 2022; 44.8% in 2023)", V_, "MoRTH road accident reports"],
  ["F13", "He doodled safer scooters in boring board meetings → caged scooter → doorless buggy with roll-down plastic curtains → car", V_, "Cornell 2011; Instagram 2022; BusinessWeek 2008"],
  ["F14", "₹1 lakh: told the FT at Geneva (2003) \"about $2,500\"; the headline fixed it; he considered a rebuttal, then made it the target; his team was \"aghast\"", V_, "Tata Q&A (Vehicle Service Pros); Tribune 11 Jan 2008"],
  ["F15", "\"Most of my colleagues thought I was mad.\"", V_, "Cornell 2011"],
  ["F16", "About 500 engineers, average age 25–30", V_, "BusinessWeek/NBC 2008; Tata 2015"],
  ["F17", "Girish Wagh on the first prototype: \"It was an embarrassment.\"", S_, "BusinessWeek/NBC, May 2008"],
  ["F18", "Cost cuts: one wiper, three lug nuts per wheel, engine under the rear seat", V_, "Globe and Mail 2008; Tata Q&A; spec sheets"],
  ["F19", "\"Nobody wants a car that is less than everybody else's car.\"", V_, "Ratan Tata pre-launch Q&A"],
  ["F20", "Input costs rose over 4 years, \"but a promise is a promise\"", V_, "Tribune 11 Jan 2008"],
  ["F21", "TIME: \"one of the most important cars ever designed\"", V_, "TIME, Jan 2008"],
  ["F22", "Singur: 997 acres; protests and dharnas", V_, "SC 2016 coverage; Wikipedia (Singur controversy)"],
  ["F23", "Dec 2006: \"If someone holds a gun to my head… pull the trigger\"; 3 Oct 2008: \"Ms Banerjee has pulled the trigger\"", V_, "Oneindia/UNI 2006; Outlook 2024"],
  ["F24", "A one-word SMS of welcome from Gujarat's CM (\"Suswagatam\" is disputed; Modi's own account says \"welcome\")", V_, "Tribune; IANS"],
  ["F25", "The Sanand plant was built in 14 months", V_, "Tata Motors press kit, Jun 2010"],
  ["F26", "SC (31 Aug 2016): the Singur acquisition was illegal; land to be returned to landowners. Mamata Banerjee (19 Oct 2022): \"I did not drive out the Tatas\"", V_, "Down To Earth; Assam Tribune; EastMojo; Outlook Business"],
  ["F27", "26/11 (Nov 2008) attack on the Tata-owned Taj Mahal Palace", V_, "Autocar Pro 2008; widely reported"],
  ["F28", "About 2.03 lakh bookings in 17 days (Apr 2009); a computer lottery picked the first 1 lakh buyers", V_, "Knowledge@Wharton 2011; Motorbeam"],
  ["F29", "The first owner, a customs officer, drove his Nano to a temple", V_, "TopGear PH; NextBillion; CarTrade (Jul 2009)"],
  ["F30", "Half of buyers already owned a car; ~75% of sales in 5 big cities", S_, "Knowledge@Wharton, Jan 2011 (citing Tata Motors)"],
  ["F31", "Target buyers were intimidated by car showrooms; Tata added \"Nano Access Points\"", S_, "Knowledge@Wharton, Jan 2011"],
  ["F32", "Fire incidents 2009–10; Tata denied a design defect", V_, "CarAdvice; IndustryWeek; Wharton"],
  ["F33", "Nov 2010: only 509 Nanos dispatched", V_, "Wharton; IndustryWeek/AFP"],
  ["F34", "First TV ad on 17 Dec 2010, about 21 months after launch", V_, "Wharton; Wikipedia"],
  ["F35", "Launch base price ₹1,12,735 ex-showroom (Mar 2009); ≈ ₹2.15 lakh by 2017", V_, "Multiple dated price points (Rushlane, Wikipedia)"],
  ["F36", "Experts said a second-hand car with AC cost about the same as a Nano", S_, "Murad Ali Baig, via Wheels24/Naharnet (2011)"],
  ["F38", "\"It became termed as a cheapest car by the public and, I am sorry to say, by ourselves.\"", V_, "CNBC, Nov 2013 (AFP via Malay Mail, 3 Dec 2013)"],
  ["F39", "Peak year FY12: 74,527 sold; 2019: one Nano sold", V_, "Gulf News/SIAM; PTI via Tribune (Jan 2020)"],
  ["F40", "The Sanand plant also builds Tata EVs; it had rolled out 10 lakh cars of all models by Mar 2024", V_, "Autocar India; Wikipedia (Sanand Plant)"],
  ["F41", "Girish Wagh became MD & CEO of Tata Motors' commercial-vehicles company (Oct 2025)", V_, "Storyboard18; Trucksbuses"],
  ["F42", "May 2022: aged 84, Tata arrived at the Taj in a Nano with no bodyguards (Shantanu Naidu driving)", V_, "Tribune; Cartoq"],
  ["F43", "\"The Nano, was always meant for all our people.\"", V_, "Instagram @ratantata, 12 May 2022"],
  ["F44", "Rent $1,150 (per Chesky); Chesky had ~$1,000 in the bank", S_, "Chesky, Stanford GSB 2023 (rent disputed: $1,050 elsewhere)"],
  ["F45", "$80 per guest per night", V_, "Sequoia profile; NextShark; Gallagher"],
  ["F46", "Amol Surve, born in India, one of the first three guests; helped with the pitch deck on day one", V_, "Airbnb S-1; Inc42; Indian Express; Sequoia"],
  ["F47", "June 2008: $150K for 10% offered to 7 investors; 5 said no, 2 didn't reply; one wrote the \"market… did not seem large enough\". Chesky's own reading: they saw strangers sleeping in strangers' homes", V_, "Chesky, \"7 Rejections\" (Medium, 2015); BI 2025"],
  ["F48", "10% ≈ $8.65B at IPO close: on paper, before dilution", V_, "Derived: 10% of ~$86.5B (CNBC/Reuters, 10 Dec 2020)"],
  ["F49", "Founders deep in credit-card debt", V_, "Masters of Scale; Inc./NPR"],
  ["F50", "500 Obama O's + 500 Cap'n McCain's, hand-folded and hot-glued, $40 each; Obama O's sold out, the founders ate the McCain's; ~$30K raised", V_, "TechCrunch 2008; The Atlantic 2011; Wired/Gallagher 2017"],
  ["F51", "Paul Graham: \"What's wrong with them?\" … \"You guys are like cockroaches. You just won't die.\" YC invested", V_, "Wired/Gallagher 2017; CNBC 2023; Fortune 2023"],
  ["F52", "\"Go to your users\"; NYC listing photos were bad; founders reshot them door to door; revenue doubled", V_, "Masters of Scale; First Round Review; PG \"Do Things That Don't Scale\""],
  ["F53", "Trust built through photos, profiles and two-way reviews; $1M Host Guarantee (May 2012)", V_, "Gebbia TED 2016; TechCrunch 2012"],
  ["F55", "Airbnb ≈ $100B company (re-check on publish day)", V_, "stockanalysis.com; companiesmarketcap.com (Oct 2026)"],
  ["F56", "Kaira 1945: perishability; Polson's monopoly procurement under the Bombay Milk Scheme; no fixed producer price; payment cuts (\"flies\", \"low fat\"); 1–2 litres per farmer", V_, "Amul Dairy history; NDDB; ThePrint; World Bank OED"],
  ["F57", "Sardar Patel: form your own cooperative; warned of losses; would lead them if they accepted (paraphrase)", V_, "Amul Dairy history; Amul Dairy: Sardar Patel"],
  ["F58", "Union registered 14 Dec 1946; founder chairman Tribhuvandas Patel; 2 village societies, ~247 litres/day", V_, "Amul Dairy history; Telegraph India 2012"],
  ["F59", "Kurien wanted metallurgy/nuclear physics; told \"dairy engineering or nothing\"; studied metallurgy and nuclear physics anyway (\"cheat the government\")", V_, "BusinessLine 2012; Onmanorama 2024; MSU"],
  ["F60", "Arrived in Anand on Friday 13 May 1949, aged 27; lived in a garage; sent a resignation letter every month", V_, "Amul Dairy; ThePrint 2024; Onmanorama"],
  ["F61", "Tribhuvandas asked him to stay until he found another job; agreed to two months (autobiography); stayed 63 years", "✅ / ⚠️ (\"two months\" is from Kurien's autobiography)", "Amul Dairy; drkurien.com; Telegraph 2012; I Too Had a Dream"],
  ["F62", "\"I do not drink milk as I don't like it.\"", V_, "Telegraph India, Independent, Telegraph UK (2012)"],
  ["F63", "Buffaloes give ~2.5× more milk in winter; surplus problem", V_, "Amul Dairy history; Amul Dairy: Dalaya"],
  ["F64", "Experts said buffalo-milk powder was impossible; a NZ expert called Kurien a \"bloody fool\" (Kurien's account)", S_, "Kurien in TOI, 2007; BusinessLine 2004/2012"],
  ["F65", "H.M. Dalaya, whose family lost its land in Partition; first powder made on a borrowed small dryer", V_, "BusinessLine 2004; Wikipedia (Heredia); Amul Dairy"],
  ["F66", "First powder ~24 h before Nehru (Kurien's account); inauguration 31 Oct 1955; \"Big things are done silently\"", "✅ (date, quote) / ⚠️ (24 h, Kurien's account)", "Nehru Archive transcript; TOI 2007; Mint 2009"],
  ["F67", "\"Amul\" comes from the Sanskrit amulya, priceless", V_, "Amul Dairy; Indian Express 2021"],
  ["F68", "1964: Shastri stayed overnight in a farmer's home at Ajarpura; the host was told the guest was \"a foreigner\"; NDDB founded 1965", V_, "Indian Express 2024; TOI 2022; NDDB"],
  ["F69", "Operation Flood funded by selling EEC-donated skim milk powder and butter oil in India", V_, "NDDB; World Bank OED; FAO"],
  ["F70", "Manthan (1976): ~5 lakh farmers paid ₹2 each (deducted at milk centres); credit reads \"500,000 Farmers of Gujarat Present\"; farmers came by the truckload; restored 4K premiered at Cannes Classics, 17 May 2024", V_, "BBC 2024; Cannes; Film Heritage Foundation"],
  ["F71", "1998: India overtook the USA as the world's largest milk producer", V_, "Indian Express 2024; PIB; FAO"],
  ["F72", "36 lakh farmer members; ~80 paise of every consumer rupee to farmers (GCMMF's own figure; an independent IE calculation found ~85%)", V_, "Storyboard18; Rural Voice; GCMMF release"],
  ["F73", "Juicero raised ~$120M; Bloomberg reporters showed its packs could be squeezed by hand (Apr 2017); it shut down in Sep 2017", V_, "Axios; Bloomberg"],
  ["F74", "Ratan Tata died on 9 Oct 2024 in Mumbai, aged 86", V_, "Outlook Business; widely reported"],
];

const app = [];
app.push(H1("Appendix A · Fact sheet (every claim in the script)"));
app.push(para("The \"Fact refs\" in the script point here. Full sources are in research/01–05. ⚠️ items must carry an on-screen attribution such as \"according to…\" or \"Kurien recalled…\".", { after: 120 }));
app.push(simpleTable([700, 4400, 1500, PORTRAIT_W - 6600], [["ID", "Claim as used", "Status", "Main source(s)"], ...FACTS], { header: true, zebra: true, size: 16 }));

app.push(H1("Appendix B · The 18-minute cut"));
app.push(para("If the edit runs long, cut in this order. None of these cuts removes a goosebump moment.", { after: 100 }));
for (const s of [
  "Edit first: tighten every slash ( / ) micro-pause to natural phrasing, keeping all 2 s and 3 s silences untouched. (~45–60 s)",
  "Nano · Singur: shorten the 2006 gun quote to its first sentence. Keep \"pulled the trigger\", Welcome, 14 months, the Supreme Court and Mamata. (~6 s)",
  "Chapter 1 · Sort game: drop Riya's card and keep Mom and the hostel. (~8 s)",
  "Amul · Scale: drop the Operation Flood sentence and keep Shastri, 1998, 36 lakh and 80 paise. (~6 s)",
  "Opening · Map: keep the seven verbs on screen only, and say only \"Seven stages.\" plus the proof line. (~6 s)",
  "Nano · Doodles: drop the buggy-with-curtains sentence and keep the safer scooter. (~5 s)",
  "Amul · Impossible: drop the \"amulya\" name origin and keep it as an on-screen super. (~6 s)",
  "Airbnb · Hustle: drop \"Then came the Y Combinator interview.\" and go straight to Paul Graham's question. (~3 s)",
]) app.push(numbered(s));

app.push(H1("Appendix C · Graphics build list (for the motion designer)"));
app.push(simpleTable([2800, PORTRAIT_W - 2800], [
  ["Asset", "Spec"],
  ["Problem Iceberg master (.mogrt)", "A cross-section; waterline label EVERYONE SEES ↑ / FEW DECODE ↓; depth gauge −1…−4; labels SAY/DO/WHY/WANT; 5 swappable Depth-4 icons (crown, handshake, raised head, steering wheel, clock); an anchor slider; a gold glow on/off; a sonar ping per depth (lower each level) and a warm chime at −4. Exports: 16:9, 9:16, thumbnail still."],
  ["Depth HUD", "A mini gauge, top left, ~6% of frame width; on whenever the story is inside a depth."],
  ["Palette", "Paper #F2ECE1 · Ink #1A1A1A · Decode marigold #F2A900 (annotations only) · Failure sindoor #C1272D · Depths #BFE3E6 → #3A8FA0 → #24356B → #0E1433 · Gold glow #E8B547."],
  ["Type", "Noto Sans plus one handwritten face for annotations. Full-screen kinetic type ONLY for the 4 thesis lines: \"If a gap costs nothing, it's just talk\" · \"Right problem. Wrong depth.\" · \"5 lakh farmers. ₹2 each.\" · \"One depth deeper.\""],
  ["Motion moves", "Pin · Breath (2.5D parallax, max 6–8 s; only on licences that allow layering) · Circle · Split · Route · Counter (lakh/crore) · Fall/Rise line (zero baseline) · Dive · Freeze (max 2) · Stamp."],
  ["Illustrations (owned)", "The rain-and-scooter family · doodle morph scooter → Nano · the school canteen · the scooter family outside a showroom · the SF flat with 3 airbeds · cereal boxes (original art) · the 1945 Kaira village and milk clock · Kurien's garage and resignation letters · Shastri's courtyard night · hands squeezing a juice pouch. All clearly stylised and labelled ILLUSTRATION. No photoreal AI of real people."],
  ["Data visuals", "2-wheelers vs cars bar (FY08) · Nano bookings counter · Nano sales Fall line FY10→FY19 · $150K → $8.65B counter · liquid hours → powder months · India vs USA milk line crossing 1998 · 80/20 rupee split · 36 lakh farmers counter."],
  ["Licensed / permission assets", "Auto Expo 2008 launch photo (Getty/PTI; confirm parallax is allowed) · 2022 Taj-in-Nano still (Viral Bhayani / wire) · Tata Motors Sanand EV B-roll (press kit) · Singur protest photo (wire; show farmers with dignity) · Sardar Patel portrait (PIB; confirm terms) · Manthan poster and credit frame (GCMMF + Film Heritage Foundation) · Cannes 2024 photo (wire) · Airbnb founders (Wikimedia Commons, CC; attribute)."],
], { header: true, zebra: true, size: 17 }));

app.push(H1("Appendix D · YouTube packaging"));
app.push(H2("Title"));
app.push(para("Ratan Tata Saw the Right Problem. So Why Did the Nano Fail?", { bold: true, size: 22 }));
app.push(para("Alternatives: \"Everyone Saw It. Few Decoded It. | Nano, Airbnb, Amul\" · \"The Man Who Built India's Milk Empire Didn't Drink Milk\"", { size: 18, color: C.grey }));
app.push(H2("Thumbnail"));
app.push(para("A white Nano, a two-depth iceberg with the anchor stuck mid-way, and the text \"WRONG DEPTH\". Three elements or fewer, bright, readable in dark mode. Never use clickbait like \"the SHOCKING truth\": it breaks the tribute.", { after: 100 }));
app.push(H2("Description chapters (calculated from this script)"));
for (const ch of chapters) app.push(P([t(`${fmt(ch.start)}  ${ch.name}`, { size: 19 })], { after: 40 }));
app.push(para("Add to the description: \"All trademarks belong to their owners; no affiliation implied. Illustrations are reconstructions. Sources for every fact: [link to notes page].\"", { size: 18, color: C.grey, before: 100 }));

app.push(H1("Appendix E · Record-day checklist"));
for (const s of [
  "Script marked: orange stress words, pauses, breath points (/) before every emotional line, phonetic names on the prompter.",
  "The student voice (\"Arjun, 17\") is recorded separately with a real 16–18-year-old.",
  "Framing: MCU for explaining; tight close-up ready for the decode, the tribute and \"Five lakh farmers\".",
  "Audio: lav or shotgun mic 20–30 cm away; 30 s of room tone per setup; no AC hum.",
  "Shoot order: record the emotional chapters (the Nano decode and tribute, the Amul climax) while your voice is fresh, after the warm-up. Record the opening last, once you're in rhythm.",
  "After each chapter, watch it back muted (check face and energy), then audio-only (check voice).",
  "Before publishing: test-screen with two Class 10 students and one 28-year-old. Every \"matlab?\" moment goes on the re-edit list.",
  "On publish day, re-check: the Airbnb market cap, the Amul turnover, and any ⚠️ items in Appendix A.",
]) app.push(bullet(s));

app.push(H1("Appendix F · Never say (accuracy guardrails)"));
app.push(simpleTable([4200, PORTRAIT_W - 4200], [
  ["Don't say", "Say"],
  ["\"Kurien founded Amul\"", "Tribhuvandas Patel founded the union (1946); Kurien built it into Amul"],
  ["\"Farmers poured milk on the roads\"", "\"Not a single drop sold for 15 days\" (label any pouring shot as dramatisation)"],
  ["\"The Nano cost ₹1 lakh\"", "₹1 lakh was the target dealer price; the launch base was ₹1,12,735 ex-showroom"],
  ["\"Tata drove the Nano to the Taj\"", "He rode in one; Shantanu Naidu was driving"],
  ["\"Modi sent 'Suswagatam'\"", "\"A one-word SMS: welcome\""],
  ["\"Airbnb charged $20 a night\"", "$80 a night ($20 was the airbed's price)"],
  ["\"Amol Surve was THE first guest\"", "\"One of the first three guests\""],
  ["\"They raised $40,000 from cereal\"", "About $30,000"],
  ["\"Einstein said spend 55 minutes on the problem\"", "Only as a Myth Check"],
  ["\"Nehru inaugurated Amul in 1956\"", "31 October 1955"],
  ["\"Shastri lived incognito among farmers\"", "A secret overnight stay; the host was told he was \"a foreigner\""],
  ["\"Mamata drove Tata out\" (one-sided)", "Tata's words, plus the Supreme Court's 2016 ruling, without villains"],
], { header: true, zebra: true, size: 18 }));

// ---------- assemble ----------
const doc = new Document({
  creator: "Founder Curriculum", title: "Track 01 — Everyone Saw It. Few Decoded It. — English Recording Script",
  styles, numbering,
  sections: [
    { properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } }, footers: { default: footer }, children: front },
    { properties: { page: { size: { width: 11906, height: 16838, orientation: PageOrientation.LANDSCAPE }, margin: { top: 720, bottom: 720, left: 720, right: 720 } } }, footers: { default: footer }, children: scriptSection },
    { properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } }, footers: { default: footer }, children: app },
  ],
});
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log("wrote", OUT, "words", totalWords, "runtime", fmt(TOTAL));
});

// ======================================================================
// SECOND DOCUMENT — spoken words only
// ======================================================================
function cleanSpoken(v) {
  return v
    .replace(/\{[^}]*\}/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[(0\.5|1)\]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.?!…])/g, "$1")
    .trim();
}
const rawParas = [];
rawParas.push(new Paragraph({ children: [new TextRun({ text: "Track 01 — Everyone Saw It. Few Decoded It.", font: FONT, size: 30, bold: true, color: C.ink })], spacing: { after: 360 } }));
for (const ch of chapters) {
  for (const r of ch.rows) {
    const segs = (r.V || "").split(/(@[A-Z ()]+:)/).filter(x => x.trim());
    let student = false;
    for (const seg of segs) {
      if (/^@[A-Z ()]+:$/.test(seg)) { student = seg.startsWith("@STUDENT"); continue; }
      const blocks = seg.split(/\[(?:2|3)\]/).map(cleanSpoken).filter(Boolean);
      for (const b of blocks) {
        const runs = student
          ? [new TextRun({ text: "Student: ", font: FONT, size: 26, bold: true, color: "555555" }), new TextRun({ text: b, font: FONT, size: 26, italics: true, color: "555555" })]
          : [new TextRun({ text: b, font: FONT, size: 26, color: C.ink })];
        rawParas.push(new Paragraph({ children: runs, spacing: { after: 220, line: 360 } }));
      }
      student = false;
    }
  }
  rawParas.push(new Paragraph({ children: [new TextRun({ text: "", font: FONT, size: 26 })], spacing: { after: 240 } }));
}
const rawDoc = new Document({
  creator: "Founder Curriculum", title: "Track 01 — English script (spoken words only)",
  styles: { default: { document: { run: { font: FONT, size: 26, color: C.ink } } } },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } }, children: rawParas }],
});
Packer.toBuffer(rawDoc).then(buf => { fs.writeFileSync(OUT_RAW, buf); console.log("wrote", OUT_RAW); });
