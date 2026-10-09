// Galactic-map layer for the Sun's neighbourhood: planet orbits (JPL elements), comet orbits (JPL Horizons 2026
// osculating elements) and the Oort cloud. The Oort cloud is a hypothesis inferred from long-period comet orbits:
// no member has been observed in place. Its points are a synthetic population (inner cloud 2 000–20 000 au, flattened
// toward the ecliptic; outer cloud 20 000–100 000 au, isotropic, density ∝ r^−3.5), never presented as objects.
import * as T from "three";
import { AU } from "./physics.js";
import { heliocentricAU, PLANET_KEYS, yearToJD, eclipticToEquatorial } from "./solar-ephemeris.js";
import { COMETS, orbitalPlane, planeToEcliptic, period } from "./comets.js";
import { EPOCH } from "./ephemeris.js";
import { mapPoints } from "./map-points.js";

const PLANET_DAYS = { Mercure: 87.97, Vénus: 224.7, EMB: 365.26, Mars: 686.98, Jupiter: 4332.6, Saturne: 10759, Uranus: 30687, Neptune: 60190 };
const toLy = (p) => p.map((x) => x * AU);
function orbitLine(points, color, opacity) {
  const g = new T.BufferGeometry().setFromPoints(points.map((p) => new T.Vector3(...p)));
  return new T.Line(g, new T.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
}
export function cometOrbitPoints(c, rmaxAU = 400, n = 720) {
  const pts = [];
  if (c.e < 1) {
    const a = c.q / (1 - c.e);
    for (let k = 0; k <= n; k++) {
      const E = (2 * Math.PI * k) / n, xy = [a * (Math.cos(E) - c.e), a * Math.sqrt(1 - c.e * c.e) * Math.sin(E)];
      if (Math.hypot(...xy) <= rmaxAU) pts.push(eclipticToEquatorial(planeToEcliptic(c, xy)));
    }
  } else {
    const a = c.q / (1 - c.e), Hmax = Math.acosh((rmaxAU / Math.abs(a) + 1) / c.e);
    for (let k = 0; k <= n; k++) {
      const H = -Hmax + (2 * Hmax * k) / n;
      pts.push(eclipticToEquatorial(planeToEcliptic(c, [a * (Math.cosh(H) - c.e), -a * Math.sqrt(c.e * c.e - 1) * Math.sinh(H)])));
    }
  }
  return pts.map(toLy);
}
export function oortPopulation(count = 9000, seed = 270671) {
  const rnd = () => ((seed = (Math.imul(1664525, seed) + 1013904223) >>> 0) + 0.5) / 4294967296,
    gauss = () => Math.sqrt(-2 * Math.log(rnd())) * Math.cos(6.2831853 * rnd()),
    out = [];
  // Power law r^−3.5 between r0 and r1, sampled by inverse transform of the cumulative r^−0.5 distribution.
  const draw = (r0, r1) => { const a = r0 ** -0.5, b = r1 ** -0.5; return (a + rnd() * (b - a)) ** -2; };
  for (let i = 0; i < count; i++) {
    const inner = i < count * 0.35, r = inner ? draw(2000, 20000) : draw(20000, 100000);
    let v = [gauss(), gauss(), gauss() * (inner ? 0.45 : 1)];
    const l = Math.hypot(...v);
    out.push(eclipticToEquatorial(v.map((x) => (x / l) * r)).map((x) => x * AU));
  }
  return out;
}
export class SolarMapLayer {
  constructor(mapWorld, mapScene, makeLabel) {
    this.group = new T.Group();
    mapWorld.add(this.group);
    const jd0 = yearToJD(EPOCH);
    for (const key of PLANET_KEYS) {
      const days = PLANET_DAYS[key], pts = [];
      for (let k = 0; k <= 360; k++) pts.push(toLy(heliocentricAU(key === "EMB" ? "Terre" : key, jd0 + (days * k) / 360)));
      this.group.add(orbitLine(pts, 0x6f8fa3, 0.55));
    }
    this.comets = COMETS.map((c) => {
      const line = orbitLine(cometOrbitPoints(c, c.e < 1 ? 1e4 : 120), c.e >= 1 ? 0xe39b6a : 0x7fd6c4, 0.75);
      this.group.add(line);
      return { c, line };
    });
    const oort = oortPopulation(),
      g = new T.BufferGeometry(),
      col = [];
    g.setAttribute("position", new T.Float32BufferAttribute(oort.flat(), 3));
    for (let i = 0; i < oort.length; i++) col.push(0.45, 0.56, 0.7);
    g.setAttribute("color", new T.Float32BufferAttribute(col, 3));
    this.oort = new T.Points(g, mapPoints(1.6, 0.35));
    this.group.add(this.oort);
    this.labels = [
      { name: "NUAGE D’OORT · HYPOTHÉTIQUE", label: makeLabel("NUAGE D’OORT · HYPOTHÉTIQUE", "#9db7cf"), at: [0, 0, 60000 * AU], min: 1e-1, max: 1e2 },
      { name: "Nuage d’Oort interne", label: makeLabel("Nuage d’Oort interne", "#7f97ad"), at: [0, 0, 9000 * AU], min: 1, max: 1e3 },
      ...this.comets.map(({ c }) => ({ name: c.aliases[0], label: makeLabel(c.aliases[0], "#8fe0cf"), comet: c, min: 1e2, max: 1e6 })),
    ];
    for (const l of this.labels) mapScene.add(l.label);
    this.makeLabel = makeLabel;
  }
  // k: map scale (scene units per light-year). Labels follow the comets' current positions (objects with o.comet).
  update(s, k, map, byId) {
    this.group.visible = map;
    for (const l of this.labels) {
      let p = l.at;
      if (l.comet) { const o = byId?.get("comet:" + l.comet.id); p = o ? o.xyz : [0, 0, 0]; }
      l.label.position.set(...p.map((x) => x * k));
      l.label.position.x += 1.2;
      l.label.visible = map && k > l.min && k < l.max;
    }
  }
  visibleLabels() { return this.labels.filter((l) => l.label.visible).map((l) => l.name); }
}
export { period };
