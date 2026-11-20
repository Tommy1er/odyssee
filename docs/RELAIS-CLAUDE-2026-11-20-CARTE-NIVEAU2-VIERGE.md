# Relais Claude — Carte cosmique dans le cockpit, niveau 2 « Voisinage de la Vierge » (session d'essai)

Suite de `docs/RELAIS-CLAUDE-2026-11-20-CARTE-GROUPE-LOCAL-FAISABILITE.md`, même méthode. Cadre : orientation 1 du GO du 18 novembre, et message du propriétaire du 20 novembre : « Tu peux poursuivre le niveau Vierge et les travaux suivants selon ton jugement, en maintenant notre principe de migration progressive, de préservation scientifique et de validation mesurée. »

**Session d'essai seulement** (`?essai=1`). Le cockpit public et `cosmos.html` sont inchangés. Seule retouche partagée : les étiquettes des galaxies du Groupe local se masquent au-delà d'environ 33 millions d'al, une échelle que la Carte publique n'atteint pas (son maximum est de 6 millions d'al).

## 1. Ce qui a été fait

- **Bouton « Voisinage de la Vierge »**, et option d'échelle « Voisinage de la Vierge · 150 millions al ». Ils cadrent la Carte comme le niveau 2 de `cosmos.html` : 150 millions d'al, centrés sur le Superamas de la Vierge (`LEVELS[1]` de `cosmic-data.js`). Le texte du niveau s'affiche en notification. « Groupe local » ramène au niveau 1.
- **Moteur** : `fit('point', s, largeur, centre)` cadre la Carte sur un point quelconque.
- **Structures de niveau 2** (`CosmicScene`, réglages par défaut de `cosmos.html` : enveloppes affichées, connexions schématiques et populations illustratives masquées). Étiquettes « Amas de la Vierge » et « Superamas de la Vierge » ; « Groupe local » se masque à cette échelle.
- **Catalogue « Selon l'échelle »** (nouveau défaut, comme `cosmos.html`) : McConnachie 2012 au Groupe local, UNGC 2013 à la Vierge. Autres choix : McConnachie, UNGC, McConnachie et UNGC, **Cosmicflows-4**.
- **Cosmicflows-4 sur la Carte**, chargé par le chargeur CF4 du cockpit, partagé avec la recherche : 3,9 Mo téléchargés et décodés une seule fois. Un clic sur une galaxie CF4 crée la destination du cockpit (règle de dédoublonnage existante, `cf4Object`) et la cible, sans piloter.
- **Note de provenance** sous les options, selon le catalogue affiché. Pour UNGC : « Volume local jusqu'à ≈ 36 millions d'al : l'amas de la Vierge (≈ 54 millions d'al) est au-delà, choisir Cosmicflows-4 ». Pour CF4 : « distances individuelles avec leur incertitude publiée ; échantillon inégal du ciel : ses trous ne sont pas des vides cosmiques ».

Captures : `validation/ui/cockpit-carte-vierge-faisabilite.jpg` (UNGC) et `validation/ui/cockpit-carte-vierge-cf4.jpg` (CF4 : l'amas de la Vierge apparaît nettement).

## 2. Constat scientifique à connaître

Au niveau Vierge, `cosmos.html` choisit lui aussi UNGC « selon l'échelle ». Or UNGC s'arrête vers 11 Mpc (≈ 36 millions d'al) : **l'amas de la Vierge n'y a aucune galaxie observée**. Seules les enveloppes de repérage le montrent. C'est un défaut d'expérience partagé avec `cosmos.html`. **Proposition, non appliquée** : choisir Cosmicflows-4 selon l'échelle au niveau Vierge, dans les deux pages, au prix de 3,9 Mo téléchargés. À trancher avec le propriétaire, car c'est un coût de chargement.

## 3. Mesures (Chromium SwiftShader, 1280 × 585)

| Scène | Appels | Points | Géométries | Textures | Tas JS |
|---|---|---|---|---|---|
| Groupe local, couche éteinte | 50 | 143 030 | 71 | 33 | 124–143 Mo |
| Groupe local, McConnachie | 55 | 143 131 | 71 | 33 | 124 Mo |
| Vierge, UNGC | 56 | 143 898 | 97 | 36 | 125 Mo |
| Vierge, Cosmicflows-4 | 56 | **198 907** | 98 | 36 | **185 Mo** |

Le tas JavaScript varie beaucoup d'une mesure à l'autre. CF4 ajoute environ 55 000 points et une soixantaine de Mo de tas (55 877 lignes décodées), seulement quand il est choisi. Temps d'image non concluant sous SwiftShader : **à mesurer sur l'Iris Xe**.

## 4. Matrice de parité, niveau 2 « Voisinage de la Vierge »

Statuts : **=** équivalent ; **≈** autre forme ; **✓ essai** apporté par ce relais ; **✗** manque.

| Fonction de `cosmos.html` | Cockpit (Carte, essai) | Statut |
|---|---|---|
| Cadrage du niveau (150 millions d'al, Superamas de la Vierge) | bouton et option d'échelle | ✓ essai |
| Texte du niveau | notification | ≈ |
| Enveloppes : Amas et Superamas de la Vierge | même classe `CosmicScene`, mêmes réglages | ✓ essai |
| Étiquettes des structures | étiquettes Groupe local, Amas, Superamas | ✓ essai |
| Catalogue selon l'échelle (UNGC) | même choix | ✓ essai |
| Catalogue CF4 | même catalogue, chargement partagé avec la recherche | ✓ essai |
| Choisir une galaxie comme destination | clic → cible du cockpit (UNGC, CF4) | ✓ essai, **mieux** (pas de changement de page) |
| Connexions schématiques (option) | — | ✗ (masquées par défaut des deux côtés) |
| Filtre de distance et d'incertitude CF4 | — | ✗ |
| Fiche de structure (résumé, relation, étendue) | fiche des objets `cosmic:` du cockpit | ≈ |
| Bassins CF4 et lignes de courant | bassins dans le ciel en vol ; pas sur la Carte | ✗ (niveau 3) |

Niveaux 3 (Laniakea, 650 millions d'al) et 4 (toile cosmique, 1 800 millions d'al) : pas encore abordés.

## 5. Vérifications exécutées

Local (Chromium SwiftShader, Playwright préinstallé) :
- `validate-cosmic-map-feasibility.cjs` : **20/20**. Nouveaux contrôles : niveau 2 actif et UNGC selon l'échelle ; étiquettes de la Vierge visibles et Groupe local masquée ; clic UNGC → cible sans piloter ; CF4 chargé, 180 galaxies à moins de 12 millions d'al du centre de l'amas ; clic CF4 → destination créée et ciblée ; retour au Groupe local avec McConnachie ; bouton et option absents hors essai.
- Non-régression, réussis (code 0) : `validate-observation-gestures.cjs`, `validate-feature-inventory.cjs`, `validate-search-and-map-errors.cjs`, `validate-catalogue-ui.mjs`, `validate-galaxy-ui.cjs`, `validate-rendezvous-ui.cjs`, `validate-cockpit-layout-ui.cjs`, `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs`, `validate-mission-storage.mjs`, `validate-catalogue-galaxies.mjs`, `validate-map-preview.mjs`.
- Parcours cockpit complet : verdict sur la CI.

CI GitHub sur `4434a85` : « Reproducible validation from npm ci », relancé à la main (https://github.com/Tommy1er/odyssee/actions/runs/44783975823) et déclenché par le push (run 44783976386) : les 9 jobs réussis dans les deux exécutions. Les six autres workflows du commit ont aussi réussi.

Non vérifié : Chrome Iris Xe (publication nécessaire).
