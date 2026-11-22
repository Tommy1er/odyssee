# Relais Claude — v59 vérifiée sur le Chrome du propriétaire (Iris Xe), mesures de la Carte et du vaisseau

Publication v59 par Codex le 22 novembre (GitHub `874d4d3`, Sites `3e1b5eb`). Vérification faite ensuite par Claude, via Claude in Chrome, sur le Chrome de bureau du propriétaire : `cockpit.html?ui=immersive&essai=1`, fenêtre de 1280 × 529 px, tampon de dessin 1170 × 706.

Pilote relevé : `ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x0000A7A1) Direct3D11 vs_5_0 ps_5_0, D3D11)`.

Aucun clic sur « Reprendre la mission sauvegardée » ni sur « Conserver ce nouveau vol » : le panneau qui les propose s'est affiché à l'ouverture et a été laissé tel quel. Toutes les actions ont été faites par script dans la session d'essai isolée.

## 1. Ce qui est vérifié en ligne

- Badge « Essai · sauvegarde isolée » ; interface immersive ; vaisseau **Odyssée-02** en essai (`flightSnapshot().shipName`), avec la ligne « Odyssée-02 · lumière de Soleil … » sous la vue.
- Fiche de la cible (Proxima Centauri) : Cadrer (regard seul), Fiche, **Situer**, Orienter le nez, **Préparer le trajet**, Détails.
- **Devis** vers Proxima Centauri : 4,225 al ; freinage préalable de 41,8 km/s en 4 263 s ; 1 g puis 1 g, 2,925 ans chacun ; 0,949 c ; γ 3,1809 ; 5,85 ans de référence ; 3,535 ans à bord. Recalcul indépendant (a = 1,0323 al/an², demi-distance 2,1125 al) : t = √(x² + 2x/a) = 2,925 ans, γ = 1 + a·x = 3,18, τ = 2·asinh(a·t)/a = 3,53 ans. Concordant. « Annuler » referme le devis sans engager l'autopilote.
- Carte : les cinq niveaux, CF4 selon l'échelle, bassins, horizon visible au niveau Univers observable.

## 2. Démarrage (cache du navigateur déjà chaud)

Interface active à **11,6 s** : 1,8 s de téléchargement et de lecture des catalogues, 1,0 s de préparation des objets, 2,0 s de construction du moteur, 6,3 s de travail GPU avant la première image. Le relevé de la v58 (32,9 s, dont 23,4 s de GPU) était un démarrage **à froid** : les deux chiffres ne sont pas comparables.

## 3. Temps d'image sur Iris Xe

Mesure par `requestAnimationFrame` sur 4 à 5 s, après 3 à 6 s de stabilisation. Le cockpit plafonne ici à 30 images/s (médiane 33,3 ms partout) ; ce qui distingue les scènes, ce sont les images longues (p95) et le nombre d'images obtenues.

| Scène | Médiane | p95 | Images en 4 s |
|---|---|---|---|
| Cockpit (vue du nez) | 33,3 ms | 83 ms | — (5 s : 140) |
| Carte, couche cosmique éteinte | 33,3 ms | 33,6 ms | — (5 s : 161) |
| Carte, Groupe local, McConnachie | 33,3 ms | 33,7 ms | — (5 s : 160) |
| Carte, Laniakea, CF4, **bassins éteints** | 33,3 ms | 33,5 ms | 130 |
| Carte, Laniakea, CF4, **bassins allumés** | 33,4 ms | **100 ms** | **97** |
| Carte, Superamas et grands vides, bassins | 33,3 ms | 50 ms | 117 |
| Carte, Univers observable, bassins et horizon | 33,3 ms | 50 ms | 126 |
| Vaisseau 3D, Odyssée-02 | 33,4 ms | **100 ms** | **101** |

Ressources au niveau Univers observable : 70 appels, 61 580 triangles, 198 907 points, 130 579 segments, 24 programmes, 46 textures, tas de 166 Mo.

**Lecture** :
- Les **bassins CF4** coûtent sur Iris Xe environ un quart des images (130 → 97 en 4 s) au niveau Laniakea, avec des à-coups à 100 ms. C'est l'arbitrage annoncé dans le relais des niveaux 3 et 4 : lignes de courant non animées par défaut, ou bassins masqués par défaut. **À trancher avant toute ouverture publique de la Carte cosmique.**
- **Odyssée-02** donne le même profil (101 images, p95 100 ms). Je n'ai pas mesuré Odyssée-01 dans la même séance : la comparaison reste à faire avant de l'ouvrir au public.
- Le reste de la Carte (Groupe local, CF4 sans bassins) ne coûte rien de visible.

## 4. Correctif

Dans la fenêtre de 529 px du propriétaire, le devis montait jusqu'à recouvrir les onglets Cockpit / Vaisseau 3D. Désormais, sa hauteur est bornée et il défile, les boutons « Engager » et « Annuler » restant visibles en bas. Contrôle ajouté dans `validate-observation-gestures.cjs` : à 1280 × 529, le devis reste sous l'en-tête et « Engager » est visible.

## 5. Non vérifié

Démarrage à froid de la v59 ; temps d'image d'Odyssée-01 dans les mêmes conditions ; parcours complet en poussée sur Iris Xe.
