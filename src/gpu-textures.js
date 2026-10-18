import * as T from 'three';
// Linear filtering of 32-bit float textures requires OES_texture_float_linear. Without it (some phones and tablets),
// WebGL2 treats every float LUT as incomplete and samples black: with the extension hidden in Chromium the whole sky
// (stars, Milky Way, galaxies, nebulae) rendered black. Half-float textures are always filterable in WebGL2, so they are
// used only as a fallback (relative precision 5e-4: below 1 % in flux for the black-body ln Y of visible temperatures).
let supported;
export function floatLinearSupported(){
 if(supported!==undefined)return supported;
 supported=true;
 try{if(typeof document!=='undefined'){const gl=document.createElement('canvas').getContext('webgl2');if(gl){supported=!!gl.getExtension('OES_texture_float_linear');gl.getExtension('WEBGL_lose_context')?.loseContext();}}}catch{supported=true;}
 return supported;
}
export function toHalfArray(data){const h=new Uint16Array(data.length);for(let i=0;i<data.length;i++)h[i]=T.DataUtils.toHalfFloat(Math.max(-65504,Math.min(65504,data[i])));return h;}
// RGBA lookup table with linear filtering: Float32 when filterable, otherwise HalfFloat.
export function lutTexture(data,width,height,half=!floatLinearSupported()){
 const f32=data instanceof Float32Array?data:new Float32Array(data);
 const tex=half?new T.DataTexture(toHalfArray(f32),width,height,T.RGBAFormat,T.HalfFloatType):new T.DataTexture(f32,width,height,T.RGBAFormat,T.FloatType);
 tex.minFilter=tex.magFilter=T.LinearFilter;tex.needsUpdate=true;return tex;
}
