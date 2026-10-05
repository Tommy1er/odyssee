// Targeted regression: restored lunar map is actually used by the renderer.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');
fs.mkdirSync(out,{recursive:true});
const checks=[],errors=[];
const check=(label,ok)=>{assert.ok(ok,label);checks.push(label);console.log('PASS '+label);};
const server=http.createServer((req,res)=>{
  const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));
  const types={'.js':'text/javascript','.json':'application/json','.css':'text/css','.jpg':'image/jpeg','.png':'image/png'};
  try{res.setHeader('Content-Type',types[path.extname(p)]||'text/html');res.end(fs.readFileSync(p));}
  catch{res.writeHead(404);res.end();}
});
(async()=>{
  await new Promise(r=>server.listen(3025,'127.0.0.1',r));
  const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:1280,height:800}});
  page.setDefaultTimeout(120000);
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  try{
    await page.goto('http://127.0.0.1:3025/cockpit.html');
    await page.waitForFunction(()=>typeof window.flightSnapshot==='function');
    const snap=()=>page.evaluate(()=>window.flightSnapshot());
    await page.click('#external-view');
    await page.waitForFunction(()=>window.flightSnapshot().shipLight.length>0);
    let s=await snap();
    check('Ship defaults to astrophysical lighting',s.shipLighting==='astro'&&s.shipLight.length>0);
    await page.selectOption('#ship-light','inspection');
    await page.waitForFunction(()=>document.getElementById('ship-credit').textContent.includes('non physique'));
    check('Inspection lighting explicitly labelled',true);
    await page.selectOption('#ship-light','astro');
    await page.click('#cockpit-view');
    await page.fill('#destination-search','Lune');
    await page.click('[data-id="moon:Lune"]');
    await page.locator('#wormhole-enabled').check();
    await page.click('#wormhole-jump');
    await page.waitForFunction(()=>window.flightSnapshot().lastJump?.target==='moon:Lune'||window.flightSnapshot().localId==='moon:Lune');
    await page.waitForFunction(()=>!window.flightSnapshot().passage&&window.flightSnapshot().bodyMapReady===1);
    s=await snap();
    check('Lunar destination reached',s.localId==='moon:Lune');
    check('Complete lunar map sampled',s.closeupModel.ready&&s.closeupModel.family==='cartographie planétaire'&&s.bodyMapReady===1);
    check('No texture load failure',s.closeupModel.errors.length===0);
    const rotation=s.bodyRotation;
    await page.waitForFunction(before=>window.flightSnapshot().observationTime>before+200,s.observationTime);
    s=await snap();
    check('Paused lunar orientation remains locked toward Earth',s.bodyRotation.every((x,i)=>Math.abs(x-rotation[i])<1e-6));
    await page.click('#clean-view');
    check('Unobstructed view works',await page.locator('#restore-view').isVisible()&&!(await page.locator('#navigation-hud').isVisible()));
    await page.screenshot({path:path.join(out,'moon-restored.png'),timeout:120000});
    await page.click('#restore-view');
    check('No browser or shader errors',errors.length===0);
  }finally{
    fs.writeFileSync(path.join(out,'moon-repair-results.json'),JSON.stringify({checks,errors},null,2)+'\n');
    await browser.close();server.close();
  }
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
