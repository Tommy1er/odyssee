# Chute radiale : référence de validation — 17 novembre 2026

Le correctif d'empilement de Claude cecffea est conservé. Le parcours CI 44185870834 confirme les 11 premiers contrôles, puis expire sur r < 14,98.

Le test confondait le stand-off isotrope rho = 15 Rs (body-data.js) et le rayon aréolaire de Schwarzschild r = rho (1 + 1/(4 rho))² = 15,5041667 Rs. De plus, la boucle du cockpit plafonne le temps à 0,1 seconde par image ; ce test ne mesure donc pas 90 secondes de simulation sur un GPU logiciel lent.

Reproduction numérique avec les mêmes pas maximaux : 20 images donnent r = 15,4856601 ; l'ancien seuil n'est franchi qu'à la 106e image. Le code RK4 et les équations du cockpit ne sont pas modifiés.

Le test attend maintenant t >= 2 unités Rs/c, puis vérifie une diminution réelle du rayon, une vitesse dirigée vers le centre, tau < t, l'énergie géodésique et la vitesse locale. Il compare le temps propre à la solution analytique indépendante de chute depuis le repos fini : r0 = 1/(1-E²), theta = acos(sqrt(r/r0)), tau = r0^(3/2) [theta + sin(theta) cos(theta)]. Tolérance relative 1e-5. Le délai de sécurité reste 90 secondes. Un état de diagnostic est enregistré en cas d'échec. Ce test ne valide pas les performances sur matériel réel.

Vérifications locales : cinq suites de test:physics réussies, npm run build réussi. Référence analytique vérifiée pour r0 = 4, 15,5041667 et 50, avec erreurs relatives inférieures à 2e-10 pour les échantillons vérifiés. Résultat CI du parcours complet à ajouter après exécution ; aucune réussite anticipée.
