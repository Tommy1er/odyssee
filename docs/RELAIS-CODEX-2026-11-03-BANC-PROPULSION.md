# Lot B — deux poussées opposées, Minkowski et de Sitter

Base 8952793. Banc indépendant dans propulsion.html, lié depuis l'observatoire cosmologique. Aucun raccord au pilote du cockpit. Ce lot ne prétend pas simuler une fusée propulsée dans le ΛCDM matière + Λ général.

## Équations et unités

Métrique radiale ds² = −dt² + a² dχ², c=1 ; u=γβ est le moment local par unité de masse/c. Sous accélération propre signée A=α/c, du/dt=A−Hu. En effet, U=(γ,u/a) et l'accélération covariante vaut (Au,Aγ/a), de norme spatiale au carré A². On ne remplace pas une vitesse de récession par u.

Pour H constant : a=a_i exp(Ht), B=A−Hu_i, u=u_i+B(1−exp(−Ht))/H. La position comobile est intégrée analytiquement : Δχ = t × exprel(−Ht) × (u+u_i)/(γ+γ_i)/a_i, en années-lumière pour t en années. Cette forme garde les petits déplacements et le passage par H=0 stables. Le temps propre ∫dt/γ est calculé par Simpson adaptatif, en rapidité pour les grandes variations de moment, en temps cosmique pour les petites variations. Échec explicite si la quadrature ne converge pas. Les phases partagent position, impulsion, facteur d'échelle et horloges sans saut de vitesse.

## Domaine et lecture

Départ au repos local, a_i=1 et χ=0 ; +g pendant la première moitié de la durée cosmique, puis −g pendant la seconde moitié. Durée totale 0–10^9 ans, poussée 0–1g. En Minkowski H=0 ; en de Sitter H=67,4 km/s/Mpc constant, Ωm=0, ΩΛ=1 : cas pédagogique, pas le futur Planck réel. Le signe de poussée bascule instantanément (jerk non modélisé), pas la vitesse. Aucun coût énergétique, carburant, cible, rencontre ou survie. Deux durées cosmiques égales peuvent dépasser l'arrêt local en expansion ; l'interface le signale et ne prétend pas à un rendez-vous. Aux très grands gamma, afficher 1−|β| évite l'arrondi trompeur à c.

## Validation

Tests locaux exécutés : cas SR analytiques de position/moment/horloge sur de petites et grandes durées, deux poussées opposées, limite libre de Sitter (a u constant), position et temps propre comparés à une intégration indépendante en temps cosmique, équation de mouvement par différences finies, moment terminal, dépassement de l'arrêt et domaines invalides ; petits déplacements conservés. Tests photon/sonde FLRW, relativité et navigation existants passent. Build réussi.

Nouvelle CI propulsion.yml : mêmes calculs puis navigateur ordinateur/mobile (horloge SR, inversion du mouvement de Sitter, validation des champs, curseur, absence de débordement, sentinelle du stockage). Capture de la page et résultats dans propulsion-benchmark. L'ancien observatoire a sa suite distincte. Sources de cadre : Henriques & Natário, The rocket problem in general relativity, arXiv:1105.5235, §7, métrique radiale et repère orthonormé. Leurs conditions d'optimalité/carburant ne sont pas implémentées ici ; les équations et simplifications du banc sont explicitées ci-dessus.

## Restant

Validation matérielle de l'échauffement toujours ouverte. Pour la propulsion cosmologique : H(a) variable du ΛCDM, rendez-vous avec cible mobile et conditions terminales, contrôle indépendant et analyse des erreurs avant toute intégration au cockpit. Immersion M87/amas et voyage complet ne sont pas livrés par ce banc.
