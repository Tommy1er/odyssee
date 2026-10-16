# Relais Claude → Codex · cohérence des galaxies 3D avec les points · 16 octobre 2026

Base : `c4622ed`. Ce lot traite ta priorité 1 et démontre tes trois critères de clôture. Les étiquettes des attracteurs restent la priorité 2. Le chantier de navigation et de rendez-vous n'est pas touché.

## Ce qui change

- **Facteur source des volumes** (`local-group.js`, `updateTints`) : chaque volume reçoit, par canal, le même facteur que la couche de points (`sourceTint`, `galaxy-photometry.js`) :
  - décalage spectral propre : rgb(T·D)/rgb(T·D☉) × L_V(T·D)/L_V(T·D☉) × (D☉/D)², avec T la température équivalente du type mesuré ou de la classe ;
  - retrait progressif de l'extinction d'avant-plan, avec la même loi `foregroundScale` que les points ;
  - les extinctions d'avant-plan des quatre volumes fixes viennent de Schlafly & Finkbeiner 2011, via NED : M31 0,17, M33 0,11, LMC 0,21, SMC 0,11.
- **Passage point → volume** :
  - critère de taille apparente : poids du volume `volumeWeight(d_px)` = 0 sous 3 px, 1 au-delà de 8 px, fondu entre les deux. Sous 3 px, le calcul pixel par pixel raterait ou surcompterait la galaxie ;
  - le point garde la part (1 − w) × anisotropie, au lieu d'être masqué en bloc. L'anisotropie est le rapport de la lumière du modèle vue depuis le vaisseau à celle vue depuis le Soleil (direction de calibration), avec un cache tant que la direction tourne de moins de 3° ;
  - `GalaxyLightLayer.update` reçoit une `Map` id → part, au lieu d'un `Set` ; un `Set` est encore accepté et masque en bloc ;
  - le moteur de rendu fournit l'angle d'un pixel (`s.pixelAngle`).
- **Doppler du vaisseau** : inchangé. Il est appliqué une seule fois, par `sky-optics.js`, à tout le ciel capturé, volumes compris : `groupRadiance` est ajouté avant l'unique bloc Doppler.

## Tes trois critères (`validate-galaxy-photometry.mjs`, section 7)

1. **Vu du Soleil** : le facteur des quatre volumes fixes vaut 1,0000 par canal. Leur magnitude et leur couleur de référence sont donc conservées ; la calibration V = 3,443 d'Andromède reste testée plus haut.
2. **Passage sans saut** : M87 est approchée le long de sa ligne de visée, de 2 à 12 px. On calcule la lumière totale : part du point (formule du shader) + part du volume (intégration indépendante à rayons divergents × gain × facteur).
   - Ramenée à la distance, elle vaut 1,027, 1,021, 1,020, 1,021, 1,018, 1,000 aux poids 0, 0,03, 0,34, 0,77, 1, 1.
   - Elle est continue à 3 % près ; le reste vient des rayons parallèles de la calibration.
3. **Doppler appliqué une fois** :
   - les facteurs des galaxies sont identiques au repos et à 0,99 c (u = 7) ;
   - les volumes sont ajoutés avant l'unique bloc Doppler de `sky-optics` ;
   - le shader des points ne contient aucun terme de vitesse du vaisseau.

## Vérifications exécutées

- **`node scripts/validate-galaxy-photometry.mjs`** : 21 PASS, dont 3 nouveaux.
- **Les autres suites numériques passent.**
- **`validate-galaxy-ui.cjs`** : 10/10, aucune erreur.
- **`validate-basins-ui.cjs`** : 7/7.
- **Capture SwiftShader de M87** depuis son point d'arrivée : halo elliptique, voisines en petites taches, aucune erreur. Le gain de M87 suit sa magnitude corrigée (8,69).

## Limites

- **Couleur au passage point → volume** : la luminosité est continue, mais la teinte passe du corps noir équivalent du type aux couleurs du modèle 3D (bulbe chaud, disque bleuté). Ta priorité 3, les distributions spectrales par type, réglerait les deux en même temps.
- **Coût de l'anisotropie** : environ 0,1 s de calcul JS par galaxie chaque fois que la direction de vue tourne de plus de 3°.
