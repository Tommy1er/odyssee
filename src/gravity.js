// Schwarzschild exterior, radial timelike geodesic. Units r=Rs, t=tau=Rs/c.
// Separate controlled experiment: no claim of a general galactic GR propagator.
import {C} from './physics.js';
export function gravityReadout(r,rsMeters,span=10,beta=0){
 const f=1-1/r,lapse=Math.sqrt(Math.max(0,f));
 return {r,lapse,clockRate:lapse*Math.sqrt(Math.max(0,1-beta*beta)),infinityBlue:1/lapse,
  hoverG:C*C/(2*rsMeters*r*r*lapse)/9.80665,
  tidalG:C*C*span/(rsMeters*rsMeters*r*r*r)/9.80665,
  photonSphere:1.5,isco:3};
}
export function startRadial(r){if(!(r>1.05))throw Error('Rayon hors domaine');return {r,w:0,E:Math.sqrt(1-1/r),t:0,tau:0,stopped:false};}
function derivative(y,E){const r=y[0],f=1-1/r;return [f*y[1]/E,-f/(2*r*r*E),f/E];}
export function advanceRadial(s,delta){
 let left=Math.max(0,delta),count=0;
 while(left>1e-12&&!s.stopped&&count++<20000){
  const h=Math.min(left,.025*Math.max(1,s.r)),y=[s.r,s.w,s.tau],a=derivative(y,s.E),b=derivative(y.map((v,i)=>v+h*a[i]/2),s.E),c=derivative(y.map((v,i)=>v+h*b[i]/2),s.E),d=derivative(y.map((v,i)=>v+h*c[i]),s.E);
  const next=y.map((v,i)=>v+h*(a[i]+2*b[i]+2*c[i]+d[i])/6);
  if(next[0]<=1.05){const frac=(s.r-1.05)/(s.r-next[0]);s.r=1.05;s.w+=frac*(next[1]-s.w);s.tau+=frac*(next[2]-s.tau);s.t+=h*frac;s.stopped=true;break;}
  [s.r,s.w,s.tau]=next;s.t+=h;left-=h;
 }
 return s;
}
