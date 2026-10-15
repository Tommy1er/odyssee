# Relais Claude → Codex · immersion : voyages, relativité, Univers dynamique, anomalies d'affichage · 15 octobre 2026

Base : `ed3d6e1`. Abdoulaye a demandé une expérience « véritablement immersive » : les déplacements, la physique relativiste, les objets visitables, le comportement dynamique de l'Univers et les anomalies d'affichage. J'ai d'abord fait un audit en vol réel, sans téléportation : Soleil → Proxima, puis Andromède. Les corrections suivent les anomalies trouvées.

## Anomalies trouvées et corrigées

1. **Voie lactée en trait fin, ciel gris.**
   - Cause : la marche le long des rayons avait un pas uniforme sur 120 kal, donc le disque proche était sous-échantillonné. Les hauteurs d'échelle étaient aussi trop faibles : disque 0,30 kal, poussière 0,10 kal.
   - Correction (`galaxy.js`) : pas proportionnels à la distance ; disque mince 0,85 kal avec une couche jeune de 0,3 kal ; disque épais 3 kal ; poussière 0,33 kal, en nuages (bruit de valeur, illustratif), vidée dans la Bulle locale.
   - Calibration sur l'échelle des étoiles : pôle nord galactique à 23,0 mag/arcsec² (Leinert et al. 1998), soit un plan à 19,5–21,5 et une extinction moyenne de 0,84 mag/kpc. Jumeaux JS `milkyWayDensity`, `milkyWayDust` et `milkyWayLuminance` pour les tests.
2. **Amas d'étoiles en nuages de points flous identiques.**
   - Nouveau `cluster-population.js` : FMI de Kroupa, séquence principale masse–M_V–T_eff, masse au coude d'après l'âge, géantes, amas rouge et supergéantes schématiques.
   - Normalisation : membres G < 18 de Cantat-Gaudin pour les amas ouverts, V intégrée de Harris pour les globulaires, littérature pour les Pléiades et les trois amas massifs.
   - Rendu sur l'échelle photométrique des étoiles (`createClusterStars`, `stellar-light.js`). Les étoiles de V < 7 vues du Soleil sont laissées à HYG. Au-delà de 6 000 points, les étoiles faibles sont regroupées en points pondérés (lumière totale exacte).
   - Les globulaires de V ≤ 6 et la cible sont toujours dessinés.
   - `build-galaxy-catalogue.py` exporte maintenant `logAge` (AgeNN) et `feh` ; le reste de la sortie est identique (vérifié avant modification).
3. **Lueur de 60° autour de Sirius** (ma faute du 12 octobre).
   - Cause : la « galaxie naine du Grand Chien » de McConnachie, de morphologie « ???? », recevait le disque générique de 12 kpc avec un éclat de 0,8, à 7 kpc du Soleil.
   - Correction : toute entrée de classe inconnue à moins de 10 millions d'al devient une naine pâle de 1 kpc. Une note précise que la nature de Canis Major est discutée. C'était aussi l'« éblouissement » vu depuis Proxima.
4. **Trajet vers une galaxie entièrement « en approche ».**
   - Cause : la fenêtre (temps de freinage sur 50 rayons, soit 5,5 millions d'al pour M31) dépassait le trajet. Le bandeau affichait « APPROCHE · FREINAGE » pendant l'accélération, et le voyage durait environ 5 s d'écran.
   - Correction (`navigation.js`, `approachSchedule`) : fenêtre = freinage sur min(50 rayons, demi-trajet). La cadence suit le temps restant (restant / 3,5 s), avec un plancher pour la fin.
   - Mesure : 7,4 s d'écran pour Proxima, 8,4 s pour M31. Le bandeau se réduit pendant l'approche pour ne plus masquer la cible.
5. **Départ depuis le point d'arrivée de Proxima : chute sur l'étoile.**
   - Cause : à 0,004 ua, la gravité vaut 45 m/s², plus que 1 g. Le freinage préalable faisait tomber le vaisseau (« Contact avec la surface »).
   - Correction : en orbite ou au voisinage d'un astre à faible vitesse, le pilote part du repos local. La vitesse orbitale abandonnée est notée au journal comme une simplification.

## Univers dynamique (`cosmic-motion.js`)

- **Ligne d'univers de chaque galaxie** : x(t) = x_catalogue + v (t + d/c). La position de catalogue est l'événement d'émission de la lumière reçue au Soleil en 2026,75. Vue du Soleil à t = 0, la galaxie est donc exactement à sa position publiée (testé). Ailleurs, le cône de lumière passé exact de `ephemeris.js` s'applique.
- **Vitesse radiale mesurée** : UNGC (héliocentrique) ; CF4 vCmb ramené au Soleil par le dipôle Planck 2018 (369,82 km/s vers l = 264,02°, b = 48,25°) ; littérature pour M31, M33 et les Nuages de Magellan. Sinon, au-delà de 10 millions d'al : H₀·d (74,6) plus le flux reconstruit.
- **Vitesse transverse** : jamais mesurée. Au-delà de 10 millions d'al, elle vient du modèle (flux CF4 2023 moins le mouvement solaire) ; en deçà, elle est inconnue, donc nulle.
- **Exemple, M87** : 1 280 km/s radiale (1 284 au NED), 371 km/s transverse (modèle). La position « maintenant » est décalée de 0,24 million d'al ; l'interception arrive à 0,34 million d'al de la position publiée.
- **Cockpit** :
  - la grille de vitesses se charge 1,5 s après le démarrage ;
  - les volumes du Groupe local et les slots utilisent `lightXYZ` ;
  - les 55 877 repères CF4 suivent leur cône de lumière (`CatalogueSky.setMotion`, `receivedLinear`) ;
  - la fiche affiche une ligne « Mouvement ».
- **Limites** : premier ordre en z, espace plat, sans cosmologie relativiste générale (erreur de l'ordre de H₀·t, < 5 % dans le volume CF4). Ni évolution des galaxies ni décalage spectral de leurs couleurs. La carte cosmique reste en positions publiées.

## Relativité : fond diffus cosmologique (`sky-optics.js`)

- **Calcul par pixel** : T = D · 2,7255 K / (γ☉ (1 − β☉·n)). La radiance visible vient de la table CIE de corps noir, calibrée sur la photosphère solaire (V = −26,74 à 1 ua).
- **Ce qu'on voit selon γ** :
  - invisible au repos et à γ = 20 ;
  - point de magnitude −3,6 à γ = 200, −11 à γ = 300 ;
  - point aveuglant de magnitude −21 à γ = 10⁶ (mi-parcours vers M31).
- **Rendu sous deux pixels** : la tache est dessinée comme un point de même flux total.
- **Télémétrie** : température avant, flux reçu de face (analytique, (16/3) γ² σT⁴ à grand γ, soit 17 MW/m² à γ = 10⁶) et magnitude du point.
- **Vérification navigateur** : à γ = 2 180, le point avant est à 11 885 K et de magnitude −23,4, net sur un ciel noir.

## Vérifications exécutées

- **`node scripts/validate-immersion.mjs`** (nouveau) : 26 PASS. Il couvre :
  - la Voie lactée : calibration, largeur de bande, extinction, convergence de la marche ;
  - les amas : FMI, masse au coude, M67, Hyades, ω Centauri ;
  - les lignes d'univers : M87, cône de lumière, interception, Groupe local, hors boîte ;
  - le CMB : dipôle, flux, calibration, visibilité selon γ ;
  - l'approche : départ à mi-trajet pour M31, 7–15 s d'écran.
- **Les autres suites numériques passent**, dont `validate-catalogue-galaxies.mjs` (20).
- **`validate-basins-ui.cjs`** : 7/7, aucune erreur.
- **`validate-galaxy-ui.cjs`** : PASS, sortie 0, aucune erreur navigateur ni shader.
- **Captures SwiftShader** (hors dépôt) :
  - ciel depuis le Soleil vers le Sagittaire, le Cygne et Orion ;
  - Proxima, les Hyades et ω Centauri ;
  - trajet M31 : passage « accélération → approche visible » au demi-trajet, constaté sur 200 relevés ;
  - point CMB à grand γ.
- **Non relancé** : `validate-cosmos.cjs` et les tests visuels longs. Ils sont lents en rendu logiciel ; à faire sur GPU si possible.

## Suite possible

- Lignes de courant et surfaces des bassins dans le ciel du cockpit.
- Plus de 4 galaxies en volume ; calibration photométrique des galaxies.
- Décalage spectral propre des galaxies dans leurs couleurs.
- La carte cosmique « maintenant / autrefois ».
