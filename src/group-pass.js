import * as T from 'three';
import {localGroupGLSL,GROUP_SLOTS} from './local-group.js';
import {observerRayGLSL,cloudSize} from './cloud-pass.js';
const mask='uniform float groupReduced[8];';
const filtered=condition=>mask+localGroupGLSL.replace('float sh=groupShapes[j];',condition+'float sh=groupShapes[j];');
// Small/distant galaxies retain the exact full-resolution march, including their point/volume handoff.
export const groupSampleGLSL=filtered('if(groupReduced[j]>.5)continue;').replace('vec3 groupRadiance(', 'vec3 groupDirectRadiance(')+`
uniform sampler2D groupLight;uniform float groupLightScale,groupReducedOn;
vec3 groupRadiance(vec3 ray){vec3 L=groupDirectRadiance(ray);if(groupReducedOn>.5)L+=texture2D(groupLight,uvp*.5+.5).rgb*groupLightScale;return L;}`;
export class GroupPass{
 constructor(uniforms){this.uniforms=uniforms;this.ready=false;
  this.target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,minFilter:T.LinearFilter,magFilter:T.LinearFilter,depthBuffer:false,stencilBuffer:false,generateMipmaps:false});this.target.texture.name='Groupe local : grands volumes';
  Object.assign(uniforms,{groupReduced:{value:Array(GROUP_SLOTS).fill(0)},groupReducedOn:{value:0},groupLight:{value:this.target.texture},groupLightScale:{value:1}});
  this.material=new T.ShaderMaterial({name:'Groupe local HDR demi-résolution',uniforms,depthTest:false,depthWrite:false,
   vertexShader:'varying vec2 uvp;void main(){uvp=position.xy;gl_Position=vec4(position.xy,0.,1.);}',
   fragmentShader:`precision highp float;varying vec2 uvp;uniform mat3 rotation;uniform vec3 axis;uniform float g,momentum,optics,aspect,tanFov,groupLightScale;
${filtered('if(groupReduced[j]<.5)continue;')}
void main(){${observerRayGLSL}gl_FragColor=vec4(groupRadiance(ray)/groupLightScale,1.);}`});
  this.scene=new T.Scene();this.scene.add(new T.Mesh(new T.PlaneGeometry(2,2),this.material));this.camera=new T.OrthographicCamera(-1,1,1,-1,0,1);
 }
 needed(){const u=this.uniforms;return u.groupCenters?.value.some((c,i)=>u.groupShapes.value[i]>=0&&c.length()<20);}
 prepare(renderer){if(!this.compilation&&this.needed())this.compilation=renderer.compileAsync(this.scene,this.camera).then(()=>{this.ready=true;}).catch(e=>{this.error=e?.message||String(e);});}
 select(height){const u=this.uniforms;let scale=0,active=false;
  for(let i=0;i<GROUP_SLOTS;i++){const c=u.groupCenters?.value[i],d=c?.length()??Infinity;
   const boost=u.optics.value>.5?Math.max(1e-9,u.g.value+u.momentum.value*(c?.dot(u.axis.value)||0)/Math.max(d,1e-9)):1;
   // Restrict approximation to near, extended volumes, never the unresolved 3–8 px handoff.
   const large=d<20&&1/Math.max(d,1e-9)/boost/(2*u.tanFov.value/height)>=64;
   const on=this.ready&&u.groupShapes?.value[i]>=0&&large;u.groupReduced.value[i]=+on;
   if(on){active=true;const t=u.groupTint.value[i];scale=Math.max(scale,Math.abs(u.groupParams.value[i].w)*Math.max(Math.abs(t.x),Math.abs(t.y),Math.abs(t.z)));}
  }u.groupReducedOn.value=+active;u.groupLightScale.value=Math.max(1e-30,scale);return active;
 }
 render(renderer){const physical=renderer.getCurrentViewport(new T.Vector4());if(!this.select(physical.w))return;
  const viewport=renderer.getViewport(new T.Vector4()),scissor=renderer.getScissor(new T.Vector4()),test=renderer.getScissorTest(),target=renderer.getRenderTarget(),face=renderer.getActiveCubeFace(),mip=renderer.getActiveMipmapLevel();
  const [w,h]=cloudSize(physical.z,physical.w);this.target.setSize(w,h);
  try{renderer.setRenderTarget(this.target);renderer.setScissorTest(false);renderer.render(this.scene,this.camera);}
  finally{renderer.setRenderTarget(target,face,mip);renderer.setViewport(viewport);renderer.state.viewport(physical);renderer.setScissor(scissor);renderer.setScissorTest(test);}
 }
}
