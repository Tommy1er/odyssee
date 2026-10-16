// Offline, explicit-input builder: no network, no changes to the running renderer.
// Usage: node scripts/prepare-galaxy-spectra.mjs manifest.json output.json
// Manifest: {spectra:[{id,file,wavelengthUnit,sourceURL,publication,license}],
//            bands:[{id,file,wavelengthUnit,weighting,sourceURL,publication,license}], doppler:[...],referenceD:1}
// Input files: exactly two whitespace/comma-separated numeric columns, # comments allowed.
// Spectra: F_lambda per declared wavelength unit, arbitrary common energy normalization.
// Bands: dimensionless response, energy or photon convention explicitly declared.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {curve,relativeBandResponse} from '../src/spectral-response.js';
const UNITS={nm:1,angstrom:0.1,micron:1000};
export function readCurve(entry,base,spectrum) {
  for(const k of ['id','file','sourceURL','publication','license'])if(typeof entry[k]!=='string'||!entry[k].trim())throw Error('Missing provenance field '+k);
  if(!/^https:\/\//.test(entry.sourceURL))throw Error('Expected an HTTPS source URL');
  const factor=UNITS[entry.wavelengthUnit];if(!factor)throw Error('Unsupported wavelength unit');
  if(!spectrum&&!['energy','photon'].includes(entry.weighting))throw Error('Band response convention required');
  const raw=fs.readFileSync(path.resolve(base,entry.file));
  const rows=raw.toString('utf8').split(/\r?\n/).map(l=>l.replace(/#.*/,'').trim()).filter(Boolean).map(l=>{
    const p=l.split(/[\s,]+/);if(p.length!==2)throw Error('Expected two numeric columns');return p.map(Number);
  });
  const data=curve(rows.map(r=>r[0]*factor),rows.map(r=>r[1]/(spectrum?factor:1)));
  return {data,provenance:{...entry,sha256:crypto.createHash('sha256').update(raw).digest('hex'),samples:rows.length,rangeNm:[data.wavelengthNm[0],data.wavelengthNm.at(-1)],normalizedWavelengthUnit:'nm'}};
}
export function prepare(manifest,base) {
  if(!Array.isArray(manifest.spectra)||!manifest.spectra.length||!Array.isArray(manifest.bands)||!manifest.bands.length)throw Error('Spectra and bands required');
  if(!Array.isArray(manifest.doppler)||!manifest.doppler.length||manifest.doppler.some((d,i)=>!Number.isFinite(d)||d<=0||(i&&d<=manifest.doppler[i-1])))throw Error('Doppler grid must be positive and increasing');
  const referenceD=manifest.referenceD??1;
  for(const list of [manifest.spectra,manifest.bands])if(new Set(list.map(e=>e.id)).size!==list.length)throw Error('Duplicate ids');
  const spectra=manifest.spectra.map(e=>readCurve(e,base,true)),bands=manifest.bands.map(e=>readCurve(e,base,false));
  return {schema:1,status:'offline-preparation-not-renderer-calibration',convention:'bolometric-normalized-shape-only',referenceD,doppler:manifest.doppler,
    spectra:spectra.map(s=>s.provenance),bands:bands.map(b=>b.provenance),
    responses:spectra.map(s=>({id:s.provenance.id,bands:bands.map(b=>({id:b.provenance.id,values:manifest.doppler.map(D=>relativeBandResponse(s.data,b.data,D,referenceD,b.provenance.weighting))}))}))};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const [, ,input,output]=process.argv;if(!input||!output)throw Error('Usage: node scripts/prepare-galaxy-spectra.mjs manifest.json output.json');
  const result=prepare(JSON.parse(fs.readFileSync(input)),path.dirname(path.resolve(input)));
  fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');console.log('Prepared '+result.spectra.length+' spectra; renderer unchanged');
}
