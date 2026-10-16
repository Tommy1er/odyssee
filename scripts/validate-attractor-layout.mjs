// Projection/layout integration using Three matrices, with a canvas stub; no GPU or font-rasterisation claim.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as T from 'three';
import { BasinData, CockpitBasinOverlay } from '../src/cf4-basins.js';
let count=0;
const check=(name,fn)=>{fn();console.log('PASS '+name);count++;};
globalThis.document={createElement:()=>({getContext:()=>({measureText:s=>({width:s.length*13}),fillRect(){},fillText(){}})})};
const raw=fs.readFileSync('public/cf4-basins-2023.bin');
const data=new BasinData(JSON.parse(fs.readFileSync('public/cf4-basins-2023.json')),raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength));
const overlay=new CockpitBasinOverlay(); overlay.build(data);
let width=960,height=700;
const camera=new T.PerspectiveCamera(70,width/height,.001,3000);
const renderer={autoClear:true,getViewport:v=>v.set(0,0,width,height),render(scene){scene.updateMatrixWorld();}};
const draw=()=>overlay.render(renderer,camera,[0,0,0],[0,0,0],0);
check('Six reconstructed sinks and a distinct regional Norma landmark',()=>{
 assert.equal(overlay.attractorLabels.length,7);assert.equal(overlay.attractorLabels.filter(x=>x.regional).length,1);
 assert.deepEqual(overlay.attractorLabels.filter(x=>!x.regional).map(x=>x.label).sort(),[1,2,3,4,5,6]);
});
const original=overlay.attractorLabels;
const item=original[0];overlay.attractorLabels=[item];
const rect=()=>{
 const s=item.sprite, center=s.position.clone().applyMatrix4(camera.matrixWorldInverse);
 const project=(x,y)=>new T.Vector3(center.x+x,center.y+y,center.z).applyMatrix4(camera.projectionMatrix);
 const a=project(-s.scale.x/2,-s.scale.y/2),b=project(s.scale.x/2,s.scale.y/2);
 return {width:(b.x-a.x)*width/2,height:(b.y-a.y)*height/2};
};
check('Central label has 28px height and measured text width',()=>{
 item.position=[0,0,-100];draw();assert(item.sprite.visible);const r=rect();
 assert(Math.abs(r.height-28)<1e-7);assert(Math.abs(r.width-item.sprite.userData.widthPx)<1e-7);
});
check('Off-axis text keeps the same measured size',()=>{
 item.position=[35,0,-100];draw();assert(item.sprite.visible);const r=rect();
 assert(Math.abs(r.height-28)<1e-7);assert(Math.abs(r.width-item.sprite.userData.widthPx)<1e-7);
});
check('Zoom does not enlarge labels or break their collision boxes',()=>{
 camera.zoom=1.5;camera.updateProjectionMatrix();item.position=[15,0,-100];draw();assert(item.sprite.visible);
 assert(Math.abs(rect().height-28)<1e-7);camera.zoom=1;camera.updateProjectionMatrix();
});
check('Behind-camera labels and edge-clipped text are suppressed',()=>{
 item.position=[0,0,100];draw();assert(!item.sprite.visible);item.position=[95,0,-100];draw();assert(!item.sprite.visible);
});
check('Coincident labels respect priority',()=>{
 const second=original[1];second.position=[0,0,-100];item.position=[0,0,-100];overlay.attractorLabels=[item,second];draw();
 assert(item.sprite.visible);assert(!second.sprite.visible);overlay.attractorLabels=[item];
});
check('Narrow 320px viewport still shows fitting text',()=>{
 width=320;camera.aspect=width/height;camera.updateProjectionMatrix();draw();assert(item.sprite.visible);assert(Math.abs(rect().height-28)<1e-7);
});
check('Comparison half-viewport uses its own dimensions',()=>{
 width=480;camera.aspect=width/height;camera.updateProjectionMatrix();item.position=[0,0,-100];draw();assert(item.sprite.visible);assert(Math.abs(rect().height-28)<1e-7);
});
check('Camera rotation preserves the anchor direction',()=>{
 camera.lookAt(1,0,0);item.position=[100,0,0];draw();assert(item.sprite.visible);const p=item.sprite.position.clone().project(camera);assert(Math.abs(p.x)<1e-7&&Math.abs(p.y)<1e-7);
});
check('At the anchor no undefined direction is rendered; renderer state restored',()=>{
 item.position=[0,0,0];draw();assert(!item.sprite.visible);assert(renderer.autoClear);
});
console.log(JSON.stringify({passed:count,mode:'Three projection and placement; GPU not tested'}));
