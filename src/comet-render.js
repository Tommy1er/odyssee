// Coma and tails of active comets, optically thin emission added to the sky (per screen pixel, after the bodies).
// Model (order of magnitude, labelled as such): emission is normalised so that its integral over the volume equals the
// comet's total brightness from the standard law m = M1 + 5 log Δ + k1 log r, on the photometric scale of the point
// stars (photometry.js: Φ = fluxFromMag(m), radiance × steradian). Surface brightness is therefore conserved with
// distance and the coma never glows brighter than physics allows. "Visible · pose longue" multiplies it by the
// long-exposure gain (cometGain), as on an astrophotograph.
//  - coma: j ∝ e^(−r/Rc)/r² (Haser-like); column through the whole coma ∝ e^(−ρ/Rc)/ρ, normalised to Jc/(2πRc), times
//    (1/2 + atan(b/ρ)/π) for the part in front of an observer inside it;
//  - ion tail (CO⁺, blue): straight, anti-solar, Gaussian tube widening slowly;
//  - dust tail (scattered sunlight): curved, lagging behind the orbital motion in the orbital plane, wider fan.
// Tubes are integrated analytically at the ray's closest approach (no step aliasing on thin tails).
import * as T from "three";
import { sub, norm, unit, YEAR, dot, mul } from "./physics.js";
import { cometScales } from "./comets.js";
import { velocityAt } from "./ephemeris.js";
import { fluxFromMag, diffuseGain } from "./photometry.js";

export const COMET_SLOTS = 2;
const LS_KM = 299792.458, AU_LS = 149597870.7 / LS_KM;
export const cometGLSL = `
#define COMN ${COMET_SLOTS}
uniform float cometCount,cometGain;uniform vec3 cometPos[COMN],cometAnti[COMN],cometLag[COMN];uniform vec4 cometScale[COMN];uniform vec3 cometMix[COMN];
// Column of a Gaussian tube around the curve c(s) = C + a·s + lag·κs² (s ≥ 0 from the nucleus), width w(s) = w0 + g·s,
// density n(s) = N·e^(−s/L)/(πw²L·|c′(s)|) (per unit arc length) so that its volume integral is N, seen along the ray from the origin. The closest
// approach of the ray to the curve is found by Newton steps on the local tangent; no clamping inside the tail (clamping
// turns segment ends into blobs), a Gaussian cut of width w0 sunward of the nucleus (its
// share, w0·√π/2, included in the normalisation), nothing beyond 6 L.
float tubeColumn(vec3 ray,vec3 C,vec3 a,vec3 lag,float kap,float w0,float g,float L,float N){
 float s=0.,smax=6.*L;
 for(int it=0;it<3;it++){vec3 P=C+a*s+lag*(kap*s*s),Tn=a+lag*(2.*kap*s);float tl=length(Tn);Tn/=tl;float ra=dot(ray,Tn);
  s=clamp(s+(ra*dot(P,ray)-dot(P,Tn))/max(1.-ra*ra,1.e-6)/tl,-4.*w0,smax*1.5);}
 if(s>smax)return 0.;
 vec3 P=C+a*s+lag*(kap*s*s),T0=a+lag*(2.*kap*s),Tn=normalize(T0);float t=dot(P,ray);if(t<=0.)return 0.;
 vec3 q=P-ray*t;float ra=dot(ray,Tn),sinT=sqrt(max(1.-ra*ra,0.)),sp=max(s,0.),wd=w0+g*sp,d2=dot(q,q);
 float n=N*exp(-sp/L)/(3.14159265*wd*wd*(L+.88622693*w0)*length(T0))*(s<0.?exp(-s*s/(w0*w0)):1.);
 return n*exp(-d2/(wd*wd))*wd*1.7724539/max(sinT,wd*1.7724539/smax);}
vec3 cometRadiance(vec3 ray){vec3 total=vec3(0.);
 for(int k=0;k<COMN;k++){if(float(k)>=cometCount)break;
  vec3 C=cometPos[k],a=cometAnti[k],lag=cometLag[k];vec4 sc=cometScale[k];vec3 mixk=cometMix[k];
  float Rc=sc.x,Li=sc.y,Ld=sc.z,J=sc.w;if(J<=0.)continue;
  float Jc=J*mixk.x,Ji=J*mixk.y,Jd=J*mixk.z;
  // Coma (green C2 emission mixed with dust-scattered sunlight).
  float b=dot(ray,C),rho=length(C-ray*b),d=length(C),rmin=max(pixelAngle*d*.5,Rc*1.e-4);float rr=max(rho,rmin);
  float col=Jc/(2.*3.14159265*Rc)*(.5+atan(b/rr)/3.14159265)/rr*exp(-rho/Rc);
  total+=col*mix(vec3(1.,.9,.75),vec3(.45,1.,.55),.45);
  // Ion tail, straight and anti-solar.
  if(Li>0.)total+=tubeColumn(ray,C,a,lag,0.,Rc*.15,.015,Li,Ji)*vec3(.35,.55,1.);
  // Dust tail: curved toward −v (grains lag behind the orbital motion), κ = 0.25/L, widening fan.
  if(Ld>0.)total+=tubeColumn(ray,C,a,lag,.25/Ld,Rc*.3,.12,Ld,Jd)*vec3(1.,.88,.7);
 }
 return total*cometGain;}
`;
export class CometLayer {
  constructor(uniforms, objects) {
    this.u = uniforms;
    this.comets = objects.filter((o) => o.type === "comet");
    this.sun = objects.find((o) => o.id === "h0");
    this.active = [];
    Object.assign(uniforms, {
      cometCount: { value: 0 },
      cometGain: { value: 1 },
      cometPos: { value: Array.from({ length: COMET_SLOTS }, () => new T.Vector3()) },
      cometAnti: { value: Array.from({ length: COMET_SLOTS }, () => new T.Vector3()) },
      cometLag: { value: Array.from({ length: COMET_SLOTS }, () => new T.Vector3()) },
      cometMix: { value: Array.from({ length: COMET_SLOTS }, () => new T.Vector3()) },
      cometScale: { value: Array.from({ length: COMET_SLOTS }, () => new T.Vector4()) },
    });
  }
  // State of every comet at mission time t: heliocentric distance, activity, scales, total brightness constant J.
  static state(o, sun, t) {
    const rel = sub(o.xyz, sun.xyz), r = (norm(rel) * 63241.077), sc = cometScales(o.comet, r),
      H = o.comet.M1 + o.comet.k1 * Math.log10(r);
    // ∫ j dV = Φ(Δ = 1 au) · (1 au)²  with Φ = fluxFromMag(H): radiance·ls².
    const J = sc.active ? sc.activity * fluxFromMag(H) * AU_LS * AU_LS : 0;
    return { r, H, J, sc, anti: unit(rel) };
  }
  update(s) {
    const u = this.u, ls = (p) => p.map((x, k) => (x - s.pos[k]) * YEAR), list = [];
    for (const o of this.comets) {
      if (!o.sun) continue;
      const st = CometLayer.state(o, this.sun, s.t);
      if (!(st.J > 0)) continue;
      const d = norm(sub(o.lightXYZ || o.xyz, s.pos)) * YEAR;
      list.push({ o, st, score: st.J / Math.max(d * d, 1e-6) });
    }
    list.sort((a, b) => b.score - a.score);
    this.active = list.slice(0, COMET_SLOTS);
    this.active.forEach(({ o, st }, k) => {
      const v = sub(velocityAt(o, s.t), velocityAt(this.sun, s.t)), vp = sub(v, mul(st.anti, dot(v, st.anti)));
      u.cometPos.value[k].set(...ls(o.lightXYZ || o.xyz));
      u.cometAnti.value[k].set(...st.anti);
      u.cometLag.value[k].set(...(norm(vp) > 0 ? unit(vp).map((x) => -x) : [0, 0, 0]));
      const ion = st.sc.ionFraction;
      u.cometMix.value[k].set(0.55, 0.45 * ion, 0.45 * (1 - ion));
      u.cometScale.value[k].set(st.sc.comaKm / LS_KM, st.sc.ionKm / LS_KM, st.sc.dustKm / LS_KM, st.J);
    });
    u.cometCount.value = this.active.length;
    u.cometGain.value = diffuseGain(s.band ?? 1);
  }
}
// JavaScript twins of the shader formulas (same expressions), used by scripts/validate-comets.mjs.
export function comaColumn(ray, C, Rc, Jc, rmin = 0) {
  const b = dot(ray, C), q = sub(C, mul(ray, b)), rho = norm(q), rr = Math.max(rho, rmin);
  return (Jc / (2 * Math.PI * Rc)) * (0.5 + Math.atan(b / rr) / Math.PI) / rr * Math.exp(-rho / Rc);
}
export function tubeColumn(ray, C, a, lag, kap, w0, g, L, N) {
  const at = (s) => C.map((x, k) => x + a[k] * s + lag[k] * kap * s * s), tan = (s) => a.map((x, k) => x + lag[k] * 2 * kap * s);
  const smax = 6 * L;
  let s = 0;
  for (let it = 0; it < 3; it++) {
    const P = at(s), T0 = tan(s), tl = norm(T0), Tn = mul(T0, 1 / tl), ra = dot(ray, Tn);
    s = Math.min(smax * 1.5, Math.max(-4 * w0, s + (ra * dot(P, ray) - dot(P, Tn)) / Math.max(1 - ra * ra, 1e-6) / tl));
  }
  if (s > smax) return 0;
  const P = at(s), T0 = tan(s), Tn = unit(T0), t = dot(P, ray);
  if (t <= 0) return 0;
  const q = P.map((x, k) => x - ray[k] * t), ra = dot(ray, Tn), sinT = Math.sqrt(Math.max(1 - ra * ra, 0)), sp = Math.max(s, 0), wd = w0 + g * sp, d2 = dot(q, q);
  const n = ((N * Math.exp(-sp / L)) / (Math.PI * wd * wd * (L + 0.88622693 * w0) * norm(T0))) * (s < 0 ? Math.exp(-(s * s) / (w0 * w0)) : 1);
  return n * Math.exp(-d2 / (wd * wd)) * wd * 1.7724539 / Math.max(sinT, (wd * 1.7724539) / smax);
}
