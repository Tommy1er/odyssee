// Preserve the narrow forward observer cone BEFORE Float32 upload. Work in
// pixels relative to the projected boost axis, then boost in its local frame.
import * as T from 'three';

export const observerProjectionGLSL=`uniform float observerPrecise;
uniform vec2 observerAnchorHigh,observerAnchorLow;
uniform mat3 observerBasis,observerSteps;`;
export const observerProjectedBoostGLSL=`if(observerPrecise>.5){
 vec2 offset=(gl_FragCoord.xy-observerAnchorHigh)-observerAnchorLow;
 vec3 local=normalize(observerSteps*vec3(offset,1.));
 float mu=clamp(local.z,-1.,1.);
 float oneMinus=mu>0.?dot(local.xy,local.xy)/(1.+mu):1.-mu;
 float k=1./(g+momentum);
 D=1./max(g*oneMinus+mu*k,1.e-20);
 n=normalize(observerBasis*local);
 ray=normalize(observerBasis*vec3(local.xy,(k-g*oneMinus))*D);
}`;

export function observerProjectionUniforms(){return {
 observerPrecise:{value:0},observerAnchorHigh:{value:new T.Vector2()},observerAnchorLow:{value:new T.Vector2()},
 observerBasis:{value:new T.Matrix3()},observerSteps:{value:new T.Matrix3()}
};}

// Standalone CloudPass/GroupPass users also need the new defaults. Reuse the
// existing entries when passes share the main optical uniforms.
export function ensureObserverProjectionUniforms(uniforms){
 if(!uniforms.observerPrecise)Object.assign(uniforms,observerProjectionUniforms());
}

const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=a=>{const m=Math.hypot(...a);return a.map(v=>v/m);};

// Pure CPU preparation, also exercised by the GPU bench with real camera
// rotations and arbitrary pixels. rotation is column-major, viewport is x,y,w,h.
export function observerProjection(rotation,axis,aspect,tanFov,viewport){
 const [vx,vy,width,height]=viewport;
 const columns=[rotation.slice(0,3),rotation.slice(3,6),rotation.slice(6,9)];
 const a=unit(axis),cam=columns.map(c=>dot(c,a));
 if(!(width>0&&height>0&&aspect>0&&tanFov>0&&cam[2]<-1e-6))return null;
 const px=(-cam[0]/cam[2]/(aspect*tanFov)+1)*width/2+vx;
 const py=(-cam[1]/cam[2]/tanFov+1)*height/2+vy;
 // An off-screen axis cannot form a sub-pixel forward cone at a sampled pixel.
 // Preserve the legacy path outside this domain, including rear-facing views.
 if(px<vx||px>vx+width||py<vy||py>vy+height)return null;
 const side=unit(cross(Math.abs(a[1])<.9?[0,1,0]:[1,0,0],a)),up=cross(a,side);
 const sx=2*aspect*tanFov/width,sy=2*tanFov/height;
 const steps=[...([side,up,a].map(e=>dot(e,columns[0])*sx)),
  ...([side,up,a].map(e=>dot(e,columns[1])*sy)),0,0,-1/cam[2]];
 const anchorHigh=[Math.fround(px),Math.fround(py)],anchorLow=[px-anchorHigh[0],py-anchorHigh[1]];
 return {basis:[...side,...up,...a],steps,anchorHigh,anchorLow};
}

export function updateObserverProjection(uniforms,viewport){
 uniforms.observerPrecise.value=0;
 if(uniforms.optics.value<.5||uniforms.g.value<10000||uniforms.momentum.value<=.000001)return;
 const p=observerProjection(uniforms.rotation.value.elements,uniforms.axis.value.toArray(),uniforms.aspect.value,uniforms.tanFov.value,viewport.toArray());
 if(!p)return;
 uniforms.observerBasis.value.fromArray(p.basis);uniforms.observerSteps.value.fromArray(p.steps);
 uniforms.observerAnchorHigh.value.fromArray(p.anchorHigh);uniforms.observerAnchorLow.value.fromArray(p.anchorLow);
 uniforms.observerPrecise.value=1;
}
