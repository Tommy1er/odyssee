// Browser integration of catalogued galaxies as cockpit destinations: UNGC/McConnachie loaded after start-up, search by
// usual name, M81 group rendered in the catalogue slots, map links (McConnachie alias to M31, CF4 PGC on demand), CF4
// neighbours at M87, info sheet provenance. Waits for simulation states, not frame rates.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');
fs.mkdirSync(out,{recursive:true});
const checks=[],errors=[];
const check=(label,ok)=>{assert.ok(ok,label);checks.push(label);console.log('PASS '+label);};
const type=p=>p.endsWith('.js')?'text/javascript':p.endsWith('.json')?'application/json':p.endsWith('.css')?'text/css':p.endsWith('.jpg')?'image/jpeg':p.endsWith('.png')?'image/png':p.endsWith('.glb')?'model/gltf-binary':'text/html';
const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));try{res.setHeader('Content-Type',type(p));res.end(fs.readFileSync(p));}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(r=>server.listen(3034,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1100,height:760}});page.setDefaultTimeout(400000);
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const snap=()=>page.evaluate(()=>window.flightSnapshot());
 const jump=async id=>{await page.locator('#wormhole-enabled').check();await page.click('#wormhole-jump');await page.waitForFunction(()=>!window.flightSnapshot().passage);await page.waitForFunction(i=>window.flightSnapshot().arrival?.id===i,id);};
 const shot=async name=>{await page.evaluate(()=>document.getElementById('clean-view').click());await page.waitForTimeout(5000);await page.screenshot({path:path.join(out,name),timeout:400000});await page.evaluate(()=>document.getElementById('restore-view').click());};
 const sheet=async()=>{await page.click('#object-info');const t=await page.locator('#flight-dialog-body').textContent();await page.click('#close-flight-dialog');return t;};
 try{
  await page.goto('http://127.0.0.1:3034/cockpit.html');await page.waitForFunction(()=>window.flightSnapshot?.().galaxies?.catalogue>800);
  let s=await snap();check('UNGC and McConnachie galaxies loaded after start-up, duplicates merged',s.galaxies.catalogue===865);
  await page.click('.type-filters button[data-type="all"]');await page.fill('#destination-search','M81');
  const names=await page.$$eval('#destinations .destination',e=>e.map(x=>x.dataset.id+'|'+x.querySelector('b').textContent));
  check('Search by usual name: « M81 » finds UNGC MESSIER081 shown as M81',names.includes('ungc:MESSIER081|M81'));
  await page.click('[data-id="ungc:MESSIER081"]');await jump('ungc:MESSIER081');s=await snap();
  check('M81 group rendered in the catalogue slots (M81, M82)',s.galaxies.slots[0]==='ungc:MESSIER081'&&s.galaxies.slots.includes('ungc:MESSIER082'));
  const m81=await sheet();check('Info sheet: Hubble type and UNGC diameter, illustrative orientation',m81.includes('type de Hubble T = 3')&&m81.includes('diamètre UNGC 31,35 kpc')&&m81.includes('illustrative'));
  await shot('galaxy-m81.png');
  await page.waitForFunction(()=>window.flightSnapshot().shipReady);await page.goto('http://127.0.0.1:3034/cockpit.html?target=mcconnachie%3AAndromeda');await page.waitForFunction(()=>window.flightSnapshot?.().target==='m31');
  check('Map link to a McConnachie duplicate lands on the existing M31',(await snap()).target==='m31');
  await page.waitForFunction(()=>window.flightSnapshot().shipReady);await page.goto('http://127.0.0.1:3034/cockpit.html?target=cf4%3A41361');await page.waitForFunction(()=>window.flightSnapshot?.().target==='cf4:41361');
  check('Map link to a CF4 entry loads Cosmicflows-4 on demand',(await snap()).galaxies.cf4);
  await page.waitForFunction(()=>window.flightSnapshot().galaxyLight.status==='ready');const m87=await sheet();check('CF4 sheet: distance modulus, 2MRS morphological type and size, V magnitude with its provenance (15 Oct: replaces the class guessed from the distance method)',m87.includes('μ = 31,134')&&m87.includes('type morphologique T = -4 (2MRS')&&m87.includes('rayon isophotal 2MASS')&&m87.includes('K totale 2MRS'));
  await jump('cf4:41361');await page.waitForFunction(()=>window.flightSnapshot().galaxies.slots.filter(x=>x.startsWith('cf4:')).length>=3);s=await snap();
  check('At M87: its nearest CF4 neighbours are rendered',s.galaxies.slots[0]==='cf4:41361'&&s.galaxies.slots.filter(x=>x.startsWith('cf4:')).length>=3);console.log('   slots',s.galaxies.slots.join(', '));
  await shot('galaxy-m87.png');
  await page.click('.type-filters button[data-type="all"]');await page.fill('#destination-search','PGC 41156');await page.waitForFunction(()=>document.querySelector('#destinations [data-id="cf4:41156"]'));
  check('Search « PGC 41156 » finds the CF4 entry',true);
  check('No browser or shader errors',errors.length===0);
 }catch(e){errors.push(e.message);throw e;}finally{
  fs.writeFileSync(path.join(out,'galaxy-ui-results.json'),JSON.stringify({checks,errors},null,2)+'\n');await browser.close();server.close();
 }
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
