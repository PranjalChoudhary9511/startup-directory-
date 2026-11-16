// Read-only fetch of a known page, strips tags, saves plain text to ../dl/<key>.txt
// usage: node grab.mjs key url [key url ...]
import { execFileSync } from "node:child_process";
import { writeFileSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const dl = join(dirname(fileURLToPath(import.meta.url)), "..", "dl");
const a = process.argv.slice(2);
function strip(h) {
  return h
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<\/(p|div|li|h\d|tr|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&#039;|&rsquo;|&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"').replace(/&mdash;/g, "—").replace(/&ndash;/g, "–")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n");
}
for (let i = 0; i < a.length; i += 2) {
  const [k, u] = [a[i], a[i + 1]];
  const f = join(dl, k + ".html");
  let code = "ERR";
  try {
    code = execFileSync("curl", ["-sL", "--max-time", "30", "-A", "BillionDollarPDFs-research/1.0 (read-only)", "-o", f, "-w", "%{http_code}", u], { encoding: "utf8" });
    const t = strip(readFileSync(f, "utf8"));
    writeFileSync(join(dl, k + ".txt"), t);
    rmSync(f);
    console.log(k, code, t.length);
  } catch (e) {
    console.log(k, code, "FAILED");
  }
}
