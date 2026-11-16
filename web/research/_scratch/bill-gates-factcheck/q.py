import re,sys,html
sys.stdout.reconfigure(encoding="utf-8",errors="replace")
# usage: q.py id::regex id::regex ...
for a in sys.argv[1:]:
    i,rx=a.split('::',1)
    try: t=open(f'src/{i}.txt',encoding='utf8',errors='ignore').read()
    except: print('### no',i); continue
    t=html.unescape(t); t=re.sub(r'\s+',' ',t)
    ms=list(re.finditer(rx,t,re.I))
    print(f'### {i} :: {rx} [{len(ms)}]')
    last=-999;c=0
    for m in ms:
        if m.start()-last<220: continue
        last=m.start();c+=1
        if c>1: break
        print('  -',t[max(0,m.start()-130):m.end()+170])
