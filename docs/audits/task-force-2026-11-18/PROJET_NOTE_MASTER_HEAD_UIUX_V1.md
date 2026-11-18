# ODYSSÉE — NOTE MASTER DE CONSOLIDATION POUR LE HEAD OF UI/UX

**Version :** projet V1, soumis à examen du propriétaire — 18 novembre 2026  
**Destinataire pressenti :** Claude, Head of UI/UX d'Odyssée, avec Codex pour l'ingénierie et la validation  
**Sources :** sept audits indépendants (DeepSeek, Manus, Kimi, Qwen, Mistral, GLM 5.2, Astra 6.2), corrections et prototypes Qwen, synthèse corrigée GLM, maquettes Claude V3/V3.1, arbitrages du propriétaire, code et relais du dépôt  
**Nature :** dossier de décision et de conception ; **pas un ordre d'exécution**, pas une autorisation de refonte, de publication ou de changement de visibilité.

> **Au Head.** Nous te transmettons les résultats d'une task force de sept relecteurs externes. Tu n'as pas à relire leurs rapports pour comprendre ce dossier : les décisions, les observations étayées, les désaccords, les angles morts et les ressources utiles sont rassemblés ici. Tu gardes pleine liberté de critiquer les diagnostics, de récuser une solution mal conçue et d'en proposer une meilleure, en explicitant ses conséquences pour l'ambition du propriétaire. Les arbitrages de produit sont ceux du propriétaire ; les choix d'architecture et de conception ne sont pas préemptés par la task force. Merci de traiter cette note comme une **revue contradictoire**, non comme une liste de tickets à exécuter.

## 1. Vision : ce que le propriétaire veut construire

Odyssée est un **open world cosmique scientifique**. L'analogie choisie par le propriétaire est GTA pour la liberté : l'Univers existe indépendamment des missions ; on peut librement s'y déplacer, observer, apprendre, contempler, piloter et décider de ses destinations. Les visites guidées et missions sont des **possibilités facultatives**, sans progression obligatoire, sans parcours prescrit à l'ouverture.

L'objectif est une expérience capable de susciter l'émerveillement par un Univers visuellement dominant et scientifiquement crédible : ni logiciel de saisie entourant un petit rendu 3D, ni spectacle de science-fiction qui déguise les reconstructions en mesures. Un seul monde persistant doit offrir **trois formes d'immersion et de compréhension** :

- **Explorer** : expérience incarnée de voyage, pilotage, navigation, caméra embarquée et vue extérieure du vaisseau.
- **Observatoire** : expérience d'enquête scientifique, des premières informations accessibles sans quitter le ciel jusqu'à un espace analytique spécialisé.
- **Carte cosmique** : expérience libre des distances, des échelles, des référentiels et des grandes structures, de l'environnement planétaire aux structures extragalactiques couvertes par le jeu de données.

Le **laboratoire de physique** est transversal et conserve sa distinction des régimes validés, simplifiés et fictifs.

**L'important n'est pas d'obtenir trois onglets visuellement identiques. Il faut trois expériences complémentaires, réellement immersives, unies par le même état du vaisseau et les mêmes objets référencés.**

## 2. Gouvernance, droits de regard et limites du présent mandat

1. **Propriétaire (Product Owner)** : ambition, expérience visée, liberté du joueur, compromis stratégiques, gouvernance et approbation des engagements.
2. **Claude (Head of UI/UX)** : responsabilité de la direction de conception, de la cohérence des parcours et de la proposition d'architecture d'interface. Droit explicite de désaccord motivé, de correction, de proposition alternative et de rejet de maquettes ou de seuils non fondés.
3. **Codex** : ingénierie, instrumentation, tests, validation, publication sur instruction, coordination avec Claude. Les relais séquentiels existants restent applicables.
4. **Task force** : preuves, constats, idées et controverses ; ni comité de vote, ni hiérarchie prescriptive des IA.
5. **Rapporteur** : rassemble, distingue, vérifie et transmet ; ne tranche pas seul les choix de produit.

Le dépôt commun suit les règles de [COLLABORATION.md](../../../COLLABORATION.md) : même branche principale et interventions séquentielles à la date de rédaction ; **aucun passage imposé aux branches/PR**, aucune migration d'hébergement. GitHub et ChatGPT Sites sont distincts. La présence de cette note dans GitHub n'autorise ni modification de l'application, ni déploiement, ni changement d'accès.

**Statut des affirmations dans cette note** :
- **D** : décision explicite du propriétaire, contraignante sur le résultat.
- **V** : fait revérifié dans le dépôt ou un relais daté ; mentionner commit/environnement.
- **A** : constat rapporté par un auditeur ; utile, mais dépend de son périmètre.
- **P** : proposition à débattre, et non décision.

## 3. Les 16 arbitrages du propriétaire — contraignants sur l'ambition, non sur l'implémentation

| N° | Décision (D) | Conséquence attendue |
| --- | --- | --- |
| 1 | **Direction hybride** : réalisme scientifique + immersion | Les représentations séduisantes restent honnêtes sur les données et hypothèses. |
| 2 | **Par défaut : vision immersive scientifiquement contrainte** | Vision naturelle, instrumentale, reconstructions et traitement de l'image explicitement distingués ; ne pas confondre avec les états d'affichage de l'UI. |
| 3 | **Open world libre**, missions et visites facultatives | Pas de verrouillage des lieux ni de tutoriel obligatoire pour commencer à explorer. |
| 4 | **Déplacements hybrides** | Trajets physiquement simulés avec horloges et accélération de lecture ; passages instantanés facultatifs explicitement fictifs, non comptés comme propulsion. |
| 5 | **Pilotage manuel et assisté équivalents** | Passer de l'un à l'autre sans effacer position, impulsion, vitesse ni horloges ; pas de remise à zéro artificielle. |
| 6 | **Exploration planétaire progressive et bornée par les connaissances** | Lune/Mars et corps documentés du Système solaire à considérer à long terme ; pas de surfaces d'exoplanètes inventées présentées comme observées. Atterrissages et marche au sol : perspectives de long terme, pas périmètre V3.1. |
| 7 | **Entrée rapide avec seuil minimal exploitable** | Le ciel et les commandes nécessaires deviennent utilisables avant la totalité des ressources secondaires ; disponibilité et limites rendues compréhensibles. |
| 8 | **Continuité de trois espaces spécialisés**, chacun immersif et pédagogique | Même mission/cible/temps ; interfaces et instruments spécialisés, sans imposer une SPA. |
| 9 | **Temps de simulation partagé, contrôle explicite partout** | Pause/reprise/facteur de lecture accessibles dans les trois espaces ; la consultation d'archives ne déplace pas temporellement le vaisseau. |
| 10 | **Assistance temporelle intelligente et désactivable** | Ralentissement ou pause autorisés pour les événements critiques, avis facultatifs pour les événements intéressants ; jamais d'altération artificielle de la vitesse physique. |
| 11 | **Observatoire évolutif** | Fiche contextuelle légère puis environnement scientifique riche ; continuité avec Explorer. |
| 12 | **Carte cosmique libre, multi-échelles** | Caméra exploratoire indépendante de la position du vaisseau ; perspective extérieure du vaisseau préservée dans Explorer. |
| 13 | **Préparation d'un trajet depuis la Carte** | Choisir une cible et préparer sans bouger le vaisseau ; engagement exige confirmation explicite. |
| 14 | **Qualité graphique adaptative** | Profils Performance/Équilibré/Qualité et ajustements contrôlés ; aucune modification des modèles physiques selon profil. |
| 15 | **HUD contextuel, mode Cinéma épuré** | Les commandes restent récupérables ; sur critique, réouverture temporaire des informations nécessaires ; sur événement intéressant, notification non intrusive. |
| 16 | **Open source à long terme**, ouverture communautaire | Orientation vers une application restant ouverte et des bibliothèques scientifiques largement réutilisables ; **ni AGPL ni Apache ni autre licence adoptée**. Étude technique et juridique préalable. |

Ces décisions ne justifient pas de créer immédiatement un système d'atterrissage, de développer toutes les missions ou d'intégrer tous les catalogues. Elles définissent les frontières produit et l'identité à préserver pendant le phasage.

## 4. Baseline technique et état réellement vérifié

### 4.1. Références de version

- La plupart des audits datés du 18/11 portent sur **V53, commit cb068cb854a41d81b1a8c9249d6fbc4f77c18d85** (A).
- Des maquettes de **conception V3.1** ont été introduites au commit **c260973** ; elles ne sont pas reliées au moteur (V).
- Le correctif « Mission ▾ » en écran court a été intégré en **b2bc90e**, avec validations CI ciblées réussies ; la version 54 a fait l'objet d'une vérification matérielle ultérieure (V).
- Au moment de la préparation de cette note, le plus récent relais examiné est **7caed18711f26193baa2cb22922fa40f00e087b5**, « version 54 sur Iris Xe » (V). Avant toute suite, le Head devra relire le dernier main et vérifier si une nouvelle évolution l'a remplacé.
- **Ne pas assimiler un commit GitHub, un résultat CI et la version publiée sur ChatGPT Sites.** Ce sont trois états distincts.

### 4.2. Vérification V54 qui corrige les conclusions de plusieurs audits

Le [relais Claude de vérification V54](../../RELAIS-CLAUDE-2026-11-18-VERIF-V54-DEMARRAGE.md) décrit **une seule session** sur le Chrome Windows Intel Iris Xe du propriétaire, à **1280 × 585 CSS, DPR 1,5**. La machine était chargée : les durées sont indicatives, pas une distribution statistique.

- Menu Mission sauvegardée : ouvert automatiquement, quatre choix accessibles, **barre à 64 px sur une seule ligne**, ciel **780 × 471 px**, sans défilement ; sortie par Échap et restitution du focus vérifiées. **Ne pas rouvrir comme anomalie non corrigée.**
- Démarrage : **environ 19,7 s jusqu'à la fin de la préparation et à la désactivation de l'état inerte** ; les valeurs précédentes de 37 s ou 76 s ne sont pas la mesure de cette session.
- Chronologie : page/JS **1,83 s** ; six JSON **1,81 → 3,02 s de transfert** ; étape chargement/décodage **1,81 → 4,80 s** ; environ **2,3 s de préparation CPU non tracée** ; moteur **7,11 → 9,18 s** ; préparation GPU **9,18 → 19,67 s**.
- Les JSON représentaient **4,6 Mo transférés comprimés pour environ 26,1 Mo décodés**. **Le réseau, mesuré à environ 1,2 s, n'est pas le principal goulot sur cette session** ; la préparation GPU constitue une piste plus prometteuse.
- Un seul canvas dans le document a été constaté pendant ce contrôle ; cela **ne prouve pas l'absence absolue d'un éventuel render target ou canvas hors DOM**. L'allégation de « deux renderers/contexte WebGL simultanés cockpit + vaisseau » faite par un auditeur reste non établie.

### 4.3. Points de code encore ouverts (V au niveau code, pas nécessairement reproduits en session matérielle)

**Recherche / sélection (Astra).** Dans la logique actuelle de recherche du cockpit, une requête textuelle non vide utilise une correspondance par sous-chaîne et présente les 100 premiers éléments sans rang de pertinence. L'exemple « Mars » pouvant céder la première place à « Marsic » illustre une vraie faiblesse de découverte. Examiner le classement exact/alias/préfixe/partiel/hôte, l'affichage du type d'objet et les tests d'homonymie. Une recherche validée sur un petit corpus ne suffit pas à prouver la parité de tous les objets.

**Carte cosmique / classification d'erreurs (Qwen).** Le gestionnaire global d'erreurs du code de la carte invoque le diagnostic WebGL pour des erreurs JavaScript générales. Une notification ResizeObserver potentiellement bénigne pourrait donc être présentée comme un défaut bloquant sans perte du contexte. Reproduire, classer, rendre dismissibles les avertissements non fatals, préserver une vraie alerte lors de perte de contexte. Ne pas prétendre que la boucle de rendu s'arrête si cela n'a pas été observé.

**Couplage cockpit.** Un gros contrôleur d'environ **112 Ko source**, extrêmement compact, orchestre interface, sélection, mission et panneaux ; les bundles public minifiés sont des artefacts générés, non des sources indépendantes. Examiner une **extraction progressive et testable**, sans refactor destructif « pour faire propre ».

**Version et gouvernance.** Aucun fichier LICENSE général de code au dépôt n'était présent dans les audits ; les licences et attributions de données sont distinctes. La documentation README contient des éléments historiques. Recommander une mise à jour du résumé de version, un marqueur de version servie et une politique de provenance ; ne pas choisir une licence sans avis du propriétaire.

**Sans WebGL.** Astra a constaté un environnement navigateur distant où GL_RENDERER est indisponible. Ce n'est pas une panne générale prouvée d'Odyssée. Étudier une alternative **HTML de consultation de données scientifiques**, avec commandes de vol indisponibles clairement neutralisées.

## 5. Synthèse équitable des sept audits et des suites

**DeepSeek** : intuition d'une expérience canvas-first et d'instruments discrets ; plusieurs constats d'inaccessibilité GitHub/Sites dépendaient de son environnement et ont été infirmés. Garder l'idée, pas la conclusion que le projet serait non publié.

**Manus 2.0 Lite** : séparation des espaces Explorer / Observatoire / Carte, état partagé, fiches à deux profondeurs, provenance par grandeur, migration incrémentale, priorité à l'Iris Xe. Ne pas confondre ses propositions avec des fonctionnalités livrées.

**Kimi 2** : attention particulière au temps de démarrage, au poids des catalogues, à la persistance mission/contexte, aux contrats de données, aux licences et à la version servie. Ses suggestions de migration globale de type SPA et ses constats sur les budgets GPU doivent être vérifiés ; un budget adaptatif existe déjà.

**Qwen 4 + droits de réponse V1/V2** : métrique d'**occlusion effective du ciel**, différenciation des états Immersion / Travail / Cinéma, gestion des tiroirs, coûts GPU du plein écran, import Aladin à la demande, clarification de la fausse erreur ResizeObserver. Ses deux HTML sont des **prototypes Canvas2D illustratifs**, pas du code 3D Odyssée ; la V2 garde notamment des réserves de mesure/ergonomie mobile. Les chiffres 75 % de ciel en Immersion et 95 % en Cinéma sont des **objectifs proposés**, pas des mesures de conformité validées du produit.

**Mistral** : inventaire solide des couches, des sources, des tests et du risque de régression CSS ; intérêt des jetons typographiques, du versionnement et du découpage progressif. Corriger l'affirmation non prouvée de deux contextes GPU simultanés cockpit + vue extérieure ; distinguer les espaces déjà développés des espaces seulement maquettés.

**GLM 5.2 + synthèse corrigée** : schéma cible en couches, prudence sur les limites du shader haut gamma, séparation des modèles physiques, provenance des données, backlog structuré. Son échec CI « ouvert » et sa mesure de démarrage de 37 s doivent être datés ; les relais postérieurs ont modifié la photographie du projet. Son argument « immersion = seulement DOM, pas GPU » est faux si la surface et le nombre de pixels rendus augmentent.

**Astra 6.2** : meilleur angle complémentaire de **parcours concret** — chercher, cadrer, observer, préparer, engager ; défaut de pertinence « Mars », cadrage commun entre la liste/la carte/la fiche, alternative sans WebGL, distinction des événements et des contrôles, protocole d'essais utilisateurs. Rappel utile : ne pas confondre caméra, observateur radiatif et véhicule.

**Aucun classement des modèles ne fait autorité.** Une critique documentée minoritaire peut être déterminante. La [matrice de consolidation](./MATRICE_CONSOLIDATION.xlsx) et le [dashboard](./00_TABLEAU_DE_BORD.html) conservent **54 constats regroupés**, **16 divergences** et **33 scénarios d'épreuve proposés** ; ce ne sont ni 54 bugs confirmés ni 33 tests déjà exécutés.

## 6. Direction artistique et interaction : ce qui est acté, ce qui reste créatif

### 6.1. Trois dimensions indépendantes à ne pas mélanger

1. **État d'interface** : Immersion / Travail / Cinéma — instrumentations et encombrement du ciel.
2. **Nature de la représentation** : vision proche de la perception humaine / observation instrumentale / reconstruction immersive ; chacune doit indiquer sa méthode et ses limites.
3. **Régime physique** : propulsion locale SR, modèles gravitationnels appropriés, FLRW, fiction assumée ; le changement d'interface ne doit pas inventer un couplage physique.

**Apparence par défaut décidée : immersion scientifiquement contrainte.** Cela autorise une exposition, un cadrage ou des couches de lisibilité bien expliqués, mais pas de morphologies imaginées présentées comme des images observées ni de fausses continuités de temps ou de référentiel.

### 6.2. Explorer

- Univers visuellement dominant ; pas de trois colonnes permanentes, panneaux contextuels, largeur réelle allouée au ciel. L'utilisateur doit pouvoir explorer dès l'entrée sans sélection de mission préalable.
- Voyage manuel et assisté équivalents ; commandes essentielles immédiatement récupérables ; vitesse physique, vitesse de simulation et horloges distinctes.
- Vue cockpit et **vue extérieure du vaisseau préservées** ; « Cadrer » n'est pas « Aller vers » ; recherche robuste, sélection sans action physique implicite.
- HUD informatif mais discret. En Cinéma, il s'efface ; devant un événement vraiment critique, le système peut afficher des informations temporaires et ralentir/mettre en pause selon l'assistance choisie. Un événement intéressant n'est pas une urgence.

### 6.3. Observatoire

- Une fiche première lecture peut être ouverte depuis n'importe quel espace ; l'utilisateur peut approfondir jusqu'à un **poste d'observation scientifique**, puis revenir à son contexte sans altérer la mission.
- Pour chaque propriété : **valeur, unité/bande, source, méthode, incertitude si disponible, référentiel/époque, statut**. Une grandeur calculée à partir d'une autre observée doit porter son propre statut et ses hypothèses.
- Distinction de quatre familles de provenance : **OBSERVÉ, CALCULÉ, RECONSTITUÉ/ILLUSTRÉ, SPÉCULATIF/FICTIF**. Le Head peut raffiner la taxonomie pour séparer illustration, reconstruction de données et fiction, sans perdre ces distinctions.
- Les images réelles exigent instrument, bande, source et conditions. Aladin Lite/HiPS est une **option à étudier après vérification technique et licence**, jamais un second moteur lancé au démarrage par défaut.
- Visite d'archives, choix d'époque d'observation et position du vaisseau sont des concepts différents ; aucune consultation de catalogue ne doit modifier silencieusement le temps propre.

### 6.4. Carte cosmique

- Libre exploration multi-échelles de l'environnement planétaire à la portion extragalactique réellement couverte, avec niveaux de détail adaptés.
- Une caméra cartographique distante **ne déplace jamais le vaisseau** et n'est pas de fait un observateur physique pour tous les phénomènes optiques.
- Préserver les couches, les repères, les référentiels, les objets, les bassins CF4 et les parcours actuels avant toute fusion de la carte galactique et de la carte des structures ; établir une matrice de parité avant/après.
- Depuis la Carte : sélectionner, cadrer, inspecter, **préparer** un trajet physique ou un passage fictif, avec confirmation claire pour l'engagement. Ne pas mélanger préparation de trajectoire et déplacement.

### 6.5. Le labo, les missions et le monde ouvert

- Le laboratoire de propulsion/relativité reste accessible transversalement, identifié comme un espace de travail scientifique et non une mission imposée.
- Des visites facultatives peuvent proposer des situations intéressantes, sans enfermer le joueur dans une narration fermée et sans cacher les objets derrière des missions.
- Surfaces de Lune/Mars, atterrissages et exploration terrestre : **pistes de long terme**, à condition de données de relief et d'une délimitation honnête. Les exoplanètes sans cartographie connue ne recevront pas de relief fictif présenté comme réel.

## 7. Architecture : questions techniques à arbitrer par le Head et Codex

**A. Shell commun ou pages spécialisées ?** Expérience continue requise ; SPA, multipages persistantes, composants partageant un store ou autre montage : **options**, à comparer avec tests et risques WebGL. Ni un « canvas unique » permanent ni un nouveau framework ne sont des exigences de produit.

**B. Propriété de l'état.** Distinguer au minimum :
- état physique canonique : position, impulsion/vitesse, horloges, simulation active, autopilote, modèle engagé ;
- état de navigation / consultation : cible, caméra, échelle, filtres, instrument, archive, époque examinée ;
- état d'affichage : panneaux, qualité et mode Cinéma ;
- état de sauvegarde versionné et journal : rendre impossible l'effacement d'une mission en visitant la Carte.

**C. Changement de contexte temporel.** Pause et facteur de simulation partagés ; réglages d'archives séparés. La consultation doit rester possible en pause, y compris tourner caméra, voir données et objets. Le changement d'espace ne doit pas relancer une boucle temporelle séparée ou avancer des mois après passage d'un onglet navigateur en arrière-plan.

**D. Réduction des risques du monolithe.** Extraire les vues et les modèles de présentation, puis l'état partagé, ensuite les commandes du cockpit si bénéfice démontré ; **jamais une réécriture généralisée du moteur**, et régression de mission/physique à chaque tranche. Les bundles générés suivent la construction et ne sont pas une source alternative à modifier indépendamment.

**E. Chargement progressif.** Séparer premiers pixels affichés, première scène utile et état opérationnel. N'attendre au début que ce qui rend l'expérience sûre et cohérente. Tracer aussi la préparation CPU précédemment non instrumentée ; expérimenter le GPU warmup différé, mesurer le froid/chaud et la qualité visuelle à scène comparable. L'utilisateur doit savoir qu'une donnée est indisponible, sans prendre un catalogue incomplet pour un Univers vide.

**F. Qualité GPU et mobile.** Préserver les profils de rendu et les budgets existants. Passer de 780 × 471 à 1280 × 585 CSS à DPR identique peut augmenter sensiblement les fragments calculés ; conserver une résolution interne adaptée si nécessaire. Les maquettes mobiles existent : elles sont une contrainte de conception, pas une preuve de test sur appareil réel.

**G. Cadence et coordination.** Proposer des tranches indépendantes, démontrables, réversibles et sécurisées. Le Head peut proposer un autre ordre d'implémentation que celui de la task force ; fournir les dépendances et la raison du choix. Ne pas produire de promesse de date non mesurée.

## 8. Invariants scientifiques et limites à protéger

- SR locale : dynamique et horloges correctes au regard des modèles déclarés ; pas de perte de continuité de position/impulsion lorsque l'autopilote est désactivé.
- FLRW et trajectoires cosmiques : conventions et domaines documentés, sans faire croire qu'une simulation locale, un repère comobile et une projection de catalogue sont interchangeables. Respecter les conventions distinctes utilisées dans les données CF4 et les modèles Planck.
- Gravitation : les validations Schwarzschild et les gravités multi-sources approximées ne prouvent pas un solveur général de relativité ou de N-corps de précision.
- Temps du vol, temps propre et temps des données observées : différenciation claire, même lorsque plusieurs événements partagent un écran.
- Passage fictif : transition explicitement identifiée et journalisée, sans addition de la distance téléportée à l'odomètre de propulsion.
- Optique : rayons critiques, température/couleur et rendu spectral ont des domaines validés et des extrapolations ; **98 cas HDR anciens dont 90 dans les tolérances, 8 limites obliques extrêmes** n'est pas la même expérience que **750/750 sondes d'un autre banc**. Ne pas promettre un rendu complet physiquement validé à gamma 10^12 sur toutes les machines.
- Galaxies, nébuleuses, bassins cosmiques, couleurs instrumentales et morphologies : indiquer la provenance **au niveau de chaque couche ou grandeur**. Le ciel reconstruit n'est pas une photographie.
- Les sources de données (NASA, CDS, HYG, CF4, modèles et textures selon les cas) et leurs licences doivent rester traçables ; documenter les dérivations.

Le principe cardinal est **ne pas dégrader la vérité scientifique pour améliorer l'interface** ; l'immersion doit s'appuyer sur des représentations contrôlées et la possibilité de consulter leurs hypothèses.

## 9. Tests et critères de sortie — propositions à discuter, pas performances revendiquées

**Baseline** : toujours indiquer SHA, version publiée, navigateur, dimensions CSS, DPR, profil GPU, cache froid/chaud, état mission et état de la machine. Une CI verte n'établit pas les FPS sur Iris Xe, et test:all ne recouvre pas tous les validateurs spécialisés.

Parcours à éprouver :

1. Nouveau joueur : démarrer, observer, chercher « Mars » ; Mars doit précéder les homonymes, avec type et état clairement indiqués.
2. Chercher → sélectionner → cadrer → fiche → retour : même état physique, focus/commandes retrouvés.
3. Explorer → Observatoire → Carte → Explorer : cible, temps, vitesse et sauvegarde cohérents ; aucune téléportation par simple changement de caméra.
4. Planifier depuis la Carte, **ne rien engager**, revenir et comparer la mission ; puis engager explicitement et contrôler journal et horloges.
5. Mission sauvegardée en écran court 1280 × 585 avec menu Mission : une rangée, aucune collision, toutes les actions cliquables, retour focus.
6. Manuel ↔ autopilote pendant accélération, freinage, arrivée : continuité de position/impulsion/horloges, pas d'arrêt artificiel.
7. Changement d'espace pendant facteur de temps élevé : pause globale cohérente ; assistance critique activée/désactivée ; événements intéressants non interruptifs.
8. Cinéma : récupération immédiate de Pause/Retour ; alerte critique lisible, non déguisée en variation de physique.
9. Rendu sans WebGL : information et aide consultables au clavier, commandes de vol neutralisées, pas de fausse promesse de fonctionnement moteur.
10. Carte cosmique : repères, zoom, bassins, couches et recherche préservés à toutes les échelles couvertes ; orthogonalité caméra/vaisseau testée.
11. Observatoire : M87, propriétés observées versus dérivées ; sources et incertitudes accessibles, absence de données signalée, aucun nom de mission modifié.
12. Charge graphique : comparer V53/V54 et V3.1 à rendu et scène comparables ; **3 démarrages froids, 3 chauds**, sessions de **60 s par scène**, p50/p95/p99, pauses max, stabilité lors de **30 allers-retours Mars / Tarentule / Carte** si faisable.
13. Mesurer **surface du ciel réellement non occultée**, pas seulement la taille de son élément canvas, en états Immersion/Travail/Cinéma et écrans bureau/mobile. Les seuils proposés par Qwen (75 % Immersion, 95 % Cinéma) et Astra (p95 sans détérioration de plus de 10 % à qualité comparable) sont des **candidats à mesurer et à débattre**, non des exigences déjà approuvées.
14. Tests de clavier, lecteur d'écran, focus, contrastes, tailles lisibles, réduction des animations, téléphone réel ; éviter la solution « textes de 8 px pour économiser la place ».
15. Cinq utilisateurs nouveaux : trouver Mars, cadrer sans déplacement, identifier une valeur sourcée, préparer puis éventuellement engager, revenir ; noter hésitations et confusions caméra/vaisseau.

Le [registre de validation de la task force](./MATRICE_CONSOLIDATION.xlsx) détaille les **33 cas proposés**. Le Head peut les prioriser, enrichir, corriger et rejeter tout critère qui ne serait pas mesurable ou pertinent.

## 10. Ressources à consulter et à utiliser (sans devoir relire sept rapports)

### 10.1. Dossier consolidé

- [README des trois livrables](./README.md) : provenance, état et empreintes.
- [Note d'analyse contradictoire V0.1](./01_NOTE_DE_TRAVAIL.md) : preuves et limites des audits.
- [Matrice Excel](./MATRICE_CONSOLIDATION.xlsx) : onglets synthèse, **16 arbitrages**, **54 constats**, **16 divergences**, **33 tests**, index des éléments.
- [Dashboard HTML](./00_TABLEAU_DE_BORD.html) : lecture filtrable ; à télécharger et ouvrir localement pour exécuter son JavaScript.

### 10.2. Maquettes Claude — sources de direction artistique, **non intégrées en production**

- [Charte V3](../../../conception/CHARTE-UI-V3.md) et [directive de conception V3](../../../conception/ODYSSEE-V3-DIRECTIVE.md).
- [Maquettes V3 initiales](../../../conception/maquettes/README.md) : Explorer, Observatoire, Carte ; bureau et mobile, HTML + captures PNG.
- [Maquettes V3.1 immersives](../../../conception/maquettes-v3.1/README.md) : Explorer en vue libre/panneaux/vaisseau extérieur/Cinéma/mobile, Observatoire et Carte cosmique bureau/mobile. **Les HTML, PNG et les fonds capturés du moteur sont dans ce dossier**.
- Les chiffres de vol montrés dans ces planches sont illustratifs et ne doivent pas être présentés comme des sorties de simulation validées.

### 10.3. Prototypes externes facultatifs

- [Notice prototypes Qwen](./prototypes/README.md).
- [Qwen V1 HTML](./prototypes/qwen-v1-demonstrateur.html) ; [Qwen V2 HTML](./prototypes/qwen-v2-demonstrateur.html). **Canvas2D de démonstration**, sans moteur réel ni production ; les corrections et limites de V2 font partie de l'analyse.

### 10.4. Code, architecture et preuves

- [COLLABORATION.md](../../../COLLABORATION.md) ; [README.md](../../../README.md) ; [guide physique](../../../public/physics-v2.html).
- [Code cockpit](../../../src/cockpit.js), [moteur de rendu](../../../src/renderer.js), [vue vaisseau](../../../src/spacecraft.js), [carte cosmique](../../../src/cosmos.js), [physique SR](../../../src/physics.js), [FLRW](../../../src/flrw.js), [gestion de mission](../../../src/mission-storage.js).
- [Relais V54 Iris Xe](../../RELAIS-CLAUDE-2026-11-18-VERIF-V54-DEMARRAGE.md), [relais menu Mission](../../RELAIS-CLAUDE-2026-11-18-MENU-MISSION.md), [tests GPU haut gamma](../../RELAIS-CODEX-2026-11-13-GAMMA-GPU.md).
- [Workflows de validation](../../../.github/workflows/) et [scripts spécialisés](../../../scripts/).
- [Licence/attribution des ressources](../../../public/assets/ATTRIBUTION.md).

Les audits originaux complets existent dans le corpus constitué par le propriétaire mais **ne sont pas tous recopiés ici**. Leurs constats exploitables sont synthétisés et conservés avec leurs réserves dans la matrice et la note V0.1. En cas de désaccord sérieux, demander la pièce primaire correspondante avant de la traiter comme preuve définitive.

## 11. Proposition de séquence de travail, sous réserve de ton arbitrage

**Séquence de conception 0 — Mise à jour de la photographie.** Lire le dernier main, relever Sites/CI/Iris Xe et les correctifs déjà faits ; identifier les contradictions résolues (v54). Ne pas rouvrir un bug corrigé sous un autre nom.

**Séquence de conception 1 — Parcours et états.** Tester en maquette les décisions 1–16 dans les trois espaces et le flux d'Astra. Critiquer les V3.1 et le prototype Qwen : ce qui est utile, ce qui ne l'est pas, ce qui doit être redessiné.

**Séquence de conception 2 — Architecture des transitions.** Proposer les frontières de responsabilité : physique canonique, mission, consultation, caméra, archives, shell, réutilisation des renderers, ressources GPU. Comparer au moins une alternative raisonnable et ses risques.

**Séquence de conception 3 — Première tranche livrable.** Définir une petite évolution non destructive qui prouve l'immersion et le parcours principal, tout en conservant les tests et les comportements de navigation. **Le Head choisira la tranche**, en justifiant sa valeur et ses dépendances.

**Séquence de conception 4 — Science, observation, carte, mobile, communauté.** Décrire le phasage et les conditions préalables. Ne pas déduire qu'une maquette d'atterrissage, une bibliothèque externe ou une licence doit être intégrée maintenant.

Il ne s'agit **ni d'un planning de développement approuvé, ni d'un ordre d'exécution**. Le Head peut renverser le séquencement si les preuves et les contraintes le justifient.

## 12. Retour attendu du Head — droit de proposition réel

Nous attendons en priorité **ton avis professionnel**, pas un « bien reçu » ni une implémentation immédiate :

1. **Accord / désaccord / nuance** sur les 16 décisions : identifier celles qui paraissent contradictoires, insuffisamment définies ou techniquement risquées.
2. **Critique motivée des audits** : constats prouvés, erreurs de diagnostic, propositions naïves, angles morts, risques non anticipés.
3. **Lecture critique des maquettes V3/V3.1** : conserver, modifier, supprimer, remplacer ; ne pas valider les captures sans examen des contraintes du moteur.
4. **Proposition de modèle mental UX** pour Explorer, Observatoire et Carte, en expliquant la continuité des actions et des temps.
5. **Options d'architecture** : choix argumenté, risques de régression, conséquences Iris Xe et mobile, modifications éventuelles du code.
6. **Matrice de préservation** des fonctions actuelles : lesquelles restent accessibles, lesquelles sont regroupées, quelles différences sont intentionnelles.
7. **Plan de vérification et scénarios** avec critères réellement mesurables, rapports déjà disponibles, nouveaux instruments nécessaires.
8. **Livrables de conception** que tu estimes utiles : maquettes HTML/PNG basées sur le moteur actuel, diagrammes, prototypes indépendants, éventuels changements de code proposés, et relais d'ingénierie ; distinguer systématiquement maquette, implémentation et mesure réelle.
9. **Questions au propriétaire** : n'en remonter que celles qui demandent véritablement sa décision stratégique ou son accord de compromis.
10. **Prochaine tranche conseillée** et pourquoi elle rend l'Univers immédiatement plus compréhensible ou plus immersif sans mettre en danger la science.

**Livraison souhaitée pour la revue :** un document de réponse contradictoire accessible depuis GitHub, des liens directs aux éventuels HTML/PNG/diagrammes et un périmètre clair de ce qui est seulement proposé. Aucun commit d'implémentation ni déploiement sur Sites sans accord explicite du propriétaire.

---

### Conclusion de mission

**Nous te demandons de diriger la conception, pas de suivre les sept audits.** Le propriétaire a fixé une vision : liberté réelle de parcourir l'Univers, trois immersions scientifiques complémentaires, une représentation honnête, un monde et un temps persistants, une expérience lisible et spectaculaire sur un matériel accessible.

Les auditeurs ont fourni des preuves partielles, des pistes et des avertissements. La tâche du Head est de les examiner, de les confronter à l'état du code et d'aboutir à une conception meilleure que leur simple addition.

**Cette Note Master demeure un projet jusqu'à validation par le propriétaire.**
