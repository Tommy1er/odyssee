"""Reuse the archived HYG source, including its incomplete radial velocities."""
import csv,gzip,json
from pathlib import Path
r=Path(__file__).resolve().parents[1]
ids={x['id'] for x in json.load(open(r/'public/catalogue.json'))['stars']}
out={}
for s in csv.DictReader(gzip.open(r/'data/hyg-v41.csv.gz','rt')):
 id='h'+s['id']
 if id in ids and all(s.get(k) for k in ['vx','vy','vz']):
  out[id]={'velocity':[float(s[k])*3.261563777 for k in ['vx','vy','vz']],'epoch':2000,'radialKnown':bool(s['rv'] and float(s['rv'])!=0)}
(r/'public/motion.json').write_text(json.dumps({'source':'HYG v4.1 archived 2026-10-01; parsec/year to ly/year','stars':out},separators=(',',':')))
print('HYG motion entries:',len(out))
