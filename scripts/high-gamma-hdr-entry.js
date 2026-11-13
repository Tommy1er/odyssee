// Test-only controlled-source bench, using the production vertex/fragment and HDR render method.
import * as T from 'three';
import {GalaxySpectralOverlay} from '../src/galaxy-spectral-overlay.js';
import {dopplerU,aberrateU,unit} from '../src/physics.js';
import {PIXEL_SR} from '../src/photometry.js';
const renderer=new T.WebGLRenderer({antialias:false});renderer.setPixelRatio(1);renderer.setSize(128,128);document.body.append(renderer.domElement);renderer.setClearColor(0,0);
const camera=new T.PerspectiveCamera(40,1,.1,2000),pix=2*Math.tan(20*Math.PI/180)/128,pixScale=PIXEL_SR/pix**2;
// I_nu ∝ nu², so at a fixed observer band radiance ∝ D and point flux ∝ D^-1.
// This synthetic power-law source is an analytic test fixture, not an empirical galaxy spectrum.
const lutData=new Float32Array(512*4);for(let i=0;i<512;i++){lutData.set([1,1,1,Math.log(100)+Math.log(1e4)*i/511],4*i);}
const lut=new T.DataTexture(lutData,512,1,T.RGBAFormat,T.FloatType);lut.minFilter=lut.magFilter=T.LinearFilter;lut.needsUpdate=true;
const source={status:'ready',rows:[{}],points:{geometry:new T.BufferGeometry()},material:{uniforms:{lut:{value:lut},pix:{value:pix},avScale:{value:1},band:{value:1},gain:{value:1}}}};
const overlay=new GalaxySpectralOverlay(source),sed=new Float32Array(257*8*4);for(let c=0;c<8;c++)for(let i=0;i<257;i++){const D=.72+.37*i/256;sed.set([1,1,1,D**-3],4*(c*257+i));}
const sedTex=new T.DataTexture(sed,257,8,T.RGBAFormat,T.FloatType);sedTex.minFilter=sedTex.magFilter=T.LinearFilter;sedTex.needsUpdate=true;overlay.material.uniforms.sedLut.value=sedTex;
function half(v){return T.DataUtils.fromHalfFloat(v);}
function runCase(gamma,n,label){
 const u=[Math.sqrt((gamma-1)*(gamma+1)),0,0],D=dopplerU(n,u),direction=aberrateU(n,u),expectedSum=16;
 const flux0=expectedSum*D/(.818*pixScale),vmag=3-2.5*Math.log10(flux0),geo=source.points.geometry;
 const attrs={position:{array:n.map(x=>x*10),size:3},vmag:{array:[vmag]},dcat:{array:[10]},rad:{array:[0]},temp:{array:[1e9]},shown:{array:[1]},avfg:{array:[0]},dsun:{array:[1]},dship:{array:[1]},sclass:{array:[0]}};
 for(const [name,a] of Object.entries(attrs))geo.setAttribute(name,new T.Float32BufferAttribute(a.array,a.size||1));
 camera.up.set(0,0,1);camera.lookAt(new T.Vector3(...direction));camera.updateMatrixWorld();
 overlay.render(renderer,camera,u,true);const data=new Uint16Array(128*128*4);renderer.readRenderTargetPixels(overlay.target,0,0,128,128,data);
 let sum=0,x=0,y=0,max=0,nonfinite=0;for(let i=0;i<128*128;i++){const v=half(data[i*4]);if(!Number.isFinite(v)){nonfinite++;continue;}sum+=v;x+=(i%128+.5)*v;y+=(Math.floor(i/128)+.5)*v;max=Math.max(max,v);}
 return {gamma,label,doppler:D,expectedSum,sum,relativeFluxError:sum/expectedSum-1,centroid:sum?[x/sum,y/sum]:null,centerErrorPixels:sum?Math.hypot(x/sum-64,y/sum-64):null,nonfinite,max};
}
window.runHighGammaHDR=()=>{const rows=[];for(const g of [1,100,1000,1e6]){for(const [label,n] of [['forward',[1,0,0]],['rear',[-1,0,0]],['transverse',[0,1,0]]])rows.push(runCase(g,n,label));if(g>1)for(const q of [.1,1,10]){const theta=q/g;rows.push(runCase(g,unit([-Math.cos(theta),Math.sin(theta),0]),'rear cone '+q+'/gamma'));}}
 return {scope:'Synthetic I_nu proportional to nu²; production point-galaxy HDR shader, axis-aligned boost, no exposure or tonemapping; not empirical extreme-gamma sky or hardware performance',renderer:renderer.getContext().getParameter(renderer.getContext().RENDERER),rows};};
