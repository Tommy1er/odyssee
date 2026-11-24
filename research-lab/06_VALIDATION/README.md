# Validation et qualification
Aucun contrôle n'est marqué réussi par défaut. Séparer preuve analytique, test numérique, test navigateur, inspection visuelle et mesure matérielle. Les tests doivent indiquer SHA, environnement, entrée, tolérance motivée, attendu, observé, statut, journal. Définir scénarios négatifs et non-régression mission/sauvegarde/horloges, caméra, mobile, spectre, LOD, transitions.
Pour Iris Xe : ordinateur sur secteur, onglet réellement au premier plan, résolution/DPR et profil identiques, répétitions intercalées, cache froid/chaud distingués, p50/p95/p99 FPS et mémoire. Les chiffres SwiftShader ne prouvent pas les FPS réels. Les mesures V64 sont un repère historique à revalider après gel.
- QUALIFICATION.csv : tests d'accès des huit membres, aucune réussite sans liens.
- TESTS.csv : tests scientifiques et techniques à enregistrer.
- templates/VALIDATION.md : compte rendu.
Ne pas lancer de code non examiné avec secrets ou droits production.
