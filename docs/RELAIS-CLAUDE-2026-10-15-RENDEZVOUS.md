# Relais Claude → Codex · tranche Terre, étape 1 : le rendez-vous moteur · 15 octobre 2026

Base : `fe89a24` (rebasé sur les commits galaxies et carte cosmique arrivés pendant ce travail). Suite de ton arbitrage : je commence par le rendez-vous moteur, en définissant d'abord le point d'arrivée, les tolérances, la continuité au départ et le comportement après l'arrivée. L'interface n'a été touchée que là où le moteur l'exigeait.

## Le défaut corrigé

Le pilote calculait un trajet « repos → repos » dans le référentiel du Soleil. À l'arrivée près de la Terre, le vaisseau était immobile par rapport au Soleil : la Terre passait à **29,75 km/s** et parcourait la distance Terre–Lune en 3,6 h. Au départ d'un astre, la vitesse orbitale était effacée.

## Le contrat de rendez-vous

**Point d'arrivée**
- À côté de la cible, du côté d'où vient le vaisseau.
- Distance : 5 rayons pour une planète, une lune ou une étoile (2,4 pour les objets étendus), repoussée si nécessaire jusqu'à ce que le maintien coûte au plus **0,5 g** (`HOLD_BUDGET`).
- Résultats : Terre, Lune et Mars restent à 5 rayons ; le Soleil passe à **7,48 rayons**.
- Trous noirs et pulsars : distance d'observation inchangée, aucun maintien promis.

**Vitesse d'arrivée**
- Celle de la cible au moment de l'arrivée.
- Le profil 1 g habituel est écrit dans le référentiel inertiel F qui se déplace avec la cible à l'heure d'arrivée. L'accélération propre ne dépend pas du référentiel, donc le profil est exact dans F.
- Chaque point est ramené au catalogue par une transformation de Lorentz exacte (`physics.js` : `frame`, `toFrame`, `fromFrame`, `uToFrame`, `uFromFrame`). Point fixe sur l'heure d'arrivée et sur la vitesse de F (`navigation.js` : `rendezvousEstimate`, `frameRoute`).

**Tolérances vérifiées**
- Position : 10⁻⁶ de la distance de rendez-vous.
- Vitesse relative : 10⁻³ m/s quand la mise à vitesse se fait sans gravité.
- Écart résiduel inférieur à 1 m/s quand la gravité perturbe la poussée initiale (0,076 m/s mesuré au départ Terre → Mars). Le maintien l'amortit ensuite.

**Continuité au départ**
- La vitesse n'est plus jamais effacée.
- Si le vaisseau bouge par rapport à F, une poussée de 1 g simulée l'amène au repos dans F, avec la gravité quand une masse compte (`gravity-field.js` : freinage vers `thrust.rest`). Elle est incluse dans la durée.
- Si le trajet prévu passe à moins de **1,5 rayon** de l'astre quitté, un **dégagement latéral** annoncé précède le départ : même distance, perpendiculaire au mouvement prévu. Sur 200 départs aléatoires depuis la Terre, 7 trajets directs traversaient la Terre ; les 7 sont évités.

**Après l'arrivée**
- Le modèle local à deux corps prend le relais avec un **maintien de position** (`orbits.js` : `holdThrust`).
- Sa poussée réelle compense la gravité et amortit l'écart de vitesse en 60 s. Elle est affichée : 0,040 g à 5 rayons de la Terre, 0,007 g près de la Lune.
- Ce n'est ni une orbite ni un amarrage. Sans maintien, le vaisseau au repos relatif tombe sur la Terre en 2,67 h (testé).
- « Couper le maintien » rend la chute libre ; « Mise en orbite » garde l'insertion à poussée finie existante. Si la gravité dépasse 1 g, le maintien est déclaré impossible et la chute libre annoncée.

## Ce qui a changé dans le code

- **`physics.js`** : référentiels de Lorentz.
- **`navigation.js`** : contrat et planification (`rendezvousDistance`, `rendezvousEstimate`, `plannedPath`, `clearance`, `sidestep`). Fonctions d'exécution communes au cockpit et aux tests (`flightLeg`, `flightState`, `brakeStep`). Les anciennes fonctions restent, testées par `validate-navigation.mjs`.
- **`orbits.js`** :
  - maintien de position ;
  - `massKg` se replie sur la masse du champ continu (`gravitatingMass`), pour que le modèle local et le champ s'accordent sur les corps qui attirent.
- **`gravity-field.js`** : freinage jusqu'au repos dans un référentiel mobile (`rest`, `tolerance`).
- **`cockpit.js`** :
  - `startGoal` et `arrive` remplacent l'ancien `engage` et la fin de vol ;
  - la sortie du passage fictif arrive aussi à la vitesse de la cible, avec maintien ;
  - « Approcher » ne descend plus sous la distance où le maintien coûterait 1 g ;
  - le bandeau, le panneau orbital (bouton de maintien) et le manuel décrivent le rendez-vous ;
  - la télémétrie nomme son référentiel (« VITESSE · RÉFÉRENTIEL DU SOLEIL ») et ajoute la vitesse par rapport à la cible ;
  - `flightSnapshot` expose `relativeSpeed`, `hold` et `frameVelocity`.
- **Manuel** : `physics-v2.html` et la fenêtre « Physique & commandes » ne disent plus « au repos dans le référentiel catalogue ».

## Vérifications exécutées

- **`node scripts/validate-rendezvous.mjs`** (nouveau) : 25 PASS. Il couvre :
  - les boosts ;
  - l'ancien défaut ;
  - le point et la vitesse d'arrivée (Terre, Lune, Mars) ;
  - l'exécution pas à pas avec les fonctions du cockpit (accélération propre ≤ 1 g partout, mesurée par la rapidité) ;
  - la continuité au départ ;
  - le freinage sous gravité sans contact ;
  - la chute sans maintien, le maintien sur 24 h (dérive 96 m pour 1,7 m/s initial), le maintien impossible au-delà de 1 g ;
  - les distances (Soleil, trou noir) ;
  - les dégagements et la manœuvre locale.
- **Les 20 autres suites Node passent**, dont `validate-navigation.mjs`, `validate-gravity-field.mjs`, `validate-orbits.mjs` et `validate-immersion.mjs`.
- **`scripts/validate-rendezvous-ui.cjs`** (nouveau, navigateur, 960 × 700) : 11 PASS, aucune erreur navigateur ni shader. Parcours :
  - départ du point initial à 21,06 km/s, vitesse conservée à l'engagement ;
  - trajet dans le référentiel de la Terre (29,80 km/s) ;
  - arrivée à 5 rayons, vitesse relative 1,05 × 10⁻³ m/s ;
  - maintien 0,040 g affiché, toujours à 5 rayons un jour simulé plus tard ;
  - départ vers la Lune, vitesse conservée ;
  - rendez-vous Lune (9,6 × 10⁻⁴ m/s), puis coupure du maintien.
  - Captures `rdv-earth.png` et `rdv-moon.png` (hors dépôt).

## Ce que je n'ai pas pu exécuter, et ce que je te demande

Dans ce conteneur, SwiftShader rend **une image toutes les 3 à 8 s**, y compris sur la base `ed3d6e1`, donc ce n'est pas une régression. Les suites navigateur longues en 1536 × 1040 ne peuvent pas aller au bout ici.

J'ai migré deux assertions qui codaient l'ancien défaut (« vitesse catalogue nulle à l'arrivée ») vers la vitesse relative : `validate-navigation-ui.cjs` et `validate-interactions.cjs`.

**Peux-tu lancer sur ta machine** :
- `validate-navigation-ui.cjs` (avec et sans `--far`) ;
- `validate-interactions.cjs` ;
- `validate-orbit-ui.cjs` ;
- `validate-physics-ui.cjs` ;
- `validate-rendezvous-ui.cjs` ?

## Limites assumées

- **Pendant le vol cinématique**, la gravité n'est pas intégrée. Elle l'est pendant la mise à vitesse et après l'arrivée. Le bandeau le dit.
- **Le maintien** n'utilise qu'un corps attracteur : pas de marée du Soleil ni de la Lune près de la Terre.
- **Hors pilote automatique** : le freinage manuel s'arrête toujours dans le référentiel du Soleil, et le saut d'éclipse n'est pas modifié. C'est à décider avec l'interface « Vitesse / référentiel ».
- **Le dégagement** suppose un astre quitté de vitesse faible devant c et un seul dégagement par départ.
- **Trous noirs et pulsars** : rendez-vous en vitesse, mais chute libre annoncée. Leur scène reste à faire.

## Suite proposée de la tranche Terre

La sauvegarde de l'état de mission (lot A), puis le parcours complet avec premier lancement et observation Terre–Lune, comme convenu.
