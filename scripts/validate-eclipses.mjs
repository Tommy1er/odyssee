// Eclipses and multi-body rendering: disc-overlap geometry, umbra/penumbra/annular cases, the eclipse finder against
// NASA's catalogue for 2026–2028 (Espenak, eclipse.gsfc.nasa.gov), local circumstances on real paths of totality,
// Earth rotation (sub-solar point), float32 precision of the GPU path, and the choice of secondary bodies.
import assert from "node:assert/strict";
import { discOverlap, starlightFraction, findEclipses, geocentric, solarGeometry, R_SUN_KM, R_MOON_KM, R_EARTH_KM, AU_KM, DELTA_T_SECONDS } from "../src/eclipse.js";
import { bodyFrame } from "../src/iau-rotation.js";
import { catalogObjects } from "../src/body-data.js";
import { initEphemeris, updateEphemeris } from "../src/ephemeris.js";
import { SystemBodies } from "../src/system-bodies.js";
import { AU } from "../src/physics.js";

let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };
const D = Math.PI / 180;

// 1 · Geometry of two discs.
check("Disques disjoints : recouvrement nul", discOverlap(1, 0.5, 1.6) === 0);
check("Petit disque contenu : π r²", Math.abs(discOverlap(1, 0.3, 0.2) - Math.PI * 0.09) < 1e-12);
check("Disques égaux à d = r : r²(2π/3 − √3/2)", Math.abs(discOverlap(1, 1, 1) - (2 * Math.PI / 3 - Math.sqrt(3) / 2)) < 1e-12);
{ let ok = true, prev = Math.PI; for (let d = 0; d <= 2; d += 0.01) { const a = discOverlap(1, 1, d); ok = ok && a <= prev + 1e-12; prev = a; } check("Recouvrement décroissant avec la séparation", ok); }
// 2 · Umbra, annular phase, penumbra on the Sun–Earth axis (km).
{ const sun = { pos: [AU_KM, 0, 0], radius: R_SUN_KM }, earth = { pos: [0, 0, 0], radius: R_EARTH_KM };
  const L = (AU_KM * R_EARTH_KM) / (R_SUN_KM - R_EARTH_KM);
  check("Longueur de l'ombre de la Terre ≈ 1,38 million de km", Math.abs(L - 1.384e6) < 5e3, `${(L / 1e6).toFixed(3)} Mkm`);
  const inside = starlightFraction([-0.9 * L, 0, 0], sun, [earth]), beyond = starlightFraction([-1.5 * L, 0, 0], sun, [earth]);
  const as = R_SUN_KM / (AU_KM + 1.5 * L), aj = R_EARTH_KM / (1.5 * L);
  check("Dans l'ombre : aucune lumière", inside === 0);
  check("Au-delà du sommet : anneau, lumière = 1 − (a_T/a_S)²", Math.abs(beyond - (1 - (aj / as) ** 2)) < 1e-9, beyond.toFixed(4));
  const pen = starlightFraction([-384400, 6000, 0], sun, [earth]);
  check("Pénombre à la distance de la Lune (6 000 km de l’axe) : lumière partielle", pen > 0 && pen < 1, pen.toFixed(3)); }
// 3 · Io's shadow on Jupiter (illustrative orbit, real sizes): total at the sub-Io point, light outside.
{ const jupR = 69911, ioR = 1821.6, sun = { pos: [5.2 * AU_KM, 0, 0], radius: R_SUN_KM }, io = { pos: [421700, 0, 0], radius: ioR };
  check("Ombre d'Io sur Jupiter : totale au centre", starlightFraction([jupR, 0, 0], sun, [io]) === 0);
  check("Ombre d'Io : lumière pleine à 6 000 km", starlightFraction([jupR, 6000, 0], sun, [io]) === 1); }

// 4 · Eclipse finder against NASA's catalogue (greatest eclipse in TD; gamma; umbral magnitude).
const nasa = [
  ["2026-08-12T17:47:06", "solar", "total", 0.8977], ["2026-08-28T04:14:04", "lunar", "partial", 0.9299],
  ["2027-02-06T16:00:48", "solar", "annular", 0.2952], ["2027-02-20T23:14:06", "lunar", "penumbral"],
  ["2027-08-02T10:07:50", "solar", "total", 0.1421], ["2027-08-17T07:14:59", "lunar", "penumbral"],
  ["2028-01-12T04:14:13", "lunar", "partial", 0.0662], ["2028-01-26T15:08:59", "solar", "annular", 0.3902],
  ["2028-07-06T18:20:57", "lunar", "partial", 0.3892], ["2028-07-22T02:56:40", "solar", "total", 0.6056],
  ["2028-12-31T16:53:15", "lunar", "total", 1.2463],
];
const jdOf = (iso) => Date.parse(iso + "Z") / 86400000 + 2440587.5;
const found = findEclipses(jdOf("2026-07-01T00:00:00"), jdOf("2029-01-05T00:00:00"));
for (const [iso, kind, type, q] of nasa) {
  const e = found.find((x) => x.kind === kind && Math.abs(x.jd - jdOf(iso)) < 1);
  const dt = e ? (e.jd - jdOf(iso)) * 1440 : NaN;
  const val = e ? (kind === "solar" ? e.gamma : e.umbral) : NaN;
  check(`${iso.slice(0, 10)} ${kind === "solar" ? "Soleil" : "Lune"} ${type}`, e && e.type === type && Math.abs(dt) < 10 && (q === undefined || Math.abs(val - q) < (kind === "solar" ? 0.03 : 0.05)),
    `écart ${dt.toFixed(1)} min, ${kind === "solar" ? "gamma" : "magnitude"} ${val.toFixed(4)}${q !== undefined ? " (NASA " + q + ")" : ""}`);
}
check("Pas d'éclipse inventée", found.length === nasa.length, `${found.length} trouvées ; NASA liste aussi la pénombrale du 18 juillet 2027 de magnitude 0,0014, à la limite de détection`);

// 5 · Local circumstances on the ground (UT = TT − ΔT), Moon + Sun from the simulator's ephemerides.
const jdUT = (iso) => jdOf(iso) + DELTA_T_SECONDS / 86400;
function site(jd, lat, lon) { const [x, nn, z] = bodyFrame("Terre", jd), c = Math.cos(lat * D), s = Math.sin(lat * D), cl = Math.cos(lon * D), sl = Math.sin(lon * D); return [0, 1, 2].map((k) => R_EARTH_KM * (c * cl * x[k] - c * sl * z[k] + s * nn[k])); }
function light(iso, lat, lon) { const jd = jdUT(iso), { sun, moon } = geocentric(jd); return starlightFraction(site(jd, lat, lon), { pos: sun, radius: R_SUN_KM }, [{ pos: moon, radius: R_MOON_KM }]); }
check("12 août 2026, 17:46 UT, point de maximum (65,2° N, 25,2° O) : totalité", light("2026-08-12T17:46:00", 65.225, -25.228) === 0);
check("2 août 2027, 08:47 UT, Tanger : totalité", light("2027-08-02T08:47:00", 35.77, -5.8) === 0);
check("2 août 2027, 10:07 UT, Louxor : totalité", light("2027-08-02T10:07:00", 25.69, 32.64) === 0);
{ const f = light("2027-08-02T08:47:00", 33.57, -7.59); check("2 août 2027, Casablanca : partielle profonde, hors bande de totalité", f > 0.01 && f < 0.15, `${((1 - f) * 100).toFixed(1)} % du Soleil caché`); }
check("9 octobre 2026, Paris, midi : pas d'éclipse", light("2026-10-09T12:00:00", 48.85, 2.35) === 1);
// 6 · Earth rotation: sub-solar point at 12:00 UT follows the equation of time and the Sun's declination.
for (const [iso, lonExp, decExp] of [["2026-08-12T12:00:00", 1.3, 14.9], ["2026-11-03T12:00:00", -4.1, -15.2], ["2027-02-11T12:00:00", 3.55, -14.0]]) {
  const jd = jdUT(iso), { sun } = geocentric(jd), [x, nn, z] = bodyFrame("Terre", jd), u = sun.map((v) => v / Math.hypot(...sun));
  const lon = Math.atan2(-(u[0] * z[0] + u[1] * z[1] + u[2] * z[2]), u[0] * x[0] + u[1] * x[1] + u[2] * x[2]) / D, dec = Math.asin(u[0] * nn[0] + u[1] * nn[1] + u[2] * nn[2]) / D;
  check(`Point subsolaire ${iso.slice(0, 10)} 12:00 UT`, Math.abs(lon - lonExp) < 0.6 && Math.abs(dec - decExp) < 0.3, `longitude ${lon.toFixed(2)}° (équation du temps : ${lonExp}°), déclinaison ${dec.toFixed(2)}°`);
}
// 7 · GPU path: positions relative to the ship in light-seconds, rounded to float32, give the same shadow.
{ const iso = "2027-08-02T08:47:00", jd = jdUT(iso), { sun, moon } = geocentric(jd), P = site(jd, 35.77, -5.8), ship = P.map((x, k) => x + [30000, 20000, 10000][k]);
  const f32 = (v) => v.map((x) => Math.fround((x / 299792.458))), rel = (v) => f32(v.map((x, k) => x - ship[k]));
  const half = (iso2) => { const j = jdUT(iso2), g = geocentric(j); return starlightFraction(rel(site(j, 33.57, -7.59)), { pos: rel(g.sun), radius: Math.fround(R_SUN_KM / 299792.458) }, [{ pos: rel(g.moon), radius: Math.fround(R_MOON_KM / 299792.458) }]); };
  const exact = starlightFraction(site(jd, 33.57, -7.59), { pos: sun, radius: R_SUN_KM }, [{ pos: moon, radius: R_MOON_KM }]);
  check("Ombre en float32 (secondes-lumière depuis le vaisseau) = calcul en double", exact > 0.01 && exact < 0.2 && Math.abs(half(iso) - exact) < 2e-3, `Casablanca en pénombre : ${half(iso).toFixed(5)} vs ${exact.toFixed(5)}`); }
// 8 · Choice of secondary bodies.
{ const objects = catalogObjects([{ id: "h0", name: "Soleil", type: "star", xyz: [0, 0, 0], planets: [], radiusSolar: 1, temperature: 5772, lumSolar: 1 }]);
  initEphemeris(objects, { stars: {} });
  const closeup = { placeholder: null, lut: [], texture: () => ({ texture: null, ready: false }) };
  const sys = new SystemBodies({ bodyKind: { value: 1 } }, objects, closeup), by = new Map(objects.map((o) => [o.id, o]));
  const at = (id, radii) => { const o = by.get(id), R = o.radiusKm * 1000 / 9460730472580800; return o.xyz.map((x, k) => x + [radii * R, 0, 0][k]); };
  let s = { t: 0, pos: [0, 0, 2 * AU], wall: 0, retarded: false };
  updateEphemeris(objects, s);
  s = { ...s, pos: at("solar:Jupiter", 15), wall: 1 }; updateEphemeris(objects, s);
  sys.select(s, by.get("solar:Jupiter"), 0.0018);
  const jup = sys.list.map((o) => o.id);
  check("Près de Jupiter : Io, Europe et Ganymède retenues", ["moon:Io", "moon:Europe", "moon:Ganymède"].every((id) => jup.includes(id)), jup.join(", "));
  check("Le Soleil non résolu reste un point du ciel, pas un disque", !jup.includes("h0"));
  s = { ...s, pos: at("solar:Terre", 6), wall: 2 }; updateEphemeris(objects, s);
  sys.select(s, by.get("solar:Terre"), 0.0018);
  const earth = sys.list.map((o) => o.id);
  check("Près de la Terre : la Lune et le disque du Soleil retenus", earth.includes("moon:Lune") && earth.includes("h0"), earth.join(", "));
  check("Au plus sept corps secondaires", sys.list.length <= 7);
  check("Le corps principal n'est jamais secondaire", !earth.includes("solar:Terre"));
}
console.log(JSON.stringify({ passed: n }));
