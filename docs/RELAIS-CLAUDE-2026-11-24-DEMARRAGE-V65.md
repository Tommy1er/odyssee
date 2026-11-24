# Relais Claude — Démarrage de la v65 (V3.0 publique) sur Iris Xe

24 novembre 2026, après la publication de la v65 par Codex (14 h 03 UTC). Chrome de bureau du propriétaire, Intel Iris Xe (pilote ANGLE Direct3D11). L'onglet de Claude a été mis au premier plan par le propriétaire.

Page mesurée : `cockpit.html?essai=1`, sans autre paramètre. C'est le même code que le cockpit public, chemin par défaut compris (interface immersive, Odyssée-02), mais avec la sauvegarde d'essai : la mission personnelle n'est ni lue ni modifiée.

## 1. Ce qui a été mesuré : démarrage avec le cache HTTP du navigateur

Les fichiers sont **revalidés** (réponses de 300 octets, soit « non modifié ») et lus depuis le cache. Il ne s'agit donc **pas** d'un premier chargement cache vide. Vider le cache aurait demandé d'effacer les données de navigation de tout le profil Chrome du propriétaire, et je ne l'ai pas fait.

| Chargement | Vaisseau | Interface active | dont GPU avant la première image | Catalogues (lecture + objets) | Moteur |
|---|---|---|---|---|---|
| 1 | Odyssée-02 | **19,4 s** | 12,2 s | 2,2 + 1,5 s | 2,7 s |
| 2 | Odyssée-01 (`?vaisseau=01`) | **21,9 s** | 16,5 s | 1,4 + 0,7 s | 1,2 s |
| 3 | Odyssée-02 | **34,0 s** | 25,4 s | 1,5 + 0,8 s | 1,3 s |

Vérifié à chaque fois : interface immersive par défaut, vaisseau attendu, pilote Iris Xe.

**Lecture** :
- L'écart vient presque entièrement de la **préparation GPU** (12 à 25 s), pas des catalogues ni du vaisseau : Odyssée-01 n'a pas démarré plus vite qu'Odyssée-02.
- L'ordinateur était **plus chargé que le matin** : après le troisième chargement, le cockpit tournait à 21 à 28 images/s, contre 58 à 08 h 58 dans les mêmes conditions. Ces durées sont donc des ordres de grandeur, pas une mesure de référence.
- Pour comparaison : la v58 au premier chargement après publication, le 20 novembre, donnait 32,9 s (dont 23,4 s de GPU), et un démarrage avec cache le 22 novembre 11,6 s.

## 2. Constat utile pour la suite (non lié à la V3.0)

Au démarrage, la page lit environ **32 Mo** de données décodées en 20 fichiers. Les plus gros :
- `galaxy-catalogue.json` : 16,2 Mo ;
- `catalogue.json` : 7,0 Mo ;
- `galaxy-photometry.bin` : 3,9 Mo ;
- `cf4-basins-2023.bin` : 3,7 Mo ;
- `voyager.glb` : 3,1 Mo ;
- `galaxy-photometry.json` : 2,4 Mo.

Les bassins CF4 sont chargés au démarrage par `setTimeout(ensureBasins, …)`, pour le mouvement cosmique des galaxies : ce n'est pas la Carte. C'est un levier possible pour le premier chargement d'un nouveau visiteur, que ChatGPT considère comme fragile : le différer jusqu'au besoin. À arbitrer, rien n'a été changé.

## 3. Ce qui reste

Un vrai premier chargement cache vide. Le propriétaire peut le faire dans une fenêtre de navigation privée, qui n'efface rien de son profil : en ouvrant le cockpit, puis la console, il lit `gpuStartupDiagnostic().phases.interfaceActive`. Je peux aussi le faire s'il ouvre cette fenêtre et y met mon onglet.
