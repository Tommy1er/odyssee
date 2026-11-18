# Maquettes UI V3.2 — Explorer : le ciel d'abord, mesuré

Suite de la V3.1 (`../maquettes-v3.1/`) après la réponse du Head à la Note Master (`docs/audits/task-force-2026-11-18/REPONSE_HEAD_UIUX_V1.md`, addendum V1.1) et le GO du propriétaire du 18 novembre. Format de référence : **1280 × 585** (fenêtre réelle, Iris Xe) et 390 × 844.

Planches de conception, **non branchées au moteur**. Les fonds sont les rendus réels du moteur de la V3.1 (même dossier d'images).

| Planche | Fichier | Ciel non occulté |
|---|---|---|
| Immersion, objet sélectionné | `Explorer32.html` | **83,7 %** |
| Immersion, sans sélection | `Explorer32-libre.html` | **88,1 %** |
| Vue extérieure en trajet | `Explorer32-exterieur.html` | 85,7 % |
| Alerte prudente (assistance, D10) | `Explorer32-alerte.html` | 80,6 % |
| Préparer puis engager (D13) | `Explorer32-preparer.html` | 71,0 % |
| Téléphone | `Explorer32-mobile.html` | 69,4 % |

Références, même méthode et même fenêtre : cockpit actuel 37,8 % (vol libre, `validate-feature-inventory.cjs`) ; V3.1 Immersion 74,9 % ; prototype Qwen V2 Immersion 77,3 %. Méthode : `scripts/measure-sky-occlusion.cjs` (union des rectangles, grille 4 px). C'est une mesure géométrique, à juger avec les captures (`.png`) et à l'œil sur l'Iris Xe.

## Ce qui change par rapport à V3.1

- **Télémétrie dans une pastille supérieure** : état, vitesse, γ, distance restante, temps à bord, temps de référence. Idée reprise du prototype Qwen V2.
- **Pilotage en quatre pastilles basses de 44 px** : Mission ▾ · temps (pause, vitesse de lecture) · propulsion (Poussée / Inertie / Freiner) · vue (Cockpit / Vaisseau, touche V ; Cinéma, touche C).
- **Fiche de sélection compacte**, avec « Préparer le trajet » au lieu d'« Engager » en un clic.
- **Préparer ≠ engager (D13)** : le devis affiche profil, distance, vitesse maximale, γ, temps à bord, temps de référence et les hypothèses du calcul. Le vaisseau ne part qu'après « Engager le trajet ».
- **Assistance (D10)**, classe « alerte prudente » : limite de Roche de Saturne calculée simplement, notification sans action automatique, accès direct aux réglages d'assistance.
- **Aucun texte sous 12 px** (contrôle automatique), aucun chevauchement entre pastilles.

## Valeurs

Les valeurs de vol sont illustratives. Une exception : le devis vers Titan est recalculé. 1,2 million de km à 1 g avec retournement à mi-chemin donne t = 2√(d/a) = 6 h 09 min, une vitesse maximale de 0,00036 c et γ − 1 ≈ 6,5 × 10⁻⁸ (relativité restreinte, gravité de Saturne non intégrée, comme l'indique la planche).
