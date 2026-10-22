# Missions locales et nébuleuses vues sous d’autres angles

Base : 59c5dc9, publiée le 22 octobre. Chantier confié à Codex par Abdoulaye.

## Changements

- Mission locale versionnée, distincte des préférences. Sauvegarde automatique (5 secondes, commandes, sortie de page). Reprise explicite en pause : position, impulsion, deux horloges, pilote et références de catalogue, maintien/orbite, expérience GR. Pas de temps écoulé pendant l’absence, ni reprise d’une animation de passage. Journal et trace bornés. Sauvegarde incompatible conservée jusqu’au choix d’un nouveau vol. Stockage limité à cet appareil et à cette origine.
- Terre/Lune sélectionnables directement, sans engagement implicite. À l’arrivée terrestre, bouton pour préparer la Lune. Distinction Reprendre le temps / Reprendre les commandes ; vitesse relative affichée sans promettre qu’elle reste nulle après coupure du maintien. Détails d’arrivée ne disparaissent plus après quatre secondes. Nouvelle mission rétablit l’orbite solaire initiale, pas une vitesse nulle.
- Anisotropie RGB des points de nébuleuses : intégration du même champ procédural et absorption que le volume, en directions arbitraires dans son repère local. Table latitude/longitude précalculée, interpolation continue aux coutures et pôles, rapport par canal à la vue terrestre. Le point reçoit ce rapport ; le volume conserve sa propre marche de rayons. Pas de calcul coûteux à chaque image. Données et poussière 3D hypothétiques, non observées. Les bandes qualitatives et le budget V expérimental restent inchangés.
- Serveur de développement statique acceptant les options host/port du superviseur Sites (l’ancien serveur Python refusait ces arguments).

## Vérifications avant CI

- Sauvegarde : aller-retour, reprise en pause, références résolues, continuation identique d’un trajet et d’un maintien, rejet de corruption/version/cible absente, séparation des préférences.
- Anisotropie : vue terrestre exacte, couture continue ; comparaison à une intégration plus fine (40×40×80 contre table 24×24×64), cinq directions par objet sur six morphologies : écart RGB maximal de 0,69 % Tarentule et NGC 604, 3,33 % Piliers, 0,68 % Anneau, 8,79 % Homoncule, 0,19 % Sgr B2. Ce sont des écarts numériques du modèle, pas des mesures à l’écran ou des garanties à tout angle.
- 17 contrôles points, 9 budget et 25 rendez-vous passent ; compilation réussie.
- Prévisualisation : serveur corrigé et accessible, mais WebGL désactivé dans le navigateur cloud (échec de création de contexte). Vérification graphique confiée à GitHub. Nouveau workflow dédié : reprise pendant le trajet et au maintien terrestre, poursuite vers la Lune, contrôles 390 px et captures. Le workflow graphique existant reste nécessaire pour la non-régression du ciel et de la Lune.

Ne publier qu’après lecture des résultats graphiques du nouveau lot. L’essai Samsung réel appartient toujours à Abdoulaye ; aucun GPU physique mobile n’a été testé ici.
