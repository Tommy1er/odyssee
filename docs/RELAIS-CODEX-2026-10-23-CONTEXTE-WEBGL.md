# Gel du cockpit dans le Chrome utilisateur

Retour transmis : carte et clic M31 fonctionnels, gel du cockpit avec cible M31, puis refus WebGL `Web page caused context loss and was blocked`. Le démarrage direct après redémarrage complet de Chrome reste à tester. Ce retour ne distingue pas encore un problème de shader/pilote, un excès de charge ou une autre cause.

## Mesures appliquées

- Écoute de `webglcontextcreationerror` avant la construction de WebGLRenderer sur les deux pages. Conservation de `statusMessage`, même après l’exception générique de Three.js.
- Écoute de `webglcontextlost` et `webglcontextrestored`. Arrêt de la boucle de rendu, et mise en pause de la simulation du cockpit. Pas de relance automatique après restauration : rechargement explicite pour reconstruire les ressources et les caches.
- Message de fermeture complète de Chrome uniquement si le diagnostic contient `blocked`. Les textes du navigateur ne sont pas interprétés comme du HTML.
- Plafond de 2 073 600 pixels pour le rendu plein écran du cockpit. Le facteur précédent pouvait atteindre 2 dans chaque dimension. À 3840 × 2160 pixels CSS et DPR 2, la surface passe de 33,2 millions à 2,07 millions de pixels. La résolution du cube photométrique reste inchangée. C’est une réduction de charge, pas une preuve de correction de la cause du gel.

Le démarrage utilise plusieurs passes : calcul de la Voie lactée sur six faces, fond diffus sur six faces, ciel ponctuel sur six faces, shaders plein écran et vue du vaisseau. L’inspection n’a pas établi de boucle infinie sur le catalogue. On ne peut pas déduire la cause exacte d’une seule perte de contexte.

## Validation et limite

Tests DOM : raison précise conservée après exception générique, message `blocked`, perte/restauration, arrêt persistant, texte hostile échappé, retrait des écouteurs. Tests du plafond à plusieurs tailles jusqu’à 8K. Compilation locale réussie.

Ajout d’un test navigateur pour démarrage direct puis M31, capture, perte/restauration réelle avec l’extension de test WebGL. Les validations GitHub utilisent SwiftShader : elles ne valident pas le comportement du pilote graphique de l’utilisateur.

À retester sur le GPU concerné après fermeture complète de Chrome : cockpit direct, puis M31. Si le gel persiste, relever GPU/pilote, taille du rendu et diagnostic. Ne pas considérer le seul succès des suites logicielles comme résolution de cet incident.
