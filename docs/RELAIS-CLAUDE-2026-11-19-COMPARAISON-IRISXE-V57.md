# Relais Claude — 19 novembre 2026 : comparaison Classique / Immersive sur Iris Xe (version 57)

Chrome du propriétaire, Windows, Intel Iris Xe (ANGLE D3D11), fenêtre 1280 × 585, DPR 1,5, profil graphique de l'utilisateur « Équilibré » (rétabli après les essais). Scène unique : **vol libre au démarrage**, sans saut ni changement de mission. Une mission sauvegardée attend la décision du propriétaire : je n'ai rien fait qui puisse la modifier. Liens d'essai `?ui=classic` et `?ui=immersive` : la préférence mémorisée n'a pas été touchée (`odyssee-ui-mode` absent avant et après).

Dans les deux interfaces, le menu « Mission ▾ » était ouvert : il s'ouvre seul quand une mission sauvegardée attend une décision. Cela compte dans le ciel non occulté, de la même façon pour les deux.

## Mesures (ordre chronologique)

| # | Interface | Profil | Pixels rendus | Ciel non occulté | Images/s | Médiane | p95 | > 50 ms |
|---|---|---|---|---|---|---|---|---|
| 1 | Classique (juste après un démarrage froid) | Équilibré | 1170 × 706 | 37,3 % | 33,1 | 33,1 ms | 66,7 ms | 34 |
| 2 | **Immersive** | Équilibré | **1920 × 877** | **70,6 %** | 40,8 | 16,8 ms | 49,9 ms | 15 |
| 3 | Immersive | Performance | 1420 × 648 | — | 37,1 | 17,1 ms | 50,0 ms | 19 |
| 4 | Immersive | Qualité | 1920 × 877 | — | 39,1 | 16,9 ms | 50,0 ms | 17 |
| 5 | **Classique** (à chaud) | Équilibré | 1170 × 706 | 37,3 % | 39,3 | 16,8 ms | 50,0 ms | 16 |

`frameTimingSample(10)` mesure le temps mural entre images sur 10 s. Ce n'est pas un chronométrage GPU, et la machine reste chargée.

## Conclusions

1. **Sur cette scène, l'immersif ne coûte rien de mesurable.** Il rend 2,04 fois plus de pixels que le classique, pour des temps d'image identiques une fois tout chaud (médiane 16,8 ms dans les deux cas, soit la cadence de l'écran ; p95 50 ms). La mesure 1 était plus lente parce que le préchauffage optique venait de finir après un démarrage froid.
2. **Les trois profils donnent la même fluidité ici.** Le GPU n'est pas le facteur limitant en vol libre. Les pointes à 50 ms et plus tiennent à la charge de la machine ou au processeur, pas au nombre de pixels.
3. **Le ciel visible double** : 37,3 % en classique contre 70,6 % en immersif, mesurés sur le vrai Chrome.
4. **Limite de cette comparaison** : une seule scène (champ d'étoiles et Voie lactée). Les scènes lourdes (nébuleuse volumique, trou noir, planète de près en vue extérieure) n'ont pas été mesurées, car elles exigent un saut qui aurait déplacé le vol alors qu'une mission sauvegardée attend la décision du propriétaire. Recommandation : ne pas fixer de politique de rendu avant ces mesures.

## Démarrage (même session)

| Chargement | Attente d'image | Préparation GPU | Interface active | Préchauffage terminé |
|---|---|---|---|---|
| Classique, premier de la matinée | 0 ms (onglet visible) | 26,8 s | 32,5 s | 50,0 s |
| Immersive, ensuite | 0 ms | 7,3 s | 10,0 s | 29,2 s |
| Classique, ensuite | 0 ms | 5,8 s | 8,9 s | 9,8 s |

Le premier chargement de la matinée paie une préparation GPU froide (26,8 s), probablement le cache de programmes du navigateur à reconstruire après redémarrage du PC. Les suivants tombent à 6–7 s. L'interface immersive ne change pas ce coût.

Captures : `validation/ui/irisxe-v57-classique-vol-libre.jpg`, `validation/ui/irisxe-v57-immersive-vol-libre.jpg`.

## Observations d'interface (immersif, Iris Xe)

- La pastille de télémétrie est lisible et complète : « Proxima Centauri · pause · v 0,0000703 c · γ 1 · restant 4,225 al · bord 0 s · réf. 0 s ».
- Le menu « Mission ▾ » ouvert recouvre la partie gauche du suivi du trajet. C'est acceptable pour une décision en attente ; il se ferme par Échap ou par un choix.
- L'étiquette de la cible dans le ciel passe sur deux lignes à 12 px (« Proxima Centauri · 4,225 al »). À élargir en tranche 2.
