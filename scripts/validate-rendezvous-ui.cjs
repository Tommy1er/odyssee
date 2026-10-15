// Cockpit rendezvous, in the browser: Earth from the start point, station-keeping for a simulated day, then the Moon.
// Small viewport on purpose: under SwiftShader a frame can take several seconds. Usage:
//   CHROMIUM_PATH=… node scripts/validate-rendezvous-ui.cjs
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../public'),out=path.resolve(__dirname,'../validation/v2-screenshots');fs.mkdirSync(out,{recursive:true});const checks=[],errors=[];
const check=(label,ok,detail='')=>{assert.ok(ok,label+' · '+detail);checks.push(label+(detail?' · '+detail:''));console.log('PASS '+label+(detail?' · '+detail:''));};
const server=http.createServer((req,res)=>{const file=path.join(root,decodeURIComponent(req.url.split('?')[0]));try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.json')?'application/json':file.endsWith('.glb')?'model/gltf-binary':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));}catch{res.statusCode=404;res.end('404');}});
(async()=>{await new Promise(r=>server.listen(3031,'127.0.0.1',r));
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:960,height:700}});page.setDefaultTimeout(240000);page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const snap=()=>page.evaluate(()=>window.flightSnapshot()),long={timeout:1800000,polling:2000};
const choose=async(name,id)=>{await page.fill('#destination-search',name);await page.click('[data-id="'+id+'"]',{force:true});};
const fly=async()=>{await page.click('#engage',{force:true});await page.selectOption('#time-rate','10000',{force:true});await page.waitForFunction(()=>!!window.flightSnapshot().arrival,{},long);};
try{
 await page.goto('http://127.0.0.1:3031/cockpit.html');await page.waitForFunction(()=>typeof window.flightSnapshot==='function',{},{timeout:120000});
 await choose('Terre','solar:Terre');let s=await snap();const v0=s.speed;check('Sélectionner ne lance pas le vaisseau',!s.autopilot&&s.paused,'vitesse initiale '+(v0*299792.458).toFixed(2)+' km/s (orbite héliocentrique de départ)');
 await page.click('#engage',{force:true});s=await snap();
 check('Engager : la vitesse de départ est conservée (pas de remise à zéro)',Math.abs(s.speed-v0)*299792458<0.01&&s.navigationStage==='brake');
 check('Engager : trajet calculé dans le référentiel de la Terre',s.autopilot&&s.frameVelocity&&Math.hypot(...s.frameVelocity)*299792.458>29&&Math.hypot(...s.frameVelocity)*299792.458<31,(Math.hypot(...s.frameVelocity)*299792.458).toFixed(2)+' km/s');
 await page.selectOption('#time-rate','10000',{force:true});await page.waitForFunction(()=>!!window.flightSnapshot().arrival,{},long);s=await snap();
 check('Rendez-vous Terre : à la vitesse de la Terre',s.arrival.contract==='rendezvous'&&s.relativeSpeed<0.01,s.relativeSpeed.toExponential(2)+' m/s ; vitesse catalogue '+(s.speed*299792.458).toFixed(2)+' km/s');
 check('Rendez-vous Terre : 5 rayons du centre, en pause',s.localRatio>4.99&&s.localRatio<5.01&&s.paused,'rapport '+s.localRatio.toFixed(4));
 check('Maintien actif et annoncé',s.hold?.active&&Math.abs(s.hold.thrust/9.80665-0.04)<0.002&&(await page.textContent('#navigation-phase')).includes('ARRIVÉE')&&(await page.textContent('#navigation-phase')).includes('MAINTIEN'),(s.hold.thrust/9.80665).toFixed(4)+' g');
 await page.screenshot({path:out+'/rdv-earth.png'});
 const t0=s.t;await page.selectOption('#time-rate','0.00273785',{force:true});await page.click('#pause',{force:true});await page.waitForFunction(t=>window.flightSnapshot().t-t>1/365.25,t0,long);await page.click('#pause',{force:true});s=await snap();
 const vHold=s.speed;check('Un jour simulé plus tard : toujours à 5 rayons, vitesse de la Terre',s.localRatio>4.99&&s.localRatio<5.01&&s.relativeSpeed<0.01&&s.hold?.active,'rapport '+s.localRatio.toFixed(4)+' après '+((s.t-t0)*365.25).toFixed(2)+' j');
 await choose('Lune','moon:Lune');await page.click('#engage',{force:true});s=await snap();
 check('Départ vers la Lune : vitesse conservée, mise à la vitesse de la Lune simulée',s.navigationStage==='brake'&&Math.abs(s.speed-vHold)*299792458<0.01&&!s.hold,'vitesse au départ '+(s.speed*299792.458).toFixed(2)+' km/s');
 await page.selectOption('#time-rate','10000',{force:true});await page.waitForFunction(()=>!!window.flightSnapshot().arrival,{},long);s=await snap();
 check('Rendez-vous Lune : 5 rayons, vitesse de la Lune, maintien actif',s.arrival.id==='moon:Lune'&&s.localRatio>4.99&&s.localRatio<5.01&&s.relativeSpeed<1&&s.hold?.active,s.relativeSpeed.toExponential(2)+' m/s');
 await page.screenshot({path:out+'/rdv-moon.png'});
 await page.click('#hold-toggle',{force:true});s=await snap();check('Couper le maintien : chute libre annoncée',s.hold&&!s.hold.active&&s.events.at(-1).includes('Maintien coupé'));
 check('Aucune erreur navigateur ni shader',errors.length===0,errors.join(' | '));
}catch(e){console.error(e);try{await page.screenshot({path:out+'/rdv-failure.png'});}catch{}process.exitCode=1;}
finally{fs.writeFileSync(out+'/rendezvous-results.json',JSON.stringify({checks,errors},null,2));await browser.close();server.close();}})();
