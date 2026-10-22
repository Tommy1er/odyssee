// Unresolved nebulae as calibrated point sources, and their handoff to the ray-marched volume.
//
// A nebula far away covers less than a pixel of the sky cube (the 256-pixel backdrop where non-selected clouds are
// marched). Sampling a sub-pixel volume at one ray per texel gives its flux with a large error: the Tarantula seen from
// the Sun came out 2.4 × its calibrated flux (measured 20 Oct 2026). Far away, a cloud is therefore drawn as a point
// sprite carrying exactly the flux the volume is calibrated to (nebulae.js: V − A_V seen from the Earth, inverse-square
// from there), in the same photometric scale as stars (pixel sum × PIXEL_SR, solid-angle corrected, photometry.js).
// As it grows, light is handed to the volume: weight w = smoothstep of the apparent diameter in pixels of the surface that
// draws the volume (backdrop cube texels for other clouds, screen pixels for the selected cloud, which sky-optics marches
// per screen ray at any distance), w to the volume, 1 − w to the point. Visible bands only; other bands keep the volume.
import * as T from 'three';
import {nebulaDirectionGain} from './nebula-anisotropy.js';
import {sub} from './physics.js';
import {radiusLy} from './body-data.js';
import {calibrate,physicsOf,intrinsicMag} from './nebulae.js';
import {CUBE_SIZE,CUBE_POINT_GLSL,TEXEL_GLSL,PSF_VERTEX_GLSL,PSF_FRAGMENT,diffuseGain} from './photometry.js';

export const BACKDROP_TEXEL = 2 / 256;          // centre texel of the backdrop cube (sky-optics.js)
export const VOLUME_FROM = 3, VOLUME_FULL = 8;    // backdrop texels across the diameter
export const DIRECT_FROM = 2, DIRECT_FULL = 5;    // screen pixels across the diameter (per-ray march, no texel sampling)
const step = (x, a, b) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
export const visibleBand = (band) => band < 1.5 || band > 5.5;
// Share of a cloud's light drawn by its volume.
export function nebulaVolumeWeight({ radius, distance, selected, pixelAngle, band }) {
  if (!visibleBand(band ?? 1)) return 1;
  const diameter = 2 * radius / Math.max(distance, 1e-30);
  return selected ? step(diameter / (pixelAngle || 1.2e-3), DIRECT_FROM, DIRECT_FULL) : step(diameter / BACKDROP_TEXEL, VOLUME_FROM, VOLUME_FULL);
}
// Flux of the whole cloud as the volume draws it from the Earth, scaled to distance d (same units as fluxFromMag / PHOT_ZERO).
export const nebulaMagnitudeAt = (o, d) => intrinsicMag(physicsOf(o)) + 5 * Math.log10(Math.max(d, 1e-30) / (o.d || 1000));
// Colour of the unresolved cloud: integrated RGB of the calibrated volume, luminance 1. A coarse grid is enough for a
// colour and keeps start-up cheap (the full calibration, 1600 rays, stays reserved to volumes actually drawn).
const colours = new Map();
export function nebulaColour(o) { if (!colours.has(o.id)) colours.set(o.id, calibrate(o, { n: 12, steps: 24 }).rgb); return colours.get(o.id); }

const vertexShader = `attribute float vint,dref,rad;attribute vec3 tint;attribute float shown;uniform float pix,band,gain;varying vec3 light;varying float soft;
${TEXEL_GLSL}
${PSF_VERTEX_GLSL}
void main(){float d=max(length(position),1e-9);vec3 n=position/d;
 float flux=pow(10.,-.4*(vint+5.*log(d/dref)/log(10.)-3.))*${CUBE_POINT_GLSL}*gain*shown;
 vec4 mv=viewMatrix*vec4(n*1000.,1.);float size=clamp(2.*rad/d/pix*texelScale(mv.xyz),1.25,48.);soft=smoothstep(2.,5.,size);
 psfS=psfSigma(size,soft,texelScale(mv.xyz));psfD=psfDraw(size,psfS);light=tint*flux*.818*texelGain(mv.xyz);
 if(band==0.){float y=dot(light,vec3(.2126,.7152,.0722));light=mix(vec3(y),light,smoothstep(.3,4.,flux));}
 gl_Position=projectionMatrix*mv;gl_PointSize=psfD;if(shown<1.e-6){gl_Position=vec4(2.,2.,2.,1.);gl_PointSize=0.;}}`;
// Pixel-integrated Gaussian PSF shared by every point sprite (photometry.js): pixel sum 0.818 × flux wherever it falls.
const fragmentShader = PSF_FRAGMENT;

export class NebulaPointLayer {
  constructor(objects) {
    this.objects = objects.filter((o) => ['nebula', 'pillars'].includes(o.type));
    const n = this.objects.length, g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(new Float32Array(3 * n), 3));
    g.setAttribute('vint', new T.Float32BufferAttribute(this.objects.map((o) => intrinsicMag(physicsOf(o))), 1));
    g.setAttribute('dref', new T.Float32BufferAttribute(this.objects.map((o) => o.d || 1000), 1));
    g.setAttribute('rad', new T.Float32BufferAttribute(this.objects.map((o) => radiusLy(o)), 1));
    g.setAttribute('tint', new T.BufferAttribute(new Float32Array(3 * n).fill(1), 3));
    g.setAttribute('shown', new T.BufferAttribute(new Float32Array(n), 1));
    this.material = new T.ShaderMaterial({ vertexShader, fragmentShader, uniforms: { pix: { value: 2 / CUBE_SIZE }, band: { value: 1 }, gain: { value: 1 }, psfMin: { value: .55 } },
      transparent: true, depthWrite: false, depthTest: false, blending: T.AdditiveBlending });
    this.points = new T.Points(g, this.material); this.points.frustumCulled = false; this.points.renderOrder = 3;
    this.weights = new Map(); this.key = '';
    this.rotations=this.objects.map(o=>new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,-1),new T.Vector3(...o.xyz).normalize()).invert());
  }
  // weights: id → share drawn as a point (already including any emission-budget gain). Returns true when the sprites changed.
  update(s, weights) {
    const g = this.points.geometry, p = g.attributes.position, sh = g.attributes.shown, tint = g.attributes.tint;
    let changed = false;
    this.objects.forEach((o, k) => {
      const rel = sub(o.lightXYZ || o.xyz, s.pos), w = weights.get(o.id) ?? 0;
      if(w>0){const local=new T.Vector3(...rel).negate().applyQuaternion(this.rotations[k]).toArray(),gain=nebulaDirectionGain(o.id,local),rgb=nebulaColour(o).map((v,i)=>v*gain[i]);
        if(rgb.some((v,i)=>Math.abs(tint.array[3*k+i]-v)>1e-5)){tint.setXYZ(k,...rgb);tint.needsUpdate=true;changed=true;}}
      p.setXYZ(k, ...rel); if (Math.abs(sh.getX(k) - w) > 1e-6) changed = true; sh.setX(k, w);
    });
    p.needsUpdate = sh.needsUpdate = true;
    this.material.uniforms.band.value = s.band ?? 1; this.material.uniforms.gain.value = diffuseGain(s.band ?? 1);
    this.weights = weights;
    return changed;
  }
}
