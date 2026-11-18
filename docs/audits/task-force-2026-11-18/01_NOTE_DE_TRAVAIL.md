# Odyssée — Dossier de consolidation des sept audits (v0.1, travail)

**Date de référence : 18 novembre 2026**  
**Périmètre : produit, interface, architecture, physique, données, validation, gouvernance**  
**Référence GitHub observée :** `main` `1d75ce108364dc948090368d696f135d5b064ca6`.  
**Statut : dossier contradictoire de travail — NI note Master NI mandat d'implémentation.**

> Gouvernance : le propriétaire fixe le cap ; Claude, Head of UI/UX, conserve une autorité de conception, un droit de critique et de proposition ; Codex assure l'ingénierie en coordination ; la task force produit des preuves et hypothèses ; le rapporteur consolide sans arbitrer seul. Les 16 décisions du propriétaire font foi pour les orientations, non pour leur implémentation.

## I. Origine et méthode

Le corpus rassemble **sept audits** : DeepSeek, Manus, Kimi, Qwen, Mistral, GLM 5.2 et Astra 6.2. Il comprend aussi les **deux droits de réponse Qwen** (correction des conclusions et prototypes V1/V2) et la **synthèse corrigée GLM**. Les pièces originales, les prototypes HTML et leurs captures ont été copiés sans transformation dans les sous-dossiers sources/prototypes/captures. Le DOCX Manus et les PDF GLM/Astra disposent d'extractions texte secondaires pour une lecture plein texte ; les originaux prévalent.

### Règle de preuve

1. **Confirmé au code** : lecture effective de source sur un SHA connu ; cela ne prouve pas l'apparence ou le comportement matériel.
2. **Observé par un auditeur** : utile mais à dater selon son environnement (GPU distant, Cloudflare, droits d'accès, cache).
3. **Mesuré par l'équipe Iris Xe** : preuve de la session et de la scène, pas une moyenne reproductible universelle.
4. **Dérivé ou calculé** : dépend des états UI / CSS et dimensions ; ne pas comparer des métriques hétérogènes.
5. **Proposition de conception** : hypothèse de travail, jamais fonctionnalité livrée ni décision du propriétaire.
6. **Orientation décidée** : décision explicite du propriétaire, l'ingénierie et les contraintes restent ouvertes.

Toute piste est conservée dans les registres, y compris les avis minoritaires et les assertions finalement infirmées.

## II. Constats opérationnels corroborés

**Recherche — Astra**. Dans `src/cockpit.js` au dernier `main`, `renderList()` filtre avec une recherche `includes(q)` puis trie par distance seulement si `q` est vide et affiche les 100 premiers résultats. Le point de friction Mars/Marsic est une vraie faiblesse de classement. La solution proposée consiste à pondérer noms exacts, alias exacts, préfixes, sous-chaînes et hôtes ; son implémentation appartient à Claude/Codex.

**Carte cosmique — Qwen**. L'écouteur global `window.addEventListener('error', … webglMonitor.showError(...))` est encore présent dans `src/cosmos.js`; une notification `ResizeObserver loop ...` peut ainsi être affichée comme erreur bloquante sans perte de contexte WebGL. Il faut une reproduction ciblée et une classification robuste : le fait que le gestionnaire d'erreur soit global est vérifié au code, la reproduction sur Iris Xe ne l'est pas ici.

**Démarrage — Qwen/Astra**. L'`init()` du cockpit lit en `Promise.all` six JSON, notamment `catalogue.json` et `galaxy-catalogue.json`, avant `new SpaceRenderer(...)`. Qwen cite environ 26,7 Mo de JSON brut en chemin critique. Astra cite 23,28 Mo pour les deux catalogues. Ce n'est **pas** le poids transféré après compression ni la preuve que le réseau explique à lui seul les ~37 s annoncées sur Iris Xe : il faut isoler téléchargements, décodage JSON, création GPU, échauffement et première interaction.

**V53 / maquettes V3.1**. Les rapports ont principalement audité `cb068cb` (V53). À `main` consulté, `c260973` a ajouté des maquettes V3.1 (9 planches HTML et PNG) illustrant un ciel plein écran, des tiroirs et trois espaces ; aucune n'est connectée au moteur. Le commit `b2bc90e` corrige la barre Mission sur écran court et ses tests CI sont verts, mais la validation sur le Chrome Iris Xe du propriétaire et la publication doivent rester distinctes.

**Validation**. Le dépôt consulté contient **12 fichiers de workflow `.github/workflows/`** et **81 fichiers dont le nom commence par `scripts/validate-`**. Les chiffres 10 workflows / 78 validateurs de certains audits sont des périmètres différents et ne doivent pas être repris comme un décompte exhaustif. Sur `b2bc90e`, les sept exécutions récentes récupérées via GitHub Actions ont toutes conclu `success`. Des échecs du 17 novembre sont historiques : aucun audit ne peut les qualifier de panne actuelle sans vérifier le SHA et l'exécution pertinente.

**Physique**. Les modèles de relativité restreinte, FLRW, gravité approchée et fiction sont séparés et testés dans leur domaine. Le banc HDR de 98 cas (90 dans les tolérances, 8 limitations obliques extrêmes) **n'est pas le même** que le test 750/750 d'une autre chaîne d'observation. Les limitations d'approximation (gravité multi-source, températures/spectres extrapolés, morphologies reconstruites, conventions H₀ distinctes) doivent accompagner les propriétés, pas être noyées dans des mentions générales.

**Licences**. Pas de licence générale de code identifiée à la racine à la date des audits ; des données et textures ont leurs propres obligations. Le propriétaire vise l'open source à terme, avec protection de l'ouverture de l'application et diffusion facile des bibliothèques scientifiques. Aucune licence précise n'est adoptée ; l'étude AGPL/Apache est une piste, soumise à compatibilité juridique et de code. Aucune modification du dépôt n'est autorisée par ce dossier.

## III. Les 16 arbitrages du propriétaire

Les décisions détaillées, leur périmètre et la latitude de Claude figurent dans `02_REGISTRE_ARBITRAGES.csv`. Les lignes décrivent des **contraintes de résultat et d'expérience**, non des exigences de SPA, de canvas unique, de dimensions de panneaux ou de framework.

| Domaine | Synthèse de l'orientation |
|---|---|
| Esthétique | Hybride, immersive par défaut mais physiquement et épistémiquement documentée |
| Monde | Open World cosmique libre, visites/missions facultatives, pas de progression obligatoire |
| Navigation | Voyages physiques et passages fictifs facultatifs ; pilotage manuel et assisté équivalents |
| Corps célestes | Planètes proches et terrains documentés en priorité ; exoplanètes sans cartes, pas de fausse surface |
| Démarrage | Entrée rapide *exploitable* ; ressources non critiques chargées progressivement |
| Espaces | Explorer, Observatoire, Carte : trois immersions complémentaires et un même état physique |
| Temps | Contrôle temps partagé, assistance temporelle facultative et proportionnée |
| Observatoire | Fiche contextuelle vers véritable poste scientifique, sources et hypothèses par valeur |
| Carte | Caméra libre multi-échelles, sans téléporter le vaisseau ; préparation de destination avec confirmation |
| GPU | Profils adaptatifs, calcul scientifique invariant |
| HUD | Contextuel, Cinéma épuré, réouverture sur critique, notification discrète sur découverte |
| Communauté | Open source à long terme ; régime juridique précis différé |

## IV. Les divergences ne sont pas des votes

Se reporter au `04_DIVERGENCES.csv` pour **16 controverses** avec les positions des audits, l'orientation connue et la latitude de Claude. Points structurants :

- **SPA ou non ?** L'UX doit paraître continue, mais l'architecture peut être multi-pages, hybride ou SPA : ce n'est pas à l'équipe d'audit de l'imposer. Il faut garantir l'état et éviter les contextes GPU simultanés coûteux.
- **Vue externe ou carte ?** Les premières maquettes V3 proposaient une fusion trop large. Les nouvelles V3.1, Qwen et Astra préservent la perspective Vaisseau 3D dans Explorer : la carte doit rester un instrument multi-échelles.
- **Plein écran GPU** : l'argument « seulement du DOM » est faux dans les cas où la surface WebGL augmente. Mesurer le nombre de pixels effectivement rendus, y compris DPR et volumes.
- **Données et temps** : l'état mission et le contexte d'observation doivent être séparés. Changer la caméra ou consulter une époque d'archives ne doit pas faire sauter les horloges.
- **Licence MIT immédiate** : non retenue comme décision. Protection de l'ouverture et compatibilités tierces nécessitent une analyse contradictoire.
- **Deux contextes WebGL cockpit + vaisseau** : l'allégation Mistral n'est pas établie par la lecture précédente de `spacecraft.js` (render target et même renderer). Elle ne doit pas figurer comme fait sans mesure runtime.
- **Mobile** : les maquettes existent, le téléphone réel n'a pas été validé. Ne pas abandonner le responsive tout en phasant les travaux de production.
- **CI / conformité** : dates, SHAs et domaines de tests nécessaires. Aucun « 100 % validé scientifiquement » acceptable.

## V. Séquencement de discussion avec Claude — SANS calendrier imposé

**Lot de sécurité et de preuves**. Établir le baseline sur le dernier `main`, vérifier ce qui est publié sur Sites, corriger les erreurs bloquantes réellement reproduites, maintenir les régressions ; instruire les cas de recherche et de fallback WebGL.

**Lot de conception de l'expérience**. Examiner toutes les V3/V3.1 et les prototypes Qwen en vraie taille ; dérouler les parcours Astra ; expliciter les trois immersions, les situations normales/urgentes, l'état physique et la consultation d'archives. Claude est libre de proposer un autre découpage et de justifier ses choix.

**Lot d'architecture et d'exploitation**. Matrice de préservation des fonctionnalités ; stratégie d'extraction de cockpit.js ; chargement de ressources en seuil minimal ; performance GPU; cohérence de mission entre espaces ; version de publication reproductible ; politique de tests.

**Lot d'outillage scientifique**. Provenance par valeur, limites des modèles, couches reconstruites, Observatoire/Aladin après audit de licences, benchmarks OpenSpace/GaiaSky/ESASky/NASA Eyes/SpaceEngine.

**Lot gouvernance communautaire**. Clarifier droits de toutes les ressources et contributions, modalités de revue de code et publication, licences ultérieurement soumises au propriétaire. Ne pas imposer PR/branches à la collaboration actuelle tant que Claude n'en a pas démontré le bénéfice.

## VI. Plan de tests proposé

`05_PLAN_DE_VALIDATION.csv` référence **33 tests d'acceptation à examiner, sans prétendre qu'ils ont été réalisés. Les critères scientifiques sont des obligations d'invariance ; les cibles de fluidité et de surface visible sont des cibles d'évaluation révisables après mesures. Qwen propose 75 % de ciel non occulté en Immersion et 95 % en Cinéma ; Astra propose un p95 sans dégradation supérieure à 10 % à qualité comparable. Ce sont des **propositions de la task force, non des seuils déjà validés par le propriétaire**.

## VII. Actifs livrés et limitations du présent paquet

- Les **sept rapports originaux** (dont deux PDF et un DOCX), plus les trois compléments/réponses, sont archivés dans `01_sources_audits/`.
- Les **deux prototypes Qwen** (HTML/CSS/Canvas2D) sont dans `02_prototypes_qwen/`. Ils ne sont pas branchés sur le moteur Odyssée et ne doivent pas être traités comme un code d'intégration prêt.
- Les **captures Qwen et le schéma GLM** sont présents dans `03_captures/`.
- Les **maquettes V3 et V3.1 de Claude**, leurs PNG, les rendus réels de fond et les principaux fichiers sources du moteur sont **accessibles dans le dépôt GitHub épinglé** via `06_INDEX_MAQUETTES_CODE_GITHUB.csv`. Ils ne sont **pas recopiés** dans ce ZIP : les octets GitHub n'ont pas été transférés localement. Ne pas présenter cette absence comme une perte du travail ; la traçabilité par URL SHA est maintenue.
- Les conventions d'affichage et de mesures des audits reposent surtout sur V53 `cb068cb`, alors que `main` a évolué. Ne pas fusionner « audité » et « actuellement publié ».

## VIII. Questions à poser AU HEAD (et non à pré-trancher)

1. Sur quoi le Head est-il d'accord, en désaccord, ou estime-t-il le diagnostic insuffisant ? Il devra pouvoir contester chaque proposition et apporter des preuves.
2. Quelle cible de surface de ciel et de réactivité est réaliste selon les mesures sur Iris Xe dans trois modes ?
3. Quelle architecture protège le mieux la continuité de mission sans introduire de coûts WebGL supplémentaires ?
4. Quels parcours prioritaires traiter en premier et quelles fonctions existantes pourraient disparaître involontairement ?
5. Comment étager les extractions `cockpit.js`, la correction de la carte, le chargement paresseux et l'Observatoire ?
6. Quelles expériences de mesure/observabilité doivent précéder toute annonce de performance ou de fiabilité scientifique ?
7. Comment organiser une future politique de contribution open source sans casser la gouvernance séquentielle actuelle ?

## IX. Décisions **non prises**

Pas de choix de licence, de calendrier ferme, d'architecture SPA, de suppression de pages, de fusion moteur, de seuil absolu de FPS garanti, ni d'ordre d'implémentation arrêté. Pas de commit, publication, modification GitHub ou demande d'exécution à Claude.

**Étape suivante** : discussion des matrices et des controverses avec le propriétaire, puis rédaction de la *Note Master* soumise au Head of UI/UX et enrichie de ses critiques. Ce fichier **n'est pas** la Note Master.
