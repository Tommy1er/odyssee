# Relais Claude — tranche 2b : fiche de sélection, statut de résolution au zoom, invariance optique

Suite de la tranche 2a (`docs/RELAIS-CLAUDE-2026-11-19-TRANCHE2A-OBSERVATION.md`). Mêmes règles : **essai immersif seulement**, interface classique inchangée, aucune publication sans demande d'Abdoulaye, sauvegarde personnelle jamais touchée (tests en `?essai=1`).

## 1. Fiche de sélection (bandeau du trajet replié)

**Défaut constaté** : dans l'essai immersif, le bandeau de trajet est replié (écran court). Le bouton de cadrage y était **masqué**. Le parcours « chercher → cadrer → observer → engager » exigeait d'ouvrir « Détails » ou le tiroir Navigation.

**Correction** : quand une cible est sélectionnée, le bandeau replié devient une fiche compacte, à la taille de son contenu :

`[Cadrer (regard seul)] [Fiche] [Orienter le nez] [Engager le trajet] [Détails]`

- « Fiche », « Orienter le nez » et « Engager le trajet » sont des **copies** des boutons du tiroir Navigation, qui restent la référence. Elles en reprennent le libellé (« Recalculer vers la cible » en cours de trajet) et l'état désactivé, et déclenchent exactement la même action.
- Tant qu'aucun trajet n'est engagé, la phase « Cible sélectionnée · trajet non engagé » n'est plus répétée sur la fiche : la télémétrie l'affiche déjà (« Mars · pause »). En trajet, à l'arrivée ou en passage, la phase revient.
- Libellés courts : « Cadrer (regard seul) », puis « Cadrée · Échap pour revenir ».

Captures (1280 × 585) : `validation/ui/cockpit-immersive-1280x585-fiche-selection-mars.jpg`, `validation/ui/cockpit-immersive-1280x585-mars-cadree-1deg.jpg`.

## 2. Ce que le zoom peut montrer (réponse au § 2.4 du contre-avis)

Près du libellé de champ, dès que le champ descend sous 70°, une mention dit **par quoi la cible est dessinée** et si elle est résolue. Elle s'appuie sur l'état réel du moteur, pas sur une liste figée :

| Situation | Mention |
|---|---|
| Diamètre apparent inférieur à un pixel au champ courant | « Non résolu à ce champ : diamètre apparent 4,8″, moins d'un pixel » (en orange) |
| Planète du Système solaire dessinée avec sa carte | « Disque ≈ 6,2 px · carte d'après les données NASA (Solar System Scope) », puis « au-delà de la résolution de la carte » si le disque dépasse la largeur de la texture divisée par π (≈ 652 px ; 2 608 px pour la Terre) |
| Corps assez grand mais absent des corps secondaires dessinés | « Disque attendu de N px, non dessiné : seuls les corps les plus visibles le sont » (limite de rendu, en orange) |
| Étoile | « corps noir modélisé (température, rayon), pas une image » |
| Exoplanète | « planète jamais imagée : couleur illustrative » |
| Nébuleuse, amas, nuages | « Modèle volumique reconstitué, pas une image » |
| Galaxie lointaine / proche | « Forme apparente d'après le catalogue (taille, aplatissement, orientation), pas une image » / « Modèle volumique de galaxie » |
| Trou noir | « Image calculée (lentille gravitationnelle et modèle d'émission) » |
| Structure cosmique, repère | « Structure reconstruite à grande échelle : repère, rien à résoudre optiquement » / « Repère de navigation » |

Méthode : diamètre apparent 2·asin(R/d), comparé à l'angle d'un pixel du tampon de dessin, 2·tan(champ/2)/hauteur. C'est la même grandeur que le moteur envoie au shader des corps secondaires (`pixelAngle`). Le statut figure aussi dans `flightSnapshot().view.resolution`.

Relevés locaux (vaisseau à ≈ 2 ua du Soleil, champ 1°) : Mars 4,8″ non résolue ; Jupiter, disque ≈ 6,2 px avec sa carte ; Lune 2,2″ non résolue ; Sirius non résolue (≈ 6 millisecondes d'arc ; ce relevé a été fait avant la correction de l'affichage des angles inférieurs à 1″, qui indiquait « 0″ ») ; galaxie naine d'Orion (UNGC), forme du catalogue, 5,9′ ; M31, modèle volumique, 5°. La structure Laniakea n'a pas été relevée : le délai de la sonde a été dépassé sous SwiftShader.

## 3. Optique relativiste indépendante de la caméra (réponse au § 2.5)

Nouveau diagnostic en lecture seule, `window.opticalObserver()` : axe et module de l'impulsion, γ, optique et Doppler actifs, position et vitesse envoyées au shader des étoiles, `tanFov` et rotation de projection.

Contrôles ajoutés au test, **vaisseau en mouvement** (|u| = 7,0·10⁻⁵, simulation en pause) :
- cadrer ne change aucune grandeur de l'observateur radiatif, seule la rotation de projection change ;
- zoomer ne change aucune grandeur de l'observateur, seul `tan(champ/2)` change (0,700 → 0,064).

Ce contrôle porte sur les uniformes. Il ne compare pas de pixels.

## 4. Autres corrections de l'essai immersif

- **Étiquette « Hors champ »** : elle pouvait se placer sous la pastille de télémétrie. Elle est maintenant gardée dans le ciel libre (contrôlé par le test).
- **Pied du ciel** : « CHAMP 70° » chevauchait la note de rendu (limite de largeur héritée de l'interface classique). Corrigé ; le libellé de champ n'apparaît plus qu'en zoom.
- Badge d'essai raccourci : « Essai · sauvegarde isolée ».

## 5. Ciel non occulté (1280 × 585, SwiftShader)

| État | Avant 2b | Après 2b |
|---|---|---|
| Mars sélectionnée, vol libre | 73,2 % (bandeau 520 px, sans Cadrer) | **73,4 %** (fiche 508 px, avec Cadrer, Fiche, Orienter, Engager) |
| Mars cadrée, champ 1° | — | 69,9 % (statut de résolution, « Revenir », écart regard / nez affichés) |
| Inventaire, vol libre au démarrage | 69,2 % | 69,5 % |

**Objectif de 80 % non atteint, et je ne le forcerai pas en masquant des fonctions.** Contributions mesurées en vol libre : rangée de commandes basse 7,3 points, liens d'en-tête 3,5, fiche 3,3, télémétrie 3,2, sélecteur de vue 1,6, pied du ciel 1,4, état de vision 1,3, gestes du ciel 1,3. La marge restante est dans la rangée basse : cinq groupes, dont « Mission ▾ » et « Mission cosmologique ↗ » côte à côte, et « Reprendre les commandes / Reprendre le temps / Nouvelle mission ». Les regrouper est une décision d'expérience. Je la proposerai en maquette au propriétaire avant de coder.

## 6. Vérifications exécutées

Local (Chromium SwiftShader, Playwright préinstallé, 1280 × 585) :
- `validate-observation-gestures.cjs` : **38/38**. Nouveaux contrôles : fiche de sélection visible et non recouverte, libellé d'Engager synchronisé, étiquette hors du chemin de la télémétrie et de la fiche, statut de résolution affiché et cohérent avec un calcul indépendant (rayon de Mars et distance lue dans la télémétrie), statut masqué au retour, invariance optique au cadrage et au zoom.
- `validate-feature-inventory.cjs` : 30/30.
- Non-régression, réussis (code 0) : `validate-search-and-map-errors.cjs`, `validate-rendezvous-ui.cjs`, `validate-cockpit-layout-ui.cjs`, `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs`, `validate-mission-storage.mjs`.
- Parcours cockpit complet (`validate-physics-ui.cjs`) : verdict sur la CI.

CI GitHub sur `59cbeb6` :
- « Reproducible validation from npm ci » relancé à la main (https://github.com/Tommy1er/odyssee/actions/runs/44592167138) : les 8 jobs réussis, dont cockpit (parcours complet) et observation.
- Exécution déclenchée par le push (run 44592169071) : job observation en échec sur un seul contrôle, « seule l'orientation de projection change au cadrage ». Cause : sur ce runner lent, aucune image n'avait encore été dessinée 600 ms après le cadrage, donc les uniformes n'avaient pas changé. Ce n'est pas un défaut du cockpit. **Correctif du test** dans le commit suivant : attente de la condition (nouvelle image) plutôt qu'un délai fixe, au cadrage comme au zoom. Après correctif (`18bb5eb`) : 38/38 en local ; « Reproducible validation from npm ci » relancé à la main (https://github.com/Tommy1er/odyssee/actions/runs/44596679750), les 8 jobs réussis, dont observation et cockpit.
- Autres workflows du commit réussis : source et bundle, spectres de galaxies, zoom de la carte et intégration au cockpit, mise en page du cockpit et instruments, persistance de mission et nébuleuses, seconde validation reproductible.

Non vérifié : Chrome Iris Xe (publication nécessaire), pavé tactile réel.
