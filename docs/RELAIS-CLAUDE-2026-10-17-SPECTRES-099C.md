# Odyssée · Relais Doppler observateur et couverture spectrale — 17 octobre 2026

## Vérification du relais Claude

`git compare 787dc67..main` du 17 octobre : **ahead 19 / behind 0** avant les travaux supplémentaires de ce jour. La formule émetteur `(D/Dsun)^4 × J(D)/J(Dsun)` de `src/galaxy-spectral.js` et `src/galaxy-photometry.js` est préservée. Le workflow graphique du 17 octobre (run 39047595000, commit 33d60d0) a passé **10/10** contrôles galaxies, **7/7** bassins et **5/5** nouvelles nurseries. Son seul échec fut le push après un `git pull --rebase` refusé à cause de fichiers de tests non indexés. Ce push a depuis été supprimé du workflow long. Le workflow rapide a ensuite généré les bundles de production.

## Ajout actuel : comprendre les galaxies vues à 0,99 c

Fichier unique **`src/galaxy-observer-spectrum.js`** et ses **12 tests numériques** dans `scripts/validate-galaxy-observer-spectrum.mjs`. Import dans la fiche des galaxies `src/cockpit.js` par `spectralObserverRows`; test d'intégration navigateur supplémentaire dans `scripts/validate-galaxy-ui.cjs`; documentation dans `public/physics-v2.html`.

À l'émission, source de vitesse v_s et direction n pointant de l'observateur vers la source :

`D_source = sqrt(1-|v_s|²)/(1+dot(v_s,n))`.

Au vaisseau, de quadrivitesse spatiale `u=γβ`, avec la même direction de la lumière dans le référentiel catalogue :

`D_ship = γ_ship(1+β_ship·n)` (`physics.dopplerU`, stable près de c).

La longueur d'onde de la source correspondant à une λ visible à bord est

`λ_emit = λ_ship · D_source · D_ship`.

Le spectre K96 varie avec la classe morphologique et possède une borne longue différente suivant sa classe. **Deux statuts de couverture sont distincts** :
- Les longueurs d'onde de l'émission correspondant aux photons 380–700 nm vus dans le vaisseau se trouvent-elles dans l'archive brute `SED_PROVENANCE.spectra[kind].rangeNm` ?
- Les deux facteurs pertinents sont-ils dans la grille de couleur `SED_MIN=0.72` à `SED_MAX=1.09` ? Alors seule une couleur **indicative de classe** peut être calculée, même si le traitement global du ciel n'utilise pas encore cette table source par pixel.

Résultats directifs pour une galaxie sans mouvement dans le référentiel de départ, en ligne de visée :
- repos : D=1, λ_emit=380–700 nm (couvert).
- vers elle à 0,2c : D=1,2247, λ_emit=465–857 nm (archive elliptiques : oui ; grille précalculée : non).
- vers elle à 0,99c : D=14,1067, λ_emit=5,36–9,87 µm (infrarouge moyen, **non couvert**).
- derrière à 0,99c : D=0,070888, λ_emit=27–50 nm (ultraviolet extrême, **non couvert**).

Le rendu existant `src/sky-optics.js` applique toujours au ciel RGB assemblé un corps noir équivalent déduit du ratio rouge/bleu. **Cette intervention ne modifie PAS le shader du ciel.** Une fiction de spectres extrapolés jusqu'à 10 µm ou 27 nm aurait été trompeuse. Le nouvel instrument documente les régions du spectre réellement requises au lieu de revendiquer des « vraies couleurs » à 0,99 c.

## Validation

La CI rapide `.github/workflows/galaxy-build.yml` inclut la suite `validate-galaxy-observer-spectrum.mjs` avant `npm run build`. Le bot a généré ensuite un nouveau bundle `public/cockpit.js` au commit **`6418fccc`** (17 octobre 19:29 UTC), preuve que les tests bloquants et la compilation ont réussi. `scripts/validate-galaxy-ui.cjs` ajoute une assertion sur la présence de l'avertissement Doppler/Kinney dans la fiche M87 ; sa **nouvelle** exécution après ce lot n'est pas encore vérifiée.

Pendant l'édition, deux commits d'un autre agent (`33b5082` et `f59b33a`) ont tenté un fichier diagnostic similaire ; ils ont été **retirés** dans les commits `29049d4` et `dcf520d`, sans conflit, pour préserver notre unique module déjà intégré. Éviter la reprise simultanée de la même fonctionnalité.

## Suite recommandée (travail de recherche plus lourd)

1. Décider de la représentation spectrale GPU par galaxie/mélange du ciel (attributs spectroscopiques persistants par point et par volume ; éventuellement plusieurs bases spectrales ou rendu de bandes séparées). Il ne suffit PAS de recolorer le pixel RGB mélangé après `SkyOptics.capture`.
2. Étendre honnêtement les SED aux domaines UV ionisant (<100 nm) et MIR (5–10 µm et au-delà) en utilisant des sources observées pertinentes et en documentant absorption des photons UV, extinction et émission de poussière. Les KC96 seule ne suffisent pas ; à 0,99 c la couleur calculée depuis la lumière stellaire visible est indéterminée.
3. Établir les lois de transfert de l'intensité spécifique `I_ν/ν³`, l'aberration et la photométrie intégrée, et empêcher les doubles boosts source/observateur. Comparer à la solution de Planck sur le corps noir, puis aux filtres Bessell.
4. Pour les galaxies lointaines z~0.1+, le calcul FLRW informatif de `src/flrw.js` existe déjà ; le couplage du temps d'émission, D_L et correction K aux vrais photons est un chantier distinct et ne doit pas violer le modèle du moteur de navigation local.

**GitHub main ≠ mise à jour du Site ChatGPT hébergé**. Reconstituer `dist/` et publier sur le Site existant uniquement au moment de la validation.
