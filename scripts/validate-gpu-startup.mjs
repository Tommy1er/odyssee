import assert from 'node:assert/strict';
import * as T from 'three';
import {GPUStartup,GPU_TRACE_KEY,captureCubeStartup} from '../src/gpu-startup.js';
let persisted,clock=0;
const trace=new GPUStartup({storage:{getItem:()=>null,setItem:(key,v)=>{assert.equal(key,GPU_TRACE_KEY);persisted=JSON.parse(v);}},now:()=>++clock});
assert.throws(()=>trace.run('faulty pass',()=>{assert.equal(persisted.entries.at(-1).status,'en cours');throw Error('driver failed');}),/driver failed/);
assert.equal(persisted.entries.at(-1).status,'échec');assert.match(trace.text(),/driver failed/);
let frame=0;globalThis.requestAnimationFrame=cb=>queueMicrotask(()=>{frame++;cb(frame);});
function renderer(fail=-1){let target={original:true},face=4,mip=2,viewport=new T.Vector4(3,4,500,300),scissor=new T.Vector4(1,2,100,90),test=true;const draws=[];
 return {coordinateSystem:T.WebGLCoordinateSystem,xr:{enabled:true},draws,
  getRenderTarget:()=>target,getActiveCubeFace:()=>face,getActiveMipmapLevel:()=>mip,
  setRenderTarget:(t,f=0,m=0)=>{target=t;face=f;mip=m;},getViewport:v=>v.copy(viewport),setViewport:v=>viewport.copy(v),getScissor:v=>v.copy(scissor),setScissor:v=>scissor.copy(v),getScissorTest:()=>test,setScissorTest:v=>test=v,
  render:(scene,camera)=>{draws.push({face,frame,camera});if(face===fail)throw Error('draw failed');}
 };
}
for(const fail of [-1,2]){
 const r=renderer(fail),target=new T.WebGLCubeRenderTarget(16,{generateMipmaps:true}),cube=new T.CubeCamera(.1,10,target),scene=new T.Scene(),saved=r.getRenderTarget();
 const stub={compile:async()=>{},check:()=>{},run:(_,fn)=>fn()};
 if(fail<0)await captureCubeStartup(r,cube,scene,stub,'test');else await assert.rejects(captureCubeStartup(r,cube,scene,stub,'test'),/draw failed/);
 assert.deepEqual(r.draws.map(x=>x.face),fail<0?[0,1,2,3,4,5]:[0,1,2]);assert.equal(new Set(r.draws.map(x=>x.frame)).size,r.draws.length);
 r.draws.forEach(x=>assert.equal(x.camera,cube.children[x.face]));assert.equal(r.getRenderTarget(),saved);assert.equal(r.getActiveCubeFace(),4);assert.equal(r.getActiveMipmapLevel(),2);assert(r.getScissorTest());assert(r.xr.enabled);assert(target.texture.generateMipmaps);
 assert.deepEqual(r.getViewport(new T.Vector4()).toArray(),[3,4,500,300]);assert.deepEqual(r.getScissor(new T.Vector4()).toArray(),[1,2,100,90]);
}
const scene=new T.Scene(),visible=new T.Mesh(new T.BoxGeometry(),new T.MeshBasicMaterial()),hidden=new T.Mesh(new T.BoxGeometry(),new T.MeshBasicMaterial());hidden.visible=false;scene.add(visible,hidden);const compiled=[];
trace.gl={isContextLost:()=>false};await trace.compile({compileAsync:async(o,c,target)=>compiled.push([o,target])},scene,new T.PerspectiveCamera(),'visible-only');assert.deepEqual(compiled,[[visible,scene]]);
trace.stop();assert.throws(()=>trace.run('must not run',()=>assert.fail()),/interrompu/);
delete globalThis.requestAnimationFrame;
console.log('PASS startup journal persists pending/failure; cube yields between six matching faces; render state restores on success/failure; loss aborts');
