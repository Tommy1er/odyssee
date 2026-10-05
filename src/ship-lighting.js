// Astrophysical illumination of the spacecraft. Dominant sources are chosen by received flux F = L/(4πd²),
// not by proximity. Irradiance is expressed relative to the mean solar irradiance at Earth (1 L☉ at 1 au,
// 1361 W/m²). With relativistic optics in the comoving frame, the direction is aberrated and the point-source
// flux scales as D² (intensity D⁴ × solid angle D⁻²); the colour temperature scales as D.
import { sub, norm, unit, AU, aberrateU, dopplerU } from "./physics.js";
export const SOLAR_CONSTANT = 1361;
export function sourceFlux(o, pos) {
  const L = o.lumSolar;
  if (!(L > 0)) return null;
  const rel = sub(o.lightXYZ || o.xyz, pos),
    d = norm(rel) / AU;
  if (!(d > 0)) return null;
  return { o, dir: unit(rel), E: L / (d * d), T: o.temperature || 5772, distanceAU: d };
}
export function dominantSources(objects, pos, count = 3) {
  const best = [];
  for (const o of objects) {
    if (o.type !== "star") continue;
    const s = sourceFlux(o, pos);
    if (!s) continue;
    if (best.length < count || s.E > best.at(-1).E) {
      best.push(s);
      best.sort((a, b) => b.E - a.E);
      if (best.length > count) best.pop();
    }
  }
  return best;
}
// Seen from the ship's rest frame (comoving camera with relativistic optics enabled).
export function inShipFrame(source, u) {
  const D = dopplerU(source.dir, u);
  return { ...source, dir: aberrateU(source.dir, u), E: source.E * D * D, T: source.T * D, doppler: D };
}
// Camera-like exposure: full adaptation down to 1e-3 of the terrestrial irradiance, then the hull darkens
// in proportion. Secondary sources keep their true ratio to the dominant one. Nothing is added in the shadows.
export const ADAPTATION_FLOOR = 1e-3;
export function displayIntensity(E, Edominant, base = 3.2) {
  const adapt = Math.max(Edominant, ADAPTATION_FLOOR);
  return base * Math.min(E / adapt, 4);
}
export class ShipLighting {
  constructor(objects) {
    this.objects = objects;
    this.sources = [];
    this.lastWall = -1e9;
    this.lastPos = null;
  }
  update(s) {
    const moved = !this.lastPos || norm(sub(s.pos, this.lastPos)) > 1e-7 * Math.max(1, norm(s.pos) * 1e-3);
    if (s.wall - this.lastWall > 0.5 || (moved && s.wall - this.lastWall > 0.1)) {
      this.sources = dominantSources(this.objects, s.pos, 3);
      this.lastWall = s.wall;
      this.lastPos = [...s.pos];
    }
    const comoving = s.relativistic && (s.shipFrame || "comoving") === "comoving" && norm(s.u || [0, 0, 0]) > 1e-9;
    return this.sources.map((x) => (comoving ? inShipFrame(x, s.u) : { ...x, doppler: 1 }));
  }
}
