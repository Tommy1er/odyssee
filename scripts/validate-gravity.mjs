import assert from 'node:assert/strict';
import {startRadial,advanceRadial,gravityReadout} from '../src/gravity.js';
for(const r0 of [4,15,50]){
 const s=startRadial(r0);let count=0;
 while(!s.stopped&&count++<10000){advanceRadial(s,.2);assert.ok(s.r>=1.05&&s.r<=r0);assert.ok(s.tau<=s.t);assert.ok(Math.abs(s.w*s.w+1-1/s.r-s.E*s.E)<3e-5,'conserved geodesic energy');assert.ok(Math.abs(s.w/s.E)<1);}
 assert.ok(s.stopped,'near-horizon boundary reached');
 // Analytic proper fall time from finite rest radius to final r.
 const theta=Math.acos(Math.sqrt(s.r/r0)),tau=Math.pow(r0,1.5)*(theta+Math.sin(theta)*Math.cos(theta));
 assert.ok(Math.abs(s.tau-tau)/tau<1e-5,'analytic proper fall time');
}
const a=gravityReadout(4,1000),b=gravityReadout(4,10000);
assert.ok(Math.abs(a.lapse-Math.sqrt(.75))<1e-12);
assert.ok(Math.abs(a.tidalG/b.tidalG-100)<1e-10,'tidal scaling with mass at fixed r/Rs');
assert.ok(Math.abs(a.hoverG/b.hoverG-10)<1e-10);
console.log('PASS Schwarzschild radial energy, analytic proper fall time, subluminal local speed, horizon boundary, lapse and mass scaling.');
