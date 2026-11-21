# À lire par ChatGPT et Codex — ce qui s'est passé pendant votre absence (19–20 novembre 2026)

**Note temporaire de Claude.** Une fois lue et traitée, supprimez ce fichier, vous ou Claude, et retirez la ligne qui y renvoie dans `COLLABORATION.md` (§ « Dernier relais »), pour ne pas encombrer le dépôt. Les relais détaillés restent dans `docs/`.

Contexte : votre quota hebdomadaire était épuisé. Abdoulaye m'a demandé de continuer, puis de publier moi-même. **Le site sert la v58 depuis le 20 novembre** (`main` à `2f50f95`). Rien n'est en attente de publication.

## 1. Ce qui a été fait (dans l'ordre)

| Commit | Quoi | Relais à lire |
|---|---|---|
| `2ba60e8` | **Tranche 2a, essai immersif** : cadrer en regard seul (l'attitude `state.q` ne change plus), zoom optique de 70° à 1° (molette, Ctrl+molette, + et −), grossissement = tan(35°)/tan(champ/2), « Revenir à la vue du nez », ordre d'Échap. **Session d'essai `?essai=1`** : clés de stockage suffixées `.essai`, mission personnelle jamais lue ni écrite. Ce sont vos points du contre-avis `8eafaf3`. | `docs/RELAIS-CLAUDE-2026-11-19-TRANCHE2A-OBSERVATION.md` |
| `59cbeb6` | **Tranche 2b** : fiche de sélection (Cadrer, Fiche, Orienter le nez, Engager), statut de résolution au zoom (non résolu / carte NASA / modèle / reconstruction ; votre § 2.4), invariance optique testée vaisseau en mouvement (votre § 2.5). | `docs/RELAIS-CLAUDE-2026-11-19-TRANCHE2B-FICHE-RESOLUTION.md` |
| `6fc8df5`, `9ada4da` | **Preuve de faisabilité de la Carte cosmique dans le cockpit, niveau Groupe local** (orientation 1 du GO), en essai : enveloppe et galaxies McConnachie / UNGC rendues par le moteur du cockpit, sélection depuis la carte sans piloter, « Cadrer la sélection », étiquette. Coût mesuré : +4 appels de dessin, +101 points. Matrice de parité niveau 1 incluse. | `docs/RELAIS-CLAUDE-2026-11-20-CARTE-GROUPE-LOCAL-FAISABILITE.md` |
| `9ada4da` | Maquette V3.3 de la rangée basse (variantes A 76,5 % et B 79,3 % de ciel), rendue sur le vrai cockpit. | `docs/conception/maquettes-v3.3/README.md` |
| `0bc341a` | **Décisions du propriétaire du 20 novembre** : variante **A** appliquée (essai immersif ; B différée tant que la Carte n'a pas la parité) ; **« Privé » retiré** des trois pages (visible pour tous) ; provenance des doublons McConnachie / UNGC sur la Carte. | `docs/RELAIS-CLAUDE-2026-11-20-BARRE-A-PRIVE-PROVENANCE.md` |
| `d20e0a8` | **Distances du Groupe local** (validé par le propriétaire) : pour les 99 galaxies présentes dans les deux catalogues, l'objet UNGC est gardé mais sa distance devient celle de **McConnachie 2012** (UNGC en seconde source dans la fiche). M32 passe de 1,60 à 2,63 Mal. | même relais, § 4 et § 6 |
| `2f50f95` | Manifeste `.openai/hosting.json`, exigé par Sites (valeurs reprises de la v57). | `COLLABORATION.md` |
| `65a8310` | **v58 publiée** par Claude via l'éditeur Codex de Sites. Registre à jour. | `PUBLICATION.md` |

**Interface classique inchangée** pour les visiteurs, à deux exceptions demandées par le propriétaire : le retrait de « Privé » et les distances du Groupe local.

## 2. Pour Codex : la publication a changé de forme

La procédure qui a marché pour la v58 est notée dans `COLLABORATION.md` (§ hébergement) :
- la branche `main` de Sites a **son propre historique** (v57 = `d3b7855`, v58 = `4efec54`), qui ne descend pas de GitHub. On publie donc un **commit Sites enfant du précédent**, avec l'**arborescence exacte** du commit GitHub (`git diff --stat` vide), sans réécriture ni forçage ;
- `npm ci --cache /tmp/npm-cache`, car le cache par défaut `/home/agent/.npm` n'est pas inscriptible dans l'éditeur Sites ;
- le navigateur de vérification de l'éditeur fait moins de 901 px de large : il ne voit pas l'essai immersif. Vérifiez-le sur un écran de bureau.

Dans la conversation Codex de l'éditeur, j'ai par mégarde fait passer le niveau de réflexion de « Minimal » à « Moyen ». Remettez-le si vous préférez.

## 3. Ce qui vous revient (sans urgence)

1. **ChatGPT, audit** : relire les décisions de la tranche 2b et de la Carte. Points à challenger en particulier : le libellé « Cadrer (regard seul) » ; le statut de résolution (formulations scientifiques) ; la matrice de parité du niveau 1.
2. **ChatGPT, vérification scientifique** : **la valeur UNGC 2013 de M32 (0,49 Mpc dans nos données)**. Est-ce la valeur publiée par Karachentsev et al. 2013, ou une erreur de transcription de notre export ? Elle n'est plus utilisée pour la position, mais reste affichée comme seconde source. Si c'est une erreur de transcription, le corriger dans `build-extragalactic.py` et régénérer.
3. **Codex** : rien à publier pour l'instant. Au prochain commit de code, suivez la procédure du § 2.
4. **Mesures Iris Xe** encore à faire, sur le Chrome du propriétaire et en session `?essai=1` : temps d'image de la Carte, couche éteinte puis allumée ; parcours Mars (cadrer, zoomer au pavé tactile, observer, revenir). Démarrage à froid de la v58 relevé : 32,9 s jusqu'à l'interface, dont 23,4 s de préparation GPU.

## 3 bis. Ajouté après la v58 (non publié)

- **Carte niveau 2 « Voisinage de la Vierge »** en essai, avec Cosmicflows-4 sur la Carte : `docs/RELAIS-CLAUDE-2026-11-20-CARTE-NIVEAU2-VIERGE.md`. **Point à arbitrer (ChatGPT)** : UNGC, choisi « selon l'échelle » au niveau Vierge dans `cosmos.html` comme dans le cockpit, n'atteint pas l'amas de la Vierge. Faut-il passer à CF4 (3,9 Mo) ? Voir le § 2 du relais.

- **Carte niveaux 3 et 4** (Laniakea, toile cosmique) en essai, avec les bassins CF4 : `docs/RELAIS-CLAUDE-2026-11-21-CARTE-NIVEAUX-3-4.md`. **Points à arbitrer (ChatGPT)** : coût de rendu des bassins (× 2,5 à 3 sous SwiftShader, mesure Iris Xe à faire) ; saturation des points CF4 aux grandes échelles, dans les deux pages.

- **« Préparer le trajet » et « Situer »** (essai immersif) : `docs/RELAIS-CLAUDE-2026-11-21-PREPARER-SITUER.md`. Préparer ouvre un devis et n'engage plus directement.
- **Vaisseau Odyssée-02** (session d'essai), demandé par le propriétaire : `docs/RELAIS-CLAUDE-2026-11-21-VAISSEAU-ODYSSEE-02.md`. **Pour ChatGPT** : relire les justifications physiques et les deux références (Semyonov arXiv:2004.10079 ; Frisbee 2003, NASA NTRS 20060043411). **Pour Codex** : ne pas l'ouvrir au public avant la validation du propriétaire.
- **Carte : parité des quatre niveaux complète en essai** (Univers observable et horizon, bassins SDSS, plan supergalactique du dessus) : § 7 de `docs/RELAIS-CLAUDE-2026-11-21-CARTE-NIVEAUX-3-4.md`. Restent à trancher : coût Iris Xe, saturation CF4, UNGC au niveau Vierge.
- **Odyssée-02** : allure validée par le propriétaire (« c'est parfait »). L'ouverture au public n'est pas encore décidée.

## 4. Ce que Claude fait ensuite

Niveau 2 de la Carte (**Vierge, 150 Mal**), en essai, avec la même méthode : réutiliser les couches de `cosmos.html`, mesurer, compléter la matrice de parité. `cosmos.html` reste en ligne jusqu'à la parité complète et l'accord du propriétaire.

Règles inchangées : un seul dépôt, une seule branche `main`, chacun à son tour ; `git pull` avant de modifier ; ne jamais cliquer « Reprendre la mission sauvegardée » ni « Conserver ce nouveau vol » sur le Chrome du propriétaire ; aucune refonte publique sans validation de l'expérience.
