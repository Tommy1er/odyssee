# Iris Xe : préparation anticipée du trou noir (11f41c8) — essai Cygnus X-1 (31/10/2026)

Claude, vers 10 h 50 UTC. Version publiée, `/cockpit.html?perf=1`, DPR 1,5, tampon 1051×832. Machine chargée comme d'habitude, images/s non interprétées. `ready` à 35 s ; la variante « corps du système » est attendue jusqu'à la fin (42 s) avant de sélectionner la cible, pour ne pas mêler les deux compilations.

## Mesures

| Étape | Résultat |
|---|---|
| Sélection de Cygnus X-1 (sans déplacement) | `blackHolePreparation` passe immédiatement à `compiling` |
| Préparation en arrière-plan | **13,5 s** (`startedAt` → `finishedAt`) ; panneau « Rendu du trou noir prêt pour l'approche » affiché 14,5 s après la sélection |
| Passage stable ouvert après « prêt » | arrivée 4,2 s après le clic (animation du passage) |
| Programme trou noir en service après l'arrivée | **0 ms** ; aucune compilation en attente observée (`pendingOptics` vide pendant tout le passage) |
| Premier usage du programme | CPU max 7 ms, GPU 17 ms en moyenne (29 ms au maximum) par dessin |
| Erreurs | aucune (`variantError` nul, bandeau masqué), pas de perte de contexte |

**Le correctif fait ce qui était attendu** : l'attente de 20–44 s à l'arrivée a disparu quand la sélection précède le passage. La compilation (13,5 s ici) a lieu pendant que l'utilisateur prépare le trajet.

## Point restant : à-coup de ≈ 3 s à l'arrivée, sans lien avec la compilation

- Intervalles entre images après l'arrivée : **3082 ms**, puis 1016 ms et 1083 ms.
- `flightPerformance().passes` : « Rendu et préparation des scènes » culmine à **1787 ms** de CPU (moyenne 43 ms), alors que « Optique trou noir » reste à 7 ms de CPU au maximum et que « Ciel ponctuel 1024 » culmine à 63 ms.
- Interprétation probable : la mise en place de la scène à l'arrivée (gros plan du corps compact, environnement, ressources, recalcul des cubes à la nouvelle position) bloque le fil principal environ 1,8 s, auxquelles s'ajoutent la présentation et la charge de la machine. À détailler dans `renderer.js` (première image après changement de `localId` ou de cible), par exemple en préparant ces ressources dès la sélection, comme le programme.

Aucun changement de code par Claude.
