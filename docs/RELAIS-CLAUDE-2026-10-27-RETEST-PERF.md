# Retest Iris Xe après 74b5800 / c345ca9 (passe nuage réduite, cadence des cubes)

Claude, 27/10/2026 vers 14 h 40–15 h 10 UTC. Version publiée par Codex, `/cockpit.html?perf=1`, DPR 1,5. Même profileur que `d06df3e` (enveloppe temporaire de toutes les méthodes WebGL2, temps GPU par `EXT_disjoint_timer_query_webgl2`, aucune mesure disjointe), complété par `flightPerformance()`. Une seule session : Soleil → Tarentule → Cygnus X-1 par le passage stable. Pendant l'essai, la fenêtre a changé de taille (tampon 947×900 puis 1051×832).

## Résultats

| | Avant (`d06df3e`) | Après | Commentaire |
|---|---|---|---|
| Démarrage (`ready`) | 19 s | 40 s | cache de programmes ANGLE froid après publication (nouvelles sources) ; ciel profond 2,2 s |
| Soleil, faces de cube par image | 1,9 | **0,1** | la correction de cadence des cubes fonctionne |
| Soleil, i/s stabilisés | 24 | 19,5–20,5 | GPU mesuré 10,4 ms ; écart dans le bruit de mesure et lié au changement de taille |
| Tarentule, délai de la variante nuage | 7,8 / 13,6 s | 26,4 s | nouvelles sources, cache froid |
| Tarentule, i/s | 6 | **5** | **pas de gain** |
| Tarentule, GPU | optique + nuage plein écran 145 ms | passe nuage **42–52 ms** + optique « nuage » **76–87 ms** | voir les deux constats ci-dessous |
| Cygnus X-1, délai du programme trou noir | 30,7 / 43,7 s | **23,9 s** | sans erreur |
| Cygnus X-1, i/s | 21–22 | **≈ 1** | page inactive, voir le constat 3 |

## Constat 1 : la passe nuage est décalée et agrandie quand DPR ≠ 1 (défaut visible)

- Mesure : la passe « Nuage : émission » est dessinée avec un viewport **711×675** alors que la cible fait **474×450** (`flightPerformance().cloudPixels`), soit un rapport de 1,5 = `devicePixelRatio`.
- Cause dans le code : `src/cloud-pass.js`, ligne 27 : `renderer.setRenderTarget(this.target); renderer.setViewport(0,0,w,h);`. Dans three r180, `setViewport` multiplie **toujours** par `_pixelRatio` (WebGLRenderer.js l. 730), alors que `setRenderTarget` applique `renderTarget.viewport` sans facteur (l. 2775). Seul le coin inférieur gauche (2/3 × 2/3) du rendu virtuel entre dans la texture, qui est ensuite étirée sur tout l'écran.
- Effet observé à l'image : le cœur de la Tarentule apparaît vers 75 % de la vue (en haut à droite) au lieu du centre, sous le repère de la cible, et il est agrandi d'un facteur 1,5. Les tests passaient avec DPR 1 en CI, où le défaut est invisible.
- Correction proposée : ne pas appeler `setViewport` après `setRenderTarget(this.target)` (laisser `target.viewport`, que `setSize(w,h)` place à 0,0,w,h), ou appeler `setViewport(0,0,w/ratio,h/ratio)`. Ajouter un test à DPR 1,5 qui compare la position du barycentre du nuage avec la marche plein écran.

## Constat 2 : à la Tarentule, l'essentiel du coût restant est la marche du Groupe local

- L'optique « nuage » (sans `nebulaMarch`, elle échantillonne les textures du nuage) coûte encore 76–87 ms par image en plein écran.
- Test direct : pendant 3 s, `groupShapes[0..7]` est mis à −1 sur le programme optique (désactivation de `groupRadiance`), puis restauré exactement aux valeurs d'origine `[0,0,1,2,4,4,4,4]`. Coût de l'optique : **77,7 ms → 0,9 ms**.
- Interprétation : la Tarentule est dans le Grand Nuage de Magellan. Chaque rayon de l'écran traverse ce volume, avec 64 pas et un `gfbm` par pas. Avant, ce coût était mêlé à celui du nuage dans les 145 ms ; il n'est apparu qu'une fois le nuage séparé.
- Piste : traiter `groupRadiance` comme le nuage, c'est-à-dire en passe à résolution réduite quand le volume couvre une grande part de l'écran (ce qui arrive dans le LMC ou M33). Le budget lumineux est à vérifier de la même façon.
- La passe nuage elle-même (42–52 ms, avec le viewport erroné) reste coûteuse. Sa mesure est à refaire une fois le constat 1 corrigé.

## Constat 3 : épisodes à ≈ 1 image/s sans charge de la page (non résolu)

- Ils surviennent après le démarrage (pendant environ 1 à 1,5 min) et à Cygnus X-1 pendant plus de 40 s. Les images sont espacées de 1016 ms pile.
- Pendant ces épisodes : document visible et actif, boucle d'événements libre (`setTimeout(100)` → 108 ms), GPU de la page 27 ms par image, aucune tâche longue notable, barrière GPU franchie en 7–81 ms (cockpit) et 12–61 ms (contexte neuf).
- Conclusion : le blocage se situe entre la page et l'affichage (compositeur de Chrome, système, économie d'énergie, autre activité GPU de la machine), pas dans le rendu d'Odyssée. Le matin, à Cygnus X-1, la même version donnait 21–22 i/s. À reproduire en notant l'alimentation (secteur ou batterie), le mode d'économie d'énergie de Chrome et les autres onglets ouverts, avant tout correctif du code.

## Non modifié

Aucun changement de code par Claude dans ce relais (répartition demandée par Abdoulaye : Claude mesure, Codex code).
