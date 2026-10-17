// Educational FLRW reference observatory, SEPARATE from Odyssée's Minkowski navigation and CF4 worldlines.
// Flat ΛCDM, radiation neglected: meaningful for late-time galaxies (0 <= z <= 2).
// Planck 2018 baseline H0=67.4 km/s/Mpc, Omega_m=0.315; not a calibration of CF4 distances (H0=74.6).
// Comoving distance D_C = c/H0 ∫_0^z dz/E(z), lookback = H0^-1 ∫_0^z dz/((1+z)E(z)).
// D_L=(1+z)D_C; D_A=D_C/(1+z). Published target distance/navigation are NEVER replaced.
export const FLRW_PLANCK_2018=Object.freeze({H0:67.4,omegaM:0.315,omegaLambda:0.685});
export const C_KM_S=299792.458;
export const MPC_KM=3.0856775814913673e19;
export const JULIAN_YEAR_SECONDS=365.25*86400;
export const MPC_IN_MLY=3.261563777167433;
// Stable composite Simpson for smooth z<=2 integrands (even 512 panels, <1 ppm against reference quadrature).
function simpson(fn,z){
 const n=512,h=z/n;let s=fn(0)+fn(z);
 for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(h*i);
 return s*h/3;
}
export function flatLCDM(z,parameters=FLRW_PLANCK_2018){
 if(!Number.isFinite(z)||z<0||z>2) return null;
 const {H0,omegaM,omegaLambda}=parameters;
 if(!(H0>0)||omegaM<0||omegaLambda<0||!Number.isFinite(H0)||Math.abs(omegaM+omegaLambda-1)>1e-7)throw Error('Flat LCDM parameters required');
 const E=x=>Math.sqrt(omegaM*(1+x)**3+omegaLambda);
 const dc=(C_KM_S/H0)*simpson(x=>1/E(x),z);
 const lookbackGyr=(MPC_KM/(H0*JULIAN_YEAR_SECONDS*1e9))*simpson(x=>1/((1+x)*E(x)),z);
 return {z,scaleFactor:1/(1+z),comovingMpc:dc,luminosityMpc:dc*(1+z),angularDiameterMpc:dc/(1+z),lookbackGyr,Hz:H0*E(z),distanceModulus:dc>0?5*Math.log10(dc*(1+z))+25:null,model:'flat-LCDM-Planck-2018'};
}
// CF4's catalogue v_CMB is conventionally cz, rather than a local 3D peculiar velocity.
// It contains Hubble expansion + peculiar motion; for z <~ 0.01 caution is essential.
export function cf4RedshiftFromCMB(vCmbKmS){
 return Number.isFinite(vCmbKmS)&&vCmbKmS>0&&vCmbKmS/C_KM_S<=2?vCmbKmS/C_KM_S:null;
}
export function galaxyLookback(o){
 const row=o?.catalogue==='cf4'?o.catalogueRow:null;
 if(!row)return null;
 const z=cf4RedshiftFromCMB(row.vCmb);
 if(z==null)return null;
 const model=flatLCDM(z);
 return model&&{...model,source:'z_CMB≈v_CMB/c from CF4, not a peculiar velocity',observedDistanceMpc:row.mpc??null,warning:z<.01?'À faible redshift, les vitesses particulières rendent les distances cosmologiques très incertaines.':'Distance cosmologique de référence, pas la distance mesurée de cette galaxie.'};
}
