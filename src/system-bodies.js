// Several bodies at once: the primary body (closeup.js, full detail) plus up to SECONDARY_COUNT secondary bodies
// intersected per screen pixel, and eclipses/shadows between all of them.
// Positions are differences computed in double precision on the CPU (body − ship, light-years) and converted to
// light-seconds before reaching the GPU: from the Earth–Moon pair (1.3 ls) to the Sun at 30 au (15 000 ls), float32
// keeps relative errors near 1e-7, far below a pixel. Nothing absolute (galactic coordinates) reaches the shader.
import * as T from "three";
import { sub, norm, unit, YEAR } from "./physics.js";
import { radiusLy } from "./body-data.js";
import { blackbodyRGB, limbDarkening } from "./stellar-physics.js";
import { temperature } from "./stellar-light.js";
import { EPOCH } from "./ephemeris.js";
import { yearToJD } from "./solar-ephemeris.js";
import { bodyFrame, hasIAU } from "./iau-rotation.js";

export const SECONDARY_COUNT = 7;
const N = SECONDARY_COUNT;
// Mean visible albedo colours (linear RGB, rough disc averages) for unresolved or untextured bodies.
const MEAN_COLOR = {
  "solar:Mercure": [0.19, 0.17, 0.15], "solar:Vénus": [0.85, 0.75, 0.55], "solar:Terre": [0.3, 0.36, 0.48],
  "solar:Mars": [0.45, 0.24, 0.13], "solar:Jupiter": [0.62, 0.55, 0.45], "solar:Saturne": [0.66, 0.58, 0.42],
  "solar:Uranus": [0.55, 0.75, 0.8], "solar:Neptune": [0.35, 0.5, 0.8], "moon:Lune": [0.15, 0.14, 0.13],
  "moon:Io": [0.7, 0.62, 0.35], "moon:Europe": [0.7, 0.66, 0.6], "moon:Ganymède": [0.45, 0.42, 0.4],
  "moon:Titan": [0.5, 0.36, 0.18], "moon:Encelade": [0.95, 0.95, 0.95], "moon:Triton": [0.75, 0.7, 0.68],
};
const TEXTURE = { "moon:Lune": "moon", "solar:Terre": "earth", "solar:Mercure": "mercury", "solar:Vénus": "venus", "solar:Mars": "mars", "solar:Jupiter": "jupiter", "solar:Saturne": "saturn", "solar:Uranus": "uranus", "solar:Neptune": "neptune" };

export const systemGLSL = `
#define SECN ${N}
uniform float secCount,pixelAngle,lightOn,lightRadius,primaryRadiusLs,primaryOccluder,primaryAtm,secMapReady0,secMapReady1,lightLimb;
uniform vec3 lightPos,primaryPos;
uniform vec3 secCenter[SECN],secColor[SECN];uniform float secRadius[SECN],secKind[SECN],secSlot[SECN],secAtm[SECN];uniform mat3 secRot[SECN];
uniform sampler2D secMap0,secMap1;
float discOverlap(float r1,float r2,float d){if(d>=r1+r2)return 0.;float rm=min(r1,r2);if(d<=abs(r1-r2))return 3.14159265*rm*rm;
 float a=clamp((d*d+r1*r1-r2*r2)/(2.*d*r1),-1.,1.),b=clamp((d*d+r2*r2-r1*r1)/(2.*d*r2),-1.,1.);
 return r1*r1*acos(a)+r2*r2*acos(b)-.5*sqrt(max(0.,(-d+r1+r2)*(d+r1-r2)*(d-r1+r2)*(d+r1+r2)));}
// Light from the star disc reaching P (light-seconds from the ship), after occultation by the other bodies.
// self = −1 for the primary, k for secondary k. Earth's atmosphere refracts ~1e-4 of the light, reddened, into its shadow
// (a totally eclipsed Moon is ~10⁴ times fainter than the full Moon). eclipseRed tells the shading how deep in it P is.
vec3 starlightAt(vec3 P,float self){
 eclipseRed=0.;if(lightOn<.5)return vec3(1.);
 vec3 S=lightPos-P;float ds=length(S),as=lightRadius/ds;vec3 sh=S/ds;float lit=1.,refr=0.;
 for(int j=-1;j<SECN;j++){vec3 C;float R,atm;
  if(j<0){if(primaryOccluder<.5||self<-.5)continue;C=primaryPos;R=primaryRadiusLs;atm=primaryAtm;}
  else{if(float(j)>=secCount)break;if(abs(float(j)-self)<.5||(secKind[j]>1.5&&secKind[j]<2.5))continue;C=secCenter[j];R=secRadius[j];atm=secAtm[j];}
  vec3 J=C-P;float dj=length(J);if(dj<=R)continue;float along=dot(J,sh);if(along<=0.||along>ds)continue;
  vec3 jh=J/dj;float f=discOverlap(as,R/dj,atan(length(cross(sh,jh)),dot(sh,jh)))/(3.14159265*as*as);
  lit*=1.-clamp(f,0.,1.);refr=max(refr,atm*f);}
 eclipseRed=refr;return vec3(lit)+vec3(1.,.42,.16)*1.e-4*refr;}
vec3 secAlbedo(int k,vec3 n){vec2 uv=sphereUV(n);
 if(secSlot[k]>-.5&&secSlot[k]<.5&&secMapReady0>.5)return mapSample(secMap0,uv).rgb;
 if(secSlot[k]>.5&&secMapReady1>.5)return mapSample(secMap1,uv).rgb;
 return secColor[k]*(.78+.44*terrain(n*5.+float(k)*7.31));}
// Nearest resolved secondary along the ray (light-seconds), its colour and edge coverage. Unresolved bodies are drawn as
// photometric points whose integrated flux equals the disc's: L_mean·(a/σ)²·exp(−θ²/σ²), σ = one pixel.
bool secondaryHit(vec3 ray,inout vec3 behindGlow,inout vec3 frontGlow,out float hitT,out vec3 hitCol,out float hitA){
 hitT=1.e20;hitCol=vec3(0.);hitA=0.;bool any=false;float primaryDist=length(primaryPos);
 for(int k=0;k<SECN;k++){if(float(k)>=secCount)break;
  float R=secRadius[k];vec3 C=secCenter[k];float d=length(C);vec3 c=C/R;float b=dot(ray,c);if(b<=0.)continue;
  vec3 q=c-ray*b;float q2=dot(q,q),a=R/d;bool star=secKind[k]>1.5&&secKind[k]<2.5;
  if(star&&a<pixelAngle*.7)continue;
  if(a<pixelAngle*.7){float th2=q2/(b*b),s2=pixelAngle*pixelAngle;if(th2>9.*s2)continue;
   vec3 Lmean;if(star)Lmean=secColor[k]*1.2*(1.-lightLimb/3.);
   else{vec3 toL=normalize(lightPos-C),toO=normalize(-C);float ph=acos(clamp(dot(toL,toO),-1.,1.));
    Lmean=secColor[k]*(1.5*2./3.)*(sin(ph)+(3.14159265-ph)*cos(ph))/3.14159265*starlightAt(C,float(k));}
   vec3 glow=Lmean*(a*a/s2)*exp(-th2/s2);if(primaryDist>0.&&d<primaryDist)frontGlow+=glow;else behindGlow+=glow;continue;}
  // Rings of a ringed secondary (Saturn): plane y = 0 of its body frame, 1.24–2.32 radii.
  float tRing=1.e20;vec4 ring=vec4(0.);
  if(secKind[k]>2.5){vec3 ro=secRot[k]*(-c),rd=secRot[k]*ray;float t=-ro.y/(rd.y+1.e-12);vec3 h=ro+rd*t;float r=length(h.xz);
   if(t>0.&&r>1.24&&r<2.32){float edge=smoothstep(1.24,1.27,r)*(1.-smoothstep(2.29,2.32,r)),gap=1.-.94*exp(-pow((r-1.95)/.026,2.));vec4 tex=texture2D(ringMap,vec2(clamp((r-1.24)/1.08,0.,1.),.5));
    float tau=ringReady>.5?tex.a*edge*gap:edge*gap*.7;vec3 rc=ringReady>.5?tex.rgb:mix(vec3(.35,.29,.2),vec3(.82,.74,.58),smoothstep(1.4,1.8,r));
    vec3 l=secRot[k]*normalize(lightPos-C);ring=vec4(rc*(.2+abs(l.y))*starlightAt(ray*t*R,float(k)).g,tau);tRing=t*R;}}
  float disc=1.-q2;vec3 col=vec3(0.);float cov=0.,t=1.e20;
  if(disc>-2.*pixelAngle*b){t=(b-sqrt(max(disc,0.)))*R;cov=smoothstep(-pixelAngle*b,pixelAngle*b,disc);
   vec3 N=normalize(ray*(t/R)-c);float mu=max(0.,dot(N,-ray));
   if(star)col=secColor[k]*(1.-lightLimb*(1.-mu))*1.2;
   else{vec3 P=ray*t;vec3 Ldir=normalize(lightPos-P);float day=max(0.,dot(N,Ldir));vec3 sl=day>0.?starlightAt(P,float(k)):vec3(0.);
    col=secAlbedo(k,secRot[k]*N)*(.012*mix(vec3(1.),vec3(1.,.42,.16)*1.7,eclipseRed*smoothstep(0.,.08,day))+1.5*day*sl);
    if(secAtm[k]>.5){float grazing=pow(1.-mu,3.);col=mix(col,vec3(.08,.38,1.)*day*sl,grazing*.5);}}}
  // Over-compositing of ring and sphere in depth order, expressed as one colour and one coverage.
  if(ring.a>0.){float aS=cov,aR=ring.a,A=1.-(1.-aS)*(1.-aR);vec3 C2=tRing<t?(col*aS*(1.-aR)+ring.rgb*aR):(ring.rgb*aR*(1.-aS)+col*aS);col=C2/max(A,1.e-6);cov=A;t=min(t,tRing);}
  if(cov>0.&&t<hitT){hitT=t;hitCol=col;hitA=cov;any=true;}}
 return any;}
// Composition with the primary body: depth order by distance along the ray.
vec3 systemRadiance(vec3 ray,vec3 L){vec3 front=vec3(0.);float t,a;vec3 c;
 bool hit=secCount>.5&&secondaryHit(ray,L,front,t,c,a);
 if(bodyKind<.5)return (hit?mix(L,c,a):L)+front;
 float tp=1.e20,bp=dot(ray,bodyCenter),dp=1.-dot(bodyCenter-ray*bp,bodyCenter-ray*bp);if(bp>0.&&dp>0.)tp=(bp-sqrt(dp))*primaryRadiusLs;
 if(hit&&t<tp)return mix(localRadiance(ray,L),c,a)+front;
 return localRadiance(ray,hit?mix(L,c,a):L)+front;}
`;

export class SystemBodies {
  constructor(uniforms, objects, closeup) {
    this.u = uniforms;
    this.objects = objects;
    this.closeup = closeup;
    this.byId = new Map(objects.map((o) => [o.id, o]));
    this.list = [];
    this.lastSelect = -1e9;
    this.lastPos = null;
    this.light = null;
    Object.assign(uniforms, {
      secCount: { value: 0 }, pixelAngle: { value: 0.0015 }, lightOn: { value: 0 }, lightRadius: { value: 1 }, lightLimb: { value: 0.6 },
      primaryRadiusLs: { value: 1 }, primaryOccluder: { value: 0 }, primaryAtm: { value: 0 },
      secMapReady0: { value: 0 }, secMapReady1: { value: 0 },
      lightPos: { value: new T.Vector3() }, primaryPos: { value: new T.Vector3() },
      secCenter: { value: Array.from({ length: N }, () => new T.Vector3()) },
      secColor: { value: Array.from({ length: N }, () => new T.Vector3()) },
      secRadius: { value: new Array(N).fill(1) }, secKind: { value: new Array(N).fill(0) },
      secSlot: { value: new Array(N).fill(-1) }, secAtm: { value: new Array(N).fill(0) },
      secRot: { value: Array.from({ length: N }, () => new T.Matrix3()) },
      secMap0: { value: closeup.placeholder }, secMap1: { value: closeup.placeholder },
    });
  }
  // The star lighting a body: climb the parent chain (moon → planet → star); default: the Sun.
  host(o) {
    if (o._host !== undefined) return o._host;
    let h = o.type === "star" ? null : this.byId.get(o.parent);
    for (let k = 0; h && h.type !== "star" && k < 4; k++) h = this.byId.get(h.parent);
    return (o._host = h || (o.type === "star" ? null : this.byId.get("h0")) || null);
  }
  // Candidates: planets and moons by apparent brightness (angular size² × stellar irradiance × albedo), and stars only
  // when their disc is resolved. Throttled: re-run after 0.3 s of wall time or a large move.
  select(s, primary, pixelAngle) {
    const moved = !this.lastPos || norm(sub(s.pos, this.lastPos)) > 0.05 * (this.reach || 1e-6);
    if (!moved && s.wall - this.lastSelect < 0.3 && this.lastPrimary === primary?.id) return;
    this.lastSelect = s.wall;
    this.lastPos = [...s.pos];
    this.lastPrimary = primary?.id;
    const scored = [];
    let reach = Infinity;
    for (const o of this.objects) {
      if (o === primary || !["planet", "moon", "star"].includes(o.type)) continue;
      const p = o.lightXYZ || o.xyz,
        dx = p[0] - s.pos[0], dy = p[1] - s.pos[1], dz = p[2] - s.pos[2],
        d = Math.sqrt(dx * dx + dy * dy + dz * dz),
        R = radiusLy(o),
        a = R / d;
      if (o.type === "star") {
        if (a > 0.5 * pixelAngle) scored.push({ o, score: 1e9 * a, d });
        continue;
      }
      if (a < 1e-6) continue;
      const h = this.host(o);
      let E = 1;
      if (h) {
        const hp = h.lightXYZ || h.xyz, ds = Math.hypot(hp[0] - p[0], hp[1] - p[1], hp[2] - p[2]) * 63241.077;
        E = (h.lumSolar || 1) / Math.max(1e-12, ds * ds);
      }
      const alb = MEAN_COLOR[o.id] ? MEAN_COLOR[o.id][1] : 0.3;
      scored.push({ o, score: a * a * E * alb + (a > pixelAngle ? 1 : 0), d });
      reach = Math.min(reach, d);
    }
    scored.sort((x, y) => y.score - x.score);
    this.list = scored.slice(0, N).map((x) => x.o);
    this.reach = isFinite(reach) ? reach : 1e-3;
    this.slots = [];
    // Two texture slots for the largest textured secondaries.
    const textured = this.list.filter((o) => TEXTURE[o.id]).sort((a, b) => radiusLy(b) / norm(sub(b.xyz, s.pos)) - radiusLy(a) / norm(sub(a.xyz, s.pos)));
    this.slots = textured.slice(0, 2).map((o) => o.id);
  }
  update(s, primary, pixelAngle) {
    const u = this.u;
    this.select(s, primary, pixelAngle);
    u.pixelAngle.value = pixelAngle;
    const ls = (p) => [(p[0] - s.pos[0]) * YEAR, (p[1] - s.pos[1]) * YEAR, (p[2] - s.pos[2]) * YEAR];
    const primaryBody = primary && ["planet", "moon", "star", "pulsar"].includes(primary.type) && u.bodyKind.value > 0.5 ? primary : null;
    // Light source: the star of the primary's system, else of the first secondary, else none.
    const ref = primaryBody || this.list.find((o) => o.type !== "star");
    const star = ref ? (ref.type === "star" ? ref : this.host(ref)) : null;
    this.light = star;
    u.lightOn.value = star ? 1 : 0;
    if (star) {
      u.lightPos.value.set(...ls(star.lightXYZ || star.xyz));
      u.lightRadius.value = radiusLy(star) * YEAR;
      u.lightLimb.value = limbDarkening(temperature(star));
    }
    if (primaryBody) {
      u.primaryPos.value.set(...ls(primaryBody.lightXYZ || primaryBody.xyz));
      u.primaryRadiusLs.value = radiusLy(primaryBody) * YEAR;
      u.primaryOccluder.value = ["planet", "moon"].includes(primaryBody.type) ? 1 : 0;
      u.primaryAtm.value = primaryBody.id === "solar:Terre" ? 1 : 0;
      // Keep the primary's terminator consistent with the shadow geometry (same light position, same epoch).
      if (u.lightOn.value && primaryBody !== star) u.bodyLight.value.set(...unit(sub(ls(star.lightXYZ || star.xyz), ls(primaryBody.lightXYZ || primaryBody.xyz))));
    } else {
      u.primaryPos.value.set(0, 0, 0);
      u.primaryOccluder.value = 0;
    }
    const jd = yearToJD(EPOCH + s.t) + (s.animateBodies ? s.observationTime / 86400 : 0);
    u.secMapReady0.value = u.secMapReady1.value = 0;
    this.list.forEach((o, k) => {
      u.secCenter.value[k].set(...ls(o.lightXYZ || o.xyz));
      u.secRadius.value[k] = radiusLy(o) * YEAR;
      const isStar = o.type === "star";
      u.secKind.value[k] = isStar ? 2 : o.skin === "saturn" ? 3 : 1;
      u.secAtm.value[k] = o.id === "solar:Terre" ? 1 : 0;
      const c = isStar ? blackbodyRGB(this.closeup.lut, temperature(o)) : MEAN_COLOR[o.id] || (o.planet?.radiusEarth > 3 ? [0.55, 0.5, 0.42] : [0.38, 0.33, 0.28]);
      u.secColor.value[k].set(...c);
      const key = o.ephemeris;
      if (key && hasIAU(key)) {
        const earth = key === "Lune" && this.byId.get("solar:Terre"),
          f = bodyFrame(key, jd, earth ? sub(earth.xyz, o.xyz) : null);
        u.secRot.value[k].set(...f[0], ...f[1], ...f[2]);
      } else u.secRot.value[k].identity();
      const slot = this.slots.indexOf(o.id);
      u.secSlot.value[k] = slot;
      if (slot >= 0) {
        const entry = this.closeup.texture(TEXTURE[o.id]);
        u["secMap" + slot].value = entry.texture;
        u["secMapReady" + slot].value = +entry.ready;
      }
      if (o.skin === "saturn" && primaryBody?.skin !== "saturn") {
        const ring = this.closeup.texture("saturn-ring");
        u.ringMap.value = ring.texture;
        u.ringReady.value = +ring.ready;
      }
    });
    u.secCount.value = this.list.length;
  }
}
// Primary-body helper called from closeup.js (declared there as a prototype): P in units of the primary's radius.
export const systemPrimaryGLSL = `vec3 primaryStarlight(vec3 pR){return starlightAt(pR*primaryRadiusLs,-1.);}`;
