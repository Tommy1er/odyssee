# Relais Claude → Codex · comètes et nuage d'Oort · 9 octobre 2026

Base : `8da50c5`, la version publiée. Demande d'Abdoulaye : le nuage d'Oort et les comètes, dont Halley et Hale-Bopp, qu'on doit pouvoir suivre même lorsqu'elles sont éteintes.

## Orbites (`src/comets.js`)

- **Sept comètes** : 1P/Halley, C/1995 O1 Hale-Bopp, 2P/Encke, 67P, 109P/Swift-Tuttle, C/2020 F3 NEOWISE et 3I/ATLAS (C/2025 N1, interstellaire).
  - Éléments osculateurs héliocentriques de JPL Horizons au 2026-10-01 00:00 TDB (JD 2461314,5), écliptique J2000. La solution JPL est notée pour chaque comète.
  - Propagation en Kepler : solveur elliptique, et hyperbolique pour 3I. GM☉ de Gauss, positions converties en axes équatoriaux du catalogue.
- **Intégration au simulateur** :
  - `ephemeris.js` : `positionAt`, `velocityAt` et `received` traitent `o.comet`. Le temps de lumière se résout par point fixe, comme pour les planètes.
  - Les comètes n'ont pas de masse gravitante.
- **Qualité affichée** :
  - jusqu'à ±5 ans : « orbite JPL » ;
  - jusqu'à ±60 ans : « extrapolation képlérienne » ;
  - au-delà : date illustrative.
- **Limite du modèle** : sans perturbations planétaires ni dégazage, Kepler place le retour de Halley au 3 août 2061, contre le 28 juillet chez Horizons (0,195 ua d'écart le 28 juillet).
- **Écart d'osculation de Hale-Bopp** : le Tp osculateur de 2026 tombe le 29 mars 1997, contre un périhélie observé le 1er avril. Hale-Bopp est à 50 ua, et l'orbite héliocentrique y absorbe le mouvement réflexe du Soleil.
- **Magnitude totale** : m = M1 + 5 log Δ + k1 log r.
  - Hale-Bopp : Womack et al. 2021.
  - Encke : Ferrín 2008, pic séculaire m(1,1) ≈ 10,25 avec k1 = 5. Les paramètres JPL (M1 = 15,7) sont proches du noyau nu, et Encke restait invisible au périhélie.
  - Autres comètes : M1/k1 de JPL, signalés comme pouvant sous-estimer l'éclat total.

## Rendu (`src/comet-render.js`, ajouté au shader du ciel de `sky-optics.js`)

- **Deux emplacements** : au plus deux comètes reçoivent chevelure et queues, choisies par J/d² vu du vaisseau.
- **Normalisation de l'émission** : l'intégrale de volume vaut Φ(1 ua)·(1 ua)², avec Φ ≈ 1e-6·10^(−0,4 H). C'est la même échelle que les planètes éclairées de `system-bodies.js`, donc la luminance de surface est conservée avec la distance.
- **Chevelure** : profil de Haser e^(−r/Rc)/r², colonne analytique valable même pour un observateur à l'intérieur.
- **Queue ionique** : droite, opposée au Soleil.
- **Queue de poussières** : courbe c(s) = C + a·s + lag·κs², avec lag = −v⊥ (en retard sur le mouvement), et s'élargit.
  - La colonne d'un tube gaussien est évaluée au point le plus proche du rayon sur la courbe (3 pas de Newton sur la tangente).
  - La densité est normalisée par unité de longueur d'arc, plus le capuchon côté Soleil.
- **Défaut corrigé pendant le lot** :
  - Mon premier modèle de queue (segments droits bornés) avait le signe du paramètre de plus proche approche inversé.
  - Il produisait aussi des perles aux jonctions.
  - Les tests de flux l'ont détecté ; la nouvelle forme conserve le flux à 0,2 % près et ne présente aucune perle.

## Interface

- **Navigation** : filtre « Comètes » ; fiche avec distances au Soleil, à la Terre et au vaisseau en ua, magnitude estimée vue de la Terre, activité, orbite, dernier et prochain périhélie avec leur qualité, noyau. Un noyau éteint reste sélectionnable et rejoignable.
- **Laboratoire « Éclipses et comètes à venir »** : périhélies sur 120 ans, triés avec les éclipses ; l'éclipse du 6 février 2027 reste en tête. Le saut fictif au périhélie :
  - place le vaisseau hors du plan orbital, un peu du côté du Soleil et en avant, à max(4e6 km ; 0,8 × longueur de la queue ionique). Avant, le vaisseau était placé dans la queue de poussières, qui couvrait alors le ciel ;
  - règle l'exposition sur ×300 (pose longue), comme l'indique le texte d'état.
- **Carte** (`src/solar-map.js`, échelles « 100 ua », « 2 000 ua », « Nuage d'Oort · 3,5 al ») :
  - orbites des 8 planètes et des 7 comètes, noms des comètes à leur position du moment ;
  - nuage d'Oort en population synthétique de 9 000 points : interne de 2 000 à 20 000 ua aplati, externe isotrope jusqu'à 100 000 ua, r^−3,5 ;
  - libellé « HYPOTHÉTIQUE ».
- **Bandeau d'environnement** (`galaxy.js`) : zone héliocentrique, de la région des planètes aux confins de l'attraction solaire, suivie de la zone galactique.
- **Instantané** : `comets` (comètes actives, r, J, activité) et `mapLabels`.

## Vérifications exécutées

- `node scripts/validate-comets.mjs` (nouveau) : 35 PASS.
  - Halley vs Horizons : 847 km, vitesse à 1,7e-7.
  - Retour de 2061 documenté ; vis-viva et r = q pour les 7 comètes.
  - Encke P = 3,303 ans et périhélie le 10 février 2027 ; 3I v∞ = 57,98 km/s.
  - Magnitudes : Hale-Bopp 1997 à −1,6 (observée −0,8 à −1), Halley aujourd'hui 25,6.
  - Flux de la chevelure 1,000, de la queue ionique 0,998, de la queue courbée 0,998 ; profil sans perle.
  - Zones héliocentriques, population d'Oort, intégration au simulateur (retard de lumière de 4,85 h pour Halley).
- `validate-comet-ui.cjs` (nouveau, SwiftShader) : 12 PASS, aucune erreur navigateur ou shader. Résultats dans `comet-ui-results.json`.
- **Autres suites** : les 12 autres suites numériques, les textures et les données de référence passent. `validate-eclipse-ui` (9/9), `validate-moon-ui` (8/8) et `validate-gravity-field-ui` (11/11) passent aussi ; je les ai lancées sur des copies qui écrivent hors du dépôt.

## Limites et points à regarder

- **Apparence physique, donc modeste** : au périhélie, Halley est une tête verte brillante avec une queue courte et diffuse en pose longue ; Encke est une petite tache floue. Les queues spectaculaires des photos viennent du traitement d'image ; je n'ai pas amplifié artificiellement.
- **Noyaux sphériques** ; pas de jets, de sursauts, de traînées de météores ni de fragmentation. Les tailles de chevelure et de queue sont des ordres de grandeur.
- **Hale-Bopp** ne repasse que vers 4400 : elle se suit et se rejoint, mais elle est éteinte (pas de saut dans le passé).
- **À vérifier sur GPU réel** : en SwiftShader, les Nuages de Magellan (couche des galaxies, antérieure à ce lot) apparaissent zébrés de bandes verticales. Je n'y ai pas touché. S'il s'agit seulement de SwiftShader, rien à faire.

## Suite

Nébuleuses réalistes (raies d'émission Hα, [O III], [S II], poussières et extinction, front d'ionisation), puis Laniakea avec les catalogues fournis.
