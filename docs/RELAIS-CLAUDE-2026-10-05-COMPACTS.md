# Relais Claude → Codex · trous noirs et étoiles à neutrons (B1/B2) · 5 octobre 2026

Base : `1aa1470`. Ce lot suit les critères de `APPUI-CODEX-AUDIT-2026-10-04.md` § B1/B2 : on corrige le modèle d'émission, les occultations et la résolution des rayons avant d'envisager Kerr, et l'anneau de photons doit venir des trajectoires.

## Trous noirs (`src/black-hole.js`, `src/compact-objects.js`, `src/sky-optics.js`)

- Le shader est réécrit d'un seul tenant : le code par remplacements de texte et la classe de rendu inutilisée disparaissent. `traceSchwarzschild` (JS) reste inchangé pour `validate-optics`.
- **Modèle d'émission par objet** (`accretionOf`), affiché dans la légende et la fiche :
  - dormant (Gaia BH1, BH2, BH3) : seulement l'ombre et le ciel lentillé ;
  - disque mince (Cygnus X-1, V404 Cyg) : profil de Shakura–Sunyaev sans couple, bord interne à 3 Rs, corps noir vu à T·g ;
  - flot chaud (Sagittarius A*) : optiquement mince, émission intégrée ∫ g³ j dl, visible en radio et en composite seulement.
- **g exact** pour un gaz en orbite circulaire prograde et un observateur statique : g = 1/(√(1−1/r_obs) · uᵗ · (1 − Ωλ)), où λ est le moment cinétique du photon autour de l'axe du disque (compte tenu du sens réel de propagation). Remplace l'ancienne approximation par la corde.
- **Disque opaque** : la transmission s'annule au premier passage, les images secondaires viennent des passages suivants.
- **Axe du disque** : inclinaison sur la ligne de visée terrestre mesurée pour Cygnus X-1 (27,1°, Orosz et al. 2011) ; 67° pour V404 ; 30° illustratif pour Sgr A*. L'angle de position est arbitraire.
- **Rayons** : 520 pas au lieu de 320, pas angulaire divisé par deux près de la sphère de photons. Les rayons qui font plusieurs tours ne sont plus tronqués.
- Exposition du disque réduite : un disque à 3 MK reste physiquement très brillant, mais l'image n'est plus blanche.

## Étoiles à neutrons (`src/closeup.js`)

- **Courbure de Beloborodov** pour l'intersection pixel/surface : rayon apparent R/√(1−u), angle d'émission α utilisé pour l'assombrissement du bord, éclat × (1−u)². u = 2,953·M/R(km), avec M = 1,4 M☉ et R du catalogue.
- **Périodes** ATNF ajoutées pour Vela (89,3 ms) et le Crabe (33,7 ms). La phase suit maintenant la vraie période ; l'ancien ralentissement artificiel est supprimé.
- **Faisceaux** : quand la période à l'écran est inférieure à environ 0,2 s, on dessine le cône balayé moyenné sur la pose (`beamBlend`) ; au-dessus, le faisceau instantané. En pause, le faisceau est figé.
- **Lignes de champ dipolaire** dans la bande Composite seulement, étiquetées comme surcouche pédagogique. Le tore décoratif du magnétar est supprimé.

## Vérifications

- `node scripts/validate-compact.mjs` : 21 PASS.
  - Profil du disque nul à 3 Rs, maximal à 49/36 · r_in, pente r⁻³ᐟ⁴.
  - g = √(1 − 1,5/r) vu de face ; limite Doppler de relativité restreinte à 2×10⁻⁵ près ; asymétrie 1,14 / 0,70 à 6 Rs.
  - Beloborodov contre l'intégrale exacte : 0,33° (R = 3 Rs), 0,84° (R = 2,44 Rs).
  - ¾ de la surface visible à R = 3 Rs.
  - Règles de faisceau, modèles par objet, inclinaison de Cygnus X-1.
- Les 10 autres suites numériques passent, ainsi que les textures ; `npm run build` OK.
- UI (SwiftShader) : `validate-gravity-field-ui` passe ses 11 contrôles fonctionnels, dont l'arrivée à Sagittarius A* avec le nouveau shader ; `validate-moon-ui` passe 7 contrôles fonctionnels. Le contrôle « aucune erreur navigateur » échoue dans mon environnement à cause d'une erreur 404, la même qu'avant ce lot. À confirmer chez toi.
- Captures : Gaia BH1 (anneau d'Einstein de la Voie lactée), Sgr A* en visible (ombre seule) et en radio (anneau), Cygnus X-1 (disque bleuté, anneau de photons, vide intérieur), Vela (étoile agrandie, cône moyenné).

## Suite

Rendu multi-astres (plusieurs corps simultanés, éclipses) avec stockage hiérarchique des coordonnées, puis nébuleuses, puis phase C (Laniakea).
