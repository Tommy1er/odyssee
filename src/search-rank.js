// Classement des résultats de recherche de destination.
// Ordre : nom exact, alias exact, nom commençant par la requête, alias commençant par la requête,
// mot du nom commençant par la requête, mot d'un alias, sous-chaîne du nom, sous-chaîne d'un alias,
// puis correspondance par l'astre hôte seulement (ex. « Saturne » → Titan). À rang égal : le plus proche d'abord.
export const normalizeQuery=s=>String(s??'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
const SATELLITE=new Set(['planet','exoplanet','moon']);
const words=s=>s.split(/[\s\-·,;:()/+'’]+/).filter(Boolean);

export function searchRank(o,q){
  const name=normalizeQuery(o.name),aliases=(o.aliases||[]).map(normalizeQuery).filter(Boolean),host=o.host?normalizeQuery(o.host):'';
  if(name===q)return 0;
  if(aliases.includes(q))return 1;
  if(name.startsWith(q))return 2;
  if(aliases.some(a=>a.startsWith(q)))return 3;
  if(words(name).some(w=>w.startsWith(q)))return 4;
  if(aliases.some(a=>words(a).some(w=>w.startsWith(q))))return 5;
  if(name.includes(q))return 6;
  if(aliases.some(a=>a.includes(q)))return 7;
  if(host.includes(q))return 8;
  return 9;
}

// Retourne les objets correspondant à la requête (même critère d'inclusion qu'avant : nom, hôte ou alias),
// triés par pertinence, puis par distance du système (une planète ou une lune prend celle de son astre parent),
// puis l'astre principal avant ses satellites.
const parentIndex=new WeakMap();
function parentOf(objects,o){if(!o.parent)return null;let m=parentIndex.get(objects);if(!m){m=new Map(objects.map(x=>[x.id,x]));parentIndex.set(objects,m);}return m.get(o.parent)||null;}
export function rankMatches(objects,query,{distance=o=>o.d}={}){
  const q=normalizeQuery(query);if(!q)return objects.slice();
  const out=[];
  for(const o of objects){const r=searchRank(o,q);if(r>=9)continue;const sat=SATELLITE.has(o.type)&&!!o.parent,p=sat?parentOf(objects,o):null;out.push([r,distance(p||o)??Infinity,sat?1:0,String(o.name||'').length,o]);}
  out.sort((a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2]||a[3]-b[3]);
  return out.map(x=>x[4]);
}
