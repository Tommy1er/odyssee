# Relais Claude — Carte : CF4 adaptatif aux grandes échelles, CF4 par défaut à la Vierge ; état canonique V3.0

Arbitrages du propriétaire du 23 novembre (relayés par ChatGPT), points 3, 8, 9 et 10. **Session d'essai seulement** pour la Carte. `cosmos.html` n'a pas de changement visible.

## 1. Saturation des points CF4 : représentation adaptative

**Problème** : les 55 877 galaxies CF4 étaient dessinées avec un symbole additif de taille fixe (4 px, 50 % d'opacité). Aux niveaux Laniakea, toile cosmique et Univers observable, les symboles s'empilaient en une tache blanche.

**Méthode** (`CockpitCosmicMap.adapt`, recalculée au plus toutes les 0,4 s) :
- On projette un échantillon d'au plus 8 000 galaxies du catalogue affiché.
- On les range dans une grille de 16 px. On en tire le **nombre typique de voisines sous le symbole d'une galaxie** : ω = Σ n² / Σ n × π (taille/2)² / 16², corrigé de l'échantillonnage.
- Chaque symbole ajoute 0,5 × intensité. On vise ω × 0,5 × intensité ≤ 1 : la taille descend d'abord jusqu'à la moitié, puis l'intensité, jusqu'à un plancher de 10 %.
- **Même facteur pour toutes les galaxies** : aucune n'est mise en avant, et l'importance astrophysique relative n'est pas modifiée.
- Pas de regroupement des points : il serait possible, mais il change la nature de ce qui est montré. Je ne l'ai pas fait.

**Résultats** (SwiftShader, 1280 × 585) :

| Échelle | Galaxies dans le cadre | Voisines typiques (ω) | Taille | Intensité |
|---|---|---|---|---|
| Groupe local (McConnachie) | 83 | 0,14 | 4 px | 100 % |
| Toile cosmique (CF4) | 55 739 | 3,3 | 2 px | 61 % (charge locale = 1) |
| Univers observable (CF4) | 55 877 | 328 | 2 px | 10 % (plancher) |

À l'échelle de l'Univers observable, tout CF4 tient dans une tache de quelques dizaines de pixels : même au plancher, le centre reste dense. C'est le message de ce niveau (aucun catalogue n'atteint l'horizon).

Comparaison avant / après, niveau Laniakea : `validation/ui/cockpit-carte-laniakea.jpg`. La tache blanche centrale laisse voir la structure.

`ObservedGalaxies` reçoit un uniforme `intensity`, à 1 par défaut, ce qui ne change rien pour `cosmos.html`. La caméra de la Carte est passée à `CockpitCosmicMap.update`.

## 2. Vierge : Cosmicflows-4 par défaut

- « Selon l'échelle » donne désormais McConnachie 2012 au Groupe local, puis **Cosmicflows-4 dès la Vierge**. UNGC reste sélectionnable.
- Les 3,9 Mo de CF4 ne sont chargés **qu'à l'ouverture du niveau**. Ils ne le sont ni au démarrage du cockpit, ni à l'ouverture de la Carte au Groupe local : le chargeur n'est appelé que lorsque CF4 est demandé.
- `cosmos.html` garde UNGC à la Vierge. Je ne l'ai pas changé sans décision explicite pour cette page.

## 3. Maintenance

- `A-LIRE-CHATGPT-CODEX.md` supprimé, avec ses renvois dans `CLAUDE.md` et `COLLABORATION.md` (point 8 : lu et traité par ChatGPT).
- **État canonique** : `docs/ETAT-ODYSSEE-V3.0.md`. Il contient les décisions en vigueur, la matrice de la directive (livré, essai, partiel, différé, à auditer) et les étapes restantes. Aucun relais n'a été déplacé.

## 4. M32

Rien à changer dans le code : la position vient de McConnachie (0,805 Mpc), et la fiche affiche UNGC (0,490 Mpc) en seconde source avec l'écart. Le rapprochement avec la table originale de Karachentsev et al. 2013 (CDS) reste à faire. Il est noté dans l'état canonique.

## 5. Vérifications exécutées

`validate-cosmic-map-feasibility.cjs` **44/44**. Nouveaux contrôles :
- CF4 par défaut à la Vierge, et UNGC sélectionnable ;
- représentation adaptée à la toile cosmique et à l'Univers observable ;
- Groupe local non atténué.

Un premier passage a échoué sur deux contrôles de minutage : l'horizon était lu avant l'image suivante, et le Groupe local avant le recalcul. Les deux attendent maintenant la condition.

Autres suites : voir `PUBLICATION.md`. Non vérifié : Iris Xe, qui demande d'abord une publication.

## 6. Suite : contrôle en ligne sur Iris Xe (v63) et réglage

Vérifié en ligne (v63, Chrome du propriétaire, fenêtre de 1280 × 529, densité de pixels 1,5) :
- **Vierge** : Cosmicflows-4 par défaut (55 877 galaxies), chargé à l'ouverture du niveau.
- **Laniakea** : bassins non téléchargés tant qu'ils ne sont pas demandés. Symboles adaptés à 4,9 px, intensité 100 % (ω = 2,0).
- **Univers observable** : intensité au plancher, horizon affiché.

Sur l'écran du propriétaire, le **cœur de Laniakea restait blanc**. La mesure par moyenne pondérée (Σn²/Σn) visait la galaxie typique, et les cellules du cœur, plus denses, saturaient encore. La foule est désormais mesurée au **75e centile pondéré** des cellules : 75 % des galaxies sont dans des cellules moins denses. En local (toile cosmique), l'intensité passe de 61 % à 49 %. La structure du cœur reste lisible (`validation/ui/cockpit-carte-laniakea.jpg`). `validate-cosmic-map-feasibility.cjs` : 44/44.

**Cadence non mesurable ce jour-là** : dans les trois vues (cockpit, Carte, Groupe local), toutes les images duraient exactement 1 016 ms, alors que le fil principal était libre. Le navigateur cadençait donc la page à une image par seconde : fenêtre Chrome hors du premier plan ou couverte, même si la page se déclare « visible ». Ce chiffre ne mesure pas Odyssée. La mesure est à refaire avec la fenêtre Chrome au premier plan.
