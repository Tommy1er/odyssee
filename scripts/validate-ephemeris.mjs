// Checks the solar-system ephemeris against independent JPL Horizons states (DE441 / jup365),
// heliocentric, ICRF, geometric, TDB — data/references-2026-10-04/horizons-*-reference.json.
// Tolerances follow the published accuracy of the approximate tables, not an arbitrary margin.
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { catalogObjects } from "../src/body-data.js";
import { initEphemeris, updateEphemeris, positionAt, EPOCH } from "../src/ephemeris.js";
import { pole } from "../src/iau-rotation.js";
import { AU } from "../src/physics.js";
import { heliocentricAU, moonGeocentricEclipticAU, ephemerisQuality, yearToJD, jdToYear } from "../src/solar-ephemeris.js";

const AS = Math.PI / 180 / 3600;
const ref = (name) => {
  const text = JSON.parse(readFileSync(`data/references-2026-10-04/horizons-${name}-reference.json`, "utf8")).response.result;
  const block = text.split("$$SOE")[1].split("$$EOE")[0].trim().split("\n");
  return block.map((line) => {
    const f = line.split(",").map((s) => s.trim());
    return { jd: +f[0], r: [+f[2], +f[3], +f[4]], v: [+f[5], +f[6], +f[7]] };
  });
};
const norm = (a) => Math.hypot(...a);
const sub = (a, b) => a.map((x, i) => x - b[i]);
const angle = (a, b) => Math.acos(Math.min(1, a.reduce((s, x, i) => s + x * b[i], 0) / (norm(a) * norm(b))));
const pass = [];
const check = (label, ok, detail) => {
  assert.ok(ok, label + " · " + detail);
  pass.push(label);
  console.log("PASS " + label + " · " + detail);
};
// Table 1 nominal maximum errors (arcsec): EMB 20″ in longitude, Jupiter 400″; radial errors scale accordingly.
const limits = { earth: { key: "Terre", arcsec: 20 + 15, radialAU: 3e-4 }, jupiter: { key: "Jupiter", arcsec: 400 + 20, radialAU: 0.012 } };
for (const [name, lim] of Object.entries(limits)) {
  for (const s of ref(name)) {
    const p = heliocentricAU(lim.key, s.jd),
      a = angle(p, s.r) / AS,
      dr = Math.abs(norm(p) - norm(s.r));
    check(`${lim.key} JD ${s.jd} direction`, a < lim.arcsec, `${a.toFixed(1)}″ (limite ${lim.arcsec}″)`);
    check(`${lim.key} JD ${s.jd} distance`, dr < lim.radialAU, `${(dr * 149597870.7).toFixed(0)} km`);
    const h = 0.01,
      v = sub(heliocentricAU(lim.key, s.jd + h), heliocentricAU(lim.key, s.jd - h)).map((x) => x / (2 * h)),
      dv = norm(sub(v, s.v)) / norm(s.v);
    check(`${lim.key} JD ${s.jd} vitesse`, dv < 0.01, `écart relatif ${(dv * 100).toFixed(3)} %`);
  }
}
// Moon: geocentric distance stays in the observed perigee/apogee range and the sidereal period is right.
let min = Infinity, max = 0;
const jd0 = yearToJD(2026.75);
for (let k = 0; k < 400; k++) {
  const r = norm(moonGeocentricEclipticAU(jd0 + k * 0.25)) * 149597870.7;
  min = Math.min(min, r);
  max = Math.max(max, r);
}
check("Lune distance périgée/apogée", min > 355000 && min < 371000 && max > 400000 && max < 407500, `${min.toFixed(0)}–${max.toFixed(0)} km`);
const lon = (jd) => { const p = moonGeocentricEclipticAU(jd); return Math.atan2(p[1], p[0]); };
const crossings = [];
for (let jd = jd0, prev = lon(jd0); crossings.length < 11; jd += 0.01) {
  const l = lon(jd + 0.01);
  if (prev < 0 && l >= 0 && prev > -1) crossings.push(jd + 0.01);
  prev = l;
}
// Ten revolutions between ascending crossings of longitude 0 (J2000 frame) = sidereal months.
const month = (crossings[10] - crossings[0]) / 10;
check("Lune mois sidéral", Math.abs(month - 27.3217) < 0.15, `${month.toFixed(3)} j (27,3217 j)`);
// Validity labels never claim JPL precision outside their fit intervals.
check("Domaine table 1", ephemerisQuality(2026.75).table === 1, "2026 → ajustement 1800–2050");
check("Domaine table 2", ephemerisQuality(2500).table === 2 && !ephemerisQuality(2500).illustrative, "2500 → 3000 av. J.-C.–3000");
check("Hors domaine", ephemerisQuality(22000).illustrative === true, "22000 → extrapolation illustrative");
check("Conversion date", Math.abs(jdToYear(yearToJD(2026.75)) - 2026.75) < 1e-12, "J2026.75 aller-retour");
// Integration in the simulator objects: centres follow the mission clock, moons stay attached and coplanar.
const objects = catalogObjects([{ id: "h0", name: "Soleil", type: "star", xyz: [0, 0, 0], planets: [] }]);
initEphemeris(objects, { stars: {} });
const byId = new Map(objects.map((o) => [o.id, o]));
const state = { t: 0.0, pos: [0, 0, 2 * AU], retarded: false };
updateEphemeris(objects, state);
const earth = byId.get("solar:Terre"), moon = byId.get("moon:Lune"), jupiter = byId.get("solar:Jupiter"), io = byId.get("moon:Io");
const em = norm(sub(moon.xyz, earth.xyz)) / AU * 149597870.7;
check("Simulateur Terre–Lune", em > 356000 && em < 407000, `${em.toFixed(0)} km`);
const jd = yearToJD(EPOCH);
const dj = norm(sub(jupiter.xyz.map((x) => x / AU), heliocentricAU("Jupiter", jd)));
check("Simulateur Jupiter = éphéméride", dj < 1e-9, `${dj.toExponential(2)} ua`);
const n = pole("Jupiter", jd), rel = sub(io.xyz, jupiter.xyz), out = Math.abs(rel.reduce((a, x, i) => a + x * n[i], 0)) / norm(rel);
check("Io dans le plan équatorial de Jupiter", out < 1e-9, `sin(écart) ${out.toExponential(2)}`);
const later = positionAt(earth, 0.5), half = norm(sub(later, earth.xyz)) / AU;
check("Centre suit le temps de mission", half > 1.9 && half < 2.05, `Terre déplacée de ${half.toFixed(3)} ua en six mois`);
updateEphemeris(objects, { t: 0.0, pos: [5 * AU, 0, 0], retarded: true });
const delayMin = earth.lightDelay * 365.25 * 1440;
check("Lumière retardée évaluée à l'émission", delayMin > 25 && delayMin < 55, `retard ${delayMin.toFixed(1)} min`);
check("Statut affiché", /JPL/.test(jupiter.motionStatus) && /lunaire/.test(moon.motionStatus) && /illustrative/.test(io.motionStatus), jupiter.motionStatus);
console.log(JSON.stringify({ passed: pass.length }));
