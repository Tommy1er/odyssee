// Local weak-field two-body dynamics, SI units, velocity Verlet.
// Gravity curves trajectories; a conservative encounter cannot capture an unbound orbit.
import {C,LY,norm,add,sub,mul,dot,unit} from './physics.js';
export const G=6.67430e-11;
const SOLAR={'solar:Mercure':3.3011e23,'solar:Vénus':4.8675e24,'solar:Terre':5.9722e24,'solar:Mars':6.4171e23,'solar:Jupiter':1.8982e27,'solar:Saturne':5.6834e26,'solar:Uranus':8.681e25,'solar:Neptune':1.02413e26,'moon:Lune':7.342e22,'moon:Io':8.932e22,'moon:Europe':4.8e22,'moon:Ganymède':1.4819e23,'moon:Titan':1.3452e23,'moon:Encelade':1.0802e20,'moon:Triton':2.139e22,h0:1.98847e30};
export function massKg(o){return o&&(SOLAR[o.id]||o.massSolar*1.98847e30||o.planet?.massEarth*5.9722e24)||0;}
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export function orbitalElements(r,v,mu){const R=norm(r),V=norm(v),h=cross(r,v),energy=V*V/2-mu/R,ecc=norm(sub(mul(cross(v,h),1/mu),unit(r))),a=energy<0?-mu/(2*energy):Infinity;return {radius:R,speed:V,radial:dot(r,v)/R,energy,ecc,a,period:energy<0?2*Math.PI*Math.sqrt(a*a*a/mu):Infinity,periapsis:dot(h,h)/(mu*(1+ecc)),circular:Math.sqrt(mu/R),escape:Math.sqrt(2*mu/R),bound:energy<0};}
export function createOrbit(id,r,v,mu,surface){return {id,r:[...r],v:[...v],mu,surface,t:0,tau:0,distance:0,assist:false,normal:unit(cross(r,v)),stopped:false,history:[[...r]]};}
export function advanceOrbit(o,dt,force=[0,0,0]){let left=Math.max(0,dt),n=0;while(left>1e-8&&!o.stopped&&n++<10000){const R=norm(o.r),dyn=Math.sqrt(R**3/o.mu),h=Math.min(left,dyn*.005,Math.max(.001,R/Math.max(norm(o.v),1)*.01),o.assist?2:Infinity);let thrust=force;
 if(o.assist){const desired=mul(unit(cross(o.normal,o.r)),Math.sqrt(o.mu/R)),delta=sub(desired,o.v);if(norm(delta)<Math.max(.2,norm(desired)*.0005)){o.assist=false;thrust=[0,0,0];}else thrust=mul(delta,Math.min(9.80665/norm(delta),1/Math.max(5,dyn*.002)));}
 o.thrust=[...thrust];
 const gravity=r=>mul(r,-o.mu/norm(r)**3),a=add(gravity(o.r),thrust),vhalf=add(o.v,mul(a,h/2)),next=add(o.r,mul(vhalf,h)),v=add(vhalf,mul(add(gravity(next),thrust),h/2));
 const lapse=Math.sqrt(Math.max(0,1-2*o.mu/(R*C*C))),beta=norm(o.v)/C;
 o.distance+=norm(sub(next,o.r));o.r=next;o.v=v;o.t+=h;o.tau+=h*lapse*Math.sqrt(Math.max(0,1-beta*beta));left-=h;
 if(norm(o.r)<=o.surface){o.stopped=true;o.stopReason='Surface atteinte';}
 if(norm(o.v)>=.01*C){o.stopped=true;o.stopReason='Limite du modèle orbital : 0,01 c';}
 }
 if(norm(sub(o.r,o.history.at(-1)))>o.surface*.03){o.history.push([...o.r]);if(o.history.length>3000)o.history.shift();}
 return o;}
export function orbitAllowed(body,relative){const m=massKg(body),r=norm(relative)*LY;if(!m||['galaxy','nebula','cluster','pillars'].includes(body.type))return false;return r>100*(2*G*m/(C*C));}
