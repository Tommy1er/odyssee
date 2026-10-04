# Odyssée — code source et collaboration

**Démarrage et reprise par Claude Code / Codex : [COLLABORATION.md](COLLABORATION.md).**
Application statique Three.js : `npm ci`, `npm run build`, `npm run dev` (Node.js 20+, Python 3 pour le serveur). Ouvrir http://localhost:3000. Aucun compte ni clé API nécessaire en local.

## Cosmic structures and progressive exploration — 4 October 2026

- `/cosmos.html`: four scale levels, explicit containment vs neighbouring structures, 19 named landmarks including distinct Virgo/Hercules clusters and superclusters, Laniakea, Norma/Great Attractor, Coma, Perseus–Pisces, Shapley and Boötes void. Search, 3D picking, smooth focus, free camera immersion, touch controls, clean view, sources and model-size toggle.
- Continuous shaded 3D galaxy geometry; no raster galaxy billboards. Adaptive cartographic glyph sizes are explicit and removable. Void underdensity, schematic density links and envelopes are not presented as measured boundaries or visible matter.
- Cosmic destinations added to the existing cockpit and its actual navigation/passage state. Geometry renders directly at screen resolution, with approximate vertex aberration and compressed gain. Flat-spacetime ideal flight, not cosmological FLRW propagation, expansion, measured spectra or future structure evolution.
- Old map point glyphs now have analytic circular edges. Existing nearby-body shaders, orbital dynamics and clocks preserved.
- Data sources and approximations live in `src/cosmic-data.js`, per-object UI and `public/physics-v2.html`. UI validation: `scripts/validate-cosmos.cjs`.

## Moving bodies, local orbital dynamics, initial Local Group — 3 October 2026

- Independent observation clock animates rotation while mission is paused. Surface rate selectable (1 / 1440 / 8640). Turning it off links rotation to mission time. Stellar granulation and slowed pulsar beams remain explicitly illustrative.
- Planet/moon centres follow circular parent-relative orbits, with catalogued periods or Kepler estimates. Planes/phases are illustrative, not ephemerides. Iterated retarded positions and future interception use these moving centres.
- Local SI velocity-Verlet gravity for known masses, weak field (>100 Rs) and relative speed <0.01c. Automatic proximity activation in free flight within 60 body radii, exit beyond 72. Not N-body or strong-field orbital GR; fast frame crossings may miss the activation zone. Surface boundary pauses flight. Separate existing radial Schwarzschild experiment retained.
- Finite 1g circularization assistance preserves manual takeover and gravity. Unbound flybys remain unbound unless thrust changes their energy. Local orbit map follows the body and displays the actual relative trail and physical body radius.
- M31, M33, LMC, SMC catalogue entries with primary-source links, continuous illustrative galaxy volumes and selectable 1/3/6 million-ly map scales. Their centres are static; no group dynamics or full resolved constituent catalogue. The later cosmic extension is described above; the observable universe is not fully covered.
- Guide updated in public/physics-v2.html. Checks: scripts/validate-orbits.mjs, scripts/validate-orbit-ui.cjs; moving-target navigation regression.

## Ship, passages and local gravity — 3 October 2026

- Passage state machine closes optical comparison, freezes mission time, transfers exactly once, confirms arrival, frames the destination and records a discontinuity. Stable is default. Instability is an explicit fictitious failure scenario, cancellable/stabilizable before transfer; it is not wormhole physics.
- Rounded Odyssée geometry, inspection environment lighting, independent multisampled/supersampled ship render, close camera framing, engine emission tied to thrust and braking. Retarded geometry modes retained; ship lighting and exhaust remain illustrative.
- Schwarzschild radial free-fall experiment with RK4 geodesics, conserved energy, local velocity and integrated proper time; static supported experiment, hover acceleration and tidal differential on 10 m. Horizon cutoff 1.05 Rs; no Kerr or general GR navigation. Manual exit retains local velocity using an explicit SR handoff convention.
- Distant background gravitational frequency shift before local observer boost; accretion disk transfer retains its own source-to-observer factor.
- Validation: `node scripts/validate-gravity.mjs`, existing SR/navigation/optics checks and `scripts/validate-physics-ui.cjs`.

## Full-resolution closeups — 2 October 2026

- Analytic 3D ray/sphere intersections, mapped planetary surfaces, rings and atmospheric shells run at output resolution after inverse aberration. Stars and neutron stars use differentiated procedural emission. No low-resolution cubemap resampling of these nearby surfaces.
- Selected nebula volumes and Schwarzschild geodesics also run at output resolution. Distant sky capture is 1024 per cube face on desktop / 512 on mobile, with a separate 256-face diffuse backdrop; circular cluster sprites and smaller stellar PSFs avoid block-like source blobs. Paused captures are cached for four seconds; local shaders animate independently.
- Earth day/cloud maps 8K, night 2K; other solar planets and Moon 2K. Solar System Scope / INOVE CC BY 4.0, provenance in public/assets/textures/sources.json and visible guide. Exoplanet surfaces and optical neutron-star representations remain explicitly hypothetical.
- Arrival detail panel automatically folds after four seconds, with reversible manual expansion. Clean-view mode removes overlays and side panels, with a permanent restore button.
- Validation: scripts/validate-visuals.cjs covers an actual Earth arrival, local approach, solar planets, exoplanet, star, pulsar, magnetar, nebula, black holes, relativistic comparison and mobile.

## Navigation and encounters — 2 October 2026

- Initial braking predicts the actual stopping position before computing the intercept and total remaining time. The committed target is stored independently of catalogue selection. Local manoeuvres intercept the translated target offset.
- A persistent arrival panel, progress and phase readout distinguish selection, initial braking, flight, visible final approach and arrival. Arrival pauses at rest, frames the object, and exposes local controls. Surface distances are labelled as centre distances.
- Automatic playback cannot skip the final encounter in one step; the last 100-radius planning window receives about ten simulated wall seconds. Manual playback changes remain available.
- Both cockpit and external camera can track the apparent target; manual camera drag / steering releases tracking. Offscreen markers work in both views. External craft view remains an inspection overlay without camera-offset parallax.
- Regression: `node scripts/validate-navigation.mjs`; browser encounters: `scripts/validate-navigation-ui.cjs` (Playwright). Guide: `public/physics-v2.html`.

# Odyssée — version 2, 2 octobre 2026

Current user-facing physics documentation: `public/physics-v2.html`. Earlier sections below are retained as historical implementation notes, superseded by this version.

- Independent Odyssée-01 speculative craft. NASA Voyager 1 is a catalogue destination with archived JPL Horizons state vectors (Sun, ICRF, km/s, 2026-10-02 TDB); future motion linear, orientation illustrative.
- Uncapped momentum-based SR propagation; optional 0.99c regulator. Manual force normalized to invariant 1g, catalogue-axis steering, no Wigner/Thomas transport. Stable tiny-distance route equations, display 1-beta rather than rounded c.
- Common HDR all-sky inverse-aberration pass, with thermal spectral colour reconstruction / CIE integration (NOT measured per-object spectra). IR/UV missing; nonthermal false-colour bands use bolometric amplification. All finite extended objects use the same angular transformation. Finite resolution at large gamma is labelled.
- 18,918 HYG velocity entries propagated from J2000. Radial data absent/zero labelled; unknown velocities preserved as static. Flat-spacetime linear past-light-cone solve; catalogue map simultaneous vs cockpit retarded. Future target interception. S2 illustrative Kepler orbit retarded iteratively. Diffuse pattern rotated with 225 Myr period at emission time; no stellar evolution, no N-body model. Statistical map population remains a reference backdrop.
- Scenario-based grain kinetic energy, proton energy, gas kinetic flux and directional CMB temperature; fictional shield; pedagogical pause threshold, no survival / dose / collision-frequency claims.
- Existing destination/manual/map/near-object tools preserved; default cockpit is relativistic. Physics dialog explains controls and assumptions; new guide supersedes relevant PDF-v1 sections.

Validation: `node scripts/validate-physics.mjs`, `node scripts/validate-evolution.mjs`, `node scripts/validate-optics.mjs`, and local headless interaction tests `scripts/validate-interactions.cjs`. Build: `node build.mjs`.

## Historical implementation notes (version 1)

# Odyssée · Atlas stellaire et cockpit

Application privée en français : atlas orthographique, cockpit en vol libre, navigation vers une destination et carte galactique 3D synchronisée. Aucun service externe n'est appelé pendant l'exploration ; les catalogues et le moteur 3D sont servis localement avec le site.

## Lancer et construire

- `npm ci`
- `npm run build` : bundle Three.js et du cockpit avec esbuild, puis copie de `public/` dans `dist/`.
- `npm run dev` : serveur local sur le port 3000.
- `node scripts/validate-physics.mjs` : invariants physiques et conversions.

`/` ouvre l'atlas ; `/cockpit.html` le vaisseau. Un lien `?target=<identifiant>` sélectionne un objet sans le téléporter ni engager automatiquement un trajet.

## Navigation

Sélectionner une destination puis « Calculer & engager » calcule un voyage idéal avec accélération, croisière éventuelle et freinage. Toute reprise ou rotation du cockpit désengage le navigateur en conservant l'impulsion. Le vol libre fonctionne sans cible. Glisser / flèches : orientation ; Q/E : roulis ; W/Z : poussée ; S : freinage ; espace : pause ; M : carte. Tourner sous poussée conserve la poussée et modifie la force, jamais instantanément la vitesse. Les boutons de propulsion restent actifs jusqu'à une nouvelle commande.

Les deux vues utilisent les mêmes position, impulsion, horloges et trajectoire. La carte est exprimée dans la base équatoriale J2000 avec plans galactique b=0 et écliptique, coordonnées héliocentriques, directions séparées du nez et de la vitesse, grille graduée, rotation, zoom et sélection. Le plan galactique de référence passe par le Soleil ; il ne représente pas son déplacement par rapport au plan médian physique de la Galaxie. Une rupture de trajet marque chaque saut fictif.

## Modèle physique et limites

Unités : année julienne et année-lumière, c=1. Vitesse limitée à 0,99 c. L'impulsion par unité de masse u=γv est conservée sans poussée ; le temps propre intègre dt/γ. La navigation depuis le repos suit la solution exacte à accélération propre longitudinale constante de 1 g. Le vol manuel intègre exactement une force constante d(γv)/dt par sous-pas dans le référentiel catalogue ; une poussée transversale n'est pas une accélération propre constante. Le plafonnement est une régulation idéale de propulsion. Masse constante et énergie illimitée supposées.

Aberration et facteur Doppler relativistes calculés pour les sources ponctuelles. RGB et luminosité comprimés pour un écran ; les disques proches ne sont pas ray-tracés relativistement. Pas de propagation temporelle des images ni de rotation de Terrell complète. Géométrie et données historiques statiques, sans évolution des étoiles ou mouvements propres pendant les voyages.

Indicateur de temps stationnaire de Schwarzschild séparé, jamais ajouté à l'horloge de vol en espace plat. Ombres et anneaux de trous noirs schématiques, sans intégration de géodésiques Kerr, lentille complète, marées ou dynamique orbitale gravitationnelle. Les manœuvres locales sont des segments propulsés, pas des orbites. Pas de carburant, poussières, rayonnement ou survie modélisés. Traversée d'une surface / horizon cible : pause et signalement du domaine non modélisé.

Le laboratoire de trous de ver est explicitement spéculatif. Les sauts ne contribuent ni au temps de vol ni à la distance parcourue et sont identifiés dans le journal. Ce n'est pas une simulation de toute la physique.

## Catalogue et provenance

Instantané du 1 octobre 2026 : 22 544 entrées stellaires et objets remarquables ; 6 083 exoplanètes NASA individuellement sélectionnables ; 8 planètes et 7 lunes du Système solaire. Total cockpit : 28 642 objets. Catalogue non exhaustif jusqu'à 10 000 al. Atlas : rayons 1, 5, 10, 100, 500, 1 000, 2 500, 5 000, 10 000 al.

- HYG v4.1 (David Nash / Astronexus), positions J2000 : entrées à moins de 100 al, puis magnitude V ≤ 7 jusqu'à 10 000 al. Alpha Centauri A/B regroupées, Proxima séparée. Distances historiques.
- NASA Exoplanet Archive, table `pscomppars` : hôtes avec distance <3067 pc, puis filtre ≤10000 al. Jointure par identifiant puis proximité <60 secondes d'arc et cohérence en distance <20 % (ou 1 al). Données mesurées et valeurs manquantes conservées.
- Gaia BH1/BH2/BH3, V404 Cygni, Piliers de la Création, Orion, Crabe, Anneau, Homoncule et pulsars : sources NASA / ESA, directions centrales SIMBAD. Les Piliers utilisent la direction centrale approximative de M16. Liens individuels dans les fiches.
- Planètes et lunes : tailles physiques de référence ou hypothèses explicitement étiquetées lorsque manquantes ; orbites moyennes / phases illustratives, pas les éphémérides. Aucune exolune inventée comme découverte confirmée.
- Les surfaces, nuages et volumes 3D sont des reconstitutions ; jamais présentés comme des photographies ou une vision humaine fidèle.

Les entrées de source, instructions d'extraction et base de l'atlas précédent sont conservées dans `data/` ; `scripts/extend-catalogue.py` reproduit l'adaptation (Python, NumPy, SciPy). Les données HYG adaptées sont sous CC BY-SA 4.0 ; voir `public/LICENSE-HYG.md`. Les exports source ne font pas partie des actifs hébergés.

Sources de référence :

- https://github.com/astronexus/HYG-Database/tree/main/hyg
- https://exoplanetarchive.ipac.caltech.edu/TAP/sync
- https://simbad.cds.unistra.fr/simbad/sim-tap/sync
- https://math.ucr.edu/home/baez/physics/Relativity/SR/Rocket/rocket.html
- https://www.desy.de/user/projects/Physics/Relativity/SR/Spaceship/spaceship.html
- https://science.nasa.gov/universe/black-holes/

## Validation et accès

Les rapports sous `validation/` documentent les contrôles du cockpit et de l'atlas. Tests de navigateur : navigation, reprise d'impulsion, pilotage sans destination, arrivée locale, planètes, lunes, trous noirs, sauts spéculatifs, carte 3D, sources et affichage mobile. Les tests mathématiques couvrent les horloges, l'accélération, l'inertie, le freinage, le plafond, l'aberration/Doppler et les transformations de coordonnées.

Accès Sites limité au propriétaire Abdoulaye. Ne pas élargir l'audience. `noindex` complète l'authentification de l'hébergeur et ne la remplace pas. Aucun secret dans le bundle ou le dépôt.

## Galactic and optical extension — 2026-10-01

The same private Site now has a NASA Voyager external view, uniform-motion Lorentz/retarded-emission geometry, exact point-source aberration and Planck/CIE stellar colours, Schwarzschild null-ray integration, and a position-dependent parametric Milky Way. The simulator keeps destination navigation and immediate manual takeover. Source and model limitations are explained in public/science.html.

47,128 astronomical catalogue entries plus 4 geometric waypoints; 65,000 separately labelled synthetic map samples. Counts are catalogue entries, not a proof of unique objects or completeness. Galactic light, cluster members and nebular volumes are reconstructions; wavelength views are not calibrated survey maps.

Validation: node scripts/validate-physics.mjs; node scripts/validate-optics.mjs; CHROMIUM_PATH=/path/to/chromium node scripts/validate-interactions.cjs. Local reports in validation/. Screenshot files are excluded from Git.

Frozen source snapshots: data/galaxy-*.gz. Rebuild extension: python scripts/build-galaxy-catalogue.py (numpy/scipy). Rebuild colour lookup: python scripts/build-spectrum.py. Asset and dataset attribution: public/assets/ATTRIBUTION.md and public/science.html.
