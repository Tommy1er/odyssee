// Preuve de faisabilité (essai seulement) : les couches du niveau « Groupe local » de cosmos.html
// rendues dans la Carte galactique 3D du cockpit, par le même moteur WebGL, sans changer de page.
// - Enveloppe de repérage du Groupe local (CosmicScene, celle de cosmos.html) et son étiquette ;
// - Galaxies cataloguées McConnachie 2012 et/ou UNGC 2013 (ObservedGalaxies, mêmes symboles additifs que cosmos.html).
// Les galaxies majeures (Voie lactée, M31, M33) et le Soleil restent dessinés par la Carte du cockpit : on masque
// leurs doublons de CosmicScene. Coordonnées : même repère équatorial que le cockpit (xyz de cosmic-data), en
// millions d'années-lumière, mises à l'échelle par un groupe ×1e6 dans mapWorld (années-lumière).
import * as T from 'three';
import {CosmicScene} from './cosmic-scene.js';
import {ObservedGalaxies} from './observed-galaxies.js';
import {CATALOGUES,decodeCatalogue,filterCatalogue} from './extragalactic-data.js';
import {MLY,STRUCTURES,LEVELS} from './cosmic-data.js';
import {BasinLayer} from './cf4-basins.js';

const KEYS=['mcconnachie','ungc','cf4'];
// Horizon de l'Univers observable, comme cosmos.html : rayon comobile de l'horizon des particules ≈ 14,3 Gpc = 46,5 milliards d'al
// (ΛCDM Planck 2018). Les coordonnées de la Carte sont lues comme des distances comobiles à cette échelle.
export const HORIZON_MLY=46500;
const EXCLUDED=/^(the galaxy|milky way)$/i; // nous sommes dedans : la Carte du cockpit a son propre modèle
function makeLabel(text,color){const c=document.createElement('canvas');c.width=512;c.height=64;const x=c.getContext('2d');x.font='28px monospace';x.fillStyle=color;x.fillText(text,5,43);
 const s=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(c),transparent:true,depthTest:false}));s.scale.set(9,1.125,1);return s;}

export class CockpitCosmicMap{
 constructor(mapWorld,mapScene){
  this.root=new T.Group();this.root.scale.setScalar(MLY);this.root.visible=false;mapWorld.add(this.root);
  this.cosmic=new CosmicScene({map:true});this.root.add(this.cosmic.root);
  this.layers=Object.fromEntries(KEYS.map(k=>{const l=new ObservedGalaxies(this.root);l.plane.visible=false;return [k,{layer:l,rows:[],status:'idle'}];}));
  this.catalogues=new Set(['mcconnachie']);this.enabled=false;this._v=new T.Vector3();
  this.filter={maxMpc:Infinity,maxError:Infinity};this.showPlane=true; // mêmes filtres et même plan supergalactique que cosmos.html
  this.loaders={}; // chargeurs fournis par le cockpit (CF4 : décodage partagé avec la recherche, 3,9 Mo téléchargés une seule fois)
  this.group=STRUCTURES.find(o=>o.id==='local-group');
  // Niveau de cosmos.html affiché (0 Groupe local, 1 Voisinage de la Vierge) et structure mise en avant.
  this.level=0;this.focus='local-group';
  // Étiquettes des structures des niveaux intégrés (galaxies exclues : la Carte du cockpit a les siennes).
  this.labels=STRUCTURES.filter(o=>o.type!=='galaxy').map(o=>{const l=makeLabel(o.name,'#f0c47a');l.visible=false;l.center.set(0,.5);if(mapScene)mapScene.add(l);return {o,l};});
  this.label=this.labels.find(x=>x.o.id==='local-group').l;
  // Bassins d'attraction et lignes de courant CF4 2023 (niveaux 3 et 4, comme cosmos.html) : reconstruction, pas une observation directe.
  // Données partagées avec le cockpit en vol (loadBasinData garde une seule promesse de téléchargement).
  // Décision du propriétaire du 22 novembre (mesures Iris Xe) : enveloppes et lignes de courant masquées par défaut, commandes séparées,
  // animation facultative. Les lignes décrivent le champ de vitesses reconstruit à l'époque actuelle, pas un film des trajectoires.
  this.basins=new BasinLayer(this.root);this.showBasins=false;this.showLines=false;this.animateLines=false;this.showSDSS=false;
  // Trois grands cercles de la sphère comobile autour du Soleil (même tracé que cosmos.html), au-delà de tout catalogue chargé.
  this.showHorizon=true;this.horizon=new T.Group();{const pts=[];for(let a=0;a<3;a++)for(let i=0;i<256;i++)for(const j of [i,i+1]){const t=j*Math.PI/128,c=Math.cos(t)*HORIZON_MLY,s=Math.sin(t)*HORIZON_MLY;pts.push(a===0?new T.Vector3(c,s,0):a===1?new T.Vector3(c,0,s):new T.Vector3(0,c,s));}
   this.horizon.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:0xd8a070,transparent:true,opacity:.45,depthWrite:false})));this.horizon.visible=false;this.root.add(this.horizon);}
 }
 get rows(){return KEYS.filter(k=>this.catalogues.has(k)).flatMap(k=>this.layers[k].rows);}
 // Doublons reliés seulement entre McConnachie et UNGC (les deux catalogues du Volume local).
 get status(){const s=[...this.catalogues].map(k=>this.layers[k].status);return s.includes('error')?'error':s.every(x=>x==='ready')?'ready':s.includes('loading')?'loading':'idle';}
 setCatalogues(keys){this.catalogues=new Set(keys.filter(k=>KEYS.includes(k)));for(const k of KEYS)this.layers[k].layer.root.visible=this.catalogues.has(k);return this.load();}
 async load(fetcher=fetch){
  await Promise.all([...this.catalogues].map(async k=>{const L=this.layers[k];if(L.status==='ready'||L.status==='loading')return;L.status='loading';
   try{let rows;if(this.loaders[k])rows=await this.loaders[k]();else{const r=await fetcher('./'+CATALOGUES[k].file);if(!r.ok)throw Error('HTTP '+r.status);rows=decodeCatalogue(k,await r.json());}
    L.all=rows.filter(o=>!EXCLUDED.test(o.name));this.applyFilter(k);L.status='ready';}
   catch(e){L.status='error';this.error=e.message;}}));
 }
 // Niveau de cosmos.html : 0 Groupe local, 1 Voisinage de la Vierge, 2 Laniakea et voisins, 3 Superamas et grands vides. Renvoie le cadrage attendu (centre en al, largeur en al).
 // Niveau 4 du cockpit = « Univers observable » de cosmos.html : structures du niveau « Superamas et grands vides », cadre centré sur le Soleil.
 setLevel(i){if(i===4){this.level=3;this.focus=LEVELS[3].focus;return {span:HORIZON_MLY*2.4*MLY,center:[0,0,0],name:'Univers observable',text:'horizon des particules à ≈ 46,5 milliards d’al en distance comobile (14,3 Gpc, ΛCDM Planck 2018) ; la lumière la plus ancienne a voyagé 13,8 milliards d’années. Aucun catalogue de galaxies ne l’atteint.'};}
  const L=LEVELS[i];this.level=i;this.focus=L.focus;const f=STRUCTURES.find(o=>o.id===L.focus);return {span:L.span*MLY,center:f.p.map(x=>x*MLY),name:L.name,text:L.text};}
// Catalogue « selon l'échelle » : McConnachie 2012 au Groupe local, puis Cosmicflows-4 (cosmos.html garde UNGC à la Vierge).
 // Décision du 23 novembre : CF4 dès la Vierge (UNGC s'arrête vers 36 millions d'al, l'amas est à ≈ 54) ; chargé à l'ouverture du niveau.
 autoCatalogue(){return this.level===0?'mcconnachie':'cf4';}
 // Doublons entre catalogues (même galaxie, deux mesures de distance) : un trait relie les deux points quand les deux catalogues sont affichés.
 setPairs(pairs){if(this.pairLines){this.root.remove(this.pairLines);this.pairLines.geometry.dispose();}
  this.pairs=pairs;const pos=new Float32Array(pairs.length*6);pairs.forEach(([a,b],i)=>pos.set([...a.p,...b.p],i*6));
  const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));
  this.pairLines=new T.LineSegments(g,new T.LineBasicMaterial({color:0xf0c47a,transparent:true,opacity:.6,depthWrite:false}));this.root.add(this.pairLines);}
 pairOf(row){return this.pairs?.find(([a,b])=>a===row||b===row)||null;}
 // Filtres de cosmos.html (distance maximale en Mpc, incertitude du module de distance CF4) : L.rows = lignes affichées et cliquables.
 applyFilter(k){const L=this.layers[k];if(!L.all)return;L.rows=filterCatalogue(L.all,this.filter);L.layer.setRows(L.rows,k);}
 setFilter(f){Object.assign(this.filter,f);for(const k of KEYS)this.applyFilter(k);}
 // spanLy : largeur cadrée par la Carte du cockpit ; mapScale : unités de carte par année-lumière ; heightPx : hauteur du tampon de dessin.
 update({map,camera,mapScale,spanLy,heightPx,dpr=1}){
  const on=this.enabled&&!!map;this.root.visible=on;if(!on){for(const x of this.labels)x.l.visible=false;return;}
  const wantBasins=this.level>=2&&(this.showBasins||this.showLines);if(wantBasins&&this.basins.status==='idle')this.basins.load('./').catch(()=>{});
  this.basins.root.visible=wantBasins&&this.basins.status==='ready';if(this.basins.root.visible)this.basins.update(this.animateLines?performance.now()/1000:0,{shells:this.showBasins,lines:this.showLines,sdss:this.showSDSS}); // temps figé : lignes fixes
  this.horizon.visible=this.showHorizon&&spanLy/MLY>HORIZON_MLY*.04; // comme cosmos.html : seulement aux grandes échelles
  // Mêmes réglages par défaut que cosmos.html : enveloppes affichées, connexions schématiques et populations illustratives masquées.
  this.cosmic.update(this.level,this.focus,spanLy/MLY,{envelopes:true,filaments:false,boost:6,synthetic:false});
  for(const e of this.cosmic.entries)if(e.o.type==='galaxy')e.mesh.visible=false;
  if(this.cosmic.sun)this.cosmic.sun.visible=false;
  this.cosmic.material.uniforms.screenHeight.value=heightPx;
  if(this.pairLines)this.pairLines.visible=this.catalogues.has('mcconnachie')&&this.catalogues.has('ungc');
  const first=KEYS.find(k=>this.catalogues.has(k));for(const k of KEYS)this.layers[k].layer.plane.visible=this.showPlane&&k===first;
  for(const k of KEYS){this.layers[k].layer.root.visible=this.catalogues.has(k);this.adapt(k,camera,heightPx,dpr);}
  // Étiquettes posées sur le bord supérieur de chaque enveloppe (rayon de repérage de cosmic-data) : visibles si la structure
  // appartient au niveau affiché, reste repérable (cadre de moins de 40 fois son rayon) et n'en remplit pas tout l'écran.
  const span=spanLy/MLY;for(const {o,l} of this.labels){l.visible=o.level<=this.level&&span<o.r*40&&span>o.r*.4;if(mapScale)l.position.set(o.p[0]*MLY*mapScale,(o.p[1]+o.r*.55)*MLY*mapScale,o.p[2]*MLY*mapScale);}
 }
 // Représentation adaptative (décision du 23 novembre) : les symboles additifs saturaient en tache blanche aux grandes échelles.
 // On mesure la superposition LOCALE : grille de 16 px sur l'écran, superposition typique ω = Σ n² / Σ n × π(taille/2)² / 16²
 // (nombre moyen de voisins sous le symbole d'une galaxie). Chaque symbole ajoute 0,5 × intensité ; on garde ω × 0,5 × intensité ≤ 1 :
 // la taille descend d'abord jusqu'à la moitié, puis l'intensité, jusqu'à 10 %. Même facteur pour toutes les galaxies.
 adapt(k,camera,heightPx,dpr){const L=this.layers[k],u=L.layer.material.uniforms,base=Math.min(dpr,2)*4;if(!camera||!L.rows.length||!heightPx){u.size.value=base;u.intensity.value=1;return;}
  const now=performance.now();if(L.adaptAt&&now-L.adaptAt<400)return;L.adaptAt=now;
  this.root.updateMatrixWorld();camera.updateMatrixWorld();const W=heightPx*(camera.aspect||1.6),H=heightPx,cell=16*Math.min(dpr,2),gx=Math.ceil(W/cell),grid=new Map(),step=Math.max(1,Math.floor(L.rows.length/8000));let n=0,inside=0;
  for(let i=0;i<L.rows.length;i+=step){n++;const v=this._v.set(...L.rows[i].p).applyMatrix4(this.root.matrixWorld).project(camera);if(!(v.z<1&&v.z>-1&&Math.abs(v.x)<=1&&Math.abs(v.y)<=1))continue;inside++;
   const c=Math.floor((v.x+1)/2*W/cell)+gx*Math.floor((1-v.y)/2*H/cell);grid.set(c,(grid.get(c)||0)+1);}
  const scale=L.rows.length/n;let s1=0,s2=0;for(const c of grid.values()){s1+=c;s2+=c*c;}const crowd=s1?s2/s1*scale:0; // galaxies par cellule, vues depuis une galaxie typique
  const omega=r=>crowd*Math.PI*r*r/4/(cell*cell);let size=base;if(omega(size)*.5>1)size=Math.max(base/2,base*Math.sqrt(2/omega(base)));const intensity=Math.max(.1,Math.min(1,2/Math.max(1e-9,omega(size))));
  u.size.value=size;u.intensity.value=intensity;L.adaptive={inFrame:Math.round(inside*scale),crowd,overlap:omega(size),load:omega(size)*.5*intensity,size,intensity};}
 // Galaxie cataloguée la plus proche du pointeur (en pixels), ou null.
 pick(clientX,clientY,camera,rect,maxPx=10){
  if(!this.root.visible)return null;this.root.updateMatrixWorld();
  let best=null,bestD=maxPx;
  for(const o of this.rows){const v=this._v.set(...o.p).applyMatrix4(this.root.matrixWorld).project(camera);if(v.z>1||v.z<-1)continue;
   const x=rect.left+(v.x+1)/2*rect.width,y=rect.top+(1-v.y)/2*rect.height,d=Math.hypot(x-clientX,y-clientY);if(d<bestD){bestD=d;best=o;}}
  return best;
 }
 // Position écran d'une entrée (pour les tests et les étiquettes).
 screen(o,camera,rect){this.root.updateMatrixWorld();const v=this._v.set(...o.p).applyMatrix4(this.root.matrixWorld).project(camera);return {x:rect.left+(v.x+1)/2*rect.width,y:rect.top+(1-v.y)/2*rect.height,inside:Math.abs(v.x)<=1&&Math.abs(v.y)<=1&&v.z<1};}
}
