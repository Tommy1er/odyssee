# Émetteurs imbriqués : budget de référence et contrat d'intégration

Base GitHub vérifiée : `2f464101a21b1f5fcea6c750eee5b3970d885e88`.
Le comparateur spectral est publié sur le Site privé. Ce lot prépare la priorité 3 du relais `RELAIS-CODEX-2026-10-17-FLRW-NURSERIES.md` : redistribuer la lumière des complexes inclus dans une galaxie.

**État : noyau comptable implémenté et testé, pas encore branché au rendu. Le double comptage visuel n'est donc PAS corrigé par ce lot.** Aucune modification du cockpit, des shaders, des magnitudes de catalogue ou des bundles. La préparation constitue une étape distincte de la future intégration GPU.

## Audit des données réellement utilisées

`local-group.js` calibre les volumes fixes à partir d'une magnitude V totale. `nebulae.js` calibre séparément les complexes avec leur propre V. `extragalactic-nebulae.js` ne leur attribue actuellement qu'un hôte textuel. La transition point/volume d'une galaxie existe déjà : `volumeWeight`, `handoff`, attribut `shown` des points. Elle ne résout pas le chevauchement galaxie/complexe.

| Hôte / complexe | V hôte (modèle) | V complexe (modèle) | Flux complexe / hôte | Excès potentiel si addition entière |
| --- | ---: | ---: | ---: | ---: |
| Grand Nuage de Magellan / Tarentule | 0,40 | 4,00 | 3,6308 % | −0,03872 mag |
| M33 / NGC 604 | 5,72 | 11,50 | 0,4875 % | −0,00528 mag |

Ces résultats sont des **calculs sur les paramètres du modèle**, pas une mesure de l'image actuelle. Ils supposent un même observateur solaire, une même bande V, une même convention d'extinction, une ouverture englobant l'hôte et une contribution du complexe intégralement incluse. La sélection, l'occultation, le rendu procédural et les transferts peuvent changer l'écart réel à l'écran.

Sources relues le 20 octobre 2026 :

- NASA Caldwell 103 donne une magnitude apparente 4,0 : https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-caldwell-catalog/caldwell-103/ . La page ne fournit pas de réponse de filtre, d'ouverture photométrique ni de décomposition gaz/étoiles permettant de certifier notre budget Johnson V.
- Le 11,5 de NGC 604 est expressément une estimation personnelle d'observateur, non une mesure instrumentale : https://www.webbdeepsky.com/nebulae-clusters/2020/nebula-cluster/october . Il reste illustratif.
- Les V des hôtes sont les constantes du code existant, attribuées à RC3/NED ; leur provenance n'est pas ré-auditée dans ce lot.

## Noyau livré

`src/emission-budget.js` fournit `partitionEmission`, fonction pure, sans Three.js ni accès au stockage. Elle utilise les identifiants stables des hôtes et enfants. Pour chaque enfant i :

```
r_i = 10^[-0,4 (m_i − m_hôte)]
c_i = a_i r_i
h = 1 − somme(c_i)
point_hôte = (1 − w) h
volume_hôte = w h
point_hôte + volume_hôte + somme(c_i) = 1
```

`a_i` est la fraction du complexe effectivement représentée séparément ; `w` est la transition point/volume de l'hôte. Un complexe absent ou non chargé doit avoir `a_i=0` : la galaxie conserve alors son allocation. **Ne pas confondre absence de représentation et invisibilité par poussière** : une absorption physique intervient ensuite dans le transfert, elle ne doit pas recréer la lumière dans l'hôte.

Les valeurs sont des parts de flux V au point de référence, pas des gains GPU universels. Le noyau refuse magnitudes non finies, poids hors [0,1], mauvais hôte, auto-appartenance, doublons, ratios non représentables et somme d'enfants supérieure à la totalité de l'hôte. Il ne masque pas un budget incohérent en l'écrêtant. Le demandeur doit garantir des enfants immédiats disjoints : les identifiants seuls ne détectent pas deux ouvertures astronomiques qui se recouvrent.

Les résultats exposent aussi l'excès qu'aurait une addition naïve, pour le futur diagnostic. Ils ne modifient jamais les objets du catalogue.

## Pourquoi ne pas appliquer simplement 0,9637 à tout le Nuage ?

1. **Bande spectrale.** Une répartition V ne décompose pas un spectre KC96 de galaxie en spectre résiduel + raies H II. À 0,99 c, la pondération visible seule ne conserve pas le budget observé. Soustraire des RGB après exposition serait incorrect. Il faut construire les composantes spectrales avant Doppler et tone mapping, et vérifier qu'aucun résidu spectral négatif n'est créé.
2. **Espace et poussière.** Diminuer uniformément la galaxie retire aussi de la lumière loin de la région concernée. C'est une approximation de calibration globale, pas une excavation physique du volume. Une allocation locale nécessite un noyau spatial normalisé et une règle d'occultation commune. Les extinctions de premier plan actuellement retenues pour hôte et enfant diffèrent ; ne pas soustraire un flux désextincté à un flux observé.
3. **Point de vue.** Les distances hôte/enfant diffèrent. Une normalisation vue du Soleil ne garantit pas le flux depuis l'intérieur de M33. Chaque composante doit ensuite avoir sa position, son cône de lumière et son transfert. Le changement de résolution seul ne doit jamais changer l'énergie attribuée.
4. **Gaz et étoiles.** Le V du complexe ne mesure pas uniquement le gaz. Il ne faut pas ajouter ensuite une population stellaire normalisée à la même totalité. La fraction continuum actuelle est un paramètre de rendu, pas une séparation mesurée.

## Contrat du prochain lot de rendu

1. Introduire un registre d'appartenance stable `tarantula → lmc`, `ngc604 → m33` avec bande, observateur, convention d'extinction, ouverture et statut de provenance ; conserver les magnitudes originales.
2. Définir une approximation spatiale et spectrale explicite. Commencer par le repos solaire en V, en signalant le périmètre ; ne pas généraliser automatiquement aux bandes IR/X/radio ni au transfert relativiste.
3. Faire consommer le **même** budget aux points historiques, à l'overlay HDR, aux volumes hôtes et aux complexes. La disponibilité d'un enfant et l'allocation doivent changer dans la même frame. Le fallback près de Sgr A* ou dans un nuage ne doit ni perdre ni doubler l'allocation.
4. Tester le flux intégré en espace linéaire avant tone mapping avec enfants à 0/25/50/75/100 %, hôte à 0/50/100 % volume, changements de cible, chargement différé, occultation et repli. Séparer les tolérances de quadrature/rendu de l'incertitude des données. Conserver la continuité M33 point/volume déjà validée.
5. Ensuite seulement : tests aux vitesses modérées, comparateur 0/0,99 c, captures et publication. La cosmologie FLRW du vrai trajet reste un chantier distinct.

## Vérifications de ce lot

- `node scripts/validate-emission-budget.mjs` : **12 contrôles réussis**, dont une grille de **10 201 combinaisons** résolution enfant / transition hôte, cas invalides et calcul des deux couples du catalogue.
- Les tests vérifient une identité de flux de référence, pas une photométrie GPU ou une exactitude empirique.
- Workflow dédié `emission-budget.yml`, lecture seule, sans rebuild ni commit automatique. Son résultat distant est à contrôler après l'envoi.
- Aucune validation navigateur nécessaire à ce module non importé ; aucune nouvelle validation GPU revendiquée. Le Site conserve la version graphique validée `2f46410`.
