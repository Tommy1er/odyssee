// Budgets change sampling density only, never physical parameters or catalogue populations.
export const GRAPHICS_PROFILES=Object.freeze({
 performance:{pixels:1280*720,volume:256*256,scale:.5,ms:8},
 balanced:{pixels:1920*1080,volume:512*512,scale:.5,ms:12},
 quality:{pixels:2560*1440,volume:1024*512,scale:.75,ms:20}
});
export class VolumeBudget{
 constructor(now=()=>performance.now()){this.now=now;this.setProfile('balanced');}
 get scale(){return GRAPHICS_PROFILES[this.profile].scale;}
 setProfile(name){this.profile=Object.hasOwn(GRAPHICS_PROFILES,name)?name:'balanced';this.limit=GRAPHICS_PROFILES[this.profile].volume;this.samples=[];this.nextSample=0;this.medianMs=null;this.epoch=(this.epoch||0)+1;}
 sample(ms){if(!Number.isFinite(ms)||ms<=0)return;this.samples.push(ms);if(this.samples.length<5)return;
  const median=[...this.samples].sort((a,b)=>a-b)[2],p=GRAPHICS_PROFILES[this.profile];this.samples=[];this.medianMs=median;
  if(median>p.ms*1.3)this.limit=Math.max(p.volume/4,Math.floor(this.limit*.75));
  else if(median<p.ms*.6)this.limit=Math.min(p.volume,Math.ceil(this.limit*1.2));
 }
 begin(renderer){const now=this.now();const gl=renderer.getContext();this.gl=gl;if(!this.initialized){this.ext=gl.getExtension('EXT_disjoint_timer_query_webgl2');this.initialized=true;}const ext=this.ext;
  if(!ext||gl.isContextLost())return null;
  if(this.pending){const {query,epoch}=this.pending;
   if(gl.getParameter(ext.GPU_DISJOINT_EXT)){gl.deleteQuery(query);this.pending=null;this.samples=[];}
   else if(gl.getQueryParameter(query,gl.QUERY_RESULT_AVAILABLE)){const ms=gl.getQueryParameter(query,gl.QUERY_RESULT)/1e6;gl.deleteQuery(query);this.pending=null;if(epoch===this.epoch)this.sample(ms);}
  }
  if(gl.getParameter(ext.GPU_DISJOINT_EXT))return null;
  if(now<this.nextSample||this.pending||gl.getQuery(ext.TIME_ELAPSED_EXT,gl.CURRENT_QUERY))return null;
  const query=gl.createQuery();if(!query)return null;gl.beginQuery(ext.TIME_ELAPSED_EXT,query);this.nextSample=now+500;return query;
 }
 end(query){if(!query)return;const gl=this.gl;if(gl.isContextLost())return;gl.endQuery(this.ext.TIME_ELAPSED_EXT);this.pending={query,epoch:this.epoch};}
 snapshot(){return {profile:this.profile,pixelBudget:this.limit,scale:this.scale,sampleIntervalMs:500,gpuTimers:!!this.ext,medianGpuMs:this.medianMs??null};}
}
