"""Offline integrity/structure checks for published CF4 2023 grids. Requires NumPy, not Astropy.
Does not validate velocity component ordering, regridding, FLRW distances, or an application renderer.
"""
from pathlib import Path
import gzip,hashlib,json
import numpy as np
root=Path(__file__).resolve().parents[1]/'data/reconstructions-cf4-2023'
m=json.loads((root/'MANIFEST.json').read_text())
def fits_array(b):
    h={}
    for i in range(0,len(b),80):
        card=b[i:i+80].decode('ascii');key=card[:8].strip()
        if key=='END':offset=((i+80+2879)//2880)*2880;break
        if card[8:10]=='= ':h[key]=card[10:30].strip()
    else:raise ValueError('FITS END absent')
    shape=tuple(int(h['NAXIS'+str(j)]) for j in range(int(h['NAXIS']),0,-1))
    dtype={-32:'>f4',-64:'>f8'}[int(h['BITPIX'])]
    expected=int(np.prod(shape))*np.dtype(dtype).itemsize
    assert len(b)%2880==0 and len(b)>=offset+expected
    return np.frombuffer(b,dtype=dtype,offset=offset,count=np.prod(shape)).reshape(shape)
for f in m['files']:
    z=(root/f['file']).read_bytes();assert hashlib.sha256(z).hexdigest()==f['gzip_sha256']
    b=gzip.decompress(z);assert len(b)==f['raw_bytes'] and hashlib.sha256(b).hexdigest()==f['raw_sha256']
    a=fits_array(b);assert list(a.shape)==f['shape_numpy'] and np.isfinite(a).all()
    assert float(a.min())==f['min'] and float(a.max())==f['max']
    if 'BoA' in f['file']:
        assert np.array_equal(a,a.astype(int));assert set(np.unique(a))==set(range(10));assert a[64,64,64]==1
        # Independent published attractor positions, Table A.1, ungrouped 2023 reconstruction.
        for label,xyz in [(1,[-62,-8,39]),(2,[-125,-23,-31]),(3,[-39,70,78]),(4,[-62,-39,-109]),(5,[47,-23,-31]),(6,[-141,62,-16])]:
            index=np.rint(np.array(xyz)/(1000/128)+64).astype(int)
            assert a[tuple(index[::-1])]==label
        volume=float((a==1).sum())*(1000/128)**3
        assert abs(volume/1.9e6-1)<.03
        print('PASS 6 published attractor labels, central cell, Laniakea volume',volume,'(Mpc/h)^3')
    print('PASS hashes, complete FITS, shape, finite values:',f['file'])
print('All 4 files validated. No application integration or velocity registration claimed.')
