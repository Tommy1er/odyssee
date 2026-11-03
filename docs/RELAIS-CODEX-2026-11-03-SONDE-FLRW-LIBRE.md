# Lot B — trajectoire-test massive et référentiels

Base 91849ca. Le lot A reste ouvert sur le matériel : aucune mesure nouvelle de l'échauffement n'est arrivée. Ce lot complète le laboratoire indépendant, sans activer de pilotage FLRW ni modifier la mission du cockpit.

Option « Ajouter la trajectoire-test massive » dans cosmology.html : une particule massive part au même événement que le photon, vers l'observateur. Sa vitesse initiale est locale, relative au flot comobile, entre 0 et 0,999999 c. Elle est en chute libre dans le FLRW homogène, sans poussée. La constante K = a γ β provient de la conservation du moment spatial covariant ; γ(a)=sqrt(1+(K/a)²), β(a)=(K/a)/γ. Intégration dχ/da = −cβ/(a²H), dτ/da = 1/(aHγ). Même intervalle cosmique que le photon, jusqu'à aujourd'hui, pas jusqu'à l'arrivée de la sonde. Au cas dégénéré z=0, durée et distance initiales nulles.

Le curseur affiche vitesse locale, gamma, temps propre de la sonde, distance propre restante et variation de distance propre par temps cosmique, dD/dt = HD−cβ. Cette dernière n'est pas une vitesse locale ; elle peut être positive alors que la sonde pointe vers nous. La source du photon reste comobile. Aucune vitesse de récession n'est injectée comme impulsion SR dans le cockpit.

Source : Daniel Baumann, Cosmology, §1.2.1, équations 1.2.50–1.2.52 (https://cmb.wintherscoming.no/pdfs/baumann.pdf), dérivation de p∝1/a pour particules massives et sans masse. Paramètres et distances : Planck 2018 VI et Hogg, déjà documentés. Pas de données ou d'images nouvelles.

Tests locaux exécutés : trajectoires et temps propres comparés à la solution analytique de Sitter pour plusieurs z et beta ; invariant aγβ, vitesse locale <c, borne du temps propre, particule comobile, limite SR à faible z, absence d'arrivée mensongère à la réception du photon ; contrôle par différences finies de dD/dt ; entrées invalides et z=0. Tests FLRW et navigation existants, build. Test navigateur étendu : activation/désactivation, vitesse finale et temps propre attendus à z=1/beta=0,9, rejet de beta=1, stockage préservé, capture mobile avec sonde.

Limites : pas de poussée, freinage, rendez-vous, champ local, structure liée, mouvement galactique mesuré ni futur a>1. Le calcul ignore le rayonnement et reste limité à 0≤z≤2. Il ne constitue pas une validation d'une fusée accélérée dans FLRW. Suite : analyse/validation d'un éventuel modèle propulsé indépendant avant tout raccord au pilote ; immersion extragalactique et voyage complet restent des lots ultérieurs.
