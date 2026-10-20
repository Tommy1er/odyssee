# Budget imbriqué : premier raccordement au rendu, mode d'essai

Base : `98c4745af5ded907ee403f0ef19c938053541286`. La correction des angles solides de Claude est conservée.

## Livré

Le moteur consomme désormais le budget, **uniquement sur activation explicite** : ouvrir `cockpit.html?target=tarantula&emissionBudget=reference`. Le cockpit normal conserve son rendu. Ce mode de revue ne constitue pas une correction générale validée ni une nouvelle calibration empirique.

`nested-emission.js` associe Tarentule→LMC et NGC604→M33. À partir des nuages effectivement actifs dans la scène et entièrement dans la portée de capture, il calcule les coefficients appliqués :

- au volume galactique, dans `groupTint` ;
- au point galactique, dans la pondération partagée du cube et de la couche HDR ;
- à l'émission du nuage, dans `nebGain`.

Les changements de coefficients invalident le cube et les poids ponctuels dans la même frame. Les magnitudes originales, les spectres et les coefficients de poussière interne ne sont pas modifiés. `flightSnapshot().emissionBudget` expose activation, domaine et coefficients par objet.

## Convention de flux et domaine

Le nuage est calibré sur `V − A_V` (flux désextincté), alors que la galaxie utilise le V apparent. Au point de référence, le gain du nuage est donc multiplié par `10^(−0,4 A_V)` avant de retirer à l'hôte la part `10^(−0,4 (V_enfant − V_hôte))`.

Pour la Tarentule : hôte ×0,9636921945 ; émission du nuage ×0,7943282347. Ce deuxième facteur représente uniquement l'extinction grise de la bande V, pas une loi chromatique mesurée. La poussière interne reste celle du modèle existant. Ne pas interpréter le budget comme une décomposition spectrale gaz/étoiles.

Le mode agit en **bande 1, visible pose longue**, hors carte et laboratoire relativiste. Pleine force jusqu'à 10 al du Soleil et β≤10⁻⁴ ; extinction progressive de la correction par smoothstep jusqu'à 100 al et β=10⁻³. Ces seuils sont des limites de test choisies, pas des frontières astrophysiques. À l'extérieur, retour au traitement antérieur, qui peut compter deux fois la lumière. Aux poids intermédiaires, on interpole vers ce traitement ; on ne prétend pas maintenir un budget corrigé partout.

L'identité de flux vaut pour la calibration nominale vue du Soleil. La forme du résidu galactique est une simple réduction globale. Les différences de distance en voyage, les poussières superposées, le Doppler par composante et les erreurs de quadrature/rastérisation ne sont pas résolus par cette identité.

## Deux limites concrètes découvertes

1. Le code masquait systématiquement dans le cube le nuage sélectionné, alors que le shader direct ne le dessine qu'à moins de 120 rayons. En mode d'essai, ce masquage est limité au cas où le chemin direct prend réellement le relais. Le fonctionnement normal reste inchangé dans ce lot.
2. NGC604 vu du Soleil est à environ 3 465 rayons du nuage ; les caméras du cube s'arrêtent à 2 500 unités. Un objet sélectionné peut donc être actif en mémoire mais absent de l'image. Le budget utilise un test conservateur `distance/rayon + 1,1 < 2500` avant toute soustraction. **M33 n'est pas diminuée pour NGC604 dans ce cas.** La correction de NGC604 au Soleil reste à faire via un rendu des sources lointaines/non résolues.

La capture de fond n'a que 256 pixels par face ; la Tarentule y couvre peu de pixels. Les rapports de flux de référence ne garantissent donc pas le flux effectivement intégré à l'écran. C'est une raison supplémentaire de garder le raccordement expérimental jusqu'à mesure GPU. La correction d'angle solide des sources ponctuelles ne résout pas l'échantillonnage d'un petit volume.

## Validation et suite

- Tests locaux : `validate-nested-emission.mjs` **9 PASS**, `validate-emission-budget.mjs` **12 PASS**, `validate-galaxy-spectral-overlay.mjs` **25 PASS**.
- Compilation locale effectuée. La CI rapide régénère et enregistre les bundles publics à partir des sources poussées.
- Nouveau test navigateur `validate-nested-emission-ui.cjs` : chargement en mode d'essai, coefficients Tarentule/LMC, désactivation IR, absence de retrait M33 pour NGC604 hors portée, mode normal désactivé, erreurs JS/GLSL et capture. Ajouté au workflow graphique. **Son exécution distante doit être vérifiée ; pas de succès navigateur revendiqué à la rédaction.** Ce test contrôle le raccordement, pas une intégrale photométrique sur pixels.
- Aucun déploiement de ce lot effectué. Respecter le passage au vert graphique avant publication.

Prochaine étape obligatoire avant activation par défaut : représentation des complexes non résolus, mesure du flux intégré en radiance linéaire, puis continuité de ce rendu vers le volume. Ensuite seulement étendre le budget hors de la référence solaire et aux transferts spectraux. Ne pas présenter cette étape comme un retrait spatial de la Tarentule ou de NGC604 du volume de leur hôte.
