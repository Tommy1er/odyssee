// Units: Julian year, light-year, c=1; inertial Sun-centred catalogue axes.
export const C=299792458,YEAR=31557600,LY=C*YEAR,AU=149597870700/LY,G1=9.80665*YEAR/C,LIMIT=1;
export const add=(a,b)=>a.map((v,i)=>v+b[i]),sub=(a,b)=>a.map((v,i)=>v-b[i]),mul=(a,s)=>a.map(v=>v*s),dot=(a,b)=>a.reduce((n,v,i)=>n+v*b[i],0),norm=a=>Math.hypot(...a),unit=a=>norm(a)>1e-30?mul(a,1/norm(a)):[1,0,0];
export const gamma=b=>1/Math.sqrt((1-b)*(1+b)),gammaU=u=>Math.hypot(1,...u),velocity=u=>mul(u,1/gammaU(u));
export const gammaMinusOne=u=>dot(u,u)/(gammaU(u)+1);
export const betaGap=u=>1/(gammaU(u)*(gammaU(u)+norm(u)));
export function aberrateU(n,u){const m=norm(u);if(m<1e-14)return [...n];const e=mul(u,1/m),g=gammaU(u),mu=Math.max(-1,Math.min(1,dot(n,e))),D=g*Math.max(0,1+mu)-mu/(g+m);return unit(add(mul(sub(n,mul(e,mu)),1/D),mul(e,(g*Math.max(0,1+mu)-1/(g+m))/D)));}
export function aberrate(n,v){return aberrateU(n,mul(v,gamma(norm(v))));}
export const dopplerU=(n,u)=>{const m=norm(u),g=gammaU(u);if(m<1e-14)return 1;const mu=Math.max(-1,Math.min(1,dot(n,u)/m));return g*Math.max(0,1+mu)-mu/(g+m);};
export const doppler=(n,v)=>dopplerU(n,mul(v,gamma(norm(v))));
export const EQ_TO_GAL=[[-.0548755604,-.8734370902,-.4838350155],[.4941094279,-.4448296300,.7469822445],[-.8676661490,-.1980763734,.4559837762]];
export const galactic=p=>EQ_TO_GAL.map(row=>dot(row,p));
export const equatorial=p=>[0,1,2].map(j=>EQ_TO_GAL.reduce((s,row,i)=>s+row[j]*p[i],0));
export function ecliptic(p){const e=23.4392911*Math.PI/180;return [p[0],p[1]*Math.cos(e)+p[2]*Math.sin(e),-p[1]*Math.sin(e)+p[2]*Math.cos(e)];}
export function coords(p){const d=norm(p),g=galactic(p),e=ecliptic(p);return {d,l:(Math.atan2(g[1],g[0])*180/Math.PI+360)%360,b:d?Math.asin(Math.max(-1,Math.min(1,g[2]/d)))*180/Math.PI:0,gal:g,ecl:e,eq:p};}
export function plan(distance,cap=LIMIT,a=G1){distance=Math.max(0,distance);const xa=Math.min(distance/2,cap<1?(gamma(cap)-1)/a:Infinity),q=a*xa,gp=1+q,u=Math.sqrt(q*(2+q)),b=u/gp,ta=u/a,pa=Math.asinh(u)/a,xc=Math.max(0,distance-2*xa),tc=b?xc/b:0;return {distance,a,gp,u,b,xa,ta,pa,xc,tc,t:2*ta+tc,tau:2*pa+tc/gp};}
export function sample(p,t){t=Math.max(0,Math.min(p.t,t));if(t<=p.ta){const u=p.a*t,g=Math.hypot(1,u);return {x:u*u/((g+1)*p.a),u,tau:Math.asinh(u)/p.a,phase:'ACCÉLÉRATION · 1 g'};}if(t<=p.ta+p.tc)return {x:p.xa+(t-p.ta)*p.b,u:p.u,tau:p.pa+(t-p.ta)/p.gp,phase:'CROISIÈRE · LIMITEUR'};const q=p.t-t,u=p.a*q,g=Math.hypot(1,u);return {x:p.distance-u*u/((g+1)*p.a),u,tau:p.tau-Math.asinh(u)/p.a,phase:t>=p.t?'ARRIVÉE · AU REPOS':'FREINAGE · 1 g'};}
// Exact constant catalogue force dp/(m dt); u=gamma*v/c avoids rounding beta to 1.
export function integrate(pos,u,dt,force=[0,0,0],cap=LIMIT){let A=norm(force),g=gammaU(u);if(A<1e-20)return {pos:add(pos,mul(u,dt/g)),u:[...u],tau:dt/g};const e=mul(force,1/A),w=dot(u,e),up=sub(u,mul(e,w)),h=Math.hypot(1,...up);let w1=w+A*dt,active=dt;if(cap<1){const umax=gamma(cap)*cap,allowed=Math.sqrt(Math.max(0,umax*umax-dot(up,up)));if(w1>allowed){active=Math.max(0,(allowed-w)/A);w1=w+A*active;}}
 const dtau=(Math.asinh(w1/h)-Math.asinh(w/h))/A,g1=Math.hypot(h,w1),dx=add(mul(e,(w1-w)*(w1+w)/((g1+g)*A)),mul(up,dtau)),u1=add(up,mul(e,w1));let out={pos:add(pos,dx),u:u1,tau:dtau};if(active<dt){const rest=dt-active;out.pos=add(out.pos,mul(u1,rest/g1));out.tau+=rest/g1;}return out;}
// Direction refers to catalogue axes; scale force so invariant proper acceleration is 1g.
export function integrateProper(pos,u,dt,acc=[0,0,0],cap=LIMIT){const e=unit(acc),up=sub(u,mul(e,dot(u,e)));return integrate(pos,u,dt,mul(acc,1/Math.hypot(1,...up)),cap);}
export const stopDistance=u=>gammaMinusOne(u)/G1;
export const schwarzschildRadiusKm=m=>2*6.67430e-11*m*1.98847e30/(C*C)/1000;
export const gravitationalRate=rOverRs=>Math.sqrt(1-1/rOverRs);
export const energyPerKg=u=>gammaMinusOne(u)*C*C;
export function environmentRisk(u,density=.1,grainMg=1){const g=gammaU(u),m=norm(u),ek=energyPerKg(u),D=g+m;return {grainJ:ek*grainMg*1e-6,grainTNT:ek*grainMg*1e-6/4.184e9,protonMeV:gammaMinusOne(u)*938.272088,gasFlux:density*1e6*m*C,gasPower:density*1e6*m*C*1.67262192369e-27*ek,cmbFrontK:2.7255*D,forwardD:D,rearD:1/D};}
