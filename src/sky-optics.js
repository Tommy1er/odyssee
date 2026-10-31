import {GroupPass,groupSampleGLSL} from './group-pass.js';
import {CloudPass,cloudSampleGLSL,observerRayGLSL} from './cloud-pass.js';
import {captureCubeStartup} from './gpu-startup.js';
import * as T from 'three';
import {gammaU,norm,unit,mul,sub} from './physics.js';
import {CloseupModel,closeupGLSL} from './closeup.js';
import {SystemBodies,systemGLSL,systemPrimaryGLSL} from './system-bodies.js';
import {CometLayer,cometGLSL} from './comet-render.js';
import {localGroupGLSL} from './local-group.js';
import {blackHoleGLSL} from './black-hole.js';
import {accretionOf,MODEL_CODE,diskAxis} from './compact-objects.js';
import {radiusLy,hash} from './body-data.js';
import {schwarzschildR} from './gravity-field.js'; // positions are isotropic coordinates; optics uses Schwarzschild r
import {cloudGLSL,nebulaUniforms} from './environments.js';
import {calibration,applyCalibration} from './nebulae.js';
import {diffuseGain,PHOT_ZERO,CUBE_SIZE} from './photometry.js';
import {lutTexture} from './gpu-textures.js';
import {cmbBand,blackbodyK,CMB_T0,SUN_CMB_DIR,SUN_CMB_KMS,C_KMS} from './cosmic-motion.js';
// Every incoming sky ray (including extended objects) shares this observer boost.
// RGB radiance is a spectral proxy, not a measured spectrum: see physics-v2.html.
const VARIANT_NAMES={'':'ciel profond',s:'corps du système',c:'nuage',sc:'corps du système + nuage'};
const variantFlags=key=>key==='bh'?{system:true,cloud:true,blackHole:true}:{system:key.includes('s'),cloud:key.includes('c'),blackHole:false};
const cutModule=(src,tag,replacement='')=>src.replace(new RegExp('/\\*'+tag+'\\*/[\\s\\S]*?/\\*'+tag+'_END\\*/'),replacement);
// Fragment source of one optical variant, from the full ordinary program (every module, no black-hole tracer).
// Without the close-up/system module, pixelAngle (also read by the comets) is declared on its own.
export function opticsVariantSource(full,{system,cloud,blackHole,cloudTexture=false,groupTexture=false}){let f=full;
 if(groupTexture)f=f.replace(localGroupGLSL,groupSampleGLSL);
 if(!system)f=cutModule(cutModule(f,'SYSTEM_MODULE','uniform float pixelAngle;'),'SYSTEM');
 if(!cloud)f=cutModule(cutModule(f,'CLOUD_MODULE'),'CLOUD');
 else if(cloudTexture)f=cutModule(f,'CLOUD_MODULE',cloudSampleGLSL);
 if(blackHole)f=f.replace('// BLACK_HOLE_MODULE',blackHoleGLSL).replace('// BLACK_HOLE_RADIANCE','if(bhActive>.5)L=traceBlackHole(ray);');
 return f;
}
export class SkyOptics{
 constructor(lut,objects=[]){const size=CUBE_SIZE;this.target=new T.WebGLCubeRenderTarget(size,{type:T.HalfFloatType,minFilter:T.LinearFilter,magFilter:T.LinearFilter,generateMipmaps:false});this.cube=new T.CubeCamera(.001,2500,this.target);this.backdropTarget=new T.WebGLCubeRenderTarget(256,{type:T.HalfFloatType,minFilter:T.LinearFilter,generateMipmaps:false});this.backdropCamera=new T.CubeCamera(.001,2500,this.backdropTarget);this.backdrop=new T.Mesh(new T.SphereGeometry(1900,16,12),new T.ShaderMaterial({uniforms:{sky:{value:this.backdropTarget.texture}},vertexShader:'varying vec3 ray;void main(){ray=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 ray;uniform samplerCube sky;void main(){gl_FragColor=vec4(textureCube(sky,normalize(ray)).rgb,1.);}',side:T.BackSide,depthWrite:false,depthTest:false}));this.target.texture.name='Ciel ponctuel';this.backdropTarget.texture.name='Fond diffus';this.backdrop.renderOrder=-30;this.scene=new T.Scene();this.camera=new T.OrthographicCamera(-1,1,1,-1,0,1);const tex=lutTexture(new Float32Array(lut),512,1);tex.minFilter=tex.magFilter=T.LinearFilter;tex.needsUpdate=true;
 this.material=new T.ShaderMaterial({depthTest:false,depthWrite:false,uniforms:{sky:{value:this.target.texture},galaxyOverlay:{value:null},galaxyOverlayOn:{value:0},lut:{value:tex},rotation:{value:new T.Matrix3()},axis:{value:new T.Vector3(0,0,-1)},g:{value:1},momentum:{value:0},optics:{value:0},shift:{value:1},exposure:{value:1},aspect:{value:1},tanFov:{value:.7},band:{value:1},cloudActive:{value:0},cloudOpacity:{value:1},cloudCenter:{value:new T.Vector3()},cloudRotation:{value:new T.Matrix3()},shape:{value:0},seed:{value:0},bhActive:{value:0},radial:{value:new T.Vector3()},diskNormal:{value:new T.Vector3(.18,.84,.51).normalize()},observerRadius:{value:15},diskModel:{value:0},diskTmax:{value:1e4},diskOuter:{value:30},disk:{value:0},time:{value:0},cmbOn:{value:0},cmbT0:{value:CMB_T0},cmbGs:{value:1},cmbK:{value:1},cmbW:{value:1},cmbFlux:{value:0},cmbSigma:{value:1e-3},cmbBetaS:{value:new T.Vector3()},cmbRGB:{value:new T.Vector3(1,1,1)}},vertexShader:'varying vec2 uvp;void main(){uvp=position.xy;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`precision highp float;varying vec2 uvp;uniform samplerCube sky;uniform sampler2D lut,galaxyOverlay;uniform float galaxyOverlayOn;uniform mat3 rotation;uniform vec3 axis;uniform float g,momentum,optics,shift,exposure,aspect,tanFov,band;
// Cosmic microwave background (cosmic-motion.js): black body T0 seen with the solar dipole and the ship's Doppler factor;
// below about 2 pixels the forward hot spot is drawn as a point of the same total flux.
uniform float cmbOn,cmbT0,cmbGs,cmbK,cmbW,cmbFlux,cmbSigma;uniform vec3 cmbBetaS,cmbRGB;
/*SYSTEM_MODULE*/
${closeupGLSL}
${systemGLSL}
${systemPrimaryGLSL}
/*SYSTEM_MODULE_END*/
${cometGLSL}
// BLACK_HOLE_MODULE
/*CLOUD_MODULE*/
${cloudGLSL}
/*CLOUD_MODULE_END*/
${localGroupGLSL}
uniform float bhActive;
vec4 thermal(float t){float clipped=clamp(t,100.,1000000.);vec4 c=texture2D(lut,vec2(log(clipped/100.)/log(10000.),.5));c.a+=log(max(t,100.)/clipped);return c;}
void main(){${observerRayGLSL}
vec3 L=max(vec3(0),textureCube(sky,ray).rgb)+groupRadiance(ray)*groupGain;
// Point galaxies, already spectral-shifted per source (HDR overlay). They are background sky: same close-up dimming and
// same occlusion by planets, moons and stars as the cube (the system compositing is affine in its background,
// S(B) = E + sysT·B, so S(L+G)-S(L) = sysT·G: G seen through the bodies, from one evaluation), but NOT the approximate
// global RGB Doppler below.
vec3 G=galaxyOverlayOn>.5?max(vec3(0.),texture2D(galaxyOverlay,uvp*.5+.5).rgb):vec3(0.);
// BLACK_HOLE_RADIANCE
/*CLOUD*/if(cloudActive>.5)L=cloudRadiance(ray,L);/*CLOUD_END*/
/*SYSTEM*/if(bodyKind>.5){float dim=band<2.?.035:1.;L*=dim;G*=dim;}if(bodyKind>.5||secCount>.5){vec3 S=systemRadiance(ray,L);G*=sysT;L=S;}/*SYSTEM_END*/if(cometCount>.5)L+=cometRadiance(ray);
if(optics>.5&&shift>.5&&momentum>.000001){if(band<2.5){float blue=L.b/(L.r+L.b+1.e-20);float temp=mix(2800.,16000.,clamp((blue-.18)/.66,0.,1.));vec4 rest=thermal(temp),seen=thermal(temp*D);float gain=exp(clamp(seen.a-rest.a,-70.,60.));if(temp*D<100.)gain=0.;L*=gain*seen.rgb/max(rest.rgb,vec3(.0001));}else{L*=exp(clamp(4.*log(D),-70.,60.));}}
if(cmbOn>.5){float Tc=D*cmbT0/(cmbGs*(1.-dot(cmbBetaS,ray)));vec3 Lc=vec3(0.);if(Tc>150.){vec4 c=thermal(Tc);Lc=cmbK*exp(clamp(c.a,-80.,80.))*c.rgb;}float th=dot(n,axis)>0.?length(cross(n,axis)):3.14159;vec3 Lp=cmbFlux/(6.2831853*cmbSigma*cmbSigma)*exp(-.5*th*th/(cmbSigma*cmbSigma))*cmbRGB;L+=mix(Lp,Lc,cmbW);}
// Point galaxies have been spectral-shifted separately BEFORE RGB merger. Compose in linear HDR.
if(galaxyOverlayOn>.5)L+=G;
L*=exposure;vec3 rgb=1.-exp(-max(L,vec3(0)));if(band==0.){float y=dot(rgb,vec3(.2126,.7152,.0722));rgb=mix(vec3(y),rgb,smoothstep(.15,.8,y));}gl_FragColor=vec4(pow(rgb,vec3(1./2.2)),1.);}`});this.lut=lut;this.cmbK=blackbodyK(lut,PHOT_ZERO);{const b=SUN_CMB_KMS/C_KMS,dir=SUN_CMB_DIR;this.material.uniforms.cmbBetaS.value.set(...dir.map(x=>x*b));this.material.uniforms.cmbGs.value=1/Math.sqrt(1-b*b);this.material.uniforms.cmbK.value=this.cmbK;}this.uniforms=this.material.uniforms;this.fullFragment=this.material.fragmentShader;this.variants=new Map();this.compiledMaterials=new Set();this.pendingMaterials=new Map();this.compilationErrors=new Map();this.blackHolePreparation={status:"idle"};this.material.dispose();this.material=this.variant('');this.ordinaryMaterial=this.material;this.screen=new T.Mesh(new T.PlaneGeometry(2,2),this.material);this.scene.add(this.screen);Object.assign(this.material.uniforms,nebulaUniforms());this.closeup=new CloseupModel(this.material.uniforms,objects,lut);this.system=new SystemBodies(this.material.uniforms,objects,this.closeup);this.comets=new CometLayer(this.material.uniforms,objects);this.cloudPass=new CloudPass(this.uniforms);this.groupPass=new GroupPass(this.uniforms);}
 // Optical programs per module (Iris Xe / ANGLE D3D11, 27/10/2026): FXC inlines every call, so one program holding the
 // close-up bodies, the nebula march and the geodesic tracer took minutes to compile. Each variant holds only the modules
 // the view needs; the black-hole tracer stays out of every ordinary program. All variants share one uniforms object.
 variant(key){let m=this.variants.get(key);if(m)return m;const flags=variantFlags(key);
  m=new T.ShaderMaterial({name:flags.blackHole?'Optique trou noir (traceur géodésique)':'Optique ordinaire ('+VARIANT_NAMES[key]+')',depthTest:false,depthWrite:false,
   uniforms:this.uniforms,vertexShader:'varying vec2 uvp;void main(){uvp=position.xy;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:opticsVariantSource(this.fullFragment,{...flags,cloudTexture:true,groupTexture:true})});
  m.userData.flags=flags;this.variants.set(key,m);return m;
 }
 cloudTarget(s){const cloudGain=this.cloudGain??(s.target&&norm(sub(s.target.xyz,s.pos))/radiusLy(s.target)<120?1:0);
  return {cloudGain,cloud:s.target&&['nebula','pillars'].includes(s.target.type)&&cloudGain>0?s.target:null};}
 // Same conditions as render(): lensing near a black hole, a resolved primary or secondary body, the selected cloud.
 variantKey(s){const bh=s.target?.type==='blackhole'?s.target:null;
  const rr=bh?schwarzschildR(norm(sub(s.pos,bh.lightXYZ||bh.xyz))/radiusLy(bh),.5):Infinity;
  if(!!s.lensing&&rr<150&&rr>1.02)return 'bh';
  this.system.update(s,this.closeup.body,s.pixelAngle||.0015);const u=this.uniforms;
  return (u.bodyKind.value>.5||u.secCount.value>.5?'s':'')+(this.cloudTarget(s).cloud?'c':'');
 }
 selectVariant(s){return this.variant(this.variantKey(s));}
 use(material){this.material=material;this.screen.material=material;}
 // Compiled program holding every needed module with the fewest extra ones; otherwise the one already on screen.
 fallback(key){const need=variantFlags(key);let best=null,extra=Infinity;
  for(const m of this.compiledMaterials){const f=m.userData.flags;if((need.system&&!f.system)||(need.cloud&&!f.cloud))continue;
   const e=+f.system+ +f.cloud+2*f.blackHole;if(e<extra){best=m;extra=e;}}
  return best||this.material;
 }
 async compileVariant(renderer,material,trace){if(material.userData.flags.cloud)await this.prepareCloud(renderer);const scene=new T.Scene();scene.add(new T.Mesh(this.screen.geometry,material));
  if(trace)await trace.compile(renderer,scene,this.camera,material.name);
  else await renderer.compileAsync(scene,this.camera);
  this.compiledMaterials.add(material);
 }
 async prepareCloud(renderer){if(!this.cloudCompilation)this.cloudCompilation=renderer.compileAsync(this.cloudPass.scene,this.cloudPass.camera);await this.cloudCompilation;}
 // Share one promise between selection-time warmup and arrival. A finished warmup never changes the displayed variant.
 requestCompilation(renderer,material,trace){
  if(this.compiledMaterials.has(material))return Promise.resolve();
  if(this.pendingMaterials.has(material))return this.pendingMaterials.get(material);
  if(this.compilationErrors.has(material))return Promise.reject(this.compilationErrors.get(material));
  const blackHole=material.userData.flags.blackHole;
  if(blackHole)this.blackHolePreparation={status:'compiling',startedAt:performance.now()};
  const task=this.compileVariant(renderer,material,trace).then(()=>{
   if(blackHole)this.blackHolePreparation={...this.blackHolePreparation,status:'ready',finishedAt:performance.now()};
  }).catch(e=>{this.variantError=material.name+' : '+(e?.message||e);this.compilationErrors.set(material,e);
   if(blackHole)this.blackHolePreparation={...this.blackHolePreparation,status:'error',error:e?.message||String(e)};throw e;
  }).finally(()=>this.pendingMaterials.delete(material));
  this.pendingMaterials.set(material,task);return task;
 }
 prewarmTarget(renderer,s){
  // Do not delay the first ordinary sky, and do not compile this expensive program for unrelated targets.
  if(!this.compiledMaterials.size||!s.lensing||s.target?.type!=='blackhole')return;
  this.requestCompilation(renderer,this.variant('bh'),null).catch(()=>{});
 }
 // Ordinary navigation continues during warmup. If arrival precedes completion, only the remaining time is awaited:
 // never display an unlensed approximation as though the physically required black-hole program were ready.
 async prepare(renderer,s,trace){this.groupPass.prepare(renderer);const key=this.variantKey(s),material=this.variant(key);
  if(this.compiledMaterials.has(material)){this.use(material);this.prewarmTarget(renderer,s);return;}
  if(key==='bh'){await this.requestCompilation(renderer,material,trace);if(this.variantKey(s)==='bh')this.use(material);return;}
  if(!this.compiledMaterials.size){const deep=this.variant('');await this.requestCompilation(renderer,deep,trace);this.use(deep);if(material===deep){this.prewarmTarget(renderer,s);return;}}
  else this.use(this.fallback(key));
  this.requestCompilation(renderer,material,null).catch(()=>{});this.prewarmTarget(renderer,s);
 }
 // Forward CMB hot spot at the ship's speed (flux, size, colour); off while it is invisible (γ below ≈ 100).
 updateCMB(x,u,enabled,pixel){const m=norm(u),g=Math.sqrt(1+m*m),gap=1/(g*(g+m));if(!enabled||!(this.lut?.length>2000)||m<20){x.cmbOn.value=0;this.cmb=null;return;}
  const c=cmbBand(this.lut,this.cmbK,g,gap);this.cmb={F:c.F,theta:c.theta,T:c.Tpeak};if(!(c.F>1e-9)){x.cmbOn.value=0;return;}
  x.cmbOn.value=1;x.cmbFlux.value=c.F;x.cmbSigma.value=Math.max(c.theta/1.177,.7*pixel);x.cmbW.value=Math.min(1,Math.max(0,(c.theta/pixel-.7)/1.3));x.cmbW.value=x.cmbW.value*x.cmbW.value*(3-2*x.cmbW.value);
  const i=Math.max(0,Math.min(511,Math.round(Math.log(Math.max(100,c.Tpeak)/100)/Math.log(1e4)*511)));x.cmbRGB.value.set(this.lut[4*i],this.lut[4*i+1],this.lut[4*i+2]);}
 async captureStartup(renderer,scene,layers,trace){
 const {stars,local,backgrounds}=layers,sharp=Array.isArray(stars)?stars:[stars],sv=sharp.map(o=>o.visible),lv=local.visible,bv=backgrounds.map(o=>o.visible);
 try{sharp.forEach(o=>o.visible=false);local.visible=false;
  await captureCubeStartup(renderer,this.backdropCamera,scene,trace,'Fond diffus 256');
  sharp.forEach((o,i)=>o.visible=sv[i]);local.visible=lv;backgrounds.forEach(o=>o.visible=false);scene.add(this.backdrop);
  await captureCubeStartup(renderer,this.cube,scene,trace,'Ciel ponctuel '+CUBE_SIZE);
 }finally{scene.remove(this.backdrop);sharp.forEach((o,i)=>o.visible=sv[i]);local.visible=lv;backgrounds.forEach((o,i)=>o.visible=bv[i]);}
 }
 capture(renderer,scene,layers){const viewport=new T.Vector4(),scissor=new T.Vector4();renderer.getViewport(viewport);renderer.getScissor(scissor);const test=renderer.getScissorTest(),target=renderer.getRenderTarget();renderer.setScissorTest(false);
 if(layers){const {stars,local,backgrounds}=layers,sharp=Array.isArray(stars)?stars:[stars],sv=sharp.map(o=>o.visible),lv=local.visible,visibility=backgrounds.map(o=>o.visible);sharp.forEach(o=>o.visible=false);local.visible=false;this.backdropCamera.update(renderer,scene);sharp.forEach((o,i)=>o.visible=sv[i]);local.visible=lv;backgrounds.forEach(o=>o.visible=false);scene.add(this.backdrop);this.cube.update(renderer,scene);scene.remove(this.backdrop);backgrounds.forEach((o,i)=>o.visible=visibility[i]);}
 else this.cube.update(renderer,scene);
 renderer.setRenderTarget(target);renderer.setViewport(viewport);renderer.setScissor(scissor);renderer.setScissorTest(test);}

 render(renderer,camera,s,u,enabled){camera.updateMatrixWorld();const bh=s.target?.type==='blackhole'?s.target:null,rr=bh?schwarzschildR(norm(sub(s.pos,bh.lightXYZ||bh.xyz))/radiusLy(bh),.5):Infinity;const bhU=this.material.uniforms;// The selected cloud is marched per screen ray at any distance, weighted by its point→volume handoff (renderer.js,
 // nebula-points.js); legacy rule (< 120 radii, full weight) when no weight is supplied.
 const {cloudGain,cloud}=this.cloudTarget(s);bhU.cloudActive.value=+!!cloud;bhU.cloudOpacity.value=this.cloudOpacity??1;if(cloud){bhU.cloudCenter.value.set(...sub(cloud.lightXYZ||cloud.xyz,s.pos)).divideScalar(radiusLy(cloud));const q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,-1),new T.Vector3(...cloud.xyz).normalize());bhU.cloudRotation.value.setFromMatrix4(new T.Matrix4().makeRotationFromQuaternion(q)).transpose();applyCalibration(bhU,calibration(cloud),diffuseGain(s.band??1)*cloudGain);}bhU.bhActive.value=+(s.lensing&&rr<150&&rr>1.02);if(bh){bhU.radial.value.set(...sub(s.pos,bh.lightXYZ||bh.xyz)).normalize();bhU.observerRadius.value=s.gr?.id===bh.id?s.gr.r:rr;const acc=accretionOf(bh);const earth=this.closeup.objects.find(x=>x.id==='solar:Terre');bhU.diskNormal.value.set(...diskAxis(bh,earth?earth.xyz:[0,0,0]));bhU.diskModel.value=MODEL_CODE[acc.model]||0;bhU.diskTmax.value=acc.Tmax||1e4;bhU.diskOuter.value=acc.rOut||30;bhU.time.value=s.wall;} const x=this.material.uniforms;x.rotation.value.setFromMatrix4(camera.matrixWorld);x.axis.value.set(...unit(u));x.g.value=gammaU(u);x.momentum.value=norm(u);x.optics.value=+enabled;if(x.groupGain)x.groupGain.value=diffuseGain(s.band??1);x.shift.value=+s.doppler;x.exposure.value=s.exposure;x.band.value=s.band;x.aspect.value=camera.aspect;x.tanFov.value=Math.tan(camera.fov/2*Math.PI/180);const db=renderer.getDrawingBufferSize(this.drawSize||(this.drawSize=new T.Vector2()));this.updateCMB(x,u,enabled,2*x.tanFov.value/Math.max(1,db.y));this.system.update(s,this.closeup.body,2*x.tanFov.value/Math.max(1,db.y));this.comets.update(s);this.groupPass.render(renderer);if(cloud&&this.material.userData.flags.cloud){const distance=Math.max(1e-9,bhU.cloudCenter.value.length()),angularD=enabled?Math.max(1e-9,x.g.value+x.momentum.value*bhU.cloudCenter.value.dot(x.axis.value)/distance):1;this.cloudPass.render(renderer,this.cloudScale??(1/distance/angularD/(2*x.tanFov.value/Math.max(1,db.y))>=32?.5:1));}renderer.render(this.scene,this.camera);}
}
