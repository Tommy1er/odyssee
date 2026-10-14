# Relais pour Claude — une alternative publique pour les bassins et les flux

Ta version `c3a4a88` (table CIE et manuel) est publiée sur le Site privé existant. Les 27 contrôles nébuleuses et la construction ont été revérifiés ici ; aucune nouvelle validation GPU de ma part.

## Blocage levé pour une reconstruction alternative

Les champs spécifiques Valade et al. 2024 et Hoffman et al. 2024 restent annoncés sur demande. **D'autres reconstructions publiées sont téléchargeables**, depuis le site officiel de l'équipe CosmicFlows à l'IP2I :

https://projets.ip2i.in2p3.fr/cosmicflows/

- Bassins : Dupuy & Courtois (2023), *Dynamic cosmography of the local Universe: Laniakea and five more watershed superclusters*, A&A 678 A176, https://doi.org/10.1051/0004-6361/202346802 ; texte et tableau : https://arxiv.org/html/2305.02339v2 .
- Champs de vitesse et densité : Courtois et al. (2023), *Gravity in the local Universe: Density and velocity fields using CosmicFlows-4*, https://arxiv.org/abs/2211.16390 .

Il faut nommer cette version **« reconstruction CF4 2023, non groupée »**, jamais la présenter comme le produit 2024 ni comme des vitesses 3D directement mesurées. Les reconstructions groupées et non groupées donnent des bassins différents ; ne pas les fusionner silencieusement.

## Fichiers disponibles hors ligne dans ce dépôt

`data/reconstructions-cf4-2023/` contient quatre FITS compressés sans altérer leurs octets, un manifeste (URLs, formes, SHA-256 bruts et compressés), environ 5,9 Mo au total :

| Fichier (suffixe .fits.gz) | Tableau NumPy | Usage |
| --- | --- | --- |
| CF4_new_128-z008_BoA | 128 × 128 × 128 | Étiquettes des bassins d'attraction |
| CF4_new_64-z008_velocity | 3 × 64 × 64 × 64 | Trois composantes du champ reconstruit |
| CF4_new_64-z008_delta | 64 × 64 × 64 | Champ de contraste de densité |
| CF4_new_64-z008_velocity_cube_error | 64 × 64 × 64 | Erreur de vitesse publiée, scalaire par cellule |

Le bassin est le membre exact de l'archive ZIP officielle (CRC vérifié), récupéré par plages HTTP pour éviter un téléchargement inutile des quatre membres (67 Mo). Aucun masque n'a été généré à la main. Les trois autres fichiers proviennent des liens FITS directs. Les en-têtes sont minimaux : pas de WCS, ni noms d'axes, ni unités physiques enregistrés.

## Contrôles réalisés et précautions concrètes

`python3 scripts/validate-cf4-reconstructions.py` : intégrité gzip/SHA-256, complétude FITS, dimensions et valeurs finies, étiquettes entières 0–9. Sous convention tableau [SGZ,SGY,SGX], boîte de 1000 Mpc/h centrée et pas 1000/128, les six attracteurs du tableau publié tombent dans les bons bassins (1 à 6). La cellule centrale vaut 1. Les 4079 cellules de Laniakea donnent 1,945 million (Mpc/h)^3, cohérent avec 1,9 million publié. Ces tests ne fixent pas à eux seuls la convention exacte du bord/centre de voxel.

Avant tout rendu :

1. La page source demande de **multiplier vitesses et erreurs de vitesse par 52**. Garder les fichiers bruts inchangés. Valider séparément l'ordre des trois composantes ; la forme du tableau ne suffit pas.
2. Les masques sont en 128³, les champs téléchargés en 64³ : pas d'association directe des indices. Vérifier boîte, origine, centrage, axes et unités avant rééchantillonnage. Étiquettes : voisin le plus proche, jamais interpolation linéaire.
3. Les distances sont en Mpc/h ; préciser h avant conversion en al. Une ligne de courant spatiale n'est pas une trajectoire prédictive sur des milliards d'années.
4. Le lien intitulé `delta_error` sur la page renvoie en fait à `velocity_cube_error`. Aucune erreur de densité n'a été récupérée. Ne pas dupliquer l'erreur de vitesse sous ce nom.
5. Le fichier delta comporte des valeurs < −1 (minimum −3,18). Ce champ reconstruit ne doit pas être converti naïvement en masse physique négative ni appliqué au vaisseau.

## Suite proposée

D'abord intégrer une couche optionnelle de bassins sourcés dans cosmos, avec nom de la reconstruction, légende, unités et limites ; ensuite les lignes de courant du champ, une fois leur repère validé. Conserver les points observés CF4 comme couche distincte. Aucune nouvelle couche de bassins ou de flux n'est encore activée dans le Site par ce relais. Aucun message n'a été envoyé aux auteurs.
