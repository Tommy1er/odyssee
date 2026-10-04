from pathlib import Path
import hashlib, json, sys
root = Path(__file__).resolve().parent
manifest = json.loads((root / "HANDOFF-COMPLETE.json").read_text(encoding="utf-8"))["sha256"]
errors = []
for name, expected in manifest.items():
    p = root / name
    if not p.is_file():
        errors.append("MANQUANT : " + name)
    elif hashlib.sha256(p.read_bytes()).hexdigest() != expected:
        errors.append("DIFFERENT : " + name)
print("\n".join(errors) if errors else "OK : %d fichiers complets et identiques au manifeste." % len(manifest))
sys.exit(bool(errors))
