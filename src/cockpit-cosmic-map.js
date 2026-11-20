// Preuve de faisabilité (essai seulement) : les couches du niveau « Groupe local » de cosmos.html
// rendues dans la Carte galactique 3D du cockpit, par le même moteur WebGL, sans changer de page.
// - Enveloppe de repérage du Groupe local (CosmicScene, celle de cosmos.html) ;
// - Galaxies cataloguées McConnachie 2012 (ObservedGalaxies, mêmes symboles additifs que cosmos.html).
// Les galaxies majeures (Voie lactée, M31, M33) et le Soleil restent dessinés par la Carte du cockpit : on masque
// leurs doublons de CosmicScene. Coordonnées : même repère équatorial que le cockpit (xyz de cosmic-data), en
// millions d'années-lumière, mises à l'échelle par un groupe ×1e6 dans mapWorld (années-lumière).
import * as T from 'three';
import {CosmicScene} from './cosmic-scene.js';
import {ObservedGalaxies} from './observed-galaxies.js';
import {CATALOGUES,decodeCatalogue} from './extragalactic-data.js';
import {MLY} from './cosmic-data.js';

export class CockpitCosmicMap{
 constructor(mapWorld){
  this.root=new T.Group();this.root.scale.setScalar(MLY);this.root.visible=false;mapWorld.add(this.root);
  this.cosmic=new CosmicScene({map:true});this.root.add(this.cosmic.root);
  this.observed=new ObservedGalaxies(this.root);this.observed.plane.visible=false;
  this.enabled=false;this.rows=[];this.status='idle';this._v=new T.Vector3();
 }
 async load(fetcher=fetch){
  if(this.status==='ready'||this.status==='loading')return;this.status='loading';
  try{const r=await fetcher('./'+CATALOGUES.mcconnachie.file);if(!r.ok)throw Error('HTTP '+r.status);
   this.rows=decodeCatalogue('mcconnachie',await r.json()).filter(o=>!/^(the galaxy|milky way)$/i.test(o.name));
   this.observed.setRows(this.rows,'mcconnachie');this.status='ready';}
  catch(e){this.status='error';this.error=e.message;}
 }
 // spanLy : largeur cadrée par la Carte du cockpit ; heightPx : hauteur du tampon de dessin.
 update({map,spanLy,heightPx,dpr=1}){
  const on=this.enabled&&!!map;this.root.visible=on;if(!on)return;
  this.cosmic.update(0,'local-group',spanLy/MLY,{envelopes:true,filaments:false,boost:6,synthetic:false});
  for(const e of this.cosmic.entries)if(e.o.type==='galaxy')e.mesh.visible=false;
  if(this.cosmic.sun)this.cosmic.sun.visible=false;
  this.cosmic.material.uniforms.screenHeight.value=heightPx;
  this.observed.material.uniforms.size.value=Math.min(dpr,2)*4;
 }
 // Galaxie cataloguée la plus proche du pointeur (en pixels), ou null.
 pick(clientX,clientY,camera,rect,maxPx=10){
  if(!this.root.visible||!this.rows.length)return null;this.root.updateMatrixWorld();
  let best=null,bestD=maxPx;
  for(const o of this.rows){const v=this._v.set(...o.p).applyMatrix4(this.root.matrixWorld).project(camera);if(v.z>1||v.z<-1)continue;
   const x=rect.left+(v.x+1)/2*rect.width,y=rect.top+(1-v.y)/2*rect.height,d=Math.hypot(x-clientX,y-clientY);if(d<bestD){bestD=d;best=o;}}
  return best;
 }
 // Position écran d'une entrée (pour les tests et les étiquettes).
 screen(o,camera,rect){this.root.updateMatrixWorld();const v=this._v.set(...o.p).applyMatrix4(this.root.matrixWorld).project(camera);return {x:rect.left+(v.x+1)/2*rect.width,y:rect.top+(1-v.y)/2*rect.height,inside:Math.abs(v.x)<=1&&Math.abs(v.y)<=1&&v.z<1};}
}
