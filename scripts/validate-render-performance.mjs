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
