# Maquettes UI V3 — à arbitrer écran par écran

Maquettes statiques des trois espaces prévus par `docs/conception/CHARTE-UI-V3.md`, chacun en bureau (1280×760) et en téléphone (390×844). Elles servent à trancher l'organisation **avant** toute refonte CSS du cockpit. Aucune n'est branchée sur le code de l'application.

| Espace | Bureau | Téléphone |
|---|---|---|
| Explorer (cockpit) | `Explorer.html` · `Explorer.png` | `Explorer-mobile.html` · `Explorer-mobile.png` |
| Observatoire (fiche d'objet) | `Observatoire.html` · `Observatoire.png` | `Observatoire-mobile.html` · `Observatoire-mobile.png` |
| Carte cosmique (échelle continue) | `Carte.html` · `Carte.png` | `Carte-mobile.html` · `Carte-mobile.png` |

Les fichiers HTML s'ouvrent seuls dans un navigateur (polices Inter et JetBrains Mono par Google Fonts) ; les liens entre espaces fonctionnent. L'original éditable est une maquette Claude privée d'Abdoulaye, avec les notes de principes et la correspondance avec le cockpit actuel.

## Partis pris

- **Explorer** : le ciel occupe le centre ; tiroir Navigation à gauche (filtres, liste, cible sélectionnée), télémétrie essentielle toujours visible à droite et le reste en volets repliés (Relativité & lumière, Instruments d'observation, Gravitation, Risques du milieu, Laboratoire *fiction*, Journal) ; une seule barre de commandes basse. Toutes les fonctions actuelles y ont une place ; aucune n'est retirée.
- **Observatoire** : fiche à deux niveaux (Découverte puis Scientifique), tableau Grandeur / Valeur / Source avec statut de provenance par ligne ; bandes IR, radio et X étiquetées « modèle » ; l'image de télescope réelle n'est promise que par Aladin Lite chargé à la demande (lot ultérieur).
- **Carte cosmique** : une seule carte à échelle continue, du Système solaire à l'Univers observable, avec rail d'échelle, référentiel supergalactique, échelle graphique, position du vaisseau et couches séparées. Les bassins d'attraction restent une *surcouche reconstruite*, jamais un mur lumineux. Cette carte remplacerait les vues Vaisseau 3D, Carte galactique 3D et Structures cosmiques.
- Partout : statut Observé / Modèle calculé / Reconstitution / Fiction visible sur la scène, texte ≥ 12 px, chiffres en monospace tabulaire, cibles tactiles ≥ 44 px au téléphone.

## Valeurs affichées

Les chiffres de M87 (16,4 Mpc, 1 284 km/s, 6,5 × 10⁹ M☉, SGX/SGY/SGZ) et de trajet (0,9831 c, γ 5,44, 34,6 ans à bord) servent à remplir les maquettes : ils sont plausibles mais n'ont pas été recalculés par le moteur. Les captures PNG sont des rendus Chromium (Playwright) des fichiers HTML de ce dossier.
