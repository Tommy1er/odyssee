import {G,massKg,cross} from './orbits.js';
import {YEAR} from './physics.js';
import {add,sub,mul,dot,norm,unit} from './physics.js';
import {s2Position} from './environments.js';
import {GAL_CENTER} from './galaxy.js';
import {heliocentricLy,ephemerisLabel,isSolarKey,yearToJD} from './solar-ephemeris.js';
import {pole,hasIAU} from './iau-rotation.js';
export const EPOCH=2026.75;
// Solar-system bodies with a real ephemeris: "solar:<name>" and the Moon. Other moons keep an animated
// circular orbit in their planet's equatorial plane, with a phase that is explicitly illustrative.
export const ephemerisKey=o=>o.id==='moon:Lune'?'Lune':o.id?.startsWith('solar:')&&isSolarKey(o.id.slice(6))?o.id.slice(6):null;
function offsetAt(o,t){const angle=2*Math.PI*((t*YEAR)%o.orbitSeconds)/o.orbitSeconds,c=Math.cos(angle),s=Math.sin(angle),n=o.orbitNormal,p=o.orbitOffset;return add(add(mul(p,c),mul(cross(n,p),s)),mul(n,dot(n,p)*(1-c)));}
export function velocityAt(o,t){if(o.ephemeris){const h=1e-4;return mul(sub(positionAt(o,t+h),positionAt(o,t-h)),1/(2*h));}if(o.orbitSeconds)return add(velocityAt(o.parentBody,t),mul(cross(o.orbitNormal,offsetAt(o,t)),2*Math.PI*YEAR/o.orbitSeconds));return o.motion||[0,0,0];}
export function positionAt(o,t){if(o.ephemeris)return add(positionAt(o.sun,t),heliocentricLy(o.ephemeris,EPOCH+t));if(o.orbitSeconds)return add(positionAt(o.parentBody,t),offsetAt(o,t));if(o.id==='s2')return s2Position(t,GAL_CENTER);return add(o.baseXYZ||o.xyz,mul(o.motion||[0,0,0],t));}
// Exact past light cone for linear worldlines, in flat spacetime, c=1. Curved worldlines: fixed-point iteration
// on the emission time, so the ephemeris is evaluated at emission, inside its own validity labels.
export function received(o,observer,t){if(o.id==='s2'||o.orbitSeconds||o.ephemeris){let delay=norm(sub(positionAt(o,t),observer));for(let k=0;k<12;k++)delay=norm(sub(positionAt(o,t-delay),observer));return {xyz:positionAt(o,t-delay),delay};}
 const v=o.motion||[0,0,0],r=sub(positionAt(o,t),observer),rv=dot(r,v),r2=dot(r,r),a=1-dot(v,v),root=Math.sqrt(rv*rv+a*r2),delay=rv>=0?r2/(root+rv||1):(root-rv)/a;return {xyz:sub(add(observer,r),mul(v,delay)),delay};}
export function initEphemeris(objects,motion){const byId=new Map(objects.map(o=>[o.id,o]));for(const o of objects){const m=motion.stars[o.id];o.motion=m?.velocity||o.motion||[0,0,0];o.motionStatus=m?(m.radialKnown?'HYG · vitesse 3D cataloguée':'HYG · vitesse radiale absente ou nulle'):(o.motionSource||'Vitesse inconnue · position conservée');o.baseXYZ=m?add(o.xyz,mul(o.motion,EPOCH-m.epoch)):[...o.xyz];}
 const sun=byId.get('h0'),jd0=yearToJD(EPOCH);
 for(const o of objects)if(o.parent){const parent=byId.get(o.parent);if(parent){o.baseXYZ=add(parent.baseXYZ,sub(o.xyz,parent.xyz));o.motion=parent.motion;o.parentBody=parent;
  const key=sun&&ephemerisKey(o);if(key){o.ephemeris=key;o.sun=sun;o.orbitSeconds=0;continue;}
  o.orbitOffset=sub(o.xyz,parent.xyz);const parentKey=ephemerisKey(parent);let refNormal=unit([0,-.397777,.917482]);
  // Regular moons orbit close to their planet's equator; Triton is retrograde (inclination ≈157°).
  if(o.type==='moon'&&parentKey&&hasIAU(parentKey)){refNormal=pole(parentKey,jd0);if(o.name==='Triton')refNormal=mul(refNormal,-1);}
  const radial=unit(o.orbitOffset);o.orbitNormal=unit(sub(refNormal,mul(radial,dot(refNormal,radial))));
  if(o.type==='moon'&&parentKey){const inPlane=unit(sub(radial,mul(refNormal,dot(radial,refNormal))));o.orbitNormal=refNormal;o.orbitOffset=mul(inPlane,norm(o.orbitOffset));}
  const m=massKg(parent),a=norm(o.orbitOffset)*9.4607304725808e15;
  o.orbitSeconds=o.planet?.periodDays?o.planet.periodDays*86400:(m&&a>0?2*Math.PI*Math.sqrt(a*a*a/(G*m)):0);o.motionStatus=o.orbitSeconds?(o.type==='moon'?'Orbite circulaire dans le plan équatorial de la planète ; période calculée, phase illustrative (pas une éphéméride)':'Orbite circulaire animée ; période de référence, plan et phase illustratifs'):'Translation du système parent ; période orbitale inconnue';}}
}
let lastObjects,lastKey,lastLabelYear;
export function updateEphemeris(objects,s){const key=[s.t,...s.pos,s.retarded].join("|");if(lastObjects===objects&&lastKey===key)return;lastObjects=objects;lastKey=key;const year=EPOCH+s.t,labels=Math.abs(year-(lastLabelYear??-1e9))>0.5;if(labels)lastLabelYear=year;
 for(const o of objects){o.xyz=positionAt(o,s.t);o.d=norm(o.xyz);const light=received(o,s.pos,s.t);o.lightXYZ=s.retarded?light.xyz:o.xyz;o.lightDelay=light.delay;if(o.ephemeris&&labels){const l=ephemerisLabel(o.ephemeris,year);o.motionStatus=l.label;o.ephemerisIllustrative=!!l.illustrative;}}}
export function intercept(o,pos,t,makePlan,standOff){let end=positionAt(o,t),p;for(let k=0;k<12;k++){const r=sub(pos,end),l=norm(r)||1;end=add(positionAt(o,t+(p?.t||0)),mul(r,standOff/l));p=makePlan(norm(sub(end,pos)));}return {end,plan:p};}
