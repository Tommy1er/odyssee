# Relais Claude — 18 novembre 2026 : premières mesures de la tranche 0 sur Iris Xe (version 56)

Chrome du propriétaire, Windows, Intel Iris Xe, fenêtre 1280 × 585, DPR 1,5, machine chargée (bureautique ouverte). Deux chargements consécutifs du cockpit ; valeurs en secondes depuis le début de la navigation, lues dans `gpuStartupDiagnostic().phases`.

## 1. Démarrage par phase

| Phase | Chargement 1 (onglet **caché** au départ) | Chargement 2 (onglet visible, fenêtre active) |
|---|---|---|
| Téléchargement et lecture JSON | 1,71 → +1,59 | 0,41 → +1,32 |
| Préparation des objets | 3,30 → +1,36 | 1,73 → +0,86 |
| **Attente de la première image du navigateur** | 4,66 → **+11,06** | 2,59 → **+0,00** |
| Construction du moteur | 15,72 → +2,27 | 2,59 → +1,90 |
| Préparation GPU avant la première image | 17,98 → +11,53 | 4,48 → **+9,22** |
| **Interface active** | **29,5** | **13,7** |
| Préchauffage des variantes optiques (après l'interface) | +1,26 | +1,59 |

### Ce que cela établit

1. **L'hypothèse de l'attente d'image est confirmée.** Quand le cockpit démarre dans un onglet caché (lien ouvert en arrière-plan, fenêtre derrière une autre), `await nextFrame()` attend que le navigateur repeigne l'onglet : **11,1 s** perdues ici, et 0 s quand l'onglet est visible. Les « 2,3 s non tracées » du relais V54 relevaient du même phénomène.
2. **Hors attente, le premier poste est la préparation GPU avant la première image : 9,2 s sur 13,7 s (67 %)**, onglet visible. Viennent ensuite la construction du moteur (1,9 s), la lecture des JSON (1,3 s) et la préparation des objets (0,9 s).
3. Le préchauffage des variantes optiques se fait déjà **après** l'interface (1,3 à 1,6 s), sans bloquer l'utilisateur.

## 2. Ciel visible et fluidité (interface classique, vol libre, après démarrage)

- `skyOcclusion()` : **37,3 %** de la fenêtre (ciel 780 × 471 px). Cohérent avec la mesure locale (37,8 %).
- `frameTimingSample(10)` : 145 images en 10 s, **14,4 images/s**, médiane **50 ms**, p95 **234 ms**, maximum 300 ms, 58 images au-dessus de 50 ms. Mesure murale sur une machine chargée. C'est **la référence « Classique »** de la future comparaison, à reprendre sur les mêmes scènes que la tranche 1.

## 3. Leviers recommandés (Head, à instruire)

1. **Ne pas attendre une image quand l'onglet est caché.** L'attente sert seulement à laisser le navigateur afficher la progression avant la construction synchrone du moteur, ce qui est inutile si rien n'est visible. Correctif minime : passer l'attente quand `document.hidden`, ou la borner par un court délai. Gain observé jusqu'à 11 s dans ce cas, sans effet quand l'onglet est visible. Je l'intègre au prochain lot, avec un test.
2. **Rendre l'interface active avant la fin de la préparation GPU complète (D7).** C'est le domaine des programmes optiques, à instruire avec Codex : quelles passes la première image exige vraiment, lesquelles peuvent suivre (comme le préchauffage ordinaire le fait déjà). Le plafond de gain est d'environ 9 s sur ce chargement, sans promesse.

Aucun code modifié par ce relais.
