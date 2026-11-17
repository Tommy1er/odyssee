# Tests reproductibles — 17 novembre 2026

Playwright 1.56.1 est maintenant une dépendance de développement épinglée, avec package-lock généré par npm. Une installation propre locale npm ci a réussi et require('playwright/package.json').version retourne 1.56.1. Les navigateurs s’installent séparément via npm run test:ui:install (ou :ci sous Linux pour les dépendances système).

Commandes : test:physics (cinq suites cœur), test:ui (build + quatre parcours séquentiels), test:all (ces deux groupes). Ces noms ne revendiquent pas tous les validateurs spécialisés ni une validation physique exhaustive. La nouvelle CI vérifie ces commandes depuis npm ci avec quatre jobs navigateur isolés. Les anciens workflows réutilisent la dépendance verrouillée au lieu de réinstaller Playwright hors verrouillage. Résultats CI à consulter sur le commit de ce lot ; aucun résultat navigateur local revendiqué.

Aucun changement des shaders ni de l’interface. Claude conserve son contrôle matériel à 1280 × 585. Le site est public par lien sur demande explicite d’Abdoulaye ; noindex est conservé. Documentation d’accès mise à jour pour éviter de le repasser privé lors d’un relais. Aucun déploiement nécessaire : dépendances de développement, CI et documentation uniquement.

## Résultats exécutés et défaut restant

- Installation propre locale `npm ci` réussie, Playwright 1.56.1 chargé.
- Lot initial 4039205 : les neuf workflows existants déclenchés ont réussi (dont spectres, mission, layout, cosmologie, propulsion, deux bancs gamma et carte). Nouvelle suite : cinq validateurs numériques réussis ; parcours cosmos, propulsion, voyage cosmologique réussis.
- Le nouveau parcours cockpit a d’abord révélé une fenêtre de stabilisation trop courte pour deux actions Playwright séparées sous SwiftShader : l’ouverture instable échoue après 3,52 s. 3543f4f déclenche les deux handlers DOM dans la même tâche en vérifiant que les boutons sont disponibles et visibles. Cela teste le handler, pas la faisabilité temporelle d’un clic humain. Le passage stable et l’échec instable restent actionnés normalement.
- Second défaut : après arrivée à Mars, le panneau `#navigation-hud` intercepte les clics sur `#ship-focus`. ced2f54 teste le repli par le vrai bouton. Le repli passe, mais le panneau compact intercepte encore les clics. Aucun clic forcé ni masquage du panneau ajouté.

Preuve du dernier essai : https://github.com/Tommy1er/odyssee/actions/runs/44101257785
Jobs numériques, cosmos, propulsion et voyage cosmologique : success.
Job cockpit 134101538407 : failure. Le journal identifie `#navigation-phase` dans `#navigation-hud.arrived.compact` comme intercepteur à 1536 × 1040. Artifact : 14336283322.

Ce défaut d’interface reste ouvert et le workflow reste rouge à dessein. Le prochain correctif doit empêcher le chevauchement des commandes du vaisseau et du suivi, développé comme compact, puis relancer ce même parcours. Ne pas remplacer le clic natif par force/dispatch pour masquer ce défaut. Cette note n’affirme aucune validation complète du cockpit ni nouvelle mesure Iris Xe. Le contrôle matériel de Claude à 1280 × 585 reste distinct. Aucun changement de rendu ou déploiement applicatif par ce lot.
