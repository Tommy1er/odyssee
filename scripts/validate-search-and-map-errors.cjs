// Classement de la recherche du cockpit et tri des erreurs de la Carte cosmique.
// node scripts/validate-search-and-map-errors.cjs
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../public'),PORT=3063;
const types={'.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.css':'text/css','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.bin':'application/octet-stream'};
const server=http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split('?')[0]);if(u.endsWith('/'))u+='index.html';const f=path.join(root,u);if(!f.startsWith(root)){res.statusCode=403;return res.end();}fs.readFile(f,(e,b)=>{if(e){res.statusCode=404;return res.end();}res.setHeader('Content-Type',types[path.extname(f)]||'text/html');res.end(b);});});
const results=[];const check=(name,ok,detail='')=>{results.push({name,ok,detail});console.log((ok?'PASS ':'FAIL ')+name+(detail?' · '+detail:''));};

(async()=>{
 // 1. Filtre d'erreurs, en isolation (module ES chargé par Node).
 const {isBenignWindowError}=await import(path.resolve(__dirname,'../src/render-diagnostics.js'));
 const O='https://odyssee.example';
 check('Filtre : notification ResizeObserver ignorée',isBenignWindowError({message:'ResizeObserver loop completed with undelivered notifications.'},O));
 check('Filtre : ancienne forme ResizeObserver ignorée',isBenignWindowError({message:'ResizeObserver loop limit exceeded'},O));
 check('Filtre : « Script error. » sans objet ignoré',isBenignWindowError({message:'Script error.'},O));
 check('Filtre : script d\'extension ignoré',isBenignWindowError({message:'x',error:new Error('x'),filename:'chrome-extension://abc/content.js'},O));
 check('Filtre : erreur de la carte conservée',!isBenignWindowError({message:'ReferenceError: foo is not defined',error:new ReferenceError('foo is not defined'),filename:O+'/cosmos.js'},O));
 check('Filtre : erreur sans fichier conservée',!isBenignWindowError({message:'Erreur de démarrage',error:new Error('Erreur de démarrage')},O));

 await new Promise(r=>server.listen(PORT,'127.0.0.1',r));
 const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try{
  // 2. Recherche du cockpit, sur le vrai catalogue.
  const page=await browser.newPage({viewport:{width:1440,height:900}});page.setDefaultTimeout(180000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${PORT}/cockpit.html?ui=classic`);await page.waitForFunction(()=>typeof window.flightSnapshot==='function');
  const search=async q=>{await page.fill('#destination-search',q);await page.waitForTimeout(150);return page.$$eval('#destinations [data-id]',b=>b.map(x=>x.dataset.id));};
  let ids=await search('Mars');check('« Mars » : la planète Mars en premier',ids[0]==='solar:Mars',ids.slice(0,4).join(', '));
  check('« Mars » : Marsic toujours proposé, après Mars',ids.includes('h78804')&&ids.indexOf('h78804')>ids.indexOf('solar:Mars'));
  ids=await search('  mars ');check('« mars » entouré d\'espaces et en minuscules : même résultat',ids[0]==='solar:Mars');
  ids=await search('Marsic');check('« Marsic » : l\'étoile Marsic en premier',ids[0]==='h78804',ids.slice(0,3).join(', '));
  ids=await search('HIP 32349');check('Alias exact « HIP 32349 » : Sirius en premier',ids[0]==='h32263',ids.slice(0,3).join(', '));
  ids=await search('7Kap Her');check('Alias exact « 7Kap Her » : Marsic en premier',ids[0]==='h78804',ids.slice(0,3).join(', '));
  ids=await search('Sol');check('Alias exact « Sol » : le Soleil en premier',ids[0]==='h0',ids.slice(0,3).join(', '));
  ids=await search('proxima');check('Préfixe « proxima » : Proxima Centauri en premier',ids[0]==='h70666',ids.slice(0,3).join(', '));
  ids=await search('Saturne');check('« Saturne » : Saturne en premier',ids[0]==='solar:Saturne',ids.slice(0,4).join(', '));
  check('« Saturne » : ses lunes restent trouvées par l\'hôte',ids.some(id=>/titan/i.test(id)),ids.filter(id=>/titan/i.test(id)).join(', '));
  ids=await search('bételgeuse');check('Accents ignorés : « bételgeuse » trouve Betelgeuse',ids[0]==='h27919',ids.slice(0,3).join(', '));
  ids=await search('');check('Recherche vide : liste par distance, Soleil en tête',ids[0]==='h0',ids.slice(0,3).join(', '));
  check('Cockpit : aucune erreur de page pendant la recherche',errors.length===0,errors.join(' | '));
  await page.close();

  // 3. Carte cosmique : événements injectés.
  const map=await browser.newPage({viewport:{width:1280,height:720}});map.setDefaultTimeout(180000);
  await map.goto(`http://127.0.0.1:${PORT}/cosmos.html`);await map.waitForTimeout(4000);
  const panel=()=>map.evaluate(()=>{const e=document.getElementById('error');return !!e&&!e.hidden&&getComputedStyle(e).display!=='none'&&e.getClientRects().length>0;});
  check('Carte : aucun panneau d\'erreur au démarrage',!(await panel()));
  await map.evaluate(()=>window.dispatchEvent(new ErrorEvent('error',{message:'ResizeObserver loop completed with undelivered notifications.'})));
  check('Carte : notification ResizeObserver sans panneau',!(await panel()));
  await map.evaluate(()=>window.dispatchEvent(new ErrorEvent('error',{message:'Script error.'})));
  check('Carte : erreur de script tiers sans panneau',!(await panel()));
  await map.evaluate(()=>window.dispatchEvent(new ErrorEvent('error',{message:'ReferenceError: essai is not defined',error:new ReferenceError('essai is not defined'),filename:location.origin+'/cosmos.js'})));
  check('Carte : vraie erreur de la carte affichée',await panel());
  await map.reload();await map.waitForTimeout(4000);
  await map.evaluate(()=>{const c=document.getElementById('cosmos');const ev=new Event('webglcontextlost',{cancelable:true});c.dispatchEvent(ev);});
  check('Carte : perte de contexte WebGL affichée',await panel());
  await map.close();
 }finally{await browser.close();server.close();}
 const failed=results.filter(r=>!r.ok);
 fs.mkdirSync(path.resolve(__dirname,'../validation'),{recursive:true});
 fs.writeFileSync(path.resolve(__dirname,'../validation/search-and-map-errors.json'),JSON.stringify({passed:results.length-failed.length,failed:failed.length,results},null,1));
 console.log(failed.length?`${failed.length} échec(s)`:`${results.length} contrôles réussis`);process.exit(failed.length?1:0);
})().catch(e=>{console.error(e);server.close();process.exit(1);});
