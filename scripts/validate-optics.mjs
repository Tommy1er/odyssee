import assert from 'node:assert/strict';
import fs from 'node:fs';
import {traceSchwarzschild} from '../src/black-hole.js';
import {s2Position} from '../src/environments.js';
import {norm,sub,AU,aberrate,unit} from '../src/physics.js';
import {GAL_CENTER,galactocentric,fromGalactocentric} from '../src/galaxy.js';
const checks=[];function check(name,p){assert.ok(p,name);checks.push(name)}
for(const b of [2,2.4,2.55,2.65,3,5]){let r=15,psi=Math.PI-Math.asin(b*Math.sqrt(1-1/r)/r),ray=traceSchwarzschild(r,psi);check('Schwarzschild impact '+b+' Rs: '+(b<Math.sqrt(27)/2?'capture':'escape'),ray.captured===(b<Math.sqrt(27)/2)&&!ray.unresolved)}
for(const p of [[0,0,0],[1000,-27000,50000],GAL_CENTER]){check('Galactocentric invertible '+p,norm(sub(fromGalactocentric(galactocentric(p)),p))<1e-4)}
const n=unit([.4,.7,-.6]),v=[.3,-.2,.9];check('Aberration reversible',norm(sub(aberrate(aberrate(n,v),v.map(x=>-x)),n))<1e-10);
for(const beta of [0,.5,.99]){const r=[2,5,9],vel=[beta,0,0],rv=r[0]*beta,r2=norm(r)**2,ct=-r2/(Math.sqrt(rv*rv+(1-beta*beta)*r2)+rv);check('Retarded photon light cone '+beta,Math.abs(ct*ct-((r[0]+beta*ct)**2+r[1]**2+r[2]**2))<1e-9);check('Retarded emission is past '+beta,ct<0)}
const a=Math.cbrt(4.297e6*256)*AU;check('S2 Kepler periapsis',Math.abs(norm(sub(s2Position(-8.37,GAL_CENTER),GAL_CENTER))-a*(1-.884))<1e-9);check('S2 periodic closure',norm(sub(s2Position(0,GAL_CENTER),s2Position(16,GAL_CENTER)))<1e-9);
const lut=JSON.parse(fs.readFileSync('public/assets/blackbody-lut.json'));check('CIE derived thermal table finite',lut.length===2048&&lut.every(Number.isFinite));
const original=JSON.parse(fs.readFileSync('public/catalogue.json')).stars,extra=JSON.parse(fs.readFileSync('public/galaxy-catalogue.json')).stars;check('Observed expansion coordinate integrity',extra.length===18486&&extra.every(o=>o.xyz.length===3&&o.xyz.every(Number.isFinite)&&Math.abs(norm(o.xyz)-o.d)<1e-6));check('Internal IDs unique',new Set([...original,...extra].map(o=>o.id)).size===original.length+extra.length);
fs.writeFileSync('validation/optics-results.json',JSON.stringify({passed:checks.length,checks},null,2));console.log(JSON.stringify({passed:checks.length,checks}));
