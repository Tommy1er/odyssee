// Body orientation: IAU/WGCCRE mean rotation elements (Archinal et al. 2018, Celest. Mech. Dyn. Astr. 130:22),
// pole right ascension/declination in ICRF and prime-meridian angle W(d), d = days from J2000 TDB.
// Small nutation/libration terms are omitted. Surface texture longitudes follow each map's own convention.
const DEG = Math.PI / 180;
// key: [alpha0, alpha rate /century, delta0, delta rate /century, W0, W rate deg/day]
const ELEMENTS = {
  Soleil: [286.13, 0, 63.87, 0, 84.176, 14.1844],
  Mercure: [281.0103, -0.0328, 61.4155, -0.0049, 329.5988, 6.1385108],
  Vénus: [272.76, 0, 67.16, 0, 160.2, -1.4813688],
  Terre: [0, -0.641, 90, -0.557, 190.147, 360.9856235],
  Mars: [317.68143, -0.1061, 52.8865, -0.0609, 176.63, 350.89198226],
  Jupiter: [268.056595, -0.006499, 64.495303, 0.002413, 284.95, 870.536],
  Saturne: [40.589, -0.036, 83.537, -0.004, 38.9, 810.7939024],
  Uranus: [257.311, 0, -15.175, 0, 203.81, -501.1600928],
  Neptune: [299.36, 0, 43.46, 0, 249.978, 541.1397757],
  // Moon: mean pole only; its frame is phase-locked toward Earth in bodyFrame().
  Lune: [269.9949, 0.0031, 66.5392, 0.013, 38.3213, 13.17635815],
};
export const hasIAU = (key) => key in ELEMENTS;
const radec = (a, d) => [Math.cos(d) * Math.cos(a), Math.cos(d) * Math.sin(a), Math.sin(d)];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = (a) => { const n = Math.hypot(...a); return a.map((x) => x / n); };
export function pole(key, jd) {
  const e = ELEMENTS[key],
    T = (jd - 2451545) / 36525;
  return radec((e[0] + e[1] * T) * DEG, (e[2] + e[3] * T) * DEG);
}
// Rows of the world→body matrix. Body axes: +x prime meridian, +y north pole, +z = x × y,
// so that east longitude (−z in the texture convention used by closeup.js) follows the rotation.
export function bodyFrame(key, jd, towardParent = null) {
  const e = ELEMENTS[key],
    d = jd - 2451545,
    n = pole(key, jd),
    node = unit(cross([0, 0, 1], n)),
    q = cross(n, node);
  let x;
  if (key === "Lune" && towardParent) {
    // Synchronous rotation: the mean sub-Earth meridian faces the Earth.
    const t = unit(towardParent),
      along = t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
    x = unit(t.map((v, i) => v - n[i] * along));
  } else {
    const W = (e[4] + e[5] * d) * DEG;
    x = node.map((v, i) => Math.cos(W) * v + Math.sin(W) * q[i]);
  }
  return [x, n, cross(x, n)];
}
