import {JSDOM} from 'jsdom';
import assert from 'node:assert/strict';
import {showRenderError,monitorWebGL} from '../src/render-diagnostics.js';
import {renderPixelRatio,MAX_RENDER_PIXELS} from '../src/render-budget.js';
const dom=new JSDOM('<div id="error" hidden></div>');globalThis.document=dom.window.document;const el=document.getElementById('error');
showRenderError(el,new Error('Error creating WebGL context.'),'cockpit');assert(!el.hidden);assert.match(el.querySelector('strong').textContent,/WebGL/);assert.equal(el.querySelector('pre').textContent,'Error creating WebGL context.');
showRenderError(el,new Error('Missing catalogue <script>bad()</script>'),'carte');assert(!el.querySelector('script'));assert.match(el.querySelector('strong').textContent,/carte/);assert(!el.querySelector('strong').textContent.includes('WebGL'));assert.equal(el.querySelectorAll('details').length,1);assert.match(el.querySelector('pre').textContent,/<script>/);
const canvas=document.createElement('canvas');let stops=0;
const monitor=monitorWebGL(canvas,el,'cockpit',()=>stops++);
function emit(type,message){const event=new dom.window.Event(type,{cancelable:true});Object.defineProperty(event,'statusMessage',{value:message});canvas.dispatchEvent(event);return event;}
emit('webglcontextcreationerror','Web page caused context loss and was blocked');
monitor.showError(new Error('Error creating WebGL context.'));
assert.match(el.querySelector('pre').textContent,/context loss and was blocked/);assert.match(el.querySelector('p').textContent,/toutes ses fenêtres/);assert(monitor.stopped);
assert(emit('webglcontextlost','GPU reset <script>bad()</script>').defaultPrevented);assert(!el.querySelector('script'));
emit('webglcontextrestored');assert(monitor.stopped);assert.match(el.querySelector('pre').textContent,/GPU reset/);assert.match(el.querySelector('pre').textContent,/webglcontextrestored/);assert.equal(stops,2);
monitor.dispose();emit('webglcontextlost','ignored');assert.equal(stops,2);
for(const [w,h,dpr] of [[960,700,1],[1920,1080,2],[3840,2160,2],[7680,4320,3],[390,844,3]]){const r=renderPixelRatio(w,h,dpr);assert(w*h*r*r<=MAX_RENDER_PIXELS+1);assert(r<=Math.min(dpr,2));}
assert.equal(renderPixelRatio(960,700,1),1);assert.equal(renderPixelRatio(3840,2160,2),.5);
console.log('PASS diagnostics retain browser reason, context loss stops rendering, restoration requires reload, pixel budget holds through 8K');dom.window.close();delete globalThis.document;
