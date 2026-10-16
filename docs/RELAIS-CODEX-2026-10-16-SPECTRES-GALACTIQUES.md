# Relais Codex → Claude · Spectres galactiques réels, couleur continue point / volume
16 octobre 2026 · priorité 3 · dépôt `Tommy1er/odyssee`

## Livré dans le code source (main)

### Données archivées, vérifiables
Huit spectres composites de **Kinney et al. (1996, ApJ 467, 38)** / Calzetti et al. (1994) :
elliptical, s0, sa, sb, sc, starb1, starb3, starb6. Fichiers ASCII archivés inchangés dans
`data/galaxy-spectra-kc96/`, miroir public `astrohchung/dotifsetc/target_templates`, avec empreintes Git SHA-1 vérifiées par `scripts/build-galaxy-sed-kc96.mjs`.
Correspondent aux fichiers `*_template.ascii` distribués par STScI CDBS :
https://ssb.stsci.edu/cdbs/grid/kc96/

Un filtre Bessell V (courbe archivée `BessellV.dat`, miroir `UoS-SNe/CoCo/data/filters`) permet de rapporter le spectre observé à la bande photométrique V. CIE 1931 observateur 2° : `src/cie-1931.js` (jeu officiel CIE 2019, DOI 10.25039/CIE.DS.xvudnb9b).

### Tableau de calcul
- `src/galaxy-sed-kc96-data.js` : grille 257 facteurs D de 0,72 à 1,09, huit SED, quatre valeurs par nœud : **R,G,B linéaires calibrés à luminance CIE Y = 1**, et réponse dans Bessell V relative à D=1.
- Forme spectrale `D F_lambda(D lambda)` : décale les longueurs d'onde, sans prétendre modéliser la puissance totale rayonnée. La normalisation V fixe reste donnée par la magnitude apparente du catalogue.
- Intégration des courbes à pas de 1 nm entre 360–700 nm. Conversion XYZ → sRGB linéaire standard. En dehors de 0,72–1,09, aucune extrapolation de l'atlas : repli vers le corps noir équivalent déjà présent, explicite et approximatif.
- Des types mesurés sont affectés aux familles de SED (E, S0, Sa, Sb, Sc). Les irrégulières utilisent des **proxies starburst** : leur spectre n'est pas une mesure propre à chaque objet ; une vraie étoile active/galaxie atypique n'est pas déterminable du seul type.
- SC termine à 766 nm : la borne Doppler haute 1,09 permet de rester dans la couverture des 700 nm retenus par le moteur. À grande vitesse de la **source** ou aux décalages cosmologiques plus élevés, repli vers le modèle thermique.

### Partage physique point ↔ volume
- `src/galaxy-photometry.js` : **points GPU** : un attribut de classe spectrale, une texture flottante compacte des SEDs, couleur de la galaxie de type et rapport des intégrales de Bessell V entre D_ship et D_sun. Le facteur d'amplitude source existant `(D_sun/D_ship)^2` est conservé pour ne pas modifier subrepticement le modèle de beaming.
- `src/local-group.js` : **volumes 3D** : mêmes classes et mêmes valeurs de couleur et facteur de luminosité depuis `src/galaxy-spectral.js`. Le shader prend la **luminance locale** de la structure du modèle puis lui attribue la chromaticité du spectre intégré : les anciennes couleurs bleu du disque / orange du bulbe, non vérifiées par spectrophotométrie, ne génèrent plus une fausse rupture de teinte. L'information spatiale de luminosité, le gain calibré et l'anisotropie demeurent.
- Le fondu 3–8 pixels de Claude reste inchangé et continue d'utiliser la carte de poids et l'anisotropie par galaxie. Le shader `sky-optics.js` applique ensuite **une seule fois** le Doppler du vaisseau à la totalité du ciel capturé. Aucun Doppler de vitesse du vaisseau n'entre dans les facteurs source.
- Extinction galactique avant-plan : traitement identique pour les points et les volumes.

### Limites indispensables
1. Le spectre intégré **d'un type** n'est pas le spectre individuel de M87 ou M31 ; la luminosité V provient toujours de leurs catalogues.
2. Les couleurs globales du volume sont désormais communes à ses différentes populations spatiales : le moteur ne simule pas encore des spectres spatialement résolus de disque/bulbe (cela exigerait une décomposition et une calibration photométrique multibande séparée).
3. Les coefficients de boost des sources suivent le moteur précédent : ils ne constituent pas une synthèse cosmologique FLRW exacte (`K`-correction, distance de luminosité, expansion à z ~0,19 non résolues).
4. **Optique de l'observateur à 0,99 c :** le post-traitement de `sky-optics.js` applique toujours un continuum thermique inféré de RGB aux rayons du ciel; il n'est PAS une transformation spectrale SED individuelle à tout gamma. Le Doppler est appliqué une fois, mais un observateur ultrarelativiste reste approximatif dans la restitution des couleurs extrêmes.
5. Bande infrarouge/radio/X/gamma : modes instrumentaux illustratifs, ne pas présenter les templates optiques KC96 comme des spectres observés à ces fréquences.
6. Pour les spectres en dehors de la plage D et les classes inconnues, des approximations sont explicitement utilisées.

## Exécutions et acceptation

- `node scripts/build-galaxy-sed-kc96.mjs` : revalide les sources brutes par SHA Git et les 8×257×4 cellules de la table pré-calculée.
- `node scripts/validate-galaxy-spectra.mjs` : normalisation Y, morphologies, invariance au Soleil, poussière, flux V, champ de validité, shader point/volume, Doppler unique.
- `node scripts/validate-galaxy-photometry.mjs` : contrôles existants de Claude (réécrits uniquement là où l'ancien critère imposait R=G=B=1 plutôt que la même couleur SED et Y=1).
- `node scripts/validate-cf4-basins.mjs` : régression CF4.
- `npm run build` : compile `src/cockpit.js` et `src/cosmos.js` vers `public/cockpit.js` et `public/cosmos.js`.
- `.github/workflows/galaxy-spectra.yml` : doit exécuter tests + build sur GitHub Actions, puis mettre à jour les bundles publics dans `main` si GitHub Actions possède les droits `contents: write`.
- Tests de calcul pure JavaScript et inspection des sources ont été effectués directement avant CI. **Ne pas dire que les tests du navigateur/GPU passent** tant qu'ils n'ont pas été exécutés. Le site hébergé sur ChatGPT Sites reste une publication distincte.

## Provenance documentaire
- STScI Kinney-Calzetti atlas : https://www.stsci.edu/hst/instrumentation/reference-data-for-calibration-and-tools/astronomical-catalogs/the-kinney-calzetti-spetral-atlas
- Fichiers officiels : https://ssb.stsci.edu/cdbs/grid/kc96/
- Miroir texte public (les fichiers `*_template.ascii` sont aussi dans notre dépôt) : https://github.com/astrohchung/dotifsetc/tree/main/target_templates
- Courbe Bessell V : https://github.com/UoS-SNe/CoCo/blob/master/data/filters/BessellV.dat
- CIE 1931 données standard : https://doi.org/10.25039/CIE.DS.xvudnb9b
