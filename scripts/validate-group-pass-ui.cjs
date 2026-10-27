const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict'),esbuild=require('esbuild');
const root=path.resolve(__dirname,'..'),out=path.join(root,'validation/v2-screenshots');fs.mkdirSync(out,{recursive:true});
const entry=`import * as T from 'three';
import {GroupPass,groupSampleGLSL} from './src/group-pass.js';
import {localGroupGLSL} from './src/local-group.js';
import {observerRayGLSL} from './src/cloud-pass.js';
const W=192,H=144,r=new T.WebGLRenderer({canvas:document.querySelector('canvas')});r.setSize(W,H);
const u={rotation:{value:new T.Matrix3()},axis:{value:new T.Vector3(0,0,-1)},g:{value:1},momentum:{value:0},optics:{value:0},aspect:{value:W/H},tanFov:{value:.7},groupCenters:{value:Array.from({length:8},()=>new T.Vector3(0,0,-1))},groupRotations:{value:Array.from({length:8},()=>new T.Matrix3())},groupShapes:{value:[1,0,-1,-1,-1,-1,-1,-1]},groupSeeds:{value:Array.from({length:8},(_,i)=>i*13)},groupParams:{value:Array.from({length:8},()=>new T.Vector4(1,1,.045,1))},groupTint:{value:Array.from({length:8},()=>new T.Vector3(.9,.8,.6))},groupTime:{value:0},groupGain:{value:1}};
const pass=new GroupPass(u),target=new T.WebGLRenderTarget(W,H,{type:T.FloatType,depthBuffer:false});
const header='precision highp float;varying vec2 uvp;uniform mat3 rotation;uniform vec3 axis;uniform float g,momentum,optics,aspect,tanFov;';
const make=code=>{const s=new T.Scene();s.add(new T.Mesh(new T.PlaneGeometry(2,2),new T.ShaderMaterial({uniforms:u,vertexShader:pass.material.vertexShader,fragmentShader:header+code+'void main(){'+observerRayGLSL+'gl_FragColor=vec4(groupRadiance(ray),1.);}',depthTest:false,depthWrite:false})));return s;};
const reference=make(localGroupGLSL),composite=make(groupSampleGLSL);
function draw(scene){r.setRenderTarget(target);r.setViewport(0,0,W/r.getPixelRatio(),H/r.getPixelRatio());r.render(scene,pass.camera);const p=new Float32Array(W*H*4);r.readRenderTargetPixels(target,0,0,W,H,p);return p;}
window.measure=async()=>{await r.compileAsync(pass.scene,pass.camera);pass.ready=true;const rows=[];
for(const dpr of [1,1.5,2])for(const shape of [0,1])for(const distance of [.4,1,40])for(const brightness of [1,1e-8]){
 r.setPixelRatio(dpr);u.groupShapes.value[0]=shape;u.groupCenters.value[0].set(.16,.08,-distance);u.groupCenters.value[1].set(2,0,-40);u.groupTime.value=.3;u.optics.value=1;u.momentum.value=.4;u.g.value=Math.sqrt(1.16);for(const p of u.groupParams.value)p.w=brightness;
 const a=draw(reference);pass.render(r);const b=draw(composite);let sum=0,delta=0,l1=0;const ca=[0,0],cb=[0,0];let sa=0,sb=0;
 for(let i=0;i<a.length;i++)if(i%4!==3){if(!Number.isFinite(b[i]))throw Error('Nonfinite group HDR');sum+=a[i];delta+=b[i]-a[i];l1+=Math.abs(b[i]-a[i]);const pixel=Math.floor(i/4),x=pixel%W,y=Math.floor(pixel/W);ca[0]+=a[i]*x;ca[1]+=a[i]*y;cb[0]+=b[i]*x;cb[1]+=b[i]*y;sa+=a[i];sb+=b[i];}
 if(!!u.groupReduced.value[0]!== (distance<20)||u.groupReduced.value[1]!==0)throw Error('Large and small volumes not separated');
 rows.push({dpr,shape,distance,brightness,fluxError:Math.abs(delta)/sum,l1:l1/sum,centroidError:Math.hypot(ca[0]/sa-cb[0]/sb,ca[1]/sa-cb[1]/sb),groupPixels:[pass.target.width,pass.target.height]});
}
// Compile failure or pending compilation must leave the entire original march visible.
pass.ready=false;u.groupCenters.value[0].set(0,0,-.4);pass.render(r);if(u.groupReducedOn.value!==0||u.groupReduced.value.some(Boolean))throw Error('Fallback masks a volume');
return rows;};`;
const bundle=esbuild.buildSync({stdin:{contents:entry,resolveDir:root,sourcefile:'group-pass-probe.js'},bundle:true,write:false,format:'iife'}).outputFiles[0].text;
const server=http.createServer((req,res)=>{res.setHeader('Content-Type',req.url==='/probe.js'?'text/javascript':'text/html');res.end(req.url==='/probe.js'?bundle:'<canvas></canvas><script src="/probe.js"></script>');});
(async()=>{await new Promise(r=>server.listen(3043,'127.0.0.1',r));let browser;const errors=[];try{browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});await page.goto('http://127.0.0.1:3043');await page.waitForFunction(()=>typeof window.measure==='function');const rows=await page.evaluate(()=>window.measure());fs.writeFileSync(out+'/cosmos-group-pass.json',JSON.stringify({rows,errors},null,2));for(const row of rows){console.log(JSON.stringify(row));assert(row.fluxError<.04,'Integrated group flux within 4%');assert(row.l1<.15,'Mean absolute group HDR error within 15%');assert(row.centroidError<.5,'Group centroid within half a pixel');}assert.deepEqual(errors,[]);}catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();}})();
