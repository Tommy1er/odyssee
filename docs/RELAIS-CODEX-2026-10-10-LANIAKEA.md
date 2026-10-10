# Relais Codex → Claude · catalogue extragalactique · 10 octobre 2026

Base : `39db28c`, travail sur `main`, à la demande d’Abdoulaye pendant ton absence. Première tranche de la phase C : carte d’observations et provenance. Les modèles de vol, de nébuleuses et de photométrie sont conservés.

## Ce qui est intégré

Dans `cosmos.html` (Échelles cosmiques), un seul catalogue observé actif à la fois :

- McConnachie 2012 : 101 entrées positionnées sur 102 (la Voie lactée, sans distance dans cet export, est exclue, pas mise à zéro). Les associations et candidats sont ceux du catalogue historique, pas une classification actualisée.
- UNGC 2013 : 869 entrées, distances compilées ; la colonne d’erreur manque dans cet export et n’est pas inventée.
- CF4 2023, table 2 : 55 877 identifiants PGC uniques. Position radiale `10^((DM−25)/5)` Mpc ; intervalle asymétrique obtenu en transformant DM±e_DM ; méthodologies, vitesse radiale CMB et PGC dominant du groupe conservés. Aucun calcul `cz/H0`, aucun champ de vitesse particulière inventé.

Le mode « Selon l’échelle » charge McConnachie au niveau Groupe local, UNGC au niveau Vierge, CF4 aux niveaux suivants. Sélection manuelle possible. Recherche, rayon maximum au Soleil, filtre e_DM, liste plafonnée à 60 (tous les résultats filtrés restent dessinés), clic sur le symbole, fiche et segment d’incertitude radial. Cercles de distance et plan SGZ=0 avec vue du dessus. Axes J2000 cohérents avec la carte existante ; transformation supergalactique vérifiée contre SGL/SGB fournis indépendamment dans CF4.

**Les points représentent des entrées de catalogue, pas leurs dimensions, leur luminosité ni leurs formes 3D résolues.** Un clic explore leurs coordonnées et leur voisinage. Le transfert vers le cockpit est masqué pour ces nouvelles entrées : le moteur de galaxies du cockpit est encore limité à quatre galaxies et au modèle synthétique des structures. L’afficher maintenant ferait promettre une visite détaillée inexistante. Les anciennes destinations du cockpit fonctionnent toujours.

Les populations synthétiques de la carte sont désactivées par défaut, tout comme les filaments schématiques. Une option permet de les revoir. Les repères de structures et leurs enveloppes restent disponibles, avec avertissement qu’ils ne sont pas des frontières mesurées. `CosmicScene.update(...,{synthetic:false})` ne touche pas au comportement par défaut du cockpit.

## Données et reproductibilité

`scripts/build-extragalactic.py` utilise exclusivement les exports VizieR déjà fournis dans `data/references-2026-10-04`. SHA-256 et effectifs d’entrée vérifiés avant transformation. Il génère trois JSON compacts dans `public` ; chaque fichier contient champs, provenance, hash d’entrée et exclusions. Pas de réseau au lancement du site, sauf chargement des ressources hébergées avec lui. Pas de fusion implicite des catalogues : leurs effectifs ne constituent pas un décompte de galaxies uniques combinées. 2MRS reste hors du rendu jusqu’à une association robuste et un choix explicite de modèle de distance.

Modules : `extragalactic-data.js` (unités, décodage, recherche, axes), `observed-galaxies.js` (symboles, sélection, intervalle, plan), intégration `cosmos.js`. Les positions GPU sont exprimées en millions d’al ; ce lot n’ajoute pas d’astres planétaires à ces coordonnées et ne résout pas la précision hiérarchique du cockpit.

## Validations

- `node scripts/validate-extragalactic.mjs` : 18 contrôles (effectifs, identités, distances, incertitudes, coordonnées, transformation SG comparée au catalogue, filtrage, sélection 3D, remplacement de géométrie, maintien des repères sans populations fictives).
- `node scripts/validate-catalogue-ui.mjs` : 8 contrôles réussis, intégration des contrôles dans un DOM Node ; rendu WebGL remplacé par un stub. **Ce test ne valide ni les shaders ni l’apparence à l’écran.** `jsdom` est une dépendance de développement, jamais embarquée dans les bundles.
- Les 15 suites numériques passent (14 existantes + nouvelle suite extragalactique) ; leurs rapports historiques sont préservés. Construction réussie.
- Le navigateur de validation géré n’est pas disponible dans cet environnement. Contrôle visuel GPU à effectuer chez toi : trois relevés, choix d’une galaxie, intervalle orange, rotation SG, mobile, vue dégagée, échec de chargement puis réessai. L’ancien test cosmos attendait des maillages synthétiques actifs : son assertion utilise désormais `referenceMarkers` pour distinguer repères visibles et géométries optionnelles ; il n’a pas été exécuté ici.

## Limites importantes / suite

1. Une sphère de rayon donné autour du Soleil n’est pas la frontière de Laniakea ; aucune entrée n’est attribuée automatiquement à ce bassin.
2. Les erreurs individuelles et la sélection des relevés empêchent de lire cette carte comme une reconstruction exacte de densité. Les distances CF4 ne sont pas transformées en positions comobiles FLRW ni en temps de trajet.
3. Pas de simulation d’expansion, de galaxies futures ou de lignes de flux. Intégrer ensuite une reconstruction de bassins/flux avec version, unités, axes et incertitudes explicites (notes du 4 octobre), séparée de ces observations.
4. 2MRS : association documentée aux PGC / distances, gestion des ambiguïtés et du référentiel de cz avant utilisation. Pas de simple superposition des 44 599 entrées.
5. Visites cockpit : prévoir stockage hiérarchique / recentrage et rendu de galaxies à distance connue sans inventer une morphologie « mesurée » ; ajouter seulement ensuite le transfert d’une entrée de la carte au vaisseau.

## Références consultées

- Tully et al. 2023, Cosmicflows-4 : https://arxiv.org/abs/2209.11238 ; schéma et unités : https://cdsarc.cds.unistra.fr/viz-bin/ReadMe/J/ApJ/944/94?format=html
- UNGC : https://cdsarc.cds.unistra.fr/viz-bin/cat/J/AJ/145/101
- McConnachie : https://cdsarc.cds.unistra.fr/viz-bin/cat/J/AJ/144/4
- Définition du repère supergalactique, pôle galactique (47,37°, 6,32°) : https://docs.astropy.org/en/latest/_modules/astropy/coordinates/builtin_frames/supergalactic.html
