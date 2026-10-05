// Continuous gravitation (src/gravity-field.js): conservation laws, Newtonian limit, strong-field Schwarzschild
// behaviour, light-like deflection, hovering, gravity assist by a moving body, continuity with flat-space thrust.
import assert from "node:assert/strict";
import { advance, field, localState, readout, schwarzschildR, isotropicRho, MSUN_LY } from "../src/gravity-field.js";
import { AU, norm, dot, sub, mul, integrateProper, G1, gamma } from "../src/physics.js";

let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const point = (m, x = [0, 0, 0], v = [0, 0, 0], extra = {}) => ({ o: { id: "S", type: extra.type || "star", name: "S" }, m, R: extra.R || 0, compact: !!extra.compact, x, v });
// Circular geodesic at Schwarzschild radius rs (coordinate angular velocity Ω² = m/r³ in Schwarzschild time = our t).
function circular(m, rs, tweak = 1) {
  const rho = isotropicRho(rs, m), f = field([rho, 0, 0], 0, [point(m)]), Om = Math.sqrt(m / rs ** 3),
    v = Om * rho, beta = (f.B / f.A) * v, U = (beta / Math.sqrt(1 - beta * beta)) * tweak;
  return { pos: [rho, 0, 0], u: [0, U, 0], period: (2 * Math.PI) / Om };
}
const energy = (s, src) => { const f = field(s.pos, 0, src); return f.A * Math.sqrt(1 + dot(s.u, s.u)); };
const angMom = (s, src) => { const f = field(s.pos, 0, src); return norm(cross(s.pos, mul(s.u, f.B))); };
function run(s, T, src, thrust = null, opts = {}) {
  let st = { pos: [...s.pos], u: [...s.u] }, t = 0, tau = 0, ev = null, rmin = Infinity, rmax = 0;
  while (t < T - 1e-15) {
    const r = advance(st, Math.min(T - t, opts.chunk || T), src, t, thrust, { maxSteps: opts.maxSteps || 200000 });
    st = { pos: r.pos, u: r.u }; t += r.consumed; tau += r.tau;
    rmin = Math.min(rmin, norm(st.pos)); rmax = Math.max(rmax, norm(st.pos));
    if (r.event) { ev = r.event; break; }
    if (!(r.consumed > 0)) break;
  }
  return { ...st, t, tau, event: ev, rmin, rmax };
}

// 1 · Newtonian limit: Earth-like orbit around the Sun.
{
  const src = [point(MSUN_LY)], s0 = circular(MSUN_LY, AU), out = run(s0, s0.period, src, null, { chunk: 0.01 });
  check("Orbite solaire à 1 ua : période", Math.abs(s0.period - 1) < 2e-4, `${(s0.period * 365.25).toFixed(4)} j`);
  const back = norm(sub(out.pos, s0.pos)) / AU;
  check("Orbite solaire refermée après une période", back < 1e-6, `écart ${(back * 149597870.7).toFixed(1)} km`);
  check("Rayon constant", (out.rmax - out.rmin) / AU < 1e-7, `variation ${((out.rmax - out.rmin) / AU * 149597870.7).toFixed(2)} km`);
  const lapse = 1 - out.tau / out.t;
  check("Horloge ralentie de ≈ 1,5 m/r (gravité + vitesse)", Math.abs(lapse / (1.5 * MSUN_LY / AU) - 1) < 1e-3, `retard relatif ${lapse.toExponential(4)}`);
}
// 2 · Strong field, single static mass m = 1 (geometric units scale out).
{
  const src = [point(1, [0, 0, 0], [0, 0, 0], { compact: true, type: "blackhole" })];
  const s8 = circular(1, 8, 1.0005), o8 = run(s8, 20 * s8.period, src, null, { chunk: s8.period });
  const r8 = [schwarzschildR(o8.rmin, 1), schwarzschildR(o8.rmax, 1)];
  check("Orbite circulaire stable à r = 8m (au-delà de 6m)", !o8.event && r8[0] > 7.8 && r8[1] < 8.3, `r ∈ [${r8[0].toFixed(3)}, ${r8[1].toFixed(3)}] m sur 20 tours`);
  const E0 = energy(s8, src), L0 = angMom(s8, src), dE = Math.abs(energy(o8, src) / E0 - 1), dL = Math.abs(angMom(o8, src) / L0 - 1);
  check("Énergie de Killing conservée", dE < 1e-9, `dérive ${dE.toExponential(2)}`);
  check("Moment cinétique conservé", dL < 1e-9, `dérive ${dL.toExponential(2)}`);
  const f = field(o8.pos, 0, src), { gamma: g, E } = localState(mul(o8.u, f.B), f);
  const shell = -(E * E) / (f.A * f.A) + dot(o8.u, o8.u);
  check("Normalisation g(u,u) = −1", Math.abs(shell + 1) < 1e-12, `${shell}`);
  const s5 = circular(1, 5, 0.9999), o5 = run(s5, 30 * s5.period, src, null, { chunk: s5.period });
  const left = o5.event?.kind === "horizon" || schwarzschildR(o5.rmax, 1) > 6 || schwarzschildR(o5.rmin, 1) < 4;
  check("Orbite circulaire instable à r = 5m (sous 6m)", left, o5.event ? "plongeon vers l'horizon" : `r ∈ [${schwarzschildR(o5.rmin, 1).toFixed(2)}, ${schwarzschildR(o5.rmax, 1).toFixed(2)}]`);
  const fall = run({ pos: [isotropicRho(4, 1), 0, 0], u: [0, 0, 0] }, 200, src, null, { chunk: 1 });
  check("Chute radiale : arrêt avant l'horizon", fall.event?.kind === "horizon", `r = ${fall.event?.r ? (fall.event.r).toFixed(3) : "?"} m`);
}
// 3 · Periapsis advance, ra = 60m, rp = 40m: first-order GR value 6πm / (a(1−e²)).
{
  const src = [point(1)], rp = 40, ra = 60, fp = 1 - 2 / rp, fa = 1 - 2 / ra;
  const L = Math.sqrt((fa - fp) / (fp / (rp * rp) - fa / (ra * ra)));
  let st = { pos: [isotropicRho(rp, 1), 0, 0], u: [0, L / rp, 0] }, t = 0, prev = norm(st.pos), falling = false, peri = [];
  while (peri.length < 3 && t < 1e5) {
    const r = advance(st, 0.05, src, t, null, { maxSteps: 100000 });
    st = { pos: r.pos, u: r.u }; t += r.consumed;
    const d = norm(st.pos);
    if (d < prev) falling = true;
    else if (falling) { peri.push(Math.atan2(st.pos[1], st.pos[0])); falling = false; }
    prev = d;
  }
  let adv = peri[1] - peri[0]; adv = ((adv % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  // Exact Schwarzschild value: Δφ = 2∫ L/r² dr / √(E² − (1−2m/r)(1+L²/r²)) − 2π, with r = c − d cos χ.
  const E2 = fp * (1 + (L * L) / (rp * rp)), c = (rp + ra) / 2, dd = (ra - rp) / 2;
  let I = 0; const N = 4000;
  for (let k = 0; k <= N; k++) {
    const chi = (Math.PI * k) / N, r = c - dd * Math.cos(chi), drdchi = dd * Math.sin(chi);
    const den = E2 - (1 - 2 / r) * (1 + (L * L) / (r * r));
    let g = den > 0 ? ((L / (r * r)) * drdchi) / Math.sqrt(den) : 0;
    if (k === 0 || k === N) { const r2 = c - dd * Math.cos(chi + (k === 0 ? 1e-6 : -1e-6)); const d2 = E2 - (1 - 2 / r2) * (1 + (L * L) / (r2 * r2)); g = ((L / (r2 * r2)) * dd * Math.sin(chi + (k === 0 ? 1e-6 : -1e-6))) / Math.sqrt(d2); }
    I += g * (k === 0 || k === N ? 1 : k % 2 ? 4 : 2);
  }
  const exact = 2 * ((I * Math.PI) / N / 3) - 2 * Math.PI, a = (rp + ra) / 2, e = (ra - rp) / (ra + rp), first = (6 * Math.PI) / (a * (1 - e * e));
  check("Avance du périastre = valeur exacte de Schwarzschild", Math.abs(adv / exact - 1) < 0.01, `${adv.toFixed(4)} rad par tour, exacte ${exact.toFixed(4)} (ordre 1 : ${first.toFixed(4)})`);
}
// 4 · Ultra-relativistic flyby: deflection → 4m/b (twice the Newtonian value), the (1+v²) factor of GR.
{
  const m = 1, b = 1e4, src = [point(m)], U = 1e5, X = 1e7;
  const out = run({ pos: [-X, b, 0], u: [U, 0, 0] }, 2 * X, src, null, { chunk: X / 4, maxSteps: 400000 });
  const defl = Math.atan2(-out.u[1], out.u[0]);
  check("Déviation d'un vaisseau à γ = 10⁵ : 4m/b", Math.abs(defl / ((4 * m) / b) - 1) < 0.01, `${defl.toExponential(4)} rad, attendu ${(4 * m / b).toExponential(4)}`);
  const slow = 0.01, outS = run({ pos: [-X, b, 0], u: [slow, 0, 0] }, 2 * X / slow, src, null, { chunk: X / slow / 4, maxSteps: 400000 });
  const dS = Math.atan2(-outS.u[1], outS.u[0]), newton = 2 * Math.atan(m / (b * slow * slow));
  check("Déviation lente : hyperbole newtonienne 2·arctan(m/(b v²))", Math.abs(dS / newton - 1) < 0.01, `${dS.toFixed(4)} rad, Newton ${newton.toFixed(4)}`);
}
// 5 · Hovering: the proper acceleration given by the readout keeps a static position (and equals the
// Schwarzschild formula m / (r² √(1 − 2m/r)) used by the existing gravity panel).
{
  const src = [point(1)], rho = isotropicRho(10, 1), ro = readout([rho, 0, 0], 0, src), rs = 10;
  const expected = 1 / (rs * rs * Math.sqrt(1 - 2 / rs));
  check("Accélération de maintien = formule de Schwarzschild", Math.abs(ro.hover / expected - 1) < 1e-12, `${ro.hover.toExponential(6)}`);
  const held = run({ pos: [rho, 0, 0], u: [0, 0, 0] }, 50, src, { dir: [1, 0, 0], mag: ro.hover }, { chunk: 5 });
  check("Maintien stationnaire avec cette poussée", Math.abs(norm(held.pos) / rho - 1) < 1e-8, `dérive ${(norm(held.pos) / rho - 1).toExponential(2)}`);
  check("Horloge stationnaire = √(1 − 2m/r)", Math.abs(held.tau / held.t / Math.sqrt(1 - 2 / rs) - 1) < 1e-9, `${(held.tau / held.t).toFixed(9)}`);
}
// 6 · Gravity assist: a moving mass changes the ship's energy, but the speed relative to the mass is conserved.
{
  const m = 1e-14, vs = [2e-5, 0, 0], src = [point(m, [0, 0, 0], vs)];
  src[0].t0 = 0;
  const w0 = [-2e-5, 3e-5, 0], wn = norm(w0), e = mul(w0, 1 / wn), perp = [-e[1], e[0], 0], D = 0.05, b = 1.5e-5;
  const ship = { pos: sub(mul(perp, b), mul(e, D)), u: [vs[0] + w0[0], w0[1], 0] };
  const out = run(ship, (2 * D) / wn, src, null, { chunk: 50, maxSteps: 400000 });
  const wIn = norm(sub(ship.u, vs)), wOut = norm(sub(out.u, vs)), vIn = norm(ship.u), vOut = norm(out.u);
  const turn = Math.acos(dot(sub(ship.u, vs), sub(out.u, vs)) / (wIn * wOut));
  check("Fronde : vitesse relative conservée", Math.abs(wOut / wIn - 1) < 1e-3, `|w| ${wIn.toExponential(4)} → ${wOut.toExponential(4)}, déviation ${turn.toFixed(2)} rad`);
  check("Fronde : énergie échangée avec le corps en mouvement", Math.abs(vOut / vIn - 1) > 0.05, `|v| ${vIn.toExponential(3)} → ${vOut.toExponential(3)}`);
}
// 7 · Continuity with the exact flat-space thrust when the field vanishes (same thrust convention).
{
  const src = [point(1e-40, [1e6, 0, 0])], u0 = [0.3, 0.4, 0], dir = [0, 0, 1];
  const flat = integrateProper([0, 0, 0], u0, 0.7, mul(dir, G1));
  const curved = run({ pos: [0, 0, 0], u: u0 }, 0.7, src, { dir, mag: G1 }, { chunk: 0.7 });
  const dx = norm(sub(curved.pos, flat.pos)) / norm(flat.pos), du = norm(sub(curved.u, flat.u)) / norm(flat.u), dtau = Math.abs(curved.tau / flat.tau - 1);
  check("Poussée 1 g : identique à l'intégrateur plat (position)", dx < 1e-8, dx.toExponential(2));
  check("Poussée 1 g : identique (quadrivitesse, temps propre)", du < 1e-8 && dtau < 1e-8, `${du.toExponential(2)}, ${dtau.toExponential(2)}`);
  const capped = run({ pos: [0, 0, 0], u: [0, 0, 6] }, 2, src, { dir: [0, 0, 1], mag: G1, umax: 0.99 * gamma(0.99) }, { chunk: 2 });
  const umax = 0.99 * gamma(0.99);
  check("Limiteur : u ne dépasse pas 0,99 c", norm(capped.u) <= umax * (1 + 1e-9) && norm(capped.u) > umax * 0.999, `u ${norm(capped.u).toFixed(6)} (max ${umax.toFixed(6)})`);
}
console.log(JSON.stringify({ passed: n }));
