# Relais Claude — tranche 1 : interface immersive en essai (Classique par défaut) et démarrage en onglet caché

Cadre : GO du propriétaire du 18 novembre (orientations de l'addendum V1.1, tranche 0, V3.2, puis tranche 1 réversible). **Aucune refonte publique** : l'interface classique reste celle de tous les visiteurs. L'essai immersif n'apparaît qu'avec le lien `cockpit.html?ui=immersive`, ou si ce navigateur l'a déjà choisi.

## 1. Démarrage dans un onglet caché

Mesure v56 sur Iris Xe : 11,1 s perdues à attendre une image quand l'onglet est caché au démarrage (`docs/RELAIS-CLAUDE-2026-11-18-MESURES-V56-IRISXE.md`).

Correctif (`src/cockpit.js`) : l'attente `nextFrame()` avant la construction du moteur est **sautée si `document.hidden`**, et **bornée à 250 ms** sinon. Elle ne sert qu'à laisser afficher la progression, ce qui est inutile si rien n'est visible. Test : un onglet simulé caché démarre avec une attente de **0 ms** (`validate-feature-inventory.cjs`).

## 2. Réglage d'interface

- Bouton `#ui-mode-toggle` dans l'en-tête (« Interface immersive » / « Interface classique », `aria-pressed`).
- Choix mémorisé dans ce navigateur (`localStorage['odyssee-ui-mode']`) ; `?ui=immersive` ou `?ui=classic` pour les essais.
- **Classique par défaut.** La bascule est invisible sans `?ui=` ni choix mémorisé, pour qu'aucun visiteur ne tombe sur une interface non validée.
- Bureau seulement (largeur ≥ 901 px). Le téléphone garde sa disposition actuelle.

## 3. Disposition immersive (mêmes éléments DOM, repositionnés)

- **Ciel plein fenêtre** (le canvas occupe 1280 × 585). Le moteur suit la taille du canvas : aucune modification du rendu.
- **En-tête en pastilles flottantes** : marque, vues (Cockpit / Vaisseau 3D / Carte galactique 3D), liens. « Atlas ↗ » est masqué en immersif : c'est le même lien que la marque.
- **Pastille de télémétrie** sous l'en-tête, à droite : cible, état, v, γ, restant, temps à bord, temps de référence. Elle **recopie 4 fois par seconde les valeurs déjà calculées** par le cockpit (`#speed`, `#gamma`, `#navigation-distance`, `#ship-clock`, `#earth-clock`, `#flight-status`) : aucun calcul physique nouveau.
- **Tiroirs Navigation (N) et Instruments (I)** : ils recouvrent le ciel sans le redimensionner, avec des onglets sur les bords. Fermés, ils sont `inert`, donc hors tabulation. Ils se ferment par Échap ou par un clic dans le ciel. Le tiroir Navigation réutilise la classe `nav-open` existante (tiroir mobile).
- **Commandes en pastilles basses** : les cinq groupes existants. Leurs intitulés sont gardés pour les lecteurs d'écran et masqués à l'œil. « Mission ▾ » fonctionne comme sur écran court.
- **Couches du ciel** : état optique, vision, « Qu'est-ce que je regarde ? » et « Vue dégagée » regroupés sous l'en-tête ; légende du ciel sur une ligne ; notification au-dessus des commandes ; légende de la carte galactique à droite.
- **Aucun texte visible sous 12 px** en immersif (21 en interface classique sur écran court).
- Panneaux semi-opaques, **sans `backdrop-filter`**.

## 4. Mesures locales (Chromium SwiftShader, 1280 × 585)

| Interface et état | Ciel non occulté |
|---|---|
| Classique, vol libre | 35,8–37,8 % |
| **Immersive, vol libre au démarrage** (indicateur « préparation graphique » encore affiché) | **69,2 %** |
| Immersive, vol libre, préchauffage terminé | ≈ 73,5 % |
| Immersive, vue extérieure à Mars | 66,8 % |
| Immersive, Carte galactique 3D | 69,4 % |
| Maquette V3.2 (référence de conception) | 83,7–88,1 % |

**Écart avec la V3.2 (≈ 10 à 15 points)** : le vrai cockpit affiche en plus le suivi du trajet (≈ 3 %), le groupe « Commandes » (≈ 2,7 %) et la manœuvre locale à l'arrivée. Les rapprocher de l'objet sélectionné, sous forme de fiche, relève de la **tranche 2**. Je n'ai masqué aucune fonction pour gagner des points.

Limite connue, partagée avec l'interface classique à cette hauteur : à 585 px, la carte de la cible du tiroir Navigation (Engager, Orienter, Libérer) demande un défilement du tiroir.

## 5. Inventaire (garde-fou)

`validate-feature-inventory.cjs` : **30/30**.
- Classique : 15 groupes, 95 identifiants ; noyau atteignable à 1440 × 900 et 1280 × 585.
- Immersive : disposition active et ciel plein écran ; mêmes 95 identifiants ; noyau, tiroirs et bascule atteignables sans défilement ; tiroirs fermés inertes ; recherche puis Engager / Orienter atteignables (après défilement) ; Instruments d'observation atteignables ; un clic dans le ciel referme les tiroirs ; télémétrie renseignée ; retour à Classique ; Classique par défaut et bascule invisible sans `?ui=`.
- Démarrage en onglet caché : attente d'image de 0 ms.

## 6. Vérifications exécutées

Local (Chromium SwiftShader, Playwright préinstallé) :
- `validate-feature-inventory.cjs` : 30/30.
- Réussis (code 0) : `validate-search-and-map-errors.cjs`, `validate-rendezvous-ui.cjs`, `validate-cockpit-layout-ui.cjs`, `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs`, `validate-mission-storage.mjs`.
- Captures immersives contrôlées à l'œil (1280 × 585) : vol libre, tiroirs ouverts, Saturne, Mars en vue extérieure, Carte galactique 3D ; aucun chevauchement détecté entre options du vaisseau, suivi, manœuvre locale et télémétrie. Fichiers : `validation/ui/cockpit-immersive-1280x585-vaisseau3d.png`, `validation/ui/cockpit-immersive-1280x585-carte.png`.
- Parcours cockpit complet (`validate-physics-ui.cjs`) : verdict sur la CI.
- Non vérifié : Chrome Iris Xe (nécessite publication).

## 7. Comparaison sur Iris Xe (après publication)

Sur le Chrome du propriétaire, mêmes scènes (vol libre, Mars en vue extérieure, Carte) : Classique contre Immersive, puis Immersive en profils Performance, Équilibré et Qualité. Pour chaque cas : `skyOcclusion()`, `frameTimingSample(10)` et une capture. Référence Classique déjà relevée en v56 : 14,4 images/s, médiane 50 ms, p95 234 ms (vol libre, machine chargée).
