# Sources archivées

HYG v4.1 : https://raw.githubusercontent.com/astronexus/HYG-Database/main/hyg/CURRENT/hygdata_v41.csv — David Nash / Astronexus, CC BY-SA 4.0.

NASA Exoplanet Archive, extraction du 1 octobre 2026 via https://exoplanetarchive.ipac.caltech.edu/TAP/sync, ADQL :

```sql
select hostname,pl_name,sy_dist,ra,dec,sy_snum,disc_year,
 pl_rade,pl_bmasse,pl_orbsmax,pl_orbper,pl_eqt,st_rad,st_teff
from pscomppars where sy_dist < 3067
```

Les JSON SIMBAD proviennent de https://simbad.cds.unistra.fr/simbad/sim-tap/sync : jointure `ident.oidref = basic.oid`, récupération des identifiants et de `basic.ra`, `basic.dec`. Pour les trous noirs Gaia, les identifiants des étoiles compagnons sont les directions du système : Gaia DR3 4373465352415301632 (BH1), 5870569352746779008 (BH2), 4318465066420528000 (BH3). Les distances et masses sont une sélection NASA/ESA documentée dans les fiches.

`base-catalogue.json.gz` conserve l'état précédent avec les annotations éditoriales. Les catalogues volumineux sont compressés sans perte. Le script de reconstruction lit ces fichiers sans nouvelle requête distante.
