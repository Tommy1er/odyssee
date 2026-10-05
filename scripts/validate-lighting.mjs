// Spacecraft illumination: inverse-square flux, choice of the dominant source by flux, frame transformation.
import assert from "node:assert/strict";
import { AU, norm, dot, mul, gamma } from "../src/physics.js";
import { sourceFlux, dominantSources, inShipFrame, displayIntensity, ADAPTATION_FLOOR } from "../src/ship-lighting.js";
let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };
const sun = { id: "h0", name: "Soleil", type: "star", xyz: [0, 0, 0], lumSolar: 1, temperature: 5772 };
const e1 = sourceFlux(sun, [AU, 0, 0]).E, e2 = sourceFlux(sun, [2 * AU, 0, 0]).E;
check("Éclairement terrestre = 1", Math.abs(e1 - 1) < 1e-12, "1 L☉ à 1 ua");
check("Distance doublée → flux divisé par quatre", Math.abs(e1 / e2 - 4) < 1e-12, (e1 / e2).toFixed(6));
// A distant but very luminous star can dominate a nearby faint one.
const faint = { id: "a", name: "naine", type: "star", xyz: [0, 0, 1], lumSolar: 0.001, temperature: 3000 };
const giant = { id: "b", name: "supergéante", type: "star", xyz: [0, 0, -30], lumSolar: 1e5, temperature: 3600 };
const at = [0, 0, 0.5];
const dom = dominantSources([faint, giant], at, 2);
check("Source dominante choisie par flux, pas par proximité", dom[0].o.id === "b", `naine ${sourceFlux(faint, at).E.toExponential(2)} vs supergéante ${sourceFlux(giant, at).E.toExponential(2)}`);
check("Sources triées par flux", dom.length === 2 && dom[0].E >= dom[1].E);
const close = [0, 0, 1 - 0.001];
check("Bascule quand on s'approche de la naine", dominantSources([faint, giant], close, 1)[0].o.id === "a");
// Comoving relativistic frame: aberration toward the motion and point-source flux ∝ D².
const beta = 0.9, u = mul([1, 0, 0], beta * gamma(beta));
const side = { o: sun, dir: [0, 1, 0], E: 1, T: 5772 }, ahead = { o: sun, dir: [1, 0, 0], E: 1, T: 5772 }, behind = { o: sun, dir: [-1, 0, 0], E: 1, T: 5772 };
const sa = inShipFrame(side, u), fa = inShipFrame(ahead, u), ba = inShipFrame(behind, u);
check("Aberration vers l'avant", dot(sa.dir, [1, 0, 0]) > 0.85, `cos θ' = ${dot(sa.dir, [1, 0, 0]).toFixed(4)} (β attendu ${beta})`);
check("Direction unitaire", Math.abs(norm(sa.dir) - 1) < 1e-12);
const Dexp = Math.sqrt((1 + beta) / (1 - beta));
check("Doppler avant D = √((1+β)/(1−β))", Math.abs(fa.doppler / Dexp - 1) < 1e-9, fa.doppler.toFixed(6));
check("Flux ponctuel ∝ D²", Math.abs(fa.E / (Dexp * Dexp) - 1) < 1e-9 && Math.abs(ba.E * Dexp * Dexp - 1) < 1e-9, `avant ×${fa.E.toFixed(3)}, arrière ×${ba.E.toFixed(4)}`);
check("Température de couleur ∝ D", Math.abs(fa.T / (5772 * Dexp) - 1) < 1e-9);
// Display: exposure never adds light; it only adapts down to a floor, then the hull darkens proportionally.
check("Adaptation : même rendu à 1 ua et 10 ua", Math.abs(displayIntensity(1, 1) - displayIntensity(0.01, 0.01)) < 1e-12);
check("Sous le plancher, assombrissement proportionnel", Math.abs(displayIntensity(ADAPTATION_FLOOR / 100, ADAPTATION_FLOOR / 100) / displayIntensity(1, 1) - 0.01) < 1e-12);
check("Rapport des sources secondaires conservé", Math.abs(displayIntensity(0.25, 1) / displayIntensity(1, 1) - 0.25) < 1e-12);
console.log(JSON.stringify({ passed: n }));
