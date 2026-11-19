# Relais Claude — 19 novembre 2026 : état du parcours « chercher, cadrer, zoomer, observer, revenir »

Parcours proposé par la consolidation : chercher Mars, la cadrer, zoomer au pavé tactile, l'observer, puis revenir. Même geste sur une galaxie, une nébuleuse ou un repère. Cadrer déplace la caméra ; seul « Engager le trajet » fait partir le vaisseau.

État constaté dans le code de `main` (`4317239`), sans exécution :

| Étape | Aujourd'hui | Écart |
|---|---|---|
| Chercher | Recherche classée (v55) : « Mars » donne Mars en premier, alias conservés. | Aucun. |
| Cadrer | « Voir / suivre la cible » (`viewTarget`) et « Orienter le nez » (`aimTarget`) appellent tous deux `face()`, qui modifie `state.q`, **l'orientation du vaisseau**. En vue cockpit, la caméra est le nez du vaisseau. | Cadrer n'est donc pas « seulement la caméra » : cela change l'attitude du vaisseau, et la direction de la prochaine poussée suit le nez. Ce n'est pas un déplacement, mais ce n'est pas neutre non plus. |
| Zoomer au pavé tactile | **Aucun zoom dans le cockpit** : pas d'écouteur `wheel` ni de pincement dans `src/cockpit.js`. Le champ est fixe à 70° (46° dans le laboratoire optique, `renderer.js`). Le zoom à la molette existe seulement sur la page Structures cosmiques (`src/cosmos.js`). | Fonction à créer. |
| Observer | « Fiche » (`#object-info`) ouvre la fiche de l'objet. | L'Observatoire V3 (fiche à deux niveaux, sources) reste à faire. |
| Revenir | Pas d'action « revenir au cadrage précédent » : on ré-oriente le nez à la main ou on libère la cible. | À créer, avec le zoom. |

## Proposition du Head pour la tranche 2 (conception, puis implémentation dans l'essai immersif)

1. **Séparer le regard du nez.** « Cadrer » tourne la **caméra** (regard libre) sans toucher l'orientation du vaisseau. « Orienter le nez » reste une commande de pilotage. La pastille de télémétrie signale l'écart (« regard décalé du nez de 37° ») tant qu'il existe.
2. **Zoom optique** : pincement au pavé tactile, Ctrl + molette ou molette, sur le **champ de vue** de 70° jusqu'à environ 1°. Il est affiché (« champ 2,3° · ×30 ») avec la mention de provenance. La caméra ne bouge pas, le vaisseau non plus. Limite honnête à afficher : au fort grossissement, les textures planétaires et les sprites d'étoiles montrent leur résolution réelle. Pas d'agrandissement inventé.
3. **Observer** ouvre la fiche, puis l'Observatoire, sans rien changer à la simulation.
4. **Revenir** (bouton et Échap) : champ normal, regard aligné sur le nez, en une action.
5. **Même geste pour tout objet sélectionnable** : planète, étoile, galaxie, nébuleuse, repère. Les tests le vérifieront sur un échantillon de chaque type.
6. Garde-fou : un test vérifie que cadrer, zoomer, observer et revenir **ne changent ni la position, ni l'impulsion, ni les horloges** (`flightSnapshot()` avant et après).

Les mesures de démarrage citées dans la consolidation (19,7 s) sont antérieures aux relevés v56 et v57 : 13,7 s onglet visible avec un cache GPU chaud, 8,9 à 10,0 s ensuite, 32,5 s au premier chargement froid de la matinée, dont 26,8 s de préparation GPU (`docs/RELAIS-CLAUDE-2026-11-18-MESURES-V56-IRISXE.md`, `docs/RELAIS-CLAUDE-2026-11-19-COMPARAISON-IRISXE-V57.md`).
