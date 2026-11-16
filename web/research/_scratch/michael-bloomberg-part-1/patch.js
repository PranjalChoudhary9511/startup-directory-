const fs = require("fs");
let s = fs.readFileSync(__dirname + "/build.js", "utf8");
const R = [
  ["His grandparents had come to America as immigrants from Russia and Lithuania. Nothing", "He was the grandson of Russian and Lithuanian immigrants. Nothing"],
  ["He would run America's biggest city one day. Remember this kitchen-table deal.", "He would run America's biggest city one day. Remember that table."],
  ['At the Gleason School, one student was picked each year to speak at the Memorial Day ceremony. Mike was the one who took part every year. "You just knew', 'At the Gleason School he took part in the Memorial Day ceremony every year, and each year one student was picked to give a speech. "You just knew'],
  ["At ==ten==, he was picked from his Boy Scout troop to read", "At ==ten==, by his own telling, he was picked from his Boy Scout troop to read"],
  ["The kids all gave the obvious answer, and he kept refusing it.", "The kids all gave the obvious answer, and the instructor kept refusing it."],
  ["h(`The youngest Eagle in town`)", "h(`The young Eagle`)"],
  ["His troop decorated the graves of Revolutionary heroes with flags.", "His troop put flags on the graves of old American heroes."],
  ["Twelve years old, knocking on doors. First sales job. Very important.", "A Boy Scout knocking on doors. First sales job. Very important."],
  ["In 2007, when a Newsweek editor handed him a copy at the mayor's residence in New York, he was 65. He looked at the cover and shouted a line about Paul Revere's signal lanterns. Then he said he did not know why he had loved the book so much. The editor had a theory:", 'In 2007, when a Newsweek writer brought a copy to an interview at the mayor\'s residence in New York, he was 65. He looked at the cover and said, with a flourish, "One if by land, two if by sea!" Then he said he did not know why he had loved the book so much. The writer had a theory:'],
  ["We found no record of a big teenage scandal, no expulsion and no arrest. The trouble", "We found no record of a big teenage scandal. The trouble"],
  ["Historians have thrown out that theory. A classmate says Sharkey threw out the paper too, and handed it straight back with one line:", "That theory has been discredited. A classmate says Sharkey threw the paper back at him with one line:"],
  ["That is a long list of hours for a teenager, and it gave him money and a look at real technical work.", "It was not glamorous work, but it was the job that decided where he went next."],
  ["The company was run by a woman engineer with a Ph.D. from MIT, a rare thing in the 1950s. Mike called", "The company was run by a woman engineer with a Ph.D. from MIT. Mike called"],
  ['["Fall 1960", "Leaves for', '["1960", "Leaves for'],
  ["and the job has been told wrongly for years. Asked", "and the job is often told slightly wrong. Asked"],
  ["Soon he was president of the fraternity, president of the Inter-Fraternity Council, and president of his class. He ran campaigns", "He went on to become president of the fraternity, the Inter-Fraternity Council and his senior class. He ran campaigns"],
  ['"ch2 jhmi tun"),', '"ch2 jhmi tun nyt13"),'],
  ["That same year, his world had already split. In ==April 1963==,", "Seven months before that dance, his world had split. In ==April 1963==,"],
  ["In his senior year, Mike took double the normal course load and earned almost all As. Then he applied to Harvard Business School. He says he went right back to Cs afterward.", "In his senior year, Mike took double the normal course load and earned almost all As. His memoir gives a plainer reason for applying to Harvard Business School: most Hopkins students went on to graduate school, and he felt the pressure. He says he went right back to Cs afterward."],
  ['He was less impressed by grades than by who actually did well later on. "The bull-shitters faded away," he wrote, and street smarts and common sense turned out to predict success better than academic results.', 'He kept score on his classmates, and years later he noticed who had done well. "The bull-shitters faded away," he wrote, and street smarts and common sense predicted success better than grades.'],
  ["One summer he took a job in Cambridge", "One summer, the interview does not say which, he took a job in Cambridge"],
  ["Even on interview day, he had stopped to chat with a friendly man in the office at 60 Wall Street without knowing he was the boss, Billy Salomon.", "On the day he interviewed, at 60 Wall Street, he had stopped to chat with a friendly man without knowing he was the boss, Billy Salomon."],
  ["All day he counted real paper bond and stock certificates by hand. Each afternoon", "He counted real paper bond and stock certificates by hand. Each afternoon"],
  ["Billy became the mentor who shaped him most, and Mike later called him", "Billy became a mentor who shaped him deeply, and Mike later called him"],
  ["and he said some women were left close to tears. Bloomberg's spokesman", "and he said some women were left close to tears. He said everyone talked that way, Mike included. Bloomberg's spokesman"],
  ["Mike's people built a system, called the Salomon B-pages, that gave traders live market information.", "Mike's group built a system known as the Salomon B-pages, which gave traders live market information."],
  ["The next morning, Mike rented a one-room office and bought a small refrigerator and a coffee machine.", "On the first morning of the new company, Mike sat in a rented one-room office, and he went out and bought a small refrigerator and a coffee machine."],
  ["No official Scouting record was found, so the record claim is attributed to him and the section heading refers only to town-level pride.", "No official Scouting record was found, so the claim is attributed to him. He also says he was ten and in his Boy Scout troop when he read the poem, which we attribute to him too."],
  ["The Boston Globe, citing the 1960 yearbook era and interviewing Carmen Comite, says Comite was president and Bloomberg a member, and Bloomberg was president of the Debating Society.", "The Boston Globe, which read the 1960 yearbook and interviewed Carmen Comite, says Comite was president and Bloomberg a member, and that Bloomberg was president of the Debating Society."],
];
for (const [a, b] of R) {
  if (!s.includes(a)) { console.log("MISS", a.slice(0, 60)); continue; }
  s = s.replace(a, b);
}
const y60 = '    photo("https://upload.wikimedia.org/wikipedia/commons/4/4f/Michael_Bloomberg_in_1960_Blue_and_White.jpg", "https://commons.wikimedia.org/wiki/File:Michael_Bloomberg_in_1960_Blue_and_White.jpg", "Michael Bloomberg in the 1960 Blue and White, the Medford High School yearbook.", "Medford High School", "Public domain", 1960),\n';
const y64 = '    photo("https://upload.wikimedia.org/wikipedia/commons/1/1d/Michael_Bloomberg_in_1964_Hullabaloo.jpg", "https://commons.wikimedia.org/wiki/File:Michael_Bloomberg_in_1964_Hullabaloo.jpg", "Michael Bloomberg in the 1964 Hullabaloo, the Johns Hopkins University yearbook.", "Johns Hopkins University", "Public domain", 1964),\n';
const nA = "    note(`Same kid, two memories. Both are probably true.`),\n";
if (!s.includes(nA)) console.log("MISS note");
s = s.replace(nA, nA + y60);
const pA = "    p(`He was honest with himself about engineering.";
if (!s.includes(pA)) console.log("MISS p");
s = s.replace(pA, y64 + pA);
fs.writeFileSync(__dirname + "/build.js", s);
console.log("patched");
