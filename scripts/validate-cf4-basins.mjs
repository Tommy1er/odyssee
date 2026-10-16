// Basins of attraction and reconstructed flow (CF4 2023 ungrouped) as built by scripts/build-cf4-basins.py: integrity of
// the assets, exact decoding of the published labels, axis conventions, published attractors and volumes, Local Group
// motion, meshes, streamlines and the cockpit lookups.
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import { BasinData, sgToEq, eqToSg, view, cockpitAttractorDirection } from "../src/cf4-basins.js";
import { MPC_MLY, SG_AXES } from "../src/extragalactic-data.js";

let n = 0;
const check = (label, ok, detail = "") => { assert.ok(ok, label + " · " + detail); n++; console.log("PASS " + label + (detail ? " · " + detail : "")); };
const meta = JSON.parse(fs.readFileSync(new URL("../public/cf4-basins-2023.json", import.meta.url)));
const raw = fs.readFileSync(new URL("../public/cf4-basins-2023.bin", import.meta.url)), buf = raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength);
const manifest = JSON.parse(fs.readFileSync(new URL("../data/reconstructions-cf4-2023/MANIFEST.json", import.meta.url)));
const d = new BasinData(meta, buf);

// 1 · Provenance and integrity.
check("Binaire = SHA-256 déclaré ; entrées = fichiers du manifeste", crypto.createHash("sha256").update(raw).digest("hex") === meta.binarySHA256 && manifest.files.every((f) => meta.inputSHA256[f.file] === f.gzip_sha256));
check("Nommée « reconstruction CF4 2023, non groupée », sources citées", /CF4 2023, non groupée/.test(meta.name) && meta.sources.some((s) => s.includes("202346802")) && meta.sources.some((s) => s.includes("2211.16390")));
// 2 · Labels decoded exactly (run-length encoding) = published counts.
{ const counts = new Array(10).fill(0); for (const v of d.labels) counts[v]++;
  const want = manifest.files.find((f) => /BoA/.test(f.file)).labels;
  check("Grille des bassins décodée : effectifs identiques au manifeste (10 étiquettes)", counts.every((c, k) => c === want[k]), counts.join(" / ")); }
// 3 · Conventions: published attractors in their basins, Milky Way in Laniakea.
const TABLE = { Laniakea: [-62, -8, 39], Apus: [-125, -23, -31], Hercule: [-39, 70, 78], Lepus: [-62, -39, -109], "Persée–Poissons": [47, -23, -31], Shapley: [-141, 62, -16] };
check("Les 6 attracteurs publiés (tableau A.1) tombent dans leur bassin", Object.entries(TABLE).every(([name, a]) => d.basinAt(sgToEq(a, d.h))?.name === name));
check("La Voie lactée est dans Laniakea", d.basinAt([0, 0, 0])?.name === "Laniakea");
{ const p = [123.4, -56.7, 89.1]; const back = sgToEq(eqToSg(p, d.h), d.h);
  check("Supergalactique ↔ équatorial : aller-retour exact, h = 0,746", Math.hypot(...back.map((x, k) => x - p[k])) < 1e-9 && d.h === 0.746);
  const ga = sgToEq(TABLE.Laniakea, d.h), r = Math.hypot(...ga);
  check("Attracteur de Laniakea à 73,7 Mpc/h = 322 millions d’al", Math.abs(r - Math.hypot(-62, -8, 39) / 0.746 * MPC_MLY) < 1e-9 && Math.abs(r - 322.3) < 0.5, r.toFixed(1)); }
// 4 · Volumes (published Table A.1, 10^6 (Mpc/h)^3) from the decoded grid.
{ const vol = (k) => d.labels.reduce((s, v) => s + (v === k), 0) * meta.labelCell ** 3 / 1e6, pub = { 1: 1.9, 2: 9.5, 3: 3.1, 4: 8.1, 5: 4.8, 6: 7.9 };
  check("Volumes des 6 bassins = tableau publié à 3 % près", Object.entries(pub).every(([k, v]) => Math.abs(vol(+k) / v - 1) < 0.03), Object.keys(pub).map((k) => vol(+k).toFixed(2)).join(", ")); }
// 5 · Reconstructed velocity: Local Group motion relative to the CMB (627 km/s toward l = 276.4°, b = 29.3°).
{ const l = 276.4 * Math.PI / 180, b = 29.3 * Math.PI / 180, gal = [Math.cos(b) * Math.cos(l), Math.cos(b) * Math.sin(l), Math.sin(b)];
  const EQ_GAL = [[-0.0548755604162154, -0.873437090234885, -0.483835015548713], [0.494109427875584, -0.444829629960011, 0.746982244497219], [-0.867666149019005, -0.198076373431201, 0.455983776175067]];
  const eq = [0, 1, 2].map((j) => gal.reduce((s, x, i) => s + x * EQ_GAL[i][j], 0)), v = d.velocityEqAt([0, 0, 0]), sp = Math.hypot(...v), cos = v.reduce((s, x, i) => s + x * eq[i], 0) / sp;
  check("Flux reconstruit à la Voie lactée orienté comme le dipôle du Groupe local (cos > 0,98)", cos > 0.98 && sp > 350 && sp < 700, `${sp.toFixed(0)} km/s, cos ${cos.toFixed(3)} (mesuré : 627 km/s)`); }
check("Conventions établies par les données (afflux, dipôle, densité linéaire), enregistrées", meta.validation.inflowBest > 1.2 * meta.validation.inflowSecond && meta.validation.centralVsLocalGroupDipoleCos > 0.98 && meta.validation.deltaVsLinearTheoryCorr > 0.99,
  `afflux ${meta.validation.inflowBest} vs ${meta.validation.inflowSecond} km/s, corrélation densité ${meta.validation.deltaVsLinearTheoryCorr}`);
check("Lignes de courant aboutissant dans leur bassin publié : ≥ 85 % pour 5 bassins (Apus documenté à part)", ["Laniakea", "Hercule", "Lepus", "Persée–Poissons", "Shapley"].every((k) => meta.validation.streamlineAgreement[k] >= 0.85), JSON.stringify(meta.validation.streamlineAgreement));
// 6 · Meshes: closed surfaces whose enclosed volume matches the label volume (display smoothing < 1 cell).
{ const b = meta.basins.find((x) => x.label === 1), q = view(buf, b.vertices), f = view(buf, b.faces); let V = 0;
  for (let i = 0; i < f.length; i += 3) { const [a, bb, c] = [f[i], f[i + 1], f[i + 2]].map((j) => [q[3 * j] / 16, q[3 * j + 1] / 16, q[3 * j + 2] / 16]);
    V += (a[0] * (bb[1] * c[2] - bb[2] * c[1]) - a[1] * (bb[0] * c[2] - bb[2] * c[0]) + a[2] * (bb[0] * c[1] - bb[1] * c[0])) / 6; }
  const vol = Math.abs(V) * meta.labelCell ** 3 / 1e6;
  check("Surface de Laniakea fermée : volume enclos = volume publié à 12 % près", Math.abs(vol / 1.9 - 1) < 0.12, `${vol.toFixed(2)} × 10⁶ (Mpc/h)³`);
  check("Bassins SDSS signalés comme coupés par le bord de la boîte", meta.basins.filter((x) => x.label >= 7).every((x) => x.truncatedByBox) && meta.basins.filter((x) => x.label <= 6).every((x) => !x.truncatedByBox)); }
// 7 · Streamlines converge: the distance to their own attractor decreases from start to end.
{ const L = meta.streamlines, M = view(buf, L.meta), P = view(buf, L.points), byLabel = Object.fromEntries(meta.basins.map((b) => [b.label, b.attractorMpch]));
  let k = 0, closer = 0, total = 0;
  for (let i = 0; i < L.count; i++) {
    const nPts = M[2 * i], lab = M[2 * i + 1], first = [P[3 * k], P[3 * k + 1], P[3 * k + 2]].map((x) => x / 10), last = [P[3 * (k + nPts - 1)], P[3 * (k + nPts - 1) + 1], P[3 * (k + nPts - 1) + 2]].map((x) => x / 10);
    if (lab >= 1 && lab <= 6) { const a = byLabel[lab]; total++; if (Math.hypot(...last.map((x, j) => x - a[j])) < Math.hypot(...first.map((x, j) => x - a[j]))) closer++; }
    k += nPts;
  }
  check("Lignes de courant : la grande majorité se rapprochent de l’attracteur de leur bassin", closer / total > 0.85, `${closer}/${total}`); }
// 8 · Cockpit lookups away from the box return nothing rather than an extrapolation.
check("Hors de la boîte : pas de bassin ni de vitesse extrapolés", d.basinAt([0, 0, 3000]) === null && d.velocityEqAt([0, 0, 3000]) === null);
// 9 · Cockpit attractor labels use exactly the published CF4 sinks, not the illustrative
// Great Attractor marker. Direction is relative to the moving observer and aberrated once.
check("Six CF4 attractor anchors are published and distinct from clipped SDSS regions",
  meta.basins.filter((b) => b.label <= 6).length === 6 &&
  meta.basins.filter((b) => b.label > 6).every((b) => b.truncatedByBox));
{
  const a = sgToEq(TABLE.Laniakea, d.h), z = [0, 0, 0], n = a.map((x) => x / Math.hypot(...a));
  const atSun = cockpitAttractorDirection(a, z, z);
  check("Attractor overlay: zero velocity gives geometric direction with no bias",
    atSun !== null && Math.hypot(...atSun.map((x, i) => x - n[i])) < 1e-12);
  const shifted = cockpitAttractorDirection(a, a.map((x) => x * 5e5), z);
  check("Attractor overlay: ship displacement is applied in millions of light years",
    shifted !== null && Math.hypot(...shifted.map((x, i) => x - n[i])) < 1e-12 &&
    cockpitAttractorDirection(a, a.map((x) => x * 1e6), z) === null);
}
{
  const u99 = 0.99 / Math.sqrt(1 - 0.99 ** 2);
  const side = cockpitAttractorDirection([0, 0, 100], [0, 0, 0], [u99, 0, 0]);
  const rest = cockpitAttractorDirection([0, 0, 100], [0, 0, 0], [0, 0, 0]);
  check("Attractor overlay: comoving 0.99 c aberration shifts a lateral sink forward",
    rest[0] === 0 && side[0] > 0.98 && side[2] > 0 &&
    Math.abs(Math.hypot(...side) - 1) < 1e-12);
}
console.log(JSON.stringify({ passed: n }));
