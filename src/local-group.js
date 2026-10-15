import {mapPoints} from './map-points.js';
import * as T from 'three';
import {norm,sub} from './physics.js';
import {hash} from './body-data.js';
// Representative Local Group members, not an exhaustive galaxy catalogue.
const rows=[
 ['m31','Andromède · M31',10.68471,41.26875,2500000,110000,77,38,0,'https://www.nasa.gov/universe/galaxies/andromeda-galaxy/'],
 ['m33','Triangle · M33',23.46207,30.66018,3000000,30000,54,23,0,'https://www.nasa.gov/image-article/triangulum-galaxy/'],
 ['lmc','Grand Nuage de Magellan',80.89417,-69.75611,163000,16000,35,120,1,'https://www.nasa.gov/universe/nasas-swift-produces-best-ultraviolet-maps-of-the-nearest-galaxies/'],
 ['smc','Petit Nuage de Magellan',13.15833,-72.80028,200000,10000,45,30,2,'https://www.nasa.gov/universe/galaxies/magellanic-clouds/']
];
export function localGroupObjects(){return rows.map(([id,name,ra,dec,d,radiusLy,inc,pa,irregular,source])=>{const a=ra*Math.PI/180,b=dec*Math.PI/180;return {id,name,type:'galaxy',kind:irregular?'Galaxie irrégulière · Groupe local':'Galaxie spirale · Groupe local',xyz:[d*Math.cos(b)*Math.cos(a),d*Math.cos(b)*Math.sin(a),d*Math.sin(b)],d,radiusLy,inc,pa,irregular,guide:true,aliases:[id.toUpperCase(),id==='m31'?'Andromeda':''],planets:[],motionStatus:'Centre conservé ; pas de dynamique du Groupe local',note:'Direction centrale SIMBAD et distance de référence NASA arrondie. Volume, taille du domaine lumineux, bras, profondeur et orientation du rendu sont des reconstructions approximatives. Aucun catalogue stellaire interne résolu ni mouvement d’ensemble prédictif.',links:[['NASA · distance et contexte',source],['SIMBAD · coordonnées','https://simbad.cds.unistra.fr/simbad/sim-id?Ident='+id.toUpperCase()]]};});}
export function galaxyOrientation(o){const forward=new T.Vector3(...o.xyz).normalize(),north=new T.Vector3(0,0,1);north.addScaledVector(forward,-north.dot(forward)).normalize();const east=new T.Vector3().crossVectors(north,forward).normalize(),pa=o.pa*Math.PI/180;const major=north.clone().multiplyScalar(Math.cos(pa)).addScaledVector(east,Math.sin(pa));const normal=forward.clone().applyAxisAngle(major,o.inc*Math.PI/180);const minor=new T.Vector3().crossVectors(normal,major).normalize();return new T.Matrix3().set(major.x,major.y,major.z,minor.x,minor.y,minor.z,normal.x,normal.y,normal.z);}
// Volumetric galaxy models, ray-marched per screen pixel. Slots 0–3: the four Local Group galaxies above; slots 4–7: the
// catalogued galaxies nearest to the ship (catalogue-galaxies.js). Shapes: 0 spiral/lenticular disc; 1 barred Magellanic
// irregular (LMC: off-centre bar in a thin disc); 2 irregular (SMC: elongated); 3 elliptical (de Vaucouleurs r^1/4
// profile); 4 dwarf spheroidal; −1 empty slot. params = (bulge, arms, disc thickness, relative surface brightness).
// Brightness is qualitative (not calibrated on the stellar photometric scale, unlike nebulae and comets).
// Clumps and dust come from value noise (no periodic pattern). The ray–sphere test uses the perpendicular distance
// (stable in float32 for galaxies thousands of radii away).
export const GROUP_SLOTS=8;
export const localGroupGLSL=`uniform vec3 groupCenters[${8}];uniform mat3 groupRotations[${8}];uniform float groupShapes[${8}],groupSeeds[${8}];uniform vec4 groupParams[${8}];uniform float groupTime;
float gh(vec3 p){p=fract(p*.1031);p+=dot(p,p.zyx+31.32);return fract((p.x+p.y)*p.z);}
float gn(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(gh(i),gh(i+vec3(1,0,0)),f.x),mix(gh(i+vec3(0,1,0)),gh(i+vec3(1,1,0)),f.x),f.y),mix(mix(gh(i+vec3(0,0,1)),gh(i+vec3(1,0,1)),f.x),mix(gh(i+vec3(0,1,1)),gh(i+vec3(1,1,1)),f.x),f.y),f.z);}
float gfbm(vec3 p){return .6*gn(p)+.3*gn(p*2.03)+.1*gn(p*4.1);}
vec3 groupRadiance(vec3 ray){vec3 total=vec3(0);for(int j=0;j<${8};j++){float sh=groupShapes[j];if(sh<-.5)continue;vec4 P=groupParams[j];float sd=groupSeeds[j];
 vec3 eye=groupRotations[j]*(-groupCenters[j]),dir=groupRotations[j]*ray;float b=dot(eye,dir);vec3 perp=eye-dir*b;float disc=1.-dot(perp,perp);if(disc<0.)continue;
 float lo=max(0.,-b-sqrt(disc)),hi=-b+sqrt(disc);if(hi<=lo)continue;float ds=(hi-lo)/64.;vec3 light=vec3(0);float trans=1.;
 for(int i=0;i<64;i++){vec3 p=eye+dir*(lo+(float(i)+.5)*ds);float r=length(p.xy),theta=atan(p.y,p.x)-groupTime;float rough=sh<2.5?.55+.45*gfbm(p*9.+sd):1.;
  float disk=0.,bulge=0.,arms=0.;vec3 tint=vec3(1.,.72,.4);
  if(sh<.5){arms=P.y*pow(.5+.5*cos(2.*theta-8.*log(max(r,.025))),5.);disk=exp(-r*3.5)*exp(-abs(p.z)/P.z)*(1.-smoothstep(.78,1.,r));bulge=P.x*exp(-length(p/vec3(.17,.17,.11))*2.);}
  else if(sh<2.5){if(sh>1.5){vec3 q=p/vec3(.85,.4,.45);disk=exp(-dot(q,q)*2.2)*(1.-smoothstep(.85,1.,length(p)));}else{float bar=exp(-pow((p.x-.12)/.42,2.)-pow(p.y/.11,2.)-pow(p.z/.08,2.));disk=exp(-r*2.6)*exp(-abs(p.z)/.06)*(1.-smoothstep(.78,1.,r))+.9*bar;}arms=1.6*smoothstep(.45,.85,gfbm(p*6.+sd*.54));}
  else{vec3 q=p/vec3(1.,.82,P.z);float rho=length(q),edge=1.-smoothstep(.75,1.,length(p));
   if(sh<3.5){bulge=P.x*min(30.,.02*exp(-7.67*(pow(max(rho,.003)/.22,.25)-1.)))*edge;tint=vec3(1.,.78,.55);}
   else{bulge=P.x*exp(-rho*rho/.12)*edge;tint=vec3(.95,.82,.62);}}
  float dust=disk*(.4+arms)*rough;trans*=exp(-dust*ds*6.);
  light+=(disk*(.25+arms)*mix(vec3(.32,.49,.8),vec3(.8,.62,.4),rough*.5)+bulge*tint)*ds*trans*6.*P.w;if(trans<.01)break;}
 total+=light;}return total;}`;
export class LocalGroupLayer{
 constructor(uniforms,objects,mapWorld,makeLabel,mapScene){this.objects=objects.filter(o=>o.type==='galaxy'&&!o.catalogue).slice(0,4);this.u=uniforms;this.catalogue=[];this.slots=[];const N=GROUP_SLOTS;Object.assign(uniforms,{groupCenters:{value:Array.from({length:N},()=>new T.Vector3(1e6,0,0))},groupRotations:{value:Array.from({length:N},(_,i)=>this.objects[i]?galaxyOrientation(this.objects[i]):new T.Matrix3())},groupShapes:{value:Array.from({length:N},(_,i)=>this.objects[i]?this.objects[i].irregular:-1)},groupSeeds:{value:Array.from({length:N},(_,i)=>i*13)},groupParams:{value:Array.from({length:N},()=>new T.Vector4(1,1,.045,1))},groupTime:{value:0}});this.labels=[];this.pickables=[];
 let seed=7291;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(const o of this.objects){const inv=galaxyOrientation(o).clone().transpose(),p=[],c=[];for(let k=0;k<7000;k++){const r=Math.pow(rnd(),1.7),a=(k%2)*Math.PI+4*Math.log(Math.max(r,.01))+(rnd()-.5)*.7;const v=new T.Vector3(r*Math.cos(a),r*Math.sin(a),(rnd()-.5)*.055).applyMatrix3(inv).multiplyScalar(o.radiusLy).add(new T.Vector3(...o.xyz));p.push(...v.toArray());c.push(.65+r*.1,.55+r*.2,.38+r*.55);}const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(p,3));geometry.setAttribute('color',new T.Float32BufferAttribute(c,3));mapWorld.add(new T.Points(geometry,mapPoints(2,.6)));
 const marker=new T.Mesh(new T.SphereGeometry(o.radiusLy*.4,12,8),new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));marker.position.set(...o.xyz);marker.userData.object=o;mapWorld.add(marker);this.pickables.push(marker);
 const label=makeLabel(o.name,'#e9c48e');mapScene.add(label);this.labels.push({label,o});}
 }
 // Catalogued galaxies (slots 4–7): the four nearest in units of their own radius, refreshed when the ship moves.
 setCatalogue(list){this.catalogue=list.filter(o=>o.shapeParams&&o.shapeCode!=null);this.slotKey=null;}
 assignSlots(s){const key=s.pos.map(x=>Math.round(x/1e3)).join(',')+'|'+this.catalogue.length+'|'+(s.target?.id||'');if(key===this.slotKey)return;this.slotKey=key;
  const near=this.catalogue.map(o=>({o,q:norm(sub(o.xyz,s.pos))/o.radiusLy})).filter(x=>x.q<3000).sort((a,b)=>a.q-b.q).slice(0,4).map(x=>x.o);
  if(s.target?.catalogue&&s.target.shapeParams&&!near.includes(s.target)&&norm(sub(s.target.xyz,s.pos))/s.target.radiusLy<3000){near.pop();near.unshift(s.target);}
  this.slots=near;const u=this.u;for(let k=0;k<4;k++){const o=near[k],i=4+k;if(!o){u.groupShapes.value[i]=-1;continue;}u.groupShapes.value[i]=o.shapeCode;u.groupParams.value[i].set(...o.shapeParams);u.groupSeeds.value[i]=hash(o.id)%997;u.groupRotations.value[i].copy(galaxyOrientation(o));}}
 update(s,k,map){this.objects.forEach((o,i)=>this.u.groupCenters.value[i].set(...sub(o.lightXYZ||o.xyz,s.pos)).divideScalar(o.radiusLy));this.assignSlots(s);this.slots.forEach((o,k)=>this.u.groupCenters.value[4+k].set(...sub(o.lightXYZ||o.xyz,s.pos)).divideScalar(o.radiusLy));this.u.groupTime.value=s.t*2*Math.PI/250000000;for(const {label,o}of this.labels){label.position.set(...o.xyz.map(x=>x*k));label.position.x+=2;label.visible=map&&k<.0001;}}
}
