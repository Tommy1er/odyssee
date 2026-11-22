# Relais Claude — Bassins CF4 masqués par défaut, coût couche par couche, démonstrateur S2 (session d'essai)

Décision du propriétaire du 22 novembre (arbitrage de ChatGPT relayé) : masquer les bassins CF4 par défaut, sans les retirer ; à terme, séparer enveloppes, lignes de courant fixes et animation pédagogique facultative, et mesurer le coût de chaque couche. Préciser que les lignes décrivent un champ de vitesses reconstruit à une époque donnée, et non un film des trajectoires. Ensuite, trois démonstrateurs, en commençant par Sagittarius A*–S2.

**Session d'essai seulement** (`?essai=1`). Interface classique et sauvegardes personnelles inchangées.

## 1. Coût de chaque couche sur Iris Xe (v59 en ligne, avant ce commit)

Mesuré sur le Chrome du propriétaire, Carte au niveau Laniakea avec CF4, en commutant les couches par script dans la session d'essai. Pour figer l'animation, le temps passé aux lignes est remplacé par 0. Fenêtres de 3,5 à 4 s ; deux séries.

| Couches | Images/s (série 1 · série 2) | p95 |
|---|---|---|
| Aucune | 33,3 · 31,7 (27,5 juste après le chargement) | 34 à 50 ms |
| Enveloppes seules | 27,3 · 29,1 | 50 à 67 ms |
| Lignes fixes seules | 29,8 · 29,4 | 67 ms |
| Lignes animées seules | 30,3 · 29,7 | 50 ms |
| Enveloppes + lignes fixes | 23,4 | 100 ms |
| Enveloppes + lignes animées | 23,5 · 22,0 | 100 à 116 ms |

**Lecture** :
- Chaque couche seule coûte environ 10 % des images ; les deux ensemble environ 30 %. Le surcoût vient surtout de leur **superposition** (surfaces transparentes et lignes en mélange additif sur le même écran), pas de l'une ou de l'autre.
- **Figer l'animation ne fait rien gagner** (23,4 contre 22 à 23,5 images/s). La mise en garde de ChatGPT est confirmée : les lignes restent à dessiner.
- D'où le choix appliqué : deux commandes séparées, toutes deux décochées par défaut, et l'animation facultative et décochée.

## 2. Ce qui change dans la Carte (essai)

- « Bassins d'attraction CF4 2023 » (enveloppes) et « Flux reconstruits (lignes de courant) » : **deux cases indépendantes, décochées par défaut**. Les données (3,7 Mo) ne sont téléchargées qu'à la première activation.
- « Animer le sens du courant (pédagogique) » : facultatif, décoché. Sans animation, les lignes sont fixes.
- Note sous les options, quand les flux sont affichés : « Les lignes de courant représentent le champ de vitesses reconstruit à l'époque actuelle, pas les trajectoires futures des galaxies ; l'animation indique seulement le sens du courant. »
- Contrôlé : l'animation fait avancer le temps des lignes et ne déplace aucune galaxie du catalogue.

## 3. Test proposé par Codex : Mars, Tarentule, Cygnus X-1 (v59 en ligne, Iris Xe)

Pour chaque cible : sélection, Cadrer (regard seul), zoom au pavé tactile (Ctrl + molette) jusqu'à 1°, puis « Revenir à la vue du nez ». Simulation en pause.

| Cible | Cadrer | Champ après zoom | Statut affiché | Retour | Physique inchangée |
|---|---|---|---|---|---|
| Mars (1,559 ua) | regard seul | 1° | Disque ≈ 1,2 px, couleur moyenne | 70° | oui |
| Tarentule | regard seul | 1° | Modèle volumique reconstitué, pas une image · 28′ | 70° | oui |
| Cygnus X-1 (7 200 al) | regard seul | 1° | « Image calculée … · 0,00000000038″ » | 70° | oui |

Contrôle indépendant, Mars : 6 779 km à 1,559 ua = 6,0″ ; à 1° sur 706 px, un pixel vaut 5,1″, soit ≈ 1,2 px. Concordant.

**Défaut trouvé et corrigé** : à 7 200 al, Cygnus X-1 fait 3,8 × 10⁻¹⁰″. L'horizon d'un trou noir de 21 masses solaires mesure 124 km de diamètre, et 124 km / 6,8 × 10¹⁶ km = 1,8 × 10⁻¹⁵ rad, ce qui concorde. L'écran était vide, mais le statut annonçait « Image calculée ». Pour un trou noir de moins d'un pixel, il affiche désormais : « Non résolu à ce champ … ; l'image calculée (lentille gravitationnelle) n'apparaît qu'en approche ». Un contrôle a été ajouté au test d'observation.

## 4. Démonstrateur S2 : précession relativiste du péricentre (essai)

- **Modèle** : l'ellipse képlérienne existante reste le **témoin** et le comportement par défaut. Avec l'option, l'argument du péricentre avance de Δφ = 6πGM / (c² a (1 − e²)) par révolution. Avec les paramètres du modèle (M = 4,297 × 10⁶ M☉, P = 16 ans, e = 0,884, a = 1 032 ua), **Δφ = 12,18′**.
- **Mesure de référence** : GRAVITY Collaboration 2020 (A&A 636, L5 ; arXiv:2004.07187) mesure ≈ 12′ par orbite, soit f_SP = 1,10 ± 0,19 fois la prédiction de Schwarzschild.
- **Approximation déclarée** : avance séculaire, régulière dans le temps. En réalité, l'essentiel de l'avance se produit près du péricentre. Cela ne change pas l'écart entre deux péricentres successifs, qui est la grandeur démontrée.
- **Affichage** : orbite tracée révolution par révolution et deux repères partant de Sagittarius A*, le péricentre courant (or) et le précédent (bleu). Ils sont confondus avec Kepler et séparés de 12,2′ avec la relativité. La case affiche la valeur ; aucune exagération de la trajectoire.
- La case ne modifie ni la position du vaisseau ni ses horloges (contrôlé). Hors essai, elle est absente et seul Kepler est utilisé.
- **Limite visuelle** (capture `validation/ui/cockpit-s2-precession-essai.jpg`) : à l'arrivée par passage, le vaisseau est à 1,27 ua de Sagittarius A*, bien à l'intérieur de l'orbite de S2 (péricentre ≈ 120 ua, apocentre ≈ 1 940 ua). Les repères ne sont donc pas dans le champ. Le calcul et les repères sont vérifiés, mais le geste « voir passer S2, marquer, avancer d'une révolution, comparer » demande encore un point de vue. Je propose une vue caméra dédiée, de l'ordre de 3 000 ua au-dessus du plan de l'orbite, qui ne déplace pas le vaisseau. À valider avant de la coder.

## 5. Comparaison Odyssée-01 / Odyssée-02 sur Iris Xe (préparée)

Nouveau réglage d'essai : `cockpit.html?ui=immersive&essai=1&vaisseau=01` garde Odyssée-01 dans la session d'essai. On peut ainsi comparer les deux vaisseaux sur la même scène (vue « Vaisseau 3D », caméra et lumière par défaut, même cible, simulation en pause), sans ouvrir le cockpit public ni toucher à la sauvegarde personnelle. La mesure sur Iris Xe se fera **après la prochaine publication**.

## 6. Vérifications exécutées

Voir la ligne de ce commit dans `PUBLICATION.md`.
