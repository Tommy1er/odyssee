// Offline spectral preparation; deliberately not connected to the cockpit yet.
// F_lambda is in relative energy units per nm. D is frequency_seen/frequency_rest.
// D * F_lambda(D * lambda) redistributes the spectrum conserving its bolometric integral.
// This is ONLY a spectral-shape convention, not a relativistic flux/beaming prescription.
// Geometry, extinction, source/observer boosts and absolute catalogue flux belong to the caller.
const HC_ERG_NM = 1.9864458571489286e-9;
export function curve(wavelengthNm, values) {
  const x = Array.from(wavelengthNm), y = Array.from(values);
  if (x.length < 2 || x.length !== y.length || x.some((v,i)=>!Number.isFinite(v)||v<=0||(i&&v<=x[i-1])) || y.some(v=>!Number.isFinite(v)||v<0)) throw Error('Expected increasing positive wavelengths and finite nonnegative samples');
  return { wavelengthNm:x, values:y };
}
function sample(c,x) {
  const w=c.wavelengthNm, y=c.values;
  if(x<w[0] || x>w.at(-1)) throw Error('Spectral extrapolation refused');
  let a=0,b=w.length-1;
  while(b-a>1){const m=(a+b)>>1;if(w[m]>x)b=m;else a=m;}
  return y[a]+(y[b]-y[a])*(x-w[a])/(w[b]-w[a]);
}
export function bandResponse(sed, band, D=1, weighting='energy') {
  if(!Number.isFinite(D)||D<=0)throw Error('D must be finite and positive');
  if(!['energy','photon'].includes(weighting))throw Error('Specify energy or photon response');
  const w=band.wavelengthNm, y=band.values;
  let first=y.findIndex(v=>v>0), last=y.findLastIndex(v=>v>0);
  if(first<0)throw Error('Empty bandpass');
  first=Math.max(0,first-1);last=Math.min(w.length-1,last+1);
  const lo=w[first],hi=w[last],needed=[D*lo,D*hi],available=[sed.wavelengthNm[0],sed.wavelengthNm.at(-1)];
  if(needed[0]<available[0]||needed[1]>available[1])return {ok:false,reason:'outside-spectral-coverage',neededNm:needed,availableNm:available};
  // Include every shifted spectral knot: narrow emission features must not disappear
  // merely because the response curve is coarsely sampled. Simpson is exact for each
  // piecewise quadratic (energy) or cubic (photon) product on this union grid.
  const knots=[...new Set([...w.slice(first,last+1),...sed.wavelengthNm.map(v=>v/D).filter(v=>v>lo&&v<hi)])].sort((a,b)=>a-b);
  const at=l=>D*sample(sed,Math.min(available[1],Math.max(available[0],D*l)))*sample(band,l)*(weighting==='photon'?l/HC_ERG_NM:1);
  let value=0;
  for(let i=1;i<knots.length;i++){const a=knots[i-1],b=knots[i];value+=(b-a)*(at(a)+4*at((a+b)/2)+at(b))/6;}
  return {ok:true,value};
}
export function relativeBandResponse(sed,band,D,referenceD=1,weighting='energy') {
  const reference=bandResponse(sed,band,referenceD,weighting);
  if(!reference.ok)return {...reference,stage:'reference'};
  if(!(reference.value>0))return {ok:false,reason:'zero-reference-flux'};
  const shifted=bandResponse(sed,band,D,weighting);
  return shifted.ok?{ok:true,ratio:shifted.value/reference.value}:{...shifted,stage:'shifted'};
}
