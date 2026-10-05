// Browser integration of continuous gravity; waits for simulation states, not fixed frame rates.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');
fs.mkdirSync(out,{recursive:true});
const checks=[],errors=[];
const check=(label,ok)=>{assert.ok(ok,label);checks.push(label);console.log('PASS '+label);};
const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));try{res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.json')?'application/json':p.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(p));}catch{res.writeHead(404);res.end();}});
(async()=>{
 await new Promise(r=>server.listen(3026,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1280,height:800}});page.setDefaultTimeout(120000);
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const snap=()=>page.evaluate(()=>window.flightSnapshot()),norm=v=>Math.hypot(...v),delta=(a,b)=>a.map((x,i)=>x-b[i]);
 try{
  await page.goto('http://127.0.0.1:3026/cockpit.html');await page.waitForFunction(()=>window.flightSnapshot?.().gravityField);
  let s=await snap();const r0=norm(s.pos);
  check('Continuous gravity on; solar source; initial orbital speed',s.continuousGravity&&s.gravityField.dominant==='h0'&&s.speed*299792.458>20&&s.speed*299792.458<22);
  check('Readout describes hovering, not felt free-fall acceleration',(await page.locator('#gravity-field-status').textContent()).includes('Maintien statique'));
  await page.selectOption('#time-rate','0.00273785');await page.click('#pause');
  await page.waitForFunction(()=>window.flightSnapshot().t>.0005);await page.click('#pause');s=await snap();
  console.log('ORBIT',JSON.stringify({r0,r:norm(s.pos),t:s.t,tau:s.tau,speed:s.speed,u:s.u,gravity:s.gravityField,orbital:s.orbital,engine:s.engine}));
  check('Short solar orbital arc keeps its radius',Math.abs(norm(s.pos)/r0-1)<1e-5);
  check('Orbital proper clock runs slower',s.tau>0&&s.tau<s.t);
  await page.locator('#continuous-gravity').uncheck();
  check('Local-gravity option is not falsely described as disabled',(await page.locator('#gravity-field-status').textContent()).includes('locale toujours activée'));
  await page.locator('#local-gravity').uncheck();await page.selectOption('#time-rate','1');let before=await snap();
  await page.click('#pause');await page.waitForFunction(t=>window.flightSnapshot().t>t+.1,before.t);await page.click('#pause');s=await snap();
  const dt=s.t-before.t,velocity=before.u.map(x=>x/before.gamma);
  check('Both gravity options off gives inertial motion',norm(delta(s.pos,before.pos).map((x,i)=>x-velocity[i]*dt))<1e-12&&norm(delta(s.u,before.u))<1e-12);
  await page.click('#home');await page.locator('#continuous-gravity').check();await page.locator('#local-gravity').check();
  await page.fill('#destination-search','Sagittarius A');await page.click('[data-id="sgr-a"]');await page.locator('#wormhole-enabled').check();await page.click('#wormhole-jump');
  await page.waitForFunction(()=>window.flightSnapshot().lastJump?.id==='sgr-a'&&!window.flightSnapshot().passage);
  await page.waitForFunction(()=>window.flightSnapshot().gravityField?.dominant==='sgr-a');s=await snap();before=s;
  const distance=norm(delta(s.pos,s.targetPosition));
  check('Strong-field source and static lapse at black-hole arrival',s.gravityField.hover/1.0323>1000&&s.gravityField.lapse>.95&&s.gravityField.lapse<.99);
  await page.click('#pause');await page.waitForFunction(()=>window.flightSnapshot().speed>1e-5);await page.click('#pause');s=await snap();
  check('Free flight falls without radial experiment or local-orbit mode',!s.gravity&&!s.orbital&&!s.autopilot&&norm(delta(s.pos,s.targetPosition))<distance&&s.speed>before.speed);
  check('Strong-field ship clock integrated',s.tau-before.tau>0&&s.tau-before.tau<s.t-before.t);
  await page.screenshot({path:path.join(out,'continuous-gravity-sgr-a.png'),timeout:120000});
  await page.click('#physics-open');const help=await page.locator('#flight-dialog-body').textContent();
  check('Cockpit help states model and autopilot limits',help.includes('approximation quasi statique')&&help.includes('compensation de gravité est fictive'));
  await page.click('#close-flight-dialog');check('No browser or shader errors',errors.length===0);
 }catch(e){errors.push(e.message);throw e;}finally{
  fs.writeFileSync(path.join(out,'gravity-field-ui-results.json'),JSON.stringify({checks,errors},null,2)+'\n');await browser.close();server.close();
 }
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
