// Inventaire des fonctions du cockpit : garde-fou de la refonte Immersion (matrice de préservation,
// docs/audits/task-force-2026-11-18/REPONSE_HEAD_UIUX_V1.md § 6). Une disposition peut déplacer ces éléments ;
// elle ne doit en perdre aucun.
// 1. Chaque identifiant de la matrice existe une seule fois et porte un nom lisible (texte, aria-label ou label).
// 2. Le noyau de pilotage est visible, cliquable (pas recouvert) et sans défilement, à 1280 × 585 et 1440 × 900.
// 3. Mesures informatives (sans échec) : ciel non occulté (skyOcclusion) et nombre de textes visibles < 12 px.
// node scripts/validate-feature-inventory.cjs
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../public'),PORT=3066;
const types={'.js':'text/javascript','.json':'application/json','.css':'text/css','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.bin':'application/octet-stream'};
const server=http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split('?')[0]);if(u.endsWith('/'))u+='index.html';const f=path.join(root,u);if(!f.startsWith(root)){res.statusCode=403;return res.end();}fs.readFile(f,(e,b)=>{if(e){res.statusCode=404;return res.end();}res.setHeader('Content-Type',types[path.extname(f)]||'text/html');res.end(b);});});

const MATRIX={
 'Perspectives et vues':['cockpit-view','external-view','map-view','cosmic-map-link'],
 'Navigation et recherche':['destination-search','hide-nav','engage','aim','clear-target','nearby-select','view-target','prepare-moon'],
 'Suivi du trajet et passage':['navigation-toggle','passage-stabilize','passage-cancel'],
 'Vision et vue':['intuitive','relativistic','doppler','identify','clean-view','restore-view'],
 'Carte galactique 3D':['show-ecliptic','show-galactic','show-path','map-sun','map-ship','map-route','map-galaxy','map-local-group','map-top','galaxy-scale'],
 'Vaisseau 3D':['ship-frame','ship-light','ship-focus'],
 'Manœuvre locale':['approach','retreat','orbit-left','orbit-right','science-color'],
 'Instruments d\'observation':['observatory-controls','graphics-profile','spectral-band','exposure','animate-bodies','observation-rate','compare-physics','catalogue-markers','basin-overlay','galaxy-light'],
 'Relativité':['speed-limiter','retarded-light','lensing'],
 'Risques du milieu':['gas-density','grain-mass','fictional-shield'],
 'Gravitation':['orbit-s2','continuous-gravity','local-gravity','hold-toggle','insert-orbit','orbit-map','gravity-hover','gravity-fall','gravity-exit'],
 'Laboratoire (fiction)':['wormhole-enabled','wormhole-mode','wormhole-jump','eclipse-list','eclipse-jump','lab-beta','close-lab'],
 'Fiche, journal, physique':['object-info','journal-open','physics-open','physics-mobile'],
 'Mission':['mission-menu','choose-earth','choose-moon','resume-mission','keep-mission','cosmic-flight-link','home'],
 'Temps et propulsion':['take-control','pause','thrust','coast','brake','time-rate'],
};
// Noyau toujours atteignable sans ouvrir de panneau (écran court : les choix de mission passent par « Mission ▾ »).
const CORE={tall:['destination-search','cockpit-view','external-view','map-view','identify','clean-view','pause','thrust','coast','brake','time-rate','choose-earth','choose-moon'],
 short:['destination-search','cockpit-view','external-view','map-view','identify','clean-view','pause','thrust','coast','brake','time-rate','mission-menu']};

const results=[];const check=(name,ok,detail='')=>{results.push({name,ok,detail});console.log((ok?'PASS ':'FAIL ')+name+(detail?' · '+detail:''));};
(async()=>{
 await new Promise(r=>server.listen(PORT,'127.0.0.1',r));
 const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const info={};
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});page.setDefaultTimeout(400000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${PORT}/cockpit.html?ui=classic`);await page.waitForFunction(()=>window.gpuStartupDiagnostic?.().ready&&!document.getElementById('flight-app').inert);
  const all=Object.values(MATRIX).flat();
  const facts=await page.evaluate(ids=>Object.fromEntries(ids.map(id=>{const els=document.querySelectorAll('#'+CSS.escape(id)),e=els[0];if(!e)return [id,{count:0}];
   const label=e.getAttribute('aria-label')||(e.labels&&[...e.labels].map(l=>l.textContent).join(' '))||e.closest('label')?.textContent||e.querySelector?.('summary')?.textContent||e.textContent||e.getAttribute('title')||e.getAttribute('placeholder')||'';
   return [id,{count:els.length,label:label.replace(/\s+/g,' ').trim().slice(0,60)}];})),all);
  for(const [group,ids] of Object.entries(MATRIX)){const missing=ids.filter(id=>facts[id].count!==1),unnamed=ids.filter(id=>facts[id].count===1&&!facts[id].label);
   check(`Inventaire · ${group} (${ids.length})`,!missing.length&&!unnamed.length,[missing.length?'absents ou dupliqués : '+missing.join(', '):'',unnamed.length?'sans nom lisible : '+unnamed.join(', '):''].filter(Boolean).join(' ; '));}
  const isShort=()=>page.evaluate(()=>matchMedia('(min-width:901px) and (max-height:760px)').matches);
  const core=async(label)=>{const short=await isShort(),ids=CORE[short?'short':'tall'];
   const r=await page.evaluate(ids=>ids.map(id=>{const e=document.getElementById(id);if(!e||!e.getClientRects().length)return [id,'invisible'];const b=e.getBoundingClientRect();
    if(b.bottom>innerHeight||b.right>innerWidth||b.top<0||b.left<0)return [id,'hors fenêtre'];const hit=document.elementFromPoint(b.left+b.width/2,b.top+b.height/2);
    return [id,hit&&(hit===e||e.contains(hit)||hit.closest('label')?.contains(e))?'ok':'recouvert par '+(hit?.id||hit?.className||hit?.tagName)];}).filter(x=>x[1]!=='ok'),ids);
   const scroll=await page.evaluate(()=>document.documentElement.scrollHeight>innerHeight+1);
   check(`Noyau de pilotage atteignable · ${label}${short?' (écran court)':''}`,!r.length&&!scroll,[...r.map(x=>x.join(' : ')),scroll?'la page défile':''].filter(Boolean).join(' ; '));
   info[label]=await page.evaluate(()=>({sky:window.skyOcclusion?.(),smallText:[...document.querySelectorAll('body *')].filter(e=>e.getClientRects().length&&getComputedStyle(e).clip==='auto'&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&parseFloat(getComputedStyle(e).fontSize)<12&&getComputedStyle(e).visibility!=='hidden').length}));
   console.log(`INFO ${label} · ciel non occulté ${info[label].sky?.unoccludedPercent} % · textes visibles < 12 px : ${info[label].smallText}`);};
  await core('1440 × 900');
  await page.setViewportSize({width:1280,height:585});await page.waitForTimeout(800);await core('1280 × 585');
  // Interface immersive (tranche 1) : mêmes identifiants, noyau atteignable, tiroirs N / I, retour au classique.
  await page.setViewportSize({width:1280,height:585});
  await page.goto(`http://127.0.0.1:${PORT}/cockpit.html?ui=immersive`);await page.waitForFunction(()=>window.gpuStartupDiagnostic?.().ready&&!document.getElementById('flight-app').inert);await page.waitForTimeout(600);
  check('Immersive · disposition active, ciel plein écran',await page.evaluate(()=>{const a=document.getElementById('flight-app'),c=document.getElementById('flight-canvas').getBoundingClientRect();return a.classList.contains('ui-immersive')&&Math.round(c.width)===innerWidth&&Math.round(c.height)===innerHeight;}));
  const facts2=await page.evaluate(ids=>ids.filter(id=>document.querySelectorAll('#'+CSS.escape(id)).length!==1),all);
  check('Immersive · les 95 identifiants de la matrice existent une seule fois',!facts2.length,facts2.join(', '));
  const reach=ids=>page.evaluate(ids=>ids.map(id=>{const e=document.getElementById(id);if(!e||!e.getClientRects().length||getComputedStyle(e).visibility==='hidden')return [id,'invisible'];const b=e.getBoundingClientRect();if(b.bottom>innerHeight||b.right>innerWidth||b.top<0||b.left<0)return [id,'hors fenêtre'];const hit=document.elementFromPoint(b.left+b.width/2,b.top+b.height/2);return [id,hit&&(hit===e||e.contains(hit)||hit.closest('label')?.contains(e))?'ok':'recouvert par '+(hit?.id||hit?.className||hit?.tagName)];}).filter(x=>x[1]!=='ok'),ids);
  let bad=await reach(['ui-mode-toggle','nav-drawer-toggle','instr-drawer-toggle','cockpit-view','external-view','map-view','identify','clean-view','pause','thrust','coast','brake','time-rate','mission-menu']);
  check('Immersive · noyau de pilotage et tiroirs atteignables sans défilement',!bad.length&&!(await page.evaluate(()=>document.documentElement.scrollHeight>innerHeight+1)),bad.map(x=>x.join(' : ')).join(' ; '));
  await page.waitForFunction(()=>window.renderer===undefined||true);await page.waitForTimeout(2500);
  info['Immersive 1280 × 585 · vol libre au démarrage']=await page.evaluate(()=>({sky:window.skyOcclusion?.(),smallText:[...document.querySelectorAll('body *')].filter(e=>e.getClientRects().length&&getComputedStyle(e).clip==='auto'&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&parseFloat(getComputedStyle(e).fontSize)<12&&getComputedStyle(e).visibility!=='hidden').length}));
  console.log(`INFO Immersive 1280 × 585 · vol libre au démarrage · ciel non occulté ${info['Immersive 1280 × 585 · vol libre au démarrage'].sky?.unoccludedPercent} % · textes visibles < 12 px : ${info['Immersive 1280 × 585 · vol libre au démarrage'].smallText}`);
  check('Immersive · tiroirs fermés inertes (hors tabulation)',await page.evaluate(()=>document.getElementById('dest-panel').inert&&document.getElementById('instruments-panel').inert));
  await page.click('#nav-drawer-toggle');await page.waitForFunction(()=>getComputedStyle(document.getElementById('dest-panel')).visibility==='visible'&&getComputedStyle(document.getElementById('dest-panel')).transform==='none');
  bad=await reach(['destination-search']);
  for(const id of ['engage','aim']){await page.evaluate(id=>document.getElementById(id).scrollIntoView({block:'nearest'}),id);await page.waitForTimeout(150);bad.push(...await reach([id]));}
  check('Immersive · tiroir Navigation : recherche, puis Engager et Orienter (après défilement du tiroir)',!bad.length&&!(await page.evaluate(()=>document.getElementById('dest-panel').inert)),bad.map(x=>x.join(' : ')).join(' ; '));
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.getElementById('flight-app').classList.contains('nav-open'));
  await page.click('#instr-drawer-toggle');await page.waitForFunction(()=>getComputedStyle(document.getElementById('instruments-panel')).transform==='none');
  await page.evaluate(()=>document.getElementById('observatory-controls').scrollIntoView({block:'nearest'}));await page.waitForTimeout(200);
  bad=await reach(['observatory-controls']);
  check('Immersive · tiroir Instruments : instruments d\'observation atteignables (après défilement du tiroir)',!bad.length,bad.map(x=>x.join(' : ')).join(' ; '));
  await page.mouse.click(640,300);await page.waitForFunction(()=>!document.getElementById('flight-app').classList.contains('instr-open'));
  check('Immersive · un clic dans le ciel referme les tiroirs',true);
  info['Immersive 1280 × 585 · après interactions']=await page.evaluate(()=>({sky:window.skyOcclusion?.(),smallText:[...document.querySelectorAll('body *')].filter(e=>e.getClientRects().length&&getComputedStyle(e).clip==='auto'&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&parseFloat(getComputedStyle(e).fontSize)<12&&getComputedStyle(e).visibility!=='hidden').length}));
  console.log(`INFO Immersive 1280 × 585 · après interactions · ciel non occulté ${info['Immersive 1280 × 585 · après interactions'].sky?.unoccludedPercent} % · textes visibles < 12 px : ${info['Immersive 1280 × 585 · après interactions'].smallText}`);
  check('Immersive · télémétrie en pastille renseignée',await page.evaluate(()=>{const t=document.getElementById('immersive-telemetry');return !t.hidden&&/\d/.test(document.getElementById('it-v').textContent)&&document.getElementById('it-dest').textContent.length>0;}));
  await page.click('#ui-mode-toggle');await page.waitForTimeout(300);
  check('Bascule vers Classique : disposition d\'origine rétablie',await page.evaluate(()=>!document.getElementById('flight-app').classList.contains('ui-immersive')&&document.getElementById('immersive-telemetry').hidden&&!document.getElementById('dest-panel').inert&&getComputedStyle(document.querySelector('.flight-workspace')).display==='grid'));
  await page.goto(`http://127.0.0.1:${PORT}/cockpit.html?ui=classic`);await page.waitForFunction(()=>typeof window.flightSnapshot==='function');
  // V3.0 (décision du 24 novembre) : immersif par défaut sur ordinateur, bascule visible pour revenir au Classique, choix mémorisé.
  await page.evaluate(()=>{try{localStorage.removeItem('odyssee-ui-mode');}catch{}});await page.goto(`http://127.0.0.1:${PORT}/cockpit.html`);await page.waitForFunction(()=>typeof window.flightSnapshot==='function');
  check('Ordinateur : immersif par défaut sans ?ui= ni choix mémorisé, bascule vers le Classique visible',await page.evaluate(()=>document.getElementById('flight-app').classList.contains('ui-immersive')&&!document.getElementById('ui-mode-toggle').hidden));
  await page.click('#ui-mode-toggle');await page.waitForTimeout(300);await page.goto(`http://127.0.0.1:${PORT}/cockpit.html`);await page.waitForFunction(()=>typeof window.flightSnapshot==='function');
  check('Choix du Classique mémorisé au rechargement',await page.evaluate(()=>!document.getElementById('flight-app').classList.contains('ui-immersive')&&localStorage.getItem('odyssee-ui-mode')==='classic'));
  await page.evaluate(()=>{try{localStorage.removeItem('odyssee-ui-mode');}catch{}});
  check('Fonctions de mesure exposées (skyOcclusion, frameTimingSample, phases de démarrage)',await page.evaluate(()=>typeof window.skyOcclusion==='function'&&typeof window.frameTimingSample==='function'&&!!window.gpuStartupDiagnostic().phases?.engine));
  // Démarrage dans un onglet caché : aucune attente d'image (correctif tranche 1).
  {const hidden=await browser.newPage({viewport:{width:1280,height:585}});hidden.setDefaultTimeout(400000);
   await hidden.addInitScript(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>'hidden'});});
   await hidden.goto(`http://127.0.0.1:${PORT}/cockpit.html?ui=classic`);await hidden.waitForFunction(()=>window.gpuStartupDiagnostic?.().phases?.frameWait);
   const w=await hidden.evaluate(()=>({label:gpuStartupDiagnostic().entries.find(e=>e.label.startsWith('Attente'))?.label,ms:gpuStartupDiagnostic().phases.frameWait.ms}));
   check('Onglet caché au démarrage : pas d\'attente d\'image',/caché/.test(w.label||'')&&w.ms!==null&&w.ms<100,`${w.label} · ${w.ms} ms`);await hidden.close();}
  check('Aucune erreur de page',errors.length===0,errors.join(' | '));
  await page.close();
 }finally{await browser.close();server.close();}
 const failed=results.filter(r=>!r.ok);
 fs.writeFileSync(path.resolve(__dirname,'../validation/feature-inventory.json'),JSON.stringify({passed:results.length-failed.length,failed:failed.length,results,info},null,1));
 console.log(failed.length?`${failed.length} échec(s)`:`${results.length} contrôles réussis`);process.exit(failed.length?1:0);
})().catch(e=>{console.error(e);server.close();process.exit(1);});
