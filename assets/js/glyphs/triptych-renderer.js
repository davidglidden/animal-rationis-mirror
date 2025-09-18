// AldineXXI Triptych Renderer - Clean, Self-contained Implementation
// Prime Directive: Simple, durable, future-proof for UCE integration

// Build fingerprint for version verification
console.info('[TriptychRenderer] build', { 
  version: '2.5.1+clean', 
  url: import.meta.url,
  timestamp: new Date().toISOString()
});

// --- Triptych minimal registry + binding (self-contained) --------------------
const __ttx = (() => {
  // Minimal registry
  const map = new Map();
  const Registry = {
    register(b){ map.set(String(b.id).toLowerCase(), b); },
    get(id){ return map.get(String(id||'').toLowerCase()); },
    getDefault(){ return map.get('flow') || [...map.values()][0]; },
    debug(){ return {registered: [...map.keys()]}; }
  };

  // Guarded EM normalizer
  function normalizeEM(em = {}) {
    const dyn = em.dynamics ?? {};
    const tex = em.texture ?? {};
    const fam = em.families ?? {};
    return {
      families: fam && typeof fam === 'object' ? fam : {},
      dynamics: { velocity: Number.isFinite(dyn.velocity) ? dyn.velocity : 0.6, anisotropy: Number.isFinite(dyn.anisotropy) ? dyn.anisotropy : 0.2 },
      texture: { density: Number.isFinite(tex.density) ? tex.density : 0.7, granularity: Number.isFinite(tex.granularity) ? tex.granularity : 0.6 },
      hints: em.hints || {}
    };
  }

  // Deterministic PRNG (mulberry32-ish)
  function prng(seedStr='triptych'){
    let h = 1779033703 ^ seedStr.split('').reduce((a,c)=>((a<<5)-a+c.charCodeAt(0))|0,0);
    return function() {
      h = Math.imul(h ^ (h >>> 15), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      let t = (h ^= h >>> 16) >>> 0;
      return (t & 0xffff) / 0x10000;
    };
  }

  // Minimal Flow binding
  const FlowBinding = {
    id: 'flow',
    fromEM({ em, seed, canvas }) {
      const E = normalizeEM(em);
      return { canvas, seed, E };
    },
    draw({ canvas, seed, E }) {
      const ctx = canvas.getContext('2d');
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const w = Math.floor((canvas.clientWidth || 320) * dpr);
      const h = Math.floor((canvas.clientHeight || 180) * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      const rnd = prng(String(seed||'triptych'));
      ctx.clearRect(0,0,w,h);
      const lines = Math.floor(24 + E.texture.density * 80);
      const stepY = h / (lines+1);
      const jitter = 8 + E.dynamics.velocity * 48;
      for (let i=1;i<=lines;i++){
        const y = i*stepY + (rnd()-0.5)*2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        let x = 0;
        while (x < w) {
          x += 8 + rnd()*24;
          const dy = (rnd()-0.5) * jitter;
          ctx.quadraticCurveTo(x-4, y+dy*0.5, x, y+dy);
        }
        ctx.lineWidth = Math.max(0.5, 1.2 - E.texture.granularity*0.8);
        ctx.strokeStyle = `rgba(0,0,0,0.85)`;
        ctx.stroke();
      }
    }
  };

  // Register default binding
  Registry.register(FlowBinding);

  // Expose tiny debug hook
  return { Registry, normalizeEM };
})();
// ---------------------------------------------------------------------------

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
  const family = selectFamily({ forcedFamily, contentAnalysis });
  const binding = __ttx.Registry.get(family) || __ttx.Registry.getDefault();

  if (!binding?.fromEM) {
    TriptychIpc.emit('error', { code: 'BINDING_MISSING', family });
    return;
  }

  // translate EM -> binding parameters
  let params;
  try {
    params = binding.fromEM({
      em: _em, mm: _mm, seed: _seed,
      canvas, paneEl, host,
      ca: contentAnalysis || {}
    });
  } catch (e){
    TriptychIpc.emit('error', { code: 'FROM_EM_FAIL', family, err: String(e) });
    return;
  }

  // draw
  try {
    await binding.draw(params);
    TriptychIpc.emit('render:ok', { family, seed: _seed });
    
    // CU emission for UCE integration
    emitContextUnit({ family, seed: _seed, mm: _mm, em: _em, canvas, paneEl });
  } catch (e){
    TriptychIpc.emit('error', { code: 'DRAW_FAIL', family, err: String(e) });
  }
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

// --- Single export (no duplicates)
export { renderTriptychPane, resolveModels, bootTriptychs, TriptychIpc };