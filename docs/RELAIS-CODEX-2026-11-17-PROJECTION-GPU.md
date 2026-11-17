# Rayon observateur : projection avant quantification — 17 novembre 2026

## Correction applicative

`e75397d` intègre le calcul du rayon dans un repère de boost, préparé en Float64
dans `src/observer-projection.js`. La position projetée de l'axe est transmise en
deux parties Float32, en coordonnées de pixels. Le shader soustrait cette position
à `gl_FragCoord` avant de reconstituer les petites composantes transverses.
L'aberration se fait dans ce repère ; la rotation vers le catalogue vient ensuite.

Le nouveau chemin s'active à gamma >= 10 000, optique active, lorsque l'axe avant
est projeté dans le viewport. Les autres cas conservent le chemin historique.
Il est partagé entre la composition finale, CloudPass et GroupPass. Le viewport
physique est recalculé pour chaque passe, avec sa taille et son origine ; la
préparation travaille sur quelques vecteurs, sans parcourir les catalogues.

`07196ca` corrige un défaut d'intégration révélé par les bancs isolés : les deux
passes HDR doivent aussi initialiser ces uniformes lorsqu'elles sont construites
sans SkyOptics. Les entrées existantes restent partagées. Le test Node
`scripts/validate-observer-projection.mjs` vérifie ce contrat et les changements
de viewport, l'optique désactivée, le repos et l'axe arrière.

Aucun CSS modifié par ce lot. Le correctif d'empilement de Claude reste conservé.

## Banc GPU et domaine exact

`scripts/validate-observer-projection-gpu.cjs` utilise le snippet GLSL et la
préparation des uniformes de production. La référence indépendante part des
angles de la grille avec les identités de demi-angle/rapidité. Des matrices
caméra orthonormées véritables placent les rayons aux pixels échantillonnés.

- gamma : 1 ; 1.000001 ; 100 ; 10^4 ; 10^6 ; 10^8 ; 10^12.
- trois axes, cinq plans de rayons, dont les deux plans historiques.
- trois viewports : 961 × 701, 1280 × 585, 403 × 257, origine décalée (7, 11).
- pixels centraux et décentrés ; sept angles par configuration.
- quinze contrôles supplémentaires avec optique désactivée à gamma 10^6.
- cible WebGL2 RGBA32F ; moteur ANGLE/Vulkan SwiftShader (logiciel).
- seuils inchangés : erreur euclidienne de direction < 0.005 ; erreur absolue
  log2(D) < 0.005. Chaque cas doit être fini et dans les deux seuils.

Premier passage : 450/450 (CI 44188860336, `e75397d`). Le banc élargi `fad1c5f`
inclut explicitement les deux plans historiques : **750/750**, erreur maximale
de direction 0.0012294483, erreur maximale log2(D) 0.0009011157.
Preuve : https://github.com/Tommy1er/odyssee/actions/runs/44189518075.

Le banc historique est conservé comme référence du chemin hérité : 98 cas,
90 dans les seuils, huit limites obliques inchangées. Il ne représente plus à
lui seul le chemin complet de production. Les huit limites restent archivées ;
elles ne sont ni supprimées ni transformées artificiellement en réussites.

Ce résultat porte sur des rayons, caméras et pixels échantillonnés. Il ne valide
pas toutes les orientations, tous les zooms, les spectres, les flux intégrés,
le ciel complet à gamma 10^12 ni les performances sur Iris Xe/téléphone. Les
galaxies ponctuelles HDR conservent leur banc séparé et leur extrapolation
thermique hors du domaine spectral empirique KC96.

## Régressions et publication

Les suites numériques cœur, les variantes optiques, les budgets de rendu et les
contrats d'initialisation passent localement. La construction est réussie.

Les résultats finaux de CI et la publication sont consignés ci-dessous une fois
terminés. Aucune réussite du cockpit complet n'est déduite du seul banc GPU.

## Résultats enregistrés pendant la validation

- Le dernier banc GPU, sur `07196ca`, passe 750/750 : run 44189794302, job 134415823608, artifact 14376650694. Rapport complet archivé dans `validation/reports/observer-projection-gpu-2026-11-17.json`.
- Les six jobs de carte/cockpit spécialisés passent sur `07196ca` : run 44189794417, dont CloudPass et GroupPass. Les échecs initiaux d’initialisation standalone sur e75397d sont corrigés ; ils ne sont pas ignorés.
- La suite spectrale complète et la capture lunaire passent sur `e75397d` : run 44188860386. Le correctif suivant ne change que l’initialisation des uniformes dans les passes standalone et les tests ; les uniformes du cockpit sont déjà créés par SkyOptics.
- Le relais de chute radiale `9aacd0a` confirme 17 contrôles sur `ee6fbe4`, et la publication réussie de la version 52 avec l’empilement de Claude.

La version 53 est enregistrée (source Sites `fcbbe1f353cbba9ac115b1f7a0d58f953f71fa0c`). Son déploiement attend les régressions restantes.

- Sauvegarde/reprise, directions des nébuleuses et rendez-vous : success sur `07196ca`, run 44189794288.
- Cinq jobs de validation reproductible sur `e75397d` : success, run 44188860197. Le cockpit (job 134412562098) termine les 17 contrôles sans erreur navigateur/shader, dont chute radiale, solution analytique, énergie géodésique, reprise manuelle et vue mobile.
- Sur `07196ca`, numérique, propulsion, voyage cosmologique et cosmos passent (run 44189794322) ; le dernier passage cockpit est encore en cours à cette étape de consignation.
