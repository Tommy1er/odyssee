# Revue du zoom cosmique et diagnostic du démarrage

Base Claude : 81f96460943cc5564191cf5c2873ed9cc04ef657. Revue demandée par Abdoulaye avant publication.

## Revue

Les volumes de la carte reçoivent maintenant groupTint ; les repères M31/M33 reprennent le modèle et l’orientation du cockpit. Les limites de l’aperçu, la rotation illustrative, l’exposition automatique et l’absence de catalogue de galaxies au-delà d’environ 800 Mpc sont affichées. La sphère d’horizon est un repère comobile, pas un relevé de galaxies.

Un défaut résiduel de priorité du clic a été corrigé : le point de catalogue ne doit l’emporter sur le symbole de galaxie que s’il satisfait **les deux** conditions (distance ≤ 4 px et distance ≤ moitié de celle au centre du symbole). Le rejet utilisait `&&`, autorisant à tort certains points satisfaisant une seule condition ; il utilise maintenant `||`.

## Erreurs de démarrage signalées

La cause sur le Chrome d’Abdoulaye reste inconnue sans son diagnostic. Aucun redémarrage ou changement de réglage de son navigateur n’a été effectué ici. Les pages affichent désormais le message d’erreur exact dans « Afficher le diagnostic ». Un échec explicite de création de contexte WebGL est distingué d’une erreur d’application. Le message de la carte ne déclare plus automatiquement une panne 3D pour toute exception JavaScript. Les détails sont insérés comme texte, jamais comme HTML.

## Validation

- 13 contrôles de modèles de volumes et 44 contrôles DOM/OrbitControls réussis localement.
- Diagnostic : distinction entre échec de contexte et erreur d’application, conservation du message, échappement du HTML et remplacement d’un ancien message vérifiés.
- Compilation réussie.
- Nouveau workflow `cosmic-map.yml` : test WebGL du clic M31, zoom à 30 % du rayon, pixels lumineux du volume, rotation et arrêt, horizon, rayon 500 Mpc et largeur mobile ; test existant de navigation carte → cockpit en parallèle sur un autre runner.
- Le délai du test existant passe de 60 à 240 secondes pour laisser le rendu logiciel terminer les captures, sans supprimer ses assertions. Une capture d’échec indisponible ne masque plus l’erreur initiale.

## Résultats graphiques du lot

Le run GitHub 39936474155, sur ee02a5ac452583eb01f056d3be77cb91174ca4e4, réussit ses deux suites : 11 contrôles du nouveau zoom et 10 contrôles de navigation carte → cockpit, sans erreur JavaScript ou GLSL. La dernière capture du cockpit est maintenant produite avec succès.

Les captures M31, intérieur, horizon, mobile et cockpit ont été examinées. Le volume est lumineux ; à 30 % du rayon, l’intérieur reste une lueur diffuse, pas un champ d’étoiles résolues. La vue mobile ne déborde pas horizontalement, mais les repères restent denses à grande échelle.

Artefacts : 12494246837 (`validate-cosmos-zoom-ui`) et 12493449587 (`validate-cosmos`). Les deux fichiers de résultats propres à leurs suites contiennent une liste d’erreurs vide. L’ancien `cosmos-results.json` embarqué dans l’artefact de zoom n’est pas utilisé comme preuve du test de navigation.

La compilation GitHub réussit aussi (39936473986), et le commit automatique cbc23beeaad9829e4de3b6a55b0b54b5c1561f4e contient les bundles reconstruits. Tous les fichiers suivis de cet état ont été comparés à la copie destinée à Sites : aucune différence.

Les suites plus larges du ciel et de la mission, déclenchées par le raccordement du diagnostic au cockpit, sont suivies séparément. Le rendu logiciel ne remplace pas un essai sur le GPU physique de l’utilisateur ; la cause de son ancienne erreur n’est pas identifiée ici.
