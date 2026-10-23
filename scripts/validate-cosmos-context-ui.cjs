// Software WebGL regression only; a physical-GPU retest is still required.
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');fs.mkdirSync(out,{recursive:true});const checks=[],errors=[];
const server=http.createServer((req,res)=>{try{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));res.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':f.endsWith('.json')?'application/json':f.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(f));}catch{res.statusCode=404;res.end();}});
(async()=>{await new Promise(r=>server.listen(3039,'127.0.0.1',r));const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{for(const target of ['', '?target=m31']){
 const page=await browser.newPage({viewport:{width:800,height:600}});page.setDefaultTimeout(240000);page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3039/cockpit.html'+target);await page.waitForFunction(()=>typeof flightSnapshot==='function');
 await page.screenshot({path:out+'/cosmos-context-'+(target?'m31':'direct')+'.png'});
 const s=await page.evaluate(()=>flightSnapshot());assert(!target||s.target==='m31');assert(s.renderPixels[0]*s.renderPixels[1]<=1920*1080);assert(await page.locator('#render-error').isHidden());checks.push('Cockpit starts and draws '+(target||'direct'));
 await page.evaluate(()=>{const gl=document.getElementById('flight-canvas').getContext('webgl2');window.lossExtension=gl.getExtension('WEBGL_lose_context');if(!lossExtension)throw Error('WEBGL_lose_context unavailable');lossExtension.loseContext();});
 await page.waitForFunction(()=>document.getElementById('render-error').textContent.includes('webglcontextlost'));
 assert((await page.evaluate(()=>flightSnapshot())).paused);checks.push('Context loss pauses simulation and exposes diagnostic');
 await page.evaluate(()=>lossExtension.restoreContext());await page.waitForFunction(()=>document.getElementById('render-error').textContent.includes('webglcontextrestored'));
 assert((await page.evaluate(()=>flightSnapshot())).paused);checks.push('Restoration requires reload instead of automatically resuming');await page.close();
}assert.deepEqual(errors,[]);
}catch(e){errors.push(String(e));process.exitCode=1;}finally{fs.writeFileSync(out+'/cosmos-context-results.json',JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({checks,errors}));await browser.close();server.close();}})();
