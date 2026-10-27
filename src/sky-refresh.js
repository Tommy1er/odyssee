// Background cubes contain catalogue-frame light, not camera orientation or observer Doppler.
// Ordinary motion may reuse them for at most 0.5 s; large parallax/teleports remain immediate.
export function needsSkyCapture(previous,{key,pos,t,wall,paused,nearest},cubeSize=1024){
 if(!previous||previous.key!==key)return true;
 const tolerance=Math.max(1e-12,previous.nearest*.25/cubeSize);
 if(Math.hypot(...pos.map((v,i)=>v-previous.pos[i]))>tolerance)return true;
 if(Math.abs(t-previous.t)>1)return true; // large mission-time jumps
 return wall-previous.wall>(paused?4:.5);
}
