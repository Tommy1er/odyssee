import * as P from './physics.js';
import {intercept,positionAt} from './ephemeris.js';
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
