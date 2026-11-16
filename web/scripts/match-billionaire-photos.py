"""Match every Forbes real-time billionaire to a Wikidata person + free Wikimedia Commons photo.

Bulk SPARQL lookups by English label and alias (200 names per query, gentle pacing). A match is
accepted only when the Wikidata entry is a human AND its birth year equals Forbes' birth year.
When Forbes has no birth date, we accept only a single human with that exact name who has a
net-worth or businessperson occupation statement. Anything ambiguous gets no photo, so the site
shows a blank-profile placeholder rather than the wrong face.

Usage (from web/):  python -I scripts/match-billionaire-photos.py research/billionaires/_data/forbes-rtb.json research/billionaires/_data/matches.json
"""
import json, re, sys, time, urllib.parse, urllib.request
from datetime import datetime, timedelta, timezone

UA = "FirstRupeeDirectory/0.1 (educational site; bulk lookups, low rate)"
SPARQL = "https://query.wikidata.org/sparql"
COMMONS = "https://commons.wikimedia.org/w/api.php"


def http_json(url, data=None, tries=6):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, data=data, headers={"User-Agent": UA, "Accept": "application/sparql-results+json"})
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            wait = int(e.headers.get("Retry-After", "0") or 0) or 15 * (i + 1)
            print("  http", e.code, "waiting", wait, flush=True)
            time.sleep(wait)
        except Exception as e:
            print("  err", e, flush=True)
            time.sleep(10 * (i + 1))
    return None


def clean(name):
    n = re.sub(r"\s*&\s*(family|siblings|brother|sister|husband|wife|mother|son|daughter|sons|daughters).*$", "", name, flags=re.I)
    return n.strip()


def variants(name):
    n = clean(name)
    out = {n}
    parts = n.split()
    if len(parts) > 2:
        out.add(f"{parts[0]} {parts[-1]}")  # "Carlos Slim Helu" -> "Carlos Helu" (+ below)
        out.add(" ".join(parts[:2]))  # -> "Carlos Slim"
    return out


def year_of(p):
    b = p.get("birthDate")
    if b is None:
        return None
    return (datetime(1970, 1, 1, tzinfo=timezone.utc) + timedelta(milliseconds=b)).year


def lookup(names):
    values = " ".join(json.dumps(n) + "@en" for n in names)
    q = f"""
SELECT ?name ?item ?born ?img ?wiki ?rich WHERE {{
  VALUES ?name {{ {values} }}
  {{ ?item rdfs:label ?name }} UNION {{ ?item skos:altLabel ?name }}
  ?item wdt:P31 wd:Q5 .
  OPTIONAL {{ ?item wdt:P569 ?born }}
  OPTIONAL {{ ?item wdt:P18 ?img }}
  OPTIONAL {{ ?wiki schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> }}
  BIND(EXISTS {{ ?item wdt:P2218 [] }} || EXISTS {{ ?item wdt:P106 wd:Q43845 }} || EXISTS {{ ?item wdt:P106 wd:Q131524 }} AS ?rich)
}}"""
    d = http_json(SPARQL, data=urllib.parse.urlencode({"query": q}).encode())
    rows = (d or {}).get("results", {}).get("bindings", [])
    by = {}
    for r in rows:
        name = r["name"]["value"]
        qid = r["item"]["value"].rsplit("/", 1)[-1]
        e = by.setdefault(name, {}).setdefault(qid, {"born": set(), "img": None, "wiki": None, "rich": False})
        if "born" in r:
            m = re.match(r"-?(\d{4})", r["born"]["value"])
            if m:
                e["born"].add(int(m.group(1)))
        if "img" in r and not e["img"]:
            e["img"] = urllib.parse.unquote(r["img"]["value"].rsplit("/", 1)[-1])
        if "wiki" in r:
            e["wiki"] = urllib.parse.unquote(r["wiki"]["value"].rsplit("/", 1)[-1]).replace("_", " ")
        if r.get("rich", {}).get("value") == "true":
            e["rich"] = True
    return by, d is not None


def credits(files):
    out = {}
    for i in range(0, len(files), 40):
        batch = files[i:i + 40]
        url = COMMONS + "?" + urllib.parse.urlencode({"action": "query", "titles": "|".join("File:" + f for f in batch), "prop": "imageinfo", "iiprop": "extmetadata", "format": "json"})
        d = http_json(url)
        time.sleep(1)
        for pg in (d or {}).get("query", {}).get("pages", {}).values():
            ii = (pg.get("imageinfo") or [{}])[0].get("extmetadata", {})
            strip = lambda s: re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()
            out[pg.get("title", "")[5:]] = {
                "license": strip(ii.get("LicenseShortName", {}).get("value")),
                "author": strip(ii.get("Artist", {}).get("value"))[:120],
                "free": ii.get("NonFree", {}).get("value") not in ("true", "1", True),
            }
    return out


def main():
    src, out = sys.argv[1], sys.argv[2]
    people = [p for p in json.load(open(src, encoding="utf-8"))["personList"]["personsLists"] if p.get("finalWorth", 0) >= 1000]
    all_names = sorted({v for p in people for v in variants(p["personName"])})
    found = {}
    for i in range(0, len(all_names), 200):
        by, ok = lookup(all_names[i:i + 200])
        found.update(by)
        print(f"{min(i + 200, len(all_names))}/{len(all_names)} names looked up ({'ok' if ok else 'FAILED'})", flush=True)
        time.sleep(2)

    res = {}
    for p in people:
        fy = year_of(p)
        cands = {}
        for v in variants(p["personName"]):
            cands.update(found.get(v, {}))
        pick = None
        if fy:
            same = [(q, e) for q, e in cands.items() if fy in e["born"]]
            if len(same) == 1:
                pick = same[0]
        else:
            rich = [(q, e) for q, e in cands.items() if e["rich"]]
            if len(cands) == 1 and len(rich) == 1:
                pick = rich[0]
        res[p["uri"]] = {"qid": pick[0], "image": pick[1]["img"], "enwiki": pick[1]["wiki"]} if pick else None

    files = sorted({m["image"] for m in res.values() if m and m["image"]})
    print("fetching licences for", len(files), "photos", flush=True)
    cr = credits(files)
    for m in res.values():
        if m and m["image"]:
            m["credit"] = cr.get(m["image"].replace("_", " ")) or cr.get(m["image"]) or None
    json.dump(res, open(out, "w", encoding="utf-8"), ensure_ascii=False)
    print("people", len(people), "matched", sum(1 for v in res.values() if v), "with photo", sum(1 for v in res.values() if v and v.get("image")), flush=True)


if __name__ == "__main__":
    main()
