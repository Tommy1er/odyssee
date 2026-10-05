// Merges public/stellar-physics.json (scripts/build-stellar-physics.py) into catalogue stars.
// Every value keeps its method and flags so the interface can say measured / literature / inferred / fallback.
export const METHOD_LABELS = {
  lit: "valeur de la littérature",
  cat: "valeur du catalogue",
  dwarf: "inférée : séquence des naines + magnitude",
  "dwarf-mean": "secours : rayon moyen des naines de ce type",
  color: "inférée : couleur B−V + correction bolométrique + magnitude",
  type: "inférée : classe spectrale + magnitude",
};
export const FLAG_LABELS = {
  far: "extinction ignorée au-delà de 1000 al",
  multiple: "système multiple non séparé",
  var: "étoile variable",
  coolbc: "correction bolométrique hors calibration",
  inconsistent: "données incohérentes, valeur de secours",
};
export function applyStellarPhysics(stars, table) {
  const rows = table?.stars || {};
  for (const o of stars) {
    const r = rows[o.id];
    if (!r) {
      if (o.type === "star" && !o.radiusSolar) o.stellar = { method: "none", label: "rayon inconnu : 1 R☉ par défaut pour la visualisation", flags: [] };
      continue;
    }
    const [T, R, L, method, flags, ref] = r;
    o.temperature = T;
    o.radiusSolar = R;
    o.lumSolar = L;
    const list = flags ? flags.split(",") : [];
    o.stellar = {
      method,
      ref: ref || table.meta?.methods?.[method] || "",
      flags: list,
      label: (METHOD_LABELS[method] || method) + (list.length ? " · " + list.map((f) => FLAG_LABELS[f] || f).join(" · ") : ""),
    };
  }
}
// Linear limb-darkening coefficient (V band), approximate trend with Teff from model atmospheres
// (cool stars darken more). Documented approximation: real coefficients also depend on log g and metallicity.
export function limbDarkening(T) {
  const pts = [[2500, 0.82], [3500, 0.78], [4500, 0.7], [5800, 0.6], [7500, 0.5], [10000, 0.42], [20000, 0.33], [40000, 0.28]];
  if (T <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++)
    if (T <= pts[i][0]) {
      const [t0, u0] = pts[i - 1], [t1, u1] = pts[i];
      return u0 + ((T - t0) / (t1 - t0)) * (u1 - u0);
    }
  return pts.at(-1)[1];
}
// Colour of a black body from the CIE-derived table shared with the sky shaders (512 texels, log T from 100 K to 1e6 K),
// chromaticity normalised to its brightest channel. Returns [r, g, b].
export function blackbodyRGB(lut, temp) {
  if (!lut || lut.length < 2048) return [1, 0.85, 0.65];
  const i = Math.max(0, Math.min(511, Math.round((Math.log(Math.max(100, temp) / 100) / Math.log(10000)) * 511))),
    m = Math.max(lut[4 * i], lut[4 * i + 1], lut[4 * i + 2]);
  return [lut[4 * i] / m, lut[4 * i + 1] / m, lut[4 * i + 2] / m];
}
