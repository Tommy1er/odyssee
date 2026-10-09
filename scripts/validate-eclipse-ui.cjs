// Browser integration of the multi-body renderer and the eclipse list; waits for simulation states, not frame rates.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');
fs.mkdirSync(out,{recursive:true});
const checks=[],errors=[];
const check=(label,ok)=>{assert.ok(ok,label);checks.push(label);console.log('PASS '+label);};
const type=p=>p.endsWith('.js')?'text/javascript':p.endsWith('.json')?'application/json':p.endsWith('.css')?'text/css':p.endsWith('.jpg')?'image/jpeg':p.endsWith('.png')?'image/png':p.endsWith('.glb')?'model/gltf-binary':'text/html';
const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));try{res.setHeader('Content-Type',type(p));res.end(fs.readFileSync(p));}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(r=>server.listen(3031,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1100,height:760}});page.setDefaultTimeout(150000);
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const snap=()=>page.evaluate(()=>window.flightSnapshot());
 const jump=async date=>{const i=await page.evaluate(d=>[...document.querySelectorAll('#eclipse-list option')].findIndex(o=>o.textContent.includes(d)),date);await page.evaluate(i=>{document.getElementById('eclipse-list').value=String(i);document.getElementById('eclipse-jump').click();},i);};
 try{
  await page.goto('http://127.0.0.1:3031/cockpit.html');await page.waitForFunction(()=>window.flightSnapshot?.().system);
  const options=await page.evaluate(()=>[...document.querySelectorAll('#eclipse-list option')].map(o=>o.textContent));
  check('Upcoming eclipses listed from the mission date',options.length>=9&&options[0].includes('2027-02-06')&&options.some(o=>o.includes('Éclipse totale de Soleil · 2027-08-02')));
  let s=await snap();const before={t:s.t,tau:s.tau};
  await jump('2027-08-02');
  await page.waitForFunction(()=>window.flightSnapshot().target==='solar:Terre'&&window.flightSnapshot().system.bodies.includes('moon:Lune'));s=await snap();
  const jdTD=Date.UTC(2027,7,2,10,7,50)/864e5+2440587.5,expected=2000+(jdTD-2451545)/365.25-2026.75-8/(1440*365.25);
  check('Date jump to 8 min before NASA greatest eclipse (±10 min)',Math.abs(s.t-expected)<10/(1440*365.25)&&s.t>before.t);
  check('Ship clock not advanced by the fictitious jump',Math.abs(s.tau-before.tau)<1e-9);
  check('Jump logged as a discontinuity',s.events.some(e=>e.startsWith('SAUT DE DATE FICTIF')));
  check('Moon and Sun disc drawn with the Earth',s.system.bodies.includes('moon:Lune')&&s.system.bodies.includes('h0')&&s.system.light==='h0');
  await page.click('#clean-view');await page.screenshot({path:path.join(out,'eclipse-2027-08-02.png'),timeout:150000});await page.click('#restore-view');
  await jump('2028-12-31');
  await page.waitForFunction(()=>window.flightSnapshot().target==='moon:Lune'&&window.flightSnapshot().system.bodies.includes('solar:Terre'));s=await snap();
  check('Lunar eclipse: Moon targeted, Earth among the occluders',s.system.bodies.includes('solar:Terre'));
  await page.click('#clean-view');await page.screenshot({path:path.join(out,'eclipse-2028-12-31.png'),timeout:150000});await page.click('#restore-view');
  const late=await page.evaluate(()=>[...document.querySelectorAll('#eclipse-list option')].map(o=>o.textContent));
  check('Past eclipses no longer offered after the jump',!late.some(o=>o.includes('2027-08-02')));
  await page.click('#physics-open');const help=await page.locator('#flight-dialog-body').textContent();await page.click('#close-flight-dialog');
  check('Cockpit help describes eclipses and the fictitious date jump',help.includes('Plusieurs astres et éclipses')&&help.includes('saut de date fictif'));
  check('No browser or shader errors',errors.length===0);
 }catch(e){errors.push(e.message);throw e;}finally{
  fs.writeFileSync(path.join(out,'eclipse-ui-results.json'),JSON.stringify({checks,errors},null,2)+'\n');await browser.close();server.close();
 }
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
