# Relais Codex → Claude · 17 octobre 2026 · nouvelles nurseries et cosmologie de référence

Base vérifiée : `af001c7`. Dépôt unique `Tommy1er/odyssee`, branche `main`, aucun push forcé.
Ce lot fait progresser l'immersion astrophysique sans changer le rendez-vous ni les lignes d'univers de Claude.

## 1. Nouveaux objets réels et visites

- `src/extragalactic-nebulae.js` : deux destinations nouvelles, recherchables, visitables avec l'ancien mécanisme de sélection et de passage :
  - **30 Doradus / Tarentule** dans le Grand Nuage de Magellan. Centre 05h38m42.4s, −69°06′03.35″, distance catalogue NASA ≈ 170 000 al. Caldwell 103 : V ≈ 4,0 (attention : étoiles associées incluses).
  - **NGC 604**, nébuleuse H II du bras de M33 : centre 01h34m33.79s, +30°46′59″ (NASA Webb), distance **NASA** ≈ 2,73 millions d'al, région ≈ 1 500–1 700 al. La distance du *modèle existant de M33* est 3 millions d'al : NGC 604 est PLACÉE à 3 millions d'al dans la simulation, dans le plan géométrique de M33, et la distance publiée de 2,73 millions d'al est conservée séparément. Sans cela, elle aurait été 270 000 al devant sa galaxie hôte !
- Dans `src/nebulae.js`, nouveau **shape 6** : trois cavités de gaz soufflées par les vents stellaires, peaux ionisées et filaments de bruit, extinction poussiéreuse. Les fonctions JS/GPU ont des formules jumelles et la magnitude est intégrée suivant la calibration déjà présente.
- **Limites honnêtes** : le rayon lumineux (~700–800 al), les morphologies des cavités, le continuum, les rapports des raies, la poussière sont des **modèles**, PAS la restitution d'un voxel NASA ni les vrais spectres locaux. NGC 604 reçoit V≈11,5, estimation visuelle d'observateur seulement : **pas** de vraie mesure photométrique Johnson V intégrée (dépend aussi de l'ouverture).
- Double comptage résiduel : la magnitude globale intégrée de la LMC/M33 comprend aussi la lumière émise par ces complexes. À grande distance, superposer leur émission volumique peut rajouter une petite fraction de lumière. **Ne pas déclarer photométrie commune garantie au pour cent près** avant un traitement hiérarchique d'objets imbriqués.

### Données et provenance
- NASA Hubble Tarentule centre/distance : https://science.nasa.gov/asset/hubble/30-doradus-nebula-in-visible-light/
- NASA Caldwell 103 (V 4.0) : https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-caldwell-catalog/caldwell-103/
- NASA Webb NGC 604 centre/distance/taille : https://science.nasa.gov/asset/webb/ngc-604-nircam-image/
- NASA Hubble H II de M33 : https://science.nasa.gov/missions/hubble/giant-star-birth-region-in-neighboring-galaxy/
- Webb Deep-Sky Society (NGC 604 V visuel ~11,5, estimation amateur) : https://www.webbdeepsky.com/nebulae-clusters/2020/nebula-cluster/october
- Spectrophotométrie 30 Dor : Tsamis et al. 2003, MNRAS 338, 687 (spectres complexes, ne fournissent pas notre distribution de gaz).

## 2. Calcul cosmologique FLRW indépendant

`src/flrw.js` calcule, pour la référence **Planck 2018 ΛCDM plat** : H0=67.4 km s⁻¹ Mpc⁻¹, Ωm=0.315, ΩΛ=0.685. L'intégration de Simpson de E(z) donne :

```
D_C = (c/H0) ∫ dz/E(z)
D_L = (1+z) D_C
D_A = D_C/(1+z)
t_regard = H0^-1 ∫ dz/((1+z)E(z))
a = 1/(1+z)
```

Dans les fiches des galaxies CF4 seulement, si v_CMB positive et définie : `z_CMB≈v_CMB/c` (convention de vitesse spectroscopique `cz`) et une ligne FLRW séparée pour temps de regard vers le passé, échelle, D_C, D_L, D_A. La distance mesurée du catalogue reste distincte. Sous z≈0.01, l'effet des vitesses particulières est affiché comme caveat.

Références numériques indépendantes vérifiées par quadrature (Planck) :
- z=0.01 : D_C=44.374309 Mpc, D_L=44.818052 Mpc, D_A=43.934959 Mpc, t_L=0.14401135 Gyr.
- z=0.1 : D_C=434.110995 Mpc, D_L=477.522094 Mpc, t_L=1.350010 Gyr.
- z=0.19 : D_L=959.294855 Mpc, t_L=2.410597 Gyr.
Source Planck 2018 VI : https://doi.org/10.1051/0004-6361/201833910

**Séparation ABSOLUE** : ce calcul FLRW ne pilote pas le moteur de vol Minkowski, n'affecte aucune position catalogue, aucun boost Doppler des sources, et ne prétend pas corriger le ciel en utilisant d_L. Le modèle de mouvement des galaxies reste le H0=74.6 de CF4 (échelle interne, pas Planck). Les deux H0 différents sont signalés.

## 3. Validations, exécution et publication

Scripts ajoutés :
- `node scripts/validate-flrw.mjs` : 12 contrôles, distances calculées vs références numériques indépendantes, dualité distance luminosité/angulaire, domaine d'applicabilité, absence de mutation des cibles.
- `node scripts/validate-star-nurseries.mjs` : 10 contrôles, coordonnées NASA, NGC604 réellement dans M33, modèle de vents et poussière, radiance et calibration de magnitude.
- `node scripts/validate-star-nurseries-ui.cjs` : Chromium SwiftShader, visite réelle de Tarentule/NGC604, existence du volume calibré, fiche de provenance, captures `nurserie-tarentule.png`, `nurserie-ngc604.png` dans `validation/v2-screenshots`, aucune erreur GPU attendue.
- CI : `.github/workflows/galaxy-spectra.yml` intègre ces tests, les suites de nébuleuses, les galaxies et bassins et lance `npm run build` avant les tests navigateur. Sur succès, le workflow commite les bundles `public/cockpit.js` et `public/cosmos.js`.

À la rédaction : **le code et les tests sont poussés, mais ne pas déclarer les tests navigateur réussis sans résultat de CI**. `main` ≠ publication ChatGPT Sites ; `dist/` doit être publié sur le Site existant, privé, selon COLLABORATION.md.

## 4. Suite prioritaire

1. Contrôler le workflow sur le dernier commit ; corriger tout échec (y compris compilation GLSL sur SwiftShader).
2. Inspection des deux captures (silhouette des cavités, couleur des zones H II, luminosité et obstacles de navigation) ; comparer à des *images scientifiques de référence* sans copier les couleurs assignées de Webb (IR).
3. Préparer une vraie architecture **émetteurs imbriqués** (LMC+30 Dor / M33+NGC604) qui redistribue, au lieu de doubler, la lumière intégrée de la galaxie.
4. Puis seulement, considérer l'expansion FLRW dans les vrais rayons observés et la correction K spectrale et distance de luminosité (nouveau chantier, nettement plus grand).
