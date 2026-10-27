// Opt-in profiling. GPU queries are asynchronous: never gl.finish, never wait for a query.
// Covers every renderer.render call, including cube faces and mipmap work inside that call.
export class RenderPerformance{
 constructor(renderer){this.renderer=renderer;this.gl=renderer.getContext();this.ext=this.gl.getExtension('EXT_disjoint_timer_query_webgl2');this.pending=[];this.rows=new Map();this.frames=[];this.cpu=[];this.discarded=0;this.frame=0;
  const original=renderer.render;this.original=original;const self=this;
  renderer.render=function(scene,camera){const target=this.getRenderTarget(),name=target?(target.texture.name||'Cible hors écran')+' '+target.width+'×'+target.height:(scene.children.find(o=>o.material)?.material?.name||'Écran');
   const gl=self.gl;let query=null;
   if(self.ext&&self.frame%10===0&&self.pending.length<64&&!gl.isContextLost()&&!gl.getQuery(self.ext.TIME_ELAPSED_EXT,gl.CURRENT_QUERY)){query=gl.createQuery();gl.beginQuery(self.ext.TIME_ELAPSED_EXT,query);}
   const start=performance.now();try{return original.call(this,scene,camera);}finally{self.record(name,'cpu',performance.now()-start);if(query){gl.endQuery(self.ext.TIME_ELAPSED_EXT);self.pending.push({query,name});}}
  };
 }
 record(name,kind,ms){let row=this.rows.get(name);if(!row){row={cpu:[],gpu:[],calls:0};this.rows.set(name,row);}if(kind==='cpu')row.calls++;row[kind].push(ms);if(row[kind].length>240)row[kind].shift();}
 begin(now){this.frame++;if(this.previous!=null){this.frames.push(now-this.previous);if(this.frames.length>240)this.frames.shift();}this.previous=now;this.start=performance.now();this.poll();}
 mark(label){const now=performance.now();if(this.markTime!=null)this.record(label,'cpu',now-this.markTime);this.markTime=now;}
 end(){this.cpu.push(performance.now()-this.start);if(this.cpu.length>240)this.cpu.shift();this.markTime=null;}
 poll(){const gl=this.gl;if(gl.isContextLost()){this.pending=[];return;}const disjoint=this.ext&&gl.getParameter(this.ext.GPU_DISJOINT_EXT);
  this.pending=this.pending.filter(({query,name})=>{if(disjoint){gl.deleteQuery(query);this.discarded++;return false;}if(!gl.getQueryParameter(query,gl.QUERY_RESULT_AVAILABLE))return true;this.record(name,'gpu',gl.getQueryParameter(query,gl.QUERY_RESULT)/1e6);gl.deleteQuery(query);return false;});}
 snapshot(){const stats=a=>{if(!a.length)return null;const s=[...a].sort((a,b)=>a-b);return {n:a.length,meanMs:a.reduce((a,b)=>a+b,0)/a.length,p50Ms:s[Math.floor(s.length*.5)],p95Ms:s[Math.floor(s.length*.95)],maxMs:s.at(-1)};};
  return {gpuTimers:!!this.ext,note:'CPU = soumission/attente ; GPU = dessins échantillonnés 1 image sur 10, pas toute la trame',frame:stats(this.frames),frameWork:stats(this.cpu),pending:this.pending.length,discarded:this.discarded,passes:Object.fromEntries([...this.rows].map(([n,r])=>[n,{calls:r.calls,cpu:stats(r.cpu),gpu:stats(r.gpu)}]))};}
 dispose(){this.renderer.render=this.original;for(const {query} of this.pending)this.gl.deleteQuery(query);this.pending=[];}
}
