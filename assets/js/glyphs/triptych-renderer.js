// AldineXXI Triptych Renderer - Option B Implementation
// Registry-based with family selection and CU emission

import { RendererRegistry } from '/assets/js/glyphs/renderers/index.js';

// Build fingerprint for version verification
console.info('[TriptychRenderer] build', { 
  version: 'option-b', 
  url: import.meta.url,
  timestamp: new Date().toISOString()
});

// --- Normalize EM for consistent shape
function normalizeEM(em){
  const out = em && typeof em === 'object' ? {...em} : {};
  out.families = out.families && typeof out.families === 'object' ? out.families : { flow: 1 };
  out.dynamics = out.dynamics && typeof out.dynamics === 'object' ? out.dynamics : { velocity: 0.5 };
  out.texture  = out.texture  && typeof out.texture  === 'object' ? out.texture  : { density: 0.5 };
  return out;
}

// --- Model resolution gate (4-tier)
export async function resolveModels(){
  // Tier 1: UCE context
  const cx = window?.UCE?.context?.models || null;
  const mm1 = cx?.mm, em1 = cx?.em, seed1 = cx?.seed;

  // Tier 2: UCE adapters
  const mm2 = window?.UCE?.adapters?.mm?.();
  const em2 = window?.UCE?.adapters?.em?.();
  const seed2 = window?.UCE?.adapters?.seed?.();

  // Tier 3: Legacy globals
  const mm3 = window?.__MM__;
  const em3 = window?.__EM__;
  const seed3 = window?.__SEED__;

  // Tier 4: Defaults
  const seed4 = 'triptych';
  const mm4 = { seed: seed4, intent:{}, texture:{}, dynamics:{} };
  const em4 = { families:{ flow:1 }, dynamics:{ velocity:0.5 }, texture:{ density:0.5 } };

  const mm = mm1 || mm2 || mm3 || mm4;
  const em = normalizeEM(em1 || em2 || em3 || em4);
  const seed = seed1 || seed2 || seed3 || seed4;

  return { mm, em, seed };
}

// --- Family selection based on EM
function selectFamily({ forcedFamily, em }){
  if (forcedFamily) return forcedFamily.toLowerCase();
  const fams = em?.families || {};
  const best = Object.entries(fams).sort((a,b)=>b[1]-a[1])[0]?.[0];
  return (best || 'flow').toLowerCase();
}

// --- Render single pane
export async function renderTriptychPane({ host, paneEl, canvas, mm, em, seed, forcedFamily }){
  try{
    if (!paneEl || !(canvas instanceof HTMLCanvasElement)) return;

    const { mm: _mm, em: _em, seed: _seed } = await resolveModels();
    const mmx = mm || _mm; 
    const emx = normalizeEM(em || _em); 
    const sdx = seed || _seed;

    // Size canvas with DPR scaling
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const r = paneEl.getBoundingClientRect();
    canvas.width  = Math.max(1, Math.round(r.width  * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    canvas.style.width  = `${Math.max(1, Math.round(r.width))}px`;
    canvas.style.height = `${Math.max(1, Math.round(r.height))}px`;

    // Select family and get binding
    const family = selectFamily({ forcedFamily, em: emx });
    const binding = RendererRegistry.get(family) || RendererRegistry.getDefault();
    if (!binding){ 
      console.warn('[Triptych] no binding for', family); 
      return; 
    }

    // Render
    const params = binding.fromEM({ em: emx, mm: mmx, seed: sdx, canvas, paneEl, host });
    await binding.draw({ ...params, target: canvas });

    canvas.dataset.painted = '1';
  } catch(e){
    console.warn('[Triptych] renderTriptychPane error', e);
  }
}

// --- Emit Context Unit (once per page)
function emitContextUnitOnce({ mm, em, seed }){
  if (document.querySelector('script[type="application/json"][data-cu="sigil"]')) return;
  
  const cu = {
    id: 'cu://sigil/' + (seed || 'triptych'),
    kind: 'situation',
    scope: { 
      source: location.href, 
      time: new Date().toISOString() 
    },
    signals: {
      mm_intent: mm?.intent || {},
      mm_texture: mm?.texture || {},
      mm_dynamics: mm?.dynamics || {},
      em_families: em?.families || {}
    },
    outputs: { 
      glyph: { 
        family: selectFamily({ em }), 
        seed 
      } 
    },
    provenance: { 
      agent: 'org://ARC-glyph-pipeline' 
    }
  };
  
  const s = document.createElement('script');
  s.type = 'application/json';
  s.dataset.cu = 'sigil';
  s.textContent = JSON.stringify(cu);
  document.body.appendChild(s);
}

// --- Boot all triptychs on page
export async function bootTriptychs(){
  const hosts = document.querySelectorAll('[data-triptych]');
  for (const host of hosts){
    const panes = host.querySelectorAll('[data-triptych-pane]');
    for (const paneEl of panes){
      let canvas = paneEl.querySelector('canvas.triptych__canvas');
      if (!canvas){ 
        canvas = document.createElement('canvas'); 
        canvas.className='triptych__canvas'; 
        paneEl.appendChild(canvas); 
      }
      await renderTriptychPane({ host, paneEl, canvas });
    }
  }
  
  // Emit CU after rendering
  try {
    const { mm, em, seed } = await resolveModels();
    emitContextUnitOnce({ mm, em, seed });
  } catch {}
  
  // Health check
  try {
    const h = triptychHealth();
    if (!h.ok) console.warn('[Triptych][WARN]', h);
  } catch {}
}

// --- Health probe
export function triptychHealth(){
  const t = !!document.querySelector('[data-triptych]');
  const rr = RendererRegistry.keys();
  const canv = [...document.querySelectorAll('canvas.triptych__canvas')];
  const painted = canv.filter(c => c.dataset.painted === '1').length;
  return { 
    ok: t && rr.length>0 && painted===canv.length, 
    registry_keys: rr, 
    canvases: canv.length, 
    painted_count: painted 
  };
}