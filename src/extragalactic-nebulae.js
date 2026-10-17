// Real extra-galactic star nurseries, navigable in cockpit. Coordinates J2000 from NASA Hubble/Webb.
// Their position, host and approximate size are observed; gas shape and internal emission-line ratios are MODELS.
// Deliberately separate from galaxy catalogue: these are regions INSIDE LMC/M33, not independent galaxies.
const at=(hours,minutes,seconds,sign,degrees,arcmin,arcsec,d)=>{
 const ra=15*(hours+minutes/60+seconds/3600)*Math.PI/180;
 const dec=sign*(degrees+arcmin/60+arcsec/3600)*Math.PI/180;
 return [d*Math.cos(dec)*Math.cos(ra),d*Math.cos(dec)*Math.sin(ra),d*Math.sin(dec)];
};
const sources=[
 {id:'tarantula',name:'Nébuleuse de la Tarentule · 30 Doradus',aliases:['30 Dor','30 Doradus','Caldwell 103','NGC 2070','Tarantula'],d:170000,radiusLy:700,ra:[5,38,42.4],dec:[-1,69,6,3.35],
  kind:'Région H II géante · dans le Grand Nuage de Magellan',host:'Grand Nuage de Magellan',
  note:'Région réelle de formation stellaire dans le Grand Nuage de Magellan. Centre et distance NASA Hubble ; rayon lumineux d’environ 700 al illustratif (différents auteurs utilisent des limites différentes). Les bulles, filaments, gaz, poussières et populations internes sont reconstruits, sans copier une photographie. Le V total de Caldwell 103 comprend aussi la lumière des étoiles associées ; le modèle ne sépare pas les deux et peut partiellement compter cette lumière avec l’éclat intégré du Nuage de Magellan.',
  links:[['NASA · Caldwell 103 · magnitude V 4,0','https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-caldwell-catalog/caldwell-103/'],['NASA · coordonnées 30 Doradus','https://science.nasa.gov/asset/hubble/30-doradus-nebula-in-visible-light/'],['NASA Webb · vue infrarouge (couleurs composées)','https://science.nasa.gov/asset/webb/30-doradus-miri-compass-image/']]},
 {id:'ngc604',name:'NGC 604 · nurserie stellaire de M33',aliases:['NGC 604','NGC604','H II M33'],d:2730000,radiusLy:800,ra:[1,34,33.79],dec:[1,30,46,59],
  kind:'Région H II géante · dans M33',host:'Galaxie du Triangle · M33',
  note:'Région réelle de formation stellaire dans un bras de la galaxie M33, avec des centaines d’étoiles massives. NASA Webb situe l’émission sur une région de l’ordre de 1 700 al. Rayon de rendu ≈ 800 al et V ≈ 11,5 sont des valeurs approximatives ; la photométrie totale de la nébuleuse dépend de l’ouverture et de la contribution stellaire. Bulles et filaments : reconstruction procédurale, non reconstitution de l’observation JWST.',
  links:[['NASA Webb · coordonnées et taille de NGC 604','https://science.nasa.gov/asset/webb/ngc-604-nircam-image/'],['NASA Hubble · formation stellaire dans M33','https://science.nasa.gov/missions/hubble/giant-star-birth-region-in-neighboring-galaxy/'],['Webb Deep-Sky Society · éclat visuel approximatif 11,5','https://www.webbdeepsky.com/nebulae-clusters/2020/nebula-cluster/october']]}
];
export function extragalacticNebulae(){return sources.map(o=>({
 ...o,type:'nebula',xyz:at(...o.ra,...o.dec,o.d),guide:true,planets:[],
 radiusLy:o.radiusLy,motion:[0,0,0],motionStatus:'Position J2000 nominale (NASA) ; pas de mouvement interne mesuré ou simulé, pas de dynamique propre du gaz.',
 regionHost:o.host,objectOrigin:'NASA Hubble / Webb ; structure émissive procédurale',d:o.d
}));}
