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

### Critère final de réussite

Je veux pouvoir quitter la Terre dans Odyssée-01, naviguer entre les galaxies, m'approcher de M87, explorer l'amas de la Vierge, prendre de la hauteur sur la toile cosmique et distinguer à chaque instant :

**ce que l'Univers fait réellement, ce que les données nous permettent de reconstruire, et ce que notre technologie fictive nous autorise à imaginer.**

L'objectif n'est pas de produire un jeu spatial spectaculaire mais scientifiquement trompeur.

**L'objectif est de construire un véritable laboratoire pédagogique d'exploration cosmique, visuellement immersif, physiquement rigoureux dans ses domaines validés et honnête sur toutes ses limites.**