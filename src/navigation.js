import * as P from './physics.js';
import {intercept,positionAt} from './ephemeris.js';
import {standOff} from './body-data.js';

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
