# Relais Claude — 17 novembre 2026 : empilement du bas du ciel (suivi du trajet / options du vaisseau)

## Défaut corrigé

Signalé par Codex (`b614e6e`) : après l'arrivée à Mars, en vue Vaisseau 3D, `#navigation-hud` intercepte le clic natif sur `#ship-focus` (« Cadrer le vaisseau »), même replié.

Reproduit localement avec `node scripts/validate-physics-ui.cjs` (échec identique : `#navigation-phase` de `#navigation-hud.arrived.compact` intercepte les événements de pointeur).

Cause : quatre couches positionnées en absolu au bas du ciel (légende `.canvas-foot`, `#local-tools`, `#navigation-hud`, `#ship-options`) ont chacune un `bottom` fixe, redéfini par une dizaine de règles successives selon la largeur. En vue Vaisseau 3D, `#ship-options` (bottom 90–100 px) et le suivi (bottom 84–90 px) occupaient la même bande. Mesuré avant correctif, en vue Vaisseau 3D après arrivée à Mars, suivi replié :

| Fenêtre | Options du vaisseau (haut–bas) | Suivi (haut–bas) | Élément sous le centre de « Cadrer le vaisseau » |
|---|---|---|---|
| 1536 × 1040 | 743–800 | 759–800 | `navigation-hud` |
| 1280 × 585 | 373–430 | 393–436 | `ship-focus` (chevauchement visuel quand même) |
| 960 × 700 | 380–492 | 455–498 | `ship-focus` (chevauchement visuel quand même) |

À 1280 × 585, la légende de bas de ciel passait aussi sur deux lignes sous la manœuvre locale.

## Correctif (`src/cockpit.js`)

Au bureau (`min-width: 901px`), une fonction `stackViewportBottom()` empile de bas en haut : légende → manœuvre locale → suivi du trajet → options du vaisseau, chacune 6 px au-dessus de la hauteur **réelle** de la précédente (seules les couches affichées comptent). Un `ResizeObserver` sur le ciel et ces quatre couches la relance quand une couche apparaît, disparaît, se replie, se déplie ou passe à la ligne. Sous 901 px, les styles en ligne sont retirés et les règles CSS mobiles s'appliquent comme avant. Aucun clic forcé, aucun panneau masqué, aucune modification du test.

Après correctif (mêmes conditions) :

| Fenêtre | Options du vaisseau | Suivi | Manœuvre locale | Légende | Sous « Cadrer le vaisseau » |
|---|---|---|---|---|---|
| 1536 × 1040 | 675–732 | 769–810 | 816–846 | 852–872 | `ship-focus` |
| 1280 × 585 | 311–368 | 383–426 | 432–462 | 468–502 | `ship-focus` |
| 960 × 700 | 304–416 | 445–488 | 494–524 | 530–564 | `ship-focus` |

Captures de contrôle examinées aux trois tailles (non versionnées) : plus aucun chevauchement.

## Vérifications exécutées (local, Chromium SwiftShader)

- `npm run test:physics` : réussi (cinq suites numériques).
- `validate-physics-ui.cjs` (parcours cockpit de Codex, **non modifié**) : les cinq contrôles jusqu'au repli du suivi passent, puis **les clics natifs sur « Vaisseau 3D », « Cadrer le vaisseau » et « Vue dégagée » passent** (le défaut signalé est levé). L'exécution s'arrête ensuite sur `page.screenshot` de `physics-ship.png` : délai de 90 s dépassé après « fonts loaded ». C'est le blocage de capture Playwright déjà rencontré dans ce bac à sable avec le cockpit WebGL (Playwright préinstallé, pas la version 1.56.1 épinglée, absente de `node_modules` ici). Deux essais d'une copie locale remplaçant seulement la capture par `Page.captureScreenshot` se sont arrêtés plus tôt (attente de `closeupModel.ready`, étape que l'exécution originale avait passée) : instabilité SwiftShader locale, non attribuée au correctif. **Verdict à prendre sur la CI GitHub**, qui utilise la version épinglée.
- Réussis (code de sortie 0) : `validate-cosmos.cjs` (10 contrôles), `validate-propulsion-ui.cjs`, `validate-cosmic-flight-ui.cjs`, `validate-cockpit-layout-ui.cjs` (bancs 1440×900, 1200×780, 960×700), `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs`, `validate-cosmology-ui.cjs`.
- Non vérifié : rendu sur le Chrome Iris Xe d'Abdoulaye (nécessite publication).

## Verdict CI (version épinglée)

Exécution manuelle de « Reproducible validation from npm ci » sur `cecffea` : https://github.com/Tommy1er/odyssee/actions/runs/44185870834

- numerical, browser (propulsion), browser (journey), browser (cosmos) : success.
- browser (cockpit) : failure, **mais plus loin** : 11 contrôles passent au lieu de 5. Les clics natifs « Vaisseau 3D » → « Cadrer le vaisseau » → « Vue dégagée » passent, puis « Ship has dedicated supersampled render », « Engine animation responds to actual thrust », « Engine is off during coast », « External retarded-light comparison still renders », « Black-hole passage completed », « Static gravity experiment integrates a slower proper clock ». **Le défaut d'interception est donc levé sur la CI.**
- Nouvel arrêt (ligne 18) : après le clic sur `#gravity-fall`, `flightSnapshot().gravity.r` ne descend pas sous 14,98 en 90 s (« Radial free fall changes position and local speed »). Le clic lui-même a abouti (pas d'interception signalée). Étape jamais atteinte auparavant par cette CI ; pas de lien établi avec l'empilement (qui ne modifie que `style.bottom` de quatre couches). À instruire côté expérience de gravité ou rythme de simulation sous SwiftShader : relais à Codex.
- Autres workflows déclenchés par `cecffea` : source + bundle, carte cosmique, persistance de mission / nébuleuses : success.

## Contrôle matériel — version 53 (Chrome d'Abdoulaye, Iris Xe, fenêtre 1280 × 585, DPR 1,5)

- Code servi : `cockpit.js` publié contient l'empilement (`.canvas-foot` interrogé) ; démarrage GPU prêt (`gpuStartupDiagnostic().ready`) relevé à t ≈ 37 s.
- Saut stable vers Mars, suivi replié, vue Vaisseau 3D. Mesures (haut–bas, px CSS) : options du vaisseau 282–339, suivi 346–388, manœuvre locale 394–424, légende 430–451, ciel 50–469 ; document 585 (aucun défilement). Élément sous le centre de « Cadrer le vaisseau » : `ship-focus`.
- **Clic réel** de la souris sur « Cadrer le vaisseau » : le cadrage s'applique (vaisseau et Mars recadrés), pas de défilement. Capture : `validation/ui/cockpit-irisxe-v53-1280x585-vaisseau3d-mars.jpg`.
- Reste ouvert (prochain lot UI) : avec une mission sauvegardée, la barre de commandes fait deux rangées ; le ciel n'a plus que 419 px et la pile du bas (≈ 170 px) recouvre le bas du vaisseau. Correctif prévu : menu « Mission ▾ » en écran court.
