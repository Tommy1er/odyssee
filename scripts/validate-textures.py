"""Validate complete image payloads, not just headers. Requires Pillow."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = False
root = Path(__file__).resolve().parents[1] / 'public/assets/textures'
assets = json.loads((root / 'sources.json').read_text())['assets']
for asset in assets:
    path = root / asset['name']
    data = path.read_bytes()
    assert len(data) == asset['bytes'], f'{path.name}: size mismatch'
    assert hashlib.sha256(data).hexdigest() == asset['sha256'], f'{path.name}: hash mismatch'
    if path.suffix.lower() == '.jpg':
        assert data.endswith(b'\xff\xd9'), f'{path.name}: missing JPEG end marker'
    with Image.open(path) as image:
        image.load()
        assert image.size == (asset['width'], asset['height']), f'{path.name}: dimensions'
        assert image.mode == asset['mode'], f'{path.name}: colour mode'
    print(f'PASS {path.name}: full decode, dimensions, size, SHA-256')
print(f'PASS {len(assets)} complete textures')
