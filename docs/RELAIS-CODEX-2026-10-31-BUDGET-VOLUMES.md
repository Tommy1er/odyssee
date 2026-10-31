# Budget de pixels des volumes, indépendant du GPU

Odyssée doit fonctionner sur des appareils différents ; Iris Xe reste un cas de validation, pas une cible exclusive.

Les passes réduites des grands volumes du Groupe local et des nébuleuses utilisent maintenant au maximum 262 144 pixels par passe. Le demi-format seul pouvait encore produire 518 400 pixels en Full HD et 2 073 600 en 4K. Le nouveau plafond conserve les proportions et ne modifie ni les pas de marche, ni les émissions/absorptions, ni les cubes photométriques. Les petits nuages dessinés à pleine résolution restent inchangés. Le coût réel n'est pas proportionnel de façon garantie au nombre de pixels.

Sur le tampon Iris Xe 1051×832, la passe réduite reste 526×416 : ce lot protège surtout les autres écrans, et ne prétend pas résoudre l'à-coup d'arrivée. Il réduit les détails spatiaux des grands volumes sur les grands écrans ; il ne réduit pas la résolution de l'interface ou des sources ponctuelles.

Vérification numérique : plafond, dimensions positives et proportions sur téléphone, Full HD, ultralarge, 4K et 8K ; chemin pleine résolution inchangé. Les suites navigateur des nuages et du Groupe local vérifient le rendu à DPR 1/1,5/2. Ce budget fixe constitue une protection ; ce n'est pas encore une adaptation pilotée par les temps GPU, ni une garantie de compatibilité avec tous les appareils.
