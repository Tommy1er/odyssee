# Lot A : isoler la pause à la sélection d'une nébuleuse

Base : 940064d, après audit de Claude et profils graphiques V3. La pause de 2751 ms, dont 2658 ms dans « Affichage final et vaisseau », est une mesure Iris Xe de Claude. La compilation synchrone reste une hypothèse, pas une cause confirmée.

Le diagnostic sceneTimings sépare maintenant couche HDR, préparation des uniformes/corps secondaires, dessin Groupe local, dessin nuage, composition finale, repères et vaisseau. Chaque durée est un temps écoulé de soumission/attente, pas une mesure GPU isolée. Le champ composite conserve le nom de variante, la durée du dessin et le nombre de programmes Three avant/après. Un nombre stable ne prouve pas l'absence de travail différé du pilote.

Retest matériel après publication : recharger cockpit.html?perf=1, attendre le premier ciel, sélectionner la Tarentule depuis le Soleil, puis relever sceneTimings.transitions et slowFrames dans flightPerformance(). Répéter la sélection après désélection, puis comparer première utilisation et réutilisation. Conserver les mesures des passes GPU et le profil graphique. Ne pas conclure que la pause est corrigée sur la seule base de SwiftShader.

Les profils Performance/Équilibré/Qualité, l'adaptation GPU et le P99 sont déjà présents dans 940064d. Leur validation matérielle reste à faire. Cette instrumentation ne change ni résolution, ni lumière, ni navigation, et ne prétend pas supprimer les 2,7 s. Les optimisations de cache locales expérimentales ne font pas partie de ce commit.
