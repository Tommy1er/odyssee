# Odyssée — reprise par Claude Code et Codex

État de transmission : 4 octobre 2026. Application statique en français, sans backend ni clé API nécessaire pour fonctionner. Le site hébergé et son dépôt GitHub sont deux services distincts : un push GitHub ne publie pas automatiquement le site actuel.

## Démarrer

Prérequis : Node.js 20 ou plus, npm, Python 3 (uniquement pour le serveur de développement).

```sh
npm ci
npm run build
npm run dev
```

Ouvrir http://localhost:3000 ; cockpit : `/cockpit.html` ; grandes structures : `/cosmos.html` ; manuel actuel : `/physics-v2.html`.
Après une modification de `src/`, relancer `npm run build`, puis recharger la page. Le serveur ne reconstruit pas automatiquement. Ne pas ouvrir les HTML en `file://`.
Le dossier `dist/` produit par la construction est celui à publier sur le Site existant.

## Référence commune et relais

Le dépôt de référence est `https://github.com/Tommy1er/odyssee`, branche unique `main`. Claude et Codex interviennent à tour de rôle, jamais simultanément, conformément à la consigne d’Abdoulaye. Aucun fork ni branche de développement parallèle pour ce fonctionnement.

Avant chaque intervention : récupérer le dernier `main` avec `git pull --ff-only`, vérifier l’état du dossier et lire le dernier commit. Après les modifications : construire, vérifier les fonctions touchées, faire un commit explicite et le pousser sur `main` avant de rendre la main. Si la récupération ou l’envoi est refusé, inspecter la divergence ; ne pas écraser l’historique avec un push forcé. Les espaces de travail locaux servent au même dépôt, ils ne constituent pas des projets autonomes.

Autoriser ce dépôt dans les intégrations GitHub de Claude et de ChatGPT/Codex. Les assistants partagent les fichiers et les commits, pas leurs souvenirs de conversation. Les résultats de test et les limites doivent être résumés lors du relais.

## Hébergement conservé sur ChatGPT Sites

Adresse : https://atlas-stellaire-abdoulaye.abdoul97.chatgpt.site

Le site reste sur **ChatGPT Sites**. Aucune migration vers Netlify, Vercel ou Cloudflare Pages. Après un changement envoyé par Claude sur GitHub, Abdoulaye demande à Codex de publier la dernière version. Codex récupère le dernier `main`, construit et vérifie le projet, puis publie sur le Site existant en conservant son identité et son audience privée. GitHub → Sites n’est pas automatiquement synchronisé.

La configuration interne Sites reste gérée dans le projet d’hébergement existant et n’est pas nécessaire pour exécuter le dépôt localement. La visibilité du dépôt GitHub et celle du site sont deux réglages indépendants ; ne pas les modifier pendant ce relais.

## Import initial et réparation du transfert

L’archive initiale reçue a été signalée tronquée après `public/cosmos.js`. Le complément `Odyssee-complement-sources.zip` doit être extrait **dans le même dossier**, en fusionnant les deux dossiers `odyssee` et en remplaçant les fichiers homonymes. Il conserve les ressources lourdes déjà récupérées. Voir `REPARATION.md` et le manifeste SHA-256 `HANDOFF-COMPLETE.json` pour contrôler tout le projet reconstitué.

Le dépôt GitHub existe déjà : récupérer son `main`, y intégrer les fichiers complets, remplacer le README initial par celui du projet, vérifier la construction, puis faire l’envoi initial sans réinitialiser ni forcer son historique.

## Architecture

| Fichiers | Responsabilité |
| --- | --- |
| `public/index.html`, `app.js`, `style.css` | Atlas stellaire initial |
| `src/cockpit.js`, `public/cockpit.html`, `cockpit.css` | Commandes, mission, sélection, interface |
| `src/physics.js`, `navigation.js`, `ephemeris.js` | Cinématique relativiste, navigation, positions et retard lumineux |
| `src/gravity.js`, `orbits.js`, `passage.js` | Expériences gravitationnelles, orbites locales, passage fictif |
| `src/renderer.js`, `sky-optics.js`, `closeup.js`, `black-hole.js`, `spacecraft.js` | Rendu, optique, astres proches, trou noir, vaisseau |
| `src/galaxy.js`, `local-group.js`, `body-data.js` | Populations galactiques, groupes et données des astres |
| `src/cosmic-data.js`, `cosmic-scene.js`, `cosmos.js` | 19 repères cosmiques, géométrie 3D, carte multi-échelle |
| `public/assets/`, catalogues JSON de `public/` | Données et ressources servies localement |
| `scripts/validate-*` | Régressions numériques et interactions navigateur |

Modifier les modules de `src/`, puis reconstruire `public/cockpit.js` et `public/cosmos.js`, qui sont des bundles générés. L’atlas `public/app.js` reste une source éditable.

## Vérifier selon ce qui change

```sh
node scripts/validate-physics.mjs
node scripts/validate-navigation.mjs
node scripts/validate-evolution.mjs
node scripts/validate-optics.mjs
node scripts/validate-gravity.mjs
node scripts/validate-orbits.mjs
npm run build
```

Pour les tests navigateur, installer Playwright localement sans modifier le verrouillage des dépendances de production :

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node scripts/validate-cosmos.cjs
```

Les scripts UI utilisent leurs propres serveurs locaux et écrivent dans `validation/v2-screenshots/`. Créer ce dossier s’il manque. La variable facultative `CHROMIUM_PATH` permet d’utiliser un Chromium déjà installé. Les tests de navigation, d’orbites et de rendu ont leurs scripts dédiés ; les lancer séquentiellement car certains utilisent le même port. Le rendu logiciel peut être lent. Les comptes rendus JSON inclus sont des résultats de sessions précédentes, pas une preuve que des modifications futures passent.

## Principes scientifiques à préserver

- Séparer données observées, modèles simplifiés et fiction. Sources et hypothèses dans les fiches et le manuel.
- Le cockpit conserve ses horloges et sa navigation physique ; la caméra libre de la carte cosmique n’est pas un déplacement du vaisseau. Le passage entre ces deux pages recharge l’application : la mission n’est actuellement pas sauvegardée.
- Les voyages cosmiques restent une extrapolation de relativité restreinte en espace plat : pas d’expansion FLRW, pas de propagation cosmologique complète ni de simulation de l’évolution future des structures.
- Les galaxies des amas sont des géométries synthétiques, pas un catalogue mesuré de leurs membres. Les enveloppes, filaments et centres de cadrage des grandes régions sont schématiques. Le mode « Tailles du modèle ×1 » enlève l’amplification cartographique, sans rendre les tailles illustratives plus précises.
- L’amas de la Vierge, son superamas historique et Laniakea sont des notions différentes. Les amas voisins et les vides ne sont pas des couches obligatoires à traverser dans un ordre linéaire.
- La gravité locale est limitée aux régimes documentés ; pas de capture automatique artificielle d’un survol non lié. Les trous de ver sont des transitions fictives, pas une solution physique validée.
- La nouvelle géométrie cosmique applique une aberration approchée et un gain comprimé, pas un transfert spectral complet. Ne pas présenter le rendu comme une photographie scientifiquement exacte.
- La portée actuelle va du voisinage stellaire à des structures proches du milliard d’années-lumière. Elle ne couvre pas tout l’Univers observable.
- Conserver les attributions et licences des données, des textures et du modèle Voyager dans `public/assets/ATTRIBUTION.md`, `public/assets/textures/sources.json` et les documents existants. Publier le dépôt ne choisit pas automatiquement une licence pour le code du projet.

## Message de départ pour Claude

« Reprends Odyssée. Lis CLAUDE.md, COLLABORATION.md et public/physics-v2.html. Construis et lance le projet, puis examine le rendu 3D et les limites physiques. Travaille sur la branche commune `main`, à ton tour après récupération de sa dernière version, conserve la navigation destination + vol libre et les deux référentiels. Distingue explicitement données, approximations et fiction. Propose une amélioration ciblée, teste les interactions concernées puis enregistre et envoie un commit sur `main` en expliquant les changements, validations et limites. L’hébergement reste sur ChatGPT Sites ; Codex assurera la publication. Ne remplace pas le projet par une démonstration simplifiée. »
