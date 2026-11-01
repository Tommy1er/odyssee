# V3 — lot A : audit initial et profils graphiques

Base examinée : main 7b5eb69. Directive conservée dans docs/conception/ODYSSEE-V3-DIRECTIVE.md. Ce lot ne clôt pas toute la V3 ni la validation matérielle du lot A.

| Exigence | Conformité initiale | Éléments et limites |
|---|---|---|
| Vol libre, destination, horloges, rendez-vous | Déjà opérationnel | physics.js, navigation.js ; intégration locale, pas un pilotage FLRW |
| Référence cosmologique | Partiellement implémenté | flrw.js : distances et lookback ΛCDM plat ; H0=67,4 distinct de 74,6 dans cosmic-motion.js |
| Propagation et mouvement des galaxies | Partiellement implémenté | Lignes d'univers extrapolées, pas une évolution cosmologique complète |
| Ciel relativiste cohérent | Partiellement implémenté | Couches spectrales ponctuelles et modèles thermiques ; transferts étendus et replis approximatifs |
| Transition points / volumes | Déjà opérationnel | local-group.js, galaxy-photometry.js, extragalactic-nebulae.js ; morphologie reconstruite |
| Préparation des programmes et environnements | Partiellement implémenté | Code et tests logiciels présents ; gain Iris Xe confirmé par a5200e9 : arrivée Cygnus 1401 → 197 ms |
| Profils et adaptation GPU | Absent avant ce lot | Ajoutés ici, sans revendication de fluidité matérielle |
| P50/P95/P99 et mémoire | Partiellement implémenté | P99 ajouté ; compte du cache et évictions ; estimation des seules cibles de volume, pas toute la VRAM |
| Voyage accéléré FLRW couplé | Absent | Calculateur séparé conservé |
| Plasma d'amas, interactions, jet M87 validé | Absent / non vérifié | Aucun de ces phénomènes n'est livré ou certifié par ce lot |
| Statut observé/calculé/reconstruit/spéculatif | Partiellement implémenté | Sources et réserves dans fiches/manuel ; taxonomie uniforme pas encore appliquée partout |
| Voyage complet matériel et mobile | Non vérifié | Les suites logiciels ne prouvent pas la fluidité réelle |

## Livraison

Menu Graphismes persistant sur l'appareil, indépendant de la mission : Performance (écran ≤ 1280×720 pixels, grands volumes ≤ 256² pixels), Équilibré (1920×1080, 512²), Qualité (2560×1440, 1024×512). Ce sont des plafonds de surfaces, pas des formats imposés : aspect conservé. Les cubes et leur étalonnage photométrique restent inchangés ; les petits nuages gardent leur pleine définition.

Chaque passe de grand volume mesure au plus un dessin sur 30 via EXT_disjoint_timer_query_webgl2. Aucune attente active ni gl.finish. Médiane de cinq résultats disponibles : réduction de 25 % si coût > 1,3 fois la cible (8/12/20 ms), remontée de 20 % sous 0,6 fois la cible. Budget entre un quart et la totalité du plafond. Mesures invalides disjoint rejetées, requêtes imbriquées évitées, résultats d'un ancien profil ignorés. Sans extension : profil fixe. Cela ajuste la définition spatiale, pas les équations, populations, horloges ou vitesses.

Diagnostic ?perf=1 : P99, profil, budgets actuels, temps GPU médian, compte des environnements, évictions et estimation des octets des textures de volume. Cette estimation ignore pilotes, catalogues, géométries, textures planétaires et autres cibles.

## Validations et référence avant/après

Tests locaux exécutés : relativité, navigation, référence FLRW (12 contrôles), budgets graphiques et mesures GPU simulées (disponibilité, invalidation, absence d'imbrication, repli fixe), diagnostics WebGL, variantes optiques, démarrage GPU ; build réussi. Parcours navigateur Cygnus étendu pour changer les trois profils sans déplacement ni changement d'impulsion. Les tests graphiques existants restent nécessaires.

Avant mesuré Iris Xe par Claude : Cygnus image 1401 ms, environnements 1159 ms ; V404 image 357 ms, environnements 215 ms (e7ac80f). Après préparation anticipée (804cbff), essai logiciel : environnements 4,5 ms contre 562 ms dans l'ancien essai, mais arrivée totale encore lente par capture du ciel. Nouveau relais matériel a5200e9 : préparation de 9 environnements en 1,6 s à la sélection ; arrivée Cygnus 197 ms et Tarentule 153 ms. L'affichage reste vers 1 image/s sous charge : objectif 20–30 images/s non déclaré atteint. Pause de 2,7 s à la sélection de la Tarentule, compilation synchrone suspectée mais non prouvée ; reste à diagnostiquer.

## Suite ordonnée

Le lot A reste ouvert : mesurer les profils sur matériel, traiter la capture de ciel à l'arrivée sans mélange de faces ou photométrie incorrecte, mesurer la mémoire plus complètement et vérifier les transitions avec chaque profil. Ensuite seulement consolider les trajectoires-tests FLRW indépendantes du pilotage (lot B), puis l'immersion extragalactique (lot C) et le voyage complet (lot D). Aucun nouveau résultat scientifique n'est inventé ; sources astrophysiques existantes et licences conservées. Honnêteté du manuel : le rendu n'est pas une photo.
