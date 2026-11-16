import fs from "node:fs";
const P = process.argv[2], d = process.argv[3];
const b = JSON.parse(fs.readFileSync(P, "utf8"));
const t173 = fs.readFileSync(`${d}/txt/173.txt`, "utf8").replace(/\s+/g, " ");
const i = t173.indexOf("This comes after its lenders");
console.log(t173.slice(i, i + 1600));
const find = (ch, pred) => {
  const c = b.chapters.find((c) => c.id === ch);
  const x = c.blocks.find(pred);
  if (!x) throw new Error("no block in " + ch);
  return x;
};
const has = (s) => (x) => JSON.stringify(x).includes(s);
const rep = (x, f, a, z) => { if (!x[f].includes(a)) throw new Error("missing " + a); x[f] = x[f].replace(a, z); };

const a = find("first-steps", has("learned the art of diamond assorting"));
a.text = a.text.replace('that Mahendra Brothers was where he "learned the art of diamond assorting", in Business Today\'s summary.', "that Mahendra Brothers was where he learned diamond assorting, according to Business Today's report.");
if (a.text.includes("art of")) throw new Error("2.5");

const v49 = find("every-company", has("financially unviable"));
v49.src = [...v49.src, 298];
const q617 = find("the-bombshell", (x) => x.t === "quote" && x.text.startsWith("Until such time"));
q617.src = [200, 108];
const p616 = find("the-bombshell", has("Kenya's president cancelled over"));
p616.src = [164, 200, 108, 145, 165, 78];

const ndtv = find("every-company", (x) => x.t === "venture" && x.name === "NDTV");
rep(ndtv, "funding", "The purchase, the warrants for ₹1.99 crore, and an open offer at ₹294 a share worth up to ₹493 crore.", "It paid for the purchase, for using the warrants, and for an open offer at ₹294 a share worth up to ₹493 crore.");

const p134 = find("today", has("best half-year ever"));
p134.src = [262, 295, 283, 231, 18];

const tl = find("the-bombshell", (x) => x.t === "timeline");
const it = tl.items.find((y) => y.when === "20 Nov 2024");
it.src = [196, 107];

const p129 = find("what-went-wrong", has("He bought the Carmichael project in Queensland in 2010"));
p129.src = [256, 95, 96, 237];

const p1115 = find("the-brand", has("64.71"));
if (!p1115.src.includes(140)) throw new Error("140");

fs.writeFileSync(P, JSON.stringify(b, null, 2) + "\n", "utf8");
console.log("saved");
