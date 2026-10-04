import json,csv,math,re,gzip
from pathlib import Path
import numpy as np
from scipy.spatial import cKDTree
ROOT=Path(__file__).resolve().parents[1];R=ROOT/'data';PC=3.261563777
old=json.load(gzip.open(R/'base-catalogue.json.gz','rt'));stars={s['id']:s for s in old['stars']}
def unit(ra,dec):
 a=math.radians(ra);b=math.radians(dec);return np.array([math.cos(b)*math.cos(a),math.cos(b)*math.sin(a),math.sin(b)])
for r in csv.DictReader(gzip.open(R/'hyg-v41.csv.gz','rt')):
 d=float(r['dist'])*PC
 if d>10000 or (d>100 and float(r['mag'])>7) or r['id']=='71453':continue
 sid='h'+r['id']
 if sid in stars:continue
 name=r['proper'] or r['gl'].replace('Gl ','Gliese ') or r['bf'].strip() or ('HIP '+r['hip'] if r['hip'] else 'HD '+r['hd'])
 stars[sid]=dict(id=sid,name=name,aliases=[v for v in [r['proper'],r['gl'],r['bf'].strip(),'HD '+r['hd'] if r['hd'] else '', 'HIP '+r['hip'] if r['hip'] else ''] if v],d=round(d,5),ra=float(r['ra'])*15,dec=float(r['dec']),spect=r['spect'],mag=float(r['mag']),con=r['con'],system=r['base'].strip() or name,planets=[],source='hyg',xyz=(unit(float(r['ra'])*15,float(r['dec']))*d).round(7).tolist())
normalize=lambda s:re.sub('[^a-z0-9]','',s.lower().replace('gliese','gj').replace('gl ','gj'))
idx={normalize(n):s for s in stars.values() for n in s['aliases']};hosts={s['host']:s for s in stars.values() if s.get('host')}
allstars=list(stars.values());tree=cKDTree([unit(s['ra'],s['dec']) for s in allstars]);planet_ids=set()
for s in stars.values():s['planets']=[]
for p in json.load(gzip.open(R/'planets-2026-10-01.json.gz','rt')):
 if p['sy_dist']*PC>10000 or p['pl_name'] in planet_ids:continue
 s=hosts.get(p['hostname']) or idx.get(normalize(p['hostname']))
 if s is None:
  sep,j=tree.query(unit(p['ra'],p['dec']));cand=allstars[j]
  if sep<math.radians(60/3600) and abs(cand['d']-p['sy_dist']*PC)<max(1,p['sy_dist']*PC*.20):s=cand
 if s is None:
  sid='n'+normalize(p['hostname']);d=p['sy_dist']*PC
  s=stars.setdefault(sid,dict(id=sid,name=p['hostname'],aliases=[p['hostname']],d=round(d,5),ra=p['ra'],dec=p['dec'],xyz=(unit(p['ra'],p['dec'])*d).round(7).tolist(),spect='',mag=10,con='',system=p['hostname'],planets=[],source='nasa'))
 hosts[p['hostname']]=s;s['host']=p['hostname'];s['nstar']=p['sy_snum'];s['radiusSolar']=p['st_rad'];s['temperature']=p['st_teff']
 s['planets'].append(dict(name=p['pl_name'],year=p['disc_year'],radiusEarth=p['pl_rade'],massEarth=p['pl_bmasse'],axisAU=p['pl_orbsmax'],periodDays=p['pl_orbper'],equilibriumK=p['pl_eqt']));planet_ids.add(p['pl_name'])
# Primary sources for distances; central J2000 directions from SIMBAD.
clean=lambda x:' '.join(x.replace('V* ','').replace('* ','').replace('X ','').split())
coord={clean(r[0]):r for r in json.load(open(R/'special-coordinates.json'))['data']}
for r in json.load(open(R/'bh-coordinates.json'))['data']:
 for key,ident in [('Gaia BH1','4373465352415301632'),('Gaia BH2','5870569352746779008'),('Gaia BH3','4318465066420528000')]:
  if ident in r[0] or key.replace(' ','') in r[0].replace(' ',''):coord[key]=r
specs=[
('gaia-bh1','Gaia BH1',1560,'blackhole',9.62,'Trou noir dormant, identifié grâce au mouvement de son étoile compagne. Aucun disque brillant ajouté par défaut.','https://www.esa.int/Science_Exploration/Space_Science/Gaia/Gaia_discovers_a_new_family_of_black_holes'),
('gaia-bh2','Gaia BH2',3800,'blackhole',8.9,'Trou noir dormant dans un système binaire. Le point localise le système, pas une image résolue de l’horizon.','https://www.esa.int/Science_Exploration/Space_Science/Gaia/Gaia_discovers_a_new_family_of_black_holes'),
('gaia-bh3','Gaia BH3',1926,'blackhole',32.7,'Trou noir stellaire dormant d’environ 33 masses solaires. Sa compagne a permis de mesurer sa masse.','https://www.esa.int/Science_Exploration/Space_Science/Gaia/Sleeping_giant_surprises_Gaia_scientists'),
('v404','V404 Cyg',7800,'blackhole',9,'Système contenant un trou noir et une étoile donneuse de matière. Le disque représenté est une reconstitution, pas une observation de son horizon.','https://www.nasa.gov/universe/listen-to-the-light-echoes-from-a-black-hole/'),
('pillars','M 16',6500,'pillars',None,'Les Piliers de la Création sont des colonnes de gaz et de poussières de la nébuleuse de l’Aigle. Leur relief 3D est une reconstruction qualitative. À proximité, le gaz reste diffus ; les couleurs Webb sont des bandes infrarouges traduites en couleurs.','https://science.nasa.gov/asset/webb/pillars-of-creation-nircam-image/'),
('orion','M 42',1350,'nebula',None,'La nébuleuse d’Orion est une région de formation d’étoiles. L’image infrarouge et les couleurs scientifiques ne sont pas la perception directe de l’œil.','https://science.nasa.gov/missions/hubble/nasa-space-telescopes-provide-a-3d-journey-through-the-orion-nebula/'),
('crab','M 1',6500,'nebula',None,'Le rémanent de la supernova observée en 1054 contient un pulsar. Les filaments visibles ici sont une reconstitution procédurale.','https://science.nasa.gov/asset/webb/crab-nebula-nircam-and-miri-image/'),
('ring','M 57',2500,'nebula',None,'Une enveloppe gazeuse expulsée par une étoile mourante. Le modèle en anneau est simplifié.','https://science.nasa.gov/asset/webb/ring-nebula-nircam-image/'),
('eta-car','eta Car',7500,'nebula',None,'Un système stellaire massif entouré des lobes de l’Homoncule, issus d’une grande éruption.','https://science.nasa.gov/asset/hubble/probing-the-last-gasps-of-the-doomed-star-eta-carinae/'),
('vela','PSR B0833-45',1000,'pulsar',1.4,'Une étoile à neutrons tournant en environ 89 millisecondes. Faisceaux et vitesse de rotation affichés au ralenti ; rayon 10 km et masse 1,4 Soleil sont des valeurs pédagogiques.','https://www.chandra.harvard.edu/press/13_releases/press_010713.html'),
('crab-pulsar','PSR B0531+21',6500,'pulsar',1.4,'L’étoile à neutrons centrale du Crabe. Le modèle local illustre des faisceaux ; masse et rayon sont des hypothèses pédagogiques.','https://science.nasa.gov/asset/webb/crab-nebula-nircam-and-miri-image/')]
names={'pillars':'Piliers de la Création','orion':'Nébuleuse d’Orion','crab':'Nébuleuse du Crabe','ring':'Nébuleuse de la Lyre','eta-car':'Eta Carinae · Homoncule','vela':'Pulsar de Vela','crab-pulsar':'Pulsar du Crabe','v404':'V404 Cygni'}
for sid,key,d,typ,mass,note,url in specs:
 if key not in coord:print('MISSING',key);continue
 _,canonical,ra,dec=coord[key]
 s=dict(id=sid,name=names.get(sid,key),aliases=[key,canonical],d=d,ra=ra,dec=dec,xyz=(unit(ra,dec)*d).round(7).tolist(),system=key,kind={'blackhole':'Trou noir stellaire','pillars':'Nuages moléculaires','nebula':'Nébuleuse','pulsar':'Étoile à neutrons'}[typ],type=typ,massSolar=mass,guide=True,object=True,planets=[],source='editorial',mag=9,con='',note=note,links=[['Source scientifique',url],['SIMBAD · coordonnées','https://simbad.cds.unistra.fr/simbad/sim-id?Ident='+key.replace(' ','+')]])
 if typ=='blackhole':s['radiusKm']=2.95325*mass;s['accretion']=sid=='v404';s['massApprox']=True
 elif typ=='pulsar':s['radiusKm']=10;s['radiusAssumed']=True
 else:s['radiusLy']=2 if sid=='pillars' else .6 if sid in ['ring','eta-car'] else 5
 stars[sid]=s
for s in stars.values():
 s.setdefault('type','nebula' if s['id']=='helix' else 'cluster' if s['id']=='pleiades' else 'star')
 if s['id']=='helix':s['radiusLy']=1.4
 if s['id']=='pleiades':s['radiusLy']=8
 if s['id']=='h0':s.update(radiusSolar=1,temperature=5772)
 if s['id']=='h70666':s.update(radiusSolar=.154,temperature=3000)
 for p in s['planets']:p.setdefault('axisAU',None)
D={'meta':{'date':'2026-10-01','catalogue':'HYG v4.1 + NASA Exoplanet Archive + SIMBAD + NASA/ESA','hyg_license':'CC BY-SA 4.0','selection':'HYG : distance ≤100 al ou magnitude V ≤7, jusqu’à 10 000 al ; hôtes d’exoplanètes NASA et repères NASA/ESA. Non exhaustif.','position':'J2000, catalogue statique. Distances historiques HYG ; NASA pour hôtes ajoutés ; NASA/ESA pour objets remarquables.','count':len(stars),'planets':sum(len(s['planets']) for s in stars.values())},'stars':sorted(stars.values(),key=lambda s:s['d'])}
(ROOT/'public/catalogue.json').write_text(json.dumps(D,ensure_ascii=False,separators=(',',':')))
print(D['meta'])
