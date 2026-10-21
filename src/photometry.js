// Shared photometric scale of the sky renderer. Point stars (stellar-light.js) draw flux = 10^(−0.4 (m − 3)) per
// sprite, spread over a PSF whose pixel sum is 0.818 × that value, into a 1024-pixel cube face whose central pixel spans
// (2/1024)² sr. A source of magnitude m therefore carries Φ = 0.818 · 10^(1.2) · (2/1024)² · 10^(−0.4 m) in
// "radiance × steradian" units; extended emission (comets, nebulae) uses the same Φ so that its surface brightness is
// directly comparable with the stars. (Cube pixels away from the face centre are up to ~5× smaller: point stars near
// cube edges are drawn brighter; known limitation of the star layer, not of this scale.)
export const PIXEL_SR = (2 / 1024) ** 2;
// Sky cube face resolution (sky-optics.js): 512 on narrow (phone) screens, 1024 otherwise. Point sprites (stars,
// cluster stars, point galaxies) are drawn as a pixel sum in cube texels; a 512 texel spans 4 × PIXEL_SR, so without
// this factor every point source would carry 4× its Φ on phones (≈1.5 mag too bright against the Milky Way, volumes,
// nebulae and the screen-space galaxy overlay, which are radiances). Point flux is therefore scaled by (CUBE_SIZE/1024)².
export const CUBE_SIZE = typeof innerWidth !== 'undefined' && innerWidth < 620 ? 512 : 1024;
export const CUBE_POINT_SCALE = (CUBE_SIZE / 1024) ** 2;
export const CUBE_POINT_GLSL = CUBE_POINT_SCALE.toFixed(6);
// Perspective (cube face or screen) pixels are not equal in solid angle: at tangent-plane coordinates t = (x, y)/(-z)
// a pixel spans (pixel at the centre) · (1 + |t|²)^(−3/2) sr, down to ×0.19 in a 90° cube-face corner. Point sprites store
// a pixel SUM, so to carry the same Φ wherever they fall their light is multiplied by (1 + |t|²)^(3/2), and a resolved
// sprite's size in pixels by (1 + |t|²)^(3/4) (mean linear pixel scale). Before this, a star or point galaxy changed
// brightness by up to ×5 with its direction in the sky cube (±50 % measured between neighbouring galaxies).
export const TEXEL_GLSL = `vec2 texelTan(vec3 viewPos){return viewPos.z<-1.e-6?viewPos.xy/(-viewPos.z):vec2(0.);}
float texelGain(vec3 viewPos){vec2 t=texelTan(viewPos);return pow(1.+dot(t,t),1.5);}
float texelScale(vec3 viewPos){vec2 t=texelTan(viewPos);return pow(1.+dot(t,t),.75);}`;
export const texelGain = (x, y) => (1 + x * x + y * y) ** 1.5;
// Point-spread function of every point sprite (stars, cluster stars, point galaxies, unresolved nebulae, HDR overlay):
// a Gaussian INTEGRATED over each pixel's area (erf), so that the pixel sum is 1 wherever the source falls between pixels.
// The former profile exp(−12 r²), sampled at pixel centres with sprites down to 1.25 px, gave pixel sums from 0 to 8 × the
// nominal value with sub-pixel position (NGC 604 seen from the Sun fell on a pixel corner and vanished). σ ≥ 0.55 px keeps
// the sum within 0.1 %; the sprite is drawn large enough (7σ + 1 px) to hold the Gaussian. The total stays 0.818 × flux,
// the pixel sum on which PHOT_ZERO is defined.
export const PSF_SUM = 0.818;
// psfMin: minimum σ in centre pixels of the surface the sprite is drawn on, × the local pixel scale. For the sky cube it is
// set to 0.6 SCREEN pixel (renderer.js): the cube is then resampled per screen pixel, and a Gaussian narrower than
// ~0.5 screen pixel is aliased (pixel sum ±19 % with the sub-pixel position on screen, measured 21 Oct 2026).
export const PSF_MIN_SCREEN = 0.6;
export const PSF_VERTEX_GLSL = `uniform float psfMin;varying float psfS,psfD;
float psfSigma(float size,float soft,float scale){return max(max(mix(.102,.177,soft)*size,.55),psfMin*scale);}
float psfDraw(float size,float sigma){return max(size,7.*sigma+1.);}`;
export const PSF_FRAGMENT_GLSL = `varying float psfS,psfD;
float erfA(float x){float s=sign(x);x=abs(x);float t=1./(1.+.3275911*x);return s*(1.-((((1.061405429*t-1.453152027)*t+1.421413741)*t-.284496736)*t+.254829592)*t*exp(-x*x));}
float pixelPSF(){vec2 p=(gl_PointCoord-.5)*psfD;float k=.70710678/psfS;return .25*(erfA((p.x+.5)*k)-erfA((p.x-.5)*k))*(erfA((p.y+.5)*k)-erfA((p.y-.5)*k));}`;
export const PSF_FRAGMENT = `varying vec3 light;${PSF_FRAGMENT_GLSL}
void main(){gl_FragColor=vec4(min(max(light*pixelPSF(),vec3(0.)),vec3(5000.)),1.);}`;
export const PHOT_ZERO = 0.818 * 10 ** 1.2 * PIXEL_SR;
export const fluxFromMag = (m) => PHOT_ZERO * 10 ** (-0.4 * m);
// "Visible · pose longue": diffuse emission (nebulae, comet comae and tails) is multiplied by this gain, i.e. 2.5 magnitudes,
// as on a long-exposure astrophotograph; "Visible · œil" keeps the physical surface brightness (gain 1).
export const LONG_EXPOSURE = 10;
export const diffuseGain = (band) => (band === 1 || band === 6 ? LONG_EXPOSURE : 1);
// Surface brightness (mag/arcsec²) of a radiance L on this scale, for documentation and tests.
export const ARCSEC2_SR = (Math.PI / 648000) ** 2;
export const magPerArcsec2 = (L) => -2.5 * Math.log10((L * ARCSEC2_SR) / PHOT_ZERO);
