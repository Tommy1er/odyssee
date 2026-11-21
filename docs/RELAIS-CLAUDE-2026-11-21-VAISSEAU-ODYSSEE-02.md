# Relais Claude — Vaisseau Odyssée-02, conception fictive dictée par la physique (session d'essai)

Demande du propriétaire du 21 novembre : « la forme du vaisseau est un peu moche et non réaliste ; on imagine un vrai vaisseau type NASA, SpaceX, ESA ou agence spatiale chinoise, construit et imaginé en tenant compte de la physique ».

**Session d'essai seulement** (`?essai=1`). Les visiteurs voient toujours Odyssée-01 tant que le propriétaire n'a pas validé le nouveau vaisseau.

## 1. Principe

Odyssée-02 n'imite aucun engin existant. Il ne reprend ni la forme ni le nom d'un véhicule d'agence. Chaque élément répond à une contrainte d'un voyage à **1 g tenu pendant des années**, la loi de vol que simule le cockpit. Le modèle reste procédural (aucun fichier 3D ajouté) et garde les conventions du vaisseau actuel : avant vers −Z, moteur vers +Z, jet et cœur du moteur allumés pendant la poussée.

De l'avant vers l'arrière (1 unité ≈ 25 m avant mise à l'échelle, longueur indicative ≈ 400 m) :

| Élément | Raison physique | Source |
|---|---|---|
| Feuille de carbone mince, loin devant | Au-delà d'environ 0,3 c, le gaz interstellaire frappe le vaisseau comme un rayonnement. Un champ magnétique ne dévie que les particules chargées : il faut d'abord ioniser les atomes neutres. | Semyonov, « Radiation conditions in relativistic interstellar flight », arXiv:2004.10079 |
| Bouclier de graphite et de glace | Arrêter la poussière. La glace peut se renouveler. Un bouclier massif contre tout le rayonnement serait trop lourd. | même article |
| Bobine supraconductrice sur bras | Dévier les particules chargées autour de l'équipage. | même article |
| Tour d'habitation, ponts empilés le long de l'axe, hublots | La poussée tient lieu de pesanteur : « en bas » est vers le moteur. Pas d'anneau tournant. | conséquence directe de la loi de vol |
| Module de service, deux navettes, antenne grand gain | Descendre vers une planète ; parler à la Terre, qui est derrière. | choix de conception |
| Longue poutre en treillis | La dose venue du moteur décroît avec le carré de la distance. | choix de conception |
| Réservoirs d'hydrogène, pièges à antimatière | Masse de réaction et combustible, confinés à froid. | choix de conception |
| Radiateurs dans des plans contenant l'axe | Évacuer la chaleur ; vus par la tranche depuis le moteur, ils restent dans l'ombre de l'écran. Ils rougeoient pendant la poussée. | choix de conception |
| Écran d'ombre en tungstène | Protéger tout ce qui précède du rayonnement de l'annihilation. | choix de conception |
| Chambre d'annihilation et tuyère magnétique (bobines) | Diriger les produits chargés de l'annihilation pour en faire une poussée. | Frisbee, « How to build an antimatter rocket for interstellar missions », 39e Joint Propulsion Conference AIAA, 2003, NASA NTRS 20060043411 |
| Jet pâle et étroit | Le jet de particules chargées serait presque invisible : il est figuré faiblement. | choix de représentation |

**Honnêteté** : rien de ceci n'existe à cette échelle, et la quantité d'antimatière nécessaire est hors de portée. Le texte « Physique & commandes » et la ligne sous la vue le disent. La ligne d'éclairage affiche « Odyssée-02 · conception fictive, d'après la physique ».

## 2. Ce qui change dans le code

- `src/spacecraft.js` : nouvelle fonction `odysseyModelV2()`. Elle utilise des textures procédurales de panneaux (aucune image externe) et des géométries fusionnées pour la poutre et les radiateurs, afin de limiter les appels de dessin. `SpacecraftView` la choisit seulement en session d'essai.
- `src/cockpit.js` : nom du vaisseau selon la session (`SHIP_NAME`, et `shipName` de `flightSnapshot()` lu sur le modèle) ; description d'Odyssée-02 dans « Physique & commandes », en essai seulement ; crochet de test `window.shipCameraForTests`, en essai seulement.

## 3. Vérifications exécutées

Local (Chromium SwiftShader) :
- `validate-observation-gestures.cjs` : **56/56**, dont le nouveau contrôle « Essai : vaisseau Odyssée-02 ».
- `validate-v2.cjs` : le contrôle « vaisseau Odyssée-01 hors essai » réussit (voir `PUBLICATION.md` pour la suite du script).
- Neuf suites de non-régression réussies (code 0) : voir la ligne de ce commit dans `PUBLICATION.md`.
- Ressources du moteur dans la vue « Vaisseau 3D » (`renderResources()`, 1280 × 585) : géométries 84 → 92, textures 32 → 34 (les deux textures de panneaux), programmes de shader 17 → 22. Les appels de dessin de la passe du vaisseau ne sont pas mesurés : `renderResources()` ne compte que la dernière passe.

Captures : `validation/ui/vaisseau-odyssee-02-profil.jpg`, `-trois-quarts.jpg`, `-avant.jpg` (éclairage d'inspection, studio non physique, session d'essai).

Non vérifié : Chrome Iris Xe ; coût de rendu du nouveau modèle sur GPU réel ; jet du moteur en poussée (non capturé).

Erreur corrigée avant le commit : un commentaire `//` placé sur une ligne minifiée désactivait l'ajout du vaisseau à la scène ; il est devenu un commentaire `/* */`, et les captures ont été refaites ensuite.

## 4. À valider par le propriétaire

1. L'allure générale, à partir des captures ou de `cockpit.html?essai=1` → « Vaisseau 3D ».
2. Le nom « Odyssée-02 ».
3. L'ouverture au public, qui remplacerait Odyssée-01.
