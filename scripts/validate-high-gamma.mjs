import assert from 'node:assert/strict';
import * as P from '../src/physics.js';
// Kinematic Float64 checks only: no shader, spectrum or GPU validation.
const rows=[];
for(const expectedGamma of [1e2,1e3,1e4,1e6,1e8,1e12]){
 const u=[Math.sqrt((expectedGamma-1)*(expectedGamma+1)),0,0],g=P.gammaU(u);
 const forwardD=P.dopplerU([1,0,0],u),rearD=P.dopplerU([-1,0,0],u),gap=P.betaGap(u);
 assert(Math.abs(g/expectedGamma-1)<1e-14);
 assert(gap>0&&Number.isFinite(gap));
 assert(Math.abs(gap*2*g*g-1)<3e-5);
 assert(Math.abs(forwardD*rearD-1)<1e-14);
 assert(Math.abs(forwardD/(g+Math.hypot(...u))-1)<1e-14);
 for(const n of [[1,0,0],[-1,0,0],[0,1,0],P.unit([.3,.5,.8])]){
  const a=P.aberrateU(n,u);assert(a.every(Number.isFinite));
  assert(Math.abs(P.norm(a)-1)<1e-14);assert(P.dopplerU(n,u)>0);
 }
 const step=P.integrateProper([0,0,0],u,1,[P.G1,0,0]);
 assert(step.pos.every(Number.isFinite)&&step.u.every(Number.isFinite));
 assert(step.tau>0&&Number.isFinite(step.tau));
 rows.push({gamma:g,betaGap:gap,forwardD,rearD,betaRoundedToOne:P.velocity(u)[0]===1});
}
console.log(JSON.stringify({scope:'Float64 kinematic finiteness and axial Doppler identities; not integration error bounds, GPU rendering or spectral accuracy',rows},null,2));
