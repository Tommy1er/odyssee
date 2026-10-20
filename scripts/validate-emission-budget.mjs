import assert from 'node:assert/strict';
import {partitionEmission} from '../src/emission-budget.js';
import {localGroupObjects} from '../src/local-group.js';
import {physicsOf} from '../src/nebulae.js';
import {extragalacticNebulae} from '../src/extragalactic-nebulae.js';

let passed = 0;
const check = (name, run) => {run(); passed++; console.log('PASS ' + name);};
const near = (a, b) => assert(Math.abs(a-b) < 2e-14, `${a} != ${b}`);
const base = {hostId:'host', hostMagnitude:0,
  children:[{id:'child',hostId:'host',magnitude:2.5,resolved:1}]};
check('A 2.5 magnitude difference assigns exactly one tenth of the flux', () => {
  const b = partitionEmission(base); near(b.host,.9); near(b.children[0].flux,.1);
});
check('Missing or culled child keeps its light in the host', () => {
  for (const resolved of [0,undefined]) {
    const b=partitionEmission({...base,children:[{...base.children[0],resolved}]});
    near(b.host,1); near(b.children[0].flux,0);
  }
});
check('Child resolution and host point/volume handoff conserve flux independently', () => {
  for(let i=0;i<=100;i++) for(let j=0;j<=100;j++) {
    const b=partitionEmission({...base,hostVolume:i/100,children:[{...base.children[0],resolved:j/100}]});
    near(b.hostPoint+b.hostVolume+b.children[0].flux,1);
    assert(b.hostPoint>=0&&b.hostVolume>=0);
  }
});
check('Multiple disjoint children debit the same inclusive host once each', () => {
  const b=partitionEmission({...base,children:[...base.children,{id:'second',hostId:'host',magnitude:5,resolved:.5}]});
  near(b.host,.895); near(b.allocatedChildFraction,.105);
});
check('Uniform magnitude offset leaves allocation invariant', () => {
  const b=partitionEmission({...base,hostMagnitude:100,children:[{...base.children[0],magnitude:102.5}]});
  near(b.host,.9);
});
check('No children and fully allocated host endpoints are supported', () => {
  near(partitionEmission({...base,children:[]}).host,1);
  near(partitionEmission({...base,children:[{...base.children[0],magnitude:0}]}).host,0);
});
check('Invalid magnitudes and nonphysical interpolation weights are rejected', () => {
  for(const v of [NaN,Infinity,-Infinity]) {
    assert.throws(()=>partitionEmission({...base,hostMagnitude:v}));
    assert.throws(()=>partitionEmission({...base,children:[{...base.children[0],magnitude:v}]}));
  }
  for(const v of [-.1,1.1,NaN,Infinity]) {
    assert.throws(()=>partitionEmission({...base,hostVolume:v}));
    assert.throws(()=>partitionEmission({...base,children:[{...base.children[0],resolved:v}]}));
  }
});
check('Wrong host, self membership and duplicate child are rejected', () => {
  for(const c of [{...base.children[0],hostId:'elsewhere'},{...base.children[0],id:'host'}])
    assert.throws(()=>partitionEmission({...base,children:[c]}));
  assert.throws(()=>partitionEmission({...base,children:[...base.children,...base.children]}));
});
check('Impossible total is rejected even with inactive children', () => {
  assert.throws(()=>partitionEmission({...base,children:[{...base.children[0],magnitude:-1,resolved:0}]}));
  assert.throws(()=>partitionEmission({...base,children:[
    {...base.children[0],magnitude:.5},{...base.children[0],id:'other',magnitude:.5}]}));
});
check('Unrepresentable magnitude ratios are rejected',()=>{
  for(const magnitude of [-10000,10000])
    assert.throws(()=>partitionEmission({...base,children:[{...base.children[0],magnitude}]}));
});
check('Inputs and catalogue magnitudes remain unchanged',()=>{
  const copy=structuredClone(base);partitionEmission(base);assert.deepEqual(base,copy);
});
const report=[];
check('Real model pairs have positive residuals and identifiable reference budgets',()=>{
  for(const [hostId,childId] of [['lmc','tarantula'],['m33','ngc604']]) {
    const host=localGroupObjects().find(o=>o.id===hostId),child=extragalacticNebulae().find(o=>o.id===childId);
    const magnitude=physicsOf(child).V;
    const b=partitionEmission({hostId,hostMagnitude:host.Vmag,children:[{id:childId,hostId,magnitude,resolved:1}]});
    assert(b.host>0&&b.host<1);near(b.total,1);
    report.push({hostId,childId,hostMagnitude:host.Vmag,childMagnitude:magnitude,
      childPercent:100*b.fullChildFraction,naiveMagnitudeShift:b.naiveMagnitudeShift});
  }
});
console.log(JSON.stringify({passed,scope:'Reference V accounting only; no renderer/GPU change',pairs:report},null,2));
