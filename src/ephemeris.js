import {G,massKg,cross} from './orbits.js';
import {YEAR} from './physics.js';
import {add,sub,mul,dot,norm,unit} from './physics.js';
import {s2Position} from './environments.js';
import {GAL_CENTER} from './galaxy.js';
export const EPOCH=2026.75;
function offsetAt(o,t){const angle=2*Math.PI*((t*YEAR)%o.orbitSeconds)/o.orbitSeconds,c=Math.cos(angle),s=Math.sin(angle),n=o.orbitNormal,p=o.orbitOffset;return add(add(mul(p,c),mul(cross(n,p),s)),mul(n,dot(n,p)*(1-c)));}
export function velocityAt(o,t){if(o.orbitSeconds)return add(velocityAt(o.parentBody,t),mul(cross(o.orbitNormal,offsetAt(o,t)),2*Math.PI*YEAR/o.orbitSeconds));return o.motion||[0,0,0];}
export function positionAt(o,t){if(o.orbitSeconds)return add(positionAt(o.parentBody,t),offsetAt(o,t));if(o.id==='s2')return s2Position(t,GAL_CENTER);return add(o.baseXYZ||o.xyz,mul(o.motion||[0,0,0],t));}
// Exact past light cone for linear worldlines, in flat spacetime, c=1.
export function received(o,observer,t){if(o.id==='s2'||o.orbitSeconds){let delay=norm(sub(positionAt(o,t),observer));for(let k=0;k<12;k++)delay=norm(sub(positionAt(o,t-delay),observer));return {xyz:positionAt(o,t-delay),delay};}
 const v=o.motion||[0,0,0],r=sub(positionAt(o,t),observer),rv=dot(r,v),r2=dot(r,r),a=1-dot(v,v),root=Math.sqrt(rv*rv+a*r2),delay=rv>=0?r2/(root+rv||1):(root-rv)/a;return {xyz:sub(add(observer,r),mul(v,delay)),delay};}
export function initEphemeris(objects,motion){const byId=new Map(objects.map(o=>[o.id,o]));for(const o of objects){const m=motion.stars[o.id];o.motion=m?.velocity||o.motion||[0,0,0];o.motionStatus=m?(m.radialKnown?'HYG · vitesse 3D cataloguée':'HYG · vitesse radiale absente ou nulle'):(o.motionSource||'Vitesse inconnue · position conservée');o.baseXYZ=m?add(o.xyz,mul(o.motion,EPOCH-m.epoch)):[...o.xyz];}
 for(const o of objects)if(o.parent){const parent=byId.get(o.parent);if(parent){o.baseXYZ=add(parent.baseXYZ,sub(o.xyz,parent.xyz));o.motion=parent.motion;o.parentBody=parent;o.orbitOffset=sub(o.xyz,parent.xyz);const refNormal=unit([0,-.397777,.917482]),radial=unit(o.orbitOffset);o.orbitNormal=unit(sub(refNormal,mul(radial,dot(refNormal,radial))));const m=massKg(parent),a=norm(o.orbitOffset)*9.4607304725808e15;
 o.orbitSeconds=o.planet?.periodDays?o.planet.periodDays*86400:(m&&a>0?2*Math.PI*Math.sqrt(a*a*a/(G*m)):0);o.motionStatus=o.orbitSeconds?'Orbite circulaire animée ; période de référence, plan et phase illustratifs':'Translation du système parent ; période orbitale inconnue';}}
}
let lastObjects,lastKey;
export function updateEphemeris(objects,s){const key=[s.t,...s.pos,s.retarded].join("|");if(lastObjects===objects&&lastKey===key)return;lastObjects=objects;lastKey=key;for(const o of objects){o.xyz=positionAt(o,s.t);o.d=norm(o.xyz);const light=received(o,s.pos,s.t);o.lightXYZ=s.retarded?light.xyz:o.xyz;o.lightDelay=light.delay;}}
export function intercept(o,pos,t,makePlan,standOff){let end=positionAt(o,t),p;for(let k=0;k<12;k++){const r=sub(pos,end),l=norm(r)||1;end=add(positionAt(o,t+(p?.t||0)),mul(r,standOff/l));p=makePlan(norm(sub(end,pos)));}return {end,plan:p};}
