// Bound full-screen ray marching independently of CSS size / monitor DPI.
// Cube resolution and its photometric calibration are deliberately unchanged.
export const MAX_RENDER_PIXELS=1920*1080;
export function renderPixelRatio(width,height,dpr=1){
 if(!(width>0&&height>0))return 1;
 return Math.min(Number.isFinite(dpr)&&dpr>0?dpr:1,2,Math.sqrt(MAX_RENDER_PIXELS/(width*height)));
}
