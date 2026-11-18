# Relais Claude — 18 novembre 2026 : version 54 sur Iris Xe (menu Mission, durées de démarrage, contextes WebGL)

Chrome d'Abdoulaye, Windows, Intel Iris Xe (ANGLE D3D11), fenêtre 1280 × 585, DPR 1,5. Machine chargée comme d'habitude : une seule session, valeurs indicatives et non moyennes reproductibles.

## 1. Menu « Mission ▾ » (version 54)

Une mission sauvegardée existait dans le navigateur d'Abdoulaye. Elle est détectée à la fin du démarrage (`#resume-mission` encore masqué à t ≈ 7 s, visible ensuite).

- Le menu s'est **ouvert seul**, pastille ambre, titre « Mission sauvegardée disponible », puis « Reprendre la mission sauvegardée », « Conserver ce nouveau vol », « Choisir la Terre », « Choisir la Lune » (menu 250 × 191 px au-dessus de la barre).
- Barre de commandes : **64 px, une rangée** ; ciel 780 × 471 px ; document 585 px (aucun défilement). Avant correctif, avec mission en attente : barre 117 px, ciel 363–419 px.
- Clic réel sur « Mission ▾ » : bascule le menu (mon premier clic l'a refermé puisqu'il était déjà ouvert). Échap : menu fermé, focus rendu au bouton, pastille conservée.
- Aucun choix de mission n'a été fait à la place d'Abdoulaye : la mission sauvegardée reste en attente.

Capture : `validation/ui/cockpit-irisxe-v54-1280x585-menu-mission.jpg`.

## 2. Démarrage : durées réelles par étape

Source : `performance.getEntriesByType('resource')` et `gpuStartupDiagnostic().entries` (111 étapes), même chargement. Temps depuis le début de la navigation.

| Moment | Étape |
|---|---|
| 0 → 1,83 s | Page et `cockpit.js` (387 ko transférés, 1,24 Mo décodés) ; `DOMContentLoaded` à 1,83 s |
| 1,81 → 3,02 s | Téléchargement des six JSON en parallèle : **4,6 Mo transférés** (compressés) pour 26,1 Mo décodés ; le plus long, `galaxy-catalogue.json`, 2,1 Mo en 1,21 s |
| 1,81 → 4,80 s | Étape tracée « Chargement des catalogues » : 2,99 s (téléchargement + `r.json()`) |
| 4,80 → 7,11 s | **2,3 s non tracées** : préparation des catalogues côté processeur (fusion, `catalogObjects`, objets locaux et cosmiques…) avant la construction du moteur |
| 7,11 → 9,18 s | « Construction du moteur » : 2,07 s |
| 9,18 → 19,67 s | Préparation GPU (programmes compilés en parallèle, cubes de ciel, échauffement) : 10,5 s en temps réel ; plus longues étapes : ciel ponctuel 1024 (1,28 s), fin GPU Voie lactée 128 face 5 (0,94 s), optique ordinaire ciel profond (0,84 s) |
| **≈ 19,7 s** | Fin de la dernière étape tracée (`ready`) ; l'interface n'est plus inerte |

Chargements progressifs ensuite (hors chemin critique) : `ungc-map.json` à 9,3 s, `cf4-basins-2023.json` à 21,2 s, `galaxy-photometry.json` (752 ko) à 22,5 s.

Conclusions :
- Les « 37 s » et « 76 s » des relais précédents étaient des bornes supérieures ; sur ce chargement, la durée réelle jusqu'à l'interface utilisable est **≈ 19,7 s**.
- **Le réseau n'est pas le goulot** : 1,2 s pour l'ensemble des JSON compressés. Les 26,7 Mo cités par les audits sont la taille décodée. Le temps se répartit en ≈ 3,0 s de lecture des catalogues, ≈ 2,3 s de préparation processeur non tracée, ≈ 2,1 s de construction du moteur et ≈ 10,5 s de préparation GPU.
- Piste prioritaire pour une entrée plus rapide : rendre le ciel interactif avant la fin de la préparation GPU complète (variantes et cubes non visibles préparés ensuite), et tracer les 2,3 s manquantes. À instruire, rien n'est modifié.

## 3. Contextes WebGL (affirmation de Mistral)

Le document du cockpit contient **un seul `<canvas>`** (`#flight-canvas`, 1170 × 706 px = ciel 780 × 471 × DPR 1,5), y compris en vue cockpit après démarrage. Un canevas hors document ne peut pas être exclu par cette observation ; aucune création de second contexte n'a été observée. L'affirmation « deux contextes WebGL cockpit + vaisseau » reste non établie.
