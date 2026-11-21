# Relais Claude — « Préparer le trajet » et « Situer » dans la fiche de sélection (essai immersif)

Suite de `docs/RELAIS-CLAUDE-2026-11-19-TRANCHE2B-FICHE-RESOLUTION.md`. Message du propriétaire du 21 novembre : « si tu peux avancer encore sur d'autres chantiers avant son retour go ».

**Essai immersif seulement** (`?ui=immersive`, bureau ≥ 901 px). L'interface classique est inchangée.

## 1. Ce qui a été fait

- **« Engager » devient « Préparer le trajet »** (décision de conception D13 : *préparer* n'est pas *engager*). Le bouton de la fiche n'allume plus le moteur. Il ouvre un **devis du trajet**, et c'est le bouton « Engager » du devis qui lance l'autopilote. Pendant un trajet, le libellé devient « Préparer un nouveau trajet ».
- **Contenu du devis**, calculé par la fonction de l'autopilote (`rendezvousEstimate`), donc par le même calcul que le vol réel :
  - distance à parcourir ;
  - freinage préalable, s'il faut d'abord annuler une vitesse relative ;
  - profil (1 g, avec croisière si le plafond de vitesse s'applique) ;
  - vitesse maximale et γ maximal. Pour un trajet lent, γ est donné avec six décimales, au lieu d'un « 1 » trompeur ;
  - durée dans le temps de référence et temps vécu à bord ;
  - hypothèses rappelées sous le tableau.
- **Ouvrir le devis ne change rien à la simulation** : position, impulsion, attitude, horloges, moteur, autopilote et pause restent identiques (contrôlé). « Annuler » ou Échap le referment. Échap ferme le devis en priorité, avant les autres usages de la touche.
- **« Situer »** : nouveau bouton de la fiche. Il ouvre la Carte galactique 3D cadrée sur la cible. La largeur du cadre vaut 20 fois le rayon de la cible, ou 2,4 fois sa distance si c'est plus grand, avec un plafond de 1,8 milliard d'al. La simulation n'est pas modifiée (contrôlé).

## 2. Vérifications exécutées

Local (Chromium SwiftShader, 1280 × 585) :
- `validate-observation-gestures.cjs` : **55/55**, puis 56/56 avec le contrôle du vaisseau Odyssée-02 (relais du même jour). Nouveaux contrôles : le devis s'ouvre avec ses lignes et ne change pas la physique ; Échap le ferme ; « Situer » ouvre la Carte centrée sur la cible sans changer la physique. Le chemin « engager l'autopilote » du test passe désormais par « Préparer le trajet » puis « Engager ».
- Non-régression : voir la ligne de ce commit dans `PUBLICATION.md`.

Non vérifié : Chrome Iris Xe (publication nécessaire).

## 3. Points ouverts

- Le devis ne propose pas encore d'autres profils (2 g, croisière plus lente). `rendezvousEstimate` reçoit déjà le plafond de vitesse courant, ce qui devrait permettre de comparer des variantes sans toucher à l'autopilote.
- « Situer » n'allume pas de lui-même les couches cosmiques de la Carte d'essai pour une galaxie lointaine : à décider avec le propriétaire.
