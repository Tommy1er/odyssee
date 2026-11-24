# Relais Claude — Lot d'ouverture publique V3.0 (préparé, NON publié)

Décision du propriétaire du 24 novembre (relayée par ChatGPT) : « GO pour la préparation, pas encore pour le déploiement définitif. » Le lot est sur `main` pour la CI et pour la relecture. **Codex ne doit pas le publier avant le GO explicite du propriétaire.** `PUBLICATION.md` le signale.

## 1. Ce qui s'ouvre à tous

| Fonction | Avant | V3.0 |
|---|---|---|
| Interface sur ordinateur (≥ 901 px) | Classique, immersif avec `?ui=immersive` | **Immersif par défaut** ; bouton « Interface classique » toujours visible ; choix mémorisé ; `?ui=classic` force le Classique. Mobile inchangé. Rangée basse : variante A. |
| Fiche, Cadrer (regard seul), zoom optique, statut de résolution, Revenir | interface immersive | inchangé, désormais vu par défaut |
| Préparer le trajet (devis), Engager depuis le devis, Situer | interface immersive | inchangé, désormais vu par défaut |
| Carte cosmique (5 niveaux, filtres, plan SG, vue du dessus, horizon, CF4 adaptatif) | session d'essai | **tous** ; bassins et flux décochés par défaut |
| Démonstrateur S2 (précession, vue d'observation) | session d'essai | **tous**, présenté comme démonstration de modèle, avec ses limites dans le panneau |
| Démonstrateur pulsar (signal reçu dans la fiche) | session d'essai | **tous**, titre « démonstration de modèle », limites dans le texte |
| Vaisseau | Odyssée-01 | **Odyssée-02** ; `?vaisseau=01` garde Odyssée-01 pour comparer |
| Manuel `physics-v2.html` | sans les nouveautés | nouvelle section « V3.0 » ; titre « Odyssée : comprendre le voyage » ; dernier « cockpit privé » retiré |

**Conservé** :
- La **session d'essai** `?essai=1` reste isolée : sauvegarde suffixée `.essai` et badge. Les crochets de test qui modifient l'affichage (`shipBenchmark`, `shipCameraForTests`) restent réservés à l'essai.
- Les sauvegardes personnelles : même clé, même format, rien n'est réécrit au chargement.
- L'interface classique, complète.
- `cosmos.html` sans changement visible : il garde UNGC à la Vierge et ses propres réglages.

Crochets de lecture désormais visibles hors essai (`cosmicMapLayer`, `cosmicMapView`, `s2Demonstrator`…) : ils lisent l'état sans le modifier. Je les ai laissés pour que les tests puissent contrôler la version publique.

## 2. Tests adaptés

- Les tests écrits pour l'interface classique ouvrent maintenant `cockpit.html?ui=classic` explicitement (28 scripts, simple ajout du paramètre), puisque l'immersif devient le défaut sur ordinateur.
- Inventaire : nouveau contrôle « immersif par défaut sur ordinateur, bascule visible » et « choix du Classique mémorisé au rechargement ».
- Carte : le contrôle « absente hors essai » devient « disponible hors essai, bassins et flux décochés, pas de badge d'essai ».
- S2 : « case et vue absentes hors essai » devient « disponibles hors essai, Kepler par défaut ».
- `validate-v2.cjs` : vaisseau par défaut Odyssée-02.

## 3. Résultats des contrôles (local, Chromium SwiftShader)

| Domaine demandé | Suite | Résultat |
|---|---|---|
| Interface par défaut, bascule, choix mémorisé, inventaire des fonctions | `validate-feature-inventory.cjs` | réussi, dont « immersif par défaut sur ordinateur » et « Classique mémorisé » |
| Regard / orienter / engager, zoom, devis, Situer, pulsar, Cygnus X-1, fenêtre de 529 px | `validate-observation-gestures.cjs` | **61/61** |
| **Préservation des sauvegardes** (aller-retour, pause, corruption, version, catalogue manquant) | `validate-mission-storage.mjs` | réussi |
| **Navigation relativiste** (départ, arrivée Terre/Lune, reprise après rechargement, maintien en orbite, aller-retour cosmologique sans toucher la mission locale) | `validate-rendezvous-ui.cjs` | **24/24** |
| Carte cosmique publique, 5 niveaux, CF4 adaptatif, bassins décochés | `validate-cosmic-map-feasibility.cjs` | **44/44** |
| S2 public, Kepler par défaut, vue d'observation | `validate-s2-precession-ui.cjs` | **11/11** |
| **Compatibilité mobile** | `validate-physics-mobile.cjs` | réussi |
| Mise en page, recherche, contexte de `cosmos.html` | `validate-cockpit-layout-ui.cjs`, `validate-search-and-map-errors.cjs` (24/24), `validate-cosmos-context-ui.cjs` | réussis |
| Physique (optique, S2, pulsar) | `validate-optics.mjs` | **31/31** |

**Échecs locaux, antérieurs à ce lot** : `validate-navigation-ui.cjs` et `validate-v2.cjs` dépassent le délai de **capture d'écran** de 30 s sous SwiftShader dans cet environnement. Pour `validate-navigation-ui.cjs`, le même échec a été reproduit sur le commit précédent (`4b209e6`). Pour `validate-v2.cjs`, il avait déjà été constaté le 21 novembre sur `49b5a28`. Aucun des deux scripts n'est lancé par `package.json` ni par les workflows de la CI. Le contrôle « vaisseau par défaut » de `validate-v2.cjs` passe avant l'échec de capture.

**Erreurs de ma part, corrigées avant le commit** :
- La réécriture automatique des adresses a cassé un sélecteur de lien et une adresse concaténée (`?ui=classic?target=…`).
- Un commentaire `//` placé sur une ligne de test désactivait la suite de la ligne.

Les deux tests concernés ont été relancés et réussissent.

**Performances des scènes lourdes** : mesurées sur Iris Xe le 24 novembre avec le même code de rendu (`docs/RELAIS-CLAUDE-2026-11-24-MESURES-IRIS-XE-V64.md`) : 58 à 59 images/s sur la Carte à tous les niveaux sans bassins ; bassins et flux allumés, 24 images/s, d'où leur désactivation par défaut ; Odyssée-02 à 37,8 images/s contre 40,7 pour Odyssée-01. Ce lot ne change pas le rendu : il change ce qui est affiché par défaut. **À refaire sur Iris Xe après publication** : démarrage à froid en immersif par défaut, avec Odyssée-02.

CI : voir `PUBLICATION.md`.
