// Galaxies as light (scripts/build-galaxy-photometry.py → public/galaxy-photometry.{json,bin}): 2MRS, Cosmicflows-4, UNGC
// and McConnachie merged, one row per galaxy, with an apparent V magnitude whose provenance is kept (measured V, B or K with
// a typical colour of the Hubble type). Two uses:
// 1. enrichGalaxy: the cockpit's galaxy objects receive their magnitude (calibrating the volumetric models of
//    local-group.js), their measured inclination and position angle where published, and for Cosmicflows-4 entries the
//    2MRS morphological type and size instead of the class guessed from the distance method;
// 2. GalaxyLightLayer: every galaxy with a magnitude drawn on the photometric scale of the stars, at its light-cone position
//    seen from the ship (cosmic-motion.js), as a point or a small blob of its angular size. Not an image of the galaxy.
import * as T from 'three';
import { galaxyVelocity, receivedLinear, C_KMS } from './cosmic-motion.js';
import { classFromT, CLASSES, LY_PER_KPC } from './catalogue-galaxies.js';
import { diffuseGain, CUBE_SIZE, CUBE_POINT_GLSL, TEXEL_GLSL, PSF_VERTEX_GLSL, PSF_FRAGMENT } from './photometry.js';
import {lutTexture} from './gpu-textures.js';
import {galaxySpectra,spectralClassFromT} from './galaxy-spectral.js';

// Typical absolute V magnitudes by model class, used only when no magnitude is published (flagged as an estimate).
export const TYPICAL_MV = { E: -21, S0: -20.5, dE: -16, dSph: -10, dwarfUnknown: -11, Sab: -21, Sbc: -20.5, Scd: -19.5, Sm: -18, Ir: -16, unknown: -19.5 };
const TYPES = { f32: Float32Array };
export async function loadGalaxyPhotometry(base = './', fetcher = fetch) {
  const [meta, buf] = await Promise.all([
    fetcher(base + 'galaxy-photometry.json').then((r) => { if (!r.ok) throw Error('galaxy-photometry.json indisponible'); return r.json(); }),
    fetcher(base + 'galaxy-photometry.bin').then((r) => { if (!r.ok) throw Error('galaxy-photometry.bin indisponible'); return r.arrayBuffer(); }),
  ]);
  return photometryFrom(meta, buf);
}
export function photometryFrom(meta, buf) {
  if (meta.schema !== 1 || buf.byteLength !== meta.binaryBytes) throw Error('Photométrie des galaxies incohérente');
  const col = {}; for (const [k, d] of Object.entries(meta.columns)) col[k] = new TYPES[d.type](buf, d.offset, d.count);
  const index = new Map(); meta.ids.forEach((id, i) => index.set(id, i));
  for (const [id, alts] of Object.entries(meta.alt || {})) for (const a of alts) index.set(a, index.get(id));
  return { meta, col, index, count: meta.count };
}
const VSRC = ['', 'V mesurée (McConnachie 2012)', 'B totale UNGC − (B−V) typique du type', 'K totale 2MRS + (V−K) typique du type + extinction galactique'];
const DSRC = ['', 'McConnachie 2012', 'UNGC', 'Cosmicflows-4', 'distance de Hubble cz/H₀ (modèle)'];
export const vSource = (flags) => VSRC[Math.floor(flags / 8)] || '';
export const dSource = (flags) => DSRC[flags % 8] || '';
// Magnitude, orientation and (CF4) morphology from the photometric list. Returns the row used, or −1.
export function enrichGalaxy(o, data, ids = [o.id]) {
  const i = data ? ids.map((id) => data.index.get(id)).find((x) => x != null) ?? -1 : -1, c = data?.col;
  if (i >= 0) {
    const f = c.flags[i], V = c.V[i], q = c.q[i], pa = c.pa[i], T0 = c.T[i], rk = c.radiusKpc[i];
    if (Number.isFinite(T0)) o.hubbleT = T0;
    if (Number.isFinite(c.av[i])) o.avFg = c.av[i];
    if (Number.isFinite(V) && (o.Vmag == null || /^estimée/.test(o.vmagSource || ''))) { o.Vmag = V; o.vmagSource = vSource(f); }
    if (o.catalogue === 'cf4' && Number.isFinite(T0)) {
      const cls = classFromT(T0), C = CLASSES[cls];
      Object.assign(o, { galaxyClass: cls, shapeCode: C.shape, shapeParams: C.params, classSource: 'type morphologique T = ' + T0 + ' (2MRS, Huchra et al. 2012)', kind: 'Galaxie ' + C.label + ' · Cosmicflows-4' });
      if (Number.isFinite(rk) && rk > 0) { o.radiusLy = rk * LY_PER_KPC; o.sizeSource = 'rayon isophotal 2MASS K × 1,7 (≈ optique)'; }
    }
    if (Number.isFinite(q) && o.shapeCode === 0) { const q0 = 0.2, cosI = Math.sqrt(Math.max(0, (Math.min(1, q) ** 2 - q0 * q0) / (1 - q0 * q0))); o.inc = Math.acos(cosI) * 180 / Math.PI; o.incSource = 'déduite du rapport d’axes mesuré b/a = ' + q.toFixed(2); }
    if (Number.isFinite(pa)) { o.pa = pa; o.paSource = 'angle de position mesuré (McConnachie 2012)'; }
  }
  if (o.Vmag == null && o.galaxyClass && TYPICAL_MV[o.galaxyClass] != null) {
    o.Vmag = TYPICAL_MV[o.galaxyClass] + 5 * Math.log10(Math.hypot(...(o.catalogueXYZ || o.xyz)) / 32.6156);
    o.vmagSource = 'estimée : luminosité typique d’une galaxie ' + o.galaxyClass + ' (aucune magnitude publiée)';
  }
  return i;
}

const vertexShader = `attribute float vmag,dcat,rad,temp,shown,avfg,dsun,dship,sclass;uniform float pix,avScale,band,gain;uniform sampler2D lut,sedLut;varying vec3 light;varying float soft;
vec4 thermal(float T){return texture2D(lut,vec2(clamp(log(max(100.,T)/100.)/log(10000.),0.,1.),.5));}
vec4 galaxySED(float cls,float D){float u=(.5+clamp((D-.72)/.37,0.,1.)*256.)/257.;return texture2D(sedLut,vec2(u,(cls+.5)/8.));}
${TEXEL_GLSL}
${PSF_VERTEX_GLSL}
void main(){float d=max(length(position),1e-6);vec3 n=position/d;float mag=vmag+5.*log(d/dcat)/log(10.)+avfg*(avScale-1.);float flux=pow(10.,-.4*(mag-3.))*${CUBE_POINT_GLSL};bool sedValid=(dsun>=.72&&dsun<=1.09&&dship>=.72&&dship<=1.09);
 vec4 seen=sedValid?galaxySED(sclass,dship):thermal(temp*dship),cat=sedValid?galaxySED(sclass,dsun):thermal(temp*dsun);
 flux*=sedValid?(seen.a/max(cat.a,1.e-12))*pow(dship/dsun,4.):exp(clamp(seen.a-cat.a,-60.,60.));
 flux*=shown;if(band>=3.)flux*=.005;
 vec4 mv=viewMatrix*vec4(n*1000.,1.);float size=clamp(2.*rad/d/pix*texelScale(mv.xyz),1.25,48.);soft=smoothstep(2.,5.,2.*rad/d/pix);flux*=mix(1.,gain,soft);psfS=psfSigma(size,soft,texelScale(mv.xyz));psfD=psfDraw(size,psfS);light=seen.rgb*flux*.818;
 if(band==0.){float y=dot(light,vec3(.2126,.7152,.0722));light=mix(vec3(y),light,smoothstep(.3,4.,flux));}
 light*=texelGain(mv.xyz);gl_Position=projectionMatrix*mv;gl_PointSize=psfD;if(shown<.001){gl_Position=vec4(2.,2.,2.,1.);gl_PointSize=0.;}}`;
const fragmentShader = PSF_FRAGMENT;
// Doppler factor of light emitted by a source of velocity v (units of c) toward unit direction k (source → observer):
// D = 1 / (γ (1 − v·k)). Catalogue magnitude anchors the flux observed at the Sun (D☉).
// For a MOVING SOURCE at fixed observer-frame emission distance, the V-band source correction is
// L_V(T·D)/L_V(T·D☉) for the Planck fallback, or (D/D☉)^4 J(D)/J(D☉) for KC96 composite SEDs.
// Do not multiply by (D☉/D)^2: that factor belongs to the moving OBSERVER/point-source
// convention and was mistakenly applied before 17 Oct 2026. Flat-spacetime model, not FLRW.
export function doppler(v, k) { const b2 = v[0] * v[0] + v[1] * v[1] + v[2] * v[2]; return Math.sqrt(1 - b2) / (1 - (v[0] * k[0] + v[1] * k[1] + v[2] * k[2])); }
// Galaxy colour temperature by Hubble type (old red populations to young blue ones), on the black-body table of the stars.
export const typeTemp = (T) => (!Number.isFinite(T) ? 5200 : T <= -2 ? 4500 : T <= 2 ? 4900 : T <= 5 ? 5600 : 6800);
// Same temperature for a cockpit galaxy object (measured Hubble type, else its model class).
const CLASS_T = { E: -5, S0: -2, dE: -5, dSph: -5, dwarfUnknown: -5, Sab: 2, Sbc: 4, Scd: 6, Sm: 9, Ir: 10 };
export const objectTemp = (o) => typeTemp(Number.isFinite(o.hubbleT) ? o.hubbleT : o.irregular ? 9 : CLASS_T[o.galaxyClass] ?? (o.type === 'galaxy' ? 4 : NaN));
// Fraction of the Milky Way foreground extinction still in front of an observer at distance `far` (ly) from the Sun:
// 1 within 3 000 ly, 0 beyond 150 000 ly, logarithmic in between (approximation shared by points and volumes).
export const foregroundScale = (far) => (far < 3e3 ? 1 : far > 1.5e5 ? 0 : 1 - Math.log(far / 3e3) / Math.log(50));
function lutAt(lut, T) { const x = Math.min(1, Math.max(0, Math.log(Math.max(100, T) / 100) / Math.log(1e4))) * 511, i = Math.min(510, Math.floor(x)), f = x - i, c = (k) => lut[4 * i + k] * (1 - f) + lut[4 * i + 4 + k] * f; return [c(0), c(1), c(2), c(3) + Math.log(Math.max(1, T / 1e6))]; }
// Light of a galaxy seen with the source Doppler factor D instead of D☉ (the one included in its catalogue magnitude):
// The fallback below uses a ratio of Planck V luminosities and colour ratios, without
// the erroneous moving-observer factor. The calibrated source magnitude is the reference.
// Only the galaxy's own motion enters: the ship's velocity is applied once, later, to the whole sky (sky-optics.js).
export function sourceTint(lut, T, Dsun, D, avFg = 0, fg = 1) {
  if (!lut || lut.length < 2048 || !Number.isFinite(T)) return [1, 1, 1];
  const a = lutAt(lut, T * D), b = lutAt(lut, T * Dsun), k = Math.exp(Math.max(-60, Math.min(60, a[3] - b[3]))) * 10 ** (0.4 * avFg * (1 - fg));
  return [0, 1, 2].map((j) => (k * a[j]) / Math.max(1e-6, b[j]));
}

export class GalaxyLightLayer {
  constructor(lut) {
    const tex = lutTexture(new Float32Array(lut), 512, 1); tex.minFilter = tex.magFilter = T.LinearFilter; tex.needsUpdate = true;
    const sedTex=lutTexture(galaxySpectra.data,galaxySpectra.samples,galaxySpectra.ids.length);
    sedTex.minFilter=sedTex.magFilter=T.LinearFilter;sedTex.needsUpdate=true;
    this.material = new T.ShaderMaterial({ vertexShader, fragmentShader, uniforms: { sedLut:{value:sedTex}, pix: { value: 2 / CUBE_SIZE }, avScale: { value: 1 }, band: { value: 1 }, gain: { value: 1 }, psfMin: { value: .55 }, lut: { value: tex } }, transparent: true, depthWrite: false, blending: T.AdditiveBlending });
    this.points = new T.Points(new T.BufferGeometry(), this.material); this.points.frustumCulled = false; this.points.visible = false;
    this.rows = []; this.status = 'idle'; this.next = 0; this.key = '';
  }
  // Rows with a magnitude; positions and worldlines in ly (catalogue frame).
  setData(data, field = null) {
    const c = data.col, rows = [];
    for (let i = 0; i < data.count; i++) {
      if (!Number.isFinite(c.V[i])) continue;
      const ra = c.ra[i] * Math.PI / 180, de = c.dec[i] * Math.PI / 180, d = c.mly[i] * 1e6, xyz = [d * Math.cos(de) * Math.cos(ra), d * Math.cos(de) * Math.sin(ra), d * Math.sin(de)];
      rows.push({ i, id: data.meta.ids[i], xyz, d, V: c.V[i], av: c.av[i] || 0, rad: (Number.isFinite(c.radiusKpc[i]) ? c.radiusKpc[i] : 5) * LY_PER_KPC, T: c.T[i], sclass: spectralClassFromT(c.T[i]), vh: c.vh[i] });
    }
    this.rows = rows; this.data = data;
    const n = rows.length, g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(new Float32Array(3 * n), 3));
    g.setAttribute('vmag', new T.Float32BufferAttribute(rows.map((r) => r.V), 1));
    g.setAttribute('dcat', new T.Float32BufferAttribute(rows.map((r) => r.d), 1));
    g.setAttribute('rad', new T.Float32BufferAttribute(rows.map((r) => r.rad), 1));
    g.setAttribute('temp', new T.Float32BufferAttribute(rows.map((r) => typeTemp(r.T)), 1));
    g.setAttribute('sclass',new T.Float32BufferAttribute(rows.map((r)=>r.sclass),1));
    g.setAttribute('avfg', new T.Float32BufferAttribute(rows.map((r) => r.av), 1));
    g.setAttribute('dsun', new T.BufferAttribute(new Float32Array(n).fill(1), 1));
    g.setAttribute('dship', new T.BufferAttribute(new Float32Array(n).fill(1), 1));
    g.setAttribute('shown', new T.BufferAttribute(new Float32Array(n).fill(1), 1));
    this.points.geometry.dispose(); this.points.geometry = g; this.status = 'ready'; this.points.visible = true;
    this.setMotion(field);
  }
  // Worldlines: measured heliocentric radial velocity, reconstructed transverse flow beyond 10 million ly (cosmic-motion.js).
  setMotion(field) {
    const n = this.rows.length; this.base = new Float64Array(3 * n); this.vel = new Float64Array(3 * n);
    for (let k = 0; k < n; k++) { const r = this.rows[k], m = galaxyVelocity({ id: r.id, xyz: r.xyz, vHelio: r.vh }, field);
      for (let j = 0; j < 3; j++) { const v = m.v[j] / C_KMS; this.vel[3 * k + j] = v; this.base[3 * k + j] = r.xyz[j] + v * r.d; }
      this.points.geometry.attributes.dsun?.setX(k, doppler(this.vel.subarray(3 * k, 3 * k + 3), r.xyz.map((x) => -x / r.d))); }
    if (this.points.geometry.attributes.dsun) this.points.geometry.attributes.dsun.needsUpdate = true;
    this.key = '';
  }
  // Light-cone positions relative to the ship (doubles, then float32), at most 4 times per second of real time unless the
  // ship jumped. `weights` (id → factor) hands a galaxy over to its volume (local-group.js): the point keeps the share
  // (1 − w_volume) × anisotropy of the light, the volume the rest, so that the sum is continuous (a Set hides entirely).
  update(s, weights = new Map(), now = performance.now() / 1000) {
    if (this.status !== 'ready') return false;
    if (weights instanceof Set) weights = new Map([...weights].map((id) => [id, 0]));
    const key = [...weights].map(([id, w]) => id + ':' + w.toFixed(3)).sort().join(',') + '|' + s.retarded, far = Math.hypot(...s.pos);
    const moved = !this.lastPos || Math.hypot(...s.pos.map((x, k) => x - this.lastPos[k])) > 0.01 * Math.max(far, 1e5);
    if (key === this.key && !moved && now < this.next) return false;
    this.key = key; this.next = now + 0.25; this.lastPos = [...s.pos];
    const p = this.points.geometry.attributes.position, sh = this.points.geometry.attributes.shown, ds = this.points.geometry.attributes.dship, q = [0, 0, 0], b = [0, 0, 0], v = [0, 0, 0];
    for (let k = 0; k < this.rows.length; k++) {
      for (let j = 0; j < 3; j++) { b[j] = this.base[3 * k + j]; v[j] = this.vel[3 * k + j]; }
      if (s.retarded) receivedLinear(b, v, s.pos, s.t, q); else for (let j = 0; j < 3; j++) q[j] = b[j] + v[j] * s.t;
      const rx = q[0] - s.pos[0], ry = q[1] - s.pos[1], rz = q[2] - s.pos[2], rd = Math.hypot(rx, ry, rz) || 1;
      p.setXYZ(k, rx, ry, rz); sh.setX(k, weights.get(this.rows[k].id) ?? 1); ds.setX(k, doppler(v, [-rx / rd, -ry / rd, -rz / rd]));
    }
    p.needsUpdate = sh.needsUpdate = ds.needsUpdate = true;
    // Foreground extinction of the Milky Way (included in the catalogue magnitudes) removed progressively when leaving
    // the Galaxy: full within 3 000 ly of the Sun, none beyond 150 000 ly (logarithmic in between; approximation).
    this.material.uniforms.avScale.value = foregroundScale(far);
    this.material.uniforms.band.value = s.band ?? 1; this.material.uniforms.gain.value = diffuseGain(s.band ?? 1);
    return true;
  }
}
