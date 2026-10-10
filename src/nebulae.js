// Physical model of the nebulae: emission-line spectra converted to display colours through the CIE 1931 colour matching
// functions, ionisation zones, continuum (synchrotron, scattered starlight), internal dust that absorbs and reddens, and a
// brightness normalised on each nebula's integrated catalogue magnitude, on the photometric scale of the stars
// (photometry.js). The 3D structure itself (filaments, pillars, shells) remains a procedural reconstruction.
//
// Units inside the volume: lengths in nebula radii R (radiusLy), the bounding sphere has radius 1.1. Local frame: the
// Earth lies along +z (the group/cloud rotation sends the Sun→nebula direction to −z).
// Radiance: L = ∫ j·T ds with j = nebKl·den·colour(zone) + nebKc·cont·nebCont, T the per-channel dust transmission.
// Normalisation: seen from the Earth (parallel rays along −z), ∫∫ L dx dy / (d/R)² = Φ(V − A_fg), the integrated
// magnitude corrected for foreground extinction. Internal dust is included in that emergent flux.
import { fluxFromMag } from "./photometry.js";

// ── Spectra → colour ────────────────────────────────────────────────────────────────────────────────────────────
// CIE 1931 2° colour matching functions, multi-lobe Gaussian fit of Wyman, Sloan & Shirley (2013, JCGT 2, 1).
const g = (l, mu, s1, s2) => Math.exp(-0.5 * ((l - mu) / (l < mu ? s1 : s2)) ** 2);
export const cmf = (l) => [
  1.056 * g(l, 599.8, 37.9, 31.0) + 0.362 * g(l, 442.0, 16.0, 26.7) - 0.065 * g(l, 501.1, 20.4, 26.2),
  0.821 * g(l, 568.8, 46.9, 40.5) + 0.286 * g(l, 530.9, 16.3, 31.1),
  1.217 * g(l, 437.0, 11.8, 36.0) + 0.681 * g(l, 459.0, 26.0, 13.8),
];
const XYZ_RGB = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]];
export const lum = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
// Linear sRGB of an XYZ triple; colours outside the sRGB gamut (pure [O III] 500.7 nm, for instance) are clipped.
export function xyzToRgb(xyz) {
  return XYZ_RGB.map((row) => Math.max(0, row[0] * xyz[0] + row[1] * xyz[1] + row[2] * xyz[2]));
}
// Colour of a set of lines [[λ nm, relative energy], …] and/or a continuum F_λ, normalised to luminance Y = 1.
export function spectrumColor(lines = [], continuum = null) {
  const xyz = [0, 0, 0];
  for (const [l, I] of lines) cmf(l).forEach((v, k) => (xyz[k] += I * v));
  if (continuum) for (let l = 380; l <= 780; l += 2) cmf(l).forEach((v, k) => (xyz[k] += continuum(l) * v * 2));
  const rgb = xyzToRgb(xyz), y = lum(rgb);
  return y > 0 ? rgb.map((x) => x / y) : [1, 1, 1];
}
const planck = (T) => (l) => { const x = l * 1e-9; return 1 / (x ** 5 * (Math.exp(1.4388e-2 / (x * T)) - 1)); };
// Emission lines (nm). Balmer series in case B recombination at 10⁴ K: Hα/Hβ = 2.86 (Osterbrock & Ferland 2006).
export const LINES = {
  Ha: 656.28, Hb: 486.13, Hg: 434.05, Hd: 410.17, O3: 500.68, O3b: 495.89, N2: 658.35, N2b: 654.80, S2: 671.64, S2b: 673.08,
  He1: 587.56, He2: 468.57, O1: 630.03, O1b: 636.38,
};
// Relative line energies with Hβ = 1. o3, n2, o1 are the strong members (5007, 6584, 6300); their weak partners follow the
// fixed atomic ratios (≈ 1/2.98, 1/3.05, 1/3.1); s2 is the [S II] 6716+6731 sum.
export function lineSet({ o3 = 0, n2 = 0, s2 = 0, he1 = 0, he2 = 0, o1 = 0 }) {
  return [
    [LINES.Ha, 2.86], [LINES.Hb, 1], [LINES.Hg, 0.47], [LINES.Hd, 0.26],
    [LINES.O3, o3], [LINES.O3b, o3 / 2.98], [LINES.N2, n2], [LINES.N2b, n2 / 3.05],
    [LINES.S2, s2 * 0.55], [LINES.S2b, s2 * 0.45], [LINES.He1, he1], [LINES.He2, he2], [LINES.O1, o1], [LINES.O1b, o1 / 3.1],
  ].filter(([, I]) => I > 0);
}
const CONTINUA = {
  // Synchrotron, F_ν ∝ ν^−0.6 → F_λ ∝ λ^(0.6−2).
  sync: (l) => l ** -1.4,
  // Light of a hot star scattered by grey (large) grains.
  star: (T) => planck(T),
};

// ── Catalogue of nebular physics (orders of magnitude from the literature; see `refs`) ────────────────────────────
// V: integrated visual magnitude seen from the Earth; afg: foreground extinction A_V (dust between the Earth and the
// nebula, removed when one visits it); V0 instead of V: intrinsic magnitude (already free of foreground extinction) for
// objects that cannot be seen in visible light from the Earth; tau: central optical depth A_V/1.086 of the nebula's own dust across its
// diameter; hi/lo: line ratios (Hβ = 1) of the high- and low-ionisation zones; fc: fraction of the visual light in the
// continuum; zone: [mode (0 radial, 1 ionisation fronts on dense surfaces, 2 patchy shock filaments), inner, outer, jitter].
export const NEBULA_PHYSICS = {
  orion: {
    cls: "Région H II (formation d’étoiles)", V: 4.0, afg: 0.3, tau: 1.2, fc: 0.1, cont: ["star", 40000], zone: [0, 0.25, 0.75, 0.5],
    hi: { o3: 4.0, n2: 0.35, s2: 0.1, he1: 0.12 }, lo: { o3: 0.6, n2: 1.6, s2: 0.9, o1: 0.1, he1: 0.05 },
    vNote: "M 42, magnitude visuelle intégrée", tauNote: "le « Voile » de poussière devant le Trapèze (A_V ≈ 1–2)",
    refs: ["Esteban et al. 2004, MNRAS 355, 229 (spectre de M 42)", "O’Dell 2001, ARA&A 39, 99 (structure, Voile)"],
  },
  carina: {
    cls: "Région H II géante", V: 1.0, afg: 1.4, tau: 1.5, fc: 0.05, cont: ["star", 40000], zone: [0, 0.2, 0.8, 0.6],
    hi: { o3: 3.0, n2: 0.3, s2: 0.1, he1: 0.1 }, lo: { o3: 0.5, n2: 1.4, s2: 0.8, o1: 0.1, he1: 0.05 },
    vNote: "NGC 3372, magnitude intégrée", tauNote: "bandes sombres (dont le « Trou de serrure »)",
    refs: ["Smith & Brooks 2008, Handbook of Star Forming Regions II, 138 (Carène)"],
  },
  pillars: {
    cls: "Piliers moléculaires photo-évaporés (M 16)", V: 10, afg: 2.5, tau: 9, fc: 0.03, cont: ["star", 40000], zone: [1, 0, 0, 0],
    hi: { o3: 2.5, n2: 0.4, s2: 0.15, he1: 0.1 }, lo: { o3: 0.3, n2: 1.8, s2: 1.0, o1: 0.2 },
    vNote: "estimation pour la seule région des piliers (M 16 entière : V ≈ 6)", tauNote: "colonnes opaques (A_V > 10 à l’intérieur)",
    refs: ["Hester et al. 1996, AJ 111, 2349 (piliers, fronts d’ionisation)", "Hillenbrand et al. 1993, AJ 106, 1906 (extinction vers M 16)"],
  },
  ring: {
    cls: "Nébuleuse planétaire", V: 8.8, afg: 0.2, tau: 0.15, fc: 0, zone: [0, 0.35, 0.7, 0.2],
    hi: { o3: 11, he2: 0.4, n2: 0.2, s2: 0.03, he1: 0.1 }, lo: { o3: 1.0, n2: 4.0, s2: 0.7, o1: 0.3, he1: 0.12 },
    vNote: "M 57, magnitude intégrée", tauNote: "peu de poussière",
    refs: ["O’Dell, Ferland, Henney & Peimbert 2013, AJ 145, 92 (M 57, HST)"],
  },
  helix: {
    cls: "Nébuleuse planétaire", V: 7.6, afg: 0.03, tau: 0.2, fc: 0, zone: [0, 0.3, 0.65, 0.3],
    hi: { o3: 5, he2: 0.3, n2: 0.5, s2: 0.1, he1: 0.1 }, lo: { o3: 1.0, n2: 3.0, s2: 0.6, o1: 0.4, he1: 0.12 },
    vNote: "NGC 7293, magnitude intégrée", tauNote: "nœuds cométaires poussiéreux",
    refs: ["O’Dell, McCullough & Meixner 2004, AJ 128, 2339 (Hélice)"],
  },
  crab: {
    cls: "Rémanent de supernova à pulsar (plérion)", V: 8.4, afg: 1.6, tau: 0.1, fc: 0.7, cont: ["sync"], contShape: 1, zone: [2, 0, 0, 0],
    hi: { o3: 3.5, n2: 1.5, s2: 0.9, he1: 0.4, o1: 0.3 }, lo: { o3: 1.0, n2: 2.0, s2: 1.6, o1: 0.6, he1: 0.3 },
    vNote: "M 1, magnitude intégrée ; E(B−V) ≈ 0,52", tauNote: "poussière dans quelques filaments",
    contNote: "rayonnement synchrotron du vent du pulsar, F_ν ∝ ν^−0,6, ≈ 70 % de la lumière visible (ordre de grandeur)",
    refs: ["Davidson & Fesen 1985, ARA&A 23, 119", "Hester 2008, ARA&A 46, 127 (nébuleuse du Crabe)"],
  },
  "vela-remnant": {
    cls: "Rémanent de supernova (filaments de choc)", V: 3.0, afg: 0.3, tau: 0.05, fc: 0, zone: [2, 0, 0, 0],
    hi: { o3: 4.0, n2: 1.0, s2: 0.8 }, lo: { o3: 0.6, n2: 2.0, s2: 2.0, o1: 0.6 },
    vNote: "estimation (brillance de surface moyenne ≈ 24 mag/arcsec² sur ≈ 8°)", tauNote: "négligeable",
    refs: ["Mathewson & Clarke 1973, ApJ 180, 725 (critère [S II]/Hα des chocs)", "Raymond 1979, ApJS 39, 1 (spectres de chocs)"],
  },
  sgrae: {
    cls: "Rémanent de supernova au centre galactique", V0: 12, afg: 30, tau: 0.3, fc: 0, zone: [2, 0, 0, 0],
    hi: { o3: 3.0, n2: 1.2, s2: 0.8 }, lo: { o3: 0.6, n2: 2.0, s2: 1.8, o1: 0.5 },
    vNote: "hypothèse : éclat visible intrinsèque inconnu, objet observé en radio et en rayons X", tauNote: "faible",
    refs: ["Fritz et al. 2011, ApJ 737, 73 (extinction vers le centre galactique, A_V ≈ 30)", "Maeda et al. 2002, ApJ 570, 671 (Sgr A Est en X)"],
  },
  "eta-car": {
    cls: "Nébuleuse de réflexion bipolaire (Homoncule)", V: 6.0, afg: 1.5, tau: 4, fc: 0.9, cont: ["star", 20000], zone: [0, 0.3, 0.8, 0.3],
    hi: { n2: 0.5, he1: 0.1 }, lo: { n2: 0.8, s2: 0.2 },
    vNote: "ordre de grandeur de la lumière diffusée par l’Homoncule (étoile exclue)", tauNote: "lobes très poussiéreux",
    contNote: "lumière de l’étoile diffusée par les grains, puis rougie par la poussière des lobes",
    refs: ["Davidson & Humphreys 1997, ARA&A 35, 1 (η Carinae)", "Smith 2006, ApJ 644, 1151 (Homoncule)"],
  },
  sgrb2: {
    cls: "Nuage moléculaire géant (régions H II enfouies)", V0: 16, afg: 30, tau: 60, fc: 0, zone: [0, 0.2, 0.6, 0.4],
    hi: { o3: 2.0, n2: 0.4, s2: 0.1 }, lo: { o3: 0.3, n2: 1.5, s2: 0.8 },
    vNote: "hypothèse : lumière visible intrinsèque presque entièrement absorbée", tauNote: "A_V de plusieurs centaines au cœur ; ici τ = 60, déjà opaque",
    refs: ["Schmiedeke et al. 2016, A&A 588, A143 (structure de Sgr B2)", "Fritz et al. 2011, ApJ 737, 73"],
  },
};
// Rendering shape of each nebula (procedural structure).
export const nebulaShape = (o) => (o.type === "pillars" ? 1 : ["crab", "vela-remnant", "sgrae"].includes(o.id) ? 2 : o.id === "eta-car" ? 3 : ["ring", "helix"].includes(o.id) ? 4 : o.id === "sgrb2" ? 5 : 0);
export const physicsOf = (o) => NEBULA_PHYSICS[o.id] || NEBULA_PHYSICS.orion;
export const intrinsicMag = (P) => (P.V0 ?? P.V - P.afg);

// ── Procedural structure, GLSL and JavaScript twins (same formulas) ─────────────────────────────────────────────────
// Float-stable hash (D. Hoskins, "hash without sine"), value noise and fbm.
const fract = (x) => x - Math.floor(x);
export function makeField(shape, seed) {
  const h = (x, y, z) => {
    let a = fract(x * 0.1031 + seed * 0.00731), b = fract(y * 0.1031 + seed * 0.00731), c = fract(z * 0.1031 + seed * 0.00731);
    const d = a * c + b * b + c * a + 31.32 * (a + b + c); // dot(p, p.zyx + 31.32)
    a += d; b += d; c += d;
    return fract((a + b) * c);
  };
  const nn = (x, y, z) => {
    const i = Math.floor(x), j = Math.floor(y), k = Math.floor(z);
    let u = x - i, v = y - j, w = z - k;
    u = u * u * (3 - 2 * u); v = v * v * (3 - 2 * v); w = w * w * (3 - 2 * w);
    const L = (a, b, t) => a + (b - a) * t;
    return L(L(L(h(i, j, k), h(i + 1, j, k), u), L(h(i, j + 1, k), h(i + 1, j + 1, k), u), v), L(L(h(i, j, k + 1), h(i + 1, j, k + 1), u), L(h(i, j + 1, k + 1), h(i + 1, j + 1, k + 1), u), v), w);
  };
  const fbm = (x, y, z) => 0.55 * nn(x, y, z) + 0.27 * nn(2 * x, 2 * y, 2 * z) + 0.13 * nn(4 * x, 4 * y, 4 * z) + 0.05 * nn(8 * x, 8 * y, 8 * z);
  const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  // Soft edge: every structure fades to zero before the bounding sphere (radius 1.1).
  const density = (x, y, z) => raw(x, y, z) * (1 - ss(0.85, 1.08, Math.hypot(x, y, z)));
  const raw = (x, y, z) => {
    const n = fbm(7 * x, 7 * y, 7 * z), r = Math.hypot(x, y, z);
    if (shape < 0.5) return Math.exp(-r * r * 3) * ss(0.36, 0.7, n) * 3;
    if (shape < 1.5) {
      let d = 0;
      const rough = (nn(24 * x, 24 * y, 24 * z) - 0.5) * 0.14;
      for (let i = 0; i < 3; i++) {
        const height = 1.45 - i * 0.22, t = Math.min(1, Math.max(0, (y + 0.8) / height));
        const cx = (i - 1) * 0.43 + 0.09 * Math.sin(t * 5 + i), cy = -0.8 + t * height;
        const w = 0.075 + 0.09 * (1 - t) + 0.012 * Math.sin(t * 16 + i);
        d = Math.max(d, 1 - ss(w * 0.64, w + 0.012, Math.hypot(x - cx, y - cy, z) + rough));
      }
      return d * (0.12 + 5 * n * n);
    }
    if (shape < 2.5) return Math.exp(-(((r - (0.69 + 0.12 * n)) / 0.075) ** 2)) * ss(0.3, 0.65, n) * 4;
    if (shape < 3.5) { const qy = Math.abs(y) - 0.42; return Math.exp(-(((Math.hypot(x / 0.32, qy / 0.51, z / 0.32) - 0.85) / 0.13) ** 2)) * (0.3 + n); }
    if (shape < 4.5) { const rr = Math.hypot(x, y * 1.18); return (Math.exp(-(((rr - 0.62) / 0.13) ** 2)) + 0.22 * Math.exp(-(rr * rr) / 0.18)) * Math.exp(-z * z * 18) * (0.4 + n); }
    return Math.exp(-r * r * 2) * ss(0.3, 0.72, n) * 5;
  };
  // Synchrotron nebula of a plerion: smooth ellipsoid inside the filament cage.
  const contDensity = (x, y, z) => Math.exp(-2 * ((x / 0.62) ** 2 + (y / 0.5) ** 2 + (z / 0.5) ** 2)) * (0.7 + 0.3 * fbm(3 * x, 3 * y, 3 * z));
  // Fraction of the high-ionisation spectrum at p.
  const hiFrac = (zone, x, y, z, den) => {
    const m = zone[0];
    if (m < 0.5) return 1 - ss(zone[1], zone[2], Math.hypot(x, y, z) + (fbm(3.1 * x + 5, 3.1 * y + 5, 3.1 * z + 5) - 0.5) * zone[3]);
    if (m < 1.5) return 1 - Math.min(1, Math.max(0, (den - density(x - 0.035, y + 0.045, z + 0.025)) * 3));
    return ss(0.42, 0.6, fbm(3.1 * x + 5, 3.1 * y + 5, 3.1 * z + 5));
  };
  // Emitting gas. Pillars: only their photo-ionised skin (low-ionisation zone) and a transparent ambient H II gas emit;
  // the dense interior is dark molecular gas. Other shapes: emission follows the density.
  const emit = (x, y, z, den, f) => shape > 0.5 && shape < 1.5 ? den * (0.1 + 0.9 * (1 - f)) + 0.3 * Math.exp(-1.5 * (x * x + y * y + z * z)) * (0.6 + 0.8 * nn(2.5 * x, 2.5 * y, 2.5 * z)) * (1 - ss(0.85, 1.08, Math.hypot(x, y, z))) : den;
  return { density, contDensity, hiFrac, fbm, emit };
}
export const REDDEN = [0.83, 1, 1.25]; // A_λ/A_V at the effective wavelengths of the sRGB primaries (Cardelli et al. 1989, R_V = 3.1)
export function nebulaGLSL(steps) {
  return `
uniform float shape,seed,nebKl,nebKc,nebTau,nebGain,nebContShape;uniform vec3 nebHi,nebLo,nebCont;uniform vec4 nebZone;
float nh(vec3 p){p=fract(p*.1031+seed*.00731);p+=dot(p,p.zyx+31.32);return fract((p.x+p.y)*p.z);}
float nn(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(nh(i),nh(i+vec3(1,0,0)),f.x),mix(nh(i+vec3(0,1,0)),nh(i+vec3(1,1,0)),f.x),f.y),mix(mix(nh(i+vec3(0,0,1)),nh(i+vec3(1,0,1)),f.x),mix(nh(i+vec3(0,1,1)),nh(i+vec3(1,1,1)),f.x),f.y),f.z);}
float nfbm(vec3 p){return .55*nn(p)+.27*nn(p*2.)+.13*nn(p*4.)+.05*nn(p*8.);}
float nebRaw(vec3 p){float n=nfbm(p*7.),r=length(p);
 if(shape<.5)return exp(-r*r*3.)*smoothstep(.36,.7,n)*3.;
 if(shape<1.5){float d=0.,rough=(nn(p*24.)-.5)*.14;for(int i=0;i<3;i++){float k=float(i),height=1.45-k*.22;float t=clamp((p.y+.8)/height,0.,1.);vec3 c=vec3((k-1.)*.43+.09*sin(t*5.+k),-.8+t*height,0);float w=.075+.09*(1.-t)+.012*sin(t*16.+k);d=max(d,1.-smoothstep(w*.64,w+.012,length(p-c)+rough));}return d*(.12+5.*n*n);}
 if(shape<2.5)return exp(-pow((r-(.69+.12*n))/.075,2.))*smoothstep(.3,.65,n)*4.;
 if(shape<3.5){vec3 q=p;q.y=abs(q.y)-.42;return exp(-pow((length(q/vec3(.32,.51,.32))-.85)/.13,2.))*(.3+n);}
 if(shape<4.5){float rr=length(p.xy*vec2(1.,1.18));return (exp(-pow((rr-.62)/.13,2.))+.22*exp(-rr*rr/.18))*exp(-p.z*p.z*18.)*(.4+n);}
 return exp(-r*r*2.)*smoothstep(.3,.72,n)*5.;}
float nebDensity(vec3 p){return nebRaw(p)*(1.-smoothstep(.85,1.08,length(p)));}
float nebContDensity(vec3 p){vec3 q=p/vec3(.62,.5,.5);return exp(-2.*dot(q,q))*(.7+.3*nfbm(p*3.));}
float nebHiFrac(vec3 p,float den){float m=nebZone.x;
 if(m<.5)return 1.-smoothstep(nebZone.y,nebZone.z,length(p)+(nfbm(p*3.1+5.)-.5)*nebZone.w);
 if(m<1.5)return 1.-clamp((den-nebDensity(p+vec3(-.035,.045,.025)))*3.,0.,1.);
 return smoothstep(.42,.6,nfbm(p*3.1+5.));}
float nebEmit(vec3 p,float den,float f){if(shape>.5&&shape<1.5)return den*(.1+.9*(1.-f))+.3*exp(-1.5*dot(p,p))*(.6+.8*nn(p*2.5))*(1.-smoothstep(.85,1.08,length(p)));return den;}
// Visible bands: physical emission and per-channel dust transmission. Other bands: earlier qualitative model.
vec3 nebulaMarch(vec3 eye,vec3 dir,vec3 background,out vec3 T){T=vec3(1.);float b=dot(eye,dir),c=dot(eye,eye)-1.21,disc=b*b-c;if(disc<0.)return background;
 float lo=max(0.,-b-sqrt(disc)),hi=-b+sqrt(disc);if(hi<=lo)return background;float ds=(hi-lo)/${steps}.;vec3 light=vec3(0.);
 // Per-ray offset of the samples (dithering): turns step aliasing of opaque structures into fine grain.
 float jit=fract(sin(dot(dir.xy+dir.z,vec2(12.9898,78.233)))*43758.5453);
 for(int i=0;i<${steps};i++){vec3 p=eye+dir*(lo+(float(i)+jit)*ds);float den=nebDensity(p);
  if(band<1.5||band>5.5){if(den<1.e-5&&abs(shape-1.)>.5&&nebContShape<.5)continue;
   float f=nebHiFrac(p,den),e=nebEmit(p,den,f),cd=nebContShape>.5?nebContDensity(p):e;if(e<1.e-5&&cd<1.e-5)continue;
   vec3 col=mix(nebLo,nebHi,f);vec3 tau=nebTau*den*ds*vec3(${REDDEN.join(",")});
   light+=(nebKl*e*col+nebKc*cd*nebCont)*nebGain*ds*T*exp(-.5*tau);T*=exp(-tau);}
  else{float optical=den*ds*(band==2.?.5:2.8);float a=1.-exp(-optical);float edge=clamp(length(p)*.8+nfbm(p*14.)*.5,0.,1.);
   vec3 color=band==2.?mix(vec3(.26,.08,.42),vec3(1.,.51,.13),edge):band==3.?vec3(.16,.68,.62):band==4.?vec3(.48,.21,1.):vec3(.8,.18,.53);
   float gain=band==2.?.7:.5;if(band==4.&&shape>.5&&shape<1.5)gain*=.025;if(band==5.&&shape>.5&&shape<1.5)gain*=.005;
   light+=color*a*T*gain;T*=exp(-optical);}
  if(max(T.r,max(T.g,T.b))<.004)break;}
 return light+background*T;}
`;
}
// ── Normalisation ───────────────────────────────────────────────────────────────────────────────────────────────
// Earth view: parallel rays along −z through the bounding sphere, grid n×n, `steps` samples per ray (same midpoint rule
// as the shader). Returns the dust scale, the two emission constants and diagnostics.
export function calibrate(o, { n = 40, steps = 64 } = {}) {
  const P = physicsOf(o), shape = nebulaShape(o), seed = hashId(o.id) % 1000, F = makeField(shape, seed);
  const hiC = spectrumColor(lineSet(P.hi)), loC = spectrumColor(lineSet(P.lo));
  const contC = P.fc > 0 ? spectrumColor([], P.cont[0] === "sync" ? CONTINUA.sync : CONTINUA.star(P.cont[1])) : [1, 1, 1];
  const contShape = P.contShape || 0, R = 1.1, dA = (2 * R / n) ** 2;
  const rays = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const x = -R + (i + 0.5) * (2 * R / n), y = -R + (j + 0.5) * (2 * R / n);
    if (x * x + y * y < R * R) rays.push([x, y]);
  }
  // Dust: mean column of den through the central region (impact parameter < 0.5) → τ_V = P.tau there.
  let colSum = 0, colN = 0;
  const samples = (x, y, fn) => { const h = Math.sqrt(R * R - x * x - y * y), ds = (2 * h) / steps; for (let k = 0; k < steps; k++) fn(x, y, h - (k + 0.5) * ds, ds); };
  for (const [x, y] of rays) if (x * x + y * y < 0.25) { let c = 0; samples(x, y, (a, b, z, ds) => (c += F.density(a, b, z) * ds)); colSum += c; colN++; }
  const kTau = colSum > 0 ? P.tau / (colSum / colN) : 0;
  let Eline = 0, Econt = 0, Eline0 = 0, Econt0 = 0;
  for (const [x, y] of rays) {
    let T = [1, 1, 1];
    samples(x, y, (a, b, z, ds) => {
      const den = F.density(a, b, z);
      if (den < 1e-5 && shape !== 1 && !contShape) return;
      const f = F.hiFrac(P.zone, a, b, z, den), e = F.emit(a, b, z, den, f), cd = contShape ? F.contDensity(a, b, z) : e;
      if (e < 1e-5 && cd < 1e-5) return;
      const col = loC.map((v, k) => v + (hiC[k] - v) * f);
      const tau = REDDEN.map((r) => kTau * den * ds * r), half = tau.map((t) => Math.exp(-0.5 * t));
      Eline += lum(col.map((v, k) => v * e * ds * T[k] * half[k])) * dA;
      Econt += lum(contC.map((v, k) => v * cd * ds * T[k] * half[k])) * dA;
      Eline0 += e * ds * dA; Econt0 += cd * ds * dA;
      T = T.map((t, k) => t * Math.exp(-tau[k]));
    });
  }
  const dR = (o.d || 1000) / (o.radiusLy || 1), Phi = fluxFromMag(intrinsicMag(P)), J = Phi * dR * dR;
  const Kl = Eline > 0 ? ((1 - P.fc) * J) / Eline : 0, Kc = P.fc > 0 && Econt > 0 ? (P.fc * J) / Econt : 0;
  return {
    shape, seed, kTau, Kl, Kc, hiC, loC, contC, contShape, zone: P.zone, Phi, J,
    escape: (Kl * Eline + Kc * Econt) / Math.max(Kl * Eline0 + Kc * Econt0, 1e-300),
  };
}
export function hashId(id) { let h = 2166136261; for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }
const cache = new Map();
export const calibration = (o) => { if (!cache.has(o.id)) cache.set(o.id, calibrate(o)); return cache.get(o.id); };
// Copy a calibration into a set of three.js uniforms (cloud in the sky shader, or a nebula mesh).
export function applyCalibration(u, c, gain) {
  u.shape.value = c.shape; u.seed.value = c.seed; u.nebKl.value = c.Kl; u.nebKc.value = c.Kc; u.nebTau.value = c.kTau;
  u.nebGain.value = gain; u.nebContShape.value = c.contShape;
  u.nebHi.value.set(...c.hiC); u.nebLo.value.set(...c.loC); u.nebCont.value.set(...c.contC); u.nebZone.value.set(...c.zone);
}
