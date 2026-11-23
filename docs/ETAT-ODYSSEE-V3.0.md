# Odyssée — État stable V3.0 (document canonique)

Rédigé par Claude le 23 novembre 2026, à la demande du propriétaire (arbitrages relayés par ChatGPT : stabiliser une **V3.0 « socle d'exploration immersive »**, sans déclarer réalisée toute la directive « Univers vivant »). Ce document résume l'état et renvoie aux relais. Il ne les remplace pas, et les relais restent à leur place.

Sources : `docs/conception/ODYSSEE-V3-DIRECTIVE.md`, `PUBLICATION.md`, les relais `docs/RELAIS-*`, le code de `main`. Statuts : **Livré** (en service et vérifié) · **Essai** (livré dans `?essai=1`, pas encore ouvert à tous) · **Partiel** · **Non développé** · **Différé** (V3.x ou V4) · **À auditer** (présent dans le code, pas réexaminé pour ce document).

## 1. Ce qui est servi aujourd'hui

- **Site** : ChatGPT Sites, version servie et commit : voir `PUBLICATION.md` (v62 au 23 novembre).
- **Interface classique** pour tous les visiteurs. **Interface immersive** sur ordinateur via `?ui=immersive`. **Session d'essai** isolée via `?essai=1` : sauvegarde séparée, nouveautés réservées.
- **Vaisseau public** : Odyssée-01. Odyssée-02 en essai seulement.

## 2. Décisions en vigueur (propriétaire, 23 novembre)

| Sujet | Décision |
|---|---|
| Fiche, cadrage, zoom, Préparer/Situer, devis | Ouverture publique, avec les contrôles habituels (sauvegarde, commandes, régressions) |
| Carte cosmique dans le cockpit (5 niveaux) | Ouverture conditionnelle : saturation CF4 corrigée, CF4 par défaut à la Vierge (chargé à l'ouverture du niveau, UNGC sélectionnable), bassins et flux masqués par défaut, contrôle Iris Xe avant publication générale |
| Démonstrateurs S2 et pulsar | Diffusion comme démonstrations pédagogiques, avec modèles, hypothèses et limites visibles |
| Odyssée-02 pour tous | Différé jusqu'à une mesure exploitable de `shipBenchmark()` sur Iris Xe au repos |
| Interface immersive par défaut | Oui sur ordinateur, **après** validation du lot public complet ; Classique toujours accessible ; mobile inchangé ; rangée basse variante A (B non retenue) |
| Manuel `physics-v2.html` | Mis à jour **dans le même lot** que l'ouverture publique |
| M32 | Position McConnachie 2012 (0,805 Mpc) ; UNGC 2013 (0,490 Mpc) affiché comme seconde source avec l'écart ; la concordance avec la table originale de Karachentsev et al. 2013 reste à vérifier ; aucune correction silencieuse |
| Relais | Synthèse d'état d'abord (ce document), archivage progressif ensuite, en préservant les liens |

## 3. Matrice de la directive V3

### Sections 1 à 11

| Exigence | Statut | Où / preuve |
|---|---|---|
| 1. Préserver l'existant (Odyssée-01, vol libre, destination, horloges, aberration, Doppler, cartes, catalogues) | Livré | suites de non-régression dans la CI (`reproducible-tests.yml`, 10 jobs) |
| 2. Perf. sur Iris Xe : mesures de démarrage, cadence, Carte | Partiel | démarrage et Carte mesurés (relais v59, bassins/S2) ; P99, mémoire et évictions de cache non mesurés systématiquement |
| 2. Profils Performance / Équilibré / Qualité | À auditer | présents dans `cockpit.html` et le manuel |
| 3A. Navigation locale relativiste | Livré | intégrateur existant ; devis vérifié à la main (Proxima, relais v59) |
| 3B. Calculateur cosmologique FLRW distinct | À auditer | `flrw.js`, `cosmology.js`, `cosmology.html` |
| 3C. Passages fictifs identifiés comme tels | Livré | passages de trou de ver étiquetés fictifs |
| 4. Chaîne optique relativiste (aberration, Doppler, HDR) | À auditer | moteur existant ; invariance optique au zoom testée (tranche 2b) |
| 4. Comparaison 0 / 0,9 / 0,99 c / grand γ | À auditer | à vérifier |
| 5. Traversée intergalactique (transitions source → volume) | Partiel | Groupe local, M31/M33, LMC ; parcours complet de référence non rejoué |
| 6. Amas de la Vierge, M87, chaîne de Markarian, plasma X, arrachement du gaz | Partiel | M87 présent ; chaîne de Markarian et plasma intra-amas absents → **Différé** |
| 6. Bassins ≠ superamas ≠ amas ≠ filament ; pas de murs lumineux | Livré (essai) | notes de provenance de la Carte ; enveloppes de repérage étiquetées |
| 7. Risques physiques (poussière, flux, fond diffus) | À auditer | indicateur de poussière présent (`cockpit.js`) |
| 8. Statuts OBSERVÉ / CALCULÉ / RECONSTITUÉ / SPÉCULATIF | Partiel | statut de résolution au zoom, notes de provenance ; statut explicite par objet incomplet hors `cosmos.html` |
| 9. Modes Cockpit / Sonde / Carte / Structures ; sélection ≠ déplacement | Livré | fiche, « Préparer ≠ Engager », regard seul ≠ orienter |
| 9. Journal d'exploration | À auditer | journal présent (`cockpit.js`, `mission-storage.js`) |
| 9. « Qu'est-ce que je regarde ? » | Livré | bouton présent ; statut de résolution cohérent avec le rendu, y compris le correctif Cygnus X-1 |
| 10. Validations numériques, navigateur, matériel réel | Partiel | CI verte ; mesures Iris Xe ponctuelles ; SwiftShader non considéré comme preuve de fluidité |
| 11. Travail séquentiel, un seul `main`, publication après validation | Livré | `COLLABORATION.md`, `PUBLICATION.md` |

### Addendum « Univers vivant » (21 novembre)

| Exigence | Statut | Où / preuve |
|---|---|---|
| Mouvements planétaires et satellites perceptibles à échelle de temps affichée | À auditer | éphémérides et horloge d'observation existantes |
| Comètes et objets transitoires | À auditer | `comets.js` |
| Activité à l'approche (Soleil magnétique, etc.) | Partiel | surfaces stellaires animées ; niveaux de détail progressifs non systématiques |
| Pulsar : période reçue vérifiable | Essai | démonstrateur du signal reçu ; Vela 89,3 ms, Crabe 33,7 ms (`validate-optics.mjs`) |
| Magnétars, éruptions | Différé | — |
| Trous noirs : orbites relativistes, précession | Essai | S2 : 12,18′ par révolution, vue d'observation (`validate-s2-precession-ui.cjs`) |
| Effets de marée sur un corps voisin | Différé | scénario séparé, à concevoir |
| Trou noir dormant sans disque inventé (Gaia BH1) | À auditer | présent dans `compact-objects.js` |
| Quasars, noyaux actifs, jets selon la bande | Différé | — |
| Galaxie spirale en rotation différentielle | Non développé | Différé |
| Interactions et collisions de galaxies | Non développé | Différé |
| Vitesses particulières et lignes de courant CF4 | Essai | bassins et flux masqués par défaut ; sens des lignes vérifié (94,7 %) ; « champ reconstruit, pas un film de l'avenir » |
| Structures liées vs expansion | À auditer | `cosmic-motion.js`, `flrw.js` |

**Frontière proposée** :
- **V3.0** : socle d'exploration immersive. Carte unifiée, navigation, observation, interface, et les démonstrateurs S2, pulsar et CF4.
- **V3.x / V4** : tout ce qui est marqué Différé ou Non développé ci-dessus.
- Les lignes **À auditer** doivent être vérifiées avant d'être classées. Je ne les compte ni comme livrées ni comme manquantes.

## 4. Étapes restantes pour clore la V3.0

1. Carte : saturation CF4 et CF4 par défaut à la Vierge, en essai, puis contrôle sur Iris Xe après publication.
2. Lot d'ouverture publique : retirer la limitation à l'essai pour la fiche, le zoom, Préparer/Situer, le devis, la Carte et les démonstrateurs, avec le manuel mis à jour dans le même lot. Résultats des contrôles présentés **avant** publication générale.
3. Interface immersive par défaut sur ordinateur, après validation du lot public.
4. Odyssée-02 : décision après `shipBenchmark()` sur Iris Xe au repos.
5. Audit des lignes « À auditer » de la matrice.
6. M32 : rapprochement avec la table originale UNGC (CDS).
