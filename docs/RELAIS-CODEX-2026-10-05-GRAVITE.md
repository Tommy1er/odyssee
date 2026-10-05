# Contrôle et relais Codex · gravitation continue · 5 octobre 2026

Base : `9d105cdea982ceaf7253d9a3e29daa9eb7e84e3a`, branche commune `main`.

## Corrections de présentation

- L’aide intégrée du cockpit conservait des paragraphes antérieurs aux éphémérides et à la gravitation continue. Elle décrit maintenant les orbites JPL, le domaine Schwarzschild à un corps, l’approximation multi-corps et la compensation fictive de l’autopilote. Le manuel a été corrigé sur les mêmes contradictions résiduelles.
- L’indicateur est renommé « Maintien statique » : sa valeur en g est l’accélération propre nécessaire pour stationner, pas celle ressentie pendant une chute libre géodésique. L’horloge statique affichée est distincte de l’horloge mobile du vaisseau.
- Désactiver la gravitation continue ne désactive pas la région locale à deux corps ou l’expérience radiale. Le libellé et l’aide le précisent maintenant.
- Le moteur gravitationnel de Claude est conservé.

## Tests

- Installation et construction réussies ; les dix suites numériques passent, dont les 21 contrôles de `validate-gravity-field.mjs`.
- Les douze textures passent le décodage intégral et le contrôle d’intégrité.
- `validate-interactions.cjs` original : 21 contrôles réussis (dont rotation du nez, reprise manuelle, dépassement de 0,99 c), puis attente expirée à l’arrivée Proxima. Aucun message d’erreur navigateur. La capture montrait une approche en cours.
- Le script passait plusieurs objets `timeout` dans le deuxième argument de `waitForFunction` (argument du prédicat), au lieu du troisième : ces délais étaient ignorés. Signature corrigée. La rotation attend maintenant un changement réel du nez. Après l’entrée dans l’approche visible, le test accélère explicitement la lecture avant de vérifier l’arrêt. Les seuils physiques sont conservés.
- Suite générale après correction : 31 contrôles réussis, avec lentille de Sagittarius A*, navigation hors de la Galaxie et exoplanète visitable. Interrompue volontairement pendant les captures coûteuses en rendu logiciel ; les contrôles suivants ne sont pas validés dans ce passage. Voir `interactions-gravity-progress.json`.
- Test ciblé `validate-gravity-field-ui.cjs` : **11 contrôles réussis**, sans erreur navigateur/shader. Départ orbital, court arc solaire, horloge mobile, désactivation indépendante des deux champs, mouvement inertiel, arrivée près de Sagittarius A*, chute en vol libre (sans expérience radiale ni orbite locale), ralentissement des horloges et aide intégrée. Résultat : `gravity-field-ui-results.json`.
- Le premier essai du test ciblé imposait une constance du rayon à 10⁻⁵ après plus d’un an dans le champ perturbé des planètes ; ce n’est pas le cas isolé testé numériquement. Le test UI contrôle maintenant un court arc (cadence un jour/seconde), tandis que les tests numériques gardent leurs orbites complètes et leurs tolérances strictes.
- Environnement : Chromium / SwiftShader, rendu logiciel. Ces contrôles ne constituent pas un benchmark GPU ni une certification du modèle multi-corps en champ fort.

Les fichiers de résultats JSON précisent les assertions exécutées. Le site reste hébergé sur le même ChatGPT Site privé. GitHub `main` demeure la référence commune ; prochain travail de Claude : rendu trous noirs/pulsars selon sa feuille de route.
