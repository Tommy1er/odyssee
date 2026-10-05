// Compact objects: disk temperature profile, frequency shift of orbiting gas, neutron-star light bending
// (Beloborodov approximation vs exact Schwarzschild integral), beam averaging rule, emission model per object.
import assert from "node:assert/strict";
import { diskAxis, thinDiskProfile, diskRedshift, cosPsiFromAlpha, visibleFraction, apparentRadius, beamBlend, accretionOf, PULSAR_PERIODS } from "../src/compact-objects.js";
let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };

check("Disque mince : nul au bord interne (3 Rs)", thinDiskProfile(3) === 0 && thinDiskProfile(3.0001) < 0.2);
const rpk = (49 / 36) * 3;
check("Disque mince : maximum à r = 49/36 · r_in", Math.abs(thinDiskProfile(rpk) - 1) < 1e-12 && thinDiskProfile(rpk * 1.02) < 1 && thinDiskProfile(rpk * 0.98) < 1, `r = ${rpk.toFixed(3)} Rs`);
check("Disque mince : T ∝ r^−3/4 loin du centre", Math.abs(thinDiskProfile(3000) / thinDiskProfile(300) / Math.pow(10, -0.75) - 1) < 0.03);
// Face-on emission (λ = 0) seen from infinity: g = √(1 − 3/(2r)) (transverse Doppler + gravitational redshift).
check("Décalage, disque vu de face : g = √(1 − 1,5/r)", Math.abs(diskRedshift(6, 0) - Math.sqrt(0.75)) < 1e-12, `r = 6 Rs → g = ${diskRedshift(6, 0).toFixed(4)}`);
check("Décalage à la dernière orbite stable", Math.abs(diskRedshift(3, 0) - Math.sqrt(0.5)) < 1e-12, `g = ${diskRedshift(3, 0).toFixed(4)}`);
// Far away, a tangential photon (λ = ±r) gets the special-relativistic Doppler factor 1/(γ(1 ∓ v)).
{ const r = 1e5, v = Math.sqrt(1 / (2 * r)), g = 1 / Math.sqrt(1 - v * v);
  const ahead = diskRedshift(r, r), behind = diskRedshift(r, -r);
  check("Limite Doppler relativiste restreinte (côté qui approche)", Math.abs(ahead / (1 / (g * (1 - v))) - 1) < 2e-5, ahead.toFixed(6));
  check("Limite Doppler relativiste restreinte (côté qui s'éloigne)", Math.abs(behind / (1 / (g * (1 + v))) - 1) < 2e-5, behind.toFixed(6)); }
check("Asymétrie Doppler du disque à 6 Rs", diskRedshift(6, 5) > 1.1 * diskRedshift(6, -5), `${diskRedshift(6, 5).toFixed(3)} vs ${diskRedshift(6, -5).toFixed(3)}`);
check("Observateur statique proche : décalage vers le bleu supplémentaire", diskRedshift(6, 0, 15) > diskRedshift(6, 0));
// Neutron star: exact bending angle ψ(α) for a distant observer, ψ = ∫₀^{x_R} dx / √(1/b² − x²(1 − x)) with x = Rs/r,
// b = R sin α / √(1 − Rs/R) (Rs = 1), compared with Beloborodov's cos ψ = 1 − (1 − cos α)/(1 − u).
function psiExact(u, alpha) {
  const R = 1 / u, b = (R * Math.sin(alpha)) / Math.sqrt(1 - u);
  if (b < 1e-12) return 0;
  const N = 20000; let s = 0;
  for (let k = 0; k < N; k++) { const x = ((k + 0.5) / N) * u; s += 1 / Math.sqrt(1 / (b * b) - x * x * (1 - x)); }
  return (s * u) / N;
}
for (const u of [1 / 3, 0.41]) {
  let worst = 0;
  for (let a = 5; a <= 80; a += 5) { const al = (a * Math.PI) / 180, ex = psiExact(u, al), ap = Math.acos(cosPsiFromAlpha(Math.cos(al), u)); worst = Math.max(worst, Math.abs(ap - ex)); }
  check(`Beloborodov ≈ courbure exacte (R = ${(1 / u).toFixed(2)} Rs, α ≤ 80°)`, worst < (2 * Math.PI) / 180, `écart max ${((worst * 180) / Math.PI).toFixed(2)}°`);
}
check("Étoile à neutrons R = 3 Rs : ¾ de la surface visible", Math.abs(visibleFraction(1 / 3) - 0.75) < 1e-12, `${(visibleFraction(1 / 3) * 100).toFixed(1)} %`);
check("Sans gravité : moitié de la surface", Math.abs(visibleFraction(0) - 0.5) < 1e-12);
check("Rayon apparent agrandi de 1/√(1 − u)", Math.abs(apparentRadius(0.41) - 1 / Math.sqrt(0.59)) < 1e-12, apparentRadius(0.41).toFixed(3));
check("Faisceau de Vela moyenné à ×1 440", beamBlend(PULSAR_PERIODS.vela, 1440) === 0);
check("Magnétar (3,76 s) visible en balayage à ×1", beamBlend(3.76, 1) === 1);
check("Pause : faisceau figé, non moyenné", beamBlend(0.0337, 0) === 1);
check("Sagittarius A* : flot chaud (RIAF), pas de disque mince", accretionOf({ id: "sgr-a", type: "blackhole", accretion: true }).model === "riaf");
check("Gaia BH1 : dormant, aucune émission", accretionOf({ id: "gaia-bh1", type: "blackhole", accretion: false }).model === "none");
check("Cygnus X-1 : disque mince", accretionOf({ id: "cygx1", type: "blackhole", accretion: true }).model === "thin");
{ const o = { id: "cygx1", type: "blackhole", xyz: [1000, -2000, 500] }, ax = diskAxis(o, [0, 0, 0]), los = o.xyz.map((x) => -x / Math.hypot(...o.xyz));
  const i = (Math.acos(ax.reduce((a, x, k) => a + x * los[k], 0)) * 180) / Math.PI;
  check("Axe du disque de Cygnus X-1 incliné de 27,1° sur la ligne de visée terrestre", Math.abs(i - 27.1) < 1e-9 && Math.abs(Math.hypot(...ax) - 1) < 1e-12, `${i.toFixed(2)}°`); }
console.log(JSON.stringify({ passed: n }));
