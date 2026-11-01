# Iris Xe : la pause à la sélection d'une nébuleuse vient du **premier dessin** de programmes déjà compilés (01/11/2026, soir)

Claude, Chrome Windows d'Abdoulaye, version publiée avec c493350 (inclut cce6091), `/cockpit.html?perf=1`, DPR 1,5, tampon 1051×832, profil Équilibré (restauré en fin d'essai). Aucun GLSL n'a changé depuis cce6091 : le cache de programmes ANGLE était donc **chaud**. `ready` à 32 s.

## 1. Pause reproduite et localisée

Depuis le Soleil : sélection de la Tarentule (107 ms, pas de dessin du nuage à ce moment), puis Proxima (130 ms), puis **resélection de la Tarentule** :

| Image | Durée | Détail `sceneTimings` |
|---|---|---|
| Resélection de la Tarentule | **5986 ms** | **Dessin nuage 2865 ms** ; **Composition optique finale 2969 ms**, `composite` = { variante « corps du système + nuage », `programsBefore` 14, `programsAfter` 14 } ; corps proches 80 ms ; cubes 45 ms |
| Images suivantes | 2 à 84 ms | nuage et composition ≈ 0–1 ms de soumission |

`flightPerformance().passes` après coup : « Nuage : émission 1052×833 » GPU 1,6 ms en moyenne (max 3), **CPU max 2864 ms** ; « Optique ordinaire (corps du système + nuage) » GPU 10,3 ms (max 13), **CPU max 2969 ms**.

À noter : depuis le Soleil, la Tarentule est petite à l'écran, la passe nuage tourne donc en **pleine résolution (1052×833)**.

**Lecture :**
- Le coût est **unique et côté soumission CPU**, au premier dessin de chacun des deux programmes. Le GPU n'est pas en cause (1,6 et 10,3 ms ensuite).
- Le nombre de programmes Three est stable (14 → 14) : aucune compilation Three nouvelle. C'est cohérent avec un **travail différé du pilote ANGLE/D3D11 au premier dessin** (création de l'exécutable ou de la variante de pixel shader propre au format de sortie, par exemple la cible MRT half-float du nuage), qui n'est visiblement **pas couvert par le cache de programmes** : il réapparaît dans une nouvelle session avec un cache chaud.
- La « non-reproduction » de l'après-midi (db41547) s'explique : le nuage n'avait pas encore été dessiné au moment de la sélection mesurée. Ce n'est pas qu'un effet de première utilisation après une publication.
- À l'arrivée à la Tarentule ensuite : image de 699 ms, dont **« Dessin Groupe local » 549 ms**, probablement le même phénomène pour la passe du Groupe local.

**Piste de correction :** faire un **dessin de préchauffage** de chaque programme coûteux, dans une cible de même format (1×1 ou rognée au ciseau), juste après sa compilation et à un moment choisi : démarrage, inactivité, ou pendant la préparation de la destination. Cela vaut pour la passe nuage (MRT), la passe Groupe local et les variantes optiques composites (`sc`, `c`, `s`). Le coût ne disparaît pas, il est déplacé hors des moments sensibles. Mesurer si un préchauffage 1×1 suffit à déclencher la création complète.

## 2. Profils et adaptation (c493350) à la Tarentule, 8 s par profil

| Profil | Taille des passes nuage / groupe | Budgets adaptés (cible initiale) | Temps GPU médian nuage / groupe |
|---|---|---|---|
| Performance | 287×227 / **248×197** | 65 536 / **49 152** | 8,7 / 8,2 ms |
| Équilibré | **431×341** / 431×341 | **147 456** (262 144) | 23,5 / 27,9 ms |
| Qualité | **610×483** / 610×483 | **294 912** (≈ 75 % par dimension, plafond 524 288) | 42,1 / 56,6 ms |

- **L'adaptation à faible cadence fonctionne** : `medianGpuMs` est rempli en quelques secondes, et les budgets descendent (Équilibré 262 k → 147 k, groupe en Performance 65 k → 49 k).
- **Qualité est désormais distinct** d'Équilibré (610×483 contre 431×341).
- En Performance, les temps médians (≈ 8 ms) sont proches de la cible du profil (8 ms). En Équilibré et en Qualité, ils restent au-dessus de leurs cibles (12 / 20 ms) au bout de 8 s ; l'adaptation continue de descendre.
- Images/s toujours non interprétées (machine chargée).

Aucun changement de code par Claude.
