# Galaxies ponctuelles : flux HDR et cônes étroits — 13 novembre 2026

## Périmètre

Ce lot complète le banc du rayon observateur commun (`RELAIS-CODEX-2026-11-13-GAMMA-GPU.md`) par une mesure de la couche HDR des galaxies ponctuelles. Les workflows sont distincts (`high-gamma-hdr.yml` et `high-gamma.yml`) ; aucun résultat de l’autre banc n’est revendiqué comme mesure de flux. Le ciel diffus, les étoiles, les volumes, le pilote et le voyage ΛCDM ne sont pas modifiés par ce correctif.

## Défauts reproduits avant correction

Run 43447964863, source f96eeea : le shader de production restitue 6,484375 pour une somme de luminance attendue de 16, soit environ 40,5 % dans la source témoin centrée. Il dessine un pixel au lieu de la PSF prévue : l’affectation `psfD=psfDraw(size,psfS)` était absorbée dans un commentaire en fin de ligne. La suite d’intégration précédente vérifiait l’activation de la passe, pas sa lumière effectivement dessinée. Ce chiffre ne décrit pas une perte uniforme de tout le ciel : le résultat dépend de l’échantillonnage de la source.

Le même banc montre des sources hors champ dans des cônes arrière d’ouverture 1/γ et 10/γ à γ = 10⁶. L’expression Float32 `1 + dot(n,axis)` perd le petit écart lorsque le produit scalaire est arrondi à −1.

## Correction

- Rétablir l’affectation de taille PSF hors du commentaire.
- Utiliser `|n + axis|² / 2` pour calculer 1 + μ, puis les expressions stables de Doppler et d’aberration. Pour des directions unitaires, l’identité est exacte mathématiquement ; elle conserve une petite composante transverse encore représentable après arrondi du produit scalaire. Elle ne supprime pas la quantification des vecteurs d’entrée sur un axe quelconque.

Le flux de référence et la normalisation de PSF restent ceux du modèle photométrique commun. Aucun gain arbitraire ajouté pour rendre le ciel plus lumineux.

## Oracle indépendant et mesure

`scripts/high-gamma-hdr-entry.js` importe le vrai `GalaxySpectralOverlay`, son vertex/fragment et sa méthode de rendu dans une cible RGBA16F, sans exposition ni tonemapping. Les pixels sont lus en luminance CIE Y ; le dernier banc pondère chaque pixel par son angle solide gnomonique et divise par l’angle du pixel central. La somme brute est conservée séparément pour comparaison. La source de test reste très en dessous des plafonds de saturation du shader et de la cible.

Une source synthétique suit Iν ∝ ν². L’invariance de Iν/ν³ donne Iν,obs(ν) = D³ Iν,cat(ν/D), et l’aberration donne dΩobs = dΩcat/D² : à bande observateur fixée, le flux ponctuel varie donc comme D⁻¹. Le jeu de textures du test encode cette loi, pas un spectre KC96 inventé hors de son archive. La magnitude d’entrée est ajustée pour que chaque mesure attendue soit 16, évitant la saturation et le sous-flux de la cible.

Les directions et Doppler attendus utilisent les identités de demi-angle, indépendamment des fonctions `dopplerU` et `aberrateU` du projet. Huit mesures supplémentaires utilisent les vraies classes KC96 au repos ; à D = 1, leur flux de catalogue doit être conservé. La mesure du centroïde reste limitée par la grille de pixels et la PSF ; un décalage mesuré nul n’est pas une preuve d’erreur angulaire nulle.

Cadre : Urry & Padovani, annexe B, invariance d’intensité spécifique, https://ned.ipac.caltech.edu/level5/Urry1/UrryP_appenb.html . La loi D⁻¹ ci-dessus est dérivée pour un observateur mobile et une source de direction fixe au catalogue ; elle ne reprend pas la loi de flux d’une source mobile isotrope de type jet.

## Résultats après correction

Run 43448483786 sur b1f546d : 21 cas alignés réussis, γ = 1, 100, 1000, 10⁶, directions avant/arrière/latérale et cônes arrière 0,1/γ, 1/γ, 10/γ. Écart maximal de flux 0,733 %, aucune valeur non finie. Aucun déplacement du centroïde détecté dans ces cas.

Run 43449193177 sur 5240700 : 50 cas mesurés, 44 dans le domaine de régression imposé. Ils réussissent : axes alignés jusqu’à γ = 10⁶, axes obliques jusqu’à γ = 1000, et huit classes KC96 au repos. Écart maximal dans ce domaine : 0,733 %. Écart maximal des huit classes KC96 : 0,0705 %. Aucun pixel non fini ni erreur JavaScript/GLSL.

Les six sondes obliques à γ = 10⁶ sont enregistrées séparément : quatre satisfont les tolérances, deux échouent. Dans les cônes arrière 0,1/γ et 1/γ, les déplacements sont respectivement 5,06 et 13 pixels (image 128 × 128, champ vertical 40°). Le flux reste mesurable, mais la direction n’est pas validée. Ces limites ne sont ni effacées du rapport ni comptées dans les régressions réussies. Tolérances du banc : 3 % de flux et 0,35 pixel de centroïde.

CI Chromium forcée sur SwiftShader. Ce sont des mesures de rendu logiciel, pas un essai Iris Xe, d’un autre PC ou d’un téléphone. La chaîne spectrale complète reste approximative hors de la plage empirique D ∈ [0,72 ; 1,09]. Le banc ne valide pas les saturations très lumineuses, tout le ciel diffus ou les angles arbitraires aux gamma extrêmes.

## Suite

Préparation du repère de boost en précision double et quantification des entrées sur axes obliques : à étudier avec le banc du rayon commun, sans fusion des moteurs. Matériel réel : toujours ouvert. La disparition de tout gel Chrome n’est pas démontrée par ce lot.

## Rapport final conservé

Run 43450822100, source acc1fac : 50 cas, 44 régressions imposées, aucune erreur JavaScript/GLSL ni pixel non fini. Flux intégré avec l’angle solide : écart maximal de 0,7291 % dans le domaine imposé, et de 0,07424 % pour les huit classes KC96 au repos. Les deux écarts de direction obliques restent 5,063 et 13,000 pixels ; ils demeurent hors domaine validé. L’identité du moteur mesuré indique ANGLE/Vulkan SwiftShader Device (Subzero).

Le rapport complet, avec source, run, fixture, valeurs mesurées, seuils et limites, est conservé dans `validation/reports/high-gamma-hdr-2026-11-13.json`. Ce fichier daté est une preuve de ce run, pas un résultat automatiquement valable pour les modifications futures.

## Intégration de la version corrigée

Run 43448483894 réussi sur b1f546d : spectres et photométrie numériques, nébuleuses imbriquées, galaxies, bassins, pouponnières, comparateur 0 / 0,99 c et capture lunaire finale. Pas d’erreur JavaScript ou GLSL. Run de mission 43448483942 également réussi, ainsi que construction/régressions rapides 43448483830. Le code de production testé est identique à celui livré ; les commits suivants ajoutent des sondes, des métadonnées et la documentation.

## Publication : blocage de l’hébergement

Les corrections sont poussées sur main et l’archive a été enregistrée comme version 48. Deux tentatives natives ont échoué ; ne pas annoncer ce correctif comme publié.

- Site : `appgprj_6aaed9890f1c8191ac977fe0fadcc659`.
- Version enregistrée : `appgprj_6aaed9890f1c8191ac977fe0fadcc659~appgver_caeaed68e23c8191b558e5a6f24baf28`.
- Source Sites de cette version : `ccdcfc44a54b1cc4d347eb768f35830291c40c96`.
- Premier déploiement : `appgdep_6af72b52c9dc8191a38b9d08851be232`, échec le 13 novembre à 15:23:17 UTC : « An unknown error has occurred … workers-sdk … ».
- Deuxième déploiement, même version : `appgdep_6af72b9825908191ae66f07ecb1d71fa`, échec à 15:24:16 UTC : « Failed to publish the built site. ».

La métadonnée native confirme l’archive tar enregistrée, 53 fichiers, et la source exacte. L’inspection locale montre la même organisation d’archive que celle déployée avec succès le 6 novembre ; aucune cause de code ou de configuration identifiée dans ces erreurs génériques. Le Site est toujours indiqué actif avec son URL conservée, mais cela ne confirme pas la mise en ligne du correctif.

Pour reprendre : réutiliser la version 48 et `deploy_private_site_version`, sans la sauvegarder une seconde fois. Conserver l’audience privée et les identifiants ci-dessus. Ne pas modifier le code validé pour masquer un échec d’infrastructure.
