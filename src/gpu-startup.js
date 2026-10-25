import * as T from 'three';

export const GPU_TRACE_KEY='odyssee-gpu-startup-v1';
export const nextFrame=()=>new Promise(resolve=>requestAnimationFrame(resolve));

// Wall-clock CPU/driver timings, NOT GPU timer queries. In the explicit diagnostic
// mode each draw also waits for gl.finish(), isolating the last submitted pass.
export class GPUStartup {
 constructor({sync=false,storage=globalThis.sessionStorage,now=()=>performance.now(),onUpdate=()=>{}}={}){
  this.sync=sync;this.storage=storage;this.now=now;this.onUpdate=onUpdate;this.entries=[];this.active=[];this.ready=false;this.cancelled=false;this.restore=[];
  try{this.previous=storage?.getItem(GPU_TRACE_KEY);}catch{}
 }
 persist(){try{this.storage?.setItem(GPU_TRACE_KEY,JSON.stringify({sync:this.sync,ready:this.ready,entries:this.entries}));}catch{}this.onUpdate(this);}
 begin(label){const e={label,start:this.now(),status:'en cours'};this.entries.push(e);if(this.entries.length>300)this.entries.shift();this.active.push(e);this.persist();return e;}
 end(e,error){e.ms=Math.round(this.now()-e.start);e.status=error?'échec':'terminé';if(error)e.error=String(error.message||error);this.active=this.active.filter(x=>x!==e);this.persist();}
 check(){if(this.cancelled||this.gl?.isContextLost())throw Error('Démarrage interrompu : contexte WebGL perdu');}
 run(label,fn){this.check();const e=this.begin(label);try{const value=fn();this.check();this.end(e);return value;}catch(error){this.end(e,error);throw error;}}
 async task(label,fn){this.check();const e=this.begin(label);try{const value=await fn();this.check();this.end(e);return value;}catch(error){this.end(e,error);throw error;}}
 attach(renderer){
  this.gl=renderer.getContext();const gl=this.gl;this.parallel=!!gl.getExtension('KHR_parallel_shader_compile');
  this.run('Contexte : KHR_parallel_shader_compile '+(this.parallel?'disponible':'absent'),()=>{});
  const debug=gl.getExtension('WEBGL_debug_renderer_info');
  this.run('Pilote : '+gl.getParameter(debug?debug.UNMASKED_RENDERER_WEBGL:gl.RENDERER)+' · tampon '+gl.drawingBufferWidth+'×'+gl.drawingBufferHeight,()=>{});
  // Record submission separately from compileAsync completion. Never claim that
  // return from linkProgram means the driver has completed compilation.
  let shader=0,program=0;
  for(const [method,label,counter] of [['compileShader','Soumission shader',()=>++shader],['linkProgram','Soumission programme',()=>++program]]){
   const original=gl[method],wrapped=(...args)=>this.run(label+' '+counter(),()=>original.apply(gl,args));
   try{gl[method]=wrapped;if(gl[method]===wrapped)this.restore.push(()=>{gl[method]=original;});}catch{}
  }
  const original=renderer.render;
  renderer.render=(scene,camera)=>this.run('Dessin '+(scene.name||scene.type)+' · '+(renderer.getRenderTarget()?renderer.getRenderTarget().width+' px, face '+renderer.getActiveCubeFace():'écran'),()=>{const result=original.call(renderer,scene,camera);if(this.sync)this.run('Attente GPU gl.finish',()=>gl.finish());return result;});
  this.restore.push(()=>{renderer.render=original;});
 }
 async compile(renderer,scene,camera,label){
  await nextFrame();
  return this.task('Compilation asynchrone · '+label,async()=>{
   let timer;
   try{await Promise.race([renderer.compileAsync(scene,camera),new Promise((_,reject)=>{timer=setInterval(()=>{if(this.cancelled||this.gl.isContextLost())reject(Error('Contexte perdu pendant la compilation'));},50);})]);}
   finally{clearInterval(timer);}
  });
 }
 stop(){this.cancelled=true;this.persist();}
 detach(){for(const restore of this.restore.splice(0).reverse())restore();}
 complete(){this.check();this.ready=true;this.detach();this.persist();}
 text(){return 'Démarrage GPU · '+(this.sync?'mesures synchronisées avec gl.finish()':'durées CPU/pilote ; cubes attendus par barrières GPU')+'\nÉtapes actives : '+(this.active.map(e=>e.label).join(' → ')||'aucune')+'\n'+this.entries.slice(-45).map(e=>e.label+' : '+e.status+(e.ms!==undefined?' ('+e.ms+' ms)':'')+(e.error?' — '+e.error:'')).join('\n');}
}

async function waitForGPU(trace,label){
 const gl=trace.gl;if(!gl?.fenceSync)return;
 await trace.task('Fin GPU · '+label,async()=>{
  const fence=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0);if(!fence)throw Error('Impossible de créer la barrière GPU');gl.flush();
  try{while(true){trace.check();const status=gl.clientWaitSync(fence,0,0);if(status===gl.ALREADY_SIGNALED||status===gl.CONDITION_SATISFIED)return;if(status===gl.WAIT_FAILED)throw Error('Échec de la barrière GPU');await nextFrame();}}
  finally{gl.deleteSync(fence);}
 });
}

// Same face cameras, orientation and target format as Three.CubeCamera.update.
// Only startup uses this path; no partially captured cube is displayed.
export async function captureCubeStartup(renderer,cube,scene,trace,label){
 if(cube.parent===null)cube.updateMatrixWorld();
 if(cube.coordinateSystem!==renderer.coordinateSystem){cube.coordinateSystem=renderer.coordinateSystem;cube.updateCoordinateSystem();}
 const target=cube.renderTarget,mip=cube.activeMipmapLevel,generate=target.texture.generateMipmaps;
 const draw=async(face,compile)=>{
  const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),xr:renderer.xr.enabled,viewport:renderer.getViewport(new T.Vector4()),scissor:renderer.getScissor(new T.Vector4()),test:renderer.getScissorTest()};
  try{renderer.xr.enabled=false;renderer.setScissorTest(false);renderer.setRenderTarget(target,face,mip);
   if(compile)await trace.compile(renderer,scene,cube.children[face],label);
   else trace.run(label+' · face '+(face+1)+'/6',()=>renderer.render(scene,cube.children[face]));
  }finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);renderer.xr.enabled=saved.xr;}
 };
 try{target.texture.generateMipmaps=false;await draw(0,true);
  for(let face=0;face<6;face++){await nextFrame();trace.check();if(face===5)target.texture.generateMipmaps=generate;await draw(face,false);await waitForGPU(trace,label+' face '+(face+1));}
  target.texture.needsPMREMUpdate=true;
 }finally{target.texture.generateMipmaps=generate;}
}
