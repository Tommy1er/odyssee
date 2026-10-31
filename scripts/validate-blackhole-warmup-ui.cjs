// Software browser regression. Compile latency and UI smoothness still require the physical Iris Xe.
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');fs.mkdirSync(out,{recursive:true});const checks=[],errors=[];
const server=http.createServer((req,res)=>{try{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));res.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':f.endsWith('.json')?'application/json':f.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(f));}catch{res.statusCode=404;res.end();}});
(async()=>{await new Promise(r=>server.listen(3044,'127.0.0.1',r));const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const page=await browser.newPage({viewport:{width:800,height:600}});page.setDefaultTimeout(240000);page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
try{
 await page.goto('http://127.0.0.1:3044/cockpit.html?perf=1');await page.waitForFunction(()=>window.flightPerformance&&window.gpuStartupDiagnostic?.().ready);
 assert.equal((await page.evaluate(()=>flightPerformance())).blackHolePreparation.status,'idle');const before=await page.evaluate(()=>flightSnapshot());
 await page.evaluate(()=>{document.querySelector('[data-type="blackhole"]').click();document.querySelector('#destinations [data-id="cygx1"]').click();});
 await page.waitForFunction(()=>['compiling','ready'].includes(flightPerformance().blackHolePreparation.status));
 const selected=await page.evaluate(()=>({s:flightSnapshot(),p:flightPerformance()}));assert.equal(selected.s.target,'cygx1');assert.deepEqual(selected.s.pos,before.pos);assert(!selected.p.optics.includes('trou noir'));checks.push('Selecting distant Cygnus starts warmup without moving ship or activating lensing');
 await page.waitForFunction(()=>flightPerformance().blackHolePreparation.status==='ready');const prepared=await page.evaluate(()=>flightPerformance().blackHolePreparation);assert(prepared.finishedAt>=prepared.startedAt);
 await page.waitForFunction(()=>document.getElementById('blackhole-preparation').textContent.includes('prêt'));checks.push('Preparation completes while ordinary sky remains displayed');
 await page.evaluate(()=>document.getElementById('clear-target').click());await page.waitForFunction(()=>document.getElementById('blackhole-preparation').hidden);
 await page.evaluate(()=>{document.querySelector('[data-type="blackhole"]').click();document.querySelector('#destinations [data-id="cygx1"]').click();});
 assert.deepEqual(await page.evaluate(()=>flightPerformance().blackHolePreparation),prepared);checks.push('Deselect/reselect reuses one compiled program');
 await page.evaluate(()=>{const e=document.getElementById('wormhole-enabled');e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));document.getElementById('wormhole-jump').click();});
 await page.waitForFunction(()=>flightSnapshot().arrival?.id==='cygx1'&&flightPerformance().optics.includes('trou noir'));
 assert.deepEqual(await page.evaluate(()=>flightPerformance().blackHolePreparation),prepared);assert.equal(await page.evaluate(()=>flightPerformance().variantError),null);assert(await page.locator('#render-error').isHidden());checks.push('Arrival uses warmed geodesic program with no recompilation');
 await page.screenshot({path:out+'/cosmos-blackhole-warmup.png'});fs.writeFileSync(out+'/cosmos-blackhole-warmup-profile.json',JSON.stringify(await page.evaluate(()=>flightPerformance()),null,2));assert.deepEqual(errors,[]);
}catch(e){errors.push(String(e));process.exitCode=1;}finally{fs.writeFileSync(out+'/cosmos-blackhole-warmup-results.json',JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({checks,errors}));await browser.close();server.close();}})();
