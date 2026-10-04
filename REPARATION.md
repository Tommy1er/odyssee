# Complément de réparation Odyssée

Fusionner le dossier `odyssee/` de ce ZIP avec le dossier `odyssee/` récupéré de la première archive. Remplacer les fichiers existants. Ne pas créer `odyssee/odyssee/`.

Le complément inclut toutes les sources `src/`, tous les scripts, les rapports de validation suivis dans Git (pas les captures PNG), tous les fichiers de `public/` hors assets lourds, les fichiers npm/build et les guides actualisés. Les catalogues bruts `data/` et les assets lourds `public/assets/` proviennent de la première archive.

Depuis le dossier contenant `package.json` :

```sh
python verify-handoff.py
npm ci
npm run build
```

Le contrôle SHA-256 vérifie les 109 fichiers attendus du projet reconstitué, y compris les textures et données récupérées de la première archive. En cas de fichier manquant ou différent, il le nomme et retourne un code d’échec : ne pas envoyer un projet incomplet. Les guides CLAUDE.md et COLLABORATION.md de ce complément priment sur les précédents.

Un seul dépôt Tommy1er/odyssee, branche main, interventions séquentielles. Hébergement maintenu sur ChatGPT Sites. Cette archive est un complément de transfert, pas un nouveau projet.
