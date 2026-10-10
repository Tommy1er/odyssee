# Relais Claude → Codex · nébuleuses physiques, échelle photométrique commune, Nuages de Magellan · 10 octobre 2026

Base : `e736f63`, la version publiée. Demande d'Abdoulaye : « des nébuleuses réalistes (couleurs des gaz, poussières) ». Ce lot corrige aussi les bandes des Nuages de Magellan que tu avais signalées.

## Échelle photométrique commune (`src/photometry.js`)

- **Étoiles ponctuelles** (`stellar-light.js`) : chaque sprite dessine flux = 10^(−0,4(m−3)) sur une PSF dont la somme vaut 0,818 × ce flux, dans un cube de 1 024 pixels par face. Une source de magnitude m porte donc Φ = 0,818·10^1,2·(2/1024)²·10^(−0,4 m) ≈ 5,0·10⁻⁵·10^(−0,4 m), en radiance × stéradian.
- **Comètes** : elles utilisent maintenant ce Φ. Dans e736f63, je les avais calées sur 10⁻⁶·10^(−0,4 m), soit environ 50 fois trop faible par rapport aux étoiles.
- **Bandes visibles** :
  - « Visible · pose longue » (bande 1, et 6 « composite ») multiplie toute la lumière diffuse (nébuleuses, comètes) par `LONG_EXPOSURE = 10` ;
  - « Visible · œil » garde la brillance physique ;
  - le saut au périhélie ne touche plus le curseur d'exposition (×300 retiré).
- **Limite connue de la couche des étoiles** : les pixels du cube près des bords de face sont jusqu'à environ 5 fois plus petits, donc les étoiles y paraissent plus brillantes. Je n'y ai pas touché.

## Modèle des nébuleuses (`src/nebulae.js`)

- **Couleurs**
  - Spectres de raies (Hα, Hβ, Hγ, Hδ, [O III] 5007/4959, [N II] 6584/6548, [S II] 6716/6731, He I, He II, [O I]) intégrés avec les courbes CIE 1931 (ajustement de Wyman et al. 2013), puis convertis en sRGB linéaire.
  - Les couleurs hors gamut sont écrêtées, puis normalisées à une luminance Y = 1.
  - Balmer en cas B (Hα/Hβ = 2,86) ; rapports de raies par zone, issus de la littérature (table `NEBULA_PHYSICS`, références par objet).
- **Deux zones d'ionisation**, mélangées selon `nebZone` :
  - 0 : radiale, haute ionisation au centre ;
  - 1 : fronts d'ionisation sur les surfaces denses (Piliers) ;
  - 2 : filaments de choc en taches (rémanents).
- **Continuum**
  - Crabe : synchrotron F_ν ∝ ν^−0,6, environ 70 % de la lumière visible, réparti dans un ellipsoïde à l'intérieur de la cage de filaments.
  - Homoncule : lumière stellaire diffusée par des grains gris.
  - Orion, Carène, Piliers : quelques pourcents de lumière diffusée.
- **Poussière** : extinction proportionnelle à la densité, avec τ par canal = τ_V × (0,83 ; 1 ; 1,25) (Cardelli, R_V = 3,1). La transmission est calculée par canal et le fond est transmis.
- **Piliers** : seules leur peau ionisée et un gaz H II ambiant transparent émettent. L'intérieur est sombre, ce qui donne des silhouettes sur le gaz.
- **Normalisation**
  - L'éclat vu de la Terre (rayons parallèles selon −z dans le repère local) vaut Φ(V − A_fg), poussière interne comprise.
  - Pour Sgr A Est et Sgr B2, invisibles depuis la Terre, `V0` donne directement une magnitude intrinsèque, signalée comme hypothèse.
  - La calibration est faite en JS au premier besoin (environ 0,1 à 0,4 s par nébuleuse, mise en cache) avec un jumeau JS exact des formules GLSL (`makeField`).
- **Structure** : les formes procédurales sont conservées (bruit refait avec un hachage stable en float32). Ajouts :
  - bord doux avant la sphère englobante ;
  - remplissage intérieur faible pour M 57 / l'Hélice ;
  - décalage aléatoire des échantillons par rayon, contre le crénelage en marches des structures opaques.
- **Deux chemins de rendu, même GLSL** (`nebulaGLSL(steps)`) :
  - nuage ciblé par pixel dans `sky-optics.js` (72 pas) ;
  - nébuleuses proches dessinées dans le cube par `EnvironmentLayer` (24 pas, alpha prémultiplié).
- **Arrière-plan** : l'ancien assombrissement arbitraire du fond (`L*.35`) est supprimé. Il n'y a pas de double comptage, puisque `renderer.js` masque déjà le maillage de la nébuleuse ciblée pendant la capture.
- **Bandes non visibles** (IR, radio, X, gamma) : modèle qualitatif inchangé.
- **Performance** : le bruit `rough` des Piliers était recalculé trois fois à l'identique dans la boucle (déjà dans l'ancien code). Il est sorti de la boucle et réduit à une octave (×24). Mesure SwiftShader aux Piliers, sans autre charge : 5,4 s par image contre 7,5 s pour `e736f63`.

## Nuages de Magellan (`src/local-group.js`)

- **Cause** : les bandes venaient de `sin(p.y*18.)` et d'un produit de sinus dans la branche « irrégulière ». C'était un vrai motif périodique, pas un défaut de SwiftShader.
- **Correction** : remplacé par un bruit de valeur (amas, poussière), avec une barre décentrée pour le LMC et un ellipsoïde allongé pour le SMC (`irregular: 2`).

## Interface

- **Fiche des nébuleuses** :
  - nature physique ;
  - éclat intégré et extinction d'avant-plan ;
  - raies des deux zones, avec une pastille de la couleur calculée ;
  - continuum ;
  - poussière (τ_V, fraction de lumière qui s'échappe) ;
  - références.
- **Instantané** : `nebula` (forme, gain, Kl, τ).
- **Textes** : manuel (nouvelle section, section comètes corrigée, sources), aide intégrée et COLLABORATION.

## Vérifications exécutées

- `node scripts/validate-nebulae.mjs` (nouveau) : 26 PASS.
  - Couleurs : Hα rouge pur, [O III] vert-bleu hors gamut, Hβ bleu-vert ; corps noir à 6 504 K blanc à 4 % près.
  - Rapports de raies : Balmer 2,86 partout ; [S II]/Hα ≥ 0,4 pour les 3 rémanents et < 0,4 pour les 7 régions photo-ionisées.
  - Zones colorées de M 42, de M 57 et du Crabe.
  - Poussière : Pilier opaque et rougi ; Sgr B2 avec T < 10⁻³ ; Hélice transparente (0,83).
  - Flux reçu par une caméra perspective indépendante, à 60 R, égal à la magnitude intégrée à 0,1 % près (Orion, M 57, Crabe, Piliers, Vela).
  - Brillance de surface : M 57 17,0, Orion 19,7, Hélice 22,7, Vela 24,1 mag/arcsec².
  - Échelle : intégrale de la PSF des étoiles = 0,818 à 0,02 % près ; gains de pose.
  - Plus de motif sinusoïdal dans les Nuages de Magellan.
- `validate-nebula-ui.cjs` (nouveau, SwiftShader) : 6 PASS, aucune erreur navigateur ou shader, résultats dans `nebula-ui-results.json`.
  - Couleurs lues dans la capture d'Orion (petit décodeur PNG) : cœur (222, 238, 240), enveloppe rose (190, 119, 175).
  - Mode œil plus sombre et plus gris.
  - Centre de M 57 vert-bleu (113, 243, 223).
- **Suites existantes** : les 13 autres suites numériques, les textures et les données de référence passent. `validate-comet-ui` passe (12/12), avec le contrôle d'exposition adapté. La queue de Halley est maintenant nettement visible (tête verte, queue de poussières courbée, queue ionique bleue).
- **`validate-visuals --remaining`** (copie qui écrit hors du dépôt) : Saturne et le magnétar passent, puis la capture des Piliers dépasse 60 s en SwiftShader. Le même test échoue au même endroit sur `e736f63`, que j'ai construit dans une copie séparée : c'est une limite antérieure de mon environnement de rendu logiciel, pas une régression, et le nouveau rendu des Piliers est plus rapide. À relancer chez toi si ton environnement le passait.

## Limites

- **Structures** : les structures 3D restent procédurales.
- **Raies** : rapports typiques par zone, pas des cartes mesurées ; deux zones seulement ; pas de transfert radiatif complet ni de diffusion multiple.
- **Magnitudes estimées** : Piliers seuls, Vela, Homoncule ; Sgr A Est et Sgr B2 sont des hypothèses.
- **Saturation** : en pose longue, les objets les plus brillants (Homoncule, anneau de M 57, intérieur de la Carène) saturent ; il faut baisser l'exposition. Un tone mapping qui préserve la teinte serait une amélioration générale possible.
- **Cube** : la calibration utilise le pixel central d'une face de 1 024. Sur mobile (cube de 512), les étoiles et donc l'échelle diffèrent d'un facteur 4.

## Suite

Laniakea avec les catalogues fournis (McConnachie, UNGC, 2MRS, CF4).
