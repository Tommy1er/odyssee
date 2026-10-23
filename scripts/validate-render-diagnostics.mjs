import {JSDOM} from 'jsdom';
import assert from 'node:assert/strict';
import {showRenderError} from '../src/render-diagnostics.js';
const dom=new JSDOM('<div id="error" hidden></div>');globalThis.document=dom.window.document;const el=document.getElementById('error');
showRenderError(el,new Error('Error creating WebGL context.'),'cockpit');assert(!el.hidden);assert.match(el.querySelector('strong').textContent,/WebGL/);assert.equal(el.querySelector('pre').textContent,'Error creating WebGL context.');
showRenderError(el,new Error('Missing catalogue <script>bad()</script>'),'carte');assert(!el.querySelector('script'));assert.match(el.querySelector('strong').textContent,/carte/);assert(!el.querySelector('strong').textContent.includes('WebGL'));assert.equal(el.querySelectorAll('details').length,1);assert.match(el.querySelector('pre').textContent,/<script>/);
console.log('PASS actual error retained safely; context failure distinguished from application error');dom.window.close();delete globalThis.document;
