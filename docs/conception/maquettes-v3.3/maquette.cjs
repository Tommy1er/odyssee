// Maquette V3.3 de la rangée basse : le vrai cockpit (essai immersif), réarrangé dans le navigateur de test seulement.
// node docs/conception/maquettes-v3.3/maquette.cjs [dossier de sortie] · après npm run build ; ne modifie aucun fichier source.
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../../../public'),OUT=process.argv[2]||__dirname;const types={'.js':'text/javascript','.json':'application/json','.css':'text/css','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg','.bin':'application/octet-stream'};
const server=http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split('?')[0]);if(u.endsWith('/'))u+='index.html';fs.readFile(path.join(root,u),(e,b)=>{if(e){res.statusCode=404;return res.end();}res.setHeader('Content-Type',types[path.extname(u)]||'text/html');res.end(b);});});
const shot=async(p,name)=>{const c=await p.context().newCDPSession(p);const s=await c.send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`${OUT}/${name}.png`,Buffer.from(s.data,'base64'));};
(async()=>{await new Promise(r=>server.listen(3093,'127.0.0.1',r));const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await (await b.newContext({viewport:{width:1280,height:585}})).newPage();p.setDefaultTimeout(400000);
await p.goto('http://127.0.0.1:3093/cockpit.html?ui=immersive&essai=1');await p.waitForFunction(()=>window.gpuStartupDiagnostic?.().ready&&!document.getElementById('flight-app').inert);
await p.evaluate(()=>{const s=document.getElementById('destination-search');s.value='Mars';s.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-id="solar:Mars"]').click();});
await p.waitForTimeout(3000);
const groups=()=>p.evaluate(()=>[...document.querySelectorAll('.flight-controls > *')].filter(e=>e.getClientRects().length).map(e=>{const r=e.getBoundingClientRect();return {cls:e.className,w:Math.round(r.width),h:Math.round(r.height),text:e.innerText.replace(/\s+/g,' ').slice(0,80)};}));
const before={sky:(await p.evaluate(()=>window.skyOcclusion())).unoccludedPercent,groups:await groups()};console.log('AVANT',JSON.stringify(before));await shot(p,'barre-actuelle');
await p.evaluate(()=>{
 const $=id=>document.getElementById(id),actions=$('mission-actions');
 const sep=document.createElement('div');sep.className='maquette-sep';actions.append(sep,$('home'),$('cosmic-flight-link'));
 $('home').textContent='Nouvelle mission';$('cosmic-flight-link').textContent='Mission cosmologique ↗';
 $('take-control').dataset.maquette='contextuel';$('take-control').style.display='none';
 $('pause').after($('time-rate'));
 for(const g of document.querySelectorAll('.flight-controls > *'))if(![...g.querySelectorAll('button,select,a')].some(e=>e.offsetParent&&getComputedStyle(e).display!=='none'))g.style.display='none';
 const st=document.createElement('style');st.textContent='#mission-actions .maquette-sep{height:1px;background:rgba(255,255,255,.18);margin:4px 0}#mission-actions #home,#mission-actions #cosmic-flight-link{display:block;width:100%;text-align:left}#time-rate{margin-left:4px}';document.head.append(st);
});
await p.waitForTimeout(800);
const after={sky:(await p.evaluate(()=>window.skyOcclusion())).unoccludedPercent,groups:await groups()};console.log('APRÈS',JSON.stringify(after));await shot(p,'barre-v33');
await p.evaluate(()=>document.getElementById('mission-menu').click());await p.waitForTimeout(500);await shot(p,'barre-v33-menu-mission');
console.log('menu',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('#mission-actions > *')].filter(e=>e.offsetParent).map(e=>e.textContent.trim()))));
await p.keyboard.press('Escape');await p.waitForTimeout(300);
await p.evaluate(()=>{document.getElementById('take-control').style.display='';});await p.waitForTimeout(300);
console.log('AVEC REPRENDRE',JSON.stringify((await p.evaluate(()=>window.skyOcclusion())).unoccludedPercent));await shot(p,'barre-v33-pilote-auto');
await p.evaluate(()=>{document.getElementById('take-control').style.display='none';
 const links=document.querySelector('.header-links');const keep=[...links.children].filter(e=>e.id==='trial-badge'||e.id==='ui-mode-toggle');
 const more=document.createElement('button');more.textContent='Plus ▾';more.className='maquette-plus';
 for(const e of [...links.children])if(!keep.includes(e))e.style.display='none';links.append(more);
 const vs=[...document.querySelectorAll('.glass-top *')].find(e=>/VISION RELATIVISTE|VISION/.test(e.textContent)&&e.children.length===0);if(vs)vs.closest('.glass-top>*,.glass-top').style.visibility='hidden';
});await p.waitForTimeout(600);
console.log('VARIANTE B',JSON.stringify((await p.evaluate(()=>window.skyOcclusion())).unoccludedPercent));await shot(p,'barre-v33-variante-b');
await b.close();server.close();})().catch(e=>{console.error(e);process.exit(1);});
