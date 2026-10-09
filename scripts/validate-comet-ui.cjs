// Browser integration of comets and the Oort cloud: navigation filter, info sheet of a dark comet, perihelion jump with
// the coma/tail shader active, solar-system and Oort map scales. Waits for simulation states, not frame rates.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');
fs.mkdirSync(out,{recursive:true});
const checks=[],errors=[];
const check=(label,ok)=>{assert.ok(ok,label);checks.push(label);console.log('PASS '+label);};
const type=p=>p.endsWith('.js')?'text/javascript':p.endsWith('.json')?'application/json':p.endsWith('.css')?'text/css':p.endsWith('.jpg')?'image/jpeg':p.endsWith('.png')?'image/png':p.endsWith('.glb')?'model/gltf-binary':'text/html';
const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));try{res.setHeader('Content-Type',type(p));res.end(fs.readFileSync(p));}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(r=>server.listen(3032,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1100,height:760}});page.setDefaultTimeout(150000);
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const snap=()=>page.evaluate(()=>window.flightSnapshot());
 const jump=async label=>{const i=await page.evaluate(d=>[...document.querySelectorAll('#eclipse-list option')].findIndex(o=>o.textContent.includes(d)),label);assert.ok(i>=0,'option '+label);await page.evaluate(i=>{document.getElementById('eclipse-list').value=String(i);document.getElementById('eclipse-jump').click();},i);};
 const shot=async name=>{await page.click('#clean-view');await page.screenshot({path:path.join(out,name),timeout:150000});await page.click('#restore-view');};
 try{
  await page.goto('http://127.0.0.1:3032/cockpit.html');await page.waitForFunction(()=>window.flightSnapshot?.().system);
  await page.click('.type-filters button[data-type="comet"]');
  const names=await page.locator('#destinations .destination b').allTextContents();
  check('Comets filter lists Halley, Hale-Bopp and 3I/ATLAS',names.length===7&&names.some(n=>n.includes('Halley'))&&names.some(n=>n.includes('Hale-Bopp'))&&names.some(n=>n.includes('3I/ATLAS')));
  await page.click('#destinations .destination[data-id="comet:1P"]');
  let s=await snap();check('Dark Halley selectable as a target at 35 au',s.target==='comet:1P'&&s.comets.every(c=>c.id!=='comet:1P'));
  await page.click('#object-info');const sheet=await page.locator('#flight-dialog-body').textContent();await page.click('#close-flight-dialog');
  check('Info sheet: inactive nucleus, magnitude and 2061 perihelion',sheet.includes('inactive')&&sheet.includes('magnitude')&&sheet.includes('2061'));
  const options=await page.evaluate(()=>[...document.querySelectorAll('#eclipse-list option')].map(o=>o.textContent));
  check('Perihelia listed with eclipses, eclipse of 2027-02-06 still first',options[0].includes('2027-02-06')&&options.some(o=>o.includes('Périhélie de Encke')&&o.includes('2027-02-10'))&&options.some(o=>o.includes('Périhélie de Halley')&&o.includes('2061')));
  await jump('Périhélie de Encke');
  await page.waitForFunction(()=>window.flightSnapshot().target==='comet:2P'&&window.flightSnapshot().comets.some(c=>c.id==='comet:2P'&&c.r<0.4));s=await snap();
  const encke=s.comets.find(c=>c.id==='comet:2P');
  check('Encke active at perihelion (0.34 au), coma and tails in the shader',encke.r>0.32&&encke.r<0.36&&encke.activity>0.95&&encke.J>0);
  check('Jump logged as a discontinuity',s.events.some(e=>e.startsWith('SAUT DE DATE FICTIF')));
  check('HUD region at Encke: planetary region of the Solar System',/Système solaire/.test(s.environment));
  check('Long exposure (×300) set for the comet and stated',(await page.inputValue('#exposure'))==='2.5'&&(await page.locator('#eclipse-status').textContent()).includes('pose longue'));
  await shot('comet-encke-2027.png');
  await jump('Périhélie de Halley');
  await page.waitForFunction(()=>window.flightSnapshot().target==='comet:1P'&&window.flightSnapshot().comets.some(c=>c.id==='comet:1P'&&c.r<0.6));s=await snap();
  check('Halley 2061: active and in the brightest comet slot',s.comets[0].id==='comet:1P'&&s.comets[0].activity>0.99&&(await page.locator('#eclipse-status').textContent()).includes('2061'));
  await page.waitForTimeout(3000);await shot('comet-halley-2061.png');
  await page.click('#map-view');await page.click('#map-sun');
  await page.selectOption('#galaxy-scale','0.0016');await page.waitForTimeout(1500);
  const labels=(await snap()).mapLabels;
  check('Solar-system map (100 au) labels comets on their orbits',labels.includes('Halley')&&labels.includes('Encke'));
  await page.screenshot({path:path.join(out,'map-solar-system-comets.png'),timeout:150000});
  await page.selectOption('#galaxy-scale','3.5');await page.waitForTimeout(1500);
  const oort=(await snap()).mapLabels.includes('NUAGE D’OORT · HYPOTHÉTIQUE');
  check('Oort map (3.5 ly) labelled as hypothetical',oort);
  await page.screenshot({path:path.join(out,'map-oort-cloud.png'),timeout:150000});
  check('No browser or shader errors',errors.length===0);
 }catch(e){errors.push(e.message);throw e;}finally{
  fs.writeFileSync(path.join(out,'comet-ui-results.json'),JSON.stringify({checks,errors},null,2)+'\n');await browser.close();server.close();
 }
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
