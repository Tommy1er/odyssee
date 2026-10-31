# Préparer le trou noir dès la sélection

Suite au relais Iris Xe de Claude 9093c30. Le centrage DPR 1,5 et les deux passes réduites sont confirmés sur la machine utilisateur. Les minima de passes ne doivent pas être interprétés comme une cadence garantie.

## Comportement

- Dès la sélection d'un trou noir, si les lentilles gravitationnelles sont activées et qu'un premier ciel est déjà compilé, le programme géodésique se prépare en arrière-plan. Une cible choisie avant le premier ciel est prise en compte après cette première préparation. Aucun programme de trou noir n'est lancé pour une cible ordinaire.
- Le panneau de destination indique « Préparation du rendu du trou noir… Tu peux commencer le trajet. », puis « Rendu du trou noir prêt pour l’approche. ». La fin de compilation n'active pas le shader à distance et ne modifie ni la cible, ni la position, ni la mission.
- Une même promesse de compilation est partagée entre sélection, changements de cible et arrivée. Après compilation, le programme est réutilisé dans cet onglet pour les autres trous noirs. Le modèle et les calculs du shader ne changent pas.
- Si l'arrivée est trop rapide (téléportation immédiate notamment), seule la compilation restante est attendue. Il n'y a pas de fausse image sans lentille près du trou noir. Ce lot ne raccourcit pas le travail du pilote : il l'anticipe.
- Une erreur est conservée dans le diagnostic, sans relance en boucle à chaque image. L'approche ne considère pas un programme en échec comme prêt. Le panneau propose un rechargement.

## Diagnostic et validation

Avec `?perf=1`, `flightPerformance().blackHolePreparation` contient status (idle/compiling/ready/error), startedAt, finishedAt ou error. Les horodatages sont relatifs à performance.now(), en millisecondes. pendingOptics et variantError restent disponibles.

Tests numériques : premier ciel prioritaire, cible ordinaire/lentille désactivée, préparation distante non bloquante, promesse unique, arrivée avant la fin, changement de cible pendant la préparation, réutilisation et échec sans relance.

Test navigateur ajouté : cockpit normal puis sélection Cygnus X-1 sans mouvement du vaisseau, préparation, désélection/résélection, passage stable et utilisation du même programme préparé. Validation SwiftShader ; les temps Windows/ANGLE et la fluidité doivent être vérifiés sur Iris Xe.

## Retest Iris Xe

1. Recharger le cockpit avec `?perf=1`, attendre le ciel.
2. Sélectionner Cygnus X-1 depuis le Soleil sans téléportation immédiate. Mesurer startedAt/finishedAt et la réactivité pendant la préparation.
3. Quand le panneau indique prêt, ouvrir le passage stable. Vérifier l'activation du programme sans nouvelle compilation de 20–44 s.
4. Une arrivée immédiate peut encore attendre ; ce n'est pas une promesse de suppression universelle du délai.
