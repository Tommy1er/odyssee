// Unresolved nebulae as calibrated point sources and their point → volume handoff (src/nebula-points.js).
// Numeric and source checks, no GPU (browser measurements: docs/RELAIS-CLAUDE-2026-10-21-NEBULEUSES-POINT-VOLUME.md).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {nebulaVolumeWeight,nebulaMagnitudeAt,nebulaColour,visibleBand,BACKDROP_TEXEL,VOLUME_FROM,VOLUME_FULL,DIRECT_FROM,DIRECT_FULL} from '../src/nebula-points.js';
import {calibration,physicsOf,intrinsicMag,lum} from '../src/nebulae.js';
import {fluxFromMag,PIXEL_SR,PSF_FRAGMENT,PSF_VERTEX_GLSL} from '../src/photometry.js';
import {extragalacticNebulae} from '../src/extragalactic-nebulae.js';
let n=0;const check=(label,ok,detail='')=>{assert.ok(ok,label+' · '+detail);n++;console.log('PASS '+label+(detail?' · '+detail:''));};
const near=(a,b,t=1e-9)=>Math.abs(a-b)<=t*Math.max(1,Math.abs(b));
const neb=extragalacticNebulae(),tar=neb.find(o=>o.id==='tarantula'),n604=neb.find(o=>o.id==='ngc604');
const src=f=>fs.readFileSync(new URL('../src/'+f,import.meta.url),'utf8');

// 1. Flux carried by the point = flux the volume is calibrated to (V − A_V from the Earth), inverse square from there.
{const c=calibration(tar),m=nebulaMagnitudeAt(tar,tar.d);
 const spriteSum=.818*10**(-.4*(m-3));// pixel sum of the sprite (same PSF normalisation as stars and galaxies)
 check('1 · Point de la Tarentule = flux étalonné du volume vu de la Terre (somme de pixels × PIXEL_SR = Φ)',near(spriteSum*PIXEL_SR,c.Phi,1e-12)&&near(c.Phi,fluxFromMag(intrinsicMag(physicsOf(tar))),1e-12),`Φ=${c.Phi.toExponential(4)}`);
 check('1b · Loi en 1/d² : à 10 fois la distance, 5 magnitudes de plus',near(nebulaMagnitudeAt(tar,10*tar.d)-m,5,1e-12));}
// 2. Colour: integrated RGB of the calibrated volume, luminance 1 (brightness carried by the flux only).
{const full=calibration(tar).rgb,coarse=nebulaColour(tar);
 check('2 · Couleur intégrée du volume, luminance 1, grille réduite fidèle à 3 % par canal',near(lum(full),1,1e-9)&&near(lum(coarse),1,1e-9)&&full.every((v,k)=>Math.abs(v-coarse[k])<.03*v+.01),full.map(x=>x.toFixed(3)).join(' / ')+' vs '+coarse.map(x=>x.toFixed(3)).join(' / '));}
// 3. Handoff weights: point 1 − w, volume w, smoothstep on the diameter in pixels of the surface drawing the volume.
{const R=700,dTex=t=>2*R/(t*BACKDROP_TEXEL),dPix=(p,pix)=>2*R/(p*pix),pix=2.68e-3;
 const w=(d,sel)=>nebulaVolumeWeight({radius:R,distance:d,selected:sel,pixelAngle:pix,band:1});
 check('3 · Volume du cube de fond : 0 sous 3 texels, 1 au-delà de 8, monotone',w(dTex(VOLUME_FROM),false)===0&&w(dTex(VOLUME_FULL),false)===1&&w(dTex(4),false)<w(dTex(6),false));
 check('3b · Cible marchée par rayon d’écran : 0 sous 2 px, 1 au-delà de 5 px',w(dPix(DIRECT_FROM,pix),true)===0&&w(dPix(DIRECT_FULL,pix),true)===1);
 check('3c · Hors bandes visibles : volume seul (modèle qualitatif inchangé)',nebulaVolumeWeight({radius:R,distance:1e9,selected:false,pixelAngle:pix,band:2})===1&&!visibleBand(3)&&visibleBand(0)&&visibleBand(1)&&visibleBand(6));
 const sel=w(tar.d,true),bg=w(tar.d,false);
 check('3d · Tarentule vue du Soleil : point majoritaire, volume partiel si sélectionnée, point seul sinon',bg===0&&sel>0&&sel<1,`sélectionnée w=${sel.toFixed(3)}, non sélectionnée w=${bg}`);
 check('3e · NGC 604 vue du Soleil (3 465 rayons, au-delà du cube) : point seul, jamais absent',w(n604.d,true)===0&&w(n604.d,false)===0);}
// 4. Wiring: sprites with sharp sources (main cube, solid-angle corrected), selected cloud never in the backdrop,
//    per-ray march at any distance with weight and dust opacity w, budget gains on every representation.
{const r=src('renderer.js'),so=src('sky-optics.js'),env=src('environments.js'),pts=src('nebula-points.js');
 check('4 · Sprites (et toutes les populations d’amas) dans la passe des sources ponctuelles, seuls les volumes de nuages dans le cube de fond ; correction d’angle solide',r.includes('stars:[this.sky,this.galaxyLight.points,this.nebulaPoints.points,...[...this.environments.cache.values()].filter(e=>e.stars)')&&r.includes('backgrounds:[this.galaxy,...[...this.environments.cache.values()].filter(e=>!e.stars)')&&pts.includes('texelGain(mv.xyz)')&&pts.includes('${CUBE_POINT_GLSL}'));
 check('4b · Nuage sélectionné retiré du cube de fond sans condition de distance',r.includes('const directCloud=!!selectedCloud?.cloud;'));
 check('4c · Marche par rayon d’écran pondérée par w, sans limite de 120 rayons quand un poids est fourni',so.includes('diffuseGain(s.band??1)*cloudGain')&&so.includes('this.cloudGain??'));
 check('4d · Poussière du nuage dessinée à proportion de w (le point inclut déjà son extinction)',env.includes('background*mix(vec3(1.),T,cloudOpacity)'));
 check('4e · Gains du budget appliqués au point, au volume du cube et à la marche directe',r.includes('(1-w)*g')&&r.includes('nebulaVolume.get(s.target.id)*(this.emissionBudget.childGains.get(s.target.id)??1)'));}
// 5. Pixel-integrated Gaussian PSF (every point sprite): pixel sum independent of the sub-pixel position, also for
//    the smallest sprites; the former centre-sampled profile ranged from 0 to 8 × nominal (NGC 604 vanished on a pixel corner).
{const erfA=x=>{const s=Math.sign(x);x=Math.abs(x);const t=1/(1+.3275911*x);return s*(1-((((1.061405429*t-1.453152027)*t+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x));};
 const sigma=(size,soft)=>Math.max((.102+(.177-.102)*soft)*size,.55),draw=(size,s)=>Math.max(size,7*s+1);
 let worst=0,oldMin=Infinity,oldMax=0;
 for(const size of [1.25,2,3,6,12,48])for(const soft of [0,1]){const s=sigma(size,soft),D=draw(size,s),k=.70710678/s;
  for(let ox=0;ox<1;ox+=.1)for(let oy=0;oy<1;oy+=.1){let sum=0,old=0;
   for(let i=-40;i<=40;i++)for(let j=-40;j<=40;j++){const x=i+.5-ox,y=j+.5-oy;if(Math.abs(x)>=D/2||Math.abs(y)>=D/2)continue;
    sum+=.25*(erfA((x+.5)*k)-erfA((x-.5)*k))*(erfA((y+.5)*k)-erfA((y-.5)*k));
    if(size===1.25&&soft===0){const r=2*Math.hypot(x,y)/size;if(r<=1){const t=Math.min(1,Math.max(0,(r-.7)/.3));old+=Math.exp(-12*r*r)*(1-t*t*(3-2*t));}}}
   worst=Math.max(worst,Math.abs(sum-1));if(size===1.25&&soft===0){oldMin=Math.min(oldMin,old/(size*size*.08));oldMax=Math.max(oldMax,old/(size*size*.08));}}}
 check('5 · PSF intégrée sur le pixel : somme des pixels = 1 à 0,1 % près quelle que soit la position sous-pixel',worst<1e-3,`écart max ${worst.toExponential(2)} ; ancien profil à 1,25 px : ${oldMin.toFixed(2)} à ${oldMax.toFixed(2)} × nominal`);
 const files=['stellar-light.js','galaxy-photometry.js','galaxy-spectral-overlay.js','nebula-points.js'];
 check('5b · Toutes les couches ponctuelles utilisent la PSF partagée et le total 0,818 × flux',files.every(f=>{const x=src(f);return x.includes('PSF_FRAGMENT')&&x.includes('${PSF_VERTEX_GLSL}')&&x.includes('gl_PointSize=psfD')&&x.includes('*.818')&&!x.includes('size*size*.08');})&&PSF_FRAGMENT.includes('pixelPSF()'));}
// 6. σ ≥ 0.6 screen pixel for cube sprites: the cube is resampled per screen pixel; a narrower Gaussian is aliased.
{let sd=s=>{let v=[];for(let k=0;k<50;k++){const ph=k/50;let t=0;for(let x=-20;x<=20;x++){const u=x-ph;t+=Math.exp(-u*u/(2*s*s))/Math.sqrt(2*Math.PI)/s;}v.push(t);}const m=v.reduce((a,b)=>a+b)/v.length;return Math.sqrt(v.reduce((a,b)=>a+(b-m)**2,0)/v.length);};
 const r=src('renderer.js'),ph=src('photometry.js');
 check('6 · Rééchantillonnage écran : σ = 0,4 px → ±6 % par axe ; σ = 0,6 px → < 0,2 % ; minimum appliqué à toutes les couches du cube',sd(.4)>.05&&sd(.6)<.002&&r.includes('PSF_MIN_SCREEN*s.pixelAngle/(2/CUBE_SIZE)')&&ph.includes('psfMin*scale'),`σ 0,4 : ${(100*sd(.4)).toFixed(1)} % ; σ 0,6 : ${(100*sd(.6)).toFixed(2)} %`);}
console.log(JSON.stringify({passed:n}));
