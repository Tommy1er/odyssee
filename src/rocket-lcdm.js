// Independent flat matter+Lambda bench. No target solver or cockpit coupling.
import {FLRW_PLANCK_2018} from './flrw.js';
import {G_PER_YEAR,hubblePerYear} from './rocket-bench.js';
const nodes=[.1834346424956498,.525532409916329,.7966664774136267,.9602898564975363],weights=[.362683783378362,.3137066458778873,.2223810344533745,.1012285362903763];
export function lcdmRocketSegment({durationYears,aStart=1,uStart=0,accelerationG=0,parameters=FLRW_PLANCK_2018,accuracy=1}){
 const {H0,omegaM:m,omegaLambda:l}=parameters;
 if(![durationYears,aStart,uStart,accelerationG,H0,m,l,accuracy].every(Number.isFinite)||durationYears<0||durationYears>1e9||aStart<1/3||aStart>2||Math.abs(uStart)>1e10||Math.abs(accelerationG)>1||H0<0||H0>100||m<0||l<0||Math.abs(m+l-1)>1e-12||accuracy<.01||accuracy>10)throw Error('Outside LCDM rocket benchmark domain');
 const H=hubblePerYear(H0),A=accelerationG*G_PER_YEAR,cache=new Map();let evaluations=0,precisionLimited=0,timeResolutionYears=0;
 const scale=t=>{if(H===0)return aStart;if(m===0)return aStart*Math.exp(H*t);if(l===0)return (aStart**1.5+1.5*H*t)**(2/3);return (Math.sqrt(m/l)*Math.sinh(Math.asinh(Math.sqrt(l/m)*aStart**1.5)+1.5*H*Math.sqrt(l)*t))**(2/3);};
 // Eight-point Gaussian quadrature of a(t); very smooth over the bounded <=1 Gyr interval.
 const between=(lo,hi)=>{let sum=0;const mid=(lo+hi)/2,half=(hi-lo)/2;for(let i=0;i<4;i++)sum+=weights[i]*(scale(mid-half*nodes[i])+scale(mid+half*nodes[i]));return half*sum;};
 const integralScale=t=>between(0,t);
 const numerator=t=>aStart*uStart+A*integralScale(t);
 const state=t=>{if(cache.has(t))return cache.get(t);if(++evaluations>200000)throw Error('LCDM integration work limit exceeded');const a=scale(t),u=(stop!==null?A*between(stop,t):numerator(t))/a,gamma=Math.hypot(1,u),p={cosmicYears:t,a,u,gamma,beta:u/gamma,oneMinusAbsBeta:1/(gamma*(gamma+Math.abs(u)))};if(cache.size<50000)cache.set(t,p);return p;};
 // Momentum numerator is monotone for constant signed A: at most one local stop.
 let stop=null;if(A&&numerator(0)!==0&&numerator(0)*numerator(durationYears)<=0){let lo=0,hi=durationYears;for(let i=0;i<80;i++){const mid=(lo+hi)/2;if(mid===lo||mid===hi)break;if(Math.sign(numerator(mid))===Math.sign(numerator(lo)))lo=mid;else hi=mid;}stop=numerator(durationYears)===0?durationYears:(lo+hi)/2;}
 const rates=t=>{const p=state(t);return [p.beta/p.a,1/p.gamma];};
 function integrate(lo,hi){if(lo===hi)return [0,0];const mid=(lo+hi)/2,fl=rates(lo),fm=rates(mid),fr=rates(hi),S=fl.map((v,i)=>(hi-lo)*(v+4*fm[i]+fr[i])/6),rough=fm.map(v=>Math.abs(v*(hi-lo))),tol=[accuracy*(1e-6+1e-10*rough[0]),accuracy*(1e-6+1e-9*rough[1])];
  function split(lo,hi,fl,fm,fr,S,tol,depth){const mid=(lo+hi)/2,fa=rates((lo+mid)/2),fb=rates((mid+hi)/2),L=fl.map((v,i)=>(mid-lo)*(v+4*fa[i]+fm[i])/6),R=fm.map((v,i)=>(hi-mid)*(v+4*fb[i]+fr[i])/6),d=L.map((v,i)=>v+R[i]-S[i]);
   if(!L.concat(R).every(Number.isFinite))throw Error('Nonfinite LCDM integral');const floor=8*Number.EPSILON*Math.max(1,Math.abs(lo),Math.abs(hi)),limited=!d.every((v,i)=>Math.abs(v)<=15*tol[i]);if(d.every((v,i)=>Math.abs(v)<=15*(tol[i]+floor*Math.max(Math.abs(fl[i]),Math.abs(fm[i]),Math.abs(fr[i]),Math.abs(fa[i]),Math.abs(fb[i]))))){if(limited){precisionLimited++;timeResolutionYears=Math.max(timeResolutionYears,floor);}return L.map((v,i)=>v+R[i]+d[i]/15);}
   if(!depth)throw Error('LCDM position/clock integration did not converge');const a=split(lo,mid,fl,fa,fm,L,tol.map(v=>v/2),depth-1),b=split(mid,hi,fm,fb,fr,R,tol.map(v=>v/2),depth-1);return a.map((v,i)=>v+b[i]);
  }return split(lo,hi,fl,fm,fr,S,tol,50);
 }
 const advance=(from,to)=>{if(![from,to].every(Number.isFinite)||from<0||to<from||to>durationYears)throw Error('Time outside LCDM segment');let q;if(stop!==null&&stop>from&&stop<to){const a=integrate(from,stop),b=integrate(stop,to);q=a.map((v,i)=>v+b[i]);}else q=integrate(from,to);return {...state(to),deltaComovingLy:q[0],properYears:q[1]};};
 return {advance,sample:t=>advance(0,t),end:advance(0,durationYears),evaluations:()=>evaluations,precision:()=>({limitedLeaves:precisionLimited,timeResolutionYears})};
}
export function oppositeLCDMBench({durationYears=20,accelerationG=1,parameters=FLRW_PLANCK_2018,accuracy=1}={}){
 if(!Number.isFinite(durationYears)||durationYears<0||durationYears>1e9||!Number.isFinite(accelerationG)||accelerationG<0)throw Error('Invalid LCDM benchmark input');
 const half=durationYears/2,first=lcdmRocketSegment({durationYears:half,accelerationG,parameters,accuracy}),mid=first.end,second=lcdmRocketSegment({durationYears:half,aStart:mid.a,uStart:mid.u,accelerationG:-accelerationG,parameters,accuracy});
 const points=[{...first.sample(0),comovingLy:0,phase:1}];let x=0,tau=0;
 for(const [segment,offset,phase] of [[first,0,1],[second,half,2]])for(let i=1;i<=64;i++){const p=segment.advance(half*(i-1)/64,half*i/64);x+=p.deltaComovingLy;tau+=p.properYears;points.push({...p,cosmicYears:offset+p.cosmicYears,properYears:tau,comovingLy:x,phase});}
 return {model:'flat-LCDM',points,end:points.at(-1),parameters:{...parameters},evaluations:first.evaluations()+second.evaluations(),precision:{limitedLeaves:first.precision().limitedLeaves+second.precision().limitedLeaves,timeResolutionYears:Math.max(first.precision().timeResolutionYears,second.precision().timeResolutionYears)},scope:'Flat homogeneous matter+Lambda, ideal prescribed thrust; no target or rendezvous'};
}
