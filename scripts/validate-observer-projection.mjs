import assert from 'node:assert/strict';
import * as T from 'three';
import {CloudPass} from '../src/cloud-pass.js';
import {GroupPass} from '../src/group-pass.js';
import {updateObserverProjection} from '../src/observer-projection.js';

// Public passes must work independently of SkyOptics, while retaining shared
// uniform entries when composed. This catches missing setup in isolated HDR draws.
for(const Pass of [CloudPass,GroupPass]){
 const u={rotation:{value:new T.Matrix3()},axis:{value:new T.Vector3(0,0,-1)},
  aspect:{value:1.5},tanFov:{value:.7},g:{value:1e6},momentum:{value:1e6},optics:{value:1}};
 const first=new Pass(u),second=new Pass(u);
 assert.equal(first.material.uniforms,u);assert.equal(second.material.uniforms,u);
 const entries=Object.keys(u).filter(k=>k.startsWith('observer')).map(k=>[k,u[k]]);
 assert.equal(entries.length,5);
 const other=new (Pass===CloudPass?GroupPass:CloudPass)(u);
 for(const [key,value] of entries)assert.equal(other.material.uniforms[key],value,'Shared observer entry replaced');
 for(const viewport of [[0,0,1280,585],[7,11,403,257],[0,0,144,108]]){
  updateObserverProjection(u,new T.Vector4(...viewport));assert.equal(u.observerPrecise.value,1);
  const [x,y,w,h]=viewport;
  assert(Math.abs(u.observerAnchorHigh.value.x+u.observerAnchorLow.value.x-x-w/2)<1e-12);
  assert(Math.abs(u.observerAnchorHigh.value.y+u.observerAnchorLow.value.y-y-h/2)<1e-12);
 }
 u.optics.value=0;updateObserverProjection(u,new T.Vector4(0,0,1280,585));assert.equal(u.observerPrecise.value,0);
 u.optics.value=1;u.axis.value.set(0,0,1);updateObserverProjection(u,new T.Vector4(0,0,1280,585));assert.equal(u.observerPrecise.value,0);
 u.axis.value.set(0,0,-1);u.g.value=1;u.momentum.value=0;updateObserverProjection(u,new T.Vector4(0,0,1280,585));assert.equal(u.observerPrecise.value,0);
}
console.log('PASS standalone cloud/group setup, shared uniform identity, viewport resize/offset and inactive/rear/rest fallbacks');
