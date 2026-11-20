# État de publication sur ChatGPT Sites

Ce fichier dit ce qui est **servi sur le site** et ce qui est **sur `main` mais pas encore publié**. GitHub et ChatGPT Sites sont deux services distincts : un push ne publie rien.

Site : https://atlas-stellaire-abdoulaye.abdoul97.chatgpt.site/ (URL et accès public par lien à conserver, ne pas créer de nouveau site).

## ⚠️ En attente de publication

| Commit | Contenu | Poussé le | Vérifications |
|---|---|---|---|
| `2ba60e8` | Tranche 2a : gestes d'observation dans l'essai immersif (cadrer en regard seul, zoom optique, revenir) et session d'essai isolée `?essai=1`. Interface classique inchangée. | 19 nov. 2026 | CI reproductible verte, 8 jobs dont « observation » ; autres workflows verts |
| `59cbeb6` + `18bb5eb` (correctif de test) |  Essai immersif : fiche de sélection (Cadrer, Fiche, Orienter le nez, Engager visibles), statut de résolution au zoom, invariance optique testée, étiquette hors champ et pied du ciel corrigés. Interface classique inchangée. | 19 nov. 2026 | Local : observation 38/38, inventaire 30/30, 6 suites de non-régression ; CI reproductible verte sur `18bb5eb` (8 jobs) |
| `6fc8df5` | Session d'essai seulement (`?essai=1`) : enveloppe du Groupe local et 101 galaxies McConnachie 2012 dans la Carte du cockpit, sélection depuis la carte. Cockpit public et `cosmos.html` inchangés. | 20 nov. 2026 | Local : faisabilité 8/8, observation 38/38, inventaire 30/30, 6 suites de non-régression ; CI verte (9 jobs, dont « cosmicmap ») |
| *Carte Groupe local, suite* (commit « Carte Groupe local : étiquette, UNGC, cadrer la sélection », après `8258c77`) | Session d'essai seulement : étiquette « Groupe local », choix McConnachie / UNGC / les deux sur la Carte, « Cadrer la sélection ». Maquette V3.3 (documentation, rien dans le cockpit). | 20 nov. 2026 | Local : faisabilité 12/12, observation 38/38, inventaire 30/30, 6 suites ; CI : voir le relais |
| `9dbd00d` | Relais `docs/RELAIS-CLAUDE-2026-11-19-TRANCHE2A-OBSERVATION.md` (documentation seulement) | 19 nov. 2026 | — |

**Codex : à publier dès qu'Abdoulaye le demande, ou à lui rappeler s'il ne l'a pas encore demandé.** Après publication, contrôler l'essai `/cockpit.html?ui=immersive&essai=1`. Ne cliquer ni sur « Reprendre la mission sauvegardée » ni sur « Conserver ce nouveau vol » dans la session normale.

## Dernière version servie

| Version | Commit de `main` | Contenu |
|---|---|---|
| v57 | tranche 1 (`258ef12`, relais `2dffd5c`) | Interface immersive en essai (`?ui=immersive`, Classique par défaut), démarrage sans attente d'image en onglet caché |

## Règle

- **Qui pousse du code sur `main`** ajoute une ligne dans « En attente de publication ».
- **Codex, après chaque publication**, déplace les lignes publiées dans « Dernière version servie » (numéro de version, commit réellement construit, date), vide la section d'attente, puis commit et push.
- Un commit purement documentaire peut rester en attente sans bloquer : il ne change rien de visible.
