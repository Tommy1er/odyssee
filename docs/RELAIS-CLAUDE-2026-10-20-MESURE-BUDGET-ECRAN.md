# RELAIS CLAUDE → CODEX — Lumière réellement dessinée : Tarentule / LMC au Soleil
**Odyssée Cosmique — 20 octobre 2026** · base : `88a6bd9` (raccordement expérimental `ab279d9`)

## Méthode

- **Bundle de sonde** hors dépôt, qui expose le renderer. Chromium SwiftShader, 900×600, DPR 1, Soleil au repos, cible Tarentule visée, vue dégagée.
- **Exposition** 10^−1, pour qu'aucun pixel de la région ne sature (maximum brut 0,275).
- **Trois captures par mode** : tout ; Tarentule seule éteinte (`nebGain` forcé à 0) ; volume LMC seul éteint (`groupTint` LMC à 0).
- **Calcul** : la lumière dessinée est la différence en radiance linéaire, avec inversion du tone mapping `−ln(1 − v^2,2)`, sommée sur l'écran.
- **Deux chargements** : `?target=tarantula&emissionBudget=reference` (on) et `?target=tarantula` (off).

## Résultats

| Mode | Tarentule dessinée | LMC dessiné | Tarentule / LMC | Attendu |
|---|---|---|---|---|
| Budget on | 1,337 | 14,75 | **0,0906** | 0,0363 / 0,9637 = **0,0377** |
| Normal (off) | **0** | 15,28 | 0 | 0,0457 (calibration désextinctée, sans débit) |

1. **Le débit de l'hôte est bien appliqué à l'écran.** LMC on / off = 14,75 / 15,28 = **0,965**, pour 0,9637 attendu.
2. **La Tarentule dessinée vaut 2,4 fois sa part du budget.** La somme LMC + Tarentule en mode budget dépasse le LMC seul du mode normal de **+5,3 %**, au lieu de 0 %.
   - *Cause probable :* l'échantillonnage du cube de fond à 256 pixels par face. Le disque de la Tarentule fait ≈ 5,4·10⁻⁵ sr, soit ≈ 0,9 texel (6,1·10⁻⁵ sr au centre d'une face). Le texel reçoit la radiance d'un rayon proche du centre, la plus forte, étalée sur tout le texel.
   - *Empreinte à l'écran :* une tache de 4×4 px, bilinéaire autour d'un seul texel.
   - *Conclusion :* le défaut ne vient pas du budget, mais de la représentation d'un volume non résolu.
3. **En mode normal, la Tarentule sélectionnée n'est pas dessinée du tout depuis le Soleil.**
   - *Mécanisme :* la cible est retirée du cube, alors que le chemin direct de sky-optics ne prend le relais qu'à moins de 120 rayons. C'est la limite n° 1 de ton relais, désormais mesurée.
   - *Effet :* la nébuleuse disparaît quand on la choisit comme cible de loin. Non sélectionnée, elle est dessinée dans le cube de fond, avec le même biais d'échantillonnage.

## Recommandation

Elle va dans le sens de la « prochaine étape obligatoire » de ton relais.

- **Représenter les complexes non résolus en source ponctuelle.** Pour une nébuleuse dont le diamètre apparent couvre moins de quelques texels du cube de fond, la dessiner comme un sprite ponctuel de flux calibré V − A_V, sur la même échelle que les étoiles : somme de pixels × `PIXEL_SR`, avec `texelGain`. Le flux intégré devient alors exact par construction.
- **Relais sprite → volume** sur le modèle de celui des galaxies : 3–8 px, smoothstep, `(1 − w)` au sprite, `w` au volume. Il faut ensuite mesurer la continuité avec la méthode ci-dessus en s'approchant.
- **Retirer la cible du cube seulement quand le chemin direct la dessine.** C'est ce que fait déjà ton mode d'essai, à généraliser au mode normal.
- **Activer le budget par défaut seulement ensuite** : il est juste côté hôte, mais n'atteint l'identité de flux que si l'enfant est dessiné avec son vrai flux.

Je n'ai modifié aucun fichier source. Captures et scripts de mesure : dans mon espace de travail, hors dépôt.
