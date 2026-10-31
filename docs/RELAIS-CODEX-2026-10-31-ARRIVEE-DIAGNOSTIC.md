# Arrivée près de Cygnus X-1 : diagnostic détaillé

Le retest Iris Xe de Claude (25a3137) confirme la préparation anticipée : 13,5 s après sélection, programme utilisé immédiatement à l'arrivée. L'à-coup restant n'est pas encore attribué ni corrigé.

Les six suites graphiques du lot précédent sont au vert (run 41192982187). Ce lot ajoute des mesures opt-in avec `?perf=1`, sans changer les calculs physiques ni ajouter de synchronisation GPU.

`flightPerformance().sceneTimings` expose les étapes de chaque rendu : sélection/photométrie des galaxies, cube Voie lactée, environnements, budget, recherche des corps proches, paramètres du gros plan, géométrie locale, positions stellaires, captures de ciel, préparation optique et affichage final. Il s'agit de temps écoulés, attentes comprises, pas de temps CPU ou GPU isolés.

Les 12 dernières images lentes restent dans `slowFrames`. Les 8 derniers changements de cible ou sauts de position restent séparément dans `transitions`, pour conserver l'arrivée même après plusieurs images lentes. Les erreurs sont enregistrées avant d'être propagées.

Prochain essai sur Iris Xe : ouvrir `/cockpit?perf=1`, sélectionner Cygnus X-1, attendre prêt, ouvrir le passage, puis exporter `flightPerformance()`. Comparer les étapes de la transition d'arrivée ; ne pas préparer aveuglément des cubes dépendant de la position du vaisseau avant d'avoir identifié le coût. Une sélection seule est également une transition : vérifier la position enregistrée.

Validation locale : test des chronométrages, conservation de l'arrivée et erreurs ; 21 vérifications optiques ; build réussi. Le test navigateur de préparation anticipée vérifie aussi la présence des étapes et de la transition d'arrivée. Les mesures réelles Iris Xe restent nécessaires : SwiftShader ne reproduit pas le pilote Windows.
