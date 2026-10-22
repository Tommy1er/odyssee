// Static development server; accepts the host/port flags used by the preview supervisor.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const args=process.argv.slice(2),option=(k,fallback)=>args.includes(k)?args[args.indexOf(k)+1]:fallback;
const root=path.resolve('public'),types={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.glb':'model/gltf-binary','.bin':'application/octet-stream'};
http.createServer((req,res)=>{try{const url=new URL(req.url,'http://localhost'),relative=decodeURIComponent(url.pathname).replace(/^\/+/,''),file=path.resolve(root,relative||'index.html');if(!file.startsWith(root+path.sep))throw Error('Outside root');const stat=fs.statSync(file);if(!stat.isFile())throw Error('Not a file');res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');fs.createReadStream(file).pipe(res);}catch{res.writeHead(404);res.end('Not found');}}).listen(Number(option('--port','3000')),option('--host','0.0.0.0'));
