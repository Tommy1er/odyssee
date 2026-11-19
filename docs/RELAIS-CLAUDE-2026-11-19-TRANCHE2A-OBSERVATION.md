# Relais Claude — tranche 2a : gestes d'observation dans l'essai immersif (chercher, cadrer, zoomer, observer, revenir)

Cadre : GO du propriétaire du 18 novembre (autonomie technique, tests de non-régression, **aucune refonte publique avant validation de l'expérience**) et contre-avis ChatGPT du 19 novembre (`docs/audits/task-force-2026-11-18/CONTRE_AVIS_CHATGPT_PARCOURS_TRANCHE2_2026-11-19.md`, commit `8eafaf3`).

**Périmètre : essai immersif seulement** (`cockpit.html?ui=immersive`). L'interface classique, celle de tous les visiteurs, garde exactement son comportement : « Voir / suivre la cible » y oriente toujours le nez, et la molette n'y zoome pas (contrôlé par le test).

## 1. Ce qui change dans l'essai immersif

| Geste | Comportement | Effet sur le vaisseau |
|---|---|---|
| **Cadrer la cible (regard seul)** | La caméra suit la cible. Le bouton devient « Cible cadrée · Échap pour revenir ». La télémétrie affiche « regard ≠ nez · N° » dès que l'écart dépasse 1°. | Aucun : position, impulsion, **attitude `state.q`**, horloges, moteur, autopilote, maintien inchangés. |
| **Zoomer** | Molette ou pincement du pavé tactile (`Ctrl+molette`) sur le ciel ; touches `+` et `−`. Champ de 70° à **1°**. | Aucun. |
| **Observer** | « Qu'est-ce que je regarde ? » ouvre la fiche existante. | Aucun. |
| **Revenir** | Bouton « Revenir à la vue du nez » (visible seulement si la vue a changé) ou `Échap`. Champ 70° et regard sur le nez. | Aucun. |
| **Orienter le nez** | Inchangé : seul ce bouton tourne le vaisseau vers la cible. | Voulu. |
| **Engager le trajet** | Inchangé : seul ce bouton fait partir le vaisseau. | Voulu. |

Libellé du champ : `CHAMP 70°` au repos, puis par exemple `CHAMP 4,7° · GROSSISSEMENT ×17` en zoom.

## 2. Réponses au contre-avis

**2.1 Attitude.** Le test compare désormais `pos`, `u`, **`attitude` (`state.q`)**, `t`, `tau`, moteur, autopilote, pause, maintien, état orbital, gravité et dernier saut, avant et après chaque geste, simulation en pause. `flightSnapshot()` expose `attitude` et `view` (`trackTarget`, `viewOnly`, `fov`) pour cela.
Correction de `steer()` : la copie du quaternion de la caméra dans `state.q` est **conservée pour le suivi classique** (reprise du pilotage), et **sautée quand le suivi est un cadrage en regard seul**. Piloter après un cadrage lève le suivi, réaligne le regard sur le nez et le signale (« Regard réaligné sur le nez · l'orientation du vaisseau n'a pas été modifiée par le cadrage »). Le test maintient `←` après un cadrage décalé de 67° : le nez ne tourne que de **4,6°** (la commande elle-même), pas des 67° de la caméra.

**2.2 Grossissement.** Convention retenue : **grossissement = tan(35°) / tan(champ / 2)**, rapport des grandeurs apparentes au centre entre le champ normal (70°) et le champ courant. 70° → 1° donne ≈ ×80. Le champ en degrés est toujours affiché en premier. Contrôle : libellé ×17 pour un attendu de ×17,05 à 4,7°. À documenter dans le manuel (`public/physics-v2.html`) à la publication.

**2.3 Priorités et accessibilité.**
- La molette ne zoome que **sur le canvas du ciel** : les tiroirs et listes défilent normalement. Pas de zoom optique en vue extérieure (la molette y reste aux commandes de la caméra extérieure), ni sur la Carte, ni dans le laboratoire optique.
- **Ordre d'Échap** : fiche ouverte → tiroir ouvert → menu Mission → vue. Chaque Échap ne ferme qu'une couche (`e.odysseeHandled`), la vue n'est réinitialisée qu'en dernier. Testé pour fiche → tiroir → vue ; le menu Mission suit la même règle dans le code, sans test dédié.
- **Alternatives clavier** : `+`/`=` et `−` pour le zoom, `Échap` et le bouton pour revenir.
- **Un seul verbe « Revenir à la vue du nez »** au lieu de deux (« vue précédente » / « aligner sur le nez ») : dans l'essai immersif, la vue précédant un cadrage est toujours la vue du nez, les deux sens coïncident. Je dédoublerai le jour où une vue intermédiaire existera (Observatoire).

**2.4 Objets non résolus.** **Pas encore fait.** Le zoom agrandit ce que le rendu dessine déjà, sans rien inventer, mais n'indique pas encore qu'un repère ponctuel (étoile lointaine, centre de galaxie approximé, bassin CF4) n'a pas de morphologie à résoudre. C'est le premier point de la tranche 2b (statut « repère / reconstruction / objet non résolu » dans la fiche et près du libellé de champ).

**2.5 Optique relativiste.** Lecture du code (`src/renderer.js`, `src/sky-optics.js`) : l'aberration, le Doppler et la projection de l'observateur prennent `s.u` et `s.pos` (état du vaisseau). La caméra n'intervient que pour la projection des rayons (`camera.matrixWorld`, `camera.fov` → `tanFov`). Le cadrage en regard seul réutilise le mode `trackTarget` existant du moteur, déjà employé par l'interface classique. **Vérifié par lecture seulement, sans test pixel** dédié ; un contrôle d'uniformes avant / après cadrage reste à écrire.

**Point 4 (sauvegarde du propriétaire).** L'extension Chrome ne permet pas d'ouvrir une fenêtre de navigation privée. Je l'ai remplacée par une **session d'essai au niveau de l'application** : `?essai=1` suffixe toutes les clés de stockage (`odyssee.mission.v1.essai`, `odyssee-ui-mode.essai`, `odyssee-graphics-profile.essai`). La session ne lit pas la mission personnelle, ne la propose pas, ne l'écrit jamais, et affiche « Session d'essai · sauvegarde isolée » dans l'en-tête. Le test pose une sauvegarde sentinelle sous la clé personnelle, joue tout le parcours, change de mission, force l'enregistrement (`pagehide`) : la sentinelle est intacte et la mission d'essai est écrite à part.
Limite : même profil Chrome, donc même cache HTTP et même cache GPU que la session normale. Les mesures Iris Xe faites en essai ne seront pas des démarrages à froid.

**Point 5.4 (sens de « Voir / suivre »).** Dans l'essai immersif seulement, le bouton ne tourne plus le nez et s'appelle « Cadrer la cible (regard seul) ». **À valider par le propriétaire avec l'expérience** avant toute généralisation à l'interface classique.

## 3. Vérifications exécutées

Local (Chromium SwiftShader, Playwright préinstallé, 1280 × 585) :
- `validate-observation-gestures.cjs` (nouveau, `npm run test:ui:observation`, ajouté à `test:ui` et au job « observation » de la CI reproductible) : **28/28** (`validation/observation-gestures.json`).
- Non-régression, réussis (code 0) : `validate-feature-inventory.cjs` (30/30), `validate-search-and-map-errors.cjs`, `validate-rendezvous-ui.cjs`, `validate-cockpit-layout-ui.cjs`, `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs`, `validate-mission-storage.mjs`. Ces suites ont tourné avant le dernier changement (libellé immersif du bouton de cadrage), après lequel seul le test d'observation a été relancé.
- Parcours cockpit complet (`validate-physics-ui.cjs`) : verdict sur la CI.

CI GitHub sur `2ba60e8` : « Reproducible validation from npm ci » relancé à la main (https://github.com/Tommy1er/odyssee/actions/runs/44529881671). Réussis : numerical, cockpit (parcours complet), cosmos, journey, propulsion, search, inventory et **observation (nouveau job)**. Réussis aussi, déclenchés par le commit : validation reproductible, mise en page du cockpit et instruments, budget d'émission, source et bundle, persistance de mission et nébuleuses, zoom de la carte et intégration au cockpit. Spectres de galaxies : encore en cours au moment de la rédaction.

Non vérifié : Chrome Iris Xe (après publication), pavé tactile Windows réel et écran tactile, scènes lourdes (nébuleuse, trou noir).

## 4. Après publication, sur l'Iris Xe

Lien d'essai : `cockpit.html?ui=immersive&essai=1`. Parcours Mars (chercher, cadrer, zoomer au pavé tactile, observer, revenir), puis Tarentule et trou noir, avec `frameTimingSample(10)`, `skyOcclusion()` et captures. **Je ne toucherai pas à « Reprendre » ni à « Conserver »** dans la session normale.
