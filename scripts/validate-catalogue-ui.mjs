// Node DOM integration test. No WebGL render or browser screenshot is claimed.
import {JSDOM} from 'jsdom';
import {build} from 'esbuild';
import * as Three from 'three';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {BasinData,BasinLayer} from '../src/cf4-basins.js';
const html=fs.readFileSync('public/cosmos.html','utf8'),dom=new JSDOM(html,{url:'http://localhost/cosmos.html',runScripts:'outside-only'}),w=dom.window;
let raf;const errors=[];w.addEventListener('error',e=>errors.push(e.error?.message||e.message));
w.__T=Three;w.devicePixelRatio=1;w.ResizeObserver=class{observe(){}};w.requestAnimationFrame=f=>{raf=f;};w.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync('public/'+url.replace(/^\.\//,''),'utf8')),arrayBuffer:async()=>{const b=fs.readFileSync('public/'+url.replace(/^\.\//,''));return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);}});
const viewport=w.document.querySelector('.universe');viewport.getBoundingClientRect=()=>({width:1000,height:800,left:0,top:0});
const canvas=w.document.getElementById('cosmos');canvas.setPointerCapture=()=>{};canvas.releasePointerCapture=()=>{};canvas.getBoundingClientRect=viewport.getBoundingClientRect;Object.defineProperty(canvas,'clientWidth',{value:1000});Object.defineProperty(canvas,'clientHeight',{value:800});
const threeStub=Object.keys(Three).filter(k=>k!=='WebGLRenderer').map(k=>`export const ${k}=window.__T.${k};`).join('\n')+`\nexport class WebGLRenderer{constructor(){this.domElement=document.getElementById('cosmos');}setPixelRatio(){}setClearColor(){}setSize(){}render(scene,camera){scene.updateMatrixWorld();camera.updateMatrixWorld();}getDrawingBufferSize(v){return v.set(1000,800);}}`;
const bundle=await build({entryPoints:['src/cosmos.js'],bundle:true,write:false,format:'iife',plugins:[{name:'node-dom-render-stubs',setup(b){b.onResolve({filter:/^three$/},()=>({path:'three',namespace:'stub'}));b.onLoad({filter:/.*/,namespace:'stub'},a=>({contents:a.path==='three'?threeStub:`export class OrbitControls{constructor(camera){this.camera=camera;this.target=new window.__T.Vector3();}update(){this.camera.lookAt(this.target);this.camera.updateMatrixWorld();}}`,loader:'js'}));}}]});
w.eval(bundle.outputFiles[0].text);
const $=id=>w.document.getElementById(id),wait=async pred=>{for(let i=0;i<100;i++){if(pred())return;await new Promise(r=>setTimeout(r,10));}throw Error('DOM condition timed out');};
let n=0;const check=(label,fn)=>{fn();n++;console.log('PASS '+label);};
await wait(()=>w.cosmicSnapshot?.().survey.ready);
check('Initial scale loads historical nearby catalogue without synthetic overlay',()=>{assert.equal(w.cosmicSnapshot().survey.total,101);assert(!$('synthetic').checked);});
$('survey-search').value='Andromeda';$('survey-search').dispatchEvent(new w.Event('input'));await wait(()=>$('survey-results').querySelector('button')?.textContent.startsWith('Andromeda'));
$('survey-results').querySelector('button').click();
check('Selecting a catalogue galaxy fills provenance and offers a labelled cockpit visit',()=>{assert.equal($('name').textContent,'Andromeda');assert(!$('flight').hidden&&$('flight').getAttribute('href').includes('target=mcconnachie%3AAndromeda')&&$('flight').textContent.includes('pas une image'));assert($('extent').textContent.includes('aucune taille physique'));});
w.document.querySelector('[data-level="2"]').click();await wait(()=>w.cosmicSnapshot().survey.ready&&w.cosmicSnapshot().survey.key==='cf4');
$('survey-search').value='PGC 2';$('survey-search').dispatchEvent(new w.Event('input'));await wait(()=>w.cosmicSnapshot().survey.shown===1);$('survey-results').querySelector('button').click();
check('CF4 selection exposes distance error and methods',()=>{assert.equal($('name').textContent,'PGC 2');assert($('summary').textContent.includes('34,535'));assert($('relation').textContent.includes('Tully–Fisher'));assert($('extent').textContent.includes('4 726'));});
$('survey-radius').value='5';$('survey-radius').dispatchEvent(new w.Event('change'));
check('Filtering away selection restores structure details',()=>{assert.equal(w.cosmicSnapshot().survey.shown,0);assert.equal(w.cosmicSnapshot().selected,'laniakea');assert(!$('flight').hidden);});
$('survey-search').value='';$('survey-radius').value='Infinity';$('survey-error').value='0.2';$('survey-error').dispatchEvent(new w.Event('change'));
check('Error filter changes count; list remains capped at 60',()=>{assert(w.cosmicSnapshot().survey.shown>0&&w.cosmicSnapshot().survey.shown<55877);assert.equal($('survey-results').querySelectorAll('button').length,60);});
$('survey-top').click();raf(2000);
check('Supergalactic view and animation loop execute without DOM errors',()=>{assert(w.cosmicSnapshot().camera.every(Number.isFinite));assert.deepEqual(errors,[]);});
// Force a failed uncached load, then retry. No fake observed population on error.
const original=w.fetch;w.fetch=async()=>({ok:false,status:503});$('survey-catalogue').value='ungc';$('survey-catalogue').dispatchEvent(new w.Event('change'));await wait(()=>!$('survey-retry').hidden);
check('Download failure keeps map usable and exposes retry',()=>{assert(!w.cosmicSnapshot().survey.ready);assert.equal(w.cosmicSnapshot().survey.shown,0);assert($('survey-status').textContent.includes('indisponible'));});
w.fetch=original;$('survey-retry').click();await wait(()=>w.cosmicSnapshot().survey.ready);
check('Retry loads UNGC; source change clears incompatible CF4-only filter',()=>{assert.equal(w.cosmicSnapshot().survey.total,869);assert.equal(w.cosmicSnapshot().survey.shown,869);assert($('survey-error-label').hidden);});
// Real OrbitControls (only WebGLRenderer is stubbed): exercise the reported interaction.
const tick=()=>raf(w.performance.now()+2000);
const radius=()=>{const s=w.cosmicSnapshot();return Math.hypot(...s.camera.map((x,i)=>x-s.target[i]));};
const clickLabel=name=>[...w.document.querySelectorAll('#labels button')].find(b=>b.textContent.includes(name)).click();
$('survey-catalogue').value='auto';$('survey-search').value='';$('survey-error').value='Infinity';$('home').click();await wait(()=>w.cosmicSnapshot().survey.ready&&w.cosmicSnapshot().survey.key==='mcconnachie');tick();
clickLabel('M33');tick();
check('M33 label centers the camera and shows its class volume (symbol hidden, no double drawing) with synthetic populations off',()=>{
 const s=w.cosmicSnapshot();assert.equal(s.selected,'m33');assert(s.preview.visible&&s.preview.id==='m33'&&!s.visible.includes('m33'));assert(!s.visible.includes('local-group'));assert(!s.survey.synthetic);
 assert(radius()<.2);assert.equal(s.boost,1);assert($('quick-flight').getAttribute('href').includes('target=m33'));
});
let before=radius();clickLabel('M33');tick();
check('A repeated click moves closer instead of resetting the same view',()=>assert(radius()<before*.6));
const wheel=(el,deltaY,ctrlKey=false)=>el.dispatchEvent(new w.WheelEvent('wheel',{bubbles:true,cancelable:true,clientX:500,clientY:400,deltaY,ctrlKey}));
before=radius();const targetBefore=w.cosmicSnapshot().target;wheel(canvas,-30);tick();
check('Trackpad wheel approaches the selected center',()=>{assert(radius()<before);assert.deepEqual(w.cosmicSnapshot().target,targetBefore);});
before=radius();wheel([...w.document.querySelectorAll('#labels button')].find(b=>b.textContent.includes('M33')),-10,true);tick();
check('Pinching over the label reaches OrbitControls rather than the page',()=>assert(radius()<before));
wheel(canvas,-10000,true);tick();
check('Close zoom enters the visible class volume of M33 and stops at 30 % of its radius',()=>{const s=w.cosmicSnapshot();assert(s.preview.visible&&s.preview.id==='m33');assert(Math.abs(radius()-.03*.3)<1e-9);assert(s.clip[0]<radius()*.01);});
before=radius();wheel(canvas,100);tick();
check('Reverse wheel moves away from the same target',()=>assert(radius()>before));
clickLabel('M31');wheel(canvas,-20);tick();const afterGesture=w.cosmicSnapshot().camera;tick();
check('Wheel during a framing transition keeps control of the camera',()=>{assert(!w.cosmicSnapshot().transitioning);assert(w.cosmicSnapshot().camera.every((v,i)=>Math.abs(v-afterGesture[i])<1e-10));assert.equal(w.cosmicSnapshot().selected,'m31');});
// Select a known catalogue marker by its actual projected screen position, starting
// with another selected target. Disable other catalogue candidates using the search.
$('survey-search').value='Andromeda';$('survey-search').dispatchEvent(new w.Event('input'));await wait(()=>$('survey-results').querySelector('button')?.textContent.startsWith('Andromeda'));
$('survey-results').querySelector('button').click();tick();
const galaxyId=w.cosmicSnapshot().selected,galaxyPosition=w.cosmicSnapshot().target.slice();clickLabel('M33');tick();
const snapshot=w.cosmicSnapshot(),cam=new Three.PerspectiveCamera(48,1000/800,.00001,10000);cam.up.set(...snapshot.up);cam.position.set(...snapshot.camera);cam.lookAt(...snapshot.target);cam.updateMatrixWorld();
// Move to a wide framing that includes both M33 and Andromeda.
$('home').click();tick();const wide=w.cosmicSnapshot();cam.position.set(...wide.camera);cam.lookAt(...wide.target);cam.updateMatrixWorld();
const projected=new Three.Vector3(...galaxyPosition).project(cam),px=(projected.x+1)*500,py=(1-projected.y)*400;
canvas.dispatchEvent(new w.MouseEvent('pointerdown',{clientX:px,clientY:py,button:0}));
canvas.dispatchEvent(new w.MouseEvent('pointerup',{clientX:px,clientY:py,button:0}));tick();
check('Clicking a plotted catalogue point recenters the zoom target',()=>{assert.equal(w.cosmicSnapshot().selected,galaxyId);assert(w.cosmicSnapshot().target.every((v,i)=>Math.abs(v-galaxyPosition[i])<1e-9));});
before=radius();$('survey-marker').click();tick();
check('Selected catalogue label is clickable and approaches its position',()=>assert(radius()<before));
check('Selected local catalogue galaxy has a volume, source notes and a size-based framing',()=>{const p=w.cosmicSnapshot().preview;assert(p.visible);assert.equal(p.id,galaxyId);assert(radius()<p.radiusMly*6);assert($('extent').textContent.includes('Taille :'));});
// All fixed structure types retain useful focus, a second approach, and a valid visit link.
for(const [id,expectedLevel] of [['milky-way',0],['local-group',0],['virgo-cluster',1],['virgo-supercluster',1],['great-attractor',2],['laniakea',2],['bootes-void',3]]){
 w.document.querySelector('#results [data-object="'+id+'"]').click();tick();const d=radius();$('approach').click();tick();
 check('Structure '+id+' frames and approaches at its own scale',()=>{assert.equal(w.cosmicSnapshot().selected,id);assert.equal(w.cosmicSnapshot().level,expectedLevel);assert(radius()<d);assert.equal(w.cosmicSnapshot().preview.visible,id==='milky-way');assert(!$('quick-flight').hidden);});
}
await wait(()=>w.cosmicSnapshot().survey.ready&&w.cosmicSnapshot().survey.key==='cf4');
$('survey-search').value='PGC 41361';$('survey-search').dispatchEvent(new w.Event('input'));await wait(()=>w.cosmicSnapshot().survey.shown===1);$('survey-results').querySelector('button').click();tick();
check('CF4 M87 previews as an elliptical with disclosed assumed size and without a duplicate',()=>{const s=w.cosmicSnapshot();assert(s.preview.visible);assert.equal(s.preview.shape,3);assert.equal(s.preview.duplicate,'m87');assert(!s.visible.includes('m87'));assert($('extent').textContent.includes('supposée'));});
$('survey-catalogue').value='ungc';$('survey-catalogue').dispatchEvent(new w.Event('change'));await wait(()=>w.cosmicSnapshot().survey.key==='ungc'&&w.cosmicSnapshot().survey.ready);
$('survey-search').value='MESSIER081';$('survey-search').dispatchEvent(new w.Event('input'));await wait(()=>w.cosmicSnapshot().survey.shown===1);$('survey-results').querySelector('button').click();tick();
check('UNGC M81 previews as a spiral with its catalogue diameter',()=>{const p=w.cosmicSnapshot().preview;assert(p.visible);assert.equal(p.shape,0);assert($('extent').textContent.includes('diamètre UNGC'));});
$('enter').click();tick();check('Observing a catalogue galaxy keeps an exterior view of its model',()=>{assert(!w.cosmicSnapshot().immersion);assert(radius()>w.cosmicSnapshot().preview.radiusMly);});
// Basins use real metadata/binary geometry. All nine published names are selectable.
$('survey-catalogue').value='auto';w.document.querySelector('[data-level="2"]').click();tick();await wait(()=>w.cosmicSnapshot().basins.status==='ready');tick();
$('basins-sdss').checked=true;$('basins-sdss').dispatchEvent(new w.Event('change'));
for(let i=1;i<=9;i++){
 const b=w.document.querySelector('[data-basin="cf4-basin:'+i+'"]');assert(b);b.click();tick();const d=radius();$('approach').click();tick();
 check('Reconstructed basin '+i+' is selectable and approachable without a fictitious cockpit link',()=>{assert.equal(w.cosmicSnapshot().selected,'cf4-basin:'+i);assert(radius()<d);assert($('quick-flight').hidden);assert($('flight').hidden);assert($('kind').textContent.includes('reconstruit'));});
}
const apus=[...w.document.querySelectorAll('.basin-label')].find(b=>b.textContent.includes('Apus'));apus.click();tick();before=radius();wheel(apus,-20,true);tick();
check('Basin label supports the same click and trackpad gesture',()=>{assert.equal(w.cosmicSnapshot().selected,'cf4-basin:2');assert(radius()<before);});
// Ray-pick a real published basin surface with catalogue symbols filtered away.
$('envelopes').checked=false;$('survey-search').value='no such galaxy';$('survey-search').dispatchEvent(new w.Event('input'));await wait(()=>w.cosmicSnapshot().survey.shown===0);tick();
const buf=fs.readFileSync('public/cf4-basins-2023.bin'),bd=new BasinData(JSON.parse(fs.readFileSync('public/cf4-basins-2023.json')),buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength)),bs=new Three.Scene(),bl=new BasinLayer(bs);bl.build(bd);bs.updateMatrixWorld();
const sc=w.cosmicSnapshot(),bc=new Three.PerspectiveCamera(48,1000/800,.00001,10000);bc.up.set(...sc.up);bc.position.set(...sc.camera);bc.lookAt(...sc.target);bc.updateMatrixWorld();
const vertices=bl.entries.find(e=>e.basin.label===2).mesh.geometry.attributes.position;let surfacePixel;
for(let i=0;i<vertices.count;i++){const p=new Three.Vector3().fromBufferAttribute(vertices,i).project(bc);if(p.z>-1&&p.z<1&&Math.abs(p.x)<.8&&Math.abs(p.y)<.8){surfacePixel=[(p.x+1)*500,(1-p.y)*400];break;}}
assert(surfacePixel);const oldSelection=w.cosmicSnapshot().selected,oldRadius=radius();canvas.dispatchEvent(new w.MouseEvent('pointerdown',{clientX:surfacePixel[0],clientY:surfacePixel[1],button:0}));canvas.dispatchEvent(new w.MouseEvent('pointerup',{clientX:surfacePixel[0],clientY:surfacePixel[1],button:0}));tick();
check('Clicking a visible basin surface selects its reconstructed region',()=>{assert(w.cosmicSnapshot().selected.startsWith('cf4-basin:'));assert(w.cosmicSnapshot().selected!==oldSelection||radius()<oldRadius);});
// 23 Oct 2026 report: clicking the drawn M31 symbol centred the zoom on the Local Group (near the Sun). The symbol is
// enlarged up to ×6, its pick sphere is the true radius, and the Local Group envelope behind it was hit instead.
{$('home').click();tick();$('survey-search').value='aucune-entree-zz';$('survey-search').dispatchEvent(new w.Event('input'));await wait(()=>w.cosmicSnapshot().survey.shown===0);
 const s0=w.cosmicSnapshot(),cam=new Three.PerspectiveCamera(48,1000/800,.00001,10000);cam.up.set(...s0.up);cam.position.set(...s0.camera);cam.lookAt(...s0.target);cam.updateMatrixWorld();
 const m31=[1.8465,.3484,1.649];const v=new Three.Vector3(...m31).project(cam),px=(v.x+1)*500+16,py=(1-v.y)*400;
 const sphere=.11/new Three.Vector3(...m31).distanceTo(cam.position)*400/Math.tan(24*Math.PI/180);
 canvas.dispatchEvent(new w.MouseEvent('pointerdown',{clientX:px,clientY:py,button:0}));canvas.dispatchEvent(new w.MouseEvent('pointerup',{clientX:px,clientY:py,button:0}));tick();tick();
 check('A click on the enlarged M31 symbol, outside its true-radius pick sphere ('+sphere.toFixed(1)+' px), selects M31 and recentres the zoom on it',()=>{const s=w.cosmicSnapshot();assert(sphere<16);assert.equal(s.selected,'m31');assert(s.target.every((x,i)=>Math.abs(x-m31[i])<2e-3));});
 let before=radius();wheel(canvas,-30);tick();check('The wheel then zooms toward M31, not toward the Sun',()=>{const s=w.cosmicSnapshot();assert(radius()<before&&s.target.every((x,i)=>Math.abs(x-m31[i])<2e-3));});
 $('survey-search').value='';$('survey-search').dispatchEvent(new w.Event('input'));}
// Dezoom to the observable universe: comoving horizon 46 500 Mly, clip planes follow the distance.
$('survey-radius').value='14300';$('survey-radius').dispatchEvent(new w.Event('change'));tick();tick();
check('Exploration radius at the horizon frames the whole observable universe with its horizon drawn',()=>{const s=w.cosmicSnapshot();assert(Math.hypot(...s.camera)>46500*1.5&&s.horizon.visible&&s.level===3&&s.clip[1]>Math.hypot(...s.camera)+46500);});
$('home').click();tick();tick();$('universe').click();tick();tick();check('« Univers observable » button reaches the same scale; zoom range 30 % of a galaxy radius to 150 000 Mly',()=>{const s=w.cosmicSnapshot();assert(radius()>46500*2&&s.zoom.max===150000);});
check('Interaction sequence has no DOM errors',()=>assert.deepEqual(errors,[]));
w.close();console.log(JSON.stringify({passed:n,mode:'DOM integration with real OrbitControls; GPU not tested'}));
