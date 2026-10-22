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

## Contrôle GPU et reprise de validation

- Run 39740181287 : intégration effective du shader de volume dans un framebuffer flottant, cinq directions chacune pour Tarentule et NGC 604. Écart maximal par canal au point calibré : 1,03 % Tarentule, 1,36 % NGC 604. Ceci mesure le modèle shader intégré, pas le flux final de chaque pixel écran et pas un GPU mobile physique.
- Run 39740181255 : budget imbriqué, galaxies, bassins, pouponnières et couche HDR réussis sans erreurs JS/GLSL. Interruption à la limite globale de 40 minutes pendant le contrôle lunaire, après les assertions de texture et orientation. Délai porté à 60 minutes pour laisser terminer les suites séquentielles.
- Le premier test de reprise de mission a conservé exactement les positions, impulsions et horloges en trajet puis au maintien terrestre. Son attente d’une journée échouait avec le temps en pause ; les clics forcés sont remplacés par des clics soumis aux contrôles d’accessibilité Playwright et chaque pause/reprise est maintenant immédiatement vérifiée. Les échecs enregistrent l’état physique complet.
- Commandes mobiles : retour à la ligne des groupes de boutons ; statut de sauvegarde sous les choix Terre/Lune.

## Validation finale des missions

Run 39808797973 (source 6a32206e8015a0e9579be6fea24e4a01554fc88a) : succès. 21 contrôles navigateur, aucune erreur JS/GLSL ; capture mobile 390×844 examinée. Reprise en cours de trajet et au maintien terrestre avec position, impulsion et horloges exactement conservées. Maintien pendant 1,03 journée simulée à 5,0002 rayons terrestres, puis rendez-vous lunaire à 5 rayons, vitesse relative 0,00107 m/s. Coupure du maintien et annonce de chute libre vérifiées. Contrôle GPU directionnel de nouveau réussi. Le run précédent 39808241571 avait déjà réussi le même parcours avant la dernière disposition mobile.

Artefact GitHub : mission-earth-moon, 12441530227. La sauvegarde est locale au navigateur/appareil, sans synchronisation entre appareils.

## Validation graphique finale

Run 39809181370 (source cb6e28bc26664fedf6dff2ad111139c4982f8199) : contrôles numériques, budget imbriqué, galaxies, bassins, pouponnières, couche HDR et Lune réussis. Les huit assertions lunaires passent, y compris texture complète, orientation verrouillée vers la Terre, vue dégagée et absence d’erreur. Capture moon-restored.png examinée : disque texturé et éclairé, ciel visible. Artefact cosmic-nurseries-swiftshader 12442660752. La limite globale de 40 minutes était insuffisante ; la suite complète a terminé dans le délai de 60 minutes. Les validations graphiques portent sur le code et la mise en page publiables ; les modifications ultérieures de ce relais ne changent pas le rendu.

Le budget V reste désactivé par défaut. L’écart lié au rééchantillonnage des petites sources lors de rotations de caméra n’est pas déclaré éliminé. Aucun essai sur GPU physique Samsung : reste à faire sur l’appareil d’Abdoulaye.
