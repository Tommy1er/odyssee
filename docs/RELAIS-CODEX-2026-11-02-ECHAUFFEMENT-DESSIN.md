# Échauffement des premiers dessins — lot A

Base f69ac41. Le relais matériel décrit un premier dessin nuage de 2865 ms et une composition sc de 2969 ms, avec programmes Three stables. Le correctif 69e1575 avait préparé les programmes dans les vrais formats HDR ; il ne faisait pas de dessin. Aucun résultat matériel après le présent lot n'est encore disponible.

Après le premier ciel, préparation proactive des variantes ordinaires s, c et sc, ainsi que du Groupe local HDR et du nuage MRT. Chaque programme compilé reçoit un dessin d'un pixel dans son format réel. Les variantes finales utilisent le framebuffer écran réel, pour conserver la clé du programme ; ce pixel est recouvert par le dessin normal de la même image. Les passes intermédiaires utilisent leur vraie cible HDR. Pas de synchronisation gl.finish, pas de lecture de pixels.

Une file commune exécute au plus un dessin d'échauffement par image de vol avant l'affichage normal. Les variantes ordinaires ne sont déclarées prêtes qu'après ce dessin. Une variante déjà affichable sert de repli pendant l'attente, selon le mécanisme existant. Groupe local conserve son intégration directe jusqu'à ce que la passe réduite soit prête. Le trou noir reste compilé à la sélection ; il n'est pas ajouté à la préparation générale de démarrage.

Interface : message « Préparation graphique initiale » tant que le travail n'est pas terminé. Diagnostic : ordinaryPreparation et drawWarmup.history, dont les durées sont des temps de soumission écoulés, pas des mesures GPU isolées. Les erreurs restent visibles dans le diagnostic. En mode carte, la file attend le retour au vol : aucune promesse de préparation hors rendu actif.

Limites : le coût du premier dessin est déplacé vers la préparation initiale, pas supprimé. Le pilote peut encore bloquer pendant cette préparation. Un pixel ne prouve pas que tous les travaux différés sont achevés pour tous les formats/dimensions et toutes les branches exécutées ensuite. Aucun gain matériel ou objectif d'images/s n'est revendiqué sans retest. Les lois physiques, budgets graphiques et catalogues restent inchangés ; légère hausse possible du temps et des programmes préparés au début.

Tests locaux : variantes optiques, diagnostics WebGL, restauration cible/viewport/scissor/autoClear pendant un dessin d'un pixel, restauration après erreur, une seule tâche par passage de file et erreurs ; build. Le navigateur Cygnus attend aussi ordinaryPreparation ready et au moins cinq dessins réussis avant le parcours existant. Les mesures photométriques HDR et les suites carte/contexte restent requises.

Essai matériel utile une fois publié : attendre la fin du message initial, relever drawWarmup et ses durées, sélectionner Tarentule depuis Soleil puis Proxima puis Tarentule, comparer première sélection/réutilisation, et arriver dans LMC. Vérifier les étapes nuage, Groupe local et composition dans sceneTimings. La mission n'est pas modifiée par l'échauffement.
