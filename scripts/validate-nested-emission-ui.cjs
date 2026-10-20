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
 await new Promise(resolve=>server.listen(3046,'127.0.0.1',resolve));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:640,height:480}});page.setDefaultTimeout(200000);
 page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});
 const snapshot=()=>page.evaluate(()=>window.flightSnapshot());
 try{
  await page.goto('http://127.0.0.1:3046/cockpit.html?target=tarantula&emissionBudget=reference');
  await page.waitForFunction(()=>window.flightSnapshot?.().emissionBudget?.hosts?.lmc<1);
  let state=await snapshot();
  check('Reference V budget active for represented Tarantula',state.emissionBudget.enabled&&state.emissionBudget.strength===1);
  check('LMC debit uses observed V ratio',Math.abs(state.emissionBudget.hosts.lmc-0.9636921945229899)<1e-10);
  check('Tarantula intrinsic calibration receives foreground V attenuation',Math.abs(state.emissionBudget.children.tarantula-Math.pow(10,-.1))<1e-10);
  await page.screenshot({path:path.join(out,'nested-emission-reference.png'),timeout:180000});
  await page.selectOption('#spectral-band','2');
  await page.waitForFunction(()=>window.flightSnapshot().emissionBudget.strength===0);
  check('Infrared retains legacy renderer',Object.keys((await snapshot()).emissionBudget.hosts).length===0);
  await page.selectOption('#spectral-band','1');
  await page.waitForFunction(()=>window.flightSnapshot().emissionBudget.hosts.lmc<1);
  await page.click('.type-filters button[data-type="all"]');await page.fill('#destination-search','NGC 604');
  await page.locator('[data-id="ngc604"]').click();
  await page.waitForFunction(()=>window.flightSnapshot().target==='ngc604');
  check('Clipped NGC604 is not subtracted from M33',(await snapshot()).emissionBudget.hosts.m33===undefined);
  await page.goto('http://127.0.0.1:3046/cockpit.html?target=tarantula');
  await page.waitForFunction(()=>window.flightSnapshot?.().emissionBudget);
  state=await snapshot();
  check('Normal cockpit keeps experimental budget disabled',!state.emissionBudget.enabled&&state.emissionBudget.strength===0);
  check('No browser or shader errors',errors.length===0);
 }finally{
  fs.writeFileSync(path.join(out,'nested-emission-ui-results.json'),JSON.stringify({passed,errors},null,2));
  await browser.close();server.close();
 }
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
