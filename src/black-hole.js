import * as T from 'three';
import {norm,sub} from './physics.js';
import {radiusLy} from './body-data.js';
import {schwarzschildR} from './gravity-field.js'; // positions are isotropic coordinates; optics uses Schwarzschild r
// Null geodesics in a Schwarzschild spacetime, u = Rs/r: u'' = 1.5 u² - u.
// Static local observer, numerical RK4 in the photon orbital plane. Not Kerr.
const fragment=`precision highp float;uniform samplerCube sky;uniform mat3 cameraRotation;uniform vec3 radial;uniform vec3 diskNormal;uniform float observerRadius,aspect,tanFov,disk,band,time;varying vec2 uvp;
vec2 derivative(vec2 s){return vec2(s.y,1.5*s.x*s.x-s.x);}
vec2 rk4(vec2 s,float h){vec2 a=derivative(s),b=derivative(s+a*h*.5),c=derivative(s+b*h*.5),d=derivative(s+c*h);return s+h*(a+2.*b+2.*c+d)/6.;}
void main(){vec3 n=normalize(cameraRotation*vec3(uvp.x*aspect*tanFov,uvp.y*tanFov,-1.));vec3 er=normalize(radial);float mu=dot(n,er),sinPsi=sqrt(max(0.,1.-mu*mu)),r=max(1.001,observerRadius);vec3 et=normalize(n-er*mu+vec3(.00000001));float impact=r*sinPsi/sqrt(1.-1./r);if(impact<.00001){gl_FragColor=vec4(mu<0.?vec3(0):textureCube(sky,n).rgb,1);return;}
vec2 s=vec2(1./r,sign(-mu)*sqrt(max(0.,1./(impact*impact)-1./(r*r)+1./(r*r*r))));float phi=0.;vec3 prior=er*r;float priorSide=dot(prior,diskNormal);vec3 light=vec3(0);float opacity=0.;bool captured=false,escaped=false;
for(int i=0;i<320;i++){float h=.024;vec2 next=rk4(s,h);float nextPhi=phi+h;if(next.x<=0.){float t=s.x/max(.000000001,s.x-next.x);phi+=h*t;escaped=true;break;}s=next;phi=nextPhi;if(s.x>=1.){captured=true;break;}vec3 axis=er*cos(phi)+et*sin(phi);vec3 p=axis/s.x;float side=dot(p,diskNormal);if(disk>.5&&side*priorSide<0.){float f=priorSide/(priorSide-side);vec3 hit=mix(prior,p,f);float rr=length(hit);if(rr>3.&&rr<12.){vec3 tang=normalize(cross(diskNormal,hit));vec3 ray=normalize(p-prior);float speed=sqrt(1./(2.*(rr-1.)));float D=sqrt((1.-1./rr)/(1.-1./r))*sqrt(1.-speed*speed)/(1.+speed*dot(tang,ray));float temp=pow(rr/3.,-.75);float az=atan(dot(hit,normalize(cross(diskNormal,vec3(1.,0.,0.)))),dot(hit,normalize(cross(diskNormal,cross(diskNormal,vec3(1.,0.,0.))))));float swirl=az-time*.16/pow(rr/3.,1.5);float ripple=.76+.13*sin(az*11.+rr*5.+sin(swirl*5.))+.08*sin(swirl*23.+rr*13.);float taper=smoothstep(3.,3.7,rr)*(1.-smoothstep(7.,12.,rr));vec3 color=vec3(1.,.39,.10);if(band==2.)color=vec3(1.,.55,.15);if(band==3.)color=vec3(1.,.33,.08);if(band==4.)color=vec3(.32,.5,1.);float gain=band==0.?.08:1.;light+=color*temp*pow(clamp(D,.1,5.),3.)*ripple*taper*gain*(1.-opacity);opacity+=.8*taper*(1.-opacity);if(opacity>.95)break;}}prior=p;priorSide=side;}
vec3 background=captured?vec3(0):textureCube(sky,normalize(er*cos(phi)+et*sin(phi))).rgb;gl_FragColor=vec4(background*(1.-opacity)+light*2.,1.);}`;
export class BlackHoleLens{
 constructor(){this.target=new T.WebGLCubeRenderTarget(192,{generateMipmaps:false,minFilter:T.LinearFilter});this.cube=new T.CubeCamera(.01,2500,this.target);this.scene=new T.Scene();this.camera=new T.OrthographicCamera(-1,1,1,-1,0,1);this.material=new T.ShaderMaterial({vertexShader:'varying vec2 uvp;void main(){uvp=position.xy;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:fragment,uniforms:{sky:{value:this.target.texture},cameraRotation:{value:new T.Matrix3()},radial:{value:new T.Vector3()},diskNormal:{value:new T.Vector3(.18,.84,.51).normalize()},observerRadius:{value:15},aspect:{value:1},tanFov:{value:Math.tan(35*Math.PI/180)},disk:{value:0},band:{value:1},time:{value:0}},depthTest:false,depthWrite:false});this.scene.add(new T.Mesh(new T.PlaneGeometry(2,2),this.material));this.last=-10;this.active=false;}
 isNear(s){const o=s.target,rr=o?.type==='blackhole'?schwarzschildR(norm(sub(s.pos,o.lightXYZ||o.xyz))/radiusLy(o),.5):Infinity;this.active=!!s.lensing&&rr<150&&rr>1.02;return this.active;}
 renderInto(renderer,target,scene,s,localGroup){
 if(!this.output){this.output=new T.WebGLCubeRenderTarget(128,{type:T.HalfFloatType,minFilter:T.LinearFilter,generateMipmaps:false});this.outputCamera=new T.CubeCamera(.001,2500,this.output);}
 const key=[s.target.id,...s.pos,s.t,s.band,s.galaxyLight,s.retarded].join('|');if(key===this.outputKey)return this.output.texture;
 const vp=new T.Vector4(),sc=new T.Vector4();renderer.getViewport(vp);renderer.getScissor(sc);const st=renderer.getScissorTest(),rt=renderer.getRenderTarget();renderer.setScissorTest(false);
 const visible=localGroup.visible;localGroup.visible=false;this.cube.update(renderer,scene);localGroup.visible=visible;
 this.outputCamera.coordinateSystem=renderer.coordinateSystem;this.outputCamera.updateCoordinateSystem();this.outputCamera.updateMatrixWorld(true);const o=s.target,rr=schwarzschildR(norm(sub(s.pos,o.lightXYZ||o.xyz))/radiusLy(o),.5),u=this.material.uniforms;u.radial.value.set(...sub(s.pos,o.lightXYZ||o.xyz)).normalize();u.observerRadius.value=rr;u.aspect.value=1;u.tanFov.value=-1;u.disk.value=+!!o.accretion;u.band.value=s.band;u.time.value=s.t*365.25;
 for(let face=0;face<6;face++){u.cameraRotation.value.setFromMatrix4(this.outputCamera.children[face].matrixWorld);renderer.setRenderTarget(this.output,face);renderer.render(this.scene,this.camera);}
 renderer.setRenderTarget(rt);renderer.setViewport(vp);renderer.setScissor(sc);renderer.setScissorTest(st);this.outputKey=key;return this.output.texture;
 }

 render(renderer,scene,camera,s,localGroup){const o=s.target,rr=o?.type==='blackhole'?schwarzschildR(norm(sub(s.pos,o.xyz))/radiusLy(o),.5):Infinity;this.active=!!s.lensing&&rr<150&&rr>1.02;if(!this.active)return false;
 if(s.wall-this.last>1||this.lastId!==o.id||this.lastBand!==s.band||Math.abs(this.lastBeta-(s.opticalLab?s.labBeta:s.speedValue))>.03){const visible=localGroup.visible;localGroup.visible=false;this.cube.update(renderer,scene);localGroup.visible=visible;this.last=s.wall;this.lastId=o.id;this.lastBand=s.band;this.lastBeta=s.opticalLab?s.labBeta:s.speedValue;}
 camera.updateMatrixWorld();this.material.uniforms.cameraRotation.value.setFromMatrix4(camera.matrixWorld);this.material.uniforms.radial.value.set(...sub(s.pos,o.xyz)).normalize();this.material.uniforms.observerRadius.value=rr;this.material.uniforms.aspect.value=camera.aspect;this.material.uniforms.tanFov.value=Math.tan(camera.fov/2*Math.PI/180);this.material.uniforms.disk.value=+!!o.accretion;this.material.uniforms.band.value=s.band;this.material.uniforms.time.value=s.t*365.25;renderer.render(this.scene,this.camera);return true;
 }
}
export function traceSchwarzschild(r,psi,steps=1600){const impact=r*Math.sin(psi)/Math.sqrt(1-1/r);if(Math.abs(impact)<1e-12)return {captured:psi>Math.PI/2,angle:0};let u=1/r,q=-Math.sign(Math.cos(psi))*Math.sqrt(Math.max(0,1/(impact*impact)-u*u+u*u*u)),angle=0;const acc=u=>1.5*u*u-u;for(let i=0;i<steps;i++){const h=.005,a=[q,acc(u)],b=[q+a[1]*h/2,acc(u+a[0]*h/2)],c=[q+b[1]*h/2,acc(u+b[0]*h/2)],d=[q+c[1]*h,acc(u+c[0]*h)];u+=h*(a[0]+2*b[0]+2*c[0]+d[0])/6;q+=h*(a[1]+2*b[1]+2*c[1]+d[1])/6;angle+=h;if(u>=1)return {captured:true,angle};if(u<=0)return {captured:false,angle};}return {captured:false,angle,unresolved:true};}

// Reuse exactly the same geodesic model at the output-pixel resolution.
export const blackHoleGLSL=`
uniform float observerRadius;
vec4 thermal(float t);
vec3 bhSky(vec3 n){vec3 L=textureCube(sky,n).rgb;if(shift<.5)return L;float D=inversesqrt(max(.00001,1.-1./observerRadius));
 if(band<2.5){float blue=L.b/(L.r+L.b+1.e-20);float temp=mix(2800.,16000.,clamp((blue-.18)/.66,0.,1.));vec4 rest=thermal(temp),seen=thermal(temp*D);L*=exp(clamp(seen.a-rest.a,-60.,60.))*seen.rgb/max(rest.rgb,vec3(.0001));}else L*=pow(D,4.);return L;}
`+fragment
 .replace(/precision highp float;[\s\S]*?varying vec2 uvp;/,'uniform vec3 radial,diskNormal;uniform float disk,time;')
 .replaceAll('textureCube(sky,n).rgb','bhSky(n)')
 .replaceAll('textureCube(sky,normalize(er*cos(phi)+et*sin(phi))).rgb','bhSky(normalize(er*cos(phi)+et*sin(phi)))')
 .replace('void main(){vec3 n=normalize(cameraRotation*vec3(uvp.x*aspect*tanFov,uvp.y*tanFov,-1.));','vec3 traceBlackHole(vec3 n){')
 .replace('gl_FragColor=vec4(mu<0.?vec3(0):bhSky(n),1);return;','return mu<0.?vec3(0):bhSky(n);')
 .replace('gl_FragColor=vec4(background*(1.-opacity)+light*2.,1.);','return background*(1.-opacity)*(band<2.?.035:1.)+light*2.;');
