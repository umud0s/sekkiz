# DSK "İnzibati ərazi bölgüsü təsnifatı" (2024) PDF-indən kənd və qəsəbələrin siyahısı.
# İstifadə: pdftotext -layout Inzibati-1.05.2024.pdf DIR/i.txt
#           python3 scripts/dsk-kendler.py DIR src/data/xerite-data.json src/data/kendler.json
import re, json, sys, collections
D=sys.argv[1]
txt=open(D+'/i.txt',encoding='utf-8').read()
lines=txt.split('\n')
def az_title(s):
    s=s.strip().lower().replace('i̇','i')
    # Böyük hərf: İ/I düzgün
    out=[]
    for w in s.split(' '):
        if not w: continue
        c=w[0]; c={'i':'İ','ı':'I'}.get(c,c.upper())
        out.append(c+w[1:])
    return ' '.join(out)
def lower_az(s): return s.replace('I','ı').replace('İ','i').lower()
heads={}
for m in re.finditer(r'([A-ZƏÇĞİÖŞÜ][A-ZƏÇĞİÖŞÜ .-]+?) (RAYONU|ŞƏHƏRİ)\s*[–-]\s*(\d{8})', txt):
    name, kind, code = m.group(1).strip(), m.group(2), m.group(3)
    heads[code[:3]] = (name, kind)
SPECIAL={'BAKI':'Bakı','ŞƏKİ':'Şəki','YEVLAX':'Yevlax','LƏNKƏRAN':'Lənkəran','NAXÇIVAN':'Naxçıvan şəhəri'}
def unit_of(code):
    if code[0]=='0': return 'Bakı'
    h=heads.get(code[:3])
    if not h: return None
    n,k=h
    if n in SPECIAL: return SPECIAL[n]
    t=lower_az(n); t={'i':'İ','ı':'I'}.get(t[0],t[0].upper())+t[1:]
    return t
ents=[]
for ln in lines:
    for m in re.finditer(r'(\d{8})\s+(.+?)(?=\s{2,}\d{8}|$)', ln):
        code,raw=m.group(1),m.group(2).strip()
        typ=code[-1]
        if typ not in '468': continue
        nm=re.sub(r'^\d+\.\s*','',raw).strip()
        nm=re.sub(r'\s+(k|q|ş)\.$','',nm)
        toks=nm.split(' ')
        if len(toks)>2 and sum(len(t)==1 for t in toks)>=len(toks)*0.6:
            nm=re.sub(r'(?<=\S) (?=\S)','',nm.replace('  ','\0')).replace('\0',' ')
            nm=re.sub(r'(?<=[a-zəçğıöşü])(?=[A-ZƏÇĞİÖŞÜ])',' ',nm)
        nm=re.sub(r'(\s(k|q|ş)\.?\d*|(?<=[a-zəçğıöşü])(k|q|ş)\.\d*)$','',nm).strip()
        ents.append({'kod':code,'ad':nm,'nov':{'4':'şəhər','6':'qəsəbə','8':'kənd'}[typ],'rayon':unit_of(code)})
# Dublikatlar (eyni kod iki dəfə: mərkəz kəndi həm adi, həm aralı yazılır)
seen={}; 
for e in ents: seen.setdefault(e['kod'],e)
ents=list(seen.values())
print('cəmi:',len(ents), collections.Counter(e['nov'] for e in ents))
print('rayonsuz:',[e for e in ents if not e['rayon']][:5])
print('rayonlar:',len(set(e['rayon'] for e in ents)))
# json.dump yerinə aşağıda oyun üçün yığcam siyahı yazılır

# Oyun üçün: adı bütün ölkədə yalnız bir dəfə rast gəlinən kənd və qəsəbələr.
# Bakı, Ağdərə (xəritədə ayrıca vahid deyil) və şəhər vahidlərinin ərazisi çıxarılır.
xr=json.load(open(sys.argv[2],encoding='utf-8'))
U={u[0]:u[1] for u in xr['U']}
say=collections.Counter(e['ad'] for e in ents)
out={}
for e in sorted(ents,key=lambda e:e['ad']):
    if e['nov']=='şəhər' or say[e['ad']]>1 or e['ad'] in U: continue
    if U.get(e['rayon'])!='rayon': continue
    if not re.fullmatch(r'[A-ZƏÇĞİÖŞÜ][a-zəçğıöşüA-ZƏÇĞİÖŞÜ \-]+',e['ad']): continue
    out.setdefault(e['rayon'],[]).append(('q:' if e['nov']=='qəsəbə' else '')+e['ad'])
json.dump(out,open(sys.argv[3],'w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))
print('oyun üçün:',sum(map(len,out.values())),'ad,',len(out),'rayon')
