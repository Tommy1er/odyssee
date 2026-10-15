# Relais Claude → Codex · avis sur le dossier « Odyssée — Refonte UX/UI » · 15 octobre 2026

Base : `a3d8830`. Aucun changement de code dans ce relais. Ce document répond au dossier de 12 pages du 14 octobre (base examinée `ed3d6e1`), joint ici : `docs/conception/Odyssee-Refonte-UX-UI.pdf`. Abdoulaye m'a demandé de ne pas le prendre comme acquis et de donner mon propre point de vue.

Codex, lis ce relais, réponds point par point (« d'accord » ou « non, parce que… »), puis on fige l'ordre de travail avec Abdoulaye.

## En bref

La direction est bonne et je reprends l'essentiel du dossier. Deux réserves de fond :

1. **L'arrivée à la Terre est d'abord un problème de moteur**, pas d'enveloppe. Le dossier la place dans l'interface.
2. **Le plan en cinq lots successifs (A → E) est trop lourd.** Je propose une tranche verticale « Terre » complète, puis la carte unifiée, puis la généralisation.

## Ce que je reprends tel quel

- **Sélectionner ≠ partir ; changer de vue ≠ changer d'état.** Le diagnostic de la page 1 est exact : `public/cockpit.html` porte aujourd'hui 67 boutons, 18 champs et 10 listes sur une seule page.
- **Statuts Observé / Calculé / Illustratif / Fictif par propriété** (page 10). C'est la meilleure idée du dossier, dans la continuité des relais.
- **Les moments difficiles** (page 9) : cible invisible, chargement incomplet, rendu lent, limite du modèle.
- **Lot A en premier** (état de mission et sauvegarde). Il n'existe aucune sauvegarde aujourd'hui. L'objet `state` de `src/cockpit.js` mélange l'état physique (pos, u, q, t, tau, ap, orbit, passage) et les préférences d'affichage (band, exposure, showEcliptic, navCompact…).
- **Le parcours Terre de la page 12 comme recette**, et l'arrivée définie avant le départ (page 3).

## Points de désaccord ou manques

### 1. Le rendez-vous est un travail moteur (point bloquant)

Aujourd'hui, le pilote automatique calcule un trajet « repos → repos » dans le référentiel héliocentrique de catalogue :

- au départ, la vitesse du vaisseau est effacée (`state.u=[0,0,0]`, avec le message « non conservée par le plan 1 g ») ; près d'un astre, le départ se fait depuis le repos local (relais Immersion, point 5) ;
- à l'arrivée, `P.sample(plan, plan.t)` donne `u = 0` : le vaisseau est immobile par rapport au Soleil (`intercept` dans `src/ephemeris.js` ne vise qu'une position).

Pour la Terre, la vitesse relative à l'arrivée vaut donc la vitesse orbitale terrestre, environ 30 km/s. La Terre parcourt la distance Terre–Lune en 3 h 30 environ. Les états « Point atteint », « Survol en cours » et « Orbite établie » de la page 3 ne peuvent pas être honnêtes sans :

- un **rendez-vous** : vitesse finale égale à celle de la cible (`velocityAt`), dans les tolérances du contrat choisi ;
- la **conservation de la vitesse initiale** au lieu de son effacement. Sinon, l'engagement crée une discontinuité silencieuse, contraire à la règle « une seule autorité de commande ».

Ce travail doit faire partie de la tranche Terre, comme modification de `navigation.js`, `ephemeris.js` et `physics.js`, avec ses tests. Le profil 1 g symétrique ne suffit plus : il faut un problème aux limites avec une vitesse initiale et une vitesse finale imposées.

### 2. Trois espaces, c'est un de trop

Vol et Observatoire regardent la même scène depuis la même position. Le dossier dit lui-même que l'Observatoire ne transporte pas le vaisseau ; il n'a donc pas besoin d'être un lieu. En faire un onglet oblige à quitter le vol pour regarder la Terre qu'on a sous les yeux.

Proposition :

- deux vues : **Vol** et **Carte** ;
- un **instrument d'observation** qui s'ouvre sur la vue Vol, en tiroir ou en mode, avec identifier, regarder, comparer, données et phénomène.

Sur téléphone, cela donne deux onglets et un tiroir gradué.

### 3. Trois temps visibles, c'est trop pour l'utilisateur

On garde le principe : aucune accélération ni aucun saut silencieux. Mais il faut une seule commande de temps dans le cockpit, la vitesse de lecture, libellée comme en page 7. La cadence pédagogique reste confinée à l'instrument d'observation, avec sa mention « animation pédagogique × … » près de l'image.

### 4. Les tests d'interface vont casser

13 scripts dépendent des identifiants actuels du cockpit et de la carte :

`validate-basins-ui`, `catalogue-ui`, `comet-ui`, `cosmos`, `eclipse-ui`, `galaxy-ui`, `gravity-field-ui`, `interactions`, `moon-ui`, `navigation-ui`, `nebula-ui`, `orbit-ui`, `physics-ui`.

La page 11 parle de non-régression des simulations, pas de ces tests. Il faut décider avant de toucher l'enveloppe : on les **migre** vers les nouveaux contrôles au fil des tranches, on ne les supprime pas.

### 5. Les statuts par propriété : commencer petit

Qualifier chaque propriété de tout le catalogue représente un gros travail de données. On commence par le Soleil, la Terre et la Lune. Partout ailleurs, on affiche « non qualifié » plutôt que de deviner un statut.

### 6. Le premier lancement manque

La recette commence par « reprendre une mission sauvegardée ». Il faut aussi prévoir la première minute d'un visiteur sans sauvegarde. Aujourd'hui, il arrive en pause, à 2 ua du Soleil, avec une cible par défaut et aucune explication.

### 7. Finition hors de la première tranche

Les sons, la palette détaillée et la mesure des 75 % de champ dégagé sont justes, mais ils viennent après la validation des commandes et de la compréhension.

## Ordre de travail proposé

1. **Tranche « Terre » verticale.** Critère de fin : les 7 étapes de la page 12 passent sur ordinateur et sur téléphone.
   1. État de mission séparé des préférences, avec sauvegarde locale versionnée. Export et import en option.
   2. Moteur : rendez-vous à vitesse relative nulle, conservation de la vitesse initiale, états d'arrivée selon le contrat choisi.
   3. Vue Vol épurée : sélectionner, préparer, engager, suivre, constater. Tiroir unique.
   4. Instrument d'observation Terre–Lune, avec les statuts sur leurs propriétés.
   5. Premier lancement.
   6. Migration des tests d'interface concernés.
2. **Carte unifiée.** Il faut faire converger `cockpit.html` et `cosmos.html`, aujourd'hui deux pages et deux programmes distincts, sous un même état. C'est le plus gros morceau.
3. **Généralisation** aux quatre scènes de la page 12 : trou noir, nébuleuse, galaxie, Laniakea.

## Rappel d'objectif

Les objectifs déclarés d'Odyssée sont un rendu 3D réaliste et une revue de la physique modélisée, puis l'extension à Laniakea. La refonte les sert si elle avance par tranches livrables et testées. Un chantier d'enveloppe en cinq lots risque d'occuper des semaines sans faire progresser la physique.

## Vérifications

Lecture du dossier (12 pages) et du code de `main` à `a3d8830` : `src/cockpit.js`, `src/navigation.js`, `src/ephemeris.js` (`intercept`), `src/physics.js` (`plan`, `sample`), `public/cockpit.html`, `scripts/`. Aucun build ni test exécuté, puisqu'aucun code n'est modifié.
