import assert from 'node:assert/strict';
import {flatLCDM,galaxyLookback,cf4RedshiftFromCMB,FLRW_PLANCK_2018,MPC_IN_MLY,C_KM_S} from '../src/flrw.js';
let passed=0;const test=(label,fn)=>{fn();passed++;console.log('PASS',label)};
const near=(a,b,tol=1e-4)=>assert(Math.abs(a-b)<tol,`${a} ≠ ${b}`);
test('Flat Planck baseline sums to one',()=>near(FLRW_PLANCK_2018.omegaM+FLRW_PLANCK_2018.omegaLambda,1));
test('At z=0 all distances and elapsed lookback vanish',()=>{const a=flatLCDM(0);for(const k of ['comovingMpc','luminosityMpc','angularDiameterMpc','lookbackGyr'])near(a[k],0,1e-12);near(a.scaleFactor,1)});
test('Independent Planck 2018 z=0.01 reference (Mpc, Gyr)',()=>{
 const a=flatLCDM(.01);near(a.comovingMpc,44.374308862,1e-6);near(a.luminosityMpc,44.818051951,1e-6);near(a.angularDiameterMpc,43.934959270,1e-6);near(a.lookbackGyr,.14401134584,1e-8);
});
test('Independent Planck 2018 z=0.1 reference',()=>{
 const a=flatLCDM(.1);near(a.comovingMpc,434.110994635,1e-5);near(a.luminosityMpc,477.522094099,1e-5);near(a.lookbackGyr,1.350009869,1e-7);
});
test('At z=.19 luminosity distance exceeds comoving and angular distances',()=>{
 const a=flatLCDM(.19);near(a.luminosityMpc,959.294854628,1e-4);near(a.angularDiameterMpc,677.420277260,1e-4);near(a.lookbackGyr,2.410597009,1e-7);
});
test('Luminosity/angular distances satisfy Etherington reciprocity',()=>{
 for(const z of [.0001,.02,.1,.19,.5,1,2]){const a=flatLCDM(z);near(a.luminosityMpc/a.angularDiameterMpc,(1+z)**2,1e-10);}
});
test('At positive redshift lookback is shorter than present-day proper distance / c',()=>{
 for(const z of [.001,.1,.4,1]){const a=flatLCDM(z);assert(a.lookbackGyr<a.comovingMpc*MPC_IN_MLY/1000);}
});
test('Distance modulus uses luminosity not comoving distance',()=>{
 const a=flatLCDM(.1);near(a.distanceModulus,5*Math.log10(a.luminosityMpc)+25,1e-11);
});
test('Redshift is v_CMB/c by explicit CF4 catalogue convention',()=>{
 near(cf4RedshiftFromCMB(3000),3000/C_KM_S,1e-15);assert.equal(cf4RedshiftFromCMB(-100),null);
});
test('CF4 record gives a reference readout without modifying the galaxy',()=>{
 const o={catalogue:'cf4',catalogueRow:{vCmb:3000,mpc:40},xyz:[1e8,0,0]},copy=JSON.stringify(o);
 const v=galaxyLookback(o);assert(v?.lookbackGyr>0);assert.equal(v.observedDistanceMpc,40);assert.equal(JSON.stringify(o),copy);
});
test('Low-z and negative-z warnings do not fabricate a cosmological distance',()=>{
 assert(galaxyLookback({catalogue:'cf4',catalogueRow:{vCmb:-120,mpc:30}})===null);
 assert(galaxyLookback({catalogue:'ungc',catalogueRow:{vCmb:3000}})===null);
 assert(galaxyLookback({catalogue:'cf4',catalogueRow:{vCmb:1200}}).warning.includes('faible'));
});
test('Out-of-scope z and nonflat parameters are rejected',()=>{
 assert.equal(flatLCDM(-.01),null);assert.equal(flatLCDM(2.1),null);
 assert.throws(()=>flatLCDM(.1,{H0:67.4,omegaM:.4,omegaLambda:.5}));
});
console.log(JSON.stringify({passed,status:'PASS',scope:'Reference FLRW only; no change to navigation or radiance'}));
