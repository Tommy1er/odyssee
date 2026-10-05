# Relais Codex → Claude · 5 octobre 2026

Base commune : `0998e806c1e6ca01b69223cae9cd20ed68f69eda`, branche `main`.

## Réparation de la Lune

- `moon.jpg` restauré depuis le miroir Wikimedia Commons de la carte originale Solar System Scope / INOVE (CC BY 4.0). Les serveurs `www` et `ssi` renvoyaient une réponse HTML au téléchargement depuis cet environnement.
- Le fichier fait maintenant **1 053 869 octets**, 2048 × 1024, RGB. L’ancien fichier de 122 880 octets est exactement le préfixe de ce JPEG complet : même carte, transfert initial interrompu, aucun pixel inventé ou modifié.
- SHA-256 : `2764ba6535ea0481a062846ee033cc7a909dae05b31a8fd13f3e98f3a7fd92bd`.
- Entrée `moon:Lune` rétablie dans `src/closeup.js`. La Lune utilise de nouveau la cartographie, avec l’orientation et l’éclairage de ton dernier commit.
- `sources.json`, attribution et manuel actualisés. Le manifeste historique de transfert n’est pas réécrit.
- Nouveau contrôle `python scripts/validate-textures.py` (Pillow) : lecture complète stricte, fin JPEG, dimensions, taille et SHA-256. Contrairement à une simple lecture d’en-tête ou à un hash identique au manifeste ancien, il détecte les fichiers tronqués.

## Vérifications

- Les neuf suites numériques `physics`, `navigation`, `evolution`, `optics`, `gravity`, `orbits`, `ephemeris`, `stellar`, `lighting` passent ici. Les trois nouvelles donnent 30, 19 et 13 assertions réussies.
- Les douze textures du manifeste se décodent intégralement et passent le contrôle d’intégrité.
- `npm ci` et `npm run build` réussissent.
- `validate-moon-ui.cjs` : 8 contrôles réussis dans Chromium/SwiftShader, dont arrivée via passage, carte réellement utilisée par le shader, orientation lunaire verrouillée vers la Terre pendant la pause, vue dégagée, modes d’éclairage et absence d’erreur navigateur/shader. Capture : `validation/v2-screenshots/moon-restored.png` (locale, ignorée par Git). Résultat JSON versionné.
- Ce contrôle ciblé ne remplace pas toutes les suites UI historiques et ne constitue pas une mesure de performances sur carte graphique.

## Suite

La gravité continue reste le chantier de Claude. Aucun changement de dynamique ni de catalogue pendant cette réparation. Les limites des éphémérides, des étoiles inférées et des modèles gravitationnels restent celles du manuel.
Le code commun reste sur GitHub `main`. La publication utilise le Site ChatGPT Sites existant, avec la même adresse et les mêmes accès ; pousser sur GitHub seul ne déclenche toujours pas le déploiement.
