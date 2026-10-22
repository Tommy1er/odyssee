// Versioned local mission, separate from display preferences. Never replay wall time.
export const MISSION_KEY='odyssee.mission.v1',MISSION_VERSION=1;
export const missionFields=['pos','u','t','tau','odometer','engine','ap','orbit','gr','arrival','trackTarget','autoPlayback','rate','cap','retarded','localGravity','continuousGravity','gasDensity','grainMg','shield','lastJump'];
export const preferenceFields=['band','exposure','relativistic','doppler','animateBodies','observationRate','observationTime','shipFrame','shipLighting','galaxyLight','lensing','orbitS2','showEcliptic','showGalactic','showPath','catalogueMarkers','basinOverlay'];
const clone=x=>JSON.parse(JSON.stringify(x,(k,v)=>k==='object'&&v?.id?{$catalogue:v.id}:v));
export function snapshotMission(s,now=new Date().toISOString()){
 const mission=Object.fromEntries(missionFields.filter(k=>s[k]!==undefined).map(k=>[k,clone(s[k])]));
 mission.targetId=s.target?.id??null;mission.q=s.q.toArray?s.q.toArray():[...s.q];
 mission.journal=clone(s.journal.slice(-200));mission.trail=clone(s.trail.slice(-600));
 if(mission.orbit)mission.orbit.history=mission.orbit.history.slice(-600);
 return {version:MISSION_VERSION,savedAt:now,mission,preferences:Object.fromEntries(preferenceFields.filter(k=>s[k]!==undefined).map(k=>[k,s[k]]))};
}
const vector=(v,n=3)=>Array.isArray(v)&&v.length===n&&v.every(Number.isFinite);
function validateTree(v,depth=0){
 if(depth>20)throw Error('Sauvegarde trop complexe');
 if(typeof v==='number'&&!Number.isFinite(v))throw Error('Nombre invalide');
 if(v&&typeof v==='object')for(const [k,x] of Object.entries(v)){if(['__proto__','constructor','prototype'].includes(k))throw Error('Clé invalide');validateTree(x,depth+1);}
}
export function parseMission(text){
 if(typeof text!=='string'||text.length>2000000)throw Error('Sauvegarde absente ou trop grande');
 const d=JSON.parse(text);if(d.version!==MISSION_VERSION)throw Error('Version de sauvegarde incompatible');validateTree(d);
 const m=d.mission;if(!m||!vector(m.pos)||!vector(m.u)||!vector(m.q,4)||Math.hypot(...m.q)<.99||Math.hypot(...m.q)>1.01)throw Error('Position ou orientation invalide');
 for(const k of ['t','tau','odometer','rate','cap'])if(!Number.isFinite(m[k])||m[k]<0)throw Error('Horloge ou navigation invalide');
 if(m.rate<=0||m.cap<=0||m.cap>1||!['coast','thrust','brake'].includes(m.engine)||!Array.isArray(m.journal)||!Array.isArray(m.trail))throw Error('Mission invalide');
 if(m.targetId!==null&&typeof m.targetId!=='string')throw Error('Cible invalide');
 for(const k of ['trackTarget','autoPlayback','retarded','localGravity','continuousGravity','shield'])if(typeof m[k]!=='boolean')throw Error('Option physique invalide');
 if(m.orbit&&(!vector(m.orbit.r)||!vector(m.orbit.v)||!vector(m.orbit.normal)||!(m.orbit.mu>0)||!(m.orbit.surface>0)||!Array.isArray(m.orbit.history)||!Number.isFinite(m.orbit.t)||!Number.isFinite(m.orbit.tau)))throw Error('Orbite invalide');
 if(m.gr&&(!vector(m.gr.axis)||!(m.gr.rs>0)||!(m.gr.r>1)||!['fall','hover'].includes(m.gr.mode)))throw Error('État gravitationnel invalide');
 if(m.ap){const a=m.ap;if(!['brake','flight'].includes(a.stage)||!a.goal?.object?.$catalogue||!a.F||!Number.isFinite(a.missionStart))throw Error('Trajet invalide');if(!vector(a.F.b)||!vector(a.F.u)||!vector(a.F.x0)||!['t0','g','k'].every(k=>Number.isFinite(a.F[k])))throw Error('Référentiel invalide');if(a.stage==='flight'&&(!a.plan||!Number.isFinite(a.elapsed)||!vector(a.dir)||!vector(a.start)))throw Error('Étape de vol invalide');if(a.stage==='flight'&&!['distance','a','gp','u','b','xa','ta','pa','xc','tc','t','tau'].every(k=>Number.isFinite(a.plan[k])))throw Error('Plan incomplet');}
 const p=d.preferences;if(!p||typeof p!=='object')throw Error('Préférences invalides');
 for(const k of ['band','exposure','observationRate','observationTime'])if(p[k]!==undefined&&!Number.isFinite(p[k]))throw Error('Préférence invalide');
 if(p.band!==undefined&&(!Number.isInteger(p.band)||p.band<0||p.band>6)||p.exposure!==undefined&&(p.exposure<=0||p.exposure>1e6))throw Error('Affichage invalide');
 return d;
}
export function missionObjectIds(d){const ids=new Set([d.mission.targetId,d.mission.orbit?.id,d.mission.gr?.id].filter(Boolean));const visit=v=>{if(v&&typeof v==='object'){if(v.$catalogue)ids.add(v.$catalogue);else Object.values(v).forEach(visit);}};visit(d.mission.ap);return [...ids];}
export function restoreMission(d,byId){
 for(const id of missionObjectIds(d))if(!byId.has(id))throw Error('Objet indisponible : '+id);
 const revive=v=>{if(v&&typeof v==='object'){if(v.$catalogue)return byId.get(v.$catalogue);return Array.isArray(v)?v.map(revive):Object.fromEntries(Object.entries(v).map(([k,x])=>[k,revive(x)]));}return v;};
 const m=d.mission,result={};for(const k of missionFields)if(m[k]!==undefined)result[k]=revive(m[k]);
 for(const k of preferenceFields)if(d.preferences[k]!==undefined)result[k]=d.preferences[k];
 return {...result,target:byId.get(m.targetId)||null,q:[...m.q],journal:clone(m.journal),trail:clone(m.trail),paused:true,passage:null,opticalLab:false};
}
