import assert from 'node:assert/strict';
import {SkyOptics,opticsVariantSource} from '../src/sky-optics.js';
// Optical programs per module (Iris Xe / ANGLE D3D11): the black-hole tracer, the close-up/system bodies and the nebula
// march are compiled only when the view needs them. Node check of the selection logic and of the GLSL contents; the
// compile time itself and the pixel equivalence are measured in a browser (docs/RELAIS-CLAUDE-2026-10-27-OPTIQUE-MODULES.md).
const optics=new SkyOptics(new Float32Array(2048));
const programs=[];let release;const gate=()=>new Promise(r=>release=r);let blockNext=false;
const renderer={async compileAsync(scene){programs.push(scene.children[0].material);if(blockNext){blockNext=false;await gate();}}};
const has=(m,t)=>m.fragmentShader.includes(t);
const u=optics.material.uniforms;
const deep={pos:[0,0,0],lensing:true,pixelAngle:.0015};
const near={pos:[0,0,10],lensing:true,pixelAngle:.0015,target:{type:'blackhole',xyz:[0,0,0],radiusLy:1}};
const nebula={pos:[0,0,10],pixelAngle:.0015,target:{type:'nebula',xyz:[0,0,0],radiusLy:1}};
// Startup with nothing resolved: deep sky only, compiled before the first image.
await optics.prepare(renderer,deep);
assert.equal(optics.material.name,'Optique ordinaire (ciel profond)');
for(const t of ['traceBlackHole','shadeSurface','systemRadiance(','nebulaMarch','cloudRadiance(','G*=sysT'])assert(!has(optics.material,t),t);
assert(has(optics.material,'groupRadiance')&&has(optics.material,'cometRadiance')&&has(optics.material,'uniform float pixelAngle;'));
assert.equal(programs.length,1);
// A resolved body later: the sky keeps the compiled deep-sky program while the system program compiles in the background.
u.bodyKind.value=1;blockNext=true;
await optics.prepare(renderer,deep);
assert.equal(optics.material.name,'Optique ordinaire (ciel profond)');assert.equal(programs.length,2);assert.equal(optics.pendingMaterials.size,1);
await optics.prepare(renderer,deep);assert.equal(programs.length,2,'no second compile while pending');
release();await new Promise(r=>setTimeout(r,0));await new Promise(r=>setTimeout(r,0));
await optics.prepare(renderer,deep);
assert.equal(optics.material.name,'Optique ordinaire (corps du système)');
assert(has(optics.material,'shadeSurface')&&has(optics.material,'G*=sysT')&&!has(optics.material,'nebulaMarch')&&!has(optics.material,'traceBlackHole'));
assert(!has(optics.material,'uniform float pixelAngle;'),'pixelAngle declared once, by the system module');
// Cloud: selected nebula within reach.
u.bodyKind.value=0;optics.cloudGain=1;blockNext=true;
await optics.prepare(renderer,nebula);
assert.equal(optics.material.name,'Optique ordinaire (corps du système)','superset kept while the cloud program compiles');
release();await new Promise(r=>setTimeout(r,0));await new Promise(r=>setTimeout(r,0));
await optics.prepare(renderer,nebula);
assert.equal(optics.material.name,'Optique ordinaire (nuage)');assert(has(optics.material,'nebulaMarch')&&!has(optics.material,'shadeSurface'));
optics.cloudGain=undefined;
// Startup next to a resolved body: the first image waits for the deep-sky program only; the system one follows.
{const fresh=new SkyOptics(new Float32Array(2048)),seen=[];fresh.material.uniforms.bodyKind.value=1;
 await fresh.prepare({async compileAsync(scene){seen.push(scene.children[0].material.name);}},deep);
 assert.equal(fresh.material.name,'Optique ordinaire (ciel profond)');assert.deepEqual(seen,['Optique ordinaire (ciel profond)','Optique ordinaire (corps du système)']);
 await new Promise(r=>setTimeout(r,0));await new Promise(r=>setTimeout(r,0));await fresh.prepare({async compileAsync(){throw Error('no recompile');}},deep);
 assert.equal(fresh.material.name,'Optique ordinaire (corps du système)');}
// Black hole: exact program awaited (as before), every module plus the tracer.
await optics.prepare(renderer,{...near,lensing:false});assert(!has(optics.material,'traceBlackHole'));
await optics.prepare(renderer,near);
assert.equal(optics.material.name,'Optique trou noir (traceur géodésique)');
assert(has(optics.material,'traceBlackHole')&&has(optics.material,'i<520')&&has(optics.material,'shadeSurface')&&has(optics.material,'nebulaMarch'));
const n=programs.length;
// Shared uniforms and cached programs.
for(const m of programs)assert.equal(m.uniforms,u);
u.exposure.value=3;await optics.prepare(renderer,deep);assert.equal(optics.material.name,'Optique ordinaire (ciel profond)');assert.equal(optics.material.uniforms.exposure.value,3);
await optics.prepare(renderer,near);assert.equal(programs.length,n);
// Variant sources: markers removed cleanly; one systemRadiance call per program.
const full=optics.fullFragment;
for(const k of [{},{system:true},{cloud:true},{system:true,cloud:true},{system:true,cloud:true,blackHole:true}]){const f=opticsVariantSource(full,{system:!!k.system,cloud:!!k.cloud,blackHole:!!k.blackHole});
 assert.equal((f.match(/uniform float pixelAngle/g)||[]).length+(f.includes('#define SECN')?0:0)<=1,true);assert(f.includes('pixelAngle'));
 assert.equal((f.match(/systemRadiance\(ray/g)||[]).length,k.system?1:0);assert.equal(f.includes('cloudRadiance(ray'),!!k.cloud);}
console.log('PASS deep-sky startup; system/cloud programs compiled in the background with a compiled fallback; black hole awaited; shared uniforms; cached variants');
