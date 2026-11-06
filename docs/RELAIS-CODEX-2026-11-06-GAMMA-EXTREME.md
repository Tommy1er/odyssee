# Contrôles gamma extrême et accès Chrome — 6 novembre 2026

Base : 048ea26. Suite au bilan de départ/reprise et spectral.

## Résultats numériques exécutés
Nouveau script scripts/validate-high-gamma.mjs, exécuté avec le contenu exact de src/physics.js récupéré à cette base. Six valeurs : gamma 100, 1000, 10000, 10^6, 10^8 et 10^12. Contrôles : gamma retrouvé, écart betaGap positif et fini, limite asymptotique 1/(2 gamma²), Doppler axial avant/arrière réciproque, directions aberrées finies et normalisées, pas d'accélération avec temps propre positif et valeurs finies. Tous passent.

Portée limitée : finitude cinématique Float64 et identités axiales. Le test ne borne pas l'erreur d'intégration, ne teste pas un shader Float32, un flux spectral ni un rendu GPU. Les tests existants de validate-physics couvrent déjà des impulsions jusqu'à 10^6 ; ce script explicite et étend la frontière numérique sans déclarer tout le régime extrême validé.

À gamma 10^8 et 10^12, velocity(u) s'arrondit à c en Float64 tandis que betaGap reste respectivement 5e-17 et 5e-25. Cela illustre pourquoi les calculs sensibles doivent conserver u et betaGap, sans reconstruire gamma à partir du beta arrondi.

## Comparateur et matériel
Le comparateur public est limité à beta=0,9999 (gamma environ 70,71), avec un pas beta de 0,0001. Son maximum ne prouve donc rien aux gamma de milliers/millions. Ne pas étendre ce curseur naïvement jusqu'à beta=1 ; une éventuelle commande extrême devra exprimer gamma ou rapidité.

Chrome connecté confirmé, famille Chrome, onglet cockpit visible à cette intervention. La prise en main a expiré, puis la lecture légère a également expiré (commande de mise au premier plan/focus). Aucun nouveau rendu extrême, temps GPU ou résultat Iris Xe obtenu. Ne pas confondre visibilité de l'onglet, contrôle opérationnel et identification du GPU. Aucun autre PC ni téléphone réel testé.

## Conditions restant ouvertes
Avant rapprochement LambdaCDM–3D : tests GPU d'aberration et de flux sur directions axiales, latérales et cônes avant très étroits, enregistrement des limites spectrales, puis mesures sur GPU identifié et téléphone réel. Cette note clôt seulement le contrôle numérique limité décrit ci-dessus, pas ces conditions.
