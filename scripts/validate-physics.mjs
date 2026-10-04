import assert from 'node:assert/strict';
import * as P from '../src/physics.js';
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}`);
close(P.gamma(.99),7.088812050083354);
for(const d of [0,1e-10,1e-5,4.246,100,10000]){
 const route=P.plan(d,.99),end=P.sample(route,route.t);close(end.x,d,1e-9);close(end.u,0);close(end.tau,route.tau);assert.ok(route.tau<=route.t+1e-8);assert.ok(route.b<=.99+1e-12);
 let start=P.sample(route,route.ta-1e-7),after=P.sample(route,route.ta+1e-7);assert.ok(after.x>=start.x);if(d>100)close(route.b,.99);
}
const u=[2,1,-.5],pos=[20,30,40],dt=2;const coast=P.integrate(pos,u,dt);close(coast.tau,dt/P.gammaU(u));P.sub(coast.pos,pos).forEach((x,i)=>close(x,P.velocity(u)[i]*dt));assert.deepEqual(coast.u,u);
const full=P.integrate([0,0,0],[0,0,0],2,[P.G1,0,0]);const half=P.integrate([0,0,0],[0,0,0],1,[P.G1,0,0]);const second=P.integrate(half.pos,half.u,1,[P.G1,0,0]);close(full.pos[0],second.pos[0]);close(full.tau,half.tau+second.tau);
const capped=P.integrate([0,0,0],[0,0,0],100,[P.G1,0,0],.99);close(P.norm(P.velocity(capped.u)),.99);assert.ok(capped.tau<100);
const stopped=P.integrate([0,0,0],u,P.norm(u)/P.G1,P.mul(P.unit(u),-P.G1));close(P.norm(stopped.u),0);close(P.norm(stopped.pos),P.stopDistance(u));
for(const n of [[1,0,0],[0,1,0],[-1,0,0],P.unit([1,2,3])]){const a=P.aberrate(n,[.99,0,0]);close(P.norm(a),1);close(a[0],(n[0]+.99)/(1+.99*n[0]));}
close(P.doppler([1,0,0],[.99,0,0]),14.10673597966588);close(P.doppler([-1,0,0],[.99,0,0]),.0708881205008336);
const p=[4,9,2];P.equatorial(P.galactic(p)).forEach((x,i)=>close(x,p[i],2e-9));close(P.norm(P.ecliptic(p)),P.norm(p));close(P.schwarzschildRadiusKm(1),2.9533393820668783,.00001);close(P.gravitationalRate(4),Math.sqrt(.75));
console.log('PASS: SR clocks, exact acceleration, braking, cap, integration consistency, aberration/Doppler, coordinate rotations, Schwarzschild reference.');

const galactic=P.plan(100000);close(galactic.tau,2*Math.acosh(1+P.G1*50000)/P.G1,1e-10);assert.ok(galactic.b>.999999999&&galactic.tau<23&&galactic.t>100000);
for(const d of [1e-16,1e-10,4.2,10000,100000,1000000]){const p=P.plan(d);const middle=P.sample(p,p.ta),end=P.sample(p,p.t);close(middle.x,d/2,Math.max(1e-20,d*1e-12));close(end.x,d,Math.max(1e-20,d*1e-12));assert.ok(Number.isFinite(p.tau));}
const uncapped=P.integrateProper([0,0,0],[0,0,0],100000,[P.G1,0,0]);assert.ok(P.gammaU(uncapped.u)>100000&&P.betaGap(uncapped.u)>0);close(uncapped.tau,Math.asinh(P.G1*100000)/P.G1);
const side=P.integrateProper([0,0,0],[100,0,0],.00001,[0,P.G1,0]);const F=P.mul(P.sub(side.u,[100,0,0]),1/.00001);close(Math.sqrt(P.gammaU([100,0,0])**2*P.dot(F,F)-P.dot([100,0,0],F)**2),P.G1,1e-10);
const risk=P.environmentRisk([P.gamma(.99)*.99,0,0]);close(risk.grainTNT,130.79,0.01);assert.ok(risk.gasPower>0&&risk.cmbFrontK>38);close(risk.forwardD*risk.rearD,1);
for(const u of [7,10000,1000000]){close(P.norm(P.aberrateU([0,1,0],[u,0,0])),1);assert.ok(Number.isFinite(P.dopplerU([-1,0,0],[u,0,0])));close(P.dopplerU([1,0,0],[u,0,0])*P.dopplerU([-1,0,0],[u,0,0]),1,1e-9);}
console.log('PASS: uncapped galactic trips, tiny distances, high-gamma stability, invariant transverse 1g, grain energy.');
