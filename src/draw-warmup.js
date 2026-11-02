// One first-use draw per ordinary flight frame. Driver submission can STILL block; record it honestly.
export class DrawWarmup{
 constructor(){this.queue=[];this.history=[];}
 enqueue(label,draw){return new Promise((resolve,reject)=>this.queue.push({label,draw,resolve,reject}));}
 step(){const job=this.queue.shift();if(!job)return;const start=performance.now();this.active=job.label;
  try{job.draw();this.history.push({label:job.label,wallMs:performance.now()-start,status:'ready'});job.resolve();}
  catch(e){this.history.push({label:job.label,wallMs:performance.now()-start,status:'error',error:String(e)});job.reject(e);}
  finally{this.active=null;if(this.history.length>12)this.history.shift();}
 }
 snapshot(){return {pending:this.queue.map(j=>j.label),active:this.active||null,history:this.history};}
}
