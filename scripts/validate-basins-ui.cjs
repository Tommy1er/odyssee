// Browser integration of the basins of attraction (CF4 2023 reconstruction): cosmic map layer (surfaces, streamlines,
// attractor labels, toggles, provenance) and the cockpit readout of the ship's basin and reconstructed flow at the Great
// Attractor and at Shapley. Waits for simulation states, not frame rates.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');
fs.mkdirSync(out,{recursive:true});
const checks=[],errors=[];
const check=(label,ok)=>{assert.ok(ok,label);checks.push(label);console.log('PASS '+label);};
const type=p=>p.endsWith('.js')?'text/javascript':p.endsWith('.json')?'application/json':p.endsWith('.css')?'text/css':p.endsWith('.jpg')?'image/jpeg':p.endsWith('.png')?'image/png':p.endsWith('.glb')?'model/gltf-binary':p.endsWith('.bin')?'application/octet-stream':'text/html';
const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));try{res.setHeader('Content-Type',type(p));res.end(fs.readFileSync(p));}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(r=>server.listen(3035,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.setDefaultTimeout(400000);
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const cosmos=()=>page.evaluate(()=>window.cosmicSnapshot().basins),snap=()=>page.evaluate(()=>window.flightSnapshot());
 try{
  await page.goto('http://127.0.0.1:3035/cosmos.html?level=2');await page.waitForFunction(()=>window.cosmicSnapshot?.().basins?.status==='ready');await page.waitForTimeout(3000);
  let b=await cosmos();check('Laniakea scale: six basins, streamlines and attractor labels drawn',b.visible&&b.shells.length===6&&b.shells[0]==='Laniakea'&&b.lines&&b.labels.some(t=>t.includes('Laniakea')));
  const status=await page.locator('#basins-status').textContent();check('Provenance and measured agreement shown',status.includes('Reconstruction CF4 2023')&&status.includes('Laniakea 88 %'));
  await page.screenshot({path:path.join(out,'basins-laniakea.png'),timeout:400000});
  await page.locator('#basins-lines').uncheck();await page.locator('#basins-sdss').check();await page.waitForTimeout(2000);b=await cosmos();
  check('Toggles: streamlines off, SDSS basins cut by the box on demand',!b.lines&&b.shells.length===9);
  await page.goto('http://127.0.0.1:3035/cosmos.html?level=0');await page.waitForFunction(()=>window.cosmicSnapshot?.());await page.waitForTimeout(2000);
  check('Not loaded at the Local Group scale',(await cosmos()).status==='idle');
  for(const [id,name] of [['cosmic:great-attractor','Laniakea'],['cosmic:shapley','Shapley']]){
   await page.goto('http://127.0.0.1:3035/cockpit.html?target='+encodeURIComponent(id));await page.waitForFunction(i=>window.flightSnapshot?.().target===i,id);
   await page.locator('#wormhole-enabled').check();await page.click('#wormhole-jump');await page.waitForFunction(()=>!window.flightSnapshot().passage);
   await page.waitForFunction(()=>{const s=window.flightSnapshot();return s.basin&&Math.hypot(...s.basin.at.map((x,k)=>x-s.pos[k]))<1e5;});const s=await snap(),hud=await page.locator('#environment-name').textContent();
   check(`Cockpit at ${id}: basin ${name} and reconstructed flow in the HUD`,s.basin.name===name&&s.basin.speed>50&&hud.includes('bassin de '+name)&&hud.includes('km/s'));
   console.log('   '+hud);
   await page.waitForFunction(()=>window.flightSnapshot().shipReady);
  }
  check('No browser or shader errors',errors.length===0);
 }catch(e){errors.push(e.message);throw e;}finally{
  fs.writeFileSync(path.join(out,'basins-ui-results.json'),JSON.stringify({checks,errors},null,2)+'\n');await browser.close();server.close();
 }
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
