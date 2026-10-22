import {nebulaDirections as data} from './nebula-direction-data.js';
// Bilinear, periodic azimuth / polar angle. Pole rows are constant; no seam jump.
// Per-channel ratio to the Earth view: includes internal extinction and colour.
export function nebulaDirectionGain(id,direction){
 const r=Math.hypot(...direction);if(!(r>0))return [1,1,1];
 const rows=data.tables[id]||data.tables.orion,theta=Math.acos(Math.max(-1,Math.min(1,direction[2]/r)))*data.latitude/Math.PI;
 const phi=((Math.atan2(direction[1],direction[0])/(2*Math.PI)+1)%1)*data.longitude;
 const i=Math.min(data.latitude-1,Math.floor(theta)),j=Math.floor(phi),a=theta-i,b=phi-j;
 return [0,1,2].map(k=>(rows[i][j][k]*(1-b)+rows[i][(j+1)%data.longitude][k]*b)*(1-a)+(rows[i+1][j][k]*(1-b)+rows[i+1][(j+1)%data.longitude][k]*b)*a);
}
