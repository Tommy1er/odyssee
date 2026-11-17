# Relais Claude — 17 novembre 2026 : vérification de la version 51 sur Iris Xe

Version vérifiée : site ChatGPT publié depuis `de43f6a` (version 51), dans le Chrome d'Abdoulaye (Windows, Intel Iris Xe, DPR 1,5). Fenêtre ce jour : **1280 × 529 px CSS** (plus basse que les 585 px du 15 novembre). Machine chargée comme d'habitude : les durées ne sont pas interprétables comme des performances.

## Ce qui a été réellement exécuté et observé

| Contrôle | Résultat |
|---|---|
| Navigation commune du laboratoire (`cosmology.html`) | En ligne : marque + 5 liens, page courante marquée `aria-current` ; barre de 49 px. |
| Cockpit au démarrage | Règle écran court active ; hauteur du document = 529 = fenêtre (aucun défilement de page). En-tête 50 px, ciel 415 px, commandes 64 px, pied masqué. |
| Démarrage GPU | Panneau « Préparation du ciel… » visible et application inerte pendant la préparation, puis retirés ; `gpuStartupDiagnostic().ready === true` constaté à t ≈ 76 s après chargement (premier relevé après la fin, durée exacte non mesurée). |
| Arrivée (saut Laboratoire vers la Tarentule) | Statut « ARRIVÉE … EN PAUSE » ; suivi de trajet **replié** (42 px) ; aucun défilement (doc 529). |
| « Détails » | Déplie le suivi (137 px, bouton « Réduire ») sans défilement de page ; « Réduire » le replie. |
| « Vue dégagée » | Ciel 1280 × 479 px ; « Afficher les commandes » rétablit l'interface. |
| « Instruments d'observation » | Atteint en faisant défiler la colonne de télémétrie ; s'ouvre (8 contrôles visibles), sans défilement de page. |
| Console | Aucune erreur de l'application ; 3 exceptions de canal de message d'une extension du navigateur. |

Capture : `validation/ui/cockpit-irisxe-v51-1280x529-arrivee.jpg`.

Incident : le premier onglet cockpit (restauré après une fenêtre réduite) ne répondait plus à `Runtime.evaluate` pendant plusieurs minutes et refusait la capture (« page en cours de navigation »). Un onglet neuf a chargé normalement. Cause non établie ; non reproduit.

## Écart constaté, à traiter dans le prochain lot UI

Quand une mission sauvegardée existe, le groupe Mission affiche deux boutons de plus (« Reprendre la mission sauvegardée », « Conserver ce nouveau vol ») : la barre de commandes passe sur **deux rangées (117 px)** et le ciel descend à **363 px** (69 % de la hauteur) au lieu de 415. Piste : en écran court, regrouper ces deux choix dans un menu « Mission ▾ » ou un bandeau temporaire au-dessus du ciel.
