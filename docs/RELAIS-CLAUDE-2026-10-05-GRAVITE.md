# Relais Claude → Codex · gravitation continue (A1) · 5 octobre 2026

Base : `f205610` (texture lunaire restaurée par Codex). Ce passage réalise A1 en suivant les critères de `docs/APPUI-CODEX-AUDIT-2026-10-04.md`. Je n'ai pas ajouté −GM/r² à l'intégrateur de relativité restreinte : la gravité vient d'une métrique explicite, avec ses coordonnées et son observateur de référence.

## Modèle (`src/gravity-field.js`)

- **Métrique.** Chaque masse contribue la métrique de Schwarzschild exacte en coordonnées isotropes cartésiennes : ds² = −A²dt² + B²|dx|², avec A = (1−m/2ρ)/(1+m/2ρ), B = (1+m/2ρ)² et m = GM/c². Plusieurs masses se combinent par produit, A = ΠAᵢ et B = ΠBᵢ. C'est exact pour un corps isolé. Là où tous les champs sont faibles, cela revient à superposer les potentiels. Ce n'est pas une solution N corps en champ fort, et je ne le présente pas comme tel.
- **Coordonnées.** Les axes et le temps du catalogue (temps de coordonnée t) servent de coordonnées isotropes. Loin des masses, A = B = 1 : c'est l'espace plat du simulateur.
- **Observateur de référence.** L'observateur statique. `state.u` contient désormais les composantes orthonormées de la quadrivitesse relative à cet observateur (γv local). En espace plat, c'est exactement l'ancienne quantité.
- **Intégration.** Flot géodésique hamiltonien en temps t, sur x et p = B²dx/dτ. E = A√(1+p²/B²) découle de g(u,u) = −1, ce qui maintient la normalisation par construction. RK4 à pas adaptatif, pas de 0,6 % du temps caractéristique ρ/max(v, √(m/ρ)).
- **Poussée.** Accélération propre de 1 g dans le repère orthonormé statique, avec la même convention que `integrateProper`. g(u,a) = 0 est respecté par construction. Le limiteur est appliqué sur la vitesse locale. Le freinage converge géométriquement vers u = 0.
- **Sources.** Soleil, planètes, Lune et grandes lunes (masses de référence), étoiles (masse du catalogue, sinon relation masse-luminosité notée « ordre de grandeur »), trous noirs, étoiles à neutrons, exoplanètes. Une source est retenue si son accélération dépasse 10⁻¹⁰ g ou si le vaisseau est à moins de 100 rayons. Les positions viennent des éphémérides et sont rafraîchies à chaque sous-pas. Champ quasi statique : termes gravitomagnétiques en Φ·v et retard de la gravité négligés (documenté).
- **Événements.** Contact avec la surface ; r de Schwarzschild < 1,05 Rs pour un trou noir. Les deux mettent en pause.

## Raccords avec l'existant (rien supprimé)

- Sans source significative : l'intégrateur plat exact d'avant, inchangé. Le module courbe le reproduit à 3×10⁻¹¹ près quand le champ tend vers zéro (test).
- La **région locale à deux corps** (`localGravity`, 1 à 60 rayons, moins de 0,01 c) garde la priorité, ainsi que l'insertion orbitale à 1 g. Entrée et sortie conservent position et vitesse. La différence de modèle porte sur les marées des autres astres, de l'ordre de 1 % de l'accélération à 60 rayons terrestres.
- **L'expérience radiale Schwarzschild** reste disponible. Les positions étant isotropes, `startGravity`, `stepGravity`, le panneau trou noir, `sky-optics.js` et `black-hole.js` convertissent en r de Schwarzschild (ρ = Rs/4 à l'horizon). Le test d'horizon sur la cible utilise r < 1,05 Rs.
- **Autopilote** : trajectoire rectiligne d'espace plat, inchangée. Limite affichée dans la ligne de statut et le manuel : gravité « compensée, non comptabilisée ».
- **Départ** : orbite solaire circulaire à 2 ua (21 km/s), puisqu'un vaisseau immobile tomberait vers le Soleil en environ 0,5 an de mission. Si le moteur engage une route, il freine d'abord ces 21 km/s, ce qui prend environ 36 minutes de mission.
- Nouvelle case **Gravitation continue** (cochée) et une ligne de statut : accélération de maintien en g, source dominante, rythme des horloges statiques, mention de l'autopilote, de la région à deux corps ou d'un calcul limité. L'instantané expose `continuousGravity`, `gravityField` et `gravityThrottled`.

## Vérifications exécutées

- `node scripts/validate-gravity-field.mjs` : 21 PASS.
  - Orbite solaire d'un an refermée au kilomètre près ; rayon constant à 0,01 km près.
  - Horloge en orbite : 1 − 1,5 m/r.
  - Énergie de Killing et moment cinétique conservés à 10⁻¹² près ; g(u,u) = −1.
  - Orbite circulaire stable à r = 8m, instable à 5m (plongeon) ; chute radiale arrêtée avant l'horizon.
  - Avance du périastre (rₚ = 40m, rₐ = 60m) : 0,4340 rad par tour, égale à l'intégrale exacte de Schwarzschild (l'ordre 1 donnerait 0,3927).
  - Déviation à γ = 10⁵ : 4,0012×10⁻⁴ pour 4m/b ; déviation lente égale à l'hyperbole newtonienne 2·arctan(m/bv²).
  - Accélération de maintien égale à m/(r²√(1−2m/r)), position tenue sans dérive, horloge √(1−2m/r).
  - Fronde : vitesse relative conservée à 10⁻⁴ près, énergie héliocentrique modifiée.
  - Identité avec l'intégrateur plat à 1 g ; limiteur.
- Les neuf suites précédentes passent (physics, navigation, evolution, optics, gravity, orbits, ephemeris, stellar, lighting), `validate-textures.py` aussi ; `npm run build` OK.
- Navigateur (SwiftShader) : orbite solaire tenue à 2 ua (dérive 2×10⁻⁷ due aux planètes) ; gravité désactivée → ligne droite ; Sagittarius A* à 15 Rs : chute à 1 553 g et horloge ×0,967 ; Terre : bascule dans la région à deux corps.
- Suites UI comparées avant/après (SwiftShader, environ 0,5 image/s ici) : `validate-moon-ui`, `validate-physics-ui`, `validate-v2` et `validate-interactions` s'arrêtent exactement aux mêmes points dans les deux versions. Ce sont des délais d'attente et des erreurs réseau du navigateur de mon environnement.
- Corrigé en route :
  - le freinage initial (départ en orbite) occupait toute la première image : un freinage terminé en cours d'image passe désormais le reste au trajet. « Autopilot accelerates » repasse dans les mêmes conditions que l'ancienne version ;
  - la sélection des sources est mise en cache (0,5 s ou un dixième de la distance à la masse la plus proche), sans perte de cadence mesurable.

## À regarder de ton côté (machine plus rapide)

- `validate-interactions.cjs` et les autres suites UI complètes : certaines vérifications supposaient un vaisseau rigoureusement immobile ou inertiel près du Soleil. Si un écart vient de la gravité, l'option `continuous-gravity` permet d'isoler le cas. Je préfère qu'on ajuste le test plutôt que de couper la physique, mais dis-moi si un comportement te paraît faux.
