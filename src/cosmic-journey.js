// Separate persistence contract: never read/write the local cockpit mission.
export const COSMIC_KEY='odyssee.cosmic.v1';
export function cosmicSnapshot({distanceLy,accelerationG,elapsedYears},savedAt=new Date().toISOString()){
 return {version:1,model:'planck2018-flat-matter-lambda',distanceLy,accelerationG,elapsedYears,savedAt};
}
export function parseCosmicSnapshot(text){
 if(typeof text!=='string'||text.length>4096)throw Error('Sauvegarde cosmologique absente ou trop grande');const s=JSON.parse(text);
 if(s.version!==1||s.model!=='planck2018-flat-matter-lambda'||![s.distanceLy,s.accelerationG,s.elapsedYears].every(Number.isFinite)||s.distanceLy<0||s.distanceLy>1e9||s.accelerationG<=0||s.accelerationG>1||s.elapsedYears<0||s.elapsedYears>1e9)throw Error('Sauvegarde cosmologique incompatible');
 return cosmicSnapshot(s,typeof s.savedAt==='string'?s.savedAt:'');
}
export function advanceCosmicTime(elapsed,wallSeconds,duration,screenSeconds=30){
 if(![elapsed,wallSeconds,duration,screenSeconds].every(Number.isFinite)||elapsed<0||elapsed>duration||wallSeconds<0||duration<0||screenSeconds<=0)throw Error('Lecture cosmologique invalide');
 return Math.min(duration,elapsed+Math.min(wallSeconds,.25)*duration/screenSeconds);
}
