// Real production observer snippet + production CPU uniform preparation.
// Independent half-angle reference from intended world-space rays.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const out=path.resolve(__dirname,'../validation/v2-screenshots');
(async()=>{
 const T=await import('three');
 const {projectedObserverRayGLSL:snippet}=await import('../src/cloud-pass.js');
 const {observerProjectionGLSL:declarations,observerProjectionUniforms,updateObserverProjection}=await import('../src/observer-projection.js');
 const cases=[];
 for(const gamma of [1,1.000001,100,1e4,1e6,1e8,1e12])
 for(const [av,sv] of [[[0,0,-1],[1,0,0]],[[.6,0,-.8],[.8,0,.6]],[[.3,.5,-.8],[1,.2,.1]],[[0,0,-1],[1,.2,.1]],[[.6,0,-.8],[1,.2,.1]]])
 for(const [width,height,ix,iy] of [[961,701,480,350],[1280,585,640,292],[403,257,57,200]])
 for(const theta of [0,.1/gamma,1/gamma,10/gamma,Math.PI/4,Math.PI/2,Math.PI]){
  // Include the two original boundary-bench planes as well as out-of-plane rays.
  const axis=new T.Vector3(...av).normalize(),side=new T.Vector3(...sv).addScaledVector(axis,-new T.Vector3(...sv).dot(axis)).normalize();
  const n=axis.clone().multiplyScalar(Math.cos(theta)).addScaledVector(side,theta===Math.PI?0:Math.sin(theta)).normalize();
  const aspect=width/height,tanFov=Math.tan(.6);
  const q=new T.Vector3((2*(ix+.5)/width-1)*aspect*tanFov,(2*(iy+.5)/height-1)*tanFov,-1).normalize();
  const rotation=new T.Matrix3().setFromMatrix4(new T.Matrix4().makeRotationFromQuaternion(new T.Quaternion().setFromUnitVectors(q,n)));
  assert(q.clone().applyMatrix3(rotation).distanceTo(n)<1e-13,'Camera reconstruction');
  for(const optics of gamma===1e6&&theta===0?[0,1]:[1]){
   const momentum=Math.sqrt((gamma-1)*(gamma+1));
   const u={...observerProjectionUniforms(),rotation:{value:rotation},axis:{value:axis},aspect:{value:aspect},tanFov:{value:tanFov},g:{value:gamma},momentum:{value:momentum},optics:{value:optics}};
   updateObserverProjection(u,new T.Vector4(7,11,width,height));
   const boost=gamma+momentum,t=theta===Math.PI?Infinity:boost*Math.tan(theta/2);
   const cr=Number.isFinite(t)?(1-t*t)/(1+t*t):-1,sr=Number.isFinite(t)?2*t/(1+t*t):0;
   const ray=optics?axis.clone().multiplyScalar(cr).addScaledVector(side,sr).toArray():n.toArray();
   const logD=!optics?0:theta===Math.PI?-Math.log2(boost):Math.log2(boost*(1+Math.tan(theta/2)**2)/(1+t*t));
   cases.push({gamma,axis:axis.toArray(),theta,optics,width,height,ix,iy,aspect,tanFov,rotation:rotation.toArray(),momentum,ray,logD,
    precise:u.observerPrecise.value,anchorHigh:u.observerAnchorHigh.value.toArray(),anchorLow:u.observerAnchorLow.value.toArray(),basis:u.observerBasis.value.toArray(),steps:u.observerSteps.value.toArray()});
  }
 }
 let browser;const errors=[];fs.mkdirSync(out,{recursive:true});
 try{
  browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.setContent('<canvas width="1300" height="740"></canvas>');
  const measured=await page.evaluate(({snippet,declarations,cases})=>{
   const gl=document.querySelector('canvas').getContext('webgl2',{antialias:false});
   if(!gl||!gl.getExtension('EXT_color_buffer_float'))throw Error('Float32 WebGL2 unavailable');
   const debug=gl.getExtension('WEBGL_debug_renderer_info'),renderer=debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
   const compile=(kind,source)=>{const s=gl.createShader(kind);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
   const vs=compile(gl.VERTEX_SHADER,'#version 300 es\nout vec2 uvp;void main(){vec2 p=vec2(gl_VertexID==1?3.:-1.,gl_VertexID==2?3.:-1.);uvp=p;gl_Position=vec4(p,0,1);}');
   const frag=compile(gl.FRAGMENT_SHADER,'#version 300 es\nprecision highp float;in vec2 uvp;uniform mat3 rotation;uniform vec3 axis;uniform float g,momentum,optics,aspect,tanFov;'+declarations+'\nout vec4 result;void main(){'+snippet+'result=vec4(ray,log2(D));}');
   const p=gl.createProgram();gl.attachShader(p,vs);gl.attachShader(p,frag);gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));gl.useProgram(p);gl.bindVertexArray(gl.createVertexArray());
   const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,1300,740,0,gl.RGBA,gl.FLOAT,null);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
   const fb=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,texture,0);
   if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('Incomplete float target');
   const loc=name=>gl.getUniformLocation(p,name);gl.enable(gl.SCISSOR_TEST);
   const rows=cases.map(c=>{
    gl.viewport(7,11,c.width,c.height);gl.scissor(7+c.ix,11+c.iy,1,1);
    for(const [key,value] of Object.entries({g:c.gamma,momentum:c.momentum,optics:c.optics,aspect:c.aspect,tanFov:c.tanFov,observerPrecise:c.precise}))gl.uniform1f(loc(key),value);
    for(const [key,value] of Object.entries({rotation:c.rotation,observerBasis:c.basis,observerSteps:c.steps}))gl.uniformMatrix3fv(loc(key),false,value);
    gl.uniform3fv(loc('axis'),c.axis);gl.uniform2fv(loc('observerAnchorHigh'),c.anchorHigh);gl.uniform2fv(loc('observerAnchorLow'),c.anchorLow);
    gl.drawArrays(gl.TRIANGLES,0,3);const values=new Float32Array(4);gl.readPixels(7+c.ix,11+c.iy,1,1,gl.RGBA,gl.FLOAT,values);
    const error=gl.getError();if(error!==gl.NO_ERROR)throw Error('GL error '+error);return [...values];
   });return {renderer,rows};
  },{snippet,declarations,cases});
  const rows=cases.map((c,i)=>{const v=measured.rows[i];assert(v.every(Number.isFinite),'Non-finite result');
   const rayError=Math.hypot(...c.ray.map((x,k)=>x-v[k])),logDError=Math.abs(v[3]-c.logD),withinTolerance=rayError<.005&&logDError<.005;
   return {gamma:c.gamma,axis:c.axis,theta:c.theta,optics:c.optics,viewport:[7,11,c.width,c.height],pixel:[c.ix,c.iy],precise:!!c.precise,rayError,logDError,withinTolerance};});
  const report={source:'Production projectedObserverRayGLSL and updateObserverProjection',scope:'WebGL2 RGBA32F ray direction and inverse observer Doppler at sampled pixels/cameras only; not full sky spectra, flux, image quality or hardware performance',renderer:measured.renderer,evaluated:rows.length,withinTolerance:rows.filter(r=>r.withinTolerance).length,maxRayError:Math.max(...rows.map(r=>r.rayError)),maxLogDError:Math.max(...rows.map(r=>r.logDError)),precisionLimits:rows.filter(r=>!r.withinTolerance),rows,errors};
  fs.writeFileSync(path.join(out,'observer-projection-gpu.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({...report,rows:undefined},null,2));
  assert.deepEqual(report.precisionLimits,[],'New production camera projection exceeds unchanged tolerances');assert.deepEqual(errors,[]);
 }catch(e){fs.writeFileSync(path.join(out,'observer-projection-failure.json'),JSON.stringify({error:String(e),errors},null,2));throw e;}
 finally{await browser?.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
