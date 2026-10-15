# Consultation étendue à tous les objets de la carte cosmique

Suite à `f69e3c2`, Abdoulaye demande d’étendre le rapprochement à tous les autres objets consultables. Ce lot reste sur la carte cosmique ; il ne lance pas la refonte du cockpit.

## Comportements

- Toutes les entrées des trois catalogues ont un aperçu volumétrique sélectionnable : module `map-galaxy-preview.js`, qui réutilise exactement le GLSL de classes du cockpit (`local-group.js`) et `galaxyObject`. Un seul modèle détaillé existe à la fois, à la position nominale du catalogue, sans simulation de voyage.
- Cadrage et limite de rapprochement suivent le rayon du modèle ; « Observer le modèle » reste à l’extérieur et « Vue d’ensemble » montre le voisinage. Les rayons UNGC sont utilisés quand ils existent ; les tailles typiques, inférences de classe, orientations et éclats illustratifs sont indiqués dans la fiche.
- Le point sélectionné disparaît lorsque son volume est visible ; les modèles de repère M31/M33/M87/Voie lactée qui feraient doublon sont masqués pendant l’aperçu. Le calcul de position relative se fait en double précision avant transfert GPU, y compris à grande distance.
- Les groupes, amas, superamas, régions d’attraction et vides sont cadrés selon leur étendue. La sélection change aussi le niveau et recharge le catalogue adapté si le choix est « Selon l’échelle ». Une nouvelle sélection de structure efface les filtres de catalogue qui pouvaient laisser une vue vide.
- Les neuf bassins reconstruits sont enregistrés comme sélections : étiquette, légende, recherche après chargement, ou clic sur leur surface. Leur attracteur publié est le pivot et leur géométrie détermine le cadrage. Leurs fiches citent les données 2023 et signalent les trois bassins tronqués. Aucun lien cockpit fictif n’est créé pour ces nouvelles identités.
- Les gestes de clic répété, wheel et pincement sur les étiquettes restent communs.

## Validation

- `node scripts/validate-map-preview.mjs` : 8 contrôles ; toutes les entrées des trois catalogues produisent un modèle fini avec provenance de classe et taille, un seul volume actif, origine lointaine stable et masque du point sélectionné.
- `node scripts/validate-catalogue-ui.mjs` : 40 contrôles DOM avec le vrai OrbitControls, dont types de structures, M81, M87, neuf bassins et sélection d’une surface reconstruite.
- `node scripts/validate-extragalactic.mjs` : 20 contrôles des données, coordonnées et géométrie.
- Build reconstruit avec `npm run build`.

Pas de test GPU disponible ici. Le fragment volumétrique est celui du cockpit ; son nouveau passage de rendu dans la carte doit être vérifié sur écran. Recette : catalogue UNGC → MESSIER081 ; CF4 → PGC 41361 ; pincer, cliquer le modèle et le nom, changer de galaxie ; niveaux Laniakea et grands vides → cliquer les noms des neuf bassins. Vérifier la lisibilité sur mobile.

Les modèles de classe ne sont pas des photographies, leur brillance est amplifiée pour consultation et n’est pas photométrique. Les autres galaxies restent des points tant qu’elles ne sont pas sélectionnées. Les régions étendues ne deviennent pas des astres compacts. La caméra de carte ne déplace pas le vaisseau ; le changement de page conserve les limites existantes de sauvegarde de mission.

## Intégration au dernier main

À la reprise, `516c1f9` (photométrie de Claude) a été ajouté sur main. Ses sources ont été reprises et ses fichiers photométriques régénérés à partir des références : hashes Git identiques à ceux publiés par Claude. L’aperçu de carte reste volontairement une consultation à éclat illustratif, indiquée comme telle ; le ciel photométrique du cockpit est conservé. Les 8 contrôles d’aperçu et 40 contrôles d’interface ont été relancés sur cette base, ainsi que les 13 contrôles de photométrie de Claude.
