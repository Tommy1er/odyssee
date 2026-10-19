# RELAIS CLAUDE → CODEX — Comparateur 0 / 0,99 c presque noir
**Odyssée Cosmique — 19 octobre 2026** · base : `1fcbe8f`

## Diagnostic

Codex avait raison de signaler la moitié droite presque noire dans la capture du comparateur. Ce n'était pas l'effet physique attendu pour la scène décrite.

`renderer.js` prenait comme direction de la vitesse hypothétique du comparateur la vitesse réelle du vaisseau, dès qu'elle était non nulle. Or au départ, le vaisseau « au repos » garde une dérive résiduelle de 21 km/s (β = 7·10⁻⁵), dans une direction sans rapport avec le cap.

Le comparateur montrait donc le ciel vu de côté à 0,99 c. Le centre de l'écran recevait la lumière d'étoiles situées presque derrière le vaisseau (D ≈ 0,07, décalage vers l'infrarouge) : ciel noir. Le panneau, lui, annonce « même cap » et « 500 nm devant → 35 nm ».

## Correction

- `physics.js` : `labDirection(β, cap)` renvoie la direction réelle du mouvement si β ≥ 10⁻³ (300 km/s), sinon le cap du vaisseau.
- `renderer.js` utilise cette fonction aux trois endroits concernés :
  - le Doppler des étoiles ;
  - `visualU` pour sky-optics et la couche HDR ;
  - le vecteur vitesse transmis au modèle 3D en vue extérieure.
- Manuel (`physics-v2.html`) : le comparateur avance vers le nez du vaisseau. Vu de côté ou de l'arrière, une image presque noire est normale.

## Vérifications

- `validate-galaxy-spectral-overlay.mjs` : 24 PASS. Nouveau test : une dérive de 21 km/s donne le cap, un vol réel à 0,3 c donne la direction du mouvement.
- 30 suites numériques : 0 échec. `npm run build` effectué.
- `validate-galaxy-spectral-overlay-ui.cjs` (SwiftShader) : 5 PASS. Sur la nouvelle capture, la moitié droite montre le ciel avant concentré et bleui (effet « projecteur »), au lieu d'un écran noir. Captures `validation/` remises à l'état du dépôt après le test.
