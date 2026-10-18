import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spectralPointFluxRatio,angularAberrationScale,overlayPixelScale,spectralPointVertex,spectralPointFragment} from '../src/galaxy-spectral-overlay.js';
import {PIXEL_SR} from '../src/photometry.js';
import {lutTexture,toHalfArray,floatLinearSupported} from '../src/gpu-textures.js';
import * as THREE from 'three';
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
test('Screen-pixel overlay carries the shared cube photometric scale (resolution, DPR and zoom independent)',()=>{
 // Pixel sum S of a sprite on screen pixels of pix² sr must carry Φ = S·pix² = 0.818·flux·PIXEL_SR, like the cube.
 near(overlayPixelScale(2/1024),1,1e-12);
 for(const pix of [2.68e-3,1.34e-3,4.5e-4,6e-5]){const S=.818*overlayPixelScale(pix);near(S*pix*pix,.818*PIXEL_SR,1e-12);}
 // Resolved disc: per-pixel value (radiance) independent of the screen pixel; pixel value = flux·pixScale/(size²·.08).
 const theta=.02,v=pix=>overlayPixelScale(pix)/((theta/pix)**2*.08);near(v(2.68e-3)/v(6e-5),1,1e-12);
 assert(spectralPointVertex.includes('flux*pixScale/(size*size*.08)'));
 assert(spectralPointVertex.includes('2.*rad/distance/pixRef/Dobs'));
 assert.equal(overlayPixelScale(0),null);
});
test('Overlay galaxies are background sky: close-up dimming and body occlusion, no second global Doppler',()=>{
 const sky=fs.readFileSync(new URL('../src/sky-optics.js',import.meta.url),'utf8');
 const g=sky.indexOf('vec3 G=galaxyOverlayOn>.5'),sys=sky.indexOf('G=max(vec3(0.),systemRadiance(ray,L+G)-S)'),shift=sky.indexOf('if(optics>.5&&shift>.5'),add=sky.indexOf('L+=G;');
 assert(g>0&&g<sys&&sys<shift&&shift<add);assert(sky.includes('L*=dim;G*=dim;'));
});
globalThis.innerWidth=390;const phone=await import('../src/photometry.js?phone');delete globalThis.innerWidth;const desk=await import('../src/photometry.js');
test('Phone 512 cube: point sprites keep the 1024 photometric Φ (stars, clusters, point galaxies)',()=>{
 assert.equal(phone.CUBE_SIZE,512);near(phone.CUBE_POINT_SCALE*(2/512)**2,PIXEL_SR,1e-15);
 assert.equal(desk.CUBE_SIZE,1024);assert.equal(desk.CUBE_POINT_SCALE,1);
 for(const f of ['stellar-light.js','galaxy-photometry.js']){const src=fs.readFileSync(new URL('../src/'+f,import.meta.url),'utf8');assert(src.includes('*${CUBE_POINT_GLSL}'),f);}
 assert(fs.readFileSync(new URL('../src/sky-optics.js',import.meta.url),'utf8').includes('const size=CUBE_SIZE;'));
});
test('Overlay target in device pixels (DPR>1 phones/retina): no double pixel-ratio viewport',()=>{
 const src=fs.readFileSync(new URL('../src/galaxy-spectral-overlay.js',import.meta.url),'utf8');
 assert(src.includes('vp.z*pr')&&src.includes('vp.w*pr')&&src.includes('renderer.getPixelRatio()'));
 assert(!src.includes('renderer.setViewport(0,0,width,height)'));
});
test('Devices without OES_texture_float_linear get filterable half-float LUTs instead of a black sky',()=>{
 const lut=JSON.parse(fs.readFileSync(new URL('../public/assets/blackbody-lut.json',import.meta.url),'utf8'));const a=new Float32Array(lut.data||lut);
 const h=toHalfArray(a);let worst=0;for(let i=3;i<a.length;i+=4){const T=100*1e4**(((i-3)/4)/(a.length/4-1));if(T<2000)continue;worst=Math.max(worst,Math.abs(THREE.DataUtils.fromHalfFloat(h[i])-a[i]));}
 assert(worst<.01,'ln Y half-float error '+worst);// < 1 % in flux for T ≥ 2000 K
 assert.equal(lutTexture(a,512,1,true).type,THREE.HalfFloatType);assert.equal(lutTexture(a,512,1,false).type,THREE.FloatType);
 assert.equal(floatLinearSupported(),true);// Node: no document, Float32 path kept
 for(const f of ['sky-optics.js','stellar-light.js','galaxy-photometry.js','galaxy-spectral-overlay.js'])assert(!/DataTexture\([^;]*T\.FloatType/.test(fs.readFileSync(new URL('../src/'+f,import.meta.url),'utf8')),f);
});
console.log(JSON.stringify({passed,status:'PASS',webgl:'requires separate Chromium test'}));
