// Keep the actual browser error available without claiming every failure is a GPU problem.
export function showRenderError(element,error,page){
 const message=String(error?.message||error||'Erreur sans détail fourni par le navigateur');
 const context=/creating webgl|webgl.*(not supported|unavailable|disabled)|failed to create.*context/i.test(message);
 element.replaceChildren();element.hidden=false;
 const title=document.createElement('strong'),help=document.createElement('p'),details=document.createElement('details'),summary=document.createElement('summary'),reason=document.createElement('pre');
 title.textContent=context?'Le navigateur n’a pas pu ouvrir le rendu WebGL.':page==='cockpit'?'Le cockpit n’a pas pu démarrer.':'Une erreur est survenue sur la carte.';
 help.textContent=context?'Vérifie l’accélération graphique du navigateur, puis redémarre-le. Le détail ci-dessous permet de distinguer une indisponibilité WebGL d’un défaut du site.':'Recharge la page. Si le problème revient, transmets le diagnostic ci-dessous pour identifier sa cause.';
 summary.textContent='Afficher le diagnostic';reason.textContent=message;reason.style.whiteSpace='pre-wrap';reason.style.overflowWrap='anywhere';
 details.append(summary,reason);element.append(title,help,details);
}
