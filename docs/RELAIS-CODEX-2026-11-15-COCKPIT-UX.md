# Cockpit : première tranche UI/UX (15 novembre 2026)

## Direction retenue

Les recommandations d'Abdoulaye sont une direction, pas un cahier des charges imposé : observatoire scientifique, ciel prioritaire, informations hiérarchisées, distinction données/modèles/fiction. Références relues dans leurs sources officielles : https://docs.openspaceproject.com/latest/ (panneaux navigation, temps et instruments), https://gaiasky.space/ (exploration par jeux de données), https://cds-astro.github.io/aladin-lite/ (API d'observations et catalogues). Consultation le 15 novembre 2026.

On conserve les vues existantes et leurs domaines physiques. Un onglet « Observatoire » ne doit pas promettre une image de télescope quand il affiche un modèle calculé. L'intégration d'Aladin/HiPS et l'unification de contexte entre les cartes sont des lots futurs ; rien de tel n'est annoncé livré ici. La conception complète et les parcours resteront nécessaires avant cette refonte plus large.

## Ce qui est changé

- Sur ordinateur (largeur >= 901 px), le cockpit s'inscrit dans la hauteur de fenêtre. Les panneaux latéraux défilent indépendamment ; les commandes sont regroupées en grille compacte, au lieu de deux longues rangées « mission » et « régime » suivies d'une troisième rangée.
- Les réglages de graphismes, vision, exposition, animation et comparaison passent dans « Instruments d'observation », volet natif repliable de la colonne droite. « Qu'est-ce que je regarde ? » et « Vue dégagée » restent sur l'image. La préparation graphique reste visible même quand les instruments sont fermés.
- La séparation « Vol local · 3D » / « Mission cosmologique » est explicite. Le lien garde son comportement : mission locale en pause et sauvegardée, expérience cosmologique distincte.
- Palette d'instrumentation sobre ; couleurs des panneaux distinctes de la physique des émissions. Plusieurs annotations importantes remontent à 12 px sur PC ; cette tranche n'est pas un audit WCAG AA complet ni la suppression de tout petit texte historique.
- Les raccourcis de pilotage ne captent plus Espace sur les boutons, liens et volets : le clavier agit sur le contrôle focalisé. Le relâchement W/Z/S ne coupe la poussée que si la touche avait effectivement été engagée par le pilote.
- Aucune modification des moteurs, des sauvegardes, des accélérations, des horloges ou des lois spectrales. Les identifiants des commandes restent conservés. Les tests touchés ouvrent réellement le volet avant de manipuler ses commandes, au lieu de contourner leur visibilité.

## Critères de validation

Nouveau banc navigateur : 1440×900, 1200×780 et 960×700, pas de débordement de la coque sur ordinateur ; ciel au moins 44 % de la hauteur (pas une revendication de 70–80 % de surface totale), instruments hors image, ouverture au clavier, bande spectrale, vue dégagée et invariance position/impulsion/horloges. Captures conservées par CI. Les suites mission et spectrale sont rejouées avec les nouveaux contrôles.

Téléphone : pas de refonte dans ce lot ; seul le contrôle responsive existant est conservé. Rendu logiciel CI, pas un nouveau test Iris Xe.

## Suite de la conception

1. Volets navigation et télémétrie plus compacts, sans perdre la cible ni les commandes essentielles.
2. Fiche d'objet à lecture progressive : découverte puis paramètres, unités, provenance, incertitudes et limites.
3. Continuité sélection/carte/vol, sans confondre caméra libre et position physique.
4. Étude d'un véritable visualiseur de données observées, chargé à la demande et avec sa provenance, pour ne pas alourdir le démarrage du cockpit.

Les 70–80 % de champ visuel, la conformité AA globale et le contexte partagé partout sont des objectifs de conception, pas des résultats de cette première tranche.

## Résultats conservés

- Source finale applicative : `f9c2edf0304ef8638ab0bdf813b1905074cedb64` (mise en page, clavier et suggestion de proximité).
- UI : run 43745789451 réussi, neuf contrôles, trois captures PC relues ; aucun message JavaScript/GLSL. Rapport daté : `validation/reports/cockpit-layout-2026-11-15.json`.
- Mission : run 43745789452 réussi, reprise de sauvegarde, Terre–Lune et aller-retour par la mission cosmologique indépendante.
- Carte/cockpit : run 43745598315 réussi sur d97bfed, même correction clavier ; la modification suivante déplace seulement la suggestion de proximité dans la colonne d'instruments.
- Construction rapide : run 43745598295 réussi.

Le volet de navigation reste défilant sur une petite fenêtre PC : la cible et sa commande peuvent nécessiter de faire défiler la colonne. La réduction supplémentaire de cette colonne fait partie de la suite, sans masquer cette limite derrière le seul critère d'absence de débordement.

## Publication finale

Suite graphique complète 43745789440 réussie sur f9c2edf, y compris nébuleuses imbriquées, galaxies, bassins, pouponnières, comparaison 0/0,99 c et texture/capture lunaire finale. Les identifiants et les contrôles existants sont conservés, avec ouverture explicite des instruments dans les tests concernés.

Version 50 publiée, audience privée inchangée. Source Sites : `c423e0ae02ac4c149ac7ad6ef404ca6859add8ed`. Version : `appgprj_6aaed9890f1c8191ac977fe0fadcc659~appgver_182d6b05c1d4819187f03e98556cb45c`. Déploiement : `appgdep_6af9f9f6c618819183834ac379ba87fc`, résultat natif `succeeded` le 15 novembre à 18:29:25 UTC. URL conservée : https://atlas-stellaire-abdoulaye.abdoul97.chatgpt.site .

Les preuves et cette confirmation sont ensuite ajoutées au dépôt GitHub ; elles ne modifient pas les fichiers d'application de la version publiée. Ce lot n'inclut aucun nouveau retest matériel utilisateur.
