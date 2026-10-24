# İstifadə: python3 scripts/agdere-serhed.py SCRATCH(geo/map.json) OAD_REPO(open-admin-data/azerbaijan-administrative-divisions) res.json
# Ağdərə rayonunun sərhədini yaşayış məntəqələrinin koordinatlarından qurur.
# Tərtər və Kəlbəcərin xəritədəki artıq sahəsi (DSK ərazisi ilə fərq) Ağdərəyə verilir.
import json,re,glob,sys
import numpy as np
from shapely.geometry import Polygon,MultiPolygon,Point,box
from shapely.ops import unary_union
S=sys.argv[1]; OAD=sys.argv[2]; OUT=sys.argv[3]
m=json.load(open(S+'/geo/map.json'))
K=0.2564  # 1 px² ≈ km²
def poly(d):
    rings=[[tuple(map(float,p.split(','))) for p in re.findall(r'-?\d+\.?\d*,-?\d+\.?\d*',seg)] for seg in re.split(r'(?=M)',d) if seg.strip()]
    return unary_union([Polygon(r).buffer(0) for r in rings if len(r)>2])
UP={u['n']:poly(u['d']) for u in m['units']}
X=lambda lon:167.90669694*lon-7489.2193147; Y=lambda lat:-219.86462042*lat+9235.07213004
pts={}
for f in glob.glob(OAD+'/divisions/*/district.json'):
    dn=json.load(open(f))['name']['local']
    for s in glob.glob(f.rsplit('/',1)[0]+'/*/settlement.json'):
        g=json.load(open(s)).get('geo') or {}
        if g.get('lat'): pts.setdefault(dn,[]).append((X(float(g['lon'])),Y(float(g['lat']))))
DSK={'Tərtər':410,'Kəlbəcər':1970}
parts=[]
for host in ['Tərtər','Kəlbəcər']:
    P=UP[host]; target=P.area-DSK[host]/K
    A=np.array([p for p in pts['Ağdərə'] if P.buffer(2).contains(Point(p))])
    H=np.array([p for p in pts[host] if P.contains(Point(p))])
    st=0.25; x0,y0,x1,y1=P.bounds
    xs=np.arange(x0,x1,st)+st/2; ys=np.arange(y0,y1,st)+st/2
    gx,gy=np.meshgrid(xs,ys)
    from shapely import contains_xy
    inside=contains_xy(P,gx,gy)
    dA=np.min(np.hypot(gx[...,None]-A[:,0],gy[...,None]-A[:,1]),axis=2)
    dH=np.min(np.hypot(gx[...,None]-H[:,0],gy[...,None]-H[:,1]),axis=2)
    lo,hi=-200,200
    for _ in range(60):
        w=(lo+hi)/2; a=((dA-w<dH)&inside).sum()*st*st
        if a>target: hi=w
        else: lo=w
    mask=(dA-w<dH)&inside
    boxes=[]
    for i in range(mask.shape[0]):
        row=mask[i]; j=0
        while j<len(row):
            if row[j]:
                k=j
                while k<len(row) and row[k]: k+=1
                boxes.append(box(x0+j*st,y0+i*st,x0+k*st,y0+(i+1)*st)); j=k
            else: j+=1
    R=unary_union(boxes).buffer(1.2).buffer(-1.2).intersection(P)
    print(host,'Ağdərə nöqtə',len(A),'öz',len(H),'w',round(w,1),'hissə km²',round(R.area*K),'hədəf',round(target*K))
    parts.append(R)
AG=unary_union(parts)
AG=AG.simplify(0.35).intersection(UP['Tərtər'].union(UP['Kəlbəcər']))
if AG.geom_type=='MultiPolygon':
    print('Ağdərə parçaları',[round(g.area*K) for g in AG.geoms]); AG=max(AG.geoms,key=lambda g:g.area)
AG=Polygon(AG.exterior)  # deşiksiz
def clean(G):
    gs=list(G.geoms) if G.geom_type=='MultiPolygon' else [G]
    print('  parçalar',[round(g.area*K,1) for g in gs])
    return max(gs,key=lambda g:g.area)
newT=clean(UP['Tərtər'].difference(AG)); newK=clean(UP['Kəlbəcər'].difference(AG))
# kiçik qırıntılar Ağdərəyə qatılır ki, boşluq qalmasın
rest=UP['Tərtər'].union(UP['Kəlbəcər']).difference(unary_union([newT,newK]))
AG=max([g for g in ([rest] if rest.geom_type=='Polygon' else rest.geoms)],key=lambda g:g.area).union(AG) if not rest.is_empty else AG
AG=AG.buffer(0)
if AG.geom_type=='MultiPolygon': AG=max(AG.geoms,key=lambda g:g.area)
def d(G):
    return ' '.join('M'+' '.join(f'{x:.1f},{y:.1f}' for x,y in list(G.exterior.coords)[:-1])+'Z' for _ in [0])
res={n:{'d':d(G),'cx':round(G.representative_point().x if n=='x' else G.centroid.x,1),'cy':round(G.centroid.y,1),'km2':round(G.area*K)} for n,G in [('Ağdərə',AG),('Tərtər',newT),('Kəlbəcər',newK)]}
for n,v in res.items(): print(n,v['km2'],'km²',v['cx'],v['cy'],len(v['d']))
json.dump(res,open(OUT,'w'),ensure_ascii=False)
