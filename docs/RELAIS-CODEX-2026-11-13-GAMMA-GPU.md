# Relais Codex — contrôle GPU des grands gamma — 13 novembre 2026

## Résultat
Le test ajouté par 065ba494d1eb1ee4c73ad9ee3c2c132b77fd2bb5 a exécuté le fragment observerRayGLSL de production sur un rendu WebGL2 RGBA32F : 98 cas évalués, 90 dans les tolérances et 8 limites de précision obliques. Ce résultat ne valide pas tout le régime extrême.

Preuve : https://github.com/Tommy1er/odyssee/actions/runs/43447516730
Job : 131960742696. Artifact : 14049470521 (high-gamma-gpu.zip).
Moteur : ANGLE Vulkan SwiftShader, rendu logiciel. Aucun nouveau résultat Iris Xe ou téléphone.

## Domaine
Gamma : 1, 100, 1000, 10000, 1e6, 1e8, 1e12.
Deux axes : aligné et oblique [0.6,0,-0.8].
Angles : 0, 0.1/gamma, 1/gamma, 10/gamma, pi/4, pi/2, pi.
Référence indépendante par demi-angle et rapidité.
Tolérances : erreur euclidienne de direction < 0.005, erreur absolue log2(D) < 0.005.
Les 49 cas alignés passent. Dans cette orientation oblique, les cas jusqu'à gamma 10000 passent. Ce n'est pas une borne universelle.

La CI verte vérifie la finitude partout et les tolérances dans le domaine de régression déclaré. Les sondes extrêmes obliques sont conservées dans precisionLimits et ne sont pas comptées comme réussies.

## Limites mesurées
```json
[
  {
    "gamma": 1000000,
    "oblique": true,
    "theta": 1.0000000000000001e-7,
    "rayError": 0.02878656253804317,
    "logDError": 0.004141017476488429,
    "withinTolerance": false
  },
  {
    "gamma": 1000000,
    "oblique": true,
    "theta": 0.000001,
    "rayError": 0.01047412219016061,
    "logDError": 0.03232913575370944,
    "withinTolerance": false
  },
  {
    "gamma": 100000000,
    "oblique": true,
    "theta": 1e-9,
    "rayError": 0.1990074249940833,
    "logDError": 0.014354728214108547,
    "withinTolerance": false
  },
  {
    "gamma": 100000000,
    "oblique": true,
    "theta": 1e-8,
    "rayError": 1.414213621378686,
    "logDError": 0.99999943523704,
    "withinTolerance": false
  },
  {
    "gamma": 100000000,
    "oblique": true,
    "theta": 1e-7,
    "rayError": 0.027103325115663646,
    "logDError": 0.4871999469194961,
    "withinTolerance": false
  },
  {
    "gamma": 1000000000000,
    "oblique": true,
    "theta": 1e-13,
    "rayError": 0.19900742855258524,
    "logDError": 0.014354445832630347,
    "withinTolerance": false
  },
  {
    "gamma": 1000000000000,
    "oblique": true,
    "theta": 1e-12,
    "rayError": 1.414213570802465,
    "logDError": 0.9999991528555583,
    "withinTolerance": false
  },
  {
    "gamma": 1000000000000,
    "oblique": true,
    "theta": 1e-11,
    "rayError": 1.990074402957337,
    "logDError": 6.658210635607354,
    "withinTolerance": false
  }
]
```

## Interprétation et suite
À gamma 1e8 et theta 1e-8, l'erreur de direction approche 90 degrés et celle de Doppler un facteur deux. La précision Float32 près d'un axe oblique est une piste cohérente, mais le banc combine quantification des entrées et calculs : la cause exacte reste à isoler.

Prochaine correction à étudier : préparer le repère de boost en précision double côté CPU et appliquer l'aberration dans ce repère avant la rotation finale. Ne pas relever les tolérances pour masquer les écarts.

Ce banc ne mesure ni flux intégré, ni spectre complet, ni performances du cockpit. Le commit concurrent f96eeea ajoute un banc HDR distinct : ses résultats ne sont pas revendiqués ici. Aucun shader de production modifié ni déploiement applicatif par ce lot.
