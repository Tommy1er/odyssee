# Banc de propulsion : expansion variable ΛCDM

Le troisième modèle du banc `/propulsion.html` prolonge les références Minkowski et de Sitter. Il reste indépendant du cockpit : aucune mission, sauvegarde, cible ou commande de vol modifiée.

## Cadre

Univers homogène plat, matière + constante cosmologique, paramètres fixes Planck H0 = 67,4 km/s/Mpc, Ωm = 0,315, ΩΛ = 0,685, sans rayonnement. Départ au présent a = 1, au repos local. Durée cosmique totale bornée à 0–1 milliard d’années, accélération propre de 0 à 1 g. Deux poussées de durées cosmiques égales, +g puis −g ; ce n’est ni un optimum en carburant ni un rendez-vous.

Pour u = γβ, la dynamique radiale est du/dt = α/c − H(a)u. Le facteur d’échelle utilise la solution analytique matière + Λ. Le facteur intégrant donne a(t)u(t) = a₀u₀ + (α/c)∫a(t)dt, intégré par quadrature de Gauss à huit points. Position comobile et temps propre suivent respectivement dχ/dt = u/(a√(1+u²)) et dτ/dt = 1/√(1+u²), avec Simpson adaptatif. Les unités de calcul sont année et année-lumière.

Le zéro éventuel du moment est isolé ; près de l’arrêt, l’intégrale est ancrée sur ce zéro pour éviter la soustraction de deux grands nombres. Les durées de poussée égales peuvent dépasser l’arrêt local et produire une vitesse finale négative : le banc l’indique explicitement.

## Précision et limites

Les subdivisions ont un contrôle de convergence et une limite de travail explicite. À grande durée et grand gamma, la représentation flottante du temps cosmique impose un plancher numérique ; il est enregistré et affiché, jamais présenté comme une erreur physique rigoureusement bornée. À 1 g pendant 1 milliard d’années, la résolution temporelle locale signalée est d’environ 27 secondes (temps cosmique). Cela ne constitue pas une incertitude sur les paramètres cosmologiques ni une garantie uniforme de précision sur l’horloge propre.

Le calcul de 1 − |β| utilise une expression stable, même lorsque β s’arrondirait à 1. Aucun calcul de champ lié, de consommation, de rétroaction, de conditions terminales sur une cible, ou de navigation mixte locale/cosmologique n’est inclus.

## Vérifications

`validate-rocket-lcdm.mjs` compare les horloges et positions aux solutions Minkowski et de Sitter sur 0, 20, 10⁶ et 10⁹ ans, y compris le freinage ultrarelativiste. Comparaison au vol libre FLRW indépendant (invariant aγβ), intégration RK4 indépendante en temps cosmique pour trois poussées faibles signées, resserrement de tolérance, causalité, monotonie de l’horloge et entrées invalides.

Les bancs H constant, photon/probe FLRW, référence FLRW, physique et navigation passent localement. Le build statique passe. La CI propulsion couvre le choix ΛCDM, le signe final, les diagnostics numériques, le domaine, le stockage inchangé et les vues desktop/mobile. CI propulsion réussie : run 41629439566 sur 94be3b5, aucune erreur JavaScript. Captures ordinateur et mobile examinées : résultats lisibles, pas de débordement horizontal. CI numérique/build également réussie (41629439550).

## Suite

Construire et valider les conditions d’arrivée sur une cible comobile dans ce banc avant toute intégration au pilote. Le retest matériel du préchauffage graphique reste distinct et ouvert ; ce lot ne mesure pas de performances sur Iris Xe ou téléphone.
