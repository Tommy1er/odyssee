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
assert.equal(optics.material.name,'Optique ordinaire (nuage)');assert(has(optics.material,'cloudTransmission')&&!has(optics.material,'shadeSurface'));
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
assert(has(optics.material,'traceBlackHole')&&has(optics.material,'i<520')&&has(optics.material,'shadeSurface')&&has(optics.material,'cloudTransmission'));
const n=programs.length;
// Shared uniforms and cached programs.
for(const m of programs)assert.equal(m.uniforms,u);
assert(has(optics.cloudPass.material,'nebulaMarch'));
u.exposure.value=3;await optics.prepare(renderer,deep);assert.equal(optics.material.name,'Optique ordinaire (ciel profond)');assert.equal(optics.material.uniforms.exposure.value,3);
await optics.prepare(renderer,near);assert.equal(programs.length,n);
// Variant sources: markers removed cleanly; one systemRadiance call per program.
const full=optics.fullFragment;
for(const k of [{},{system:true},{cloud:true},{system:true,cloud:true},{system:true,cloud:true,blackHole:true}]){const f=opticsVariantSource(full,{system:!!k.system,cloud:!!k.cloud,blackHole:!!k.blackHole});
 assert.equal((f.match(/uniform float pixelAngle/g)||[]).length+(f.includes('#define SECN')?0:0)<=1,true);assert(f.includes('pixelAngle'));
 assert.equal((f.match(/systemRadiance\(ray/g)||[]).length,k.system?1:0);assert.equal(f.includes('cloudRadiance(ray'),!!k.cloud);}
console.log('PASS deep-sky startup; system/cloud programs compiled in the background with a compiled fallback; black hole awaited; shared uniforms; cached variants');
// Selection warmup is non-blocking, deduplicated and never swaps the current view on completion.
{
 const o=new SkyOptics(new Float32Array(2048)),far={...deep,target:{type:'blackhole',xyz:[10000,0,0],radiusLy:1}},calls=[];let unlock;
 const r={async compileAsync(scene){const m=scene.children[0].material;calls.push(m);if(m.userData.flags?.blackHole)await new Promise(resolve=>{unlock=resolve;});}};
 o.prewarmTarget(r,far);assert.equal(calls.length,0,'no warmup before first sky');
 await o.prepare(r,deep);const ordinary=o.material;
 o.prewarmTarget(r,{...far,lensing:false});o.prewarmTarget(r,deep);assert.equal(calls.length,1,'no unrelated warmup');
 o.prewarmTarget(r,far);await new Promise(r=>setTimeout(r,0));
 assert.equal(o.blackHolePreparation.status,'compiling');assert.equal(o.material,ordinary);
 o.prewarmTarget(r,far);await o.prepare(r,far);await o.prepare(r,deep);
 assert.equal(calls.filter(m=>m.userData.flags?.blackHole).length,1,'one shared black-hole compilation');
 let arrived=false;const waiting=o.prepare(r,near).then(()=>{arrived=true;});await new Promise(r=>setTimeout(r,0));
 assert(!arrived,'early arrival awaits the existing compilation');assert.equal(calls.filter(m=>m.userData.flags?.blackHole).length,1);
 unlock();await waiting;assert.equal(o.blackHolePreparation.status,'ready');assert(o.material.userData.flags.blackHole);
 await o.prepare(r,deep);o.prewarmTarget(r,far);await o.prepare(r,near);assert.equal(calls.filter(m=>m.userData.flags?.blackHole).length,1,'cached across journeys and targets');
}
{
 const o=new SkyOptics(new Float32Array(2048)),far={...deep,target:{type:'blackhole',xyz:[10000,0,0],radiusLy:1}};let unlock;
 const r={async compileAsync(scene){if(scene.children[0].material.userData.flags?.blackHole)await new Promise(resolve=>{unlock=resolve;});}};
 await o.prepare(r,far);await new Promise(r=>setTimeout(r,0));const ordinary=o.material;await o.prepare(r,deep);unlock();await new Promise(r=>setTimeout(r,0));
 assert.equal(o.material,ordinary,'completion after deselection never activates the black-hole program');assert.equal(o.blackHolePreparation.status,'ready');
}
{
 const o=new SkyOptics(new Float32Array(2048)),far={...deep,target:{type:'blackhole',xyz:[10000,0,0],radiusLy:1}};let failures=0;
 const r={async compileAsync(scene){if(scene.children[0].material.userData.flags?.blackHole){failures++;throw Error('driver rejected program');}}};
 await o.prepare(r,deep);o.prewarmTarget(r,far);await new Promise(r=>setTimeout(r,0));assert.equal(o.blackHolePreparation.status,'error');
 o.prewarmTarget(r,far);await o.prepare(r,far);await assert.rejects(o.prepare(r,near),/driver rejected/);assert.equal(failures,1,'failed warmup never retries each frame');assert(!o.material.userData.flags.blackHole);
}
console.log('PASS black-hole selection warmup, first-sky priority, deduplication, early arrival, deselection, reuse and failure');
