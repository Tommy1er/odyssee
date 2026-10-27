# Cadrage DPR et volumes proches du Groupe local

Suite au relais de Claude 85bec82, sur Iris Xe (DPR 1,5).

- Le défaut du nuage venait bien de mon appel setViewport(w,h) après setRenderTarget : Three r180 multiplie encore par le pixel ratio. La passe laisse désormais la cible appliquer son viewport physique. Ses dimensions viennent de getCurrentViewport, et le viewport physique précédent est restauré après la passe. La comparaison navigateur est maintenant répétée à DPR 1, 1,5 et 2, sur les pixels rendus (le précédent contrôle ne vérifiait que les dimensions de la texture).
- Les grands volumes de galaxies proches sont calculés dans une texture HDR à demi-largeur et demi-hauteur, puis ajoutés à la radiance du ciel avant la poussière de la nébuleuse, les corps et le Doppler. Le modèle original à 64 pas, les paramètres, les gains du budget lumineux et les teintes restent partagés. La radiance est normalisée avant stockage half-float pour conserver les émissions faibles.
- Un masque par galaxie sépare les grands volumes des petits : distance < 20 rayons et rayon apparent >= 64 pixels, aberration comprise. Les petites galaxies continuent leur marche originale à pleine résolution, sans double comptage et sans modifier le relais point-volume. La compilation de la nouvelle passe se fait en arrière-plan ; avant sa disponibilité ou en cas d'échec, l'ancien rendu complet reste actif.
- flightPerformance() indique groupPixels, groupReduced, groupPassReady et groupPassError ; le chronométrage distingue la passe « Groupe local : grands volumes » de l'optique finale.

## Vérification

Comparaisons HDR navigateur de la nébuleuse à trois DPR, puis des galaxies spirales et de type LMC (intérieur, proche, lointain ; source normale ou 1e-8 ; aberration activée). Mesures du flux, de l'erreur spatiale et du barycentre des galaxies ; maintien des petits volumes et du rendu de secours. Suites d'intégration cockpit/zoom/diagnostic conservées. CI 40586304638 : les deux probes passent. Nuage : 72 cas, erreur maximale de flux 0,02990 %, transmission moyenne 0,08873 %. Galaxies : 36 cas, erreur maximale de flux 0,05097 %, erreur spatiale L1 2,8231 %, écart de barycentre maximal 0,00620 pixel. Ces valeurs concernent les scènes du banc en SwiftShader, pas une mesure de fluidité sur Iris Xe.

## Essai physique restant

Même parcours Soleil → Tarentule → Cygnus X-1, idéalement PC sur secteur et charge concurrente réduite. Vérifier le centrage sous le repère, le coût des deux passes (nuage et galaxie), puis les images/s. Ne pas extrapoler un gain ×4 : il reste d'autres coûts et une interpolation spatiale.

La multitude d'applications ouvertes rend plausible une contention de ressources mais ne prouve pas à elle seule la cause des épisodes à 1 image/s. Les temps GPU peuvent eux aussi varier avec la contention, les fréquences et la charge thermique. L'expérience de désactivation du Groupe local et le défaut DPR restent des indications solides ; les valeurs absolues doivent être comparées dans des conditions semblables. La compilation anticipée des trous noirs n'est pas modifiée dans ce lot.
