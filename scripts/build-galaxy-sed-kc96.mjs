// Deterministic rebuild and provenance check of the 8 Kinney–Calzetti spectral templates.
// Run: node scripts/build-galaxy-sed-kc96.mjs [--write]
// No network requests: source ASCII files and Bessell V are archived in data/galaxy-spectra-kc96/.
// Mirrors of the STScI CDBS KC96 atlas, see docs/RELAIS-CODEX-2026-10-16-SPECTRES-GALACTIQUES.md.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {CIE_1931,CIE_START} from '../src/cie-1931.js';
import {SED_IDS,SED_LUT,SED_MIN,SED_MAX,SED_SAMPLES,SED_PROVENANCE} from '../src/galaxy-sed-kc96-data.js';

const base=fileURLToPath(new URL('../data/galaxy-spectra-kc96/',import.meta.url));
function source(id) {
 const raw=fs.readFileSync(path.join(base,id+'_template.ascii'));
 const rows=raw.toString('utf8').trim().split(/\r?\n/).map(s=>s.trim().split(/\s+/).map(Number));
 if(rows.length<1000||rows.some(r=>r.length!==2||!r.every(Number.isFinite)||r[1]<0))throw Error('Invalid KC96 source '+id);
 const gitsha=crypto.createHash('sha1').update('blob '+raw.length+'\0').update(raw).digest('hex');
 const p=SED_PROVENANCE.spectra.find(s=>s.id===id);
 if(!p||gitsha!==p.mirrorBlobSha1)throw Error('Unexpected source bytes or provenance '+id);
 return {wave:rows.map(r=>r[0]/10),flux:rows.map(r=>r[1])};
}
function interp(x,y,z){
 if(z<x[0]||z>x.at(-1))return null;let lo=0,hi=x.length-1;
 while(hi-lo>1){const k=(hi+lo)>>1;if(x[k]>z)hi=k;else lo=k;}
 const f=(z-x[lo])/(x[hi]-x[lo]);return y[lo]*(1-f)+y[hi]*f;
}
const rawFilter=fs.readFileSync(path.join(base,'BessellV.dat'),'utf8').trim().split(/\r?\n/).map(s=>s.trim().split(/\s+/).map(Number));
const bWave=rawFilter.map(r=>r[0]/10),bFlux=rawFilter.map(r=>r[1]);
function band(spec,D){
 let X=0,Y=0,Z=0,V=0;
 for(let n=360;n<=700;n++){
  const f=D*interp(spec.wave,spec.flux,D*n),i=(n-CIE_START)*3;
  if(!Number.isFinite(f))throw Error('SED wavelength coverage exceeded '+D);
  X+=f*CIE_1931[i];Y+=f*CIE_1931[i+1];Z+=f*CIE_1931[i+2];
  const v=interp(bWave,bFlux,n);if(v!=null)V+=f*v;
 }
 const R=Math.max(1e-50,3.2406*X-1.5372*Y-.4986*Z),
 G=Math.max(1e-50,-.9689*X+1.8758*Y+.0415*Z),
 B=Math.max(1e-50,.0557*X-.2040*Y+1.0570*Z),
 luminance=.2126*R+.7152*G+.0722*B;
 return {rgb:[R/luminance,G/luminance,B/luminance],V};
}
let maxDifference=0,checked=0;
for(let k=0;k<SED_IDS.length;k++){
 const sp=source(SED_IDS[k]),ref=band(sp,1).V;
 for(let i=0;i<SED_SAMPLES;i++){
  const D=SED_MIN+(SED_MAX-SED_MIN)*i/(SED_SAMPLES-1),a=band(sp,D),values=[...a.rgb,a.V/ref];
  for(let j=0;j<4;j++){
   const diff=Math.abs(values[j]-SED_LUT[(k*SED_SAMPLES+i)*4+j]);
   maxDifference=Math.max(maxDifference,diff);checked++;
  }
 }
}
if(maxDifference>1e-6)throw Error('Spectral table differs from source by '+maxDifference);
// The precomputed array is a build input to esbuild; no runtime fetch or SED integration.
console.log(JSON.stringify({templates:SED_IDS.length,values:checked,maxDifference,photometry:'Bessell V',colour:'CIE 1931 2-degree',status:'PASS'}));
if(process.argv.includes('--write'))console.log('Array is already deterministic; edit only with a new provenance record and regenerate deliberately.');
