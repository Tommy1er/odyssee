// Eclipses and shadows. Shared by the renderer (same formulas in GLSL, see system-bodies.js) and the event finder.
//
// Shadowing at a point P: the star is a uniform disc of angular radius a_s; each body j between P and the star is a
// disc of angular radius a_j at angular separation θ from the star's centre. The light kept is 1 − Σ overlap/(π a_s²)
// (umbra, penumbra and annular phases follow from the geometry). Limb darkening of the star is ignored here.
// Units are free as long as they are consistent (light-seconds in the shader, kilometres in the finder).
import { heliocentricAU, yearToJD, jdToYear, JD_J2000 } from "./solar-ephemeris.js";

export const R_SUN_KM = 695700;
export const R_EARTH_KM = 6378.137; // equatorial radius, used by the Besselian conventions
export const R_MOON_KM = 1737.4;
export const AU_KM = 149597870.7;
// TT − UT1 (≈ 69 s; NASA's eclipse predictions used 71.4–71.7 s): clock display and Earth rotation only.
import { DELTA_T_SECONDS } from "./iau-rotation.js";
export { DELTA_T_SECONDS };

// Area of intersection of two discs of radii r1, r2 whose centres are d apart.
export function discOverlap(r1, r2, d) {
  if (d >= r1 + r2) return 0;
  const rm = Math.min(r1, r2);
  if (d <= Math.abs(r1 - r2)) return Math.PI * rm * rm;
  const a = Math.min(1, Math.max(-1, (d * d + r1 * r1 - r2 * r2) / (2 * d * r1))),
    b = Math.min(1, Math.max(-1, (d * d + r2 * r2 - r1 * r1) / (2 * d * r2)));
  return r1 * r1 * Math.acos(a) + r2 * r2 * Math.acos(b) - 0.5 * Math.sqrt(Math.max(0, (-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2)));
}
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a) => Math.hypot(a[0], a[1], a[2]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
// Angle between two vectors, accurate for small angles.
export const angleBetween = (a, b) => Math.atan2(len(cross(a, b)), dot(a, b));

// Fraction of the star's light reaching P. star = {pos, radius}; occluders = [{pos, radius}].
export function starlightFraction(P, star, occluders) {
  const S = sub(star.pos, P),
    ds = len(S),
    as = star.radius / ds;
  let lit = 1;
  for (const o of occluders) {
    const J = sub(o.pos, P),
      dj = len(J);
    if (dj <= o.radius) continue;
    const along = dot(J, S) / ds;
    if (along <= 0 || along > ds) continue;
    lit *= 1 - discOverlap(as, o.radius / dj, angleBetween(S, J)) / (Math.PI * as * as);
  }
  return Math.max(0, lit);
}

// Geocentric positions (equatorial J2000 axes, km) of the Sun and the Moon at a Julian date (TT).
export function geocentric(jd) {
  const e = heliocentricAU("Terre", jd),
    m = heliocentricAU("Lune", jd);
  return { sun: e.map((x) => -x * AU_KM), moon: sub(m, e).map((x) => x * AU_KM) };
}
// Solar eclipse geometry: distance of the Moon's shadow axis from the Earth's centre (gamma, in Earth radii),
// penumbra and umbra radii (km) on the fundamental plane through the Earth's centre.
export function solarGeometry(jd) {
  const { sun, moon } = geocentric(jd),
    axis = sub(moon, sun),
    dSM = len(axis),
    e = axis.map((x) => x / dSM),
    x = -dot(moon, e),
    perp = sub(moon, e.map((k) => k * dot(moon, e))),
    rp = R_MOON_KM + (x * (R_SUN_KM + R_MOON_KM)) / dSM,
    ru = R_MOON_KM - (x * (R_SUN_KM - R_MOON_KM)) / dSM;
  return { gamma: len(perp) / R_EARTH_KM, penumbra: rp, umbra: ru, behind: x > 0 };
}
// Unit vector (geocentric, equatorial) toward the point of the Moon's shadow axis closest to the Earth's centre.
export function shadowAxisDirection(jd) {
  const { sun, moon } = geocentric(jd), axis = sub(moon, sun), e = axis.map((x) => x / len(axis)),
    perp = sub(moon, e.map((k) => k * dot(moon, e))), l = len(perp);
  return l > 1e-9 ? perp.map((x) => x / l) : sun.map((x) => x / len(sun));
}
// Lunar eclipse geometry (angles as seen from the Earth's centre): Moon's separation from the anti-Sun, shadow radii
// enlarged by 2 % for the atmosphere (Chauvenet convention), Moon semi-diameter, magnitudes.
export function lunarGeometry(jd) {
  const { sun, moon } = geocentric(jd),
    dM = len(moon),
    dS = len(sun),
    sigma = angleBetween(moon, sun.map((x) => -x)),
    piM = Math.asin(R_EARTH_KM / dM),
    piS = Math.asin(R_EARTH_KM / dS),
    sS = Math.asin(R_SUN_KM / dS),
    sM = Math.asin(R_MOON_KM / dM),
    rhoU = 1.02 * (piM + piS - sS),
    rhoP = 1.02 * (piM + piS + sS);
  return { sigma, sM, rhoU, rhoP, umbral: (rhoU + sM - sigma) / (2 * sM), penumbral: (rhoP + sM - sigma) / (2 * sM), gamma: (dM * Math.sin(sigma)) / R_EARTH_KM };
}
function minimize(f, a, b, tol = 1e-6) {
  const g = (Math.sqrt(5) - 1) / 2;
  let c = b - g * (b - a), d = a + g * (b - a), fc = f(c), fd = f(d);
  while (b - a > tol) {
    if (fc < fd) { b = d; d = c; fd = fc; c = b - g * (b - a); fc = f(c); }
    else { a = c; c = d; fc = fd; d = a + g * (b - a); fd = f(d); }
  }
  return (a + b) / 2;
}
export const SOLAR_TYPES = { total: "Éclipse totale de Soleil", annular: "Éclipse annulaire de Soleil", partial: "Éclipse partielle de Soleil" };
export const LUNAR_TYPES = { total: "Éclipse totale de Lune", partial: "Éclipse partielle de Lune", penumbral: "Éclipse pénombrale de Lune" };
// Classify the solar eclipse at its greatest instant.
export function classifySolar(g) {
  if (!g.behind || g.gamma * R_EARTH_KM > R_EARTH_KM + g.penumbra) return null;
  if (g.gamma < 1) return g.umbra > 0 ? "total" : "annular";
  return "partial";
}
export function classifyLunar(l) {
  if (l.umbral >= 1) return "total";
  if (l.umbral > 0) return "partial";
  if (l.penumbral > 0) return "penumbral";
  return null;
}
// All eclipses between two Julian dates (TT). Syzygies are found from the Sun–Moon elongation, then each candidate's
// greatest instant is refined by minimising the shadow-axis distance (solar) or the separation from the anti-Sun (lunar).
export function findEclipses(jdStart, jdEnd) {
  const out = [], step = 0.25;
  const cosElong = (jd) => { const { sun, moon } = geocentric(jd); return dot(sun, moon) / (len(sun) * len(moon)); };
  let a = cosElong(jdStart - step), b = cosElong(jdStart);
  for (let jd = jdStart; jd <= jdEnd; jd += step) {
    const c = cosElong(jd + step);
    if (b > a && b >= c && b > 0.99) {
      const t = minimize((x) => solarGeometry(x).gamma, jd - 1, jd + 1),
        g = solarGeometry(t),
        type = classifySolar(g);
      if (type && t >= jdStart && t <= jdEnd) out.push({ kind: "solar", type, label: SOLAR_TYPES[type], jd: t, gamma: g.gamma, umbra: g.umbra });
    }
    if (b < a && b <= c && b < -0.99) {
      const t = minimize((x) => lunarGeometry(x).sigma, jd - 1, jd + 1),
        l = lunarGeometry(t),
        type = classifyLunar(l);
      if (type && t >= jdStart && t <= jdEnd) out.push({ kind: "lunar", type, label: LUNAR_TYPES[type], jd: t, umbral: l.umbral, penumbral: l.penumbral, gamma: l.gamma });
    }
    a = b;
    b = c;
  }
  return out;
}
// Calendar string (UTC ≈ UT1 = TT − ΔT) for a TT Julian date.
export function utcString(jdTT) {
  const ms = (jdTT - 2440587.5) * 86400000 - DELTA_T_SECONDS * 1000;
  return new Date(ms).toISOString().replace("T", " ").slice(0, 16) + " UTC";
}
export const eclipseYear = (e) => jdToYear(e.jd);
export { yearToJD, JD_J2000 };
