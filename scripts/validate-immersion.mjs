// Immersion lot (15 October 2026): Milky Way background, photometric star clusters, galaxy worldlines and light cone,
// relativistic cosmic microwave background, visible approach schedule. Numeric checks, no browser.
import assert from "node:assert/strict";
import fs from "node:fs";
import { milkyWayLuminance, milkyWayDust, milkyWayDensity, MW_K, MW_POLE_SB, SUN_GC } from "../src/galaxy.js";
import { magPerArcsec2, PHOT_ZERO } from "../src/photometry.js";
import { clusterPopulation, turnoffMass, kroupa, rng, msMV } from "../src/cluster-population.js";
import { applyGalaxyMotion, receivedLinear, cmbForwardFlux, cmbBand, blackbodyK, blackbodyLnY, SUN_CMB_DIR, CMB_T0, LOCAL_GROUP_VR } from "../src/cosmic-motion.js";
import { BasinData } from "../src/cf4-basins.js";
import { galaxyObject } from "../src/catalogue-galaxies.js";
import { decodeCatalogue } from "../src/extragalactic-data.js";
import { localGroupObjects } from "../src/local-group.js";
import { received, positionAt } from "../src/ephemeris.js";
import { approachSchedule, approachScreenTime, destinationRoute } from "../src/navigation.js";
import * as P from "../src/physics.js";

let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };
const json = (f) => JSON.parse(fs.readFileSync(new URL("../public/" + f, import.meta.url)));
const dir = (l, b) => { l *= Math.PI / 180; b *= Math.PI / 180; return [-Math.cos(b) * Math.cos(l), Math.cos(b) * Math.sin(l), Math.sin(b)]; };
const sb = (l, b) => magPerArcsec2(MW_K * milkyWayLuminance(SUN_GC, dir(l, b)));

// 1 · Milky Way background (galaxy.js).
check("Voie lactée : pôle nord galactique calé à 23,0 mag/arcsec² (lumière non résolue)", Math.abs(sb(0, 90) - MW_POLE_SB) < 1e-3 && Math.abs(sb(0, -90) - 23) < 0.15, `NGP ${sb(0, 90).toFixed(2)}, SGP ${sb(0, -90).toFixed(2)}`);
{ const plane = [10, 20, 30, 90, 270].map((l) => sb(l, 5)), best = Math.min(...plane);
  check("Bande galactique 1,5 à 4 mag/arcsec² plus brillante que le pôle (≈ 19–21,5 mesurés)", best < 21.5 && best > 18 && plane.every((x) => x < 22.3), plane.map((x) => x.toFixed(2)).join(", ")); }
check("Fenêtre du Sagittaire plus brillante que la direction du centre, masquée par la poussière", sb(1, -4) < sb(0, 0) - 1, `(1°, −4°) ${sb(1, -4).toFixed(2)} vs (0°, 0°) ${sb(0, 0).toFixed(2)}`);
check("Largeur de la bande : à b = 30° encore ≥ 2× le pôle, à b = 60° < 1,6×", 10 ** (-0.4 * (sb(90, 30) - 23)) >= 2 && 10 ** (-0.4 * (sb(90, 60) - 23)) < 1.6, `b30 ${sb(90, 30).toFixed(2)}, b60 ${sb(90, 60).toFixed(2)}`);
{ let tot = 0, N = 0; for (let l = 0; l < 360; l += 7.3) { const u = dir(l, 0); let t = 0; for (let i = 0; i < 3000; i++) t += milkyWayDust(SUN_GC.map((x, k) => x + u[k] * (i + 0.5) * 0.001)) * 0.001; tot += t; N++; }
  const avKpc = (tot / N) * 1.086 / (3 / 3.2616); let pole = 0; for (let i = 0; i < 10000; i++) pole += milkyWayDust([SUN_GC[0], SUN_GC[1], SUN_GC[2] + (i + 0.5) * 0.001]) * 0.001;
  check("Extinction : A_V moyen 0,5–1,2 mag/kpc dans le plan, < 0,1 mag vers le pôle (Bulle locale)", avKpc > 0.5 && avKpc < 1.2 && pole * 1.086 < 0.1, `${avKpc.toFixed(2)} mag/kpc, pôle ${(pole * 1.086).toFixed(3)} mag`); }
{ // Adaptive march vs a fine reference integration (steps 3 ly growing slowly with distance).
  const fine = (u) => { let s = 0, tr = 1, t = 0; for (let i = 0; i < 20000 && t < 60; i++) { const ds = Math.min(0.003 + 0.004 * t, 0.2), p = SUN_GC.map((x, k) => x + u[k] * (t + ds / 2)); if (Math.abs(p[2]) > 14) break; tr *= Math.exp(-milkyWayDust(p) * ds); const r = milkyWayLuminanceAt(p); s += r * ds * tr; t += ds; } return s; };
  const rel = [[90, 30], [0, 90], [180, 5]].map(([l, b]) => milkyWayLuminance(SUN_GC, dir(l, b)) / fine(dir(l, b)) - 1);
  check("Marche adaptative (pas ∝ distance) fidèle à une intégration fine à 8 % près", rel.every((x) => Math.abs(x) < 0.08), rel.map((x) => (100 * x).toFixed(1) + " %").join(", ")); }
// Luminance density at p, same colour weights as milkyWayLuminance.
function milkyWayLuminanceAt(p) { const r = milkyWayDensity(p), e = [r[0] * 0.778 + r[1] + r[2] * 0.6, r[0] * 0.708 + r[1] * 0.7 + r[2] * 0.7, r[0] * 0.694 + r[1] * 0.42 + r[2] * 0.95]; return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]; }

// 2 · Star clusters (cluster-population.js).
{ const r = rng(7); let m1 = 0, all = 0; for (let i = 0; i < 2e5; i++) { const m = kroupa(r()); all++; if (m >= 1) m1++; }
  check("FMI de Kroupa : ≈ 10 % des étoiles au-dessus de 1 M☉ (0,08–120 M☉)", m1 / all > 0.08 && m1 / all < 0.12, (m1 / all).toFixed(3)); }
check("Masse au coude (ordre de grandeur des isochrones) : 1 Gyr → 1,9–2,3 M☉, 100 Myr → 4,5–5,5 M☉, 10 Myr → 12–18 M☉", turnoffMass(9) > 1.9 && turnoffMass(9) < 2.3 && turnoffMass(8) > 4.5 && turnoffMass(8) < 5.5 && turnoffMass(7) > 12 && turnoffMass(7) < 18, [9, 8, 7].map((a) => turnoffMass(a).toFixed(2)).join(", "));
check("Séquence principale : M_V(1 M☉) = 4,8 ; M_V(0,5) = 9,0 ; monotone", msMV(1) === 4.8 && msMV(0.5) === 9 && [0.1, 0.3, 1, 3, 10, 40].every((m, i, a) => !i || msMV(m) < msMV(a[i - 1])));
const clusters = [...json("catalogue.json").stars, ...json("galaxy-catalogue.json").stars].filter((o) => o.type === "cluster");
const byName = (s) => clusters.find((o) => o.name === s);
{ const o = byName("NGC 2682"), p = clusterPopulation(o), dm = 5 * Math.log10(o.d / 3.26156) - 5, brightest = Math.min(...p.absMag) + dm + p.av;
  check("Amas ouvert (M67) : âge Cantat-Gaudin exporté, étoiles dessinées toutes plus faibles que V = 7 vues du Soleil", o.logAge === 9.63 && brightest > 7 && p.merged === 0, `log âge ${o.logAge}, ${p.drawn} étoiles, la plus brillante V = ${brightest.toFixed(2)}`); }
{ const o = byName("Melotte 25"), p = clusterPopulation(o), dm = 5 * Math.log10(o.d / 3.26156) - 5;
  // Members brighter than G = 18 implied by the drawn population (+ the bright ones left to HYG, from the same model): ≈ published.
  const drawnBelow18 = p.absMag.filter((M) => M + dm + p.av < 18).length;
  check("Hyades : effectif total déduit des 515 membres G < 18 publiés ; dessin = membres plus faibles que V = 7", p.N > 515 && drawnBelow18 <= 515 && drawnBelow18 > 400, `N = ${p.N}, dessinées sous G = 18 : ${drawnBelow18}`); }
{ const o = byName("Omega Centauri"), p = clusterPopulation(o), dm = 5 * Math.log10(o.d / 3.26156) - 5, V = p.MV + dm + p.av;
  check("ω Centauri : lumière intégrée dessinée = V publiée (3,68) à 0,05 mag près, faibles étoiles fusionnées en points pondérés", Math.abs(V - o.mag) < 0.05 && p.merged > 0 && p.drawn + p.merged <= 6000, `V = ${V.toFixed(3)}, ${p.drawn} individus + ${p.merged} points pondérés pour N ≈ ${(p.N / 1e6).toFixed(2)} million`); }

// 3 · Galaxy worldlines and past light cone (cosmic-motion.js).
const meta = json("cf4-basins-2023.json"), raw = fs.readFileSync(new URL("../public/cf4-basins-2023.bin", import.meta.url));
const basins = new BasinData(meta, raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength)), field = (p) => basins.velocityEqAt(p.map((x) => x / 1e6));
const cf4 = decodeCatalogue("cf4", json("cf4-map.json"));
const m87 = applyGalaxyMotion(galaxyObject(cf4.find((r) => r.raw[0] === 41361)), field);
check("M87 : vitesse radiale héliocentrique tirée du décalage CF4 (1 284 km/s mesurés au NED)", Math.abs(m87.cosmicMotion.vr - 1284) < 15 && m87.cosmicMotion.vt > 0, `${m87.cosmicMotion.vr.toFixed(0)} km/s radiale, ${m87.cosmicMotion.vt.toFixed(0)} km/s transverse (modèle)`);
{ const r = received(m87, [0, 0, 0], 0), off = Math.hypot(...r.xyz.map((x, k) => x - m87.catalogueXYZ[k]));
  check("Cône de lumière : vue du Soleil à l’époque du catalogue, la galaxie est exactement à sa position publiée", off < 1e-6 * m87.d && Math.abs(r.delay - m87.d) < 1e-6 * m87.d, `écart ${off.toExponential(1)} al, délai ${(r.delay / 1e6).toFixed(2)} millions d’années`);
  const now = positionAt(m87, 0), shift = Math.hypot(...now.map((x, k) => x - m87.catalogueXYZ[k]));
  check("Position « maintenant » décalée de v·d (≈ 0,2 million d’al pour M87)", Math.abs(shift - Math.hypot(...m87.motion) * m87.d) < 1 && shift > 1e5 && shift < 4e5, `${(shift / 1e6).toFixed(3)} million d’al`);
  const half = m87.catalogueXYZ.map((x) => x / 2), seen = received(m87, half, 0);
  check("À mi-chemin, la lumière reçue est plus récente (délai ≈ d/2) et la galaxie apparaît déplacée", Math.abs(seen.delay - m87.d / 2) < 0.02 * m87.d && Math.hypot(...seen.xyz.map((x, k) => x - m87.catalogueXYZ[k])) > 5e4, `délai ${(seen.delay / 1e6).toFixed(2)} millions d’années`); }
{ const route = destinationRoute({ object: m87, name: "M87" }, [0, 0, 0], 0), arrival = positionAt(m87, route.plan.t), miss = Math.hypot(...route.end.map((x, k) => x - arrival[k]));
  check("Interception : le point d’arrivée suit la galaxie au moment de l’arrivée (pas sa position publiée)", Math.abs(miss - 2.4 * m87.radiusLy) < 0.02 * m87.radiusLy && Math.hypot(...route.end.map((x, k) => x - m87.catalogueXYZ[k])) > 2e5, `arrivée après ${(route.plan.t / 1e6).toFixed(1)} millions d’années, écart à la position publiée ${(Math.hypot(...route.end.map((x, k) => x - m87.catalogueXYZ[k])) / 1e6).toFixed(2)} million d’al`); }
{ const lg = localGroupObjects().map((o) => applyGalaxyMotion(o, field));
  check("Groupe local : vitesses radiales mesurées, transverse inconnue (aucun flux reconstruit sous 10 millions d’al)", lg.every((o) => Math.abs(o.cosmicMotion.vr - LOCAL_GROUP_VR[o.id]) < 1e-9 && o.cosmicMotion.vt === 0)); }
{ const far = applyGalaxyMotion({ id: "test", xyz: [0, 0, 5e9], type: "cosmic" }, field);
  check("Hors de la reconstruction : expansion seule, pas de vitesse transverse inventée", far.cosmicMotion.vt === 0 && /expansion/.test(far.cosmicMotion.radial), `${far.cosmicMotion.vr.toFixed(0)} km/s`); }
{ const out = [0, 0, 0], d = receivedLinear([10, 0, 0], [0.5, 0, 0], [0, 0, 0], 0, out);
  check("Cône de lumière linéaire exact (source fuyant à 0,5 c)", Math.abs(d - 20 / 3) < 1e-12 && Math.abs(out[0] - 20 / 3) < 1e-12, `délai ${d}`); }

// 4 · Cosmic microwave background (cosmic-motion.js, sky-optics.js).
{ const ra = Math.atan2(SUN_CMB_DIR[1], SUN_CMB_DIR[0]) * 180 / Math.PI, dec = Math.asin(SUN_CMB_DIR[2]) * 180 / Math.PI;
  check("Dipôle du CMB : apex solaire vers α ≈ 168°, δ ≈ −7° (Planck 2018)", Math.abs(((ra + 360) % 360) - 167.9) < 0.3 && Math.abs(dec + 6.9) < 0.3, `${((ra + 360) % 360).toFixed(2)}°, ${dec.toFixed(2)}°`); }
check("Flux du CMB au repos = σT⁴ = 3,13 µW/m² ; à γ = 10⁶, (16/3) γ² σT⁴", Math.abs(cmbForwardFlux(1, 0) / (5.670374419e-8 * CMB_T0 ** 4) - 1) < 1e-9 && Math.abs(cmbForwardFlux(1e6, Math.sqrt(1 - 1e-12), 1 / (1e12 * 2)) / ((16 / 3) * 1e12 * 5.670374419e-8 * CMB_T0 ** 4) - 1) < 0.01, cmbForwardFlux(1e6, Math.sqrt(1 - 1e-12), 5e-13).toExponential(3) + " W/m²");
{ const lut = json("assets/blackbody-lut.json"), K = blackbodyK(lut, PHOT_ZERO), sun = (K * Math.exp(blackbodyLnY(lut, 5772)) * Math.PI * (6.957e8 / 1.495978707e11) ** 2);
  check("Calibration du corps noir : la photosphère solaire redonne V = −26,74 à 1 ua", Math.abs(-2.5 * Math.log10(sun / PHOT_ZERO) + 26.74) < 1e-9);
  const mag = (g) => { const b = Math.sqrt(1 - 1 / g / g); return -2.5 * Math.log10(cmbBand(lut, K, g, 1 / (g * g * (1 + b))).F / PHOT_ZERO); };
  check("CMB visible : invisible à γ = 20 (V > 100), éclatant au-delà de γ ≈ 300, point aveuglant (V < −20) à γ = 10⁶", mag(20) > 100 && mag(300) < -10 && mag(1e6) < -20, `γ 20 : ${mag(20).toFixed(0)}, 200 : ${mag(200).toFixed(1)}, 300 : ${mag(300).toFixed(1)}, 10⁶ : ${mag(1e6).toFixed(1)}`); }

// 5 · Visible approach schedule (navigation.js).
{ const prox = { id: "p", type: "star", radiusSolar: 0.154 }, m31 = { id: "m31", type: "galaxy", radiusLy: 110000 }, endOf = (o, d) => [0, 0, d - (o.radiusLy || (0.154 * 695700000) / 9.4607304725808e15) * (o.type === "galaxy" ? 2.4 : 5)];
  const sP = approachSchedule(prox, [0, 0, 0], endOf(prox, 4.22)), sM = approachSchedule(m31, [0, 0, 0], endOf(m31, 2.5e6)), plan = P.plan(Math.hypot(...endOf(m31, 2.5e6)));
  check("Approche d’Andromède : commence au début du freinage (mi-parcours), pas au départ", Math.abs(sM.window / plan.t - 0.5) < 0.01, (sM.window / plan.t).toFixed(3));
  check("Approche visible ≈ 6–15 s d’écran, étoile comme galaxie", [sP, sM].every((s) => approachScreenTime(s) > 6 && approachScreenTime(s) < 15), [sP, sM].map((s) => approachScreenTime(s).toFixed(1) + " s").join(", ")); }
console.log(JSON.stringify({ passed: n }));
