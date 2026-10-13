// Navigation symbols at measured CF4 positions, NOT simulated light or galaxy images.
// Relative subtraction uses JS doubles before float32 upload, including at remote destinations.
import * as T from 'three';
import {aberrateU} from './physics.js';
import {findDuplicate} from './catalogue-galaxies.js';
export class CatalogueSky {
 constructor(){
  this.rows=[];this.status='idle';this.error='';this.revision=0;this.hidden=new Set();this.matches=new Map();
  this.scene=new T.Scene();
  this.material=new T.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,blending:T.AdditiveBlending,uniforms:{momentum:{value:new T.Vector3()},size:{value:3}},
   vertexShader:`uniform vec3 momentum;uniform float size;attribute float shown;varying float alpha;void main(){
    vec3 n=normalize(position);float u=length(momentum),g=sqrt(1.+u*u);
    if(u>1.e-8){vec3 e=momentum/u;float mu=clamp(dot(n,e),-1.,1.);vec3 perp=n-e*mu;float plus=mu<0.?dot(perp,perp)/(1.-mu):1.+mu;float inv=1./(g+u),D=g*plus-mu*inv;n=normalize((perp+e*(g*plus-inv))/max(1.e-30,D));}
    vec4 p=viewMatrix*vec4(n*100.,1.);alpha=shown;gl_Position=projectionMatrix*p;gl_PointSize=size;
    if(shown<.5||p.z>=0.){alpha=0.;gl_Position=vec4(2.,2.,2.,1.);}}
   `,fragmentShader:`varying float alpha;void main(){float r=length(gl_PointCoord-.5);float a=(1.-smoothstep(.18,.5,r))*alpha*.36;if(a<.001)discard;gl_FragColor=vec4(.55,.82,1.,a);}`});
  this.mapPoints=new T.Points(new T.BufferGeometry(),new T.PointsMaterial({color:0x8cd1ff,size:2,sizeAttenuation:false,transparent:true,opacity:.4,depthWrite:false}));this.mapPoints.scale.setScalar(1e6);this.mapPoints.frustumCulled=false;this.mapPoints.visible=false;
  this.points=new T.Points(new T.BufferGeometry(),this.material);this.points.frustumCulled=false;this.scene.add(this.points);
 }
 setRows(rows,local=[]){
  this.rows=rows;this.status='ready';this.error='';this.matches.clear();
  // Hash unit directions to restrict the existing cross-catalogue matching heuristic.
  // 0.02-wide cells exceed the 0.1° matching radius; check all 27 adjoining cells (RA wrap/poles safe).
  const cells=new Map(),cell=v=>v.map(x=>Math.floor(x/.02));
  for(const o of local){const d=Math.hypot(...o.xyz);if(!d)continue;const key=cell(o.xyz.map(x=>x/d)).join(',');if(!cells.has(key))cells.set(key,[]);cells.get(key).push(o);}
  for(const r of rows){const c=cell(r.p.map(x=>x/r.d)),candidates=[];
   for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++)candidates.push(...(cells.get([c[0]+x,c[1]+y,c[2]+z].join(','))||[]));
   const dup=findDuplicate({ra:r.ra,dec:r.dec,d:r.d*1e6},candidates);
   if(dup)this.matches.set(r.id,dup.id);
  }
  this.points.geometry.dispose();this.points.geometry=new T.BufferGeometry();
  this.points.geometry.setAttribute('position',new T.BufferAttribute(new Float32Array(rows.length*3),3));
  this.points.geometry.setAttribute('shown',new T.BufferAttribute(new Float32Array(rows.length),1));
  this.mapPoints.geometry.dispose();this.mapPoints.geometry=new T.BufferGeometry();this.mapPoints.geometry.setAttribute('position',new T.Float32BufferAttribute(rows.flatMap(r=>r.p),3));
  this.revision++;this.key=null;
 }
 update(pos,volumes=[]){
  if(this.status!=='ready')return;
  const ids=new Set(volumes.map(o=>o.id)),key=[...pos,Array.from(ids).sort().join(',')].join('|');if(key===this.key)return;this.key=key;
  this.hidden.clear();const p=this.points.geometry.attributes.position,a=this.points.geometry.attributes.shown;
  for(let i=0;i<this.rows.length;i++){const r=this.rows[i],x=r.p[0]*1e6-pos[0],y=r.p[1]*1e6-pos[1],z=r.p[2]*1e6-pos[2],d=Math.hypot(x,y,z);
   const hide=d<1||ids.has(r.id)||ids.has(this.matches.get(r.id));if(hide)this.hidden.add(r.id);
   const scale=d?100/d:0;p.setXYZ(i,x*scale,y*scale,d?z*scale:-100);a.setX(i,hide?0:1);
  }
  p.needsUpdate=a.needsUpdate=true;
 }
 render(renderer,camera,momentum=[0,0,0]){
  if(this.status!=='ready')return;this.material.uniforms.momentum.value.set(...momentum);this.lastMomentum=[...momentum];
  this.material.uniforms.size.value=3*renderer.getPixelRatio();
  const clear=renderer.autoClear;renderer.autoClear=false;renderer.render(this.scene,camera);renderer.autoClear=clear;
 }
 pick(camera,px,py,width,height){
  if(this.status!=='ready')return null;
  camera.updateMatrixWorld();const attr=this.points.geometry.attributes.position,v=new T.Vector3();let best=null,score=12**2;
  for(let i=0;i<this.rows.length;i++){const r=this.rows[i];if(this.hidden.has(r.id))continue;
   v.fromBufferAttribute(attr,i).normalize();v.set(...aberrateU(v.toArray(),this.lastMomentum||[0,0,0])).multiplyScalar(100).project(camera);
   if(v.z< -1||v.z>1)continue;const d=((v.x+1)*width/2-px)**2+((1-v.y)*height/2-py)**2;if(d<score){score=d;best=r;}
  }return best;
 }
}
