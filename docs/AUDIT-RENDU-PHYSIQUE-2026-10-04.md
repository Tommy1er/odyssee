# Audit rendu 3D et physique — Odyssée

Auteur : Claude · 4 octobre 2026 · base : commit `e506f0b`
Méthode : lecture complète de `src/` et des catalogues, construction, 6 tests numériques (tous PASS), captures navigateur (Terre, Jupiter, Saturne, Proxima b, Proxima Centauri, Vela, SGR J1745−2900, Gaia BH1, Sagittarius A*, Orion, M13, vaisseau, carte cosmique).

Aucune modification de code dans ce passage. Ce document classe ce qu'il faut améliorer, du plus important au moins important, puis prépare l'extension à Laniakea.

## Ce qui est déjà solide (à conserver)

- **Cinématique relativiste du vol** (`physics.js`) : mouvement hyperbolique exact à 1 g, intégration en quadri-vitesse `u = γv/c` (pas d'arrondi de β vers 1), aberration et facteur Doppler écrits sous forme numériquement stable. Formules vérifiées : `D = γ(1+βμ)`.
- **Optique du ciel** : aberration par pixel, décalage Doppler des étoiles via une table de corps noir CIE, intensité en D⁴ pour la lumière intégrée de la Galaxie, lumière retardée (cône de lumière passé) pour les objets en mouvement.
- **Trou noir** : géodésiques nulles de Schwarzschild intégrées par pixel (RK4), disque mince entre 3 et 12 Rs, vitesse orbitale locale correcte `v = 1/√(2(r−1))`.
- **Expériences locales** : chute radiale Schwarzschild exacte, orbites képlériennes à deux corps (Verlet).
- **Données réelles** : HYG 4.1, Gaia DR3, 2 464 pulsars ATNF, 1 866 amas ouverts, 145 globulaires, exoplanètes NASA. Séparation explicite observation / modèle / fiction.

## Priorités, de la plus forte à la plus faible

### Phase A — Fondations physiques (le plus gros gain de réalisme)

**A1. Le vaisseau ne ressent aucune gravité en vol libre.** *(impact très fort · effort moyen)*
`cockpit.js` n'intègre que la poussée (`integrateProper`) : on peut rester immobile à 1 ua du Soleil ou à 15 Rs de Sagittarius A* sans tomber. La gravité n'existe que dans deux modes séparés : orbite newtonienne à deux corps (plafonnée à 0,01 c) et chute radiale Schwarzschild.
→ Ajouter au vol libre un champ gravitationnel des masses proches (Soleil, planètes, étoile locale, trous noirs, Sgr A* + potentiel galactique à grande échelle), avec un intégrateur relativiste qui combine poussée et gravité. Près d'un objet compact : géodésiques de Schwarzschild en 3D (orbites, frondes, précession), plus seulement radiales. Horloge de bord : ajouter la dilatation gravitationnelle à la dilatation cinématique, de façon continue.

**A2. Les positions des planètes sont fictives.** *(impact fort · effort faible)*
`body-data.js` place les planètes à l'angle `i × 0,75` rad sur des cercles. Les lunes sont toutes alignées sur l'axe X de leur planète. Les exoplanètes sont à un angle tiré d'un hash de leur nom. `ephemeris.js` les fait tourner sur des cercles avec une phase arbitraire.
→ Éléments orbitaux képlériens réels : JPL/Standish pour les 8 planètes (précision d'environ une minute d'arc sur 1800–2050), éléments moyens pour les grandes lunes, et pour les exoplanètes *a, e, ω, T₀, i* quand la NASA les publie (sinon le signaler clairement). Le Système solaire devient juste à la date de mission.

**A3. Les étoiles n'ont pas de taille physique.** *(impact fort · effort faible à moyen)*
Seules 4 441 étoiles sur 22 531 ont un rayon. Bételgeuse, Rigel, Sirius, Véga et Antarès sont dessinées avec le rayon par défaut de 1 R☉ : Bételgeuse fait en réalité environ 750 R☉. La température vient d'une table de 8 classes et la couleur de surface en approche se réduit à 3 teintes.
→ Pour chaque étoile : T selon le type spectral (table Pecaut & Mamajek), L selon la magnitude absolue et la correction bolométrique, R par Stefan-Boltzmann. Couleur de surface tirée de la même table de corps noir que le ciel. Assombrissement centre-bord dépendant de T (loi quadratique). Compagnons connus : Sirius B, α Cen A/B, les étoiles compagnes de Gaia BH1/BH2/BH3 et de Cygnus X-1.

### Phase B — Rendu des objets

**B1. Trous noirs.** *(impact fort · effort élevé)*
- Métrique de Kerr (rotation) pour Sgr A* et M87*. Aujourd'hui Schwarzschild seul.
- Le mode d'accrétion doit dépendre de l'objet. Sgr A* n'a **pas** de disque mince lumineux : c'est un flot chaud, épais et très peu lumineux (RIAF), presque sombre en visible. La capture actuelle montre un grand disque orange face à la caméra, qui ne correspond pas à l'objet réel. Cygnus X-1 a un disque mince avec une supergéante compagne.
- Disque mince : profil de température de Novikov-Thorne (condition au bord intérieur), couleur décalée par g·T (fréquence) et pas seulement l'intensité en g³ avec une couleur fixe. Anneau de photons. Jet pour M87.
- Résolution : le ciel lentillé est capturé dans une cubemap de 192 px, d'où un anneau d'Einstein flou.

**B2. Étoiles à neutrons, pulsars, magnétars.** *(impact fort · effort moyen)*
- Courbure de la lumière (R ≈ 3 Rs) : on voit plus de la moitié de la surface. Approximation de Beloborodov, plus le décalage gravitationnel vers le rouge.
- Faisceaux selon le modèle du vecteur tournant, avec les vraies périodes (Vela 89 ms, Crabe 33 ms, SGR J1745 3,76 s). À 33 ms, il faut un rendu temporel adapté (stroboscope ou moyenne).
- Magnétosphère dipolaire, cylindre de lumière, nébuleuse de vent du Crabe. Aujourd'hui : sphère bruitée, cône gaussien et un tore décoratif.

**B3. Planètes.** *(impact fort · effort moyen)*
- Un seul corps est dessiné à la fois (la cible ou le plus proche) : Jupiter apparaît sans ses lunes, la Terre sans la Lune. → Plusieurs corps simultanés, avec ombres et éclipses.
- Atmosphère : aujourd'hui un simple voile au bord. → Diffusion Rayleigh + Mie précalculée (Terre, Vénus, Mars, Titan, géantes), crépuscule, terminateur doux.
- Relief (cartes de normales), ombre de la planète sur les anneaux, transmission et effet d'opposition des anneaux de Saturne.

**B4. Nébuleuses.** *(impact moyen-fort · effort moyen)*
Orion est rendue comme une boule beige uniforme (forme générique « 0 »). → Couleurs des raies d'émission (Hα 656 nm, [O III] 501 nm, [S II]), front d'ionisation, poussière, étoiles du Trapèze. Coquilles réalistes pour les nébuleuses planétaires (Lyre, Hélice).

**B5. Éclairage du vaisseau.** *(impact moyen · effort faible)*
`spacecraft.js` éclaire le vaisseau avec un environnement de studio intérieur (`RoomEnvironment`) et une lumière fixe. → Lumière dans la direction, la couleur et le flux de l'étoile la plus proche (décroissance en 1/d²). Ciel réel comme carte d'environnement. Ombres propres, textures PBR.

**B6. Ciel et exposition.** *(impact moyen · effort moyen)*
- Catalogue HYG coupé à 22 531 étoiles (≤ 100 al ou V ≤ 7). → HYG complet (environ 119 000) + Gaia.
- Le Doppler des objets étendus estime une température à partir du rapport bleu/rouge du pixel. → Approche spectrale par source.
- Exposition photométrique avec adaptation de l'œil, éblouissement et halo des étoiles brillantes.

**B7. Petites erreurs de données.**
- `magnetar-gc` porte des champs d'amas (`clusterModel: massive`, `members: 100000`). Sans effet visible aujourd'hui, mais faux.

### Phase C — Couvrir Laniakea

État actuel : 19 repères placés à la main (`cosmic-data.js`) et des galaxies synthétiques (`cosmic-scene.js`). Le cockpit ne connaît que 4 galaxies du Groupe local (M31, M33, les deux Nuages de Magellan). Pas d'expansion cosmologique.

**C1. Données réelles, en couches emboîtées.**
1. Groupe local complet : catalogue McConnachie 2012 et mises à jour, environ 100 galaxies.
2. Volume local : Karachentsev UNGC, près de 900 galaxies à moins de 36 millions d'al.
3. Laniakea : relevé 2MRS (environ 44 600 galaxies sur tout le ciel, profondeur médiane z ≈ 0,03, ce qui couvre tout le bassin) et Cosmicflows-4 (environ 56 000 distances indépendantes du redshift).
4. Frontière et lignes de flux de Laniakea : champ de vitesses Tully et al. 2014 / reconstruction CF4.
5. Zone d'évitement : la signaler comme lacune d'observation, pas comme vide.

**C2. Rendu des galaxies.** Type morphologique, taille, inclinaison et angle de position tirés du catalogue, puis un modèle procédural : bulbe de Sérsic + disque exponentiel + bras. Amas avec leurs membres réels (Vierge, Centaure, Norma, Coma, Persée).

**C3. Physique à cette échelle.** Un trajet de 250 millions d'al dure environ 250 millions d'années pour l'Univers (environ 38 ans à bord à 1 g). Sur cette durée, l'expansion représente environ 2 % et les redshifts dans Laniakea vont jusqu'à environ 0,04. → Coordonnées comobiles FLRW (Planck 2018), impulsion du vaisseau qui décroît en 1/a sans poussée, redshift cosmologique des galaxies, vitesses particulières (chute vers le Grand Attracteur). Le manuel le reconnaît déjà comme limite.

**Contrainte pratique.** Depuis mes environnements (cloud et PC d'Abdoulaye), VizieR et CDS sont bloqués par le réseau. GitHub et PyPI passent. Pour les catalogues de la phase C, il faut soit que Codex les télécharge (il a déjà produit les fichiers ATNF/Gaia depuis VizieR), soit qu'Abdoulaye télécharge les fichiers à la main.

## Ordre de travail proposé

1. A2 (éphémérides), A3 (étoiles physiques), B5 (lumière du vaisseau) : rapides, gain visible immédiat.
2. A1 (gravité en vol libre) : le plus structurant pour la physique.
3. B1 et B2 (trous noirs, étoiles à neutrons), puis B3 et B4 (planètes, nébuleuses), puis B6.
4. Phase C (Laniakea), une fois les catalogues récupérés.

Chaque étape : un commit sur `main`, des tests numériques ajoutés dans `scripts/validate-*.mjs`, des captures avant/après, et la mise à jour de `physics-v2.html` (ce qui est observé, modélisé ou fictif).
