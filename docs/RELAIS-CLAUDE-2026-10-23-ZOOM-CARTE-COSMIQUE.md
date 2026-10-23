# RELAIS CLAUDE → CODEX — Carte cosmique : zoom sur l'objet sélectionné, approche dans le volume, dézoom jusqu'à l'horizon
**Odyssée Cosmique — 23 octobre 2026** · base `7ab198b` · demande d'Abdoulaye du 22 octobre (captures du site publié)

## Défaut signalé

> « Quand je clique sur un objet […] et avec le curseur je fais zoom, le curseur me fait zoomer juste sur le centre du disque, le Soleil j'imagine, et non sur cet objet sélectionné, et même ce zoom il est ridicule, il ne va pas au plus près de l'objet. […] (objet doit être en mouvement) vue 3D réelle. Et aussi revoir le rayon d'exploration […] l'élargir. »

## Causes trouvées (reproduites dans Chromium SwiftShader)

1. **Des clics n'atteignaient pas la carte.** Les rangées `.levelbar` et `.scene-controls` couvrent toute la largeur de la vue, y compris l'espace vide entre leurs boutons.
   - Un clic sur M31, à 900 px de large, tombait sur la `div#levels` : la sélection restait sur le Groupe local, dont le centre est à 0,8 million d'al du Soleil, et la molette zoomait donc vers le Soleil. `elementFromPoint` le confirme.
   - *Correctif :* ces rangées ont `pointer-events:none` ; seuls leurs boutons gardent `auto` (`public/cosmos.css`).
2. **Les galaxies de repère sont dessinées agrandies** (jusqu'à ×6, avec une taille minimale en pixels), mais leur sphère de sélection garde le rayon réel.
   - Un clic sur le symbole, hors du rayon réel, touchait l'enveloppe du Groupe local derrière : la sélection allait au Groupe local.
   - Un point de catalogue voisin dans les 11 px (un satellite naine de M31) prenait aussi le clic.
   - *Correctif :* `symbolAt()` teste le disque dessiné, avec au moins 18 px, avant les enveloppes. Un point de catalogue ne gagne que s'il est à moins de 4 px du clic **et** deux fois plus proche que le centre du symbole.
3. **L'aperçu volumétrique des galaxies de la carte était noir depuis `6c5276b`.**
   - `groupRadiance` multiplie la luminance par `groupTint[j]` ; `MapGalaxyPreview` ne déclarait pas ce uniform, et GLSL lisait 0.
   - On ne voyait donc qu'un vide en zoomant ; c'est ce qui donnait l'impression d'un zoom « ridicule ».
   - *Correctif :* `groupTint` reçoit la chromaticité de la SED de classe (KC96, `spectralSourceTint`), normalisée à une luminance de 1 ; `groupGain` est également déclaré.
4. **Le zoom s'arrêtait à 1,5 rayon des galaxies**, et les galaxies de repère (Voie lactée, M31, M33, M87) n'avaient aucun volume, seulement un symbole illustratif.

## Ce qui change

- **Volume pour les galaxies de repère** (`src/map-galaxy-preview.js`) :
  - *M31 et M33 :* le même modèle et la même orientation que le cockpit (`localGroupObjects`, paramètres `(1, 1, 0,045, 1)`).
  - *Voie lactée :* spirale Sb–Sc générique, sans barre, de rayon 55 000 al. Son plan et son centre sont orientés par les coordonnées galactiques J2000 (centre l = 0, pôle nord galactique) ; le test vérifie que le Soleil est dans le plan, du côté de l'anticentre, à 0,49 rayon.
  - *M87 :* elliptique de de Vaucouleurs, au rayon de repère de la carte.
  - *Pas de double dessin :* le symbole et l'entrée de catalogue jumelle (le point le plus proche à moins d'un demi-rayon) sont masqués, et ce point n'est plus cliquable.
- **Approche dans le volume** : distance minimale de 30 % du rayon (contre 150 % auparavant), au bord du bulbe, pour les galaxies cataloguées comme pour les galaxies de repère.
  - *Pourquoi 30 % :* plus près, le modèle, qui n'a pas d'étoiles résolues, ne montre qu'une lueur uniforme. Cela a été vérifié sur des captures de 1,55 à 0,03 rayon.
  - *Molette :* `zoomSpeed` = 2,2.
  - *« Observer de près » :* cadre la galaxie entière à 1,55 rayon.
  - *Plans de coupe :* ils suivent la distance à la cible (near = 0,2 % de cette distance), ce qui garde un seul tampon de profondeur de 2 000 al jusqu'à l'horizon.
  - *Marqueur du Soleil :* il rétrécit avec la vue sur la carte. À 0,04 million d'al de rayon fixe, il recouvrait la Voie lactée vue de près. Dans le cockpit (`map:false`), son comportement est inchangé.
- **Exposition automatique de l'instrument :** sous 1,5 rayon, l'exposition est multipliée par (D / 1,5)^0,75, avec un plancher à 25 %.
  - *Sans elle :* l'intérieur de M31 saturait en une lueur beige uniforme.
  - *Choix de la loi :* trois lois ont été comparées sur captures ; une loi en ^1,5 avec un plancher à 3 % rendait l'intérieur presque noir.
  - C'est un choix d'affichage, pas de la photométrie.
- **Mouvement :** le motif des bras tourne d'un bloc dans le sens traînant (−θ dans le repère du modèle, où les bras s'ouvrent vers +θ).
  - Un tour dure 250 millions d'années (année galactique du Soleil), affiché à 1 s ≈ 2 millions d'années.
  - Pour la Voie lactée, ce sens est bien celui de la rotation galactique vers l = 90°, vérifié par le test.
  - L'animation est illustrative et étiquetée comme telle ; une case permet de l'arrêter. Il n'y a pas d'orbites stellaires, et les bras réels sont des ondes de densité plus lentes que les étoiles.
- **Dézoom jusqu'à l'Univers observable :**
  - `maxDistance` passe de 5 000 à 150 000 millions d'al.
  - Un bouton « Univers observable » est ajouté.
  - Trois grands cercles dessinent l'horizon comobile à 46 500 millions d'al (14,3 Gpc, ΛCDM Planck 2018) ; une case permet de les masquer.
  - Le texte de la carte indique que les catalogues s'arrêtent vers 800 Mpc (CF4 : 803,9 Mpc au maximum, 556 Mpc au 99e centile, mesuré) et qu'au-delà la carte ne montre aucune galaxie individuelle.
- **Rayons d'exploration :**
  - Nouvelles valeurs : 500, 1 000 (tout CF4), 4 000 et 14 300 Mpc (horizon).
  - Un rayon fini recadre maintenant la sphère autour du Soleil. Il élève l'échelle si nécessaire, sans jamais l'abaisser, pour ne pas changer de catalogue ni perdre la sélection.
- **Lecture :** la largeur et la règle passent en années-lumière sous 1 million d'al, et la distance au centre de la galaxie affichée est indiquée.

## Vérifications exécutées

- **`npm run build`.**
- **Numériques :** 35 suites `scripts/validate-*.mjs`, **0 échec**.
  - `validate-map-preview.mjs` : 13 PASS, dont 5 nouveaux. Ils couvrent :
    - la teinte de luminance 1, jamais noire ;
    - les modèles de repère, l'orientation M31/M33 du cockpit, l'absence de doublon, M87 elliptique ;
    - le repère de la Voie lactée et le sens de rotation traînant ;
    - la vitesse de rotation, arrêtée quand le volume est caché ou la case décochée ;
    - l'exposition décroissante de près, avec un plancher à 25 %.
  - `validate-catalogue-ui.mjs` (DOM et vrais OrbitControls) : 44 PASS.
    - *Nouveau :* un clic sur le symbole agrandi de M31, hors de sa sphère réelle de 10 px, sélectionne M31, et la molette zoome alors vers M31.
    - *Nouveau :* le rayon 14 300 Mpc et le bouton « Univers observable » cadrent l'horizon.
    - *Assertion inversée, et c'est voulu :* « le zoom s'arrête hors de la galaxie » devient « le zoom entre dans le volume visible de M33 et s'arrête à 30 % du rayon ».
    - *Adaptation :* M33 et la Voie lactée sélectionnées montrent leur volume, et le symbole est masqué.
    - *Limite :* dans ce test sans rendu, l'ancien ordre de sélection passait aussi. Le défaut de clic a été reproduit et corrigé dans le navigateur (point suivant).
- **Navigateur** (Chromium SwiftShader, scripts de sonde hors dépôt) :
  - *Avant :* à 900 px, `elementFromPoint` sur M31 renvoie `DIV#levels`, et un clic près de M31 sélectionnait une naine McConnachie.
  - *Après :* M31 est sélectionnée par clic sur la carte, à 14 px de son centre ; zoom molette de 0,594 jusqu'au minimum, cible inchangée (mesure faite avec la règle intermédiaire de 3 %, refaite à 30 % : 1,55 → 0,56 → 0,30 rayon) ; `groupTime` progresse ; Voie lactée et M87 visibles en volume ; « Univers observable » à 116 100 millions d'al avec l'horizon ; dézoom molette jusqu'à 150 000 ; rayon 500 Mpc ; aucune erreur de console.
  - Les captures ont été examinées : avant l'exposition automatique, l'intérieur de M31 était saturé ; un disque cyan devant la Voie lactée était le marqueur du Soleil, désormais réduit.
  - `validate-basins-ui.cjs` : **7/7 PASS**.
  - `validate-cosmos.cjs` : les 9 contrôles passent jusqu'au passage vers Hercule compris. La dernière capture du cockpit dépasse ensuite le délai (« waiting for fonts »).
    - **Même échec sur `main` non modifié** (`7ab198b`), lancé juste avant pour comparaison, dans le même environnement ; c'est le même symptôme que `validate-moon-ui` le 21 octobre.
    - Lors d'un premier passage, la case du trou de ver du cockpit n'était pas « stable » en 60 s ; elle est passée au second. Ce test n'est pas dans les workflows.
  - Les deux suites ont été lancées une par une.
- **Captures `validation/` :** remises à l'état du dépôt.
- **Erreurs de rendu sur le site publié** (« Le rendu 3D a rencontré une erreur », « Le cockpit 3D ne peut pas démarrer ») : non reproduites en local. Les pages cosmos et cockpit se chargent sans erreur de console ; il faut la console (F12) de la machine d'Abdoulaye.
  - À noter : le gestionnaire `window.error` de la carte affiche ce message pour **toute** erreur JavaScript, même non fatale.

## Limites

- Le volume reste un **modèle de classe** et non une image : la barre de la Voie lactée et les détails réels de M31 ne sont pas modélisés. L'éclat est réglé pour l'instrument, sans étalonnage photométrique.
- Le sens de rotation de M31 et M33 suit la convention traînante du modèle ; il n'est pas tiré de mesures cinématiques.
- Au-delà de 800 Mpc, il n'y a aucune donnée de galaxie. L'horizon est une sphère de repère, et les coordonnées de la carte sont euclidiennes (lues comme comobiles).
- Aucun vrai GPU n'a été testé. Le volume plein écran (64 pas par pixel) est lent sous SwiftShader ; il est à surveiller sur mobile.

À Codex : revue, validation graphique et publication.
