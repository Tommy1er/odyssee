import * as T from 'three';
import {sub,norm,AU,add,mul,galactic} from './physics.js';
import {radiusLy,hash} from './body-data.js';
import {nebulaGLSL,calibration,applyCalibration} from './nebulae.js';
import {diffuseGain} from './photometry.js';
const vertex=`varying vec3 localPoint;void main(){localPoint=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
// Nebula volume (visible bands: physical emission-line model of nebulae.js; other bands: qualitative model). Output is
// premultiplied: radiance + background × (1 − alpha), alpha from the luminance-weighted dust transmission.
const fragment=`precision highp float;varying vec3 localPoint;uniform vec3 eye;uniform float band;${nebulaGLSL(24)}
void main(){vec3 dir=normalize(localPoint-eye);vec3 T;vec3 L=nebulaMarch(eye,dir,vec3(0.),T);gl_FragColor=vec4(L,clamp(1.-dot(T,vec3(.2126,.7152,.0722)),0.,1.));}`;
function random(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return (seed+.5)/4294967296;};}
export class EnvironmentLayer{
 constructor(scene,objects){this.scene=scene;this.objects=objects.filter(o=>['nebula','pillars','cluster'].includes(o.type));this.cache=new Map();this.active=[];this.lastUpdate=-1;}
 create(o){const group=new T.Group(),r=radiusLy(o);let cloud,stars;if(o.type==='cluster'){
 const rnd=random(hash(o.id)),n=o.clusterModel==='globular'?16000:o.clusterModel==='massive'?9500:Math.min(5000,Math.max(200,(o.members||250)*2)),p=[],c=[];for(let i=0;i<n;i++){const u=rnd(),rad=Math.min(1.2,.18/Math.sqrt(Math.pow(u,-2/3)-1)),az=rnd()*6.283,z=rnd()*2-1;p.push(rad*Math.sqrt(1-z*z)*Math.cos(az),rad*z,rad*Math.sqrt(1-z*z)*Math.sin(az));const red=rnd()<.2;c.push(red?1:.7,red?.57:.79,red?.22:1);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('color',new T.Float32BufferAttribute(c,3));const m=new T.PointsMaterial({vertexColors:true,size:.013,sizeAttenuation:true,transparent:true,opacity:.85,depthWrite:false,blending:T.AdditiveBlending});m.onBeforeCompile=sh=>{sh.fragmentShader=sh.fragmentShader.replace('#include <clipping_planes_fragment>', '#include <clipping_planes_fragment>\nfloat psfRadius=length(gl_PointCoord-vec2(.5))*2.;if(psfRadius>1.)discard;').replace('#include <opaque_fragment>', 'diffuseColor.a*=exp(-4.*psfRadius*psfRadius);\n#include <opaque_fragment>');};stars=new T.Points(g,m);group.add(stars);
 }else{const m=new T.ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,uniforms:{eye:{value:new T.Vector3()},band:{value:1},...nebulaUniforms()},transparent:true,premultipliedAlpha:true,depthWrite:false,side:T.BackSide});applyCalibration(m.uniforms,calibration(o),1);cloud=new T.Mesh(new T.SphereGeometry(1.1,40,28),m);group.add(cloud);}
 group.renderOrder=2;this.scene.add(group);const entry={group,cloud,stars,o,r};this.cache.set(o.id,entry);return entry;}
 update(s){if(s.wall>this.lastUpdate+.5||this.lastTarget!==s.target?.id||!this.lastPos||norm(sub(s.pos,this.lastPos))>.01){this.lastPos=[...s.pos];this.lastUpdate=s.wall;this.lastTarget=s.target?.id;this.active=this.objects.map(o=>({o,score:norm(sub(o.lightXYZ||o.xyz,s.pos))/radiusLy(o)})).filter(x=>x.score<600).sort((a,b)=>a.score-b.score).slice(0,7).map(x=>x.o);for(const e of this.cache.values())e.group.visible=false;}
 for(const o of this.active){const e=this.cache.get(o.id)||this.create(o),rel=sub(o.lightXYZ||o.xyz,s.pos);e.group.visible=true;e.group.position.set(...rel.map(x=>x/e.r));if(!e.group.userData.oriented){const toward=new T.Vector3(...o.xyz).normalize();e.group.quaternion.setFromUnitVectors(new T.Vector3(0,0,-1),toward);e.group.userData.oriented=true;}if(e.cloud){const eye=e.group.position.clone().negate().applyQuaternion(e.group.quaternion.clone().invert());e.cloud.material.uniforms.eye.value.copy(eye);e.cloud.material.uniforms.band.value=s.band??1;e.cloud.material.uniforms.nebGain.value=diffuseGain(s.band??1);}if(e.stars){e.stars.material.opacity=s.band>=3?.10:.85;e.stars.material.size=(s.band===0?.002:.008)*1;}}
 // Keep a small bounded cache while the observer travels through thousands of catalogued objects.
 if(this.cache.size>16){for(const [id,e] of this.cache){if(!e.group.visible){e.group.traverse(x=>{x.geometry?.dispose();x.material?.dispose();});this.scene.remove(e.group);this.cache.delete(id);if(this.cache.size<=12)break;}}}
 }
}
export function s2Position(t,center){const e=.884,P=16,a=Math.cbrt(4.297e6*P*P)*AU;const M=2*Math.PI*((t+8.37)%P)/P;let E=M;for(let k=0;k<12;k++)E-=(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));const x=a*(Math.cos(E)-e),y=a*Math.sqrt(1-e*e)*Math.sin(E);const a1=new T.Vector3(.78,.22,.59).normalize(),a2=new T.Vector3(.31,-.84,-.44);a2.addScaledVector(a1,-a1.dot(a2)).normalize();return add(center,a1.multiplyScalar(x).addScaledVector(a2,y).toArray());}
export class GalacticOrbit{
 constructor(scene,center){this.scene=scene;this.center=center;this.group=new T.Group();scene.add(this.group);const pts=[];for(let i=0;i<=256;i++)pts.push(new T.Vector3(...sub(s2Position(i/256*16-8.37,center),center)).divideScalar(AU));this.path=new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:0x9cccdf,transparent:true,opacity:.5}));this.group.add(this.path);this.star=new T.Mesh(new T.SphereGeometry(9,12,8),new T.MeshBasicMaterial({color:0xb8dcff}));this.group.add(this.star);}
 update(s){const range=norm(sub(s.pos,this.center));this.group.visible=range<2&&s.orbitS2;const scale=1/Math.max(1,range/(1200*AU));this.group.scale.setScalar(scale);this.group.position.set(...sub(this.center,s.pos).map(x=>x/AU*scale));this.star.position.set(...sub(s2Position(s.retarded?s.t-range:s.t,this.center),this.center).map(x=>x/AU));this.star.scale.setScalar(Math.max(1,range/AU*.002));}
}

// Selected clouds integrate their volume per screen ray, without a low-resolution capture.
export const cloudGLSL=`uniform vec3 cloudCenter;uniform mat3 cloudRotation;uniform float cloudActive;${nebulaGLSL(72)}
vec3 cloudRadiance(vec3 ray,vec3 background){if(cloudActive<.5)return background;vec3 eye=cloudRotation*(-cloudCenter),dir=cloudRotation*ray,T;return nebulaMarch(eye,dir,background,T);}`;
export function nebulaUniforms(){return {shape:{value:0},seed:{value:0},nebKl:{value:0},nebKc:{value:0},nebTau:{value:0},nebGain:{value:1},nebContShape:{value:0},nebHi:{value:new T.Vector3(1,1,1)},nebLo:{value:new T.Vector3(1,1,1)},nebCont:{value:new T.Vector3(1,1,1)},nebZone:{value:new T.Vector4()}};}
