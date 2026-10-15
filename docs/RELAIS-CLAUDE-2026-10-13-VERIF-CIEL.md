# Relais Claude → Codex · vérification navigateur du ciel CF4, table CIE officielle · 13 octobre 2026

Base : `21b0802`. Il s'agit surtout de la vérification que tu demandais. Le code applicatif n'est modifié que pour les couleurs des nébuleuses.

## Ta liste « à contrôler dans le navigateur » (SwiftShader, 1 100×760)

1. **Virgo/M87** :
   - Champ bleu prêt (55 877 symboles, 8 masqués), avec M87 et ses trois voisines CF4 en volume (41156, 41529, 41297).
   - Plus aucune mini-galaxie fictive.
   - Les repères dessinent l'amas et son voisinage.
2. **Hercule** :
   - Arrivée en 41 s, capture en 20 s, au lieu de plus de 60 s avant ton retrait des populations synthétiques. Le dépassement de délai que j'avais signalé est donc résolu.
   - Champ CF4 seul, l'amas formant une légère concentration.
   - Juste après l'arrivée, les slots catalogue sont encore vides : la mise à jour des voisines, toutes les 2 s de temps réel, n'avait pas encore eu lieu. C'est normal.
3. **Double-clic réel** : un repère bleu repéré dans la capture (décodage PNG), puis un double-clic, sélectionne `cf4:3088010` (« Galaxie elliptique · Cosmicflows-4 ») sans mettre en route le vaisseau (pause, pas d'autopilote).
4. **Case « Repères galaxies CF4 »** : `field.enabled` passe à `false` puis revient à `true`, avec capture sans symboles.
5. **Comparaison optique 0 / 0,99 c** :
   - à gauche, la référence ;
   - à droite, les symboles se resserrent vers l'avant et les volumes sont décalés vers le bleu et amplifiés ;
   - aucune erreur.
6. **Erreurs navigateur et shader** : aucune pendant tout le parcours.

Non vérifié ici : l'échec réseau puis le réessai, et le mobile ou les grands DPR.

## À documenter : traînées radiales

Depuis M87, les groupes paraissent étirés en traînées qui pointent vers la Voie lactée. Ce sont les incertitudes de distance CF4 (≈ 20 %) le long de notre ligne de visée, alors que les directions sont mesurées à mieux qu'une seconde d'arc. Une phrase dans le manuel l'explique, pour qu'elles ne soient pas lues comme des filaments.

## Couleurs des nébuleuses : table CIE officielle

- `data/CIE_xyz_1931_2deg.csv` (CIE 2019, DOI 10.25039/CIE.DS.xvudnb9b) était déjà dans le dépôt.
- `scripts/build-cie.py` en génère `src/cie-1931.js` : 1 nm de pas, de 360 à 830 nm, avec le SHA-256 de la source.
- `nebulae.js` interpole cette table. L'ajustement de Wyman et al. ne sert plus qu'au contrôle croisé : écart maximal de 0,024 entre 400 et 700 nm, ȳ(555 nm) = 1,0000.
- Les couleurs changent de quelques pourcents au plus.
- `validate-nebulae.mjs` passe à 27 contrôles.

## Vérifications exécutées

- Les 18 suites numériques, les textures et les données de référence passent, dont ta nouvelle suite `validate-catalogue-sky` (13).
- `validate-galaxy-ui.cjs` (10/10, corrigé le 15 octobre : 11/11 était faux, le test compte 10 contrôles) et `validate-nebula-ui.cjs` (6/6) relancés sur ta base, avec la table CIE : aucune erreur. Couleurs lues dans les captures :
  - cœur d'Orion (227, 238, 241) ;
  - enveloppe rose (206, 145, 189) ;
  - centre de M 57 (113, 243, 224).

## Laniakea : données manquantes

Les bassins d'attraction (Valade et al. 2024, *Nature Astronomy*) et les champs de vitesse et de densité reconstruits à partir de CF4 (Hoffman et al. 2024, *MNRAS*, grille 128³) ne sont pas publics. Selon les articles, ils sont *« available upon reasonable request to the authors »*. Je ne les ai pas inventés. La demande est transmise à Abdoulaye.
