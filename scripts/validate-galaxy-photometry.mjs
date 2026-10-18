// Galaxy photometry (scripts/build-galaxy-photometry.py → public/galaxy-photometry.*; src/galaxy-photometry.js) and the
// photometric calibration of the volumetric galaxy models (src/local-group.js). Numeric checks, no browser.
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import * as T from "three";
import { photometryFrom, enrichGalaxy, GalaxyLightLayer, TYPICAL_MV, doppler } from "../src/galaxy-photometry.js";
import { localGroupObjects, galaxyOrientation, groupLuminosity, groupRayRadiance, calibratedGain, LocalGroupLayer, volumeWeight } from "../src/local-group.js";
import { applyGalaxyMotion } from "../src/cosmic-motion.js";
import { BasinData } from "../src/cf4-basins.js";
import { received } from "../src/ephemeris.js";
import { sourceTint, objectTemp, foregroundScale } from "../src/galaxy-photometry.js";
import {spectralSourceTint,spectralClassFromObject} from "../src/galaxy-spectral.js";
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
  check("M87 (CF4) : type 2MRS elliptique au lieu de la classe déduite de la méthode", m87.galaxyClass === "E" && /2MRS/.test(m87.classSource), m87.classSource);
  check("M87, hors de l’échantillon de calibration : V par la voie K corrigée = V_T mesurée 8,63 à 0,15 mag près (9,13 avant correction)", Math.abs(m87.Vmag - 8.63) < 0.15 && !meta.ids.some((id) => /^ungc:(MESSIER087|NGC4486)$/.test(id)), `V = ${m87.Vmag.toFixed(2)}`); }
{ const k = meta.kRouteCorrection; check("Correction empirique de la voie K publiée dans le fichier : elliptiques > spirales Sa–Sb, effectifs donnés", k["byTypeBin(E,S0,Sa-Sb,Sc-Sd,Irr)"][0] > k["byTypeBin(E,S0,Sa-Sb,Sc-Sd,Irr)"][2] && k.galaxies.reduce((a, b) => a + b) > 100, JSON.stringify(k["byTypeBin(E,S0,Sa-Sb,Sc-Sd,Irr)"])); }
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
// 6 · Redshift of the galaxies' own light (Doppler factor of their worldline).
{ const layer = new GalaxyLightLayer(JSON.parse(fs.readFileSync(new URL("../public/assets/blackbody-lut.json", import.meta.url))));
  layer.setData(data, null); const dsun = layer.points.geometry.attributes.dsun, k = layer.rows.findIndex((r) => r.id === "cf4:41361");
  layer.update({ pos: [0, 0, 0], t: 0, retarded: true, band: 1 }, new Set(), 0);
  const dship = layer.points.geometry.attributes.dship, far = layer.rows.reduce((b, r, i) => (r.d > layer.rows[b].d ? i : b), 0), z = 1 / dsun.getX(far) - 1;
  check("Vu du Soleil : décalage spectral propre = celui du catalogue (flux inchangé) ; M87 D☉ ≈ 1 − 1 280/c", Math.abs(dship.getX(k) - dsun.getX(k)) < 1e-6 && Math.abs(dsun.getX(k) - (1 - 1280 / 299792.458)) < 2e-4, `D☉ = ${dsun.getX(k).toFixed(5)}`);
  check("Galaxie la plus lointaine décalée vers le rouge au premier ordre (z ≈ cz/c)", z > 0.05 && z < 0.2, `z = ${z.toFixed(3)} à ${(layer.rows[far].d / 1e6).toFixed(0)} millions d’al`);
  const v = [0, 0, -0.01], from = doppler(v, [0, 0, -1]), behind = doppler(v, [0, 0, 1]);
  check("Doppler : une source qui s’approche est décalée vers le bleu, qui s’éloigne vers le rouge (1 % de c)", from > 1.0099 && behind < 0.9901, `${from.toFixed(4)} / ${behind.toFixed(4)}`); }
// 7 · Point ↔ volume coherence (the three closing criteria of the 16 October lot).
{ const lut = JSON.parse(fs.readFileSync(new URL("../public/assets/blackbody-lut.json", import.meta.url))), bm = JSON.parse(fs.readFileSync(new URL("../public/cf4-basins-2023.json", import.meta.url))), braw = fs.readFileSync(new URL("../public/cf4-basins-2023.bin", import.meta.url));
  const basins = new BasinData(bm, braw.buffer.slice(braw.byteOffset, braw.byteOffset + braw.byteLength)), field = (p) => basins.velocityEqAt(p.map((x) => x / 1e6));
  const fixed = localGroupObjects().map((o) => applyGalaxyMotion(o, field)), layer = new LocalGroupLayer({}, fixed, new T.Group(), () => new T.Object3D(), new T.Group());
  layer.setLut(lut); layer.calibrateFixed(); const Y = (t) => 0.2126 * t.x + 0.7152 * t.y + 0.0722 * t.z;
  for (const o of fixed) { const r = received(o, [0, 0, 0], 0); o.lightXYZ = r.xyz; }
  layer.update({ pos: [0, 0, 0], t: 0, pixelAngle: 1.2e-3 }, 1, false);
  check("1 · Vu du Soleil : luminosité V calibrée (Y = 1), couleur spectrale égale à celle des points", fixed.every((o,i) => {
    const t=layer.u.groupTint.value[i], p=o.lightXYZ||o.xyz, v=o.motion||[0,0,0], dc=Math.hypot(...(o.catalogueXYZ||o.xyz)),cat=o.catalogueXYZ||o.xyz,dr=Math.hypot(...p),Dsun=doppler(v,cat.map(x=>-x/dc)),D=doppler(v,p.map(x=>-x/dr));
    const expect=spectralSourceTint(spectralClassFromObject(o),Dsun,D,o.avFg||0,1);
    return !!expect && Math.abs(Y(t)-1)<1e-4 && expect.every((z,j)=>Math.abs(z-[t.x,t.y,t.z][j])<1e-5);
  }), layer.u.groupTint.value.slice(0, 4).map((t) => Y(t).toFixed(4)).join(", "));
  // M87 approached along the line of sight: point share + volume share = the model's light, through the hand-over.
  const m87 = applyGalaxyMotion(galaxyObject(cf4.find((r) => r.raw[0] === 41361)), field); enrichGalaxy(m87, data); layer.setCatalogue([m87]);
  const cat = m87.catalogueXYZ, dc = Math.hypot(...cat), u = cat.map((x) => x / dc), rows = [];
  for (const dPix of [2, 3.5, 5, 6.5, 8, 12]) {
    const dist = 2 * m87.radiusLy / (dPix * 1.2e-3), P = cat.map((x, k) => x - u[k] * dist), r = received(m87, P, 0); m87.lightXYZ = r.xyz;
    const s = { pos: P, t: 0, pixelAngle: 1.2e-3, target: m87 }; layer.slotKey = null; layer.update(s, 1, false);
    const i = 4 + layer.slots.indexOf(m87), h = layer.handoff.get(m87.id), R = layer.u.groupRotations.value[i], Pm = layer.u.groupParams.value[i];
    // Volume light: diverging rays from the ship over the whole model, times its gain and its tint.
    const rel = r.xyz.map((x, k) => x - P[k]), d = Math.hypot(...rel), ctr = new T.Vector3(...rel).divideScalar(m87.radiusLy), eye = ctr.clone().negate().applyMatrix3(R).toArray(), axis = ctr.clone().normalize();
    const e1 = new T.Vector3(0, 0, 1).cross(axis).normalize(), e2 = axis.clone().cross(e1), N = 36, half = 1.05 * m87.radiusLy / d; let F = 0;
    for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) { const x = (-1 + (a + 0.5) * 2 / N) * half, y = (-1 + (b + 0.5) * 2 / N) * half; F += groupRayRadiance(layer.u.groupShapes.value[i], [Pm.x, Pm.y, Pm.z, 1], layer.u.groupSeeds.value[i], eye, axis.clone().addScaledVector(e1, x).addScaledVector(e2, y).normalize().applyMatrix3(R).toArray()) * (2 * half / N) ** 2; }
    const volume = F * Pm.w * Y(layer.u.groupTint.value[i]);
    // Point light, formula of the point shader: catalogue flux, distance, own Doppler + foreground (sourceTint), share.
    const v = m87.motion, Dsun = doppler(v, cat.map((x) => -x / dc)), Dship = doppler(v, rel.map((x) => -x / d)), own = spectralSourceTint(spectralClassFromObject(m87),Dsun,Dship,m87.avFg||0,foregroundScale(Math.hypot(...P))) || sourceTint(lut,objectTemp(m87),Dsun,Dship,m87.avFg||0,foregroundScale(Math.hypot(...P)));
    const k = data.index.get("cf4:41361"), dcat = data.col.mly[k] * 1e6, point = fluxFromMag(m87.Vmag) * (dcat / d) ** 2 * Y({ x: own[0], y: own[1], z: own[2] }) * h.aniso * (1 - h.w);
    rows.push({ dPix, w: h.w, total: point + volume });
  }
  const refFlux = rows.at(-1).total, jumps = rows.map((x) => x.total / refFlux * (rows.at(-1).dPix / x.dPix) ** 2);
  check("2 · Passage point → volume (M87 approchée, 2 à 12 px) : lumière totale continue à 6 % près, sans saut", jumps.every((x) => Math.abs(x - 1) < 0.06) && rows[0].w === 0 && rows.at(-1).w === 1, rows.map((x, j) => `${x.dPix} px w=${x.w.toFixed(2)} ${jumps[j].toFixed(3)}`).join(" · "));
  // Ship velocity: the source factors use positions only; the ship's Doppler is applied once, by sky-optics, after the volumes.
  const tints = (u) => { layer.update({ pos: [0, 0, 0], t: 0, pixelAngle: 1.2e-3, u }, 1, false); return layer.u.groupTint.value.map((t) => [t.x, t.y, t.z]).flat(); };
  const rest = tints([0, 0, 0]), fast = tints([7, 0, 0]);
  const sky = fs.readFileSync(new URL("../src/sky-optics.js", import.meta.url), "utf8"), iGroup = sky.indexOf("+groupRadiance(ray)"), iDop = sky.indexOf("if(optics>.5&&shift>.5&&momentum>.000001)"), pts = fs.readFileSync(new URL("../src/galaxy-photometry.js", import.meta.url), "utf8");
  check("3 · Doppler du vaisseau appliqué une seule fois : facteurs des galaxies identiques au repos et à 0,99 c ; volumes ajoutés au ciel avant l’unique transformation de sky-optics ; points sans terme de vitesse du vaisseau", rest.every((x, j) => x === fast[j]) && iGroup > 0 && iDop > iGroup && sky.split("if(optics>.5&&shift>.5&&momentum>.000001)").length === 2 && !/momentum|speed/.test(pts.slice(pts.indexOf("const vertexShader"), pts.indexOf("const fragmentShader")))); }
{
  // 4 · The point and the volume of the same Local Group galaxy are the same object: positions within 0.2 model radius.
  const pairs = { m31: "ungc:MESSIER031", m33: "ungc:MESSIER033", lmc: "ungc:LMC", smc: "ungc:SMC" }, gaps = [];
  for (const o of localGroupObjects()) { const k = at(pairs[o.id]), ra = c.ra[k] * Math.PI / 180, de = c.dec[k] * Math.PI / 180, d = c.mly[k] * 1e6;
    const p = [d * Math.cos(de) * Math.cos(ra), d * Math.cos(de) * Math.sin(ra), d * Math.sin(de)], X = o.catalogueXYZ || o.xyz;
    gaps.push([o.id, Math.hypot(...p.map((x, j) => x - X[j])) / o.radiusLy]); }
  check("4 · Point photométrique et volume d’une même galaxie du Groupe local au même endroit (écart < 0,45 rayon ; M33 aligné sur UNGC)", gaps.every(([, g]) => g < 0.45) && gaps.find(([id]) => id === "m33")[1] < 0.1, gaps.map(([id, g]) => id + " " + g.toFixed(3)).join(", "));
}
console.log(JSON.stringify({ passed: n }));
