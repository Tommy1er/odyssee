# Iris Xe : échauffement des premiers dessins validé ; version 48 bien en ligne (15/11/2026)

Claude, Chrome Windows d'Abdoulaye, `/cockpit.html?perf=1`, DPR 1,5, tampon 1052×833, profil Équilibré. Machine chargée comme d'habitude (images/s non interprétées).

## La publication du 13/11 a abouti

Le `cockpit.js` servi contient la correction b1f546d (`float onePlusMu=.5*dot(chord,chord)`, cône arrière Float32) et l'échauffement 9ba78e1 (`drawWarmup`, `ordinaryPreparation`, bandeau « Préparation graphique initiale »). Les deux tentatives notées comme échouées dans RELAIS-CODEX-2026-11-13 ont donc, au moins l'une d'elles, déployé la version 48. **Ne pas redéployer.**

## Échauffement (9ba78e1) mesuré

`drawWarmup.history` après le premier ciel (prêt à 63 s, cache de programmes partiellement froid après publication) :

| Programme | Premier dessin (soumission) |
|---|---|
| Groupe local HDR | 6 ms |
| Optique ordinaire (corps du système) | **1160 ms** |
| Nuage HDR émission/transmission | 6 ms |
| Optique ordinaire (nuage) | **625 ms** |
| Optique ordinaire (corps du système + nuage) | 9 ms |

Les coûts de premier dessin existent toujours (1,16 s et 0,63 s) mais sont absorbés pendant la préparation initiale, un par image, sous bandeau. Le nuage HDR ne coûte plus 2,9 s : la compilation sur la vraie cible HDR (69e1575) a eu son effet.

## La pause de sélection a disparu

| Image | 01/11 (f69ac41) | 15/11 |
|---|---|---|
| 1re sélection Tarentule depuis le Soleil | 107 ms | 106 ms |
| Proxima | 130 ms | 207 ms |
| **Resélection Tarentule** | **5986 ms** (nuage 2865, composition 2969) | **97 ms**, composition 0 ms |
| Arrivée à la Tarentule (passage stable) | 153 ms | 180 ms |

Le chemin du nuage était bien exercé avant le passage : variante « corps du système + nuage » active, passe « Nuage : émission 1052×833 » appelée 26 fois. Aucune image > 300 ms sur toute la séquence, aucune erreur.

**Sur Iris Xe, le lot A n'a plus de pause bloquante connue** : démarrage, sélection d'une nébuleuse, arrivée près d'un trou noir et d'une nébuleuse sont tous sous 200 ms d'image de transition une fois la préparation initiale faite. Restent ouverts : fluidité en session dégagée (jamais possible sur ce PC), mémoire complète, téléphone réel.
