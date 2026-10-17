import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spectralCoverage,galaxySpectralObservation,emitterDoppler,V_BAND_NM} from '../src/relativistic-galaxy-observation.js';
import {SED_PROVENANCE} from '../src/galaxy-sed-kc96-data.js';
let n=0;function check(label,fn){fn();console.log('PASS '+label);n++;}
const near=(x,y,t=1e-9)=>assert(Math.abs(x-y)<t,`${x} != ${y}`);
check('Rest galaxy uses a measured K96 SED inside the precomputed LUT',()=>{
 const o={type:'galaxy',xyz:[1e6,0,0],lightXYZ:[1e6,0,0],motion:[0,0,0],galaxyClass:'Sbc'};
 const v=galaxySpectralObservation(o,[0,0,0],[0,0,0]);
 near(v.totalD,1);near(v.sourceD,1);near(v.observerD,1);
 assert(v.sample.every(x=>Number.isFinite(x)));assert.equal(v.status,'tabulated');
});
check('Moving galaxy emitter has correct source-direction Doppler independently',()=>{
 const v=[.1,0,0];near(emitterDoppler(v,[-1,0,0]),Math.sqrt(.99)/1.1);
 near(emitterDoppler(v,[1,0,0]),Math.sqrt(.99)/.9);
});
const beta=.99,gamma=1/Math.sqrt(1-beta*beta),u=gamma*beta;
const galaxy=x=>({type:'galaxy',xyz:[x,0,0],lightXYZ:[x,0,0],motion:[0,0,0],galaxyClass:'E'});
check('0.99c ahead: infrared galaxy rest photons > 5 micrometres, outside K96',()=>{
 const v=galaxySpectralObservation(galaxy(1e6),[0,0,0],[u,0,0]);
 near(v.observerD,gamma*(1+beta),1e-12);
 assert(v.restNm[0]>6500&&v.restNm[1]>9800);
 assert.equal(v.coverageWidth,0);assert.equal(v.status,'unobserved');assert.equal(v.sample,null);
});
check('0.99c astern: far-UV/EUV rest photons < 100 nm, outside K96',()=>{
 const v=galaxySpectralObservation(galaxy(-1e6),[0,0,0],[u,0,0]);
 near(v.observerD,gamma*(1-beta),1e-11);
 assert(v.restNm[1]<60);assert.equal(v.status,'unobserved');
});
check('Moderate observer motion within K96 LUT is tabulated',()=>{
 const v=galaxySpectralObservation(galaxy(1e6),[0,0,0],[.05,0,0]);
 assert(v.status==='tabulated');assert(v.sample!==null);
});
check('Raw archive may cover a band beyond the narrower precomputed shader LUT',()=>{
 const v=spectralCoverage(0,1.2);
 assert(v.coverageWidth===1);assert.equal(v.status,'archive-outside-lut');
});
check('Partially covered band is NOT claimed to have calibrated colour',()=>{
 const v=spectralCoverage(0,1.7);
 assert(v.coverageWidth>0&&v.coverageWidth<1);assert.equal(v.status,'partial');assert.equal(v.sample,null);
});
check('Morphological template wavelength supports are not assumed identical',()=>{
 const sc=SED_PROVENANCE.spectra[4];assert(sc.rangeNm[1]<800);
 assert(spectralCoverage(4,1.2).status==='partial');
});
check('No fictitious spectral data outside atlas or invalid sources',()=>{
 assert.equal(spectralCoverage(0,-1),null);
 assert.equal(emitterDoppler([1,0,0],[-1,0,0]),null);
 assert.equal(galaxySpectralObservation({type:'star',xyz:[1,0,0]},[0,0,0],[0,0,0]),null);
});
check('Observation module and cockpit do not modify either ship or galaxy worldline',()=>{
 const o=galaxy(1e6),pos=[0,0,0],U=[u,0,0],prior=JSON.stringify([o,pos,U]);
 galaxySpectralObservation(o,pos,U);assert.equal(JSON.stringify([o,pos,U]),prior);
 const cockpit=fs.readFileSync(new URL('../src/cockpit.js',import.meta.url),'utf8');
 assert(cockpit.includes('galaxySpectralObservation(o,state.pos,state.u)'));
});
console.log(JSON.stringify({passed:n,status:'PASS',note:'coverage diagnostic, not yet a high-speed spectral shader'}));
