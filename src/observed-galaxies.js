import * as T from 'three';
import {SG_AXES,CATALOGUES,MPC_MLY} from './extragalactic-data.js';
// Catalogue markers, not images or inferred physical galaxy shapes.
export class ObservedGalaxies {
 constructor(scene){
  this.rows=[];this.root=new T.Group();scene.add(this.root);
  this.material=new T.ShaderMaterial({uniforms:{tint:{value:new T.Color()},size:{value:4}},transparent:true,depthWrite:false,
   vertexShader:'uniform float size;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=size;}',
   fragmentShader:'uniform vec3 tint;void main(){float r=length(gl_PointCoord-vec2(.5));float a=1.-smoothstep(.22,.5,r);if(a<.01)discard;gl_FragColor=vec4(tint,a*.8);}' });
  this.points=new T.Points(new T.BufferGeometry(),this.material);this.points.frustumCulled=false;this.root.add(this.points);
  this.errorLine=new T.Line(new T.BufferGeometry(),new T.LineBasicMaterial({color:0xffb878,transparent:true,opacity:.75}));scene.add(this.errorLine);this.errorLine.visible=false;
  this.plane=new T.Group();scene.add(this.plane);const [x,y,z]=SG_AXES.map(a=>new T.Vector3(...a));
  const pts=[];for(const radius of [10,50,100,250,500])for(let i=0;i<128;i++){for(const k of [i,i+1])pts.push(x.clone().multiplyScalar(radius*Math.cos(k*Math.PI/64)).addScaledVector(y,radius*Math.sin(k*Math.PI/64)));}
  for(const axis of [x,y])pts.push(axis.clone().multiplyScalar(-700),axis.clone().multiplyScalar(700));
  this.plane.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:0x5aaab2,transparent:true,opacity:.2,depthWrite:false})));
  this.plane.add(new T.Line(new T.BufferGeometry().setFromPoints([z.clone().multiplyScalar(-350),z.clone().multiplyScalar(350)]),new T.LineBasicMaterial({color:0xa896d8,transparent:true,opacity:.35})));
 }
 setRows(rows,key){this.rows=rows;this.points.geometry.dispose();this.points.geometry=new T.BufferGeometry();this.points.geometry.setAttribute('position',new T.Float32BufferAttribute(rows.flatMap(o=>o.p),3));this.material.uniforms.tint.value.set(CATALOGUES[key].color);}
 select(o){this.errorLine.visible=!!o?.interval;if(!o?.interval)return;const unit=new T.Vector3(...o.p).normalize();this.errorLine.geometry.dispose();this.errorLine.geometry=new T.BufferGeometry().setFromPoints(o.interval.map(d=>unit.clone().multiplyScalar(d*MPC_MLY)));}
 pick(camera,px,py,width,height){let best=null,score=11*11;const p=new T.Vector3();camera.updateMatrixWorld();for(const o of this.rows){p.set(...o.p).project(camera);if(p.z< -1||p.z>1)continue;const d=((p.x+1)*width/2-px)**2+((1-p.y)*height/2-py)**2;if(d<score){score=d;best=o;}}return best;}
}
