// AldineXXI Triptych Renderer - Clean, Self-contained Implementation
// Prime Directive: Simple, durable, future-proof for UCE integration

// triptych-renderer.js
import { RendererRegistry } from "/assets/js/glyphs/renderers/index.js";
import "/assets/js/glyphs/renderers/flow.js"; // minimal baseline
// (More bindings can be imported here later.)

// Build fingerprint for version verification
console.info('[TriptychRenderer] build', { 
  version: '2.5.1+clean', 
  url: import.meta.url,
  timestamp: new Date().toISOString()
});

// --- Utility functions ---

// --- Namespaced telemetry (no global name collisions)
const TriptychIpc = (() => {
  const seen = new Set();
  function warnOnce(code, msg){ if (seen.has(code)) return; seen.add(code); console.warn('[Triptych]', code, msg); }
  function emit(evt, detail){ try { window?.dispatchEvent?.(new CustomEvent(`triptych:${evt}`, { detail })); } catch (_) {} }
  return { warnOnce, emit };
})();

// --- Tiny "a=1,b=2" to object helper
function parseKVString(s){
  if (typeof s !== 'string') return {};
  const out = {};
  s.split(',').forEach(pair => {
    const [k, v] = pair.split(':');
    const key = String(k||'').trim();
    const num = Number(v);
    if (key) out[key] = Number.isFinite(num) ? num : String(v||'').trim();
  });
  return out;
}

// --- CU (Context Unit) emission for UCE integration
function emitContextUnit({ family, seed, mm, em, canvas, paneEl } = {}) {
  try {
    // Create minimal Context Unit
    const cu = {
      timestamp: new Date().toISOString(),
      type: 'triptych-render',
      family: family || 'flow',
      seed: seed || 'triptych',
      mm: mm || {},
      em: em || {},
      provenance: 'org://ARC-glyph-pipeline'
    };
    
    // Emit to DOM as JSON script tag
    const script = document.createElement('script');
    script.type = 'application/json';
    script.setAttribute('data-cu', 'triptych');
    script.textContent = JSON.stringify(cu, null, 2);
    
    // Append to pane container if available
    if (paneEl) {
      paneEl.appendChild(script);
    } else {
      document.head.appendChild(script);
    }
    
    TriptychIpc.emit('cu:emitted', { family, seed });
  } catch (e) {
    // Silent failure - CU emission is non-critical
    TriptychIpc.emit('cu:error', { err: String(e) });
  }
}

// --- Make EM shape binding-proof
function normalizeEM(raw){
  const em = raw && typeof raw === 'object' ? { ...raw } : {};

  // families (required by FlowBinding)
  em.families =
    typeof em.families === 'object' && em.families
      ? em.families
      : (typeof em.families === 'string'
          ? parseKVString(em.families)
          : { gridness: 0.28, stratification: 0.49, flux: 0.94, constellation: 0.83 });

  // dynamics (velocity, anisotropy)
  em.dynamics = em.dynamics && typeof em.dynamics === 'object' ? { ...em.dynamics } : {};
  if (typeof em.cadence === 'string') {
    const c = parseKVString(em.cadence);
    if (Number.isFinite(c.pulse)) em.dynamics.velocity = c.pulse;
    if (Number.isFinite(c.anisotropy)) em.dynamics.anisotropy = c.anisotropy;
  }
  if (!Number.isFinite(em.dynamics.velocity)) em.dynamics.velocity = 0.5;
  if (!Number.isFinite(em.dynamics.anisotropy)) em.dynamics.anisotropy = 0.2;

  // texture (density, granularity)
  em.texture = em.texture && typeof em.texture === 'object' ? { ...em.texture } : {};
  if (typeof em.scale === 'string') {
    const s = parseKVString(em.scale);
    if (Number.isFinite(s.density)) em.texture.density = s.density;
    if (Number.isFinite(s.granularity)) em.texture.granularity = s.granularity;
  }
  if (!Number.isFinite(em.texture.density)) em.texture.density = 0.5;
  if (!Number.isFinite(em.texture.granularity)) em.texture.granularity = 0.5;

  return em;
}

// --- Family selection that never crashes
function selectFamily({ forcedFamily, contentAnalysis } = {}){
  if (forcedFamily) return String(forcedFamily).toLowerCase();

  const ca = contentAnalysis && typeof contentAnalysis === 'object' ? contentAnalysis : {};
  // very light heuristic; expand later as sigils evolve
  const s = ca.structure || {};
  const t = ca.temporal || {};
  const l = ca.lexicon || {};

  // Example hinting; always with defaults
  if (s?.headingsCount > 8) return 'grid';
  if ((t?.entropy ?? 0) > 0.7) return 'flow';
  if ((l?.rarity ?? 0) > 0.6) return 'constellation';

  return 'flow';
}

// --- The renderer (small, guarded, binding-safe)
async function renderTriptychPane({
  host, paneEl, canvas, mm, em, seed, forcedFamily, contentAnalysis
} = {}){
  // hard guards: do nothing if no pane element or no canvas
  if (!paneEl || !(canvas instanceof HTMLCanvasElement)) {
    TriptychIpc.emit('skip', { reason: 'no-canvas-or-pane' });
    return;
  }

  // models
  const _mm = mm && typeof mm === 'object' ? mm : {};
  const _em = normalizeEM(em);
  const _seed = seed || _mm?.seed || 'triptych';

  // family + binding
  const fam = forcedFamily || "flow";
  const binding = RendererRegistry.get(fam) || RendererRegistry.getDefault();

  if (!binding) return; // guard

  const params = binding.fromEM({ em: _em, mm: _mm, seed: _seed, canvas, paneEl, host, ca: contentAnalysis });
  await binding.draw(params);
}

// --- Simple model gate (4-tier, no throws)
async function resolveModels({ contentSource, seed } = {}){
  // Tier 1: UCE context (if present)
  const cx = window.UCE?.context?.models;
  const mm1 = cx?.mm, em1 = cx?.em, sd1 = cx?.seed;

  // Tier 2: UCE adapters (if present)
  const mm2 = window.UCE?.adapters?.mm?.(), em2 = window.UCE?.adapters?.em?.(), sd2 = window.UCE?.adapters?.seed?.();

  // Tier 3: legacy globals (if any)
  const mm3 = window.__MM__, em3 = window.__EM__, sd3 = window.__SEED__;

  // Tier 4: safe defaults
  const mm4 = { seed: 'jampuu' };
  const em4 = normalizeEM({ families: { flux: 0.94, constellation: 0.83 }, cadence: 'pulse:1.00,anisotropy:0.20', scale: 'density:0.95,granularity:0.85' });
  const sd4 = 'jampuu';

  const mm = mm1 || mm2 || mm3 || mm4;
  const em = normalizeEM(em1 || em2 || em3 || em4);
  const sd = seed || sd1 || sd2 || sd3 || sd4;

  return { mm, em, seed: sd };
}

// --- Boot path (clean auto-boot using public API)
async function bootTriptychs(){
  const roots = document.querySelectorAll('[data-triptych]');
  if (!roots.length) {
    console.info('[TriptychRenderer] No triptych elements found');
    return;
  }
  
  console.info(`[TriptychRenderer] Booting ${roots.length} triptych(s)`);
  const models = await resolveModels({ contentSource: await (window.ContentResolver?.resolve?.() ?? null) });
  
  roots.forEach(root => {
    const canvas = root.querySelector('canvas');
    renderTriptychPane({
      host: root, 
      paneEl: root, 
      canvas,
      ...models,
      forcedFamily: root.getAttribute('data-family') // optional override
    });
  });
}

// --- Health probe (optional, dev only)
export function triptychHealth() {
  const keys = (window.RendererRegistry?.keys?.()||[]);
  const canv = [...document.querySelectorAll("canvas.triptych__canvas")];
  const painted = canv.some(c => c.dataset.painted === "1");
  return { registry_keys: keys, canvases: canv.length, painted };
}

// --- Single export (no duplicates)
export { renderTriptychPane, resolveModels, bootTriptychs, TriptychIpc, triptychHealth };