// Source-aware, read-only spectral observability of galaxies from the spacecraft.
// This is a diagnostic, NOT a replacement for the global RGB approximation in sky-optics.js.
// Rest wavelengths λ_emit = D_source * D_observer * λ_ship for a photon seen in the ship's visible band.
// Source (moving emitter) and observer (moving ship) must remain separate to avoid conflating
// their flux-transformation laws. Both are flat-spacetime factors; this is not FLRW transport.
import {sub,unit,dot,gammaU,dopplerU,norm} from './physics.js';
import {SED_MIN,SED_MAX,SED_PROVENANCE} from './galaxy-sed-kc96-data.js';
import {spectralClassFromObject,sedSample} from './galaxy-spectral.js';

export const SHIP_VISIBLE_NM=Object.freeze([380,700]);
const magnitude=v=>Math.hypot(...v);

export function galaxyObserverSpectrum(galaxy,shipPosition=[0,0,0],shipFourVelocity=[0,0,0]){
 if(galaxy?.type!=='galaxy')return null;
 const apparent=galaxy.lightXYZ||galaxy.xyz;
 if(!Array.isArray(apparent)||!Array.isArray(shipPosition)||!Array.isArray(shipFourVelocity))return null;
 const separation=sub(apparent,shipPosition),distance=norm(separation);
 if(!(distance>0)||!Number.isFinite(distance))return null;
 const n=unit(separation),sourceV=galaxy.motion||[0,0,0];
 const sourceSpeed2=dot(sourceV,sourceV);
 if(!(sourceSpeed2>=0&&sourceSpeed2<1))return null;
 // Photon propagation is -n; emitted source Doppler sqrt(1-v²)/(1-v·k) = sqrt(1-v²)/(1+v·n).
 const sourceFactor=Math.sqrt(1-sourceSpeed2)/(1+dot(sourceV,n));
 // Exact photon energy boost from the catalogue rest observer to spacecraft:
 // D_obs = gamma_ship(1 + beta_ship·n) with n the catalogue *apparent* source direction.
 // physics.dopplerU handles beta≈1 without losing precision in 1-beta.
 const observerFactor=dopplerU(n,shipFourVelocity);
 const combined=sourceFactor*observerFactor;
 const kind=spectralClassFromObject(galaxy),template=SED_PROVENANCE.spectra[kind];
 const emittedNm=SHIP_VISIBLE_NM.map(x=>x*combined);
 const archiveCoverage=emittedNm[0]>=template.rangeNm[0]&&emittedNm[1]<=template.rangeNm[1];
 // The precomputed Kinney-Calzetti colour table is much narrower than the archived raw λ range.
 // Even if the raw template spans the selected rest band, existing shaders do not reconstruct
 // this observed spectrum through aberration, individual source/volume masks, and integrated filters.
 const tableCoverage=sourceFactor>=SED_MIN&&sourceFactor<=SED_MAX&&combined>=SED_MIN&&combined<=SED_MAX;
 const sample=tableCoverage?sedSample(kind,combined):null;
 return {
  kind,template:template.id,distanceLy:distance,
  sourceFactor,observerFactor,combinedFactor:combined,
  emittedNm,observedVisibleNm:[...SHIP_VISIBLE_NM],
  archivedRangeNm:[...template.rangeNm],archiveCoverage,tableCoverage,
  templateLinearRgb:sample?sample.slice(0,3):null,
  gamma:gammaU(shipFourVelocity),
  status:tableCoverage?'class-template-only':archiveCoverage?'raw-spectrum-not-integrated':'out-of-archive',
  // Important: existing high-speed *rendered* galaxy colours still use an inferred black-body from
  // captured RGB, even if tableCoverage is true. Never label a diagnostic as a rendered solution.
  renderedWithEmpiricalObserverSpectrum:false
 };
}
