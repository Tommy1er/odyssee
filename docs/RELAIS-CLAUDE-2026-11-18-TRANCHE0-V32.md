# Relais Claude — 18 novembre 2026 : tranche 0 (instrumentation) et maquette V3.2

Cadre : GO du propriétaire du 18 novembre sur l'addendum V1.1 (`docs/audits/task-force-2026-11-18/REPONSE_HEAD_UIUX_V1.md`). La tranche 0 n'est pas une refonte : aucune disposition ni aucun comportement visible ne change.

## 1. Instrumentation du démarrage

### Correction d'une interprétation

Les « ≈ 2,3 s de préparation processeur non tracée » du relais V54 étaient une **erreur d'interprétation de ma part**. La préparation processeur (objets, éphémérides, mouvements galactiques) était déjà comprise dans l'étape « Chargement des catalogues ». L'intervalle non tracé correspond à l'attente `await nextFrame()`, c'est-à-dire la prochaine image `requestAnimationFrame`, juste avant « Construction du moteur ». Une attente aussi longue est typique d'un onglet ou d'une fenêtre que le navigateur ne peint pas (rAF ralenti). Hypothèse cohérente avec la mesure du soir : 0,9 s puis 0,0 s quand la fenêtre était au premier plan. Elle reste **à confirmer** avec les nouveaux traçages.

### Ce qui est tracé désormais (`src/cockpit.js`, `src/gpu-startup.js`, `src/sky-optics.js`)

- « Chargement des catalogues » est découpé en deux sous-étapes : **« Catalogues · téléchargement et lecture JSON »** et **« Catalogues · préparation des objets »**.
- **« Attente de la première image du navigateur »**, avec l'état de l'onglet (visible / caché) et de la fenêtre (active) au moment de l'attente.
- Repères instantanés (`GPUStartup.mark`) : **« Préparation complète du premier rendu »** et **« Interface active »**.
- `gpuStartupDiagnostic().phases` : résumé en millisecondes depuis la navigation, avec `json`, `objects`, `frameWait`, `engine`, `gpuBeforeFirstImage`, `firstImage`, `interfaceActive` et `ordinaryWarmup` (début et fin du préchauffage des variantes optiques après l'interface, horodatés dans `sky-optics.js`).

Exemple local (Chromium SwiftShader, 1280 × 585, DPR 1,5), non représentatif de l'Iris Xe :

| Phase | Début | Durée |
|---|---|---|
| JSON | 0,21 s | 0,57 s |
| Préparation des objets | 0,78 s | 0,52 s |
| Attente d'image (onglet visible, fenêtre active) | 1,30 s | 0,00 s |
| Construction du moteur | 1,30 s | 1,17 s |
| Préparation GPU avant la première image | 2,47 s | 5,99 s |
| Première image / interface active | 8,46 s | — |

## 2. Fonctions de mesure (`src/ui-metrics.js`)

- `window.skyOcclusion()` : part de la fenêtre où le ciel n'est recouvert par aucun élément d'interface. Même méthode que `scripts/measure-sky-occlusion.cjs`, et les zones hors du canvas comptent comme occultées. Valeur dans le cockpit actuel : **35,8 % à 38,9 %** selon la fenêtre et l'état.
- `window.frameTimingSample(secondes)` : intervalles entre images (médiane, p95, maximum, images > 50 ms, visibilité). Temps mural, pas un chronométrage GPU. Il servira à la comparaison des trois réglages graphiques sur l'Iris Xe (décision 3).

Les deux fonctions sont en lecture seule et ne coûtent rien tant qu'on ne les appelle pas.

## 3. Test d'inventaire (`scripts/validate-feature-inventory.cjs`)

C'est le garde-fou de la refonte Immersion (matrice de préservation, § 6 de la réponse du Head). Commande `npm run test:ui:inventory`, ajoutée à `test:ui` et à la matrice de « Reproducible validation from npm ci » (job « inventory »).

- **15 groupes, 95 identifiants** : chacun existe une seule fois et porte un nom lisible.
- **Noyau de pilotage** visible, non recouvert et sans défilement de page, à 1440 × 900 et à 1280 × 585 (écran court : « Mission ▾ » au lieu de Terre / Lune).
- **Mesures informatives, sans échec** : ciel non occulté (38,9 % à 1440 × 900 ; 37,8 % à 1280 × 585) et textes visibles sous 12 px (7 à 1440 × 900 ; **21 en écran court**, dette héritée de mon correctif du 15 novembre, à éteindre en tranche 1).
- Résultat local : 19/19 (`validation/feature-inventory.json`).

## 4. Maquette V3.2 Explorer

`docs/conception/maquettes-v3.2/` (HTML, PNG, README), publiée aussi sur le canevas de conception.

- Télémétrie en pastille supérieure, pilotage en quatre pastilles basses de 44 px, fiche compacte, « Préparer le trajet » puis « Engager le trajet » (D13), alerte prudente sans action automatique (D10).
- Ciel non occulté, 1280 × 585 : **83,7 %** avec un objet sélectionné, **88,1 %** sans sélection. Comparaison avec la même méthode : V3.1 74,9 %, Qwen V2 77,3 %, cockpit actuel 37,8 %. Aucun texte sous 12 px, aucun chevauchement (contrôle automatique).

## 5. Vérifications exécutées

Local (Chromium SwiftShader, Playwright préinstallé) :
- `validate-feature-inventory.cjs` (nouveau) : 19/19.
- Réussis (code 0) : `validate-search-and-map-errors.cjs` (24 contrôles), `validate-rendezvous-ui.cjs`, `validate-cockpit-layout-ui.cjs`, `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs`, `validate-cosmos.cjs`, `validate-mission-storage.mjs`.
- Parcours cockpit complet (`validate-physics-ui.cjs`) : non relancé en local (blocage de capture connu de ce bac à sable) ; verdict sur la CI.
- Maquettes V3.2 : mesure d'occlusion, contrôle des textes < 12 px et des chevauchements sur les six planches.

CI GitHub sur `c312b1e` : « Reproducible validation from npm ci » relancé à la main (https://github.com/Tommy1er/odyssee/actions/runs/44405473314). Réussis : numerical, cockpit (parcours complet), cosmos, journey, propulsion, search, et **inventory (nouveau job)**. Les huit autres exécutions déclenchées par le commit sont également réussies : source et bundle, budget d'émission, bornes GPU à γ élevé, zoom de la carte et intégration au cockpit, persistance de mission et nébuleuses, spectres de galaxies, et deux exécutions de validation reproductible.

## 6. Prochaines étapes (Head, sans nouvelle validation intermédiaire)

1. Après publication de cette tranche par Codex : relever `gpuStartupDiagnostic().phases` sur l'Iris Xe, au premier chargement puis au retour depuis la Carte, pour confirmer ou infirmer l'hypothèse de l'attente d'image.
2. Tranche 1 « Explorer immersif » derrière un réglage Classique / Immersive (**Classique par défaut**), sur les mêmes éléments DOM, avec le test d'inventaire comme garde-fou et la comparaison graphique (budget actuel, Équilibré, Qualité) sur Mars, la Tarentule et la Carte.
3. Preuve de faisabilité de la Carte dans le cockpit sur le Groupe local, après la tranche 1.

**Aucune refonte ne sera déployée sur le site public avant la validation de l'expérience par le propriétaire.** La tranche 0 peut être publiée sans risque : elle ne change rien de visible.
