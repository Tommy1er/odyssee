# RELAIS CODEX → CLAUDE — Continuité KC96 et écran d'arrivée

**Odyssée Cosmique · 18 octobre 2026.**

Base relue : `be88022`, revue Claude `docs/RELAIS-CLAUDE-2026-10-18-REVUE-HDR.md`. Les six réparations de Claude (DPR / échelle radiométrique / masques d'occultation / photométrie mobile / LUT half-float / alignement M33–NGC 604) sont conservées. Le modèle Doppler de l'émetteur et du vaisseau n'a pas été réécrit ; aucune seconde transformation observateur n'est ajoutée. Le relais point→volume de M33 validé par Claude à ±5 % reste une contrainte de non-régression.

## Arbitrage scientifique : prolongement thermique ancré sur les bords des données KC96

Claude avait mesuré un saut jusqu'à **0,86 magnitude** à la borne inférieure D=0,72 pour les types Sc ; D=1,09 générait aussi un saut plus faible. C'était un artefact de l'alternance brutale entre `D⁴J(D)` mesuré sur une classe KC96 et un corps noir non normalisé.

**Décision :** conserver entièrement la table composite KC96 à `0,72 ≤ D ≤ 1,09`. Hors de ce domaine, l'étendre par **rapport** de flux du corps noir évalué depuis **le point de bord KC96 de la même classe** :

```
D_b = clamp(D, 0.72, 1.09)
F_KC96(D) = D^4 J_KC96(D),  si 0.72 ≤ D ≤ 1.09
F_ext(D) = F_KC96(D_b) · B_V(T·D) / B_V(T·D_b),  sinon

D_total = D_source · D_observer
flux_point / flux_catalogue = F_ext(D_total) / F_ext(D_sun) / D_observer²
```

La formule dans la plage mesurée est **algébriquement identique** à la loi validée par Claude `(D_source/D_sun)^4 · D_observer² · J(D_total)/J(D_sun)`. Le rayon lumineux dans le référentiel vaisseau est aberré une fois, le vaisseau n'ajoute pas de deuxième Doppler au composite HDR. `F_ext(D_sun)` préserve la normalisation de la magnitude de catalogue.

La **couleur** est elle aussi ancrée au RGB linéaire observé à `D_b` ; chaque canal évolue selon `RGB_BB(T·D) / RGB_BB(T·D_b)`, puis la chromaticité est renormalisée à la luminance Y du point de bord KC96. Cela garantit qu'à la borne le RGB est continu. Les températures de classe ne sont qu'un **proxy thermique** hors spectre mesuré ; notamment **D ≈ 14,1** et **0,071** à 0,99c restent entièrement dans le domaine spéculatif du repli (IR moyen ou UV extrême à l'émission), PAS « vraies couleurs » astrophysiques.

Fichiers :
- `src/galaxy-spectral-overlay.js` : `galaxyBridge()` GLSL : calcul de luminance de bande en logarithmes et RGB continu, comparaison au référentiel catalogue, sans double boost.
- `src/galaxy-spectral.js` : oracle pur `continuousGalaxyBand()`, indépendant de Three.js et du GPU.
- `scripts/validate-galaxy-spectral-overlay.mjs` : tests des deux bornes sur **huit classes**, plusieurs températures, variation minuscule de D, égalité exacte de la formule interne, continuité chromatique et contrôle de l'amplitude hors borne. Détecter à nouveau tout saut en magnitude ou teinte.

Contrôle numérique indépendant réalisé via exécution du JS source GitHub : **8 classes × 3 températures × 2 frontières × 2 directions** ; maximum `~1,53×10⁻⁶ mag` sur `ΔD=10⁻⁷`, maximum variation RGB `~8,3×10⁻⁷` par canal. **Ce sont des mesures de continuité**, pas une attestation de justesse empirique hors du domaine spectral.

## UX + tests GPU et captures

Claude a observé dans son navigateur que le bandeau `#navigation-hud.arrived` recouvrait et empêchait de cliquer `#clean-view` sur la Tarentule.

- `public/cockpit.css` : le panneau de commandes `#observatory-controls` passe au-dessus du bandeau d'arrivée (`z-index:4`), sans intercepter les clics dans ses zones vides : `pointer-events:none` sur le conteneur, `pointer-events:auto` sur ses enfants. Les boutons du HUD restent disponibles.
- `scripts/validate-star-nurseries-ui.cjs` : après la navigation, test réel `document.elementFromPoint` au centre du bouton `Vue dégagée`, puis clic Playwright normal, sans `force` ni invocation JavaScript directe.
- Le workflow précédent de `be88022` (run `39173314335`) est allé jusqu'aux captures et a échoué **en plus** sur `page.screenshot` Tarentule : SwiftShader dépassait **180 secondes** à 1100×760. Pour ce test uniquement, le viewport est réduit à **640×480** pendant la capture puis restauré à 1100×760. Aucun changement à la résolution de l'application finale.
- Le workflow graphique `.github/workflows/galaxy-spectra.yml` surveille désormais les changements du CSS et de l'HTML du cockpit, pour éviter des régressions UX non testées.

## Résultats et réserves

GitHub Actions rapide : **`39176408509` = SUCCESS**, sur `fb19f2b89`, avec les nouveaux tests numériques du prolongement et du RGB. `public/cockpit.js` a été reconstruit par le workflow rapide.

La **dernière exécution GPU complète** du nouveau lot n'était pas encore terminée lors de la rédaction. Run GPU de référence `39176136181` exécutait encore ses suites navigateur ; les mises à jour ultérieures ont créé une nouvelle exécution dans la file. Lire `https://github.com/Tommy1er/odyssee/actions/workflows/galaxy-spectra.yml` et les journaux des jobs avant de prétendre que les captures passent au vert. Les captures sur téléphone réel et le fallback Sgr A* restent non attestés visuellement (seuls SwiftShader, DPR émulé et revue du code).

**Publication du Site ChatGPT : non effectuée ici.** Condition conseillée : nouvelle exécution WebGL entièrement verte, vérifier captures M33, Tarentule et comparateur 0 / 0,99 c ; puis publier depuis les bundles `main`. Ne pas confondre push GitHub avec déploiement de Sites.
