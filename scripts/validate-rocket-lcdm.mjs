import assert from 'node:assert/strict';
import {lcdmRocketSegment,oppositeLCDMBench} from '../src/rocket-lcdm.js';
import {oppositeBurnBench,G_PER_YEAR,hubblePerYear} from '../src/rocket-bench.js';
import {radialCoastingPath,flatLCDM,MPC_IN_MLY,FLRW_PLANCK_2018} from '../src/flrw.js';
const near=(a,b,abs,rel=0)=>assert(Math.abs(a-b)<=abs+rel*Math.abs(b),`${a} versus ${b}`);
for(const H0 of [0,67.4])for(const durationYears of [0,20,1e6,1e9]){
 const parameters={H0,omegaM:0,omegaLambda:1},a=oppositeLCDMBench({durationYears,parameters}),b=oppositeBurnBench({durationYears,model:H0?'de-sitter':'minkowski'});
 near(a.end.u,b.end.u,1e-6,1e-12);near(a.end.properYears,b.end.properYears,2e-5,1e-9);near(a.end.comovingLy,b.end.comovingLy,1e-4,1e-9);near(a.end.a,b.end.a,1e-12);
 assert(a.evaluations<200000);for(const p of a.points){assert(p.oneMinusAbsBeta>0);assert(p.properYears<=p.cosmicYears+1e-5);}
}
console.log('PASS variable-H solver reproduces Minkowski and constant-H analytic benchmarks, including large-gamma stops');
for(const beta0 of [.1,.9,.999999]){
 const z=.05,reference=flatLCDM(z),uStart=-beta0/Math.sqrt((1-beta0)*(1+beta0)),s=lcdmRocketSegment({durationYears:reference.lookbackGyr*1e9,aStart:1/(1+z),uStart}),free=radialCoastingPath(z,beta0),end=free.points.at(-1);
 near(s.end.a,1,1e-12);near(s.end.a*s.end.u,uStart/(1+z),1e-10);near(s.end.properYears,end.properGyr*1e9,1e-3,1e-9);near(s.end.deltaComovingLy,(end.comovingMpc-free.points[0].comovingMpc)*MPC_IN_MLY*1e6,.001,1e-9);
}
// Independent RK4 in cosmic time: integrates a,u,chi,tau directly, not the Gaussian integrating factor.
function rk4(duration,A){const H0=hubblePerYear(67.4),m=.315,l=.685,n=4096,dt=duration/n;let y=[1,0,0,0];const f=([a,u])=>{const H=H0*Math.sqrt(m/a**3+l),g=Math.hypot(1,u);return [a*H,A-H*u,u/(a*g),1/g];};for(let i=0;i<n;i++){const a=f(y),b=f(y.map((v,j)=>v+dt*a[j]/2)),c=f(y.map((v,j)=>v+dt*b[j]/2)),d=f(y.map((v,j)=>v+dt*c[j]));y=y.map((v,j)=>v+dt*(a[j]+2*b[j]+2*c[j]+d[j])/6);}return y;}
for(const accelerationG of [-1e-9,0,1e-9]){const s=lcdmRocketSegment({durationYears:1e9,accelerationG}),r=rk4(1e9,accelerationG*G_PER_YEAR);near(s.end.a,r[0],1e-12);near(s.end.u,r[1],1e-10);near(s.end.deltaComovingLy,r[2],.1,1e-9);near(s.end.properYears,r[3],.1,1e-9);}
for(const accelerationG of [1e-9,1]){const a=oppositeLCDMBench({durationYears:1e9,accelerationG}),b=oppositeLCDMBench({durationYears:1e9,accelerationG,accuracy:.1});near(a.end.properYears,b.end.properYears,2e-5,2e-9);near(a.end.comovingLy,b.end.comovingLy,.5,1e-9);assert(a.end.u<0);for(let i=1;i<a.points.length;i++)assert(a.points[i].properYears>=a.points[i-1].properYears);}
for(const o of [{durationYears:-1},{durationYears:2e9},{durationYears:1,accelerationG:2},{durationYears:1,parameters:{H0:67.4,omegaM:NaN,omegaLambda:1}}])assert.throws(()=>lcdmRocketSegment(o));
assert.equal(FLRW_PLANCK_2018.H0,67.4);
console.log('PASS free FLRW reference, independent cosmic-time RK4, tolerance convergence, braking, clocks and domain checks');
