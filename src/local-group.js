import {mapPoints} from './map-points.js';
import * as T from 'three';
import {norm,sub,unit} from './physics.js';
import {fluxFromMag} from './photometry.js';
import {doppler,sourceTint,objectTemp,foregroundScale} from './galaxy-photometry.js';
import {spectralSourceTint,spectralClassFromObject} from './galaxy-spectral.js';
import {hash} from './body-data.js';
// Representative Local Group members, not an exhaustive galaxy catalogue.
const rows=[
 ['m31','Andromède · M31',10.68471,41.26875,2500000,110000,77,38,0,'https://www.nasa.gov/universe/galaxies/andromeda-galaxy/'],
 ['m33','Triangle · M33',23.46207,30.66018,3000000,30000,54,23,0,'https://www.nasa.gov/image-article/triangulum-galaxy/'],
 ['lmc','Grand Nuage de Magellan',80.89417,-69.75611,163000,16000,35,120,1,'https://www.nasa.gov/universe/nasas-swift-produces-best-ultraviolet-maps-of-the-nearest-galaxies/'],
 ['smc','Petit Nuage de Magellan',13.15833,-72.80028,200000,10000,45,30,2,'https://www.nasa.gov/universe/galaxies/magellanic-clouds/']
];
// Apparent total V magnitudes (de Vaucouleurs et al. 1991, RC3; NED): M31 3.44, M33 5.72, LMC 0.4, SMC 2.2.
const VMAG={m31:3.44,m33:5.72,lmc:.4,smc:2.2};
// Galactic foreground extinction A_V toward them (Schlafly & Finkbeiner 2011, NED): included in the magnitudes above.
const AVFG={m31:.17,m33:.11,lmc:.21,smc:.11};
export function localGroupObjects(){return rows.map(([id,name,ra,dec,d,radiusLy,inc,pa,irregular,source])=>{const a=ra*Math.PI/180,b=dec*Math.PI/180;return {id,name,type:'galaxy',kind:irregular?'Galaxie irrégulière · Groupe local':'Galaxie spirale · Groupe local',xyz:[d*Math.cos(b)*Math.cos(a),d*Math.cos(b)*Math.sin(a),d*Math.sin(b)],d,radiusLy,inc,pa,irregular,guide:true,Vmag:VMAG[id],avFg:AVFG[id],vmagSource:'magnitude V totale apparente (RC3, NED)',aliases:[id.toUpperCase(),id==='m31'?'Andromeda':''],planets:[],motionStatus:'Centre conservé ; pas de dynamique du Groupe local',note:'Direction centrale SIMBAD et distance de référence NASA arrondie. Volume, taille du domaine lumineux, bras, profondeur et orientation du rendu sont des reconstructions approximatives. Aucun catalogue stellaire interne résolu ni mouvement d’ensemble prédictif.',links:[['NASA · distance et contexte',source],['SIMBAD · coordonnées','https://simbad.cds.unistra.fr/simbad/sim-id?Ident='+id.toUpperCase()]]};});}
export function galaxyOrientation(o){const forward=new T.Vector3(...o.xyz).normalize(),north=new T.Vector3(0,0,1);north.addScaledVector(forward,-north.dot(forward)).normalize();const east=new T.Vector3().crossVectors(north,forward).normalize(),pa=o.pa*Math.PI/180;const major=north.clone().multiplyScalar(Math.cos(pa)).addScaledVector(east,Math.sin(pa));const normal=forward.clone().applyAxisAngle(major,o.inc*Math.PI/180);const minor=new T.Vector3().crossVectors(normal,major).normalize();return new T.Matrix3().set(major.x,major.y,major.z,minor.x,minor.y,minor.z,normal.x,normal.y,normal.z);}
// Volumetric galaxy models, ray-marched per screen pixel. Slots 0–3: the four Local Group galaxies above; slots 4–7: the
// catalogued galaxies nearest to the ship (catalogue-galaxies.js). Shapes: 0 spiral/lenticular disc; 1 barred Magellanic
// irregular (LMC: off-centre bar in a thin disc); 2 irregular (SMC: elongated); 3 elliptical (de Vaucouleurs r^1/4
// profile); 4 dwarf spheroidal; −1 empty slot. params = (bulge, arms, disc thickness, relative surface brightness).
// Brightness is qualitative (not calibrated on the stellar photometric scale, unlike nebulae and comets).
// Clumps and dust come from value noise (no periodic pattern). The ray–sphere test uses the perpendicular distance
// (stable in float32 for galaxies thousands of radii away).
// Share of a galaxy's light drawn by its volume, from its apparent diameter in pixels: below 3 px the per-pixel ray march
// would miss or over-count it (the point layer carries it), above 8 px the volume carries it all.
export const volumeWeight=(dPix)=>{const t=Math.min(1,Math.max(0,(dPix-3)/5));return t*t*(3-2*t);};
export const GROUP_SLOTS=8;
export const localGroupGLSL=`uniform vec3 groupCenters[${8}];uniform mat3 groupRotations[${8}];uniform float groupShapes[${8}],groupSeeds[${8}];uniform vec4 groupParams[${8}];uniform float groupTime,groupGain;uniform vec3 groupTint[${8}];
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
 // The galaxy-integrated SED sets a common chromaticity at every apparent size.
  // Uncalibrated per-voxel colours would produce a false colour jump at the 3–8 px handoff.
  total+=dot(light,vec3(.2126,.7152,.0722))*groupTint[j];}return total;}`;
// JS twin of groupRadiance for the photometric calibration (V band ≈ luminance). A distant observer sees the galaxy along
// unit direction dir (galaxy frame); rays are parallel, the sphere of radius 1 (model units) is sampled on a grid. Returns
// E = ∫ radiance dA with w = 1, so that the flux at distance D (in radii) is w E / D² in sky units (radiance × sr).
const fract=x=>x-Math.floor(x);
function gh(p){let q=p.map(x=>fract(x*.1031));const d=q[0]*(q[2]+31.32)+q[1]*(q[1]+31.32)+q[2]*(q[0]+31.32);q=q.map(x=>x+d);return fract((q[0]+q[1])*q[2]);}
function gn(x){const i=x.map(Math.floor),f=x.map((v,k)=>{const t=v-i[k];return t*t*(3-2*t);}),h=(a,b,c)=>gh([i[0]+a,i[1]+b,i[2]+c]),m=(a,b,t)=>a+(b-a)*t;return m(m(m(h(0,0,0),h(1,0,0),f[0]),m(h(0,1,0),h(1,1,0),f[0]),f[1]),m(m(h(0,0,1),h(1,0,1),f[0]),m(h(0,1,1),h(1,1,1),f[0]),f[1]),f[2]);}
const gfbm=p=>.6*gn(p)+.3*gn(p.map(x=>x*2.03))+.1*gn(p.map(x=>x*4.1));
const sst=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t);};
const Y=(r,g,b)=>.2126*r+.7152*g+.0722*b;
// Radiance (luminance, w = 1) of one ray from eye along unit dir, both in the galaxy frame (units of its radius): the same
// 64-step march as the shader between the entry and exit of the unit sphere.
export function groupRayRadiance(sh,P,sd,eye,dir){const b=eye[0]*dir[0]+eye[1]*dir[1]+eye[2]*dir[2],perp=eye.map((x,k)=>x-dir[k]*b),disc=1-(perp[0]**2+perp[1]**2+perp[2]**2);if(disc<0)return 0;
 const lo=Math.max(0,-b-Math.sqrt(disc)),hi=-b+Math.sqrt(disc);if(hi<=lo)return 0;const ds=(hi-lo)/64;let light=0,trans=1;
 for(let i=0;i<64;i++){const t=lo+(i+.5)*ds,p=[0,1,2].map(k=>eye[k]+dir[k]*t),r=Math.hypot(p[0],p[1]),theta=Math.atan2(p[1],p[0]);const rough=sh<2.5?.55+.45*gfbm(p.map(q=>q*9+sd)):1;let disk=0,bulge=0,arms=0,tint=[1,.72,.4];
  if(sh<.5){arms=P[1]*Math.pow(.5+.5*Math.cos(2*theta-8*Math.log(Math.max(r,.025))),5);disk=Math.exp(-r*3.5)*Math.exp(-Math.abs(p[2])/P[2])*(1-sst(.78,1,r));bulge=P[0]*Math.exp(-Math.hypot(p[0]/.17,p[1]/.17,p[2]/.11)*2);}
  else if(sh<2.5){if(sh>1.5){const q=[p[0]/.85,p[1]/.4,p[2]/.45];disk=Math.exp(-(q[0]*q[0]+q[1]*q[1]+q[2]*q[2])*2.2)*(1-sst(.85,1,Math.hypot(...p)));}else{const bar=Math.exp(-(((p[0]-.12)/.42)**2)-((p[1]/.11)**2)-((p[2]/.08)**2));disk=Math.exp(-r*2.6)*Math.exp(-Math.abs(p[2])/.06)*(1-sst(.78,1,r))+.9*bar;}arms=1.6*sst(.45,.85,gfbm(p.map(q=>q*6+sd*.54)));}
  else{const rho=Math.hypot(p[0],p[1]/.82,p[2]/P[2]),edge=1-sst(.75,1,Math.hypot(...p));if(sh<3.5){bulge=P[0]*Math.min(30,.02*Math.exp(-7.67*(Math.pow(Math.max(rho,.003)/.22,.25)-1)))*edge;tint=[1,.78,.55];}else{bulge=P[0]*Math.exp(-rho*rho/.12)*edge;tint=[.95,.82,.62];}}
  const dust=disk*(.4+arms)*rough;trans*=Math.exp(-dust*ds*6);const mixc=k=>[.32,.49,.8][k]+([.8,.62,.4][k]-[.32,.49,.8][k])*rough*.5;
  light+=(disk*(.25+arms)*Y(mixc(0),mixc(1),mixc(2))+bulge*Y(...tint))*ds*trans*6;if(trans<.01)break;}
 return light;}
export function groupLuminosity(sh,P,sd,dir,N=16){let total=0;const e1=Math.abs(dir[2])<.9?[0,0,1]:[1,0,0],u=unit([dir[1]*e1[2]-dir[2]*e1[1],dir[2]*e1[0]-dir[0]*e1[2],dir[0]*e1[1]-dir[1]*e1[0]]),v=[dir[1]*u[2]-dir[2]*u[1],dir[2]*u[0]-dir[0]*u[2],dir[0]*u[1]-dir[1]*u[0]],cell=(2/N)**2;
 for(let a=0;a<N;a++)for(let c=0;c<N;c++){const x=-1+(a+.5)*2/N,y=-1+(c+.5)*2/N;if(x*x+y*y>=1)continue;total+=groupRayRadiance(sh,P,sd,[0,1,2].map(k=>x*u[k]+y*v[k]-5*dir[k]),dir)*cell;}
 return total;}
// Surface-brightness gain w of a galaxy model so that, seen from the Sun, it has its apparent V magnitude Vmag (catalogue).
const gainCache=new Map();
export function calibratedGain(o,shape,params,seed,rotation){const key=o.id+'|'+o.Vmag+'|'+shape;if(gainCache.has(key))return gainCache.get(key);
 const ray=unit(o.catalogueXYZ||o.xyz),d=new T.Vector3(...ray).applyMatrix3(rotation).toArray(),E=groupLuminosity(shape,[params[0],params[1],params[2],1],seed,unit(d)),D=norm(o.catalogueXYZ||o.xyz)/o.radiusLy;
 const w=E>0?fluxFromMag(o.Vmag)*D*D/E:0;gainCache.set(key,w);return w;}
export class LocalGroupLayer{
 constructor(uniforms,objects,mapWorld,makeLabel,mapScene){this.objects=objects.filter(o=>o.type==='galaxy'&&!o.catalogue).slice(0,4);this.u=uniforms;this.catalogue=[];this.slots=[];const N=GROUP_SLOTS;Object.assign(uniforms,{groupCenters:{value:Array.from({length:N},()=>new T.Vector3(1e6,0,0))},groupRotations:{value:Array.from({length:N},(_,i)=>this.objects[i]?galaxyOrientation(this.objects[i]):new T.Matrix3())},groupShapes:{value:Array.from({length:N},(_,i)=>this.objects[i]?this.objects[i].irregular:-1)},groupSeeds:{value:Array.from({length:N},(_,i)=>i*13)},groupParams:{value:Array.from({length:N},()=>new T.Vector4(1,1,.045,1))},groupTime:{value:0},groupGain:{value:1},groupTint:{value:Array.from({length:N},()=>new T.Vector3(1,1,1))}});this.labels=[];this.pickables=[];
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
  this.slots=near;const u=this.u;for(let k=0;k<4;k++){const o=near[k],i=4+k;if(!o){u.groupShapes.value[i]=-1;continue;}u.groupShapes.value[i]=o.shapeCode;u.groupParams.value[i].set(...o.shapeParams);u.groupSeeds.value[i]=hash(o.id)%997;u.groupRotations.value[i].copy(galaxyOrientation(o));if(o.Vmag!=null)u.groupParams.value[i].w=calibratedGain(o,o.shapeCode,o.shapeParams,u.groupSeeds.value[i],u.groupRotations.value[i]);}}
 // Source Doppler and foreground-extinction factors of the eight volumes (same law as galaxy-photometry.js points), so that a
 // galaxy does not jump in brightness or colour when it changes from point to volume.
 setLut(lut){this.lut=lut;}
 handoff=new Map();anisoCache=new Map();
 updateTints(s){const fg=foregroundScale(norm(s.pos)),list=[...this.objects,...this.slots];for(let i=0;i<8;i++){const o=i<4?this.objects[i]:this.slots[i-4],t=this.u.groupTint.value[i];if(!o||!this.lut){t.set(1,1,1);continue;}
  const v=o.motion||[0,0,0],cat=o.catalogueXYZ||o.xyz,dc=norm(cat),p=o.lightXYZ||o.xyz,rel=sub(s.pos,p),dr=norm(rel)||1,Dsun=doppler(v,cat.map(x=>-x/dc)),D=doppler(v,rel.map(x=>x/dr));
  const dPix=2*o.radiusLy/dr/(s.pixelAngle||1.2e-3),w=volumeWeight(dPix);this.handoff.set(o.id,{w,aniso:w<1?this.anisotropy(o,i,rel):1});
  const spectral=spectralSourceTint(spectralClassFromObject(o),Dsun,D,o.avFg||0,fg);
   t.set(...(spectral||sourceTint(this.lut,objectTemp(o),Dsun,D,o.avFg||0,fg)).map(x=>x*w));}void list;}
 // Light seen from the ship's direction relative to the light seen from the Sun (the calibration direction): the volume is
 // brighter face-on than edge-on (projection, dust). Points of handed-over galaxies receive the same factor. Cached until
 // the direction turns by more than 3°.
 anisotropy(o,i,rel){const c=this.anisoCache.get(o.id),dir=unit(rel.map(x=>-x));if(c&&c.dir[0]*dir[0]+c.dir[1]*dir[1]+c.dir[2]*dir[2]>Math.cos(3*Math.PI/180))return c.value;
  const R=this.u.groupRotations.value[i],sh=this.u.groupShapes.value[i],P=this.u.groupParams.value[i],sd=this.u.groupSeeds.value[i],g=x=>unit(new T.Vector3(...x).applyMatrix3(R).toArray());
  const sunE=c?.sunE??groupLuminosity(sh,[P.x,P.y,P.z,1],sd,g(unit(o.catalogueXYZ||o.xyz))),value=groupLuminosity(sh,[P.x,P.y,P.z,1],sd,g(dir))/Math.max(1e-30,sunE);this.anisoCache.set(o.id,{dir,value,sunE});return value;}
 // The four Local Group models: surface brightness calibrated on their apparent V magnitude.
 calibrateFixed(){this.objects.forEach((o,i)=>{if(o.Vmag==null)return;const P=this.u.groupParams.value[i];P.w=calibratedGain(o,o.irregular,[P.x,P.y,P.z],this.u.groupSeeds.value[i],this.u.groupRotations.value[i]);});}
 update(s,k,map){this.objects.forEach((o,i)=>this.u.groupCenters.value[i].set(...sub(o.lightXYZ||o.xyz,s.pos)).divideScalar(o.radiusLy));this.assignSlots(s);this.slots.forEach((o,k)=>this.u.groupCenters.value[4+k].set(...sub(o.lightXYZ||o.xyz,s.pos)).divideScalar(o.radiusLy));this.u.groupTime.value=s.t*2*Math.PI/250000000;this.updateTints(s);for(const {label,o}of this.labels){label.position.set(...o.xyz.map(x=>x*k));label.position.x+=2;label.visible=map&&k<.0001;}}
}
