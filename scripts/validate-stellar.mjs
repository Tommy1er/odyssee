// Stellar physical parameters: internal consistency, provenance and spot checks against published values.
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { applyStellarPhysics, limbDarkening, blackbodyRGB } from "../src/stellar-physics.js";
const table = JSON.parse(readFileSync("public/stellar-physics.json", "utf8"));
const cat = JSON.parse(readFileSync("public/catalogue.json", "utf8")).stars;
const lut = JSON.parse(readFileSync("public/assets/blackbody-lut.json", "utf8"));
let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };
const rows = Object.entries(table.stars);
check("Toutes les valeurs finies et positives", rows.every(([, r]) => r[0] > 500 && r[1] > 0 && r[2] > 0 && isFinite(r[1]) && isFinite(r[2])), rows.length + " étoiles");
const sb = rows.map(([, r]) => Math.abs(r[2] / (r[1] * r[1] * (r[0] / 5772) ** 4) - 1));
check("Stefan-Boltzmann L = R²(T/T☉)⁴", Math.max(...sb) < 0.01, "écart max " + (Math.max(...sb) * 100).toFixed(2) + " %");
check("Chaque valeur a une méthode connue", rows.every(([, r]) => ["lit", "cat", "dwarf", "dwarf-mean", "color", "type"].includes(r[3])));
check("Références obligatoires pour littérature et catalogue", rows.every(([, r]) => !["lit", "cat"].includes(r[3]) || (r[5] && r[5].length > 10)));
const stars = cat.filter((o) => o.type === "star").map((o) => ({ ...o }));
applyStellarPhysics(stars, table);
const by = (name) => stars.find((o) => o.name === name);
// Published values (R☉): tolerance reflects the method — literature exact, inferred values within 30 %.
const ref = [["Soleil", 1, 0.001], ["Betelgeuse", 764, 0.001], ["Rigel", 78.9, 0.001], ["Sirius", 1.711, 0.001], ["Epsilon Eridani", 0.735, 0.1], ["Fomalhaut", 1.842, 0.3], ["Regulus", 3.5, 0.3], ["Spica", 7.47, 0.3], ["Alnilam", 32.4, 0.4]];
for (const [name, R, tol] of ref) {
  const o = by(name);
  check(`${name} rayon`, o && Math.abs(o.radiusSolar / R - 1) <= tol, `${o?.radiusSolar} R☉ (publié ${R}, tolérance ${tol * 100} %) · ${o?.stellar.label}`);
}
check("Bételgeuse supergéante, pas 1 R☉", by("Betelgeuse").radiusSolar > 500);
check("Alnilam chaude malgré B−V saturé", by("Alnilam").temperature > 20000, by("Alnilam").temperature + " K");
check("Aucune naine géante", rows.filter(([, r]) => r[3] === "dwarf" && r[1] > 30).length === 0, "type V → rayon ≤ 30 R☉");
check("Drapeau système multiple", by("Alpha Centauri A + B").stellar.label.includes("multiple") || /non résolu/.test(by("Alpha Centauri A + B").stellar.ref));
check("Assombrissement centre-bord borné", [3000, 5772, 10000, 30000].every((T) => limbDarkening(T) > 0.2 && limbDarkening(T) < 0.9) && limbDarkening(3000) > limbDarkening(30000));
const c = (T) => blackbodyRGB(lut, T);
check("Couleur corps noir : rouge froid, bleu chaud", c(3000)[0] > c(3000)[2] && c(25000)[2] > c(25000)[0]);
console.log(JSON.stringify({ passed: n, counts: table.meta.counts }));
