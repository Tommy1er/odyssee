import * as T from 'three';
import {sub,norm,unit,YEAR} from './physics.js';
import {radiusLy,hash} from './body-data.js';
import {temperature} from './stellar-light.js';
import {limbDarkening,blackbodyRGB} from './stellar-physics.js';
import {beamBlend} from './compact-objects.js';
import {EPOCH} from './ephemeris.js';
import {yearToJD} from './solar-ephemeris.js';
import {bodyFrame,hasIAU} from './iau-rotation.js';
// The local object is intersected per display pixel, AFTER inverse aberration.
// No intermediary cubemap quantizes its silhouette or surface texture.
export const closeupGLSL=`
uniform vec3 bodyCenter,bodyLight,bodyTint;uniform mat3 bodyRotation;
uniform float bodyKind,bodyStyle,bodySeed,bodyTime,bodyMapReady,bodyCloudReady,bodyRing,bodyAtmosphere,bodyPhase,activityTime;uniform float bodyLimb,bodyGranule,bodyConvective,bodySpots;uniform float bodyCompactness,bodyBeamBlend;float nsLimb=1.;
uniform sampler2D bodyMap,cloudMap,nightMap,ringMap;uniform float ringReady;uniform float nightReady;
vec3 eclipseTint=vec3(1.);float eclipseRed=0.;vec3 primaryStarlight(vec3 pR);
float noiseHash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7))+bodySeed)*43758.5453);}
float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(noiseHash(i),noiseHash(i+vec3(1,0,0)),f.x),mix(noiseHash(i+vec3(0,1,0)),noiseHash(i+vec3(1,1,0)),f.x),f.y),mix(mix(noiseHash(i+vec3(0,0,1)),noiseHash(i+vec3(1,0,1)),f.x),mix(noiseHash(i+vec3(0,1,1)),noiseHash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float terrain(vec3 p){return .5*noise3(p)+.25*noise3(p*2.03)+.125*noise3(p*4.07)+.0625*noise3(p*8.19)+.03125*noise3(p*16.41);}
vec2 sphereUV(vec3 p){return vec2(fract(atan(-p.z,p.x)/6.2831853+.5),.5+asin(clamp(p.y,-1.,1.))/3.14159265);}
// Seam-free sampling: at the longitude where u wraps from 1 to 0 the screen derivatives jump and the GPU picks the
// coarsest mipmap, drawing a line of wrong texels. Use the smaller derivative of u or of u shifted by half a turn (Tarini 2012).
vec4 mapSample(sampler2D t,vec2 uv){float u2=fract(uv.x+.5);vec2 dx=vec2(dFdx(uv.x),dFdx(uv.y)),dy=vec2(dFdy(uv.x),dFdy(uv.y));float ax=dFdx(u2),ay=dFdy(u2);if(abs(ax)<abs(dx.x))dx.x=ax;if(abs(ay)<abs(dy.x))dy.x=ay;return textureGrad(t,uv,dx,dy);}
vec3 terrainColor(vec3 p){float n=terrain(p*9.),fine=noise3(p*180.);vec3 c=bodyTint*(.55+.8*n);
 if(bodyStyle==2.){float flow=terrain(p*7.+vec3(terrain(p*3.)*2.,0,0));float stripe=sin(p.y*85.+flow*12.);c=bodyTint*(.75+.14*stripe+.18*sin(p.y*200.+flow*7.));}
 if(bodyStyle==3.){float ocean=smoothstep(.43,.49,n);c=mix(vec3(.005,.042,.11),bodyTint*(.7+.5*n),ocean);}
 if(bodyStyle==4.){float crack=1.-smoothstep(.015,.045,abs(terrain(p*17.)-.48));c=bodyTint*(.2+.5*n)+vec3(3.,.35,.012)*crack;}
 if(bodyStyle==5.){float vein=1.-smoothstep(.006,.025,abs(terrain(p*22.)-.48));c=mix(bodyTint*(.75+.35*n),vec3(.13,.2,.24),vein*.6);}
 return c*(.97+.06*fine);}
vec3 shadeSurface(vec3 normal,vec3 ray){vec3 p=normalize(bodyRotation*normal);vec2 uv=sphereUV(p);float mu=dot(normal,bodyLight),day=max(0.,mu)*eclipseTint.g,limb=max(0.,dot(normal,-ray));
 vec3 albedo=bodyMapReady>.5?mapSample(bodyMap,uv).rgb:terrainColor(p);
 if(bodyKind==2.){// Linear limb darkening I(mu)=1-u(1-mu); granulation scale shrinks with the star (few giant cells on supergiants); radiative envelopes of hot stars carry neither granulation nor spots.
 float grain=noise3(p*bodyGranule+activityTime*.8),cells=terrain(p*bodyGranule*.17+activityTime*.15);float spot=bodySpots*smoothstep(.65,.76,terrain(p*11.));float ld=1.-bodyLimb*(1.-limb);return bodyTint*(1.+bodyConvective*(.9*(grain-.5)+.55*(cells-.5)))*(1.-.8*spot)*ld*1.2;}
 if(bodyKind==3.||bodyKind==4.){limb=nsLimb;vec3 pole=normalize(vec3(.58,.76,.28));float hot=pow(abs(dot(p,pole)),26.);float cracks=pow(1.-smoothstep(.0,.045,abs(terrain(p*22.)-.46)),2.);return mix(vec3(.13,.24,.36),vec3(.8,1.6,2.2),hot)*(.4+.6*limb)+cracks*(bodyKind==4.?vec3(.7,.18,.055):vec3(.04,.12,.2));}
 // Diffuse + view-dependent ocean reflection; low fill is an inspection aid.
 // eclipseTint: light left by the other bodies of the system (system-bodies.js), reddened inside Earth's shadow.
 // The faint inspection fill takes the colour of the light refracted into Earth's shadow (its true level, ~1e-4, is far darker).
 vec3 col=albedo*(.012*mix(vec3(1.),vec3(1.,.42,.16)*1.7,eclipseRed*smoothstep(0.,.08,mu))+1.5*max(0.,mu)*eclipseTint);
 if(bodyStyle==1.){float sea=clamp((albedo.b-albedo.r)*4.,0.,1.);vec3 halfDir=normalize(bodyLight-ray);col+=vec3(1.,.9,.7)*pow(max(0.,dot(normal,halfDir)),95.)*sea*.5*day;
  if(nightReady>.5)col+=mapSample(nightMap,uv).rgb*(1.-smoothstep(-.12,.12,mu))*.7;
 }
 if(bodyCloudReady>.5){vec2 cuv=vec2(fract(uv.x+bodyTime*.000000015),uv.y);float cloud=mapSample(cloudMap,cuv).r;cloud=smoothstep(.12,.9,cloud);col=mix(col,vec3(.82,.9,1.)*(.025+1.5*day),cloud*.88);}
 if(bodyStyle==4.)col+=max(albedo-vec3(.5),vec3(0))*.45;
 if(bodyRing>.5&&abs(bodyLight.y)>.005){vec3 localLight=bodyRotation*bodyLight;float t=-p.y/localLight.y;float r=length((p+localLight*t).xz);if(t>0.&&r>1.24&&r<2.32)col*=.45;}
 return col;
}
vec3 localRadiance(vec3 ray,vec3 background){if(bodyKind<.5)return background;
 vec3 center=bodyCenter;float b=dot(ray,center),disc=1.-dot(center,center)+b*b;float aa=max(fwidth(disc),.0000001);float surfaceT=1.e20;vec3 col=background;
 // Neutron stars: Schwarzschild light bending, Beloborodov (2002) relation for a distant observer,
 // 1 − cos α = (1 − cos ψ)(1 − u), u = Rs/R. The star looks larger by 1/√(1−u) and shows more than half its surface.
 float imp2=max(0.,dot(center,center)-b*b),bmax2=1./max(.05,1.-bodyCompactness);
 if(bodyKind>2.5&&b>0.&&imp2<bmax2){float sinA=sqrt(min(1.,imp2*(1.-bodyCompactness))),cosA=sqrt(max(0.,1.-sinA*sinA)),cosPsi=max(-1.,1.-(1.-cosA)/(1.-bodyCompactness)),sinPsi=sqrt(max(0.,1.-cosPsi*cosPsi));
  vec3 q=ray*b-center;vec3 eHat=length(q)>1.e-7?normalize(q):normalize(cross(ray,vec3(0.,1.,0.)));vec3 normal=cosPsi*normalize(-center)+sinPsi*eHat;nsLimb=cosA;surfaceT=b;
  // Gravitational redshift of the thermal surface: bolometric intensity × g⁴ = (1 − u)².
  vec3 surface=shadeSurface(normal,ray)*pow(1.-bodyCompactness,2.);float dB=bmax2-imp2;col=mix(background,surface,smoothstep(0.,max(fwidth(dB),.0000001),dB));}
 else if(b>0.&&disc>0.){surfaceT=b-sqrt(disc);if(surfaceT<0.)surfaceT=b+sqrt(disc);vec3 normal=normalize(ray*surfaceT-center);eclipseRed=0.;eclipseTint=bodyKind<1.5?primaryStarlight(ray*surfaceT):vec3(1.);vec3 surface=shadeSurface(normal,ray);col=mix(background,surface,smoothstep(0.,aa,disc));}
 // Thin atmosphere: optical depth follows the chord through a spherical shell.
 if(bodyAtmosphere>0.&&b>0.){float R=1.+bodyAtmosphere,ad=R*R-dot(center,center)+b*b;
  if(ad>0.){float hit=b-sqrt(ad);vec3 n=normalize(ray*max(hit,0.)-center);float grazing=pow(1.-abs(dot(n,-ray)),3.);float lighting=.05+.95*max(0.,dot(n,bodyLight));vec3 haze=bodyStyle==1.?vec3(.08,.38,1.):bodyStyle==2.?bodyTint:vec3(.14,.34,.55);float opacity=disc>0.?grazing*.5:min(.65,sqrt(ad)*2.8);col=mix(col,haze*lighting,opacity);}}
 if(bodyRing>.5){vec3 ro=bodyRotation*(-center),rd=bodyRotation*ray;float t=-ro.y/(rd.y+1.e-12);vec3 hit=ro+rd*t;float r=length(hit.xz);
  if(t>0.&&t<surfaceT&&r>1.24&&r<2.32){float edge=smoothstep(1.24,1.27,r)*(1.-smoothstep(2.29,2.32,r));float gap=1.-.94*exp(-pow((r-1.95)/.026,2.));float bands=.62+.12*sin(r*280.)+.08*sin(r*723.)+.08*sin(r*67.);float tau=edge*gap*bands;vec4 ringTex=texture2D(ringMap,vec2(clamp((r-1.24)/1.08,0.,1.),.5),1.5);if(ringReady>.5)tau=ringTex.a*edge*gap;vec3 ringColor=mix(vec3(.35,.29,.2),vec3(.82,.74,.58),smoothstep(1.4,1.8,r));if(ringReady>.5)ringColor=ringTex.rgb;vec3 l=bodyRotation*bodyLight;float along=dot(hit,l),shade=dot(hit,hit)-along*along;float shadow=1.-.88*(1.-smoothstep(.94,1.04,shade))*(1.-smoothstep(-.03,.03,along));col=mix(col,ringColor*(.2+abs(l.y))*shadow,tau);}}
 if((bodyKind==2.||bodyKind==3.||bodyKind==4.)&&b>0.){float impact=sqrt(imp2)/(bodyKind>2.5?sqrt(bmax2):1.);float glow=exp(-max(0.,impact-1.)*6.)*(1.-smoothstep(1.,1.06,1./max(impact,.0001)));col+=bodyTint*glow*(bodyKind==2.?.2+.06*sin(activityTime*.8+impact*9.):.32);
  if(bodyKind>=3.){
   // Radio beams along the magnetic axis, inclined ≈40° to the spin axis: false colour, invisible to the eye.
   // A rotation faster than ≈0.2 s of screen time is shown averaged over the exposure, as a swept hollow cone.
   vec3 axis=transpose(bodyRotation)*normalize(vec3(.58,.76,.28)),spin=transpose(bodyRotation)*vec3(0.,1.,0.);
   if(bodyBeamBlend>.001){float ar=dot(axis,ray),ac=dot(axis,center);float t=(b-ar*ac)/max(.0001,1.-ar*ar);vec3 closest=ray*t-center;float h=dot(closest,axis),distance=length(closest-axis*h);float width=.025+.045*abs(h);float beam=exp(-distance*distance/(width*width))*smoothstep(1.,1.3,abs(h))*(1.-smoothstep(4.,8.,abs(h)));if(t>0.&&t<surfaceT)col+=vec3(.12,.44,.9)*beam*.6*bodyBeamBlend;}
   float thetaM=acos(clamp(abs(dot(axis,spin)),0.,1.));vec3 swept=vec3(0.),lines=vec3(0.);float t0=max(0.,b-8.),dt=16./24.;
   for(int k=0;k<24;k++){float tt=t0+(float(k)+.5)*dt;if(tt>surfaceT)break;vec3 pp=ray*tt-center;float rr=length(pp);if(rr<1.05||rr>8.)continue;
    float th=acos(clamp(abs(dot(pp/rr,spin)),0.,1.)),off=rr*abs(th-thetaM),w=.025+.045*rr;
    swept+=vec3(.12,.44,.9)*exp(-off*off/(w*w))*smoothstep(1.,1.3,rr)*(1.-smoothstep(4.,8.,rr))*(w/(6.2832*max(.05,rr*sin(thetaM))))*dt;
    if(band>5.5){float ct=dot(pp/rr,axis),s2=max(.02,1.-ct*ct),L=rr/s2;vec3 perp=normalize(pp-axis*dot(pp,axis)+vec3(1.e-6));float az=atan(dot(perp,cross(axis,spin)),dot(perp,normalize(spin-axis*dot(spin,axis))));
     float shell=exp(-pow(fract(log(L)*2.2)-.5,2.)*900.),plane=exp(-pow(sin(az*3.),2.)*60.);lines+=vec3(.9,.55,.2)*shell*plane*.08*dt*(1.-smoothstep(6.,8.,rr));}}
   if(t0<surfaceT)col+=swept*(1.-bodyBeamBlend)*2.2+lines;
  }}
 return col;
}
`;
// Planetary maps are decoded and checked by scripts/validate-textures.py.
const textureNames={'moon:Lune':'moon','solar:Terre':'earth','solar:Mercure':'mercury','solar:Vénus':'venus','solar:Mars':'mars','solar:Jupiter':'jupiter','solar:Saturne':'saturn','solar:Uranus':'uranus','solar:Neptune':'neptune'};
export class CloseupModel{
 constructor(uniforms,objects,lut=[]){this.lut=lut;this.u=uniforms;this.objects=objects;this.cache=new Map();this.errors=[];this.id=null;this.family='';this.ready=false;
 const pixel=new T.DataTexture(new Uint8Array([180,180,180,255]),1,1);pixel.needsUpdate=true;this.placeholder=pixel;
 Object.assign(uniforms,{bodyCompactness:{value:0},bodyBeamBlend:{value:1},bodyLimb:{value:.6},bodyGranule:{value:250},bodyConvective:{value:1},bodySpots:{value:1},bodyCenter:{value:new T.Vector3()},bodyLight:{value:new T.Vector3(-.8,.4,1).normalize()},bodyTint:{value:new T.Color(.6,.5,.4)},bodyRotation:{value:new T.Matrix3()},bodyKind:{value:0},bodyStyle:{value:0},bodySeed:{value:0},bodyTime:{value:0},bodyMapReady:{value:0},bodyCloudReady:{value:0},bodyRing:{value:0},bodyAtmosphere:{value:0},bodyPhase:{value:0},activityTime:{value:0},bodyMap:{value:pixel},cloudMap:{value:pixel},nightMap:{value:pixel},nightReady:{value:0},ringMap:{value:pixel},ringReady:{value:0}});}
 texture(name){if(this.cache.has(name))return this.cache.get(name);const entry={ready:false,texture:this.placeholder};this.cache.set(name,entry);new T.TextureLoader().load('./assets/textures/'+name+(name==='saturn-ring'?'.png':'.jpg'),tex=>{tex.colorSpace=name==='earth-clouds'?T.NoColorSpace:T.SRGBColorSpace;tex.wrapS=T.RepeatWrapping;tex.minFilter=T.LinearMipmapLinearFilter;tex.magFilter=T.LinearFilter;tex.anisotropy=name==='saturn-ring'?1:8;entry.texture=tex;entry.ready=true;},undefined,()=>{entry.failed=true;this.errors.push(name);});return entry;}
 // Surface colour from the same CIE-derived black-body table as the sky (chromaticity normalised to its maximum).
 blackbody(temp){return new T.Color(...blackbodyRGB(this.lut,temp));}
 update(o,s){const u=this.u;u.bodyKind.value=0;this.body=null;this.ready=false;this.family='';this.id=o?.id;if(!o||!['planet','moon','star','pulsar'].includes(o.type))return false;
 const ratio=norm(sub(o.lightXYZ||o.xyz,s.pos))/radiusLy(o);if(ratio>160)return false;
 const star=o.type==='star',magnetar=/magn[eé]tar/i.test(o.kind||'');u.bodyKind.value=star?2:o.type==='pulsar'?(magnetar?4:3):1;
 let style=o.skin==='earth'?1: ['gas','saturn','ice','venus'].includes(o.skin)||o.planet?.radiusEarth>3?2:0;
 if(!o.skin&&o.type==='planet'){const name=o.name.toLowerCase();if(/55 cnc|55 cancri|corot-7|kepler-10 b/.test(name))style=4;else if(o.planet?.radiusEarth>1.5&&o.planet?.radiusEarth<3)style=3;}
 if(o.type==='moon'&&o.id!=='moon:Lune')style=o.name==='Titan'?2:o.name==='Io'?4:5;
 u.bodyStyle.value=style;
 // Neutron stars: compactness u = Rs/R for light bending and redshift; beam display averaged when the spin is too fast.
 const ns=o.type==='pulsar';u.bodyCompactness.value=ns?Math.min(.6,2.95325*(o.massSolar||1.4)/(o.radiusKm||12)):0;u.bodyBeamBlend.value=ns?beamBlend(o.periodSeconds||1,s.animateBodies?(s.observationRate||1):(s.paused?0:(s.rate||0)*YEAR)):1;u.bodyRing.value=o.skin==='saturn'?1:0;u.bodyAtmosphere.value=o.skin==='earth'?.025:style===2?.018:style===3?.035:0;
 if(star){const Teff=temperature(o),R=o.radiusSolar||1;u.bodyLimb.value=limbDarkening(Teff);u.bodyGranule.value=Math.max(6,Math.min(250,250/Math.sqrt(R)));u.bodyConvective.value=Teff<6500?1:Teff<8000?(8000-Teff)/1500*.6:0;u.bodySpots.value=Teff<6500&&R<3?1:0;}
 const tint=star? this.blackbody(temperature(o)):new T.Color(magnetar?0xff9462:o.type==='pulsar'?0x89c8ff:style===3?0x759b82:style===4?0x63504a:style===5?0xb2ced5:0xa69178);if(o.name==='Titan')tint.set(0xd7a85d);if(o.name==='Io')tint.set(0xcabd6d);if(o.name==='Ganymède')tint.set(0x8c8580);if(o.id==='moon:Lune')tint.set(0x9b968f);u.bodyTint.value.copy(tint);
 u.bodyCenter.value.set(...sub(o.lightXYZ||o.xyz,s.pos)).divideScalar(radiusLy(o));u.bodySeed.value=hash(o.id)%1000;u.bodyTime.value=s.animateBodies?s.observationTime:s.t*YEAR;u.activityTime.value=s.animateBodies?s.visualWall:s.t*YEAR;
 // Solar-system bodies: IAU pole and prime meridian at the mission date (TDB); the optional observation clock
 // adds pedagogical spin only to the surface, never to the body centre. Other bodies: illustrative axes.
 const name=textureNames[o.id],seconds=s.animateBodies?s.observationTime:s.t*YEAR,key=o.ephemeris||(o.id==='h0'?'Soleil':null);let phase;
 if(key&&hasIAU(key)){const jd=yearToJD(EPOCH+s.t)+(s.animateBodies?s.observationTime/86400:0),earth=key==='Lune'&&this.objects.find(x=>x.id==='solar:Terre'),f=bodyFrame(key,jd,earth?sub(earth.xyz,o.xyz):null);u.bodyRotation.value.set(...f[0],...f[1],...f[2]);phase=Math.atan2(f[0][1],f[0][0]);}
 else{phase=o.type==='pulsar'?seconds*2*Math.PI/(o.periodSeconds||1):seconds*2*Math.PI/(star?2160000:86400);const north=new T.Vector3(0,-.39778,.91748);const q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),north);q.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),phase));u.bodyRotation.value.setFromMatrix4(new T.Matrix4().makeRotationFromQuaternion(q)).transpose();}
 this.phase=phase;
 // Illumination comes from the star of the system: climb the parent chain (moon → planet → star).
 let host=this.objects.find(x=>x.id===o.parent);for(let k=0;host&&host.type!=='star'&&k<4;k++)host=this.objects.find(x=>x.id===host.parent);host=host||this.objects.find(x=>x.id==='h0');let light=host?sub(host.xyz,o.xyz):[-.8,.4,1];if(star||norm(light)<1e-15)light=[-.8,.4,1];u.bodyLight.value.set(...unit(light));
 u.bodyMapReady.value=0;u.bodyCloudReady.value=0;u.nightReady.value=0;u.ringReady.value=0;if(name==='saturn'){const ring=this.texture('saturn-ring');u.ringMap.value=ring.texture;u.ringReady.value=+ring.ready;}
 if(name){const entry=this.texture(name);u.bodyMap.value=entry.texture;u.bodyMapReady.value=+entry.ready;this.ready=entry.ready;
  if(name==='earth'){const clouds=this.texture('earth-clouds'),night=this.texture('earth-night');u.cloudMap.value=clouds.texture;u.bodyCloudReady.value=+clouds.ready;u.nightMap.value=night.texture;u.nightReady.value=+night.ready;}
 }else this.ready=true;
 this.family=star?'photosphère':o.type==='pulsar'?(magnetar?'magnétar · interprétation':'pulsar · interprétation'):name?'cartographie planétaire':style===3?'monde océanique hypothétique':style===4?'monde de lave hypothétique':style===2?'atmosphère gazeuse reconstituée':'surface reconstituée';this.body=o;return true;
 }
}
