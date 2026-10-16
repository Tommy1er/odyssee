# Relais de travail parallèle · Attracteurs CF4 et spectres de galaxies
Date : 16 octobre 2026 · Base de travail : `c4622ed` · Branche : `codex/attracteurs-spectres-20261016`

## Périmètre et coordination
- **Claude traite en priorité la cohérence Doppler / photométrie des volumes 3D.** Ce lot n'écrit PAS dans `src/local-group.js`, `src/galaxy-photometry.js` ni `src/sky-optics.js` pour éviter toute collision.
- **Codex : attracteurs dans la surcouche du cockpit**, directement dans `src/cf4-basins.js`. Aucun nouveau contrôle d'interface ; on réutilise la case existante, décochée par défaut.
- **Spectres de galaxies : cadrage documenté et vérifiable**, sans injecter de pseudo-spectres non mesurés. L'étape d'ingestion et la photométrie multibande devront être intégrées APRÈS validation du travail volumétrique de Claude.
- Ne pas pousser / fusionner cette branche directement sur `main` pendant l'intégration concurrente sans rebaser et revoir les modifications.

## Étiquettes des attracteurs : ce qui est implémenté

- Six puits d'écoulement CF4 2023 non groupés : Laniakea, Apus, Hercule, Lepus, Persée–Poissons, Shapley, aux coordonnées `attractorMpch` dans `public/cf4-basins-2023.json`.
- En plus, un **repère régional explicitement distinct** « Grand Attracteur · région de Norma », provenant du repère approximatif documenté de `src/cosmic-data.js` (≈ 220 Mly), est affiché. Il ne prétend pas être un septième puits CF4.
- Même conversion supergalactique → équatoriale que les surfaces et courants. Position relative au vaisseau en millions d'al calculée en double précision avant projection ; correction d'aberration via `aberrateU` déjà utilisée par la navigation.
- La couche est un **repère scientifique reconstruit, pas de la lumière** : étiquettes 3D en sprites, affichées au-dessus du rendu, cachées avec « Vue dégagée » et la désactivation des bassins ; aucune émission lumineuse, Doppler spectral ni vitesse gravitationnelle réelle attribués.
- Labels visuellement limités pour éviter les collisions ; Laniakea, le repère régional du Grand Attracteur et Shapley ont priorité sur les autres noms ; ils ne deviennent pas des cibles de navigation supplémentaires.
- Les bassins SDSS-1a, SDSS-2a et SDSS-2b sont **tronqués par le bord de grille**. Le cockpit ne leur attribue aucune étiquette par défaut.
- **Nuance terminologique** : `Attracteur CF4 · Laniakea` est un puits de vitesse reconstruit à environ 322 Mly, selon Dupuy & Courtois (2023). Ce n'est pas le même objet géométrique que le repère illustratif « Grand Attracteur » de la carte cosmique (centre apparent vers Norma, `src/cosmic-data.js`). Ne pas les confondre ou rebaptiser le puits CF4 « Grand Attracteur ». Le repère de Norma est fondé sur https://science.nasa.gov/missions/hubble/hubble-focuses-on-the-great-attractor/ .

### Validation requise sur la branche
1. `node scripts/validate-cf4-basins.mjs` : tests initiaux et trois tests complémentaires de directions (vaisseau au Soleil, déplacement, aberration à 0,99 c) + inventaire des bassins.
2. `node scripts/validate-basins-ui.cjs` : les sept tests préexistants ne doivent pas régresser ; confirmer manuellement les noms et la lisibilité au Soleil et vers Shapley, y compris à 0,99 c.
3. Vérifier la case désactivée par défaut, la vue dégagée et le mode de comparaison des deux vitesses. Examiner les risques de masquage par les commandes du cockpit.
4. Validation locale effectuée à la reprise du 16 octobre : voir le complément ci-dessous. Le rendu GPU reste à vérifier.

## Spectres galactiques : choix de données, sans fausse précision

### Bibliothèques candidates vérifiées
1. **SWIRE / GRASIL / Polletta et al. (2007), STScI / MAST** : modèles de populations galactiques E (2, 5, 13 Gyr), S0, Sa, Sb, Sc, Sd, Sdm, Spi4, UV → IR. Intérêt : morphologies compatibles avec le champ T de 2MRS ; large couverture pour l'effet Doppler et l'IR. Source : https://archive.stsci.edu/hlsp/reference-atlases ; description : https://www.stsci.edu/hst/instrumentation/reference-data-for-calibration-and-tools/astronomical-catalogs/swire-galaxies .
2. **Kinney et al. (1996) / Kinney-Calzetti atlas, STScI** : spectres observés composites E, S0, Sa–Sc et six starbursts classés par extinction ; couvrent typiquement 1235–9945 Å selon le modèle. Atout : contrôle empirique dans l'optique et substitut **déclaré** pour certaines irrégulières. Ne couvrent pas toutes les morphologies tardives ou toute l'IR.
3. **Brown et al. (2014), GALSEDATLAS / MAST** : atlas de SEDs de galaxies réelles, UV → IR, contraint par photométrie ; bon jeu de comparaison indépendant, pas une vérité universelle par classe. https://archive.stsci.edu/hlsp/galsedatlas
4. **Bruzual & Charlot (2003)** : fondement de la synthèse de populations stellaires et des tendances âge/métallicité. À utiliser pour interprétation scientifique, pas pour attribuer un âge précis à chaque galaxie de 2MRS sans mesure.

### Méthodologie d'intégration, après lot de Claude
- **Provenance** : télécharger les fichiers officiels, conserver URL, publication, SHA-256, unités, longueur d'onde minimale/maximale, identifiant de template, licence et éventuel choix arbitré par classe. Aucun tableau de SED inventé à la main.
- **Conversion** : convertir en un format commun de `F_lambda(lambda)` sur grille en nm ; conserver la densité spectrale avant intégration, sans normaliser indépendamment chaque canal.
- **Réponse instrumentale** : intégrer dans les bandes réelles Johnson V et éventuellement RGB/CIE sur leurs courbes de transmission documentées. Vérifier les unités de photon vs énergie dans les réponses.
- **Calage absolu** : l'intégrale V du template au point solaire est NORMALISÉE sur le flux de la magnitude V du catalogue (`Vmag`). La SED donne la répartition relative de la lumière, pas une nouvelle luminosité absolue.
- **Mouvement de la galaxie** : le rapport `D_ship / D_sun` évalue le décalage de la SED de source et la correction de bande ; la distance et l'extinction continuent d'être traitées séparément. Le facteur d'amplitude/beaming dépend de la convention de flux (source étendue versus source ponctuelle) et doit être choisi et justifié explicitement, avec conservation des invariants. Ne pas juxtaposer arbitrairement un facteur `D⁴` au modèle existant.
- **Mouvement du vaisseau** : `SkyOptics` applique **déjà** le boost de l'observateur à la lumière capturée. Ne pas le compter une seconde fois, ni dans la couche ponctuelle, ni dans les volumes 3D.
- **Cosmologie** : pour les objets éloignés (`z > 0,1`), distinguer le modèle Doppler linéaire actuel de l'effet cosmologique FLRW, du `K`-correction et de la distance de luminosité. Ne pas appeler « exact » un ajustement purement relativiste spécial à `z ≈ 0,19`.
- **Périmètre de validité** : pas d'extrapolation hors plage spectrale sans drapeau d'incertitude. Galaxies actives, starbursts et poussières internes ne sont pas déterminables du seul type morphologique.
- **Performance** : pré-calculer les réponses multibandes sur une grille Doppler bornée, avec interpolation conservatrice ; ne pas intégrer 44 188 courbes × spectres × chaque image du cockpit. Le basculement volume ↔ point doit partager la même table / clé d'objet.

### Tests d'acceptation pour le futur moteur spectral
1. `D_ship = D_sun` au Soleil : V et couleurs de référence préservées pour chaque type, quelle que soit la normalisation brute du template.
2. Galaxies E, Sa–Sb, Sc–Sd et irrégulières/starburst : décalage spectral monotone dans les bandes pertinentes ; comparer aux filtres et SEDs, pas seulement au signe « bleu/rouge ».
3. Départage simultané `distance`, `D_source`, `D_observateur` et extinction ; tests séparés pour éviter les doubles corrections. Comparaison au mode 0,99 c.
4. Continuité entre point photométrique et volume 3D pour M31 et M87, avec résolution et exposition identiques ; tests de différence de flux intégré, pas seulement captures visuelles.
5. Référence indépendante sur photométrie (Brown/Kinney) avec tolérances explicites ; provenance `mesuré / modèle de type / estimation` visible dans les détails.
6. Contrôle de perf avant/après avec environ 44 000 galaxies ; conserver le chemin actuel en **fallback explicite** si les spectres officiels manquent.

## Sources
- Dupuy & Courtois (2023) : https://doi.org/10.1051/0004-6361/202346802
- CF4 grilles et versions : https://projets.ip2i.in2p3.fr/cosmicflows/
- STScI MAST, SWIRE/Brown : https://archive.stsci.edu/hlsp/reference-atlases
- STScI MAST, galaxies empiriques : https://archive.stsci.edu/hlsp/galsedatlas
- Bruzual & Charlot (2003) : https://doi.org/10.1046/j.1365-8711.2003.06897.x



## Reprise du 16 octobre : projection corrigée et calcul spectral préparé

### Étiquettes
Le placement initial mettait tous les sprites à 1 200 unités de distance radiale. Une étiquette excentrée était donc plus proche du plan caméra et plus grande à l'écran, alors que le test de collision supposait une taille fixe. Les sprites ont maintenant une profondeur caméra constante ; leur taille tient compte de la matrice de projection (zoom compris). Le rectangle de collision utilise les dimensions mesurées du texte. La hauteur est de 28 pixels CSS (police de 13 pixels) et la largeur dépend du nom, y compris dans une demi-vue ou sur écran étroit. Les étiquettes derrière la caméra, tronquées ou superposées sont retirées. Leur centre reste sur la direction de l'attracteur, sans déplacement trompeur.

### Préparation spectrale hors rendu
- `src/spectral-response.js` : intégration d'une courbe F_lambda dans une réponse instrumentale, pondération énergie ou photons explicite, comparaison à un Doppler de référence. L'union des nœuds du spectre déplacé et du filtre conserve les raies fines ; Simpson intègre exactement leurs interpolants linéaires sur chaque intervalle.
- Convention de préparation : `D * F_lambda(D * lambda)` conserve l'intégrale bolométrique de la **forme**. Ce n'est PAS une loi de boost du flux astronomique. Le raccord avec les amplitudes de Claude, la distance, l'extinction et le boost du vaisseau reste à définir et vérifier ensemble. Ce module n'est importé par aucun rendu.
- `scripts/prepare-galaxy-spectra.mjs` : constructeur hors ligne de tables sur une grille D explicite, à partir de fichiers texte à deux colonnes. Conversion Å / nm / µm, conversion de la densité F_lambda, provenance obligatoire, empreinte SHA-256 et couverture spectrale. Pas de fichiers d'entrée officiels embarqués à ce stade ; extraction FITS encore nécessaire pour les fichiers STScI.
- Les réponses hors couverture retournent une erreur explicite. Aucun spectre extrapolé, aucune nouvelle magnitude et aucune couleur de galaxie ne sont injectés dans le cockpit.
- Vérification documentaire : la distribution **STScI TRDS SWIRE couvre 0,2–30 µm**, contrairement à la couverture plus large des originaux GRASIL. La description officielle donne les longueurs d'onde en Å et F_lambda en erg s⁻¹ cm⁻² Å⁻¹. MAST indique CC BY 4.0 pour ses produits Reference Atlases. Ces bornes excluent une utilisation sans réserve aux décalages extrêmes (0,99 c). Sources : pages STScI SWIRE et MAST Reference Atlases déjà citées, consultées le 16 octobre 2026.

### Vérifications exécutées lors de la reprise
- `node scripts/validate-cf4-basins.mjs` : 19 PASS.
- `node scripts/validate-attractor-layout.mjs` : 10 PASS, matrices Three réelles, placement et collisions ; canvas simulé, aucun test GPU revendiqué.
- `node scripts/validate-spectral-response.mjs` : 14 PASS sur cas analytiques (bandes triangulaires, raie fine, unités, conservation, limites, provenance). Ces cas ne valident pas un template de galaxie observée.
- `node scripts/validate-catalogue-ui.mjs` : 40 PASS, intégration DOM avec OrbitControls réel ; pas de rendu GPU.
- `npm run build` : construction locale effectuée. Les bundles générés seront reconstruits et enregistrés lors de l'intégration sur le dernier lot de Claude.

### Suite après Claude
1. Rebaser cette PR sur ses volumes 3D, conserver une source photométrique commune point/volume, reconstruire les bundles.
2. Vérifier le rendu et la lisibilité des noms en navigateur (non disponible ici).
3. Acquérir et extraire les FITS officiels SWIRE, ainsi qu'une réponse Johnson V documentée ; garder les modèles de type comme modèles, pas comme mesures propres à chaque galaxie. Les fonctions CIE disponibles dans le dépôt ne remplacent pas Johnson V.
4. Valider les tables sur des spectres indépendants et raccorder explicitement la convention d'amplitude avant d'activer le nouveau moteur spectral.
