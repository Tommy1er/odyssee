# RELAIS CODEX → CLAUDE — Couche spectrale HDR pour galaxies ponctuelles
**Odyssée Cosmique — 17 octobre 2026**

Base scientifique : correction de Claude \`787dc67\` préservée dans main (comparaison GitHub \`ahead\`, \`behind=0\`). Domaine : **galaxies du catalogue photométrique rendues comme points/PSF**, pas les volumes galactiques.

## Ce qui est effectivement implémenté

- \`src/galaxy-spectral-overlay.js\` : couche GPU HDR séparée (\`GalaxySpectralOverlay\`). Réutilise la géométrie et les attributs source de \`GalaxyLightLayer\`, notamment magnitude catalogue, position sur cône de lumière, extinction, classe spectrale K96 (\`sclass\`), Dsource du catalogue et Dsource du vaisseau, poids de transition point↔volume.
- \`src/renderer.js\` : capture le ciel **sans** les galaxies ponctuelles lorsque leur couche séparée est active. Points masqués **dans les deux passes** du cube (fond et panorama), avec restauration des visibilités. Après capture, le shader ponctuel projette les galaxies par aberration dans un framebuffer \`HalfFloatType\`. Les galaxies volumes du Groupe local restent dans leur rendu classique.
- \`src/sky-optics.js\` : ajoute le contenu HDR du framebuffer **avant l'exposition et le tone mapping** \`1-exp(-L)\`. La lumière galactique n'est donc plus fusionnée avec les étoiles en RGB avant d'être spectralement décalée.
- \`src/cockpit.js\` : la fiche distingue explicitement la couche ponctuelle par spectre de classe et l'ancienne approximation des volumes/du fond ; diagnostic \`flightSnapshot().galaxyLight.spectralPoints\`.
- \`public/physics-v2.html\` : nouveau périmètre documenté.

### Physique à respecter

Direction \`n\` = de l'observateur vers la source ; déplacement \`u\` du vaisseau en unités \`γβ\`.
\`\`\`
D_obs = γ(1 + β dot n)
n' = aberrateU(n,u)
D_tot = D_ship (source) * D_obs
\`\`\`
La correction **source** de Claude est \`(D_ship/D_sun)^4 * J(D_ship)/J(D_sun)\`, et n'est appliquée qu'une fois.
L'aberration comprime l'angle d'une source locale \`θ' = θ / D_obs\` (au premier ordre pour une petite surface).
L'intensité spécifique est multipliée par le terme spectroscopique ; après contraction de la surface angulaire d'un point lumineux non résolu, **le flux total** devient :
\`\`\`
f_KC96 / f_catalog = (D_ship/D_sun)^4 * D_obs² * J(D_ship*D_obs)/J(D_sun)
RGB = couleur_composite_classée_KC96(D_ship*D_obs)
\`\`\`
Si \`D_sun, D_ship\` ou \`D_tot\` sort de la grille instrumentale **0.72–1.09** : repli thermal explicite (pas extrapolation KC96) :
\`\`\`
f_thermal / f_catalog = B_V(T*D_ship*D_obs) / B_V(T*D_sun) / D_obs²
\`\`\`
Le rapport de flux a été comparé par intégration numérique indépendante de la fonction de Planck sous le filtre V, et le facteur angulaire est contrôlé.

### Conditions d'activation / fallbacks

Actif en vision relativiste avec Doppler (et dans le comparateur 0 / 0,99 c), uniquement en visible œil/pose longue, si la photométrie catalogue est chargée. Séparation volontairement désactivée près d'un trou noir focalisant et dans un nuage H II opaque sélectionné : l'ancien chemin partagé garde alors l'occultation/lentille. Les autres bandes, la carte et la vision intuitive conservent leur comportement classique. Aucun deuxième Doppler ne doit être appliqué à cette couche dans \`SkyOptics\`.

**IMPORTANT : à 0,99c, les composites KC96 ne couvrent PAS les longueurs d'onde UV extrêmes et MIR réellement exigées.** La couche utilise le corps noir de repli dans ces directions, ce n'est pas un rendu empirique exact à 0,99 c. Le gain scientifique immédiat est surtout (i) chaque galaxie garde son identité de classe, (ii) aberration et photométrie par source, (iii) pas de fusion RGB avec les autres objets, (iv) fidélité KC96 pour les vitesses modérées compatibles avec les archives.

### Suites de tests et captures

- \`scripts/validate-galaxy-spectral-overlay.mjs\` — 13 assertions : retour au repos, toutes classes, facteurs source et observateur, retour au corps noir Planck, aberration, double comptage, composition HDR et fallback près lentilles.
- \`scripts/validate-galaxy-observer-spectrum.mjs\` mis à jour pour distinguer le rendu par points et celui du ciel global.
- \`scripts/validate-galaxy-ui.cjs\` — M87 doit afficher \`spectralPoints=true\`.
- \`scripts/validate-galaxy-spectral-overlay-ui.cjs\` — test SwiftShader rapide sur écran de départ : mode relativiste, désactivation/activation Doppler, vision intuitive, studio comparateur 0/0,99 c, PNG \`validation/v2-screenshots/galaxy-spectral-hdr-lab-099c.png\`.
- \`.github/workflows/galaxy-build.yml\` — compile et commite uniquement après réussite des tests numériques. \`.github/workflows/galaxy-spectra.yml\` — tests Playwright sans écriture sur main, captures en artifact. Le dernier build confirmé avant finalisation du script browser était \`c694480edb\`, preuve de compilation ; **ne jamais attribuer de succès navigateur nouveau sans lire ses journaux**.

## Revue manuelle demandée à Claude

1. Vérifier WebGL sur mobile (HalfFloat framebuffer + vertex texture sampling) ; screenshot et diagnostics JS quand mode relativiste, intuitif et labo à 0,99 c.
2. Comparer le PSF ponctuel isolé au rendu historique à v=0 (flux intégré dans écran, tailles/centres), vérifier que cube et overlay ne comptent pas deux fois la source. Le shader principal applique l'exposition **après** l'addition de l'overlay.
3. Inspecter la transition point-volume à 3–8 px, les multiples galaxies sur un pixel, le masquage par poussière au passage d'une nébuleuse, le fallback près Sgr A*.
4. Étendre un jour les spectres observés vers MIR et UV extrême, sans inventer des couleurs « vraies ». Les bandes > 2.5 (radio/X) restent approximatives.
5. Le couplage photométrie/cône de lumière cosmologique **FLRW** est distinct, et **n'est pas** implémenté par ce patch.

**GitHub main ne publie pas le site ChatGPT Sites privé** ; ne pas prétendre avoir déployé.
