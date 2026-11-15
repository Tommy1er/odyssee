# UI/UX — écran court : complément à la tranche cockpit de Codex ; navigation commune du laboratoire (15/11/2026)

Claude, à la demande d'Abdoulaye (« tu gères un peu l'UI/UX »). Travail mené en parallèle de la tranche Codex `ac10f51`–`f9c2edf` (version 50) sans le savoir ; ma première version a été abandonnée et refaite **par-dessus** la structure de Codex, qui est conservée intégralement (instruments repliés, grille, palette, typographie). Aucune équation, aucun rendu, aucune commande modifiés.

## Constat sur la machine de référence (Chrome Windows d'Abdoulaye : 1280×585 px CSS, DPR 1,5 — portable 1080p à 150 %)

Le banc de Codex teste 1440×900, 1200×780 et 960×700 ; la fenêtre réelle d'Abdoulaye fait 585 px de haut. Mesures `getBoundingClientRect`, reproduites à l'identique en local, à l'arrivée à la Tarentule :

| | Avant (v48) | Codex seul (v50) | Avec ce complément |
|---|---|---|---|
| Page / fenêtre | 964 / 585 — défilement, commandes de vol hors écran | 585 / 585 | 585 / 585 |
| Zone de vol | 555 px | **278 px** | **470 px** |
| Barre de commandes | 297 px, sous le pli | 215 px (grille sur 2 rangées, textes 12 px) | 65 px, une rangée |
| Suivi du trajet à l'arrivée | carte de 154 px posée sur la cible | **écrasé à 24 px** (`max-height:calc(100% - 260px)` sur une vue de 278 px), bouton « Réduire » tronqué | bandeau replié de 43 px sous la cible, « Détails » à un clic |
| Cible visible | derrière la carte | moitié supérieure coupée par la vue courte | entière, centrée |

Captures : `validation/ui/cockpit-1280x585-{avant,v50,apres}.png`.

## Ce qui change

1. **Bloc « écran court »** en fin de `cockpit.css` : `@media (min-width:901px) and (max-height:760px)` (ordinateurs portables ; les téléphones ne sont pas concernés). En-tête 50 px, pied clavier masqué, barre de commandes en une rangée (étiquettes 9 px, boutons 11 px — en deçà de la charte, assumé pour tenir ; sur écran ≥ 760 px les 12 px de Codex s'appliquent), suivi du trajet sans plafond de hauteur et remonté au-dessus de la manœuvre locale, actions de vue remontées.
2. **Suivi du trajet replié à l'arrivée sur écran court** : `shortScreen()` dans `cockpit.js`, aux trois points où une arrivée ouvrait la carte. Grand écran : inchangé. « Reprendre les commandes » : inchangé.
3. **Navigation commune des pages labo** (`cosmology`, `cosmic-flight`, `propulsion`) : la même barre partout — ✧ ODYSSÉE · LABORATOIRE — Cockpit · Observatoire cosmologique · Voyage cosmologique · Banc de propulsion · Manuel scientifique, page courante marquée (`aria-current`). Avant, trois jeux de liens différents et trois noms pour le banc. Vérifiée à 390 px de large.
4. `docs/conception/CHARTE-UI-V3.md` : charte transmise par Abdoulaye (texte ChatGPT), archivée comme référence. Accord avec sa recommandation « maquettes avant refonte » ; les maquettes peuvent être des pages HTML statiques dans `docs/conception/maquettes/`, validées écran par écran.

## Vérifications exécutées

`validate-cockpit-layout-ui` (banc de Codex : 1440×900, 1200×780, 960×700, instruments repliés, clavier, bande spectrale, vue dégagée, invariance position/impulsion/horloges), `validate-physics-mobile`, `validate-cosmology-ui`, `validate-cosmic-flight-ui`, `validate-propulsion-ui`, `validate-cosmos-context-ui` (démarrage direct, M31, diagnostic, perte et restauration de contexte) : **tous PASS**. Build OK. Les trois pages labo n'ont aucun test lié aux noms des liens.

## À faire par Codex, puis à mesurer sur Iris Xe

Publier, puis sur le Chrome d'Abdoulaye : démarrage, arrivée Tarentule et Cygnus X-1 — pas de défilement, bandeau replié, « Détails », « Vue dégagée » (hauteur adaptée à l'en-tête de 50 px), « Instruments d'observation » atteignable dans la colonne droite défilante. Suggestion pour le banc de Codex : ajouter 1280×585 (DPR 1,5), qui est la fenêtre réelle de la machine de référence.

## Suite proposée (non commencée)

Même ordre que la « suite de la conception » du relais Codex : colonnes plus compactes, fiche d'objet à deux niveaux (découverte / scientifique), continuité sélection–carte–vol, puis visualiseur d'observations réelles (Aladin Lite) chargé à la demande. Maquettes HTML statiques dans `docs/conception/maquettes/` avant toute implémentation de ces écrans. Travail strictement séquentiel avec Codex sur `cockpit.css`/`cockpit.html` : ce fichier a été touché par les deux le même jour.
