# État de publication sur ChatGPT Sites

Ce fichier dit ce qui est **servi sur le site** et ce qui est **sur `main` mais pas encore publié**. GitHub et ChatGPT Sites sont deux services distincts : un push ne publie rien.

Site : https://atlas-stellaire-abdoulaye.abdoul97.chatgpt.site/ (URL et accès public par lien à conserver, ne pas créer de nouveau site).

## ⚠️ En attente de publication

| Commit | Contenu | Poussé le | Vérifications |
|---|---|---|---|
| *Carte niveau 2* (commit « Carte cosmique niveau 2… », après `09ea771`) | Session d'essai seulement : niveau « Voisinage de la Vierge » sur la Carte du cockpit, catalogue selon l'échelle, Cosmicflows-4 sur la Carte. Retouche partagée sans effet public : étiquettes du Groupe local masquées au-delà de 33 millions d'al. | 20 nov. 2026 | Local : Carte 20/20 + 12 suites ; CI : voir le relais |

## Dernière version servie

| Version | Commit de `main` | Publié le | Par | Contenu |
|---|---|---|---|---|
| **v58** | `2f50f95` (commit Sites `4efec54`, même arborescence) | 20 nov. 2026 | Claude, via l'éditeur Codex de ChatGPT Sites | Tout ce qui était en attente : tranches 2a et 2b, Carte Groupe local (essai), rangée basse A, retrait de « Privé », distances McConnachie, manifeste `.openai/hosting.json` |

Vérifié après publication par Claude sur le Chrome du propriétaire : `cockpit.html?ui=immersive&essai=1` en immersif avec le badge « Essai · sauvegarde isolée », la rangée basse A et la fiche de sélection ; aucune mention « Privé » ; démarrage à froid sur l'Iris Xe : 32,9 s jusqu'à l'interface, dont 23,4 s de préparation GPU. Codex a vérifié l'accueil et `cosmos.html`.

Commits publiés en v58 :

| Commit | Contenu | Poussé le | Vérifications |
|---|---|---|---|
| `2ba60e8` | Tranche 2a : gestes d'observation dans l'essai immersif (cadrer en regard seul, zoom optique, revenir) et session d'essai isolée `?essai=1`. Interface classique inchangée. | 19 nov. 2026 | CI reproductible verte, 8 jobs dont « observation » ; autres workflows verts |
| `59cbeb6` + `18bb5eb` (correctif de test) |  Essai immersif : fiche de sélection (Cadrer, Fiche, Orienter le nez, Engager visibles), statut de résolution au zoom, invariance optique testée, étiquette hors champ et pied du ciel corrigés. Interface classique inchangée. | 19 nov. 2026 | Local : observation 38/38, inventaire 30/30, 6 suites de non-régression ; CI reproductible verte sur `18bb5eb` (8 jobs) |
| `6fc8df5` | Session d'essai seulement (`?essai=1`) : enveloppe du Groupe local et 101 galaxies McConnachie 2012 dans la Carte du cockpit, sélection depuis la carte. Cockpit public et `cosmos.html` inchangés. | 20 nov. 2026 | Local : faisabilité 8/8, observation 38/38, inventaire 30/30, 6 suites de non-régression ; CI verte (9 jobs, dont « cosmicmap ») |
| `9ada4da` | Session d'essai seulement : étiquette « Groupe local », choix McConnachie / UNGC / les deux sur la Carte, « Cadrer la sélection ». Maquette V3.3 (documentation, rien dans le cockpit). | 20 nov. 2026 | Local : faisabilité 12/12, observation 38/38, inventaire 30/30, 6 suites ; CI verte (9 jobs) |
| `0bc341a` | **Visible pour tous** : étiquette « Privé » retirée du cockpit, de Structures cosmiques et de l'accueil (décision du propriétaire). Essai immersif : rangée basse variante A. Session d'essai : provenance des doublons McConnachie / UNGC sur la Carte. | 20 nov. 2026 | Local : observation 50/50, Carte 14/14, inventaire, 8 suites ; CI verte (9 jobs + 5 workflows) |
| `d20e0a8` | **Visible pour tous** : 99 galaxies du Groupe local placées à leur distance McConnachie 2012 (M32 au voisinage de M31), UNGC 2013 en seconde source dans la fiche. Décision du propriétaire. | 20 nov. 2026 | Local : catalogue 21/21 + 10 suites navigateur ; CI reproductible verte (9 jobs, run 44769060629) |
| `9dbd00d` | Relais `docs/RELAIS-CLAUDE-2026-11-19-TRANCHE2A-OBSERVATION.md` (documentation seulement) | 19 nov. 2026 | — |

Précédente : v57, tranche 1 (`258ef12`, relais `2dffd5c`), commit Sites `d3b7855`.

## Règle

- **Qui pousse du code sur `main`** ajoute une ligne dans « En attente de publication ».
- **Après chaque publication**, celui qui publie (Codex ou Claude) déplace les lignes publiées dans « Dernière version servie » (numéro de version, commit réellement construit, date), vide la section d'attente, puis commit et push.
- Un commit purement documentaire peut rester en attente sans bloquer : il ne change rien de visible.
