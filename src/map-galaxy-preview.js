import * as T from 'three';
import {galaxyObject,findDuplicate} from './catalogue-galaxies.js';
import {GROUP_SLOTS,galaxyOrientation,localGroupGLSL} from './local-group.js';
import {STRUCTURES} from './cosmic-data.js';
import {hash} from './body-data.js';

// The selected catalogue galaxy uses the cockpit's existing class model. Coordinates stay
// at the nominal catalogue position (Mly); this camera never advances a physical journey.
// A single lazy preview avoids creating 55,877 volumes. Brightness is illustrative.
export class MapGalaxyPreview {
 constructor(scene){
  this.cache=new WeakMap();this.row=null;this.object=null;this.duplicate=null;
  this.references=STRUCTURES.filter(o=>o.type==='galaxy').map(o=>({...o,xyz:o.p.map(x=>x*1e6),d:o.d*1e6}));
  const n=GROUP_SLOTS;
  this.uniforms={
   groupCenters:{value:Array.from({length:n},()=>new T.Vector3())},
   groupRotations:{value:Array.from({length:n},()=>new T.Matrix3())},
   groupShapes:{value:Array(n).fill(-1)},groupSeeds:{value:Array(n).fill(0)},
   groupParams:{value:Array.from({length:n},()=>new T.Vector4(1,1,.045,1))},
   groupTime:{value:0},inverseProjection:{value:new T.Matrix4()},cameraWorld:{value:new T.Matrix4()},exposure:{value:1}
  };
  this.material=new T.ShaderMaterial({uniforms:this.uniforms,
   vertexShader:'varying vec2 uvScreen;void main(){uvScreen=position.xy;gl_Position=vec4(position.xy,0.,1.);}',
   fragmentShader:`precision highp float;varying vec2 uvScreen;uniform mat4 inverseProjection,cameraWorld;uniform float exposure;${localGroupGLSL}
void main(){vec3 rayCamera=(inverseProjection*vec4(uvScreen,1.,1.)).xyz;vec3 ray=normalize(mat3(cameraWorld)*rayCamera);vec3 light=groupRadiance(ray);gl_FragColor=vec4(1.-exp(-light*exposure),1.);}`,
   depthTest:false,depthWrite:false,transparent:true,blending:T.AdditiveBlending});
  this.mesh=new T.Mesh(new T.PlaneGeometry(2,2),this.material);this.mesh.frustumCulled=false;this.mesh.renderOrder=2;this.mesh.visible=false;scene.add(this.mesh);
 }
 model(row){if(!this.cache.has(row))this.cache.set(row,galaxyObject(row));return this.cache.get(row);}
 radius(row){return this.model(row).radiusLy/1e6;}
 select(row){
  if(row===this.row)return;
  this.row=row;this.object=row?this.model(row):null;this.mesh.visible=false;this.duplicate=null;
  this.uniforms.groupShapes.value.fill(-1);
  if(!row)return;
  const o=this.object,u=this.uniforms;
  u.groupShapes.value[0]=o.shapeCode;u.groupParams.value[0].set(...o.shapeParams);
  u.groupSeeds.value[0]=hash(o.id)%997;u.groupRotations.value[0].copy(galaxyOrientation(o));
  // Instrument view: keep faint dwarf models readable; never claim photometric calibration.
  u.exposure.value=2/Math.max(.03,o.shapeParams[3]);
  this.duplicate=findDuplicate(o,this.references)?.id||null;
 }
 update(camera){
  if(!this.row)return;
  const r=this.object.radiusLy/1e6,center=this.uniforms.groupCenters.value[0];
  center.set(...this.row.p).sub(camera.position).divideScalar(r);
  this.mesh.visible=center.length()<250;
  camera.updateMatrixWorld();this.uniforms.inverseProjection.value.copy(camera.projectionMatrixInverse);this.uniforms.cameraWorld.value.copy(camera.matrixWorld);
 }
}
