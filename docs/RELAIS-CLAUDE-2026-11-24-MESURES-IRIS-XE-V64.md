# Relais Claude — Mesures sur Iris Xe (v64) : Carte aux grandes échelles et comparaison Odyssée-01 / Odyssée-02

24 novembre 2026, Chrome de bureau du propriétaire, Intel Iris Xe, `cockpit.html?ui=immersive&essai=1`, fenêtre de 1280 × 529, densité de pixels 1,5. Aucun clic sur « Reprendre la mission sauvegardée » ni sur « Conserver ce nouveau vol » : le panneau qui les propose a été laissé tel quel.

## 0. Condition de mesure

Les 23 et 24 novembre au matin, toutes les images duraient exactement 1 016 ms, alors que le fil principal était libre. L'onglet de Claude, ouvert dans le groupe « Claude », n'était pas réellement à l'écran, et Chrome le cadençait à une image par seconde. Le propriétaire a ensuite amené cet onglet au premier plan : la cadence est remontée aussitôt (48 puis 58 images/s). **Toutes les mesures ci-dessous ont été prises dans cet état.** Pour les prochaines mesures, il faut que l'onglet soit au premier plan, sinon les chiffres ne valent rien.

Mesure : `requestAnimationFrame` sur des fenêtres de 3 à 4 s, après 2,5 à 3,5 s de stabilisation. L'écran est limité à 60 Hz.

## 1. Carte cosmique (v64 : CF4 adaptatif, CF4 par défaut à la Vierge)

| Vue | Images/s | p95 | Symboles CF4 (taille · intensité) |
|---|---|---|---|
| Cockpit | 58,0 | 16,9 ms | — |
| Carte, couche cosmique éteinte | 59,0 | 16,8 ms | — |
| Groupe local (McConnachie) | 58,8 | 16,9 ms | — |
| Voisinage de la Vierge (CF4, 9 702 galaxies dans le cadre) | 58,8 | 16,9 ms | 6 px · 100 % |
| Laniakea (CF4, 29 879 dans le cadre) | 58,3 | 16,9 ms | 4,5 px · 100 % |
| Superamas et grands vides (CF4) | 58,3 | 16,9 ms | 3 px · 39 % |
| Univers observable (CF4 + horizon) | 58,3 | 16,9 ms | 3 px · 10 % (plancher) |
| Laniakea, **bassins et flux allumés** | **24,0** | 66,7 ms (max 350) | — |

**Lecture** :
- Sans bassins, la Carte tient la cadence de l'écran à tous les niveaux, CF4 compris : la représentation adaptative ne coûte rien de visible.
- Bassins et flux allumés ensemble : 24 images/s. C'est le même ordre que le 22 novembre (22 à 23,5). **La décision de les masquer par défaut est confirmée.**

## 2. Odyssée-01 / Odyssée-02 (banc `shipBenchmark`, même page, même scène)

Vue « Vaisseau 3D », cible Proxima Centauri, simulation en pause, éclairage par défaut. Les deux vaisseaux sont alternés (01, 02, 02, 01…), sur quatre tours de 2,5 s chacun, deux séries.

| Série | Odyssée-01 | Odyssée-02 | Écart |
|---|---|---|---|
| 1 | 37,9 images/s (p95 71 ms) | 37,2 images/s (p95 63 ms) | −2 % |
| 2 | 43,5 images/s (p95 46 ms) | 38,3 images/s (p95 63 ms) | −12 % |
| **Moyenne** | **40,7** | **37,8** | **−7 %** |

Échantillons, série 1 : 01 36,0 · 02 40,8 · 02 36,0 · 01 33,2 · 01 40,0 · 02 36,8 · 02 35,2 · 01 42,4. Série 2 : 01 43,2 · 02 44,0 · 02 39,6 · 01 46,4 · 01 43,2 · 02 34,4 · 02 35,2 · 01 41,2.

**Lecture** : Odyssée-02 coûte un peu plus, entre 2 et 12 % selon la série, soit 7 % en moyenne. Les deux vaisseaux restent au-dessus de 30 images/s sur Iris Xe. La dispersion d'un tour à l'autre (33 à 46 images/s pour le même vaisseau) est du même ordre que l'écart mesuré. **Sur le seul critère de performance, rien n'empêche d'ouvrir Odyssée-02 au public.** La décision appartient au propriétaire.
