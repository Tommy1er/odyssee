import {solveComovingTransfer} from './rocket-transfer.js';
let plan;
self.onmessage=({data})=>{try{
 if(data.type==='plan'){
  plan=solveComovingTransfer(data.options);if(!plan.reachable){self.postMessage({id:data.id,type:'unreachable',reason:plan.reason,maxDistanceLy:plan.maxDistanceLy});return;}
  const points=Array.from({length:129},(_,i)=>plan.sample(plan.durationYears*i/128));
  self.postMessage({id:data.id,type:'plan',plan:{durationYears:plan.durationYears,turnYears:plan.turnYears,distanceLy:plan.distanceLy,accelerationG:plan.accelerationG,end:plan.end,positionResidualLy:plan.positionResidualLy,toleranceLy:plan.toleranceLy,momentumMismatch:plan.momentumMismatch,points}});
 }else if(data.type==='sample'&&plan?.reachable)self.postMessage({id:data.id,type:'sample',sample:plan.sample(data.elapsedYears)});
 }catch(e){self.postMessage({id:data.id,type:'error',message:e.message});}};
