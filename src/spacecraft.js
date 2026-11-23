import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {blackbodyRGB} from './stellar-physics.js';
import {displayIntensity} from './ship-lighting.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
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

// Odyssée-02 (session d'essai) : conception FICTIVE mais dictée par la physique d'une poussée de 1 g tenue des années.
// Avant (−Z) → arrière (+Z), 1 unité ≈ 25 m, longueur ≈ 400 m. Aucune copie d'engin existant.
// - Avant : disque « éplucheur » d'électrons, bouclier de glace et de graphite, bobine supraconductrice de déflexion
//   (Semyonov, « Radiation conditions in relativistic interstellar flight », arXiv:2004.10079 : au-delà de 0,3 c le gaz
//   interstellaire devient un rayonnement ; un champ magnétique seul ne suffit pas, les atomes neutres doivent être ionisés).
// - Tour d'habitation : ponts empilés le long de l'axe, car la poussée tient lieu de pesanteur (pas d'anneau tournant).
// - Longue poutre : la dose venue du moteur décroît avec le carré de la distance ; réservoirs d'hydrogène, pièges à
//   antimatière, radiateurs vus par la tranche depuis le moteur et effilés pour rester dans le cône d'ombre.
// - Écran d'ombre en tungstène, puis chambre d'annihilation et tuyère magnétique à bobines supraconductrices
//   (Frisbee, « How to build an antimatter rocket for interstellar missions », 39e Joint Propulsion Conference AIAA, 2003,
//   NASA NTRS 20060043411 : la tuyère magnétique dirige les particules chargées). Écran d'ombre et radiateurs : choix de conception.
export function odysseyModelV2(){
 const g=new T.Group();
 // Textures procédurales de panneaux (aucune image externe) : joints de coque et cellules de radiateur.
 const panels=(cols,rows,base,line,w=256)=>{const c=document.createElement('canvas');c.width=c.height=w;const x=c.getContext('2d');x.fillStyle=base;x.fillRect(0,0,w,w);
  for(let i=0;i<cols*rows;i++){const shade=(Math.sin(i*12.9898)*43758.5453)%1;x.fillStyle=`rgba(0,0,0,${.02+Math.abs(shade)*.05})`;x.fillRect((i%cols)*w/cols,Math.floor(i/cols)*w/rows,w/cols,w/rows);}
  x.strokeStyle=line;x.lineWidth=2;for(let i=0;i<=cols;i++){x.beginPath();x.moveTo(i*w/cols,0);x.lineTo(i*w/cols,w);x.stroke();}for(let j=0;j<=rows;j++){x.beginPath();x.moveTo(0,j*w/rows);x.lineTo(w,j*w/rows);x.stroke();}
  const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t;};
 const hullMap=panels(8,4,'#eef0f0','rgba(60,66,70,.35)');hullMap.repeat.set(3,2);
 const radMap=panels(6,10,'#a9b1b5','rgba(40,46,50,.55)');radMap.repeat.set(1,1);
 const white=new T.MeshPhysicalMaterial({color:0xffffff,map:hullMap,metalness:.15,roughness:.55,clearcoat:.15}),
  gold=new T.MeshStandardMaterial({color:0xb8892e,metalness:.85,roughness:.32}),
  truss=new T.MeshStandardMaterial({color:0x4a5258,metalness:.7,roughness:.45}),
  ice=new T.MeshPhysicalMaterial({color:0xd9ecf4,metalness:0,roughness:.18,clearcoat:.6}),
  graphite=new T.MeshStandardMaterial({color:0x26282b,metalness:.2,roughness:.85}),
  tungsten=new T.MeshStandardMaterial({color:0x3a3d42,metalness:.92,roughness:.36}),
  coil=new T.MeshStandardMaterial({color:0x6a4a36,metalness:.8,roughness:.38}),
  cryo=new T.MeshStandardMaterial({color:0x8c98a0,metalness:.6,roughness:.4}),
  radiator=new T.MeshStandardMaterial({color:0xffffff,map:radMap,metalness:.45,roughness:.42,emissive:0xd23008,emissiveIntensity:0,side:T.DoubleSide}),
  glass=new T.MeshStandardMaterial({color:0x1b2733,emissive:0xffd9a0,emissiveIntensity:.9,metalness:.2,roughness:.2}),
  core=new T.MeshStandardMaterial({color:0x6d5cff,emissive:0x8c7dff,emissiveIntensity:.15,metalness:.1,roughness:.3});
 const mesh=(geometry,material,x=0,y=0,z=0)=>{const m=new T.Mesh(geometry,material);m.position.set(x,y,z);g.add(m);return m;};
 const lathe=(pts,mat,seg=96)=>{const m=mesh(new T.LatheGeometry(pts.map(([r,z])=>new T.Vector2(r,z)),seg),mat);m.rotation.x=Math.PI/2;return m;};
 const rod=(a,b,r,mat)=>{const A=new T.Vector3(...a),B=new T.Vector3(...b),len=A.distanceTo(B),geo=new T.CylinderGeometry(r,r,len,8);geo.translate(0,len/2,0);geo.applyQuaternion(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),B.clone().sub(A).normalize()));geo.translate(A.x,A.y,A.z);return geo;};
 const merged=(geos,mat)=>{const m=new T.Mesh(mergeGeometries(geos),mat);g.add(m);return m;};
 // Avant : disque éplucheur (fin), bouclier de graphite (ablatif) puis de glace (épais), bobine de déflexion sur bras.
 mesh(new T.CylinderGeometry(1.55,1.55,.012,96),new T.MeshStandardMaterial({color:0x4a4e54,metalness:.3,roughness:.6,transparent:true,opacity:.62,side:T.DoubleSide}),0,0,-8.15).rotation.x=Math.PI/2; // feuille de carbone : ionise sans arrêter
 merged([0,1,2,3].map(i=>{const a=i*Math.PI/2+Math.PI/4;return rod([Math.cos(a)*1.35,Math.sin(a)*1.35,-8.13],[Math.cos(a)*1.2,Math.sin(a)*1.2,-7.8],.025,truss);}),truss);
 lathe([[0,-7.92],[1.2,-7.84],[1.42,-7.72]],graphite);
 lathe([[1.42,-7.72],[1.48,-7.6],[1.48,-7.28],[1.15,-7.18],[0,-7.18]],ice);
 mesh(new T.TorusGeometry(2.05,.075,16,160),coil,0,0,-6.95);mesh(new T.TorusGeometry(2.05,.12,10,160),cryo,0,0,-6.95).scale.set(1,1,.45);
 merged([0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3;return rod([Math.cos(a)*1.02,Math.sin(a)*1.02,-6.7],[Math.cos(a)*2.0,Math.sin(a)*2.0,-6.95],.035,truss);}),truss);
 // Tour d'habitation : ponts perpendiculaires à la poussée, hublots sur deux faces.
 lathe([[0,-7.18],[1.05,-7.16],[1.08,-6.9],[1.08,-4.15],[.95,-3.9],[0,-3.9]],white);
 for(let z=-6.85;z<-4.1;z+=.44)mesh(new T.TorusGeometry(1.085,.018,8,96),truss,0,0,z);
 const win=[];for(let z=-6.62;z<-4.2;z+=.44)for(const a of [0,Math.PI])for(const da of [-.18,-.06,.06,.18]){const b=new T.BoxGeometry(.07,.045,.02);b.rotateY(Math.PI/2);b.rotateZ(a+da);b.translate(Math.cos(a+da)*1.085,Math.sin(a+da)*1.085,z);win.push(b);}
 merged(win,glass);
 // Module de service : protections thermiques dorées, deux navettes amarrées, antenne grand gain orientée vers l'arrière (Terre).
 lathe([[.95,-3.9],[.62,-3.3],[.62,-2.9]],gold);
 for(const side of [-1,1]){const shuttle=new T.Group();shuttle.position.set(side*1.15,0,-3.35);g.add(shuttle);
  const body=new T.Mesh(new T.CapsuleGeometry(.24,.75,6,24),white);body.rotation.x=Math.PI/2;shuttle.add(body);
  const shield=new T.Mesh(new T.SphereGeometry(.26,24,12,0,Math.PI*2,0,Math.PI/2.6),graphite);shield.rotation.x=-Math.PI/2;shield.position.z=-.62;shuttle.add(shield);
  const port=new T.Mesh(new T.CylinderGeometry(.12,.12,.5,16),truss);port.rotation.z=Math.PI/2;port.position.x=-side*.42;shuttle.add(port);}
 merged([rod([0,.62,-3.1],[0,1.75,-2.6],.035,truss)],truss);
 {const dish=mesh(new T.SphereGeometry(.62,40,12,0,Math.PI*2,0,Math.PI/5.5),white,0,1.85,-2.55);dish.rotation.x=Math.PI/2+.45;const feed=mesh(new T.ConeGeometry(.05,.32,10),gold,0,1.85,-2.42);feed.rotation.x=-Math.PI/2+.45;}
 // Poutre treillis (une seule géométrie fusionnée : quatre longerons et leurs diagonales).
 const bars=[],c=.32,z0=-2.9,z1=4.6,bay=.5;
 for(const [x,y] of [[c,c],[-c,c],[-c,-c],[c,-c]])bars.push(rod([x,y,z0],[x,y,z1],.04,truss));
 for(let z=z0;z<z1-1e-6;z+=bay){const zn=Math.min(z+bay,z1),cs=[[c,c],[-c,c],[-c,-c],[c,-c]];for(let i=0;i<4;i++){const a=cs[i],b=cs[(i+1)%4];bars.push(rod([a[0],a[1],z],[b[0],b[1],zn],.018,truss));bars.push(rod([a[0],a[1],z],[b[0],b[1],z],.018,truss));}}
 merged(bars,truss);
 // Réservoirs d'hydrogène (matière) : six capsules isolées autour de la poutre.
 for(let i=0;i<6;i++){const a=i*Math.PI/3+Math.PI/6,t=mesh(new T.CapsuleGeometry(.36,1.35,8,32),white,Math.cos(a)*.86,Math.sin(a)*.86,-1.6);t.rotation.x=Math.PI/2;
  mesh(new T.TorusGeometry(.365,.02,6,48),gold,Math.cos(a)*.86,Math.sin(a)*.86,-1.6);}
 // Pièges à antimatière : petites enceintes cryogéniques blindées, anneaux témoins.
 for(let i=0;i<4;i++){const a=i*Math.PI/2,x=Math.cos(a)*.62,y=Math.sin(a)*.62,t=mesh(new T.CapsuleGeometry(.17,.42,6,24),gold,x,y,1.55);t.rotation.x=Math.PI/2;
  for(const dz of [-.18,.18])mesh(new T.TorusGeometry(.175,.016,6,32),new T.MeshStandardMaterial({color:0x2a6fd6,emissive:0x3d8bff,emissiveIntensity:.8}),x,y,1.55+dz);}
 // Radiateurs : quatre ailettes dans des plans contenant l'axe (vues par la tranche depuis le moteur), effilées vers l'arrière.
 const shape=new T.Shape();shape.moveTo(.42,-2.4);shape.lineTo(2.7,-1.9);shape.lineTo(1.25,3.9);shape.lineTo(.42,3.9);shape.closePath();
 const fin=new T.ExtrudeGeometry(shape,{depth:.035,bevelEnabled:false});{const uv=fin.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)/2.7,(uv.getY(i)+2.4)/6.3);}fin.translate(0,0,-.0175);
 const radiators=[];for(let i=0;i<4;i++){const f=new T.Mesh(fin,radiator);f.rotation.x=Math.PI/2;const p=new T.Group();p.add(f);p.rotation.z=i*Math.PI/2+Math.PI/4;g.add(p);radiators.push(f);
  const ribs=[];for(let k=1;k<9;k++){const zz=-2.2+k*.68,r=2.7-(zz+1.9)*(1.45/5.8);ribs.push(rod([.42,0,zz],[r-.03,0,zz],.012,truss));}
  const rm=new T.Mesh(mergeGeometries(ribs),truss);p.add(rm);}
 // Écran d'ombre en tungstène : tout ce qui précède reste dans son cône d'ombre.
 lathe([[.3,4.6],[1.28,4.66],[1.28,4.82],[.34,5.12],[.3,4.6]],tungsten);
 // Moteur : chambre d'annihilation et tuyère magnétique (bobines supraconductrices, enveloppe paraboloïde).
 const chamber=mesh(new T.SphereGeometry(.3,32,16),core,0,0,5.75);
 const rings=[[5.42,.55],[5.95,.92],[6.6,1.2],[7.3,1.42]];
 for(const [z,r] of rings){mesh(new T.TorusGeometry(r,.11,16,128),coil,0,0,z);mesh(new T.TorusGeometry(r,.17,10,128),cryo,0,0,z).scale.set(1,1,.62);}
 merged([0,1,2,3,4,5].flatMap(i=>{const a=i*Math.PI/3;return rings.slice(0,-1).map((q,k)=>rod([Math.cos(a)*q[1],Math.sin(a)*q[1],q[0]],[Math.cos(a)*rings[k+1][1],Math.sin(a)*rings[k+1][1],rings[k+1][0]],.03,truss));}).concat([0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3;return rod([Math.cos(a)*.34,Math.sin(a)*.34,5.12],[Math.cos(a)*.55,Math.sin(a)*.55,5.42],.03,truss);})),truss);
 // Jet de pions chargés guidé par la tuyère : en réalité presque invisible ; représenté faiblement.
 const glowMat=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending,uniforms:{power:{value:0},clock:{value:0}},vertexShader:'varying vec2 plumeUV;void main(){plumeUV=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec2 plumeUV;uniform float power,clock;void main(){float taper=pow(1.-plumeUV.y,2.2);float stripe=.92+.08*sin(plumeUV.y*80.-clock*24.);gl_FragColor=vec4(mix(vec3(.35,.25,1.),vec3(.85,.8,1.),taper),power*taper*stripe*.22);}'});
 const plume=mesh(new T.CylinderGeometry(.04,.5,7,48,24,true),glowMat,0,0,9.0);plume.rotation.x=Math.PI/2;
 g.scale.setScalar(.62); // même encombrement à l'écran que Odyssée-01 (≈ 10 unités)
 g.userData={name:'Odyssée-02',plume,core:chamber,radiators,lengthMeters:400,scaleMetersPerUnit:25,fictional:true};
 return g;
}
export class SpacecraftView{
 // Essai : remplace le modèle affiché (banc de comparaison Odyssée-01 / Odyssée-02 dans la même page et la même scène).
 setModel(m){if(m===this.model)return;if(!m.userData.prepared){this.prepare(m);m.userData.prepared=true;}this.scene.remove(this.model);this.model=m;this.scene.add(m);}
 constructor(canvas,lut=[]){this.lut=lut;this.scene=new T.Scene();this.camera=new T.PerspectiveCamera(46,1,.01,1000);this.camera.position.set(12,7,14);this.controls=new OrbitControls(this.camera,canvas);this.controls.enabled=false;this.controls.enableDamping=true;this.controls.minDistance=9;this.controls.maxDistance=70;this.controls.target.set(0,0,0);this.model=(q=>q.get('essai')==='1'&&q.get('vaisseau')!=='01')(new URLSearchParams(location.search))?odysseyModelV2():odysseyModel();/* essai : ?vaisseau=01 garde Odyssée-01 pour comparer les deux à scène identique *//* Odyssée-02 en session d'essai seulement, jusqu'à validation. */this.scene.add(this.model);// Two lighting modes. "inspection": studio lights and an indoor environment, explicitly non-physical.
 // "astro": up to three real stellar sources (ship-lighting.js), no fill light, the dominant one casts shadows.
 this.studio=new T.Group();this.studio.add(new T.HemisphereLight(0xa8c9e7,0x383233,.65));const light=new T.DirectionalLight(0xffefd7,3);light.position.set(-6,8,10);this.studio.add(light);this.scene.add(this.studio);
 this.astro=new T.Group();this.starLights=[0,1,2].map(i=>{const l=new T.DirectionalLight(0xffffff,0);if(i===0){l.castShadow=true;l.shadow.mapSize.set(2048,2048);Object.assign(l.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:.5,far:80});l.shadow.bias=-.0004;l.shadow.normalBias=.02;}this.astro.add(l);return l;});this.scene.add(this.astro);this.shaders=[];this.ready=true;this.error=null;this.voyager=null;
 this.prepare=model=>model.traverse(o=>{if(!o.isMesh||o.material.isShaderMaterial)return;o.castShadow=true;o.receiveShadow=true;const materials=Array.isArray(o.material)?o.material:[o.material];for(const m of materials){m.onBeforeCompile=sh=>{Object.assign(sh.uniforms,{relVelocity:{value:new T.Vector3()},relGamma:{value:1},relMode:{value:0}});sh.vertexShader='uniform vec3 relVelocity;uniform float relGamma,relMode;\n'+sh.vertexShader;sh.vertexShader=sh.vertexShader.replace('#include <project_vertex>',`vec4 world=modelMatrix*vec4(transformed,1.);float beta=length(relVelocity);if(relMode>.5&&beta>.000001){vec3 e=relVelocity/beta;float gamma=relGamma;world.xyz+=e*dot(world.xyz,e)*(1./gamma-1.);if(relMode>1.5){world.xyz+=relVelocity*length(cameraPosition);vec3 r=world.xyz-cameraPosition;float rv=dot(r,relVelocity),r2=dot(r,r),a=1./(gamma*gamma),root=sqrt(rv*rv+a*r2);float ct=rv>=0.?-r2/(root+rv):-(root-rv)/a;world.xyz+=relVelocity*ct;}}vec4 mvPosition=viewMatrix*world;gl_Position=projectionMatrix*mvPosition;`);this.shaders.push(sh);};}});this.prepare(this.model); // aussi utilisé par le banc d'essai qui alterne les deux vaisseaux dans la même page
 new GLTFLoader().load('./assets/voyager.glb',g=>{const box=new T.Box3().setFromObject(g.scene),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3());g.scene.position.sub(center);const holder=new T.Group();holder.add(g.scene);holder.scale.setScalar(2/Math.max(size.x,size.y,size.z));this.voyager=holder;},undefined,e=>{this.voyagerError=String(e);});}
 // With a known light direction, frame the hull in three-quarter lighting (camera choice only; light unchanged).
 focus(lightDir){if(lightDir){const l=new T.Vector3(...lightDir).normalize(),up=Math.abs(l.y)>.9?new T.Vector3(1,0,0):new T.Vector3(0,1,0),side=new T.Vector3().crossVectors(l,up).normalize();this.camera.position.copy(l.multiplyScalar(.72).addScaledVector(side,.6).addScaledVector(up,.35).normalize().multiplyScalar(22));}else this.camera.position.set(13,7,16);this.camera.up.set(0,1,0);this.controls.target.set(0,0,0);this.camera.lookAt(0,0,0);this.controls.update();}
 async render(renderer,s,aspect,trace){
 const astro=(s.shipLighting||'astro')==='astro';
 if(!astro&&!this.environment){const pmrem=new T.PMREMGenerator(renderer);const room=new RoomEnvironment();this.environment=pmrem.fromScene(room,.06);room.dispose();pmrem.dispose();}
 this.studio.visible=!astro;this.astro.visible=astro;this.scene.environment=astro?null:this.environment.texture;
 if(astro){renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;const src=s.shipLightSources||[],Edom=src[0]?.E||0;if(src[0]&&!this.framedForLight){this.focus(src[0].dir);this.framedForLight=true;}
  this.starLights.forEach((l,i)=>{const x=src[i];if(!x){l.intensity=0;l.visible=false;return;}l.visible=true;l.position.set(...x.dir).multiplyScalar(40);l.color.setRGB(...blackbodyRGB(this.lut,x.T));l.intensity=displayIntensity(x.E,Edom);});}
 const firing=!s.paused&&!s.passage&&!s.gr&&(s.orbit?.assist||s.engine==='thrust'||s.engine==='brake'||s.ap?.stage==='brake'||s.ap?.stage==='flight'&&(s.ap.elapsed<s.ap.plan.ta||s.ap.elapsed>s.ap.plan.ta+s.ap.plan.tc));
 this.model.userData.plume.visible=!!firing;this.model.userData.plume.material.uniforms.power.value=firing?1:0;this.model.userData.plume.material.uniforms.clock.value=s.wall;this.model.userData.core.material.emissiveIntensity=firing?2:.12;for(const r of this.model.userData.radiators||[])r.material.emissiveIntensity=firing?.13:0;/* radiateurs chauds pendant la poussée */
this.camera.aspect=aspect||renderer.domElement.clientWidth/renderer.domElement.clientHeight;this.camera.updateProjectionMatrix();this.model.quaternion.copy(s.q);if(s.engine==='brake'||s.ap?.stage==='brake'||s.ap?.stage==='flight'&&s.ap.elapsed>s.ap.plan.ta+s.ap.plan.tc)this.model.rotateY(Math.PI);const beta=s.opticalLab?s.labBeta:s.speedValue||0,g=s.opticalLab?1/Math.sqrt((1-beta)*(1+beta)):s.gammaValue||1;let dir=new T.Vector3(...(s.velocityVector||[0,0,0]));if(dir.length()<1e-8)dir.set(0,0,-1).applyQuaternion(s.q);dir.normalize().multiplyScalar(beta);for(const sh of this.shaders){sh.uniforms.relVelocity.value.copy(dir);sh.uniforms.relGamma.value=g;sh.uniforms.relMode.value=s.shipFrame==='geometric'?1:s.shipFrame==='received'?2:0;}
 const viewport=new T.Vector4(),scissor=new T.Vector4();renderer.getViewport(viewport);renderer.getScissor(scissor);const test=renderer.getScissorTest(),target=renderer.getRenderTarget(),save=renderer.autoClear,color=renderer.getClearColor(new T.Color()),alpha=renderer.getClearAlpha();
 const scale=Math.max(1.5,Math.min(2,renderer.getPixelRatio())),w=Math.round(viewport.z*scale),h=Math.round(viewport.w*scale);
 if(!this.target){this.target=new T.WebGLRenderTarget(w,h,{samples:4,format:T.RGBAFormat});this.composite=new T.Scene();this.compositeCamera=new T.OrthographicCamera(-1,1,1,-1,0,1);this.composite.add(new T.Mesh(new T.PlaneGeometry(2,2),new T.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,uniforms:{image:{value:this.target.texture}},vertexShader:'varying vec2 shipUV;void main(){shipUV=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:'varying vec2 shipUV;uniform sampler2D image;void main(){gl_FragColor=texture2D(image,shipUV);\n#include <colorspace_fragment>\n}'})));}
 if(this.target.width!==w||this.target.height!==h)this.target.setSize(w,h);
 renderer.setScissorTest(false);renderer.setRenderTarget(this.target);renderer.setClearColor(0,0);renderer.autoClear=true;if(trace)await trace.compile(renderer,this.scene,this.camera,'Vaisseau et ombres');renderer.render(this.scene,this.camera);
 renderer.setRenderTarget(target);renderer.setViewport(viewport);renderer.setScissor(scissor);renderer.setScissorTest(test);renderer.setClearColor(color,alpha);renderer.autoClear=false;if(trace)await trace.compile(renderer,this.composite,this.compositeCamera,'Composition du vaisseau');renderer.render(this.composite,this.compositeCamera);renderer.autoClear=save;}
}
