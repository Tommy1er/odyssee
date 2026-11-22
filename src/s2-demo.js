// Démonstrateur S2 (session d'essai) : une vue d'observation dédiée de l'orbite de S2 autour de Sagittarius A*, avec sa propre caméra.
// Elle ne touche ni au vaisseau ni aux horloges : elle lit le temps de la mission et le modèle d'orbite (Kepler témoin ou précession
// de Schwarzschild, environments.js). Deux cadrages : l'orbite entière (≈ 3 000 ua au-dessus du plan) et le péricentre, où l'avance
// de 12,18′ par révolution sépare deux passages d'environ 0,42 ua. Aucune amplification de l'angle.
import * as T from 'three';
import {sub,AU} from './physics.js';
import {s2Position,s2PericentreTime,s2Precession,S2_ORBIT,S2_MODEL} from './environments.js';

const rel=(center,p)=>new T.Vector3(...sub(p,center)).divideScalar(AU); // ua, origine Sagittarius A*

export class S2Demo{
 constructor(center){
  this.center=center;this.scene=new T.Scene();this.camera=new T.PerspectiveCamera(46,1,.001,20000);this.mode='overview';this.key=null;
  const line=(c,o)=>{const l=new T.Line(new T.BufferGeometry(),new T.LineBasicMaterial({color:c,transparent:true,opacity:o}));this.scene.add(l);return l;};
  this.paths=[line(0x9cccdf,.9),line(0x6fa8ff,.45)];            // révolution courante, révolution précédente
  this.rays=[line(0xf0c47a,.55),line(0x6fa8ff,.55)];            // Sagittarius A* → péricentre courant, précédent
  const dot=(c,size)=>{const p=new T.Points(new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute([0,0,0],3)),new T.PointsMaterial({color:c,size,sizeAttenuation:false,depthTest:false}));p.renderOrder=5;this.scene.add(p);return p;};
  this.peri=[dot(0xf0c47a,9),dot(0x6fa8ff,7)];this.star=dot(0xffffff,6);this.hole=dot(0x9b7bff,8);
  const g=(t)=>rel(center,s2Position(t,center,false));const p0=g(s2PericentreTime(0)),p1=g(s2PericentreTime(0)+S2_ORBIT.P/4);
  this.normal=p0.clone().cross(p1).normalize();this.major=p0.clone().normalize(); // plan de l'orbite (commun à Kepler et à la précession)
 }
 // Reconstruit les deux dernières révolutions et les péricentres quand le modèle ou la révolution change.
 rebuild(t){const gr=S2_MODEL.gr,n=Math.floor((t+S2_ORBIT.phase)/S2_ORBIT.P),c=this.center;this.key=gr+'|'+n;this.n=n;
  for(const [k,m] of [n,n-1].entries()){const t0=s2PericentreTime(m),pts=[];for(let i=0;i<=2048;i++){const u=i/2048,tt=t0+S2_ORBIT.P*(u<.5?2*u*u:1-2*(1-u)*(1-u));pts.push(rel(c,s2Position(tt,c,gr)));} // points resserrés près du péricentre
   this.paths[k].geometry.dispose();this.paths[k].geometry=new T.BufferGeometry().setFromPoints(pts);
   const p=rel(c,s2Position(t0,c,gr));this.peri[k].geometry.attributes.position.setXYZ(0,p.x,p.y,p.z);this.peri[k].geometry.attributes.position.needsUpdate=true;this.peri[k].userData.p=p;
   this.rays[k].geometry.dispose();this.rays[k].geometry=new T.BufferGeometry().setFromPoints([new T.Vector3(),p]);}}
 frame(aspect){const a=this.peri[0].userData.p,b=this.peri[1].userData.p;this.camera.aspect=aspect;
  if(this.mode==='overview'){const sm=Math.cbrt(S2_ORBIT.M*S2_ORBIT.P**2);this.target=this.major.clone().multiplyScalar(-sm*S2_ORBIT.e);this.distance=3000;} // centre de l'ellipse : orbite entière dans le champ
  else{this.target=a.clone().add(b).multiplyScalar(.5);this.distance=2.4;} // champ vertical ≈ 2 ua au péricentre
  this.camera.position.copy(this.target).addScaledVector(this.normal,this.distance);this.camera.up.copy(this.major);this.camera.lookAt(this.target);this.camera.updateProjectionMatrix();}
 render(renderer,s,aspect){const t=s.t; // temps de la mission (vue de modèle, pas de retard de lumière)
 if(this.key!==S2_MODEL.gr+'|'+Math.floor((t+S2_ORBIT.phase)/S2_ORBIT.P))this.rebuild(t);
  const p=rel(this.center,s2Position(t,this.center));this.star.geometry.attributes.position.setXYZ(0,p.x,p.y,p.z);this.star.geometry.attributes.position.needsUpdate=true;
  this.frame(aspect);const c=new T.Color(),alpha=renderer.getClearAlpha();renderer.getClearColor(c);renderer.setRenderTarget(null);renderer.setScissorTest(false);renderer.setClearColor(0x03060a,1);renderer.clear();renderer.render(this.scene,this.camera);renderer.setClearColor(c,alpha);}
 // Lecture pour l'interface et les tests : écart angulaire et linéaire entre les deux péricentres, écart en pixels dans le cadrage courant.
 readout(heightPx){const a=this.peri[0].userData.p,b=this.peri[1].userData.p;if(!a)return null;const field=2*this.distance*Math.tan(this.camera.fov*Math.PI/360);
  return {mode:this.mode,gr:S2_MODEL.gr,orbit:this.n,arcmin:a.angleTo(b)*180/Math.PI*60,predictedArcmin:s2Precession()*180/Math.PI*60,separationAU:a.distanceTo(b),pericentreAU:a.length(),fieldAU:field,separationPx:a.distanceTo(b)/field*heightPx};}
}
