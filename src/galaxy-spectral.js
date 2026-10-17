// Galaxy spectral colours from published Kinney–Calzetti composite spectra.
// Shared by photometric point galaxies (GPU) and volumetric galaxies (CPU).
// No spacecraft Doppler here: SkyOptics applies that once to the captured sky.
import {SED_IDS,SED_MIN,SED_MAX,SED_SAMPLES,SED_LUT} from './galaxy-sed-kc96-data.js';

export const galaxySpectra={ids:SED_IDS,min:SED_MIN,max:SED_MAX,samples:SED_SAMPLES,data:SED_LUT};
export function spectralClassFromT(t) {
  if(!Number.isFinite(t))return 3; // explicitly a type-template estimate (Sb)
  if(t<=-3)return 0; // ellipticals and dwarf elliptical
  if(t<0)return 1;   // lenticular S0
  if(t<=2)return 2;  // Sa, Sab
  if(t<=4)return 3;  // Sb, Sbc
  if(t<=7)return 4;  // Sc, Scd, Sd (Sc template approximation)
  if(t<=9)return 5;  // Sm, Im with sparse young populations: SB1 proxy
  return 6;          // Irr, star-forming: SB3 proxy
}
const CLASS_KIND={E:0,S0:1,dE:0,dSph:0,dwarfUnknown:0,Sab:2,Sbc:3,Scd:4,Sm:5,Ir:6};
export function spectralClassFromObject(o) {
  if(Number.isFinite(o.hubbleT))return spectralClassFromT(o.hubbleT);
  if(CLASS_KIND[o.galaxyClass]!=null)return CLASS_KIND[o.galaxyClass];
  if(o.irregular===2)return 6;
  if(o.irregular===1)return 5;
  return 3;
}
export function sedSample(kind,D){
  if(!Number.isFinite(D)||D<SED_MIN||D>SED_MAX||!(kind>=0&&kind<SED_IDS.length))return null;
  const x=(D-SED_MIN)/(SED_MAX-SED_MIN)*(SED_SAMPLES-1);
  const lo=Math.min(SED_SAMPLES-2,Math.floor(x)),f=x-lo,offset=kind*SED_SAMPLES*4+lo*4;
  return [0,1,2,3].map(j=>SED_LUT[offset+j]*(1-f)+SED_LUT[offset+j+4]*f);
}
// Chromaticity is normalized to CIE Y=1 at every D. Brightness: a source of Doppler factor D seen at a given emission
// distance (observer frame, the distances used throughout) has the specific intensity I_λ(λ) = D⁵ I'_λ(Dλ) (I_λ λ⁵
// invariant), hence a band flux ∝ D⁴ ∫V(λ)·D F'(Dλ)dλ = D⁴ J(D) with the table's convention J. Relative to the Sun:
// (D/D☉)⁴ J(D)/J(D☉) — for a black body exactly I_V(T·D)/I_V(T·D☉), the law of the thermal fallback (checked in
// validate-galaxy-spectra.mjs). Correction of 17 October 2026: the earlier (D☉/D)² was the law of a MOVING OBSERVER
// with catalogue-frame distances (stars, sky-optics), not of a moving source.
// The galaxy's magnitude from the catalogue remains the absolute flux anchor.
export function spectralSourceTint(kind,Dsun,D,avFg=0,fg=1){
  const now=sedSample(kind,D),sun=sedSample(kind,Dsun);
  if(!now||!sun)return null; // no silent extrapolation; caller can use legacy model
  const k=(now[3]/sun[3])*(D/Dsun)**4*10**(.4*avFg*(1-fg));
  return now.slice(0,3).map(v=>v*k);
}
