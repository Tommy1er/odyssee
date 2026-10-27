const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict'),esbuild=require('esbuild');
const root=path.resolve(__dirname,'..'),out=path.join(root,'validation/v2-screenshots');fs.mkdirSync(out,{recursive:true});
const entry=`import * as T from 'three';
import {CloudPass,observerRayGLSL,cloudSampleGLSL} from './src/cloud-pass.js';
import {cloudGLSL,nebulaUniforms} from './src/environments.js';
import {calibrate,applyCalibration} from './src/nebulae.js';
const r=new T.WebGLRenderer({canvas:document.querySelector('canvas')});r.setSize(192,144);const W=192,H=144;
const u={probeBackground:{value:0},probeStar:{value:0},...nebulaUniforms(),band:{value:1},cloudOpacity:{value:1},cloudActive:{value:1},cloudCenter:{value:new T.Vector3(0,0,-2.4)},cloudRotation:{value:new T.Matrix3()},rotation:{value:new T.Matrix3()},axis:{value:new T.Vector3(0,0,-1)},g:{value:1},momentum:{value:0},optics:{value:0},aspect:{value:W/H},tanFov:{value:.7}};
const pass=new CloudPass(u),cam=pass.camera,target=new T.WebGLRenderTarget(W,H,{type:T.FloatType,depthBuffer:false});
const header='precision highp float;varying vec2 uvp;uniform float band,g,momentum,optics,aspect,tanFov,probeBackground,probeStar;uniform vec3 axis;uniform mat3 rotation;';
const main='void main(){'+observerRayGLSL+'vec3 B=vec3(probeBackground)+vec3(probeStar)*step(95.,gl_FragCoord.x)*step(gl_FragCoord.x,96.)*step(71.,gl_FragCoord.y)*step(gl_FragCoord.y,72.);gl_FragColor=vec4(cloudRadiance(ray,B),1.);}';
const make=code=>{const s=new T.Scene();s.add(new T.Mesh(new T.PlaneGeometry(2,2),new T.ShaderMaterial({uniforms:u,vertexShader:pass.material.vertexShader,fragmentShader:header+code+main,depthTest:false,depthWrite:false})));return s;};
const reference=make(cloudGLSL),composite=make(cloudSampleGLSL);
function draw(scene){r.setRenderTarget(target);r.setViewport(0,0,W,H);r.render(scene,cam);const p=new Float32Array(W*H*4);r.readRenderTargetPixels(target,0,0,W,H,p);return p;}
window.measure=()=>{const rows=[];for(const id of ['tarantula','ngc604'])for(const opacity of [0,.35,1])for(const relativistic of [false,true]){
 const c=calibrate({id,type:'nebula',radiusLy:1,d:1});applyCalibration(u,c,1/c.J);u.probeBackground.value=0;u.probeStar.value=0;u.cloudOpacity.value=opacity;u.optics.value=+relativistic;u.momentum.value=relativistic?.4:0;u.g.value=Math.sqrt(1+u.momentum.value**2);
 const a=draw(reference);r.setRenderTarget(target);r.setViewport(0,0,W,H);r.setScissor(2,3,111,97);r.setScissorTest(true);
 pass.render(r,.5);if(r.getRenderTarget()!==target||!r.getScissorTest()||r.getScissor(new T.Vector4()).toArray().join()!=[2,3,111,97].join())throw Error('Render state not restored');r.setScissorTest(false);
 const b=draw(composite);let sum=0,delta=0,l1=0,peak=0;for(let i=0;i<a.length;i++)if(i%4!==3){if(!Number.isFinite(b[i]))throw Error('Nonfinite HDR');sum+=a[i];delta+=b[i]-a[i];l1+=Math.abs(b[i]-a[i]);peak=Math.max(peak,a[i]);}
 rows.push({id,opacity,relativistic,fluxError:Math.abs(delta)/sum,l1:l1/sum,peak,cloudPixels:[pass.target.width,pass.target.height]});
 u.probeBackground.value=1;const at=draw(reference),bt=draw(composite);let transmissionError=0;for(let i=0;i<a.length;i++)if(i%4!==3)transmissionError+=Math.abs((at[i]-a[i])-(bt[i]-b[i]));rows.at(-1).transmissionError=transmissionError/(W*H*3);
 if(opacity===0){u.probeBackground.value=.02;u.probeStar.value=10;const star=draw(composite),i=(71*W+95)*4;if(Math.abs(star[i]-b[i]-10.02)>.001||Math.abs(star[i+4]-b[i+4]-.02)>.001)throw Error('Point source blurred by cloud pass');}
 }
 // Split viewport + DPR: half of each eye's physical viewport, with full state restored.
 r.setRenderTarget(null);r.setPixelRatio(1.5);r.setSize(W,H);r.setViewport(W/2,0,W/2,H);pass.render(r,.5);if(pass.target.width!==72||pass.target.height!==108)throw Error('DPR/split dimensions');
 return rows;};`;
const bundle=esbuild.buildSync({stdin:{contents:entry,resolveDir:root,sourcefile:'cloud-pass-probe.js'},bundle:true,write:false,format:'iife'}).outputFiles[0].text;
const server=http.createServer((req,res)=>{res.setHeader('Content-Type',req.url==='/probe.js'?'text/javascript':'text/html');res.end(req.url==='/probe.js'?bundle:'<canvas></canvas><script src="/probe.js"></script>');});
(async()=>{await new Promise(r=>server.listen(3042,'127.0.0.1',r));let browser;const errors=[];try{browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});await page.goto('http://127.0.0.1:3042');await page.waitForFunction(()=>typeof window.measure==='function');const rows=await page.evaluate(()=>window.measure());fs.writeFileSync(out+'/cosmos-cloud-pass.json',JSON.stringify({rows,errors},null,2));for(const row of rows){console.log(JSON.stringify(row));assert(row.transmissionError<.01,'Mean dust transmission error within 1%');assert(row.peak>0.01,'Nontrivial cloud emission');assert(row.fluxError<.04,'Integrated flux within 4%');assert(row.l1<.15,'Mean absolute HDR error within 15%');}assert.deepEqual(errors,[]);}catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();}})();
