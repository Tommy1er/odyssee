"""Stellar physical parameters with explicit provenance -> public/stellar-physics.json.

Order of precedence for each catalogue star:
  lit    documented literature value (curated list below, reference given);
  cat    value already in the catalogue (NASA Exoplanet Archive host parameters, or editorial entry);
  dwarf  main-sequence star: Teff and BC_V from Mamajek's mean dwarf sequence (2022.04.16; Pecaut & Mamajek 2013),
         L from M_V + BC_V, R from Stefan-Boltzmann;
  color  other stars with B-V: Teff from Ballesteros (2012, EPL 97, 34009), BC_V from Flower (1996) as corrected
         by Torres (2010, AJ 140, 1158), L and R as above;
  type   spectral class only: Teff from the dwarf sequence for that class, flagged approximate;
  none   not enough data: the renderer keeps its visual fallback and says so.
Interstellar extinction is ignored (flag 'far' beyond 1000 ly). Combined magnitudes of multiple systems overestimate
the radius of the primary (flag 'multiple'). Variables are flagged ('var'). M_bol,sun = 4.74, Teff,sun = 5772 K.
"""
import csv, gzip, json, math, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MBOL_SUN, TSUN = 4.74, 5772.0

LITERATURE = {
    # catalogue name: (R/Rsun, Teff K, reference, note)
    "Soleil": (1.0, 5772, "IAU 2015 B3 (valeurs nominales)", ""),
    "Betelgeuse": (764, 3600, "Joyce et al. 2020, ApJ 902, 63 (R = 764 +116/−62 R☉) ; Levesque & Massey 2020 (Teff)", "supergéante variable, rayon incertain"),
    "Rigel": (78.9, 12100, "Moravveji et al. 2012, ApJ 747, 108", ""),
    "Antares": (680, 3660, "Ohnaka et al. 2013, A&A (interférométrie)", "supergéante variable ; compagnon Antares B non séparé"),
    "Sirius": (1.711, 9940, "Davis et al. 2011 (interférométrie) ; Adelman 2004 (Teff)", "Sirius A seule ; Sirius B (naine blanche) non séparée"),
    "Vega": (2.5, 9600, "Yoon et al. 2010, ApJ 708, 71 (R pôle 2,36, équateur 2,82 R☉)", "étoile aplatie vue par le pôle ; rayon moyen"),
    "Arcturus": (25.4, 4286, "Ramírez & Allende Prieto 2011, ApJ 743, 135", ""),
    "Aldebaran": (44.0, 3900, "Richichi & Roccatagliata 2005, A&A (interférométrie)", ""),
    "Deneb": (203, 8525, "Schiller & Przybilla 2008, A&A 479, 849", "distance incertaine"),
    "Canopus": (71.0, 7350, "Domiciano de Souza et al. 2008, A&A (interférométrie)", ""),
    "Procyon": (2.05, 6530, "Kervella et al. 2004, A&A 413, 251", "Procyon A seule"),
    "Altair": (1.8, 7550, "Monnier et al. 2007, Science 317, 342 (R moyen, étoile aplatie)", "rotation rapide, assombrissement gravitationnel non modélisé"),
    "Capella": (11.98, 4970, "Torres et al. 2015, ApJ 807, 26 (composante Aa)", "système Aa+Ab non résolu dans cette version : rendu de la composante Aa ; type spectral du catalogue HYG erroné"),
    "Proxima Centauri": (0.1542, 3042, "Kervella et al. 2017, A&A 598, L7 ; Ségransan et al. 2003 (Teff)", ""),
    "Alpha Centauri A + B": (1.2234, 5790, "Kervella et al. 2017, A&A 597, A137 (composante A)", "système A+B non résolu dans cette version : rendu de la composante A"),
}

def mamajek():
    rows = []
    for line in (ROOT / "data/references-2026-10-04/mamajek-dwarfs.txt").read_text().splitlines():
        if line.startswith("#") or not line.strip():
            continue
        f = line.split()
        m = re.match(r"^([OBAFGKM])(\d+(?:\.\d+)?)V$", f[0])
        if not m:
            continue
        try:
            rows.append({"cls": m.group(1), "sub": float(m.group(2)), "T": float(f[1]), "BC": float(f[3]), "R": float(f[6]), "MV": float(f[7])})
        except ValueError:
            pass
    return rows

ORDER = "OBAFGKM"
def spt_value(cls, sub):
    return ORDER.index(cls) * 10 + sub

def interp_dwarf(rows, cls, sub):
    x = spt_value(cls, sub)
    pts = sorted((spt_value(r["cls"], r["sub"]), r) for r in rows)
    lo = max((p for p in pts if p[0] <= x), default=pts[0], key=lambda p: p[0])
    hi = min((p for p in pts if p[0] >= x), default=pts[-1], key=lambda p: p[0])
    if hi[0] == lo[0]:
        return dict(lo[1])
    w = (x - lo[0]) / (hi[0] - lo[0])
    return {k: lo[1][k] + w * (hi[1][k] - lo[1][k]) for k in ("T", "BC", "R", "MV")}

def bc_torres(T):
    lt = math.log10(T)
    if lt < 3.70:
        c = [-0.190537291496456e5, 0.155144866764412e5, -0.421278819301717e4, 0.381476328422343e3]
    elif lt < 3.90:
        c = [-0.370510203809015e5, 0.385672629965804e5, -0.150651486316025e5, 0.261724637119416e4, -0.170623810323864e3]
    else:
        c = [-0.118115450538963e6, 0.137145973583929e6, -0.636233812100225e5, 0.147412923562646e5,
             -0.170587278406872e4, 0.788731721804990e2]
    return sum(ci * lt ** i for i, ci in enumerate(c))

def t_ballesteros(bv):
    return 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62))

SPT = re.compile(r"^(?:sd|esd|d)?([OBAFGKM])(\d+(?:\.\d+)?)?\s*([IV]+(?:a|b|ab)?)?")
def parse_spt(s):
    m = SPT.match((s or "").strip())
    if not m:
        return None
    lum = m.group(3) or ""
    return m.group(1), float(m.group(2)) if m.group(2) else 5.0, lum

def main():
    cat = json.loads((ROOT / "public/catalogue.json").read_text())
    rows = mamajek()
    hyg = {}
    with gzip.open(ROOT / "data/hyg-v41.csv.gz", "rt") as fh:
        for r in csv.DictReader(fh):
            hyg["h" + r["id"]] = r
    out, counts = {}, {}
    for o in cat["stars"]:
        if o.get("type") != "star":
            continue
        h = hyg.get(o["id"], {})
        flags = []
        d_ly = o.get("d") or 0
        if d_ly > 1000:
            flags.append("far")
        if (h.get("comp") and h.get("comp") not in ("", "1")) or (h.get("base") or "") or "+" in o.get("name", ""):
            flags.append("multiple")
        if h.get("var"):
            flags.append("var")
        spt = parse_spt(o.get("spect"))
        mag = o.get("mag")
        MV = mag - 5 * math.log10(max(d_ly / 3.26156, 1e-6)) + 5 if (mag is not None and d_ly > 0) else None
        if o["id"] == "h0":
            MV = 4.81
        rec = None
        lit = LITERATURE.get(o.get("name"))
        if lit:
            R, T, ref, note = lit
            rec = ("lit", T, R, ref + (" · " + note if note else ""))
        elif o.get("radiusSolar") and o.get("temperature"):
            rec = ("cat", float(o["temperature"]), float(o["radiusSolar"]), "valeur du catalogue (NASA Exoplanet Archive ou fiche éditoriale)")
        elif spt and spt[2].startswith("D"):
            rec = None
        elif spt and MV is not None:
            cls, sub, lum = spt
            dwarf_ref = interp_dwarf(rows, cls, sub)
            is_dwarf = lum in ("V", "IV-V") or (lum == "" and abs(MV - dwarf_ref["MV"]) < 1.5)
            R = None
            if is_dwarf:
                T, BC, code, ref = dwarf_ref["T"], dwarf_ref["BC"], "dwarf", "séquence des naines de Mamajek (Pecaut & Mamajek 2013) + M_V du catalogue"
                if abs(MV - dwarf_ref["MV"]) > 3:
                    # Declared dwarf but magnitude/distance inconsistent with the class: use the mean-sequence radius.
                    R, code, ref = dwarf_ref["R"], "dwarf-mean", "rayon moyen de la séquence des naines (M_V du catalogue incohérente avec le type)"
                    flags.append("inconsistent")
            elif cls in "OBA":
                # B−V saturates for hot stars: the spectral class constrains Teff far better (dwarf scale, giants ~10–20 % cooler).
                T = dwarf_ref["T"]
                BC = bc_torres(T)
                code, ref = "type", "Teff d’après la classe spectrale (échelle des naines ; géantes chaudes un peu plus froides) + BC (Torres 2010) + M_V"
            elif h.get("ci") not in (None, "") and -0.4 < float(h["ci"]) < 2.2:
                T = t_ballesteros(float(h["ci"]))
                if cls == "M" and T > 4300:
                    # Colour inconsistent with an M star (blend, variability or reddening): fall back to the class.
                    T = 3500.0
                    flags.append("inconsistent")
                BC = bc_torres(T) if T >= 3500 else dwarf_ref["BC"]
                code, ref = "color", "Teff de B−V (Ballesteros 2012) + BC (Flower 1996 / Torres 2010) + M_V du catalogue"
                if T < 3500:
                    flags.append("coolbc")
            else:
                T, BC, code, ref = dwarf_ref["T"], bc_torres(dwarf_ref["T"]) if dwarf_ref["T"] >= 3500 else dwarf_ref["BC"], "type", "Teff approchée d’après la seule classe spectrale"
            if R is None:
                L = 10 ** (0.4 * (MBOL_SUN - (MV + BC)))
                R = math.sqrt(L) * (TSUN / T) ** 2
            rec = (code, T, R, ref)
        if rec is None:
            counts["none"] = counts.get("none", 0) + 1
            continue
        code, T, R, ref = rec
        L = R * R * (T / TSUN) ** 4
        counts[code] = counts.get(code, 0) + 1
        out[o["id"]] = [round(T), float(f"{R:.4g}"), float(f"{L:.4g}"), code, ",".join(flags)] + ([ref] if code in ("lit", "cat") else [])
    refs = {
        "dwarf": "séquence des naines de Mamajek 2022.04.16 (Pecaut & Mamajek 2013, ApJS 208, 9) + M_V du catalogue",
        "color": "Teff de B−V (Ballesteros 2012, EPL 97, 34009) + BC_V (Flower 1996 corrigé par Torres 2010, AJ 140, 1158) + M_V",
        "dwarf-mean": "rayon moyen de la séquence des naines (magnitude du catalogue incohérente avec le type)",
        "type": "Teff approchée d’après la seule classe spectrale (séquence des naines) : ordre de grandeur",
    }
    meta = {
        "generated_by": "scripts/build-stellar-physics.py",
        "columns": ["Teff_K", "R_Rsun", "L_Lsun", "method", "flags", "reference(lit/cat)"],
        "methods": refs,
        "flags": {"far": "au-delà de 1000 al : extinction interstellaire ignorée, L et R sous-estimés",
                  "multiple": "système multiple : magnitude combinée, rayon de la primaire surestimé",
                  "var": "étoile variable : valeur moyenne", "coolbc": "Teff < 3500 K : correction bolométrique hors calibration",
                  "inconsistent": "données incohérentes entre type, couleur et magnitude : valeur de secours"},
        "constants": {"Mbol_sun": MBOL_SUN, "Teff_sun": TSUN},
        "counts": counts,
    }
    path = ROOT / "public/stellar-physics.json"
    path.write_text(json.dumps({"meta": meta, "stars": out}, ensure_ascii=False, separators=(",", ":")))
    print(json.dumps(counts), path.stat().st_size, "bytes")

if __name__ == "__main__":
    main()
