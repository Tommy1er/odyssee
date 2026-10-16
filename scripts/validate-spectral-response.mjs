// Analytic fixtures validate the integrator, not the fidelity of any galaxy spectrum.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {curve,bandResponse,relativeBandResponse} from '../src/spectral-response.js';
import {prepare,readCurve} from './prepare-galaxy-spectra.mjs';
let n=0;const check=(s,fn)=>{fn();console.log('PASS '+s);n++;};
const near=(a,b)=>assert(Math.abs(a/b-1)<1e-10,`${a} != ${b}`);
const flat=curve([100,2000],[2,2]), band=curve([400,500,600],[0,1,0]);
check('Triangular energy passband has exact analytic integral',()=>near(bandResponse(flat,band).value,200));
check('Photon response uses wavelength weighting and hc',()=>near(bandResponse(flat,band,1,'photon').value,200*500/1.9864458571489286e-9));
check('Reference unchanged at D = D_sun, including non-unit D_sun',()=>{for(const D of [.8,1,1.2])near(relativeBandResponse(flat,band,D,D).ratio,1);});
check('Template normalization cancels from the relative response',()=>near(relativeBandResponse(curve([100,2000],[2e18,2e18]),band,1.3).ratio,relativeBandResponse(flat,band,1.3).ratio));
check('Flat F_lambda shape responds as D in a fixed energy band',()=>near(relativeBandResponse(flat,band,1.5).ratio,1.5));
check('Piecewise linear source times response integrates exactly',()=>near(bandResponse(curve([100,2000],[100,2000]),band).value,50000));
const line=curve([100,499,500,501,2000],[0,0,1,0,0]);
check('A narrow line survives a coarsely sampled broad band',()=>near(bandResponse(line,curve([300,700],[1,1])).value,1));
check('Wavelength redistribution preserves the total line integral',()=>{for(const D of [.8,1,1.2])near(bandResponse(line,curve([300,700],[1,1]),D).value,1);});
check('Line moves into red and blue passbands at the expected wavelengths',()=>{
 const red=curve([620,630],[1,1]),blue=curve([410,420],[1,1]);
 near(bandResponse(line,red,.8).value,1);near(bandResponse(line,blue,1.2).value,1);assert.equal(bandResponse(line,red,1).value,0);
});
check('Out-of-coverage and zero-reference flux are explicit, never fabricated',()=>{
 assert.equal(bandResponse(flat,band,10).reason,'outside-spectral-coverage');
 assert.equal(relativeBandResponse(line,curve([700,800],[1,1]),1).reason,'zero-reference-flux');
});
check('Invalid grids, values and conventions are rejected',()=>{
 for(const c of [()=>curve([1,1],[2,3]),()=>curve([1,2],[0,NaN]),()=>curve([1,2],[-1,2]),()=>bandResponse(flat,band,0),()=>bandResponse(flat,band,1,'unknown')])assert.throws(c);
});
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'odyssee-sed-test-'));
try {
 const provenance={sourceURL:'https://example.org/analytic-test-only',publication:'Analytic fixture, not observed data',license:'Test fixture'};
 fs.writeFileSync(path.join(tmp,'sed.txt'),'1000 0.2\n20000 0.2\n');
 fs.writeFileSync(path.join(tmp,'band.txt'),'400 0\n500 1\n600 0\n');
 const spec={...provenance,id:'fixture',file:'sed.txt',wavelengthUnit:'angstrom'};
 const response={...provenance,id:'triangle',file:'band.txt',wavelengthUnit:'nm',weighting:'energy'};
 check('Angstrom F_lambda converts to nm with the inverse density factor',()=>{const s=readCurve(spec,tmp,true);assert.deepEqual(s.data,flat);assert.equal(s.provenance.sha256.length,64);});
 check('Preparation retains coverage failures, provenance and uncalibrated status',()=>{
   const r=prepare({spectra:[spec],bands:[response],doppler:[1,10]},tmp);
   near(r.responses[0].bands[0].values[0].ratio,1);assert(!r.responses[0].bands[0].values[1].ok);assert.equal(r.spectra[0].publication,provenance.publication);
   assert.equal(r.status,'offline-preparation-not-renderer-calibration');
 });
 check('Missing provenance and duplicate spectrum IDs are rejected',()=>{
   assert.throws(()=>readCurve({...spec,publication:''},tmp,true));
   assert.throws(()=>prepare({spectra:[spec,spec],bands:[response],doppler:[1]},tmp));
 });
} finally {fs.rmSync(tmp,{recursive:true,force:true});}
console.log(JSON.stringify({passed:n,mode:'analytic spectral fixtures; no galaxy template validation claimed'}));
