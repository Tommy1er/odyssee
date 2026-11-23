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
  await page.evaluate(()=>{document.getElementById('map-local-group').click();document.getElementById('map-cosmic-panel').open=true;});
  await page.waitForFunction(()=>window.cosmicMapLayer?.status==='ready',{},{timeout:120000}).catch(()=>{});
  const layer=await page.evaluate(()=>({status:window.cosmicMapLayer?.status,rows:window.cosmicMapLayer?.rows.length,box:!document.getElementById('map-cosmic-panel').hidden}));
  check('Couche Groupe local chargée dans la Carte du cockpit (McConnachie 2012)',layer.status==='ready'&&layer.rows>=90,JSON.stringify(layer));
  check('Réglage de la couche visible dans les options de la Carte (essai)',layer.box);
  await page.waitForTimeout(1500);
  const fit=await page.evaluate(()=>{const p=document.getElementById('map-cosmic-panel').getBoundingClientRect(),h=document.getElementById('navigation-hud'),hr=h.getBoundingClientRect(),sc=document.getElementById('galaxy-scale').getBoundingClientRect();return {open:document.getElementById('map-cosmic-panel').open,bottom:Math.round(p.bottom),hudTop:h.hidden?null:Math.round(hr.top),scaleVisible:sc.bottom<=innerHeight&&sc.top>=0};});
  check('Panneau ouvert : ne recouvre pas le bandeau de trajet, « Échelle » reste visible',fit.open&&fit.scaleVisible&&(fit.hudTop==null||fit.bottom<=fit.hudTop),JSON.stringify(fit));
  const lab=await page.evaluate(()=>window.cosmicMapLabel());
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
  const prov=await page.evaluate(()=>({pairs:window.cosmicMapLayer.pairs?.length??0,rows:window.cosmicMapLayer.rows.length,note:document.getElementById('map-cosmic-note').textContent,hidden:document.getElementById('map-cosmic-note').hidden,lines:!!window.cosmicMapLayer.pairLines?.visible}));
  measures.doublons=prov;
  check('Provenance : doublons McConnachie / UNGC reliés et galaxies distinctes comptées',prov.pairs>20&&prov.lines&&!prov.hidden&&prov.note.replace(/\s/g,'').includes(String(prov.rows-prov.pairs)+'galaxiesdistinctes'),`${prov.pairs} doublons · « ${prov.note} »`);
  const ps=await page.evaluate(()=>window.cosmicMapPairScreen());
  if(ps){await page.mouse.move(ps.x,ps.y);await page.mouse.down();await page.mouse.up();await page.waitForTimeout(600);
   const tt=await page.evaluate(()=>document.getElementById('flight-toast').textContent);
   check('Clic sur un doublon : la notification explique les deux mesures de la même galaxie',tt.includes(ps.name)&&/Une seule galaxie, deux mesures/.test(tt),tt);}
  else check('Un doublon visible pour le contrôle de la notification',false,'aucun');
  const pu=await page.evaluate(()=>window.cosmicMapPickable());
  if(pu){await page.mouse.move(pu.x,pu.y);await page.mouse.down();await page.mouse.up();await page.waitForTimeout(800);
   check('Clic sur une galaxie (catalogue « Les deux ») : elle devient la cible',(await page.evaluate(()=>window.flightSnapshot().target))===pu.cockpitId,`${pu.name} (${pu.key}) → ${pu.cockpitId}`);}
  // Niveau 2 de cosmos.html : « Voisinage de la Vierge » (150 millions d'al), catalogue selon l'échelle (UNGC 2013).
  await page.evaluate(()=>{const s=document.getElementById('map-cosmic-catalogue');s.value='auto';s.dispatchEvent(new Event('change'));});
  await page.evaluate(()=>{const s=document.getElementById('map-cosmic-level');s.value='1';s.dispatchEvent(new Event('change'));});
  await page.waitForFunction(()=>window.cosmicMapLayer.status==='ready'&&window.cosmicMapLayer.level===1,{},{timeout:120000}).catch(()=>{});await page.waitForTimeout(2000);
  const vir=await page.evaluate(()=>({level:window.cosmicMapLayer.level,focus:window.cosmicMapLayer.focus,cats:[...window.cosmicMapLayer.catalogues],rows:window.cosmicMapLayer.rows.length,labels:window.cosmicMapLabels(),note:document.getElementById('map-cosmic-note').textContent}));
  check('Vierge : niveau 2 actif, catalogue selon l\'échelle = UNGC 2013',vir.level===1&&vir.focus==='virgo-supercluster'&&vir.cats.join()==='ungc'&&vir.rows>800,`${vir.rows} galaxies · « ${vir.note} »`);
  const lv=Object.fromEntries(vir.labels.map(l=>[l.id,l]));
  check('Vierge : étiquettes « Amas de la Vierge » et « Superamas de la Vierge » visibles, « Groupe local » masquée à cette échelle',lv['virgo-cluster']?.visible&&lv['virgo-cluster']?.inside&&lv['virgo-supercluster']?.visible&&lv['virgo-supercluster']?.inside&&!lv['local-group']?.visible,JSON.stringify(vir.labels.map(l=>`${l.name}:${l.visible?'visible':'masquée'}${l.inside?'':' (hors cadre)'}`)));
  await sample('carte Vierge · UNGC');
  const shotV=await page.context().newCDPSession(page);const sv=await shotV.send('Page.captureScreenshot',{format:'jpeg',quality:72});fs.writeFileSync(path.join(OUT,'ui/cockpit-carte-vierge-faisabilite.jpg'),Buffer.from(sv.data,'base64'));
  const pv=await page.evaluate(()=>window.cosmicMapPickable());
  if(pv){const before2=await page.evaluate(()=>window.flightSnapshot());await page.mouse.move(pv.x,pv.y);await page.mouse.down();await page.mouse.up();await page.waitForTimeout(800);const after2=await page.evaluate(()=>window.flightSnapshot());
   check('Vierge : clic sur une galaxie UNGC → cible du cockpit, sans piloter',after2.target===pv.cockpitId&&JSON.stringify(after2.attitude)===JSON.stringify(before2.attitude)&&JSON.stringify(after2.pos)===JSON.stringify(before2.pos),`${pv.name} → ${pv.cockpitId}`);}
  else check('Vierge : au moins une galaxie cliquable',false,'aucune');
  // Cosmicflows-4 au niveau Vierge : couvre l'amas de la Vierge (≈ 54 millions d'al), que UNGC n'atteint pas.
  await page.evaluate(()=>{const s=document.getElementById('map-cosmic-catalogue');s.value='cf4';s.dispatchEvent(new Event('change'));});
  await page.waitForFunction(()=>window.cosmicMapLayer.layers.cf4.status==='ready',{},{timeout:240000}).catch(()=>{});await page.waitForTimeout(2000);
  const cf=await page.evaluate(()=>{const L=window.cosmicMapLayer,v=L.rows.filter(r=>{const d=Math.hypot(r.p[0]+52.3,r.p[1]+7.1,r.p[2]-11.6);return d<12;}).length;return {status:L.layers.cf4.status,rows:L.rows.length,virgo:v,note:document.getElementById('map-cosmic-note').textContent};});
  check('Vierge : Cosmicflows-4 chargé et peuplant l\'amas de la Vierge',cf.status==='ready'&&cf.rows>50000&&cf.virgo>100,`${cf.rows} galaxies, dont ${cf.virgo} à moins de 12 millions d'al du centre de l'amas · « ${cf.note.slice(0,90)}… »`);
  await sample('carte Vierge · Cosmicflows-4');
  const shotC=await page.context().newCDPSession(page);const sc=await shotC.send('Page.captureScreenshot',{format:'jpeg',quality:72});fs.writeFileSync(path.join(OUT,'ui/cockpit-carte-vierge-cf4.jpg'),Buffer.from(sc.data,'base64'));
  const pc=await page.evaluate(()=>window.cosmicMapPickable());
  if(pc){await page.mouse.move(pc.x,pc.y);await page.mouse.down();await page.mouse.up();await page.waitForTimeout(1000);
   check('Vierge : clic sur une galaxie CF4 → destination du cockpit créée et ciblée',(await page.evaluate(()=>window.flightSnapshot().target))===pc.cockpitId,`${pc.name} → ${pc.cockpitId}`);}
  await page.evaluate(()=>{const s=document.getElementById('map-cosmic-catalogue');s.value='auto';s.dispatchEvent(new Event('change'));});
  // Niveaux 3 et 4 de cosmos.html : Laniakea et voisins (650 millions d'al), Superamas et grands vides (1,8 milliard d'al) ; CF4 selon l'échelle ; bassins CF4 2023.
  const level=async i=>{await page.evaluate(i=>{const s=document.getElementById('map-cosmic-level');s.value=String(i);s.dispatchEvent(new Event('change'));},i);
   await page.waitForFunction(i=>window.cosmicMapLayer.level===i&&window.cosmicMapLayer.status==='ready'&&(!(window.cosmicMapLayer.showBasins||window.cosmicMapLayer.showLines)||['ready','error'].includes(window.cosmicMapLayer.basins.status)),i,{timeout:240000}).catch(()=>{});await page.waitForTimeout(2500);
   return page.evaluate(()=>({level:window.cosmicMapLayer.level,cats:[...window.cosmicMapLayer.catalogues],basins:window.cosmicMapLayer.basins.status,basinsVisible:window.cosmicMapLayer.basins.root.visible,shells:window.cosmicMapLayer.basins.entries.filter(e=>e.mesh.visible).length,labels:Object.fromEntries(window.cosmicMapLabels().map(l=>[l.id,l.visible&&l.inside])),note:document.getElementById('map-cosmic-note').textContent,box:!document.getElementById('map-basins').closest('label').hidden}));};
  const lan=await level(2);
  // Décision du 22 novembre (Iris Xe) : bassins et flux masqués par défaut, pas téléchargés tant qu'on ne les demande pas.
  check('Laniakea : niveau 3, Cosmicflows-4 selon l\'échelle ; bassins et flux CF4 masqués par défaut, non téléchargés',lan.level===2&&lan.cats.join()==='cf4'&&lan.basins==='idle'&&!lan.basinsVisible&&lan.box&&await page.evaluate(()=>['map-basins','map-flows','map-flows-animate'].every(id=>!document.getElementById(id).checked&&!document.getElementById(id).closest('label').hidden)),`bassins ${lan.basins}`);
  await page.evaluate(()=>document.getElementById('map-basins').click());
  await page.waitForFunction(()=>['ready','error'].includes(window.cosmicMapLayer.basins.status),null,{timeout:240000}).catch(()=>{});await page.waitForTimeout(2000);
  const bz=await page.evaluate(()=>{const B=window.cosmicMapLayer.basins;return {status:B.status,shells:B.entries.filter(e=>e.mesh.visible).length,lines:B.lines?.visible,note:document.getElementById('map-cosmic-note').textContent};});
  check('Bassins seuls : enveloppes affichées, lignes de courant masquées',bz.status==='ready'&&bz.shells>0&&bz.lines===false&&/Dupuy & Courtois 2023/.test(bz.note),`${bz.shells} bassins`);
  await page.evaluate(()=>document.getElementById('map-flows').click());await page.waitForTimeout(1500);
  const tFix=async()=>page.evaluate(()=>window.cosmicMapLayer.basins.lines.material.uniforms.time.value);
  const fl=await page.evaluate(()=>({lines:window.cosmicMapLayer.basins.lines.visible,note:document.getElementById('map-cosmic-note').textContent}));const f0=await tFix();await page.waitForTimeout(1200);const f1=await tFix();
  check('Flux reconstruits : lignes affichées et fixes par défaut, présentées comme champ de vitesses reconstruit et non comme trajectoires',fl.lines&&f0===f1&&/champ de vitesses reconstruit à l’époque actuelle, pas les trajectoires futures/.test(fl.note),`temps ${f0} → ${f1}`);
  // Sens du courant : chaque ligne est parcourue (et animée) de son début vers sa fin ; la fin doit être plus près de l'attracteur de son bassin.
  const dirn=await page.evaluate(()=>{const B=window.cosmicMapLayer.basins,att=new Map(B.entries.map(e=>[e.basin.label,e.attractor]));let n=0,ok=0;const d=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
   for(const l of B.lineEnds||[]){const a=att.get(l.label);if(!a)continue;n++;if(d(l.last,a)<d(l.first,a))ok++;}return {n,ok};});
  check('Sens de l\'animation : les lignes vont vers l\'attracteur de leur bassin (champ reconstruit)',dirn.n>100&&dirn.ok/dirn.n>.9,`${dirn.ok}/${dirn.n} lignes`);
  const pBefore=await page.evaluate(()=>JSON.stringify(window.cosmicMapLayer.rows.slice(0,50).map(r=>r.p)));
  await page.evaluate(()=>document.getElementById('map-flows-animate').click());await page.waitForTimeout(800);const a0=await tFix();await page.waitForTimeout(1200);const a1=await tFix();
  const pAfter=await page.evaluate(()=>({p:JSON.stringify(window.cosmicMapLayer.rows.slice(0,50).map(r=>r.p)),note:document.getElementById('map-cosmic-note').textContent}));
  check('Animation facultative : le temps des lignes avance, aucune galaxie du catalogue ne bouge, la note précise le sens du courant',a1>a0&&pAfter.p===pBefore&&/sens du courant/.test(pAfter.note),`temps ${a0.toFixed(2)} → ${a1.toFixed(2)}`);
  await page.evaluate(()=>document.getElementById('map-flows-animate').click());
  check('Laniakea : étiquettes Laniakea, Persée–Poissons et Grand Attracteur visibles',lan.labels.laniakea&&lan.labels['perseus-pisces']&&lan.labels['great-attractor'],JSON.stringify(Object.entries(lan.labels).filter(([,v])=>v).map(([k])=>k)));
  check('Laniakea : la note cite la source des bassins et précise que c\'est un modèle',/Dupuy & Courtois 2023/.test(bz.note)&&/pas des vitesses 3D mesurées/.test(bz.note),bz.note.slice(-160));
  await sample('carte Laniakea · CF4 + bassins');
  {const c2=await page.context().newCDPSession(page);const s2=await c2.send('Page.captureScreenshot',{format:'jpeg',quality:72});fs.writeFileSync(path.join(OUT,'ui/cockpit-carte-laniakea.jpg'),Buffer.from(s2.data,'base64'));}
  const leg=await page.evaluate(()=>[...document.querySelectorAll('#map-basins-legend button')].map(b=>b.textContent));
  check('Laniakea : légende des bassins CF4 (comme cosmos.html), Laniakea en tête',leg.length>=4&&/Laniakea/.test(leg[0]),leg.slice(0,3).join(' | '));
  const fb=await page.evaluate(()=>{const b=document.querySelector('#map-basins-legend button[data-basin="1"]');b.click();return true;});await page.waitForTimeout(800);
  check('Légende : un bassin recadre la Carte et le signale comme modèle',await page.evaluate(()=>/attracteur du modèle CF4 2023, pas un objet observé/.test(document.getElementById('flight-toast').textContent)));
  await page.evaluate(()=>{const s=document.getElementById('map-cosmic-level');s.value='2';s.dispatchEvent(new Event('change'));});await page.waitForTimeout(800);
  // Filtres de cosmos.html sur CF4 : distance maximale 100 Mpc et incertitude ≤ 0,2 mag.
  const n0=await page.evaluate(()=>window.cosmicMapLayer.rows.length);
  await page.evaluate(()=>{const r=document.getElementById('map-cosmic-radius');r.value='100';r.dispatchEvent(new Event('change'));});await page.waitForTimeout(600);
  const n1=await page.evaluate(()=>({n:window.cosmicMapLayer.rows.length,max:Math.max(...window.cosmicMapLayer.rows.map(r=>r.mpc))}));
  await page.evaluate(()=>{const r=document.getElementById('map-cosmic-error');r.value='0.2';r.dispatchEvent(new Event('change'));});await page.waitForTimeout(600);
  const n2=await page.evaluate(()=>({n:window.cosmicMapLayer.rows.length,maxErr:Math.max(...window.cosmicMapLayer.rows.map(r=>r.eDm??0))}));
  check('Filtres : distance max 100 Mpc puis incertitude ≤ 0,2 mag réduisent CF4 comme dans cosmos.html',n1.n<n0&&n1.max<=100&&n2.n<n1.n&&n2.maxErr<=0.2,`${n0} → ${n1.n} (≤ ${n1.max.toFixed(1)} Mpc) → ${n2.n} (eDm ≤ ${n2.maxErr})`);
  await page.evaluate(()=>{for(const id of ['map-cosmic-radius','map-cosmic-error']){const r=document.getElementById(id);r.value='Infinity';r.dispatchEvent(new Event('change'));}});await page.waitForTimeout(600);
  check('Filtres retirés : tout CF4 à nouveau',await page.evaluate(n=>window.cosmicMapLayer.rows.length===n,n0));
  const pl=await page.evaluate(()=>{const L=window.cosmicMapLayer,on=L.layers.cf4.layer.plane.visible;document.getElementById('map-sg-plane').click();return {on};});await page.waitForTimeout(2500);
  check('Plan supergalactique affiché par défaut, masquable',pl.on&&await page.evaluate(()=>!window.cosmicMapLayer.layers.cf4.layer.plane.visible));
  await page.evaluate(()=>document.getElementById('map-sg-plane').click());
  await page.evaluate(()=>{for(const id of ['map-basins','map-flows']){const b=document.getElementById(id);b.checked=false;b.dispatchEvent(new Event('change'));}});await page.waitForTimeout(800);
  check('Bassins et flux : les deux cases décochées masquent la couche',await page.evaluate(()=>!window.cosmicMapLayer.basins.root.visible));
  await page.evaluate(()=>{for(const id of ['map-basins','map-flows']){const b=document.getElementById(id);b.checked=true;b.dispatchEvent(new Event('change'));}});
  const web=await level(3);
  check('Toile cosmique : niveau 4, étiquettes Shapley, Coma, Hercule et vide du Bouvier visibles',web.level===3&&web.labels.shapley&&web.labels['coma-supercluster']&&web.labels['hercules-supercluster']&&web.labels['bootes-void'],JSON.stringify(Object.entries(web.labels).filter(([,v])=>v).map(([k])=>k)));
  await sample('carte toile cosmique · CF4 + bassins');
  {const c3=await page.context().newCDPSession(page);const s3=await c3.send('Page.captureScreenshot',{format:'jpeg',quality:72});fs.writeFileSync(path.join(OUT,'ui/cockpit-carte-toile-cosmique.jpg'),Buffer.from(s3.data,'base64'));}
  // Bassins SDSS coupés par le bord du modèle (option de cosmos.html) : plus de bassins et une légende plus longue.
  const sd0=await page.evaluate(()=>({shells:window.cosmicMapLayer.basins.entries.filter(e=>e.mesh.visible).length,legend:document.querySelectorAll('#map-basins-legend button').length,box:!document.getElementById('map-basins-sdss').closest('label').hidden}));
  await page.evaluate(()=>document.getElementById('map-basins-sdss').click());await page.waitForTimeout(1500);
  const sd1=await page.evaluate(()=>({shells:window.cosmicMapLayer.basins.entries.filter(e=>e.mesh.visible).length,legend:document.querySelectorAll('#map-basins-legend button').length,cut:[...document.querySelectorAll('#map-basins-legend button')].some(b=>/coupé/.test(b.textContent))}));
  check('Bassins SDSS coupés : option affichée aux niveaux 3–4, ajoute des bassins et des entrées de légende',sd0.box&&sd1.shells>sd0.shells&&sd1.legend>sd0.legend,`${sd0.shells} → ${sd1.shells} bassins, légende ${sd0.legend} → ${sd1.legend}${sd1.cut?', dont « coupé »':''}`);
  await page.evaluate(()=>document.getElementById('map-basins-sdss').click());await page.waitForTimeout(800);
  // Vue du dessus du plan supergalactique (bouton de cosmos.html) : regard selon −SGZ, SGY vers le haut.
  await page.evaluate(()=>document.getElementById('map-sg-top').click());await page.waitForTimeout(1200);
  const top=await page.evaluate(()=>{const v=window.cosmicMapView(),dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);return {look:dot(v.dir,v.sgZ),up:dot(v.up,v.sgY)};});
  check('Plan supergalactique vu du dessus : caméra sur l\'axe SGZ, SGY vers le haut',top.look<-.999&&top.up>.999,JSON.stringify(top));
  // Univers observable : cadre centré sur le Soleil, horizon comobile (46,5 milliards d'al) tracé comme dans cosmos.html.
  await page.evaluate(()=>{const s=document.getElementById('map-cosmic-level');s.value='4';s.dispatchEvent(new Event('change'));});await page.waitForTimeout(3000);
  const uni=await page.evaluate(()=>({level:window.cosmicMapLayer.level,select:document.getElementById('map-cosmic-level').value,horizon:window.cosmicMapLayer.horizon.visible,toast:document.getElementById('flight-toast').textContent,cats:[...window.cosmicMapLayer.catalogues].join()}));
  check('Univers observable : horizon tracé, structures du niveau 4 et CF4, notification avec la distance comobile',uni.select==='4'&&uni.level===3&&uni.horizon&&uni.cats==='cf4'&&/46,5 milliards/.test(uni.toast)&&/comobile/.test(uni.toast),JSON.stringify(uni).slice(0,240));
  await sample('carte univers observable · horizon');
  {const c4=await page.context().newCDPSession(page);const s4=await c4.send('Page.captureScreenshot',{format:'jpeg',quality:72});fs.writeFileSync(path.join(OUT,'ui/cockpit-carte-univers-observable.jpg'),Buffer.from(s4.data,'base64'));}
  await page.evaluate(()=>document.getElementById('map-horizon').click());await page.waitForTimeout(800);
  check('Horizon : la case le masque',await page.evaluate(()=>!window.cosmicMapLayer.horizon.visible));
  await page.evaluate(()=>document.getElementById('map-horizon').click());
  await page.evaluate(()=>document.getElementById('map-local-group').click());await page.waitForFunction(()=>window.cosmicMapLayer.level===0&&window.cosmicMapLayer.status==='ready',{},{timeout:60000}).catch(()=>{});await page.waitForTimeout(800);
  check('Groupe local : horizon et option SDSS masqués à cette échelle',await page.evaluate(()=>!window.cosmicMapLayer.horizon.visible&&document.getElementById('map-basins-sdss').closest('label').hidden));
  check('Retour « Groupe local » : niveau 1 et McConnachie 2012 selon l\'échelle',await page.evaluate(()=>window.cosmicMapLayer.level===0&&[...window.cosmicMapLayer.catalogues].join()==='mcconnachie'));
  const c=await page.context().newCDPSession(page);const s=await c.send('Page.captureScreenshot',{format:'jpeg',quality:72});fs.writeFileSync(path.join(OUT,'ui/cockpit-carte-groupe-local-faisabilite.jpg'),Buffer.from(s.data,'base64'));
  check('Aucune erreur de page',errors.length===0,errors.join(' | '));
  await page.close();
  // Hors session d'essai : rien ne change pour les visiteurs.
  const pub=await ctx.newPage();pub.setDefaultTimeout(400000);await pub.goto(`http://127.0.0.1:${PORT}/cockpit.html`);
  await pub.waitForFunction(()=>window.gpuStartupDiagnostic?.().ready&&!document.getElementById('flight-app').inert);
  check('Cockpit public : couche absente et réglages masqués',await pub.evaluate(()=>window.cosmicMapLayer===undefined&&document.getElementById('map-cosmic-panel').hidden&&!document.getElementById('map-cosmic-panel').getClientRects().length));
  await pub.close();
 }finally{await browser.close();server.close();}
 const failed=results.filter(r=>!r.ok);
 fs.writeFileSync(path.join(OUT,'cosmic-map-feasibility.json'),JSON.stringify({passed:results.length-failed.length,failed:failed.length,measures,results},null,1));
 console.log(failed.length?`${failed.length} échec(s)`:`${results.length} contrôles réussis`);process.exit(failed.length?1:0);
})().catch(e=>{console.error(e);server.close();process.exit(1);});
