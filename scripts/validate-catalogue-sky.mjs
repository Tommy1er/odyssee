import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as T from 'three';
import {CatalogueSky} from '../src/catalogue-sky.js';
import {decodeCatalogue} from '../src/extragalactic-data.js';
import {buildLocalGalaxies,findDuplicate,galaxyObject} from '../src/catalogue-galaxies.js';
import {localGroupObjects} from '../src/local-group.js';
import {CosmicScene} from '../src/cosmic-scene.js';
let count=0;const test=(name,fn)=>{fn();count++;console.log('PASS '+name);};
const load=k=>JSON.parse(fs.readFileSync('public/'+k+'-map.json'));
const rows=decodeCatalogue('cf4',load('cf4')),fixed=localGroupObjects(),locals=[...fixed,...buildLocalGalaxies({ungc:load('ungc'),mcconnachie:load('mcconnachie')},fixed).list];
const sky=new CatalogueSky();sky.setRows(rows,locals);
test('All 55,877 measured positions, no synthetic filler',()=>assert.equal(sky.rows.length,55877));
test('Spatial matching agrees with exhaustive heuristic for matched objects and random controls',()=>{
 const sample=[...sky.matches.keys(),...rows.filter((_,i)=>i%197===0).map(r=>r.id)];
 for(const id of new Set(sample)){const r=rows.find(r=>r.id===id),full=findDuplicate({ra:r.ra,dec:r.dec,d:r.d*1e6},locals);assert.equal(sky.matches.get(id),full?.id,id);}
});
const m87=rows.find(r=>r.raw[0]===41361),o=galaxyObject(m87),pos=o.xyz.map((x,i)=>x+(i===0?100:0));
sky.update(pos,[o,...fixed]);
test('Volumetric M87 and fixed M31 have no duplicate sky marker',()=>{assert(sky.hidden.has(m87.id));assert(sky.hidden.has('cf4:2557'));});
test('Every unmasked direction is relative to remote ship, not the Sun',()=>{const a=sky.points.geometry.attributes.position;for(let i=0;i<rows.length;i+=97){const r=rows[i],d=r.p.map((x,k)=>x*1e6-pos[k]),n=Math.hypot(...d);assert(Math.hypot(...d.map((x,k)=>a.array[3*i+k]/100-x/n))<1e-6);}});
test('Sub-light-year separation survives at hundreds of millions of ly',()=>{const r=rows[rows.length-1],p=r.p.map(x=>x*1e6);p[2]+=.25;sky.update(p);const i=rows.length-1,a=sky.points.geometry.attributes.position;assert.equal(a.getZ(i),-100);assert.equal(a.getX(i),0);});
test('Ship exactly at an entry remains finite and masks its marker',()=>{sky.update(o.xyz);assert(sky.hidden.has(m87.id));assert([...sky.points.geometry.attributes.position.array].every(Number.isFinite));});
test('Unchanged position and slots avoid another buffer upload',()=>{const a=sky.points.geometry.attributes.position,v=a.version;sky.update(o.xyz);assert.equal(a.version,v);});
test('Released volume slot restores its catalogue marker',()=>{sky.update(pos,[]);assert(!sky.hidden.has(m87.id));});
test('CPU picking selects visible marker and rejects behind-camera entries',()=>{
 const r={id:'cf4:test',p:[0,0,-1],d:1,ra:270,dec:0},b={...r,id:'cf4:back',p:[0,0,1]};const f=new CatalogueSky();f.setRows([r,b]);f.update([0,0,0]);const camera=new T.PerspectiveCamera(70,1,.001,3000);camera.updateMatrixWorld();assert.equal(f.pick(camera,500,500,1000,1000)?.id,r.id);
 f.update([0,0,0],[{id:r.id}]);assert.equal(f.pick(camera,500,500,1000,1000),null);
});
test('Pick direction follows relativistic aberration',()=>{const f=new CatalogueSky();f.setRows([{id:'side',p:[1,0,0],d:1,ra:0,dec:0}]);f.update([0,0,0]);f.lastMomentum=[0,0,-7];const camera=new T.PerspectiveCamera(70,1,.001,3000);const n=new T.Vector3(1/Math.sqrt(50),0,-7/Math.sqrt(50)).multiplyScalar(100).project(camera);assert.equal(f.pick(camera,(n.x+1)*500,500,1000,1000)?.id,'side');});
test('Symbol pass preserves renderer clearing and zero-optics comparison',()=>{const mock={autoClear:true,getPixelRatio:()=>2,render:()=>{}};sky.render(mock,new T.PerspectiveCamera(),[0,0,0]);assert(mock.autoClear);assert.equal(sky.material.uniforms.size.value,6);assert.deepEqual(sky.lastMomentum,[0,0,0]);});
test('Cosmic structure envelopes survive disabling all synthetic galaxies',()=>{const c=new CosmicScene({map:false});c.update(3,'virgo-cluster',100,{synthetic:false,filaments:false});assert(c.entries.every(e=>!e.mesh.visible));assert(c.entries.some(e=>e.outline.visible));assert.equal(c.filaments.visible,false);});
test('Replacing catalogue frees old geometry and updates map positions',()=>{let disposed=false;sky.points.geometry.addEventListener('dispose',()=>disposed=true);sky.setRows(rows.slice(0,3));assert(disposed);assert.equal(sky.mapPoints.geometry.attributes.position.count,3);});
console.log(JSON.stringify({passed:count,mode:'Node/Three geometry, no GPU render'}));
