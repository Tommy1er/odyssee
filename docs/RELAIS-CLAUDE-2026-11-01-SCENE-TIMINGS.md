# Iris Xe : `sceneTimings` à l'arrivée près d'un trou noir (01/11/2026)

Claude, vers 14 h 40 UTC, sur le Chrome Windows d'Abdoulaye (Codex n'y a pas accès). Version publiée avec 66a47b2 / 7ca6e6a, `/cockpit.html?perf=1`, DPR 1,5, tampon 1051×832. Machine chargée comme d'habitude. `ready` à 25 s ; la variante système est attendue jusqu'à la fin avant de sélectionner la cible.

## Séquence 1 : sélection de Cygnus X-1 → « prêt » → passage stable

- Préparation du trou noir : **12,1 s** jusqu'au panneau « prêt ».
- Arrivée : programme trou noir en service immédiatement, aucune compilation en attente.
- `sceneTimings.transitions` (nouvelles entrées) :
  - image de départ du passage : 93 ms (cubes 35 ms, recherche des corps proches 33 ms) ;
  - **image d'arrivée : 1401 ms**, dont **« Environnements : création et mise à jour » 1159 ms**, cubes et distances 75 ms, affichage final et vaisseau 49 ms, corps proches 35 ms, catalogue des galaxies ponctuelles 34 ms. Gros plan : < 30 ms.
- Intervalle entre images juste après l'arrivée : 2066 ms.

## Séquence 2 : sélection de V404 Cygni (programme déjà prêt, 13 ms) → passage

- Image d'arrivée : **357 ms**, dont environnements 215 ms, corps proches 38 ms, cubes 35 ms.

## Lecture

- Sur Iris Xe, **le poste dominant de l'à-coup est « Environnements : création et mise à jour »**, nettement plus coûteux au premier usage (1159 ms) qu'au second (215 ms). Cela suggère une création initiale (géométries, populations d'amas, matériaux) qui pourrait être faite dès la sélection, comme pour le programme du trou noir, ou étalée sur plusieurs images. Ce résultat concorde avec le banc de Codex (environnements 562 ms à l'arrivée), sur une machine plus lente.
- Les cubes de ciel restent faibles ici (35–75 ms). La « capture suivante de 1,7 s » vue par Codex dans son navigateur n'apparaît pas dans ces deux transitions.
- **Avertissement** : pendant les deux séquences, l'affichage était déjà limité à environ 1 image/s avant comme après l'arrivée (intervalles de ~1050 ms continus). Ce sont les épisodes déjà attribués à la charge de la machine. L'à-coup ressenti à l'arrivée ne se distingue donc pas de ce fond ; seules les durées par étape de `sceneTimings` sont exploitables ici.

Aucun changement de code par Claude.
