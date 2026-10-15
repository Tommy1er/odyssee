# Relais Claude → Codex · éclat réel des galaxies et ciel extragalactique · 15 octobre 2026 (2ᵉ lot)

Base : `a3d8830`, publiée par toi. Abdoulaye m'a demandé de rester sur la modélisation de l'Univers ; l'UX est traitée ailleurs. Je n'ai touché l'affichage qu'à un endroit : les symboles CF4 sont masqués en « Vue dégagée ».

## Problème corrigé

L'éclat des galaxies en volume était « qualitatif » : un gain de 1. Calibrée, Andromède demande un gain de 0,0119 ; elle était donc environ 84 fois trop lumineuse. Les galaxies hors des 8 volumes n'émettaient aucune lumière : il n'y avait que des symboles cyan de navigation.

## Données (`scripts/build-galaxy-photometry.py` → `public/galaxy-photometry.json` + `.bin`, 6,3 Mo)

- **Sources** : les tables brutes de `data/references-2026-10-04`, non modifiées :
  - 2MRS (Huchra et al. 2012) : 44 599 galaxies, K totale, rayon isophotal, b/a, type, cz ;
  - CF4 : distances ;
  - UNGC : B, inclinaison, A26, distance, vitesse héliocentrique ;
  - McConnachie : V, r_h, angle de position, ellipticité.
- **Total** : 87 973 galaxies sans doublon, dont 44 188 avec une magnitude V.
- **Appariements** :
  - 2MRS ↔ CF4 : à moins de 15″, ou jusqu'à 60″ si les décalages spectraux concordent à 300 km/s ;
  - UNGC : à moins de 60″ ;
  - McConnachie : à moins de 0,1° avec des distances à 45 % près.
  - Aucun doublon ne reste à moins de 15″ (testé).
- **Magnitude, par ordre de préférence** : V McConnachie, puis B UNGC − (B−V) typique du type, puis K 2MRS + (V−K) typique du type + 3,1 E(B−V). La source est codée dans `flags`.
  - Le K 2MASS d'Andromède, avec un E(B−V) SFD de 0,68 contaminé par la galaxie elle-même, donnait V = 5,7 au lieu de 3,44 ; d'où la préférence pour B UNGC.
- **Distances** : mesurées, sinon distance de Hubble cz_CMB/H₀ (31 662 galaxies 2MRS, signalées comme modèle, jamais sous 500 km/s).

## Code

- **`src/galaxy-photometry.js`** :
  - `enrichGalaxy` donne aux objets du cockpit leur magnitude, leur inclinaison mesurée (b/a) et leur angle de position mesuré ;
  - pour les entrées CF4, il remplace la classe déduite de la méthode de distance par le type 2MRS et le rayon K × 1,7 ;
  - sans magnitude, une luminosité typique de la classe est utilisée, marquée « estimée » ;
  - `GalaxyLightLayer` dessine les 44 188 galaxies sur l'échelle photométrique des étoiles, en point ou en tache de leur taille angulaire, à leur position sur le cône de lumière (`cosmic-motion.js`). Les galaxies en volume sont masquées. L'extinction d'avant-plan est retirée hors de la Galaxie (approximation). Mise à jour à 4 Hz au plus.
- **`src/local-group.js`** :
  - jumeaux JS `groupRayRadiance` et `groupLuminosity` du shader ;
  - `calibratedGain` fixe le gain de chaque volume pour que son flux intégré vu du Soleil redonne sa magnitude. Les quatre modèles fixes ont V de RC3/NED : M31 3,44, M33 5,72, LMC 0,4, SMC 2,2 ;
  - `groupGain` applique le gain de pose longue ×10, comme pour les autres lumières diffuses.
- **`cosmic-motion.js`** : vitesse héliocentrique générique (`vHelio`).
- **`catalogue-galaxies.js`** : export de `CLASSES`.
- **Cockpit** :
  - chargement 2,5 s après le démarrage ;
  - les voisines CF4 reçoivent mouvement, cône de lumière et photométrie ;
  - la fiche ajoute l'éclat avec sa provenance, et la provenance de l'orientation ;
  - snapshot : `galaxyLight`, `groupGains`.

## Vérifications exécutées

- **`node scripts/validate-galaxy-photometry.mjs`** (nouveau) : 13 PASS, dont :
  - intégrité ;
  - magnitudes de référence (M31 3,59 / 3,44, M81 7,09 / 6,94, Centaurus A 6,94 / 6,84, M33 5,70 / 5,72, Fornax 7,40, LMC 0,40) ;
  - préférence des sources et doublons ;
  - M87 elliptique d'après 2MRS ;
  - inclinaison mesurée d'une spirale Tully–Fisher ;
  - Andromède en volume : un rendu indépendant à rayons divergents donne V = 3,443 ;
  - convergence de la grille de calibration (0,5 %) ;
  - couche de lumière : positions au Soleil, masquage, extinction.
- **Les autres suites numériques passent**, dont `validate-immersion.mjs` (26).
- **`validate-galaxy-ui.cjs`** : 10/10, aucune erreur (corrigé le soir même : j’vais écrit 11/11, le test compte 10 contrôles). L'assertion de la fiche CF4 a été mise à jour : M87 est maintenant elliptique T = −4 d'après 2MRS, avec rayon 2MASS et magnitude K.
- **`validate-basins-ui.cjs`** : 7/7.
- **Captures SwiftShader** (hors dépôt) :
  - Andromède depuis le Soleil : petite tache pâle, comme en réalité ;
  - M81 presque invisible ;
  - M87 depuis son point d'arrivée : halo elliptique lisse, voisines en petites taches, galaxies lointaines en points faibles ;
  - centre de la Vierge.

## Limites

- Couleurs par type (pas de spectre), pas de décalage spectral propre des galaxies.
- Magnitudes 2MASS trop faibles pour les grandes elliptiques (M87 : 9,13 contre 8,63).
- Les galaxies sous la limite du 2MRS ne sont que des symboles.
- Extinction d'avant-plan : retrait approché.
- Angles de position mesurés seulement pour les naines de McConnachie.
