import assert from 'node:assert/strict';
import {solveComovingTransfer,restTransferAtTime} from '../src/rocket-transfer.js';
import {G_PER_YEAR,hubblePerYear} from '../src/rocket-bench.js';
const near=(a,b,abs,rel=0)=>assert(Math.abs(a-b)<=abs+rel*Math.abs(b),`${a} vs ${b}`);
const flat={H0:0,omegaM:0,omegaLambda:1};
for(const distanceLy of [0,1e-6,4,1e6,9e8])for(const accelerationG of [1e-3,1]){
 const r=solveComovingTransfer({distanceLy,accelerationG,parameters:flat}),A=G_PER_YEAR*accelerationG;
 assert(r.reachable);near(r.durationYears,Math.sqrt(distanceLy**2+4*distanceLy/A),1e-6,3e-10);near(r.end.properYears,4/A*Math.asinh(Math.sqrt(A*distanceLy)/2),1e-5,3e-10);near(r.turnYears,r.durationYears/2,1e-7);assert.equal(r.end.u,0);near(r.end.comovingLy,distanceLy,r.toleranceLy);
}
console.log('PASS independent SR analytic rest-to-rest times, clocks and positions, small distances and high gamma');
const H=hubblePerYear(67.4);for(const T of [20,1e6,1e9]){const r=restTransferAtTime({durationYears:T,parameters:{H0:67.4,omegaM:0,omegaLambda:1}}),turn=Math.log1p(Math.expm1(H*T)/2)/H;near(r.turnYears,turn,1e-6);}
// Independent RK4 of Friedmann + forced momentum + position + clock; no Gaussian or logarithmic coordinates.
function independent(r){let y=[1,0,0,0];const A=r.accelerationG*G_PER_YEAR,f=([a,u],sign)=>{const h=H*Math.sqrt(.315/a**3+.685),g=Math.hypot(1,u);return [a*h,sign*A-h*u,u/(a*g),1/g];};for(const [duration,sign] of [[r.turnYears,1],[r.durationYears-r.turnYears,-1]]){const dt=duration/8192;for(let i=0;i<8192;i++){const a=f(y,sign),b=f(y.map((v,j)=>v+dt*a[j]/2),sign),c=f(y.map((v,j)=>v+dt*b[j]/2),sign),d=f(y.map((v,j)=>v+dt*c[j]),sign);y=y.map((v,j)=>v+dt*(a[j]+2*b[j]+2*c[j]+d[j])/6);}}return y;}
for(const g of [1e-10,1e-9]){const r=restTransferAtTime({durationYears:1e9,accelerationG:g}),y=independent(r);near(y[0],r.end.a,1e-12);near(y[1],0,1e-11);near(y[2],r.end.comovingLy,.02,1e-10);near(y[3],r.end.properYears,.02,1e-10);assert(r.turnYears>r.durationYears/2);}
for(const d of [4,1e6,1e8,9e8]){const r=solveComovingTransfer({distanceLy:d}),tight=solveComovingTransfer({distanceLy:d,accuracy:.1});near(r.end.properYears,tight.end.properYears,1e-5,1e-9);near(r.end.comovingLy,tight.end.comovingLy,2*r.toleranceLy);let prev={comovingLy:0,properYears:0};for(let i=0;i<=128;i++){const p=r.sample(r.durationYears*i/128);assert(p.comovingLy>=prev.comovingLy-1e-6&&p.properYears>=prev.properYears-1e-6);assert(p.oneMinusAbsBeta>0&&p.u>=0);assert(p.properYears<=p.cosmicYears+1e-6);prev=p;}assert.equal(r.sample(r.durationYears).u,0);const a=r.sample(r.turnYears),b=r.sample(r.turnYears+Math.max(1e-8,r.durationYears*1e-12));near(a.beta,b.beta,1e-6);}
assert.equal(solveComovingTransfer({distanceLy:1e9}).reachable,false);
for(const p of [{distanceLy:-1},{distanceLy:Infinity},{distanceLy:1,accelerationG:0},{distanceLy:1,accelerationG:2}])assert.throws(()=>solveComovingTransfer(p));
console.log('PASS de Sitter switch, independent LCDM RK4 boundary conditions, tolerance convergence, continuous clocks, causal motion and bounded failures');
