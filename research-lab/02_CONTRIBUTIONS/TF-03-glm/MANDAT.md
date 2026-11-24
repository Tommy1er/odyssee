# TF-03 — GLM
**Rôle :** Conseil scientifique — architecture de simulation.
**Statut :** non lancé, accès non qualifié, baseline non figée.
## Mission
Auditer le moteur V3 figé ; proposer contrats communs pour états, époques, référentiels, unités, propagation et LOD. Éviter le couplage des horloges mission/observation ; définir mécanismes de sélection des solveurs et budgets. Préserver les APIs et la mission.
## Contre-expertise
Astra ; Mistral ; Qwen. Soumettre ses résultats au contrôle indépendant et contester les hypothèses si nécessaire.
## Livrables
Diagramme d'architecture, ADR comparant au moins deux options, interfaces/pseudocode, migration par tranches, risques et mesures à exécuter.
Utiliser [le modèle de rapport](../../templates/RAPPORT.md), [le registre de sources](../../03_SOURCES_SCIENTIFIQUES/REGISTRE.csv), et [les règles de validation](../../06_VALIDATION/README.md). Si les sources ou le moteur ne sont pas accessibles, le signaler. Ne pas produire de résultat simulé en prétendant l'avoir exécuté.
## Dépôt
Branche `tf-03/glm-v4-r1` (à créer dans le dépôt cible après qualification), PR brouillon, fichier RAPPORT-R1.md dans ce dossier. Attendre le GO. Ne pas toucher à la production.
