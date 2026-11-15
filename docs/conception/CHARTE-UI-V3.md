> Charte transmise par Abdoulaye le 15/11/2026 (texte rédigé par ChatGPT à sa demande). Conservée telle quelle comme référence de conception ; les liens d'images de la version d'origine ont été retirés. Statut : direction retenue pour la V3, à décliner en maquettes avant implémentation.

Pour Odyssée, je viserais une interface digne d'un **logiciel d'astronomie scientifique et d'un centre de contrôle de mission spatiale**, pas simplement un jeu de simulation.
J'ai recherché les véritables références utilisées dans les domaines de l'astronomie, de la visualisation scientifique et des planétariums. J'ai aussi examiné le code de l'interface actuelle d'Odyssée.
**Mon choix : prendre OpenSpace comme référence principale, Gaia Sky comme référence de navigation 3D, et ESASky/Aladin comme référence pour les observations scientifiques.**
## **1. Les logiciels professionnels à étudier**
OpenSpace
Référence principale
Développé pour l'astrovisualisation, les musées et les planétariums, avec des données de missions et d'observatoires. Navigation continue entre différentes échelles de l'Univers.
[Site officiel](https://www.openspaceproject.com/?utm_source=chatgpt.com) · [Documentation](https://docs.openspaceproject.com/latest/?utm_source=chatgpt.com)
OpenSpace documentation (latest)+1
Gaia Sky
Le plus pertinent pour notre navigation stellaire : catalogues Gaia, objets réels positionnés en 3D, déplacements, référentiels, trajectoires et gestion des jeux de données. Sa version 3.9 a notamment introduit un rendu volumétrique de la Voie lactée.
[Site et téléchargement](https://gaiasky.space/?utm_source=chatgpt.com) · [Galerie](https://gaiasky.space/media/?utm_source=chatgpt.com)
gaiasky.space
ESASky
La référence pour examiner de véritables données astronomiques : observations dans plusieurs longueurs d'onde, couvertures de missions, images et catalogues.
[Explorer ESASky](https://sky.esa.int/?utm_source=chatgpt.com)
aladin.cds.unistra.fr
NASA Eyes
Excellent pour l'expérience utilisateur : sélectionner une mission, voyager vers un objet, manipuler le temps et comprendre rapidement ce que l'on observe.
[Essayer NASA Eyes](https://science.nasa.gov/eyes/?utm_source=chatgpt.com)
NASA Science
Deux autres outils méritent d'être étudiés par les développeurs : Aladin Desktop / Aladin Lite, particulièrement puissant pour superposer des catalogues SIMBAD/VizieR, des images et des relevés, et WorldWide Telescope, qui propose des visites scientifiques et un moteur WebGL réutilisable.
virtualadin.cds.unistra.fr+2
Les captures ci-dessus proviennent des logiciels et de leurs documentations : ce ne sont pas des images créées artificiellement.
## **2. Ce que je changerais immédiatement dans Odyssée**
En examinant [`cockpit.html`](https://github.com/Tommy1er/odyssee/blob/main/public/cockpit.html?utm_source=chatgpt.com) et [`cockpit.css`](https://github.com/Tommy1er/odyssee/blob/main/public/cockpit.css?utm_source=chatgpt.com), je constate un vrai problème de hiérarchie visuelle.
L'interface est organisée autour de trois colonnes, avec des filtres, des commandes et une télémétrie permanents. Certains textes descendent à **7–10 pixels**, ce qui est beaucoup trop petit pour un environnement utilisé pendant de longues explorations.
Le système est fonctionnel, mais l'expérience ressemble davantage à un tableau de bord de développeur qu'à un observatoire spatial.
Je retiendrais **trois espaces de travail complémentaires**, partageant la même sélection et le même état de mission :
ODYSSÉE
Explorer
Observatoire
Carte cosmique
NAVIGATION
Rechercher un objet
M87 — galaxie elliptique
Distance · 54 M a.l.
Engager le trajet
Champ immersif — objet sélectionné
MISSION
0,9900 c
Vitesse
γ 7,09
Temps propre
Distance restante
Référentiel actif
 Simulation
Époque · Vitesse du temps · Vision
SCIENCE
Schéma de principe, non une capture de la version actuelle. L'objectif est de préserver une grande surface pour l'Univers, avec les instruments essentiels à portée de vue et les paramètres avancés repliables.
**Explorer** serait le cockpit immersif, avec la trajectoire, la vitesse et les commandes essentielles.
**Observatoire** serait un environnement d'examen scientifique : image réelle, comparaison Hubble/JWST, spectres, catalogue, coordonnées et incertitudes.
**Carte cosmique** serait notre vue d'ensemble : navigation d'échelle continue, structure des galaxies, positions relatives, distances, plans de référence et itinéraires.
L'objectif n'est pas trois applications différentes : **un seul Univers, trois façons de l'examiner.**
## **3. Charte UI/UX officielle proposée — Odyssée V3**
Voici le document que je transmettrais à Claude, Codex et à un designer Figma.
# ODYSSÉE — Charte UI/UX V3
### Scientific Exploration Interface · Design System 1.0
**Vision produit**
Odyssée doit réunir la rigueur d'un logiciel scientifique, l'immersion d'un planétarium professionnel et la clarté d'un centre de contrôle spatial.
L'utilisateur n'est ni un spectateur passif ni un astrophysicien obligé de configurer cinquante paramètres avant de commencer. Il est un explorateur qui doit pouvoir observer, naviguer et comprendre.
**Références de conception :** OpenSpace (architecture et immersion), Gaia Sky (navigation et catalogues), ESASky/Aladin (observations scientifiques), NASA Eyes (simplicité des interactions).
## I. Architecture de l'expérience
| Espace               | Fonction principale                                    | Affichage                                                     |
| -------------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| Explorer             | Voyager réellement dans le modèle physique sélectionné | Immersion 3D avec HUD minimal                                 |
| Observatoire         | Examiner les données astronomiques                     | Images et catalogues, comparaison de bandes, outils de mesure |
| Carte cosmique       | Comprendre où l'on se trouve                           | Carte 3D multi-échelle, trajectoires, structures              |
| Laboratoire physique | Étudier les phénomènes et les hypothèses               | Panneau avancé accessible depuis les trois espaces            |
Les trois espaces principaux partagent leur objet sélectionné, leur contexte spatial et, lorsque cela est physiquement défini, leur époque. La caméra libre ne doit jamais être confondue avec le déplacement du vaisseau.
## II. Identité visuelle
**Direction artistique :** observatoire scientifique contemporain, sobre, précis, immersif. Inspiration instrumentation spatiale plutôt que science-fiction décorative.
| Élément           | Règle de conception             |
| ----------------- | ------------------------------- |
| Fond principal    | `#070D16` — noir bleuté         |
| Panneaux          | `#111F2C` — bleu ardoise        |
| Texte principal   | `#EDF3F7` — blanc froid         |
| Texte secondaire  | `#A7BBCB` — bleu gris clair     |
| Action principale | `#8EE2CC` — menthe scientifique |
| Mesure/sélection  | `#76B9F5` — bleu observation    |
| Attention réelle  | `#F0B56B` — ambre               |
| Erreur            | `#EC807D` — rouge doux          |
| Modèle spéculatif | `#BBA5E7` — violet              |
Les couleurs d'interface ne doivent pas être confondues avec des couleurs astrophysiques. Les cartes scientifiques doivent disposer de leurs propres légendes.
Typographie : Inter ou police système équivalente pour l'interface, police monospace à chiffres tabulaires pour les coordonnées et la télémétrie.
Texte courant recommandé : 14–16 px. Libellés secondaires : 12–13 px minimum. Valeurs primaires : 24–36 px. Éliminer les textes de 7–9 px.
Respecter au minimum les critères WCAG AA pour le contraste et la navigation clavier.
## III. Cockpit immersif
Le ciel occupe idéalement 70–80 % de la surface visuelle en mode Explorer, lorsque la résolution le permet.
La navigation est accessible depuis un volet gauche repliable. La télémétrie essentielle reste dans un panneau droit compact ou une bande HUD.
Afficher constamment uniquement : destination, vitesse, état du moteur, distance restante, temps propre, temps de référence et état de la navigation.
Les détails gamma, Doppler, énergie, coordonnées, dangers, accélération et paramètres de rendu restent accessibles instantanément sans encombrer le champ visuel.
L'action « Engager le trajet » doit être clairement distinguée de « Observer la cible », « Centrer la caméra » et « Se téléporter (fiction) ».
Le temps de simulation doit disposer de contrôles explicites : pause, reprise, échelle du temps, époque et remise à zéro.
## IV. Observatoire scientifique
Créer une fiche d'objet avec une présentation à deux niveaux.
**Vue découverte :** nom, nature, distance, taille, température ou masse lorsque connues, anecdote astronomique et proposition de destination.
**Vue scientifique :** coordonnées, valeurs mesurées, incertitudes, méthodes de détermination, photométrie, spectres, références, observations historiques et limites des modèles.
Prévoir une comparaison synchronisée entre le visible, l'infrarouge, la radio, les rayons X et les composites scientifiques, selon la disponibilité effective des données.
Permettre d'ouvrir une observation réelle dans un visualiseur astronomique compatible HiPS/FITS, idéalement avec Aladin Lite.
Ne jamais prétendre disposer d'une photographie d'un objet qui n'a pas été directement résolu.
## V. Carte cosmique
Introduire une navigation continue d'échelle :
Système solaire → voisinage stellaire → Voie lactée → Groupe local → amas → superamas et bassins de mouvements → toile cosmique → Univers observable.
Afficher une échelle graphique physique, les unités, la position du vaisseau et l'origine du référentiel.
Les plans galactique et supergalactique, les distances et les couches de données doivent être activables indépendamment.
Ne pas transformer les frontières statistiques des grands ensembles en surfaces matérielles.
## VI. Confiance scientifique
Toute scène affiche un statut consultable : **Observation réelle**, **Modèle calculé**, **Reconstitution** ou **Fiction**.
La provenance doit être disponible sans quitter l'expérience.
Un visuel en fausses couleurs doit le signaler, tout comme une intensité amplifiée, une étoile synthétique, une position extrapolée ou un objet dont la morphologie n'est pas connue.
La cohérence scientifique est prioritaire sur le spectaculaire.
## VII. Interactions et accessibilité
Conserver les raccourcis clavier de navigation, avec une carte de commandes consultable.
Prévoir une recherche globale tolérant les variantes de noms et identifiants astronomiques.
Permettre des favoris et un journal de voyage.
Les commandes doivent avoir un retour d'état clair ; aucune action majeure ne doit être ambiguë.
Sur mobile, privilégier la vue immersive et des panneaux en tiroirs. Zones tactiles d'au moins 44 × 44 px, avec gestuelle documentée.
Prévoir des versions de densité d'information adaptées aux débutants et aux utilisateurs avancés, sans modifier les données scientifiques.
## VIII. Exigences de conception et validation
Avant de modifier l'interface de production, réaliser dans Figma les écrans Explorer, Observatoire et Carte cosmique, en version bureau et mobile.
Construire une bibliothèque cohérente de composants : barre de navigation, sélecteur de mode, recherche, fiche d'objet, instrument, infobulle, contrôle temporel, fenêtre d'observation et journal.
Tester les prototypes sur les parcours réels Terre → Proxima, M16 → Piliers, M31 → M87 et carte cosmique → cockpit.
Mesurer la lisibilité, le nombre d'actions nécessaires pour sélectionner une cible, les erreurs de manipulation, l'occupation du champ visuel et la fluidité des transitions.
Préserver les fonctionnalités existantes pendant toute la refonte. Aucun effet esthétique ne doit provoquer une régression scientifique, une perte d'accessibilité ou une dégradation non maîtrisée des performances.
**Critère de réussite final :**
Un nouvel utilisateur doit pouvoir trouver M87, comprendre ce qu'est cette galaxie, l'observer dans de vraies données astronomiques, engager un voyage hypothétique vers elle, suivre sa trajectoire, puis revenir à une carte cosmique sans perdre le fil de son exploration.
Odyssée doit donner envie de découvrir l'Univers, mais surtout permettre de comprendre ce que l'on regarde.
## **4. Ma recommandation pour l'équipe**
Je ne demanderais **pas encore à Codex de refondre directement le CSS**. Nous avons déjà vu combien le projet peut devenir complexe lorsque l'interface, le rendu WebGL et la physique évoluent simultanément.
Je ferais d'abord produire une maquette Figma complète, validée écran par écran, puis seulement ensuite démarrer l'implémentation. Le plus intéressant serait également d'étudier une intégration d'[Aladin Lite](https://cds-astro.github.io/aladin-lite/?utm_source=chatgpt.com) dans le mode Observatoire, plutôt que recréer entièrement les fonctions d'un atlas scientifique.
Enfin, il y a une référence esthétique complémentaire : SpaceEngine. Son approche mélange des objets astronomiques connus et des environnements générés procéduralement. C'est une inspiration intéressante pour les transitions visuelles et les paysages, **mais pas notre référence pour distinguer les données observées des mondes inventés**.
SpaceEngine
**Le modèle final que je retiens pour Odyssée : 50 % OpenSpace, 25 % Gaia Sky, 15 % ESASky/Aladin et 10 % NASA Eyes.** Ce ne sont pas des proportions techniques, mais une direction de design.
Nous devons construire une application dans laquelle on peut s'émerveiller devant un pulsar, consulter sa période de rotation mesurée, observer les images de vrais télescopes, puis remonter dans Odyssée-01 et partir explorer la prochaine galaxie — sans quitter un environnement visuel cohérent.
