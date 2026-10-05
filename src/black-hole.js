import {norm,sub} from './physics.js';
import {radiusLy} from './body-data.js';
import {schwarzschildR} from './gravity-field.js'; // positions are isotropic coordinates; optics uses Schwarzschild r
import {THIN_FMAX_RIN3} from './compact-objects.js';
// Null geodesics in a Schwarzschild spacetime, u = Rs/r: u'' = 1.5 u² − u, integrated per screen pixel (RK4)
// in the photon's orbital plane, from a static observer at r_obs. Not Kerr: the spin of real black holes is not modelled.
// Emission (see compact-objects.js): none / thin Shakura–Sunyaev disk seen at T_obs = g·T / optically thin hot flow
// integrated along the ray with g³. The photon ring and secondary images come from the traced rays themselves.
export class BlackHoleLens{
 constructor(){this.active=false;}
 isNear(s){const o=s.target,rr=o?.type==='blackhole'?schwarzschildR(norm(sub(s.pos,o.lightXYZ||o.xyz))/radiusLy(o),.5):Infinity;this.active=!!s.lensing&&rr<150&&rr>1.02;return this.active;}
}
export function traceSchwarzschild(r,psi,steps=1600){const impact=r*Math.sin(psi)/Math.sqrt(1-1/r);if(Math.abs(impact)<1e-12)return {captured:psi>Math.PI/2,angle:0};let u=1/r,q=-Math.sign(Math.cos(psi))*Math.sqrt(Math.max(0,1/(impact*impact)-u*u+u*u*u)),angle=0;const acc=u=>1.5*u*u-u;for(let i=0;i<steps;i++){const h=.005,a=[q,acc(u)],b=[q+a[1]*h/2,acc(u+a[0]*h/2)],c=[q+b[1]*h/2,acc(u+b[0]*h/2)],d=[q+c[1]*h,acc(u+c[0]*h)];u+=h*(a[0]+2*b[0]+2*c[0]+d[0])/6;q+=h*(a[1]+2*b[1]+2*c[1]+d[1])/6;angle+=h;if(u>=1)return {captured:true,angle};if(u<=0)return {captured:false,angle};}return {captured:false,angle,unresolved:true};}

// Included in the sky-optics fragment shader (which provides sky, band, shift and thermal()).
export const blackHoleGLSL=`
uniform float observerRadius,diskModel,diskTmax,diskOuter;uniform vec3 radial,diskNormal;
vec4 thermal(float t);
// Background sky seen by the static observer: gravitational blueshift D = 1/√(1 − 1/r) of incoming light.
vec3 bhSky(vec3 n){vec3 L=textureCube(sky,n).rgb;if(shift<.5)return L;float D=inversesqrt(max(.00001,1.-1./observerRadius));
 if(band<2.5){float blue=L.b/(L.r+L.b+1.e-20);float temp=mix(2800.,16000.,clamp((blue-.18)/.66,0.,1.));vec4 rest=thermal(temp),seen=thermal(temp*D);L*=exp(clamp(seen.a-rest.a,-60.,60.))*seen.rgb/max(rest.rgb,vec3(.0001));}else L*=pow(D,4.);return L;}
vec2 bhDerivative(vec2 s){return vec2(s.y,1.5*s.x*s.x-s.x);}
vec2 bhStep(vec2 s,float h){vec2 a=bhDerivative(s),b=bhDerivative(s+a*h*.5),c=bhDerivative(s+b*h*.5),d=bhDerivative(s+c*h);return s+h*(a+2.*b+2.*c+d)/6.;}
// g = ν_obs/ν_em for prograde circular gas at r (Rs = 1), photon angular momentum λ about the disk axis.
float bhDiskG(float r,float lambda,float lapseObs){float ut=inversesqrt(max(1.e-6,1.-1.5/r)),om=sqrt(.5/(r*r*r));return 1./(lapseObs*ut*max(1.e-4,1.-om*lambda));}
// False-colour map for the radio band (dark → red → yellow → white).
vec3 bhRadioMap(float x){x=1.-exp(-x);return clamp(vec3(1.6*x,1.6*x-.45,2.2*x-1.3),0.,1.)*1.6;}
vec3 traceBlackHole(vec3 n){vec3 er=normalize(radial);float mu=dot(n,er),sinPsi=sqrt(max(0.,1.-mu*mu)),r=max(1.001,observerRadius),lapseObs=sqrt(1.-1./r);
 vec3 et=normalize(n-er*mu+vec3(.00000001));float impact=r*sinPsi/lapseObs;float bgk=band<2.?.035:1.;
 if(impact<.00001)return mu<0.?vec3(0):bhSky(n)*bgk;
 // The photon really travels against the traced direction: its angular momentum about the disk axis is −b (er×et)·axis.
 float lambda=-impact*dot(normalize(cross(er,et)),diskNormal);
 vec2 s=vec2(1./r,sign(-mu)*sqrt(max(0.,1./(impact*impact)-1./(r*r)+1./(r*r*r))));float phi=0.;vec3 prior=er*r;float priorSide=dot(prior,diskNormal);
 vec3 light=vec3(0);float trans=1.;bool captured=false;vec4 ref=thermal(diskTmax);
 for(int i=0;i<520;i++){
  // Smaller angular steps where the ray winds close to the photon sphere (u ≈ 2/3) or the hole.
  float h=s.x>.45?.012:.024;vec2 next=bhStep(s,h);if(next.x<=0.){phi+=h*s.x/max(.000000001,s.x-next.x);break;}
  s=next;phi+=h;if(s.x>=1.){captured=true;break;}
  vec3 p=(er*cos(phi)+et*sin(phi))/s.x;float side=dot(p,diskNormal);
  if(diskModel>.5&&diskModel<1.5&&side*priorSide<0.){vec3 hit=mix(prior,p,priorSide/(priorSide-side));float rr=length(hit);
   if(rr>3.&&rr<diskOuter){float x=rr/3.;float f=pow(x,-.75)*pow(max(0.,1.-sqrt(1./x)),.25)/${THIN_FMAX_RIN3.toFixed(8)};float g=bhDiskG(rr,lambda,lapseObs);float Tobs=diskTmax*f*g;
    float edge=1.-smoothstep(diskOuter*.7,diskOuter,rr);vec3 em;
    if(band<2.5||band>5.5){vec4 c=thermal(Tobs);em=c.rgb*exp(clamp(c.a-ref.a,-60.,30.));if(band>1.5)em*=vec3(1.,.55,.35);}
    else if(band<3.5)em=vec3(.02)*f;
    else if(band<4.5)em=vec3(.45,.65,1.)*pow(f*g,4.)*step(1.e6,diskTmax);
    else em=vec3(0.);
    light+=trans*em*edge*.3;trans*=1.-edge;if(trans<.02)break;}}
  if(diskModel>1.5){float rr=length(p),z=dot(p,diskNormal),R=max(.001,sqrt(max(0.,rr*rr-z*z)));
   float j=pow(max(rr,1.02),-2.5)*exp(-z*z/(2.*.36*R*R+.5))*smoothstep(1.,1.25,rr);
   float g=rr>3.?bhDiskG(max(R,3.),lambda,lapseObs):sqrt(max(0.,1.-1./rr))/lapseObs;float dl=length(p-prior);
   float I=j*g*g*g*dl;
   if(band>2.5&&band<3.5)light+=trans*vec3(I)*6.;else if(band>5.5)light+=trans*vec3(I)*6.;else if(band>3.5&&band<4.5)light+=trans*vec3(.4,.55,1.)*I*.15;}
  prior=p;priorSide=side;}
 if(diskModel>1.5&&((band>2.5&&band<3.5)||band>5.5))light=bhRadioMap(light.r);
 vec3 background=captured?vec3(0):bhSky(normalize(er*cos(phi)+et*sin(phi)));
 return background*trans*bgk+light;}
`;
