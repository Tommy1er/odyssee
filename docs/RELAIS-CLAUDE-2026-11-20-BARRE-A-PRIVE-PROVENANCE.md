# Relais Claude — rangée basse V3.3 (variante A), retrait de « Privé », provenance des doublons sur la Carte

Cadre : décision du propriétaire du 20 novembre (relayée par ChatGPT) :
- « Je valide la variante A de la maquette V3.3. Conserve l'interface classique inchangée et applique les tests de non-régression habituels. »
- Variante B différée : « tant que la Carte cosmique n'a pas retrouvé toutes les fonctions de `cosmos.html`, le lien Structures cosmiques doit rester directement visible ».
- Supprimer l'étiquette « Privé », trompeuse pour un site public par lien, sans la remplacer par un autre badge permanent.
- Sur la Carte, rendre la provenance des deux catalogues compréhensible : deux positions ne signifient pas deux galaxies.

## 1. Rangée basse, variante A (essai immersif)

Mise en œuvre conforme à `docs/conception/maquettes-v3.3/README.md` :
- **« Mission ▾ »** contient Choisir la Terre, Choisir la Lune, (Reprendre / Conserver en attente), un séparateur, **Nouvelle mission** et **Mission cosmologique ↗**.
- **Pastille Temps** : « ▶ Reprendre le temps » et la vitesse de lecture côte à côte. Le sélecteur garde son nom accessible, « Vitesse de lecture du voyage ».
- **« Reprendre les commandes »** apparaît seulement quand un automatisme est actif : pilote automatique, assistance orbitale, passage, champ gravitationnel, lecture automatique ou arrivée.
- Propulsion inchangée.

Ce sont **les mêmes éléments, avec les mêmes identifiants, déplacés**. Rien n'est dupliqué. En interface classique, chacun retrouve sa place d'origine, y compris après des allers-retours Classique ↔ Immersive pendant la session (contrôlé).

Ciel non occulté, Mars sélectionnée, 1280 × 585 : **76,8 %**, contre 73,4 % avant (maquette : 76,5 %).

Captures : `validation/ui/cockpit-immersive-1280x585-barre-a.jpg` et `…-barre-a-menu.jpg`.

## 2. Étiquette « Privé » retirée

Retirée de l'en-tête des trois pages qui l'affichaient : cockpit (« ◈ Privé »), Structures cosmiques (« Privé ») et accueil (« Espace privé », avec son cadenas). Aucun badge ne la remplace. Les en-têtes ont été contrôlés sur capture à 1280 × 585 et 390 × 844 : aucun débordement, alignement conservé. Quelques règles CSS `.private` restent sans effet. Le README contient encore des mentions historiques « privée », qui ne priment pas (CLAUDE.md).

**C'est le seul changement de ce relais visible pour tous les visiteurs**, à la demande du propriétaire.

## 3. Provenance des doublons sur la Carte (session d'essai)

Quand « Les deux » catalogues sont affichés :
- un **trait ambre** relie les deux points d'une même galaxie (McConnachie 2012 ↔ UNGC 2013) ;
- une note sous les options compte : « 969 points · 873 galaxies distinctes : 96 figurent dans les deux catalogues, reliées par un trait ambre (même galaxie, deux mesures de distance) » ;
- un clic sur l'un des deux points explique l'écart, par exemple : « M32 : McConnachie 2012 2,63 Mal, UNGC 2013 1,6 Mal (écart 64,3 %). Une seule galaxie, deux mesures ; le cockpit retient UNGC 2013 ».

Avec un seul catalogue affiché, la note rappelle la source : « 101 galaxies · McConnachie 2012 ».

## 4. ⚠️ Constat scientifique à trancher : le cockpit retient UNGC pour les galaxies du Groupe local

En vérifiant la notification, j'ai mesuré les écarts sur les 100 galaxies présentes dans les deux catalogues (distances telles qu'elles figurent dans nos fichiers) :

| Écart de distance | Nombre de galaxies |
|---|---|
| > 5 % | 32 |
| > 10 % | 15 |
| > 20 % | 6 |
| > 50 % | 1 (M32) |

| Galaxie | Hôte | McConnachie 2012 | UNGC 2013 | Écart |
|---|---|---|---|---|
| M32 | M31 | 0,805 Mpc | 0,49 Mpc | 64 % |
| Sagittarius dSph | Voie lactée | 0,026 Mpc | 0,02 Mpc | 30 % |
| Ursa Minor | Voie lactée | 0,076 Mpc | 0,06 Mpc | 27 % |
| Pegasus dIrr | — | 0,92 Mpc | 0,76 Mpc | 21 % |
| Andromeda XV | M31 | 0,631 Mpc | 0,76 Mpc | 20 % |
| IC 10 | M31 | 0,794 Mpc | 0,66 Mpc | 20 % |

Deux causes :
1. **Arrondi** : UNGC donne ses distances au centième de Mpc, ce qui dégrade fortement les satellites proches de la Voie lactée (0,02 Mpc pour Sagittarius au lieu de 0,026).
2. **Mesures différentes** : pour M32, la valeur UNGC de nos données place ce satellite de M31 à environ 1 million d'al **devant** M31 (2,5 Mal). McConnachie la place au voisinage de M31.

Or la règle de dédoublonnage du cockpit (`buildLocalGalaxies`, catalogue UNGC lu en premier) **retient UNGC** pour ces 100 galaxies. Cela vaut pour le cockpit public : recherche, destinations et distances de vol.

**Proposition, non appliquée** : pour une galaxie présente dans McConnachie 2012, compilation dédiée au Groupe local avec trois chiffres significatifs, retenir la distance McConnachie et garder UNGC comme seconde source affichée dans la fiche. Cela modifie des données servies au public et le travail de Codex sur les catalogues. **Je ne l'applique pas sans décision du propriétaire.** Avant toute décision, il faudra vérifier la valeur UNGC de M32 dans la publication d'origine : je ne peux pas consulter la source d'ici, et l'écart peut venir de la méthode de mesure comme d'une erreur de transcription.

## 5. Vérifications exécutées

Local (Chromium SwiftShader, Playwright préinstallé) :
- `validate-observation-gestures.cjs` : **50/50**. Nouveaux contrôles : trois groupes visibles ; Nouvelle mission et Mission cosmologique dans le menu, visibles et cliquables ; vitesse de lecture à côté de « Reprendre le temps », nommée et modifiable ; « Reprendre les commandes » masqué sans automatisme, affiché avec un pilote automatique engagé (session d'essai), masqué après reprise ; aller-retour Classique ↔ Immersive ; Classique avec cinq groupes et positions d'origine ; aucune mention « Privé » dans l'en-tête.
- `validate-cosmic-map-feasibility.cjs` : **14/14**. Nouveaux contrôles : 96 doublons reliés et galaxies distinctes comptées ; clic sur un doublon → notification sur les deux mesures.
- Captures des en-têtes de l'accueil et de Structures cosmiques (1280 × 585 et 390 × 844) : pas de débordement horizontal.
- Non-régression, réussis (code 0) : `validate-feature-inventory.cjs`, `validate-search-and-map-errors.cjs`, `validate-rendezvous-ui.cjs`, `validate-cockpit-layout-ui.cjs`, `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs`, `validate-cosmos.cjs`, `validate-cosmos-zoom-ui.cjs`, `validate-mission-storage.mjs`.
- Parcours cockpit complet (`validate-physics-ui.cjs`) : verdict sur la CI.

CI GitHub sur `0bc341a` : « Reproducible validation from npm ci », relancé à la main (https://github.com/Tommy1er/odyssee/actions/runs/44758298839) et déclenché par le push (run 44758299512) : les 9 jobs réussis dans les deux exécutions. Les cinq autres workflows du commit ont aussi réussi, dont « Cosmic map zoom and cockpit integration » (page Structures cosmiques).

Non vérifié : Chrome Iris Xe (publication nécessaire).

## 6. Appliqué le 20 novembre : distance McConnachie 2012 pour les doublons du Groupe local

Décision du propriétaire : « je valide cela » (proposition du § 4).

- `adoptLocalGroupDistance` (`src/catalogue-galaxies.js`) : quand une ligne McConnachie 2012 est reconnue comme la même galaxie qu'un objet UNGC 2013, **l'objet UNGC est conservé** (identifiant, missions sauvegardées, type, taille, photométrie, liens), mais **sa distance devient celle de McConnachie**. Sa position garde la direction UNGC, à la distance McConnachie, et `baseXYZ` est mis à jour pour les mouvements. Champs ajoutés : `distanceSource`, `distanceRow`, `altDistance`.
- **99 galaxies** concernées. M32 passe de 1,60 à **2,626 millions d'al** (0,805 Mpc), au voisinage de M31 ; IC 10 passe à 2,590 millions d'al.
- **Fiche** : « 0,805 Mpc (2,626 millions d'al), McConnachie 2012 (compilation du Groupe local) · seconde source UNGC 2013 : 0,49 Mpc (écart 64,3 %) ».
- **Carte (essai)** : la notification indique désormais que le cockpit retient McConnachie 2012. L'écart entre le point McConnachie et l'objet du cockpit est de **0 al** pour And XXVIII (il était de 35 900 al).
- Reste à faire : vérifier la valeur UNGC de M32 dans la publication d'origine. Elle n'est plus utilisée pour la position, mais reste affichée comme seconde source.

Vérifications : `validate-catalogue-galaxies.mjs` **21/21**, dont un contrôle de position modifié (direction du catalogue × distance retenue) et un nouveau contrôle sur M32 ; `validate-extragalactic.mjs`, `validate-catalogue-sky.mjs`, `validate-galaxy-photometry.mjs`, `validate-map-preview.mjs` réussis. Suites navigateur réussies (code 0) : `validate-cosmic-map-feasibility.cjs` (14/14), `validate-observation-gestures.cjs`, `validate-feature-inventory.cjs`, `validate-search-and-map-errors.cjs`, `validate-catalogue-ui.mjs`, `validate-galaxy-ui.cjs`, `validate-rendezvous-ui.cjs`, `validate-cockpit-layout-ui.cjs`, `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs`, `validate-mission-storage.mjs`.
