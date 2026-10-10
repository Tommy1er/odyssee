// Browser integration of the physical nebula model: per-pixel cloud with calibrated uniforms, colours actually rendered
// (pink Balmer + [N II] envelope, teal [O III] core for M 42; teal centre and red ring for M 57), eye versus long-exposure
// rendering, the nebula info sheet, and the Magellanic Clouds. Waits for simulation states, not frame rates.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),zlib=require('zlib'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');
fs.mkdirSync(out,{recursive:true});
const checks=[],errors=[];
const check=(label,ok)=>{assert.ok(ok,label);checks.push(label);console.log('PASS '+label);};
const type=p=>p.endsWith('.js')?'text/javascript':p.endsWith('.json')?'application/json':p.endsWith('.css')?'text/css':p.endsWith('.jpg')?'image/jpeg':p.endsWith('.png')?'image/png':p.endsWith('.glb')?'model/gltf-binary':'text/html';
const server=http.createServer((req,res)=>{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));try{res.setHeader('Content-Type',type(p));res.end(fs.readFileSync(p));}catch{res.writeHead(404);res.end();}});
// Minimal PNG decoder (8-bit RGB/RGBA, non-interlaced) for the screenshots.
function decodePNG(buf){let o=8,w,h,ct,idat=[];while(o<buf.length){const len=buf.readUInt32BE(o),t=buf.toString('ascii',o+4,o+8),d=buf.subarray(o+8,o+8+len);if(t==='IHDR'){w=d.readUInt32BE(0);h=d.readUInt32BE(4);ct=d[9];}if(t==='IDAT')idat.push(d);o+=12+len;}
 const bpp=ct===6?4:3,raw=zlib.inflateSync(Buffer.concat(idat)),px=Buffer.alloc(w*h*bpp),st=w*bpp;
 for(let y=0;y<h;y++){const f=raw[y*(st+1)],src=raw.subarray(y*(st+1)+1,(y+1)*(st+1));for(let x=0;x<st;x++){const a=x>=bpp?px[y*st+x-bpp]:0,b=y?px[(y-1)*st+x]:0,c=x>=bpp&&y?px[(y-1)*st+x-bpp]:0;let v=src[x];if(f===1)v+=a;else if(f===2)v+=b;else if(f===3)v+=(a+b)>>1;else if(f===4){const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);v+=pa<=pb&&pa<=pc?a:pb<=pc?b:c;}px[y*st+x]=v&255;}}
 return {w,h,at:(x,y)=>{const i=(y*w+x)*bpp;return [px[i],px[i+1],px[i+2]];}};}
// Mean colour in an annulus around the canvas centre (radii in pixels).
const ring=(img,cx,cy,r0,r1)=>{let s=[0,0,0],n=0;for(let y=cy-r1;y<=cy+r1;y+=2)for(let x=cx-r1;x<=cx+r1;x+=2){const r=Math.hypot(x-cx,y-cy);if(r<r0||r>r1)continue;const c=img.at(x,y);s=s.map((v,k)=>v+c[k]);n++;}return s.map(v=>v/n);};
(async()=>{
 await new Promise(r=>server.listen(3033,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1100,height:760}});page.setDefaultTimeout(200000);
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const snap=()=>page.evaluate(()=>window.flightSnapshot());
 const go=async(query,id)=>{await page.click('.type-filters button[data-type="all"]');await page.fill('#destination-search',query);await page.click('[data-id="'+id+'"]');await page.click('#wormhole-jump');await page.waitForFunction(()=>!window.flightSnapshot().passage);await page.waitForFunction(i=>window.flightSnapshot().arrival?.id===i,id);};
 const shot=async name=>{await page.evaluate(()=>document.getElementById('clean-view').click());await page.waitForTimeout(4000);const file=path.join(out,name);await page.screenshot({path:file,timeout:200000});await page.evaluate(()=>document.getElementById('restore-view').click());return decodePNG(fs.readFileSync(file));};
 try{
  await page.goto('http://127.0.0.1:3033/cockpit.html');await page.waitForFunction(()=>window.flightSnapshot?.().system);
  await page.locator('#wormhole-enabled').check();
  await go('Orion','orion');
  await page.waitForFunction(()=>window.flightSnapshot().nebula);let s=await snap();
  check('M 42: calibrated per-pixel cloud, long-exposure gain ×10',s.nebula.shape===0&&s.nebula.gain===10&&s.nebula.Kl>0&&s.nebula.tau>0);
  let img=await shot('nebula-orion.png');const cx=Math.round(img.w/2),cy=Math.round(img.h/2)+38,core=ring(img,cx,cy,0,40),env=ring(img,cx,cy,150,200);
  check('M 42 rendered: teal [O III] core, pink envelope (R and B above G)',core[1]>=core[0]&&env[0]>env[1]&&env[2]>env[1]);
  console.log('   core',core.map(Math.round),'envelope',env.map(Math.round));
  await page.selectOption('#spectral-band','0');await page.waitForFunction(()=>window.flightSnapshot().nebula?.gain===1);
  const eye=await shot('nebula-orion-eye.png'),envEye=ring(eye,cx,cy,150,200),sat=c=>(Math.max(...c)-Math.min(...c))/Math.max(1,Math.max(...c));
  check('Eye: physical surface brightness (gain 1), dimmer and greyer',envEye.reduce((a,b)=>a+b)<env.reduce((a,b)=>a+b)&&sat(envEye)<sat(env));
  await page.selectOption('#spectral-band','1');
  await page.click('#object-info');const sheet=await page.locator('#flight-dialog-body').textContent();await page.click('#close-flight-dialog');
  check('Info sheet: Balmer decrement, [O III] line, foreground extinction, references',sheet.includes('Hα/Hβ = 2,86')&&sheet.includes('[O III] 5007')&&sheet.includes('avant-plan')&&sheet.includes('Esteban'));
  await go('Lyre','ring');await page.waitForFunction(()=>window.flightSnapshot().nebula?.shape===4);
  img=await shot('nebula-ring.png');const centre=ring(img,cx,cy,0,25);
  check('M 57 rendered: teal centre ([O III] above red)',centre[1]>centre[0]);
  console.log('   centre',centre.map(Math.round));
  await go('Grand Nuage','lmc');await shot('galaxy-lmc.png');
  check('No browser or shader errors',errors.length===0);
 }catch(e){errors.push(e.message);throw e;}finally{
  fs.writeFileSync(path.join(out,'nebula-ui-results.json'),JSON.stringify({checks,errors},null,2)+'\n');await browser.close();server.close();
 }
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
