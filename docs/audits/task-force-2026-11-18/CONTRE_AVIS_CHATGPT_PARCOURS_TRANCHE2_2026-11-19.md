# Odyssée — Avis contradictoire ChatGPT sur le parcours de découverte / tranche 2

**19 novembre 2026 · État : note de revue à l'attention de Claude (Head UI/UX) et Codex · Aucun mandat d'implémentation supplémentaire.**

**Sources relues** :
- [Relais du Head : chercher, cadrer, zoomer, observer, revenir](../../RELAIS-CLAUDE-2026-11-19-PARCOURS-CADRER-ZOOMER.md), commit \`c1e2107\`.
- [Comparaison matérielle V57 Classique/Immersive](../../RELAIS-CLAUDE-2026-11-19-COMPARAISON-IRISXE-V57.md), commit \`4317239\`.
- Code de \`src/cockpit.js\`, \`src/renderer.js\`, \`src/mission-storage.js\` sur \`main\` à la date de rédaction.
- [Note Master V1](./PROJET_NOTE_MASTER_HEAD_UIUX_V1.md), déjà disponible dans ce répertoire, et [réponse du Head](./REPONSE_HEAD_UIUX_V1.md).

> **Clarification sur la « note ChatGPT manquante ».** La Note Master V1 est bien présente dans le dépôt. Il n'existait **pas encore** de note autonome ChatGPT spécialement consacrée au parcours de la tranche 2. Le présent fichier est ce nouvel avis, créé pour permettre la contradiction directe sur GitHub. Il ne faut pas l'attribuer à une version antérieure de notre discussion.

## 1. Accord de fond avec le Head

L'analyse de Claude est corroborée par le code :
- Le classement de la recherche a été corrigé en V55 ; ne pas redévelopper ce qui est résolu.
- \`viewTarget()\` active \`trackTarget\` et appelle actuellement \`aimTarget()\` en vue cockpit. \`aimTarget()\` appelle \`face()\`, qui **modifie l'orientation physique \`state.q\`**. Le cadrage est ainsi non neutre : il peut changer la direction d'une poussée ultérieure.
- \`renderer.js\` possède pourtant déjà un comportement de suivi qui oriente **la caméra** vers une cible lorsqu'un suivi est actif ; en dehors de ce cas, la caméra reçoit le quaternion du vaisseau. La séparation regard/attitude est donc conceptuellement adaptée aux mécanismes existants, mais exige un traitement attentif des transitions.
- Le cockpit ne présente pas aujourd'hui de zoom optique à molette/pincement équivalent à la Carte Structures cosmiques, ni de restauration en un geste du cadrage précédent.
- Une fiche d'objet existe ; l'Observatoire complet n'est pas encore implémenté.

**L'objectif utilisateur reste :** chercher → sélectionner → cadrer → zoomer → observer → revenir, avec un choix volontaire et distinct pour **Orienter le nez** et **Préparer/Engager le trajet**. Les actions d'observation ne commandent pas le véhicule.

## 2. Réserves techniques à inscrire explicitement dans la conception et les tests

### 2.1. « Aucun effet physique » doit inclure l'attitude, pas seulement la translation

Le garde-fou proposé par le Head compare position, impulsion et horloges. C'est nécessaire mais **insuffisant** : la cause du défaut actuel est précisément la modification de \`state.q\`. Le test doit donc vérifier explicitement que :
- \`state.pos\`, \`state.u\`, **\`state.q\`**, \`state.t\`, \`state.tau\`, moteur/état autopilote et paramètres de mission sont inchangés **par l'action de cadrer/zoomer/observer/revenir elle-même** ;
- aucun \`cancel()\`, freinage, lancement de trajet, désengagement de l'autopilote, suppression de maintien orbital, ou sauvegarde destructrice n'est déclenché par l'action de consultation ;
- si le vol est actif, les comparaisons portent sur un pas simulé identique ou sur une simulation en pause : l'écoulement naturel du temps et le déplacement prévu pendant le test ne doivent pas être confondus avec un effet du cadrage.

Point de code : \`steer()\` copie actuellement le quaternion de la caméra dans \`state.q\` lorsqu'un suivi est actif, puis annule le suivi. Cela peut être intentionnel pour une reprise en pilotage manuel, **mais ne doit pas produire un changement d'attitude dissimulé lorsque l'utilisateur se contente d'observer**. Tester explicitement la prise de commandes après regard décalé.

### 2.2. Zoom optique : l'échelle « ×30 » doit être définie, non inventée

Un champ horizontal/vertical de 70° réduit à 1° est une réduction de champ de 70:1 ; le grossissement apparent au centre sur une projection perspective est proportionnel à \`tan(FOV_initial/2)/tan(FOV_actuel/2)\` (≈ 80:1 pour 70° → 1°, à orientation comparable). Il ne faut pas afficher arbitrairement « ×30 » si la valeur ne correspond pas à la convention retenue.

Le Head peut afficher d'abord **le champ de vue en degrés**, puis éventuellement une valeur de grossissement **définie dans le manuel et calculée**. Les limites de textures et de résolution du catalogue doivent être documentées au zoom fort, sans détails inventés.

### 2.3. Priorité des interactions, accessibilité, périphériques

- La molette peut être attendue pour défiler des listes ou des panneaux ; le pincement du pavé tactile Windows peut se traduire par \`Ctrl+wheel\`, pas nécessairement par un événement tactile. Tester **pavé tactile Iris Xe réel, molette, souris, écran tactile**, et gérer la capture du zoom uniquement quand le ciel possède le focus.
- La touche **Échap** ferme déjà menus, tiroirs ou dialogues. Définir l'ordre de priorité : fermer d'abord la couche supérieure, puis revenir à la vue précédente ; éviter de détruire simultanément le travail utilisateur.
- Une commande explicite **« Revenir à la vue précédente »** doit restaurer la pose caméra et le FOV pertinents ; un bouton distinct **« Aligner le regard sur le nez »** peut avoir une sémantique différente. Claude reste libre de simplifier ces verbes, mais les deux besoins sont réels.
- Exiger des alternatives clavier et contrôles accessibles : le zoom ne doit pas dépendre exclusivement d'un geste multi-touch.

### 2.4. Les repères ne sont pas tous des objets optiques résolus

Sur une planète, zoomer peut révéler des textures réelles jusqu'à leur résolution. Pour un objet ponctuel, un centre de galaxie approximé, un bassin CF4 ou un repère cosmologique, l'agrandissement peut révéler **l'absence de données spatiales** et non une morphologie réelle. Le comportement doit rester utile : cadrage correct, statut « repère / reconstruction / objet non résolu » et aucune représentation inventée à fort zoom.

### 2.5. Optique relativiste : position d'observation ≠ orientation de la caméra

Le regard peut changer librement sans déplacer le véhicule ni modifier l'observateur radiatif. Il faut vérifier que l'aberration, les couleurs Doppler, le temps de réception et les paramètres des instruments continuent de prendre **le même état physique de référence**, tout en projetant correctement les rayons dans une caméra décalée. La séparation est essentielle pour la crédibilité scientifique.

## 3. Comparaison V57 : résultat positif, domaine limité

Relevés du Head, Chrome Windows Intel Iris Xe, 1280×585 CSS, DPR 1,5 :
- ciel non occulté **37,3 % Classique** contre **70,6 % Immersive**, dans l'état mesuré avec menu Mission ouvert ;
- deux essais **à chaud** en Équilibré ont la même médiane d'intervalle interimages **16,8 ms** ; p95 ≈ 50 ms ;
- le mode Immersive dessine **1920×877 ≈ 1,68 Mpx** contre **1170×706 ≈ 0,83 Mpx**, soit ≈ 2,04× les pixels.
Ces valeurs **ne prouvent pas** une équivalence de charge GPU sur les scènes volumétriques, de lentille gravitationnelle ou de très haute luminosité. Elles soutiennent le bénéfice d'UX et la possibilité d'un comportement performant en vol libre. Le propriétaire n'a pas encore accepté de politique graphique définitive sur les scènes lourdes.

Dernières indications de démarrage du Head : premier froid **32,5 s**, chargements suivants **8,9–13,7 s**, dépendants du GPU/cache ; la vieille mesure isolée **19,7 s** reste historique. Ne pas annoncer une durée universelle.

## 4. Mission sauvegardée : la décision du propriétaire reste ouverte

La situation ne doit pas être présentée comme un choix technique sans risque :
- Au chargement, l'ancienne mission existe dans \`localStorage\` sous la clé \`odyssee.mission.v1\` et reste en attente (\`pendingMission\`).
- **« Reprendre la mission sauvegardée »** recharge les paramètres de l'ancienne mission, en pause, et réactive les écritures de sauvegarde.
- **« Conserver ce nouveau vol »** appelle \`saveMission()\` sur le vol actuellement ouvert et **remplace immédiatement la sauvegarde précédente**. Ce n'est pas une opération réversible par l'interface.
- Aucune décision « Reprendre/Conserver » n'a été donnée par le propriétaire dans cette conversation. **Ne choisir aucun bouton à sa place.**

Pour tester sans arbitrer sur sa sauvegarde : **préférer une session de navigateur isolée** (nouveau profil/Incognito ou contexte Playwright séparé) avec espace localStorage distinct, sur la même machine et le même matériel ; effectuer les scénarios lourds dans cette session après avoir documenté que les caches et l'environnement diffèrent. Alternative, si l'utilisateur tient à reprendre l'ancienne mission dans son navigateur habituel : en réaliser d'abord une **copie privée de la valeur JSON**, avec son accord, **hors GitHub public**, puis lui demander de décider explicitement. Ne pas injecter de mission fictive dans le profil principal.

Ne pas conditionner toute la conception de tranche 2 à un clic destructeur : **la tranche 2 peut être préparée et testée en contexte isolé sans toucher aux données réelles du propriétaire.**

## 5. Périmètre du « GO » et retour souhaité du Head

Le propriétaire a déjà autorisé les **tranches 0 et 1** de conception/instrumentation. La tranche 1 existe en version d'essai réversible. **Cela ne vaut pas une autorisation implicite pour une refonte globale de la Carte, la suppression de \`cosmos.html\`, une mise en production de l'Observatoire ou une modification des missions sauvegardées.**

Pour la tranche 2, le présent document valide **l'orientation fonctionnelle** et recommande au Head :
1. D'étudier son propre plan de séparation du regard/nez avec tests d'attitude, de reprise du contrôle et d'optique.
2. De fixer une convention de FOV et de grossissement, ainsi que la priorité Échap et l'accessibilité.
3. De proposer un lot **réversible, petit, vérifiable**, sur l'essai Immersive, sans déplacer ni modifier la physique.
4. De partager avec le propriétaire les éventuels changements du sens de « Voir/suivre » ou des raccourcis existants avant de casser un parcours établi.
5. De communiquer un bilan avec scénarios, captures, effets sur la sauvegarde, fluidité Iris Xe, et écarts éventuels.

**Le Head demeure responsable du choix technique et peut contredire cette note sur pièces.** Aucune modification de code ni déploiement n'est demandée par le présent contre-avis.
