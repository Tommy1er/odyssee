# Maquettes UI V3.1 — l'Univers plein écran, l'interface au bord

Reprise des maquettes V3 (`../maquettes/`) selon la direction du 18 novembre : univers plein écran par défaut, panneaux escamotables, HUD minimal, mode cinéma, vue extérieure du vaisseau conservée, Carte cosmique unifiée. Format de référence : **1280 × 585**, la fenêtre réelle d'Abdoulaye (Iris Xe), et 390 × 844 au téléphone.

Aucune de ces planches n'est branchée sur le code de production : elles servent à valider la direction visuelle avant toute refonte CSS.

| Planche | Fichier |
|---|---|
| Explorer · immersif, observation libre (cockpit) | `Explorer31.html` |
| Explorer · tiroirs Navigation (N) et Instruments (I) ouverts | `Explorer31-panneaux.html` |
| Explorer · vue extérieure du vaisseau en trajet (V) | `Explorer31-exterieur.html` |
| Explorer · mode cinéma (C) | `Explorer31-cinema.html` |
| Explorer · téléphone | `Explorer31-mobile.html` |
| Observatoire · même objet, niveau scientifique | `Observatoire31.html` · `Observatoire31-mobile.html` |
| Carte cosmique · zoom continu, niveau rendu aujourd'hui | `Carte31.html` · `Carte31-mobile.html` |

Chaque `.png` est le rendu Chromium de la planche du même nom.

## Principes

- **Plus aucune colonne permanente.** Le ciel occupe toute la fenêtre. Navigation et Instruments sont des tiroirs superposés (bords de l'écran, touches N / I), fermés au clic dans le ciel ou par Échap ; ils ne redimensionnent jamais la scène 3D.
- **Un seul HUD de vol**, en bas : destination et état, vitesse, γ, distance restante, temps à bord, temps de référence ; poussée / inertie / freinage, pause, vitesse de lecture, perspective Cockpit / Vaisseau. Il est identique dans Explorer et la Carte.
- **Fiche discrète** à côté de l'objet sélectionné : Engager le trajet · Observer (→ Observatoire) · Situer (→ Carte).
- **Vaisseau 3D conservé** comme perspective d'Explorer. **Carte galactique 3D et Structures cosmiques fusionnent** dans la Carte cosmique.
- **Continuité** : même vaisseau, même mission, même objet (Saturne sur toutes les planches), même temps. Changer d'espace ne déplace pas le vaisseau et ne modifie pas la simulation.
- **Honnêteté** : un statut de provenance reste visible sur chaque scène, y compris en mode cinéma.

## Fonds d'image

Les fonds (`assets/`) sont de **vrais rendus du moteur actuel**, capturés le 18 novembre 2026 avec Chromium/SwiftShader en vue dégagée (Saturne, Mars et le vaisseau en vue extérieure, carte galactique 3D à son niveau par défaut). Ils sont recadrés (bandeau supérieur retiré) et agrandis par cadrage CSS, sans retouche de contenu. `assets/tarentule.jpg` n'est pas utilisé dans les planches : il documente la limite actuelle du rendu des nébuleuses (nuage flou), chantier distinct de l'UI.

## Valeurs affichées

Les constantes de Saturne (demi-grand axe 9,58 ua, rayon équatorial 60 268 km, masse 5,683 × 10²⁶ kg, période 29,4 ans) sont des valeurs de référence publiées (NASA/JPL). Les valeurs de vol (vitesses, temps, distances restantes, « 1,2 M km ») remplissent les planches et n'ont pas été calculées par le moteur.

## Performance (à mesurer)

Choix faits pour l'Iris Xe : pas de `backdrop-filter` (flou = passe GPU à chaque image), panneaux semi-opaques, ciel de taille fixe à l'ouverture des tiroirs, HUD mis à jour à 4 Hz. Rien n'a encore été mesuré : le protocole prévu est `flightPerformance()` et les écarts d'images sur le Chrome d'Abdoulaye, avant et après implémentation.
