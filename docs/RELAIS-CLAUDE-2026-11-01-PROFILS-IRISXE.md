# Iris Xe : profils graphiques (8f5d189) et pause à la sélection de la Tarentule (01/11/2026, après-midi)

Claude, Chrome Windows d'Abdoulaye, `/cockpit.html?perf=1`, DPR 1,5, tampon 1051×832. Version en ligne : profils présents (`flightPerformance().graphics`), **diagnostic cce6091 pas encore publié** (étapes `sceneTimings` sans « Composition optique finale »). Machine chargée comme d'habitude. Profil d'origine « Équilibré » restauré en fin d'essai.

## 1. Pause de 2,7 s à la sélection de la Tarentule : non reproduite

| Contexte | Image de sélection | Images lentes |
|---|---|---|
| Depuis le Soleil, première sélection | 82 ms (corps proches 37 ms) ; environnements prêts en 1,1 s | aucune |
| Depuis le Soleil, désélection (Proxima) puis resélection | 83 ms | aucune > 108 ms |
| Depuis Cygnus X-1 (optique trou noir active), comme le 01/11 midi | 117 ms | aucune |

Depuis Cygnus X-1, le changement de variante est visible et sans à-coup : trou noir → « corps du système + nuage » (repli compilé) à 0,9 s → variante « nuage » compilée en arrière-plan et en service à 1,9 s.

Interprétation : la pause de 2751 ms (a5200e9) a eu lieu lors de la **première utilisation après une publication**, avec un cache de programmes ANGLE froid. Aujourd'hui, les programmes viennent du cache disque de Chrome et la pause disparaît. C'est cohérent avec une compilation synchrone au premier dessin, sans la prouver. **Conséquence pour le diagnostic cce6091 : le mesurer juste après une publication qui modifie des shaders** (premier chargement), sinon la cause restera invisible. Chaque visiteur la subira au premier passage après une mise à jour.

## 2. Profils graphiques à la Tarentule (passes chronométrées par `EXT_disjoint_timer_query_webgl2`, 5 s par profil, aucune mesure disjointe)

| Profil | Budget (pixels) | Taille réelle des passes | Groupe local méd / min | Nuage méd / min | Optique finale | Dessins en 5 s |
|---|---|---|---|---|---|---|
| Performance | 65 536 (256²) | **287×227** | **7,2 / 6,3 ms** | **6,0 / 5,2 ms** | 1,2 ms | 33 |
| Équilibré | 262 144 (512²) | 526×417 | 61,4 / 20,8 ms* | 48,7 / 16,5 ms* | 3,2 / 1,1 ms | 6 |
| Qualité | 524 288 | 526×417 | 24,1 / 22,1 ms | 18,2 / 16,5 ms | 1,3 ms | 14 |

\* médianes gonflées par la charge pendant cette fenêtre ; les minima sont comparables à Qualité.

- **Performance réduit le coût GPU des volumes d'un facteur ≈ 3** (≈ 13 ms contre ≈ 37–42 ms au meilleur cas). Rendu vérifié par capture : nébuleuse centrée, plus douce, sans disparition.
- **À cette taille d'écran, Équilibré et Qualité sont identiques pour les volumes** : la demi-résolution (526×417 = 219 k pixels) est déjà sous les deux plafonds. Qualité n'apporte rien ici ; Équilibré ne réduit rien. À reconsidérer : par exemple, viser une fraction de l'écran plutôt qu'un plafond seul.
- **Adaptation GPU** : `medianGpuMs` reste `null` après quelques secondes par profil (une mesure toutes les 30 images ; à 2–7 images/s sous charge, il faut plus d'une minute pour réunir 5 mesures). L'adaptation progressive n'a donc pas pu être observée en action. Sur une machine chargée, le rythme d'échantillonnage pourrait être lié au temps plutôt qu'au nombre d'images.
- Mémoire : `volumeTargetBytesEstimate` 1,56 Mo (Performance) à 5,26 Mo (Qualité / Équilibré) ; cache d'environnements 16, **10 évictions** sur la session (Soleil → Cygnus → Tarentule).
- Images/s : non interprétées (charge de la machine). En Performance, 33 dessins en 5 s (≈ 6,6 i/s) contre 6 à 14 pour les autres profils pendant le même essai, sans valeur de démonstration.

Aucun changement de code par Claude.
