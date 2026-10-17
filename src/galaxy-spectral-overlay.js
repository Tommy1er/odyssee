// Per-galaxy point-light HDR pass, preserving each source's empirical SED class through aberration.
// Extended galaxy volumes and the rest of the sky retain the old (approximate) RGB treatment.
// For KC96 shifts outside 0.72..1.09 there is NO invented UV or mid-IR empirical spectrum:
// the explicitly identified legacy thermal approximation is used.
import * as T from 'three';
import {gammaU,norm,unit} from './physics.js';
import {galaxySpectra} from './galaxy-spectral.js';

// Pure scalar counterpart of the KC96 observer/source Doppler factor; independent test oracle for shader.
export function spectralPointFluxRatio(Dsun,Dsource,Dobserver,Jcatalogue,Jtotal){
 if(![Dsun,Dsource,Dobserver,Jcatalogue,Jtotal].every(x=>Number.isFinite(x)&&x>0))return null;
 return (Dsource/Dsun)**4*Dobserver**2*Jtotal/Jcatalogue;
}
export function angularAberrationScale(Dobserver){return Dobserver>0&&Number.isFinite(Dobserver)?1/Dobserver:null;}
export const spectralPointVertex=`
attribute float vmag,dcat,rad,temp,shown,avfg,dsun,dship,sclass;
uniform float pix,avScale,band,gain,g,momentum,optics;
uniform vec3 axis;
uniform sampler2D lut,sedLut;
varying vec3 light;varying float soft;
vec4 thermal(float t){
 float clipped=clamp(t,100.,1000000.);
 vec4 c=texture2D(lut,vec2(log(clipped/100.)/log(10000.),.5));
 c.a+=log(max(t,100.)/clipped);
 return c;
}
vec4 galaxySED(float cls,float D){float u=(.5+clamp((D-.72)/.37,0.,1.)*256.)/257.;return texture2D(sedLut,vec2(u,(cls+.5)/8.));}
void main(){
 float distance=max(length(position),1.e-6);vec3 n=position/distance;
 float Dobs=1.;vec3 shifted=n;
 if(optics>.5&&momentum>.000001){
  float mu=clamp(dot(n,axis),-1.,1.);
  Dobs=max(1.e-9,g*(1.+mu)-mu/(g+momentum));
  shifted=normalize((n-axis*mu+axis*(g*(1.+mu)-1./(g+momentum)))/Dobs);
 }
 float Dtotal=dship*Dobs;
 bool sedValid=dsun>=.72&&dsun<=1.09&&dship>=.72&&dship<=1.09&&Dtotal>=.72&&Dtotal<=1.09;
 vec4 cat=sedValid?galaxySED(sclass,dsun):thermal(temp*dsun);
 vec4 seen=sedValid?galaxySED(sclass,Dtotal):thermal(temp*Dtotal);
 float mag=vmag+5.*log(distance/dcat)/log(10.)+avfg*(avScale-1.);
 float flux=pow(10.,-.4*(mag-3.));
 // Source at catalogue-frame emission distance: (Ds/Dsun)^4 J(Ds)/J(Dsun).
 // A moving observer compresses angular solid angle by Dobs^-2 and increases bolometric
 // radiance by Dobs^4; thus POINT flux -> (Ds/Dsun)^4 Dobs^2 J(Ds*Dobs)/J(Dsun).
 if(sedValid)flux*=pow(dship/dsun,4.)*Dobs*Dobs*(seen.a/max(cat.a,1.e-12));
 // Thermal fallback exact within the blackbody model: B_V(T*Ds*Dobs)/B_V(T*Dsun)/Dobs^2.
 else flux*=exp(clamp(seen.a-cat.a,-60.,60.))/max(Dobs*Dobs,1.e-18);
 flux*=shown;if(band>=3.)flux*=.005;
 float size=clamp(2.*rad/distance/pix/Dobs,1.25,48.);
 soft=smoothstep(2.,5.,size);flux*=mix(1.,gain,soft);
 light=seen.rgb*flux/(size*size*.08);
 if(band==0.){float y=dot(light,vec3(.2126,.7152,.0722));light=mix(vec3(y),light,smoothstep(.3,4.,flux));}
 gl_Position=projectionMatrix*viewMatrix*vec4(shifted*1000.,1.);
 gl_PointSize=size;
 if(shown<.001){gl_Position=vec4(2.,2.,2.,1.);gl_PointSize=0.;}
}`;
export const spectralPointFragment=`
varying vec3 light;varying float soft;
void main(){
 float r=length(gl_PointCoord-.5)*2.;if(r>1.)discard;
 float psf=mix(exp(-12.*r*r)*(1.-smoothstep(.7,1.,r)),exp(-4.*r*r)*(1.-smoothstep(.8,1.,r))*.33,soft);
 gl_FragColor=vec4(min(max(light,vec3(0.)),vec3(5000.))*psf,1.);
}`;
export class GalaxySpectralOverlay {
 constructor(source){
  this.source=source;
  const sed=new T.DataTexture(galaxySpectra.data,galaxySpectra.samples,galaxySpectra.ids.length,T.RGBAFormat,T.FloatType);
  sed.minFilter=sed.magFilter=T.LinearFilter;sed.needsUpdate=true;
  this.material=new T.ShaderMaterial({
   vertexShader:spectralPointVertex,fragmentShader:spectralPointFragment,
   uniforms:{
    sedLut:{value:sed},lut:{value:source.material.uniforms.lut.value},
    pix:{value:.001},avScale:{value:1},band:{value:1},gain:{value:1},
    g:{value:1},momentum:{value:0},axis:{value:new T.Vector3(0,0,-1)},optics:{value:0}
   },transparent:true,depthWrite:false,depthTest:false,blending:T.AdditiveBlending
  });
  this.points=new T.Points(source.points.geometry,this.material);this.points.frustumCulled=false;
  this.scene=new T.Scene();this.scene.add(this.points);
  this.target=new T.WebGLRenderTarget(1,1,{format:T.RGBAFormat,type:T.HalfFloatType,
   minFilter:T.LinearFilter,magFilter:T.LinearFilter,depthBuffer:false,stencilBuffer:false});
  this.drawn=false;
 }
 render(renderer,camera,u,optics){
  if(this.source.status!=='ready'||this.source.rows.length===0){this.drawn=false;return false;}
  const vp=new T.Vector4(),sc=new T.Vector4(),prevTarget=renderer.getRenderTarget(),
   clear=renderer.getClearColor(new T.Color()).clone(),alpha=renderer.getClearAlpha(),scissorTest=renderer.getScissorTest();
  renderer.getViewport(vp);renderer.getScissor(sc);
  const width=Math.max(1,Math.floor(vp.z)),height=Math.max(1,Math.floor(vp.w));
  if(this.target.width!==width||this.target.height!==height)this.target.setSize(width,height);
  this.points.geometry=this.source.points.geometry;
  const U=this.material.uniforms,root=this.source.material.uniforms,m=norm(u),gg=gammaU(u);
  U.g.value=gg;U.momentum.value=m;U.axis.value.set(...unit(u));U.optics.value=+optics;
  U.avScale.value=root.avScale.value;U.band.value=root.band.value;U.gain.value=root.gain.value;
  U.pix.value=2*Math.tan(camera.fov*Math.PI/360)/height;
  try{
   renderer.setRenderTarget(this.target);renderer.setViewport(0,0,width,height);
   renderer.setScissorTest(false);renderer.setClearColor(0x000000,0);
   renderer.clear(true,true,true);renderer.render(this.scene,camera);
  }finally{
   renderer.setRenderTarget(prevTarget);renderer.setViewport(vp);renderer.setScissor(sc);
   renderer.setScissorTest(scissorTest);renderer.setClearColor(clear,alpha);
  }
  this.drawn=true;return true;
 }
}
