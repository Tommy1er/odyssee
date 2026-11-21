# ODYSSÉE V3 — DIRECTIVE D'ARCHITECTURE ET DE DÉVELOPPEMENT
## Évasion cosmique : du Système solaire à la toile de l'Univers

**Destinataires : Claude Code et OpenAI Codex**

**Dépôt de référence :** `Tommy1er/odyssee`, branche `main`.

**Objectif :** transformer Odyssée en un simulateur d'exploration astrophysique capable de faire voyager librement un observateur depuis la Terre jusqu'aux galaxies, amas, superamas et grandes structures cosmiques, tout en distinguant strictement la physique calculée, les données observées et les reconstitutions scientifiques.

### 1. Préserver et auditer l'existant

Avant toute modification, récupérer le dernier `main`, lire `CLAUDE.md`, `COLLABORATION.md`, `README.md` et `public/physics-v2.html`.

Auditer notamment :

- `src/physics.js`, `navigation.js`, `cosmic-motion.js`, `flrw.js`
- `src/renderer.js`, `sky-optics.js`, `galaxy-photometry.js`, `galaxy-observer-spectrum.js`
- `src/local-group.js`, `extragalactic-nebulae.js`
- `src/cosmic-data.js`, `cosmic-scene.js`, `cosmos.js`
- Le dispositif de mesure `sceneTimings`, les caches et la préparation anticipée des scènes

Ne pas reconstruire les fonctions déjà présentes. Préserver Odyssée-01, le vol libre, le mode destination, les horloges, l'aberration, le Doppler, les cartes, les expériences gravitationnelles et les catalogues.

Commencer par un tableau de conformité : **déjà opérationnel / partiellement implémenté / absent / non vérifié**.

### 2. P0 — Consolider les performances avant d'élargir les scènes

Le moteur doit demeurer exploitable sur un ordinateur utilisant un GPU intégré Intel Iris Xe.

Reprendre les dernières mesures matérielles : à-coups lors des arrivées, génération des environnements, compilation WebGL et rendu des volumes.

Mesurer séparément :

- Temps d'initialisation et compilation GPU
- Images par seconde et temps d'image P50/P95/P99
- Rendu du fond stellaire et des galaxies
- Nuages volumétriques et nébuleuses
- Lentilles gravitationnelles et trous noirs
- Passage entre catalogue, vol, arrivée et exploration locale
- Utilisation mémoire et évictions des caches

Tester réellement le nouveau mécanisme de préparation anticipée des environnements sur Iris Xe. Documenter les mesures avant/après.

Créer des profils graphiques **Performance / Équilibré / Qualité**, avec résolution adaptative des effets coûteux et transitions sans disparition des objets. Ne pas sacrifier les lois physiques pour obtenir artificiellement de meilleures performances.

Objectif de confort : viser 20–30 images/s en mode Performance lorsque réalisable, sans prétendre l'avoir atteint avant mesure. Fournir des résultats réels, même si cet objectif n'est pas atteint.

### 3. P1 — Unifier la physique du voyage et les référentiels

La version actuelle sépare à juste titre la navigation relativiste locale du modèle FLRW de référence. Nous voulons maintenant rendre cette séparation explicite à l'utilisateur et étudier son éventuelle intégration.

Prévoir trois régimes :

**A. Navigation locale relativiste — physique calculée**

Conserver l'intégrateur existant, avec vitesse strictement inférieure à c, accélération propre, freinage à poussée finie, quantité de mouvement relativiste, temps propre et gestion des cibles mobiles.

Vérifier en particulier les changements de référentiel, le rendez-vous avec les cibles, les mouvements transversaux et la continuité des horloges.

**B. Exploration cosmologique — modèle ΛCDM/FLRW**

Développer une architecture distincte permettant de traiter l'expansion de l'Univers sur de grandes distances et durées.

Elle doit différencier :
- Distance comobile
- Distance propre à une époque spécifiée
- Distance de luminosité
- Distance angulaire
- Temps de parcours de la lumière et lookback time
- Redshift cosmologique
- Vitesses particulières des galaxies
- Structures gravitationnellement liées, qui ne suivent pas simplement le flot de Hubble

Ne pas interpréter automatiquement une vitesse de récession cosmologique comme une vitesse locale au sens de la relativité restreinte. Ne pas appliquer une simple transformation de Lorentz globale à tout l'espace-temps FLRW.

**Important :** commencer par un calculateur cosmologique et des trajectoires-tests indépendants, avant toute tentative de couplage au pilotage. Si un modèle de fusée accélérée dans un univers FLRW n'est pas suffisamment validé, conserver le modèle local et afficher clairement son domaine d'application.

Conserver des paramètres cosmologiques identifiés avec leurs sources ; ne pas mélanger silencieusement les conventions H₀ = 74,6 du traitement CF4 et H₀ = 67,4 du modèle Planck.

**C. Transport spéculatif — fiction explicite**

Les passages de type trou de ver restent possibles pour explorer rapidement, mais ils doivent être identifiés comme fictifs.

Aucun raccourci ne doit être présenté comme un voyage physique démontré.

### 4. P1 — Rendre cohérent le ciel vu depuis un vaisseau relativiste

Nous voulons que la vision astrophysique corresponde autant que possible à la position, à la vitesse et au référentiel de l'observateur.

Revoir l'ensemble de la chaîne :

source lumineuse → spectre émis → propagation → mouvement relatif source/observateur → aberration → Doppler → réception → affichage HDR.

Garantir la cohérence des étoiles ponctuelles, galaxies, nébuleuses étendues, émissions diffuses et sources compactes.

Distinguer les modèles de spectres thermiques, les spectres galactiques empiriques et les bandes non thermiques. Lorsque les données spectrales n'existent pas, signaler les approximations.

Ne pas transformer artificiellement une image relativiste en tunnel d'hyperespace. Le rendu doit rester compatible avec les prédictions de la physique, même si une exposition ajustable est nécessaire pour observer les objets.

Introduire un mode de comparaison scientifique : même scène et même position à 0 c, 0,9 c, 0,99 c et à facteur gamma très élevé.

### 5. P1 — Rendre la traversée intergalactique réellement immersive

L'objectif n'est pas seulement d'ajouter des objets sélectionnables : le paysage doit changer de manière crédible lorsqu'on traverse l'espace.

Parcours de référence :

**Soleil → Grand Nuage de Magellan → 30 Doradus/R136 → Andromède → NGC 604/M33 → M87 → amas de la Vierge → région de Laniakea → amas de Coma/Persée → vide du Bouvier → structures plus lointaines.**

Chaque étape doit montrer des différences réelles de morphologie, luminosité, échelle et environnement.

Implémenter des transitions cohérentes entre :

- Galaxie non résolue, source ponctuelle
- Galaxie résolue, disque ou volume apparent
- Approche et traversée de ses régions stellaires
- Éloignement progressif de la galaxie
- Vision des groupes, amas et filaments à grande échelle

Les tailles angulaires doivent suivre la géométrie et les distances appropriées au régime physique retenu.

Pour les galaxies observées, privilégier les directions, magnitudes, morphologies, orientations, redshifts et distances mesurés lorsqu'ils sont disponibles.

Ne pas faire apparaître arbitrairement des millions d'étoiles non cataloguées : utiliser des populations statistiques clairement identifiées et calibrées sur les propriétés des galaxies.

### 6. P2 — Ajouter les phénomènes réellement caractéristiques des amas et grandes structures

À l'intérieur de l'amas de la Vierge, le vaisseau doit pouvoir explorer :

**M87 et M87\***, son jet relativiste, les galaxies elliptiques géantes, la chaîne de Markarian et les galaxies perturbées.

Ajouter un mode scientifique permettant de représenter :

- Plasma intra-amas observé en rayons X
- Températures et densités estimées
- Pression dynamique et arrachement du gaz galactique
- Interactions et collisions de galaxies
- Jets relativistes et structures radio étendues
- Lentilles gravitationnelles lorsque les données et le modèle le permettent

Pour Laniakea, le Grand Attracteur et la toile cosmique, préserver une distinction fondamentale : un bassin d'attraction, un superamas, un amas lié et un filament ne sont pas le même type d'objet.

Leurs enveloppes et connexions géométriques ne doivent pas être représentées comme des murs lumineux réellement observables.

Le vide du Bouvier doit être un volume statistiquement sous-dense, pas une sphère noire solide ni un trou noir.

### 7. P2 — Modéliser les risques physiques sans détruire l'expérience

Conserver notre protection fictive, mais afficher les risques réels du voyage :

- Énergie cinétique relative d'un grain de poussière
- Flux de particules et rayonnement incident
- Intensification et décalage spectral du fond diffus cosmologique
- Risques liés à la densité du milieu traversé
- Effets gravitationnels locaux, lorsque le modèle est valide

Ne jamais présenter un indicateur approximatif de danger comme un calcul fiable de survie du vaisseau ou de l'équipage.

### 8. Provenance et honnêteté scientifique

Chaque objet ou structure doit posséder un statut explicite :

**OBSERVÉ** : mesure astronomique avec source et incertitude.

**CALCULÉ** : résultat d'une équation implémentée et validée.

**RECONSTITUÉ** : géométrie, émission ou population estimée.

**SPÉCULATIF** : mécanisme ou élément fictif.

La fiche doit distinguer les paramètres effectivement mesurés des paramètres supposés.

Aucune reconstitution 3D ne doit être présentée comme une photographie réelle.

Préserver la traçabilité des catalogues NASA, ESA, Gaia, SIMBAD/VizieR, UNGC, Cosmicflows et autres sources utilisées. Vérifier les licences.

### 9. Expérience utilisateur

Conserver les modes Cockpit, Sonde 3D, Carte galactique 3D et Structures cosmiques.

Améliorer leur continuité conceptuelle : la caméra libre n'est pas le vaisseau, une sélection n'est pas un déplacement, et un passage fictif n'est pas un trajet relativiste.

Ajouter un journal d'exploration indiquant :
- Objet quitté, destination et position
- Distance de trajet et distance encore à parcourir
- Temps coordonné et temps propre
- Facteur gamma, vitesse et freinage
- Mode physique et approximations appliquées
- Sources des observations remarquables

Ajouter un mode « Qu'est-ce que je regarde ? » cohérent avec le rendu effectivement affiché.

### 10. Validation obligatoire

Créer ou étendre les validations numériques et navigateur existantes.

**Tests physiques :** comparer les calculs relativistes avec des solutions analytiques indépendantes ; comparer FLRW avec des valeurs de référence ; vérifier les unités, les référentiels, les changements de régime, les redshifts et les distances cosmologiques.

**Tests visuels :** valider par captures et mesures photométriques, sans juger seulement à l'œil : galaxie lointaine non résolue, approche M31/M87, transition source ponctuelle → volume, rendu de 30 Doradus/NGC 604, jet de M87, ciel à 0,99 c et très grand gamma.

**Tests de navigation :** départ, accélération, freinage, arrivée, vol libre, reprise après interruption, passage fictif et trajectoire vers une galaxie mobile.

**Tests matériels :** CPU/GPU intégré, résolution 1080p, navigateur Chromium/Chrome, test mobile et absence de régression.

Ne pas considérer les tests numériques ou SwiftShader comme une preuve de fluidité sur Iris Xe.

### 11. Organisation de l'équipe et livraison

Claude Code et Codex travaillent **séquentiellement** sur le même dépôt et le même `main`, conformément à `COLLABORATION.md`.

Ne pas travailler simultanément sur les mêmes fichiers. Pas de force push. Pas de suppression du travail existant.

**Ordre recommandé :**

**Lot A — Audit et performances.** Établir la référence de performance, valider la préparation anticipée, corriger les ralentissements bloquants.

**Lot B — Physique cosmologique.** Consolider les référentiels, FLRW, mouvements des galaxies et propagation lumineuse, avec leurs domaines de validité.

**Lot C — Immersion extragalactique.** Améliorer la continuité de rendu, les galaxies, M87, l'amas de la Vierge et les grandes structures.

**Lot D — Validation intégrale.** Effectuer un voyage complet de référence, reproduire les tests sur matériel réel et actualiser le manuel.

À la fin de chaque lot, livrer :
- Commit SHA et fichiers modifiés
- Fonctionnalités réellement achevées
- Résultats de tests et performances avant/après
- Sources scientifiques utilisées
- Limites restantes et approximations
- Instructions de reprise pour l'autre développeur

**Publication :** conserver le site ChatGPT Sites existant et son audience privée. Ne pas modifier la visibilité du dépôt GitHub ni migrer l'hébergement. Codex publie uniquement après validation de la version issue de `main`.

### Addendum du 21 novembre 2026 — Un Univers vivant et en mouvement

**Origine : décision d'orientation du propriétaire, 21/11/2026.** Ce complément explicite la vision d'Odyssée : **l'Univers ne doit pas être un décor statique**. Lorsqu'on contemple un système planétaire, un champ stellaire ou des structures cosmiques, le joueur doit pouvoir *percevoir, explorer et comprendre* les mouvements réellement modélisables. Cela inclut notamment la **révolution des planètes autour de leur étoile**, leur **rotation sur elles-mêmes**, les **orbites des satellites naturels**, les trajectoires des **comètes**, les mouvements d'étoiles et, à des échelles adaptées, ceux des galaxies et structures cosmiques. La présence d'un calcul de position dans le moteur ne suffit pas si aucun parcours de l'interface ne permet d'en apprécier l'évolution.

**Statut : exigence produit transversale et mandat d'étude pour le Head UI/UX (Claude) et l'ingénierie (Codex), pas ordre de commencer immédiatement un lot de code ni autorisation de déployer.** Le Head choisit la séquence et distingue clairement existant / à améliorer / absent / scientifiquement indéfini, avant d'estimer les coûts et les tests. Préserver les travaux et la gouvernance actuels.

#### Ce qui est déjà en place — à préserver et à auditer avant toute implémentation

La lecture de `main` à cette date fait apparaître des fondations réelles ; **ne pas présenter ce besoin comme si Odyssée n'avait aucune dynamique** :

- `src/ephemeris.js` + `src/solar-ephemeris.js` : positions évolutives des planètes du Système solaire (éléments approchés JPL/Standish), de la Lune (théorie lunaire simplifiée), et orbites animées mais **phases illustratives** d'autres satellites et des exoplanètes ; calcul de positions à l'époque de mission et, selon le réglage, de lumière retardée.
- `src/iau-rotation.js` et la représentation des corps proches : paramètres de rotation/orientation des principaux corps d'après l'IAU (avec simplifications documentées). Vérifier par essai visuel ce qui tourne effectivement, dans quelles vues et selon quelle horloge.
- `src/comets.js` : orbites osculatrices JPL propagées par un modèle képlérien à deux corps ; précision dépendant de l'éloignement de l'époque de référence.
- `src/cosmic-motion.js` : vitesses radiales cataloguées et mouvements particuliers parfois reconstruits, avec approximation cinématique de premier ordre ; **ce n'est ni une simulation N-corps de galaxies ni une évolution FLRW complète des formes**.
- Le cockpit possède un **temps de mission** (`t`), un **temps propre** (`tau`), une commande de pause/vitesse de lecture et une animation de surfaces (`animateBodies`, `observationTime`) qui peut progresser indépendamment des horloges de mission. Cette dernière distinction doit être explicite et testée.

**Risque UX actuel à investiguer :** un voyage ou une visite en pause, une échelle de temps réelle trop lente, une caméra immobile ou une Carte ne montrant pas les mêmes mouvements peuvent faire croire à tort que tout l'Univers est figé. Ce risque est une **hypothèse à tester**, pas la preuve que les trajectoires calculées n'existent pas.

#### Expérience cible : voir le mouvement sans tromper

1. **Échelle planétaire — priorité perceptible.** Depuis Explorer, la Carte et une fiche/Observatoire, pouvoir sélectionner un système (par exemple Soleil–Terre–Lune, Jupiter et ses satellites), visualiser les **orbites** et comprendre les mouvements relatifs. Laisser visibles le sens et la vitesse d'évolution, le centre/référentiel choisi, la période et la date simulée. Rotation axiale, révolution orbitale, phase/éclairage et éventuelle rotation synchrone d'un satellite sont des phénomènes différents à représenter sans les confondre. Les modèles n'ont pas tous la même précision.
2. **Systèmes extrasolaires et étoiles.** Exploiter périodes, demi-grands axes et mouvements propres quand ils sont disponibles. Si l'époque orbitale, l'inclinaison, l'excentricité ou la phase manquent, ne pas inventer une trajectoire présentée comme observée : fournir au besoin une **orbite schématique/illustrative** avec provenance explicite. Le mouvement propre d'une étoile est souvent imperceptible en quelques minutes ; ne pas fabriquer un ballet artificiel.
3. **Comètes et objets transitoires.** Montrer les trajectoires réellement modélisées, les passages, et les évolutions photométriques calculées avec leurs limites. Différencier le déplacement orbital d'une animation illustrative de la coma ou de la queue.
4. **Galaxies et grandes structures.** Les vitesses de galaxies peuvent modifier leur position à des échelles temporelles pertinentes, mais la **rotation morphologique**, les collisions, les filaments et l'expansion ne doivent pas être inventés par simple animation décorative. Les structures gravitationnellement liées ne s'étirent pas mécaniquement avec le facteur d'échelle cosmologique. Distinguer *vecteur de vitesse mesuré*, *champ reconstruit*, *flux pédagogique* et *évolution dynamique effectivement simulée*. Lorsque le modèle ne permet pas d'inférer le futur, le dire.
5. **Échelle temporelle visible et honnête.** Fournir un parcours intuitif « observer le mouvement » avec des échelles adaptées (secondes, jours, années, millénaires si le modèle le permet) et une explication du temps parcouru. Un mouvement réel est souvent visuellement indécelable à vitesse ×1 : par exemple, la Terre ne parcourt qu'environ **0,041° de son orbite en une heure** dans une approximation uniforme. Il faut pouvoir avancer/accélérer le temps **sans simuler une vitesse orbitale fictive**.
6. **Horloges et sécurité de mission.** **Deux opérations distinctes** : (a) accélérer le **temps de mission** — l'état de tous les astres et du vaisseau évolue de façon cohérente, avec les conséquences physiques éventuelles ; (b) faire une **prévisualisation temporelle d'observation** — on parcourt des dates/époques et leurs configurations calculées **sans déplacer le vaisseau, modifier son impulsion, son autopilote, son état orbital ou ses horloges enregistrées**. Les deux ne doivent jamais être confondues ; un mode accéléré ou une animation purement illustrative doit être signalé.
7. **Une seule réalité partagée.** Explorer, Carte cosmique et Observatoire doivent référencer une même date/époque physique lorsqu'ils affichent la simulation de mission. Consulter une archive ou effectuer une prévisualisation n'altère pas silencieusement cette date. Pour une observation depuis un vaisseau éloigné, distinguer la **position actuelle calculée** de la **position apparente décalée par la propagation de la lumière**, en cohérence avec relativité et cosmologie.
8. **Fluidité et maîtrise.** Pas d'animation universelle forcée au rendu à chaque image si une solution analytique à la date demandée, mise à jour avec granularité adaptée ou LOD suffit. Préserver les performances sur Intel Iris Xe, la possibilité de pause, les préférences d'accessibilité (mouvements réduits), et le contrôle du joueur. La contemplation et le mode Cinéma ne doivent pas changer les lois physiques.

#### Évaluation attendue avant lancement d'un lot

- **Inventaire vérifié** par catégorie : translation/orbite, rotation axiale, phase/illumination, animation de surface, luminosité variable, mouvements propres, cinématique galactique ; pour chaque catégorie, indiquer **source, époque, référentiel, domaine de validité, horloge motrice, visibilité dans Explorer/Carte/Observatoire et cas manquants**.
- **Démonstration courte**, sur le moteur réel et non une maquette : Soleil–Terre–Lune à deux dates, planète géante et satellite, comète, étoile à mouvement propre, puis une galaxie avec vitesse documentée ; montrer aussi un exemple où aucune évolution de morphologie n'est scientifiquement justifiée.
- **Tests d'invariants** : période orbitale et orientation attendues selon les références choisies, continuité des positions, pause/reprise, cohérence entre vues et sauvegarde, absence de changement du vaisseau lors d'une prévisualisation, non-régression des rendez-vous avec cible mobile et des effets de lumière retardée. Distinguer tests numériques, captures visuelles, et mesure de fluidité sur Iris Xe.
- **Proposition de séquencement** par Claude, chiffrée après audit : commencer par rendre perceptibles et compréhensibles les mouvements déjà calculés ; ajouter ensuite les phénomènes et interfaces manquants, sans promettre une simulation intégrale de l'évolution astrophysique.

**Critère de réussite produit :** le joueur peut regarder un système, changer d'échelle temporelle et **voir les astres évoluer de manière cohérente avec les connaissances et modèles déclarés**, sans que les éléments inconnus soient maquillés en certitudes. *Univers vivant* ne veut dire ni décor immobile, ni mouvement fabriqué pour faire joli.

---

#### Complément : activité observable lors de l'approche d'un astre (précision du propriétaire, 21/11/2026)

Le propriétaire précise l'exigence « Univers vivant » : **plus le vaisseau s'approche d'un objet, plus il doit pouvoir découvrir les phénomènes dynamiques propres à cet objet**, lorsqu'ils sont justifiés par les données ou un modèle déclaré. Ne pas limiter le mouvement à l'avancée d'un point sur la Carte ou à une texture animée sans relation avec la physique. Cela concerne aussi le vol libre, pas seulement les visites guidées.

**Attention au domaine de Kepler.** Les lois de Kepler (et leur formulation newtonienne à deux corps) sont adaptées à des orbites dominées par une masse centrale, parfois avec éléments osculateurs et perturbations ; elles ne résolvent ni la structure magnétique d'une étoile, ni les jets d'une comète, ni une galaxie autopotentielle à des milliers de milliards d'objets, ni la cosmologie relativiste. Choisir un modèle spécifique à chaque phénomène et afficher son degré de fidélité.

| Approche dans Odyssée | Mouvement et activité à rendre observables | Calculs et limites à examiner |
|---|---|---|
| Planète ou lune | Révolution autour du parent, rotation propre, éclairage changeant, phases, ombres et éclipses ; éventuellement nuages ou atmosphère en évolution | Éphémérides/Kepler, rotations IAU, géométrie de l'éclairage ; nuages et météorologie réels indisponibles pour beaucoup d'objets → illustrative ou absente |
| Comète (ex. 67P, Halley) | Translation réelle par rapport au vaisseau et au Soleil, noyau en rotation quand la période est connue, chevelure, jets de sublimation, queues de poussière et de plasma qui évoluent selon l'ensoleillement ; activité souvent accrue près du Soleil | Orbite JPL osculatrice + perturbations et dégazage à considérer ; débit, orientation des jets et géométrie du noyau pas nécessairement mesurés pour chaque comète. La **queue ionique** dépend du vent solaire et pointe globalement dans le sens antisolaire ; la **queue de poussière** suit des particules soumises à la gravité et à la pression radiative et peut être courbe. **Ne pas dessiner systématiquement la queue derrière la direction du mouvement.** |
| Étoile (Soleil comme référence) | Rotation, granulation/convection visible à courte distance, zones actives/taches, protubérances et éruptions éventuelles, corona et vent stellaire selon le type | Physique du plasma et des champs magnétiques ; utiliser observations solaires calibrées comme référence, et des procéduraux explicitement **illustratifs** pour les autres étoiles faute de données temporelles. Une étoile ne doit pas nécessairement produire de grandes éruptions permanentes |
| Pulsar / trou noir | Rotation et balayage des faisceaux pour pulsars, évolution d'un disque d'accrétion ou de jets *si présents*, orbites proches et effets relativistes | Relativité, MHD et transfert radiatif ; ne pas imposer disque, jets ni matière tombante à tout trou noir. L'horizon lui-même n'est pas une surface lumineuse animée |
| Galaxie ou amas | Mouvement d'étoiles et de gaz à l'intérieur des galaxies, rotation différentielle quand documentée, déplacements relatifs des galaxies, interactions et collisions sur de très longues durées ; évolution possible des bras ou du milieu interstellaire | Potentiel gravitationnel étendu, calculs N corps/hydrodynamiques ou données de simulations validées. **Ne pas faire tourner une image entière de galaxie comme un disque rigide**, et ne pas déformer les structures par une animation décorative. L'évolution morphologique n'est pas calculée par l'actuel modèle de translation des galaxies |
| Nébuleuse et gaz | Structures fines, écoulements et fronts de choc quand un modèle ou une observation le permet ; jets et régions d'ionisation selon les cas | Dynamique des fluides/plasma et évolution radiative ; beaucoup de changements ont des échelles très longues. Une animation accélérée doit être qualifiée de reconstruction/simulation illustrative selon les preuves |

**Comportement attendu en visite :**

1. **À grande distance**, le monde conserve des mouvements cohérents avec le temps de mission et les observations retardées, sans surcharge graphique.
2. **À l'approche**, augmenter progressivement le niveau de détail pertinent : noyau, rotation, structures et émissions quand le modèle le permet ; éviter le surgissement artificiel de détails non observés.
3. **À proximité**, montrer une activité locale distincte de la translation de l'objet. Pour le Soleil : une surface magnétique active ; pour une comète : coma et jets ; pour un système Terre–Lune : phases, orbites et rotation.
4. **À différentes vitesses temporelles**, rendre un mouvement lent perceptible en accélérant *l'échelle de temps explicitement affichée*. Offrir une prévisualisation non destructive lorsque le joueur veut examiner une évolution sans modifier sa mission ; indiquer les validités limitées des éphémérides et des modèles.
5. **En mode science**, permettre de distinguer « observation mesurée/rejouée », « résultat de simulation physique », « reconstruction » et « animation illustrative », avec la source, l'époque et les paramètres majeurs. Le rendu spectaculaire ne doit jamais masquer les incertitudes.

**Critères d'acceptation à soumettre au Head et à Codex :**
- Une **comète témoin** : survol en vol libre ; position et vitesse relatives correctes ; activité variant avec distance au Soleil, deux queues physiquement distinguées si elles sont affichées, rotation uniquement si les données ou hypothèses sont exposées ; captures à deux dates ou distances.
- Une **étoile témoin** : le Soleil, avec une activité locale crédible, cycles/échelles temporelles signalés ; une autre étoile montre les limites des données connues, sans fausse précision.
- Un **système témoin** : Soleil–Terre–Lune ou Jupiter–Io, dont les positions, la révolution, la rotation et l'éclairage évoluent ensemble avec le temps choisi.
- Une **galaxie témoin** : différencier translation cataloguée/modélisée et rotation interne ou déformation **non calculées** ; ne représenter ces dernières que sur une base scientifique indiquée.
- Pour chaque parcours : vérification de la continuité mission/horloges, sources et limites, comparaison avant/après sur Iris Xe et absence de régression physique.

**Ordre de travail proposé, non imposé :** inventorier ce que le rendu proche affiche vraiment aujourd'hui ; démontrer les mouvements **déjà calculés mais peu perceptibles**, puis prototyper une activité locale crédible sur la comète et le Soleil avant d'étendre aux galaxies/nébuleuses. Le Head conserve son autorité de conception et peut proposer une meilleure séquence. Aucun changement du code de production ni publication n'est autorisé par ce complément documentaire.

**Repères scientifiques à consulter :** [JPL — positions planétaires approchées](https://ssd.jpl.nasa.gov/planets/approx_pos.html) ; [NASA — fonctionnement d'une comète et de ses queues](https://science.nasa.gov/learn/basics-of-space-flight/chapter1-3/) ; [NASA — physique et activité solaire](https://science.nasa.gov/heliophysics/focus-areas/solar-science/).

---

#### Complément : objets compacts, voisinage des trous noirs et dynamique des grandes structures (précision du propriétaire, 21/11/2026)

**Vision produit supplémentaire.** Le réalisme de l'Univers vivant doit couvrir **quasars, pulsars, magnétars, étoiles à neutrons, trous noirs et objets soumis à leur gravité**, puis **galaxies, amas, superamas, Grand Attracteur et écoulements cosmiques**. En s'approchant d'une source compacte ou en explorant une région dense, le joueur doit percevoir les **phénomènes qu'elle produit dans son environnement**, et pas seulement le mouvement ou la texture de l'objet central. À très grande échelle, il doit pouvoir étudier une dynamique gravitationnelle reconstituée sans confondre visualisation d'un champ et évolution réelle suivie pendant des milliards d'années.

**Nature : exigence de conception et d'étude, à coordonner par Claude (Head) et Codex ; pas une demande de simulation intégrale immédiate, ni un GO de déploiement.** Le modèle scientifique, ses limites, le coût sur Iris Xe, la provenance et les exemples-test doivent être explicités avant implémentation.

##### 1. Objets compacts et noyaux actifs : que doit-on pouvoir observer ?

| Famille | Activités/effets à représenter à proximité | Discipline scientifique |
|---|---|---|
| **Pulsar** (sous-ensemble d'étoiles à neutrons) | Rotation, cônes d'émission balayant l'espace, pulsations détectées lorsque le faisceau intersecte l'observateur, éventuelle nébuleuse de vent de pulsar et dynamique du système binaire | Période et orientation si connues ; la visibilité est **directionnelle et dépend de la bande spectrale**. Une image en lumière visible ne doit pas forcément clignoter. Géométrie magnétique inconnue → reconstruction illustrative |
| **Magnétar** (autre classe d'étoiles à neutrons, certains pulsent) | Rotation, champ magnétique représenté en couche pédagogique, points chauds, rayonnement X/gamma et éruptions possibles ; environnement de particules | Ne pas afficher en permanence des sursauts spectaculaires. Chronologie réelle si observations disponibles ; sinon événements **simulés et signalés comme hypothétiques**. Les lignes de champ tracées sont une visualisation, pas des filaments lumineux vus à l'œil nu |
| **Étoile à neutrons non classée pulsar/magnétar** | Rotation si connue, émission thermique, accrétion et points chauds seulement si l'environnement (notamment compagnon) le justifie | Les familles se recoupent mais ne sont pas synonymes ; ne pas attribuer automatiquement les propriétés d'un magnétar à toute étoile à neutrons |
| **Quasar / noyau actif (AGN)** | Milieu entourant un trou noir supermassif **alimenté** : disque ou flot d'accrétion, plasma chaud, variations lumineuses selon la bande, poussière et vents, parfois jets relativistes et lobes étendus | Un quasar est un **noyau galactique actif**, pas un type distinct de trou noir. Jets non universels ; variabilité et dimensions imposent des échelles de temps propres. Ne pas rendre visible par défaut un rayonnement X/radio |
| **Trou noir dormant ou actif** | Lentille gravitationnelle sur le ciel de fond, ombre apparente si conditions de rendu et résolution adaptées, effets du champ gravitationnel sur les trajectoires ; **disque/jets seulement si accrétion observée ou modèle explicite** | L'**horizon des événements** est une frontière causale, **pas une surface matérielle qui rayonne ou tourne visiblement**. Distinguer horizon, sphère de photons, orbites stables/instables, ombre et éventuel disque d'accrétion |

**Attention :** les faisceaux, surfaces, lignes magnétiques, gaz, jets et luminosités montrés à l'écran appartiennent à des bandes d'observation distinctes ; leur rendu visible nécessite un instrument, une palette ou un codage indiquant ce qui serait réellement visible à l'œil.

##### 2. Le trou noir doit aussi influencer les objets autour de lui

C'est **un critère majeur formulé par le propriétaire**. Approcher une étoile, une planète, un disque de matière ou le vaisseau près d'un trou noir doit, lorsque le modèle le permet, révéler des effets sur **ces objets** :

1. **Orbites modifiées** : trajectoire liée, déviation, accélération au périastre, précession relativiste et éventuellement entraînement des référentiels pour un modèle de trou noir en rotation (Kerr). Le niveau Kepler/newtonien est une base pour les régions faibles ; **la seule ellipse de Kepler ne suffit pas dans le régime de champ fort**. Le cas observé de l'étoile **S2 autour de Sagittarius A\*** est une référence pour la précession de Schwarzschild, distincte d'un test de destruction.
2. **Effets de marée** : gradients de gravité, déformation, chauffage ou dislocation uniquement lorsque les propriétés du corps, la distance, la masse centrale et un modèle de résistance permettent de le conclure. Ne pas supposer qu'un corps est détruit dès qu'il franchit un seuil de proximité visuel ; la frontière de Roche et le rayon de disruption dépendent des hypothèses, et le comportement diffère fortement entre trous noirs stellaires et supermassifs.
3. **Rayonnement et matière environnante** : chauffage/ionisation/ablation ou interaction de vents et jets avec un corps voisin **si** un disque actif, une source de rayonnement et la géométrie/résistance pertinentes sont définis. Sinon, ne pas inventer d'érosion, de feu ou de dislocation.
4. **Optique et temps** : lentille du fond et des objets voisins, images multiples/arcs selon la résolution, décalage gravitationnel des fréquences, dilatation temporelle et délai de propagation du signal pour les observateurs concernés. La position du corps, son image reçue et son aspect apparent peuvent différer : **ne pas déplacer physiquement l'objet pour reproduire un simple effet optique**.
5. **Systèmes multiples** : interactions et transfert de matière dans un système binaire actif peuvent être étudiés progressivement ; éviter de promettre une hydrodynamique N-corps/GRMHD temps réel sur Iris Xe.

**Cas de validation prioritaires** :
- **Sagittarius A\* + S2** : comparer orbite/précession aux mesures de l'ESO ; distinguer observation mesurée, trajectoire calculée et échelle de temps accélérée. Le modèle doit aussi expliquer pourquoi S2 survit à son passage rapproché.
- **Trou noir dormant** (ex. Gaia BH1) : pas de disque lumineux inventé ; effets gravitationnels et optiques mesurables selon géométrie et précision.
- **Trou noir actif** (ex. M87\*) : image/rayonnement dépendant de la bande et de la géométrie du plasma, sans faire passer l'ombre EHT pour un horizon directement photographié.
- **Scénario extrême hypothétique, séparé des objets catalogués** : planète/étoile à plusieurs distances d'un trou noir, pour éprouver en laboratoire précession, marées et domaine de validité ; toute déformation matérielle visualisée doit être marquée « simulation / reconstruction ».

##### 3. Galaxies, amas, Grand Attracteur : voir les mouvements collectifs

- **Galaxie isolée / spirale** : rotation **différentielle** des étoiles et du gaz autour d'un potentiel galactique étendu, si courbe de rotation et modèle de distribution de masse disponibles. Les bras spiraux ne forment pas un disque rigide tournant d'un seul bloc ; morphologie évolutive et rencontre galactique nécessitent un modèle distinct.
- **Interactions et collisions** : orbites mutuelles, forces de marée, queues de marée, redistribution du gaz et formation stellaire possibles. Pour Andromède et la Voie lactée, ne pas imposer une collision inévitable à une date précise si les paramètres observationnels et incertitudes ne le justifient pas. Préférer des scénarios paramétrés validés ou des simulations scientifiques identifiées.
- **Amas de galaxies** : vitesses des membres et dispersion, gaz intra-amas chaud (surtout en rayons X), chocs et interaction de pression dynamique quand justifiée ; lentille gravitationnelle de la **masse collective** si un modèle de potentiel est disponible.
- **Superamas, Laniakea, Grand Attracteur, Shapley, toile cosmique** : visualiser les **vecteurs de vitesse particulière** et les **lignes de courant reconstruites** (ex. Cosmicflows-4), leurs bassins, incertitudes et référentiels. Le « Grand Attracteur » n'est **ni un astre unique ni un trou noir géant aspirant toutes les galaxies** : il renvoie à une région de surdensité/une structure du champ gravitationnel et cinématique, dont la définition et les contours dépendent des données et de la reconstruction.
- **Ne pas confondre champ à une époque et film de l'avenir** : les lignes de courant CF4 actuelles sont calculées dans un **champ reconstruit à l'époque de référence** ; elles ne constituent pas des trajectoires de galaxies vérifiées sur des milliards d'années. Pour faire évoluer les structures dans le temps, adopter un modèle cosmologique/N-corps identifié, avec domaine de validité et démonstration distincte.
- **Structures liées et expansion** : distinguer déplacements gravitationnels locaux, composante d'expansion cosmologique et évolution des objets liés. Le modèle `src/cosmic-motion.js` ne doit pas être extrapolé sans contrôle aux grandes époques ou aux transformations de morphologie.

##### 4. Ce qui est déjà présent dans le code — ne pas réinventer ni sur-vendre

Lecture de `main` au 21/11/2026 :
- `src/compact-objects.js` : catégories de flux d'accrétion **absent / disque mince / RIAF**, avec exemples et limites explicites ; une partie des phénomènes optiques est déjà dans les shaders de `src/black-hole.js` et `src/sky-optics.js`. **Ne prouve pas** une dynamique de toutes les étoiles et planètes du voisinage.
- `src/gravity-field.js` : intégration relativiste du vaisseau, avec métrique Schwarzschild exacte pour **une source isolée**, composition approximative multi-sources et régime quasi statique ; **pas** une solution GR complète N-corps et **pas** automatiquement une évolution du catalogue de corps voisins.
- `src/gravity.js` : expérience radiale Schwarzschild simplifiée, lecture d'effets d'horloge/marée ; distincte de la visualisation d'une rupture matérielle réelle.
- `src/cf4-basins.js` : bassins, vitesses particulières et lignes de courant **reconstruits** de CF4 ; le fichier précise déjà que ces lignes ne sont pas des trajectoires temporelles sur des milliards d'années.
- `src/renderer.js` : certaines représentations de pulsars et jets existent, mais leurs mouvements et leur lien aux propriétés physiques de chaque objet doivent être **audités visuellement et numériquement**. L'absence d'un modèle de magnétar ou de quasar actif ne doit pas être cachée derrière un effet générique.

##### 5. Définition d'acceptation et ordre de preuve

**Mandat d'audit puis de conception**, à proposer par le Head et Codex :
1. Établir une **matrice objet × phénomène × moteur × bande spectrale × horloge × niveau de preuve** : pulsar, magnétar, étoile à neutrons, quasar, trou noir dormant/actif, compagnon de trou noir, étoile/planète voisine, galaxie, amas, bassin/attracteur. Pour chaque effet : *mesuré / calculé / reconstruit / illustratif / absent*, et en préciser la source, la période/échelle de temps et la présence dans la version publique vs essai.
2. Livrer un **petit démonstrateur scientifique avant une refonte générale**, avec trois volets : (a) pulsar et émission anisotrope à période vérifiable ; (b) Sgr A\*–S2 (orbite et précession) et un scénario séparé de marées près d'un trou noir ; (c) carte CF4 avec champ vectoriel **à époque fixe**, et *aucune* fausse migration temporelle des galaxies.
3. Ajouter ensuite un scénario quasar/AGN et un magnétar, puis l'animation collective des galaxies/amas **seulement** si les données ou équations sont suffisantes. Pour l'AGN, l'accrétion, la variabilité, les jets et les fréquences doivent rester conditionnels, jamais des décorations universelles.
4. Tests : continuité physique des positions et des horloges, trajectoires et précession de référence, conservation lorsque le modèle l'exige, seuils de marées avec hypothèses, rayons et géométrie d'ombre clairement distingués, pulsations selon l'orientation, échelle temporelle et filtres spectraux, performance p50/p95 et mémoire sur **Iris Xe réel**.
5. **Intégration progressive, réversible, sur session d'essai**, sans toucher aux missions personnelles ni à la publication publique, tant que les scénarios, sources et performances ne sont pas validés.

**Question de conception à trancher avec le propriétaire uniquement quand les options sont démontrées :** quelle part de l'activité astrophysique doit être un modèle causal réellement calculé, et quelle part peut être une **visualisation pédagogique explicitement illustrative** lorsqu'aucune observation temporelle ne permet une reconstitution unique ?

**Références de départ** :
- [NASA — anatomie et optique des trous noirs](https://science.nasa.gov/universe/black-holes/anatomy/), [NASA — effets des marées près d'un trou noir](https://science.nasa.gov/universe/what-happens-when-something-gets-too-close-to-a-black-hole/).
- [ESO — mesure de la précession de S2](https://eso.org/public/france/news/eso2006/).
- [NASA — pulsars](https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-pulsars/), [NASA — étoiles à neutrons et magnétars](https://science.nasa.gov/universe/stars/types/).
- [NASA Webb — noyaux actifs et quasars](https://science.nasa.gov/mission/webb/science-overview/science-explainers/what-are-active-galactic-nuclei/).
- [Cosmicflows-4 — champs de densité et de vitesse](https://doi.org/10.1051/0004-6361/202245331) ; [Nature Astronomy — bassins d'attraction](https://www.nature.com/articles/s41550-024-02370-0).

---

### Critère final de réussite

Je veux pouvoir quitter la Terre dans Odyssée-01, naviguer entre les galaxies, m'approcher de M87, explorer l'amas de la Vierge, prendre de la hauteur sur la toile cosmique et distinguer à chaque instant :

**ce que l'Univers fait réellement, ce que les données nous permettent de reconstruire, et ce que notre technologie fictive nous autorise à imaginer.**

L'objectif n'est pas de produire un jeu spatial spectaculaire mais scientifiquement trompeur.

**L'objectif est de construire un véritable laboratoire pédagogique d'exploration cosmique, visuellement immersif, physiquement rigoureux dans ses domaines validés et honnête sur toutes ses limites.**