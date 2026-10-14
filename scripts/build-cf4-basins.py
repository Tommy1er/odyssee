"""Build the basins-of-attraction and flow assets from the published CF4 2023 grids (data/reconstructions-cf4-2023).

Reconstruction: "CF4 2023, ungrouped" (Dupuy & Courtois 2023, A&A 678, A176, basins; Courtois et al. 2023, A&A 670, L15,
fields). Never the 2024 products of Valade et al. / Hoffman et al. Raw files are read, never modified.

Conventions, determined from the data and recorded with their evidence in the output (none of them is guessed):
- Basin labels (128^3, 1000 Mpc/h, 7.8125 Mpc/h cells): array index [iz, iy, ix], cell 64 at the origin; the six
  published attractors (Table A.1) fall in labels 1-6.
- Velocity (3 x 64^3, x52 -> km/s, as instructed by the source page): spatial index [ix, iy, iz] with components
  (V_SGX, V_SGY, V_SGZ), cell 32 at the origin, same 1000 Mpc/h box. Chosen among 2 spatial orders x 4 boxes x 6
  component orders x 2 signs as the only one with strong inflow around all six attractors; streamlines then end in their
  own published basin; the central velocity points along the Local Group's CMB dipole.
- Density contrast (64^3): same order as the velocity; correlation 0.997 with the linear-theory -div(v)/(H0 f).
Distances are in Mpc/h with H0 = 74.6 km/s/Mpc (h = 0.746), the value of the paper.
Outputs: public/cf4-basins-2023.json (metadata, validation) and public/cf4-basins-2023.bin (meshes, streamlines, labels).
Requires NumPy, SciPy, scikit-image.
"""
import gzip, hashlib, json, pathlib, itertools
import numpy as np
from scipy.ndimage import map_coordinates, gaussian_filter
from skimage.measure import marching_cubes

root = pathlib.Path(__file__).resolve().parents[1]
data = root / "data" / "reconstructions-cf4-2023"
manifest = json.loads((data / "MANIFEST.json").read_text())

def fits(name):
    entry = next(f for f in manifest["files"] if f["file"] == name)
    z = (data / name).read_bytes()
    assert hashlib.sha256(z).hexdigest() == entry["gzip_sha256"], name
    b = gzip.decompress(z); h = {}
    for i in range(0, len(b), 80):
        c = b[i:i + 80].decode("ascii"); k = c[:8].strip()
        if k == "END": off = ((i + 80 + 2879) // 2880) * 2880; break
        if c[8:10] == "= ": h[k] = c[10:30].strip()
    shape = tuple(int(h["NAXIS" + str(j)]) for j in range(int(h["NAXIS"]), 0, -1))
    dt = {-32: ">f4", -64: ">f8"}[int(h["BITPIX"])]
    return np.frombuffer(b, dtype=dt, offset=off, count=int(np.prod(shape))).reshape(shape).astype(np.float64)

BOX, H0 = 1000.0, 74.6
h = H0 / 100
D128, D64 = BOX / 128, BOX / 64
B = fits("CF4_new_128-z008_BoA.fits.gz").astype(np.int64)          # [iz, iy, ix]
V = fits("CF4_new_64-z008_velocity.fits.gz") * 52                    # [c, ix, iy, iz], km/s
DELTA = fits("CF4_new_64-z008_delta.fits.gz")                        # [ix, iy, iz]
ERR = fits("CF4_new_64-z008_velocity_cube_error.fits.gz") * 52       # [ix, iy, iz], km/s

BASINS = [  # Dupuy & Courtois 2023, Table A.1, CF4 individual galaxies (ungrouped): attractor SGX, SGY, SGZ (Mpc/h), volume 1e6 (Mpc/h)^3
    (1, "Laniakea", [-62, -8, 39], 1.9), (2, "Apus", [-125, -23, -31], 9.5), (3, "Hercule", [-39, 70, 78], 3.1),
    (4, "Lepus", [-62, -39, -109], 8.1), (5, "Persée–Poissons", [47, -23, -31], 4.8), (6, "Shapley", [-141, 62, -16], 7.9),
    (7, "SDSS-1a", [117, 227, -227], 184.8), (8, "SDSS-2a", [-102, 297, 102], 169.8), (9, "SDSS-2b", [31, 289, 156], 130.2)]

def vel(pts):
    g = pts / D64 + 32
    return np.stack([map_coordinates(V[k], g.T, order=1, mode="nearest") for k in range(3)], 1)
def label(pts):
    i = np.rint(pts / D128 + 64).astype(int); ok = ((i >= 0) & (i < 128)).all(1); out = np.zeros(len(pts), int)
    ii = np.clip(i, 0, 127); out[ok] = B[ii[ok, 2], ii[ok, 1], ii[ok, 0]]; return out

# ---- Validation of the conventions (recorded in the output) -------------------------------------------------------
val = {}
hits = [int(label(np.array([a], float))[0]) for _, _, a, _ in BASINS[:6]]
assert hits == [1, 2, 3, 4, 5, 6]; val["attractorLabels"] = hits
counts = {int(k): int((B == k).sum()) for k in range(10)}
val["volumes"] = {name: round(counts[k] * D128 ** 3 / 1e6, 1) for k, name, _, vol in BASINS}
for k, name, _, vol in BASINS: assert abs(counts[k] * D128 ** 3 / 1e6 / vol - 1) < 0.03, name
dirs = np.array([[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1], [1, 1, 1], [-1, -1, -1], [1, -1, 1], [-1, 1, -1]], float)
dirs /= np.linalg.norm(dirs, axis=1, keepdims=True)
def inflow(order, box, perm, sign):
    comps = [V[p] * sign for p in perm]; s = []
    for _, _, a, _ in BASINS[:6]:
        for r in (15, 30):
            p = np.array(a, float) + dirs * r; g = p / (box / 64) + 32
            idx = g.T if order == "xyz" else g[:, ::-1].T
            w = np.stack([map_coordinates(c, idx, order=1, mode="nearest") for c in comps], 1); s.append(-(w * dirs).sum(1).mean())
    return float(np.mean(s))
scan = sorted(((inflow(o, b, p, s), o, b, p, s) for o in ("xyz", "zyx") for b in (500, 800, 1000, 1200) for p in itertools.permutations(range(3)) for s in (1, -1)), reverse=True)
assert scan[0][1:] == ("xyz", 1000, (0, 1, 2), 1), scan[0]
val["inflowBest"] = round(scan[0][0], 1); val["inflowSecond"] = round(scan[1][0], 1)
l0, b0 = np.radians(47.37), np.radians(6.32)
sgX = np.array([-np.sin(l0), np.cos(l0), 0]); sgZ = np.array([np.cos(l0) * np.cos(b0), np.sin(l0) * np.cos(b0), np.sin(b0)]); sgY = np.cross(sgZ, sgX)
l, b = np.radians(276.4), np.radians(29.3); u = np.array([np.cos(b) * np.cos(l), np.cos(b) * np.sin(l), np.sin(b)])
lg = np.array([u @ sgX, u @ sgY, u @ sgZ]); v0 = V[:, 32, 32, 32]
val["centralVelocityKms"] = round(float(np.linalg.norm(v0)), 0); val["centralVsLocalGroupDipoleCos"] = round(float(v0 @ lg / np.linalg.norm(v0)), 3)
div = sum(np.gradient(V[k], D64, axis=k) for k in range(3)); lin = -div / (100 * 0.3 ** 0.55); inner = (slice(8, 56),) * 3
val["deltaVsLinearTheoryCorr"] = round(float(np.corrcoef(DELTA[inner].ravel(), lin[inner].ravel())[0, 1]), 3)
rng = np.random.default_rng(2)
idx = np.argwhere((B >= 1) & (B <= 6)); idx = idx[rng.choice(len(idx), 4000, replace=False)]
seeds = np.stack([idx[:, 2] - 64, idx[:, 1] - 64, idx[:, 0] - 64], 1) * D128; lab0 = B[idx[:, 0], idx[:, 1], idx[:, 2]]
p = seeds.copy()
for _ in range(600): w = vel(p); p += 1.5 * w / np.maximum(np.linalg.norm(w, axis=1, keepdims=True), 1e-9)
end = label(p)
val["streamlineAgreement"] = {name: round(float((end[lab0 == k] == k).mean()), 2) for k, name, _, _ in BASINS[:6]}
val["streamlineEndToAttractorMpch"] = {name: round(float(np.median(np.linalg.norm(p[lab0 == k] - np.array(a), axis=1))), 1) for k, name, a, _ in BASINS[:6]}
print("validation", json.dumps(val, ensure_ascii=False))

# ---- Assets --------------------------------------------------------------------------------------------------------
blobs, offset = [], 0
def add(arr):
    global offset
    arr = np.ascontiguousarray(arr); pad = (-offset) % 4
    if pad: blobs.append(b"\0" * pad); offset += pad
    start = offset; blobs.append(arr.tobytes()); offset += arr.nbytes
    return {"offset": start, "count": int(arr.size), "type": {np.dtype("uint16"): "u16", np.dtype("uint32"): "u32", np.dtype("int16"): "i16", np.dtype("uint8"): "u8", np.dtype("float32"): "f32"}[arr.dtype]}

# Basin surfaces: marching cubes on the label mask, display-smoothed by a 0.6-cell Gaussian (shifts the surface by less
# than one cell, 7.8 Mpc/h). Vertices in cell units, quantised to 1/16 cell (uint16, origin at cell 0).
meshes = []
truncated = {k: bool(np.any(B[[0, -1], :, :] == k) or np.any(B[:, [0, -1], :] == k) or np.any(B[:, :, [0, -1]] == k)) for k in range(1, 10)}
for k, name, att, vol in BASINS:
    m = gaussian_filter((B == k).astype(np.float32), 0.6)
    step = 1 if k <= 6 else 2
    verts, faces, _, _ = marching_cubes(np.pad(m, 1), 0.5, step_size=step)
    verts = verts - 1  # undo padding; verts are (iz, iy, ix) cell coordinates
    q = np.clip(np.rint(verts[:, ::-1] * 16), 0, 65535).astype(np.uint16)  # (ix, iy, iz)
    meshes.append({"label": k, "name": name, "attractorMpch": att, "volume1e6Mpch3": vol, "truncatedByBox": truncated[k],
                   "vertices": add(q), "faces": add(faces.astype(np.uint16 if len(q) < 65536 else np.uint32)), "triangles": int(len(faces))})

# Streamlines of the reconstructed field: deterministic seeds inside 300 Mpc/h, forward integration with 2 Mpc/h steps,
# stopped near a sink or after 400 Mpc/h; one point kept every 8 Mpc/h. Positions in Mpc/h x 10 (int16); speed in km/s
# (uint16); colour = published basin of the seed.
rng = np.random.default_rng(7)
seeds = rng.uniform(-300, 300, (12000, 3)); seeds = seeds[np.linalg.norm(seeds, axis=1) < 300][:3500]
lines_pts, lines_speed, lines_meta = [], [], []
for s in seeds:
    p = s.copy(); pts = [p.copy()]; spd = [float(np.linalg.norm(vel(p[None])[0]))]
    for i in range(200):
        w = vel(p[None])[0]; n = np.linalg.norm(w)
        if n < 20: break
        p = p + 2.0 * w / n
        if (np.abs(p) > 495).any(): break
        if i % 4 == 3: pts.append(p.copy()); spd.append(float(n))
    if len(pts) < 3: continue
    lines_meta.append([len(pts), int(label(s[None])[0])]); lines_pts.extend(pts); lines_speed.extend(spd)
lines = {"count": len(lines_meta), "meta": add(np.array(lines_meta, np.uint16).ravel()),
         "points": add(np.clip(np.rint(np.array(lines_pts) * 10), -32768, 32767).astype(np.int16).ravel()),
         "speed": add(np.clip(np.rint(lines_speed), 0, 65535).astype(np.uint16))}

# Basin labels for position lookups: run-length encoding of B[iz, iy, ix] in C order (label u8, run u16 pairs split
# at 65535).
flat = B.ravel(); change = np.flatnonzero(np.diff(flat)) + 1; starts = np.r_[0, change]; runs = np.diff(np.r_[starts, flat.size])
lab, ln = [], []
for s0, r in zip(starts, runs):
    while r > 0: c = min(r, 65535); lab.append(flat[s0]); ln.append(c); r -= c
labels = {"order": "[iz, iy, ix], C order", "labels": add(np.array(lab, np.uint8)), "runs": add(np.array(ln, np.uint16))}
# Reconstructed velocity (km/s, int16) on the 64^3 grid, [ix, iy, iz], for local flow readouts.
velocity = {"order": "[component SGX/SGY/SGZ][ix, iy, iz]", "unit": "km/s", "data": add(np.clip(np.rint(V), -32768, 32767).astype(np.int16).ravel())}

binary = b"".join(blobs)
meta = {
    "schema": 1, "name": "Reconstruction CF4 2023, non groupée",
    "sources": ["Dupuy & Courtois 2023, A&A 678, A176, doi:10.1051/0004-6361/202346802 (bassins, tableau A.1)",
                "Courtois et al. 2023, A&A 670, L15, arXiv:2211.16390 (champs de densité et de vitesse)",
                "Fichiers : https://projets.ip2i.in2p3.fr/cosmicflows/ (copie : data/reconstructions-cf4-2023)"],
    "inputSHA256": {f["file"]: f["gzip_sha256"] for f in manifest["files"]},
    "boxMpch": BOX, "H0": H0, "h": h, "labelCell": D128, "velocityCell": D64, "labelCenterIndex": 64, "velocityCenterIndex": 32,
    "axes": "supergalactiques SGX, SGY, SGZ (de Vaucouleurs), origine : la Voie lactée", "validation": val,
    "basins": meshes, "streamlines": lines, "labelGrid": labels, "velocity": velocity,
    "binary": "cf4-basins-2023.bin", "binarySHA256": hashlib.sha256(binary).hexdigest(), "binaryBytes": len(binary),
}
(root / "public" / "cf4-basins-2023.bin").write_bytes(binary)
(root / "public" / "cf4-basins-2023.json").write_text(json.dumps(meta, ensure_ascii=False, separators=(",", ":")))
print("wrote", len(binary), "bytes;", sum(m["triangles"] for m in meshes), "triangles;", lines["count"], "streamlines;", len(lab), "label runs")
