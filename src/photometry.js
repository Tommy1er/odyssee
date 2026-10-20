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
export const PHOT_ZERO = 0.818 * 10 ** 1.2 * PIXEL_SR;
export const fluxFromMag = (m) => PHOT_ZERO * 10 ** (-0.4 * m);
// "Visible · pose longue": diffuse emission (nebulae, comet comae and tails) is multiplied by this gain, i.e. 2.5 magnitudes,
// as on a long-exposure astrophotograph; "Visible · œil" keeps the physical surface brightness (gain 1).
export const LONG_EXPOSURE = 10;
export const diffuseGain = (band) => (band === 1 || band === 6 ? LONG_EXPOSURE : 1);
// Surface brightness (mag/arcsec²) of a radiance L on this scale, for documentation and tests.
export const ARCSEC2_SR = (Math.PI / 648000) ** 2;
export const magPerArcsec2 = (L) => -2.5 * Math.log10((L * ARCSEC2_SR) / PHOT_ZERO);
