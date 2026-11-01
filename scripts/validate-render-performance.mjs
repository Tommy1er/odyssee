import assert from 'node:assert/strict';
import {needsSkyCapture} from '../src/sky-refresh.js';
import {cloudSize,MAX_VOLUME_PIXELS} from '../src/cloud-pass.js';
const p={key:'sky',pos:[0,0,0],t:0,wall:0,nearest:1};
const n={key:'sky',pos:[0,0,0],t:1e-8,wall:.1,paused:false};
assert(!needsSkyCapture(p,n),'time progression alone must not recapture every frame');
assert(needsSkyCapture(p,{...n,wall:.51}));
assert(!needsSkyCapture(p,{...n,wall:1,paused:true}));
assert(needsSkyCapture(p,{...n,wall:4.1,paused:true}));
assert(needsSkyCapture(p,{...n,key:'band changed'}));
assert(needsSkyCapture(p,{...n,pos:[.01,0,0]}));
assert(needsSkyCapture(p,{...n,t:2}));
assert(needsSkyCapture(null,n));
assert.deepEqual(cloudSize(1051,832),[526,416]);
assert.deepEqual(cloudSize(1051/2,832),[263,416]);
assert.deepEqual(cloudSize(5,7,1),[5,7]);
for(const [w,h] of [[1920,1080],[3840,2160],[7680,4320],[390,844],[3440,1440],[1000000,1]]){
 const [x,y]=cloudSize(w,h);assert(x*y<=MAX_VOLUME_PIXELS);assert(x>=1&&y>=1);assert(x<=Math.ceil(w/2)&&y<=Math.ceil(h/2));
 if(w/h<10&&w/h>.1)assert(Math.abs(x/y-w/h)<.02,'preserve observer ray aspect');
}
assert.deepEqual(cloudSize(1920,1080,1),[1920,1080],'small clouds/reference path retain full resolution');
console.log('PASS sky capture cadence/parallax/target/time jumps; half-resolution dimensions');

// Arrival timings retain transition frames even after many steady slow frames.
{
 const {SceneTimings}=await import('../src/scene-timings.js');let now=0;const p=new SceneTimings(()=>now),s={pos:[0,0,0],target:{id:'sun'}};
 p.begin(s);now=10;p.mark('A');now=30;p.mark('B');now=35;p.finish();
 assert.equal(p.last.totalMs,35);assert.equal(p.last.stages.reduce((a,b)=>a+b.ms,0),35);
 s.pos=[6000,0,0];s.target={id:'cygx1'};p.begin(s);now+=1800;p.mark('cube');p.finish();const arrival=p.last;
 for(let i=0;i<30;i++){p.begin(s);now+=150;p.finish();}
 assert.equal(p.slowFrames.length,12);assert(p.transitions.includes(arrival));assert.equal(p.transitions.length,2);
 p.begin(s);now+=5;p.finish(new Error('driver'));assert.match(p.last.error,/driver/);assert.equal(p.current,null);
}
console.log('PASS scene spans sum to elapsed time; bounded slow frames; arrival retained; failures recorded');

// Destination preparation leaves the current scene untouched; the arrival reuses the same resources.
{
 const {EnvironmentLayer}=await import('../src/environments.js');const {Scene,Group}=await import('three');
 const objects=[{id:'a',type:'nebula',xyz:[0,0,0]},{id:'b',type:'nebula',xyz:[100,0,0]}];
 const layer=new EnvironmentLayer(new Scene(),objects);layer.candidates=({pos})=>[objects[pos[0]>50?1:0]];
 let creates=0;layer.create=o=>{creates++;const e={o,r:1,group:new Group()};layer.cache.set(o.id,e);return e;};
 layer.active=[objects[0]];layer.lastPos=[0,0,0];layer.create(objects[0]);const current=layer.cache.get('a');
 layer.prewarm([100,0,0],objects[1]);const task=layer.preparation.task;layer.prewarm([100,0,0],objects[1]);assert.equal(layer.preparation.task,task);
 await task;assert.equal(layer.preparation.status,'ready');assert.equal(layer.preparation.created,1);assert(current.group.visible);assert(!layer.cache.get('b').group.visible);assert.deepEqual(layer.active,[objects[0]]);assert.deepEqual(layer.lastPos,[0,0,0]);
 layer.update({wall:1,pos:[100,0,0],target:objects[1]});assert.equal(creates,2);assert(layer.cache.get('b').group.visible);
 layer.cache.delete('a');layer.prewarm([0,0,0],objects[0]);const cancelled=layer.preparation.task;layer.prewarm([100,0,0],null);await cancelled;assert(!layer.cache.has('a'));assert.equal(layer.preparation.status,'idle');
 layer.prewarm([0,0,0],objects[0]);layer.create=()=>{throw Error('resource failure');};await layer.preparation.task;assert.equal(layer.preparation.status,'error');
}
console.log('PASS environment destination warmup: hidden resources, deduplication, arrival reuse, cancellation and failure');

{
 const {VolumeBudget,GRAPHICS_PROFILES}=await import('../src/graphics-quality.js');const {renderPixelRatio}=await import('../src/render-budget.js');
 for(const profile of Object.keys(GRAPHICS_PROFILES)){
  const b=new VolumeBudget();b.setProfile(profile);const max=GRAPHICS_PROFILES[profile].volume;
  b.sample(NaN);b.sample(-1);for(let i=0;i<100;i++)b.sample(200);assert.equal(b.limit,max/4);
  for(let i=0;i<100;i++)b.sample(.1);assert.equal(b.limit,max);
  const [w,h]=cloudSize(3840,2160,.5,b.limit);assert(w*h<=max);const ratio=renderPixelRatio(3840,2160,2,profile);assert(3840*2160*ratio**2<=GRAPHICS_PROFILES[profile].pixels+1);
 }
 const b=new VolumeBudget();b.setProfile('__proto__');assert.equal(b.profile,'balanced');
 // Nonblocking queries: no result read until availability, disjoint results discarded, no nesting.
 let available=false,disjoint=false,active=false,reads=0,deletes=0;
 const ext={TIME_ELAPSED_EXT:1,GPU_DISJOINT_EXT:2};const gl={CURRENT_QUERY:3,QUERY_RESULT_AVAILABLE:4,QUERY_RESULT:5,getExtension:()=>ext,isContextLost:()=>false,getParameter:()=>disjoint,getQuery:()=>active,createQuery:()=>({}),beginQuery:()=>{active=true;},endQuery:()=>{active=false;},deleteQuery:()=>deletes++,getQueryParameter:(q,p)=>{if(p===4)return available;reads++;return 20000000;}};
 const r={getContext:()=>gl};for(let i=0;i<30;i++){const q=b.begin(r);b.end(q);}assert(b.pending);b.begin(r);assert.equal(reads,0);available=true;b.begin(r);assert.equal(reads,1);assert.equal(deletes,1);
 b.tick=29;b.end(b.begin(r));disjoint=true;b.begin(r);assert.equal(deletes,2);assert.equal(b.pending,null);
 disjoint=false;active=true;b.tick=29;assert.equal(b.begin(r),null);
 const fallback=new VolumeBudget();assert.equal(fallback.begin({getContext:()=>({...gl,getExtension:()=>null})}),null);assert.equal(fallback.limit,262144);
}
console.log('PASS graphics profiles, bounded GPU adaptation, asynchronous queries, disjoint rejection and fixed fallback');
