// Headless Chromium/SwiftShader: new extra-galactic nurseries, real WebGL shaders and info sheets.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');
fs.mkdirSync(out,{recursive:true});
const errors=[],checks=[];const check=(label,v)=>{assert.ok(v,label);checks.push(label);console.log('PASS',label)};
const mime=p=>p.endsWith('.js')?'text/javascript':p.endsWith('.json')?'application/json':p.endsWith('.css')?'text/css':p.endsWith('.jpg')?'image/jpeg':p.endsWith('.png')?'image/png':'text/html';
const server=http.createServer((req,res)=>{const p=path.resolve(root,decodeURIComponent(req.url.split('?')[0]).replace(/^\//,''));if(!p.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',mime(p));res.end(fs.readFileSync(p));}catch{res.writeHead(404).end();}});
(async()=>{
 await new Promise(resolve=>server.listen(3044,'127.0.0.1',resolve));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1100,height:760}});page.setDefaultTimeout(180000);
 page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});
 try{
  await page.goto('http://127.0.0.1:3044/cockpit.html');await page.waitForFunction(()=>window.flightSnapshot?.().system);
  await page.locator('#wormhole-enabled').check();
  for(const [id,needle,filename] of [['tarantula','Tarentule','nurserie-tarentule.png'],['ngc604','NGC 604','nurserie-ngc604.png']]){
    await page.click('.type-filters button[data-type="all"]');await page.fill('#destination-search',needle);
    await page.locator('[data-id="'+id+'"]').click();
    await page.click('#wormhole-jump');
    await page.waitForFunction(()=>!window.flightSnapshot().passage);
    await page.waitForFunction(key=>window.flightSnapshot().arrival?.id===key,id);
    await page.waitForFunction(()=>window.flightSnapshot().nebula?.shape===6);
    const s=await page.evaluate(()=>window.flightSnapshot());
    check(id+' has real calibrated wind-cavity volume',s.nebula.shape===6&&s.nebula.Kl>0&&s.nebula.tau>0&&s.webgl);
    await page.click('#object-info');const sheet=await page.locator('#flight-dialog-body').textContent();
    check(id+' scientific provenance and uncertainties displayed',sheet.includes('Région H II')&&sheet.includes('NASA')&&(sheet.includes('indicati')||sheet.includes('estim')));
    await page.click('#close-flight-dialog');
    // This failed on arrival when #navigation-hud overlapped #clean-view and intercepted its click.
    // Check actual pointer hit-testing instead of force-clicking/DOM-triggering the button.
    const hit=await page.locator('#clean-view').evaluate(el=>{
      const r=el.getBoundingClientRect(),node=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
      return !!node&&(node===el||el.contains(node));
    });
    check(id+' clean-view button is not occluded by arrived navigation HUD',hit);
    // SwiftShader's full 1100×760 raymarched nursery screenshot exceeded 180s on GitHub CI.
    // Reduce only the test capture viewport (not the application's rendering quality or scene),
    // still with real WebGL and a readable 640×480 image. Restore the standard UI afterwards.
    await page.setViewportSize({width:640,height:480});
    await page.locator('#clean-view').click();await page.waitForTimeout(1000);
    await page.screenshot({path:path.join(out,filename),timeout:180000});
    await page.locator('#restore-view').click();
    await page.setViewportSize({width:1100,height:760});
  }
  check('No browser or GLSL errors',errors.length===0);
 } finally {
   fs.writeFileSync(path.join(out,'nurseries-ui-results.json'),JSON.stringify({checks,errors},null,2)+'\n');
   await browser.close();server.close();
 }
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
