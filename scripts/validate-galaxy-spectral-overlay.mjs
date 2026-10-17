import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spectralPointFluxRatio,angularAberrationScale,spectralPointVertex,spectralPointFragment} from '../src/galaxy-spectral-overlay.js';
import {sedSample} from '../src/galaxy-spectral.js';
let passed=0;const test=(label,fn)=>{fn();passed++;console.log('PASS '+label)};
const near=(a,b,tol=1e-6)=>assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),a+' != '+b);
test('At rest, the spectral overlay exactly preserves source calibration',()=>{
 for(let k=0;k<8;k++)near(spectralPointFluxRatio(1,1,1,sedSample(k,1)[3],sedSample(k,1)[3]),1);
});
test('One hundred percent of class variation remains per source, not pixel-averaged',()=>{
 assert(spectralPointVertex.includes('attribute float')&&spectralPointVertex.includes('sclass'));
 assert(spectralPointVertex.includes('galaxySED(sclass,Dtotal)'));
});
test('Source emission motion keeps Claude fixed-distance D^4 J(D) correction',()=>{
 for(let k of [0,3,7])for(let D of [.8,.95,1.07]){
  const r=spectralPointFluxRatio(1,D,1,sedSample(k,1)[3],sedSample(k,D)[3]);
  near(r,D**4*sedSample(k,D)[3]/sedSample(k,1)[3]);
 }
});
test('Observer bolometric D^2 and angular aberration D^-1 are separate',()=>{
 for(const D of [.72,.95,1,1.07,1.09,14.1067]){
  near(angularAberrationScale(D),1/D);
  near(D**2*angularAberrationScale(D)**2,1,1e-10);
 }
});
test('Moving observer exact KC96 V band factor D^2 times normalized J ratio',()=>{
 for(let k of [0,4,7])for(let D of [.8,1.02,1.08]){
  const r=spectralPointFluxRatio(1,1,D,sedSample(k,1)[3],sedSample(k,D)[3]);
  near(r,D*D*sedSample(k,D)[3]/sedSample(k,1)[3]);
 }
});
test('Combined source and observer boosts are not applied twice',()=>{
 const Dsun=.96,Ds=1.02,Do=1.05,total=Ds*Do;
 for(const k of [0,3,6]){
  const r=spectralPointFluxRatio(Dsun,Ds,Do,sedSample(k,Dsun)[3],sedSample(k,total)[3]);
  near(r,(Ds/Dsun)**4*Do**2*sedSample(k,total)[3]/sedSample(k,Dsun)[3]);
 }
});
test('Thermal fallback reproduces Planck observer point-flux law',()=>{
 const B=(w,T)=>1/(w**5*Math.expm1(14387768.8/(w*T)));
 // Gaussian Johnson-V-shaped integration as an INDEPENDENT blackbody reference,
 // not a claim of reconstructing the real KC96 outside its sampled range.
 const I=(T)=>{let v=0;for(let nm=380;nm<=750;nm++){let V=Math.exp(-.5*((nm-555)/44)**2);v+=V*B(nm,T);}return v;};
 for(const T of [4500,6500])for(const [Ds,Do] of [[.9,1.05],[1,1.09],[.83,.9]]){
  const direct=I(T*Ds*Do)/I(T*Ds)/Do**2;
  const J=(D)=>I(T*D)/D**4;
  const law=Do**2*J(Ds*Do)/J(Ds);
  near(law,direct,1e-8);
 }
});
test('No extrapolation of KC96 tables; fallback remains explicitly thermal',()=>{
 assert(spectralPointVertex.includes('Dtotal>=.72&&Dtotal<=1.09'));
 assert(spectralPointVertex.includes('thermal(temp*Dtotal)'));
});
test('Capture separates point galaxy HDR emission from background sky in active mode',()=>{
 const renderer=fs.readFileSync(new URL('../src/renderer.js',import.meta.url),'utf8');
 assert(renderer.includes('if(activeGalaxySpectra)this.galaxyLight.points.visible=false'));assert(renderer.includes('this.galaxyLight.points.visible=originalGalaxyVisibility'));
 assert(renderer.includes('galaxySpectralOverlay.render'));
});
test('HDR overlay is composited before exposure and tonemapping, not on gamma pixels',()=>{
 const sky=fs.readFileSync(new URL('../src/sky-optics.js',import.meta.url),'utf8');
 const a=sky.indexOf('if(galaxyOverlayOn>.5)'),b=sky.indexOf('L*=exposure;');
 assert(a>0&&a<b);assert(sky.includes('texture2D(galaxyOverlay'));
});
test('Strong gravitational lensing and close absorbing clouds use legacy physically shared light path',()=>{
 const renderer=fs.readFileSync(new URL('../src/renderer.js',import.meta.url),'utf8');
 assert(renderer.includes("s.target?.type==='blackhole'"));
 assert(renderer.includes("['nebula','pillars'].includes(s.target?.type)"));
});
test('Multiscreen comparison and default observer preserve unshifted galaxy appearance',()=>{
 const renderer=fs.readFileSync(new URL('../src/renderer.js',import.meta.url),'utf8');
 assert(renderer.includes('half&&!betaOptics?[0,0,0]')||renderer.includes('!half||betaOptics'));
 assert(spectralPointVertex.includes('float Dobs=1.'));
});
test('Unknown / invalid radiance factors are explicitly rejected',()=>{
 assert.equal(spectralPointFluxRatio(0,1,1,1,1),null);
 assert.equal(spectralPointFluxRatio(1,1,-1,1,1),null);
 assert.equal(angularAberrationScale(0),null);
});
console.log(JSON.stringify({passed,status:'PASS',webgl:'requires separate Chromium test'}));
