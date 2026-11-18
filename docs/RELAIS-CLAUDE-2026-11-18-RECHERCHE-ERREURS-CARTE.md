# Relais Claude — 18 novembre 2026 : classement de la recherche et tri des erreurs de la Carte cosmique

Feu vert technique de Codex (même jour) : « Mars » avant « Marsic » sans perdre les correspondances par alias ; sur la Carte, notification `ResizeObserver` en console, perte de contexte et exception bloquante toujours visibles.

## 1. Recherche du cockpit

Avant : `renderList()` gardait les objets dont `[nom, hôte, alias]` contient la requête, **sans tri** quand la requête n'est pas vide (ordre du catalogue, 100 premiers). Signalé par Astra (« Mars » / « Marsic »).

Après (`src/search-rank.js`, utilisé par `renderList()`) : même critère d'inclusion (nom, alias, hôte), requête normalisée (minuscules, accents retirés, espaces de bord retirés), puis classement :

1. nom exact · 2. alias exact · 3. nom commençant par la requête · 4. alias commençant par la requête · 5. mot du nom commençant par la requête · 6. mot d'un alias · 7. sous-chaîne du nom · 8. sous-chaîne d'un alias · 9. hôte seulement (ex. « Saturne » → Titan).

À rang égal : distance du **système** (une planète ou une lune prend la distance de son astre parent, car sa propre distance inclut un petit décalage orbital), puis l'astre principal avant ses satellites, puis le nom le plus court. La recherche vide garde le tri existant (distance, ou ordre du parcours). Les filtres de catégorie restent ignorés pendant une recherche, comme avant.

## 2. Erreurs de la Carte cosmique

Avant : `window.addEventListener('error', …)` de `src/cosmos.js` envoyait **toute** erreur de fenêtre au panneau WebGL. Reproduit par Codex avec des événements injectés (`008d80a`).

Après : `isBenignWindowError()` (`src/render-diagnostics.js`) écarte vers la console :
- les notifications `ResizeObserver loop limit exceeded` / `ResizeObserver loop completed with undelivered notifications` ;
- les erreurs de scripts d'une autre origine (`Script error.` sans objet d'erreur, fichier hors de l'origine du site : extensions, bandeau de l'hébergeur).

Tout le reste s'affiche comme avant, notamment une exception de la carte au démarrage. La perte et l'échec de création de contexte WebGL passent par les écouteurs du canvas (`monitorWebGL`), que ce correctif ne modifie pas.

## 3. Test ajouté

`scripts/validate-search-and-map-errors.cjs` (`npm run test:ui:search`, ajouté à `test:ui` et à la matrice de « Reproducible validation from npm ci ») : 24 contrôles.
- Filtre isolé : 2 formes de `ResizeObserver`, `Script error.`, script d'extension → ignorés ; erreur de la carte et erreur sans fichier → conservées.
- Cockpit, vrai catalogue : « Mars » → planète Mars en premier, Marsic présent après ; « mars » en minuscules et entouré d'espaces → idem ; « Marsic » → Marsic ; alias exacts « HIP 32349 » → Sirius, « 7Kap Her » → Marsic, « Sol » → Soleil ; « proxima » → Proxima Centauri avant ses planètes ; « Saturne » → Saturne, ses lunes trouvées par l'hôte ; « bételgeuse » → Betelgeuse ; recherche vide → Soleil en tête ; aucune erreur de page.
- Carte, événements injectés : pas de panneau au démarrage ; `ResizeObserver` → pas de panneau ; `Script error.` → pas de panneau ; `ReferenceError` de `cosmos.js` → panneau ; `webglcontextlost` → panneau.

Premier essai : « proxima » plaçait « Proxima Cen b » et « Proxima Cen d » avant l'étoile (même rang, distances quasi égales, nom plus court). Corrigé par la distance du système et la priorité de l'astre principal.

## Vérifications exécutées

Local (Chromium SwiftShader, Playwright préinstallé) :
- `validate-search-and-map-errors.cjs` : 24/24 (résultat : `validation/search-and-map-errors.json`).
- Réussis (code 0) : `validate-cosmos.cjs`, `validate-cosmos-context-ui.cjs`, `validate-rendezvous-ui.cjs` (recherche et clics de destination Terre / Lune), `validate-cockpit-layout-ui.cjs`, `validate-physics-mobile.cjs`.
- `validate-physics-ui.cjs` (parcours cockpit complet, utilise la recherche) : verdict pris sur la CI après ce commit.

## Non vérifié

Déclenchement spontané de la notification `ResizeObserver` sur la Carte dans le Chrome d'Abdoulaye ; rendu sur Iris Xe après publication.
