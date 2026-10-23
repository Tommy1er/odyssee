import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as T from 'three';
import {decodeCatalogue} from '../src/extragalactic-data.js';
import {galaxyObject} from '../src/catalogue-galaxies.js';
import {MapGalaxyPreview,SPIN_RATE,TIME_LAPSE_MYR,GALACTIC_YEAR_MYR} from '../src/map-galaxy-preview.js';
import {STRUCTURES,xyz} from '../src/cosmic-data.js';
import {galaxyOrientation,localGroupObjects} from '../src/local-group.js';
import {ObservedGalaxies} from '../src/observed-galaxies.js';
const sets=Object.fromEntries(['mcconnachie','ungc','cf4'].map(k=>[k,decodeCatalogue(k,JSON.parse(fs.readFileSync('public/'+k+'-map.json')))]));
let n=0;const check=(label,fn)=>{fn();n++;console.log('PASS '+label);};
for(const [key,rows] of Object.entries(sets))check('Every '+key+' entry has a finite class model and declared size source',()=>{for(const row of rows){const o=galaxyObject(row);assert(Number.isFinite(o.radiusLy)&&o.radiusLy>0);assert(o.shapeParams.every(Number.isFinite));assert([0,1,2,3,4].includes(o.shapeCode));assert(o.sizeSource&&o.classSource);}});
const scene=new T.Scene(),layer=new MapGalaxyPreview(scene),cam=new T.PerspectiveCamera(48,1,.00001,10000);
check('No volumes are allocated before selection',()=>{assert.equal(layer.object,null);assert(!layer.mesh.visible);assert.equal(layer.uniforms.groupShapes.value.filter(x=>x>=0).length,0);});
const m81=sets.ungc.find(o=>o.name==='MESSIER081'),m87=sets.cf4.find(o=>o.raw[0]===41361);
check('Selected model reuses nominal position and survives a remote coordinate origin',()=>{layer.select(m87);const r=layer.radius(m87);cam.position.set(...m87.p).add(new T.Vector3(0,0,r*4));cam.lookAt(...m87.p);layer.update(cam);assert(layer.mesh.visible);assert(Math.abs(layer.uniforms.groupCenters.value[0].z+4)<1e-9);assert.equal(layer.duplicate,'m87');assert(layer.object.xyz.every((x,i)=>Math.abs(x-m87.p[i]*1e6)<1e-7));});
check('Changing selection replaces the volume rather than stacking models',()=>{layer.select(m81);assert.equal(layer.uniforms.groupShapes.value.filter(x=>x>=0).length,1);assert.equal(layer.object.shapeCode,0);assert.equal(layer.radius(m81),layer.object.radiusLy/1e6);});
check('Distant preview yields to its catalogue marker; clearing selection frees the slot',()=>{cam.position.set(...m81.p).add(new T.Vector3(layer.radius(m81)*1000,0,0));layer.update(cam);assert(!layer.mesh.visible);layer.select(null);assert(!layer.mesh.visible);assert(layer.uniforms.groupShapes.value.every(x=>x===-1));});
const points=new ObservedGalaxies(scene);points.setRows([m81,sets.ungc[0]],'ungc');points.select(m81);
check('Only the selected marker is hidden during a volume preview, including after filtering',()=>{points.hideSelected(true);assert.equal(points.material.uniforms.hiddenIndex.value,0);points.setRows([sets.ungc[0],m81],'ungc');points.hideSelected(true);assert.equal(points.material.uniforms.hiddenIndex.value,1);points.hideSelected(false);assert.equal(points.material.uniforms.hiddenIndex.value,-1);});
// 23 Oct 2026: zoom onto a selected map galaxy. The shader multiplies luminance by groupTint; the preview never set it,
// so GLSL read 0 and every map preview was black. Reference galaxies (Milky Way, M31, M33, M87) now have the same volume.
const lum=v=>.2126*v[0]+.7152*v[1]+.0722*v[2],ref=id=>STRUCTURES.find(o=>o.id===id);
check('Selected preview has a class chromaticity of luminance 1 (never the black default)',()=>{for(const row of [m87,m81,ref('m31'),ref('milky-way')]){layer.select(row);const t=layer.uniforms.groupTint.value[0].toArray();assert(Math.abs(lum(t)-1)<1e-9&&t.every(x=>x>0),row.id+' '+t);}assert.equal(layer.uniforms.groupTint.value.length,8);});
check('Reference galaxies preview with the cockpit models: M31/M33 orientation, no double drawing, M87 elliptical',()=>{
 const lg=new Map(localGroupObjects().map(o=>[o.id,o]));
 for(const id of ['m31','m33']){layer.select(ref(id));const R=layer.uniforms.groupRotations.value[0].elements,G=galaxyOrientation(lg.get(id)).elements;assert(R.every((x,i)=>Math.abs(x-G[i])<1e-6));assert.equal(layer.object.shapeCode,0);assert.equal(layer.duplicate,id);assert.equal(layer.radius(ref(id)),ref(id).r);}
 layer.select(ref('m87'));assert.equal(layer.object.shapeCode,3);assert.equal(layer.duplicate,'m87');});
check('Milky Way frame: Sun in the disc plane on the anticentre side, Galactic rotation toward l = 90° is the trailing sense (−θ)',()=>{
 layer.select(ref('milky-way'));const M=layer.uniforms.groupRotations.value[0],mw=ref('milky-way');
 const sun=new T.Vector3(...mw.p).negate().divideScalar(mw.r).applyMatrix3(M);// Sun relative to the centre, model units
 assert(Math.abs(sun.z)<.01&&sun.x<-.45&&sun.x>-.55&&Math.abs(sun.y)<.01,sun.toArray().join(' '));
 const l90=new T.Vector3(...xyz(318.0043908,48.3298911,1)).applyMatrix3(M);// l = 90°, b = 0 in J2000 (standard rotation)
 const theta=v=>Math.atan2(v.y,v.x),moved=sun.clone().addScaledVector(l90,1e-3);let dTheta=theta(moved)-theta(sun);dTheta=(dTheta+3*Math.PI)%(2*Math.PI)-Math.PI;
 assert(l90.y>.99&&dTheta<0,'l90 '+l90.toArray()+' dθ '+dTheta);});
check('Illustrative rotation: trailing pattern turns at 2π / 250 Myr × 2 Myr per second, only while the volume is shown',()=>{
 assert(Math.abs(SPIN_RATE-2*Math.PI/GALACTIC_YEAR_MYR*TIME_LAPSE_MYR)<1e-12);const m31=ref('m31');layer.select(m31);const r=layer.radius(m31);
 cam.position.set(...m31.p).add(new T.Vector3(0,0,r*3));const t0=layer.uniforms.groupTime.value;layer.update(cam,.5);assert(Math.abs(layer.uniforms.groupTime.value-(t0-SPIN_RATE*.5))<1e-12);
 layer.spin=false;layer.update(cam,.5);assert.equal(layer.uniforms.groupTime.value,t0-SPIN_RATE*.5);layer.spin=true;
 cam.position.set(...m31.p).add(new T.Vector3(0,0,r*1000));const t1=layer.uniforms.groupTime.value;layer.update(cam,.5);assert(!layer.mesh.visible&&layer.uniforms.groupTime.value===t1);});
check('Close or inside views lower the instrument exposure instead of saturating to a uniform glow',()=>{const m31=ref('m31'),r=layer.radius(m31);layer.select(m31);const at=D=>{cam.position.set(...m31.p).add(new T.Vector3(0,0,r*D));layer.update(cam);return layer.uniforms.exposure.value;};
 assert.equal(at(3),layer.baseExposure);assert(Math.abs(at(1.5)-layer.baseExposure)<1e-12);assert(at(.5)<at(1)&&at(1)<at(1.5));assert(Math.abs(at(.01)-.25*layer.baseExposure)<1e-12);});
console.log(JSON.stringify({passed:n,mode:'class models and Three geometry; GPU not tested'}));
