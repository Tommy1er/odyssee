# Relais Claude → Codex · plusieurs astres et éclipses (B3) · 9 octobre 2026

Base : `12505c8`, la version publiée. Ce lot ajoute le rendu de plusieurs corps à la fois, les ombres et éclipses entre eux, une liste des éclipses à venir avec un saut de date fictif, et corrige deux défauts de rendu trouvés en route.

## Rendu à plusieurs corps (`src/system-bodies.js`)

- **Jusqu'à 7 corps secondaires** en plus du corps principal (`closeup.js`, inchangé dans son rôle). Sélection toutes les 0,3 s par éclat apparent (taille angulaire² × éclairement stellaire × albédo) ; une étoile n'est retenue que si son disque est résolu, sinon elle reste un point du ciel. Le corps principal n'est jamais secondaire.
- **Disque ou point.** Au-dessus de 0,7 pixel, intersection rayon–sphère par pixel avec bord anticrénelé analytique (pas de `fwidth` dans la boucle). En dessous, point photométrique de même flux que le disque : L_moyen · (a/σ)² · exp(−θ²/σ²), σ = un pixel, loi de phase de Lambert. Les points devant le corps principal sont ajoutés après lui, ceux qui sont derrière avant.
- **Ordre de profondeur.** Un secondaire plus proche que la surface du corps principal passe devant (passage devant le Soleil, Io devant Jupiter) ; sinon il sert de fond au corps principal, ce qui garde les anneaux et l'atmosphère de celui-ci par-dessus.
- **Textures.** Les deux secondaires texturés les plus grands utilisent leur carte (`secMap0`, `secMap1`), les autres une couleur moyenne et un relief générique. Saturne secondaire garde ses anneaux, composés dans l'ordre de profondeur avec la sphère.
- **Précision** (ton point « risque transversal ») : les positions relatives corps − vaisseau sont calculées en double sur le processeur puis passées en secondes-lumière ; aucune coordonnée absolue n'atteint le GPU. Un test compare l'ombre calculée en float32 et en double.

## Éclipses (`src/eclipse.js`, mêmes formules en GLSL)

- En chaque point éclairé, la lumière restante vaut 1 − aire d'intersection des disques apparents (étoile, corps)/aire du disque stellaire, pour tous les autres corps, le corps principal compris. Ombre, pénombre et anneau découlent de cette géométrie, sans cas particuliers. L'assombrissement centre-bord n'entre pas dans ce calcul.
- **Lune éclipsée** : environ 10⁻⁴ de lumière réfractée et rougie dans l'ombre de la Terre (une Lune totalement éclipsée est environ 10⁴ fois moins brillante que la pleine Lune). Le faible éclairage d'inspection (0,012) prend cette couleur sur la face géométriquement éclairée : teinte physique, intensité d'inspection. C'est signalé dans le manuel.
- **Recherche des éclipses** : syzygies trouvées par l'élongation, puis minimisation de la distance de l'axe d'ombre (Soleil) ou de la séparation avec l'anti-Soleil (Lune). Ombre et pénombre agrandies de 2 % (convention de Chauvenet), rayon équatorial terrestre.
- **Temps** : la dynamique reste en TT. Les dates sont affichées en UTC ≈ TT − ΔT avec ΔT = 69,2 s. La rotation UAI de la Terre utilise désormais d(UT1) = d(TT) − ΔT (`iau-rotation.js`). Seule la Terre change, d'environ 0,29°.

## Interface

- Laboratoire, sous les trous de ver : « Éclipses à venir » (trois ans à partir de la date de mission) et « Aller observer · saut de date fictif ». Le saut avance `t` jusqu'à 8 min avant le maximum et ne touche pas `tau`. Il est inscrit au journal comme discontinuité. Le vaisseau est placé au repos par rapport à la Terre (4,5 R⊕, côté Soleil, vers l'axe d'ombre) ou à la Lune (9 R☾, côté Terre). Pas de retour dans le passé.
- Aide intégrée et manuel (`physics-v2.html`, nouvelle section) mis à jour, avec sources : NASA/Espenak, Meeus, Tarini.
- Instantané : `system` = {corps secondaires, source de lumière, emplacements de texture}.

## Corrections en route

- **Couture des textures** : une ligne de texels erronés apparaissait au méridien où u passe de 1 à 0 (choix du mipmap). Échantillonnage avec gradients corrigés (méthode de Tarini 2012) pour tous les corps texturés.
- **Orientation des vues** : la caméra qui suit une cible prenait l'axe Y équatorial comme « haut ». Elle prend maintenant le pôle nord céleste : la Terre et Jupiter apparaissent nord en haut, bandes horizontales.
- **Erreur 404 dans les tests navigateur** : c'était `favicon.ico`. Ajout de `<link rel="icon" href="data:,">` dans les pages. Le contrôle « No browser or shader errors » passe maintenant aussi dans mon environnement.

## Vérifications exécutées

- `node scripts/validate-eclipses.mjs` : 36 PASS.
  - Géométrie des disques ; ombre de la Terre de 1,384 Mkm ; anneau = 1 − (a/a☉)² ; pénombre ; ombre d'Io.
  - Les 11 éclipses NASA de 2026–2028 retrouvées avec le bon type, à moins de 4 min du maximum ; gamma à 0,02 près, magnitudes lunaires à 0,04 près. Aucune éclipse inventée.
  - Totalité au point de maximum du 12 août 2026, à Tanger 08:47 UT et à Louxor 10:07 UT le 2 août 2027 ; Casablanca en partielle à 93,6 % ; pas d'éclipse le 9 octobre 2026.
  - Point subsolaire à 12:00 UT conforme à l'équation du temps (±0,4°) et à la déclinaison.
  - float32 = double ; sélection des corps près de Jupiter et de la Terre.
- `node scripts/validate-eclipse-ui.cjs` (nouveau, SwiftShader) : 9 PASS, dont aucune erreur navigateur ou shader. Résultats dans `eclipse-ui-results.json`.
- Les 12 autres suites numériques passent, ainsi que textures et données. `validate-moon-ui` (8/8) et `validate-gravity-field-ui` (11/11) passent intégralement ici depuis la correction du favicon. Je les ai lancées sur des copies qui écrivent hors du dépôt, pour ne pas écraser tes rapports.
- Captures : éclipse du 2 août 2027 au maximum (ombre sur l'Égypte, vue nord en haut), Lune cuivrée le 31 décembre 2028, Jupiter vu de Ganymède avec ses lunes.

## Limites signalées

Les lunes autres que la Lune ont des phases illustratives : leurs éclipses existent mais pas aux dates réelles. Pas d'ombre des lunes sur les anneaux. Corps secondaires sans atmosphère détaillée, sauf un liseré pour la Terre.

## Suite

Nébuleuses (raies d'émission, front d'ionisation), puis phase C (Laniakea, catalogues déjà fournis).
