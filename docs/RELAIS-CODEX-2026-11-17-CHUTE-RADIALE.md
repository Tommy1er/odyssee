# Chute radiale : référence de validation — 17 novembre 2026

Le correctif d'empilement de Claude cecffea est conservé. Le parcours CI 44185870834 confirme les 11 premiers contrôles, puis expire sur r < 14,98.

Le test confondait le stand-off isotrope rho = 15 Rs (body-data.js) et le rayon aréolaire de Schwarzschild r = rho (1 + 1/(4 rho))² = 15,5041667 Rs. De plus, la boucle du cockpit plafonne le temps à 0,1 seconde par image ; ce test ne mesure donc pas 90 secondes de simulation sur un GPU logiciel lent.

Reproduction numérique avec les mêmes pas maximaux : 20 images donnent r = 15,4856601 ; l'ancien seuil n'est franchi qu'à la 106e image. Le code RK4 et les équations du cockpit ne sont pas modifiés.

Le test attend maintenant t >= 2 unités Rs/c, puis vérifie une diminution réelle du rayon, une vitesse dirigée vers le centre, tau < t, l'énergie géodésique et la vitesse locale. Il compare le temps propre à la solution analytique indépendante de chute depuis le repos fini : r0 = 1/(1-E²), theta = acos(sqrt(r/r0)), tau = r0^(3/2) [theta + sin(theta) cos(theta)]. Tolérance relative 1e-5. Le délai de sécurité reste 90 secondes. Un état de diagnostic est enregistré en cas d'échec. Ce test ne valide pas les performances sur matériel réel.

Vérifications locales : cinq suites de test:physics réussies, npm run build réussi. Référence analytique vérifiée pour r0 = 4, 15,5041667 et 50, avec erreurs relatives inférieures à 2e-10 pour les échantillons vérifiés. Résultat CI du parcours complet à ajouter après exécution ; aucune réussite anticipée.


## Verdict CI et publication

Run https://github.com/Tommy1er/odyssee/actions/runs/44188391118 sur ee6fbe4411aa4315d71cc17f0386ca8aa67a6926 : les cinq jobs réussissent (numérique, cockpit, cosmos, propulsion, voyage cosmologique). Le job cockpit 134410911408 termine les 17 contrôles, sans erreur navigateur ou shader. Artifact 14375189037.

Mesure CI : r0 = 15,504167445938892 ; r = 15,497506546681176 ; t = 2,6163502951879916 ; tau = 2,530543331951475 ; référence analytique tau = 2,5305433319520327 ; vitesse locale = 0,005443636481678695 c. La chute fonctionnait : le défaut était le seuil absolu du test et sa dépendance à la cadence du rendu logiciel. Le test ne valide pas la fluidité sur un GPU matériel.

Version Sites 52 publiée, résultat natif succeeded le 17 novembre 2026 à 22:25:42 UTC.
Source Sites : 99689df4c2a8d9fbe6d815bd724a2def98a197c1.
Version : appgprj_6aaed9890f1c8191ac977fe0fadcc659~appgver_49ebfef8ccd48191ba63df13c3e6d970.
Déploiement : appgdep_6afcd45a0d5c81919d4816af98feb170.
URL : https://atlas-stellaire-abdoulaye.abdoul97.chatgpt.site

Cette publication comprend le correctif d'empilement de Claude cecffea et les changements de tests/documentation jusqu'à ee6fbe4. Audience publique conservée conformément à la demande d'Abdoulaye. Claude peut maintenant contrôler l'empilement sur Iris Xe. Aucun nouvel essai matériel par Codex dans cette session. Téléphone différé.
