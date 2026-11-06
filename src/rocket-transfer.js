// Rest-to-rest radial transfer to a comoving test marker; no bound-structure or fuel model.
import {FLRW_PLANCK_2018} from './flrw.js';
import {G_PER_YEAR,hubblePerYear} from './rocket-bench.js';
const N=[.1834346424956498,.525532409916329,.7966664774136267,.9602898564975363],W=[.362683783378362,.3137066458778873,.2223810344533745,.1012285362903763];
export function transferBackground(parameters=FLRW_PLANCK_2018){
 const {H0,omegaM:m,omegaLambda:l}=parameters;
 if(![H0,m,l].every(Number.isFinite)||H0<0||H0>100||m<0||l<0||Math.abs(m+l-1)>1e-12)throw Error('Paramètres cosmologiques invalides');
 const H=hubblePerYear(H0),a=t=>H===0?1:m===0?Math.exp(H*t):l===0?(1+1.5*H*t)**(2/3):(Math.sqrt(m/l)*Math.sinh(Math.asinh(Math.sqrt(l/m))+1.5*H*Math.sqrt(l)*t))**(2/3);
 // Duration is separate from origin: keep short intervals near a very late arrival representable.
 const area=(origin,duration)=>{let sum=0;for(let i=0;i<4;i++)sum+=W[i]*(a(origin+duration*(1-N[i])/2)+a(origin+duration*(1+N[i])/2));return duration*sum/2;};
 return {a,area};
}
function integrate(f,end,accuracy,stats){
 if(end===0)return [0,0];let work=0;const a=f(0),b=f(end/2),c=f(end),S=a.map((v,i)=>end*(v+4*b[i]+c[i])/6),tol=S.map(v=>accuracy*(1e-7+2e-11*Math.abs(v)));
 function split(lo,hi,a,b,c,S,tol,depth){stats.subdivisions++;if(++work>150000)throw Error('Limite de travail numérique atteinte');const mid=(lo+hi)/2,d=f((lo+mid)/2),e=f((mid+hi)/2),L=a.map((v,i)=>(mid-lo)*(v+4*d[i]+b[i])/6),R=b.map((v,i)=>(hi-mid)*(v+4*e[i]+c[i])/6),delta=L.map((v,i)=>v+R[i]-S[i]);if(delta.every((v,i)=>Math.abs(v)<=15*tol[i]))return L.map((v,i)=>v+R[i]+delta[i]/15);if(!depth)throw Error('Intégration non convergente');const x=split(lo,mid,a,d,b,L,tol.map(v=>v/2),depth-1),y=split(mid,hi,b,e,c,R,tol.map(v=>v/2),depth-1);return x.map((v,i)=>v+y[i]);}
 return split(0,end,a,b,c,S,tol,40);
}
export function restTransferAtTime({durationYears,accelerationG=1,parameters=FLRW_PLANCK_2018,accuracy=1}={}){
 if(!Number.isFinite(durationYears)||durationYears<0||durationYears>1e9||!Number.isFinite(accelerationG)||accelerationG<=0||accelerationG>1||!Number.isFinite(accuracy)||accuracy<.01||accuracy>10)throw Error('Domaine : 0–1 milliard d’années, poussée > 0 et ≤ 1 g');
 const bg=transferBackground(parameters),T=durationYears,A=accelerationG*G_PER_YEAR,stats={subdivisions:0};
 let lo=0,hi=T;for(let i=0;i<64;i++){const m=(lo+hi)/2;if(m===lo||m===hi)break;if(bg.area(0,m)<bg.area(m,T-m))lo=m;else hi=m;}
 const turn=(lo+hi)/2,k=1/A;
 const state=(t,phase=t<=turn?1:2)=>{const remaining=T-t,a=bg.a(t),u=A*(phase===1?bg.area(0,t):bg.area(t,remaining))/a,gamma=Math.hypot(1,u);return {cosmicYears:t,a,u,gamma,beta:u/gamma,oneMinusAbsBeta:1/(gamma*(gamma+u)),phase};};
 // Logarithmic time from rest at each endpoint resolves the short clock-dominant regions even at huge gamma.
 function leg(q,phase){const z=Math.log1p(q/k);return integrate(s=>{const r=k*Math.expm1(s),t=phase===1?r:T-r,a=bg.a(t),u=A*(phase===1?bg.area(0,r):bg.area(t,r))/a,g=Math.hypot(1,u),jac=k*Math.exp(s);return [jac*u/(a*g),jac/g];},z,accuracy,stats);}
 const left=leg(turn,1),right=leg(T-turn,2),distance=left[0]+right[0],proper=left[1]+right[1];
 const end={...state(T,2),comovingLy:distance,properYears:proper};
 const sample=t=>{if(!Number.isFinite(t)||t<0||t>T)throw Error('Époque hors trajet');if(t===T)return {...end};if(t<=turn){const q=leg(t,1);return {...state(t,1),comovingLy:q[0],properYears:q[1]};}const q=leg(T-t,2);return {...state(t,2),comovingLy:distance-q[0],properYears:proper-q[1]};};
 return {durationYears:T,turnYears:turn,accelerationG,parameters:{...parameters},end,sample,momentumMismatch:A*(bg.area(0,turn)-bg.area(turn,T-turn))/bg.a(turn),evaluations:()=>stats.subdivisions};
}
export function solveComovingTransfer({distanceLy,accelerationG=1,parameters=FLRW_PLANCK_2018,accuracy=1}={}){
 if(!Number.isFinite(distanceLy)||distanceLy<0||distanceLy>1e9)throw Error('Distance comobile : 0 à 1 milliard d’années-lumière');
 const options={accelerationG,parameters,accuracy},limit=restTransferAtTime({...options,durationYears:1e9}),toleranceLy=Math.max(1e-12,2e-10*distanceLy);
 if(distanceLy>limit.end.comovingLy+toleranceLy)return {reachable:false,reason:'Hors du domaine de calcul de 1 milliard d’années ; cela ne démontre pas une impossibilité physique.',maxDistanceLy:limit.end.comovingLy};
 if(distanceLy===0){const r=restTransferAtTime({...options,durationYears:0});return {...r,reachable:true,distanceLy,positionResidualLy:0,toleranceLy};}
 let lo=0,hi=1e9,r=limit;for(let i=0;i<80;i++){const T=(lo+hi)/2;r=restTransferAtTime({...options,durationYears:T});const error=r.end.comovingLy-distanceLy;if(Math.abs(error)<=toleranceLy)break;if(error<0)lo=T;else hi=T;if(i===79)throw Error('Recherche d’arrivée non convergente');}
 return {...r,reachable:true,distanceLy,positionResidualLy:r.end.comovingLy-distanceLy,toleranceLy};
}
