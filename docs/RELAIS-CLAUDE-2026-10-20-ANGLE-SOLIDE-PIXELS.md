# RELAIS CLAUDE → CODEX — Éclat des sources ponctuelles indépendant de leur direction
**Odyssée Cosmique — 20 octobre 2026** · base : `ae99e77` (budget des émetteurs imbriqués de Codex, non touché)

## Défaut

L'échelle photométrique (`photometry.js`) définit le flux d'une source ponctuelle comme une **somme de pixels** × `PIXEL_SR`, l'angle solide d'un pixel **au centre** d'une face du cube de 1024. Mais dans une projection perspective, un pixel aux coordonnées tangentes t = (x, y)/(−z) couvre `PIXEL_SR · (1 + |t|²)^(−3/2)`. C'est cinq fois moins dans un coin de face de 90°.

Conséquences :

- **Éclat dépendant de la direction.** Une étoile, une étoile d'amas ou une galaxie ponctuelle n'avait pas le même éclat selon sa position dans le cube. En moyenne sur le ciel, elles valaient **0,60 × le flux nominal, soit 0,56 mag trop faibles**.
- **Écart résiduel de la revue HDR.** C'est la source des ±50 % entre galaxies voisines mesurés le 18 octobre (rapport couche/cube de 0,77 à 2,06 selon la tache).
- **Même défaut sur la couche HDR.** Elle dessine en pixels d'écran perspectifs et avait le même défaut vers les bords de l'écran.

## Correction

- `photometry.js` : `TEXEL_GLSL` fournit `texelGain(vue) = (1 + |t|²)^(3/2)` et `texelScale(vue) = (1 + |t|²)^(3/4)`, ainsi que l'équivalent JS `texelGain(x, y)`. Les coordonnées t sont prises dans l'espace de la caméra qui dessine : face du cube (90°, NDC = t) ou écran. La même loi vaut pour les deux.
- **Étoiles** (`stellar-light.js`, deux shaders) : la lumière est multipliée par `texelGain`. La taille du sprite et les seuils visuels restent calculés sur le flux intrinsèque.
- **Galaxies ponctuelles du cube** (`galaxy-photometry.js`) : lumière × `texelGain`, taille × `texelScale`. Le pas angulaire du sprite passe de (π/2)/N à **2/N**, le pixel central de la convention `PIXEL_SR` : les galaxies résolues étaient dessinées 27 % trop grandes au centre d'une face. Le démarrage du gain de pose longue reste lié à la taille angulaire.
- **Couche HDR** (`galaxy-spectral-overlay.js`) : même correction en coordonnées d'écran, appliquée après aberration. `pixRef` suit le nouveau pas central.
- Le Doppler, les volumes, la Voie lactée et les nébuleuses ne changent pas : ce sont des radiances, déjà indépendantes de la taille des pixels.

## Vérifications

- **Mesure navigateur** (bundle de sonde, champ cf4:41361, 900×600, au repos, galaxies isolées comme le 18 octobre) : rapport couche HDR / cube de **1,006** au total. Par tache, les dix plus brillantes donnent **0,99 à 1,03**, contre 0,77 à 2,06 avant.
- **Tests numériques** : `validate-galaxy-spectral-overlay.mjs` passe à 25 PASS. Nouveau test : la somme de dΩ sur une face vaut 4π/6, `texelGain`·dΩ redonne le pixel central partout, et les shaders utilisent bien la correction. Les 30 suites numériques : 0 échec.
- **Tests navigateur** : `validate-galaxy-spectral-overlay-ui` 5 PASS, `validate-nebula-ui` 6 PASS, `validate-galaxy-ui` 12 PASS, `validate-physics-mobile` 3 PASS.
- **Captures** `validation/` remises à l'état du dépôt.

## Effet visible

Le champ d'étoiles et les galaxies ponctuelles sont en moyenne **0,56 mag plus brillants**, qui est leur valeur nominale. Ils sont surtout uniformes : une même étoile garde son éclat quelle que soit sa direction. La Voie lactée et les volumes, étalonnés séparément, ne bougent pas. Le contraste étoiles / fond diffus devient donc plus juste.

Ce changement touche le moteur : la validation graphique GitHub doit repasser au vert avant publication.
