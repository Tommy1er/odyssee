// Dedicated browser smoke test for the individual galactic SED HDR pass.
// Validates toggles, browser GLSL, split 0 / .99c optical comparison and a capture.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');
fs.mkdirSync(out,{recursive:true});
const errors=[],passed=[];const check=(label,condition)=>{assert.ok(condition,label);passed.push(label);console.log('PASS '+label)};
const mime=p=>p.endsWith('.js')?'text/javascript':p.endsWith('.json')?'application/json':p.endsWith('.css')?'text/css':p.endsWith('.bin')?'application/octet-stream':p.endsWith('.jpg')?'image/jpeg':p.endsWith('.png')?'image/png':'text/html';
const server=http.createServer((req,res)=>{const p=path.resolve(root,decodeURIComponent(req.url.split('?')[0]).replace(/^\//,''));if(!p.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',mime(p));res.end(fs.readFileSync(p));}catch{res.writeHead(404).end();}});
(async()=>{
 await new Promise(resolve=>server.listen(3045,'127.0.0.1',resolve));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1200,height:780}});page.setDefaultTimeout(200000);
 page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});
 const snapshot=()=>page.evaluate(()=>window.flightSnapshot());
 try{
  await page.goto('http://127.0.0.1:3045/cockpit.html');
  await page.waitForFunction(()=>window.flightSnapshot?.().galaxyLight?.status==='ready');
  await page.waitForFunction(()=>window.flightSnapshot().galaxyLight.spectralPoints===true);
  check('Default relativistic sky isolates galaxy spectral HDR points',(await snapshot()).galaxyLight.spectralPoints);
  await page.locator('#intuitive').click();
  await page.waitForFunction(()=>window.flightSnapshot().galaxyLight.spectralPoints===false);
  check('Intuitive mode falls back to shared calibrated cube',(await snapshot()).galaxyLight.spectralPoints===false);
  await page.locator('#relativistic').click();
  await page.waitForFunction(()=>window.flightSnapshot().galaxyLight.spectralPoints===true);
  await page.locator('#doppler').uncheck();
  await page.waitForFunction(()=>window.flightSnapshot().galaxyLight.spectralPoints===false);
  check('Disabling Doppler restores original unshifted photometry',(await snapshot()).galaxyLight.spectralPoints===false);
  await page.locator('#doppler').check();
  await page.waitForFunction(()=>window.flightSnapshot().galaxyLight.spectralPoints===true);
  await page.locator('#compare-physics').click();
  // #ship-frame lives in the hidden external-camera options in cockpit view; set it without a visibility wait.
  await page.evaluate(()=>{const f=document.getElementById('ship-frame');f.value='comoving';f.dispatchEvent(new Event('change'));});
  await page.waitForFunction(()=>window.flightSnapshot().galaxyLight.spectralPoints===true);
  check('Split 0 / 0.99 c comparison renders separate HDR galaxy pass',(await snapshot()).galaxyLight.spectralPoints===true);
  await page.waitForTimeout(1000);
  await page.screenshot({path:path.join(out,'galaxy-spectral-hdr-lab-099c.png'),timeout:200000});
  check('No browser, JavaScript or GLSL errors',errors.length===0);
 }finally{
  fs.writeFileSync(path.join(out,'galaxy-spectral-hdr-ui-results.json'),JSON.stringify({passed,errors},null,2)+'\n');
  await browser.close();server.close();
 }
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
