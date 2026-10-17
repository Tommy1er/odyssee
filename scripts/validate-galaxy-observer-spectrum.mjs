import assert from 'node:assert/strict';
import fs from 'node:fs';
import {galaxyObserverSpectrum} from '../src/galaxy-observer-spectrum.js';
import {SED_MIN,SED_MAX,SED_PROVENANCE} from '../src/galaxy-sed-kc96-data.js';
let count=0;function check(name,f){f();count++;console.log('PASS '+name)}
const near=(x,y,eps=1e-10)=>assert(Math.abs(x-y)<=eps*Math.max(1,Math.abs(y)),x+' != '+y);
const G=(x=10,motion=[0,0,0])=>({type:'galaxy',galaxyClass:'E',xyz:[x,0,0],motion});
const v=.99,g=1/Math.sqrt(1-v*v),u=v*g;
check('Rest frame: source and ship Doppler both unity, template available',()=>{
 const x=galaxyObserverSpectrum(G(),[0,0,0],[0,0,0]);near(x.sourceFactor,1);near(x.observerFactor,1);near(x.combinedFactor,1);assert(x.tableCoverage&&x.archiveCoverage);assert(x.templateLinearRgb?.length===3);
});
check('At +0.99c moving TOWARD galaxy, observer blueshift is gamma*(1+beta)',()=>{
 const x=galaxyObserverSpectrum(G(),[0,0,0],[u,0,0]);
 near(x.observerFactor,g*(1+v));near(x.emittedNm[0],380*g*(1+v));near(x.emittedNm[1],700*g*(1+v));
 assert(x.emittedNm[0]>5000);assert(!x.archiveCoverage&&!x.tableCoverage);
 assert.equal(x.status,'out-of-archive');
});
check('At +0.99c with galaxy BEHIND, observer redshift is gamma*(1-beta)',()=>{
 const x=galaxyObserverSpectrum(G(-10),[0,0,0],[u,0,0]);
 near(x.observerFactor,1/(g*(1+v)));near(x.emittedNm[1],700/(g*(1+v)));
 assert(x.emittedNm[1]<60);assert(!x.archiveCoverage);
});
check('At 0.99c TRANSVERSE to galaxy, Dobserver=gamma, also outside K96',()=>{
 const x=galaxyObserverSpectrum(G(),[0,0,0],[0,u,0]);
 near(x.observerFactor,g);assert(!x.archiveCoverage);
});
check('Source recession: source emits fewer photons into fixed observer V band',()=>{
 const x=galaxyObserverSpectrum(G(10,[.1,0,0]));near(x.sourceFactor,Math.sqrt(1-.1*.1)/(1+.1));
 assert(x.sourceFactor<1);
});
check('Source approach: opposite sign, Doppler larger than one',()=>{
 const x=galaxyObserverSpectrum(G(10,[-.1,0,0]));near(x.sourceFactor,Math.sqrt(1-.1*.1)/(1-.1));
 assert(x.sourceFactor>1);
});
check('Source and observer factors multiply, never subtract or double apply',()=>{
 const x=galaxyObserverSpectrum(G(10,[.1,0,0]),[0,0,0],[u,0,0]);
 near(x.combinedFactor,x.sourceFactor*x.observerFactor);
});
check('Raw archive coverage and validated LUT coverage are distinct',()=>{
 const x=galaxyObserverSpectrum(G(),[0,0,0],[.2,0,0]);
 assert(x.archiveCoverage&&!x.tableCoverage);
 assert.equal(x.status,'raw-spectrum-not-integrated');
});
check('Template endpoints follow actual archived class, not invented common cutoffs',()=>{
 for(const k of ['E','S0','Sbc','Scd']){const x=galaxyObserverSpectrum({type:'galaxy',galaxyClass:k,xyz:[10,0,0],motion:[0,0,0]});assert(SED_PROVENANCE.spectra.some(t=>t.id===x.template&&t.rangeNm[0]===x.archivedRangeNm[0]));}
});
check('Observe only galaxy objects with valid positions and subluminal motions',()=>{
 assert.equal(galaxyObserverSpectrum({type:'star',xyz:[1,0,0]}),null);
 assert.equal(galaxyObserverSpectrum(G(0)),null);
 assert.equal(galaxyObserverSpectrum(G(1,[2,0,0])),null);
});
check('No claim that rendering changed from its global approximate RGB thermal transform',()=>{
 const c=fs.readFileSync(new URL('../src/sky-optics.js',import.meta.url),'utf8');
 const a=galaxyObserverSpectrum(G());assert.equal(a.globalMixedSkyUsesEmpiricalSED,false);assert.equal(a.pointTemplateAvailableForRendering,true);
 assert(c.includes('float temp=mix(2800.,16000.'));
});
check('Spectrum diagnostics actually available in cockpit galaxy information',()=>{
 const c=fs.readFileSync(new URL('../src/cockpit.js',import.meta.url),'utf8');
 assert(c.includes('spectralObserverRows(o)'));
 assert(c.includes('galaxyObserverSpectrum(o,state.pos,state.u)'));
});
console.log(JSON.stringify({passed:count,status:'PASS',note:'Relativistic spectrum diagnostic, not rendered spectral colour'}));
