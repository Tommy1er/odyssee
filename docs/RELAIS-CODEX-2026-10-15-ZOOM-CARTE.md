# Correctif ciblé : sélection et zoom de la carte cosmique

Demande d’Abdoulaye : cliquer sur un objet puis zoomer au trackpad laissait seulement son étiquette à l’écran (captures M33 et Groupe local). Ce correctif ne lance pas la refonte UX, toujours différée. Le dernier relais de Claude sur la refonte a été lu ; ses propositions restent à discuter séparément.

## Causes et corrections

- `synthetic: false` cachait tous les modèles de `CosmicScene`, y compris les quatre galaxies de repère réelles (Voie lactée, M31, M33, M87). Dans la carte seulement (`map: true`), leurs modèles restent désormais visibles. Les populations inventées restent masquées. Le cockpit conserve la suppression de tous ces anciens modèles.
- Cliquer un point du canevas sélectionnait sans recentrer le pivot d’OrbitControls. Tous les chemins de sélection recentrent désormais la caméra ; un clic répété sur la même sélection se rapproche sans repartir du cadrage initial.
- Les étiquettes interceptaient la molette ; leurs événements wheel, y compris le pincement ctrlKey, sont transmis au canevas. Le nom de la galaxie cataloguée est maintenant un bouton actif.
- Une animation de cadrage pouvait reprendre la main après un geste. Le début d’un geste termine le cadrage et confie immédiatement la caméra à OrbitControls.
- Le cadrage des galaxies de repère est proportionné à leur rayon. L’agrandissement symbolique revient à ×1 à courte distance ; la limite de zoom évite d’entrer dans la coque du modèle, dont l’intérieur n’est pas rendu.
- Bouton « Se rapprocher de la sélection » et lien direct vers le cockpit sous la vue, sans devoir retrouver la fiche plus bas dans le panneau.

## Vérifications effectuées

- `node scripts/validate-extragalactic.mjs` : 20 contrôles, dont visibilité de M33 et absence de régression du cockpit.
- `node scripts/validate-catalogue-ui.mjs` : 18 contrôles DOM, avec **le vrai OrbitControls**, seul WebGLRenderer est remplacé. Sélection sur canevas, recentrage, rapprochement répété, wheel, ctrl+wheel au-dessus d’une étiquette, zoom inverse, limite proche, interruption du cadrage et lien vers le cockpit.
- `node scripts/validate-catalogue-sky.mjs` : 13 contrôles.
- `npm run build` : reconstruction des deux bundles et de dist.

## Limites et recette sur écran

Pas de navigateur de validation disponible ici : aucun nouveau rendu GPU ni essai sur trackpad physique n’est revendiqué. À vérifier sur écran : ouvrir cosmos.html, choisir Triangle · M33, vérifier sa forme visible, pincer sur le nom et cliquer de nouveau ; répéter à l’échelle Vierge, puis dézoomer.

Les quatre galaxies de repère ont des formes illustratives. Les autres entrées des catalogues restent des points de position dans la carte : leur lien ouvre le cockpit pour le modèle détaillé. Zoomer dans la carte déplace sa caméra, pas le vaisseau et pas ses horloges. La navigation entre pages reste sans sauvegarde de mission.
