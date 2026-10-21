# RELAIS CLAUDE → CODEX — Nébuleuses non résolues : point étalonné, relais vers le volume, cible visible de loin
**Odyssée Cosmique — 21 octobre 2026** · base `a54fe4e` · lot confié par Abdoulaye (Codex : revue du budget et publication)

## Ce qui change

1. **Cible visible à toute distance.**
   - *Avant :* une nébuleuse sélectionnée était retirée du cube de fond, mais sky-optics ne la dessinait qu'à moins de 120 rayons. Entre les deux, elle était invisible ; c'était le cas de la Tarentule vue du Soleil.
   - *Maintenant :* la cible est toujours marchée par rayon d'écran, quelle que soit la distance, avec un poids w. Elle n'est plus jamais dans le cube de fond.
   - *Repli :* la règle ancienne (< 120 rayons, poids 1) ne s'applique que si aucun poids n'est fourni.
2. **Point étalonné** (`src/nebula-points.js`). Chaque nébuleuse a un sprite ponctuel dans le cube principal.
   - *Flux :* celui du volume étalonné, `V − A_V` vu de la Terre (`intrinsicMag`), en 1/d² depuis la distance de catalogue.
   - *Couleur :* le RGB intégré du volume, normalisé à une luminance de 1. `calibrate()` renvoie désormais `rgb` ; une grille 12×24 suffit pour la couleur (2 % près), au lieu de 2 s de calibrations complètes au démarrage.
   - *Échelle :* la même que les étoiles (somme de pixels × `PIXEL_SR`, avec `texelGain`).
   - *Portée :* aucune limite. NGC 604 au-delà des 2 500 unités du cube est donc représentée.
3. **Relais point → volume.** Le volume reçoit w (smoothstep), le point 1 − w. Le diamètre est mesuré en pixels de la surface qui dessine le volume :
   - nuage non sélectionné : texels du cube de fond (2/256), de **3 à 8 texels** ;
   - cible marchée par rayon d'écran : pixels d'écran, de **2 à 5 px** (échantillonnage non biaisé ; vérifié ci-dessous).
   - *Poussière :* la poussière du nuage n'occulte le fond qu'à proportion de w (`cloudOpacity`), car le flux du point inclut déjà sa propre extinction.
   - *Hors bandes visibles :* inchangé (volume seul, modèle qualitatif).
4. **Budget de Codex**, toujours désactivé par défaut.
   - L'ensemble « représenté » devient toutes les nébuleuses du calque ponctuel.
   - `childGain` s'applique au point, au volume du cube et à la marche directe.
   - Conséquence assumée : avec le budget, NGC 604 vue du Soleil (point seul) est désormais débitée de M33 (hôte ×0,99512). `validate-nested-emission-ui.cjs` est adapté (contrôle « NGC604 dessinée en point étalonné au-delà du cube, débitée de M33 »). Le reste de ce test est inchangé.

## Deux défauts de photométrie ponctuelle découverts en mesurant, corrigés pour toutes les couches

5. **PSF intégrée sur le pixel** (`photometry.js`, `PSF_VERTEX_GLSL` / `PSF_FRAGMENT`).
   - *Défaut :* l'ancien profil `exp(−12 r²)`, échantillonné au centre des pixels avec des sprites dès 1,25 px, donnait une somme de pixels allant de **0 à 8 ×** la valeur nominale selon la position sous le pixel (simulation et test). Moyenne 0,74 à 0,81 au lieu de 0,818.
   - *Symptôme :* NGC 604, au Soleil, tombait sur un coin de texel et **disparaissait**, avec un rendu exactement nul en relecture HDR.
   - *Correction :* une gaussienne intégrée sur chaque pixel (erf), σ ≥ 0,55 pixel, sprite de 7σ + 1 px. La somme vaut 1 à 0,1 % près partout.
   - *Couches concernées :* étoiles, étoiles d'amas, galaxies du cube, couche HDR, nébuleuses.
6. **σ ≥ 0,6 pixel d'écran pour les sprites du cube** (`psfMin`, réglé à chaque image par le renderer).
   - *Défaut :* le cube est rééchantillonné par pixel d'écran. Un sprite plus étroit qu'environ 0,5 pixel d'écran est crénelé : la Tarentule ponctuelle donnait **16,3 à 29,6** (moyenne 23,05, écart-type 4,4) selon le décalage sous-pixel de la caméra.
   - *Effet visible :* les étoiles changeaient d'éclat en tournant la caméra.
   - *Correction :* avec σ = 0,6 pixel d'écran, l'erreur résiduelle est < 0,2 %.
7. **Populations d'amas non sélectionnés.**
   - *Défaut :* elles étaient dessinées dans le cube de fond à 256 px, où un texel couvre 16 × `PIXEL_SR`. Leurs étoiles portaient donc 16 fois leur lumière, soit 3 mag de trop.
   - *Correction :* toutes les populations d'amas passent dans le cube principal. Seuls les volumes de nuages restent dans le cube de fond.
   - *Vérification :* cette correction n'a pas été mesurée à l'écran pendant ce lot ; elle a été vérifiée sur le code et le principe.

## Mesures (Chromium SwiftShader, 900×600, DPR 1, bundle de sonde hors dépôt)

**Méthode.** On prend des différences de captures en vue dégagée : nébuleuse allumée / éteinte (point, volume du cube et marche directe), hôte allumé / éteint. Puis on applique l'inversion `−ln(1 − v^2,2)` et une somme sur l'écran.

### Au Soleil, avec la Tarentule sélectionnée (w = 0,29 : 71 % point, 29 % volume)

| | Tarentule / LMC | Attendu | Écart |
|---|---|---|---|
| Budget on | **0,0377** | 0,0377 | 0,0 % |
| Normal | **0,0463** | 0,0457 | +1,3 % |
| Avant ce lot (on / normal) | 0,0906 / **0** | | ×2,4 / invisible |

- **Somme LMC + Tarentule avec le budget :** +0,07 % par rapport au LMC seul du mode normal (+5,3 % avant). Valeurs mesurées sur le code final, corrections 5 à 7 incluses.
- **Relecture HDR du sprite seul** (sans tone mapping) : somme des pixels / attendu = **1,000 ± 0,001** pour la Tarentule et pour NGC 604.
- **Volume GPU seul, vue terrestre**, intégré en L·dΩ et comparé à l'étalonnage JS : 1,000 à 1,002 (Tarentule, NGC 604, Orion ; 24 et 72 pas). À 6–48 px de diamètre, la moyenne sur 5 décalages sous-pixel vaut 0,985 à 0,999.

### NGC 604 / M33 au Soleil

- **Représentation :** point seul (w = 0) ; il est désormais dessiné, alors qu'avant ce lot il était hors portée du cube puis exactement nul.
- **Mesure à l'écran, code final :** NGC 604 / M33 = **0,0052** pour 0,0049 attendu (+6 %).
  - Méthode : NGC 604 isolée (volume M33 éteint) à une exposition de 10, M33 à 0,1, pour éviter la saturation de son cœur.
  - Avant la correction n° 6, on mesurait 0,0068 : l'aliasing du sprite compact, à phase sous-pixel fixe, était en cause.

### Approche de la Tarentule, sur la ligne nébuleuse → Soleil (flux × d², unités arbitraires)

- **Non sélectionnée** (cube de fond, 2 à 10 texels, point puis volume) : 22,59 · 22,55 · 22,51 · 22,23 · 23,15 · 22,48 · 22,77. **Continu à ±2 %.**
- **Sélectionnée** (point puis marche par rayon d'écran, 1 à 8 px ; w = 0 · 0 · 0,26 · 0,74 · 1 · 1 · 1) : 23,9 · 23,7 · 20,2 · 19,5 · 22,2 · 20,4 · 21,4.
  - Pas de saut systématique : l'enveloppe est de ±10 % autour de 21,5.
  - Au même endroit à 2 px, la moyenne sur 6 décalages sous-pixel de la caméra est de **22,7 ± 1,4** ; elle était de 23,1 ± 4,4 avant la correction n° 6.
  - Le creux à 3–4 px reste dans la dispersion d'échantillonnage du petit volume, de ±5 % à 6 px (mesure GPU sur 5 décalages).
- **Sans LMC**, pour isoler l'absorption du fond par la poussière du nuage : la différence point / volume ne venait pas de la poussière (26,4 contre 21,4 avant la correction n° 6, mêmes valeurs qu'avec le LMC). C'était l'aliasing de rééchantillonnage corrigé en n° 6.

## Limites

- **Anisotropie du nuage.** Le point porte le flux vu de la Terre. Vue d'ailleurs, la poussière interne change le flux du volume ; le relais n'en tient pas compte (pas de facteur d'anisotropie, contrairement aux galaxies). Toutes les mesures ont été faites dans l'axe d'étalonnage.
- **Absorption du fond.** Elle n'apparaît qu'avec le volume (proportion w), progressivement de 3 à 8 texels ou de 2 à 5 px. C'est voulu : la silhouette de poussière se révèle quand le nuage devient résolu.
- **Effet global sur l'éclat.** La nouvelle PSF et σ ≥ 0,6 pixel d'écran rendent tous les points un peu plus doux, et en moyenne de +1 à +10 % plus brillants (valeur nominale exacte au lieu de 0,74–0,81). Les amas non sélectionnés perdent leur facteur 16 parasite.
- **Couleurs.** Les couleurs ponctuelles des nébuleuses sont un RGB intégré du modèle, non une photométrie mesurée.
- **Tests navigateur.** Ce sont des contrôles fonctionnels : la photométrie à l'écran est décrite par les mesures ci-dessus. Aucun vrai GPU mobile n'a été testé.

## Vérifications exécutées

- **Numériques :** 33 suites `scripts/validate-*.mjs`, 0 échec. Nouvelle suite `validate-nebula-points.mjs` (16 PASS) : flux du point = Φ étalonné, loi en 1/d², couleur, poids du relais, câblage, PSF intégrée (écart max 8·10⁻⁴ contre 0 à 8 × pour l'ancien profil), σ minimal d'écran. `validate-galaxy-spectral-overlay.mjs` : 25 PASS (assertion PSF adaptée).
- **Navigateur :** les suites ont été lancées une par une : en parallèle, SwiftShader dépasse les délais.
  - `validate-nested-emission-ui.cjs` : **7/7 PASS**. Deux adaptations, et la logique de Codex ne change pas :
    - NGC 604 est sélectionnée par URL : à 640×480, le panneau de filtres est replié et non cliquable, ce qui faisait échouer le test d'origine en local.
    - Avant chaque navigation, le test attend le chargement complet des modèles GLTF ; sinon le déchargement signalait des textures blob en erreur.
  - Autres suites :
    - `validate-star-nurseries-ui` 7 PASS ;
    - `validate-nebula-ui` 6 PASS ;
    - `validate-galaxy-spectral-overlay-ui` 5 PASS ;
    - `validate-galaxy-ui` 12 PASS ;
    - `validate-physics-mobile` 3 PASS.
  - `validate-moon-ui` : 7 PASS, puis délai dépassé à la dernière capture (« waiting for fonts »). **Même échec avec le bundle d'avant ce lot**, dans cet environnement ; ce n'est donc pas une régression. À confirmer par la CI.
- **Workflows :** `validate-nebula-points.mjs` est ajouté aux workflows rapide et graphique (filtres de chemins étendus à `nebula-points.js`, `environments.js`, `photometry.js`, `stellar-light.js`).
- **Captures `validation/` :** remises à l'état du dépôt.

À Codex : revue du budget avec le nouvel ensemble « représenté », puis validation graphique et publication.
