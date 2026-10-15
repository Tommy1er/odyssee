"""Photometric galaxy list for the cockpit sky (public/galaxy-photometry.json + .bin).

Inputs (data/references-2026-10-04, unchanged): 2MRS (Huchra et al. 2012, 44 599 galaxies, K_s total magnitudes,
isophotal radius, axis ratio, morphological type, heliocentric cz), Cosmicflows-4 (Tully et al. 2023, distances),
UNGC (Karachentsev et al. 2013: B magnitude, inclination, Holmberg diameter, distance, HRV) and McConnachie (2012:
V magnitude, half-light radius, position angle, ellipticity, distance, HRV).

One row per galaxy, deduplicated across catalogues. Each value carries its provenance in the flag bits:
- distance: McConnachie, UNGC or CF4 (measured distance indicators) else Hubble distance cz_CMB / H0 (model, H0 = 74.6);
- V magnitude (apparent, as seen from the Sun), in this order of preference: McConnachie V; UNGC B − (B−V) by Hubble
  type; 2MRS K_t + (V−K) by type
  plus the foreground extinction 3.1 E(B−V) (K_t is extinction-corrected); CF4 rows without photometry are left without
  magnitude (not drawn as light);
- size: McConnachie 2 × r_h; UNGC A26 / 2; 2MRS 1.7 × R_iso(K20) (K isophotes are smaller than optical ones);
- shape: axis ratio (2MRS b/a, UNGC inclination, McConnachie 1 − ellipticity); position angle only from McConnachie.
Colour indices by type are typical values (Fukugita et al. 1995; Jarrett et al. 2003), not measurements of each galaxy.
"""
import gzip, json, math, hashlib
from pathlib import Path
import numpy as np
from scipy.spatial import cKDTree

root = Path(__file__).resolve().parents[1]
REF = root / 'data/references-2026-10-04'
H0 = 74.6
MPC_LY = 3.2615638e6
C = 299792.458
# Solar motion relative to the CMB (Planck 2018): 369.82 km/s toward l = 264.021°, b = 48.253°.
EQ_GAL = np.array([[-.0548755604162154, -.873437090234885, -.483835015548713], [.494109427875584, -.444829629960011, .746982244497219], [-.867666149019005, -.198076373431201, .455983776175067]])
l, b = math.radians(264.021), math.radians(48.253)
SUN_CMB = 369.82 * (EQ_GAL.T @ np.array([math.cos(b) * math.cos(l), math.cos(b) * math.sin(l), math.sin(b)]))


def rows(name):
    lines = [s for s in gzip.open(REF / name, 'rt') if s.strip() and not s.startswith('#')]
    head = lines[0].rstrip('\n').split('\t')
    return [dict(zip(head, [v.strip() for v in s.rstrip('\n').split('\t')])) for s in lines[3:]]


def num(x):
    try:
        return float(x)
    except (TypeError, ValueError):
        return None


def sex(s, ra):
    v = [float(t) for t in s.split()]
    a = abs(v[0]) + v[1] / 60 + v[2] / 3600
    return a * 15 if ra else (-a if s.strip().startswith('-') else a)


def unit(ra, dec):
    a, d = math.radians(ra), math.radians(dec)
    return np.array([math.cos(d) * math.cos(a), math.cos(d) * math.sin(a), math.sin(d)])


# (B−V, V−K) typical by Hubble type T.
def colours(T):
    if T is None:
        return 0.75, 2.9
    if T <= -3: return 0.95, 3.25
    if T <= 0: return 0.90, 3.15
    if T <= 2: return 0.80, 3.0
    if T <= 4: return 0.70, 2.85
    if T <= 6: return 0.55, 2.6
    return 0.45, 2.2


def mrs_type(code):
    c = code.strip()
    if not c or c.startswith('98') or c.startswith('99'): return None
    s = c[:2] if c[0] == '-' else c[:2] if c[:2] in ('10', '11', '15', '19', '20') else c[0]
    try:
        T = int(s)
    except ValueError:
        return None
    return T if -6 <= T <= 11 else None


DIST = {'mcconnachie': 1, 'ungc': 2, 'cf4': 3, 'hubble': 4}
VSRC = {'none': 0, 'mcconnachie-V': 1, 'ungc-B': 2, '2mrs-K': 3}
out = []

# 1. Cosmicflows-4 (distances), positions from the catalogue.
cf4 = []
for r in rows('cosmicflows4-galaxies.tsv.gz'):
    dm = num(r['DM']); ra = num(r['RAJ2000']); de = num(r['DEJ2000'])
    if dm is None or ra is None: continue
    cf4.append(dict(id='cf4:' + r['PGC'], ra=ra, dec=de, mpc=10 ** ((dm - 25) / 5), dsrc='cf4', vh=None, vcmb=num(r['Vcmb'])))
# 2. 2MRS photometry; match to CF4 within 15".
mrs = rows('2mrs-2012.tsv.gz')
cf4_xyz = np.array([unit(o['ra'], o['dec']) for o in cf4]); tree = cKDTree(cf4_xyz)
mrs_xyz = np.array([unit(float(r['RAJ2000']), float(r['DEJ2000'])) for r in mrs])
dist, idx = tree.query(mrs_xyz, distance_upper_bound=2 * math.sin(math.radians(15 / 3600) / 2))
# Large galaxies: 2MASX and PGC centres can differ by more than 15": accept up to 60" when the redshifts agree (300 km/s).
far60, idx60 = tree.query(mrs_xyz, distance_upper_bound=2 * math.sin(math.radians(60 / 3600) / 2))
for k, r in enumerate(mrs):
    if not np.isfinite(dist[k]) and np.isfinite(far60[k]) and num(r['cz']) is not None:
        o = cf4[idx60[k]]; czc = num(r['cz']) + float(SUN_CMB @ mrs_xyz[k])
        if o['vcmb'] is not None and abs(czc - o['vcmb']) < 300: dist[k], idx[k] = far60[k], idx60[k]
matched = 0
for r, d, i in zip(mrs, dist, idx):
    T = mrs_type(r['type']); bv, vk = colours(T); K = num(r['Ktmag']); ebv = min(3.0, num(r['E(B-V)']) or 0)
    riso = num(r['Riso']); q = num(r['b/a']); cz = num(r['cz'])
    phot = dict(V=K + vk + 3.1 * ebv if K is not None else None, vsrc='2mrs-K', av=3.1 * ebv, T=T, q=q,
                rArcsec=1.7 * 10 ** riso if riso is not None else None, pa=None, mrs=r['ID'], name=r['CAT'].replace('_', ' ') if r['CAT'] else '2MASX J' + r['ID'])
    if np.isfinite(d):
        o = cf4[i]
        if 'V' not in o or o.get('mrsSep', 9) > d:
            o.update(phot); o['mrsSep'] = d; o['vh'] = cz; matched += 1
        continue
    if cz is None: continue
    n = unit(float(r['RAJ2000']), float(r['DEJ2000'])); czc = cz + float(SUN_CMB @ n)
    if czc < 500: continue  # Hubble distance meaningless among local peculiar velocities
    o = dict(id='2mrs:' + r['ID'], ra=float(r['RAJ2000']), dec=float(r['DEJ2000']), mpc=czc / H0, dsrc='hubble', vh=cz, vcmb=czc)
    o.update(phot); out.append(o)
out = cf4 + out
# 3. UNGC: B magnitude, inclination, diameter, distance; match within 60" (large galaxies) to the rows above.
allxyz = np.array([unit(o['ra'], o['dec']) for o in out]); tree = cKDTree(allxyz)
for r in rows('ungc-2013.tsv.gz'):
    ra, de = sex(r['RAJ2000'], True), sex(r['DEJ2000'], False); dmpc = num(r['Dist'])
    if dmpc is None or r['Name'].lower() in ('milky way', 'galaxy'): continue
    T = num(r['TT']); bv, vk = colours(T); B = num(r['Bmag']); inc = num(r['i']); A26 = num(r['A26'])
    q = math.sqrt(0.2 ** 2 + (1 - 0.2 ** 2) * math.cos(math.radians(inc)) ** 2) if inc is not None else None
    rec = dict(id='ungc:' + r['Name'], ra=ra, dec=de, mpc=dmpc, dsrc='ungc', vh=num(r['HRV']), name=r['Name'], T=None if T is None else int(T),
               V=B - bv if B is not None else None, vsrc='ungc-B', inc=inc, q=q, rKpc=A26 / 2 if A26 else None, pa=None)
    d, i = tree.query(unit(ra, de))
    if d < 2 * math.sin(math.radians(60 / 3600) / 2) and abs(out[i]['mpc'] / dmpc - 1) < 0.6:
        o = out[i]
        av = o.get('av', 0)
        o.update({k: v for k, v in rec.items() if v is not None and k not in ('V', 'vsrc')})
        # UNGC total B (whole galaxy) is preferred to the 2MASS extrapolated K for these nearby, often large galaxies.
        if rec['V'] is not None: o['V'], o['vsrc'] = rec['V'], 'ungc-B'
        o['av'] = av
    else:
        out.append(rec)
# 4. McConnachie (Local Group dwarfs): V, half-light radius, PA, ellipticity.
allxyz = np.array([unit(o['ra'], o['dec']) for o in out]); tree = cKDTree(allxyz)
for r in rows('mcconnachie-2012.tsv.gz'):
    if r['Name'] == 'The Galaxy' or not r['RAJ2000']: continue
    ra, de = sex(r['RAJ2000'], True), sex(r['DEJ2000'], False); dk = num(r['D'])
    if dk is None: continue
    ell = num(r['Ell']); R1 = num(r['R1']); V = num(r['Vmag'])
    rec = dict(id='mcconnachie:' + r['Name'], ra=ra, dec=de, mpc=dk / 1000, dsrc='mcconnachie', vh=num(r['HRV']), name=r['Name'],
               V=V, vsrc='mcconnachie-V', q=1 - ell if ell is not None else None, pa=num(r['PA']), rArcsec=2 * R1 * 60 if R1 else None, T=None)
    d, i = tree.query(unit(ra, de))
    if d < 2 * math.sin(math.radians(0.1) / 2) and abs(out[i]['mpc'] / rec['mpc'] - 1) < 0.45:
        o = out[i]  # same galaxy, already from UNGC/CF4: add the measured V and structure when better
        for k in ('pa', 'q'):
            if rec[k] is not None: o[k] = rec[k]
        if V is not None: o['V'], o['vsrc'] = V, 'mcconnachie-V'  # a direct V measurement
        o.setdefault('alt', []).append(rec['id'])
    else:
        out.append(rec)

# Pack: Float32 columns (NaN = unknown) + JSON ids/names.
N = len(out)
def col(f):
    return np.array([f(o) if f(o) is not None else np.nan for o in out], dtype=np.float32)
cols = {
    'ra': col(lambda o: o['ra']), 'dec': col(lambda o: o['dec']), 'mly': col(lambda o: o['mpc'] * MPC_LY / 1e6),
    'V': col(lambda o: o.get('V')), 'av': col(lambda o: o.get('av', 0.0)), 'radiusKpc': col(lambda o: o.get('rKpc') if o.get('rKpc') else (o['mpc'] * 1000 * math.radians(o['rArcsec'] / 3600) if o.get('rArcsec') else None)),
    'q': col(lambda o: o.get('q')), 'pa': col(lambda o: o.get('pa')), 'T': col(lambda o: o.get('T')), 'vh': col(lambda o: o.get('vh')),
    'flags': col(lambda o: DIST[o['dsrc']] + 8 * VSRC[o.get('vsrc', 'none') if o.get('V') is not None else 'none']),
}
buf = b''; layout = {}
for k, a in cols.items():
    layout[k] = {'offset': len(buf), 'count': N, 'type': 'f32'}; buf += a.tobytes()
meta = {
    'schema': 1, 'name': 'Photométrie des galaxies (2MRS, CF4, UNGC, McConnachie)', 'count': N, 'columns': layout, 'binaryBytes': len(buf),
    'binarySHA256': hashlib.sha256(buf).hexdigest(), 'H0': H0,
    'flagsDoc': {'distance (flags % 8)': {'1': 'McConnachie', '2': 'UNGC', '3': 'Cosmicflows-4', '4': 'distance de Hubble cz_CMB/H0 (modèle)'},
                 'V (flags / 8)': {'0': 'pas de magnitude', '1': 'McConnachie V', '2': 'UNGC B − (B−V) typique du type', '3': '2MRS K_t + (V−K) typique du type + extinction d’avant-plan'}},
    'ids': [o['id'] for o in out], 'names': [o.get('name', '') for o in out], 'alt': {o['id']: o['alt'] for o in out if o.get('alt')},
    'sources': ['Huchra et al. 2012, ApJS 199, 26 (2MRS)', 'Tully et al. 2023, ApJ 944, 94 (Cosmicflows-4)', 'Karachentsev et al. 2013, AJ 145, 101 (UNGC)', 'McConnachie 2012, AJ 144, 4'],
    'stats': {'cf4': len(cf4), 'cf4With2MRS': sum(1 for o in cf4 if o.get('V') is not None), '2mrsHubble': sum(1 for o in out if o['dsrc'] == 'hubble'),
              'withV': int(np.isfinite(cols['V']).sum()), 'withPA': int(np.isfinite(cols['pa']).sum())},
}
(root / 'public/galaxy-photometry.bin').write_bytes(buf)
(root / 'public/galaxy-photometry.json').write_text(json.dumps(meta, ensure_ascii=False, separators=(',', ':')))
print(json.dumps(meta['stats']), N, len(buf))
