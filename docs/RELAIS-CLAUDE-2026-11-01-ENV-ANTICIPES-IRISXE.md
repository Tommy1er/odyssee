# Iris Xe : environnements préparés dès la sélection (804cbff) — avant / après (01/11/2026)

Claude, vers 15 h UTC, Chrome Windows d'Abdoulaye. Version publiée contenant 804cbff (`flightPerformance().environmentPreparation` présent), `/cockpit.html?perf=1`, DPR 1,5. `ready` à ≈ 51 s. Machine chargée comme d'habitude : affichage à ≈ 1 image/s pendant tout l'essai, avant comme après les passages ; seules les durées par étape de `sceneTimings` sont interprétées.

| | Avant (e7ac80f, même PC) | Après (804cbff) |
|---|---|---|
| Cygnus X-1, préparation des environnements à la sélection | — | 9 environnements en **1,6 s**, sans image lente (`slowFrames` vide) |
| Cygnus X-1, rendu trou noir prêt | 12–13,5 s | 0,3 s (cache de programmes ANGLE conservé d'une session à l'autre) |
| **Cygnus X-1, image d'arrivée** | **1401 ms** (environnements 1159 ms) | **197 ms** (cubes 44, affichage 41, corps proches 33, catalogue 32 ms ; environnements < 20 ms) |
| Tarentule, préparation à la sélection | — | 1 environnement, prêt en 3,9 s |
| **Tarentule, image de sélection** | — | **2751 ms**, dont « Affichage final et vaisseau » **2658 ms** |
| **Tarentule, image d'arrivée** | — | **153 ms** ; variante « nuage » en service dès l'arrivée ; aucune pause > 1,5 s ensuite |

## Lecture

- **L'à-coup d'arrivée est résolu** pour Cygnus X-1 (1401 → 197 ms) et absent à la Tarentule (153 ms).
- **Nouvelle pause à la sélection d'une nébuleuse** : 2,7 s dans « Affichage final et vaisseau », sur l'image où la cible change. Hypothèse (non vérifiée dans le code) : la nébuleuse sélectionnée devient visible ou dessinée pour la première fois, et three compile son matériau volumétrique de façon synchrone au premier `render`. Pistes : `renderer.compileAsync` sur le groupe préparé avant de le rendre visible, ou compilation au démarrage du ciel. À confirmer avec un découpage plus fin de cette étape (dessin du vaisseau / dessin des environnements / compilation).
- La pause n'est plus au moment critique (l'arrivée), mais elle reste perceptible quand on choisit une nébuleuse.

Aucun changement de code par Claude.
