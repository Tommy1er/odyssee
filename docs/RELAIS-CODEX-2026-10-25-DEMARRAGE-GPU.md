# Incident Iris Xe : instrumentation du démarrage, incident toujours ouvert

Base : 4924b8dd2a7c8bcf2c662940c61bac38829f4bab. Le test utilisateur du 25 octobre échoue aussi sans cible : gel au démarrage, contexte perdu puis restauré sur Intel Iris Xe / ANGLE D3D11. Le plafond de pixels n’a pas résolu cet incident. Aucun test sur ce GPU n’est disponible dans l’environnement Codex.

## Modification du démarrage

- Journal borné des opérations : catalogues, construction du moteur, disponibilité KHR_parallel_shader_compile, pilote/taille du tampon, soumissions de shaders/programmes, préparation asynchrone et dessins. Les durées sont des temps CPU/pilote, pas des requêtes de chronométrage GPU.
- Enregistrement avant chaque opération dans `sessionStorage`, clé `odyssee-gpu-startup-v1`. Le diagnostic de perte/restauration inclut les opérations actives et les dernières entrées. `gpuStartupDiagnostic()` expose aussi le journal complet et celui de la visite précédente dans le même onglet.
- `renderer.compileAsync` prépare la Voie lactée, le fond, le ciel, l’optique plein écran et, s’il est affiché, le vaisseau. Sans l’extension KHR, le pilote peut toujours bloquer pendant la compilation : aucun contournement garanti de FXC n’est revendiqué. Les soumissions individuelles sont distinguées de l’attente de compilation achevée.
- Au premier rendu seulement : Voie lactée 128, fond diffus 256, ciel ponctuel 1024, soit 18 faces séparées par des images navigateur. Une barrière WebGL2 vérifiée sans attente bloquante empêche d’accumuler les faces dans la file GPU. Aucun cube partiel n’est affiché. Caméras, formats et calibration inchangés.
- Mode `?gpuTrace=1` : `gl.finish()` après chaque dessin initial, avec une entrée distincte avant l’attente. Ce mode ralentit volontairement le démarrage pour mieux attribuer un blocage. Il n’est pas utilisé dans la boucle de vol.
- Arrêt sur perte de contexte. Une erreur asynchrone n’entraîne pas de lancement d’une seconde boucle de rendu. La simulation ne démarre pas pendant la préparation initiale ; les commandes sont temporairement désactivées.
- Défaut concret trouvé en lisant le code : le vaisseau fabriquait une carte PMREM du studio, même en éclairage astrophysique. Cette carte est maintenant créée seulement à l’ouverture du mode inspection. Cela évite des passes inutiles ; ce n’est pas une preuve que cette carte causait le gel.

Les captures périodiques après le démarrage restent sur le chemin existant. Une face isolée ou un programme peuvent encore être trop coûteux sur le pilote concerné. Aucun plafond de deux secondes n’est garanti et aucune boucle physique n’a été raccourcie sur la seule base d’une hypothèse.

## Vérification

Test numérique du journal (état persistant avant opération, erreur conservée), des six caméras/indices de faces, de la séparation des images, de la restauration cible/viewport/scissor/XR/mipmaps même après échec, et de l’arrêt après annulation. Compilation locale.

La suite navigateur couvre le cockpit direct, M31, le mode synchronisé, les 18 faces terminées, puis perte/restauration et présence du journal. Elle tourne sur SwiftShader, pas sur Iris Xe.

## Essai requis sur le GPU concerné

Ouvrir `/cockpit.html?gpuTrace=1` sans cible. Si le contexte est perdu, récupérer **tout le diagnostic**, en particulier les étapes actives et la dernière attente GPU. Si le navigateur est fermé de force, le journal précédent peut rester disponible au rechargement dans le même onglet, selon la restauration de session de Chrome. En cas de succès, comparer avec le démarrage normal et vérifier que le rendu continue. Ne pas clore l’incident sur la seule base des validations logicielles.
