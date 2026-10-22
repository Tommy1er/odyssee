import assert from 'node:assert/strict';
import {calibrate,lum} from '../src/nebulae.js';
import {directionalRGB} from '../src/nebula-direction.js';
import {nebulaDirectionGain} from '../src/nebula-anisotropy.js';
for(const id of ['tarantula','ngc604','pillars','ring','eta-car','sgrb2']){
 const c=calibrate({id,type:id==='pillars'?'pillars':'nebula',d:1,radiusLy:1}),ref=directionalRGB(c,[0,0,1],{n:40,steps:80});let worst=0;
 assert.deepEqual(nebulaDirectionGain(id,[0,0,1]),[1,1,1]);
 for(const d of [[1,0,0],[0,0,-1],[.7,.4,.3],[-.3,.8,-.5],[.01,1,.02]]){
  const direct=directionalRGB(c,d,{n:40,steps:80}).map((x,k)=>x/ref[k]),approx=nebulaDirectionGain(id,d);
  const e=Math.max(...direct.map((x,k)=>Math.abs(approx[k]/x-1)));worst=Math.max(e,worst);
 }
 console.log(id,'max RGB relative error',worst.toFixed(4));assert(worst<.12,'Directional table within 12% of independent fine integration: '+id);
 const a=nebulaDirectionGain(id,[1,1e-8,.4]),b=nebulaDirectionGain(id,[1,-1e-8,.4]);assert(Math.max(...a.map((x,k)=>Math.abs(x-b[k])))<1e-7);
}
console.log('PASS Earth normalization, off-axis transfer, continuity at azimuth seam');
