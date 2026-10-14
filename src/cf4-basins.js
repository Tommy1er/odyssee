// Basins of attraction and reconstructed flow of the "CF4 2023, ungrouped" reconstruction (Dupuy & Courtois 2023;
// Courtois et al. 2023), built by scripts/build-cf4-basins.py from the published grids. This is a MODEL of the peculiar
// velocity field inferred from Cosmicflows-4 distances (Wiener-filter type reconstruction), not measured 3D velocities:
// streamlines are lines of the present-day field, not trajectories over billions of years. Basin boundaries depend on
// the reconstruction (the grouped version gives other basins) and on the box (SDSS basins are cut by its edge).
// Coordinates: supergalactic SGX, SGY, SGZ in Mpc/h (h = 0.746) → equatorial J2000 axes in millions of light-years,
// the frame of the cosmic map (cosmos.js) and, ×1e6, of the cockpit.
import * as T from "three";
import { SG_AXES, MPC_MLY } from "./extragalactic-data.js";

export const BASIN_COLORS = { 1: 0xffc46b, 2: 0x7fb7ff, 3: 0xff7f9e, 4: 0x8fe39a, 5: 0xc49bff, 6: 0x6fe0e0, 7: 0x8a8f99, 8: 0x7f8794, 9: 0x8b8693 };
const TYPES = { u8: Uint8Array, u16: Uint16Array, u32: Uint32Array, i16: Int16Array, f32: Float32Array };
export const view = (buf, d) => new TYPES[d.type](buf, d.offset, d.count);
// Supergalactic Mpc/h → equatorial Mly (and back).
export function sgToEq(sg, h) { const k = MPC_MLY / h; return [0, 1, 2].map((j) => k * (sg[0] * SG_AXES[0][j] + sg[1] * SG_AXES[1][j] + sg[2] * SG_AXES[2][j])); }
export function eqToSg(p, h) { const k = h / MPC_MLY; return SG_AXES.map((a) => k * (a[0] * p[0] + a[1] * p[1] + a[2] * p[2])); }

// Data access shared by the map and the cockpit (no three.js needed).
export class BasinData {
  constructor(meta, buffer) {
    this.meta = meta; this.buffer = buffer; this.h = meta.h;
    const g = meta.labelGrid, lab = view(buffer, g.labels), run = view(buffer, g.runs), N = 128 ** 3;
    this.labels = new Uint8Array(N); let o = 0;
    for (let i = 0; i < lab.length; i++) { this.labels.fill(lab[i], o, o + run[i]); o += run[i]; }
    if (o !== N) throw Error("Grille des bassins incomplète");
    this.vel = view(buffer, meta.velocity.data);
    this.names = Object.fromEntries(meta.basins.map((b) => [b.label, b.name]));
  }
  // Published basin label at an equatorial position in Mly (0: outside every basin or outside the box).
  labelAt(pMly) {
    const sg = eqToSg(pMly, this.h), c = this.meta.labelCell, i = sg.map((x) => Math.round(x / c + this.meta.labelCenterIndex));
    if (i.some((k) => k < 0 || k > 127)) return 0;
    return this.labels[(i[2] * 128 + i[1]) * 128 + i[0]];
  }
  basinAt(pMly) { const k = this.labelAt(pMly); return k ? { label: k, name: this.names[k] } : null; }
  // Reconstructed peculiar velocity (km/s, supergalactic components) at an equatorial position in Mly; trilinear.
  velocityAt(pMly) {
    const sg = eqToSg(pMly, this.h), c = this.meta.velocityCell, g = sg.map((x) => x / c + this.meta.velocityCenterIndex);
    if (g.some((x) => x < 0 || x > 63)) return null;
    const i0 = g.map((x) => Math.min(62, Math.floor(x))), f = g.map((x, k) => x - i0[k]), out = [0, 0, 0], N = 64 ** 3;
    for (let dx = 0; dx < 2; dx++) for (let dy = 0; dy < 2; dy++) for (let dz = 0; dz < 2; dz++) {
      const w = (dx ? f[0] : 1 - f[0]) * (dy ? f[1] : 1 - f[1]) * (dz ? f[2] : 1 - f[2]), idx = ((i0[0] + dx) * 64 + (i0[1] + dy)) * 64 + (i0[2] + dz);
      for (let k = 0; k < 3; k++) out[k] += w * this.vel[k * N + idx];
    }
    return out;
  }
  // Same velocity as an equatorial vector (km/s).
  velocityEqAt(pMly) { const v = this.velocityAt(pMly); return v && [0, 1, 2].map((j) => v[0] * SG_AXES[0][j] + v[1] * SG_AXES[1][j] + v[2] * SG_AXES[2][j]); }
}
let loading = null;
export function loadBasinData(base = "./", fetcher = fetch) {
  if (!loading) loading = Promise.all([
    fetcher(base + "cf4-basins-2023.json").then((r) => { if (!r.ok) throw Error("cf4-basins-2023.json indisponible"); return r.json(); }),
    fetcher(base + "cf4-basins-2023.bin").then((r) => { if (!r.ok) throw Error("cf4-basins-2023.bin indisponible"); return r.arrayBuffer(); }),
  ]).then(([meta, buf]) => { if (meta.schema !== 1 || buf.byteLength !== meta.binaryBytes) throw Error("Données des bassins incohérentes"); return new BasinData(meta, buf); })
    .catch((e) => { loading = null; throw e; });
  return loading;
}

// Rendering layer of the cosmic map (units: Mly).
const shellVertex = `varying vec3 vN;varying vec3 vV;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`;
const shellFragment = `uniform vec3 color;uniform float strength;varying vec3 vN;varying vec3 vV;void main(){float rim=1.-abs(dot(normalize(vN),normalize(vV)));float a=strength*(.015+.32*pow(rim,3.));gl_FragColor=vec4(color*a,a);}`;
const lineVertex = `attribute float phase;attribute vec3 color;varying float vPhase;varying vec3 vColor;void main(){vPhase=phase;vColor=color;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const lineFragment = `uniform float time,opacity;varying float vPhase;varying vec3 vColor;void main(){float wave=fract(vPhase/60.-time*.25);float a=opacity*(.25+.75*smoothstep(.0,.85,wave)*(1.-smoothstep(.85,1.,wave)));gl_FragColor=vec4(vColor*a,a);}`;
export class BasinLayer {
  constructor(scene) {
    this.root = new T.Group(); this.root.visible = false; scene.add(this.root);
    this.shells = new T.Group(); this.lines = null; this.root.add(this.shells); this.status = "idle"; this.data = null; this.entries = [];
  }
  async load(base) {
    if (this.status === "ready" || this.status === "loading") return this.ready;
    this.status = "loading";
    this.ready = loadBasinData(base).then((d) => { this.build(d); this.status = "ready"; return d; }).catch((e) => { this.status = "error"; this.error = e.message; throw e; });
    return this.ready;
  }
  build(d) {
    this.data = d; const { meta, buffer } = d, h = meta.h, c = meta.labelCell, ci = meta.labelCenterIndex;
    for (const b of meta.basins) {
      const q = view(buffer, b.vertices), f = view(buffer, b.faces), pos = new Float32Array(q.length);
      for (let i = 0; i < q.length; i += 3) { const p = sgToEq([(q[i] / 16 - ci) * c, (q[i + 1] / 16 - ci) * c, (q[i + 2] / 16 - ci) * c], h); pos[i] = p[0]; pos[i + 1] = p[1]; pos[i + 2] = p[2]; }
      const g = new T.BufferGeometry(); g.setAttribute("position", new T.BufferAttribute(pos, 3)); g.setIndex(new T.BufferAttribute(f instanceof Uint16Array ? new Uint16Array(f) : new Uint32Array(f), 1)); g.computeVertexNormals();
      const strength = b.label === 1 ? 1.0 : b.label <= 6 ? 0.38 : 0.18;
      const m = new T.ShaderMaterial({ vertexShader: shellVertex, fragmentShader: shellFragment, uniforms: { color: { value: new T.Color(BASIN_COLORS[b.label]) }, strength: { value: strength } }, transparent: true, depthWrite: false, side: T.DoubleSide, blending: T.CustomBlending, blendSrc: T.OneFactor, blendDst: T.OneMinusSrcAlphaFactor });
      const mesh = new T.Mesh(g, m); mesh.renderOrder = 3; this.shells.add(mesh);
      this.entries.push({ basin: b, mesh, attractor: sgToEq(b.attractorMpch, h) });
    }
    // Streamlines as line segments; phase = distance along the line (Mly), animated toward the sink.
    const L = meta.streamlines, M = view(buffer, L.meta), P = view(buffer, L.points), pos = [], col = [], phase = [];
    let k = 0;
    for (let i = 0; i < L.count; i++) {
      const n = M[2 * i], lab = M[2 * i + 1], color = new T.Color(BASIN_COLORS[lab] || 0x9aa3ad); let prev = null, s = 0;
      for (let j = 0; j < n; j++, k++) {
        const p = sgToEq([P[3 * k] / 10, P[3 * k + 1] / 10, P[3 * k + 2] / 10], h);
        if (prev) { pos.push(...prev, ...p); const ds = Math.hypot(p[0] - prev[0], p[1] - prev[1], p[2] - prev[2]); col.push(color.r, color.g, color.b, color.r, color.g, color.b); phase.push(s, s + ds); s += ds; }
        prev = p;
      }
    }
    const g = new T.BufferGeometry(); g.setAttribute("position", new T.Float32BufferAttribute(pos, 3)); g.setAttribute("color", new T.Float32BufferAttribute(col, 3)); g.setAttribute("phase", new T.Float32BufferAttribute(phase, 1));
    this.lines = new T.LineSegments(g, new T.ShaderMaterial({ vertexShader: lineVertex, fragmentShader: lineFragment, uniforms: { time: { value: 0 }, opacity: { value: 0.4 } }, transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
    this.lines.renderOrder = 4; this.root.add(this.lines);
  }
  update(time, { shells = true, lines = true, sdss = false } = {}) {
    if (this.status !== "ready") return;
    this.shells.visible = shells; for (const e of this.entries) e.mesh.visible = shells && (sdss || e.basin.label <= 6);
    this.lines.visible = lines; this.lines.material.uniforms.time.value = time;
  }
}
