// Comets and the Oort cloud: orbits against JPL Horizons, Kepler solver, perihelion dates, interstellar 3I/ATLAS,
// activity and brightness law, flux normalisation of the coma/tail model, heliocentric zones, simulator integration.
import assert from "node:assert/strict";
import { COMETS, cometHeliocentricAU, cometVelocityAUperDay, nextPerihelion, period, activity, totalMagnitude, GM_SUN_AU_D, orbitalPlane, cometObjects, cometQuality, COMET_EPOCH_JD } from "../src/comets.js";
import { comaColumn, tubeColumn } from "../src/comet-render.js";
import { region } from "../src/galaxy.js";
import { catalogObjects } from "../src/body-data.js";
import { initEphemeris, updateEphemeris } from "../src/ephemeris.js";
import { oortPopulation, cometOrbitPoints } from "../src/solar-map.js";

let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };
const by = (id) => COMETS.find((c) => c.id === id), jdOf = (iso) => Date.parse(iso + "Z") / 864e5 + 2440587.5, date = (jd) => new Date((jd - 2440587.5) * 864e5).toISOString().slice(0, 10);
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

// 1 · Halley against JPL Horizons (record 90000030, heliocentric ICRF vectors, AU and AU/day).
const halley = by("1P");
{ const ref = [-1.935582136030799e1, 2.912145587062397e1, 1.8854459805852], v = [5.477449159957385e-4, 5.742949069309254e-5, 1.683546134235561e-4];
  const p = cometHeliocentricAU(halley, jdOf("2026-10-01T00:00:00")), w = cometVelocityAUperDay(halley, jdOf("2026-10-01T00:00:00"));
  check("Halley au 1er octobre 2026 = Horizons", dist(p, ref) < 2e-5, `écart ${(dist(p, ref) * 149597870.7).toFixed(0)} km à ${Math.hypot(...p).toFixed(2)} ua du Soleil`);
  check("Vitesse de Halley = Horizons", dist(w, v) / Math.hypot(...v) < 1e-5, `écart relatif ${(dist(w, v) / Math.hypot(...v)).toExponential(1)}`); }
{ const ref = [3.537714746282207e-1, -4.755654188627957e-1, -1.799763725501752e-2], p = cometHeliocentricAU(halley, jdOf("2061-07-28T00:00:00")), e = dist(p, ref);
  const tp = nextPerihelion(halley, jdOf("2026-10-01T00:00:00")), dd = tp - jdOf("2061-07-28T12:00:00");
  check("Retour de 2061 : extrapolation képlérienne, écart documenté", e < 0.3 && Math.abs(dd) < 10, `périhélie ${date(tp)} (Horizons, planètes comprises : 28 juillet 2061), écart de position ${e.toFixed(3)} ua le 28 juillet`); }
// 2 · Kepler solver: r = q at perihelion, vis-viva everywhere, including the near-parabolic NEOWISE (e = 0.9993).
for (const c of COMETS) {
  const rq = Math.hypot(...cometHeliocentricAU(c, c.tp)) / c.q, a = c.q / (1 - c.e);
  let worst = 0;
  for (const dt of [-3000, -400, -30, 5, 90, 1200]) {
    const jd = c.tp + dt, r = Math.hypot(...cometHeliocentricAU(c, jd)), v = Math.hypot(...cometVelocityAUperDay(c, jd));
    worst = Math.max(worst, Math.abs((v * v) / (GM_SUN_AU_D * (2 / r - 1 / a)) - 1));
  }
  check(`${c.id} : r = q au périhélie et énergie de vis-viva`, Math.abs(rq - 1) < 1e-9 && worst < 1e-5, `e = ${c.e.toFixed(4)}, écart vis-viva ${worst.toExponential(1)}`);
}
// 3 · Orbits and dates.
check("Encke : période de 3,30 ans", Math.abs(period(by("2P")) / 365.25 - 3.30) < 0.01, (period(by("2P")) / 365.25).toFixed(3) + " ans");
check("Encke : prochain périhélie le 10 février 2027", date(nextPerihelion(by("2P"), COMET_EPOCH_JD)) === "2027-02-10");
check("Halley : période ≈ 75–76 ans", period(halley) / 365.25 > 74 && period(halley) / 365.25 < 77, (period(halley) / 365.25).toFixed(2));
// Osculating heliocentric elements of 2026 (comet at ≈ 50 au): the Sun's reflex motion around the barycentre shifts the
// osculating Tp by a few days from the observed perihelion of 1 April 1997.
check("Hale-Bopp : périhélie de 1997 (à quelques jours près)", Math.abs(by("C/1995 O1").tp - jdOf("1997-04-01T05:00:00")) < 4, date(by("C/1995 O1").tp) + " (observé : 1er avril 1997)");
{ const c = by("C/2025 N1"), vinf = Math.sqrt(GM_SUN_AU_D / Math.abs(c.q / (1 - c.e))) * 149597870.7 / 86400;
  check("3I/ATLAS : hyperbolique, vitesse à l'infini ≈ 58 km/s", c.e > 1 && Math.abs(vinf - 58) < 1, `${vinf.toFixed(2)} km/s`);
  check("3I/ATLAS ne repasse jamais au périhélie", nextPerihelion(c, COMET_EPOCH_JD) === Infinity);
  const r1 = Math.hypot(...cometHeliocentricAU(c, COMET_EPOCH_JD)), r2 = Math.hypot(...cometHeliocentricAU(c, COMET_EPOCH_JD + 365.25));
  check("3I/ATLAS s'éloigne d'environ 12 ua par an", r2 - r1 > 11 && r2 - r1 < 13, `${r1.toFixed(1)} → ${r2.toFixed(1)} ua`); }
check("Qualité : 2026 fiable, 2061 extrapolée, 2126 illustrative", !cometQuality(COMET_EPOCH_JD).illustrative && /Extrapolation/.test(cometQuality(jdOf("2061-07-28T00:00:00")).label) && cometQuality(jdOf("2126-07-12T00:00:00")).illustrative);
// 4 · Activity and brightness.
check("Halley inactive à 35 ua, Encke active à 1 ua", activity(halley, 35) < 0.01 && activity(by("2P"), 1) > 0.95);
check("Hale-Bopp déjà active à 6 ua (monoxyde de carbone)", activity(by("C/1995 O1"), 6) > 0.5);
{ const m = totalMagnitude(by("C/1995 O1"), 0.914, 1.315); check("Hale-Bopp au périhélie de 1997 : plus brillante que la magnitude 0", m < 0 && m > -3, `m = ${m.toFixed(2)} (observé ≈ −0,8 à −1)`); }
{ const c = by("2P"), H = totalMagnitude(c, c.q, 1); check("Encke au périhélie : m(1, r) ≈ 7,9 (Ferrín 2008, pic séculaire)", Math.abs(H - (10.25 + 5 * Math.log10(c.q))) < 1e-9 && H > 7.5 && H < 8.3, `m(1, ${c.q.toFixed(3)} ua) = ${H.toFixed(2)}`); }
{ const m = totalMagnitude(halley, 35.02, 35.5); check("Halley aujourd'hui : magnitude ≈ 26, hors de portée", m > 24 && m < 30, `m = ${m.toFixed(1)}`); }
// 5 · Flux normalisation of the emission model: the sky integral of the column equals J/d² for a distant observer.
{ const Rc = 1, Jc = 1, d = 2000, C = [0, 0, d], N = 20000, span = 40 * Rc / d; let sum = 0;
  // Rings of angular radius θ around the comet (the column depends only on ρ ≈ dθ): solid angle 2πθ dθ.
  for (let i = 0; i < N; i++) {
    const th = ((i + 0.5) / N) * span, dth = span / N;
    sum += comaColumn([Math.sin(th), 0, Math.cos(th)], C, Rc, Jc, 1e-4) * 2 * Math.PI * th * dth;
  }
  check("Chevelure : flux intégré = J/d²", Math.abs((sum * d * d) / Jc - 1) < 0.05, `rapport ${(sum * d * d / Jc).toFixed(3)}`); }
// Tails seen side-on: straight ion tube and curved dust fan (curve bent toward −v in the sky plane). Grid in the tangent
// plane at the comet's distance; cells far smaller than the narrowest width.
const tailFlux = (kap, w0, g, x0, x1, y0, y1, nx, ny) => {
  const d = 3000, C = [0, 0, d], a = [1, 0, 0], lag = [0, 1, 0], L = 3; let sum = 0;
  const dx = (x1 - x0) / nx, dy = (y1 - y0) / ny;
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
    const x = x0 + (i + 0.5) * dx, y = y0 + (j + 0.5) * dy, l = Math.hypot(x / d, y / d, 1);
    sum += tubeColumn([x / d / l, y / d / l, 1 / l], C, a, lag, kap, w0, g, L, 1) * (dx / d) * (dy / d);
  }
  return sum * d * d;
};
{ const f = tailFlux(0, 0.1, 0.015, -1, 19, -1.5, 1.5, 2000, 300);
  check("Queue ionique : flux intégré = N/d²", Math.abs(f - 1) < 0.02, `rapport ${f.toFixed(3)} (coupée à 6 L)`); }
{ const f = tailFlux(0.25 / 3, 0.3, 0.12, -2, 20, -4, 30, 880, 1360);
  check("Queue de poussières courbée : flux intégré = N/d²", Math.abs(f - 1) < 0.02, `rapport ${f.toFixed(3)}`); }
{ // Along the dust tail's curve, the surface brightness must fall smoothly: no beads at joints (the former segmented model).
  const d = 3000, C = [0, 0, d], a = [1, 0, 0], lag = [0, 1, 0], L = 3, kap = 0.25 / L, prof = [];
  for (let k = 1; k <= 160; k++) { const s = (k / 160) * 15, x = s, y = kap * s * s, l = Math.hypot(x / d, y / d, 1); prof.push(tubeColumn([x / d / l, y / d / l, 1 / l], C, a, lag, kap, 0.3, 0.12, L, 1)); }
  const bumps = prof.slice(1).filter((v, k) => v > prof[k] * 1.001).length;
  check("Queue de poussières sans perles le long de la courbe", bumps === 0, `${prof.length} points, ${bumps} remontées`); }
// 6 · Heliocentric zones and the Oort cloud population.
const AU_LY = 1 / 63241.077;
check("Zones : Kuiper, Oort interne, Oort externe", /Kuiper/.test(region([40 * AU_LY, 0, 0])) && /Oort interne/.test(region([5000 * AU_LY, 0, 0])) && /Oort externe/.test(region([60000 * AU_LY, 0, 0])) && /hypothétique/.test(region([60000 * AU_LY, 0, 0])));
check("Loin du Soleil : plus de zone héliocentrique", !/Oort|Kuiper|Système solaire/.test(region([0, 5, 0])) && region([0, 5000, 0]) !== "");
{ const pts = oortPopulation(4000), r = pts.map((p) => Math.hypot(...p) / AU_LY);
  check("Population synthétique d'Oort entre 2 000 et 100 000 ua", Math.min(...r) >= 1999 && Math.max(...r) <= 100001, `${Math.round(Math.min(...r))}–${Math.round(Math.max(...r))} ua`);
  const inner = r.filter((x) => x < 20000).length / r.length; check("Nuage interne plus dense par volume que l'externe", inner > 0.3 && inner < 0.5, `${(inner * 100).toFixed(0)} % des points`); }
{ const pts = cometOrbitPoints(halley, 1e4), rr = pts.map((p) => Math.hypot(...p) / AU_LY);
  const Q = halley.q * (1 + halley.e) / (1 - halley.e);
  check("Orbite de Halley tracée du périhélie (0,57 ua) à l'aphélie (35,1 ua)", Math.abs(Math.min(...rr) - halley.q) < 0.01 && Math.abs(Math.max(...rr) - Q) < 0.05, `${Math.min(...rr).toFixed(3)}–${Math.max(...rr).toFixed(2)} ua`); }
// 7 · Simulator integration: comets follow the mission clock and the retarded-light iteration.
{ const objects = [...catalogObjects([{ id: "h0", name: "Soleil", type: "star", xyz: [0, 0, 0], planets: [] }]), ...cometObjects()];
  initEphemeris(objects, { stars: {} });
  const h = objects.find((o) => o.id === "comet:1P"), s = { t: 0, pos: [0, 0, 2 * AU_LY], retarded: true };
  updateEphemeris(objects, s);
  const r = Math.hypot(...h.xyz) / AU_LY, delayH = h.lightDelay * 365.25 * 24;
  check("Halley dans le simulateur à 35 ua, lumière reçue avec ≈ 5 h de retard", Math.abs(r - 35.02) < 0.05 && delayH > 4.5 && delayH < 5.2, `${r.toFixed(2)} ua, ${delayH.toFixed(2)} h`);
  check("Statut de l'orbite affiché", /JPL/.test(h.motionStatus), h.motionStatus);
  check("Sept comètes visitables, sans masse gravitante", objects.filter((o) => o.type === "comet").length === 7 && objects.filter((o) => o.type === "comet").every((o) => !o.massSolar)); }
void orbitalPlane;
console.log(JSON.stringify({ passed: n }));
