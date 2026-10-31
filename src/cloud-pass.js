import * as T from 'three';
import {cloudGLSL} from './environments.js';
// Same observer ray as the full-resolution optics, shared so relativistic aberration cannot diverge.
export const observerRayGLSL=`vec3 n=normalize(rotation*vec3(uvp.x*aspect*tanFov,uvp.y*tanFov,-1.));vec3 ray=n;float D=1.;if(optics>.5&&momentum>.000001){float mu=clamp(dot(n,axis),-1.,1.);vec3 perpendicular=n-axis*mu;float oneMinus=mu>0.?dot(perpendicular,perpendicular)/(1.+mu):1.-mu;float inverseD=g*oneMinus+mu/(g+momentum);D=1./max(inverseD,1.e-20);ray=normalize((perpendicular+axis*(1./(g+momentum)-g*oneMinus))*D);}`;
export const cloudSampleGLSL=`uniform float cloudActive,cloudRadianceScale;uniform sampler2D cloudLight,cloudTransmission;
vec3 cloudRadiance(vec3 ray,vec3 background){return texture2D(cloudLight,uvp*.5+.5).rgb*cloudRadianceScale+background*texture2D(cloudTransmission,uvp*.5+.5).rgb;}`;
// Per-pass pixel budget, independent of monitor DPI and GPU brand. Small clouds retain full resolution.
export const MAX_VOLUME_PIXELS=512*512;
export function cloudSize(width,height,scale=.5){
 let w=Math.max(1,Math.ceil(width*scale)),h=Math.max(1,Math.ceil(height*scale));
 if(scale<1&&w*h>MAX_VOLUME_PIXELS){const f=Math.sqrt(MAX_VOLUME_PIXELS/(w*h));w=Math.max(1,Math.min(MAX_VOLUME_PIXELS,Math.floor(w*f)));h=Math.max(1,Math.min(MAX_VOLUME_PIXELS,Math.floor(h*f)));}
 return [w,h];
}
export class CloudPass{
 constructor(uniforms){
  this.target=new T.WebGLRenderTarget(1,1,{count:2,type:T.HalfFloatType,minFilter:T.LinearFilter,magFilter:T.LinearFilter,depthBuffer:false,stencilBuffer:false,generateMipmaps:false});
  this.target.textures[0].name='Nuage : émission';this.target.textures[1].name='Nuage : transmission';
  uniforms.cloudRadianceScale={value:1};this.uniforms=uniforms;
  uniforms.cloudLight={value:this.target.textures[0]};uniforms.cloudTransmission={value:this.target.textures[1]};
  this.material=new T.ShaderMaterial({name:'Nuage HDR demi-résolution',uniforms,glslVersion:T.GLSL3,depthTest:false,depthWrite:false,
   vertexShader:'varying vec2 uvp;void main(){uvp=position.xy;gl_Position=vec4(position.xy,0.,1.);}',
   fragmentShader:`precision highp float;varying vec2 uvp;uniform mat3 rotation;uniform vec3 axis;uniform float g,momentum,optics,aspect,tanFov,band,cloudRadianceScale;
layout(location=0) out vec4 emission;layout(location=1) out vec4 transmission;
${cloudGLSL}
void main(){${observerRayGLSL}vec3 T;vec3 L=nebulaMarch(cloudRotation*(-cloudCenter),cloudRotation*ray,vec3(0.),T);
emission=vec4(L/cloudRadianceScale,1.);transmission=vec4(mix(vec3(1.),T,cloudOpacity),1.);}`});
  this.scene=new T.Scene();this.scene.add(new T.Mesh(new T.PlaneGeometry(2,2),this.material));this.camera=new T.OrthographicCamera(-1,1,1,-1,0,1);
 }
 render(renderer,scale=.5){const u=this.uniforms;u.cloudRadianceScale.value=Math.max(1e-30,(Math.abs(u.nebKl.value)+Math.abs(u.nebKc.value))*Math.abs(u.nebGain.value));const viewport=renderer.getViewport(new T.Vector4()),scissor=renderer.getScissor(new T.Vector4()),test=renderer.getScissorTest(),target=renderer.getRenderTarget(),face=renderer.getActiveCubeFace(),mip=renderer.getActiveMipmapLevel();
  const physical=renderer.getCurrentViewport(new T.Vector4()),[w,h]=cloudSize(physical.z,physical.w,scale);
  if(this.target.width!==w||this.target.height!==h)this.target.setSize(w,h);
  // setRenderTarget applies the target's physical viewport. setViewport would multiply it by DPR again.
  try{renderer.setRenderTarget(this.target);renderer.setScissorTest(false);renderer.render(this.scene,this.camera);}
  finally{renderer.setRenderTarget(target,face,mip);renderer.setViewport(viewport);renderer.state.viewport(physical);renderer.setScissor(scissor);renderer.setScissorTest(test);}
 }
}
