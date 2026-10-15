// Catalogued galaxies as cockpit destinations (UNGC 2013, McConnachie 2012, Cosmicflows-4 2023; files built by
// scripts/build-extragalactic.py). Each entry becomes an object at its nominal catalogue distance. Its 3D rendering is a
// CLASS model, never an image of the galaxy: class and size come from the catalogue when it gives them (UNGC Hubble
// T-type and diameter, McConnachie morphology), otherwise from what the distance method implies (Tully–Fisher needs a
// rotating disc ⇒ spiral; fundamental plane / surface-brightness fluctuations ⇒ early-type) and a typical size, both
// labelled as such. Orientation is always illustrative (seeded), constrained to i ≥ 45° for Tully–Fisher galaxies, which
// that method selects.
import { decodeCatalogue, MPC_MLY, CATALOGUES, normalizeName } from "./extragalactic-data.js";
import { hash } from "./body-data.js";

export const LY_PER_KPC = 3261.5638;
const MLY = 1e6;
// Rendering classes understood by local-group.js: 0 spiral/lenticular disc, 1 Magellanic irregular (bar), 2 irregular,
// 3 elliptical, 4 dwarf spheroidal. params = [bulge, arms, disc thickness, relative surface brightness].
const CLASSES = {
  E: { shape: 3, params: [1, 0, 0.7, 1], label: "elliptique", radiusKpc: 20 },
  S0: { shape: 0, params: [1.6, 0, 0.06, 0.9], label: "lenticulaire (S0)", radiusKpc: 12 },
  dE: { shape: 3, params: [0.5, 0, 0.75, 0.2], label: "elliptique naine", radiusKpc: 2 },
  dSph: { shape: 4, params: [1, 0, 0.8, 0.03], label: "sphéroïdale naine", radiusKpc: 1 },
  Sab: { shape: 0, params: [1.5, 1, 0.045, 1], label: "spirale à grand bulbe (Sa–Sb)", radiusKpc: 15 },
  Sbc: { shape: 0, params: [1, 1, 0.045, 1], label: "spirale (Sb–Sc)", radiusKpc: 15 },
  Scd: { shape: 0, params: [0.45, 1.1, 0.04, 0.9], label: "spirale à petit bulbe (Sc–Sd)", radiusKpc: 12 },
  Sm: { shape: 1, params: [0, 1, 0.06, 0.7], label: "irrégulière magellanique (Sm/Im)", radiusKpc: 4 },
  Ir: { shape: 2, params: [0, 1, 0.08, 0.5], label: "irrégulière", radiusKpc: 2 },
  unknown: { shape: 0, params: [1.2, 0.3, 0.12, 0.8], label: "classe inconnue (forme générique)", radiusKpc: 12 },
  // Local Volume entries of unknown morphology are dwarfs in practice (a 12 kpc generic disc made Canis Major, 7 kpc
  // away, a 60° glow): faint spheroid of 1 kpc.
  dwarfUnknown: { shape: 4, params: [1, 0, 0.8, 0.03], label: "naine de classe inconnue", radiusKpc: 1 },
};
// Hubble T-type (UNGC) → class.
export function classFromT(T, morph = "") {
  if (/Sph/.test(morph)) return "dSph";
  if (/^dE|dS0/.test(morph)) return "dE";
  if (T == null || !Number.isFinite(T)) return "unknown";
  if (T <= -4) return "E";
  if (T <= -3) return "dSph";
  if (T <= 0) return morph ? "dE" : "S0";
  if (T <= 2) return "Sab";
  if (T <= 5) return "Sbc";
  if (T <= 8) return "Scd";
  if (T <= 9) return "Sm";
  return "Ir";
}
// McConnachie 2012 morphology string → class.
export function classFromMorphology(m = "") {
  if (/^Sc|^Sd/.test(m)) return "Scd";
  if (/^Sb|^Sa/.test(m)) return "Sbc";
  if (/^cE|^E/.test(m)) return "dE";
  if (/dSph|dE/.test(m)) return /Irr/.test(m) ? "Ir" : "dSph";
  if (/Irr/.test(m)) return "Ir";
  return "unknown";
}
// Cosmicflows-4 distance methods → class (what the method requires of the galaxy).
export function classFromMethods(methods = []) {
  const early = methods.includes("Plan fondamental") || methods.includes("Fluctuations de brillance de surface");
  if (early && methods.includes("Tully–Fisher")) return { cls: "Sab", why: "à la fois un disque en rotation (Tully–Fisher) et une méthode de type précoce : spirale à grand bulbe ou lenticulaire" };
  if (early) return { cls: "E", why: "méthode du plan fondamental ou des fluctuations de brillance de surface, réservée aux galaxies de type précoce" };
  if (methods.includes("Tully–Fisher")) return { cls: "Sbc", why: "relation de Tully–Fisher, qui mesure la rotation d’un disque : galaxie spirale, inclinée d’au moins 45°" };
  if (methods.some((m) => ["Supernova II", "Céphéides", "Masers"].includes(m))) return { cls: "Sbc", why: "supernova à effondrement de cœur, céphéides ou masers : galaxie à formation d’étoiles (spirale probable)" };
  return { cls: "unknown", why: "méthode compatible avec tous les types (supernova Ia, branche des géantes rouges)" };
}
const unitVec = (ra, dec) => { const a = (ra * Math.PI) / 180, b = (dec * Math.PI) / 180; return [Math.cos(b) * Math.cos(a), Math.cos(b) * Math.sin(a), Math.sin(b)]; };
const sep = (u, v) => Math.acos(Math.min(1, u[0] * v[0] + u[1] * v[1] + u[2] * v[2])) * 180 / Math.PI;
// Same galaxy in two catalogues? Same usual name within 1°, or, without a common name, centres within 0.1° and distances
// within 45 % (diffuse dwarfs have centres and distances that differ between compilations: Sagittarius dSph 0.09°,
// 24 %; M32 is at 0.49 Mpc in UNGC, 0.79 Mpc in McConnachie). Only used ACROSS catalogues: entries of one catalogue are
// distinct by construction (in Virgo, distinct galaxies lie 0.1° apart). Satellites such as M32 or M110 remain distinct
// from M31: their names differ and their centres are > 0.1° away.
const dirOf = (o) => (o.ra != null ? unitVec(o.ra, o.dec) : o.xyz.map((x) => x / Math.hypot(...o.xyz)));
const distOf = (o) => o.d ?? Math.hypot(...o.xyz);
export const separation = (a, b) => sep(dirOf(a), dirOf(b));
const nameKey = (o) => normalizeName(o.name || "");
export function sameGalaxy(a, b) {
  const s = separation(a, b), da = distOf(a), db = distOf(b);
  if (nameKey(a) && nameKey(a) === nameKey(b) && s < 1) return true;
  return s < 0.1 && Math.abs(da - db) / Math.max(da, db) < 0.45;
}
// Best duplicate of o among candidates (smallest separation), or null.
export function findDuplicate(o, candidates) {
  let best = null, bs = Infinity;
  for (const k of candidates) if (sameGalaxy(k, o)) { const s = separation(k, o); if (s < bs) { bs = s; best = k; } }
  return best;
}
function orientation(id, tullyFisher) {
  let s = hash(id);
  const rnd = () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
  // Random orientations: cos i uniform; Tully–Fisher samples keep i ≥ 45°.
  const cosI = tullyFisher ? rnd() * Math.SQRT1_2 : rnd();
  return { inc: (Math.acos(cosI) * 180) / Math.PI, pa: rnd() * 180 };
}
// Usual spellings of catalogue names: MESSIER031 → M31, M 31 ; NGC0224 → NGC 224.
export function nameVariants(name) {
  const m = /^MESSIER0*(\d+)$/.exec(name);
  if (m) return ["M" + m[1], "M " + m[1], "Messier " + m[1]];
  const n = /^(NGC|UGC|IC|ESO|DDO|PGC|KK|KKH|UGCA)0*(\d.*)$/.exec(name);
  return n ? [n[1] + " " + n[2], n[1] + n[2]] : [];
}
// Name shown in the cockpit: "M81" rather than "MESSIER081", "NGC 253" rather than "NGC0253".
export const displayName = (name) => nameVariants(name)[0] || name;
// One cockpit object from a decoded catalogue row (extragalactic-data.js decodeCatalogue).
export function galaxyObject(row, extra = {}) {
  const key = row.key, r = row.raw, meta = CATALOGUES[key];
  let cls, clsWhy, radiusKpc, sizeWhy;
  if (key === "ungc") {
    cls = classFromT(r[6], r[5]); clsWhy = "type de Hubble T = " + (r[6] ?? "?") + (r[5] ? " (" + r[5] + ")" : "") + ", UNGC";
    radiusKpc = r[7] ? r[7] / 2 : null; sizeWhy = r[7] ? "diamètre UNGC " + String(r[7]).replace(".", ",") + " kpc (isophote de Holmberg)" : null;
  } else if (key === "mcconnachie") {
    cls = classFromMorphology(r[6]); clsWhy = "morphologie « " + (r[6] || "?") + " », McConnachie 2012";
  } else {
    const m = classFromMethods(row.methods); cls = m.cls; clsWhy = "déduite de la méthode de distance : " + m.why;
  }
  if (extra.ungc) { cls = extra.ungc.cls; clsWhy = extra.ungc.clsWhy + " (même galaxie dans UNGC)"; radiusKpc = extra.ungc.radiusKpc; sizeWhy = extra.ungc.sizeWhy; }
  if (cls === "unknown" && row.d < 10) { cls = "dwarfUnknown"; clsWhy += " ; dans le Volume local, traitée comme une naine"; }
  if (/^canis major$/i.test(row.name)) clsWhy += ". Nature discutée : galaxie naine ou surdensité du disque galactique ; invisible à l’œil";
  const C = CLASSES[cls];
  if (!radiusKpc) { radiusKpc = C.radiusKpc; sizeWhy = "taille typique supposée pour une galaxie " + C.label + " (non mesurée dans ce catalogue)"; }
  const id = key === "cf4" ? "cf4:" + r[0] : key + ":" + r[0], tf = key === "cf4" && (row.methods || []).includes("Tully–Fisher");
  const d = row.d * MLY, u = unitVec(row.ra, row.dec), { inc, pa } = orientation(id, tf);
  const o = {
    id, name: displayName(row.name), type: "galaxy", catalogue: key, catalogueRow: row, xyz: u.map((x) => x * d), d, ra: row.ra, dec: row.dec,
    radiusLy: radiusKpc * LY_PER_KPC, inc, pa, galaxyClass: cls, shapeCode: C.shape, shapeParams: C.params,
    kind: "Galaxie " + C.label + " · " + meta.name, classSource: clsWhy, sizeSource: sizeWhy,
    aliases: [row.name, key === "ungc" || key === "mcconnachie" ? r[8] || "" : "PGC" + r[0], ...nameVariants(row.name)].filter(Boolean), planets: [],
    motion: [0, 0, 0], motionStatus: "Position nominale du catalogue ; pas de mouvement propre, de vitesse particulière ni d’expansion appliqués",
    note: "Entrée de catalogue placée à sa distance nominale. La forme 3D est un modèle de classe (" + C.label + "), pas une image de cette galaxie ; orientation illustrative.",
    links: [["Catalogue · CDS/VizieR", meta.url], ["SIMBAD", "https://simbad.cds.unistra.fr/simbad/sim-id?Ident=" + encodeURIComponent(key === "cf4" ? "PGC " + r[0] : r[8] || r[0])]],
  };
  o.baseXYZ = [...o.xyz];
  return o;
}
// Local catalogues (UNGC preferred, then McConnachie), without duplicates of each other or of existing galaxies
// (M31, M33, the Magellanic Clouds keep their richer existing model). Returns { list, alias: catalogueId → existing id }.
export function buildLocalGalaxies(payloads, existing = []) {
  const list = [], alias = new Map(), kept = [...existing.filter((o) => o.type === "galaxy")];
  for (const key of ["ungc", "mcconnachie"]) {
    if (!payloads[key]) continue;
    for (const row of decodeCatalogue(key, payloads[key])) {
      const o = galaxyObject(row);
      // The Milky Way itself (UNGC "Milky Way", McConnachie "The Galaxy"): we are inside it; the cockpit has its own model.
      if (/^(milky way|the galaxy|galaxy)$/i.test(row.name)) { alias.set(o.id, "sgr-a"); continue; }
      const dup = findDuplicate(o, kept.filter((k) => k.catalogue !== key));
      if (dup) { alias.set(o.id, dup.id); continue; }
      kept.push(o); list.push(o);
    }
  }
  return { list, alias };
}
// UNGC counterpart of a CF4 row (nearby galaxies), to reuse its measured type and size.
export function ungcCounterpart(row, ungcObjects) {
  const o = { ra: row.ra, dec: row.dec, d: row.d * MLY, radiusLy: 0 };
  const m = findDuplicate(o, ungcObjects.filter((u) => u.catalogue === "ungc"));
  return m ? { cls: m.galaxyClass, clsWhy: m.classSource.replace(", UNGC", ""), radiusKpc: m.radiusLy / LY_PER_KPC, sizeWhy: m.sizeSource, id: m.id } : null;
}
// Cosmicflows-4: decoded once, on demand (3.9 MB).
let cf4Promise = null;
export function loadCF4(fetcher = fetch) {
  if (!cf4Promise) cf4Promise = fetcher("./" + CATALOGUES.cf4.file).then((r) => { if (!r.ok) throw Error("Cosmicflows-4 indisponible"); return r.json(); }).then((p) => decodeCatalogue("cf4", p)).catch((e) => { cf4Promise = null; throw e; });
  return cf4Promise;
}
export const cf4Id = (q) => { const m = normalizeName(q).match(/^(?:cf4)?pgc(\d+)$/) || String(q).match(/^cf4:(\d+)$/); return m ? Number(m[1]) : null; };
// Up to n catalogued galaxies nearest to the ship (positions in ly), for rendering slots.
export function nearestRows(rows, pos, n, maxLy) {
  const best = [];
  for (const row of rows) {
    const p = row.p, dx = p[0] * MLY - pos[0], dy = p[1] * MLY - pos[1], dz = p[2] * MLY - pos[2], d2 = dx * dx + dy * dy + dz * dz;
    if (d2 > maxLy * maxLy) continue;
    if (best.length < n || d2 < best[best.length - 1][0]) { best.push([d2, row]); best.sort((a, b) => a[0] - b[0]); if (best.length > n) best.pop(); }
  }
  return best.map((b) => b[1]);
}
export { MPC_MLY };
