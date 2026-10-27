# Nébulosités à résolution séparée et cadence des cubes

Base : 2424621, après les trois essais Iris Xe de Claude.

## Changements

- La nébuleuse sélectionnée produit deux textures HDR half-float en une seule marche MRT : émission RGB et transmission RGB de la poussière. Leur composition E + T × fond reste avant les corps du système, le Doppler, l'exposition et le tone mapping. Les étoiles, galaxies ponctuelles et planètes restent rendues à la résolution normale. Aucun changement du modèle physique ni des 72 pas. L'émission est normalisée avant stockage half-float puis remise à son échelle en composition : les très faibles radiances ne disparaissent pas avant l'exposition.
- La marche utilise la moitié de chaque dimension seulement pour un nuage assez étendu (rayon apparent ≥ 32 pixels physiques, contraction aberrative comprise) ; pleine résolution pour les petits volumes. Ce choix réduit à environ un quart les rayons du grand nuage, avec interpolation spatiale de E et T. Ce n'est pas une promesse de quadruplement des images/s. Demi-écrans du comparateur et DPR sont pris en compte. L'ancienne formule reste exportable comme référence dans opticsVariantSource.
- La clé des cubes contenait s.t exact : elle changeait à chaque image en vol et contournait le délai de 0,5 s. La cadence est maintenant réellement bornée pour le mouvement ordinaire, avec actualisation immédiate sur changement de cible/bande/état, saut temporel > 1 an ou déplacement représentant plus de 1/4 de texel à la distance de l'étoile ou du volume de fond le plus proche. Les invalidations photométriques restent prioritaires. Les mises à jour périodiques du catalogue de galaxies ne forcent plus à elles seules un nouveau cube. Les positions GPU des étoiles sont mises à jour lors de la capture, celles de la carte uniquement quand elle est visible.
- Le coût de Cygnus X-1 n'est pas attribué avec certitude : correction d'une invalidation excessive réelle, puis profilage requis sur Iris Xe.

## Diagnostic

Ouvrir `/cockpit.html?perf=1` (ou `?gpuTrace=1&perf=1` pour aussi conserver le diagnostic de démarrage). Après le démarrage, `flightPerformance()` retourne les intervalles entre images, le temps du travail de la trame, les soumissions CPU par passe, les temps GPU par dessin (un échantillon toutes les dix images), les cubes avec leur taille, la variante active, les compilations en attente et les dimensions du nuage. Aucun gl.finish, aucune attente synchrone d'une requête GPU. Les requêtes disjointes sont rejetées. Ce n'est pas un temps GPU total : les périodes d'attente, copies hors renderer.render et présentation peuvent rester hors mesure.

## Validation

Tests de cadence, parallax, sauts et dimensions ; tests de sélection/compilation des variantes ; probe WebGL comparant l'ancienne marche plein écran et la composition des textures réduites (Tarentule, NGC604, poussière 0/35/100%, aberration), conservation du flux intégré et d'un point fin, restauration du viewport/scissor/target, comparaison DPR. Tests cockpit et profilage dans la CI. Résultats définitifs à relever dans la CI avant publication.

Retest physique nécessaire : Tarentule (gain de fluidité, poussière, contours, détails), Cygnus X-1 (cadence et coût des cubes vs optique), M31 au départ. Ne pas prétendre à un nombre d'images/s avant ces mesures. Les captures et essais précédents de Claude concernent la version antérieure.
