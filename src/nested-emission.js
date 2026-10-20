// First renderer integration: approximate V reference budget near the Sun only.
// Global host scaling is not a spatial or spectral decomposition of the galaxy.
import {partitionEmission} from './emission-budget.js';
import {physicsOf} from './nebulae.js';

export const NESTED_HOSTS = Object.freeze({tarantula:'lmc',ngc604:'m33'});
const fade=(x,lo,hi)=>{const t=Math.min(1,Math.max(0,(x-lo)/(hi-lo)));return 1-t*t*(3-2*t);};
export function referenceBudgetStrength({pos, beta, band, opticalLab=false, map=false, enabled=false}) {
  if (!enabled||band!==1||opticalLab||map||!Number.isFinite(beta)||beta<0||!pos?.every(Number.isFinite)) return 0;
  return fade(Math.hypot(...pos),10,100)*fade(beta,1e-4,1e-3);
}

// active contains actually represented clouds, never merely selected catalogue ids.
export function nestedEmissionBudget({hosts, clouds, active, ...state}) {
  const strength=referenceBudgetStrength(state), hostGains=new Map(), childGains=new Map(), budgets=[];
  if (!strength) return {strength,hostGains,childGains,budgets};
  for (const host of hosts) {
    const children=clouds.filter(o=>NESTED_HOSTS[o.id]===host.id&&active.has(o.id));
    if (!children.length) continue;
    const b=partitionEmission({hostId:host.id,hostMagnitude:host.Vmag,children:children.map(o=>({
      id:o.id,hostId:host.id,magnitude:physicsOf(o).V,resolved:strength
    }))});
    hostGains.set(host.id,b.host);
    for (const o of children) {
      // The nebular calibration uses V-A_V, whereas the host uses observed V.
      // Grey V attenuation only: deliberately no claim of a measured RGB extinction law.
      const transmission=10**(-.4*physicsOf(o).afg);
      childGains.set(o.id,1-strength*(1-transmission));
    }
    budgets.push(b);
  }
  return {strength,hostGains,childGains,budgets};
}
