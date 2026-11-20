// Preuve de faisabilité : niveau « Groupe local » de cosmos.html dans la Carte galactique 3D du cockpit (session d'essai).
// Mesure les ressources graphiques et le temps d'image couche éteinte / allumée, vérifie la sélection d'une galaxie
// cataloguée depuis la carte (cible du cockpit, sans orienter le nez ni relancer le temps) et l'absence en Classique public.
// node scripts/validate-cosmic-map-feasibility.cjs
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../public'),PORT=3068,OUT=path.resolve(__dirname,'../validation');
const types={'.js':'text/javascript','.json':'application/json','.css':'text/css','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.bin':'application/octet-stream'};
const server=http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split('?')[0]);if(u.endsWith('/'))u+='index.html';const f=path.join(root,u);if(!f.startsWith(root)){res.statusCode=403;return res.end();}fs.readFile(f,(e,b)=>{if(e){res.statusCode=404;return res.end();}res.setHeader('Content-Type',types[path.extname(f)]||'text/html');res.end(b);});});
const results=[],measures={};const check=(name,ok,detail='')=>{results.push({name,ok,detail});console.log((ok?'PASS ':'FAIL ')+name+(detail?' · '+detail:''));};
(async()=>{
 await new Promise(r=>server.listen(PORT,'127.0.0.1',r));
 const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--enable-precise-memory-info']});
 try{
  const ctx=await browser.newContext({viewport:{width:1280,height:585}});
  const page=await ctx.newPage();page.setDefaultTimeout(400000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${PORT}/cockpit.html?ui=immersive&essai=1`);
  await page.waitForFunction(()=>window.gpuStartupDiagnostic?.().ready&&!document.getElementById('flight-app').inert);
  await page.evaluate(()=>document.getElementById('map-view').click());await page.waitForTimeout(1500);
  await page.evaluate(()=>document.getElementById('map-local-group').click());
  await page.waitForFunction(()=>window.cosmicMapLayer?.status==='ready',{},{timeout:120000}).catch(()=>{});
  const layer=await page.evaluate(()=>({status:window.cosmicMapLayer?.status,rows:window.cosmicMapLayer?.rows.length,box:!document.getElementById('map-cosmic-layer').closest('label').hidden}));
  check('Couche Groupe local chargée dans la Carte du cockpit (McConnachie 2012)',layer.status==='ready'&&layer.rows>=90,JSON.stringify(layer));
  check('Réglage de la couche visible dans les options de la Carte (essai)',layer.box);
  await page.waitForTimeout(1500);const lab=await page.evaluate(()=>window.cosmicMapLabel());
  check('Étiquette « Groupe local » posée sur l\'enveloppe et visible',lab.visible&&lab.inside,JSON.stringify(lab));
  const sample=async label=>{await page.waitForTimeout(1500);const r=await page.evaluate(()=>window.renderResources());const f=await page.evaluate(()=>window.frameTimingSample(6));measures[label]={...r,frameP50:f.p50??f.median,frameP95:f.p95,frames:f.frames??f.count};console.log(label,JSON.stringify(measures[label]));};
  await page.evaluate(()=>{const b=document.getElementById('map-cosmic-layer');b.checked=false;b.dispatchEvent(new Event('change'));});await sample('carte Groupe local · couche éteinte');
  await page.evaluate(()=>{const b=document.getElementById('map-cosmic-layer');b.checked=true;b.dispatchEvent(new Event('change'));});await sample('carte Groupe local · couche allumée');
  const off=measures['carte Groupe local · couche éteinte'],on=measures['carte Groupe local · couche allumée'];
  check('Ressources : la couche ajoute des appels de dessin et des points, au plus une texture (étiquette)',on.calls>off.calls&&on.points>off.points&&on.textures-off.textures<=1,`appels ${off.calls}→${on.calls} · points ${off.points}→${on.points} · géométries ${off.geometries}→${on.geometries} · programmes ${off.programs}→${on.programs} · textures ${off.textures}→${on.textures}`);
  // Sélection d'une galaxie naine depuis la carte : la plus proche du centre parmi celles qui sont à l'écran et libres d'interface.
  const before=await page.evaluate(()=>window.flightSnapshot());
  const pickable=await page.evaluate(()=>window.cosmicMapPickable?.());
  check('Au moins une galaxie cataloguée visible et cliquable sur la carte',!!pickable&&pickable.count>0,pickable?`${pickable.count} à l'écran · essai sur ${pickable.name}`:'aucune');
  if(pickable){
   await page.mouse.move(pickable.x,pickable.y);await page.mouse.down();await page.mouse.up();await page.waitForTimeout(800);
   const after=await page.evaluate(()=>window.flightSnapshot());
   check('Clic sur la carte : la galaxie devient la cible du cockpit',after.target===pickable.cockpitId,`${after.target} · attendu ${pickable.cockpitId}`);
   check('Clic sur la carte : ni le nez ni le temps ne changent',JSON.stringify(after.attitude)===JSON.stringify(before.attitude)&&after.paused===before.paused&&JSON.stringify(after.pos)===JSON.stringify(before.pos));
  }
  if(pickable){
   await page.evaluate(()=>document.getElementById('map-target').click());await page.waitForTimeout(1500);
   // Centre attendu : la position de l'objet du cockpit (fiche retenue, UNGC pour les doublons), pas forcément le point McConnachie.
   const loc=await page.evaluate(()=>window.cosmicMapTargetScreen());
   check('« Cadrer la sélection » centre la Carte sur la cible du cockpit',!!loc&&Math.hypot(loc.x-loc.cx,loc.y-loc.cy)<12,loc?`écart ${Math.hypot(loc.x-loc.cx,loc.y-loc.cy).toFixed(1)} px`:'introuvable');
   const gap=await page.evaluate(n=>{const L=window.cosmicMapLayer,row=L.rows.find(r=>r.name===n),o=L.resolve(row),a=row.p.map(x=>x*1e6),b=o.lightXYZ||o.xyz;return {catalogue:row.key,cockpit:o.id,ecartAl:Math.round(Math.hypot(...a.map((x,i)=>x-b[i]))),distanceAl:Math.round(Math.hypot(...a))};},pickable.name);
   measures.ecartDoublon=gap;console.log('Écart point catalogue / objet du cockpit',JSON.stringify(gap));
   await page.evaluate(()=>document.getElementById('map-local-group').click());await page.waitForTimeout(1500);
  }
  await page.evaluate(()=>{const s=document.getElementById('map-cosmic-catalogue');s.value='mcconnachie+ungc';s.dispatchEvent(new Event('change'));});
  await page.waitForFunction(()=>window.cosmicMapLayer.status==='ready',{},{timeout:120000}).catch(()=>{});await page.waitForTimeout(1200);
  const both=await page.evaluate(()=>({status:window.cosmicMapLayer.status,rows:window.cosmicMapLayer.rows.length,ungc:window.cosmicMapLayer.layers.ungc.rows.length}));
  check('Catalogue UNGC 2013 ajouté sur la Carte (choix « Les deux »)',both.status==='ready'&&both.ungc>500&&both.rows===both.ungc+layer.rows,JSON.stringify(both));
  await sample('carte Groupe local · McConnachie + UNGC');
  const pu=await page.evaluate(()=>window.cosmicMapPickable());
  if(pu){await page.mouse.move(pu.x,pu.y);await page.mouse.down();await page.mouse.up();await page.waitForTimeout(800);
   check('Clic sur une galaxie (catalogue « Les deux ») : elle devient la cible',(await page.evaluate(()=>window.flightSnapshot().target))===pu.cockpitId,`${pu.name} (${pu.key}) → ${pu.cockpitId}`);}
  const c=await page.context().newCDPSession(page);const s=await c.send('Page.captureScreenshot',{format:'jpeg',quality:72});fs.writeFileSync(path.join(OUT,'ui/cockpit-carte-groupe-local-faisabilite.jpg'),Buffer.from(s.data,'base64'));
  check('Aucune erreur de page',errors.length===0,errors.join(' | '));
  await page.close();
  // Hors session d'essai : rien ne change pour les visiteurs.
  const pub=await ctx.newPage();pub.setDefaultTimeout(400000);await pub.goto(`http://127.0.0.1:${PORT}/cockpit.html`);
  await pub.waitForFunction(()=>window.gpuStartupDiagnostic?.().ready&&!document.getElementById('flight-app').inert);
  check('Cockpit public : couche absente et réglages masqués',await pub.evaluate(()=>window.cosmicMapLayer===undefined&&document.getElementById('map-cosmic-layer').closest('label').hidden&&document.getElementById('map-cosmic-catalogue').closest('label').hidden&&document.getElementById('map-target').hidden));
  await pub.close();
 }finally{await browser.close();server.close();}
 const failed=results.filter(r=>!r.ok);
 fs.writeFileSync(path.join(OUT,'cosmic-map-feasibility.json'),JSON.stringify({passed:results.length-failed.length,failed:failed.length,measures,results},null,1));
 console.log(failed.length?`${failed.length} échec(s)`:`${results.length} contrôles réussis`);process.exit(failed.length?1:0);
})().catch(e=>{console.error(e);server.close();process.exit(1);});
