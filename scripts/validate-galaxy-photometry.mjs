// Galaxy photometry (scripts/build-galaxy-photometry.py → public/galaxy-photometry.*; src/galaxy-photometry.js) and the
// photometric calibration of the volumetric galaxy models (src/local-group.js). Numeric checks, no browser.
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import * as T from "three";
import { photometryFrom, enrichGalaxy, GalaxyLightLayer, TYPICAL_MV } from "../src/galaxy-photometry.js";
import { localGroupObjects, galaxyOrientation, groupLuminosity, groupRayRadiance, calibratedGain } from "../src/local-group.js";
import { galaxyObject } from "../src/catalogue-galaxies.js";
import { decodeCatalogue } from "../src/extragalactic-data.js";
import { fluxFromMag } from "../src/photometry.js";

let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };
const meta = JSON.parse(fs.readFileSync(new URL("../public/galaxy-photometry.json", import.meta.url)));
const raw = fs.readFileSync(new URL("../public/galaxy-photometry.bin", import.meta.url)), buf = raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength);
const data = photometryFrom(meta, buf), c = data.col, at = (id) => data.index.get(id);
const manifest = JSON.parse(fs.readFileSync(new URL("../data/references-2026-10-04/MANIFEST.json", import.meta.url)));

// 1 · Provenance and integrity.
check("Binaire = SHA-256 déclaré ; quatre sources citées", crypto.createHash("sha256").update(raw).digest("hex") === meta.binarySHA256 && meta.sources.length === 4 && ["2mrs-2012.tsv.gz", "ungc-2013.tsv.gz", "mcconnachie-2012.tsv.gz"].every((f) => manifest.files[f]));
check("Toutes les entrées CF4 présentes ; 2MRS sans distance mesurée ajoutées avec une distance de Hubble signalée", meta.stats.cf4 === 55877 && meta.stats["2mrsHubble"] > 30000 && meta.ids.filter((id) => id.startsWith("2mrs:")).every((id) => c.flags[at(id)] % 8 === 4), JSON.stringify(meta.stats));
// 2 · Measured magnitudes of reference galaxies (apparent V_T: RC3 / NED).
const ref = { "ungc:MESSIER031": [3.44, 0.25], "ungc:MESSIER081": [6.94, 0.25], "ungc:NGC5128": [6.84, 0.2], "ungc:MESSIER033": [5.72, 0.1], "ungc:Fornax": [7.4, 0.05], "ungc:LMC": [0.4, 0.25] };
check("Magnitudes V de référence retrouvées (M31, M81, Centaurus A, M33, Fornax, LMC)", Object.entries(ref).every(([id, [V, tol]]) => Math.abs(c.V[at(id)] - V) <= tol), Object.keys(ref).map((id) => id.split(":")[1] + " " + c.V[at(id)].toFixed(2)).join(", "));
check("Préférence des magnitudes : V McConnachie > B UNGC > K 2MRS (Fornax : V mesurée ; M31 : B UNGC, pas le K contaminé)", Math.floor(c.flags[at("ungc:Fornax")] / 8) === 1 && Math.floor(c.flags[at("ungc:MESSIER031")] / 8) === 2);
check("Doublons : Andromeda (McConnachie) fusionnée avec M31 (UNGC) ; angle de position McConnachie conservé pour Fornax", (meta.alt["ungc:MESSIER031"] || []).includes("mcconnachie:Andromeda") && Math.abs(c.pa[at("ungc:Fornax")] - 41) < 0.5);
{ // No 2MRS-only row lies within 15" of a CF4 galaxy (would be the same galaxy twice).
  const u = (i) => { const a = c.ra[i] * Math.PI / 180, d = c.dec[i] * Math.PI / 180; return [Math.cos(d) * Math.cos(a), Math.cos(d) * Math.sin(a), Math.sin(d)]; };
  const cells = new Map(), key = (v) => v.map((x) => Math.floor(x / 0.001)).join(",");
  meta.ids.forEach((id, i) => { if (id.startsWith("cf4:")) { const k = key(u(i)); (cells.get(k) || cells.set(k, []).get(k)).push(i); } });
  let dup = 0; meta.ids.forEach((id, i) => { if (!id.startsWith("2mrs:")) return; const v = u(i), b = v.map((x) => Math.floor(x / 0.001));
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) for (const j of cells.get([b[0] + x, b[1] + y, b[2] + z].join(",")) || []) { const w = u(j); if (Math.acos(Math.min(1, v[0] * w[0] + v[1] * w[1] + v[2] * w[2])) < (15 / 3600) * Math.PI / 180) dup++; } });
  check("Appariement 2MRS ↔ CF4 : aucune galaxie en double à moins de 15″", dup === 0, `${dup}`); }
// 3 · Enrichment of cockpit objects.
const cf4 = decodeCatalogue("cf4", JSON.parse(fs.readFileSync(new URL("../public/cf4-map.json", import.meta.url))));
{ const m87 = galaxyObject(cf4.find((r) => r.raw[0] === 41361)); enrichGalaxy(m87, data);
  check("M87 (CF4) : type 2MRS elliptique au lieu de la classe déduite de la méthode, magnitude 2MRS", m87.galaxyClass === "E" && /2MRS/.test(m87.classSource) && Math.abs(m87.Vmag - 8.6) < 0.6, `${m87.galaxyClass}, V = ${m87.Vmag.toFixed(2)} (V_T mesurée 8,63)`); }
{ const tf = cf4.find((r) => r.methods.includes("Tully–Fisher") && Number.isFinite(c.q[at("cf4:" + r.raw[0])]) && c.T[at("cf4:" + r.raw[0])] >= 3), o = galaxyObject(tf); enrichGalaxy(o, data);
  check("Spirale Tully–Fisher : inclinaison tirée du rapport d’axes mesuré, plus d’orientation tirée au hasard", /mesuré/.test(o.incSource) && o.inc > 0 && o.inc <= 90, `${o.name} : i = ${o.inc.toFixed(1)}°`); }
{ const o = { id: "x", galaxyClass: "Sbc", xyz: [0, 0, 32.6156 * 1e5] }; enrichGalaxy(o, null);
  check("Sans magnitude publiée : estimation par la luminosité typique de la classe, signalée", Math.abs(o.Vmag - (TYPICAL_MV.Sbc + 25)) < 1e-9 && /^estimée/.test(o.vmagSource)); }
// 4 · Photometric calibration of the volumetric models.
{ const o = localGroupObjects()[0], R = galaxyOrientation(o), w = calibratedGain(o, 0, [1, 1, 0.045], 0, R), D = Math.hypot(...o.xyz) / o.radiusLy;
  // Independent check: render the model from the Sun with diverging rays (camera at the real distance) and integrate.
  const ctr = new T.Vector3(...o.xyz).divideScalar(o.radiusLy), eye = ctr.clone().negate().applyMatrix3(R).toArray(), axis = ctr.clone().normalize();
  const e1 = new T.Vector3(0, 0, 1).cross(axis).normalize(), e2 = axis.clone().cross(e1), N = 40, half = 1.05 / D; let F = 0;
  for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) { const x = (-1 + (a + 0.5) * 2 / N) * half, y = (-1 + (b + 0.5) * 2 / N) * half, ray = axis.clone().addScaledVector(e1, x).addScaledVector(e2, y).normalize().applyMatrix3(R).toArray();
    F += groupRayRadiance(0, [1, 1, 0.045, 1], 0, eye, ray) * (2 * half / N) ** 2; }
  F *= w; const m = -2.5 * Math.log10(F / fluxFromMag(0));
  check("Andromède en volume : flux intégré vu du Soleil = V 3,44 à 0,1 mag près (rendu indépendant, rayons divergents)", Math.abs(m - 3.44) < 0.1, `V = ${m.toFixed(3)}, gain ${w.toExponential(3)} (ancien éclat qualitatif : 1)`); }
{ const o = localGroupObjects()[0], R = galaxyOrientation(o), d = new T.Vector3(...o.xyz).normalize().applyMatrix3(R).toArray(), e16 = groupLuminosity(0, [1, 1, 0.045, 1], 0, d, 16), e48 = groupLuminosity(0, [1, 1, 0.045, 1], 0, d, 48);
  check("Intégrale de calibration convergée (grille 16 vs 48 : < 2 %)", Math.abs(e16 / e48 - 1) < 0.02, `${(100 * (e16 / e48 - 1)).toFixed(2)} %`); }
// 5 · Galaxy light layer: rows, hidden volumes, foreground extinction law.
{ const layer = new GalaxyLightLayer(JSON.parse(fs.readFileSync(new URL("../public/assets/blackbody-lut.json", import.meta.url))));
  layer.setData(data, null); const k = layer.rows.findIndex((r) => r.id === "ungc:MESSIER081");
  layer.update({ pos: [0, 0, 0], t: 0, retarded: true, band: 1 }, new Set(["ungc:MESSIER081"]), 0);
  const p = layer.points.geometry.attributes.position, sh = layer.points.geometry.attributes.shown, r = layer.rows[k], off = Math.hypot(p.getX(k) - r.xyz[0], p.getY(k) - r.xyz[1], p.getZ(k) - r.xyz[2]);
  check("Galaxies en lumière : toutes celles qui ont une magnitude ; vue du Soleil, position = catalogue ; galaxie déjà en volume masquée", layer.rows.length === meta.stats.withV && off / r.d < 1e-6 && sh.getX(k) === 0, `${layer.rows.length} galaxies`);
  layer.update({ pos: [0, 0, 2e5], t: 0, retarded: true, band: 1 }, new Set(), 10);
  check("Extinction d’avant-plan de la Voie lactée retirée hors de la Galaxie", layer.material.uniforms.avScale.value === 0); }
console.log(JSON.stringify({ passed: n }));
