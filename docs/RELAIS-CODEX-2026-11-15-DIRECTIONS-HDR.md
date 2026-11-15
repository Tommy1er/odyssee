# Galaxies ponctuelles : précision des directions obliques (15 novembre 2026)

## Livraison précédente publiée

Version 48 publiée, déploiement natif confirmé `succeeded` le 15 novembre à 17:42:46 UTC. Le relais de Claude `RELAIS-CLAUDE-2026-11-15-ECHAUFFEMENT-IRISXE.md` est conservé : sélection Tarentule 106 ms, resélection 97 ms (contre 5986 ms le 1er novembre), arrivée 180 ms, pas d'erreur. Mesures de Claude sur Iris Xe, pas un retest de cette conversation. Elles concernent la version 48, pas la nouvelle correction ci-dessous.

## Défaut traité

Les sondes HDR du 13 novembre conservaient deux échecs de position à gamma 10^6 et axe de boost oblique : 5,06 et 13 pixels dans les cônes arrière 0,1/gamma et 1/gamma. Le produit scalaire avait été stabilisé, mais source et axe avaient déjà perdu leurs petites différences par conversion Float32.

`GalaxyLightLayer.update` produit maintenant deux attributs vec3 : partie haute Float32 de la direction normalisée calculée depuis les positions relatives doubles, et résidu Float32. Ils suivent le cône de lumière, la position du vaisseau et la cadence existante (au plus 4 Hz hors sauts). Ils ajoutent 24 octets par galaxie, soit 1 060 512 octets pour les 44 188 galaxies, sans nouveau parcours du catalogue par image.

`GalaxySpectralOverlay` scinde aussi l'axe de boost CPU. Le shader forme la corde en ajoutant d'abord les parties hautes, puis les résidus. Recombiner chaque direction avant l'addition perdrait à nouveau l'information. La composante transverse est formée depuis cette même corde, sans soustraction de deux directions presque opposées. Les magnitudes, spectres et lois de transfert ne changent pas. Un producteur sans les attributs conserve le chemin Float32 de repli.

## Validation

Source GitHub : `f64de6836bb883400cdc21859e2bf5b885f7f0fc`.

- Photométrie numérique : 25 contrôles réussis, dont conservation du résidu dans le vrai producteur, déplacement du vaisseau et respect de sa cadence.
- Couche spectrale : 25 contrôles réussis ; diagnostic spectre observateur : 12 ; cinématique haut gamma : réussie ; build réussi.
- Banc graphique : mêmes références indépendantes de demi-angle, mêmes seuils de flux (3 %) et de centroïde (0,35 pixel), sans exposition ni tonemapping. Gamma 10^4 ajouté entre 1000 et 10^6. Les anciens cas obliques extrêmes deviennent des assertions obligatoires, pas des sondes exemptées.
- CI graphique en cours au moment de cette note ; aucun résultat anticipé.

## Limites maintenues

Le banc HDR teste une source synthétique I_nu proportionnelle à nu^2 et les huit classes KC96 au repos. Ce n'est pas une validation du spectre empirique du ciel aux gamma extrêmes. La table empirique reste limitée à D dans [0,72 ; 1,09] ; le prolongement est thermique et explicite. Le domaine visé reste gamma <= 10^6 ; les planchers du shader ne permettent aucune revendication à 10^12. Le banc séparé du rayon inverse commun conserve ses propres limites et n'est pas corrigé par ces attributs de galaxies.

Rendu logiciel CI, pas une mesure de performance matérielle. Chrome utilisateur inaccessible ici. Autres PC et fluidité/mémoire sous charge restent ouverts ; téléphone différé selon la consigne utilisateur. La navigation FLRW et l'immersion locale restent séparées.

## Résultat du banc graphique

Run 43743284606 réussi sur f64de683 : 62 cas, tous imposés et réussis. Écart absolu maximal de flux 0,7291 %, aucun pixel non fini ni erreur JavaScript/GLSL. Les deux anciennes erreurs obliques ne sont plus détectables par le centroïde de cette image 128×128 ; cela ne prouve pas une erreur angulaire exactement nulle. Moteur : ANGLE/Vulkan SwiftShader Device (Subzero). Rapport complet daté dans `validation/reports/high-gamma-hdr-2026-11-15.json`.
