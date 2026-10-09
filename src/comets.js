// Comets: osculating heliocentric orbits from JPL Horizons (small-body solutions named below), elements of
// 2026-Oct-01 00:00 TDB (JD 2461314.5), ecliptic and mean equinox of J2000. Propagated as two-body Kepler orbits around
// the Sun: planetary perturbations and non-gravitational (outgassing) forces are ignored, so accuracy degrades with the
// distance in time from the 2026 epoch (checked against Horizons in scripts/validate-comets.mjs).
// Brightness: total magnitude m = M1 + 5 log10 Δ + k1 log10 r (Δ, r in au), the standard comet law; M1/k1 from JPL
// unless stated (Hale-Bopp: Womack et al. 2021; Encke: Ferrín 2008, JPL's values being close to the bare nucleus). Activity (coma and tails) is a model driven by r, not an observation.
import { eclipticToEquatorial, jdToYear, yearToJD } from "./solar-ephemeris.js";

export const COMET_EPOCH_JD = 2461314.5;
const KM_AU = 149597870.7;
// Gauss gravitational constant: GM☉ in au³/day².
export const GM_SUN_AU_D = 0.01720209895 ** 2;
// [id, name, aliases, e, q (km), i, Ω, ω (deg), Tp (JD TDB), M1, k1, radius km, radius note, source, onset r (au), note]
const ROWS = [
  ["1P", "Comète de Halley", ["Halley", "1P/Halley"], 0.968027263663768, 85422920.17858301, 162.1902407408194, 59.27212202832487, 112.1726714470374, 2474040.324469758, 5.5, 8, 5.5,
    "noyau 15 × 8 km (Giotto, 1986), rayon moyen", "JPL#75", 3,
    "Comète périodique de 76 ans, rétrograde. Survolée par Giotto en 1986 ; noyau très sombre (albédo 0,04). Prochain passage au périhélie : juillet 2061. Mère des Orionides et des êta-Aquarides."],
  ["C/1995 O1", "Comète Hale-Bopp", ["Hale-Bopp", "C/1995 O1"], 0.9948902962166476, 138453984.8212034, 89.73523014404518, 281.8065541283721, 130.7269916875420, 2450536.527126451, -1.8, 9.5, 30,
    "rayon estimé ≈ 30 km (grand noyau, incertain)", "JPL#226", 7,
    "Grande comète de 1997, visible à l'œil nu pendant 18 mois. Active dès 7 ua grâce au monoxyde de carbone. Elle s'éloigne vers son aphélie à ≈ 360 ua ; retour vers l'an 4400."],
  ["2P", "Comète d'Encke", ["Encke", "2P/Encke"], 0.8473168211898284, 50655382.89853603, 11.34774418169834, 334.0189468738531, 187.2877015948892, 2461446.728883969, 10.25, 5, 2.4,
    "rayon ≈ 2,4 km", "JPL#K273/21", 3,
    "Période la plus courte des comètes connues (3,3 ans). Mère des Taurides."],
  ["67P", "Comète 67P/Tchourioumov-Guérassimenko", ["67P", "Churyumov-Gerasimenko", "Tchouri", "Rosetta"], 0.6494870022361593, 181376048.8713124, 3.866097139598346, 36.28797546974717, 22.23759516641710, 2461871.047588862, 12.9, 7.5, 1.7,
    "noyau bilobé ≈ 4,1 km de long (Rosetta), rayon moyen", "JPL#K284/1", 3,
    "Visitée par Rosetta et Philae (2014–2016). Noyau en forme de canard, représenté ici par une sphère."],
  ["109P", "Comète Swift-Tuttle", ["Swift-Tuttle", "109P"], 0.9633446091189819, 143533490.3644501, 112.8531205807899, 139.8926117963991, 153.2360840748356, 2448974.089053041, 4.5, 15, 13,
    "rayon ≈ 13 km", "JPL#32", 3,
    "Période de 133 ans ; mère des Perséides d'août. Prochain périhélie en juillet 2126."],
  ["C/2020 F3", "Comète NEOWISE", ["NEOWISE", "C/2020 F3"], 0.9992856260370866, 43658267.93421376, 128.9734941023585, 60.99637622467232, 37.23109593406679, 2459036.003522316, 12.1, 12.25, 2.5,
    "rayon estimé ≈ 2,5 km (infrarouge NEOWISE)", "JPL#31", 3,
    "Grande comète de l'été 2020. Période de plusieurs milliers d'années."],
  ["C/2025 N1", "3I/ATLAS (comète interstellaire)", ["3I", "3I/ATLAS", "ATLAS", "C/2025 N1", "interstellaire"], 6.123801808068336, 202261316.7063482, 175.2401115783178, 323.0242226706354, 128.7968955240449, 2460977.945501562, 12.5, 4.5, 1,
    "rayon inconnu, inférieur à ≈ 3 km ; 1 km pour la visualisation", "JPL#54", 4.5,
    "Troisième objet interstellaire connu (découvert en juillet 2025). Orbite hyperbolique : il traverse le Système solaire une seule fois, à ≈ 58 km/s à l'infini."],
];
export const COMETS = ROWS.map(([id, name, aliases, e, qkm, i, node, peri, tp, M1, k1, radiusKm, radiusNote, source, onset, note]) => ({
  id, name, aliases, e, q: qkm / KM_AU, i, node, peri, tp, M1, k1, radiusKm, radiusNote, source, onset, note,
  magnitudeSource: id === "C/1995 O1" ? "courbe de lumière visuelle 1995–1999 (Womack et al. 2021, arXiv:2008.06761), moyenne avant/après périhélie"
    : id === "2P" ? "pic de la courbe de lumière séculaire (Ferrín 2008, arXiv:0806.2161) : noyau R(1,1,0) = 15,05, amplitude 4,8 mag, soit m(1,1) ≈ 10,25 ; les paramètres JPL (M1 = 15,7) sont proches du noyau nu"
    : "paramètres M1/k1 de JPL (ajustés sur les magnitudes rapportées, ordre de grandeur ; peuvent sous-estimer l'éclat visuel total de plusieurs magnitudes)",
}));
// Two-body propagation. Elliptic (e < 1), hyperbolic (e > 1); near-parabolic orbits handled through the same formulas
// with the mean motion from |a| = q/|1 − e|.
function solveElliptic(M, e) {
  let E = e > 0.8 ? Math.PI * Math.sign(M || 1) : M;
  for (let k = 0; k < 60; k++) { const d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); E -= d; if (Math.abs(d) < 1e-15) break; }
  return E;
}
function solveHyperbolic(M, e) {
  let H = Math.asinh(M / e);
  for (let k = 0; k < 80; k++) { const d = (e * Math.sinh(H) - H - M) / (e * Math.cosh(H) - 1); H -= d; if (Math.abs(d) < 1e-15) break; }
  return H;
}
// Position (au) in the orbital plane and true anomaly at Julian date jd.
export function orbitalPlane(c, jd) {
  const a = c.q / (1 - c.e), n = Math.sqrt(GM_SUN_AU_D / Math.abs(a) ** 3), M = n * (jd - c.tp);
  if (c.e < 1) {
    const Mw = ((((M + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI, E = solveElliptic(Mw, c.e);
    return [a * (Math.cos(E) - c.e), a * Math.sqrt(1 - c.e * c.e) * Math.sin(E)];
  }
  const H = solveHyperbolic(M, c.e);
  return [a * (Math.cosh(H) - c.e), -a * Math.sqrt(c.e * c.e - 1) * Math.sinh(H)];
}
export function planeToEcliptic(c, [x, y]) {
  const D = Math.PI / 180, w = c.peri * D, O = c.node * D, I = c.i * D;
  const cw = Math.cos(w), sw = Math.sin(w), cO = Math.cos(O), sO = Math.sin(O), cI = Math.cos(I), sI = Math.sin(I);
  return [(cw * cO - sw * sO * cI) * x + (-sw * cO - cw * sO * cI) * y, (cw * sO + sw * cO * cI) * x + (-sw * sO + cw * cO * cI) * y, sw * sI * x + cw * sI * y];
}
// Heliocentric position, equatorial J2000 axes (the catalogue axes), au.
export const cometHeliocentricAU = (c, jd) => eclipticToEquatorial(planeToEcliptic(c, orbitalPlane(c, jd)));
export function cometVelocityAUperDay(c, jd) {
  const h = 1e-3, a = cometHeliocentricAU(c, jd - h), b = cometHeliocentricAU(c, jd + h);
  return a.map((x, k) => (b[k] - x) / (2 * h));
}
export const period = (c) => (c.e < 1 ? (2 * Math.PI) / Math.sqrt(GM_SUN_AU_D / (c.q / (1 - c.e)) ** 3) : Infinity); // days
// Next time of perihelion strictly after jd (Infinity for a hyperbolic comet already past it).
export function nextPerihelion(c, jd) {
  if (c.e >= 1) return c.tp > jd ? c.tp : Infinity;
  const P = period(c);
  return c.tp + Math.ceil((jd - c.tp) / P + 1e-12) * P;
}
export function previousPerihelion(c, jd) {
  if (c.e >= 1) return c.tp <= jd ? c.tp : -Infinity;
  const P = period(c);
  return c.tp + Math.floor((jd - c.tp) / P) * P;
}
// Validity of the two-body extrapolation, from the distance in time to the osculation epoch.
export function cometQuality(jd) {
  const years = Math.abs(jd - COMET_EPOCH_JD) / 365.25;
  if (years <= 5) return { label: "Orbite osculatrice JPL (Horizons) du 1er octobre 2026, propagée en Kepler" };
  if (years <= 60) return { label: "Extrapolation képlérienne à " + Math.round(years) + " ans de l'orbite JPL 2026 : perturbations planétaires ignorées, erreur croissante" };
  return { label: "Extrapolation illustrative à " + Math.round(years) + " ans : perturbations et dégazage ignorés", illustrative: true };
}
// Activity factor 0–1: sublimation switches on below the onset distance (water ≈ 3 au, CO for Hale-Bopp ≈ 7 au).
export const activity = (c, r) => 1 / (1 + Math.exp((r - c.onset) / (0.12 * c.onset)));
export const totalMagnitude = (c, r, delta) => c.M1 + 5 * Math.log10(delta) + c.k1 * Math.log10(r);
// Physical scales of the coma and tails (km), order-of-magnitude model scaled by activity and r.
export function cometScales(c, r) {
  const A = activity(c, r), L = Math.pow(10, -0.4 * (c.M1 + c.k1 * Math.log10(Math.max(r, 0.05))));
  const strength = A * Math.min(1, Math.pow(L / Math.pow(10, -0.4 * 4), 0.25));
  return {
    active: A > 0.05,
    activity: A,
    comaKm: Math.min(2e6, Math.max(2e4, 1.5e5 * Math.pow(Math.max(L, 1e-9) / 1e-2, 0.25))) * Math.max(A, 0.05),
    ionKm: 4e7 * strength * Math.min(1, 2 / Math.max(r, 0.3)),
    dustKm: 2e7 * strength * Math.min(1, 1.5 / Math.max(r, 0.3)),
    ionFraction: r < 2.5 ? 0.15 : 0.03,
  };
}
export function cometObjects() {
  return COMETS.map((c) => ({
    id: "comet:" + c.id,
    name: c.name,
    type: "comet",
    comet: c,
    kind: c.e >= 1 ? "Comète interstellaire" : period(c) / 365.25 < 200 ? "Comète périodique" : "Comète à longue période",
    xyz: [0, 0, 0],
    d: 0,
    radiusKm: c.radiusKm,
    radiusAssumed: /estim|inconnu/.test(c.radiusNote),
    aliases: c.aliases,
    planets: [],
    guide: true,
    note: c.note + " Orbite : " + c.source + ", éléments osculateurs du 1er octobre 2026 propagés en Kepler. Noyau : " + c.radiusNote + ". Chevelure et queues : modèle d'activité, pas une observation.",
    links: [["JPL · Small-Body Database", "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=" + encodeURIComponent(c.id)], ["JPL · Horizons", "https://ssd.jpl.nasa.gov/horizons/"]],
  }));
}
export { jdToYear, yearToJD };
