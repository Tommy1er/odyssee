# TF-08 — Mistral
**Rôle :** Unité — audit logiciel et qualité.
**Statut :** non lancé, accès non qualifié, baseline non figée.
## Mission
Revue indépendante de la modularité, tests, sûreté des contributions, dépendances et licences ; vérifier les propositions de GLM et la maintenabilité des prototypes. Définir non-régressions mission, mobile, WebGL et mesures.
## Contre-expertise
GLM ; Qwen. Soumettre ses résultats au contrôle indépendant et contester les hypothèses si nécessaire.
## Livrables
Matrice de tests, revue des interfaces et dépendances, risques classés, critères de fusion et de rollback, preuves de reproduction.
Utiliser [le modèle de rapport](../../templates/RAPPORT.md), [le registre de sources](../../03_SOURCES_SCIENTIFIQUES/REGISTRE.csv), et [les règles de validation](../../06_VALIDATION/README.md). Si les sources ou le moteur ne sont pas accessibles, le signaler. Ne pas produire de résultat simulé en prétendant l'avoir exécuté.
## Dépôt
Branche `tf-08/mistral-v4-r1` (à créer dans le dépôt cible après qualification), PR brouillon, fichier RAPPORT-R1.md dans ce dossier. Attendre le GO. Ne pas toucher à la production.
