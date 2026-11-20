# Maquette V3.3 — rangée de commandes basse de l'essai immersif

**Statut : proposition, à valider par le propriétaire avant tout code.** Rien de ceci n'est dans le cockpit.

Méthode : ce n'est pas un dessin. Le vrai cockpit (essai immersif, 1280 × 585, Mars sélectionnée) a été réarrangé **dans le navigateur de test seulement** par `maquette.cjs`, sans modifier une ligne de source. Les captures montrent donc les vrais éléments, à leur vraie taille. Le ciel non occulté est mesuré avec `skyOcclusion()`, la même mesure que les relais précédents.

## Le problème

La rangée basse compte cinq groupes et pèse **7,3 points** de ciel, le plus gros poste. Deux de ses boutons servent rarement en vol :
- « Mission cosmologique ↗ » est un lien vers une autre page ;
- « Nouvelle mission » réinitialise le vol.

« Reprendre les commandes » n'a d'effet que si un automatisme est actif (pilote automatique, maintien, assistance orbitale). Le reste du temps, il ne fait rien de visible.

## Variante A — rangée basse seulement

| | Actuel | Variante A |
|---|---|---|
| Groupes visibles | 5 (Mission ▾ · Mission cosmologique ↗ · Commandes · Propulsion · Vitesse de lecture) | **3** (Mission ▾ · Temps · Propulsion) |
| Ciel non occulté | 73,4 % | **76,5 %** |

1. **« Mission ▾ » regroupe** : Choisir la Terre, Choisir la Lune, (Reprendre / Conserver quand une mission est en attente), puis, après un séparateur, **Nouvelle mission** et **Mission cosmologique ↗**.
2. **Une pastille Temps** : « ▶ Reprendre le temps » et la vitesse de lecture côte à côte.
3. **« Reprendre les commandes » devient contextuel** : visible seulement quand un automatisme est actif. Il apparaît alors dans la pastille Temps (75,4 % avec le bouton affiché).
4. Propulsion inchangée.

Captures : `barre-actuelle.jpg`, `barre-v33.jpg`, `barre-v33-menu-mission.jpg` (menu ouvert), `barre-v33-pilote-auto.jpg` (bouton contextuel affiché).

## Variante B — A + en-tête allégé

| | Variante B |
|---|---|
| Ciel non occulté | **79,3 %**, badge d'essai compris (absent pour les visiteurs) |

En plus de A :
5. Les liens d'en-tête (Structures cosmiques, Physique & commandes, Privé) passent dans un menu **« Plus ▾ »**. Seules la bascule d'interface et, en essai, le badge restent visibles.
6. La ligne d'état « VISION RELATIVISTE · ABERRATION + DOPPLER » est retirée. Elle répète le mode actif, déjà visible sur les boutons Intuitif / Relativiste / Doppler. Les avertissements du moteur (préparation graphique, repli de qualité) resteraient à afficher à cet endroit quand ils existent.

Capture : `barre-v33-variante-b.jpg`.

## Ce que je recommande

**A sans réserve** : elle ne retire aucune fonction, chaque bouton reste à un clic, et le geste le plus fréquent (temps, vitesse de lecture) est regroupé.

**B à ta discrétion** : elle touche à l'en-tête, donc au lien « Structures cosmiques », plus visible aujourd'hui. Tant que la Carte cosmique n'est pas entièrement intégrée au cockpit, ce lien garde de l'importance. B est aussi l'occasion de trancher le libellé « Privé », affiché alors que le site est public (point déjà signalé).

Garde-fous si l'une ou l'autre est retenue : test d'inventaire (aucun identifiant perdu, tout atteignable), essai immersif seulement, interface classique inchangée.

## Reproduire

```
npm run build
node docs/conception/maquettes-v3.3/maquette.cjs /tmp/sortie
```
