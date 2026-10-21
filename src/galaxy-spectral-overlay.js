// Per-galaxy point-light HDR pass, preserving each source's empirical SED class through aberration.
// Extended galaxy volumes and the rest of the sky retain the old (approximate) RGB treatment.
// For KC96 shifts outside 0.72..1.09 there is NO invented UV or mid-IR empirical spectrum:
// the explicitly identified legacy thermal approximation is used.
import * as T from 'three';
import {gammaU,norm,unit} from './physics.js';
import {galaxySpectra} from './galaxy-spectral.js';
import {PIXEL_SR,TEXEL_GLSL,PSF_VERTEX_GLSL,PSF_FRAGMENT} from './photometry.js';
import {lutTexture} from './gpu-textures.js';

// Pure scalar counterpart of the KC96 observer/source Doppler factor; independent test oracle for shader.
export function spectralPointFluxRatio(Dsun,Dsource,Dobserver,Jcatalogue,Jtotal){
 if(![Dsun,Dsource,Dobserver,Jcatalogue,Jtotal].every(x=>Number.isFinite(x)&&x>0))return null;
 return (Dsource/Dsun)**4*Dobserver**2*Jtotal/Jcatalogue;
}
export function angularAberrationScale(Dobserver){return Dobserver>0&&Number.isFinite(Dobserver)?1/Dobserver:null;}
// The shared sky scale (photometry.js) stores a point source as a pixel SUM of 0.818·flux in cube texels of
// PIXEL_SR = (2/1024)² sr, and the cube is then displayed as radiance (texel value per screen pixel, independent of
// screen resolution). This overlay draws directly in SCREEN pixels of pix² sr, so the same pixel sum must be scaled by
// PIXEL_SR/pix² to carry the same Φ; without it the point galaxies change brightness with resolution, DPR and zoom
// (×(pix/2·1024)² relative to stars and to the volumes they hand off to). Pure oracle for the shader uniform.
export function overlayPixelScale(pixScreen){return pixScreen>0&&Number.isFinite(pixScreen)?PIXEL_SR/(pixScreen*pixScreen):null;}
export const spectralPointVertex=`
attribute float vmag,dcat,rad,temp,shown,avfg,dsun,dship,sclass;
uniform float pix,pixRef,pixScale,avScale,band,gain,g,momentum,optics;
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
// The empirical KC96 band luminosity is F(D) = D^4 J(D), with chromaticity CIE Y=1.
// Outside the measured LUT, continue F from the *nearest measured boundary* using
// only the thermal RATIO B_V(TD)/B_V(TD_edge). At D=D_edge both brightness and
// colour agree with the actual KC96 boundary: no artificial magnitude/RGB jump.
// The extension is a synthetic thermal model, NOT a measured UV/MIR spectrum.
vec4 galaxyBridge(float cls,float D,float T){
 float edgeD=clamp(D,.72,1.09);
 vec4 edge=galaxySED(cls,edgeD);
 float logBand=4.*log(edgeD)+log(max(edge.a,1.e-20));
 if(D>=.72&&D<=1.09)return vec4(edge.rgb,logBand);
 vec4 atD=thermal(T*D),atEdge=thermal(T*edgeD);
 vec3 color=edge.rgb*atD.rgb/max(atEdge.rgb,vec3(1.e-5));
 float y0=dot(edge.rgb,vec3(.2126,.7152,.0722));
 color*=y0/max(dot(color,vec3(.2126,.7152,.0722)),1.e-8);
 return vec4(color,logBand+clamp(atD.a-atEdge.a,-70.,70.));
}
${TEXEL_GLSL}
${PSF_VERTEX_GLSL}
void main(){
 float distance=max(length(position),1.e-6);vec3 n=position/distance;
 float Dobs=1.;vec3 shifted=n;
 if(optics>.5&&momentum>.000001){
  float mu=clamp(dot(n,axis),-1.,1.);
  Dobs=max(1.e-9,g*(1.+mu)-mu/(g+momentum));
  shifted=normalize((n-axis*mu+axis*(g*(1.+mu)-1./(g+momentum)))/Dobs);
 }
 float Dtotal=dship*Dobs;
 // Independent of the source's intermediate Doppler factor: one spectrum at the catalogue
 // anchor Dsun, the same spectrum evaluated at Dsource*Dobserver. No double Doppler.
 vec4 cat=galaxyBridge(sclass,dsun,temp);
 vec4 seen=galaxyBridge(sclass,Dtotal,temp);
 float mag=vmag+5.*log(distance/dcat)/log(10.)+avfg*(avScale-1.);
 float flux=pow(10.,-.4*(mag-3.));
 // Point-source received flux is F(Dsource*Dobserver)/F(Dsun)/Dobserver^2.
 // Within KC96, F(D)=D^4 J(D), reproducing Claude's moving-source correction
 // and the moving-observer aberration factor exactly. Across the observed data
 // boundary, both sides use the same KC96-anchored continuous thermal extension.
 flux*=exp(clamp(seen.a-cat.a,-60.,60.))/max(Dobs*Dobs,1.e-18);
 flux*=shown;if(band>=3.)flux*=.005;
 vec4 mv=viewMatrix*vec4(shifted*1000.,1.);
 // Screen pixels off-axis span less solid angle (same law as the cube faces, photometry.js TEXEL_GLSL).
 float size=clamp(2.*rad/distance/pix/Dobs*texelScale(mv.xyz),1.25,48.);
 // Long-exposure gain onset on the same angular size as the historical cube sprite (pixRef = its pix).
 soft=smoothstep(2.,5.,2.*rad/distance/pixRef/Dobs);flux*=mix(1.,gain,soft);
 psfS=psfSigma(size,soft,1.);// drawn on the screen grid itself: pixel-integrated, no resamplingpsfD=psfDraw(size,psfS);
 light=seen.rgb*flux*pixScale*.818;
 if(band==0.){float y=dot(light,vec3(.2126,.7152,.0722));light=mix(vec3(y),light,smoothstep(.3,4.,flux));}
 light*=texelGain(mv.xyz);
 gl_Position=projectionMatrix*mv;
 gl_PointSize=psfD;
 if(shown<.001){gl_Position=vec4(2.,2.,2.,1.);gl_PointSize=0.;}
}`;
export const spectralPointFragment=PSF_FRAGMENT;
export class GalaxySpectralOverlay {
 constructor(source){
  this.source=source;
  const sed=lutTexture(galaxySpectra.data,galaxySpectra.samples,galaxySpectra.ids.length);
  sed.minFilter=sed.magFilter=T.LinearFilter;sed.needsUpdate=true;
  this.material=new T.ShaderMaterial({
   vertexShader:spectralPointVertex,fragmentShader:spectralPointFragment,
   uniforms:{
    sedLut:{value:sed},lut:{value:source.material.uniforms.lut.value},
    pix:{value:.001},psfMin:{value:0},pixRef:{value:source.material.uniforms.pix.value},pixScale:{value:1},avScale:{value:1},band:{value:1},gain:{value:1},
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
  // getViewport() is in CSS pixels; the drawing buffer (and s.pixelAngle) is in device pixels. Size the target in device
  // pixels and let setRenderTarget() apply its own full viewport: renderer.setViewport() would multiply by the pixel ratio
  // again and, on any DPR>1 screen (phones, retina), draw the galaxies magnified and off-register (measured: 3 % of flux).
  const pr=renderer.getPixelRatio(),width=Math.max(1,Math.round(vp.z*pr)),height=Math.max(1,Math.round(vp.w*pr));
  if(this.target.width!==width||this.target.height!==height)this.target.setSize(width,height);
  this.points.geometry=this.source.points.geometry;
  const U=this.material.uniforms,root=this.source.material.uniforms,m=norm(u),gg=gammaU(u);
  U.g.value=gg;U.momentum.value=m;U.axis.value.set(...unit(u));U.optics.value=+optics;
  U.avScale.value=root.avScale.value;U.band.value=root.band.value;U.gain.value=root.gain.value;
  U.pix.value=2*Math.tan(camera.fov*Math.PI/360)/height;U.pixScale.value=overlayPixelScale(U.pix.value);U.pixRef.value=root.pix.value;
  try{
   renderer.setRenderTarget(this.target);
   renderer.setScissorTest(false);renderer.setClearColor(0x000000,0);
   renderer.clear(true,true,true);renderer.render(this.scene,camera);
  }finally{
   renderer.setRenderTarget(prevTarget);renderer.setViewport(vp);renderer.setScissor(sc);
   renderer.setScissorTest(scissorTest);renderer.setClearColor(clear,alpha);
  }
  this.drawn=true;return true;
 }
}
