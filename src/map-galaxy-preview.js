import * as T from 'three';
import {galaxyObject,findDuplicate,CLASSES} from './catalogue-galaxies.js';
import {GROUP_SLOTS,galaxyOrientation,localGroupGLSL,localGroupObjects} from './local-group.js';
import {spectralSourceTint,spectralClassFromObject} from './galaxy-spectral.js';
import {STRUCTURES,xyz} from './cosmic-data.js';
import {hash} from './body-data.js';

// The selected galaxy (catalogue entry or one of the map's reference galaxies) uses the cockpit's class model.
// Coordinates stay at the nominal position (Mly); this camera never advances a physical journey.
// A single lazy preview avoids creating 55,877 volumes. Brightness is illustrative (instrument exposure).
const LOCAL=new Map(localGroupObjects().map(o=>[o.id,o]));
const COCKPIT_PARAMS=[1,1,.045,1];// the cockpit draws its four Local Group volumes with these parameters
// Milky Way frame: x toward the Galactic centre (l = 0, b = 0), z toward the north Galactic pole (standard J2000 transformation of the IAU 1958 system
// / Hipparcos definition), y = z × x toward l = 90°, the direction of Galactic rotation at the Sun.
const unit=v=>new T.Vector3(...v).normalize();
function milkyWayRotation(){const x=unit(xyz(266.40500,-28.93617,1)),z=unit(xyz(192.85948,27.12825,1));x.addScaledVector(z,-x.dot(z)).normalize();const y=new T.Vector3().crossVectors(z,x);
 return new T.Matrix3().set(x.x,x.y,x.z,y.x,y.y,y.z,z.x,z.y,z.z);}
function referenceModel(s){
 const base={id:s.id,name:s.name,xyz:s.p.map(x=>x*1e6),d:s.d*1e6,radiusLy:s.r*1e6,reference:true};
 if(LOCAL.has(s.id)){const o=LOCAL.get(s.id);return {...base,inc:o.inc,pa:o.pa,hubbleT:o.hubbleT,shapeCode:0,shapeParams:COCKPIT_PARAMS,
  classSource:'modèle spirale du cockpit (bras, bulbe, disque et poussière reconstruits)',sizeSource:'rayon de référence '+new Intl.NumberFormat('fr-FR').format(o.radiusLy)+' al, orientation i = '+o.inc+'°, PA = '+o.pa+'°'};}
 if(s.id==='milky-way')return {...base,rotation:milkyWayRotation(),hubbleT:4,shapeCode:0,shapeParams:CLASSES.Sbc.params,
  classSource:'spirale Sb–Sc générique (la barre centrale n’est pas modélisée)',sizeSource:'rayon de repère 55 000 al ; plan galactique et centre orientés selon les coordonnées galactiques'};
 return {...base,inc:0,pa:0,hubbleT:-5,shapeCode:CLASSES.E.shape,shapeParams:CLASSES.E.params,
  classSource:'elliptique (profil de de Vaucouleurs r^1/4)',sizeSource:'rayon de repère de la carte, '+new Intl.NumberFormat('fr-FR').format(s.r*1e6)+' al'};
}
// Illustrative time-lapse of disc rotation: the arm pattern turns rigidly, trailing, one turn in ≈ 250 Myr
// (Sun's Galactic year), shown at TIME_LAPSE_MYR million years per second. Real arms are density waves turning
// slower than the stars; no stellar orbits are integrated here.
export const GALACTIC_YEAR_MYR=250,TIME_LAPSE_MYR=2;
export const SPIN_RATE=2*Math.PI/GALACTIC_YEAR_MYR*TIME_LAPSE_MYR;// rad per second of real time
export class MapGalaxyPreview {
 constructor(scene){
  this.cache=new WeakMap();this.row=null;this.object=null;this.duplicate=null;this.spin=true;this.elapsedMyr=0;
  this.references=STRUCTURES.filter(o=>o.type==='galaxy').map(o=>({...o,xyz:o.p.map(x=>x*1e6),d:o.d*1e6}));
  const n=GROUP_SLOTS;
  this.uniforms={
   groupCenters:{value:Array.from({length:n},()=>new T.Vector3())},
   groupRotations:{value:Array.from({length:n},()=>new T.Matrix3())},
   groupShapes:{value:Array(n).fill(-1)},groupSeeds:{value:Array(n).fill(0)},
   groupParams:{value:Array.from({length:n},()=>new T.Vector4(1,1,.045,1))},
   // groupRadiance multiplies the luminance by a per-slot chromaticity; left unset, GLSL reads 0 and the preview is black.
   groupTint:{value:Array.from({length:n},()=>new T.Vector3(1,1,1))},groupGain:{value:1},
   groupTime:{value:0},inverseProjection:{value:new T.Matrix4()},cameraWorld:{value:new T.Matrix4()},exposure:{value:1}
  };
  this.material=new T.ShaderMaterial({uniforms:this.uniforms,
   vertexShader:'varying vec2 uvScreen;void main(){uvScreen=position.xy;gl_Position=vec4(position.xy,0.,1.);}',
   fragmentShader:`precision highp float;varying vec2 uvScreen;uniform mat4 inverseProjection,cameraWorld;uniform float exposure;${localGroupGLSL}
void main(){vec3 rayCamera=(inverseProjection*vec4(uvScreen,1.,1.)).xyz;vec3 ray=normalize(mat3(cameraWorld)*rayCamera);vec3 light=groupRadiance(ray);gl_FragColor=vec4(1.-exp(-light*exposure),1.);}`,
   depthTest:false,depthWrite:false,transparent:true,blending:T.AdditiveBlending});
  this.mesh=new T.Mesh(new T.PlaneGeometry(2,2),this.material);this.mesh.frustumCulled=false;this.mesh.renderOrder=2;this.mesh.visible=false;scene.add(this.mesh);
 }
 // Catalogue rows carry .key; the map's reference galaxies (Milky Way, M31, M33, M87) are STRUCTURES of type 'galaxy'.
 model(row){if(!this.cache.has(row))this.cache.set(row,row.type==='galaxy'?referenceModel(row):galaxyObject(row));return this.cache.get(row);}
 radius(row){return this.model(row).radiusLy/1e6;}
 select(row){
  if(row===this.row)return;
  this.row=row;this.object=row?this.model(row):null;this.mesh.visible=false;this.duplicate=null;
  this.uniforms.groupShapes.value.fill(-1);
  if(!row)return;
  const o=this.object,u=this.uniforms;
  u.groupShapes.value[0]=o.shapeCode;u.groupParams.value[0].set(...o.shapeParams);
  u.groupSeeds.value[0]=hash(o.id)%997;u.groupRotations.value[0].copy(o.rotation||galaxyOrientation(o));
  // Chromaticity of the class SED (KC96 templates, galaxy-spectral.js) at rest, normalised to luminance 1.
  const tint=spectralSourceTint(spectralClassFromObject(o),1,1,0,1)||[1,.92,.8],y=.2126*tint[0]+.7152*tint[1]+.0722*tint[2]||1;
  u.groupTint.value[0].set(...tint.map(v=>v/y));
  // Instrument view: keep faint dwarf models readable; never claim photometric calibration.
  this.baseExposure=2/Math.max(.03,o.shapeParams[3]);u.exposure.value=this.baseExposure;
  this.duplicate=o.reference?o.id:findDuplicate(o,this.references)?.id||null;
 }
 update(camera,dt=0){
  if(!this.row)return;
  const r=this.object.radiusLy/1e6,center=this.uniforms.groupCenters.value[0];
  center.set(...this.row.p).sub(camera.position).divideScalar(r);
  this.mesh.visible=center.length()<250;
  // Instrument auto-exposure: close to or inside the model the line of sight crosses far more of it and the view saturates
  // to a uniform glow (M31 at 0.2 radius, 23 Oct 2026 captures). Below 1.5 radii exposure falls as (D / 1.5)^0.75, floor 25 %
  // (chosen on a sweep of three laws at 1.55 to 0.03 radius); a display choice, not photometry.
  const D=center.length();this.uniforms.exposure.value=this.baseExposure*Math.max(.25,Math.min(1,(D/1.5)**.75));
  // Trailing arms: in the model frame the pattern θ = 4 ln r + const opens toward +θ, so a trailing disc turns toward −θ.
  if(this.spin&&this.mesh.visible&&dt>0){this.uniforms.groupTime.value-=SPIN_RATE*dt;this.elapsedMyr+=TIME_LAPSE_MYR*dt;}
  camera.updateMatrixWorld();this.uniforms.inverseProjection.value.copy(camera.projectionMatrixInverse);this.uniforms.cameraWorld.value.copy(camera.matrixWorld);
 }
}
