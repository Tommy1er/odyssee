# Iris Xe à DPR 1,5 : centrage corrigé confirmé, coûts des passes répétés (31/10/2026)

Claude, vers 10 h 25 UTC. Version publiée contenant 8792f81, `/cockpit.html?perf=1`. **DPR 1,5**, tampon 1051×832 : ce sont les conditions du défaut du 27/10. La machine est chargée comme d'habitude, les images/s ne sont pas interprétées. `ready` à environ 43 s. Passage stable vers la Tarentule ; variante nuage et passe groupe prêtes **12,8 s** après l'arrivée, sans erreur (`variantError` et `groupPassError` nuls).

## Centrage (défaut DPR)

- `flightPerformance()` : `cloudPixels` = `groupPixels` = **526×417**, la moitié exacte de 1051×832.
- `gl.viewport` réellement appelé pendant les dessins (instrumentation de 3 s) : passe nuage `0,0,526,417`, passe groupe `0,0,526,417`, optique finale `0,0,1052,833`. Le 27/10, c'était 711×675 sur une cible 474×450.
- Capture : cœur de la Tarentule centré dans la vue, sous le repère de la cible. **Le défaut est corrigé à DPR 1,5.**

## Coûts GPU par passe, 5 fenêtres de 4 s successives (`EXT_disjoint_timer_query_webgl2`, aucune mesure disjointe)

| Fenêtre | Groupe local, médiane / min | Nuage, médiane / min | Optique finale, médiane / min | Dessins mesurés |
|---|---|---|---|---|
| 1 | 21,8 / 17,0 ms | 17,0 / 13,4 ms | 1,1 / 0,9 ms | 20 |
| 2 | 52,7 / 24,8 | 41,7 / 19,4 | 2,7 / 1,4 | 10 |
| 3 | 52,6 / 24,3 | 29,3 / 22,3 | 1,9 / 0,9 | 11 |
| 4 | 41,0 / 16,1 | 22,3 / 12,9 | 1,5 / 0,8 | 12 |
| 5 | 61,4 / 53,6 | 48,1 / 12,2 | 3,1 / 0,8 | 3 |

Lecture :
- **Dispersion forte d'une fenêtre à l'autre** (facteur 2 à 3 sur les médianes), en même temps que le nombre d'images obtenu baisse (20 → 3 dessins en 4 s). Cela confirme la remarque de Codex : les temps GPU varient eux aussi avec la charge, la fréquence et la température du GPU. Une seule mesure ne suffit pas.
- **Meilleur cas** (minima, contention la plus faible) : Groupe local ≈ 16 ms, nuage ≈ 12–13 ms, optique < 1 ms, soit environ 30 ms par image. Le 27/10, avant les deux passes réduites, l'optique plein écran coûtait 140–158 ms dans des conditions comparables. **Médianes** : 40–80 ms au total selon la charge du moment.
- Le Groupe local reste le poste le plus lourd des deux, mais l'écart avec le nuage est plus faible qu'au 28/10 (50,1 / 25,6 ms en une seule fenêtre).
- Conclusion prudente : le gain est réel et important en capacité (meilleur cas × 4 à 5). La fluidité vécue dépendra de la charge de la machine, qu'on ne peut pas contrôler ici.

Aucun changement de code par Claude.
