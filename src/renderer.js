import {needsSkyCapture} from './sky-refresh.js';
import {renderPixelRatio} from './render-budget.js';
import {nestedEmissionBudget} from './nested-emission.js';
import {NebulaPointLayer,nebulaVolumeWeight,visibleBand} from './nebula-points.js';
import {CatalogueSky} from './catalogue-sky.js';
import {mapPoints} from './map-points.js';
import * as T from 'three';
import {CosmicScene} from './cosmic-scene.js';
import {LocalGroupLayer} from './local-group.js';
import {PassageView} from './passage.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {sub,norm,unit,velocity,aberrate,aberrateU,gammaU,gamma,mul,EQ_TO_GAL,AU,labDirection} from './physics.js';
import {radiusLy,hash} from './body-data.js';
import {createGalaxySphere,makePopulation,GAL_CENTER} from './galaxy.js';
import {GalaxyLightLayer} from './galaxy-photometry.js';
import {CUBE_SIZE,PSF_MIN_SCREEN} from './photometry.js';
import {GalaxySpectralOverlay} from './galaxy-spectral-overlay.js';
import {CockpitBasinOverlay} from './cf4-basins.js';
import {createStarlight} from './stellar-light.js';
import {SkyOptics} from './sky-optics.js';
import {SpacecraftView} from './spacecraft.js';
import {ShipLighting} from './ship-lighting.js';
import {EnvironmentLayer,GalacticOrbit} from './environments.js';
import {BlackHoleLens} from './black-hole.js';
import {SolarMapLayer} from './solar-map.js';

const vec=a=>new T.Vector3(...a);
function stellarColor(o){const s=o.spect||'';return new T.Color(o.type==='blackhole'?0xbda0e7:o.type==='nebula'||o.type==='pillars'?0x99e7d0:s.startsWith('M')?0xff9772:s.startsWith('K')?0xffc08b:s.startsWith('O')||s.startsWith('B')?0x9fbfff:s.startsWith('A')?0xc9ddff:0xffe6bd);}
function line(points,color,opacity=1){const g=new T.BufferGeometry().setFromPoints(points.map(vec));return new T.Line(g,new T.LineBasicMaterial({color,transparent:true,opacity}));}
function label(text,color='#9fb5bd'){const c=document.createElement('canvas');c.width=512;c.height=64;const x=c.getContext('2d');x.font='28px monospace';x.fillStyle=color;x.fillText(text,5,43);const tex=new T.CanvasTexture(c);const s=new T.Sprite(new T.SpriteMaterial({map:tex,transparent:true,depthTest:false}));s.scale.set(9,1.125,1);return s;}
const starVertex=`attribute vec3 tint;attribute float pointSize;uniform vec3 ship;uniform vec3 speed;uniform float optics;uniform float shift;varying vec3 vColor;void main(){vec3 r=position-ship;float d=max(length(r),0.00000000001);vec3 n=r/d;float b=length(speed);float D=1.;if(optics>.5&&b>.000001){vec3 e=speed/b;float g=inversesqrt(1.-b*b);float mu=dot(n,e);D=g*(1.+b*mu);n=(n+e*((g-1.)*mu+g*b))/D;}vColor=tint;if(shift>.5&&optics>.5){float z=clamp(log(D)*.32,-.85,.85);vColor=mix(tint,z>0.?vec3(.40,.64,1.):vec3(1.,.22,.06),abs(z));vColor*=clamp(pow(D,.35),.25,1.8);}gl_Position=projectionMatrix*modelViewMatrix*vec4(n*1000.,1.);gl_PointSize=pointSize;}`;
const starFragment=`varying vec3 vColor;void main(){float d=length(gl_PointCoord-vec2(.5))*2.;if(d>1.)discard;gl_FragColor=vec4(vColor,pow(1.-d,1.7));}`;
const surfaceVertex=`varying vec3 p;varying vec3 n;void main(){p=position;n=normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const surfaceFragment=`precision highp float;varying vec3 p;varying vec3 n;uniform vec3 base;uniform float kind;uniform float seed;uniform float time;
float hash(vec3 q){return fract(sin(dot(q,vec3(127.1,311.7,74.7))+seed)*43758.5453123);}
float noise(vec3 q){vec3 i=floor(q),f=fract(q);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 q){return .53*noise(q)+.27*noise(q*2.)+.13*noise(q*4.)+.07*noise(q*8.);}
void main(){float f=fbm(p*5.);vec3 col=base;if(kind<.5){float cells=noise(p*180.+time*.03);col=base*(.6+.7*cells);float limb=.4+.6*abs(n.z);col*=limb;}
else if(kind<1.5){float continents=fbm(p*3.6);col=mix(vec3(.015,.09,.24),vec3(.12,.30,.18),smoothstep(.49,.54,continents));float cloud=smoothstep(.58,.76,fbm(p*9.+vec3(time*.005,0,0)));col=mix(col,vec3(.8,.88,.88),cloud*.8);if(abs(p.y)>.92)col=vec3(.75,.86,.9);}
else if(kind<2.5){float bands=sin(p.y*48.+fbm(p*7.)*7.);col=base*(.65+.3*bands+.4*f);}
else{col=base*(.5+.9*f);float craters=pow(noise(p*60.),10.);col-=craters*.25;}
if(kind>.5){float light=max(.025,dot(normalize(n),normalize(vec3(-.8,.45,1.))));col*=.09+.91*light;}gl_FragColor=vec4(col,1.);}`;

export class SpaceRenderer{
 constructor(canvas,stars,onPick,objects=stars,lut=[]){
  this.catalogueSky=new CatalogueSky();this.cosmicFlight=new CosmicScene({map:false});this.cosmicView=new T.Scene();this.cosmicView.add(this.cosmicFlight.root);this.canvas=canvas;this.onPick=onPick;this.stars=stars;this.objects=objects;this.nearCheck=0;this.mapMode=false;this.mapScale=1;this.localId=null;this.track=[];
  this.renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});this.renderer.setClearColor(0x000000);this.renderer.outputColorSpace=T.SRGBColorSpace;
  this.flight=new T.Scene();this.camera=new T.PerspectiveCamera(70,1,.001,3000);this.galaxy=createGalaxySphere();this.flight.add(this.galaxy);this.passageView=new PassageView();this.spacecraft=new SpacecraftView(canvas,lut);this.shipLighting=new ShipLighting(objects);this.shipLight=[];this.skyOptics=new SkyOptics(lut,objects);this.lens=new BlackHoleLens();this.environments=new EnvironmentLayer(this.flight,objects,lut);this.nebulaPoints=new NebulaPointLayer(this.environments.objects);this.flight.add(this.nebulaPoints.points);this.orbit=new GalacticOrbit(this.flight,GAL_CENTER);
  const positions=[],colors=[],sizes=[];for(const s of stars){positions.push(...s.xyz);colors.push(...stellarColor(s).toArray());sizes.push(Math.max(2,Math.min(7,5-(s.mag||5)*.3)));}
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('tint',new T.Float32BufferAttribute(colors,3));geometry.setAttribute('pointSize',new T.Float32BufferAttribute(sizes,1));
  this.starMaterial=new T.ShaderMaterial({vertexShader:starVertex,fragmentShader:starFragment,uniforms:{ship:{value:new T.Vector3()},speed:{value:new T.Vector3()},optics:{value:0},shift:{value:1}},transparent:true,depthWrite:false,blending:T.AdditiveBlending});
  this.galaxyLight=new GalaxyLightLayer(lut);this.galaxySpectralOverlay=new GalaxySpectralOverlay(this.galaxyLight);this.basinOverlay=new CockpitBasinOverlay();this.flight.add(this.galaxyLight.points);this.galaxyAliases=new Map();this.sky=createStarlight(stars.filter(s=>s.type==='star'&&s.id!=='s2'),lut);this.starMaterial=this.sky.material;this.sky.frustumCulled=false;this.flight.add(this.sky);this.localGroup=new T.Group();this.flight.add(this.localGroup);
  this.map=new T.Scene();this.mapCamera=new T.PerspectiveCamera(50,1,.001,1000000);this.mapCamera.up.set(...EQ_TO_GAL[2]);this.mapCamera.position.set(14,13,18);
  this.controls=new OrbitControls(this.mapCamera,canvas);this.controls.enabled=false;this.controls.enableDamping=true;this.controls.dampingFactor=.1;this.controls.maxDistance=500000;this.controls.minDistance=.002;
  this.mapWorld=new T.Group();this.map.add(this.mapWorld);this.mapWorld.add(this.catalogueSky.mapPoints);const mg=new T.BufferGeometry();mg.setAttribute('position',new T.Float32BufferAttribute(positions,3));mg.setAttribute('color',new T.Float32BufferAttribute(colors,3));this.mapStars=new T.Points(mg,mapPoints(2,.75));this.mapWorld.add(this.mapStars);this.population=makePopulation();this.mapWorld.add(this.population);this.centerLabel=label('SAGITTARIUS A*','#e8b581');this.map.add(this.centerLabel);this.centerLabel.renderOrder=5;
  this.planes=new T.Group();this.map.add(this.planes);this.galPlane=this.makePlane(EQ_TO_GAL[2],0xaa88ef);const eps=23.4392911*Math.PI/180;this.eclPlane=this.makePlane([0,-Math.sin(eps),Math.cos(eps)],0x62c8ff);this.planes.add(this.galPlane,this.eclPlane);
  this.sun=new T.Mesh(new T.SphereGeometry(.10,16,12),new T.MeshBasicMaterial({color:0xffd59d}));this.map.add(this.sun);this.sunLabel=label('SOLEIL','#ffdaaa');this.sunLabel.position.set(3,.2,0);this.map.add(this.sunLabel);
  this.ship=new T.Mesh(new T.OctahedronGeometry(.15),new T.MeshBasicMaterial({color:0xa8f5d2}));this.map.add(this.ship);this.noseArrow=new T.ArrowHelper(new T.Vector3(0,0,-1),new T.Vector3(),3,0xd9f0ef,.5,.2);this.velArrow=new T.ArrowHelper(new T.Vector3(0,0,-1),new T.Vector3(),3,0xffca82,.5,.2);this.map.add(this.noseArrow,this.velArrow);
  this.destination=new T.Mesh(new T.SphereGeometry(.15,12,10),new T.MeshBasicMaterial({color:0xb897ff,wireframe:true}));this.map.add(this.destination);this.destLine=line([[0,0,0],[0,0,0]],0xa6a1d9,.55);this.pathLine=line([[0,0,0]],0x95eac4);this.map.add(this.destLine,this.pathLine);this.axes=new T.Group();this.map.add(this.axes);
  for(const [i,name] of ['Xg · l 0°','Yg · l 90°','Zg · pôle N'].entries()){const axis=EQ_TO_GAL[i];this.axes.add(line([axis.map(v=>-v*22),axis.map(v=>v*22)],i===2?0x84699f:0x506778,.5));const l=label(name);l.position.copy(vec(axis).multiplyScalar(23));this.axes.add(l);}
  this.predictedOrbit=new T.Line(new T.BufferGeometry(),new T.LineDashedMaterial({color:0x689db2,dashSize:.22,gapSize:.16,transparent:true,opacity:.7}));this.map.add(this.predictedOrbit);this.predictedOrbit.visible=false;this.orbitalBody=new T.Mesh(new T.SphereGeometry(1,64,40),new T.MeshBasicMaterial({color:0x547f99}));this.map.add(this.orbitalBody);this.orbitalLabel=label('');this.map.add(this.orbitalLabel);this.orbitalBody.visible=this.orbitalLabel.visible=false;
  this.milkyLabel=label('VOIE LACTÉE','#e9c48e');this.map.add(this.milkyLabel);this.localGroupLayer=new LocalGroupLayer(this.skyOptics.material.uniforms,objects,this.mapWorld,label,this.map);this.localGroupLayer.setLut(lut);this.localGroupLayer.calibrateFixed();this.solarMap=new SolarMapLayer(this.mapWorld,this.map,label);this.byId=new Map(objects.map(o=>[o.id,o]));
  new ResizeObserver(()=>this.resize()).observe(canvas);this.resize();canvas.addEventListener('dblclick',e=>this.pickCatalogue(e));let down;canvas.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);canvas.addEventListener('pointerup',e=>{if(this.mapMode&&down&&Math.hypot(e.clientX-down[0],e.clientY-down[1])<4)this.pick(e);});
 }
 pickCatalogue(event){if(this.mapMode||this.lastState?.opticalLab||this.lastState?.catalogueMarkers===false||!(this.lastState?.target?.type==='cosmic'||norm(this.lastState?.pos||[0,0,0])>1e7))return;const r=this.canvas.getBoundingClientRect(),row=this.catalogueSky.pick(this.camera,event.clientX-r.left,event.clientY-r.top,r.width,r.height);if(row)this.onCataloguePick?.(row);}
 makePlane(normal,color){const group=new T.Group();const n=vec(normal).normalize();group.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),n);const grid=new T.GridHelper(50,10,color,color);grid.material.transparent=true;grid.material.opacity=.19;group.add(grid);const circle=[];for(let i=0;i<=180;i++)circle.push([25*Math.cos(i*Math.PI/90),0,25*Math.sin(i*Math.PI/90)]);group.add(line(circle,color,.6));return group;}
 resize(){const w=this.canvas.clientWidth,h=this.canvas.clientHeight;if(!w||!h)return;this.renderer.setPixelRatio(renderPixelRatio(w,h,devicePixelRatio));this.renderer.setSize(w,h,false);this.camera.aspect=this.mapCamera.aspect=w/h;this.camera.updateProjectionMatrix();this.mapCamera.updateProjectionMatrix();}
 setMap(on,state){this.mapMode=on;this.controls.enabled=on;this.spacecraft.controls.enabled=!on&&state.external;if(on&&!this.mapInitialized){this.fit('route',state);this.mapInitialized=true;}}
 fit(where,s,requested){this.orbitalMap=where==='orbital';this.orbitalCenter=null;const target=s.target?.xyz||[0,0,0];let galaxy=where==='galaxy'||where==='top';let span=where==='orbital'?Math.max(1e-12,norm(s.orbit?.r||[1,0,0])/9460730472580800*3):requested|| (galaxy?65000:where==='sun'?10000:where==='ship'?Math.max(.00005,norm(sub(target,s.pos))*.3):Math.max(.00005,norm(s.pos),norm(target)));this.mapScale=20/span;this.mapWorld.scale.setScalar(this.mapScale);let center=where==='group'?[600000,200000,450000]:where==='orbital'?(this.objects.find(x=>x.id===s.orbit?.id)?.xyz||s.target?.xyz||s.pos):galaxy?GAL_CENTER:where==='sun'?[0,0,0]:where==='ship'?s.pos:s.pos.map((x,i)=>(x+target[i])/2);this.controls.target.copy(vec(center).multiplyScalar(this.mapScale));this.mapCamera.up.set(...(where==='top'?EQ_TO_GAL[1]:EQ_TO_GAL[2]));this.mapCamera.position.copy(this.controls.target).add(where==='top'?vec(EQ_TO_GAL[2]).multiplyScalar(48):new T.Vector3(18,-22,19));this.axes.position.set(...center.map(v=>v*this.mapScale));this.galPlane.position.set(...GAL_CENTER.map(v=>v*this.mapScale));this.controls.update();this.gridStep=5/this.mapScale;const select=document.getElementById('galaxy-scale');if(select){if(this.orbitalMap){let opt=select.querySelector('[value=orbital]');if(!opt){opt=document.createElement('option');opt.value='orbital';opt.textContent='Orbite locale · kilomètres';select.append(opt);}select.value='orbital';}else select.value=String(requested||(galaxy?110000:span));}}

 pick(event){const r=this.canvas.getBoundingClientRect(),ray=new T.Raycaster();ray.params.Points.threshold=.16;ray.setFromCamera(new T.Vector2((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1),this.mapCamera);const galaxies=ray.intersectObjects(this.localGroupLayer.pickables);if(galaxies.length){this.onPick(galaxies[0].object.userData.object);return;}const hits=ray.intersectObject(this.mapStars);if(hits.length)this.onPick(this.stars[hits[0].index]);}
 setLocal(o){
  if(this.localId===o?.id)return;this.localId=o?.id;while(this.localGroup.children.length){const m=this.localGroup.children[0];this.localGroup.remove(m);m.traverse(x=>{x.geometry?.dispose();if(x.material){for(const mat of Array.isArray(x.material)?x.material:[x.material])mat.dispose();}});}this.body=null;this.cloud=null;this.surface=null;if(!o)return;
  const group=new T.Group();this.body=group;this.localGroup.add(group);const sphere=(r,color)=>new T.Mesh(new T.SphereGeometry(r,64,40),new T.MeshBasicMaterial({color}));
  if(o.type==='probe'){if(this.spacecraft.voyager){group.add(this.spacecraft.voyager.clone(true));group.add(new T.HemisphereLight(0xb5d2ff,0x151515,2));}return;}
  if(o.type==='blackhole'){
   group.add(sphere(1,0x000000));const shadow=sphere(2.598,0x000000);group.add(shadow);const ring=new T.Mesh(new T.TorusGeometry(2.64,.035,12,180),new T.MeshBasicMaterial({color:0xd3b5ff,transparent:true,opacity:.6}));group.add(ring);
   if(o.accretion){const disk=new T.Mesh(new T.RingGeometry(3.1,9,128,12),new T.MeshBasicMaterial({color:0xffab67,side:T.DoubleSide,transparent:true,opacity:.45}));disk.rotation.x=Math.PI*.38;group.add(disk);}this.bodyRadius=1;
  }else if(o.type==='nebula'||o.type==='pillars'||o.type==='cluster'){
   const pts=[],cols=[];let seed=hash(o.id);const rand=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};const count=o.type==='pillars'?17000:10000;
   for(let i=0;i<count;i++){let x,y,z;if(o.type==='pillars'){let k=i%3,t=rand();const w=.08+.09*(1-t);x=(k-1)*.47+Math.sin(t*4+k)*.09+(rand()-.5)*w*3;y=-.8+t*(1.7-k*.22);z=(rand()-.5)*w*3;const tip=t>.91;cols.push(tip?.9:.28,tip?.73:.39,tip?.46:.49);}else{const a=rand()*Math.PI*2,u=rand()*2-1,rad=Math.cbrt(rand());x=rad*Math.sqrt(1-u*u)*Math.cos(a);y=rad*u;z=rad*Math.sqrt(1-u*u)*Math.sin(a);if(o.id==='ring'||o.id==='helix'){const r=.7+(rand()-.5)*.15;x=r*Math.cos(a);y=r*Math.sin(a);z=(rand()-.5)*.2;}cols.push(.2+rand()*.5,.18+rand()*.25,.4+rand()*.45);}pts.push(x,y,z);}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pts,3));g.setAttribute('tint',new T.Float32BufferAttribute(cols,3));g.setAttribute('pointSize',new T.Float32BufferAttribute(Array(count).fill(o.type==='pillars'?4:5),1));const m=new T.ShaderMaterial({vertexShader:'attribute vec3 tint;attribute float pointSize;varying vec3 vColor;void main(){vColor=tint;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=pointSize;}',fragmentShader:'uniform float gain;'+starFragment.replace('vec4(vColor,','vec4(vColor*gain,'),uniforms:{gain:{value:1}},transparent:true,depthWrite:false,blending:T.AdditiveBlending});group.add(new T.Points(g,m));this.cloud=m;
  }else{
   let kind=o.type==='star'||o.id==='h0'||o.type==='pulsar'?0:o.skin==='earth'?1:['gas','saturn','ice','venus'].includes(o.skin)||o.planet?.radiusEarth>4?2:3;
   let color=o.type==='pulsar'?new T.Color(0x92bbff):kind===0?stellarColor(o):new T.Color(o.skin==='earth'?0x528caf:o.skin==='mars'?0xb57655:o.skin==='ice'?0x65a6bb:o.skin==='moon'||o.type==='moon'?0xb9b9b1:o.skin==='venus'?0xdcc29b:0xb4a58c);
   const mat=new T.ShaderMaterial({vertexShader:surfaceVertex,fragmentShader:surfaceFragment,uniforms:{base:{value:color},kind:{value:kind},seed:{value:hash(o.id)%1000},time:{value:0}}});group.add(new T.Mesh(new T.SphereGeometry(1,80,64),mat));this.surface=mat;
   if(o.skin==='saturn'){const rings=new T.Mesh(new T.RingGeometry(1.25,2.3,160,12),new T.MeshBasicMaterial({color:0xcbb798,side:T.DoubleSide,transparent:true,opacity:.66}));rings.rotation.x=Math.PI*.38;group.add(rings);}
   if(o.type==='pulsar'){for(let side of [-1,1]){const jet=new T.Mesh(new T.ConeGeometry(.4,7,32,1,true),new T.MeshBasicMaterial({color:0x79c4ff,transparent:true,opacity:.12,side:T.DoubleSide}));jet.position.y=side*4;jet.rotation.z=side>0?Math.PI:0;group.add(jet);}}
  }
 }
 // Galaxies drawn in volume (local-group.js) and every catalogue id that designates them: not repeated as points.
 // Galaxies drawn in volume (local-group.js): share of their light left to the point layer (1 − w) × anisotropy, also under
 // every catalogue id that designates them.
 volumeIds(){const m=new Map();for(const o of [...this.localGroupLayer.objects,...this.localGroupLayer.slots]){const h=this.localGroupLayer.handoff.get(o.id);m.set(o.id,(h?(1-h.w)*h.aniso:0)*(this.emissionBudget?.hostGains.get(o.id)??1));}for(const [k,v] of this.galaxyAliases)if(m.has(v))m.set(k,m.get(v));return m;}
 async render(s,dt){this.lastState=s;s.pixelAngle=2*Math.tan((this.camera.fov||70)*Math.PI/360)/Math.max(1,this.renderer.getDrawingBufferSize(this._db||(this._db=new T.Vector2())).y);this.localGroupLayer.update(s,this.mapScale,s.map);this.solarMap.update(s,this.mapScale,s.map,this.byId);this.milkyLabel.visible=s.map&&this.mapScale<.0001;this.milkyLabel.position.set(...GAL_CENTER.map(x=>x*this.mapScale));this.milkyLabel.position.x+=2;this.sunLabel.visible=!this.milkyLabel.visible;
  this.catalogueSky.mapPoints.visible=!!s.map&&this.mapScale<.000002&&s.catalogueMarkers!==false;if(!s.map&&s.catalogueMarkers!==false&&(s.target?.type==='cosmic'||norm(s.pos)>1e7))this.catalogueSky.update(s.pos,[...this.localGroupLayer.objects,...this.localGroupLayer.slots],s.t,s.retarded);
  const physicalV=velocity(s.u);let v=s.opticalLab?labDirection(physicalV,new T.Vector3(0,0,-1).applyQuaternion(s.q).toArray()).map(x=>x*s.labBeta):physicalV;const forward=new T.Vector3(0,0,-1).applyQuaternion(s.q);this.starMaterial.uniforms.ship.value.set(...s.pos);this.starMaterial.uniforms.speed.value.set(...v);this.starMaterial.uniforms.optics.value=0;this.starMaterial.uniforms.shift.value=0;this.spacecraft.controls.enabled=s.external&&!s.map;if(s.trackTarget&&!s.opticalLab&&s.target){
   const target=s.target.lookAt?this.objects.find(o=>o.id===s.target.lookAt):s.target;
   let n=unit(sub(target.lightXYZ||target.xyz,s.pos));if(s.relativistic&&(!s.external||s.shipFrame==='comoving'))n=aberrateU(n,s.u);
   const direction=vec(n),up=Math.abs(n[2])>.95?new T.Vector3(0,1,0):new T.Vector3(0,0,1);
   if(s.external){const right=new T.Vector3().crossVectors(direction,up).normalize();this.spacecraft.controls.target.set(0,0,0);this.spacecraft.camera.position.copy(direction).multiplyScalar(-32).addScaledVector(right,8).addScaledVector(up,3);this.spacecraft.camera.up.copy(up);this.spacecraft.camera.lookAt(0,0,0);}
   else{this.camera.up.copy(up);this.camera.lookAt(direction);}
  }else if(!s.external)this.camera.quaternion.copy(s.q);
  if(s.external){this.spacecraft.controls.update();this.camera.quaternion.copy(this.spacecraft.camera.quaternion);}
  this.spacecraft.camera.fov=s.opticalLab?46:70;this.camera.fov=s.external?this.spacecraft.camera.fov:(s.fov||70);this.camera.updateProjectionMatrix();this.camera.updateMatrixWorld();this.galaxy.material.uniforms.observer.value.set(...s.pos);this.galaxy.material.uniforms.speed.value.set(...v);this.galaxy.material.uniforms.optics.value=0;this.galaxy.material.uniforms.band.value=s.band??1;this.galaxy.material.uniforms.exposure.value=s.exposure??1;this.galaxy.material.uniforms.enabled.value=+s.galaxyLight;this.starMaterial.uniforms.exposure.value=1;this.starMaterial.uniforms.band.value=s.band??1;await this.galaxy.bake(this.renderer,s,this.startupTrace);this.environments.update(s);this.orbit.update(s);
  // Reference V allocation, applied to both cube/HDR point handoff and host volumes.
  this.referenceBudgetEnabled??=new URLSearchParams(location.search).get('emissionBudget')==='reference';
  // Nebulae: share of each cloud drawn by its volume (backdrop march, or per-screen-ray march for the selected cloud at any
  // distance) and by its calibrated point sprite (nebula-points.js). In visible bands every cloud is represented.
  const nebulaVolume=new Map(),visBand=visibleBand(s.band??1);
  for(const o of this.nebulaPoints.objects){const selected=s.target?.id===o.id,e=this.environments.cache.get(o.id),d=norm(sub(o.lightXYZ||o.xyz,s.pos));
   const marchable=selected||!!(e?.cloud&&e.group.visible&&d/e.r+1.1<2500);
   nebulaVolume.set(o.id,marchable?nebulaVolumeWeight({radius:radiusLy(o),distance:d,selected,pixelAngle:s.pixelAngle,band:s.band??1}):0);}
  this.emissionBudget=nestedEmissionBudget({enabled:this.referenceBudgetEnabled,hosts:this.localGroupLayer.objects,clouds:this.environments.objects,
    active:visBand?new Set(this.nebulaPoints.objects.map(o=>o.id)):new Set([...this.environments.cache.values()].filter(e=>e.cloud&&e.group.visible&&norm(sub(e.o.lightXYZ||e.o.xyz,s.pos))/e.r+1.1<2500).map(e=>e.o.id)),
    pos:s.pos,beta:norm(physicalV),band:s.band??1,opticalLab:!!s.opticalLab,map:!!s.map});
  for(let i=0;i<this.localGroupLayer.objects.length;i++)this.localGroupLayer.u.groupTint.value[i].multiplyScalar(this.emissionBudget.hostGains.get(this.localGroupLayer.objects[i].id)??1);
  for(const [id,gain] of this.emissionBudget.childGains){const e=this.environments.cache.get(id);if(e?.cloud)e.cloud.material.uniforms.nebGain.value*=gain;}
  // Point sprites of the sky cube: σ ≥ 0.6 screen pixel (photometry.js PSF_MIN_SCREEN), so that resampling the cube per
  // screen pixel keeps each source's flux whatever its sub-pixel position on screen.
  const psfMin=Math.max(.55,PSF_MIN_SCREEN*s.pixelAngle/(2/CUBE_SIZE));
  for(const m of [this.starMaterial,this.galaxyLight.material,this.nebulaPoints.material,...[...this.environments.cache.values()].filter(e=>e.stars).map(e=>e.stars.material)])if(m?.uniforms?.psfMin&&m.uniforms.psfMin.value!==psfMin){m.uniforms.psfMin.value=psfMin;this.captureKey=null;}
  const nebulaPoint=new Map();this.nebulaHandoff={};
  for(const o of this.nebulaPoints.objects){const w=nebulaVolume.get(o.id),g=this.emissionBudget.childGains.get(o.id)??1,e=this.environments.cache.get(o.id);
   if(e?.cloud&&s.target?.id!==o.id){e.cloud.material.uniforms.nebGain.value*=w;e.cloud.material.uniforms.cloudOpacity.value=w;if(w<=0)e.group.visible=false;}
   nebulaPoint.set(o.id,visBand?(1-w)*g:0);this.nebulaHandoff[o.id]={volume:w,point:visBand?1-w:0,gain:g};}
  this.skyOptics.cloudOpacity=s.target&&nebulaVolume.has(s.target.id)?nebulaVolume.get(s.target.id):1;
  this.skyOptics.cloudGain=s.target&&nebulaVolume.has(s.target.id)?nebulaVolume.get(s.target.id)*(this.emissionBudget.childGains.get(s.target.id)??1):0;
  if(this.nebulaPoints.update(s,nebulaPoint))this.captureKey=null;
  const budgetKey=[...this.emissionBudget.hostGains,...this.emissionBudget.childGains].map(([id,g])=>id+':'+g.toFixed(8)).join('|');
  if(this.emissionBudgetKey!==budgetKey){this.captureKey=null;this.emissionBudgetKey=budgetKey;this.galaxyLight.key='';}

  const visualU=s.opticalLab?mul(labDirection(physicalV,forward.toArray()),gamma(s.labBeta)*s.labBeta):s.u;
  const updateSkyPositions=()=>{const positionKey=[s.t,...s.pos,s.retarded].join('|');
   if(this.positionKey!==positionKey){this.positionKey=positionKey;const attr=this.sky.geometry.attributes.position,absolute=this.sky.geometry.attributes.catalogPosition;
    this.sky.userData.stars.forEach((o,i)=>{const p=o.lightXYZ||o.xyz;attr.setXYZ(i,p[0]-s.pos[0],p[1]-s.pos[1],p[2]-s.pos[2]);absolute.setXYZ(i,...p);});attr.needsUpdate=absolute.needsUpdate=true;}
   if(s.map&&this.mapPositionKey!==positionKey){this.mapPositionKey=positionKey;const mapAttr=this.mapStars.geometry.attributes.position;this.stars.forEach((o,i)=>mapAttr.setXYZ(i,...o.xyz));mapAttr.needsUpdate=true;this.mapStars.geometry.computeBoundingSphere();}
  };if(s.map)updateSkyPositions();
  const o=s.target,relative=o?sub(o.lightXYZ||o.xyz,s.pos):null;
  if(s.wall>this.nearCheck||this.nearTarget!==o?.id||!this.nearPos||norm(sub(s.pos,this.nearPos))>.01){this.nearPos=[...s.pos];this.nearCheck=s.wall+.3;this.nearTarget=o?.id;let best=null,score=120;for(const body of this.objects){if(['nebula','pillars','cluster','galaxy','cosmic','waypoint'].includes(body.type))continue;const q=norm(sub(body.lightXYZ||body.xyz,s.pos))/radiusLy(body);if(q<score){score=q;best=body;}}this.nearObject=best;}
  const selectedNear=o&&!['nebula','pillars','cluster','galaxy','cosmic','waypoint'].includes(o.type)&&norm(relative)/radiusLy(o)<120;const body=selectedNear?o:this.nearObject,local=!!body,bodyRelative=body?sub(body.lightXYZ||body.xyz,s.pos):null,ratio=body?norm(bodyRelative)/radiusLy(body):Infinity;const direct=this.skyOptics.closeup.update(body,s);this.localGroup.visible=local&&!direct&&body?.type!=='blackhole';
  if(local){const o=body;this.setLocal(o);let direction=unit(bodyRelative);this.body.position.copy(vec(direction).multiplyScalar(ratio));if(['nebula','pillars','cluster','galaxy','cosmic'].includes(o.type)){if(!this.body.userData.oriented){this.body.quaternion.copy(s.q);this.body.userData.oriented=true;}}else this.body.quaternion.identity();if(o.type==='blackhole')this.body.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),vec(direction).negate());if(o.type==='pulsar')this.body.rotation.z=s.wall*.5;if(this.cloud)this.cloud.uniforms.gain.value=s.scientific?1:.18;if(this.surface)this.surface.uniforms.time.value=s.wall;this.sky.visible=true;}
  this.local=local||!!s.target&&['nebula','pillars','cluster','galaxy','cosmic'].includes(s.target.type)&&norm(sub(s.target.xyz,s.pos))/radiusLy(s.target)<120;if(s.target&&['nebula','pillars','cluster','galaxy','cosmic'].includes(s.target.type)&&this.local)this.localId=s.target.id;this.localRatio=ratio;this.marker=null;
  if(o&&!this.mapMode){let n=unit(relative);if(s.relativistic)n=aberrateU(n,visualU);let point=vec(n).multiplyScalar(100).project(this.camera);const view=vec(n).applyQuaternion(this.camera.quaternion.clone().invert()),ahead=view.z<0;
   const offscreen=!ahead||Math.abs(point.x)>.78||Math.abs(point.y)>.76;
   if(offscreen){const x=view.x,y=view.y,k=.76/Math.max(Math.abs(x),Math.abs(y),1e-15);point.x=x*k;point.y=y*k;if(Math.abs(x)+Math.abs(y)<1e-10)point.x=.76;}
   this.marker={x:(point.x+1)/2,y:(1-point.y)/2,offscreen};}
  if(this.mapMode){
   const k=this.mapScale,ob=this.orbitalMap&&s.orbit?this.objects.find(x=>x.id===s.orbit.id):null;this.orbitalBody.visible=this.orbitalLabel.visible=!!ob;this.mapStars.visible=!ob;this.axes.visible=!ob;this.predictedOrbit.visible=false;
   if(ob){const center=vec(ob.xyz).multiplyScalar(k);if(this.orbitalCenter){const delta=center.clone().sub(this.orbitalCenter);this.controls.target.add(delta);this.mapCamera.position.add(delta);}this.orbitalCenter=center.clone();this.orbitalBody.position.copy(center);this.orbitalBody.scale.setScalar(radiusLy(ob)*k);if(this.orbitalLabelId!==ob.id){this.map.remove(this.orbitalLabel);this.orbitalLabel.material.map.dispose();this.orbitalLabel.material.dispose();this.orbitalLabel=label(ob.name+' · taille physique','#acd8ed');this.orbitalLabelId=ob.id;this.map.add(this.orbitalLabel);}this.orbitalLabel.position.copy(center).add(new T.Vector3(0,radiusLy(ob)*k+1,0));
    const r=vec(s.orbit.r),v=vec(s.orbit.v),h=r.clone().cross(v),ev=v.clone().cross(h).divideScalar(s.orbit.mu).sub(r.clone().normalize()),ecc=ev.length();if(ecc<.98&&!s.orbit.assist){const major=ecc>.001?ev.normalize():r.clone().normalize(),minor=h.clone().normalize().cross(major),p=h.lengthSq()/s.orbit.mu,pts=[];for(let i=0;i<=180;i++){const a=i*2*Math.PI/180,rr=p/(1+ecc*Math.cos(a));pts.push(major.clone().multiplyScalar(Math.cos(a)).addScaledVector(minor,Math.sin(a)).multiplyScalar(rr*k/9460730472580800).add(center));}this.predictedOrbit.geometry.dispose();this.predictedOrbit.geometry=new T.BufferGeometry().setFromPoints(pts);this.predictedOrbit.computeLineDistances();this.predictedOrbit.visible=s.showPath;}
}
   this.centerLabel.position.set(...GAL_CENTER.map(x=>x*k));this.centerLabel.position.add(new T.Vector3(0,1.5,0));this.centerLabel.visible=k<.01&&k>=.0001;this.ship.position.copy(vec(s.pos).multiplyScalar(k));this.noseArrow.position.copy(this.ship.position);this.noseArrow.setDirection(forward);this.velArrow.position.copy(this.ship.position);this.velArrow.visible=norm(v)>1e-10;if(this.velArrow.visible)this.velArrow.setDirection(vec(unit(ob?s.orbit.v:v)));let len=Math.max(.3,this.mapCamera.position.distanceTo(this.controls.target)*.07);this.noseArrow.setLength(len,.2*len,.07*len);this.velArrow.setLength(len*1.2,.2*len,.07*len);this.ship.scale.setScalar(len/3);this.destination.visible=!!o&&!ob;this.destLine.visible=!!o&&!ob;
   if(o){this.destination.position.copy(vec(o.xyz).multiplyScalar(k));this.destination.scale.setScalar(len/3);this.destLine.geometry.dispose();this.destLine.geometry=new T.BufferGeometry().setFromPoints([this.ship.position,this.destination.position]);}
   if(ob||this.lastTrack!==s.trail.length||this.lastScale!==k){const pts=[];if(ob){const hist=s.orbit.history;for(let i=1;i<hist.length;i++)pts.push(vec(hist[i-1]).multiplyScalar(k/9460730472580800).add(this.orbitalCenter),vec(hist[i]).multiplyScalar(k/9460730472580800).add(this.orbitalCenter));}else for(let i=1;i<s.trail.length;i++){if(!s.trail[i].break)pts.push(vec(s.trail[i-1].pos).multiplyScalar(k),vec(s.trail[i].pos).multiplyScalar(k));}this.pathLine.geometry.dispose();this.map.remove(this.pathLine);this.pathLine=new T.LineSegments(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:0x95eac4}));this.map.add(this.pathLine);this.lastTrack=s.trail.length;this.lastScale=k;}
   this.pathLine.visible=s.showPath;this.galPlane.visible=s.showGalactic;this.eclPlane.visible=s.showEcliptic;if(ob){this.eclPlane.position.copy(this.orbitalCenter);this.galPlane.position.copy(this.orbitalCenter);}else this.eclPlane.position.set(0,0,0);this.population.visible=this.gridStep>100;if(k<.000002){const c=this.cosmicFlight;this.mapWorld.add(c.root);c.root.scale.setScalar(1e6);c.root.position.set(0,0,0);c.update(3,s.target?.id?.replace('cosmic:','')||'',20/k/1e6,{envelopes:true,filaments:false,boost:6,synthetic:false});c.material.uniforms.screenHeight.value=this.canvas.clientHeight;c.material.uniforms.optics.value=0;}else this.cosmicView.add(this.cosmicFlight.root);this.controls.update();this.renderer.render(this.map,this.mapCamera);
  }else{
   const w=this.canvas.clientWidth,h=this.canvas.clientHeight;
   // Capture once in the catalogue frame, then transform EVERY incoming ray in one pass.
   const previousGalaxyKey=this.galaxyLight.key;if(this.galaxyLight.update(s,this.volumeIds())&&this.galaxyLight.key!==previousGalaxyKey)this.captureKey=null;
    // Isolate catalogue point galaxies for a per-source SED HDR pass when relativistic Doppler is active.
    // The legacy cube retains volumes and all other sources, and remains authoritative near compact objects
    // and absorbing local clouds where a separate 2-D overlay would not respect optical occlusion.
    const activeGalaxySpectra=this.galaxyLight.status==='ready'&&s.doppler&&(s.relativistic||s.opticalLab)&&(s.band??1)<2.5
      &&!(s.target?.type==='blackhole'&&norm(sub(s.pos,s.target.lightXYZ||s.target.xyz))/radiusLy(s.target)<150)
      &&!(['nebula','pillars'].includes(s.target?.type)&&norm(sub(s.pos,s.target.xyz))/radiusLy(s.target)<120);
    const captureKey=[s.retarded,s.target?.id,s.band,s.galaxyLight,s.orbitS2,this.localId,activeGalaxySpectra].join("|");if(this.captureKey===null||needsSkyCapture(this.skyCapture,{key:captureKey,pos:s.pos,t:s.t,wall:s.wall,paused:s.paused})){ updateSkyPositions();const selectedCloud=this.environments.cache.get(s.target?.id);const directCloud=!!selectedCloud?.cloud;if(directCloud)selectedCloud.group.visible=false;
    // Hide isolated points in BOTH backdrop and scene cube passes (never sneak into a backdrop texture).
    // Every point sprite layer (stars, ALL cluster populations, point galaxies, unresolved nebulae) goes to the main cube,
    // whose pixels define the photometric scale; non-selected clusters used to be drawn in the 256-pixel backdrop, where
    // each texel spans 16 × PIXEL_SR, i.e. 16 × (3 mag) too much light. Only cloud volumes stay in the backdrop.
    const originalGalaxyVisibility=this.galaxyLight.points.visible;
    if(activeGalaxySpectra)this.galaxyLight.points.visible=false;
    try{const layers={stars:[this.sky,this.galaxyLight.points,this.nebulaPoints.points,...[...this.environments.cache.values()].filter(e=>e.stars).map(e=>e.group)],local:this.localGroup,backgrounds:[this.galaxy,...[...this.environments.cache.values()].filter(e=>!e.stars).map(e=>e.group)]};if(this.startupTrace)await this.skyOptics.captureStartup(this.renderer,this.flight,layers,this.startupTrace);else this.skyOptics.capture(this.renderer,this.flight,layers);}finally{this.galaxyLight.points.visible=originalGalaxyVisibility;if(directCloud)selectedCloud.group.visible=true;}this.captureKey=captureKey;this.captureWall=s.wall;let nearest=Infinity;for(const star of this.sky.userData.stars)nearest=Math.min(nearest,norm(sub(star.lightXYZ||star.xyz,s.pos)));this.skyCapture={key:captureKey,pos:[...s.pos],t:s.t,wall:s.wall,nearest};}
   this.lens.isNear(s);this.skyOptics.material.uniforms.sky.value=this.skyOptics.target.texture;
   await this.skyOptics.prepare(this.renderer,s,this.startupTrace);
   const draw=async(betaOptics,half)=>{const skyOptics=!(s.external&&s.shipFrame!=='comoving')&&!!betaOptics;this.camera.aspect=(half?w/2:w)/h;this.camera.updateProjectionMatrix();
    // Schwarzschild is a separate local stationary optical model. Its cube now supplies HDR sky.
    const relativeU=skyOptics&&(!half||betaOptics)?visualU:[0,0,0];
    const spectralDrawn=activeGalaxySpectra&&this.galaxySpectralOverlay.render(this.renderer,this.camera,relativeU,skyOptics);
    if(!activeGalaxySpectra)this.galaxySpectralOverlay.drawn=false;
    this.skyOptics.material.uniforms.galaxyOverlayOn.value=+!!spectralDrawn;
    if(spectralDrawn)this.skyOptics.material.uniforms.galaxyOverlay.value=this.galaxySpectralOverlay.target.texture;
    this.skyOptics.render(this.renderer,this.camera,s,half&&!betaOptics?[0,0,0]:visualU,skyOptics);
    // Navigation symbols, not light: hidden in the clean view so that only the photometric sky remains.
    if(s.catalogueMarkers!==false&&!s.cleanView&&(s.target?.type==='cosmic'||norm(s.pos)>1e7))this.catalogueSky.render(this.renderer,this.camera,skyOptics?visualU:[0,0,0]);
    if(s.basinOverlay&&!s.cleanView)this.basinOverlay.render(this.renderer,this.camera,s.pos,skyOptics?visualU:[0,0,0],s.wall);
    if(s.external)await this.spacecraft.render(this.renderer,{...s,shipLightSources:this.shipLight=this.shipLighting.update(s),opticalLab:s.opticalLab&&!!betaOptics,labBeta:betaOptics?s.labBeta:0,speedValue:half&&!betaOptics?0:norm(physicalV),gammaValue:half&&!betaOptics?1:gammaU(s.u),velocityVector:s.opticalLab?labDirection(physicalV,forward.toArray()):physicalV},half?w/2/h:w/h,this.startupTrace);
   };
   if(s.opticalLab){this.renderer.setScissorTest(true);this.renderer.setViewport(0,0,w/2,h);this.renderer.setScissor(0,0,w/2,h);await draw(0,true);this.renderer.setViewport(w/2,0,w/2,h);this.renderer.setScissor(w/2,0,w/2,h);await draw(1,true);this.renderer.setScissorTest(false);this.renderer.setViewport(0,0,w,h);}else await draw(+s.relativistic,false);if(s.passage)this.passageView.render(this.renderer,s.passage.progress,s.passage.unstable,performance.now()/1000,w/h);
  }
 }
}
export {T};
