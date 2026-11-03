import assert from 'node:assert/strict';
import {rocketSegment,oppositeBurnBench,G_PER_YEAR,hubblePerYear} from '../src/rocket-bench.js';
const near=(a,b,tol=1e-7)=>assert(Math.abs(a-b)<tol*(1+Math.abs(b)),`${a} versus ${b}`);
for(const years of [0,1e-10,.001,1,20,1e6,1e9]){const s=rocketSegment({durationYears:years,accelerationG:1});near(s.end.u,G_PER_YEAR*years);near(s.end.properYears,Math.asinh(G_PER_YEAR*years)/G_PER_YEAR);near(s.end.deltaComovingLy,(Math.hypot(1,G_PER_YEAR*years)-1)/G_PER_YEAR);const p=oppositeBurnBench({durationYears:years});near(p.end.u,0);near(p.end.properYears,2*Math.asinh(G_PER_YEAR*years/2)/G_PER_YEAR);}
console.log('PASS Minkowski constant proper acceleration, opposed burns and clocks from milliseconds to billion-year bench');
const simpson=(f,T)=>{const n=8192,h=T/n;let s=f(0)+f(T);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(i*h);return s*h/3;};
for(const accelerationG of [-1e-9,0,1e-9]){
 const T=1e9,u0=.3,H=hubblePerYear(67.4),A=accelerationG*G_PER_YEAR,u=t=>u0*Math.exp(-H*t)+(A/H)*(-Math.expm1(-H*t));
 const s=rocketSegment({durationYears:T,uStart:u0,accelerationG,hubble:67.4});near(s.end.u,u(T),1e-12);
 near(s.end.deltaComovingLy,simpson(t=>u(t)/Math.hypot(1,u(t))*Math.exp(-H*t),T),1e-9);near(s.end.properYears,simpson(t=>1/Math.hypot(1,u(t)),T),1e-9);
 if(!accelerationG)near(s.end.a*s.end.u,u0,1e-12);
 for(const t of [1e6,3e8,9e8]){const h=100,r=s.sample(t),d=(s.sample(t+h).u-s.sample(t-h).u)/(2*h);near(d,A-H*r.u,1e-12);assert(r.oneMinusAbsBeta>0);assert(r.properYears<=t+1e-6);}
}
const reversing=oppositeBurnBench({durationYears:1e9,accelerationG:1e-9,model:'de-sitter'});assert(reversing.end.u<0,'equal cosmic durations do not guarantee local rest');assert(reversing.end.properYears<=1e9);
const constant=rocketSegment({durationYears:1e9,uStart:.1*G_PER_YEAR/hubblePerYear(67.4),accelerationG:.1,hubble:67.4});near(constant.end.u,.1*G_PER_YEAR/hubblePerYear(67.4),1e-12);near(constant.end.properYears,1e9/constant.end.gamma,1e-9);
for(const o of [{durationYears:-1},{durationYears:Infinity},{durationYears:2e9},{durationYears:1,accelerationG:2},{durationYears:1,hubble:-1}])assert.throws(()=>rocketSegment(o));assert.throws(()=>oppositeBurnBench({model:'flat-LCDM'}));
console.log('PASS de Sitter momentum, independently integrated position/clock, free limit, terminal momentum, braking reversal and invalid inputs');

const tiny=rocketSegment({durationYears:1e-10,accelerationG:1}).end,expected=G_PER_YEAR*1e-20/(Math.hypot(1,G_PER_YEAR*1e-10)+1);
assert(tiny.deltaComovingLy>0);assert(Math.abs(tiny.deltaComovingLy/expected-1)<1e-12);near(tiny.properYears,1e-10,1e-20);
console.log('PASS tiny-duration displacement retains precision');
