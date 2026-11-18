// Mesures d'interface en lecture seule, pour comparer des dispositions sur une même scène.
// skyOcclusion() : part de la fenêtre où le ciel WebGL n'est recouvert par aucun élément d'interface
//   (union des rectangles sur une grille de 4 px ; même méthode que scripts/measure-sky-occlusion.cjs).
//   C'est une mesure géométrique, pas une mesure perceptive de la visibilité des astres.
// frameTimingSample(seconds) : intervalles entre images (requestAnimationFrame) sur la durée demandée ;
//   médiane, 95e centile, maximum et images de plus de 50 ms. Temps mural, pas un chronométrage GPU.

export function skyOcclusion({root=document,canvas=root.querySelector('canvas'),cell=4}={}){
 const W=innerWidth,H=innerHeight,cols=Math.ceil(W/cell),rows=Math.ceil(H/cell),grid=new Uint8Array(cols*rows);
 const sky=canvas?.getBoundingClientRect();
 const skip=e=>(canvas&&e.contains(canvas))||e===canvas||!!e.closest('svg');
 for(const e of root.querySelectorAll('body *')){
  if(skip(e))continue;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0)continue;
  const hasBg=!/rgba\(\d+, \d+, \d+, 0\)|transparent/.test(cs.backgroundColor)||cs.backgroundImage!=='none';
  const hasBorder=parseFloat(cs.borderTopWidth)>0&&!/rgba\(\d+, \d+, \d+, 0\)/.test(cs.borderTopColor);
  const hasText=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
  if(!(hasBg||hasBorder||hasText))continue;
  if(cs.pointerEvents==='none'&&!hasText&&!e.querySelector('*'))continue;
  const r=e.getBoundingClientRect();if(r.width<=0||r.height<=0||r.width*r.height>0.8*W*H)continue;
  const x0=Math.max(0,Math.floor(r.left/cell)),x1=Math.min(cols,Math.ceil(r.right/cell)),y0=Math.max(0,Math.floor(r.top/cell)),y1=Math.min(rows,Math.ceil(r.bottom/cell));
  for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++)grid[y*cols+x]=1;
 }
 // Les zones hors du canvas ne sont pas du ciel : elles comptent comme occultées.
 if(sky)for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const px=(x+.5)*cell,py=(y+.5)*cell;if(px<sky.left||px>sky.right||py<sky.top||py>sky.bottom)grid[y*cols+x]=1;}
 let covered=0;for(const v of grid)covered+=v;
 return {window:[W,H],sky:sky?[Math.round(sky.width),Math.round(sky.height)]:null,unoccludedPercent:+(100*(1-covered/grid.length)).toFixed(1),method:'union de rectangles, grille 4 px'};
}

export function frameTimingSample(seconds=10){
 return new Promise(resolve=>{const gaps=[];let last=null;const stop=performance.now()+seconds*1000;
  const tick=t=>{if(last!==null)gaps.push(t-last);last=t;if(t<stop)requestAnimationFrame(tick);else{
   const s=[...gaps].sort((a,b)=>a-b),q=p=>s.length?+s[Math.min(s.length-1,Math.floor(p*(s.length-1)))].toFixed(1):null;
   resolve({seconds,frames:gaps.length,fps:gaps.length?+(1000*gaps.length/gaps.reduce((a,b)=>a+b,0)).toFixed(1):0,p50:q(.5),p95:q(.95),max:s.length?+s.at(-1).toFixed(1):null,over50ms:gaps.filter(g=>g>50).length,visible:document.visibilityState==='visible',note:'temps mural entre images ; pas un chronométrage GPU'});}};
  requestAnimationFrame(tick);});
}
