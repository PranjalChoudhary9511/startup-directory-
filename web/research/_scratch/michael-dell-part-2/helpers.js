// Block constructors. `src` holds source keys until build.js swaps them for indexes.
const p = (text, ...src) => ({ t: 'p', text, src });
const q = (text, who, ...src) => ({ t: 'quote', text, who, src });
const note = (text) => ({ t: 'note', text });
const ex = (text, ...src) => ({ t: 'example', text, src });
const h = (text) => ({ t: 'h', text });
const facts = (rows) => ({ t: 'facts', items: rows.map(([value, label, src]) => ({ value, label, src })) });
const tl = (rows) => ({ t: 'timeline', items: rows.map(([when, text, src]) => ({ when, text, src })) });
const v = (o) => ({ t: 'venture', ...o });
module.exports = { p, q, note, ex, h, facts, tl, v };
