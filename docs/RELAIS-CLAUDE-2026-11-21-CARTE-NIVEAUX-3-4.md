# Relais Claude — Carte cosmique dans le cockpit, niveaux 3 et 4 (session d'essai)

Suite de `docs/RELAIS-CLAUDE-2026-11-20-CARTE-NIVEAU2-VIERGE.md`. Même cadre : migration progressive, `cosmos.html` conservée, aucune publication sans demande. Message du propriétaire du 21 novembre : « tu peux continuer en attendant ».

**Session d'essai seulement** (`?essai=1`). Le cockpit public et `cosmos.html` sont inchangés.

## 1. Ce qui a été fait

- **Sélecteur « Niveau »** dans les options de la Carte, à la place du bouton « Voisinage de la Vierge ». Il propose les quatre niveaux de `cosmos.html` : Groupe local, Voisinage de la Vierge, **Laniakea et voisins (650 millions d'al)**, **Superamas et grands vides (1,8 milliard d'al)**. Options d'échelle correspondantes dans « Échelle ». Le texte du niveau s'affiche en notification.
- **Catalogue « selon l'échelle »** aligné sur `cosmos.html` : McConnachie, puis UNGC, puis **Cosmicflows-4** aux niveaux 3 et 4.
- **Structures des quatre niveaux** et leurs étiquettes : Centaure, Norma, Grand Attracteur, Laniakea, Persée, Persée–Poissons, Coma, Hercule, Shapley, vide du Bouvier. Chaque étiquette n'apparaît que si sa structure appartient au niveau affiché et reste repérable à l'échelle.
- **Bassins d'attraction et lignes de courant CF4 2023** (classe `BasinLayer` de `cosmos.html`, réglages par défaut identiques), aux niveaux 3 et 4, avec une case pour les masquer. Leurs données sont **partagées avec le cockpit en vol** : `loadBasinData` ne télécharge qu'une fois les 3,7 Mo.
- **Note de provenance** sous les options, avec la formulation de `cosmos.html` : « modèle déduit des distances Cosmicflows-4 (Dupuy & Courtois 2023 ; Courtois et al. 2023), pas des vitesses 3D mesurées ; les surfaces sont des frontières du modèle, pas des parois matérielles ». J'avais d'abord écrit une référence de mémoire, fausse ; elle a été corrigée d'après `cf4-basins-2023.json` avant le commit. La note se met à jour à la fin du chargement. Elle a désormais un fond sombre, pour rester lisible au-dessus de la carte.

Captures : `validation/ui/cockpit-carte-laniakea.jpg`, `validation/ui/cockpit-carte-toile-cosmique.jpg`.

## 2. Mesures (Chromium SwiftShader, 1280 × 585) — coût réel aux niveaux 3 et 4

| Scène | Appels | Triangles | Points | Segments de lignes | Temps d'image médian / p95 |
|---|---|---|---|---|---|
| Groupe local, McConnachie | 55 | 1 070 | 143 131 | 9 458 | 200–217 / 383–483 ms |
| Vierge, CF4 | 56 | 2 280 | 198 907 | 9 938 | 217–233 / 400–417 ms |
| **Laniakea, CF4 + bassins** | 65 | **61 588** | 198 907 | **128 208** | **483–550 / 833–1 283 ms** |
| **Toile cosmique, CF4 + bassins** | 74 | 61 594 | 198 907 | 129 168 | **667–700 / 717–1 383 ms** |

Les bassins (surfaces) et leurs lignes de courant animées **multiplient par 2,5 à 3 le temps d'image sous SwiftShader**. Ce rendu logiciel n'est pas représentatif d'un GPU, mais l'ordre de grandeur justifie une mesure sur l'**Iris Xe avant toute ouverture au public**. Si le coût est trop élevé, deux pistes : lignes de courant non animées par défaut, ou bassins masqués par défaut (`cosmos.html` les affiche par défaut).

## 3. Constats à arbitrer (parité avec `cosmos.html`)

1. **Saturation des points CF4 aux grandes échelles.** Les deux pages dessinent les 55 877 galaxies avec la même taille fixe (4 px × densité de pixels) et un mélange additif : aux niveaux 3 et 4, le centre devient une tache blanche. **Proposition, non appliquée** : taille et intensité décroissantes avec l'échelle, dans les deux pages.
2. **UNGC au niveau Vierge** (relais précédent, § 2) : toujours à trancher.

## 4. Matrice de parité, niveaux 3 et 4

| Fonction de `cosmos.html` | Cockpit (Carte, essai) | Statut |
|---|---|---|
| Cadrage des niveaux 3 et 4 | sélecteur « Niveau » et options d'échelle | ✓ essai |
| Enveloppes et étiquettes des structures | `CosmicScene`, mêmes réglages | ✓ essai |
| CF4 selon l'échelle | même choix, chargement partagé | ✓ essai |
| Bassins CF4 2023 et lignes de courant | `BasinLayer`, données partagées avec le vol | ✓ essai |
| Bassins SDSS coupés par le bord du modèle (option) | — | ✗ |
| Légende des bassins (noms, couleurs) | — | ✗ |
| Plan supergalactique, vue du dessus SG | — | ✗ |
| Horizon de l'univers observable | — | ✗ |
| Filtres de distance et d'incertitude CF4 | — | ✗ |
| Choisir une galaxie comme destination | clic → cible du cockpit | ✓ essai, **mieux** |

**Bilan des quatre niveaux** : l'essentiel visuel et scientifique de `cosmos.html` est rendu par le moteur du cockpit, sans changement de page, avec le temps de la mission conservé. Pour la parité complète, il manque surtout des réglages secondaires : légende des bassins, plan supergalactique, horizon, filtres, bassins SDSS. Et l'arbitrage de performance aux niveaux 3 et 4.

## 5. Vérifications exécutées

Local (Chromium SwiftShader, Playwright préinstallé) :
- `validate-cosmic-map-feasibility.cjs` : **25/25**. Nouveaux contrôles : niveau 3 avec CF4 selon l'échelle et bassins chargés et affichés (6 bassins) ; étiquettes Laniakea, Persée–Poissons et Grand Attracteur ; note citant la source et le statut de modèle ; case des bassins ; niveau 4 avec les étiquettes Shapley, Coma, Hercule et vide du Bouvier ; sélecteur et case absents hors essai.
- Non-régression, réussis (code 0) : `validate-observation-gestures.cjs`, `validate-feature-inventory.cjs`, `validate-search-and-map-errors.cjs`, `validate-galaxy-ui.cjs`, `validate-rendezvous-ui.cjs`, `validate-cockpit-layout-ui.cjs`, `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs`, `validate-mission-storage.mjs`.
- Parcours cockpit complet : verdict sur la CI.

CI GitHub sur `1d71601` : « Reproducible validation from npm ci », relancé à la main (https://github.com/Tommy1er/odyssee/actions/runs/44894495106) et déclenché par le push (run 44894494705) : les 9 jobs réussis dans les deux exécutions. Quatre autres workflows réussis ; « Galaxy spectra build and verification » encore en cours au moment du relevé.

Non vérifié : Chrome Iris Xe (publication nécessaire).
