# Relais Codex → Claude — ciel CF4 du cockpit (13 octobre 2026)

Base : `5c209d5`. Même dépôt et branche main, intervention séquentielle. Ce lot traite le mélange de populations inventées et de galaxies cataloguées dans le cockpit.

## Changements

- Suppression du dessin des populations `CosmicScene` dans la vue de vol. Sur la carte embarquée : `synthetic:false`, `filaments:false`, enveloppes de repérage conservées. L'option illustrative de la page cosmos reste indépendante et inchangée.
- Nouveau `src/catalogue-sky.js` : 55 877 symboles CF4 à leurs coordonnées nominales, après chargement du catalogue. Une seule géométrie Points, disques doux de 3 pixels CSS, taille et éclat constants, bleus : **aide de navigation**, pas photométrie ni morphologie. Les quatre slots volumétriques catalogués et les quatre galaxies fixes restent rendus par le module de Claude.
- La case « Repères galaxies CF4 · aide de navigation » masque le champ. Actif en vol au-delà de 10 millions d'al ou si la cible est un repère cosmique. La carte embarquée les montre aux grandes échelles si le relevé est déjà chargé.
- Double-clic en vol : sélection et visée d'une entrée avec le résolveur CF4 existant ; aucune mise en route automatique. Pas de sélection pendant la comparaison optique ni depuis la carte embarquée (utiliser la recherche ou cosmos). Mobile : recherche PGC et liens de cosmos restent disponibles.
- Suppression du marqueur si son objet correspond à un volume actuellement rendu. Le symbole réapparaît en quittant les slots. Correspondances avec les galaxies locales : même heuristique préexistante, accélérée par une grille des directions unitaires (27 cellules voisines), sans ajouter une nouvelle règle de fusion.
- Directions recalculées en double précision JS, depuis le vaisseau, avant conversion float32. Pas de soustraction de grandes positions dans le shader. Mise à jour seulement lorsque position/slots changent et que la couche de vol est active. La couleur et la taille des symboles ne changent pas avec le Doppler ; leur direction suit l'aberration, avec expression stable vers l'arrière. Comparaison 0 c / vitesse de laboratoire et vue extérieure utilisent le même référentiel que le ciel.
- Chargement CF4 déclenché dès sélection cosmique ou au-delà de 10 millions d'al (au lieu de 20). État chargement/échec affiché, bouton explicite de réessai, pas de boucle de téléchargements après échec. Aucun remplissage synthétique de secours.
- Manuel et informations du cockpit mis à jour. Snapshot : `galaxies.field` indique état, effectif, symboles masqués et activation.

## Vérification exécutée

- `validate-catalogue-sky.mjs` : 13 contrôles (effectifs ; correspondances indexées comparées à recherche exhaustive ; masquage des volumes ; directions depuis position éloignée ; précision sub-al à grande distance ; position confondue avec un centre ; cache ; restitution du symbole ; picking avant/arrière et aberré ; état renderer ; suppression des populations synthétiques sans supprimer les enveloppes ; remplacement/disposal de géométrie).
- `validate-catalogue-galaxies.mjs` : 20 contrôles.
- `validate-extragalactic.mjs` : 18 contrôles.
- `validate-catalogue-ui.mjs` : 8 contrôles DOM Node.
- Construction et `git diff --check` réussis. Les anciens rapports de test sont conservés.
- **Pas de vérification GPU/navigateur exécutée ici**, outil navigateur géré indisponible. Les tests ci-dessus vérifient données, géométries et logique, pas compilation GPU, aspect, cadence ni double-clic réel. Le timeout Hercule de la version précédente n'est donc pas déclaré résolu.

## À contrôler dans le navigateur au prochain tour

1. Virgo/M87 puis Hercule : champ bleu sans anciennes mini-galaxies fictives, quatre volumes proches conservés.
2. Double-clic sur symbole → cible PGC, puis Engager ; désactivation/réactivation de la case ; carte cosmique inchangée.
3. Comparaison optique : directions déplacées à droite, zéro vitesse à gauche ; vue extérieure en référentiels accompagnant/fixe.
4. Réseau CF4 en échec puis réessai ; vue mobile et grands DPR ; cadence de mise à jour pendant vol accéléré.

## Limites / suite

Les symboles ne sont pas des galaxies 3D supplémentaires ni de la lumière : pas de lentille, occultation, beaming ou flux physique. Les quatre volumes restent une limite. CF4 est incomplet, sa distribution et ses erreurs de distance ne permettent pas d'inférer automatiquement appartenance à un amas, frontière de Laniakea, densité exacte ou vide réel. Pas d'expansion FLRW ni d'évolution du catalogue.

Les correspondances trans-catalogues héritent de l'heuristique de Claude, et ne sont pas de nouvelles identifications publiées. La prochaine étape pourra augmenter progressivement les volumes visibles, avec budget de rendu et photométrie documentée, ou intégrer les bassins et flux sourcés séparément. Ne pas rebaptiser les repères instrumentaux « rendu physique du ciel ».
