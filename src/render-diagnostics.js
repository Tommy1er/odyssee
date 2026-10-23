// Keep the actual browser error available without claiming every failure is a GPU problem.
export function showRenderError(element,error,page){
 const message=String(error?.message||error||'Erreur sans détail fourni par le navigateur');
 const context=/creating webgl|webgl.*(not supported|unavailable|disabled)|failed to create.*context|webglcontext/i.test(message),blocked=/blocked/i.test(message);
 element.replaceChildren();element.hidden=false;
 const title=document.createElement('strong'),help=document.createElement('p'),details=document.createElement('details'),summary=document.createElement('summary'),reason=document.createElement('pre');
 title.textContent=context?'Le navigateur n’a pas pu ouvrir le rendu WebGL.':page==='cockpit'?'Le cockpit n’a pas pu démarrer.':'Une erreur est survenue sur la carte.';
 help.textContent=context?'Vérifie l’accélération graphique du navigateur, puis redémarre-le. Le détail ci-dessous permet de distinguer une indisponibilité WebGL d’un défaut du site.':'Recharge la page. Si le problème revient, transmets le diagnostic ci-dessous pour identifier sa cause.';
 if(blocked)help.textContent='Le navigateur signale un blocage de WebGL. Ferme complètement Chrome (toutes ses fenêtres), puis rouvre-le avant de retester. Transmets le diagnostic si le blocage revient.';
 else if(/webglcontextlost|webglcontextrestored/i.test(message))help.textContent='Le rendu et la simulation sont arrêtés. Recharge la page pour réinitialiser toutes les ressources graphiques. Transmets ce diagnostic si la perte de contexte revient.';
 summary.textContent='Afficher le diagnostic';reason.textContent=message;reason.style.whiteSpace='pre-wrap';reason.style.overflowWrap='anywhere';
 details.append(summary,reason);element.append(title,help,details);
}

// Register BEFORE WebGLRenderer: its generic thrown error drops statusMessage.
// Do not retry a lost GPU in a loop. Even after restoration require a fresh page.
export function monitorWebGL(canvas,element,page,onStop=()=>{}){
 let reason='',stopped=false;
 const showError=error=>showRenderError(element,[String(error?.message||error||''),reason].filter(Boolean).join('\n'),page);
 const listeners={
  webglcontextcreationerror:event=>{reason='webglcontextcreationerror: '+(event.statusMessage||'Aucune raison fournie par le navigateur');stopped=true;showError();onStop();},
  webglcontextlost:event=>{event.preventDefault();reason='webglcontextlost: '+(event.statusMessage||'Aucune raison fournie par le navigateur');stopped=true;showError();onStop();},
  webglcontextrestored:()=>{reason+='\nwebglcontextrestored: contexte rétabli ; rechargement requis';showError();}
 };
 for(const [type,listener] of Object.entries(listeners))canvas.addEventListener(type,listener);
 return {get stopped(){return stopped;},showError,dispose(){for(const [type,listener] of Object.entries(listeners))canvas.removeEventListener(type,listener);}};
}
