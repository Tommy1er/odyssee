// Nebulae: line spectra → colours (CIE 1931), atomic and diagnostic line ratios, dust reddening and opacity, flux
// normalisation on the integrated magnitude (checked with an independent perspective camera), surface brightness against
// literature orders of magnitude, the shared photometric scale and the Magellanic Clouds regression.
import assert from "node:assert/strict";
import fs from "node:fs";
import { spectrumColor, LINES, lineSet, NEBULA_PHYSICS, calibrate, makeField, physicsOf, REDDEN, lum, intrinsicMag } from "../src/nebulae.js";
import { PHOT_ZERO, fluxFromMag, diffuseGain, magPerArcsec2 } from "../src/photometry.js";
import { localGroupGLSL } from "../src/local-group.js";

let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };
const f2 = (c) => c.map((x) => x.toFixed(2)).join(" / ");
const load = (f) => { const d = JSON.parse(fs.readFileSync(new URL("../public/" + f, import.meta.url))); return (Array.isArray(d) ? d : d.objects || Object.values(d).flat()).filter((o) => o && ["nebula", "pillars"].includes(o.type)); };
const nebulae = [...load("catalogue.json"), ...load("galaxy-catalogue.json")], byId = (id) => nebulae.find((o) => o.id === id);

// 1 · Colours of pure lines and of a white continuum.
{ const ha = spectrumColor([[LINES.Ha, 1]]), o3 = spectrumColor([[LINES.O3, 1]]), hb = spectrumColor([[LINES.Hb, 1]]);
  check("Hα 656 nm : rouge pur", ha[0] > 0 && ha[1] === 0 && ha[2] === 0, f2(ha));
  check("[O III] 501 nm : vert-bleu (hors gamut sRGB, rouge écrêté)", o3[0] === 0 && o3[1] > o3[2] && o3[2] > 0, f2(o3));
  check("Hβ 486 nm : bleu-vert", hb[2] > hb[1] && hb[1] > 0, f2(hb));
  const planck = (l) => { const x = l * 1e-9; return 1 / (x ** 5 * (Math.exp(1.4388e-2 / (x * 6504)) - 1)); }, w = spectrumColor([], planck);
  check("Corps noir à 6 504 K : blanc à 15 % près", Math.max(...w) / Math.min(...w) < 1.15, f2(w)); }
// 2 · Line ratios: case B Balmer decrement and the [S II]/Hα shock criterion (Mathewson & Clarke 1973).
for (const [id, P] of Object.entries(NEBULA_PHYSICS)) for (const z of ["hi", "lo"]) {
  const L = lineSet(P[z]), I = (l) => L.filter(([w]) => w === l).reduce((s, [, v]) => s + v, 0);
  assert.ok(Math.abs(I(LINES.Ha) / I(LINES.Hb) - 2.86) < 1e-9, id + " Balmer");
}
check("Décrément de Balmer Hα/Hβ = 2,86 (cas B) dans toutes les zones", true);
{ const s2ha = (id) => { const P = NEBULA_PHYSICS[id]; return (P.lo.s2 || 0) / 2.86; };
  const shocks = ["crab", "vela-remnant", "sgrae"], photo = ["orion", "carina", "pillars", "ring", "helix", "eta-car", "sgrb2"];
  check("Rémanents de supernova : [S II]/Hα ≥ 0,4 (chocs)", shocks.every((id) => s2ha(id) >= 0.4), shocks.map((id) => id + " " + s2ha(id).toFixed(2)).join(", "));
  check("Régions photo-ionisées : [S II]/Hα < 0,4", photo.every((id) => s2ha(id) < 0.4), photo.map((id) => id + " " + s2ha(id).toFixed(2)).join(", ")); }
// 3 · Colours of the zones.
{ const ring = calibrate(byId("ring")), orion = calibrate(byId("orion")), crab = calibrate(byId("crab"));
  check("M 57 : centre vert-bleu ([O III]), anneau rouge ([N II], Hα)", ring.hiC[1] > ring.hiC[0] && ring.loC[0] > ring.loC[1], "centre " + f2(ring.hiC) + " ; anneau " + f2(ring.loC));
  check("M 42 : cœur [O III] vert-bleu, bord rose (Balmer + [N II])", orion.hiC[1] > orion.hiC[0] && orion.loC[0] > orion.loC[1] && orion.loC[2] > orion.loC[1], "cœur " + f2(orion.hiC) + " ; bord " + f2(orion.loC));
  check("Crabe : synchrotron blanc bleuté", crab.contC[2] > crab.contC[0] && crab.contC[2] / crab.contC[1] < 1.5, f2(crab.contC)); }
// 4 · Dust: transmission through the centre, per channel.
const column = (c, F, x, y, N = 240) => {
  const R = 1.1, h = Math.sqrt(Math.max(R * R - x * x - y * y, 0)), ds = (2 * h) / N; let T = [1, 1, 1], L = [0, 0, 0];
  for (let k = 0; k < N; k++) {
    const z = h - (k + 0.5) * ds, den = F.density(x, y, z), f = F.hiFrac(c.zone, x, y, z, den), e = F.emit(x, y, z, den, f), cd = c.contShape ? F.contDensity(x, y, z) : e;
    const col = c.loC.map((v, i) => v + (c.hiC[i] - v) * f), tau = REDDEN.map((r) => c.kTau * den * ds * r);
    L = L.map((l, i) => l + (c.Kl * e * col[i] + c.Kc * cd * c.contC[i]) * ds * T[i] * Math.exp(-0.5 * tau[i]));
    T = T.map((t, i) => t * Math.exp(-tau[i]));
  }
  return { L, T };
};
{ const c = calibrate(byId("pillars")), F = makeField(c.shape, c.seed), { T } = column(c, F, 0, -0.5);
  check("Pilier : colonne opaque et rougie (T_bleu < T_vert < T_rouge)", T[1] < 0.05 && T[2] < T[1] && T[1] < T[0], "T = " + T.map((x) => x.toExponential(1)).join(" / "));
  const b = calibrate(byId("sgrb2")), Fb = makeField(b.shape, b.seed), tb = column(b, Fb, 0, 0).T;
  check("Sagittarius B2 : silhouette sombre (T < 10⁻³ au centre)", tb[1] < 1e-3, "T_vert = " + tb[1].toExponential(1));
  const h = calibrate(byId("helix")), Fh = makeField(h.shape, h.seed), th = column(h, Fh, 0, 0).T;
  check("Hélice : presque transparente", th[1] > 0.7, "T_vert = " + th[1].toFixed(2)); }
// 5 · Normalisation: an independent perspective camera at 60 R on the Earth side must receive Φ(V − A_fg) · (d/R)²/60².
for (const id of ["orion", "ring", "crab", "pillars", "vela-remnant"]) {
  const o = byId(id), c = calibrate(o), F = makeField(c.shape, c.seed), D = 60, N = 56, half = Math.atan(1.12 / D);
  let flux = 0;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const ax = -half + ((i + 0.5) * 2 * half) / N, ay = -half + ((j + 0.5) * 2 * half) / N, dir = [Math.tan(ax), Math.tan(ay), -1], l = Math.hypot(...dir), d = dir.map((v) => v / l);
    const eye = [0, 0, D], b = d[2] * D, disc = b * b - (D * D - 1.21); if (disc <= 0) continue;
    const t0 = -b - Math.sqrt(disc), t1 = -b + Math.sqrt(disc), S = 90, ds = (t1 - t0) / S; let T = [1, 1, 1], L = [0, 0, 0];
    for (let k = 0; k < S; k++) {
      const t = t0 + (k + 0.5) * ds, x = eye[0] + d[0] * t, y = eye[1] + d[1] * t, z = eye[2] + d[2] * t, den = F.density(x, y, z), f = F.hiFrac(c.zone, x, y, z, den), e = F.emit(x, y, z, den, f), cd = c.contShape ? F.contDensity(x, y, z) : e;
      const col = c.loC.map((v, q) => v + (c.hiC[q] - v) * f), tau = REDDEN.map((r) => c.kTau * den * ds * r);
      L = L.map((v, q) => v + (c.Kl * e * col[q] + c.Kc * cd * c.contC[q]) * ds * T[q] * Math.exp(-0.5 * tau[q])); T = T.map((v, q) => v * Math.exp(-tau[q]));
    }
    const dOmega = ((2 * half) / N) ** 2 / (1 + Math.tan(ax) ** 2 + Math.tan(ay) ** 2) ** 1.5 / Math.cos(ax) ** 2 / Math.cos(ay) ** 2;
    flux += lum(L) * dOmega;
  }
  const P = physicsOf(o), expect = fluxFromMag(intrinsicMag(P)) * ((o.d / o.radiusLy) / D) ** 2;
  check(`${o.name} : flux reçu = magnitude intégrée (caméra indépendante)`, Math.abs(flux / expect - 1) < 0.06, `rapport ${(flux / expect).toFixed(3)}, V − A_fg = ${intrinsicMag(P).toFixed(1)}`);
}
// 6 · Surface brightness of the model against literature orders of magnitude (mag/arcsec², V).
{ const sb = (id) => { const c = calibrate(byId(id)), F = makeField(c.shape, c.seed), v = [];
    let seed = 1; const rnd = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
    for (let i = 0; i < 300; i++) { const r = Math.sqrt(rnd()), a = 6.2831853 * rnd(); v.push(lum(column(c, F, r * Math.cos(a), r * Math.sin(a), 160).L)); }
    v.sort((a, b) => a - b); return { med: magPerArcsec2(v[150]), p95: magPerArcsec2(v[284]) }; };
  const ring = sb("ring"), orion = sb("orion"), helix = sb("helix"), vela = sb("vela-remnant");
  check("M 57 : anneau ≈ 17 mag/arcsec²", ring.p95 > 16 && ring.p95 < 18.5, `p95 ${ring.p95.toFixed(1)}`);
  check("M 42 : 18–21 mag/arcsec² hors du cœur", orion.med > 18.5 && orion.med < 21, `médiane ${orion.med.toFixed(1)}`);
  check("Hélice : faible, ≈ 22–23 mag/arcsec²", helix.med > 21.5 && helix.med < 24, `médiane ${helix.med.toFixed(1)}`);
  check("Vela : filaments très faibles, ≈ 24 mag/arcsec²", vela.med > 23 && vela.med < 25.5, `médiane ${vela.med.toFixed(1)}`); }
// 7 · Photometric scale shared with the point stars: the PSF sprite of stellar-light.js sums to 0.818 of its flux.
{ let worst = 0;
  for (const s of [2, 3, 4, 6]) {
    let sum = 0; const M = 400;
    for (let i = 0; i < M; i++) for (let j = 0; j < M; j++) {
      const u = (i + 0.5) / M, v = (j + 0.5) / M, r = Math.hypot(u - 0.5, v - 0.5) * 2; if (r > 1) continue;
      const t = Math.min(1, Math.max(0, (r - 0.7) / 0.3)), psf = Math.exp(-12 * r * r) * (1 - t * t * (3 - 2 * t));
      sum += psf / (s * s * 0.08) * (s * s) / (M * M);
    }
    worst = Math.max(worst, Math.abs(sum / 0.818 - 1));
  }
  check("Échelle commune : PSF des étoiles = 0,818 du flux", worst < 0.01, `écart ${(worst * 100).toFixed(2)} %`);
  check("Φ(m) = 0,818·10^1,2·(2/1024)²·10^(−0,4 m)", Math.abs(PHOT_ZERO - 0.818 * 10 ** 1.2 * (2 / 1024) ** 2) < 1e-15 && fluxFromMag(5) / fluxFromMag(0) === 10 ** -2);
  check("Pose longue : ×10 sur la lumière diffuse, œil : ×1", diffuseGain(1) === 10 && diffuseGain(0) === 1); }
// 8 · Magellanic Clouds: no periodic stripes any more.
check("Nuages de Magellan : plus de motif périodique en sin()", !/sin\(p\.y\*18\.\)|sin\(p\.x\*43\./.test(localGroupGLSL));
console.log(JSON.stringify({ passed: n }));
