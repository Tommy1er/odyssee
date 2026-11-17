# Tests reproductibles — 17 novembre 2026

Playwright 1.56.1 est maintenant une dépendance de développement épinglée, avec package-lock généré par npm. Une installation propre locale npm ci a réussi et require('playwright/package.json').version retourne 1.56.1. Les navigateurs s’installent séparément via npm run test:ui:install (ou :ci sous Linux pour les dépendances système).

Commandes : test:physics (cinq suites cœur), test:ui (build + quatre parcours séquentiels), test:all (ces deux groupes). Ces noms ne revendiquent pas tous les validateurs spécialisés ni une validation physique exhaustive. La nouvelle CI vérifie ces commandes depuis npm ci avec quatre jobs navigateur isolés. Les anciens workflows réutilisent la dépendance verrouillée au lieu de réinstaller Playwright hors verrouillage. Résultats CI à consulter sur le commit de ce lot ; aucun résultat navigateur local revendiqué.

Aucun changement des shaders ni de l’interface. Claude conserve son contrôle matériel à 1280 × 585. Le site est public par lien sur demande explicite d’Abdoulaye ; noindex est conservé. Documentation d’accès mise à jour pour éviter de le repasser privé lors d’un relais. Aucun déploiement nécessaire : dépendances de développement, CI et documentation uniquement.
