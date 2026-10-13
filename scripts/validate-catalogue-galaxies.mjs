// Catalogued galaxies as cockpit destinations: classes from Hubble type, morphology or distance method, sizes, duplicates
// with the existing Local Group objects, positions identical to the map's, illustrative orientations, nearest search.
import assert from "node:assert/strict";
import fs from "node:fs";
import { decodeCatalogue } from "../src/extragalactic-data.js";
import { classFromT, classFromMorphology, classFromMethods, buildLocalGalaxies, galaxyObject, sameGalaxy, nearestRows, cf4Id, nameVariants, LY_PER_KPC } from "../src/catalogue-galaxies.js";
import { localGroupObjects } from "../src/local-group.js";

let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };
const load = (k) => JSON.parse(fs.readFileSync(new URL("../public/" + k + "-map.json", import.meta.url)));
const payloads = { ungc: load("ungc"), mcconnachie: load("mcconnachie") }, cf4 = decodeCatalogue("cf4", load("cf4"));
const fixed = localGroupObjects();

// 1 · Classes.
check("Types de Hubble UNGC : dSph, S0, spirales, irrégulières", classFromT(-3, "Sph") === "dSph" && classFromT(-1, "") === "S0" && classFromT(3) === "Sbc" && classFromT(7) === "Scd" && classFromT(9, "Im") === "Sm" && classFromT(10, "Ir") === "Ir");
check("Morphologies McConnachie", classFromMorphology("dSph") === "dSph" && classFromMorphology("dIrr") === "Ir" && classFromMorphology("Sc") === "Scd" && classFromMorphology("cE") === "dE");
check("CF4 : Tully–Fisher ⇒ spirale ; plan fondamental, SBF ⇒ elliptique ; SN Ia seule ⇒ inconnue",
  classFromMethods(["Tully–Fisher"]).cls === "Sbc" && classFromMethods(["Plan fondamental"]).cls === "E" && classFromMethods(["Fluctuations de brillance de surface"]).cls === "E" && classFromMethods(["Supernova Ia"]).cls === "unknown" && classFromMethods(["Tully–Fisher", "Fluctuations de brillance de surface"]).cls === "Sab");
// 2 · Local catalogues: duplicates of M31, M33 and the Magellanic Clouds point to the existing objects.
const { list, alias } = buildLocalGalaxies(payloads, fixed);
check("UNGC M31, M33, LMC, SMC renvoient aux objets existants", alias.get("ungc:MESSIER031") === "m31" && alias.get("ungc:MESSIER033") === "m33" && alias.get("ungc:LMC") === "lmc" && alias.get("ungc:SMC") === "smc", [...alias].filter(([k]) => /MESSIER03|LMC|SMC/.test(k)).map((x) => x.join("→")).join(", "));
check("McConnachie : Andromède renvoie à M31", alias.get("mcconnachie:Andromeda") === "m31", alias.get("mcconnachie:Andromeda"));
check("Aucun doublon entre UNGC et McConnachie (Sagittarius, Fornax, M32, NGC 55 fusionnés)", list.every((a) => a.catalogue !== "mcconnachie" || list.every((b) => b.catalogue !== "ungc" || !sameGalaxy(a, b))) && ["mcconnachie:Fornax", "mcconnachie:M32", "mcconnachie:NGC 55", "mcconnachie:Sagittarius dSph"].every((k) => alias.has(k)), `${list.length} galaxies gardées (${list.filter((o) => o.catalogue === "ungc").length} UNGC, ${list.filter((o) => o.catalogue === "mcconnachie").length} McConnachie)`);
{ const m81 = list.find((o) => o.id === "ungc:MESSIER081"), scl = list.find((o) => o.id === "ungc:Sculptor");
  check("M81 : spirale Sb, rayon = moitié du diamètre UNGC (31,35 kpc)", m81.galaxyClass === "Sbc" && Math.abs(m81.radiusLy / LY_PER_KPC - 15.675) < 1e-9 && /31,35 kpc/.test(m81.sizeSource), m81.classSource);
  check("Sculptor : sphéroïdale naine, faible brillance de surface", scl.galaxyClass === "dSph" && scl.shapeCode === 4 && scl.shapeParams[3] <= 0.03);
  check("Voie lactée exclue (nous sommes dedans), renvoyée au modèle existant", alias.get("ungc:Milky Way") === "sgr-a" && !list.some((o) => /milky way/i.test(o.catalogueRow.name)));
  check("Nom affiché M81, NGC 253", m81.name === "M81" && list.find((o) => o.id === "ungc:NGC0253").name === "NGC 253");
  check("Noms usuels : M81, NGC 253", m81.aliases.includes("M81") && list.find((o) => o.id === "ungc:NGC0253").aliases.includes("NGC 253")); }
// 3 · Positions: same equatorial axes as the map (Mly) and the cockpit (ly).
{ let worst = 0;
  for (const o of list) { const r = o.catalogueRow; worst = Math.max(worst, Math.hypot(...o.xyz.map((x, k) => x - r.p[k] * 1e6)) / o.d); }
  check("Positions cockpit = positions de la carte", worst < 1e-12, `écart relatif ${worst.toExponential(1)}`); }
// 4 · CF4 objects.
{ const row = cf4.find((r) => r.raw[0] === 41361), m87 = galaxyObject(row);
  check("M87 (PGC 41361) : elliptique, d’après les fluctuations de brillance de surface", m87.galaxyClass === "E" && /fluctuations/.test(m87.classSource) && /taille typique supposée/.test(m87.sizeSource), `${(m87.d / 1e6).toFixed(1)} millions d’al`);
  check("M87 : μ = 31,134 ⇒ 16,86 Mpc ≈ 55,0 millions d’al", Math.abs(m87.d / 1e6 - 10 ** (6.134 / 5) * 3.261563777) < 1e-6 && Math.abs(m87.d / 1e6 - 55.0) < 0.05);
  const tf = cf4.filter((r) => r.methods.length === 1 && r.methods[0] === "Tully–Fisher").slice(0, 400).map((r) => galaxyObject(r));
  check("Galaxies Tully–Fisher : orientation illustrative avec i ≥ 45°", tf.every((o) => o.inc >= 45 && o.inc <= 90 && o.galaxyClass === "Sbc"), `${tf.length} cas, i min ${Math.min(...tf.map((o) => o.inc)).toFixed(1)}°`);
  const m31 = galaxyObject(cf4.find((r) => r.raw[0] === 2557));
  check("M32 et M110 (NGC 205) restent distinctes de M31", !alias.has("ungc:M32") && !alias.has("ungc:NGC0205"));
  check("CF4 PGC 2557 = M31 existant (repéré comme doublon)", sameGalaxy(m31, fixed.find((o) => o.id === "m31"))); }
check("Recherche « PGC 41361 », « pgc41361 », « cf4:41361 »", cf4Id("PGC 41361") === 41361 && cf4Id("pgc41361") === 41361 && cf4Id("cf4:41361") === 41361 && cf4Id("M87") === null);
check("Variantes de noms", nameVariants("MESSIER031").includes("M31") && nameVariants("UGC00064").includes("UGC 64"));
// 5 · Nearest catalogued galaxies to a position (slots of the renderer) = brute force.
{ const pos = cf4.find((r) => r.raw[0] === 41361).p.map((x) => x * 1e6), got = nearestRows(cf4, pos, 4, 5e7).map((r) => r.raw[0]);
  const brute = cf4.map((r) => [Math.hypot(...r.p.map((x, k) => x * 1e6 - pos[k])), r.raw[0]]).sort((a, b) => a[0] - b[0]).slice(0, 4).map((x) => x[1]);
  check("Voisines les plus proches de M87 = recherche exhaustive", got.join() === brute.join(), got.join(", ")); }
console.log(JSON.stringify({ passed: n }));
