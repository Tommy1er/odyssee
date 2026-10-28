# Retest Iris Xe après 8792f81 (viewport DPR, passe réduite du Groupe local)

Claude, 28/10/2026 vers 13 h 50 UTC. Version publiée, `/cockpit.html?perf=1`. **Machine chargée comme d'habitude** : Abdoulaye travaille sur le PC et ne peut pas fermer ses applications. Les images/s ne sont donc pas interprétées. On compare les **temps GPU par passe** (`EXT_disjoint_timer_query_webgl2`, aucune mesure disjointe), qui restent sensibles à la contention et à la fréquence du GPU. Comparaison à prendre comme ordre de grandeur.

Conditions différentes d'hier : **DPR 1** (hier 1,5), tampon **1341×725** (972 k pixels ; hier 947×900 = 852 k, puis 1051×832).

| | 27/10 (avant 8792f81) | 28/10 (après) |
|---|---|---|
| Démarrage `ready` | 40 s | 84,7 s (cache de programmes froid après publication ; ciel ponctuel 1024 compilé en 18,2 s ; machine chargée) |
| Corps du système en service | — | ≈ 10 s après `ready` |
| Soleil, optique « corps du système » | 8,0 ms (852 k px) | 14,5 ms (972 k px) |
| Tarentule, variante nuage | 26,4 s après l'arrivée | **12,5 s** |
| Tarentule, passe Groupe local réduite | — | prête dès l'arrivée ; `groupReduced` = 2 galaxies (emplacements 2 et 3) |
| Tarentule, dimensions des passes | nuage 474×450 cible / viewport 711×675 (défaut) | nuage **671×363** et groupe **671×363** = moitié exacte de 1341×725 |
| Tarentule, GPU par image | passe nuage 42–52 ms + optique 76–87 ms (dont Groupe local 77,7 ms) ≈ **140 ms** | passe Groupe local **50,1 ms** + passe nuage **25,6 ms** + optique **2,4 ms** ≈ **78 ms** |
| Tarentule, centrage | cœur à ~75 % de la vue, agrandi ×1,5 (DPR 1,5) | **centré sous le repère de la cible** (capture), mais à DPR 1 : la correction DPR n'est pas retestée dans les conditions du défaut |
| Cygnus X-1, programme trou noir | 23,9 s après l'arrivée | **20,2 s**, sans erreur |
| Cygnus X-1, optique trou noir | 26 ms (≈ 875 k px) | 36,5 ms (972 k px) |

## Lecture

- **Tarentule : environ ×1,8 sur le GPU** (140 → 78 ms) malgré 14 % de pixels en plus. Le nuage est bien divisé (42–52 → 25,6 ms).
- **La passe du Groupe local reste le poste principal** : 50 ms à demi-résolution, contre 77,7 ms en plein écran. Le gain n'est que de ×1,55 pour 4 fois moins de pixels. Le coût n'est donc pas proportionnel aux pixels (marche de 64 pas × `gfbm` par pas pour 2 galaxies traversées, ou effet de la contention). Pistes : pas adaptatifs ou sortie anticipée quand la transmission est faible, un quart de résolution pour un volume qui couvre tout l'écran, ou moins d'octaves de `gfbm` pour les pas lointains, sous réserve du budget lumineux.
- **Cygnus X-1** : pas de régression ; la compilation du trou noir (20–44 s selon les essais) reste le point d'attente notable. L'anticipation n'est pas faite.
- Aucune erreur, aucune perte de contexte, aucun bandeau d'erreur sur l'ensemble du parcours.

## Reste à vérifier

- Centrage du nuage **à DPR 1,5** (écran de la veille), puisque le défaut n'existait que pour DPR ≠ 1.
- Images/s dans une session moins chargée, si elle devient possible ; Abdoulaye ne peut pas s'y engager.

Aucun changement de code par Claude.
