// Rendezvous autopilot (Earth slice, 15 October 2026): arrival point, tolerances, continuity at departure and behaviour
// after the arrival. Same execution helpers as the cockpit (navigation.js: flightLeg, flightState, brakeStep).
import assert from "node:assert/strict";
import * as P from "../src/physics.js";
import { catalogObjects, radiusLy, standOff } from "../src/body-data.js";
import { initEphemeris, positionAt, velocityAt } from "../src/ephemeris.js";
import * as N from "../src/navigation.js";
import { createOrbit, advanceOrbit, holdThrust, orbitalElements, massKg, G } from "../src/orbits.js";
import { selectSources, refreshSources, advance } from "../src/gravity-field.js";

const pass = [];
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); pass.push(label); console.log("PASS " + label + (detail ? " · " + detail : "")); };
const objects = catalogObjects([{ id: "h0", name: "Soleil", type: "star", xyz: [0, 0, 0], planets: [], radiusSolar: 1, temperature: 5772, lumSolar: 1 }]);
initEphemeris(objects, { stars: {} });
const by = new Map(objects.map((o) => [o.id, o]));
const earth = by.get("solar:Terre"), moon = by.get("moon:Lune"), mars = by.get("solar:Mars"), sun = by.get("h0");
const ms = (v) => P.norm(v) * P.C, km = (x) => (x * P.LY) / 1000, hours = (t) => (t * P.YEAR) / 3600;
const RE = radiusLy(earth);
let seed = 20261015;
const random = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);

// 1. Lorentz frames.
{
  const F = P.frame(3, [1, 2, 3], [0.3, -0.2, 0.1]), e = P.toFrame(F, 5, [4, -1, 2]), back = P.fromFrame(F, e.t, e.x), f = P.toFrame(F, 7, [1, 1, 1]);
  const interval = (t, x) => t * t - P.dot(x, x);
  check("Boost aller-retour exact", Math.abs(back.t - 5) < 1e-12 && P.norm(P.sub(back.x, [4, -1, 2])) < 1e-12);
  check("Intervalle invariant", Math.abs(interval(e.t - f.t, P.sub(e.x, f.x)) - interval(-2, [3, -2, 1])) < 1e-12);
  check("Repos dans F = vitesse du référentiel", P.norm(P.sub(P.velocity(P.uFromFrame(F, [0, 0, 0])), F.b)) < 1e-15);
}

// 2. The old autopilot: rest in the catalogue (heliocentric) frame at the stand-off point.
const vEarth = ms(velocityAt(earth, 0)) / 1000;
check("Défaut corrigé : l'ancien point d'arrivée était au repos par rapport au Soleil", vEarth > 29 && vEarth < 31, "vitesse relative à la Terre " + vEarth.toFixed(2) + " km/s, Terre–Lune parcourue en " + ((384400 / vEarth) / 3600).toFixed(1) + " h");

// 3. Arrival point and tolerances from the cockpit start (2 au from the Sun, at rest).
const tol = { position: 1e-6, speed: 1e-3 }; // fraction of the rendezvous distance, m/s
function arrival(goal, pos, u, t) {
  const est = N.rendezvousEstimate(goal, pos, u, t), o = goal.object, at = est.arrival.t;
  const want = goal.offset ? P.norm(goal.offset) : N.rendezvousDistance(o);
  return { est, dist: P.norm(P.sub(est.arrival.x, positionAt(o, at))), want, rel: ms(P.sub(P.velocity(P.uFromFrame(est.F, [0, 0, 0])), velocityAt(o, at))) };
}
const toEarth = arrival({ object: earth }, [0, 0, 2 * P.AU], [0, 0, 0], 0);
check("Rendez-vous Terre : 5 rayons du centre", Math.abs(toEarth.dist / toEarth.want - 1) < tol.position && Math.abs(toEarth.want / RE - 5) < 1e-12, km(toEarth.dist).toFixed(1) + " km");
check("Rendez-vous Terre : vitesse de la Terre", toEarth.rel < tol.speed, toEarth.rel.toExponential(2) + " m/s, trajet " + hours(toEarth.est.t).toFixed(1) + " h");

// 4. Executing the plan with the cockpit's own step functions: continuity and the arrival actually reached.
function execute(goal, pos, u, t, frames = 4000) {
  const est = N.rendezvousEstimate(goal, pos, u, t), F = est.F;
  let s = { t, pos: [...pos], u: [...u] }, maxJump = 0, maxAcc = 0, prevU = u;
  const total = est.stop.t + est.route.plan.t, dt = total / frames;
  // Proper acceleration from the rapidity in F (motion is collinear in F on each stage): |Δη|/Δτ.
  const eta = (U) => { const up = P.uToFrame(F, U), m = P.norm(up); return m > 0 ? P.mul(up, Math.asinh(m) / m) : [0, 0, 0]; };
  const track = (next, dtau) => { const du = P.norm(P.sub(next.u, prevU)); maxJump = Math.max(maxJump, du); if (dtau > 0) maxAcc = Math.max(maxAcc, P.norm(P.sub(eta(next.u), eta(prevU))) / dtau); prevU = next.u; };
  while (true) { const b = N.brakeStep(F, s.t, s.pos, s.u, dt); track(b, b.tau); s = b; if (b.done) break; }
  const leg = N.flightLeg(goal, F, s.t, s.pos);
  let last = N.flightState(leg, 0);
  for (let e = dt; ; e += dt) { const x = N.flightState(leg, Math.min(e, leg.plan.t)); track(x, x.tau - last.tau); last = x; s = x; if (e >= leg.plan.t) break; }
  const o = goal.object;
  return { est, s, maxJump, maxAcc, dist: P.norm(P.sub(s.pos, positionAt(o, s.t))), rel: ms(P.sub(P.velocity(s.u), velocityAt(o, s.t))) };
}
const run = execute({ object: earth }, [0, 0, 2 * P.AU], [0, 0, 0], 0);
check("Exécution : arrivée au point prévu", Math.abs(run.dist / N.rendezvousDistance(earth) - 1) < tol.position, km(run.dist).toFixed(2) + " km");
check("Exécution : vitesse relative nulle à l'arrivée", run.rel < tol.speed, run.rel.toExponential(2) + " m/s");
check("Exécution : accélération propre jamais au-dessus de 1 g", run.maxAcc <= P.G1 * (1 + 1e-6), (run.maxAcc / P.G1).toFixed(6) + " g");

// 5. Continuity at departure: the ship leaves the Earth rendezvous point with the Earth's velocity, toward Mars.
const t1 = run.s.t, pE = run.s.pos, uE = run.s.u;
const toMars = execute({ object: mars }, pE, uE, t1, 20000);
const firstStep = toMars.maxJump;
check("Départ : aucune vitesse effacée (chaque pas ≤ poussée 1 g)", toMars.maxAcc <= P.G1 * (1 + 1e-6), "Δv max " + (firstStep * P.C).toFixed(1) + " m/s par pas de " + ((toMars.est.stop.t + toMars.est.route.plan.t) / 20000 * P.YEAR).toFixed(1) + " s");
check("Départ : la vitesse initiale est conservée puis annulée par rapport à Mars", ms(P.velocity(P.uToFrame(toMars.est.F, uE))) > 1000 && toMars.est.stop.t > 0, "vitesse relative à effacer " + (ms(P.velocity(toMars.est.stop.u)) / 1000).toFixed(2) + " km/s en " + (toMars.est.stop.t * P.YEAR / 60).toFixed(1) + " min");
check("Mars : rendez-vous atteint à la vitesse de Mars", Math.abs(toMars.dist / N.rendezvousDistance(mars) - 1) < tol.position && toMars.rel < tol.speed, km(toMars.dist).toFixed(1) + " km · " + toMars.rel.toExponential(2) + " m/s");
const toMoon = execute({ object: moon }, pE, uE, t1);
check("Lune : rendez-vous atteint à la vitesse de la Lune", Math.abs(toMoon.dist / N.rendezvousDistance(moon) - 1) < tol.position && toMoon.rel < tol.speed, km(toMoon.dist).toFixed(1) + " km · " + toMoon.rel.toExponential(2) + " m/s");

// 6. Matching burn under gravity (cockpit path near a mass): the integrator stops relative to the target's frame.
{
  const est = N.rendezvousEstimate({ object: mars }, pE, uE, t1), sources = selectSources(objects, pE, t1, positionAt, velocityAt, radiusLy);
  const thrust = { dir: (U) => P.sub(est.F.u, U), mag: P.G1, umax: Infinity, brake: true, rest: est.F.u, tolerance: 1e-11 };
  let st = { pos: pE, u: uE }, t = t1, ev = null;
  for (let i = 0; i < 200 && !ev; i++) { const r = advance(st, est.stop.t * 2, sources, t, thrust, { maxSteps: 4000, refresh: (now) => refreshSources(sources, now, positionAt, velocityAt) }); st = r; t += r.consumed; ev = r.event; }
  const minR = P.norm(P.sub(st.pos, positionAt(earth, t))) / RE;
  check("Freinage avec gravité : arrêt dans le référentiel de la cible", ev?.kind === "stopped" && ms(P.sub(st.u, est.F.u)) < 0.01, "écart " + ms(P.sub(st.u, est.F.u)).toExponential(1) + " m/s, durée " + ((t - t1) * P.YEAR / 60).toFixed(1) + " min (prévu sans gravité " + (est.stop.t * P.YEAR / 60).toFixed(1) + ")");
  check("Freinage avec gravité : pas de contact avec la Terre", minR > 1, "distance finale " + minR.toFixed(1) + " rayons");
  const leg = N.flightLeg({ object: mars }, est.F, t, st.pos), end = N.flightState(leg, leg.plan.t), resid = ms(P.sub(P.velocity(end.u), velocityAt(mars, end.t)));
  check("Après un freinage perturbé par la gravité : écart de vitesse résiduel < 1 m/s, amorti ensuite par le maintien", resid < 1 && Math.abs(P.norm(P.sub(end.pos, positionAt(mars, end.t))) / N.rendezvousDistance(mars) - 1) < 1e-6, resid.toFixed(3) + " m/s");
}

// 7. After the arrival: free fall without station-keeping, hold with it.
{
  const mu = G * massKg(earth), r = 5 * RE * P.LY;
  const fall = createOrbit("solar:Terre", [r, 0, 0], [0, 0, 0], mu, 6371e3 * 1.001);
  let t = 0; while (!fall.stopped && t < 1e6) { advanceOrbit(fall, 60); t += 60; }
  check("Sans maintien, le vaisseau au repos relatif tombe sur la Terre", fall.stopped && fall.stopReason === "Surface atteinte", "contact après " + (t / 3600).toFixed(2) + " h");
  const hold = createOrbit("solar:Terre", [r, 0, 0], [1.5, -0.8, 0.4], mu, 6371e3 * 1.001); hold.hold = true;
  for (let i = 0; i < 24 * 60; i++) advanceOrbit(hold, 60);
  const drift = P.norm(P.sub(hold.r, [r, 0, 0])) / 1000, need = mu / P.dot(hold.r, hold.r) / 9.80665;
  check("Maintien : position conservée 24 h (écart initial 1,7 m/s amorti)", drift < 1 && P.norm(hold.v) < 1e-6, "dérive " + (drift * 1000).toFixed(0) + " m, vitesse " + P.norm(hold.v).toExponential(1) + " m/s");
  check("Maintien : poussée affichée = gravité terrestre à 5 rayons", Math.abs(P.norm(hold.thrust) / 9.80665 / need - 1) < 1e-6, need.toFixed(4) + " g");
  const close = createOrbit("h0", [1.2 * 695700e3, 0, 0], [0, 0, 0], G * massKg(sun), 695700e3); close.hold = true; advanceOrbit(close, 1);
  check("Maintien impossible au-delà de 1 g : annoncé, pas simulé", !close.hold && close.holdFailed);
}

// 8. Arrival distance: stand-off pushed out where holding costs at most HOLD_BUDGET; compact objects unchanged.
{
  const sunR = N.rendezvousDistance(sun) / radiusLy(sun), cost = N.bodyAcceleration(sun, N.rendezvousDistance(sun)) / P.G1;
  check("Soleil : point de rendez-vous à " + sunR.toFixed(2) + " rayons (maintien " + cost.toFixed(2) + " g)", sunR > 5 && Math.abs(cost - N.HOLD_BUDGET) < 1e-9);
  check("Terre, Lune, Mars : distance visuelle de 5 rayons conservée", [earth, moon, mars].every((o) => Math.abs(N.rendezvousDistance(o) / standOff(o) - 1) < 1e-12));
  const bh = { id: "bh", type: "blackhole", massSolar: 9, radiusKm: 26.6, xyz: [0, 0, 0] };
  check("Trou noir : distance inchangée, aucun maintien promis", N.rendezvousDistance(bh) === standOff(bh) && !N.holdPossible(bh, standOff(bh)));
}

// 9. Departure clearance: a direct course through the body being left is detected and replaced by a lateral step.
{
  let n = 0, crossing = 0, fixed = 0;
  for (const target of ["moon:Lune", "solar:Mars", "solar:Vénus", "h0", "solar:Jupiter"]) for (let i = 0; i < 40; i++) {
    const th = Math.acos(2 * random() - 1), ph = 2 * Math.PI * random(), d = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
    const pos = P.add(positionAt(earth, t1), P.mul(d, 5 * RE)), u = P.mul(velocityAt(earth, t1), P.gamma(P.norm(velocityAt(earth, t1))));
    const goal = { object: by.get(target) }, c = N.clearance(earth, N.plannedPath(N.rendezvousEstimate(goal, pos, u, t1))); n++;
    if (c.min < N.CLEARANCE) {
      crossing++;
      const dir = P.sub(P.sub(c.at.x, positionAt(earth, c.at.t)), P.sub(pos, positionAt(earth, t1))), side = P.add(positionAt(earth, t1), N.sidestep(earth, pos, t1, dir));
      const chord = N.clearance(earth, N.plannedPath(N.rendezvousEstimate({ object: earth, offset: P.sub(side, positionAt(earth, t1)) }, pos, u, t1)));
      const after = N.clearance(earth, N.plannedPath(N.rendezvousEstimate(goal, side, u, t1)));
      if (after.min >= N.CLEARANCE && chord.min >= N.CLEARANCE) fixed++;
    }
  }
  check("Départ : trajets traversant la Terre détectés et tous évités par dégagement", crossing > 0 && fixed === crossing, crossing + " sur " + n + " départs aléatoires");
}

// 10. Local manoeuvre: the offset is kept relative to the moving body, at its velocity.
{
  const off = P.mul([0.6, 0.8, 0], 8 * RE), m = execute({ object: earth, offset: off, local: true }, pE, uE, t1);
  check("Manœuvre locale : position relative et vitesse de la Terre", P.norm(P.sub(P.sub(m.s.pos, positionAt(earth, m.s.t)), off)) / P.norm(off) < 1e-6 && m.rel < tol.speed, hours(m.est.t).toFixed(2) + " h");
}
console.log(JSON.stringify({ passed: pass.length }));
