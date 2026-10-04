import {mapPoints} from './map-points.js';
import * as T from 'three';
import {galactic,equatorial,sub,add,norm,EQ_TO_GAL} from './physics.js';
export const R0=26996;
const ra=266.416816625*Math.PI/180,dec=-29.0078249722*Math.PI/180;
export const GAL_CENTER=[R0*Math.cos(dec)*Math.cos(ra),R0*Math.cos(dec)*Math.sin(ra),R0*Math.sin(dec)];
export const GC_GAL=galactic(GAL_CENTER);
export function galactocentric(p){let g=galactic(p);return [GC_GAL[0]-g[0],g[1]-GC_GAL[1],g[2]-GC_GAL[2]];}
export function fromGalactocentric(p){return equatorial([GC_GAL[0]-p[0],GC_GAL[1]+p[1],GC_GAL[2]+p[2]]);}
export function region(p){let [x,y,z]=galactocentric(p),r=Math.hypot(x,y);if(norm(p)>10000000)return 'Grandes structures · espace intergalactique';if(norm(p)>1000000)return 'Groupe local · espace intergalactique';if(norm(p)>300000)return 'Périphérie du Groupe local';return Math.abs(z)>5000?'Halo galactique':r>50000?'Extérieur du disque':r<800?'Région nucléaire':r<7000?'Bulbe et barre centrale':Math.abs(z)>1200?'Disque épais':r>35000?'Disque externe':Math.hypot(x-R0,y)<5000?'Bras local · Orion':'Disque et bras spiraux';}
export const densityGLSL=`
uniform float modelTime;
float spiral(vec3 p){float r=length(p.xy);float a=atan(p.y,p.x);float phase=4.*(a-log(max(r,2.)/8.)/tan(.21));return pow(.5+.5*cos(phase),7.)*smoothstep(3.,8.,r);}
vec3 populations(vec3 p){float r=length(p.xy),z=abs(p.z);float edge=1.-smoothstep(44.,53.,r);float thin=exp(-r/9.)*exp(-z/.30)*edge;float thick=.07*exp(-r/8.)*exp(-z/1.2)*edge;float c=.891,s=.454;vec3 b=vec3(c*p.x+s*p.y,-s*p.x+c*p.y,p.z);float bar=.9*exp(-length(b/vec3(7.5,2.5,1.5)));float bulge=1.1*exp(-length(p/vec3(2.8,2.8,2.1)));float halo=.0001/pow(1.+length(p)/4.,2.7);return vec3(thin*(.6+2.3*spiral(p))+thick,bar+bulge,halo);}
float dustAt(vec3 p){float r=length(p.xy);float holes=.65+.35*sin(p.x*1.4+sin(p.y*.8))*sin(p.y*1.2);return 1.7*exp(-r/14.)*exp(-abs(p.z)/.10)*(.2+spiral(p))*holes*(1.-smoothstep(46.,53.,r));}
float opticalDepth(vec3 a,vec3 b){vec3 d=b-a;float l=length(d);float sum=0.;for(int i=0;i<8;i++)sum+=dustAt(a+d*((float(i)+.5)/8.));return min(40.,sum*l/8.);}
vec3 eqToGal(vec3 p){return vec3(dot(p,vec3(-.0548755604,-.8734370902,-.4838350155)),dot(p,vec3(.4941094279,-.4448296300,.7469822445)),dot(p,vec3(-.8676661490,-.1980763734,.4559837762)));}
vec3 galCentre(vec3 p){vec3 g=eqToGal(p)/1000.;return vec3(${GC_GAL[0]/1000}-g.x,g.y-(${GC_GAL[1]/1000}),g.z-(${GC_GAL[2]/1000}));}
vec3 aberrateDir(vec3 n,vec3 v){float b=length(v);if(b<.000001)return n;vec3 e=v/b;float g=inversesqrt(1.-b*b),mu=dot(n,e);return (n+e*((g-1.)*mu+g*b))/(g*(1.+b*mu));}
`;
export const galaxyFragment=`precision highp float;varying vec3 ray;uniform vec3 observer;uniform vec3 speed;uniform float optics;uniform float band;uniform float exposure;uniform float enabled;${densityGLSL}
vec3 radiance(vec3 orig,vec3 n){vec3 sum=vec3(0);float trans=1.;vec3 bounds=vec3(60.,60.,band==5.?42.:8.);vec3 safeN=n+vec3(.00000001);vec3 t1=(-bounds-orig)/safeN,t2=(bounds-orig)/safeN;vec3 lower=min(t1,t2),upper=max(t1,t2);float lo=max(0.,max(lower.x,max(lower.y,lower.z))),hi=min(upper.x,min(upper.y,upper.z));if(hi<=lo)return sum;float ds=(hi-lo)/112.;for(int i=0;i<112;i++){float t=lo+(float(i)+.5)*ds;vec3 p=orig+n*t;float phase=-6.2831853*(modelTime-t*1000.)/225000000.;vec3 evolved=vec3(cos(phase)*p.x-sin(phase)*p.y,sin(phase)*p.x+cos(phase)*p.y,p.z);vec3 rho=populations(evolved);float tau=dustAt(p)*ds;float ir=band==2.?.08:band>=3.?0.:1.;trans*=exp(-tau*ir);vec3 emission=rho.x*mix(vec3(.67,.72,1.),vec3(.85,.70,.49),.6)+rho.y*vec3(1.,.70,.42)+rho.z*vec3(.6,.7,.95);
if(band==2.)emission=(rho.x+rho.y)*vec3(.96,.55,.25)+rho.z;
if(band==3.){float fil=exp(-length(p/vec3(.8,1.2,.8)))*pow(.5+.5*cos(p.y*38.+p.z*5.),12.);emission=dustAt(p)*vec3(.17,.55,.65)+fil*vec3(.6,1.,.8);}
if(band==4.)emission=rho.y*.2*vec3(.35,.45,1.)+exp(-length(p/vec3(2.,3.,6.)))*vec3(.28,.05,.35);
if(band==5.){vec3 q=p;q.z=abs(p.z)-13.;float ell=length(q/vec3(7.,7.,12.));float bubble=exp(-pow((ell-.9)/.15,2.));emission=bubble*.16*vec3(.46,.16,.85)+rho.x*.08*vec3(.2,.45,.7);}
sum+=emission*ds*trans;if(trans<.001)break;}return sum;}
void main(){vec3 n=normalize(ray);if(optics>.5)n=aberrateDir(n,-speed);vec3 g=eqToGal(n);g.x=-g.x;vec3 L=radiance(galCentre(observer),g)*exposure*.32;float b=length(speed);if(optics>.5&&b>.00001){float D=(1.+dot(n,speed))*inversesqrt(1.-b*b);L*=pow(D,4.);}
vec3 col=1.-exp(-L);if(band<.5){float y=dot(col,vec3(.2126,.7152,.0722));col=mix(vec3(y),col,.22);}gl_FragColor=vec4(pow(max(col,vec3(0)),vec3(1./2.2))*enabled,1.);}`;
export function createGalaxySphere(){
 const vertex='varying vec3 ray;void main(){ray=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',uniforms={observer:{value:new T.Vector3()},speed:{value:new T.Vector3()},optics:{value:0},band:{value:1},exposure:{value:2},enabled:{value:1},modelTime:{value:0}};
 const target=new T.WebGLCubeRenderTarget(128,{type:T.HalfFloatType,minFilter:T.LinearFilter,generateMipmaps:false}),cube=new T.CubeCamera(.1,2500,target),scene=new T.Scene();
 const raw=galaxyFragment.replace('vec3 col=1.-exp(-L);if(band<.5){float y=dot(col,vec3(.2126,.7152,.0722));col=mix(vec3(y),col,.22);}gl_FragColor=vec4(pow(max(col,vec3(0)),vec3(1./2.2))*enabled,1.);','gl_FragColor=vec4(L,1.);');
 const source=new T.ShaderMaterial({vertexShader:vertex,fragmentShader:raw,uniforms:T.UniformsUtils.clone(uniforms),side:T.BackSide,depthWrite:false});source.uniforms.exposure.value=1;scene.add(new T.Mesh(new T.SphereGeometry(1900,24,16),source));
 uniforms.sky={value:target.texture};const material=new T.ShaderMaterial({vertexShader:vertex,fragmentShader:`varying vec3 ray;uniform samplerCube sky;uniform float enabled;void main(){gl_FragColor=vec4(textureCube(sky,normalize(ray)).rgb*enabled,1.);}`,uniforms,side:T.BackSide,depthWrite:false,depthTest:false});
 const mesh=new T.Mesh(new T.SphereGeometry(1900,24,16),material);mesh.renderOrder=-20;mesh.frustumCulled=false;let lastPos=null,lastBand=-1,lastWall=-10,lastTime=-1;
 mesh.bake=(renderer,s)=>{if(s.map)return;const moved=!lastPos||norm(sub(s.pos,lastPos))>.05;if(lastBand!==s.band||(moved||Math.abs(s.t-lastTime)>100)&&s.wall-lastWall>.4){source.uniforms.modelTime.value=s.t;lastTime=s.t;source.uniforms.observer.value.set(...s.pos);source.uniforms.band.value=s.band;cube.update(renderer,scene);lastPos=[...s.pos];lastBand=s.band;lastWall=s.wall;}};return mesh;
}
export function makePopulation(count=65000){let seed=416124;const rnd=()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return (seed+.5)/4294967296;};const normal=()=>Math.sqrt(-2*Math.log(rnd()))*Math.cos(6.283185*rnd());const positions=[],colors=[];
 for(let i=0;i<count;i++){let x,y,z,young=false;const pop=rnd();if(pop<.64){const r=Math.min(51000,-8500*Math.log(rnd()*rnd())),arm=i%4;let theta=Math.log(Math.max(3000,r)/8000)/Math.tan(.21)+arm*Math.PI/2+normal()*.10;if(rnd()<.3)theta=rnd()*Math.PI*2;x=r*Math.cos(theta);y=r*Math.sin(theta);z=normal()*(rnd()<.1?1000:250);young=true;}else if(pop<.97){let bx=normal()*4800,by=normal()*1300;x=.891*bx-.454*by;y=.454*bx+.891*by;z=normal()*1100;}else{const r=Math.min(120000,10000/Math.sqrt(rnd())),a=rnd()*6.283,u=rnd()*2-1;x=r*Math.sqrt(1-u*u)*Math.cos(a);y=r*Math.sqrt(1-u*u)*Math.sin(a);z=r*u;}positions.push(...fromGalactocentric([x,y,z]));colors.push(...(young?[.50+rnd()*.4,.60+rnd()*.3,.95]:[1.,.63+rnd()*.2,.38+rnd()*.2]));}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));return new T.Points(geometry,mapPoints(2,.5));}
