# Odyssée V3 — tableau de conformité à la directive « Évasion cosmique »

Claude, 01/11/2026, sur `main` à `a5200e9` (contient 804cbff, 7ca6e6a, 11f41c8). Ce document répond au point 1 de la directive : **déjà opérationnel / partiellement implémenté / absent / non vérifié**. Aucun code modifié.

Méthode : lecture des sources (`grep` sur `src/`, `public/cockpit.html`, `public/cosmos.html`) et des relais `docs/RELAIS-*`, exécution de `validate-flrw` (12 PASS), `validate-render-performance` (PASS), `validate-navigation` (PASS), `validate-rendezvous` (25 PASS), et mesures sur le Chrome Iris Xe d'Abdoulaye (relais Claude du 26/10 au 01/11). « Non vérifié » signifie : existe peut-être, mais rien dans le code ou les mesures ne permet de l'affirmer.

Légende : ✅ opérationnel · 🟡 partiel · ❌ absent · ❔ non vérifié

## §2 — P0 Performances

| Exigence | Statut | Preuve / commentaire |
|---|---|---|
| Temps d'initialisation et compilation GPU | ✅ | `gpu-startup.js`, `gpuStartupDiagnostic()`, `?gpuTrace=1` ; mesuré sur Iris Xe (prêt en 19–85 s selon le cache et la charge) |
| Images/s et temps d'image P50/P95 | ✅ | `render-performance.js` (p50, p95) via `flightPerformance()` |
| P99 | ❌ | aucun p99 dans `render-performance.js` |
| Coût séparé ciel / galaxies / nuages / trou noir | ✅ | passes chronométrées dans `flightPerformance().passes` ; mesures Iris Xe : nuage, Groupe local et optique trou noir séparés (relais du 28/10 et du 31/10) |
| Passage catalogue → vol → arrivée | ✅ | `scene-timings.js`, `sceneTimings.transitions` ; arrivée Cygnus X-1 1401 → 197 ms après 804cbff (relais a5200e9) |
| Mémoire et évictions de cache | ❌ | pas de mesure mémoire ; l'éviction existe dans `environments.js` (plafond 16) mais n'est pas journalisée |
| Préparation anticipée des environnements testée sur Iris Xe | ✅ | relais a5200e9 : 9 environnements en 1,6 s à la sélection ; arrivée à 153–197 ms. **Nouvelle pause de 2,7 s à la sélection de la Tarentule** (« Affichage final et vaisseau »), à traiter |
| Préparation anticipée du trou noir | ✅ | 11f41c8 ; 0 ms d'attente à l'arrivée sur Iris Xe (relais 25a3137) |
| Profils Performance / Équilibré / Qualité | ❌ | aucun profil dans le code |
| Résolution adaptative des effets coûteux | 🟡 | demi-résolution fixe du nuage et des grands volumes (`cloud-pass.js`, `group-pass.js`) et plafond de pixels indépendant de l'écran (7ca6e6a). Ce n'est pas encore une adaptation à la cadence mesurée |
| 20–30 i/s en mode Performance sur Iris Xe | ❔ | jamais mesuré dans une session dégagée : la machine d'Abdoulaye est toujours chargée (épisodes à ~1 i/s sans charge de la page) ; meilleur cas mesuré 20–25 i/s au Soleil |

## §3 — P1 Physique du voyage et référentiels

| Exigence | Statut | Preuve / commentaire |
|---|---|---|
| A. Navigation relativiste locale (v < c, accélération propre, freinage, temps propre) | ✅ | `physics.js`, `navigation.js` ; `validate-navigation` PASS, `validate-rendezvous` 25 PASS |
| A. Cibles mobiles, rendez-vous | ✅ | `validate-navigation` : « moving local target » ; `rendezvous` |
| A. Mouvements transversaux et continuité des horloges au changement de référentiel | ❔ | pas de test dédié identifié sous ce nom ; à auditer dans `validate-rendezvous` / `validate-physics` |
| B. Calculateur FLRW : D_C, D_L, D_A, lookback, module de distance | ✅ | `flrw.js` (ΛCDM plat Planck 2018, z ≤ 2) ; `validate-flrw` 12 PASS ; affiché dans la fiche des galaxies (`cockpit.js` l. 131-132) |
| B. Distance propre à une époque donnée | ❌ | non calculée explicitement (seul le facteur d'échelle 1/(1+z) est renvoyé) |
| B. Redshift cosmologique distinct de la vitesse particulière | 🟡 | `cf4RedshiftFromCMB` + avertissements explicites (« pas une vitesse particulière 3D ») ; pas de décomposition z_cosmo / z_pec |
| B. Structures liées ne suivant pas le flot de Hubble | ❌ | aucun traitement explicite ; les lignes d'univers CF4 (`cosmic-motion.js`) sont une extrapolation linéaire |
| B. Navigation dans FLRW (fusée accélérée en univers en expansion) | ❌ volontairement | `flrw.js` est déclaré séparé de la navigation (Minkowski). La directive demande d'abord trajectoires-tests et calculateur : conforme à l'état actuel |
| B. Conventions H₀ séparées (74,6 CF4 / 67,4 Planck) | ✅ | `cosmic-motion.js` l. 16 et `flrw.js` l. 3-6, commentées |
| C. Transport spéculatif identifié comme fictif | ✅ | « passage fictif », « Téléportation fictive », « Spéculatif · aucun trou de ver observé ici » (`cockpit.js`, `cockpit.html`) |

## §4 — P1 Ciel vu depuis un vaisseau relativiste

| Exigence | Statut | Preuve / commentaire |
|---|---|---|
| Aberration et Doppler sur le ciel | ✅ | `sky-optics.js` (aberration, D⁴, décalage thermique), CMB relativiste |
| Spectres thermiques / galactiques empiriques | ✅ | LUT corps noir ; SED KC96 (`galaxy-sed-kc96-data.js`) ; raies CIE des nébuleuses |
| Bandes non thermiques signalées comme modèles | ✅ | « Radio · modèle », « Rayons X · modèle », « Gamma · modèle » |
| Chaîne spectrale unifiée dans le rendu global | 🟡 | `galaxy-observer-spectrum.js` est déclaré « diagnostic, NOT a replacement for the global RGB approximation » ; couche HDR spectrale des galaxies ponctuelles (`galaxy-spectral-overlay.js`) seulement |
| Comparaison 0 / 0,99 c | ✅ | bouton « Comparer 0 / 0,99 c » |
| Comparaison 0,9 c et très grand γ | ❌ | non prévue dans l'interface |

## §5 — P1 Traversée intergalactique

| Étape du parcours | Statut | Commentaire |
|---|---|---|
| Grand Nuage de Magellan, 30 Doradus | ✅ | volume du Groupe local + nébuleuse Tarentule reconstituée (`extragalactic-nebulae.js`) |
| R136 (amas central) | ❔ | non trouvé comme objet nommé ; possible dans la population interne |
| Andromède, M33, NGC 604 | ✅ | `local-group.js`, `extragalactic-nebulae.js` |
| M87 | 🟡 | présent sur la carte (`cosmic-data.js`) et dans CF4 ; pas de modèle de jet ni de M87* |
| Amas de la Vierge, Laniakea, Coma, Persée, vide du Bouvier | 🟡 | présents sur la carte « Structures cosmiques » (`cosmic-data.js`, `cosmic-scene.js`) avec des textes prudents ; **pas d'environnement volumétrique traversable** depuis le cockpit |
| Transition source ponctuelle → volume | ✅ | relais point-volume (`nebula-points.js`, `handoff` du Groupe local), budget lumineux validé |
| Populations statistiques calibrées (pas d'étoiles inventées) | 🟡 | `cluster-population.js`, populations des galaxies proches ; calibration documentée pour les amas, à auditer pour les galaxies lointaines |

## §6 — P2 Amas et grandes structures

| Exigence | Statut | Commentaire |
|---|---|---|
| M87*, jet relativiste | ❌ | absent |
| Chaîne de Markarian, galaxies perturbées, collisions | ❌ | absent |
| Plasma intra-amas (rayons X), pression dynamique | ❌ | absent |
| Lentilles gravitationnelles d'amas | ❌ | seule la lentille de Schwarzschild locale existe (`black-hole.js`) |
| Bassin ≠ superamas ≠ amas ≠ filament | ✅ | bassins CF4 marqués « surcouche reconstruite, pas de la lumière » ; textes distincts dans `cosmic-data.js` |
| Vide du Bouvier comme volume sous-dense | 🟡 | présent sur la carte, sans représentation volumique de la sous-densité |

## §7 — P2 Risques physiques

| Exigence | Statut | Commentaire |
|---|---|---|
| Panneau « Gaz, poussière & rayonnement » | 🟡 | présent ; le texte précise qu'il « n'évalue ni la fréquence des impacts de grains ni une dose absorbée ou une survie » : conforme à l'esprit, mais pas de calcul d'énergie d'un grain |
| Intensification et décalage du CMB | ✅ | CMB relativiste dans `sky-optics.js` (`updateCMB`) |
| Flux de particules, densité du milieu | ❔ | à vérifier dans le panneau existant |

## §8 — Provenance

| Exigence | Statut | Commentaire |
|---|---|---|
| Distinction observé / modèle / fiction dans les textes | 🟡 | très présente dans les fiches et le manuel (« modèle », « reconstitué », « fictif »), mais pas sous forme d'un **champ de statut normalisé** OBSERVÉ / CALCULÉ / RECONSTITUÉ / SPÉCULATIF par objet |
| Traçabilité des catalogues | ✅ | `data/references-*`, liens NASA/ESA par objet, `SED_PROVENANCE`, provenance des magnitudes (`galaxy-photometry.js`) |
| Vérification des licences | ❔ | non auditée ici |

## §9 — Expérience utilisateur

| Exigence | Statut | Commentaire |
|---|---|---|
| Modes Cockpit, Vaisseau 3D, Carte galactique 3D, Structures cosmiques | ✅ | barre de navigation du cockpit |
| « Qu'est-ce que je regarde ? » | ✅ | bouton `identify` |
| Journal d'exploration | 🟡 | `state.journal` enregistre l'événement, t, τ et la position ; il manque la destination, la distance restante, γ, la vitesse, le mode physique et les sources |

## §10 — Validation

| Exigence | Statut | Commentaire |
|---|---|---|
| Tests physiques numériques | ✅ | ≈ 40 scripts `validate-*.mjs` (FLRW, navigation, rendez-vous, optique, éphémérides JPL…) |
| Tests navigateur | ✅ | suites `*-ui.cjs` en SwiftShader dans la CI |
| Test mobile | ✅ | `validate-physics-mobile.cjs` |
| Tests matériels réels (Iris Xe) | 🟡 | mesures de Claude sur le Chrome d'Abdoulaye (compilation, coûts GPU par passe, sceneTimings) ; **fluidité non mesurée dans une session dégagée** |

## Synthèse pour le lot A (P0)

Restent à traiter, par ordre d'impact :

1. **Pause de 2,7 s à la sélection d'une nébuleuse** (nouvelle, mesurée sur Iris Xe).
2. **Profils Performance / Équilibré / Qualité** et adaptation à la cadence mesurée (❌).
3. **P99 et suivi mémoire / évictions** dans `flightPerformance()` (❌).
4. **Coût du Groupe local** : 16–60 ms à demi-résolution selon la charge, poste le plus lourd à la Tarentule.

Les lots B et C partent d'une base saine (FLRW validé et séparé, conventions H₀ explicites, prudence des textes), mais la plupart des éléments de §6 sont absents. M87, l'amas de la Vierge et le vide du Bouvier n'existent aujourd'hui que sur la carte.
