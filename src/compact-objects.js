// Compact objects: emission models and relativistic optics shared by the shaders (black-hole.js, closeup.js)
// and the numerical checks (scripts/validate-compact.mjs). Units: Schwarzschild radius Rs = 1 for black holes.
//
// Accretion flows. The model is chosen per object, because the physics differs:
//  - none : dormant black hole (Gaia BH1/BH2/BH3): no luminous flow, only lensing of the sky.
//  - thin : geometrically thin, optically thick disk (high-accretion X-ray binaries such as Cygnus X-1):
//           zero-torque Shakura–Sunyaev profile T(r) ∝ r^−3/4 (1 − √(r_in/r))^1/4, inner edge at the ISCO (3 Rs),
//           black-body emission seen at T_obs = g·T, which keeps the frequency in the transfer (I_ν/ν³ invariant).
//  - riaf : hot, geometrically thick, optically thin flow (Sagittarius A*): radiatively inefficient, emits mainly
//           synchrotron at millimetre wavelengths; negligible in the visible (and hidden by ~30 mag of extinction).
//           Emissivity j ∝ r^−2.5 with a thick vertical profile; I_obs = ∫ g³ j dl (flat spectrum near 230 GHz).
// Temperatures and emissivity laws are order-of-magnitude parameters, labelled as such in the interface.
export const ACCRETION = {
  "sgr-a": { model: "riaf", inclination: 30, inclinationSource: "valeur illustrative compatible avec les contraintes EHT (faible inclinaison)", label: "Flot chaud épais et peu lumineux (RIAF) : quasi invisible en lumière visible, anneau en radio millimétrique · paramètres d'ordre de grandeur" },
  cygx1: { model: "thin", Tmax: 3e6, rOut: 30, inclination: 27.1, inclinationSource: "Orosz et al. 2011, ApJ 742, 84", label: "Disque mince de Shakura–Sunyaev, bord interne à la dernière orbite stable (3 Rs) · température d'ordre de grandeur, état spectral variable" },
  v404: { model: "thin", Tmax: 8e3, rOut: 30, inclination: 67, inclinationSource: "Khargharia et al. 2010 (orbite)", label: "Disque mince en quiescence · température et extension illustratives (l'intérieur réel est probablement un flot chaud)" },
};
export function accretionOf(o) {
  if (o?.type !== "blackhole") return { model: "none" };
  return ACCRETION[o.id] || (o.accretion ? { model: "thin", Tmax: 1e6, rOut: 30, label: "Disque mince illustratif" } : { model: "none", label: "Trou noir dormant : aucune émission, seulement la déviation de la lumière du fond" });
}
export const MODEL_CODE = { none: 0, thin: 1, riaf: 2 };
// Zero-torque thin-disk profile, normalised to 1 at its maximum r = (49/36)·r_in.
export function thinDiskProfile(r, rin = 3) {
  if (r <= rin) return 0;
  const f = (x) => Math.pow(x, -0.75) * Math.pow(1 - Math.sqrt(rin / x), 0.25);
  return f(r) / f((49 / 36) * rin);
}
export const THIN_FMAX_RIN3 = Math.pow(49 / 12, -0.75) * Math.pow(1 - Math.sqrt(36 / 49), 0.25);
// Frequency ratio g = ν_obs/ν_em for a photon of specific angular momentum λ = L_z/E (about the disk axis)
// emitted by gas on a prograde circular geodesic at r (Rs = 1), received by a static observer at r_obs.
// u^t = 1/√(1 − 3/(2r)), Ω = √(1/(2r³)) in Schwarzschild time.
export function diskRedshift(r, lambda, rObs = Infinity) {
  const ut = 1 / Math.sqrt(1 - 1.5 / r),
    Om = Math.sqrt(1 / (2 * r * r * r)),
    lapseObs = isFinite(rObs) ? Math.sqrt(1 - 1 / rObs) : 1;
  return 1 / (lapseObs * ut * (1 - Om * lambda));
}
// Neutron stars. Beloborodov (2002, ApJ 566, L85) approximation for a distant observer in Schwarzschild:
// 1 − cos α = (1 − cos ψ)(1 − u), u = Rs/R, α emission angle to the normal, ψ angle between the normal and the
// line of sight. Valid for R > 2 Rs and a distant camera; not exact near the surface or for fast rotation.
export const cosPsiFromAlpha = (cosAlpha, u) => 1 - (1 - cosAlpha) / (1 - u);
export const visibleFraction = (u) => (1 - Math.max(-1, cosPsiFromAlpha(0, u))) / 2;
// Apparent radius (impact parameter of the limb ray) relative to R: b_max = R / √(1 − u).
export const apparentRadius = (u) => 1 / Math.sqrt(1 - u);
// Rotation periods for editorial pulsars without a catalogue period (ATNF catalogue values).
export const PULSAR_PERIODS = { vela: 0.0893, "crab-pulsar": 0.0337 };
// Display of a rotating beam: a period shorter than ~0.2 s of screen time is averaged into its swept cone
// (an eye or a camera integrates the pulses), instead of strobing.
export function beamBlend(periodSeconds, missionSecondsPerScreenSecond) {
  const screenPeriod = periodSeconds / Math.max(1e-30, missionSecondsPerScreenSecond);
  return Math.max(0, Math.min(1, (screenPeriod - 0.05) / 0.15));
}
// Disk axis: tilted by the measured (or stated) inclination from the line of sight toward Earth; the position
// angle on the sky is unknown and fixed arbitrarily. Returns a unit vector in catalogue axes.
export function diskAxis(o, earthXYZ) {
  const acc = accretionOf(o), i = ((acc.inclination ?? 60) * Math.PI) / 180;
  const los = [earthXYZ[0] - o.xyz[0], earthXYZ[1] - o.xyz[1], earthXYZ[2] - o.xyz[2]], l = Math.hypot(...los) || 1;
  const z = los.map((x) => x / l), ref = Math.abs(z[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
  let p = [ref[1] * z[2] - ref[2] * z[1], ref[2] * z[0] - ref[0] * z[2], ref[0] * z[1] - ref[1] * z[0]];
  const pl = Math.hypot(...p); p = p.map((x) => x / pl);
  return z.map((x, k) => Math.cos(i) * x + Math.sin(i) * p[k]);
}
