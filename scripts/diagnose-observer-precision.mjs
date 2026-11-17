// Numerical isolation only. Math.fround models individual Float32 operations;
// actual GLSL may fuse/reorder them. This is NOT a new GPU validation.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';

const f=Math.fround;
const unit=v=>{const d=Math.hypot(...v);return v.map(x=>x/d);};
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const distance=(a,b)=>Math.hypot(...a.map((x,i)=>x-b[i]));
const limits={ray:.005,logD:.005};
const axes=[{name:'aligned',axis:[0,0,-1],side:[1,0,0]},
 {name:'oblique',axis:[.6,0,-.8],side:[.8,0,.6]}];

// Same inverse observer boost algebra as observerRayGLSL, without production
// imports. With q=f every elementary operation is rounded; with identity it
// isolates input upload quantization from subsequent arithmetic.
function shaderAlgebra(n,axis,g,m,q=x=>x){
 const add=(a,b)=>q(a+b),mul=(a,b)=>q(a*b),div=(a,b)=>q(a/b);
 const dp=(a,b)=>add(add(mul(a[0],b[0]),mul(a[1],b[1])),mul(a[2],b[2]));
 const normalize=v=>{const len=q(Math.sqrt(dp(v,v)));return v.map(x=>div(x,len));};
 n=normalize(n);
 const mu=Math.max(-1,Math.min(1,dp(n,axis)));
 const perpendicular=n.map((x,i)=>add(x,-mul(axis[i],mu)));
 const oneMinus=mu>0?div(dp(perpendicular,perpendicular),add(1,mu)):add(1,-mu);
 const k=div(1,add(g,m)),invD=add(mul(g,oneMinus),mul(mu,k));
 const D=div(1,Math.max(invD,1e-20));
 const ray=normalize(perpendicular.map((x,i)=>mul(add(x,mul(axis[i],add(k,-mul(g,oneMinus)))),D)));
 return {ray,logD:Math.log2(D)};
}

// Candidate data path ONLY: project the camera ray onto a boost frame on CPU
// before upload, preserving small transverse coordinates. The local boost is
// rounded in Float32, then rotated to catalogue axes. No production shader uses it.
function frameCandidate(n,axis,side,g,m){
 const cross=[axis[1]*side[2]-axis[2]*side[1],axis[2]*side[0]-axis[0]*side[2],axis[0]*side[1]-axis[1]*side[0]];
 const local=[dot(n,side),dot(n,cross),dot(n,axis)].map(f);
 const result=shaderAlgebra(local,[0,0,1],f(g),f(m),f);
 return {ray:unit(axis.map((x,i)=>f(f(f(side[i])*result.ray[0])+f(f(cross[i])*result.ray[1])+f(f(x)*result.ray[2])))),logD:result.logD};
}

const rows=[];
for(const gamma of [1,100,1000,10000,1e6,1e8,1e12])for(const {name,axis,side} of axes)
 for(const theta of [0,.1/gamma,1/gamma,10/gamma,Math.PI/4,Math.PI/2,Math.PI]){
 const s=theta===Math.PI?0:Math.sin(theta),c=Math.cos(theta);
 const n=axis.map((x,i)=>x*c+side[i]*s),m=Math.sqrt((gamma-1)*(gamma+1)),boost=gamma+m;
 // Independent half-angle reference, evaluated from the intended angle, not
 // from the quantized Cartesian coordinates under investigation.
 const t=theta===Math.PI?Infinity:boost*Math.tan(theta/2);
 const cr=Number.isFinite(t)?(1-t*t)/(1+t*t):-1,sr=Number.isFinite(t)?2*t/(1+t*t):0;
 const expected={ray:axis.map((x,i)=>x*cr+side[i]*sr),logD:theta===Math.PI?-Math.log2(boost):Math.log2(boost*(1+Math.tan(theta/2)**2)/(1+t*t))};
 const stages={float64:shaderAlgebra(n,axis,gamma,m),
  uploadOnly:shaderAlgebra(n.map(f),axis.map(f),f(gamma),f(m)),
  roundedArithmetic:shaderAlgebra(n.map(f),axis.map(f),f(gamma),f(m),f),
  frameCandidate:frameCandidate(n,axis,side,gamma,m)};
 const errors=Object.fromEntries(Object.entries(stages).map(([key,value])=>{
  assert(value.ray.every(Number.isFinite)&&Number.isFinite(value.logD),`${key}: non-finite`);
  const rayError=distance(value.ray,expected.ray),logDError=Math.abs(value.logD-expected.logD);
  return [key,{rayError,logDError,withinTolerance:rayError<limits.ray&&logDError<limits.logD}];
 }));
 rows.push({gamma,axis:name,theta,uploadedDirection:n.map(f),...errors});
}
// An exact information-loss witness: distinct intended rays become identical
// uniforms. No rearrangement downstream can recover which one was intended.
const collision=rows.filter(r=>r.axis==='oblique'&&r.gamma===1e8&&r.theta<=1e-8);
assert.equal(collision.length,3);
assert.deepEqual(collision[0].uploadedDirection,collision[1].uploadedDirection);
assert.deepEqual(collision[0].uploadedDirection,collision[2].uploadedDirection);
assert(rows.some(r=>!r.uploadOnly.withinTolerance),'Expected upload quantization failure missing');
assert(rows.every(r=>r.frameCandidate.withinTolerance),'Candidate fails the declared numerical grid');
const summary=Object.fromEntries(['float64','uploadOnly','roundedArithmetic','frameCandidate'].map(key=>[key,{
 passed:rows.filter(r=>r[key].withinTolerance).length,
 maxRayError:Math.max(...rows.map(r=>r[key].rayError)),
 maxLogDError:Math.max(...rows.map(r=>r[key].logDError))}]));
const report={scope:'CPU numerical isolation, 98 intended rays; not GPU execution, shader validation, full camera projection, spectral flux or performance',
 sourceCommit:'b614e6e3d8870ce3b7a1a03bc2f05ed7e4fc094d',tolerances:limits,evaluated:rows.length,summary,
 collision:{gamma:1e8,axis:'oblique',theta:collision.map(r=>r.theta),uploadedDirection:collision[0].uploadedDirection},rows};
if(process.argv.includes('--write'))fs.writeFileSync(fileURLToPath(new URL('../validation/reports/observer-precision-isolation-2026-11-17.json',import.meta.url)),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({evaluated:report.evaluated,summary,collision:report.collision},null,2));
