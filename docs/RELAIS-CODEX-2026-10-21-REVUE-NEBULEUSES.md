# Revue du budget et du relais point → volume

Base scientifique revue : `449ef0b` de Claude. Le budget reste **désactivé par défaut**, activable seulement par `emissionBudget=reference`, en bande V pose longue et dans le domaine solaire déjà documenté.

## Budget

Le nouvel ensemble représenté est cohérent : les nébuleuses lointaines portent maintenant leur flux dans le calque ponctuel. NGC 604 peut donc être débitée de M33 au Soleil. Le même gain enfant multiplie le point, le volume du cube et le volume direct ; les gains hôtes sont partagés entre volume et point/HDR. La correction grise V de l'extinction est conservée. Rien ne justifie encore une activation générale ni une extension spectrale ou hors du domaine solaire.

Les mesures de Claude restent des mesures de son lot, dans l'axe terrestre. Elles n'ont pas été reproduites ici. Les tests fonctionnels ne remplacent pas une intégration de radiance GPU. Le résidu de rotation mesuré est d'environ ±6 %, pas zéro ; la limite <0,2 % concerne le modèle numérique de rééchantillonnage isolé.

## Défaut trouvé et corrigé

Le poids de poussière `cloudOpacity` était appliqué au nuage sélectionné dans `cloudRadiance`, mais pas à l'alpha du matériau des nuages non sélectionnés dans le cube de fond. Dès que w devenait positif, ces derniers absorbaient le fond à pleine opacité alors que leur lumière ne recevait que w.

Le matériau du cube reçoit maintenant `cloudOpacity = w` et son alpha devient `w × (1 − transmission)`. Sa radiance reste pondérée une seule fois par `nebGain`. À w=0 le volume est invisible, à w=1 le rendu antérieur est retrouvé, et les bandes non visibles gardent w=1. Le budget enfant ne modifie pas cette opacité. Le contrôle de câblage existant couvre désormais les deux chemins de poussière, au lieu du seul chemin sélectionné.

## Vérifications locales

- Sept suites ciblées passent : émission 12, budget imbriqué 9, points de nébuleuses 17, HDR spectral 25, photométrie galactique 22, nébuleuses 27, nurseries 10, soit **122 contrôles**. Les deux suites directement touchées ont été relancées après la correction.
- `npm run build` passe ; les bundles publics sont reconstruits. Avant la correction, les deux bundles étaient identiques octet pour octet à ceux de `449ef0b`.
- Aucun résultat graphique GitHub nouveau n'est revendiqué. Les appels aux exécutions/checks de `449ef0b` et du premier commit CI `7b96269` ne retournaient aucune exécution. Le dernier run graphique visible restait celui de `ab279d9`, en échec.
- La prévisualisation gérée n'a pas démarré : le superviseur ajoute des options Vite (`--host`, `--port`, `--strictPort`) au serveur Python du projet, qui les refuse. Aucun serveur alternatif ni navigateur local n'a été installé.

## CI et publication

`7b96269` fixe les deux workflows sur `${{ github.sha }}` et ajoute le test lunaire et ses captures au workflow graphique. Une relance d'un ancien workflow n'est pas équivalente à une nouvelle exécution de cette définition. Le workflow rapide ne rebase plus des bundles produits sur une ancienne révision : il vérifie que main n'a pas avancé avant de les committer, puis utilise un push normal qui refuse une course concurrente.

**Publication non effectuée à la rédaction.** Lancer `Galaxy spectra build and verification` sur le main contenant ce correctif, examiner son résultat et les captures (dont la Lune), puis publier cette même source sur le Site privé existant. Ne pas substituer les résultats historiques à cette validation. Si le test de la Lune échoue encore, inspecter le journal et comparer la révision de référence avant de conclure à une régression.
