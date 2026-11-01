# Profils : adaptation temporelle et définition Qualité

Base db41547, incluant le diagnostic cce6091 et les mesures matérielles de Claude. La pause à la sélection ne se reproduit plus à cache chaud (82/83/117 ms). Une compilation initiale est plausible, pas prouvée : le diagnostic détaillé est conservé pour distinguer premières utilisations et réutilisations. Ce lot ne prétend pas corriger cette pause.

VolumeBudget demande désormais un échantillon au plus toutes les 500 ms de rendu actif, avec une seule requête en attente par passe. À faible cadence, chaque dessin peut être mesuré si l'intervalle est écoulé et si les résultats précédents sont disponibles. Aucune attente GPU ajoutée. La médiane porte toujours sur cinq résultats valides ; à une image/s, elle peut donc arriver après environ six images, et non 150. Résultats indisponibles, disjoint ou temporisation du navigateur peuvent prolonger ce délai. Sans extension, budgets fixes conservés.

Qualité vise 0,75 par dimension pour les grands volumes, contre 0,5 en Équilibré, avec son plafond de 524288 pixels. Sur 1051×834 : Équilibré 526×417, Qualité 789×626 avant adaptation. Performance conserve son plafond 65536 pixels. L'adaptation peut réduire ces dimensions : aucun gain de fluidité ou de détail constant n'est garanti sur tous les GPU. Petits nuages à pleine définition, cubes photométriques, physique et mission inchangés.

Validation locale : temporisation avec horloge injectée, absence de nouvelle requête lors d'appels rapides, disponibilité asynchrone, invalidation disjoint, absence d'imbrication, profil inconnu et repli sans extension, adaptation à une image/s, plafonds et différence de définition à DPR 1,5. Le test navigateur des nuages vérifie aussi 75 % par dimension pour Qualité. Diagnostics WebGL, variantes optiques, démarrage et build passent. Suites navigateur GitHub nécessaires avant publication.

Référence matérielle fournie par db41547 : volumes Performance ≈13 ms, Équilibré ≈37 ms, Qualité ≈39 ms, cache chaud. Ces valeurs précèdent ce correctif ; pas de nouveaux chiffres matériels revendiqués. Le diagnostic de sélection cce6091 est inclus dans la source à publier.
