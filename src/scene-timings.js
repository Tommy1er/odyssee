// Opt-in wall-time spans. Awaited driver work is included: these are NOT isolated CPU or GPU times.
export class SceneTimings {
 constructor(now=()=>performance.now()){this.now=now;this.slowFrames=[];this.transitions=[];this.last=null;}
 begin(s){this.start=this.cursor=this.now();const target=s.target?.id||null;this.current={target,pos:[...s.pos],transition:!this.last||this.last.target!==target||Math.hypot(...s.pos.map((v,i)=>v-this.last.pos[i]))>.01,stages:[]};}
 mark(label){if(!this.current)return;const now=this.now();this.current.stages.push({label,ms:now-this.cursor});this.cursor=now;}
 finish(error=null){if(!this.current)return;this.mark('Affichage final et vaisseau');this.last={...this.current,totalMs:this.cursor-this.start,error:error?String(error):null};
  if(this.last.totalMs>=100){this.slowFrames.push(this.last);if(this.slowFrames.length>12)this.slowFrames.shift();}if(this.last.transition){this.transitions.push(this.last);if(this.transitions.length>8)this.transitions.shift();}this.current=null;
 }
 snapshot(){return {note:'Temps écoulé par étape, attentes comprises ; ne pas additionner aux mesures GPU des dessins.',last:this.last,slowFrames:this.slowFrames,transitions:this.transitions};}
}
