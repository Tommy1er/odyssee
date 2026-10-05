// Solar-system ephemeris for the mission clock.
// Planets: JPL "Approximate Positions of the Planets" (E. M. Standish), Keplerian elements and rates,
// https://ssd.jpl.nasa.gov/planets/approx_pos.html — copies in data/references-2026-10-04/jpl-elements-table-*.txt.
// Output frame: heliocentric, ICRF/equatorial J2000 axes (the catalogue axes), light-years; time: TDB ≈ TT.
// Moon: simplified lunar theory of P. Schlyter ("How to compute planetary positions"), a few arcminutes near 2000.
// These are fits over finite intervals, not an exact ephemeris: every result carries its validity label.
import { AU } from "./physics.js";

const DEG = Math.PI / 180;
export const OBLIQUITY_J2000 = 23.43928 * DEG;
export const JD_J2000 = 2451545.0;
// Mission catalogue epoch J2026.75 (Julian epoch years, TDB).
export const yearToJD = (year) => JD_J2000 + (year - 2000) * 365.25;
export const jdToYear = (jd) => 2000 + (jd - JD_J2000) / 365.25;

// [a, e, I, L, longPeri, longNode] then rates per Julian century. Table 1: 1800–2050.
const TABLE_1 = {
  Mercure: [0.38709927, 0.20563593, 7.00497902, 252.2503235, 77.45779628, 48.33076593,
    0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081],
  Vénus: [0.72333566, 0.00677672, 3.39467605, 181.9790995, 131.60246718, 76.67984255,
    0.0000039, -0.00004107, -0.0007889, 58517.81538729, 0.00268329, -0.27769418],
  EMB: [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0,
    0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0],
  Mars: [1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891,
    0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343],
  Jupiter: [5.202887, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909,
    -0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106],
  Saturne: [9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448,
    -0.0012506, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794],
  Uranus: [19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.9542763, 74.01692503,
    -0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589],
  Neptune: [30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574,
    0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664],
};
// Table 2a: 3000 BC – AD 3000.
const TABLE_2 = {
  Mercure: [0.38709843, 0.20563661, 7.00559432, 252.25166724, 77.45771895, 48.33961819,
    0.0, 0.00002123, -0.00590158, 149472.67486623, 0.15940013, -0.12214182],
  Vénus: [0.72332102, 0.00676399, 3.39777545, 181.9797085, 131.76755713, 76.67261496,
    -0.00000026, -0.00005107, 0.00043494, 58517.8156026, 0.05679648, -0.27274174],
  EMB: [1.00000018, 0.01673163, -0.00054346, 100.46691572, 102.93005885, -5.11260389,
    -0.00000003, -0.00003661, -0.01337178, 35999.37306329, 0.3179526, -0.24123856],
  Mars: [1.52371243, 0.09336511, 1.85181869, -4.56813164, -23.91744784, 49.71320984,
    0.00000097, 0.00009149, -0.00724757, 19140.29934243, 0.45223625, -0.26852431],
  Jupiter: [5.20248019, 0.0485359, 1.29861416, 34.33479152, 14.27495244, 100.29282654,
    -0.00002864, 0.00018026, -0.00322699, 3034.90371757, 0.18199196, 0.13024619],
  Saturne: [9.54149883, 0.05550825, 2.49424102, 50.07571329, 92.86136063, 113.63998702,
    -0.00003065, -0.00032044, 0.00451969, 1222.11494724, 0.54179478, -0.25015002],
  Uranus: [19.18797948, 0.0468574, 0.77298127, 314.20276625, 172.43404441, 73.96250215,
    -0.00020455, -0.0000155, -0.00180155, 428.49512595, 0.09266985, 0.05739699],
  Neptune: [30.06952752, 0.00895439, 1.7700552, 304.22289287, 46.68158724, 131.78635853,
    0.00006447, 0.00000818, 0.000224, 218.46515314, 0.01009938, -0.00606302],
};
// Table 2b: extra mean-anomaly terms b, c, s, f for the giants (Table 2 interval only).
const TABLE_3 = {
  Jupiter: [-0.00012452, 0.0606406, -0.35635438, 38.35125],
  Saturne: [0.00025899, -0.13434469, 0.87320147, 38.35125],
  Uranus: [0.00058331, -0.97731848, 0.17689245, 7.67025],
  Neptune: [-0.00041348, 0.68346318, -0.10162547, 7.67025],
};
// Nominal maximum longitude errors published with Table 1 (arcseconds), for honest labels.
const TABLE_1_ERROR = { Mercure: 15, Vénus: 20, EMB: 20, Mars: 40, Jupiter: 400, Saturne: 600, Uranus: 50, Neptune: 10 };

export const PLANET_KEYS = Object.keys(TABLE_1);
// Moon/Earth mass ratio (DE430): Earth = EMB − μ/(1+μ) · (Moon − Earth).
const MOON_EARTH = 0.0123000371;
const EARTH_SHARE = MOON_EARTH / (1 + MOON_EARTH);

export function eclipticToEquatorial([x, y, z], eps = OBLIQUITY_J2000) {
  const c = Math.cos(eps), s = Math.sin(eps);
  return [x, c * y - s * z, s * y + c * z];
}
function solveKepler(M, e) {
  let E = M + e * Math.sin(M);
  for (let k = 0; k < 30; k++) {
    const d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= d;
    if (Math.abs(d) < 1e-14) break;
  }
  return E;
}
export function ephemerisQuality(year) {
  if (year >= 1800 && year <= 2050) return { table: 1, label: "Éphéméride approchée JPL · ajustement 1800–2050" };
  if (year >= -3000 && year <= 3000) return { table: 2, label: "Éphéméride approchée JPL · ajustement 3000 av. J.-C.–3000, précision réduite" };
  return { table: 2, label: "Extrapolation illustrative hors du domaine des tables JPL", illustrative: true };
}
// Heliocentric ecliptic J2000 position in AU.
export function planetEclipticAU(key, jd) {
  const year = jdToYear(jd),
    q = ephemerisQuality(year),
    row = (q.table === 1 ? TABLE_1 : TABLE_2)[key],
    T = (jd - JD_J2000) / 36525;
  if (!row) throw Error("Planète inconnue : " + key);
  const a = row[0] + row[6] * T,
    e = row[1] + row[7] * T,
    I = (row[2] + row[8] * T) * DEG,
    L = row[3] + row[9] * T,
    peri = row[4] + row[10] * T,
    node = (row[5] + row[11] * T) * DEG;
  let M = L - peri;
  if (q.table === 2 && TABLE_3[key]) {
    const [b, c, s, f] = TABLE_3[key];
    M += b * T * T + c * Math.cos(f * T * DEG) + s * Math.sin(f * T * DEG);
  }
  M = ((((M + 180) % 360) + 360) % 360) - 180;
  const w = peri * DEG - node,
    E = solveKepler(M * DEG, e),
    xp = a * (Math.cos(E) - e),
    yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const cw = Math.cos(w), sw = Math.sin(w), cO = Math.cos(node), sO = Math.sin(node), cI = Math.cos(I), sI = Math.sin(I);
  return [
    (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
    (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
    sw * sI * xp + cw * sI * yp,
  ];
}
// Geocentric Moon, ecliptic J2000, AU. Schlyter's elements are referred to the equinox of date:
// precess the longitude back to J2000 (1.3966°/century) before rotating to the equator.
export function moonGeocentricEclipticAU(jd) {
  const d = jd - 2451543.5,
    N = (125.1228 - 0.0529538083 * d) * DEG,
    i = 5.1454 * DEG,
    w = (318.0634 + 0.1643573223 * d) * DEG,
    a = 60.2666,
    e = 0.0549,
    M = (115.3654 + 13.0649929509 * d) * DEG,
    Ms = (356.047 + 0.9856002585 * d) * DEG,
    ws = (282.9404 + 4.70935e-5 * d) * DEG;
  const E = solveKepler(M, e),
    xv = a * (Math.cos(E) - e),
    yv = a * Math.sqrt(1 - e * e) * Math.sin(E),
    v = Math.atan2(yv, xv);
  let r = Math.hypot(xv, yv);
  const xh = r * (Math.cos(N) * Math.cos(v + w) - Math.sin(N) * Math.sin(v + w) * Math.cos(i)),
    yh = r * (Math.sin(N) * Math.cos(v + w) + Math.cos(N) * Math.sin(v + w) * Math.cos(i)),
    zh = r * Math.sin(v + w) * Math.sin(i);
  let lon = Math.atan2(yh, xh),
    lat = Math.atan2(zh, Math.hypot(xh, yh));
  const Ls = Ms + ws,
    Lm = M + w + N,
    D = Lm - Ls,
    F = Lm - N,
    s = Math.sin,
    c = Math.cos;
  lon +=
    (-1.274 * s(M - 2 * D) + 0.658 * s(2 * D) - 0.186 * s(Ms) - 0.059 * s(2 * M - 2 * D) - 0.057 * s(M - 2 * D + Ms) +
      0.053 * s(M + 2 * D) + 0.046 * s(2 * D - Ms) + 0.041 * s(M - Ms) - 0.035 * s(D) - 0.031 * s(M + Ms) -
      0.015 * s(2 * F - 2 * D) + 0.011 * s(M - 4 * D)) * DEG;
  lat +=
    (-0.173 * s(F - 2 * D) - 0.055 * s(M - F - 2 * D) - 0.046 * s(M + F - 2 * D) + 0.033 * s(F + 2 * D) +
      0.017 * s(2 * M + F)) * DEG;
  r += -0.58 * c(M - 2 * D) - 0.46 * c(2 * D);
  lon -= 3.82394e-5 * d * DEG;
  const R = (r * 6378.14) / 149597870.7;
  return [R * Math.cos(lat) * Math.cos(lon), R * Math.cos(lat) * Math.sin(lon), R * Math.sin(lat)];
}
export function moonQuality(year) {
  return year >= 1800 && year <= 2200
    ? { label: "Théorie lunaire simplifiée (Schlyter) · quelques minutes d'arc" }
    : { label: "Lune : extrapolation illustrative hors du domaine de la théorie simplifiée", illustrative: true };
}
// Heliocentric equatorial (catalogue axes) position in AU for a solar-system body key.
export function heliocentricAU(key, jd) {
  if (key === "Terre" || key === "Lune") {
    const emb = planetEclipticAU("EMB", jd),
      moon = moonGeocentricEclipticAU(jd),
      earth = emb.map((x, k) => x - EARTH_SHARE * moon[k]);
    return eclipticToEquatorial(key === "Terre" ? earth : earth.map((x, k) => x + moon[k]));
  }
  return eclipticToEquatorial(planetEclipticAU(key, jd));
}
export function heliocentricLy(key, year) {
  return heliocentricAU(key, yearToJD(year)).map((x) => x * AU);
}
export function ephemerisLabel(key, year) {
  const base = ephemerisQuality(year);
  if (key === "Lune") {
    const m = moonQuality(year);
    return { label: m.label + " · Terre : " + base.label, illustrative: m.illustrative || base.illustrative };
  }
  const err = base.table === 1 && !base.illustrative ? TABLE_1_ERROR[key === "Terre" ? "EMB" : key] : null;
  return {
    label: base.label + (err ? " · erreur nominale ≤ " + err + "″ en longitude" : "") + (key === "Terre" ? " · Terre = barycentre Terre-Lune corrigé de la Lune" : ""),
    illustrative: base.illustrative,
  };
}
export const isSolarKey = (key) => key === "Terre" || key === "Lune" || key in TABLE_1;
