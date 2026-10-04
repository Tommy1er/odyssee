import assert from 'node:assert/strict';
import {received,intercept,positionAt,initEphemeris,updateEphemeris} from '../src/ephemeris.js';
import * as P from '../src/physics.js';
import fs from 'node:fs';
for(const v of [[0,0,0],[.1,.2,0],[-.9,0,0],[.99,0,0]]){const o={baseXYZ:[10,5,2],motion:v},eye=[2,1,0],t=40;const r=received(o,eye,t);assert.ok(r.delay>=0);assert.ok(Math.abs(P.norm(P.sub(positionAt(o,t-r.delay),eye))-r.delay)<1e-9);}
const o={baseXYZ:[100,20,10],motion:[.0001,.0005,.0003]};const hit=intercept(o,[0,0,0],0,P.plan,.0001);assert.ok(Math.abs(P.norm(P.sub(positionAt(o,hit.plan.t),hit.end))-.0001)<1e-9);
const stars=JSON.parse(fs.readFileSync('public/catalogue.json')).stars,motion=JSON.parse(fs.readFileSync('public/motion.json'));initEphemeris(stars,motion);let p=stars.find(x=>x.id==='h70666');assert.ok(P.norm(p.motion)>0&&p.motionStatus.includes('HYG'));const before=[...p.baseXYZ];updateEphemeris(stars,{t:20000,pos:[0,0,0],retarded:true});assert.ok(P.norm(P.sub(p.xyz,before))>1);assert.ok(P.norm(P.sub(p.xyz,p.lightXYZ))>0);
const voyager=JSON.parse(fs.readFileSync('public/voyager.json'));assert.ok(P.norm(voyager.xyz)/P.AU>150&&P.norm(voyager.motion)*P.C/1000>16);
console.log('PASS: past light cones, future interception, HYG motion, Voyager JPL vectors');
