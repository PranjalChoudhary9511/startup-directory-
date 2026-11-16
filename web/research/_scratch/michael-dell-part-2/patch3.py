def apply(path, pairs):
    s = open(path, encoding='utf8').read()
    for a, b in pairs:
        assert a in s, a[:70]
        s = s.replace(a, b)
    open(path, 'w', encoding='utf8').write(s)


apply('ch3.js', [
    ("    h(`The napkin`),", "    note(`Two courts, two answers. Even experts can't agree what a company is worth.`),\n\n    h(`The napkin`),"),
])
apply('ch1.js', [
    ("note(`Next three: the biggest bets. The full story is in the following chapters.`),", "note(`Next: the biggest bets. The full story is in the following chapters.`),"),
])
print('patched')
