# État de publication sur ChatGPT Sites

Ce fichier dit ce qui est **servi sur le site** et ce qui est **sur `main` mais pas encore publié**. GitHub et ChatGPT Sites sont deux services distincts : un push ne publie rien.

Site : https://atlas-stellaire-abdoulaye.abdoul97.chatgpt.site/ (URL et accès public par lien à conserver, ne pas créer de nouveau site).

## ⚠️ En attente de publication

| Commit | Contenu | Poussé le | Vérifications |
|---|---|---|---|
| `5898c44` | ⛔ **NE PAS PUBLIER avant le GO explicite du propriétaire.** Ouverture publique V3.0 : immersif par défaut sur ordinateur (Classique accessible et mémorisé), Carte cosmique, S2, pulsar et Odyssée-02 pour tous, manuel mis à jour. Session d'essai conservée. | 24 nov. 2026 | Local : voir `docs/RELAIS-CLAUDE-2026-11-24-OUVERTURE-V3.0.md` § 3. CI sur `8b13cb8` (même code) : 8 exécutions réussies, dont « Reproducible validation from npm ci » lancé à la main (run 45374826094, 10 jobs) et par le push (run 45374826098), « Cockpit layout and observation instruments » et « Independent relativistic rocket benchmarks » |

## Dernière version servie

| Version | Commit de `main` | Publié le | Par | Contenu |
|---|---|---|---|---|
| **v64** | `e79f516557bf901f6fdbc0a799cc0db0ab404fa8` (commit Sites `0570e482239a7056314b1df0f8a989b88c4ab34e`, même arborescence) | 23 nov. 2026 à 15:43 UTC | Codex | Carte d’essai : atténuation des points CF4 fondée sur les zones denses pour améliorer la lisibilité du cœur de Laniakea. |

Vérifié après publication : `index.html`, `cosmos.html` et `cockpit.js` servis sont identiques au build. La fluidité aux grandes échelles et la comparaison des vaisseaux sur Iris Xe restent à mesurer, avec Chrome au premier plan.

Lot publié en v64 :

| Commit | Contenu | Poussé le | Vérifications |
|---|---|---|---|
| `797a8c0` | Session d'essai seulement : réglage de la représentation adaptative CF4 (le cœur de Laniakea ne sature plus sur Iris Xe). | 23 nov. 2026 | Local : Carte 44/44. CI sur `555781d` (même code) : 3 exécutions réussies, dont « Reproducible validation from npm ci » lancé à la main (run 45204741333) et par le push (run 45204741417) |

## Historique des versions précédentes

| Version | Commit de `main` | Publié le | Par | Contenu |
|---|---|---|---|---|
| **v63** | `7c37c63a5a99055e7106580a5e855fe215330977` (commit Sites `9adb9434ba1e4b866cd9f2a55e882eecf62e4ca6`, même arborescence) | 23 nov. 2026 à 15:11 UTC | Codex | Carte d’essai : symboles galactiques adaptés aux grandes échelles et Cosmicflows-4 par défaut à la Vierge. Documentation : état V3.0 et retrait de la note temporaire. |

Vérifié après publication : les fichiers de l’accueil, de Cosmos et du cockpit correspondent au build. Dans Chrome, le cockpit affiche « Essai · sauvegarde isolée » et la Carte charge Cosmicflows-4 (55 877 galaxies) au niveau « Voisinage de la Vierge » avec le réglage « Selon l’échelle ». Le rendu aux grandes échelles et les mesures sur Iris Xe restent à vérifier.

Lot publié en v63 :

| Commit | Contenu | Poussé le | Vérifications |
|---|---|---|---|
| `356f7fe` | Session d'essai seulement : symboles CF4 adaptés aux grandes échelles (fin de la saturation), Cosmicflows-4 par défaut au niveau Vierge (chargé à l'ouverture du niveau). Sans effet visible pour les visiteurs. Documentation : état canonique V3.0, note temporaire supprimée. **À vérifier sur Iris Xe après publication.** | 23 nov. 2026 | Local : Carte 44/44, observation 61/61, recherche 24/24, contexte cosmos. CI sur `d7f4ef3` (même code) : 6 exécutions réussies, dont « Reproducible validation from npm ci » lancé à la main (run 45198128381) et par le push (run 45198129602) |

| Version | Commit de `main` | Publié le | Par | Contenu |
|---|---|---|---|---|
| **v62** | `1431ea094ea507a514b708a5468ec0097198e2e0` (commit Sites `2022b39fdecd22105def3323f95ae5f75bd2a529`, même arborescence) | 23 nov. 2026 à 12:00 UTC | Codex | Démonstrateur de pulsar en session d’essai et contrôle du sens des lignes de courant Cosmicflows-4. |

Vérifié après publication dans Chrome : accueil, `cosmos.html`, badge de sauvegarde isolée et fiche de Vela (intervalle de 89,3 ms sur le cône, aucune impulsion hors du cône). Les fichiers `cockpit.js` et `cosmos.js` servis correspondent au build. Le contrôle géométrique CF4 est couvert par les tests du lot.

Lot publié en v62 :

| Commit | Contenu | Poussé le | Vérifications |
|---|---|---|---|
| `130ba83` | Session d'essai seulement : démonstrateur pulsar dans la fiche (courbe de lumière calculée, Vela 89,3 ms) ; contrôle du sens des lignes de courant CF4. Partout, sans effet visible attendu : géométrie du faisceau des pulsars partagée par le rendu (mêmes valeurs qu'avant) ; `cosmos.js` reconstruit. | 23 nov. 2026 | Local : optique 31/31, observation 61/61, Carte 40/40. CI sur `106fd12` (même code) : 7 exécutions réussies, dont « Reproducible validation from npm ci » lancé à la main (run 45163679596) et par le push (run 45163676968) |

| Version | Commit de `main` | Publié le | Par | Contenu |
|---|---|---|---|---|
| **v61** | `435083a3e4cbbb1a5660a2fa00fa3e6faba15d03` (commit Sites `2c1da2e533156d95991fcf83993282aad247b1ac`, même arborescence) | 23 nov. 2026 à 10:49 UTC | Codex | Session d’essai : banc de mesure `shipBenchmark()` pour comparer Odyssée-01 et Odyssée-02 dans la même page. |

Vérifié après publication dans Chrome : accueil et `cosmos.html` accessibles, cockpit classique actif avec Odyssée-01, badge « Essai · sauvegarde isolée » visible avec `?essai=1`. Le fichier `cockpit.js` servi est identique au fichier construit. La mesure comparative sur Iris Xe reste à faire.

Lot publié en v61 :

| Commit | Contenu | Poussé le | Vérifications |
|---|---|---|---|
| `700de2e` | Session d'essai seulement : banc `shipBenchmark()` pour comparer Odyssée-01 et Odyssée-02 dans la même page ; relais v60 (parcours S2 vérifié en ligne). Partout, sans effet visible : la préparation du modèle du vaisseau est factorisée (`SpacecraftView.prepare`). | 23 nov. 2026 | Local : observation 59/59. CI sur `a8f561e` (même code) : 6 exécutions réussies, dont « Reproducible validation from npm ci » lancé à la main (run 45152378408) et par le push (run 45152376590) |

| Version | Commit de `main` | Publié le | Par | Contenu |
|---|---|---|---|---|
| **v60** | `e65d8376969a7eb6c8b906add0a2df9c26295704` (commit Sites `d954c7207385dc4b772d9f4edf1f47b787ea6c11`, même arborescence) | 23 nov. 2026 à 08:58 UTC | Codex | Session d’essai : devis en fenêtre basse, couches CF4 masquées par défaut, précession relativiste et caméra dédiée de S2, comparaison des vaisseaux et statut des trous noirs non résolus. |

Vérifié après publication dans Chrome : accueil et `cosmos.html` accessibles, cockpit classique actif avec Odyssée-01, badge « Essai · sauvegarde isolée » visible avec `?essai=1`. Le parcours interactif S2 sur Iris Xe reste à vérifier.

Lots publiés en v60 :

| Commit | Contenu | Poussé le | Vérifications |
|---|---|---|---|
| `358a034` | Essai immersif seulement : le devis du trajet défile dans une fenêtre basse au lieu de recouvrir les onglets. Relais des mesures v59 sur Iris Xe. | 22 nov. 2026 | Local : observation 57/57. CI sur `71379b9` (même code) : 4 exécutions réussies, dont « Reproducible validation from npm ci » lancé à la main (run 45061101554) et « Cockpit layout and observation instruments » |
| `db4867f` | Session d'essai seulement : bassins et flux CF4 en deux cases, **masqués par défaut** (décision du propriétaire), animation facultative ; démonstrateur S2 (précession relativiste 12,2′/révolution) ; `?vaisseau=01` pour comparer les vaisseaux. Statut « non résolu » pour un trou noir de moins d'un pixel (texte affiché seulement dans l'interface immersive, en zoom ; l'interface classique ne change pas). | 22 nov. 2026 | Local : Carte 39/39, observation 58/58, S2 6/6, optique 25/25, inventaire 30/30 ; `validate-physics-ui.cjs` échoue localement sur une capture, aussi sur HEAD. CI sur `226696f` : 7 exécutions réussies au push, dont « Reproducible validation » (job cockpit vert) ; le job s2 lancé à la main a d'abord échoué (lecture avant la première image), corrigé en `275755e`, puis « Reproducible validation » vert sur `275755e` (run 45073444170, 10 jobs) |
| `1243241` | Session d'essai seulement : vue d'observation de S2 (bouton « Observer l'orbite de S2 ») : orbite entière à 3 000 ua et péricentre ; avec la relativité, les deux passages sont séparés de 12,18′, soit 0,42 ua, visibles au zoom sans amplification. Caméra seule, vaisseau intact. | 22 nov. 2026 | Local : S2 11/11, observation 58/58, inventaire 30/30, mise en page, physique mobile, stockage, optique 25/25. CI sur `2ead424` (même code) : 7 exécutions réussies, dont « Reproducible validation from npm ci » lancé à la main (run 45080758582, 10 jobs dont s2) et par le push (run 45080758933) |

| Version | Commit de `main` | Publié le | Par | Contenu |
|---|---|---|---|---|
| **v59** | `874d4d357a1d73490a0fceef336a55e4e369b077` (commit Sites `3e1b5eb8ed7c11c65932834326297756b13e0ff2`, même arborescence) | 22 nov. 2026 à 19:10 UTC | Codex | Carte cosmique en session d’essai, Préparer/Situer, vaisseau Odyssée-02 en essai et notes de conception de ChatGPT. |

Vérifié après publication dans Chrome : accueil et `cosmos.html` accessibles, Odyssée-01 affiché dans le cockpit classique, badge « Essai · sauvegarde isolée » visible avec `?essai=1`. Puis par Claude le 22 novembre sur le Chrome de bureau du propriétaire (Iris Xe) : essai immersif, Odyssée-02, devis, Carte aux cinq niveaux ; mesures dans `docs/RELAIS-CLAUDE-2026-11-22-V59-IRIS-XE.md`.

Commits publiés en v59 :

| Commit | Contenu | Poussé le | Vérifications |
|---|---|---|---|
| `4434a85` | Session d'essai seulement : niveau « Voisinage de la Vierge » sur la Carte du cockpit, catalogue selon l'échelle, Cosmicflows-4 sur la Carte. Retouche partagée sans effet public : étiquettes du Groupe local masquées au-delà de 33 millions d'al. | 20 nov. 2026 | Local : Carte 20/20 + 12 suites ; CI verte (9 jobs + 6 workflows) |
| `1d71601` | Session d'essai seulement : sélecteur de niveau (4 niveaux de `cosmos.html`), CF4 selon l'échelle, bassins et lignes de courant CF4 2023 sur la Carte. **Coût de rendu à mesurer sur Iris Xe avant toute ouverture publique.** | 21 nov. 2026 | Local : Carte 25/25 + 9 suites ; CI reproductible verte (9 jobs) |
| `c1556c7` | Session d'essai seulement : panneau « Carte cosmique · essai », filtres de distance et d'incertitude, plan supergalactique, légende des bassins. | 21 nov. 2026 | Local : Carte 31/31 + 9 suites ; CI reproductible verte (9 jobs) |
| `8ebd712` | Essai immersif : « Préparer le trajet » ouvre un devis (rendezvousEstimate) au lieu d'engager ; « Situer » cadre la Carte sur la cible. Session d'essai : vaisseau **Odyssée-02** (conception fictive d'après la physique). Visiteurs : Odyssée-01 et interface classique inchangés. **Allure du vaisseau à valider par le propriétaire.** | 21 nov. 2026 | Local : observation 56/56 + 9 suites (inventaire, recherche, rendez-vous, mise en page, contexte cosmos, physique mobile, Carte 31/31, stockage). `validate-v2.cjs` : contrôle « Odyssée-01 hors essai » réussi, puis échec de capture d'écran (délai des polices) identique sur `49b5a28`, donc antérieur ; ce script n'est pas dans la CI. CI sur `0a6acaa` (même code) : 7 exécutions réussies, dont « Reproducible validation from npm ci » lancé à la main (run 44948996610) et par le push (run 44948994133), 9 jobs chacun |
| `7538bde` | Session d'essai seulement : niveau « Univers observable » (horizon comobile), bassins SDSS coupés, plan supergalactique vu du dessus sur la Carte du cockpit ; radiateurs d'Odyssée-02 assombris. **Odyssée-02 : allure validée par le propriétaire ; ouverture au public encore à confirmer.** | 21 nov. 2026 | Local : Carte 36/36 + 7 suites (observation, inventaire, recherche, mise en page, contexte cosmos, physique mobile, stockage). CI sur `8e94f2a` (même code) : 7 exécutions réussies, dont « Reproducible validation from npm ci » lancé à la main (run 44954894429) et par le push (run 44954894495) |

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

