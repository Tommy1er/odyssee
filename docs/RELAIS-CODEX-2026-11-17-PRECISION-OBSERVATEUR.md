# Relais Codex — isolation de la précision du rayon observateur

## Résultat et portée

Diagnostic numérique CPU sur la formule `observerRayGLSL` présente dans le main
`b614e6e3d8870ce3b7a1a03bc2f05ed7e4fc094d`. Aucun shader, CSS, bundle ou site publié
modifié. Les limites GPU précédemment documentées restent ouvertes.

Commande sans dépendance externe :

```sh
node scripts/diagnose-observer-precision.mjs
```

Ajouter `--write` pour régénérer le rapport
`validation/reports/observer-precision-isolation-2026-11-17.json`.

## Cause isolée

À gamma 10^8, avec l'axe [0.6, 0, -0.8], les trois directions correspondant aux
angles 0, 10^-9 et 10^-8 rad deviennent exactement le même triplet après conversion
Float32 : [0.6000000238418579, 0, -0.800000011920929]. Le banc GPU existant transmet
ces directions comme colonne avant de sa matrice caméra. La perte existe donc
avant l'exécution du shader : réordonner seulement les opérations sur ces mêmes
uniformes ne permet pas de distinguer ces trois rayons.

Cette collision concerne les entrées du banc, avec le pixel central. Elle ne
mesure pas la projection de tous les pixels d'une caméra réelle, ni un rendu complet.

## Comparaison sur la grille historique de 98 cas

Seuils inchangés : direction euclidienne < 0.005, erreur absolue log2(D) < 0.005.

| Calcul CPU | Cas dans les seuils | Erreur direction maximale | Erreur log2(D) maximale |
| --- | ---: | ---: | ---: |
| Formule en Float64, entrées initiales | 98/98 | 0.00004433 | 0.000006580 |
| Entrées Float32, calcul ensuite Float64 | 88/98 | 2.000 | 29.082 |
| Entrées et opérations arrondies Float32 | 90/98 | 1.990 | 6.658 |
| Candidat : projection CPU dans le repère du boost avant conversion | 98/98 | 0.00006157 | 0.00003196 |

Les étapes ne forment pas une décomposition additive des erreurs. Les arrondis
peuvent parfois se compenser : le calcul Float64 après quantification n'est pas
nécessairement plus proche de la référence. `Math.fround` ne reproduit pas toutes
les libertés GLSL (fusion, réassociation, normalisation du pilote). Le résultat
90/98 reproduit le nombre du banc GPU historique, sans constituer une nouvelle
mesure GPU.

La référence utilise directement demi-angle et rapidité à partir de l'angle
initial. Les calculs comparés ne réutilisent pas les fonctions de physique de
production. Le candidat reste un calcul expérimental de rayons individuels,
sans code de production ni promesse de performance.

## Correction à développer et conditions avant publication

Préparer côté CPU la projection de la base caméra dans un repère orthonormé du
boost. Envoyer les petites coordonnées transverses indépendamment des grandes
composantes longitudinales ; effectuer l'aberration dans ce repère puis tourner
le rayon final vers le catalogue. Il faudra vérifier les sommes des colonnes
de la vraie matrice caméra hors du pixel central, et le partage des uniformes
entre composition finale, CloudPass et GroupPass.

Le prochain banc doit exercer cette chaîne complète sur plusieurs axes, champs
et pixels, avec l'optique désactivée, au repos et à faible vitesse aussi. Conserver
le banc historique et ses huit limites, puis comparer les résultats GPU sans
élargir les seuils. Les bancs HDR, spectres et parcours cockpit restent distincts.
Les données présentes ne valident pas le ciel complet à gamma 10^12.

## Coordination UI

Le dernier relais `docs/RELAIS-CODEX-2026-11-17-TESTS-REPRODUCTIBLES.md` conserve
un échec réel : `#navigation-hud.arrived.compact` intercepte le clic natif sur
`#ship-focus` après arrivée à Mars, à 1536 × 1040. Le test reste rouge. Claude
conserve le lead UI/UX ; ce diagnostic ne modifie pas son CSS et ne masque pas
l'interception.
