// Motions of galaxies and cosmic structures in the cockpit's catalogue frame: heliocentric, flat spacetime, c = 1 (ly/yr).
// First-order (z ≪ 1) kinematic model of a dynamic Universe, no general-relativistic cosmology:
// - radial velocity: the MEASURED one where the catalogue gives it (UNGC heliocentric velocity; Cosmicflows-4 redshift in the
//   CMB frame converted to heliocentric with the solar dipole; literature values for the four Local Group models), otherwise
//   the Hubble flow H0·d plus the reconstructed peculiar velocity beyond 10 million ly, otherwise unknown (0);
// - transverse velocity: never measured for these galaxies; beyond 10 million ly, the CF4 2023 reconstructed peculiar
//   velocity at the galaxy minus the Sun's motion relative to the CMB (MODEL), otherwise unknown (0).
// Each catalogue position is where the light received at the Sun (epoch 2026.75) was emitted, d years earlier. The galaxy
// therefore moves on x(t) = x_cat + v (t + d): received at the Sun at t = 0 it is exactly the catalogue position; seen from
// elsewhere, or at another time, the exact past light cone of ephemeris.js applies (light delay, retarded positions).
// Expansion is only the linear Hubble flow over the trip (relative error of order H0·t ≲ 5 % within the CF4 volume);
// galaxies do not evolve in shape or light. The CMB is the radiation of the same frame (see cmbRadiance below).
import { galactic, equatorial } from "./physics.js";

export const C_KMS = 299792.458;
export const H0 = 74.6; // km/s/Mpc, scale of the Cosmicflows-4 distances (Courtois et al. 2023)
export const MPC_LY = 3.2615638e6;
// Solar motion relative to the CMB (Planck 2018 I, dipole): 369.82 km/s toward l = 264.021°, b = 48.253°.
export const SUN_CMB_KMS = 369.82;
const lb = (l, b) => { l *= Math.PI / 180; b *= Math.PI / 180; return equatorial([Math.cos(b) * Math.cos(l), Math.cos(b) * Math.sin(l), Math.sin(b)]); };
export const SUN_CMB_DIR = lb(264.021, 48.253);
export const SUN_CMB = SUN_CMB_DIR.map((x) => x * SUN_CMB_KMS);
export const CMB_T0 = 2.7255; // K (Fixsen 2009)
// Heliocentric radial velocities (km/s, NED/literature) of the four Local Group models of local-group.js.
export const LOCAL_GROUP_VR = { m31: -300, m33: -179, lmc: 262, smc: 146 };
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
// Velocity (km/s, equatorial, heliocentric) and its provenance. `field(pLy)` returns the reconstructed peculiar velocity in
// the CMB frame (km/s, equatorial) or null outside the reconstruction box (cf4-basins.js BasinData.velocityEqAt in Mly).
export function galaxyVelocity(o, field = null) {
  const d = Math.hypot(...o.xyz), n = o.xyz.map((x) => x / d), dMly = d / 1e6, row = o.catalogueRow;
  let vr = null, radial = "inconnue (0)";
  if (LOCAL_GROUP_VR[o.id] != null) { vr = LOCAL_GROUP_VR[o.id]; radial = "mesurée (héliocentrique, littérature)"; }
  else if (o.catalogue === "ungc" && Number.isFinite(row?.raw?.[4])) { vr = row.raw[4]; radial = "mesurée (UNGC, héliocentrique)"; }
  else if (o.catalogue === "cf4" && Number.isFinite(row?.vCmb)) { vr = row.vCmb - dot(SUN_CMB, n); radial = "mesurée (décalage spectral CF4, ramené au Soleil)"; }
  const pec = dMly >= 10 && field ? field(o.xyz) : null;
  if (vr == null && dMly >= 10) { vr = (H0 * d) / MPC_LY + (pec ? dot(pec, n) : 0) - dot(SUN_CMB, n); radial = pec ? "modèle : expansion H0·d + flux reconstruit CF4" : "modèle : expansion H0·d"; }
  let vt = [0, 0, 0], transverse = "inconnue (0)";
  if (pec) { const rel = pec.map((x, k) => x - SUN_CMB[k]), along = dot(rel, n); vt = rel.map((x, k) => x - along * n[k]); transverse = "modèle (flux reconstruit CF4 2023)"; }
  const v = n.map((x, k) => (vr ?? 0) * x + vt[k]);
  return { v, vr: vr ?? 0, vt: Math.hypot(...vt), radial, transverse };
}
// Sets the worldline of o (motion in units of c, baseXYZ = position at catalogue time t = 0) from its catalogue position.
export function applyGalaxyMotion(o, field = null) {
  if (!o.catalogueXYZ) o.catalogueXYZ = [...o.xyz];
  const save = o.xyz; o.xyz = o.catalogueXYZ; const m = galaxyVelocity(o, field); o.xyz = save;
  const d = Math.hypot(...o.catalogueXYZ);
  o.motion = m.v.map((x) => x / C_KMS);
  o.baseXYZ = o.catalogueXYZ.map((x, k) => x + o.motion[k] * d);
  o.cosmicMotion = { ...m, lightDelay: d };
  o.motionStatus = `Radiale ${m.radial} : ${Math.round(m.vr)} km/s · transverse ${m.transverse}${m.vt ? " : " + Math.round(m.vt) + " km/s" : ""}. Position du catalogue = lumière émise il y a ${fmtYears(d)} ; ligne d’univers rectiligne (expansion au premier ordre).`;
  return o;
}
function fmtYears(y) { return y >= 1e9 ? (y / 1e9).toFixed(2).replace(".", ",") + " milliard d’années" : y >= 1e6 ? Math.round(y / 1e6).toLocaleString("fr-FR") + " millions d’années" : Math.round(y).toLocaleString("fr-FR") + " ans"; }
// Past light cone of a linear worldline x(t) = base + v t seen from `obs` at time t (flat spacetime, c = 1, |v| < 1).
export function receivedLinear(base, v, obs, t, out = [0, 0, 0]) {
  const r0 = base[0] + v[0] * t - obs[0], r1 = base[1] + v[1] * t - obs[1], r2 = base[2] + v[2] * t - obs[2];
  const rv = r0 * v[0] + r1 * v[1] + r2 * v[2], r2s = r0 * r0 + r1 * r1 + r2 * r2, a = 1 - (v[0] * v[0] + v[1] * v[1] + v[2] * v[2]), root = Math.sqrt(rv * rv + a * r2s);
  const delay = rv >= 0 ? r2s / (root + rv || 1) : (root - rv) / a;
  out[0] = obs[0] + r0 - v[0] * delay; out[1] = obs[1] + r1 - v[1] * delay; out[2] = obs[2] + r2 - v[2] * delay;
  return delay;
}
// Energy flux of the CMB on a surface facing the motion (W/m²), observer at Lorentz factor γ, speed β = 1 − gap relative to
// the CMB: 2π I0 ∫0¹ μ f⁴ dμ with f = 1 / (γ (1 − β μ)) (I ∝ T⁴), integrated analytically; at rest σT0⁴ = 3,1 µW/m².
export function cmbForwardFlux(g, beta, gap = 1 - beta) {
  const sigma = 5.670374419e-8, I0 = (sigma * CMB_T0 ** 4) / Math.PI;
  if (beta < 1e-4) return Math.PI * I0 * (1 + (8 / 3) * beta); // first order
  const F = (w) => -1 / (3 * w ** 3) + 1 / (2 * w * w), integral = (F(1) - F(gap)) / (beta * beta * g ** 4);
  return 2 * Math.PI * I0 * integral;
}
export const toGalactic = galactic;
// Visible-band appearance of the CMB for an observer moving at Lorentz factor γ (gap = 1 − β) relative to it, from the
// CIE-derived black-body table (lut: 512 × [r, g, b, ln Y], log T from 100 K to 10⁶ K, Rayleigh–Jeans beyond). Radiance
// in sky units (photometry.js): K · exp(ln Y(T)), K fixed by the Sun's photosphere (V = −26.74 over its disc at 1 au).
// Returns the total flux F (radiance × sr) of the forward hot spot, its half-flux angular radius and peak temperature.
export function blackbodyLnY(lut, T) {
  if (!(T > 100)) return -Infinity;
  const x = Math.min(1, Math.log(T / 100) / Math.log(1e4)) * 511, i = Math.min(510, Math.floor(x)), f = x - i;
  return lut[4 * i + 3] * (1 - f) + lut[4 * i + 7] * f + Math.log(Math.max(1, T / 1e6));
}
export function blackbodyK(lut, PHOT_ZERO) { const omega = Math.PI * (6.957e8 / 1.495978707e11) ** 2; return (PHOT_ZERO * 10 ** (0.4 * 26.74)) / omega / Math.exp(blackbodyLnY(lut, 5772)); }
export function cmbBand(lut, K, g, gap) {
  const beta = 1 - gap, N = 600, lo = Math.log(Math.max(1e-30, gap * 1e-3)), hi = Math.log(2); let F = 0; const cum = [];
  for (let i = 0; i < N; i++) { const lx = lo + ((i + 0.5) / N) * (hi - lo), x = Math.exp(lx), T = CMB_T0 / (g * (gap + beta * x)), L = K * Math.exp(blackbodyLnY(lut, T)); F += 2 * Math.PI * L * x * ((hi - lo) / N); cum.push([x, F]); }
  const half = cum.find((c) => c[1] >= F / 2)?.[0] ?? 2;
  return { F, theta: Math.acos(Math.max(-1, 1 - half)), Tpeak: CMB_T0 / (g * gap) };
}
