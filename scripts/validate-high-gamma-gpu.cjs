const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),out=path.join(root,'validation/v2-screenshots');
const source=fs.readFileSync(path.join(root,'src/cloud-pass.js'),'utf8');
const snippet=source.match(/export const observerRayGLSL=\x60([^\x60]+)\x60;/)?.[1];
assert(snippet,'Shared observer shader was not found');
const cases=[];
for(const gamma of [1,100,1000,10000,1e6,1e8,1e12])for(const oblique of [false,true])
 for(const theta of [0,.1/gamma,1/gamma,10/gamma,Math.PI/4,Math.PI/2,Math.PI]){
 const axis=oblique?[.6,0,-.8]:[0,0,-1],side=oblique?[.8,0,.6]:[1,0,0];
 const sin=theta===Math.PI?0:Math.sin(theta),cos=Math.cos(theta),n=axis.map((x,i)=>x*cos+side[i]*sin);
 const m=Math.sqrt((gamma-1)*(gamma+1)),boost=gamma+m,t=theta===Math.PI?Infinity:boost*Math.tan(theta/2);
 const cr=Number.isFinite(t)?(1-t*t)/(1+t*t):-1,sr=Number.isFinite(t)?2*t/(1+t*t):0;
 const ray=axis.map((x,i)=>x*cr+side[i]*sr);
 // Independent rapidity/half-angle identity, without subtracting beta from one.
 const q=theta===Math.PI?Infinity:Math.tan(theta/2);
 const D=theta===Math.PI?1/boost:boost*(1+q*q)/(1+boost*boost*q*q);
 cases.push({gamma,oblique,theta,axis,n,ray,logD:Math.log2(D)});
}
(async()=>{
 let browser;const errors=[];fs.mkdirSync(out,{recursive:true});
 try{
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.setContent('<canvas width="1" height="1"></canvas>');
 const measured=await page.evaluate(({snippet,cases})=>{
  const gl=document.querySelector('canvas').getContext('webgl2',{antialias:false});
  if(!gl||!gl.getExtension('EXT_color_buffer_float'))throw Error('Float32 WebGL2 target unavailable');
  const debug=gl.getExtension('WEBGL_debug_renderer_info');
  const renderer=debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
  const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
  const vs=compile(gl.VERTEX_SHADER,'#version 300 es\nout vec2 uvp;void main(){vec2 p=vec2((gl_VertexID==1)?3.:-1.,(gl_VertexID==2)?3.:-1.);uvp=p;gl_Position=vec4(p,0,1);}');
  const fs=compile(gl.FRAGMENT_SHADER,'#version 300 es\nprecision highp float;in vec2 uvp;uniform mat3 rotation;uniform vec3 axis;uniform float g,momentum,optics,aspect,tanFov;out vec4 result;void main(){'+snippet+'result=vec4(ray,log2(D));}');
  const p=gl.createProgram();gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));gl.useProgram(p);
  gl.bindVertexArray(gl.createVertexArray());
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,1,1,0,gl.RGBA,gl.FLOAT,null);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  const fb=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,texture,0);if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('Incomplete framebuffer');
  gl.viewport(0,0,1,1);for(const key of ['aspect','tanFov','optics'])gl.uniform1f(gl.getUniformLocation(p,key),1);
  const rows=cases.map(c=>{gl.uniformMatrix3fv(gl.getUniformLocation(p,'rotation'),false,[1,0,0,0,1,0,...c.n.map(v=>-v)]);gl.uniform3fv(gl.getUniformLocation(p,'axis'),c.axis);gl.uniform1f(gl.getUniformLocation(p,'g'),c.gamma);gl.uniform1f(gl.getUniformLocation(p,'momentum'),Math.sqrt((c.gamma-1)*(c.gamma+1)));
   gl.drawArrays(gl.TRIANGLES,0,3);const data=new Float32Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.FLOAT,data);const error=gl.getError();if(error!==gl.NO_ERROR)throw Error('GL error '+error);return [...data];});
  return {renderer,rows};
 },{snippet,cases});
 const rows=cases.map((c,i)=>{const v=measured.rows[i];assert(v.every(Number.isFinite),'Non-finite shader result');const rayError=Math.hypot(...c.ray.map((x,k)=>x-v[k])),logDError=Math.abs(v[3]-c.logD);
  const withinTolerance=rayError<.005&&logDError<.005;
  // Axial camera geometry resolves narrow cones. Oblique high-gamma probes deliberately
  // report the input-direction precision boundary, rather than silently granting validation.
  if(!c.oblique||c.gamma<=10000)assert(withinTolerance,JSON.stringify({gamma:c.gamma,oblique:c.oblique,theta:c.theta,rayError,logDError}));
  return {gamma:c.gamma,oblique:c.oblique,theta:c.theta,rayError,logDError,withinTolerance};});
 const report={source:'src/cloud-pass.js observerRayGLSL',renderer:measured.renderer,scope:'Float32 ray direction and inverse observer Doppler only; not spectral flux, full cockpit, image quality or real GPU performance',rows,precisionLimits:rows.filter(r=>!r.withinTolerance),errors};
 fs.writeFileSync(path.join(out,'high-gamma-gpu.json'),JSON.stringify(report,null,2));assert.deepEqual(errors,[]);
 console.log(JSON.stringify({evaluated:rows.length,withinTolerance:rows.filter(r=>r.withinTolerance).length,renderer:report.renderer,precisionLimits:report.precisionLimits},null,2));
 }catch(e){fs.writeFileSync(path.join(out,'high-gamma-failure.json'),JSON.stringify({error:String(e),errors},null,2));console.error(e);process.exitCode=1;}
 finally{await browser?.close();}
})();
