// Map-only catalogue coordinates: Mpc converted to million light-years (Julian year).
// Distance moduli are NOT converted into a cosmic time, a peculiar velocity or a future orbit.
import {xyz} from './cosmic-data.js';
export const MPC_MLY=3.261563777167433;
export const CATALOGUES={
 'mcconnachie':{file:'mcconnachie-map.json',name:'Galaxies proches · McConnachie 2012',color:0x8de3c5,url:'https://cdsarc.cds.unistra.fr/viz-bin/cat/J/AJ/144/4',limit:'Catalogue historique, candidats et associations tels que publiés en 2012 ; pas un inventaire actuel exhaustif du Groupe local.'},
 'ungc':{file:'ungc-map.json',name:'Volume local · UNGC 2013',color:0x8cbff2,url:'https://cdsarc.cds.unistra.fr/viz-bin/cat/J/AJ/145/101',limit:'Distances compilées de méthodes diverses. Ce tableau ne fournit pas leurs erreurs individuelles ; absence d’erreur ne signifie pas précision parfaite.'},
 'cf4':{file:'cf4-map.json',name:'Cosmicflows‑4 · 2023',color:0xffce91,url:'https://cdsarc.cds.unistra.fr/viz-bin/cat/J/ApJ/944/94',limit:'Échantillon inégal et incomplet du ciel. Les trous du relevé ne sont pas nécessairement des vides cosmiques. Distances individuelles, sans correction des biais ni reconstruction des flux.'}
};
export const METHODS=['Supernova Ia','Tully–Fisher','Plan fondamental','Fluctuations de brillance de surface','Supernova II','Sommet de la branche des géantes rouges','Céphéides','Masers'];
export const modulusDistance=dm=>10**((dm-25)/5);
export const distanceInterval=(dm,e)=>[modulusDistance(dm-e),modulusDistance(dm+e)];
export const normalizeName=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
export function decodeCatalogue(key,payload){
 if(!CATALOGUES[key]||payload.schema!==1||!Array.isArray(payload.rows))throw Error('Format de catalogue inconnu');
 const seen=new Set();return payload.rows.map((r,i)=>{
  const cf=key==='cf4',mpc=cf?modulusDistance(r[3]):r[3],id=key+':'+(cf?r[0]:i);
  if(seen.has(id)||![r[1],r[2],mpc].every(Number.isFinite)||mpc<=0||r[1]<0||r[1]>=360||Math.abs(r[2])>90)throw Error('Coordonnées de catalogue invalides');seen.add(id);
  const name=cf?'PGC '+r[0]:r[0],o={id,name,key,ra:r[1],dec:r[2],mpc,d:mpc*MPC_MLY,p:xyz(r[1],r[2],mpc*MPC_MLY),type:'observed',r:Math.max(.005,Math.min(.08,mpc*.003)),level:0,raw:r};
  o.search=normalizeName([name,key,cf?'':r[8]||''].join(' '));
  if(cf){Object.assign(o,{dm:r[3],eDm:r[4],vCmb:r[5],groupPgc:r[6],methods:METHODS.filter((_,i)=>r[7]&(1<<i)),interval:distanceInterval(r[3],r[4]),sgl:r[8],sgb:r[9]});}
  return o;
 });
}
export function filterCatalogue(rows,{query='',maxMpc=Infinity,maxError=Infinity}={}){
 const q=normalizeName(query),matches=rows.filter(o=>o.mpc<=maxMpc&&(o.eDm==null||o.eDm<=maxError)&&(!q||(/^pgc[0-9]+$/.test(q)&&o.key==='cf4'?normalizeName(o.name)===q:o.search.includes(q))));
 if(q)matches.sort((a,b)=>Number(normalizeName(b.name)===q)-Number(normalizeName(a.name)===q)||a.d-b.d);
 return matches;
}
// J2000 equatorial -> Galactic (IAU), followed by de Vaucouleurs' Galactic -> supergalactic axes.
const EQ_GAL=[[-.0548755604162154,-.873437090234885,-.483835015548713],[.494109427875584,-.444829629960011,.746982244497219],[-.867666149019005,-.198076373431201,.455983776175067]];
const rad=Math.PI/180,l=47.37*rad,b=6.32*rad;
const sgX=[-Math.sin(l),Math.cos(l),0],sgZ=[Math.cos(l)*Math.cos(b),Math.sin(l)*Math.cos(b),Math.sin(b)],sgY=[-Math.cos(l)*Math.sin(b),-Math.sin(l)*Math.sin(b),Math.cos(b)];
export const SG_AXES=[sgX,sgY,sgZ].map(v=>[0,1,2].map(j=>v.reduce((s,x,i)=>s+x*EQ_GAL[i][j],0)));
export const toSupergalactic=p=>SG_AXES.map(a=>a.reduce((s,x,i)=>s+x*p[i],0));
