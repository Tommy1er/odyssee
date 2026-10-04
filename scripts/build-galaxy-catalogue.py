import json,math,csv,io,re,gzip
from pathlib import Path
from scipy.spatial import cKDTree
import numpy as np
root=Path(__file__).resolve().parents[1];R=root/'data';base=json.loads((root/'public/catalogue.json').read_text());PC=3.261563777;out=[]
def xyz(ra,dec,d):
 a,b=map(math.radians,[ra,dec]);return [d*math.cos(b)*math.cos(a),d*math.cos(b)*math.sin(a),d*math.sin(b)]
def add(id,name,ra,dec,d,typ='star',**kw):
 o=dict(id=id,name=name,aliases=[],ra=ra,dec=dec,d=d,xyz=xyz(ra,dec,d),type=typ,system=name,planets=[],spect='',mag=10,source='editorial',observed=True,**kw);out.append(o);return o
def tsv(name):
 lines=[s for s in gzip.decompress((R/('galaxy-'+name+'.gz')).read_bytes()).decode().splitlines() if s and not s.startswith('#')];return [dict(zip(lines[0].split('\t'),[v.strip() for v in line.split('\t')])) for line in lines[3:] if not line.startswith('#')]
def num(r,k,default=None):
 try:return float(r[k])
 except:return default
def sex(s,ra=False):
 vals=[float(x) for x in s.split()];v=abs(vals[0])+vals[1]/60+vals[2]/3600;return v*(15 if ra else -1 if s[0]=='-' else 1)
# Gaia DR3: selected high-S/N parallax sample. Not a volume-complete survey.
stars=base['stars'];tree=cKDTree([xyz(s['ra'],s['dec'],1) for s in stars]);gaia=json.loads(gzip.decompress((R/'galaxy-gaia.json.gz').read_bytes()).decode());cols=[x['name'] for x in gaia['metadata']]
for row in gaia['data']:
 r=dict(zip(cols,row));d=1000/r['parallax']*PC;sep,k=tree.query(xyz(r['ra'],r['dec'],1))
 if sep<math.radians(3/3600) and abs(d-stars[k]['d'])<max(2,d*.2):continue
 o=add('gaia:'+str(r['source_id']),'Gaia DR3 '+str(r['source_id']),r['ra'],r['dec'],d);o.update(source='gaia',mag=r['phot_g_mean_mag'],temperature=r['teff_gspphot'],bp_rp=r['bp_rp'],parallax=r['parallax'],parallaxError=r['parallax_error'],kind='Étoile · Gaia DR3',note='Source Gaia DR3 observée. Distance estimée par inversion de parallaxe (signal/bruit >10), non corrigée de tous les biais. Positions ICRS à époque Gaia, sans propagation des mouvements propres. Magnitude G utilisée comme approximation photométrique du visible.',links=[['ESA · Gaia DR3','https://www.cosmos.esa.int/web/gaia/dr3'],['Identifiant Gaia','https://gea.esac.esa.int/archive/']])
# Catalogued open clusters, distances from fitted distance moduli, not synthetic objects.
for r in tsv('clusters-all.tsv'):
 d=num(r,'DistPc')
 if not d or d<=0:continue
 name=r['Cluster'].replace('_',' ')
 if name=='Melotte 22':continue
 ra=num(r,'_RA.icrs',num(r,'RA_ICRS'));dec=num(r,'_DE.icrs',num(r,'DE_ICRS'));d*=PC;half=d*math.tan(math.radians(num(r,'r50',.1)));o=add('cluster:'+r['Cluster'],name,ra,dec,d,'cluster',kind='Amas ouvert · Gaia DR2',radiusLy=max(.3,half*3),halfRadiusLy=half,members=int(num(r,'nbstars07',100)),av=num(r,'AVNN'),clusterModel='open',guide=False,object=True);o.update(source='vizier-gaia-clusters',aliases=[r.get('SimbadName','')],note='Amas catalogué par Cantat-Gaudin et al. (2020), à partir de Gaia DR2. Position et distance de l’amas observées ; distribution 3D des étoiles membres synthétique. Le rayon r50 contient la moitié des membres sélectionnés ; le volume affiché s’étend à 3 r50.',links=[['VizieR · Cantat-Gaudin 2020','https://cdsarc.cds.unistra.fr/viz-bin/cat/J/A+A/640/A1']])
for r in tsv('globulars-all.tsv'):
 if not num(r,'Rsun'):continue
 name=r['ID'];d=num(r,'Rsun')*1000*PC;o=add('globular:'+name.replace(' ',''),name,sex(r['RAJ2000'],True),sex(r['DEJ2000']),d,'cluster',kind='Amas globulaire',radiusLy=75 if name=='NGC 5139' else 50,radiusAssumed=True,clusterModel='globular',members=1000000,object=True,guide=name in ['NGC 5139','NGC 104','NGC 6205']);o.update(source='harris',mag=num(r,'Vt',10),note='Objet observé, catalogue historique de Harris (1996/1997) via VizieR. Distance historique et magnitude intégrée. Population de rendu synthétique (échantillon), non identifications individuelles. Rayon de rendu 50 al supposé si aucune taille spécifique ; 75 al pour Omega Centauri.',links=[['VizieR · Harris','https://cdsarc.cds.unistra.fr/viz-bin/cat/VII/202']]);
 if name=='NGC 5139':o['name']='Omega Centauri';o['aliases']=['NGC 5139','ω Centauri']
 if name=='NGC 104':o['name']='47 Tucanae';o['aliases']=['NGC 104']
 if name=='NGC 6205':o['name']='M13 · amas d’Hercule';o['aliases']=['NGC 6205','M 13']
for r in tsv('pulsars-all.tsv'):
 d=num(r,'Dist');p=num(r,'P0')
 if not d or not p or not r.get('RAJ2000') or not r.get('DEJ2000') or r['PSRJ'] in ['J0534+2200','J0835-4510']:continue
 try:ra=sex(r['RAJ2000'],True);dec=sex(r['DEJ2000'])
 except:continue
 o=add('psr:'+r['PSRJ'],'PSR '+r['PSRJ'],ra,dec,d*1000*PC,'pulsar',kind='Pulsar · ATNF',periodSeconds=p,radiusKm=12,radiusAssumed=True,massSolar=1.4,object=True);o.update(source='atnf-vizier',note='Pulsar observé, ATNF via la version historique VizieR B/psr (mise à jour 2017). Distance souvent estimée par un modèle de densité électronique (TC93), avec incertitude importante ; période cataloguée. Rayon 12 km et masse 1,4 M☉ supposés pour le rendu. Géométrie des faisceaux illustrative.',links=[['ATNF · Manchester et al.','https://www.atnf.csiro.au/research/pulsar/psrcat/'],['Version VizieR utilisée','https://cdsarc.cds.unistra.fr/viz-bin/cat/B/psr']])
coords={re.sub(r'^(NAME |Cl |X )','',re.sub(r'\s+',' ',r[0])):(r[2],r[3]) for r in json.loads(gzip.decompress((R/'galaxy-special.json.gz').read_bytes()).decode())['data']}
specs=[('sgr-a','Sagittarius A*','Sgr A*',26996,'blackhole',4.297e6,'https://www.eso.org/public/blog/our-quest-for-sagittarius-a/'),('westerlund1','Westerlund 1','Westerlund 1',15000,'cluster',None,'https://eso.org/public/images/eso1415b/'),('carina','Nébuleuse de la Carène','NGC 3372',7500,'nebula',None,'https://science.nasa.gov/mission/hubble/science/universe-uncovered/hubble-nebulae/'),('cygx1','Cygnus X-1','Cyg X-1',7200,'blackhole',21.2,'https://arxiv.org/abs/2102.09091'),('pistol','Étoile du Pistolet','Pistol Star',26996,'star',None,'https://science.nasa.gov/missions/hubble/hubble-uncovering-the-secrets-of-the-quintuplet-cluster/'),('sgrb2','Sagittarius B2','Sgr B2',26996,'nebula',None,'https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Sgr+B2'),('sgrae','Sagittarius A Est','Sgr A East',26996,'nebula',None,'https://chandra.harvard.edu/photo/2021/sgra/'),('vela-remnant','Rémanent de Vela','PSR B0833-45',1000,'nebula',None,'https://www.eso.org/public/news/eso2214/')]
for id,name,key,d,typ,mass,url in specs:
 if key not in coords:print('MISSING',key);continue
 ra,dec=coords[key];o=add(id,name,ra,dec,d,typ,guide=True,object=typ!='star',kind={'blackhole':'Trou noir','cluster':'Superamas stellaire','nebula':'Nuage / rémanent','star':'Étoile massive'}[typ]);o.update(aliases=[key],links=[['Source scientifique',url],['SIMBAD · direction','https://simbad.cds.unistra.fr/simbad/sim-id?Ident='+key.replace(' ','+')]],note='Position centrale SIMBAD ; distance de référence approximative. Les structures volumétriques et couleurs par bande sont des reconstructions, pas des données d’imagerie calibrées.')
 if typ=='blackhole':o.update(massSolar=mass,radiusKm=2.953339*mass,accretion=True)
 elif typ=='cluster':o.update(radiusLy=4,clusterModel='massive',members=100000)
 elif typ=='star':o.update(radiusSolar=300,temperature=12000,mag=28,radiusAssumed=True)
 else:o['radiusLy']={'carina':150,'sgrb2':75,'sgrae':15,'vela-remnant':50}[id]
# Orbital / extended structures use explicit approximate geometric models.
center=next(o for o in out if o['id']=='sgr-a')
for id,name,ra,dec in [('arches','Amas des Arches',266.4604166666667,-28.824444444444445),('quintuplet','Amas du Quintuplet',266.55778269545,-28.83003348404491),('magnetar-gc','SGR J1745−2900',266.41735,-29.008282777777776)]:
 typ='pulsar' if id=='magnetar-gc' else 'cluster';o=add(id,name,ra,dec,26996,typ,guide=True,object=True,kind='Magnétar' if typ=='pulsar' else 'Amas massif',radiusLy=4 if typ=='cluster' else None,clusterModel='massive',members=100000);o.update(note='Direction centrale approximative ; distance commune au centre galactique supposée. La profondeur réelle n’est pas reconstruite. Population et faisceaux synthétiques.',links=[['NASA / Chandra','https://www.chandra.harvard.edu/photo/2015/sgr1745/index.html' if typ=='pulsar' else 'https://science.nasa.gov/asset/hubble/the-arches-and-quintuplet-clusters-near-the-milky-ways-galactic-center/']]);
 if typ=='pulsar':o.update(radiusKm=12,radiusAssumed=True,periodSeconds=3.76)
o=add('s2','S2 · orbite de Sagittarius A*',center['ra'],center['dec'],center['d'],'star',guide=True,object=True,kind='Étoile en orbite · période ≈16 ans',radiusSolar=7,temperature=25000,radiusAssumed=True);o.update(note='Orbite képlérienne pédagogique : période 16 ans, excentricité 0,884, demi-grand axe dérivé de la masse 4,297 millions M☉ et de la période. Orientation 3D illustrative, pas des éphémérides ; précession relativiste non intégrée.',orbitParent='sgr-a',links=[['ESO · orbite de S2','https://eso.org/public/news/eso1825/']])
meta={'date':'2026-10-01','realEntries':len(out),'counts':{k:sum(s['source']==k for s in out) for k in sorted(set(s['source'] for s in out))},'syntheticPopulation':'Séparée du catalogue ; échantillons et lumière intégrée issus d’un modèle paramétrique, non observations.'}
(root/'public/galaxy-catalogue.json').write_text(json.dumps({'meta':meta,'stars':out},ensure_ascii=False,separators=(',',':')))
print(meta)
