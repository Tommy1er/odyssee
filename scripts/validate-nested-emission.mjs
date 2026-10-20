import assert from 'node:assert/strict';
import {nestedEmissionBudget,referenceBudgetStrength} from '../src/nested-emission.js';
import {localGroupObjects,volumeWeight} from '../src/local-group.js';
import {extragalacticNebulae} from '../src/extragalactic-nebulae.js';
import {physicsOf,calibrate} from '../src/nebulae.js';
import {fluxFromMag} from '../src/photometry.js';
import fs from 'node:fs';
const hosts=localGroupObjects(),clouds=extragalacticNebulae();
const base={enabled:true,hosts,clouds,active:new Set(['tarantula','ngc604']),pos:[0,0,0],beta:0,band:1};
const near=(a,b)=>assert(Math.abs(a-b)<1e-12,`${a} != ${b}`);
let passed=0;const check=(s,f)=>{f();passed++;console.log('PASS '+s);};
check('At reference, actual intrinsic nebular calibration plus residual host preserves V',()=>{
 const b=nestedEmissionBudget(base);
 for(const child of clouds){const host=hosts.find(o=>o.id===(child.id==='tarantula'?'lmc':'m33'));
  const c=calibrate(child,{n:12,steps:24}),F=fluxFromMag(host.Vmag);
  near((F*b.hostGains.get(host.id)+c.Phi*b.childGains.get(child.id))/F,1);
 }
});
check('Unrepresented children never debit the host',()=>{
 const b=nestedEmissionBudget({...base,active:new Set()});assert.equal(b.hostGains.size,0);assert.equal(b.childGains.size,0);
});
check('Selection changes only affect their own host',()=>{
 const b=nestedEmissionBudget({...base,active:new Set(['ngc604'])});assert.equal(b.hostGains.size,1);assert(b.hostGains.has('m33'));
});
check('Same residual conserves host point/volume handoff',()=>{
 const b=nestedEmissionBudget(base);
 for(const h of b.budgets)for(let px=0;px<12;px+=.05){const w=volumeWeight(px);near((1-w)*h.host+w*h.host+h.allocatedChildFraction,1);}
});
check('Physical solar starting drift remains in reference domain',()=>near(referenceBudgetStrength({...base,beta:21/299792.458}),1));
check('Unsupported bands, maps, laboratory and high speed do not alter rendering',()=>{
 for(const state of [{enabled:false},{band:0},{band:2},{band:3},{band:6},{map:true},{opticalLab:true},{beta:.99},{pos:[101,0,0]}]){
  const b=nestedEmissionBudget({...base,...state});near(b.strength,0);assert.equal(b.hostGains.size,0);assert.equal(b.childGains.size,0);
 }
});
check('Taper continuously interpolates from calibrated budget to legacy intrinsic addition',()=>{
 for(let x=10;x<=100;x+=.5){const b=nestedEmissionBudget({...base,pos:[x,0,0]});
  for(const child of clouds){const host=hosts.find(o=>o.id===(child.id==='tarantula'?'lmc':'m33')),P=physicsOf(child);
   const r=10**(-.4*(P.V-host.Vmag)),intrinsic=r*10**(.4*P.afg);
   near((b.hostGains.get(host.id)??1)+intrinsic*(b.childGains.get(child.id)??1),1+(1-b.strength)*intrinsic);
  }
 }
 for(const edge of [10,100])assert(Math.abs(referenceBudgetStrength({...base,pos:[edge-1e-6,0,0]})-referenceBudgetStrength({...base,pos:[edge+1e-6,0,0]}))<1e-10);
 for(const edge of [1e-4,1e-3])assert(Math.abs(referenceBudgetStrength({...base,beta:edge-1e-10})-referenceBudgetStrength({...base,beta:edge+1e-10}))<1e-10);
});
check('Photometric source values and dust calibration remain immutable',()=>{
 const before=JSON.stringify({hosts,clouds,P:clouds.map(physicsOf)});nestedEmissionBudget(base);
 assert.equal(JSON.stringify({hosts,clouds,P:clouds.map(physicsOf)}),before);
});
check('Renderer consumes residual on volume and shared cube/HDR point paths',()=>{
 const s=fs.readFileSync(new URL('../src/renderer.js',import.meta.url),'utf8');
 assert(s.includes('this.emissionBudget?.hostGains.get(o.id)'));
 assert(s.includes('groupTint.value[i].multiplyScalar(this.emissionBudget.hostGains'));
 assert(s.includes('e.cloud.material.uniforms.nebGain.value*=gain'));
 assert(s.includes("this.galaxyLight.key=''"));
 assert(s.includes('if(directCloud)selectedCloud.group.visible=false;'));
});
console.log(JSON.stringify({passed,scope:'CPU accounting and renderer wiring; GPU tests separate'}));
