// Star clusters drawn as stars, on the photometric scale of the catalogue stars (stellar-light.js), instead of uniform
// particle clouds. Each cluster is a SYNTHETIC population (the individual stars are not identified), constrained by the
// published values of its catalogue:
// - open clusters (Cantat-Gaudin et al. 2020, Gaia DR2): number of members brighter than G = 18, half-member radius r50,
//   age (AgeNN), extinction (AVNN) and distance modulus;
// - globular clusters (Harris 1996, 2010 ed.): integrated apparent V magnitude; age 12 Gyr assumed (old population);
//   extinction from the Milky Way dust model of galaxy.js (not the Harris reddening, absent from our export);
// - the three massive clusters of the galactic centre region and the Pleiades: literature values listed in SPECIAL.
// Population model: Kroupa (2001) IMF from 0.08 M☉, main sequence from a mass–M_V–T_eff table (dwarfs, after Pecaut &
// Mamajek 2013, rounded), stars between the turnoff mass and +10 % placed on a schematic giant branch, red clump/horizontal
// branch or supergiant phase. Stars brighter than V = 7 seen from the Sun are left out: the HYG catalogue already draws
// them at their measured positions. Above the drawing budget, the faintest stars are merged into weighted points that
// carry their summed light (exact total light, approximate appearance from inside the cluster).
import { milkyWayDust, SUN_GC, galactocentric } from "./galaxy.js";

export const MS = [ // mass (M☉), M_V, T_eff (K)
  [0.08, 18.5, 2600], [0.1, 16.0, 2900], [0.2, 12.4, 3200], [0.4, 10.0, 3550], [0.5, 9.0, 3800], [0.6, 8.2, 4050],
  [0.7, 7.0, 4600], [0.8, 6.0, 5100], [0.9, 5.5, 5400], [1.0, 4.8, 5770], [1.2, 3.9, 6250], [1.5, 3.0, 6900],
  [2.0, 2.0, 8100], [2.5, 1.0, 9700], [3.0, 0.5, 10500], [4.0, -0.6, 14000], [5.0, -1.1, 15700], [7.0, -1.8, 18000],
  [10, -2.5, 21000], [15, -3.4, 27000], [20, -3.9, 32000], [40, -5.0, 42000], [80, -5.8, 46000],
];
function interp(m, k) {
  if (m <= MS[0][0]) return MS[0][k];
  for (let i = 1; i < MS.length; i++) if (m <= MS[i][0]) { const a = MS[i - 1], b = MS[i], f = Math.log(m / a[0]) / Math.log(b[0] / a[0]); return a[k] + f * (b[k] - a[k]); }
  return MS.at(-1)[k];
}
export const msMV = (m) => interp(m, 1), msTeff = (m) => interp(m, 2);
// Main-sequence lifetime, log t = 9.921 − 3.6648 x + 1.9697 x² − 0.9369 x³ (x = log M/M☉; solar metallicity fit used
// in population synthesis, valid ≈ 0.6–100 M☉), inverted by bisection → turnoff mass. Old globular clusters: 0.82 M☉.
export const logLifetime = (m) => { const x = Math.log10(m); return 9.921 - 3.6648 * x + 1.9697 * x * x - 0.9369 * x ** 3; };
export function turnoffMass(logAge) { let lo = 0.6, hi = 100; if (logLifetime(hi) > logAge) return hi; if (logLifetime(lo) < logAge) return lo; for (let k = 0; k < 50; k++) { const m = Math.sqrt(lo * hi); if (logLifetime(m) > logAge) lo = m; else hi = m; } return Math.sqrt(lo * hi); }
// Kroupa IMF, inverse CDF on [0.08, mMax]: dN/dm ∝ m^−1.3 below 0.5 M☉, m^−2.3 above.
export function kroupa(u, mMax = 120) {
  const seg = (a, lo, hi) => (hi ** (1 - a) - lo ** (1 - a)) / (1 - a), c2 = 0.5; // continuity factor m^-1.3 = c m^-2.3 at 0.5
  const n1 = seg(1.3, 0.08, Math.min(0.5, mMax)), n2 = mMax > 0.5 ? c2 * seg(2.3, 0.5, mMax) : 0, x = u * (n1 + n2);
  if (x < n1) return (0.08 ** -0.3 - 0.3 * x) ** (-1 / 0.3);
  return (0.5 ** -1.3 - 1.3 * (x - n1) / c2) ** (-1 / 1.3);
}
export function rng(seed) { return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return (seed + 0.5) / 4294967296; }; }
// One star of a population of turnoff mass mTO: [M_V, T_eff] (null for remnants, too faint to matter).
export function sampleStar(r, mTO, oldMetalPoor = false) {
  const m = kroupa(r());
  if (m <= mTO) return [msMV(m), msTeff(m)];
  if (m > mTO * 1.1) return null; // white dwarfs, neutron stars, black holes
  const phase = r();
  if (mTO > 8) return phase < 0.5 ? [-4.5 - 2.5 * r(), 3600 + 400 * r()] : [-4.5 - 2.5 * r(), 12000 + 14000 * r()]; // red / blue supergiants
  if (phase < 0.3) { // red clump (blue horizontal branch in old metal-poor clusters)
    const M = 0.6 - 2.5 * Math.log10(Math.max(1, mTO / 1.5)) + 0.3 * (r() - 0.5);
    return oldMetalPoor ? [0.5 + 0.3 * (r() - 0.5), 6000 + 4000 * r()] : [M, 4800 + 300 * r()];
  }
  // Giant branch: p(M_V) ∝ 10^(0.3 M_V) between the tip and the base of the branch.
  const tip = mTO > 2.2 ? -3.5 : -2.8, base = Math.min(msMV(mTO) - 0.3, 3.3), k = 0.3 * Math.LN10, u = r();
  const M = Math.log(Math.exp(k * tip) + u * (Math.exp(k * base) - Math.exp(k * tip))) / k;
  return [M, 3900 + 1100 * (M - tip) / (base - tip)];
}
export const SPECIAL = {
  pleiades: { logAge: 8.1, av: 0.12, source: "âge ≈ 125 Myr (Stauffer et al. 1998), A_V ≈ 0,12" },
  westerlund1: { logAge: 6.6, av: 11.4, source: "âge ≈ 4 Myr, A_V ≈ 11 (Clark et al. 2005 ; Damineli et al. 2016), effectif total ≈ 10⁵ étoiles (ordre de grandeur)" },
  arches: { logAge: 6.4, av: 30, source: "âge ≈ 2,5 Myr, A_V ≈ 30 (Figer et al. 2002), effectif total ≈ 10⁵ (ordre de grandeur)" },
  quintuplet: { logAge: 6.6, av: 30, source: "âge ≈ 4 Myr, A_V ≈ 30 (Figer et al. 1999), effectif total ≈ 10⁵ (ordre de grandeur)" },
};
// Extinction A_V from the Sun to a position (ly), Milky Way dust model of galaxy.js (τ_V ×1.086).
export function modelAV(xyz) {
  const a = SUN_GC, b = galactocentric(xyz).map((x) => x / 1000), n = 400; let tau = 0;
  const l = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
  for (let i = 0; i < n; i++) { const f = (i + 0.5) / n; tau += milkyWayDust([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]); }
  return 1.086 * tau * l / n;
}
const HYG_LIMIT = 7;
// Population of cluster o (catalogue object), at most `budget` points. Returns offsets (ly, around the centre), absolute
// magnitudes (V, already including the weight of merged points), temperatures, extinction from the Sun, and a summary.
export function clusterPopulation(o, budget = 6000) {
  const special = SPECIAL[o.id] || {}, globular = o.clusterModel === "globular", massive = o.clusterModel === "massive";
  const logAge = special.logAge ?? o.logAge ?? (globular ? 10.08 : 8.5), mTO = globular ? 0.82 : turnoffMass(logAge);
  const av = special.av ?? o.av ?? (globular ? modelAV(o.xyz) : 0), dm = 5 * Math.log10(o.d / 3.26156) - 5;
  const r = rng(o.id.split("").reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261) >>> 0);
  // Monte Carlo description of the population (per star).
  const S = globular || massive ? 200000 : 40000, mc = [];
  for (let i = 0; i < S; i++) { const s = sampleStar(r, mTO, globular && (o.feh ?? -1.5) < -1); if (s) mc.push(s); }
  const per = mc.length / S, lum = (M) => 10 ** (-0.4 * (M - 4.83));
  // Total number of stars N (all masses ≥ 0.08 M☉, remnants excluded).
  let N, normal;
  if (!globular && !massive && o.members && o.source === "vizier-gaia-clusters") { const f = mc.filter((s) => s[0] + dm + av < 18).length / mc.length; N = o.members / Math.max(f, 1e-6); normal = `${o.members} membres G < 18 publiés`; }
  else if (massive) { N = (o.members || 1e5) * per; normal = "effectif total supposé"; }
  else { const meanL = mc.reduce((s, x) => s + lum(x[0]), 0) / mc.length, Mtot = (o.mag ?? 10) - dm - av; N = lum(Mtot) / meanL; normal = `magnitude intégrée V = ${o.mag}`; }
  // Keep stars fainter than the HYG limit (seen from the Sun); split brightest individuals / merged faint remainder.
  const kept = mc.filter((s) => s[0] + dm + av > HYG_LIMIT).sort((a, b) => a[0] - b[0]), scale = N / mc.length, total = kept.length * scale;
  const out = { offsets: [], absMag: [], temp: [], av, logAge, mTO, N: Math.round(N), drawn: 0, merged: 0, normal, special: special.source || null };
  const halfR = o.halfRadiusLy || (o.radiusLy || 10) / 3, a = halfR / 1.305, rMax = o.radiusLy || 3 * halfR;
  const place = () => { let rad; do { rad = a / Math.sqrt(r() ** (-2 / 3) - 1); } while (rad > rMax); const z = 2 * r() - 1, ph = 2 * Math.PI * r(), s = Math.sqrt(1 - z * z); return [rad * s * Math.cos(ph), rad * s * Math.sin(ph), rad * z]; };
  const push = (M, T) => { out.offsets.push(...place()); out.absMag.push(M); out.temp.push(T); };
  if (total <= budget) { // every star drawn individually (resampled from the Monte Carlo set)
    const n = Math.round(total); for (let i = 0; i < n; i++) { const s = kept[Math.floor(r() * kept.length)]; push(s[0], s[1]); } out.drawn = n;
  } else {
    const nBright = Math.floor(budget * 0.8), nMerged = budget - nBright, cut = Math.min(kept.length - 1, Math.floor(nBright / scale));
    // Brightest individuals: the stars brighter than kept[cut], drawn with replacement from that part of the sample.
    for (let i = 0; i < nBright; i++) { const s = kept[Math.floor(r() * (cut + 1))]; push(s[0], s[1]); }
    const rest = kept.slice(cut + 1); let L = 0, LT = 0; for (const s of rest) { L += lum(s[0]); LT += lum(s[0]) * s[1]; }
    const Lpoint = (L * scale) / nMerged, Tm = LT / Math.max(L, 1e-30);
    // Scale the individuals to their true number ((cut+1)·scale stars, nBright points).
    const kBright = ((cut + 1) * scale) / nBright; for (let i = 0; i < nBright; i++) out.absMag[i] -= 2.5 * Math.log10(kBright);
    for (let i = 0; i < nMerged; i++) push(4.83 - 2.5 * Math.log10(Lpoint), Tm);
    out.drawn = nBright; out.merged = nMerged;
  }
  // Integrated absolute magnitude of what is drawn (for tests and the information panel).
  out.MV = 4.83 - 2.5 * Math.log10(out.absMag.reduce((s, M) => s + lum(M), 0) || 1e-30);
  return out;
}
