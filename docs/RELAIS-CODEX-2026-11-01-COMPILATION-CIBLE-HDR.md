# Préparer les passes volumétriques dans leur vraie cible HDR

Base main 6d2f84b, après c493350. La pause de sélection à cache froid n'est pas encore reproduite avec le diagnostic détaillé ; la cause matérielle précise reste ouverte.

Défaut identifié dans le code : prepareCloud et GroupPass.prepare appelaient compileAsync avec la cible courante (normalement l'écran), alors que le dessin utilise un WebGLRenderTarget HDR. Dans la version Three.js du dépôt, WebGLPrograms.getParameters donne outputColorSpace = renderer.outputColorSpace sur écran, et LinearSRGBColorSpace sur cible ordinaire ; cette valeur entre dans getProgramCacheKey. Préparer le programme sur écran ne prépare donc pas nécessairement celui du premier dessin HDR. Ceci justifie une correction indépendamment de la mesure Iris Xe, mais ne prouve pas que cela explique ses 2,7 s.

compileForTarget active la cible HDR propre à la passe, soumet compileAsync puis restaure immédiatement cible/face/mipmap, viewport logique et physique, scissor et son activation, avant d'attendre la promesse. Aucun rendu ni gl.finish ajouté, pas de cible conservée active pendant la compilation en arrière-plan. Nuage (deux sorties émission/transmission) et Groupe local utilisent cet appel. Physique, résolution, lumière et commandes inchangées.

Tests : vérification de la cible de compilation, restauration immédiate alors que la promesse attend encore, erreurs synchrones et asynchrones ; tests de variantes optiques et démarrage ; build. Les suites navigateur des volumes comparent le nombre de programmes avant/après leur premier dessin HDR après préparation : aucune seconde compilation attendue. Les contrôles photométriques et DPR 1/1,5/2 existants sont conservés.

Validation matérielle restante : premières sélections depuis Soleil et Cygnus, avec diagnostic, en distinguant première utilisation et cache chaud. Les programmes Three stables ne prouvent pas l'absence de travail différé du pilote. Ne pas annoncer la pause corrigée sans mesure réelle.
