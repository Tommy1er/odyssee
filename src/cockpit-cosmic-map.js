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
import {CATALOGUES,decodeCatalogue} from './extragalactic-data.js';
import {MLY,STRUCTURES,LEVELS} from './cosmic-data.js';

const KEYS=['mcconnachie','ungc','cf4'];
const EXCLUDED=/^(the galaxy|milky way)$/i; // nous sommes dedans : la Carte du cockpit a son propre modèle
function makeLabel(text,color){const c=document.createElement('canvas');c.width=512;c.height=64;const x=c.getContext('2d');x.font='28px monospace';x.fillStyle=color;x.fillText(text,5,43);
 const s=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(c),transparent:true,depthTest:false}));s.scale.set(9,1.125,1);return s;}

export class CockpitCosmicMap{
 constructor(mapWorld,mapScene){
  this.root=new T.Group();this.root.scale.setScalar(MLY);this.root.visible=false;mapWorld.add(this.root);
  this.cosmic=new CosmicScene({map:true});this.root.add(this.cosmic.root);
  this.layers=Object.fromEntries(KEYS.map(k=>{const l=new ObservedGalaxies(this.root);l.plane.visible=false;return [k,{layer:l,rows:[],status:'idle'}];}));
  this.catalogues=new Set(['mcconnachie']);this.enabled=false;this._v=new T.Vector3();
  this.loaders={}; // chargeurs fournis par le cockpit (CF4 : décodage partagé avec la recherche, 3,9 Mo téléchargés une seule fois)
  this.group=STRUCTURES.find(o=>o.id==='local-group');
  // Niveau de cosmos.html affiché (0 Groupe local, 1 Voisinage de la Vierge) et structure mise en avant.
  this.level=0;this.focus='local-group';
  // Étiquettes des structures des niveaux intégrés (galaxies exclues : la Carte du cockpit a les siennes).
  this.labels=STRUCTURES.filter(o=>o.level<=1&&o.type!=='galaxy').map(o=>{const l=makeLabel(o.name,'#f0c47a');l.visible=false;l.center.set(0,.5);if(mapScene)mapScene.add(l);return {o,l};});
  this.label=this.labels.find(x=>x.o.id==='local-group').l;
 }
 get rows(){return KEYS.filter(k=>this.catalogues.has(k)).flatMap(k=>this.layers[k].rows);}
 // Doublons reliés seulement entre McConnachie et UNGC (les deux catalogues du Volume local).
 get status(){const s=[...this.catalogues].map(k=>this.layers[k].status);return s.includes('error')?'error':s.every(x=>x==='ready')?'ready':s.includes('loading')?'loading':'idle';}
 setCatalogues(keys){this.catalogues=new Set(keys.filter(k=>KEYS.includes(k)));for(const k of KEYS)this.layers[k].layer.root.visible=this.catalogues.has(k);return this.load();}
 async load(fetcher=fetch){
  await Promise.all([...this.catalogues].map(async k=>{const L=this.layers[k];if(L.status==='ready'||L.status==='loading')return;L.status='loading';
   try{let rows;if(this.loaders[k])rows=await this.loaders[k]();else{const r=await fetcher('./'+CATALOGUES[k].file);if(!r.ok)throw Error('HTTP '+r.status);rows=decodeCatalogue(k,await r.json());}
    L.rows=rows.filter(o=>!EXCLUDED.test(o.name));L.layer.setRows(L.rows,k);L.status='ready';}
   catch(e){L.status='error';this.error=e.message;}}));
 }
 // Niveau de cosmos.html : 0 « Groupe local », 1 « Voisinage de la Vierge ». Renvoie le cadrage attendu (centre en al, largeur en al).
 setLevel(i){const L=LEVELS[i];this.level=i;this.focus=L.focus;const f=STRUCTURES.find(o=>o.id===L.focus);return {span:L.span*MLY,center:f.p.map(x=>x*MLY),name:L.name,text:L.text};}
 // Catalogue « selon l'échelle », comme cosmos.html : McConnachie 2012 au Groupe local, UNGC 2013 au voisinage de la Vierge.
 autoCatalogue(){return this.level===0?'mcconnachie':'ungc';}
 // Doublons entre catalogues (même galaxie, deux mesures de distance) : un trait relie les deux points quand les deux catalogues sont affichés.
 setPairs(pairs){if(this.pairLines){this.root.remove(this.pairLines);this.pairLines.geometry.dispose();}
  this.pairs=pairs;const pos=new Float32Array(pairs.length*6);pairs.forEach(([a,b],i)=>pos.set([...a.p,...b.p],i*6));
  const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));
  this.pairLines=new T.LineSegments(g,new T.LineBasicMaterial({color:0xf0c47a,transparent:true,opacity:.6,depthWrite:false}));this.root.add(this.pairLines);}
 pairOf(row){return this.pairs?.find(([a,b])=>a===row||b===row)||null;}
 // spanLy : largeur cadrée par la Carte du cockpit ; mapScale : unités de carte par année-lumière ; heightPx : hauteur du tampon de dessin.
 update({map,mapScale,spanLy,heightPx,dpr=1}){
  const on=this.enabled&&!!map;this.root.visible=on;if(!on){for(const x of this.labels)x.l.visible=false;return;}
  // Mêmes réglages par défaut que cosmos.html : enveloppes affichées, connexions schématiques et populations illustratives masquées.
  this.cosmic.update(this.level,this.focus,spanLy/MLY,{envelopes:true,filaments:false,boost:6,synthetic:false});
  for(const e of this.cosmic.entries)if(e.o.type==='galaxy')e.mesh.visible=false;
  if(this.cosmic.sun)this.cosmic.sun.visible=false;
  this.cosmic.material.uniforms.screenHeight.value=heightPx;
  if(this.pairLines)this.pairLines.visible=this.catalogues.has('mcconnachie')&&this.catalogues.has('ungc');
  for(const k of KEYS){this.layers[k].layer.root.visible=this.catalogues.has(k);this.layers[k].layer.material.uniforms.size.value=Math.min(dpr,2)*4;}
  // Étiquettes posées sur le bord supérieur de chaque enveloppe (rayon de repérage de cosmic-data) : visibles si la structure
  // appartient au niveau affiché, reste repérable (cadre de moins de 40 fois son rayon) et n'en remplit pas tout l'écran.
  const span=spanLy/MLY;for(const {o,l} of this.labels){l.visible=o.level<=this.level&&span<o.r*40&&span>o.r*.4;if(mapScale)l.position.set(o.p[0]*MLY*mapScale,(o.p[1]+o.r*.55)*MLY*mapScale,o.p[2]*MLY*mapScale);}
 }
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
