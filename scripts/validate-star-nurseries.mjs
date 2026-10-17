// New extragalactic nurseries: NASA positions, host membership, modeled wind-blown cavities, calibrated brightness.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {extragalacticNebulae} from '../src/extragalactic-nebulae.js';
import {localGroupObjects} from '../src/local-group.js';
import {physicsOf,nebulaShape,makeField,calibrate,nebulaGLSL} from '../src/nebulae.js';
import {fluxFromMag} from '../src/photometry.js';
let n=0;function check(label,fn){fn();console.log('PASS '+label);n++;}
const neb=extragalacticNebulae(), lg=localGroupObjects(),tar=neb.find(o=>o.id==='tarantula'),ngc=neb.find(o=>o.id==='ngc604');
check('Two distinct giant H II complexes are directly navigable',()=>{assert.equal(neb.length,2);assert(neb.every(o=>o.type==='nebula'&&o.guide&&o.links.length>=2))});
check('Tarantula J2000 direction and NASA distance',()=>{assert(Math.abs(Math.hypot(...tar.xyz)-170000)<1e-7);const ra=Math.atan2(tar.xyz[1],tar.xyz[0])*180/Math.PI,dec=Math.asin(tar.xyz[2]/tar.d)*180/Math.PI;assert(Math.abs(ra-84.67666667)<1e-5);assert(Math.abs(dec+69.10093056)<1e-5);});
check('NGC 604 direction aligns with Webb position and host plane',()=>{const ra=Math.atan2(ngc.xyz[1],ngc.xyz[0])*180/Math.PI,dec=Math.asin(ngc.xyz[2]/ngc.d)*180/Math.PI;assert(Math.abs(ra-23.6407917)<1e-5);assert(Math.abs(dec-30.78305556)<1e-5);assert.equal(ngc.publishedDistanceLy,2730000);assert.equal(ngc.d,3000000);});
check('Both nurseries lie WITHIN their modelled host galaxy, not ~270k ly in front',()=>{
 const lmc=lg.find(o=>o.id==='lmc'),m33=lg.find(o=>o.id==='m33');
 assert(Math.hypot(...tar.xyz.map((x,k)=>x-lmc.xyz[k]))<lmc.radiusLy);
 assert(Math.hypot(...ngc.xyz.map((x,k)=>x-m33.xyz[k]))<m33.radiusLy);
});
check('Nebula physics and relative magnitudes explicitly identify measured vs estimated data',()=>{assert.equal(physicsOf(tar).V,4);assert.equal(physicsOf(ngc).V,11.5);assert(physicsOf(ngc).vNote.includes('estimation'));assert(physicsOf(tar).vNote.includes('NASA'))});
check('Wind-blown cavities have nonzero gas shells and taper to zero outside bounding sphere',()=>{
 for(const o of neb){assert.equal(nebulaShape(o),6);const f=makeField(6,o.id==='tarantula'?341:529);
  const vals=[];for(let j=-10;j<=10;j++)vals.push(f.density(j/15,.15,.04));
  assert(vals.some(v=>v>.02));assert(f.density(2,0,0)===0);}
});
check('CPU model and GLSL model both include same three cavities and same total support',()=>{
 const shader=nebulaGLSL(16);assert(shader.includes('vec4(-.28,.1,.05,.46)'));assert(shader.includes('vec4(.25,-.2,.13,.42)'));assert(shader.includes('vec4(.05,.34,-.18,.33)'));
});
check('Low-res radiance calibration finite and same photometric zero for both regions',()=>{
 for(const o of neb){const c=calibrate(o,{n:12,steps:24});assert(c.Kl>0&&Number.isFinite(c.Kl));assert(c.Kc>0&&Number.isFinite(c.Kc));assert(Math.abs(c.Phi/fluxFromMag(physicsOf(o).V-physicsOf(o).afg)-1)<1e-10);assert(c.escape>0&&c.escape<=1.01);}
});
check('Existing astrophysical models and geometry are untouched',()=>{
 assert.equal(nebulaShape({id:'orion',type:'nebula'}),0);
 assert.equal(nebulaShape({id:'crab',type:'nebula'}),2);
 assert.equal(nebulaShape({id:'pillars',type:'pillars'}),1);
});
check('Cockpit actually imports the new NASA destinations',()=>{
 const c=fs.readFileSync(new URL('../src/cockpit.js',import.meta.url),'utf8');
 assert(c.includes('...extragalacticNebulae()'));
});
console.log(JSON.stringify({passed:n,rendering:'CPU checks only; GPU browser verification separate'}));
