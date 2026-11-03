// Independent 1-D validation bench, NOT the cockpit autopilot. c=1 ly/year; a dimensionless.
import {MPC_KM,JULIAN_YEAR_SECONDS} from './flrw.js';
export const G_PER_YEAR=9.80665*JULIAN_YEAR_SECONDS/299792458;
export const hubblePerYear=h=>h*JULIAN_YEAR_SECONDS/MPC_KM;
function quad(f,l,r){
 if(l===r)return 0;const m=(l+r)/2,fl=f(l),fm=f(m),fr=f(r),S=(r-l)*(fl+4*fm+fr)/6;
 function split(l,r,fl,fm,fr,S,tol,depth){const m=(l+r)/2,a=(l+m)/2,b=(m+r)/2,fa=f(a),fb=f(b),L=(m-l)*(fl+4*fa+fm)/6,R=(r-m)*(fm+4*fb+fr)/6,d=L+R-S;
  if(!Number.isFinite(L+R))throw Error('Nonfinite clock integral');if(Math.abs(d)<=15*tol)return L+R+d/15;
  if(!depth)throw Error('Clock integration did not converge');return split(l,m,fl,fa,fm,L,tol/2,depth-1)+split(m,r,fm,fb,fr,R,tol/2,depth-1);
 }return split(l,r,fl,fm,fr,S,1e-8*(1+Math.abs(S)),20);
}
export function rocketSegment({durationYears,aStart=1,uStart=0,accelerationG=0,hubble=0}){
 if(![durationYears,aStart,uStart,accelerationG,hubble].every(Number.isFinite)||durationYears<0||durationYears>1e9||aStart<=0||aStart>10||Math.abs(uStart)>1e10||Math.abs(accelerationG)>1||hubble<0||hubble>100)throw Error('Outside rocket benchmark domain');
 const H=hubblePerYear(hubble),A=accelerationG*G_PER_YEAR,B=A-H*uStart;
 const ratio=t=>H===0||t===0?1:-Math.expm1(-H*t)/(H*t||1);
 const momentum=t=>t===0?uStart:uStart+B*t*ratio(t);
 const sample=t=>{if(!Number.isFinite(t)||t<0||t>durationYears)throw Error('Time outside segment');const u=momentum(t),gamma=Math.hypot(1,u),initialGamma=Math.hypot(1,uStart),eta0=Math.asinh(uStart),eta=Math.asinh(u);
  let properYears=0;if(t>0){properYears=Math.abs(u-uStart)<1e-3*(1+Math.abs(uStart))?quad(x=>1/Math.hypot(1,momentum(x)),0,t):quad(y=>1/(A-H*Math.sinh(y)),eta0,eta);}
  return {cosmicYears:t,a:aStart*Math.exp(H*t),u,gamma,beta:u/gamma,oneMinusAbsBeta:1/(gamma*(gamma+Math.abs(u))),deltaComovingLy:t*ratio(t)*(u+uStart)/(gamma+initialGamma)/aStart,properYears};
 };
 return {sample,end:sample(durationYears),H,A};
}
export function oppositeBurnBench({durationYears=20,accelerationG=1,model='minkowski'}={}){
 if(!Number.isFinite(durationYears)||durationYears<0||durationYears>1e9||!['minkowski','de-sitter'].includes(model)||!Number.isFinite(accelerationG)||accelerationG<0)throw Error('Invalid benchmark model or acceleration');
 const hubble=model==='de-sitter'?67.4:0,half=durationYears/2;
 const first=rocketSegment({durationYears:half,accelerationG,hubble}),mid=first.end;
 const second=rocketSegment({durationYears:half,aStart:mid.a,uStart:mid.u,accelerationG:-accelerationG,hubble});
 const points=[];for(let i=0;i<=64;i++){const p=first.sample(half*i/64);points.push({...p,comovingLy:p.deltaComovingLy,phase:1});}
 for(let i=1;i<=64;i++){const p=second.sample(half*i/64);points.push({...p,cosmicYears:half+p.cosmicYears,properYears:mid.properYears+p.properYears,comovingLy:mid.deltaComovingLy+p.deltaComovingLy,phase:2});}
 return {model,hubble,points,end:points.at(-1),scope:'Ideal constant proper acceleration; fixed H only; no target, fuel, mission or rendezvous'};
}
