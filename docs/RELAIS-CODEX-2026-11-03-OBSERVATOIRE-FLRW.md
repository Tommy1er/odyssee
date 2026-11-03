# Lot B — premier observatoire FLRW indépendant

Base 8a60d06 ; aucun nouveau relais matériel depuis f69ac41. Le lot A reste ouvert pour la validation réelle de l'échauffement 9ba78e1, la fluidité et la mémoire complète. Aucun nouvel objectif matériel n'est déclaré atteint. Le présent lot développe le calculateur et les trajectoires-tests indépendants demandés par la directive V3, sans couplage au vaisseau.

## Fonctionnalité

cosmology.html est accessible depuis le manuel et le dialogue Physique du cockpit. Entrée z cosmologique idéale entre 0 et 2 ; paramètres Planck H0=67,4, Ωm=0,315, ΩΛ=0,685, rayonnement négligé. Tableau : distance comobile, distance propre de la source à l'émission, distance de luminosité, distance angulaire, lookback et facteur d'échelle. La convention CF4 H0=74,6 reste distincte et inchangée.

Une trajectoire radiale nulle est intégrée en facteur d'échelle, séparément de la quadrature en redshift du calculateur : dχ/da = −c/(a²H(a)), dt/da = 1/(aH(a)). Le graphe montre la distance propre du photon et celle d'une source comobile idéale, en fonction du temps cosmique depuis l'émission. Un curseur parcourt les événements, à pas de facteur d'échelle, pas à pas de temps égaux. Le photon arrive aujourd'hui en χ≈0 ; le résidu numérique est affiché sans le confondre avec une incertitude astronomique.

Ce n'est ni une simulation de fusée, ni une reconstruction d'une galaxie particulière, ni un ajout de flot de Hubble aux systèmes liés. Aucune navigation, horloge de mission, coordonnée catalogue, lumière du cockpit ou sauvegarde ne change. Pas de vitesses particulières, de courbure spatiale, de lentille, de champ local, de plasma ou d'évolution galactique. La page n'exige pas WebGL.

## Sources et validation

Hogg, Distance measures in cosmology, arXiv:astro-ph/9905116, sections distance comobile et lookback (NED : https://ned.ipac.caltech.edu/level5/Hogg/Hogg_contents.html) ; Planck 2018 VI, arXiv:1807.06209, paramètres de référence. Liens dans la page ; aucune image ni donnée propriétaire nouvelle.

Tests locaux exécutés : 12 contrôles FLRW préexistants ; nouvelles trajectoires complètes comparées aux solutions analytiques Einstein-de Sitter (Ωm=1) et de Sitter (ΩΛ=1), réception, convergence de pas, temps monotone, comobile décroissant, distance propre pouvant d'abord croître pour un photon entrant, unités et paramètres invalides. Relativité et navigation existantes passent ; build réussi. La vérification de valeurs finies des densités cosmologiques a aussi été renforcée.

Nouvelle CI cosmology.yml : calculs puis navigateur desktop/mobile, entrées invalides, exemples, curseur à réception, courbes finies, absence de débordement et sentinelle de stockage. Captures et JSON dans l'artefact cosmology-observatory. Les résultats numériques ne prouvent ni la fluidité du cockpit ni un modèle de fusée FLRW.

Suite : garder le test matériel de l'échauffement ouvert ; compléter les trajectoires-tests et les référentiels avant toute intégration au pilotage. Les lots C (immersion, M87/amas) et D (voyage complet, validation matérielle) ne sont pas livrés par ce lot.
