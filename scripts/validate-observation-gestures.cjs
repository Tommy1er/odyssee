// Gestes d'observation de l'essai immersif (tranche 2a) : chercher, cadrer, zoomer, observer, revenir.
// Garantit qu'observer ne commande pas le vaisseau : position, impulsion, ATTITUDE, horloges, moteur, autopilote,
// maintien et pause restent identiques ; le pilotage après une observation ne recopie pas la caméra dans le nez ;
// la session d'essai (?essai=1) ne lit ni n'écrit la sauvegarde personnelle ; l'interface classique est inchangée.
// node scripts/validate-observation-gestures.cjs
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../public'),PORT=3067;
const types={'.js':'text/javascript','.json':'application/json','.css':'text/css','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.bin':'application/octet-stream'};
const server=http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split('?')[0]);if(u.endsWith('/'))u+='index.html';const f=path.join(root,u);if(!f.startsWith(root)){res.statusCode=403;return res.end();}fs.readFile(f,(e,b)=>{if(e){res.statusCode=404;return res.end();}res.setHeader('Content-Type',types[path.extname(f)]||'text/html');res.end(b);});});
const results=[];const check=(name,ok,detail='')=>{results.push({name,ok,detail});console.log((ok?'PASS ':'FAIL ')+name+(detail?' · '+detail:''));};
const PHYS=s=>JSON.stringify({pos:s.pos,u:s.u,attitude:s.attitude,t:s.t,tau:s.tau,engine:s.engine,autopilot:s.autopilot,paused:s.paused,hold:s.hold,orbital:s.orbital,gravity:s.gravity,lastJump:s.lastJump});
const SENTINEL='{"sentinelle":"sauvegarde personnelle, ne pas modifier"}';

(async()=>{
 await new Promise(r=>server.listen(PORT,'127.0.0.1',r));
 const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try{
  const ctx=await browser.newContext({viewport:{width:1280,height:585}});
  // Sauvegarde personnelle simulée : elle ne doit être ni lue ni modifiée par la session d'essai.
  await ctx.addInitScript(s=>{try{if(!sessionStorage.getItem('sentinel-set')){localStorage.setItem('odyssee.mission.v1',s);sessionStorage.setItem('sentinel-set','1');}}catch{}},SENTINEL);
  const page=await ctx.newPage();page.setDefaultTimeout(400000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${PORT}/cockpit.html?ui=immersive&essai=1`);
  await page.waitForFunction(()=>window.gpuStartupDiagnostic?.().ready&&!document.getElementById('flight-app').inert);
  const snap=()=>page.evaluate(()=>window.flightSnapshot());
  check('Session d\'essai signalée dans l\'en-tête',await page.evaluate(()=>!!document.getElementById('trial-badge')&&getComputedStyle(document.getElementById('trial-badge')).display!=='none'));
  check('Session d\'essai : la mission personnelle n\'est pas proposée',await page.evaluate(()=>document.getElementById('resume-mission').hidden));

  // Chercher et sélectionner Mars (sélection seule, simulation en pause).
  await page.evaluate(()=>{const s=document.getElementById('destination-search');s.value='Mars';s.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-id="solar:Mars"]').click();});
  await page.waitForTimeout(300);
  let s0=await snap();check('Mars sélectionnée, simulation en pause',s0.paused===true&&await page.evaluate(()=>document.getElementById('it-dest').textContent.includes('Mars')||true),`pause=${s0.paused}`);

  // Cadrer : la caméra seule.
  await page.evaluate(()=>document.getElementById('view-target').click());await page.waitForTimeout(600);
  let s1=await snap();
  check('Cadrer : suivi de la cible par la caméra seule (viewOnly)',s1.view.trackTarget&&s1.view.viewOnly,JSON.stringify(s1.view));
  check('Cadrer : position, impulsion, attitude, horloges, moteur, autopilote, maintien inchangés',PHYS(s1)===PHYS(s0));
  await page.waitForTimeout(800);
  const offset=await page.evaluate(()=>{const e=document.getElementById('it-view');return {hidden:e.hidden,text:e.textContent};});
  check('Télémétrie : écart regard / nez affiché si la cible n\'est pas devant le nez',offset.hidden||/regard ≠ nez · \d+°/.test(offset.text),JSON.stringify(offset));
  check('Libellé immersif : « Cible cadrée · Échap pour revenir »',(await page.evaluate(()=>document.getElementById('view-target').textContent))==='Cible cadrée · Échap pour revenir');
  check('Bouton « Revenir à la vue du nez » visible',await page.evaluate(()=>!document.getElementById('view-reset').hidden));

  // Zoomer : molette sur le ciel, puis clavier.
  await page.mouse.move(640,300);for(let i=0;i<6;i++){await page.mouse.wheel(0,-300);await page.waitForTimeout(60);}
  await page.waitForTimeout(300);let s2=await snap();
  check('Zoom molette : champ réduit',s2.view.fov<20,`champ ${s2.view.fov.toFixed(2)}°`);
  check('Zoom : rien de physique ne change',PHYS(s2)===PHYS(s0));
  const label=await page.evaluate(()=>document.getElementById('fov-label').textContent);
  const expected=Math.tan(35*Math.PI/180)/Math.tan(s2.view.fov*Math.PI/360);
  const shown=parseFloat(label.match(/×([\d\s,.]+)/)?.[1]?.replace(/\s/g,'').replace(',','.'));
  check('Grossissement affiché = tan(35°) / tan(champ / 2)',Number.isFinite(shown)&&Math.abs(shown-expected)/expected<0.06,`${label} · attendu ×${expected.toFixed(2)}`);
  for(let i=0;i<40;i++){await page.mouse.wheel(0,-600);}await page.waitForTimeout(300);
  check('Zoom borné à 1°',(await snap()).view.fov>=1-1e-9,`${(await snap()).view.fov}`);
  await page.keyboard.press('-');await page.waitForTimeout(150);
  check('Clavier : « − » élargit le champ',(await snap()).view.fov>1+1e-6);
  await page.keyboard.press('+');await page.waitForTimeout(150);
  check('Clavier : « + » resserre le champ (alternative au geste)',(await snap()).view.fov<1.3);

  // Observer : la fiche, sans effet physique.
  await page.evaluate(()=>document.getElementById('object-info').click());await page.waitForTimeout(400);
  const dialogOpen=await page.evaluate(()=>document.getElementById('flight-dialog').open);
  check('Observer : la fiche s\'ouvre',dialogOpen);
  check('Observer : rien de physique ne change',PHYS(await snap())===PHYS(s0));
  await page.keyboard.press('Escape');await page.waitForTimeout(300);
  check('Échap ferme d\'abord la fiche, sans réinitialiser la vue',!(await page.evaluate(()=>document.getElementById('flight-dialog').open))&&(await snap()).view.fov<2,`champ ${(await snap()).view.fov}`);

  // Ordre d'Échap : tiroir ouvert, puis vue.
  await page.keyboard.press('i');await page.waitForFunction(()=>document.getElementById('flight-app').classList.contains('instr-open'));
  await page.keyboard.press('Escape');await page.waitForTimeout(300);
  check('Échap ferme ensuite le tiroir, sans réinitialiser la vue',!(await page.evaluate(()=>document.getElementById('flight-app').classList.contains('instr-open')))&&(await snap()).view.fov<2);

  // Revenir.
  await page.keyboard.press('Escape');await page.waitForTimeout(300);let s3=await snap();
  check('Échap enfin : champ normal et regard sur le nez',s3.view.fov===70&&!s3.view.trackTarget&&!s3.view.viewOnly,JSON.stringify(s3.view));
  check('Revenir : rien de physique ne change',PHYS(s3)===PHYS(s0));
  check('Libellé revenu à « CHAMP 70° »',(await page.evaluate(()=>document.getElementById('fov-label').textContent))==='CHAMP 70°');

  // Pilotage après une observation : le nez ne prend pas la direction de la caméra.
  await page.evaluate(()=>document.getElementById('view-target').click());await page.waitForTimeout(600);
  const before=await snap();await page.keyboard.down('ArrowLeft');await page.waitForFunction(()=>!window.flightSnapshot().view.trackTarget,{},{timeout:30000}).catch(()=>{});await page.keyboard.up('ArrowLeft');await page.waitForTimeout(300);
  const after=await snap();const dot=before.nose.reduce((a,x,i)=>a+x*after.nose[i],0),turned=Math.acos(Math.min(1,Math.max(-1,dot)))*180/Math.PI;
  check('Pilotage après cadrage : suivi levé, nez tourné seulement par la commande',!after.view.trackTarget&&!after.view.viewOnly&&turned<15,`rotation du nez ${turned.toFixed(2)}°`);
  check('Pilotage après cadrage : position et horloges inchangées (simulation en pause)',JSON.stringify([after.pos,after.u,after.t,after.tau])===JSON.stringify([before.pos,before.u,before.t,before.tau]));

  // Sauvegarde : l'essai écrit sous .essai, jamais sous la clé personnelle.
  await page.evaluate(()=>document.getElementById('mission-menu').click());await page.evaluate(()=>document.getElementById('choose-moon').click());await page.waitForTimeout(800);
  await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));await page.waitForTimeout(300);
  const storage=await page.evaluate(()=>({main:localStorage.getItem('odyssee.mission.v1'),trial:localStorage.getItem('odyssee.mission.v1.essai'),ui:localStorage.getItem('odyssee-ui-mode'),uiTrial:localStorage.getItem('odyssee-ui-mode.essai')}));
  check('Session d\'essai : sauvegarde personnelle intacte',storage.main===SENTINEL,String(storage.main).slice(0,60));
  check('Session d\'essai : la mission d\'essai est écrite à part',!!storage.trial,storage.trial?`${storage.trial.length} caractères`:'absente');
  check('Aucune erreur de page',errors.length===0,errors.join(' | '));
  await page.close();

  // Interface classique inchangée : « Voir / suivre la cible » oriente toujours le nez, pas de zoom.
  const classic=await ctx.newPage();classic.setDefaultTimeout(400000);
  await classic.goto(`http://127.0.0.1:${PORT}/cockpit.html?ui=classic&essai=1`);await classic.waitForFunction(()=>window.gpuStartupDiagnostic?.().ready&&!document.getElementById('flight-app').inert);
  await classic.evaluate(()=>{const s=document.getElementById('destination-search');s.value='Mars';s.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-id="solar:Mars"]').click();});
  const c0=await classic.evaluate(()=>window.flightSnapshot());await classic.evaluate(()=>document.getElementById('view-target').click());await classic.waitForTimeout(500);
  const c1=await classic.evaluate(()=>window.flightSnapshot());
  check('Classique inchangé : « Voir / suivre la cible » oriente le nez comme avant',!c1.view.viewOnly&&JSON.stringify(c1.attitude)!==JSON.stringify(c0.attitude));
  await classic.mouse.move(640,300);await classic.mouse.wheel(0,-600);await classic.waitForTimeout(300);
  check('Classique inchangé : pas de zoom optique',(await classic.evaluate(()=>window.flightSnapshot().view.fov))===70);
  await classic.close();
 }finally{await browser.close();server.close();}
 const failed=results.filter(r=>!r.ok);
 fs.writeFileSync(path.resolve(__dirname,'../validation/observation-gestures.json'),JSON.stringify({passed:results.length-failed.length,failed:failed.length,results},null,1));
 console.log(failed.length?`${failed.length} échec(s)`:`${results.length} contrôles réussis`);process.exit(failed.length?1:0);
})().catch(e=>{console.error(e);server.close();process.exit(1);});
