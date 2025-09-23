// AldineXXI Triptych Renderer - Option C Implementation
// Registry-based with semantic analysis, family selection and CU enrichment

// Import registry first, then renderers
await import('/assets/js/glyphs/renderers/index.js');
await Promise.allSettled([
  import('/assets/js/glyphs/renderers/flow.js'),
  import('/assets/js/glyphs/renderers/grid.js'),
]);

import { RendererRegistry } from '/assets/js/glyphs/renderers/index.js';
import { resolveContent } from './analysis/content-resolver.js';
import { computeCA, buildMM } from './analysis/mm.js';
import { buildEM, selectFamily } from './analysis/em.js';
import { publish } from '/assets/js/uce/cu-bus.js';
import { normalizeCU } from '/assets/js/uce/cu-schema.js';

// Build fingerprint for version verification
console.info('[TriptychRenderer] build', {
  version: 'option-d',
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

// --- Model resolution gate with semantic analysis
export async function resolveModels({ forcedFamily } = {}) {
  const content = resolveContent();
  // Tiered overrides
  const mmO = window.__MM__ || null;
  const emO = window.__EM__ || null;
  const sdO = window.__SEED__ || null;

  const ca = await computeCA(content);
  const mm = mmO || buildMM(ca, sdO);
  const em = emO || buildEM(mm, ca);
  const seed = sdO || mm.seed || 'triptych';

  // URL param or <meta> can force family
  const urlForced = new URLSearchParams(location.search).get('family');
  const metaForced = document.querySelector('meta[name="sigil-family"]')?.content || undefined;
  const family = selectFamily(em, forcedFamily || urlForced || metaForced);

  // Store for diagnostics
  window.__LAST_MODELS__ = { ca, mm, em, seed, family };

  return { ca, mm, em, seed, family };
}

// Family selection now handled by analysis/em.js - keeping stub for compatibility
function legacySelectFamily({ forcedFamily, em }){
  if (forcedFamily) return forcedFamily.toLowerCase();
  const fams = em?.families || {};
  const best = Object.entries(fams).sort((a,b)=>b[1]-a[1])[0]?.[0];
  return (best || 'flow').toLowerCase();
}

// --- Render single pane with semantic analysis
export async function renderTriptychPane({ host, paneEl, canvas, forcedFamily }){
  try{
    if (!paneEl || !(canvas instanceof HTMLCanvasElement)) return;

    const { mm, em, seed, family } = await resolveModels({ forcedFamily });

    // Size canvas with DPR scaling
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const r = paneEl.getBoundingClientRect();
    canvas.width  = Math.max(1, Math.round(r.width  * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    canvas.style.width  = `${Math.max(1, Math.round(r.width))}px`;
    canvas.style.height = `${Math.max(1, Math.round(r.height))}px`;

    const binding = RendererRegistry.get(family) || RendererRegistry.get('flow') || RendererRegistry.getDefault();
    if (!binding){
      console.warn('[Triptych] no binding for', family);
      return;
    }

    // Render
    const params = binding.fromEM({ em, mm, seed, canvas, paneEl, host, ca: null });
    await binding.draw(params, canvas);

    // mark painted for health
    canvas.dataset.painted = '1';

    // Publish CU for this pane (idempotent per canvas)
    if (canvas.dataset.cuEmitted !== '1') {
      canvas.dataset.cuEmitted = '1';
      publish(normalizeCU({
        kind: 'symbol',
        modality: 'glyph',
        source: { url: location.href, title: document.title },
        context: {
          page: location.pathname,
          pane: paneEl.getAttribute('data-triptych-pane'),
          seed,
          family
        },
        payload: {
          canvas: { w: canvas.width, h: canvas.height, dpr: window.devicePixelRatio || 1 }
        },
        provenance: { engine: 'glyphs@option-d' }
      }));
    }

    // Legacy CU script removed - all CUs now go through the bus/collector
  } catch(e){
    console.warn('[Triptych] renderTriptychPane error', e);
  }
}

// Legacy CU helper removed - all CUs now flow through the bus/collector system

// --- Boot all triptychs on page
export async function bootTriptychs(){
  if (window.__TRIPTYCH_BOOTED__) return;
  window.__TRIPTYCH_BOOTED__ = true;
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

  // CU emission handled per-pane in renderTriptychPane

  // Health check
  try {
    const h = triptychHealth();
    if (!h.ok) console.warn('[Triptych][WARN]', h);
  } catch {}
}

// --- Health probe
export function triptychHealth(){
  try {
    const keys = (window?.RendererRegistry?.keys && window.RendererRegistry.keys()) || RendererRegistry?.keys() || [];
    const canv = [...document.querySelectorAll('canvas.triptych__canvas')];
    const paintedCount = canv.filter(c => c?.dataset?.painted === '1').length;
    return {
      ok: keys.length >= 2 && paintedCount === canv.length && paintedCount > 0,
      registry_keys: keys,
      canvases: canv.length,
      painted_count: paintedCount
    };
  } catch {
    return { ok: false, registry_keys: [], canvases: 0, painted_count: 0 };
  }
}

// --- Diagnostics helper
export function dumpModels() {
  return window.__LAST_MODELS__ || null;
}