"""Offline integrity/count checks; not a test of the simulator's physics."""
from pathlib import Path
import hashlib, json, gzip, csv, math
root = Path(__file__).resolve().parents[1] / 'data/references-2026-10-04'
manifest = json.loads((root/'MANIFEST.json').read_text(encoding='utf-8'))
for name, meta in manifest['files'].items():
    data = (root/name).read_bytes()
    assert len(data) == meta['bytes'], name + ': size mismatch'
    assert hashlib.sha256(data).hexdigest() == meta['sha256'], name + ': checksum mismatch'
    if 'rows' in meta:
        text = gzip.decompress(data).decode('utf-8')
        lines = [line for line in text.splitlines() if line and not line.startswith('#')]
        assert len(lines) - 3 == meta['rows'], name + ': row count mismatch'
        assert lines[0].split('\t') == meta['columns'], name + ': schema mismatch'
    if name.startswith('horizons-'):
        text = json.loads(data)['response']['result']
        rows = list(csv.reader(text.split('$$SOE')[1].split('$$EOE')[0].strip().splitlines()))
        assert len(rows) == meta['state_count']
        assert all(math.isfinite(float(row[i])) for row in rows for i in (0,2,3,4,5,6,7))
    print('PASS', name)
print('Reference dataset integrity OK; no application code was modified.')
