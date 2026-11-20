# Relais Claude — preuve de faisabilité : la Carte cosmique (niveau Groupe local) dans le cockpit

Cadre : orientation 1 du GO du 18 novembre (« intégration progressive de la Carte cosmique dans le cockpit, preuve de faisabilité sur le Groupe local, `cosmos.html` conservée jusqu'à la parité »). Engagement pris dans l'addendum V1.1 (`docs/audits/task-force-2026-11-18/REPONSE_HEAD_UIUX_V1.md`, § B.1) : un seul niveau, mesure des ressources graphiques et de la mémoire, matrice de parité niveau par niveau.

**Périmètre : session d'essai seulement** (`cockpit.html?essai=1`, Classique ou Immersive). Pour les visiteurs, rien ne change : la couche n'est pas créée et son réglage est masqué (contrôlé par le test). `cosmos.html` reste en ligne, inchangée.

## 1. Ce qui a été fait

Nouveau module `src/cockpit-cosmic-map.js` : les couches du niveau « Groupe local » de `cosmos.html`, **réutilisées telles quelles** dans la Carte galactique 3D du cockpit, par le même moteur WebGL :

- **Enveloppe de repérage du Groupe local** : `CosmicScene`, la classe de `cosmos.html`.
- **101 galaxies cataloguées McConnachie 2012** : `ObservedGalaxies`, mêmes symboles additifs que `cosmos.html`.

Une seule mise à l'échelle (groupe ×10⁶ dans le monde de la Carte) suffit : les deux pages utilisent déjà le **même repère équatorial**, la fonction `xyz` de `cosmic-data.js`. La Voie lactée, M31, M33 et le Soleil restent dessinés par la Carte du cockpit ; leurs doublons de `CosmicScene` sont masqués.

**Sélection depuis la carte** : un clic sur une galaxie naine en fait la **cible du cockpit** (même objet que dans la recherche, alias UNGC compris). Le clic **n'oriente pas le nez** et ne relance pas le temps. C'est la règle des tranches 2a/2b : sélectionner n'est pas piloter.

Réglage « Galaxies McConnachie 2012 · essai » dans les options de la Carte, coché par défaut en session d'essai.

Deux diagnostics en lecture seule, utilisés par le test : `window.renderResources()` (ressources WebGL de la dernière image et tas JavaScript) et `window.cosmicMapLayer`.

Capture : `validation/ui/cockpit-carte-groupe-local-faisabilite.jpg` (Carte cadrée sur le Groupe local, couche allumée, And XXVIII sélectionnée depuis la carte).

## 2. Mesures (Chromium SwiftShader, 1280 × 585, Carte cadrée « Groupe local »)

| | Couche éteinte | Couche allumée | Écart |
|---|---|---|---|
| Appels de dessin (dernière image) | 50 | 54 | +4 |
| Points dessinés | 143 030 | 143 131 | +101 |
| Sommets de lignes | 8 978 | 9 458 | +480 |
| Géométries en mémoire GPU | 66 | 71 | +5 |
| Textures | 32 | 32 | 0 |
| Programmes de shaders | 17 | 17 | voir note |
| Tas JavaScript | 124–125 Mo | 123–137 Mo | dans le bruit de mesure |
| Temps d'image p50 / p95 (6 s) | 183–200 / 350–367 ms | 167–233 / 350–433 ms | **non concluant** (SwiftShader) |

Données téléchargées : `mcconnachie-map.json`, que le cockpit charge déjà pour ses destinations ; il est donc servi depuis le cache.

Note sur les programmes : la couche est allumée au chargement, ses deux shaders sont donc compilés avant la mesure « éteinte ». Le compte ne montre pas leur coût de compilation. Elle ajoute au plus deux programmes, compilés une fois.

**Lecture** : le coût de rendu est marginal (+4 appels, +101 points, aucune texture). Pour comparaison, `cosmos.html` seule occupe ≈ 10 Mo de tas, et le cockpit ≈ 125 Mo. Ouvrir la Carte dans le cockpit évite un rechargement de 5 à 10 s, mesuré sur l'Iris Xe le 18 novembre. **Le temps d'image réel doit être relevé sur l'Iris Xe après publication.**

## 3. Matrice de parité, niveau 1 « Groupe local »

Statut : **=** équivalent dans le cockpit ; **≈** existe sous une autre forme ; **✓ essai** apporté par cette preuve ; **✗** manque.

| Fonction de `cosmos.html` | Cockpit (Carte) | Statut |
|---|---|---|
| Enveloppe de repérage du Groupe local | même classe `CosmicScene` | ✓ essai |
| Galaxies McConnachie 2012 dessinées | même classe `ObservedGalaxies` | ✓ essai |
| Choisir cette galaxie comme destination | clic sur la carte → cible du cockpit, sans recharger | ✓ essai, **mieux** (pas de changement de page) |
| Temps de la mission pendant la consultation (D9) | la simulation reste dans la même page | **=** (motif principal de l'intégration) |
| Voie lactée, M31, M33 | populations et photométrie du cockpit | = |
| Étiquettes Voie lactée, Andromède, Triangle | étiquettes du cockpit | = |
| Étiquette « Groupe local » sur l'enveloppe | — | ✗ |
| Catalogue au choix (selon l'échelle, McConnachie, UNGC, CF4) | McConnachie seul sur la Carte ; UNGC et McConnachie dans la recherche ; CF4 dans le ciel en vol | ≈ / ✗ (UNGC et CF4 absents de la Carte) |
| Recherche par nom ou identifiant | recherche de destinations du cockpit (mêmes galaxies) | ≈ |
| Filtre de distance maximale, incertitude CF4 | — | ✗ |
| Liste des résultats (60) | liste des destinations | ≈ |
| Fiche : type, distance, résumé, limites du catalogue | fiche de l'objet du cockpit | ≈ (la phrase de limite du catalogue manque) |
| Cadrer en 3D, explorer l'intérieur, revenir à la vue d'ensemble | « Groupe local », « Galaxie entière », « Centrer vaisseau » | ≈ (pas de cadrage sur l'objet choisi) |
| Se rapprocher, échelle plus petite, dézoomer d'un niveau | sélecteur d'échelle (jusqu'à 6 millions d'al) | ≈ |
| Retrouver notre position | « Centrer Soleil » | = |
| Vue dégagée, afficher les repères | cases Écliptique, Plan galactique, Trajectoire | ≈ |
| Galaxies de représentation (symboles adaptatifs / tailles ×1) | symboles adaptatifs seulement | ≈ |
| Rotation accélérée (illustrative) | — | ✗ (sans objet au niveau 1) |
| Anciennes populations illustratives | — | ✗ (masquées volontairement) |
| Navigation clavier (avancer, reculer…) | rotation et zoom de la Carte | ≈ |

**Niveaux 2 à 4** (Vierge 150 Mal, Laniakea 650 Mal, toile cosmique 1 800 Mal, Univers observable) : **non abordés**. Ils demandent d'étendre l'échelle de la Carte au-delà de 6 millions d'al, d'ajouter UNGC et CF4 sur la Carte (CF4 : 3,9 Mo, déjà chargé à la demande en vol), les bassins CF4 avec leurs lignes de courant, le plan supergalactique et l'horizon. La précision numérique ne pose pas de problème identifié : les positions sont en années-lumière, et l'échelle de la Carte est appliquée par la matrice du monde.

## 4. Conclusion et proposition

**Faisable** : le moteur du cockpit héberge les couches de `cosmos.html` sans les réécrire. Le coût mesuré est marginal, et la sélection relie la carte à la mission (D9), ce que la page séparée ne peut pas faire. Cette preuve ne suffit pas à la parité : la matrice compte 6 manques au niveau 1, et les niveaux 2 à 4 restent à faire.

Proposition pour la suite, sans retrait de `cosmos.html` :
1. Mesurer sur l'Iris Xe (après publication) : temps d'image couche éteinte et allumée, sur la même scène.
2. Fermer les manques du niveau 1 : étiquette d'enveloppe, catalogue UNGC sur la Carte, phrase de limite du catalogue dans la fiche, cadrage sur l'objet choisi.
3. Niveau 2 (Vierge), puis 3 et 4, avec la même matrice.
4. Retirer `cosmos.html` **seulement** quand la matrice est entièrement à **=** ou **≈**, et avec l'accord du propriétaire.

## 5. Vérifications exécutées

Local (Chromium SwiftShader, Playwright préinstallé, 1280 × 585) :
- `validate-cosmic-map-feasibility.cjs` (nouveau, `npm run test:ui:cosmicmap`, ajouté à `test:ui` et au job « cosmicmap » de la CI reproductible) : **8/8**. Couche chargée (101 galaxies), réglage visible en essai, ressources mesurées, 82 galaxies à l'écran, clic sur And XXVIII → cible `ungc:And XXVIII` (alias de la ligne McConnachie), nez, temps et position inchangés, aucune erreur de page, couche absente du cockpit public.
- Non-régression, réussis (code 0) : `validate-observation-gestures.cjs` (38/38), `validate-feature-inventory.cjs` (30/30), `validate-search-and-map-errors.cjs`, `validate-rendezvous-ui.cjs`, `validate-cockpit-layout-ui.cjs`, `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs`, `validate-mission-storage.mjs`.
- Parcours cockpit complet (`validate-physics-ui.cjs`) : verdict sur la CI.

Autre correction incluse : en vue Carte, le bandeau replié de l'essai immersif n'affiche plus « Cadrer » seul. Le bouton n'apparaît qu'avec la fiche de sélection complète, comme avant la tranche 2b.

Non vérifié : Chrome Iris Xe (publication nécessaire).
