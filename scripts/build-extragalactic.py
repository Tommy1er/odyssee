"""Deterministic, offline map exports. Catalogues stay separate (no implicit cross-match)."""
from pathlib import Path
import csv, gzip, hashlib, json, math
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/'data/references-2026-10-04'
MAN=json.loads((BASE/'MANIFEST.json').read_text())['files']
def table(name):
 raw=(BASE/name).read_bytes()
 assert hashlib.sha256(raw).hexdigest()==MAN[name]['sha256'], name
 lines=[l for l in gzip.decompress(raw).decode().splitlines() if l and not l.startswith('#')]
 rows=list(csv.DictReader([lines[0],*lines[3:]],delimiter='\t'))
 assert len(rows)==MAN[name]['rows']
 return [{k:v.strip() for k,v in r.items()} for r in rows]
def num(s):return float(s) if s.strip() else None
def sex(s,hours=False):
 if not s:return None
 a,b,c=map(float,s.split());v=abs(a)+b/60+c/3600
 return (-v if s.startswith('-') else v)*(15 if hours else 1)
def write(key,fields,rows,source,excluded):
 obj={'schema':1,'catalogue':key,'source':source,'inputSHA256':MAN[source]['sha256'],'inputRows':MAN[source]['rows'],'excluded':excluded,'fields':fields,'rows':rows}
 p=ROOT/'public'/(key+'.json');p.write_text(json.dumps(obj,ensure_ascii=False,separators=(',',':'),allow_nan=False)+'\n')
 print(key,len(rows),'rows,',p.stat().st_size,'bytes')
methods=['DMsnIa','DMtf','DMfp','DMsbf','DMsnII','DMtrgb','DMceph','DMmas']
rows=[]
for r in table('cosmicflows4-galaxies.tsv.gz'):
 rows.append([int(r['PGC']),float(r['RAJ2000']),float(r['DEJ2000']),float(r['DM']),float(r['e_DM']),int(r['Vcmb']),int(r['1PGC']),sum(1<<i for i,k in enumerate(methods) if r[k]),float(r['SGL']),float(r['SGB'])])
assert len({r[0] for r in rows})==len(rows)
write('cf4-map',['pgc','ra','dec','dm','eDm','vCmb','groupPgc','methods','sgl','sgb'],sorted(rows), 'cosmicflows4-galaxies.tsv.gz',[])
rows=[]
for r in table('ungc-2013.tsv.gz'):
 rows.append([r['Name'],sex(r['RAJ2000'],True),sex(r['DEJ2000']),float(r['Dist']),num(r['HRV']),r['Mcl'],num(r['TT']),num(r['A26']),r['SimbadName']])
write('ungc-map',['name','ra','dec','mpc','vHelio','morphology','tType','diameterKpc','simbad'],rows,'ungc-2013.tsv.gz',[])
rows=[];excluded=[]
for r in table('mcconnachie-2012.tsv.gz'):
 if not r['D'] or not r['RAJ2000'] or not r['DEJ2000']:
  excluded.append({'name':r['Name'],'reason':'Distance or coordinates missing; never placed at zero.'});continue
 rows.append([r['Name'],sex(r['RAJ2000'],True),sex(r['DEJ2000']),float(r['D'])/1000,r['SubG'],r['n_Name'],r['MType'],r['u_D'],r['SimbadName']])
write('mcconnachie-map',['name','ra','dec','mpc','subgroup','association','morphology','distanceFlag','simbad'],rows,'mcconnachie-2012.tsv.gz',excluded)
