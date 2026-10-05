// Continuous gravitation for free flight. Units: light-year, Julian year, c = 1, catalogue axes.
//
// Metric: each source i contributes the exact Schwarzschild metric in isotropic Cartesian coordinates,
//   ds² = −A² dt² + B² |dx|²,  A_i = (1 − m_i/2ρ_i)/(1 + m_i/2ρ_i),  B_i = (1 + m_i/2ρ_i)²,  m_i = GM_i/c²,
// and several sources combine as A = Π A_i, B = Π B_i. For one isolated body this is exact general relativity
// (orbits, precession, unstable orbits inside 6m, horizon at ρ = m/2). Where every field is weak it reduces to the
// linearised metric with Φ = Σ Φ_i, i.e. superposed potentials. Sources move on their catalogue/ephemeris paths and
// the field is evaluated at their current positions (quasi-static: gravitomagnetic terms of order Φ·v_source and
// the retardation of gravity are neglected). Not a general solution of Einstein's equations for N bodies.
//
// Motion: Hamiltonian geodesic flow with coordinate time t as parameter. State: position x and covariant spatial
// momentum per unit mass p = B² dx/dτ. The energy E = A²dt/dτ follows from the mass shell g(u,u) = −1:
// E = A √(1 + |p|²/B²). Thrust is a proper acceleration of given magnitude, applied in the local orthonormal frame
// of the static observer, so that g(u,a) = 0 holds by construction.
import { LY, norm, dot, sub, add, mul, unit } from "./physics.js";

export const MSUN_LY = 1476.6250385 / LY; // GM☉/c² in light-years
export const MEARTH_LY = 0.0044350281 / LY; // GM⊕/c² in light-years (Schwarzschild radius 8.87 mm is 2m)
// Accelerations below this (ly/yr², ≈ 1e−10 g) are neglected: the source is not included at all.
export const A_MIN = 1e-10 * 1.0323;

// Mass parameter m = GM/c² (ly) for a catalogue object, with its provenance.
const SOLAR_EARTH_MASSES = {
  "solar:Mercure": 0.0553, "solar:Vénus": 0.815, "solar:Terre": 1, "solar:Mars": 0.1075, "solar:Jupiter": 317.83,
  "solar:Saturne": 95.16, "solar:Uranus": 14.54, "solar:Neptune": 17.15, "moon:Lune": 0.012300, "moon:Io": 0.01496,
  "moon:Europe": 0.008035, "moon:Ganymède": 0.02481, "moon:Titan": 0.02252, "moon:Encelade": 0.0000181, "moon:Triton": 0.003581,
};
export function gravitatingMass(o) {
  if (!o || ["nebula", "pillars", "cluster", "galaxy", "cosmic", "waypoint", "probe"].includes(o.type)) return null;
  if (o.id === "h0") return { m: MSUN_LY, source: "Soleil (GM☉)" };
  if (SOLAR_EARTH_MASSES[o.id]) return { m: SOLAR_EARTH_MASSES[o.id] * MEARTH_LY, source: "masse de référence" };
  if (o.massSolar > 0) return { m: o.massSolar * MSUN_LY, source: o.massApprox ? "masse approchée du catalogue" : "masse du catalogue" };
  if (o.planet?.massEarth > 0) return { m: o.planet.massEarth * MEARTH_LY, source: "masse NASA Exoplanet Archive" };
  if (o.type === "star" && o.lumSolar > 0) {
    // Main-sequence mass–luminosity relation L ∝ M^3.5 inverted; order of magnitude for giants. Flagged.
    const M = Math.min(60, Math.max(0.08, Math.pow(o.lumSolar, 1 / 3.5)));
    return { m: M * MSUN_LY, source: "masse estimée par la relation masse-luminosité (ordre de grandeur)" };
  }
  return null;
}
const COMPACT = new Set(["blackhole", "pulsar"]);
// Select the sources that matter at the ship: acceleration above A_MIN, or ship within 100 body radii.
export function selectSources(objects, pos, t, positionAt, velocityAt, radiusLy) {
  const out = [];
  for (const o of objects) {
    if (o.gravity === undefined) o.gravity = gravitatingMass(o);
    const g = o.gravity;
    if (!g) continue;
    const x = o.xyz,
      dx = pos[0] - x[0], dy = pos[1] - x[1], dz = pos[2] - x[2],
      rho2 = dx * dx + dy * dy + dz * dz;
    if (g.m < A_MIN * rho2) {
      const R = radiusLy(o);
      if (rho2 > 1e4 * R * R) continue;
    }
    out.push({ o, m: g.m, R: radiusLy(o), compact: COMPACT.has(o.type), x: positionAt(o, t), v: velocityAt(o, t), t0: t });
  }
  return out;
}
// Refresh source positions and velocities at time t (they then move linearly inside one substep).
export function refreshSources(sources, t, positionAt, velocityAt) {
  for (const s of sources) {
    s.x = positionAt(s.o, t);
    s.v = velocityAt(s.o, t);
    s.t0 = t;
  }
}
// ln A, ln B and their gradients at x, time t. Returns null if the point is inside a horizon (ρ ≤ m/2).
export function field(x, t, sources) {
  let lnA = 0, lnB = 0;
  const gA = [0, 0, 0], gB = [0, 0, 0];
  for (const s of sources) {
    const dt = t - (s.t0 ?? t),
      d = [x[0] - s.x[0] - s.v[0] * dt, x[1] - s.x[1] - s.v[1] * dt, x[2] - s.x[2] - s.v[2] * dt],
      rho = Math.hypot(d[0], d[1], d[2]),
      h = s.m / (2 * rho);
    if (!(h < 1)) return null;
    lnA += Math.log((1 - h) / (1 + h));
    lnB += 2 * Math.log(1 + h);
    const kA = s.m / (rho * rho) / (1 - h * h) / rho,
      kB = -(s.m / (rho * rho)) / (1 + h) / rho;
    for (let k = 0; k < 3; k++) {
      gA[k] += kA * d[k];
      gB[k] += kB * d[k];
    }
  }
  return { A: Math.exp(lnA), B: Math.exp(lnB), lnA, lnB, gA, gB };
}
// Static-observer quantities from (x, p).
export function localState(p, f) {
  const U = mul(p, 1 / f.B),
    gamma = Math.sqrt(1 + dot(U, U));
  return { U, gamma, E: f.A * gamma };
}
// Thrust: proper acceleration of magnitude `mag` with the coordinate force along `dir` (static frame axes),
// the same convention as physics.integrateProper in flat space. Optional cap on the local speed (u = γβ).
function thrustTerm(U, gamma, dir, mag, umax) {
  if (!dir || !(mag > 0)) return null;
  if (typeof dir === "function") dir = dir(U);
  if (!dir || norm(dir) < 1e-300) return null;
  let f = unit(dir);
  const uu = norm(U);
  if (umax < Infinity && uu >= umax && dot(f, U) > 0) {
    const e = mul(U, 1 / uu);
    f = sub(f, mul(e, dot(f, e)));
    const n = norm(f);
    if (n < 1e-12) return null;
    f = mul(f, 1 / n);
  }
  const uf = dot(U, f) / gamma,
    lambda = mag / Math.sqrt(Math.max(1e-300, 1 - uf * uf));
  return mul(f, lambda);
}
function derivative(x, p, t, sources, thrust) {
  const f = field(x, t, sources);
  if (!f) return null;
  const { U, gamma, E } = localState(p, f),
    A2 = f.A * f.A,
    B2 = f.B * f.B,
    p2 = dot(p, p),
    dx = mul(p, A2 / (E * B2)),
    dp = add(mul(f.gA, -E), mul(f.gB, (A2 * p2) / (E * B2)));
  if (thrust) {
    const a = thrustTerm(U, gamma, thrust.dir, thrust.mag, thrust.umax ?? Infinity);
    if (a) for (let k = 0; k < 3; k++) dp[k] += (A2 / E) * f.B * a[k];
  }
  return { dx, dp, dtau: A2 / E };
}
const ETA = 0.006;
function stepSize(x, p, t, sources, thrust) {
  const f = field(x, t, sources);
  if (!f) return 0;
  const { gamma, E } = localState(p, f),
    v = mul(p, (f.A * f.A) / (E * f.B * f.B));
  let h = Infinity;
  for (const s of sources) {
    const dt = t - (s.t0 ?? t),
      d = [x[0] - s.x[0] - s.v[0] * dt, x[1] - s.x[1] - s.v[1] * dt, x[2] - s.x[2] - s.v[2] * dt],
      rho = Math.hypot(...d),
      w = norm(sub(v, s.v));
    h = Math.min(h, (ETA * rho) / Math.max(w, Math.sqrt(s.m / rho), 1e-30));
  }
  if (thrust?.mag > 0) h = Math.min(h, (0.01 * gamma) / thrust.mag);
  // Braking to rest: approach u = 0 geometrically instead of overshooting through it.
  if (thrust?.brake) h = Math.min(h, Math.max((0.5 * norm(p)) / f.B / thrust.mag, 1e-12));
  return h;
}
// Distance to each source's centre, and the events: surface contact or Schwarzschild r < 1.05 Rs for compact objects.
export function contact(x, t, sources) {
  for (const s of sources) {
    const dt = t - (s.t0 ?? t),
      rho = norm(sub(x, add(s.x, mul(s.v, dt)))),
      r = rho * Math.pow(1 + s.m / (2 * rho), 2);
    if (s.compact && s.o.type === "blackhole" ? r < 1.05 * 2 * s.m : rho < s.R)
      return { o: s.o, kind: s.o.type === "blackhole" ? "horizon" : "surface", rho, r };
  }
  return null;
}
// Advance by coordinate time dt (years). state: { pos, u } with u = local static-frame γv (orthonormal components).
// Returns { pos, u, tau, consumed, steps, event }.
export function advance(state, dt, sources, t, thrust = null, opts = {}) {
  const maxSteps = opts.maxSteps ?? 1500,
    refresh = opts.refresh;
  let x = [...state.pos],
    f0 = field(x, t, sources);
  if (!f0) return { pos: x, u: [...state.u], tau: 0, consumed: 0, steps: 0, event: { kind: "horizon" } };
  let p = mul(state.u, f0.B),
    tau = 0,
    left = dt,
    now = t,
    steps = 0,
    event = null;
  while (left > 1e-15 && steps < maxSteps) {
    if (refresh) refresh(now);
    let h = Math.min(left, stepSize(x, p, now, sources, thrust));
    if (!(h > 0)) { event = { kind: "horizon" }; break; }
    const k1 = derivative(x, p, now, sources, thrust),
      x2 = add(x, mul(k1.dx, h / 2)), p2 = add(p, mul(k1.dp, h / 2)),
      k2 = derivative(x2, p2, now + h / 2, sources, thrust);
    const k3 = k2 && derivative(add(x, mul(k2.dx, h / 2)), add(p, mul(k2.dp, h / 2)), now + h / 2, sources, thrust),
      k4 = k3 && derivative(add(x, mul(k3.dx, h)), add(p, mul(k3.dp, h)), now + h, sources, thrust);
    if (!k4) { event = { kind: "horizon" }; break; }
    for (let k = 0; k < 3; k++) {
      x[k] += (h / 6) * (k1.dx[k] + 2 * k2.dx[k] + 2 * k3.dx[k] + k4.dx[k]);
      p[k] += (h / 6) * (k1.dp[k] + 2 * k2.dp[k] + 2 * k3.dp[k] + k4.dp[k]);
    }
    tau += (h / 6) * (k1.dtau + 2 * k2.dtau + 2 * k3.dtau + k4.dtau);
    if (thrust?.umax < Infinity) {
      // The limiter cuts the thrust exactly at the cap: remove the overshoot of the last substep.
      const fB = field(x, now + h, sources), uu = fB && norm(p) / fB.B;
      if (uu > thrust.umax) p = mul(p, thrust.umax / uu);
    }
    now += h;
    left -= h;
    steps++;
    if (thrust?.brake) {
      const fb = field(x, now, sources);
      if (fb && norm(p) / fb.B < 1e-9) { p = [0, 0, 0]; event = { kind: "stopped" }; break; }
    }
    const c = contact(x, now, sources);
    if (c) { event = c; break; }
    if (opts.stopWhen && opts.stopWhen(x, p, now)) { event = { kind: "condition" }; break; }
  }
  const f = field(x, now, sources) || f0;
  return { pos: x, u: mul(p, 1 / f.B), tau, consumed: now - t, steps, event, throttled: left > 1e-15 && !event };
}
// Readout at the ship: gravitational acceleration felt by a static observer (proper, ly/yr²), clock rate A,
// dominant source by acceleration.
export function readout(pos, t, sources) {
  const f = field(pos, t, sources);
  if (!f) return null;
  let best = null;
  for (const s of sources) {
    const dt = t - (s.t0 ?? t),
      rho = norm(sub(pos, add(s.x, mul(s.v, dt)))),
      a = s.m / (rho * rho);
    if (!best || a > best.a) best = { o: s.o, a, rho };
  }
  // Proper acceleration needed to hover: |∇ ln A| / B (static observer, isotropic coordinates).
  return { hover: norm(f.gA) / f.B, lapse: f.A, phi: f.lnA, dominant: best?.o, count: sources.length };
}
// Isotropic ρ ↔ Schwarzschild r for a single mass m (both in the same length unit).
export const schwarzschildR = (rho, m) => rho * Math.pow(1 + m / (2 * rho), 2);
export const isotropicRho = (r, m) => (r - m + Math.sqrt(Math.max(0, r * r - 2 * m * r))) / 2;
