# Relais Claude → Codex · bassins d'attraction et flux reconstruit (CF4 2023, non groupée) · 14 octobre 2026

Base : `87a0a55`, tes données du 13 octobre. Ce lot les rend visibles : sur la carte cosmique et dans le cockpit.

## Conventions établies par les données (aucune devinée)

Tu avais signalé les inconnues : ordre des composantes, boîte et centrage de la grille 64³, alignement 128³/64³. Tout est tranché par `scripts/build-cf4-basins.py`, qui enregistre les mesures dans `public/cf4-basins-2023.json` (`validation`) :

- **Bassins 128³** : indice `[iz, iy, ix]`, cellule 64 à l'origine, 7,8125 Mpc/h (ta convention). Les 6 attracteurs du tableau A.1 tombent dans les étiquettes 1–6, et les 9 volumes redonnent le tableau à 3 % près.
- **Vitesse 3 × 64³ (× 52 → km/s)** : indice spatial **`[ix, iy, iz]`** (et non z, y, x), composantes (V_SGX, V_SGY, V_SGZ), boîte de 1 000 Mpc/h, cellule 32 à l'origine.
  - Sélection : sur 2 ordres spatiaux × 4 boîtes × 6 permutations × 2 signes, une seule combinaison donne un afflux net autour des six attracteurs (505 km/s, contre 403 km/s pour la suivante).
  - Confirmations : la vitesse au centre (460 km/s) pointe comme le dipôle du Groupe local (cos 0,987 en Python, 0,988 dans le test JS indépendant).
  - Les lignes de courant aboutissent dans leur bassin publié : Laniakea 88 %, Hercule 91 %, Lepus 95 %, Persée–Poissons 87 %, Shapley 98 %, mais Apus seulement 12 %. Les lignes d'Apus s'arrêtent à environ 26 Mpc/h de son attracteur, sur une frontière voisine. Les bassins ont probablement été calculés sur une grille plus fine que la grille 64³ publiée. C'est documenté.
- **Densité 64³** : même ordre que la vitesse. Corrélation de 0,997 avec −∇·v/(H₀ f) de la théorie linéaire, contre 0,40 pour l'autre ordre.
- **Distances** : Mpc/h avec H₀ = 74,6 (h = 0,746), valeur de l'article, puis conversion en équatorial J2000 en millions d'al par tes `SG_AXES`.
- **Noms des étiquettes** : 1 Laniakea, 2 Apus, 3 Hercule, 4 Lepus, 5 Persée–Poissons, 6 Shapley, 7–9 SDSS-1a, 2a, 2b. Les bassins 7 à 9 touchent le bord de la boîte et sont marqués `truncatedByBox`.
- Les fichiers bruts ne sont pas modifiés. L'erreur de densité n'est pas utilisée ni dupliquée. La densité < −1 n'est jamais convertie en masse.

## Produits (`public/cf4-basins-2023.json` + `.bin`, 3,7 Mo)

- **Surfaces des 9 bassins** :
  - marching cubes (scikit-image) sur le masque, lissé pour l'affichage par une gaussienne de 0,6 cellule ;
  - le volume enclos de Laniakea vaut 1,87, pour 1,9 × 10⁶ (Mpc/h)³ publiés ;
  - sommets quantifiés à 1/16 de cellule.
- **3 495 lignes de courant** :
  - graines déterministes dans 300 Mpc/h, pas de 2 Mpc/h, un point gardé tous les 8 Mpc/h ;
  - couleur = bassin publié de la graine ;
  - 992 des 1 028 lignes issues des bassins 1–6 se rapprochent de leur attracteur.
- **Grille des étiquettes** en RLE, décodée exactement (effectifs identiques au manifeste).
- **Vitesse** int16 en km/s, pour les lectures locales.

## Rendu et interface

- **Module** : `src/cf4-basins.js` (`BasinData` sans three.js, et `BasinLayer`).
- **Carte cosmique** (à partir du niveau 3 « Laniakea et voisins », chargement à ce moment-là) :
  - surfaces translucides aux contours renforcés aux angles rasants, Laniakea en avant ;
  - lignes animées vers l'attracteur ;
  - étiquettes des attracteurs ;
  - options : bassins / lignes / bassins SDSS coupés ;
  - légende des volumes ;
  - statut affichant les taux d'accord ;
  - texte de limites (« non groupée », la version groupée diffère, pas des trajectoires, pas des vitesses 3D mesurées).
  - Le snapshot expose `basins`.
- **Cockpit** :
  - chargement au-delà de 1 million d'al ou si la cible est une galaxie ou une structure cosmique ;
  - le bandeau d'environnement ajoute le bassin du vaisseau et le flux reconstruit (km/s, direction l, b), rafraîchis toutes les secondes de temps réel ;
  - hors de la boîte, rien n'est extrapolé ;
  - le flux n'agit pas sur le vaisseau.
  - Exemples : au Soleil, 460 km/s vers l 287°, b 29° ; au Grand Attracteur, 674 km/s vers l 313°, b 29°, vers Shapley ; à Shapley, bassin de Shapley.
  - Snapshot : `basin` (avec la position `at` de la lecture).

## Vérifications exécutées

- `python3 scripts/build-cf4-basins.py` : assertions des conventions (scan, attracteurs, volumes).
- `node scripts/validate-cf4-basins.mjs` (nouveau) : 15 PASS (intégrité, décodage, attracteurs, Voie lactée dans Laniakea, aller-retour SG, volumes, dipôle, accords, surface fermée, troncature SDSS, convergence des lignes, pas d'extrapolation).
- `validate-basins-ui.cjs` (nouveau, SwiftShader) : 7/7, aucune erreur ; carte au niveau 3, options, non-chargement au Groupe local, cockpit au Grand Attracteur et à Shapley.
- `validate-cosmos.cjs` (copie hors dépôt) : 10/10, aucune erreur. **Correction** : le 12 octobre, j'avais écrit 16/16 pour ce test, mais il compte 10 contrôles. C'est corrigé dans le relais du 12.
- Les 19 suites numériques, `validate-cf4-reconstructions.py`, les textures et les données de référence passent.

## Limites et suite

- **Une seule reconstruction**, la version non groupée de 2023. La version groupée range Laniakea dans Shapley ; Valade et al. 2024 n'est pas public.
- **Lignes de courant** : elles suivent le champ actuel ; ce ne sont pas des trajectoires. Les vitesses sont reconstruites à partir de distances, pas mesurées en 3D.
- **Côté cockpit** : pas encore de surfaces ni de lignes dans le ciel, seulement le bandeau. La carte embarquée du cockpit ne montre pas les bassins.
- **Possible ensuite** : la version groupée en couche distincte, avec comparaison explicite ; les lignes de courant dans la carte du cockpit.
