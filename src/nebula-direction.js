// Integrate the existing procedural emissivity/absorption model along parallel rays.
// observer is cloud -> observer in the cloud's local frame (+z = Earth).
import {makeField,REDDEN,lum} from './nebulae.js';
export function directionalRGB(c,observer,{n=24,steps=64}={}){
 const len=Math.hypot(...observer);if(!(len>0))throw Error('Observer direction required');
 const z=observer.map(x=>x/len),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
 let x=cross(Math.abs(z[2])<.9?[0,0,1]:[0,1,0],z);const xl=Math.hypot(...x);x=x.map(v=>v/xl);const y=cross(z,x);
 const F=makeField(c.shape,c.seed),R=1.1,dA=(2*R/n)**2,rgb=[0,0,0];
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){
  const a=-R+(i+.5)*2*R/n,b=-R+(j+.5)*2*R/n,h2=R*R-a*a-b*b;if(h2<=0)continue;
  const h=Math.sqrt(h2),ds=2*h/steps,T=[1,1,1];
  for(let k=0;k<steps;k++){
   const t=h-(k+.5)*ds,p=z.map((v,l)=>v*t+x[l]*a+y[l]*b),den=F.density(...p);
   if(den<1e-5&&c.shape!==1&&!c.contShape)continue;
   const f=F.hiFrac(c.zone,...p,den),e=F.emit(...p,den,f),cd=c.contShape?F.contDensity(...p):e;
   if(e<1e-5&&cd<1e-5)continue;
   for(let l=0;l<3;l++){const tau=c.kTau*den*ds*REDDEN[l];rgb[l]+=(c.Kl*e*(c.loC[l]+(c.hiC[l]-c.loC[l])*f)+c.Kc*cd*c.contC[l])*ds*T[l]*Math.exp(-tau/2)*dA/c.J;T[l]*=Math.exp(-tau);}
  }
 }
 return rgb;
}
