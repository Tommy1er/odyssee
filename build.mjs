import { build } from 'esbuild';
import { access, mkdir, cp, rm } from 'node:fs/promises';
for (const file of ['index.html','app.js','style.css','catalogue.json']) await access('public/'+file);
await build({entryPoints:['src/cockpit.js'],outfile:'public/cockpit.js',bundle:true,minify:true,format:'esm',target:'es2022'});
await build({entryPoints:['src/cosmos.js'],outfile:'public/cosmos.js',bundle:true,minify:true,format:'esm',target:'es2022'});
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
console.log('Atlas statique prêt dans dist/');
