import * as P from './physics.js';
import {intercept,positionAt,velocityAt} from './ephemeris.js';
import {gravitatingMass} from './gravity-field.js';
import {standOff,radiusLy} from './body-data.js';

// The initial momentum is cancelled before calculating a rest-to-rest intercept.
export function stoppingPoint(pos,u){
 return {pos:P.add(pos,P.mul(P.unit(u),P.stopDistance(u))),t:P.norm(u)/P.G1,tau:Math.asinh(P.norm(u))/P.G1};
}
export function destinationRoute(goal,pos,t,cap=1){
 const makePlan=d=>P.plan(d,cap);
 if(goal.object&&!goal.offset)return intercept(goal.object,pos,t,makePlan,standOff(goal.object));
 let end=goal.end,plan=makePlan(P.norm(P.sub(end,pos)));
 if(goal.object)for(let i=0;i<16;i++){
  end=P.add(positionAt(goal.object,t+plan.t),goal.offset);
  plan=makePlan(P.norm(P.sub(end,pos)));
 }
 return {end,plan};
}
export function journeyEstimate(goal,pos,u,t,cap=1){
 const stop=stoppingPoint(pos,u),route=destinationRoute(goal,stop.pos,t+stop.t,cap);
 return {stop,route,t:stop.t+route.plan.t,tau:stop.tau+route.plan.tau};
}

// Visible approach (cockpit autopilot): braking over the last min(50 radii, half the trip) is played back with a rate that
// follows the remaining coordinate time, rate = remaining / APPROACH_TAU per screen second (the remaining time, hence the
// distance, shrinks geometrically on screen), floored so that the last 30 % of the stand-off braking takes about a second.
export const APPROACH_TAU=3.5;
export function approachSchedule(o,start,end,cap=1){
 const x=Math.min(50*radiusLy(o),P.norm(P.sub(end,start))/2);
 return {window:P.plan(2*x,cap).t/2,floor:.3*P.plan(2*standOff(o),cap).t/2};
}
export const approachRate=(remaining,floor)=>Math.max(floor,remaining/APPROACH_TAU);
// Screen seconds spent in the approach (for tests and documentation): integrates d(remaining)/dt_screen = −rate.
export function approachScreenTime({window,floor}){return APPROACH_TAU*Math.log(Math.max(1,window/(APPROACH_TAU*floor)))+Math.min(window,APPROACH_TAU*floor)/floor;}

// ── Rendezvous (Earth slice, 15 October 2026) ──────────────────────────────────────────────────────────────────────────
// Contract: the ship arrives beside the target, on the side it comes from, AT THE TARGET'S VELOCITY. The plan is the
// usual 1 g rest-to-rest profile, but written in the inertial frame F that moves with the target at the arrival time
// (proper acceleration is frame-independent, so the profile is exact in F). The initial velocity is never discarded:
// if the ship moves relative to F, a simulated 1 g burn first brings it to rest in F (stage "brake"), then the flight leg
// starts. Gravity is not part of the kinematic flight leg (it is integrated during the burn and after the arrival).
export const HOLD_BUDGET=.5;          // fraction of 1 g reserved for station-keeping at the arrival point
export const CLEARANCE=1.5;           // minimum planned distance to a body's centre, in body radii
const COMPACT=new Set(['blackhole','pulsar']);
// Newtonian acceleration GM/r² of a body (ly/yr², c=1), 0 when no mass is known.
export function bodyAcceleration(o,r){const g=gravitatingMass(o);return g&&r>0?g.m/(r*r):0;}
// Arrival distance from the centre: the visual stand-off, pushed out until holding position costs at most HOLD_BUDGET g.
// Compact objects keep their stand-off: no station-keeping is promised there (it would need far more than 1 g).
export function rendezvousDistance(o){const s=standOff(o),g=gravitatingMass(o);if(!g||COMPACT.has(o.type))return s;return Math.max(s,Math.sqrt(g.m/(HOLD_BUDGET*P.G1)));}
export const holdPossible=(o,r)=>!COMPACT.has(o.type)&&bodyAcceleration(o,r)<=P.G1;
// Flight leg in F: from rest at xs (F time ts) to rest at the rendezvous point, the target's worldline being boosted into
// F. Fixed point on the catalogue time at which the target is met.
export function frameRoute(goal,F,xs,ts,cap=1){
 const o=goal.object,dist=goal.offset?0:rendezvousDistance(o);let tK=P.fromFrame(F,ts,xs).t,end=[...xs],plan=P.plan(0,cap);
 for(let k=0;k<30;k++){
  const T=P.toFrame(F,tK,positionAt(o,tK)),off=goal.offset?goal.offset:P.mul(P.unit(P.sub(xs,T.x)),dist);
  end=P.add(T.x,off);plan=P.plan(P.norm(P.sub(end,xs)),cap);
  const next=tK+(ts+plan.t-T.t)/(F.g*(1-P.dot(F.b,velocityAt(o,tK)))),done=Math.abs(next-tK)<=1e-14*Math.max(1,Math.abs(tK));tK=next;if(done)break;
 }
 return {end,plan,tTarget:tK};
}
// Burn to rest in F from the 4-velocity up (F coordinates, starting at the F origin).
export function frameStop(up){const m=P.norm(up);return {x:m>1e-300?P.mul(P.unit(up),P.stopDistance(up)):[0,0,0],t:m/P.G1,tau:Math.asinh(m)/P.G1,u:[...up]};}
// Complete estimate from the current state: frame F (origin = the current event), matching burn, flight leg, arrival.
export function rendezvousEstimate(goal,pos,u,t,cap=1){
 const o=goal.object;let V=velocityAt(o,t),F,stop,route;
 for(let k=0;k<16;k++){
  F=P.frame(t,pos,V);stop=frameStop(P.uToFrame(F,u));route=frameRoute(goal,F,stop.x,stop.t,cap);
  const V2=velocityAt(o,route.tTarget);if(P.norm(P.sub(V2,V))<1e-17)break;V=V2;
 }
 const arrival=P.fromFrame(F,stop.t+route.plan.t,route.end);
 return {F,stop,route,arrival,t:arrival.t-t,tau:stop.tau+route.plan.tau,targetVelocity:velocityAt(o,route.tTarget)};
}
// Planned worldline (catalogue events) of an estimate: burn then flight leg, n samples, denser at the start where the
// ship is still close to the body it leaves.
export function plannedPath(est,n=160){
 const {F,stop,route}=est,total=stop.t+route.plan.t,dir=P.unit(P.sub(route.end,stop.x)),e=P.norm(stop.u)>1e-300?P.mul(P.unit(stop.u),-P.G1):[0,0,0],out=[];
 for(let i=0;i<=n;i++){const s=total*(i/n)**2;let x;
  if(s<stop.t)x=P.integrateProper([0,0,0],stop.u,s,e).pos;else x=P.add(stop.x,P.mul(dir,P.sample(route.plan,s-stop.t).x));
  out.push(P.fromFrame(F,s,x));}
 return out;
}
// Closest planned approach to a body (in its radii) while the ship is within 60 radii of it.
export function clearance(body,path){const R=radiusLy(body);let best=Infinity,at=null;for(const e of path){const d=P.norm(P.sub(e.x,positionAt(body,e.t)))/R;if(d<best){best=d;at=e;}if(d>60&&best<60)break;}return {min:best,at};}
// Lateral departure point: same distance from the body, perpendicular to the planned motion d, on the ship's side.
export function sidestep(body,pos,t,d){const r0=P.sub(pos,positionAt(body,t)),n=P.unit(d);let p=P.sub(r0,P.mul(n,P.dot(r0,n)));
 if(P.norm(p)<1e-6*P.norm(r0)){p=Math.abs(n[0])<.9?[1,0,0]:[0,1,0];p=P.sub(p,P.mul(n,P.dot(p,n)));}
 return P.mul(P.unit(p),P.norm(r0));}
// Execution helpers shared by the cockpit and the tests (same code path).
// Flight leg from rest in F at the catalogue event (t, pos).
export function flightLeg(goal,F,t,pos,cap=1){const e=P.toFrame(F,t,pos),r=frameRoute(goal,F,e.x,e.t,cap),delta=P.sub(r.end,e.x);return {F,ts:e.t,start:e.x,end:r.end,dir:P.unit(delta),plan:r.plan,elapsed:0};}
// State on the flight leg after `elapsed` F-years: catalogue event, 4-velocity, proper time since the leg started.
export function flightState(a,elapsed){const s=P.sample(a.plan,elapsed),ev=P.fromFrame(a.F,a.ts+elapsed,P.add(a.start,P.mul(a.dir,s.x)));return {t:ev.t,pos:ev.x,u:elapsed>=a.plan.t?[...a.F.u]:P.uFromFrame(a.F,P.mul(a.dir,s.u)),tau:s.tau,phase:s.phase};}
// Flat-space burn to rest in F for up to dt F-years: exact (integrated in F, boosted back).
export function brakeStep(F,t,pos,u,dt){const e=P.toFrame(F,t,pos),up=P.uToFrame(F,u),stop=P.norm(up)/P.G1,dtF=Math.min(dt,stop),res=P.integrateProper(e.x,up,dtF,P.mul(P.unit(up),-P.G1)),ev=P.fromFrame(F,e.t+dtF,res.pos),done=dtF>=stop;return {t:ev.t,pos:ev.x,u:done?[...F.u]:P.uFromFrame(F,res.u),tau:res.tau,done};}
