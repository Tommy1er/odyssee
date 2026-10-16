// Scientific sanity checks of the offline Kinney–Calzetti point/volume colour pipeline.
// Requires only Node and repository sources; no WebGL and no private data.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {galaxySpectra,spectralClassFromT,spectralClassFromObject,sedSample,spectralSourceTint} from '../src/galaxy-spectral.js';
import {SED_PROVENANCE} from '../src/galaxy-sed-kc96-data.js';

let n=0;function check(label,fn){fn();console.log('PASS '+label);n++;}
const lum=a=>.2126*a[0]+.7152*a[1]+.0722*a[2];
check('Eight archived, attributed Kinney-Calzetti morphological SEDs',()=>{
 assert.equal(galaxySpectra.ids.length,8);assert.equal(SED_PROVENANCE.spectra.length,8);
 assert.equal(galaxySpectra.data.length,8*galaxySpectra.samples*4);
 for(const s of SED_PROVENANCE.spectra){assert(s.origin.includes('stsci.edu'));assert.equal(s.mirrorBlobSha1.length,40);}
});
check('All sampled source integrals are finite positive and CIE Y normalised',()=>{
 for(let k=0;k<8;k++)for(let i=0;i<galaxySpectra.samples;i++){
  const p=galaxySpectra.data.slice((k*galaxySpectra.samples+i)*4,(k*galaxySpectra.samples+i+1)*4);
  assert(p.every(x=>Number.isFinite(x)&&x>0));assert(Math.abs(lum(p)-1)<1e-5);
 }
});
check('V filter response unchanged at solar reference (D=1)',()=>{
 for(let k=0;k<8;k++)assert(Math.abs(sedSample(k,1)[3]-1)<.002);
});
check('Red ellipticals and blue late spirals have distinct measured composite colours',()=>{
 assert(sedSample(0,1)[2]<sedSample(4,1)[2]);
 assert(sedSample(0,1)[0]>sedSample(4,1)[0]);
});
check('Source recession reddens old stellar SED, without invented individual spectra',()=>{
 const rest=sedSample(0,1),receding=sedSample(0,.84);
 assert(receding[2]<rest[2]);assert(receding[3]<rest[3]);
});
check('Shifted flux ratio and spectral colour share the same source law',()=>{
 for(const kind of [0,2,3,4,5,6])for(const D of [.84,.97,1,1.04]){
  const rgb=sedSample(kind,D),sun=sedSample(kind,1),now=spectralSourceTint(kind,1,D);
  const amplitude=(rgb[3]/sun[3])/(D*D);
  assert(now.every((x,j)=>Math.abs(x-rgb[j]*amplitude)<1e-9));
 }
});
check('Reference state gives same point and volume colour, CIE luminance one',()=>{
 for(let k=0;k<8;k++){
   const point=sedSample(k,.96),volume=spectralSourceTint(k,.96,.96);
   assert(volume.every((x,j)=>Math.abs(x-point[j])<1e-12));
   assert(Math.abs(lum(volume)-1)<1e-5);
 }
});
check('Magnitude V still anchored; extinction modifies brightness equally in all channels',()=>{
 const a=spectralSourceTint(3,1,1,.5,1),b=spectralSourceTint(3,1,1,.5,0);
 assert(b.every((x,j)=>Math.abs(x/a[j]-10**.2)<1e-12));
});
check('No extrapolation outside instrumentally supported spectral range',()=>{
 assert.equal(sedSample(4,.70),null);assert.equal(sedSample(4,1.10),null);
 assert.equal(spectralSourceTint(4,1,.70),null);
});
check('Unknown types fall back to an explicitly approximate template',()=>{
 assert.equal(spectralClassFromT(NaN),3);
 assert.equal(spectralClassFromT(-5),0);assert.equal(spectralClassFromT(1),2);
 assert.equal(spectralClassFromT(6),4);assert.equal(spectralClassFromObject({galaxyClass:'Ir'}),6);
});
const points=fs.readFileSync(new URL('../src/galaxy-photometry.js',import.meta.url),'utf8');
const volumes=fs.readFileSync(new URL('../src/local-group.js',import.meta.url),'utf8');
const sky=fs.readFileSync(new URL('../src/sky-optics.js',import.meta.url),'utf8');
check('GPU points and 3D volumes use one spectral class law, not two unrelated colours',()=>{
 assert(points.includes('spectralClassFromT(c.T[i])'));
 assert(points.includes('galaxySED(sclass,dship)'));
 assert(volumes.includes('spectralSourceTint(spectralClassFromObject(o)'));
 assert(volumes.includes('total+=dot(light,vec3(.2126,.7152,.0722))*groupTint[j]'));
});
check('Spectra do not double-apply spacecraft Doppler',()=>{
 const vertex=points.slice(points.indexOf('const vertexShader'),points.indexOf('const fragmentShader'));
 assert(!/momentum|speed/.test(vertex));
 assert.equal(sky.split('if(optics>.5&&shift>.5&&momentum>.000001)').length,2);
});
check('Legacy blackbody model remains an explicit out-of-coverage fallback',()=>{
 assert(points.includes('sedValid?galaxySED'));
 assert(points.includes(':thermal(temp*dship)'));
 assert(volumes.includes('spectral||sourceTint('));
});
console.log(JSON.stringify({passed:n,status:'PASS',gpu:'not-tested'}));
