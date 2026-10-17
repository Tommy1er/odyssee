// Spectral validity of a galaxy viewed from a relativistic spacecraft.
// This is a diagnostic, NOT a second application of Doppler to the scene renderer.
// Source-factor D_source uses its peculiar/heliocentric worldline (emitter → observer);
// spacecraft factor D_obs = gamma(1 + beta·n) uses the photon arriving from direction n.
// Frequency ratios multiply, so observed Bessell-V photons [470, 700] nm were emitted
// in [470,700] * D_source * D_obs nm in the galaxy's comoving rest frame.
// K96 is archived per morphological type, with heterogeneous red wavelength limits.
// The live GPU LUT only covers D_total = 0.72...1.09, EVEN WHEN THE ORIGINAL ARCHIVE COVERS MORE.
import {dopplerU, norm, sub, unit, dot} from './physics.js';
import {spectralClassFromObject,sedSample,galaxySpectra} from './galaxy-spectral.js';
import {SED_PROVENANCE} from './galaxy-sed-kc96-data.js';

export const V_BAND_NM=Object.freeze([470,700]); // effective support approximation, not throughput endpoints
export function emitterDoppler(v,emitterToObserver){
  const b2=dot(v,v),along=dot(v,unit(emitterToObserver));
  if(!Number.isFinite(b2)||b2>=1||b2<0)return null;
  return Math.sqrt(1-b2)/(1-along);
}
export function spectralCoverage(kind,totalD,passband=V_BAND_NM){
  if(!Number.isFinite(totalD)||totalD<=0)return null;
  const spectrum=SED_PROVENANCE.spectra[kind];
  if(!spectrum)return null;
  const required=passband.map(w=>w*totalD);
  const [lo,hi]=spectrum.rangeNm;
  const overlap=Math.max(0,Math.min(required[1],hi)-Math.max(required[0],lo));
  const coveredWidth=Math.min(1,overlap/(required[1]-required[0]));
  const full=required[0]>=lo&&required[1]<=hi;
  const lut=full&&totalD>=galaxySpectra.min&&totalD<=galaxySpectra.max;
  return {
    template:galaxySpectra.ids[kind],totalD,observedNm:[...passband],restNm:required,
    archiveNm:[lo,hi],coverageWidth:coveredWidth,
    status:lut?'tabulated':full?'archive-outside-lut':coveredWidth>0?'partial':'unobserved',
    sample:lut?sedSample(kind,totalD):null,
  };
}
export function galaxySpectralObservation(o,shipPos,shipU){
  if(o?.type!=='galaxy'||!Array.isArray(o.xyz)||!Array.isArray(shipPos)||!Array.isArray(shipU))return null;
  const lightXYZ=o.lightXYZ||o.xyz;
  const observerToSource=unit(sub(lightXYZ,shipPos));
  const sourceD=emitterDoppler(o.motion||[0,0,0],sub(shipPos,lightXYZ));
  if(sourceD==null)return null;
  const observerD=dopplerU(observerToSource,shipU);
  const D=sourceD*observerD;
  const view=spectralCoverage(spectralClassFromObject(o),D);
  return view&&{...view,sourceD,observerD};
}
