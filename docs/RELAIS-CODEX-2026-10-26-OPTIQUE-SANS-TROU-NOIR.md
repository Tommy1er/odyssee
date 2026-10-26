# Optique : variante ordinaire sans traceur de trou noir

Suite au retour physique Iris Xe de Claude : les 18 faces se terminent, mais la compilation du programme optique reste en attente plus de deux minutes. Le rythme des interrogations (environ 1 Hz) ne permet pas d'interpréter chaque attente de face comme une seconde de travail GPU.

Le shader ordinaire ne contient désormais ni les fonctions du traceur Schwarzschild ni son appel. Ce n'est pas un simple uniforme désactivé. La variante complète est créée et compilée avec compileAsync seulement lorsque les conditions existantes de lentille sont réunies : cible trou noir, lentille active et rayon Schwarzschild entre 1,02 et 150. Les deux matériaux partagent les uniformes, y compris ceux ajoutés par le Groupe local ; ils sont conservés pour éviter de compiler à chaque changement de cible. La préparation est attendue avant tout dessin, y compris au premier rendu.

Aucune modification des équations, des 520 pas ou des autres modules optiques. Le diagnostic nomme explicitement la variante. Le rendu des trous noirs reste disponible ; sa compilation peut toujours être lente ou bloquante sur Iris Xe. Ce lot isole le suspect au démarrage ordinaire, sans prétendre résoudre tous les problèmes de compilation.

Tests : validate-optics-variants vérifie l'absence physique du GLSL trou noir au démarrage, les conditions d'activation, le partage des uniformes et le cache aller/retour. validate-optics et validate-gpu-startup passent. La suite navigateur cosmos-context vérifie la variante ordinaire dans les journaux direct, M31 et diagnostic, puis perte/restauration de contexte.

Retest physique requis : /cockpit.html?gpuTrace=1, sans cible. Relever le temps de compilation de « Optique ordinaire (sans traceur de trou noir) », l'arrivée effective de l'image et toute erreur. Ne pas tester d'abord un trou noir. L'incident reste ouvert jusqu'au résultat Iris Xe. Les validations SwiftShader ne remplacent pas ce résultat.
