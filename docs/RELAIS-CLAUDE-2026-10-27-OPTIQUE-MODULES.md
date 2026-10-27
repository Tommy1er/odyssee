# Optique par modules : cause du blocage Iris Xe et correction (Claude, 27/10/2026)

Base : a450d51 (6f32354 inclus). Correction faite par Claude à la demande d'Abdoulaye, avant l'intervention de Codex.

## Constat sur le GPU concerné (Intel Iris Xe, ANGLE D3D11)

`/cockpit.html?gpuTrace=1` sans cible, version publiée avec 6f32354 : les 18 faces se terminent. « Optique ordinaire (sans traceur de trou noir) » est soumise à t = 70 s et reste `en cours` à t = 236 s. Aucune perte de contexte, aucune image du ciel. Retirer le traceur de trou noir ne suffisait pas.

## Découpage mesuré sur ce GPU

La source exacte de `ordinaryMaterial` (générée en Node) a été compilée dans des contextes WebGL2 séparés du Chrome d'Abdoulaye, avec `COMPLETION_STATUS_KHR`. Une constante unique par essai contourne le cache de programmes d'ANGLE : un essai non protégé était revenu en 4 s par effet de cache.

| Programme | Compilation |
|---|---|
| ciel de base (cube, CMB, Doppler) | 0,1 s |
| + comètes / + Groupe local / + nuages (séparément) | 0,2 s / 0,8 s / 6,7 s |
| + système, 1 seul `systemRadiance` | 45,2 s |
| même chose sans `localRadiance` | 0,9 s |
| `localRadiance` ×1 | 16,7 s |
| `localRadiance` ×1 et `shadeSurface` ×1 | 6,9 s |
| hypothèses écartées : dérivées dans la boucle `secAlbedo` (54,9 s) ; `starlightAt` dans `secondaryHit` (37,7 s) ; boucle pulsar 24 → 1 (15,7 s au lieu de 16,7 s) | |

Cause : FXC inline chaque appel. `main` appelait `systemRadiance` deux fois, celle-ci appelait `localRadiance` deux fois, qui appelait `shadeSurface` deux fois, soit environ 8 copies de la texture procédurale (`terrainColor`, des centaines de `noise3`) dans un seul programme. Les modules réunis se compilent de façon non additive.

## Corrections (aucune équation modifiée)

1. **Un seul appel par niveau.** `localRadiance` calcule la normale, le gain et la couverture dans ses deux branches (étoile à neutrons / cas normal), puis appelle une seule fois `shadeSurface`. `systemRadiance` appelle une seule fois `localRadiance`, avec le même fond et le même ordre de composition.
2. **Un seul `systemRadiance` dans `main`.** La composition système/gros plan est affine dans son fond : `S(B) = E + sysT·B`. La transmission `sysT` est cumulée à chaque `mix` (disque `1−sCov`, atmosphère `1−opacity`, anneau `1−tau`, secondaire `1−a`), et les ajouts (lueurs, faisceaux) ne la modifient pas. L'ancien `S(L+G)−S(L)` devient donc `sysT·G`.
3. **Programmes par module.** Variantes « ciel profond », « corps du système », « nuage », « corps du système + nuage », plus « trou noir » (tous les modules et le traceur, attendue comme avant). Ce sont les mêmes conditions que `render()` : corps résolu (`bodyKind>.5 || secCount>.5`), nuage sélectionné à portée, lentille d'un trou noir. Uniforms partagés, programmes en cache.
   - Le premier rendu n'attend que le ciel profond. Les corps et les nuages se compilent en arrière-plan. En attendant, l'affichage utilise le programme compilé le plus proche (qui contient tous les modules requis s'il existe, sinon celui déjà affiché). **Conséquence visible : sur Iris Xe, un corps proche ou un nuage peut apparaître environ 15 s (ou 12 s) après l'arrivée, au lieu d'un ciel figé.** Sur un GPU rapide, le délai est imperceptible.
   - `pixelAngle` (lu aussi par les comètes) est déclaré seul quand le module système est absent.

## Vérifications exécutées

- **Équivalence au pixel** (Chromium + SwiftShader, rendu RGBA32F 96×96, ancien programme complet contre nouvelles variantes, mêmes uniforms et textures) : planète type Terre avec atmosphère, anneau et 3 secondaires (dont un non résolu), avec et sans galaxies en surimpression ; aberration et Doppler relativistes ; géante style 2 de près ; étoile ; étoile à neutrons (Beloborodov, faisceaux, bande 6) ; secondaires seuls ; nuage actif ; ciel profond.
  - Différence maximale : **0 exactement** sans surimpression, **≤ 9,2×10⁻⁷** avec (arrondi de `sysT·G` au lieu de `S(L+G)−S(L)`).
  - Les variantes partielles sont identiques à la variante complète dans leur domaine.
- **Compilation sur le Chrome Iris Xe d'Abdoulaye** (sources des nouvelles variantes, contextes séparés, cache contourné) : ciel profond **1,4 s**, corps du système **15,3 s**, nuage **11,6 s**. Avant : plus de 166 s sans fin.
- Node : `validate-optics-variants` (réécrit : démarrage ciel profond, arrière-plan avec repli compilé, pas de double compilation, trou noir attendu, uniforms partagés, sources des variantes), `validate-galaxy-spectral-overlay` (ordre `G` / système / Doppler / ajout, `sysT` présent, un seul `systemRadiance`), `validate-optics`, `validate-compact`, `validate-eclipses`, `validate-immersion`, `validate-nebula-points`, `validate-catalogue-ui` : PASS. `npm run build` OK.
- Navigateur SwiftShader `validate-cosmos-context-ui` (direct, `?target=m31`, `?gpuTrace=1`) : 12 vérifications, aucune erreur (démarrage et dessin, 18 faces avant la première image, libellé « Optique ordinaire (… », pas de trou noir, perte et restauration de contexte). SwiftShader ne reproduit pas le compilateur D3D : le retest sur Iris Xe reste indispensable.

## Retest du cockpit publié sur Iris Xe (27/10/2026, version publiée par Codex avec 852788b)

- `/cockpit.html?gpuTrace=1`, sans cible : `ready: true` vers 26 s, sans étape ouverte ni perte de contexte. Voie lactée 128 (compilation 0,6 s), fond diffus 256, ciel ponctuel 1024 (3,7 s), 18 faces, puis **« Optique ordinaire (ciel profond) » en 2,2 s**. Ciel affiché (Voie lactée visible), environ 30 images/s, bandeau d'erreur masqué.
- À t ≈ 100 s, une instrumentation temporaire de `gl.useProgram` sur le contexte du cockpit montre que le programme optique dessiné est la variante **corps du système** (`shadeSurface` présent, ni nuage ni traceur). Elle a donc compilé en arrière-plan et pris le relais sans bloquer l'affichage.
- `/cockpit.html` (démarrage normal) : `ready` à 19,4 s (chargement de page inclus), ciel profond en 0,9 s. Le programme corps du système est utilisé à partir de 38,9 s, soit environ 19,5 s après la première image, avec le ciel profond affiché entre-temps.
- Non testés ici : approche d'un trou noir (variante complète, attendue), nébuleuse sélectionnée de près, parcours carte → cockpit.

## Reste à faire

- La variante trou noir contient encore tous les modules et le traceur : son temps de compilation sur Iris Xe n'est pas mesuré et peut rester long (elle est attendue, comme avant 6f32354).
- Les durées mesurées sont celles de l'en-tête reconstitué, pas à l'octet près celui de three. Les rapports sont nets.

## Trois essais complémentaires sur Iris Xe (27/10/2026, version publiée, une seule session Chrome)

Instrumentation temporaire injectée dans la page : changement de programme optique (`gl.useProgram`), images par seconde (rAF), retard de la boucle d'événements (intervalle de 250 ms), tâches longues et, ponctuellement, temps GPU par dessin (`EXT_disjoint_timer_query_webgl2`). Les passages vers la Tarentule et Cygnus X-1 utilisent le laboratoire « trou de ver stable » (téléportation fictive à la distance de rendez-vous). La mission enregistrée (`odyssee.mission.v1`, 23/10) n'a pas été modifiée.

| Essai | Délai jusqu'au bon programme | Erreurs | Réactivité |
|---|---|---|---|
| 1. Carte `/cosmos` → clic M31 → « Ouvrir Andromède · M31 dans le cockpit » | ciel profond à 16,8 s, corps du système à 23,3 s (6,5 s après) | aucune, pas de perte de contexte | démarrage saccadé jusqu'à ~45 s (1 à 16 i/s, une tâche longue de 2,7 s), puis **20–28 i/s** stables ; optique système 3,4 ms GPU par image |
| 2. Passage vers la Tarentule (arrivée à 1 680 al du centre) | variante « nuage » **7,8 s** après l'arrivée ; volume visible ensuite | aucune | 2–4 i/s pendant la compilation (une tâche longue de 0,76 s) ; **4 i/s en régime établi** : l'optique avec nuage coûte **122 ms GPU par image** (marche de 72 pas plein écran à 1051×832) |
| 3. Passage vers Cygnus X-1 (15 rayons de Schwarzschild, lentille active) | variante trou noir complète **30,7 s** après l'arrivée (attendue, ciel figé pendant ce temps) | aucune, pas de perte de contexte | boucle d'événements réactive pendant la compilation (un seul blocage de 1,7 s, sinon < 0,5 s) ; **≈ 2–5 i/s en régime établi** alors que l'optique trou noir ne coûte que 10,6 ms GPU et que les tâches longues ne représentent que 0,7 s sur 6 s : cause non identifiée (les requêtes de temps ne couvrent ni les copies, ni les mipmaps, ni les lectures) |

Conclusions :
- Les trois parcours qui risquaient un blocage aboutissent, sans erreur ni perte de contexte. La correction par modules couvre aussi la Tarentule et le trou noir.
- Il reste des chantiers de **performance**, distincts de la compilation : (a) démarrage saccadé pendant environ 45 s ; (b) marche du nuage à 122 ms par image sur Iris Xe (piste : demi-résolution hors écran puis suréchantillonnage, ou nombre de pas adaptatif) ; (c) environ 5 i/s près de Cygnus X-1 pour une cause encore inconnue, à profiler (copies du cube, `generateMipmap`, intégration de la géodésique côté processeur).

## Profil complet sur Iris Xe, version publiée antérieure à 74b5800 (27/10/2026 après-midi)

Mesure de référence **avant** la passe nuage réduite et la correction de cadence des cubes de Codex : la version en ligne dessinait encore l'optique avec `nebulaMarch` en plein écran. Le profileur, injecté dans la page puis retiré, enveloppe toutes les méthodes du contexte WebGL2 du cockpit pendant 5–8 s. Il relève le temps CPU de chaque appel et le temps GPU (`EXT_disjoint_timer_query_webgl2`, aucune mesure disjointe ni perdue) de chaque dessin, effacement, copie, mipmap, transfert et lecture, avec la cible (écran, face de cube, cible hors écran) et le programme. La session est unique, sans rechargement, enchaînant Soleil → Tarentule → Cygnus X-1 par le passage stable.

| Lieu | i/s (médiane / p95 par image) | GPU mesuré par image | Détail GPU | CPU |
|---|---|---|---|---|
| Soleil (départ, ~2 ua) | **24,2** (33 / 83 ms) | 12,1 ms | optique « corps du système » 5,0 ms ; faces de cube 1024 ≈ 5,6 ms (1,9 face par image) | appels GL 0,5 ms ; tâches longues 9,3 ms par image |
| Tarentule (variante « nuage » 13,6 s après l'arrivée) | **6,0** (167 / 317 ms) | 158 ms | **optique + nuage plein écran 145 ms (92 %)** ; cubes ≈ 8,5 ms (6 faces par image) | appels GL 1,5 ms ; tâches longues 39 ms par image |
| Cygnus X-1, 15 R_s (programme trou noir **43,7 s** après l'arrivée, aucune erreur ni perte de contexte) | **21,3** profilé, **22,4** sans profileur sur 8 s (33 / 84–100 ms) | 14,3 ms | optique trou noir (avec système et nuage) 8,2 ms ; faces de cube ≈ 4,5 ms (2,1 faces par image) | appels GL 0,6 ms ; tâches longues 9,5 ms par image |

Lecture :
- **Tarentule** : le nuage plein écran fait l'essentiel du coût GPU. Sa marche à résolution réduite (74b5800 / c345ca9) vise donc le bon poste. Une fois le nuage traité, il restera environ 13 ms de GPU et environ 40 ms de tâches longues côté processeur par image.
- **Cygnus X-1 : les 2–5 i/s du matin ne se reproduisent pas.** Avec le même enchaînement Tarentule → Cygnus X-1 sans rechargement et la même version publiée, la cadence est de 21–22 i/s et le GPU n'est pas saturé (14 ms). La lenteur du matin était donc passagère ou liée aux conditions de mesure (instrumentation plus lourde alors : surveillance continue, intervalle de 250 ms). Elle n'est pas propre au rendu du trou noir. La correction de cadence des cubes de Codex reste utile (Tarentule : 6 faces par image), mais elle ne repose plus sur une lenteur démontrée à Cygnus X-1.
- **Compilation du trou noir** : 30,7 s le matin, 43,7 s l'après-midi. Elle reste la plus longue et elle est attendue avec le ciel figé. La compiler par anticipation (par exemple dès que la cible est un trou noir, avant la proximité) éviterait cette attente sans la raccourcir.
- Ces chiffres serviront de référence au retest de la version contenant 74b5800 / c345ca9 (`?perf=1`).
