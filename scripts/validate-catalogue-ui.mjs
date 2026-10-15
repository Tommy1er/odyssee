// Node DOM integration test. No WebGL render or browser screenshot is claimed.
import {JSDOM} from 'jsdom';
import {build} from 'esbuild';
import * as Three from 'three';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync('public/cosmos.html','utf8'),dom=new JSDOM(html,{url:'http://localhost/cosmos.html',runScripts:'outside-only'}),w=dom.window;
let raf;const errors=[];w.addEventListener('error',e=>errors.push(e.error?.message||e.message));
w.__T=Three;w.devicePixelRatio=1;w.ResizeObserver=class{observe(){}};w.requestAnimationFrame=f=>{raf=f;};w.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync('public/'+url.replace(/^\.\//,''),'utf8'))});
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
check('M33 label centers the camera and shows a galaxy with synthetic populations off',()=>{
 const s=w.cosmicSnapshot();assert.equal(s.selected,'m33');assert(s.visible.includes('m33'));assert(!s.visible.includes('local-group'));assert(!s.survey.synthetic);
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
check('Close zoom stops outside the galaxy rather than entering an invisible shell',()=>assert(radius()>=.03*1.5-1e-10));
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
check('Interaction sequence has no DOM errors',()=>assert.deepEqual(errors,[]));
w.close();console.log(JSON.stringify({passed:n,mode:'DOM integration with real OrbitControls; GPU not tested'}));
