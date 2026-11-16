// Prints the creator's own timestamped description lines (in seconds) for YouTube ids, to verify notes "moments".
//   node scripts/yt-chapters.mjs <id> [id…]
for (const id of process.argv.slice(2)) {
  const h = await (await fetch(`https://www.youtube.com/watch?v=${id}`, { headers: { "user-agent": "Mozilla/5.0", "accept-language": "en" } })).text();
  const m = h.match(/"shortDescription":"((?:[^"\\]|\\.)*)"/);
  const d = m ? JSON.parse(`"${m[1]}"`) : "";
  const toS = (t) => t.split(":").map(Number).reduce((a, b) => a * 60 + b, 0);
  console.log(`\n## ${id} ${m ? "" : "(no description found)"}`);
  for (const l of d.split("\n")) {
    const t = l.match(/(\d{1,2}:\d{2}(?::\d{2})?)/);
    if (t) console.log(`${toS(t[1])}s | ${l.trim()}`);
  }
}
