# Arrivée comobile, voyage et séparation des régimes

## Conformité à la reprise

| Élément | État avant ce lot | Action |
| --- | --- | --- |
| Vol local, rendez-vous Terre/Lune, reprise | Opérationnel, tests existants | Préserver et étendre le test aller-retour de régime |
| Banc Minkowski, de Sitter et poussées ΛCDM prescrites | Opérationnel | Conserver comme références |
| Arrivée à position imposée et repos comobile | Absent | Solveur radial à deux poussées ajustées |
| Voyage cosmologique avec horloges et sauvegarde | Absent | Page dédiée reliée au cockpit |
| Transfert continu local → FLRW avec champ lié et ciel relativiste FLRW | Absent | Non simulé ; séparation explicite |
| Préparation du premier dessin sur Iris Xe | Correctif publié, retest matériel ouvert | Accès Chrome refusé par l’extension dans cette session |
| Autres PC et téléphone réel | Non vérifiés | Aucun résultat matériel revendiqué |

## Calcul

`rocket-transfer.js` cherche une trajectoire au départ comobile a = 1, u = 0 et χ = 0, vers un repère χ cible fixe, avec u final nul. ΛCDM plat matière + Λ : H0 = 67,4 km/s/Mpc, Ωm = 0,315, ΩΛ = 0,685, rayonnement négligé.

Pour une poussée propre de norme A = α/c et une durée totale T, le moment a u vaut A∫₀ᵗa(s)ds pendant l’accélération, puis A∫ₜᵀa(s)ds pendant le freinage. L’inversion t* satisfait ∫₀ᵗ*a(s)ds = ∫ₜ*ᵀa(s)ds. Le moment est nul aux deux extrémités par la condition aux limites du modèle ; aucune vitesse finie n’est effacée à l’arrivée. Un résidu de raccordement à l’inversion est calculé séparément et affiché.

Une seconde recherche sur T impose la position comobile. Domaine de T : 0–1 milliard d’années. Un trajet trop long est « hors domaine », jamais déclaré physiquement impossible. Distance : 0–1 milliard d’al, accélération strictement positive et ≤ 1 g.

Les quadratures des horloges et positions utilisent un temps logarithmique mesuré depuis chaque extrémité au repos. Cela résout les régions de temps propre très courtes à grand gamma, sans soustraire deux moments énormes au freinage. L’intégrale de a utilise une durée distincte de son origine pour conserver les petits intervalles près d’une arrivée tardive. Des limites de travail et de convergence arrêtent explicitement un calcul non résolu. Résidus et tolérances numériques ne constituent pas une incertitude astrophysique.

## Voyage et raccordement

`cosmic-flight.html` propose calcul, lecture, pause, curseur, horloges cosmique/propre, position comobile, distance propre restante à l’époque courante, journal et reprise. Le solveur et les échantillons s’exécutent dans un worker pour préserver l’interface.

Le cockpit expose « Voyage cosmologique ΛCDM ». Ouvrir cette page met le vol local en pause et conserve sa sauvegarde ; revenir permet de reprendre celle-ci. La mission cosmologique utilise une autre clé versionnée, `odyssee.cosmic.v1`. Elle reprend en pause, sans rattraper le temps écoulé hors de la page. Aucune écriture dans la clé de mission locale par le module cosmologique.

Ce raccordement est un changement explicite d’expérience, pas une continuité artificielle de métrique. Les galaxies liées, vitesses particulières, positions de catalogue et ciel 3D local ne sont pas transposés dans un espace FLRW par une transformation de Lorentz globale. La cible cosmologique est un repère mathématique, pas une galaxie dont la dynamique future serait prédite. Pas de consommation, d’optimalité de carburant ou de technologie réalisable calculée.

## Validation

Tests locaux réussis : transfert (solutions SR indépendantes, inversion de Sitter, RK4 Friedmann/moment/position/horloge indépendant, convergence, causalité, continuité), contrat de sauvegarde cosmologique, anciens bancs, photon/sonde FLRW, navigation, 25 contrôles de rendez-vous et sauvegarde locale. Build statique réussi.

La CI étendue doit contrôler : calcul en worker, lecture/pause/rechargement, arrivée, journal, vue mobile, sauvegarde locale inchangée, parcours cockpit Terre → expérience cosmologique → reprise Terre → Lune. Les six suites graphiques existantes restent requises pour le changement du cockpit.

L’extension Chrome renvoie « Browser access requires the originating browser context ». L’aperçu local vers le navigateur cloud a été refusé par la revue automatique (exposition du serveur local). Aucun contournement. Les captures et tests de CI ne sont pas une mesure sur l’Iris Xe, un autre ordinateur ou un téléphone réel.

Références : Henriques & Natário, arXiv:1105.5235, cadre radial FLRW ; Planck 2018 VI, arXiv:1807.06209, paramètres. Les équations de ce profil prescrit et les contrôles de limites sont documentés ci-dessus ; le modèle optimal en carburant de l’article n’est pas implémenté.

## Réparation du banc de CI

Premier run dfd8c63 : calculs et build réussis, navigateurs non exécutés. Le runner `ubuntu-latest` a basculé sur Ubuntu 26.04, non pris en charge par Playwright 1.56.1. Les workflows sont fixés sur Ubuntu 24.04 pour conserver le navigateur de référence ; aucun contrôle n’est retiré. Les anciens JSON déjà présents dans le dépôt ne constituent pas une preuve de ce run interrompu.
