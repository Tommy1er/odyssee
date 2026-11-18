// Part du ciel non occulté dans la fenêtre (méthode « union des rectangles », grille de 4 px, inspirée de Qwen V2).
// Compte comme occultant tout élément visible qui a un fond, une bordure ou du texte propre ; ignore le canvas WebGL
// et ses conteneurs, les couches pleine fenêtre et les couches décoratives sans texte ni interaction (vignettes).
// Usage : node scripts/measure-sky-occlusion.cjs [largeur] [hauteur]
//   mesure les maquettes V3.1, les prototypes Qwen et le cockpit construit dans public/ (SwiftShader).
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const W=+process.argv[2]||1280,H=+process.argv[3]||585,ROOT=path.resolve(__dirname,'..'),PUB=path.join(ROOT,'public'),PORT=3074;
const types={'.js':'text/javascript','.json':'application/json','.css':'text/css','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const f=path.join(PUB,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(PUB)){res.statusCode=403;return res.end();}fs.readFile(f,(e,b)=>{if(e){res.statusCode=404;return res.end();}res.setHeader('Content-Type',types[path.extname(f)]||'text/html');res.end(b);});});
function measure(){
 const W=innerWidth,H=innerHeight,C=4,cols=Math.ceil(W/C),rows=Math.ceil(H/C),g=new Uint8Array(cols*rows),cv=document.querySelector('canvas');
 const skip=e=>(cv&&e.contains(cv))||e.matches('.stage,.sky,.vig,body,html,canvas')||!!e.closest('svg');
 for(const e of document.querySelectorAll('body *')){
  if(skip(e))continue;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0)continue;
  const hasBg=!/rgba\(\d+, \d+, \d+, 0\)|transparent/.test(cs.backgroundColor)||(cs.backgroundImage!=='none'&&!e.matches('.bracket'));
  const hasBorder=parseFloat(cs.borderTopWidth)>0&&!/rgba\(\d+, \d+, \d+, 0\)/.test(cs.borderTopColor);
  const hasText=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
  if(!(hasBg||hasBorder||hasText))continue;
  if(cs.pointerEvents==='none'&&!hasText&&!e.querySelector('*'))continue;
  const r=e.getBoundingClientRect();if(r.width<=0||r.height<=0||r.width*r.height>0.8*W*H)continue;
  const x0=Math.max(0,Math.floor(r.left/C)),x1=Math.min(cols,Math.ceil(r.right/C)),y0=Math.max(0,Math.floor(r.top/C)),y1=Math.min(rows,Math.ceil(r.bottom/C));
  for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++)g[y*cols+x]=1;}
 let c=0;for(const v of g)c+=v;return +(100*(1-c/g.length)).toFixed(1);
}
(async()=>{
 await new Promise(r=>server.listen(PORT,'127.0.0.1',r));
 const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const out=[];
 const page=async()=>{const p=await b.newPage({viewport:{width:W,height:H}});p.setDefaultTimeout(400000);return p;};
 try{
  for(const f of ['Explorer31','Explorer31-panneaux','Explorer31-exterieur','Explorer31-cinema','Carte31']){const p=await page();await p.goto('file://'+path.join(ROOT,'docs/conception/maquettes-v3.1',f+'.html'));await p.waitForTimeout(400);out.push(['Maquette V3.1 · '+f,await p.evaluate(measure)]);await p.close();}
  {const p=await page();await p.goto('file://'+path.join(ROOT,'docs/audits/task-force-2026-11-18/prototypes/qwen-v2-demonstrateur.html'));await p.waitForTimeout(800);
   await p.evaluate(()=>[...document.querySelectorAll('*')].find(e=>/PROTOTYPE v2/.test(e.textContent)&&e.children.length===0)?.click());await p.waitForTimeout(300);
   out.push(['Prototype Qwen V2 · Immersion',await p.evaluate(measure)]);
   for(const n of ['Travail','Cinéma']){await p.getByRole('button',{name:n,exact:true}).click();await p.waitForTimeout(500);out.push(['Prototype Qwen V2 · '+n,await p.evaluate(measure)]);}await p.close();}
  {const p=await page();await p.goto(`http://127.0.0.1:${PORT}/cockpit.html`);await p.waitForFunction(()=>typeof window.flightSnapshot==='function'&&!document.getElementById('flight-app').inert);await p.waitForTimeout(1500);
   out.push(['Cockpit construit · vol libre',await p.evaluate(measure)]);await p.click('#clean-view');await p.waitForTimeout(800);out.push(['Cockpit construit · vue dégagée',await p.evaluate(measure)]);await p.close();}
 }finally{await b.close();server.close();}
 console.log(`Ciel non occulté, fenêtre ${W} × ${H}`);for(const [k,v] of out)console.log(`${v.toFixed(1).padStart(5)} %  ${k}`);
})().catch(e=>{console.error(e);process.exit(1);});
