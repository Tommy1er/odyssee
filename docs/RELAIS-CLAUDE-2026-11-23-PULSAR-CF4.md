# Relais Claude — Démonstrateurs pulsar et sens du courant CF4 (session d'essai)

Suite de la proposition relayée le 23 novembre (trois démonstrateurs). S2 est fait et publié en v60 (`docs/RELAIS-CLAUDE-2026-11-22-BASSINS-S2.md` et `docs/RELAIS-CLAUDE-2026-11-23-V60-S2-VAISSEAUX.md`). Ce relais traite les deux autres. Règle suivie : montrer un effet physique vérifiable, pas un mouvement décoratif.

## 1. Pulsar : le signal reçu suit la période

**Avant** : le rendu fait tourner le pulsar à sa période (Vela 89,3 ms, Crabe 33,7 ms, valeurs ATNF) avec un faisceau le long de l'axe magnétique, incliné d'environ 40° sur l'axe de rotation. Au-delà d'une certaine vitesse, le faisceau est moyenné en cône balayé. Rien ne vérifiait que le signal reçu suivait la période.

**Maintenant** :
- **Géométrie partagée** (`src/compact-objects.js`) : l'axe de rotation, l'axe magnétique et la rotation sont définis une seule fois et utilisés par le rendu (`closeup.js`, y compris le shader) et par le calcul du signal. Écart entre la formule et la rotation de three.js : 1,3 × 10⁻⁶.
- **Signal reçu** : `pulsarIntensity` donne l'intensité vue par un observateur lointain (deux faisceaux opposés, profil gaussien de 6° de demi-largeur, **illustratif**). `pulsarLightCurve` échantillonne cette intensité et repère les impulsions.
- **Deux observateurs** : l'un sur le cône balayé par le faisceau, l'autre à 5° de l'axe de rotation, hors du cône.
- **Fiche du pulsar** (essai) : la courbe de lumière des deux observateurs sur quatre périodes et la lecture « intervalle mesuré 89,3 ms = période de rotation », plus « aucune impulsion » pour l'observateur hors du cône. La courbe est **calculée, pas filmée** : elle reste juste même quand l'écran ne peut pas montrer chaque éclat (11 éclats par seconde pour Vela, 30 pour le Crabe).

Contrôles (`validate-optics.mjs`) :
- Vela et Crabe : au moins cinq impulsions, et intervalle égal à la période à 1/2000 près.
- Observateur hors du cône : aucune impulsion, maximum inférieur à 10⁻³ du pic (3 × 10⁻⁸ calculé).
- Inclinaison de l'axe magnétique : 40,3°.
- Axe identique après une rotation complète.

Le test d'observation vérifie la fiche de Vela et que la position du vaisseau ne change pas.

**Limites déclarées** : la largeur du faisceau et l'orientation des axes sont illustratives. Ni la dispersion par le milieu interstellaire, ni le retard de Shapiro, ni le profil réel des impulsions de Vela ne sont modélisés.

## 2. Cosmicflows-4 : l'animation suit le courant reconstruit

- L'animation des lignes de courant fait avancer une onde dans le sens de parcours de chaque ligne (`fract(phase/60 − 0,25 t)`). Le sens de parcours est celui du fichier de lignes, intégré vers le puits du bassin.
- **Nouveau contrôle** : pour chaque ligne, on compare la distance de son début et de sa fin à l'attracteur de son bassin. Résultat : **2 833 lignes sur 2 992 (94,7 %)** se terminent plus près de leur attracteur qu'elles ne commencent (seuil du test : 90 %). Les 159 autres n'ont pas été examinées une à une : c'est un critère global, pas une preuve ligne par ligne.
- Déjà contrôlé (22 novembre) : l'animation ne déplace aucune galaxie du catalogue, et la note précise « champ de vitesses reconstruit à l'époque actuelle, pas les trajectoires futures des galaxies ».

## 3. Vérifications exécutées

Local : `validate-optics.mjs` 31/31 (dont 6 contrôles pulsar) ; `validate-observation-gestures.cjs` 61/61 (fiche de Vela : 3 impulsions entières dans la fenêtre de 4 périodes, intervalle 89,3 ms) ; `validate-cosmic-map-feasibility.cjs` 40/40. CI : voir `PUBLICATION.md`.
