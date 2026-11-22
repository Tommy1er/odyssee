// Démonstrateur S2 (session d'essai) : Kepler reste le témoin ; la case « précession relativiste » sépare les deux repères de péricentre
// de Δφ = 6πGM/(c²a(1−e²)) ≈ 12,2′ (GRAVITY 2020 : 12′, f_SP = 1,10 ± 0,19). La simulation n'est pas modifiée par la case.
const {openObservationTools}=require('./cockpit-ui-helpers.cjs');
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation');const checks=[],errors=[];let failed=0;
const check=(label,ok,detail='')=>{checks.push({label,ok:!!ok,detail});if(!ok)failed++;console.log((ok?'PASS ':'FAIL ')+label+(detail?' · '+detail:''));};
const server=http.createServer((req,res)=>{const file=path.join(root,decodeURIComponent(req.url.split('?')[0]));try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.json')?'application/json':file.endsWith('.glb')?'model/gltf-binary':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));}catch{res.statusCode=404;res.end('404');}});
(async()=>{await new Promise(r=>server.listen(3023,'127.0.0.1',r));const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try{const page=await browser.newPage({viewport:{width:1280,height:720}});page.setDefaultTimeout(240000);page.on('pageerror',e=>errors.push(e.message));
  const snap=()=>page.evaluate(()=>window.flightSnapshot());const PHYS=s=>JSON.stringify({pos:s.pos,u:s.u,t:s.t,tau:s.tau,engine:s.engine,autopilot:s.autopilot,paused:s.paused});
  await page.goto('http://127.0.0.1:3023/cockpit.html?essai=1');await page.waitForFunction(()=>window.gpuStartupDiagnostic?.().ready&&!document.getElementById('flight-app').inert);
  await openObservationTools(page);
  await page.locator('#wormhole-enabled').check();await page.selectOption('#wormhole-mode','stable');
  await page.fill('#destination-search','Sagittarius A');await page.click('[data-id="sgr-a"]');await page.click('#wormhole-jump');
  await page.waitForFunction(()=>window.flightSnapshot().lastJump?.id==='sgr-a'&&!window.flightSnapshot().passage);await page.waitForTimeout(2000);
  check('Essai : case « S2 : précession relativiste » visible, décochée (Kepler par défaut)',await page.evaluate(()=>!document.getElementById('orbit-s2-gr-label').hidden&&!document.getElementById('orbit-s2-gr').checked));
  const k=await page.evaluate(()=>window.s2Demonstrator());
  check('Kepler (témoin) : les deux repères de péricentre sont confondus',k.visible&&!k.gr&&k.markerArcmin<1e-3,JSON.stringify(k));
  const s0=await snap();
  await page.evaluate(()=>document.getElementById('orbit-s2-gr').click());
  // Les repères sont reconstruits à la prochaine image dessinée : attendre la condition plutôt qu'un délai fixe (runners lents).
  await page.waitForFunction(()=>window.s2Demonstrator().key.startsWith('true'),null,{timeout:120000}).catch(()=>{});
  const g=await page.evaluate(()=>window.s2Demonstrator());
  check('Relativité : repères séparés de 12,2′ (prédiction de Schwarzschild ; GRAVITY 2020 : 12′)',g.gr&&Math.abs(g.markerArcmin-12.18)<.05,`${g.markerArcmin.toFixed(3)}′`);
  check('La case ne modifie pas la simulation (position, impulsion, horloges, moteur)',PHYS(await snap())===PHYS(s0));
  await page.click('#view-target').catch(()=>{});await page.waitForTimeout(1500);
  const c=await page.context().newCDPSession(page);const shot=await c.send('Page.captureScreenshot',{format:'jpeg',quality:80});fs.writeFileSync(path.join(out,'ui/cockpit-s2-precession-essai.jpg'),Buffer.from(shot.data,'base64'));
  await page.goto('http://127.0.0.1:3023/cockpit.html');await page.waitForFunction(()=>typeof window.flightSnapshot==='function');
  check('Hors essai : case absente, Kepler seul',await page.evaluate(()=>document.getElementById('orbit-s2-gr-label').hidden&&typeof window.s2Demonstrator!=='function'));
  check('Aucune erreur de page',errors.length===0,errors.join(' | '));
 }catch(e){failed++;console.log('FAIL exception · '+e.message);}
 finally{await browser.close();server.close();fs.writeFileSync(path.join(out,'s2-precession-ui.json'),JSON.stringify({checks},null,1));console.log(`${checks.length-failed} contrôles réussis`);process.exit(failed?1:0);}})();
