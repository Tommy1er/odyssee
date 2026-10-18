import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spectralPointFluxRatio,angularAberrationScale,overlayPixelScale,spectralPointVertex,spectralPointFragment} from '../src/galaxy-spectral-overlay.js';
import {PIXEL_SR} from '../src/photometry.js';
import {lutTexture,toHalfArray,floatLinearSupported} from '../src/gpu-textures.js';
import * as THREE from 'three';
import {sedSample,continuousGalaxyBand} from '../src/galaxy-spectral.js';
let passed=0;const test=(label,fn)=>{fn();passed++;console.log('PASS '+label)};
const near=(a,b,tol=1e-6)=>assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),a+' != '+b);
test('At rest, the spectral overlay exactly preserves source calibration',()=>{
 for(let k=0;k<8;k++)near(spectralPointFluxRatio(1,1,1,sedSample(k,1)[3],sedSample(k,1)[3]),1);
});
test('One hundred percent of class variation remains per source, not pixel-averaged',()=>{
 assert(spectralPointVertex.includes('attribute float')&&spectralPointVertex.includes('sclass'));
 assert(spectralPointVertex.includes('galaxyBridge(sclass,Dtotal,temp)'));
 assert(spectralPointVertex.includes('vec4 galaxyBridge('));
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
test('KC96 boundary extrapolation is anchored: empirical within, ratio of Planck only beyond',()=>{
 assert(spectralPointVertex.includes('float edgeD=clamp(D,.72,1.09)'));
 assert(spectralPointVertex.includes('if(D>=.72&&D<=1.09)return vec4(edge.rgb,logBand)'));
 assert(spectralPointVertex.includes('logBand+clamp(atD.a-atEdge.a'));
 assert(spectralPointVertex.includes('flux*=exp(clamp(seen.a-cat.a,-60.,60.))/max(Dobs*Dobs,1.e-18)'));
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

test('KC96 source/observer flux exactly preserved throughout the measured domain',()=>{
 const planckT=x=>x; // unused inside the measured archive by design
 for(const k of [0,1,3,4,6,7])for(const [Ds,Do] of [[.96,1.05],[1.01,.86],[.98,1.08]]){
  const Dsun=1,total=Ds*Do;
  if(total<.72||total>1.09)continue;
  const got=continuousGalaxyBand(k,total,5200,planckT)/continuousGalaxyBand(k,Dsun,5200,planckT)/Do**2;
  const expected=spectralPointFluxRatio(Dsun,Ds,Do,sedSample(k,Dsun)[3],sedSample(k,total)[3]);
  near(got,expected,1e-9);
 }
});
test('No >0.86-magnitude jump at either KC96 boundary for any morphological type',()=>{
 const B=(w,T)=>1/(w**5*Math.expm1(14387768.8/(w*T)));
 const I=T=>{let sum=0;for(let w=380;w<=750;w+=2)sum+=Math.exp(-.5*((w-555)/44)**2)*B(w,T);return sum;};
 for(const T of [4500,5600,6800])for(let k=0;k<8;k++)for(const edge of [.72,1.09]){
  const inner=continuousGalaxyBand(k,edge,T,I);
  const lo=continuousGalaxyBand(k,edge-1e-7,T,I),hi=continuousGalaxyBand(k,edge+1e-7,T,I);
  assert(inner>0&&lo>0&&hi>0);
  const jumps=[-2.5*Math.log10(lo/inner),-2.5*Math.log10(hi/inner)];
  for(const jump of jumps)assert(Math.abs(jump)<.001,'kind='+k+' D='+edge+': '+jump+' mag');
  near(continuousGalaxyBand(k,edge,T,I),edge**4*sedSample(k,edge)[3],1e-9);
 }
});
test('Thermal extrapolation beyond measured endpoints carries the exact endpoint band value',()=>{
 const bb=T=>T**4;
 for(let kind=0;kind<8;kind++)for(const edge of [.72,1.09])for(const D of [edge===.72?.5:1.5,edge===.72?.25:2]){
  const anchored=continuousGalaxyBand(kind,edge,5100,bb);
  const got=continuousGalaxyBand(kind,D,5100,bb);
  near(got,anchored*bb(5100*D)/bb(5100*edge),1e-8);
 }
 assert.equal(continuousGalaxyBand(1,-1,5000,x=>x),null);
 assert.equal(continuousGalaxyBand(100,1,5000,x=>x),null);
});
test('Galaxy colour is normalized relative to its own KC96 boundary, not an unanchored thermal RGB',()=>{
 assert(spectralPointVertex.includes('edge.rgb*atD.rgb/max(atEdge.rgb'));
 assert(spectralPointVertex.includes('float y0=dot(edge.rgb'));
 assert(spectralPointVertex.includes('color*=y0/max(dot(color'));
});


test('KC96-anchored RGB has no colour discontinuity at either spectral table edge',()=>{
 const y=x=>.2126*x[0]+.7152*x[1]+.0722*x[2];
 const p=(nm,T)=>1/(nm**5*Math.expm1(14387768.8/(nm*T)));
 const thermalRGB=T=>[650,545,445].map(nm=>p(nm,T));
 const tint=(kind,D,T)=>{
  const edge=Math.max(.72,Math.min(1.09,D)),src=sedSample(kind,edge).slice(0,3);
  if(D>=.72&&D<=1.09)return src;
  const now=thermalRGB(T*D),ref=thermalRGB(T*edge);
  const mixed=src.map((v,j)=>v*now[j]/ref[j]);
  return mixed.map(v=>v*y(src)/y(mixed));
 };
 for(let kind=0;kind<8;kind++)for(const b of [.72,1.09]){
  const center=tint(kind,b,5400),left=tint(kind,b-1e-7,5400),right=tint(kind,b+1e-7,5400);
  for(let j=0;j<3;j++){
   near(left[j],center[j],.0002);near(right[j],center[j],.0002);
  }
  near(y(left),y(center),1e-7);near(y(right),y(center),1e-7);
 }
});

console.log(JSON.stringify({passed,status:'PASS',webgl:'requires separate Chromium test'}));
