import assert from 'node:assert/strict';
import {radialPhotonPath,flatLCDM,C_KM_S,MPC_KM,JULIAN_YEAR_SECONDS} from '../src/flrw.js';
const near=(a,b,tol)=>assert(Math.abs(a-b)<tol,`${a} versus ${b}`);
for(const omegaM of [0,1])for(const z of [.01,.1,1,2]){
 const parameters={H0:67.4,omegaM,omegaLambda:1-omegaM},p=radialPhotonPath(z,parameters),a0=1/(1+z),dh=C_KM_S/parameters.H0,th=MPC_KM/(parameters.H0*JULIAN_YEAR_SECONDS*1e9);
 for(const row of p.points){const a=row.a,chi=omegaM?2*dh*(1-Math.sqrt(a)):dh*(1/a-1),t=omegaM?2*th/3*(a**1.5-a0**1.5):th*Math.log(a/a0);near(row.photonComovingMpc,chi,1e-5);near(row.elapsedGyr,t,1e-8);near(row.photonProperMpc,a*chi,1e-5);}
}
console.log('PASS full null paths against analytic Einstein-de Sitter and de Sitter solutions');
for(const z of [0,.01,.1,.19,.5,1,2]){
 const p=radialPhotonPath(z);assert.equal(p.points.length,257);near(p.arrivalResidualMpc,0,1e-5);near(p.lookbackResidualGyr,0,1e-8);near(p.points[0].sourceProperMpc,p.reference.angularDiameterMpc,1e-9);
 for(let i=1;i<p.points.length;i++){const a=p.points[i-1],b=p.points[i];assert(b.elapsedGyr>=a.elapsedGyr);assert(b.photonComovingMpc<=a.photonComovingMpc);assert(b.sourceProperMpc>=a.sourceProperMpc);}
 if(z>0){const a=radialPhotonPath(z,undefined,32),b=radialPhotonPath(z,undefined,64);assert(Math.abs(b.arrivalResidualMpc)<Math.abs(a.arrivalResidualMpc)+1e-9);}
}
assert(radialPhotonPath(2).points.some((p,i,a)=>i&&p.photonProperMpc>a[i-1].photonProperMpc),'incoming light can initially recede in proper distance');
const params={H0:67.4,omegaM:.315,omegaLambda:.685},copy={...params};radialPhotonPath(1,params);assert.deepEqual(params,copy);
for(const z of [-1,NaN,Infinity,3])assert.equal(radialPhotonPath(z),null);
for(const n of [0,2,15,4097,NaN,2.5])assert.throws(()=>radialPhotonPath(1,undefined,n));
for(const p of [{H0:67.4,omegaM:NaN,omegaLambda:.685},{H0:67.4,omegaM:.315,omegaLambda:Infinity}])assert.throws(()=>flatLCDM(1,p));
console.log('PASS reception, monotonic time/comoving path, convergence, proper-distance turn, units and invalid inputs');
