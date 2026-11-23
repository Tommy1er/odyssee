import assert from 'node:assert/strict';
import {pulsarLightCurve,pulsarObservers,pulsarMagneticAxis,PULSAR_PERIODS} from '../src/compact-objects.js';
import fs from 'node:fs';
import {traceSchwarzschild} from '../src/black-hole.js';
import {s2Position,s2Precession,s2PericentreTime} from '../src/environments.js';
import {norm,sub,AU,aberrate,unit} from '../src/physics.js';
import {GAL_CENTER,galactocentric,fromGalactocentric} from '../src/galaxy.js';
const checks=[];function check(name,p){assert.ok(p,name);checks.push(name)}
for(const b of [2,2.4,2.55,2.65,3,5]){let r=15,psi=Math.PI-Math.asin(b*Math.sqrt(1-1/r)/r),ray=traceSchwarzschild(r,psi);check('Schwarzschild impact '+b+' Rs: '+(b<Math.sqrt(27)/2?'capture':'escape'),ray.captured===(b<Math.sqrt(27)/2)&&!ray.unresolved)}
for(const p of [[0,0,0],[1000,-27000,50000],GAL_CENTER]){check('Galactocentric invertible '+p,norm(sub(fromGalactocentric(galactocentric(p)),p))<1e-4)}
const n=unit([.4,.7,-.6]),v=[.3,-.2,.9];check('Aberration reversible',norm(sub(aberrate(aberrate(n,v),v.map(x=>-x)),n))<1e-10);
for(const beta of [0,.5,.99]){const r=[2,5,9],vel=[beta,0,0],rv=r[0]*beta,r2=norm(r)**2,ct=-r2/(Math.sqrt(rv*rv+(1-beta*beta)*r2)+rv);check('Retarded photon light cone '+beta,Math.abs(ct*ct-((r[0]+beta*ct)**2+r[1]**2+r[2]**2))<1e-9);check('Retarded emission is past '+beta,ct<0)}
const a=Math.cbrt(4.297e6*256)*AU;check('S2 Kepler periapsis',Math.abs(norm(sub(s2Position(-8.37,GAL_CENTER),GAL_CENTER))-a*(1-.884))<1e-9);{// Démonstrateur pulsar : signal reçu par deux observateurs lointains, calculé avec la géométrie du faisceau du rendu.
 const o=pulsarObservers();
 for(const [id,P] of Object.entries(PULSAR_PERIODS)){const a=pulsarLightCurve(P,o.swept,{periods:6,samples:24000}),b=pulsarLightCurve(P,o.off,{periods:6,samples:24000});
  check(`Pulsar ${id} : l'observateur balayé reçoit une impulsion par rotation, intervalle = période (${(P*1000).toFixed(1)} ms)`,a.pulses.length>=5&&Math.abs(a.interval-P)<P/2000);
  check(`Pulsar ${id} : l'observateur à 5° de l'axe de rotation, hors du cône balayé, ne reçoit pas d'impulsion`,b.pulses.length===0&&b.peak<1e-3);}
 check('Pulsar : axe magnétique incliné d\'environ 40° sur l\'axe de rotation',Math.abs(o.inclinationDeg-40.3)<.5);
 check('Pulsar : l\'axe magnétique revient à l\'identique après une rotation',Math.max(...pulsarMagneticAxis(0).map((x,i)=>Math.abs(x-pulsarMagneticAxis(2*Math.PI)[i])))<1e-12);}
check('S2 periodic closure',norm(sub(s2Position(0,GAL_CENTER),s2Position(16,GAL_CENTER)))<1e-9);
{// Précession relativiste de S2 (option d'essai) : Kepler reste le témoin ; deux péricentres successifs sont tournés de Δφ = 6πGM/(c²a(1−e²)).
 const dir=(t,gr)=>{const v=sub(s2Position(t,GAL_CENTER,gr),GAL_CENTER),n=norm(v);return v.map(x=>x/n);},ang=(u,v)=>Math.acos(Math.min(1,u.reduce((s,x,i)=>s+x*v[i],0)));
 const dphi=s2Precession(),arcmin=dphi*180/Math.PI*60;
 check('S2 : précession de Schwarzschild prédite entre 11′ et 13′ par révolution (GRAVITY 2020 : 12′, f_SP = 1,10 ± 0,19)',arcmin>11&&arcmin<13);
 check('S2 Kepler (témoin) : même direction du péricentre à deux passages',ang(dir(s2PericentreTime(0),false),dir(s2PericentreTime(1),false))<1e-9);
 check('S2 relativiste : le péricentre avance de Δφ en une révolution',Math.abs(ang(dir(s2PericentreTime(0),true),dir(s2PericentreTime(1),true))-dphi)<1e-6*dphi+1e-12);
 check('S2 relativiste : même distance au péricentre que Kepler',Math.abs(norm(sub(s2Position(s2PericentreTime(1),GAL_CENTER,true),GAL_CENTER))-a*(1-.884))<1e-9);
 console.log(`S2 : Δφ = ${arcmin.toFixed(2)}′ par révolution`);}
const lut=JSON.parse(fs.readFileSync('public/assets/blackbody-lut.json'));check('CIE derived thermal table finite',lut.length===2048&&lut.every(Number.isFinite));
const original=JSON.parse(fs.readFileSync('public/catalogue.json')).stars,extra=JSON.parse(fs.readFileSync('public/galaxy-catalogue.json')).stars;check('Observed expansion coordinate integrity',extra.length===18486&&extra.every(o=>o.xyz.length===3&&o.xyz.every(Number.isFinite)&&Math.abs(norm(o.xyz)-o.d)<1e-6));check('Internal IDs unique',new Set([...original,...extra].map(o=>o.id)).size===original.length+extra.length);
fs.writeFileSync('validation/optics-results.json',JSON.stringify({passed:checks.length,checks},null,2));console.log(JSON.stringify({passed:checks.length,checks}));
