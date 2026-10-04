import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
export function odysseyModel(){
 const g=new T.Group();
 const hull=new T.MeshPhysicalMaterial({color:0xced8dc,metalness:.72,roughness:.29,clearcoat:.28,clearcoatRoughness:.35});
 const dark=new T.MeshStandardMaterial({color:0x192a36,metalness:.75,roughness:.37}),shield=new T.MeshStandardMaterial({color:0x657778,metalness:.46,roughness:.62}),copper=new T.MeshStandardMaterial({color:0x794834,metalness:.72,roughness:.45});
 const blue=new T.MeshStandardMaterial({color:0x449eba,emissive:0x37a7c9,emissiveIntensity:1.2,metalness:.4,roughness:.2});
 const mesh=(geometry,material,x=0,y=0,z=0)=>{const m=new T.Mesh(geometry,material);m.position.set(x,y,z);g.add(m);return m;};
 function lathe(points,mat){const m=mesh(new T.LatheGeometry(points.map(([r,z])=>new T.Vector2(r,z)),128),mat);m.rotation.x=Math.PI/2;return m;}
 lathe([[0,-3.2],[.7,-3.2],[1.13,-2.85],[1.3,-2.25],[1.3,2.2],[1.16,2.7],[.82,3.1],[0,3.1]],hull);
 lathe([[0,-3.86],[1.55,-3.86],[1.96,-3.72],[2.1,-3.5],[2.13,-3.2],[2.06,-3.02],[1.88,-2.93],[0,-2.93]],shield);
 for(const z of [-2.1,-.65,.75,2.15])mesh(new T.TorusGeometry(1.31,.027,12,128),dark,0,0,z);
 for(const r of [.55,1.1,1.62,1.92])mesh(new T.TorusGeometry(r,.018,10,128),dark,0,0,-3.87);
 for(const side of [-1,1]){
  mesh(new RoundedBoxGeometry(3.7,.12,4.3,4,.055),copper,side*3.0,0,.65);
  for(let x=1.3;x<4.85;x+=.24)mesh(new RoundedBoxGeometry(.045,.15,4.2,2,.02),dark,side*x,0,.65);
  for(const z of [-1.4,2.65])mesh(new RoundedBoxGeometry(4.1,.18,.15,3,.04),hull,side*2.85,0,z);
  mesh(new RoundedBoxGeometry(.22,.32,4.6,4,.06),dark,side*1.5,0,.65);
 }
 for(let a=0;a<6;a++){let angle=a*Math.PI/3;const m=mesh(new RoundedBoxGeometry(.25,.14,3.5,3,.05),dark,Math.sin(angle)*1.31,Math.cos(angle)*1.31,.2);m.rotation.z=-angle;}
 lathe([[.67,2.7],[.66,3.25],[.46,3.65],[.55,3.9],[.93,4.75],[1.04,4.84],[1.08,4.73],[.68,3.55]],dark);
 const core=mesh(new T.CircleGeometry(.82,96),blue,0,0,4.69);core.material=blue.clone();
 const glowMat=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending,uniforms:{power:{value:0},clock:{value:0}},vertexShader:'varying vec2 plumeUV;void main(){plumeUV=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec2 plumeUV;uniform float power,clock;void main(){float taper=pow(1.-plumeUV.y,1.6);float stripe=.9+.1*sin(plumeUV.y*65.-clock*18.);gl_FragColor=vec4(mix(vec3(.08,.3,1.),vec3(.7,.94,1.),taper),power*taper*stripe*.32);}' });
 const plume=mesh(new T.CylinderGeometry(.05,.67,6,64,32,true),glowMat,0,0,7.65);plume.rotation.x=Math.PI/2;
 for(const side of [-1,1])mesh(new RoundedBoxGeometry(.14,.24,.62,3,.06),blue,side*1.1,.78,-2.0);
 mesh(new RoundedBoxGeometry(.42,.28,3.7,4,.1),dark,0,1.31,0);
 g.userData={name:'Odyssée-01',plume,core};return g;
}
export class SpacecraftView{
 constructor(canvas){this.scene=new T.Scene();this.camera=new T.PerspectiveCamera(46,1,.01,1000);this.camera.position.set(12,7,14);this.controls=new OrbitControls(this.camera,canvas);this.controls.enabled=false;this.controls.enableDamping=true;this.controls.minDistance=9;this.controls.maxDistance=70;this.controls.target.set(0,0,0);this.model=odysseyModel();this.scene.add(this.model);this.scene.add(new T.HemisphereLight(0xa8c9e7,0x383233,.65));const light=new T.DirectionalLight(0xffefd7,3);light.position.set(-6,8,10);this.scene.add(light);this.shaders=[];this.ready=true;this.error=null;this.voyager=null;
 this.model.traverse(o=>{if(!o.isMesh||o.material.isShaderMaterial)return;const materials=Array.isArray(o.material)?o.material:[o.material];for(const m of materials){m.onBeforeCompile=sh=>{Object.assign(sh.uniforms,{relVelocity:{value:new T.Vector3()},relGamma:{value:1},relMode:{value:0}});sh.vertexShader='uniform vec3 relVelocity;uniform float relGamma,relMode;\n'+sh.vertexShader;sh.vertexShader=sh.vertexShader.replace('#include <project_vertex>',`vec4 world=modelMatrix*vec4(transformed,1.);float beta=length(relVelocity);if(relMode>.5&&beta>.000001){vec3 e=relVelocity/beta;float gamma=relGamma;world.xyz+=e*dot(world.xyz,e)*(1./gamma-1.);if(relMode>1.5){world.xyz+=relVelocity*length(cameraPosition);vec3 r=world.xyz-cameraPosition;float rv=dot(r,relVelocity),r2=dot(r,r),a=1./(gamma*gamma),root=sqrt(rv*rv+a*r2);float ct=rv>=0.?-r2/(root+rv):-(root-rv)/a;world.xyz+=relVelocity*ct;}}vec4 mvPosition=viewMatrix*world;gl_Position=projectionMatrix*mvPosition;`);this.shaders.push(sh);};}});
 new GLTFLoader().load('./assets/voyager.glb',g=>{const box=new T.Box3().setFromObject(g.scene),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());g.scene.position.sub(center);const holder=new T.Group();holder.add(g.scene);holder.scale.setScalar(2/Math.max(size.x,size.y,size.z));this.voyager=holder;},undefined,e=>{this.voyagerError=String(e);});}
 focus(){this.camera.position.set(13,7,16);this.camera.up.set(0,1,0);this.controls.target.set(0,0,0);this.camera.lookAt(0,0,0);this.controls.update();}
 render(renderer,s,aspect){
 if(!this.environment){const pmrem=new T.PMREMGenerator(renderer);const room=new RoomEnvironment();this.environment=pmrem.fromScene(room,.06);this.scene.environment=this.environment.texture;room.dispose();pmrem.dispose();}
 const firing=!s.paused&&!s.passage&&!s.gr&&(s.orbit?.assist||s.engine==='thrust'||s.engine==='brake'||s.ap?.stage==='brake'||s.ap?.stage==='flight'&&(s.ap.elapsed<s.ap.plan.ta||s.ap.elapsed>s.ap.plan.ta+s.ap.plan.tc));
 this.model.userData.plume.visible=!!firing;this.model.userData.plume.material.uniforms.power.value=firing?1:0;this.model.userData.plume.material.uniforms.clock.value=s.wall;this.model.userData.core.material.emissiveIntensity=firing?2:.12;
this.camera.aspect=aspect||renderer.domElement.clientWidth/renderer.domElement.clientHeight;this.camera.updateProjectionMatrix();this.model.quaternion.copy(s.q);if(s.engine==='brake'||s.ap?.stage==='brake'||s.ap?.stage==='flight'&&s.ap.elapsed>s.ap.plan.ta+s.ap.plan.tc)this.model.rotateY(Math.PI);const beta=s.opticalLab?s.labBeta:s.speedValue||0,g=s.opticalLab?1/Math.sqrt((1-beta)*(1+beta)):s.gammaValue||1;let dir=new T.Vector3(...(s.velocityVector||[0,0,0]));if(dir.length()<1e-8)dir.set(0,0,-1).applyQuaternion(s.q);dir.normalize().multiplyScalar(beta);for(const sh of this.shaders){sh.uniforms.relVelocity.value.copy(dir);sh.uniforms.relGamma.value=g;sh.uniforms.relMode.value=s.shipFrame==='geometric'?1:s.shipFrame==='received'?2:0;}
 const viewport=new T.Vector4(),scissor=new T.Vector4();renderer.getViewport(viewport);renderer.getScissor(scissor);const test=renderer.getScissorTest(),target=renderer.getRenderTarget(),save=renderer.autoClear,color=renderer.getClearColor(new T.Color()),alpha=renderer.getClearAlpha();
 const scale=Math.max(1.5,Math.min(2,renderer.getPixelRatio())),w=Math.round(viewport.z*scale),h=Math.round(viewport.w*scale);
 if(!this.target){this.target=new T.WebGLRenderTarget(w,h,{samples:4,format:T.RGBAFormat});this.composite=new T.Scene();this.compositeCamera=new T.OrthographicCamera(-1,1,1,-1,0,1);this.composite.add(new T.Mesh(new T.PlaneGeometry(2,2),new T.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,uniforms:{image:{value:this.target.texture}},vertexShader:'varying vec2 shipUV;void main(){shipUV=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:'varying vec2 shipUV;uniform sampler2D image;void main(){gl_FragColor=texture2D(image,shipUV);\n#include <colorspace_fragment>\n}'})));}
 if(this.target.width!==w||this.target.height!==h)this.target.setSize(w,h);
 renderer.setScissorTest(false);renderer.setRenderTarget(this.target);renderer.setClearColor(0,0);renderer.autoClear=true;renderer.render(this.scene,this.camera);
 renderer.setRenderTarget(target);renderer.setViewport(viewport);renderer.setScissor(scissor);renderer.setScissorTest(test);renderer.setClearColor(color,alpha);renderer.autoClear=false;renderer.render(this.composite,this.compositeCamera);renderer.autoClear=save;}
}
