# Relais Claude — v60 : parcours S2 vérifié en ligne ; comparaison des vaisseaux non concluante, banc de mesure ajouté

v60 publiée par Codex le 23 novembre (GitHub `e65d837`, Sites `d954c72`). Vérifications de Claude le même jour, sur le Chrome de bureau du propriétaire (Iris Xe), en session d'essai. Aucun clic sur « Reprendre la mission sauvegardée » ni sur « Conserver ce nouveau vol ».

## 1. Parcours S2 en ligne : conforme

`cockpit.html?essai=1`, passage stable vers Sagittarius A*, puis « Observer l'orbite de S2 » :

| Étape | Mesure |
|---|---|
| Kepler, péricentre (champ 2,04 ua) | écart 0′, 0 ua, 0 px : les repères se superposent |
| Relativité, orbite entière (champ 2 547 ua) | 12,18′ ; 0,424 ua ; **0,12 px**, avec l'invitation à passer au péricentre |
| Relativité, péricentre (champ 2,04 ua) | **12,18′ ; 0,424 ua à 119,7 ua de Sagittarius A* ; 147 px** |
| Entrée, changements de cadrage, sortie par Échap | position, impulsion, horloges, moteur et pause inchangés |

Le nombre de pixels est plus grand qu'en local (147 contre 126), car le tampon de dessin est plus haut sur ce Chrome. L'angle et la distance sont identiques.

## 2. Comparaison Odyssée-01 / Odyssée-02 : non concluante

Méthode prévue : même scène (cible Proxima Centauri, simulation en pause, vue « Vaisseau 3D », caméra et éclairage astrophysique par défaut), une page `?ui=immersive&essai=1&vaisseau=01` puis une page `?ui=immersive&essai=1`, trois fenêtres de 4 s chacune.

| Chargement | Vaisseau | Images/s |
|---|---|---|
| 1 | Odyssée-01 | 17,5 · 15,3 · 18,3 |
| 2 | Odyssée-02 | 11,0 · 10,7 · 6,8 |
| 3 | Odyssée-01 | **2,5 · 2,5 · 2,8**, puis 2,8 · 2,8 après 15 s |

Le même Odyssée-01 est passé de 17 à 2,5 images/s d'un chargement à l'autre, sans aucun changement de scène. L'ordinateur était sur secteur, l'onglet visible et au premier plan. Le 22 novembre, Odyssée-02 tenait environ 25 images/s dans la même vue. **La machine a donc changé d'état pendant la mesure**, sans doute à cause d'autres programmes ou d'une limitation thermique. Les rechargements successifs ne permettent pas d'isoler le coût du vaisseau. Je ne tire aucune conclusion de ces chiffres.

## 3. Banc de mesure ajouté (essai)

Pour supprimer cette variance, `window.shipBenchmark({rounds, ms, settle})` alterne **dans la même page** Odyssée-01 et Odyssée-02 (ordre 01, 02, puis 02, 01…), avec la même scène, la même caméra et la même lumière. Il mesure chaque vaisseau sur des fenêtres courtes, remet ensuite le vaisseau d'origine et renvoie les moyennes. Une dérive de la machine pèse ainsi de la même façon sur les deux vaisseaux. `SpacecraftView.setModel()` prépare le modèle ajouté (ombres et effet relativiste) comme celui du démarrage.

Commande à lancer sur l'Iris Xe, dans la vue « Vaisseau 3D » de la session d'essai, ordinateur au repos :
`await shipBenchmark({rounds:6, ms:3000, settle:1500})`

## 4. Vérifications exécutées

Local : `validate-observation-gestures.cjs` 59/59, dont le banc (alternance 01, 02, 02, 01, puis Odyssée-02 remis). Sous SwiftShader, la vue « Vaisseau 3D » met plusieurs secondes à se dessiner : le test contrôle l’alternance, pas la cadence. CI : voir `PUBLICATION.md`.
