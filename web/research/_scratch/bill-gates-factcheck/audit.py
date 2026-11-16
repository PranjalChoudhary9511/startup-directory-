import json,re,html,glob,os,sys
sys.stdout.reconfigure(encoding='utf-8',errors='replace')
b=json.load(open('../../../src/content/billionaires/books/bill-gates.json',encoding='utf8'))
def norm(s):
    s=html.unescape(s).lower();s=re.sub(r"[’‘`]","'",s);s=re.sub(r'[“”]','"',s);s=re.sub(r'[^a-z0-9$%\' ]+',' ',s);return re.sub(r'\s+',' ',s).strip()
T={}
for f in glob.glob('src/*.txt'):
    
for f in []:
    pass
for f in glob.glob('src/*.txt'):
    if os.path.basename(f)[0]=='n': continue
    T[int(os.path.basename(f)[:-4])]=norm(open(f,encoding='utf8',errors='ignore').read())
allt=' '.join(T.values())
def strip(s): return re.sub(r'\*\*|__|==','',s)
print('== QUOTES');
for ci,c in enumerate(b['chapters']):
  for i,x in enumerate(c['blocks']):
    if x['t']=='quote':
      q=norm(x['text']);hit=[s for s in x['src'] if s in T and q in T[s]]
      if not hit: print(f'NOHIT {ci}.{i} {x["text"][:90]} src={x["src"]} any={q in allt}')
print('== inline quotes in p'); 
for ci,c in enumerate(b['chapters']):
  for i,x in enumerate(c['blocks']):
    if x['t'] in('p','example'):
      for q in re.findall(r'"([^"]{12,})"',strip(x['text'])):
        n=norm(q)
        if not any(n in T.get(s,'') for s in x['src']): print(f'NOHIT {ci}.{i} "{q[:80]}" src={x["src"]} any={n in allt}')
print('== NOTES>14');
for ci,c in enumerate(b['chapters']):
  run=0
  for i,x in enumerate(c['blocks']):
    if x['t']=='note' and len(x['text'].split())>14: print(ci,i,x['text'])
    if x['t']=='p':
      run+=1
      if run==5: print('WALL',ci,i)
    elif x['t']!='h': run=0
    else: pass
print('== SHINGLES (copy check, 11 words)')
idx={}
def texts():
  for ci,c in enumerate(b['chapters']):
    for i,x in enumerate(c['blocks']):
      if x['t'] in('p','example'): yield f'{ci}.{i}',x['text']
      if x['t']=='venture':
        for k in('idea','decision','howStarted','funding','whatHappened','lesson'): yield f'{ci}.{i}.{k}',x[k]
for w,t in texts():
    t2=re.sub(r'"[^"]*"',' ',strip(t));toks=norm(t2).split();seen=False
    for j in range(len(toks)-10):
        s=' '.join(toks[j:j+11])
        if s in allt:
            print(w,'::',s);seen=True;break
