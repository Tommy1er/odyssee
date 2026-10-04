# Appui à Claude : données débloquées et critères physiques

Codex, 4 octobre 2026. Audit lu : `docs/AUDIT-RENDU-PHYSIQUE-2026-10-04.md`, commit `2bd89b3`, base applicative `e506f0b`. Ce lot apporte des ressources et des critères de validation. Aucun module applicatif, bundle ou état du site n'est modifié. Claude garde l'implémentation du moteur. Un seul dépôt, branche `main`, interventions séquentielles. Récupérer ce commit avant de commencer.

## Données disponibles hors ligne

Voir `data/references-2026-10-04/MANIFEST.json` : URL, date de récupération, SHA-256, taille et nombre de lignes. Les fichiers `.tsv.gz` sont des exports VizieR complets, compressés sans perte. Les commentaires décrivent les champs et unités ; les trois premières lignes non commentées sont les noms, les unités et les séparateurs, pas des galaxies.

| Fichier | Contenu vérifié | Usage |
| --- | --- | --- |
| `mcconnachie-2012.tsv.gz` | 102 entrées, J/AJ/144/4/catalog | Galaxies proches, sous-groupes, distances et formes. Version historique, pas Groupe local exhaustif à jour. |
| `ungc-2013.tsv.gz` | 869 entrées, J/AJ/145/101/catalog | Volume local : distances, morphologies et dimensions. |
| `2mrs-2012.tsv.gz` | 44 599 entrées, J/ApJS/199/26/table3 | Positions, photométrie, cz, type et forme apparente ; pas 44 599 distances indépendantes. |
| `cosmicflows4-galaxies.tsv.gz` | 55 877 entrées, J/ApJ/944/94/table2 | Modules de distance et erreurs, indicateurs, coordonnées, vitesses CMB. |
| `mamajek-dwarfs.txt` | Table de l'auteur, version indiquée 2022.04.16 | Séquence moyenne des naines ; ne pas appliquer aux géantes, supergéantes ou naines blanches. |
| `jpl-elements-table-1.txt` | 8 objets, éléments et dérivées | Ajustement 1800–2050, barycentre Terre-Lune inclus. |
| `jpl-elements-table-2.txt`, `-3.txt` | 8 objets et termes supplémentaires | Ajustement 3000 av. J.-C.–3000 apr. J.-C. ; termes de M indispensables pour les géantes. |
| `horizons-earth-reference.json`, `horizons-jupiter-reference.json` | 3 états chacun : 4, 5 et 6 octobre 2026, TDB | Références indépendantes JPL : positions et vitesses géométriques héliocentriques, axes ICRF, AU et AU/jour. |

Ces catalogues se recouvrent : ne pas sommer les effectifs pour annoncer un nombre d'objets uniques. Garder les identifiants de chaque relevé, faire une association documentée (identifiants, position, distance et ambiguïtés). Dans McConnachie, une distance vide, notamment pour notre Galaxie, n'est pas zéro. Des champs sont des limites ou estimations : conserver leurs drapeaux.

## A2 — Orbites : premier lot recommandé, avec limites visibles

Les tables JPL sont des ajustements sur des intervalles finis, pas une éphéméride exacte valable indéfiniment. Dans le tableau 1800–2050, les erreurs nominales de longitude atteignent 400 secondes d'arc pour Jupiter et 600 pour Saturne : « une minute d'arc pour les huit planètes » serait incorrect. La ligne EM Bary est le barycentre Terre-Lune, pas le centre de la Terre. Les formules emploient JD TDB et l'écliptique J2000 ; transformer vers ICRF avant comparaison avec nos vecteurs.

Source : https://ssd.jpl.nasa.gov/planets/approx_pos.html ; API : https://ssd-api.jpl.nasa.gov/doc/horizons.html

Critères :
- Identifier explicitement époque initiale, échelle de temps, origine, axes et unités dans les données.
- Vérifier Terre/Jupiter contre les états Horizons fournis, avec tolérance justifiée par le modèle. Pour Terre vs EM Bary, traiter ou comptabiliser le décalage barycentrique, pas une comparaison à tolérance arbitraire.
- Pour les lunes, employer une vraie éphéméride ou un modèle adapté au satellite : les éléments moyens seuls ne garantissent pas les éclipses et occultations. Ajouter des références parent-relatives, pas des phases inventées affichées comme observées.
- La date physique des centres suit le temps de mission ; l'horloge d'animation pédagogique des surfaces ne doit pas déplacer les centres.
- Position retardée : évaluer l'éphéméride à l'émission, dans sa validité. Interception : évaluer à l'arrivée prévue, pas au temps actuel.
- En dehors des bornes, afficher « extrapolation illustrative » ou choisir une modélisation explicitement différente. Un saut de 20 000 ans ne doit jamais conserver le label « éphéméride JPL précise ».
- Pour les exoplanètes : ne pas fusionner sans contrôle des éléments provenant de publications différentes. T0 de transit n'est pas automatiquement le temps du périastre ; l'argument du périastre RV peut être celui de l'étoile. Une longitude du nœud inconnue empêche une orientation 3D absolue connue.

## A3 — Rayons et spectres : estimations traçables, pas valeurs observées fabriquées

La correction des étoiles géantes est nécessaire. Mais la table Mamajek concerne une séquence moyenne de naines : attribuer ses rayons à Betelgeuse M2Ib ou Rigel B8Ia reproduirait le problème. Commencer par des propriétés documentées pour les cibles célèbres ; conserver l'incertitude des distances, de l'extinction, du rayon et la variabilité. « 750 rayons solaires » est un ordre de grandeur possible pour Betelgeuse, pas un unique rayon exact universel.

Pour les étoiles compatibles : Mbol = MV + BCV ; L/Lsoleil = 10^[0,4(Mbol,soleil − Mbol)] ; R/Rsoleil = sqrt(L/Lsoleil) × (Tsoleil/Teff)^2. Expliciter la calibration bolométrique et l'extinction, et distinguer rayon mesuré, inféré et valeur de secours. Ne pas déduire un rayon précis d'une magnitude combinée de système binaire ou d'une magnitude G traitée comme V.

Utiliser la LUT corps noir existante pour garder une cohérence entre approche et ciel ; un corps noir reste une approximation du spectre stellaire. Pour l'assombrissement centre-bord, les coefficients dépendent aussi de log g, métallicité et bande, pas uniquement de T. Documenter la loi retenue.

Alpha Centauri existe déjà comme entrée agrégée `h71456`, « Alpha Centauri A + B » : la décomposer en conservant l'identité système et sans doubler sa luminosité. Dans les systèmes Gaia BH, les coordonnées Gaia se rapportent à la compagne lumineuse ; ne pas lui ajouter une seconde étoile superposée sans résoudre l'identité. Sirius B nécessite une propriété de naine blanche, pas un rayon de naine A/G.

Source de calibration : https://www.pas.rochester.edu/~emamajek/EEM_dwarf_UBVIJHK_colors_Teff.txt ; références demandées par l'auteur : Pecaut & Mamajek 2013, ApJS 208, 9 ; Pecaut, Mamajek & Bubar 2012, ApJ 756, 154.

## B5 — Éclairage du vaisseau

Choisir les sources dominantes par flux F = L/(4πd²), pas seulement par proximité. Plusieurs étoiles d'un système peuvent contribuer. Conserver l'éclairage de studio comme mode « inspection » clairement nommé, et faire de l'éclairage astrophysique un mode distinct. L'exposition peut rendre visible une coque sombre mais ne doit pas fabriquer une énergie reçue. Direction/lumière en vol relativiste et ombre par les corps doivent rester cohérentes avec le référentiel et le mode optique.

Tests utiles : diviser le flux par quatre quand la distance double ; basculer la source dominante quand une étoile plus lointaine mais lumineuse l'impose ; vérifier la direction dans les référentiels cockpit et extérieur. La caméra extérieure actuelle est une inspection accompagnante, pas un observateur inertiel éloigné : définir ce choix avant de modifier la lumière relativiste.

## A1 — Gravité : continuité à corriger, ne pas supprimer ce qui existe

L'affirmation « aucune gravité en vol libre » est trop générale. Dans `cockpit.js`, `step()` appelle automatiquement `nearbyGravity()` puis `enterOrbit()` si gravité locale activée, sans autopilote, à moins de 0,01c. Le corps doit être cible ou objet proche, à 1–60 rayons et à plus de 100 Rs ; sortie au-delà de 72 rayons. `stepOrbit()` combine déjà poussée et gravité newtonienne. À 1 AU du Soleil (~215 rayons solaires), ou 15 Rs d'un trou noir, on est hors de ce domaine. Le diagnostic précis est donc une gravité locale discontinue et restreinte, pas son absence totale.

Ne pas ajouter simplement −GM/r² à l'intégrateur SR et multiplier toutes les horloges par des facteurs gravitationnels arbitraires pour appeler cela « relativité générale ». Choisir une métrique, des coordonnées et un observateur de référence. Pour une région Schwarzschild : intégrer Duμ/dτ = aμ, avec g(u,u) = −c² et g(u,a) = 0 ; définir la poussée propre dans un repère orthonormé local. Convertir explicitement états et horloges aux changements de région. Plusieurs masses et un potentiel galactique ne se superposent pas exactement comme plusieurs métriques Schwarzschild.

Commencer par une région centrale sphérique contrôlée, puis ajouter un modèle champ faible multi-corps séparément. L'autopilote à trajet rectiligne SR doit lui aussi respecter le domaine gravitationnel : pilotage corrigé ou limite clairement indiquée.

Tests ciblés : énergie et moment cinétique sans poussée, normalisation du quadrivecteur, orbite circulaire stable au-delà de 6GM/c² et instabilité en deçà, limite newtonienne, périastre/précession, continuité de position/vitesse/temps propre aux transitions. Un survol conservatif non lié ne devient pas une capture sans dissipation ou échange d'énergie avec un troisième corps.

## B1/B2 — Objets compacts

Sgr A* : séparer visible, infrarouge, radio et fausses couleurs. Le remplacer par un disque mince orange « réaliste » reste trompeur. Kerr peut être une extension paramétrée, mais ne pas prétendre connaître précisément le spin de Sgr A* ou de M87*. Avant Kerr, corriger le modèle d'émission, les occultations et la résolution adaptative des rayons. Un anneau de photons doit résulter des trajectoires et de l'émission, pas d'un cercle lumineux plaqué. L'invariant Iν/ν³ donne Iν,obs = g³ Iν,em(νobs/g) ; la puissance quatre concerne l'intégrale bolométrique sous les hypothèses correspondantes. Conserver la fréquence dans le transfert.

Étoiles à neutrons : la relation approchée de Beloborodov, cos α ≈ Rs/R + (1−Rs/R) cos ψ, est utile dans son domaine Schwarzschild et pour un observateur lointain. Ne pas la déclarer exacte pour une caméra près de la surface ni pour une étoile en rotation rapide. À R=3Rs, elle rend visible environ 3/4 de la surface ; elle n'explique pas seule une magnétosphère. Le rotating-vector model décrit notamment la polarisation : il ne détermine pas à lui seul une géométrie complète d'émission. Les lignes de champ ne sont pas des fils lumineux visibles à l'œil ; proposer une surcouche pédagogique. Intégrer les impulsions sur la durée d'exposition pour éviter l'aliasing des périodes de quelques dizaines de ms.

Référence : https://arxiv.org/abs/astro-ph/0201117

## C — Laniakea : catalogue observé, distances et modèle de flux séparés

2MRS est limité en flux et sa couverture annoncée est de 91 % du ciel, pas un inventaire complet de tout Laniakea. Une vitesse cz ne constitue pas à elle seule une distance exacte, particulièrement près de nous : conserver le référentiel de vitesse. CF4 fournit des modules de distance ; d[Mpc] = 10^[(DM−25)/5]. Ne pas confondre km/s, redshift sans dimension, distance propre, comobile et distance de luminosité. Ne pas déduire la profondeur d'une galaxie du seul aplatissement apparent : inclinaison et épaisseur intrinsèque sont dégénérées.

Sources : https://arxiv.org/abs/1108.0669 ; https://cdsarc.cds.unistra.fr/viz-bin/cat/J/ApJ/944/94

Les frontières/flux sont des reconstructions dépendantes du modèle, pas une enveloppe directement mesurée. La page de l'équipe Cosmicflows fournit des bassins FITS 128³ et des champs de vitesse/densité : https://projets.ip2i.in2p3.fr/cosmicflows/ . Lire les unités, axes SGZ/SGY/SGX, facteurs d'échelle et version avant conversion. Les reconstructions de 2014, 2023 et les résultats probabilistes plus récents ne doivent pas être fusionnés comme une unique frontière exacte. Pour les FITS de vitesse 2023, la page demande de multiplier les valeurs ET erreurs par 52 ; le domaine de la grille de bassins est donné en Mpc/h, pas directement en Mpc. Les bassins sont du modèle, à distinguer des galaxies observées. Source de définition 2023 : https://www.aanda.org/articles/aa/abs/2023/10/aa46802-23/aa46802-23.html

Contrôle analytique interne pour 250 millions d'al en espace plat, départ et arrivée au repos, accélération propre 1g puis freinage à mi-distance, sans limiteur : gamma_max = 1 + aD/(2c²), tau = 2c/a acosh(gamma_max), t = 2c/a sqrt(gamma_max²−1). Avec année julienne : tau ≈ 37,526 ans ; t ≈ 250 000 001,937 ans ; gamma_max ≈ 1,29037×10^8. C'est une limite idéale SR, pas un résultat FLRW ni le scénario à 0,99c. En FLRW, recalculer la trajectoire avec a(t), l'événement cible et les conditions de freinage ; pas une correction universelle de « 2 % ». Ne pas dilater les orbites liées en appliquant l'expansion partout. Le redshift cosmologique décrit la propagation lumineuse passée, distincte de l'évolution future de la mission.

## Risque transversal à traiter tôt : précision des coordonnées

À ~10^8 al, additionner une position absolue de galaxie et un décalage de planète en nombres double perd déjà une partie des distances locales. Soustraire la caméra uniquement dans le shader arrive trop tard. Stocker hiérarchiquement centre galactique/système et positions locales en SI, puis convertir en coordonnées relatives avant Float32 GPU. Tester Terre-Lune après une visite cosmique, le recentrage, les proches passages et le changement d'échelle. C'est essentiel au rendu multi-astres B3 et à la navigation.

## Relais proposé

1. Claude récupère `main` avec ces données et lance le contrôle du lot.
2. Premier commit applicatif : A2 borné dans le temps, A3 avec provenance/valeurs de secours visibles, B5 avec éclairage physique et inspection distincts.
3. Vérifier visuellement les approches Terre/Lune, géantes/étoiles naines et vaisseau, puis navigation aller/retour et temps mission vs animation. Les six tests numériques existants ne prouvent pas à eux seuls la fidélité visuelle.
4. Ensuite A1, B1/B2, multi-astres et nébuleuses. Phase C dispose déjà des relevés ; leur intégration n'est pas faite par ce lot.
5. Claude envoie ses commits sur `main`. Codex publie la version demandée sur le même ChatGPT Site. Aucun nouveau site et aucune migration d'hébergeur.
