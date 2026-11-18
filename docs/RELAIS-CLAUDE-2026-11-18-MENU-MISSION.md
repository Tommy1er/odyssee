# Relais Claude — 18 novembre 2026 : menu « Mission ▾ » sur écran court

## Défaut

Sur écran court (bureau, hauteur ≤ 760 px), quand une mission sauvegardée existe, le groupe Mission affichait quatre boutons (« Choisir la Terre », « Choisir la Lune », « Reprendre la mission sauvegardée », « Conserver ce nouveau vol ») : la barre de commandes passait sur deux rangées (117 px) et le ciel tombait à 363–419 px (relevés Iris Xe des 17 novembre, versions 51 et 53).

## Correctif

- `public/cockpit.html` : bouton `#mission-menu` « Mission ▾ » ajouté dans le groupe Mission ; le conteneur des quatre boutons reçoit l'identifiant `#mission-actions`. Les identifiants existants sont inchangés.
- `public/cockpit.css` : hors écran court, `#mission-menu` est masqué et rien ne change. Sur écran court, les quatre choix passent dans un menu ouvert au-dessus de la barre ; une pastille ambre signale une mission sauvegardée en attente ; dans ce cas « Reprendre » et « Conserver » sont listés en premier, sous le titre « Mission sauvegardée disponible ».
- `src/cockpit.js` : le menu s'ouvre seul **une fois** quand une mission sauvegardée attend une décision (observation de l'attribut `hidden` des deux boutons), se replie après un choix, un clic ailleurs ou Échap ; `aria-expanded` est tenu à jour. Aucune logique de mission modifiée.

## Mesures (local, Chromium SwiftShader, 1280 × 585)

| État | Barre de commandes | Ciel | Menu |
|---|---|---|---|
| Sans mission en attente | 65 px, une rangée | 470 px | fermé ; s'ouvre au clic (250 × 92 px au-dessus de la barre) ; se ferme après « Choisir la Lune » |
| Mission en attente (après rechargement) | 65 px, une rangée | 470 px | ouvert seul, pastille ambre, « Reprendre » cliquable |
| Clic dans le ciel | 65 px | 470 px | fermé, pastille conservée |
| « Conserver ce nouveau vol » | 65 px | 470 px | fermé, pastille retirée |
| 1440 × 900 et 390 × 844 | inchangés | — | bouton de menu absent, boutons d'origine visibles |

Capture : `validation/ui/cockpit-1280x585-menu-mission-en-attente.png`.

## Vérifications exécutées

- `node scripts/validate-mission-storage.mjs` : réussi.
- `validate-rendezvous-ui.cjs` (960 × 700, donc écran court : rechargement avec mission sauvegardée puis clic natif sur `#resume-mission`) : réussi, y compris « Mobile : commandes Terre et Lune accessibles » et « Aucune erreur navigateur ni shader ».
- `validate-cockpit-layout-ui.cjs`, `validate-cosmos-context-ui.cjs`, `validate-physics-mobile.cjs` : réussis.
- CI GitHub sur `b2bc90e` : « Reproducible validation from npm ci » relancé à la main (https://github.com/Tommy1er/odyssee/actions/runs/44309335325) — numerical, cockpit, cosmos, journey, propulsion : success. Workflows déclenchés par le commit : source + bundle, mise en page cockpit et instruments, carte cosmique, spectres de galaxies, persistance de mission et nébuleuses : success.
- Non vérifié : Chrome Iris Xe d'Abdoulaye (nécessite publication).
