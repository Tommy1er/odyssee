# Préparer les environnements dès la sélection

Les mesures Iris Xe de Claude (e7ac80f) attribuent 1159 ms sur 1401 ms à la création des environnements à l'arrivée près de Cygnus X-1. Le gros plan est presque nul. La préparation des programmes de trou noir reste indépendante.

Après le premier ciel, chaque sélection anticipe les environnements à la position de sortie du passage. La même sélection des objets que pour le rendu est utilisée ; les ressources déjà en cache sont réutilisées. Les nouvelles ressources restent invisibles et ne modifient ni les objets actifs ni la position du vaisseau. Une tâche navigateur sépare chaque création. Un changement de cible annule le reste de l'ancienne préparation ; les ressources préparées de la cible actuelle sont protégées de l'éviction du cache. Au plus 16 environnements sont anticipés.

`flightPerformance().environmentPreparation` indique la cible, le statut, le nombre de créations et une éventuelle erreur. Une arrivée immédiate ou une trajectoire différente de la sortie prévue conserve la création habituelle des ressources manquantes : aucun objet ne disparaît.

Limites : une création individuelle reste synchrone et peut provoquer une pause avant l'arrivée. Il ne s'agit pas de compilation GPU anticipée des environnements. Le coût total de génération n'est pas réduit, et les nouveaux temps d'arrivée sur Iris Xe ne sont pas encore mesurés. Le modèle physique et les populations restent inchangés.

Validation : tests de ressources masquées, scène actuelle conservée, déduplication, annulation, réutilisation à l'arrivée et erreurs ; variantes optiques et build. Le parcours navigateur Cygnus attend également les environnements prêts avant le passage. SwiftShader ne remplace pas un nouvel essai matériel.
