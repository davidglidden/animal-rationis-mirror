// AldineXXI Triptych Renderer - Specification-compliant implementation
// Three-pane living abstracts: Ground/Energy/Sign pattern with guaranteed diversity

// Build fingerprint for version verification
console.info('[TriptychRenderer] build', { 
  version: '2.5.1+prime-guards', 
  url: import.meta.url,
  timestamp: new Date().toISOString()
});

import { deterministicSeed } from './util-seed.esm.js';
import { buildMM } from './mm.js';
import { buildEM } from './em.js';
import { bindingFor } from './glyph-orchestrator-v2.5.1.js';
import { getRenderer } from './renderers/index.js';
import { defaultContentSource } from './content-resolver.js';

// ---------- seed + model guards (compat) - Prime production-grade ----------
const FLAGS = {
  compat: true,     // today: true - accept both old/new shapes
  strict: false     // later: flip to true when UCE adapter ready
};

// Namespaced helpers to avoid symbol collisions in module scope
const TriptychIpc = (() => {
  const seen = new Set();
  function warnOnce(code, msg){
    if (seen.has(code)) return;
    seen.add(code);
    console.warn('[Triptych:deprec]', code, msg);
  }
  function emit(evt, payload){
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(`triptych:${evt}`, { detail: payload }));
      }
    } catch (e) {
      // Never disrupt paint for telemetry
      // console.debug('[Triptych:emit:fail]', evt, e);
    }
  }
  return { warnOnce, emit };
})();

function textHash(s){ let h=2166136261>>>0; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619);} return (h>>>0).toString(36); }

// UCE adapter stub (ends fallbacks)
window.UCE = window.UCE || { context: {}, adapter: {} };
window.UCE.context.seed = window.UCE.context.seed || 'uce-seed';
window.UCE.adapter.toMM = window.UCE.adapter.toMM || (async ({ content }) => (
  window.MM?.buildFromMarkdown ? window.MM.buildFromMarkdown(content) : { seed:'uce-seed' }
));
window.UCE.adapter.toEM = window.UCE.adapter.toEM || (async ({ mm }) => (
  window.EM?.buildFromMM ? window.EM.buildFromMM(mm) : { texture:{structural_complexity:0.5}, dynamics:{velocity:0.5, entropy:0.5, polarity:0.5} }
));

/**
 * Resolve or build Meaning Model (mm) + Expression Model (em).
 * Sources (in order of preference):
 *  1) explicit opts.mm / opts.em (passed in)
 *  2) UCE context (window.UCE?.context?.mm / em), or a UCE adapter on window.UCE?.adapter?.toMM / toEM
 *  3) global builders (window.MM?.buildFromMarkdown / window.EM?.buildFromMM)
 *  4) local builders via ESM imports (if you already import them)
 *
 * Always returns objects and never throws.
 */
async function resolveModels({ opts = {}, contentSource } = {}) {
  const out = { mm: opts.mm || null, em: opts.em || null, seed: null };

  // Prefer UCE context
  if (!out.mm) out.mm = window.UCE?.context?.mm || null;
  if (!out.em) out.em = window.UCE?.context?.em || null;

  // Try UCE adapters, if provided
  try {
    if (!out.mm && typeof window.UCE?.adapter?.toMM === 'function') {
      out.mm = await window.UCE.adapter.toMM({ content: contentSource?.text || '' });
    }
    if (!out.em && typeof window.UCE?.adapter?.toEM === 'function') {
      out.em = await window.UCE.adapter.toEM({ mm: out.mm });
    }
  } catch (e) {
    console.warn('[Triptych:models] UCE adapter failed', e);
  }

  // Legacy globals (until removed)
  try {
    if (!out.mm && window.MM?.buildFromMarkdown) {
      out.mm = await window.MM.buildFromMarkdown(contentSource?.text || '');
    }
    if (!out.em && window.EM?.buildFromMM) {
      out.em = await window.EM.buildFromMM(out.mm);
    }
  } catch (e) {
    console.warn('[Triptych:models] legacy builders failed', e);
  }

  // Final safe defaults (never crash)
  if (!out.mm) {
    out.mm = {
      intent: '', texture: '', dynamics: '',
      seed: (contentSource?.seed || 'fallback-seed'),
      council: 'none'
    };
    console.warn('[Triptych:models] mm missing → using fallback');
  }
  if (!out.em) {
    out.em = {
      families: '', cadence: '', scale: '',
      texture: { structural_complexity: 0.5 },
      dynamics: { velocity: 0.5, entropy: 0.5, polarity: 0.5 }
    };
    console.warn('[Triptych:models] em missing → using fallback');
  }

  // Seed priority: UCE → mm → content → fallback
  out.seed = (window.UCE?.context?.seed) || out.mm.seed || contentSource?.seed || 'fallback-seed';
  return out;
}

function deriveSeed({ host, mm, content }){
  const fromMM   = mm?.meta?.seed ?? mm?.seed;    // compat: meta.seed OR top-level seed
  
  // Deprecation warning for old seed location
  if (FLAGS.compat && mm?.seed && !mm?.meta?.seed) {
    TriptychIpc.warnOnce('mm.seed', 'use mm.meta.seed instead of top-level mm.seed');
    TriptychIpc.emit('normalize:compat-used', { type: 'mm.seed', mm });
  }
  
  const fromHost = host?.getAttribute?.('data-id') || host?.id;
  const fromText = content ? textHash(content) : undefined;
  return String(fromMM ?? fromHost ?? fromText ?? ('s'+Date.now().toString(36)));
}

// Map new EM shape → legacy em.dynamics fields expected by old renderer code.
function synthesizeDynamics(em){
  const density     = em?.scale?.density;          // 0..1 how "full"
  const pulse       = em?.cadence?.pulse;          // 0..1 rhythmic drive
  const anisotropy  = em?.cadence?.anisotropy;     // 0..1 irregularity
  const flux        = em?.families?.flux;          // 0..1 flux vibe

  // Check if dynamics is missing and needs synthesis
  const needsSynthesis = !em?.dynamics?.velocity && (density || pulse || anisotropy || flux);
  if (FLAGS.compat && needsSynthesis) {
    TriptychIpc.warnOnce('em.dynamics', 'provide em.dynamics or migrate renderer to cadence/scale API');
    TriptychIpc.emit('normalize:compat-used', { type: 'em.dynamics', em });
  }

  // Heuristics: prefer explicitly provided dynamics, else map from scale/cadence/families.
  const velocity = em?.dynamics?.velocity ?? density ?? pulse ?? 0.5;
  const entropy  = em?.dynamics?.entropy  ?? anisotropy ?? flux ?? 0.5;
  const polarity = em?.dynamics?.polarity ?? 0.5;

  return { velocity, entropy, polarity };
}

function normalizeModels({ host, mm, em, content }){
  TriptychIpc.emit('normalize:start', { host: host?.id, mm: !!mm, em: !!em, content: !!content });
  
  // ensure mm + seed
  const seed = deriveSeed({ host, mm, content });
  const mmOut = Object.assign({}, mm || {});
  mmOut.meta = Object.assign({ source:'uce/cie', seed }, mmOut.meta || {}, { seed });

  // ensure em has the subtrees we need, and synthesize legacy 'dynamics'
  const emOut = Object.assign({ texture:{}, families:{}, cadence:{}, scale:{} }, em || {});
  emOut.dynamics = synthesizeDynamics(emOut);

  const mode = FLAGS.strict ? 'strict' : 'compat';
  TriptychIpc.emit(`normalize:${mode}`, { seed, mm: mmOut, em: emOut });
  
  return { mm: mmOut, em: emOut, seed };
}

// Prime Directive helpers - guards and normalization
function ensureModels(args = {}) {
  let em = args.em || (typeof window !== 'undefined' ? window.EM?.current : null);
  let mm = args.mm || (typeof window !== 'undefined' ? window.MM?.current : null);

  if (!em) em = {
    texture: { structural_complexity: 0.5 },
    families: { gridness: .33, stratification: .33, flux: .34, constellation: 0 },
    cadence: { pulse: 0, anisotropy: .2 },
    scale:   { density: .5, granularity: .5 }
  };
  if (!mm) mm = { intent:{}, texture:{}, dynamics:{} };
  return { em, mm };
}

function ensureCanvas(paneEl, existing) {
  let canvasEl = existing || paneEl?.querySelector?.('.triptych__canvas, [data-triptych-canvas], canvas');
  if (!(canvasEl instanceof HTMLCanvasElement)) {
    // fallback: create DOM canvas (should be unnecessary with the template fix)
    canvasEl = document.createElement('canvas');
    canvasEl.className = 'triptych__canvas';
    canvasEl.setAttribute('data-triptych-canvas','1');
    paneEl?.appendChild?.(canvasEl);
  }
  const r = paneEl?.getBoundingClientRect?.() || { width: 256, height: 256 };
  const dpr = Math.max(1, (typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1);
  const cssW = Math.max(128, Math.floor(r.width  || 256));
  const cssH = Math.max(128, Math.floor(r.height || 256));
  canvasEl.style.width  = cssW + 'px';
  canvasEl.style.height = cssH + 'px';
  canvasEl.width  = Math.floor(cssW * dpr);
  canvasEl.height = Math.floor(cssH * dpr);
  return canvasEl;
}

// Triptych family selection - guaranteed diversity per specification
const TRIPTYCH_FAMILIES = {
  ground: ['Grid', 'Strata', 'Balance'],          // Stable, structural families
  energy: ['Flow', 'Spiral', 'Chaos'],           // Dynamic, flowing families  
  sign: ['Constellation', 'Radiance', 'Interference'] // Symbolic, precise families
};

// 1. DETERMINISTIC PANE SEEDING - Enhanced per gap-filling instructions
function deriveTriptychSeeds(baseSeed, rawText) {
  const S0 = deterministicSeed(baseSeed, rawText.slice(0, 64));
  
  // Ensure text slices are stable and vary across panes
  const textLen = rawText.length;
  const startSlice = rawText.slice(0, Math.min(100, textLen));
  const middleSlice = rawText.slice(Math.floor(textLen * 0.3), Math.floor(textLen * 0.7));
  const endSlice = rawText.slice(Math.max(0, textLen - 100));
  
  return {
    ground: deterministicSeed(S0.str + ':ground', startSlice),
    energy: deterministicSeed(S0.str + ':energy', middleSlice), 
    sign: deterministicSeed(S0.str + ':sign', endSlice)
  };
}

// 2. FAMILY DIVERSITY ENFORCEMENT - Enhanced with collision detection
function selectTriptychFamily(pane, seedPackage, contentAnalysis, usedFamilies = new Set()) {
  const families = TRIPTYCH_FAMILIES[pane];
  const seedValue = seedPackage.num;
  
  let familyIndex;
  let selectedFamily;
  let attempts = 0;
  const maxAttempts = 10; // Prevent infinite loops
  
  do {
    if (pane === 'ground') {
      // Ground: weight toward Grid/Strata if structural complexity is high
      const structuralBoost = (contentAnalysis.structure?.complexity || 0) > 0.3 ? 0.2 : 0;
      const adjustedSeed = seedValue + structuralBoost + (attempts * 0.1);
      familyIndex = Math.floor(adjustedSeed * families.length) % families.length;
    } else if (pane === 'energy') {
      // Energy: weight toward Flow/Chaos if temporal velocity is high
      const velocityBoost = (contentAnalysis.temporal?.velocity || 0) > 0.3 ? 0.2 : 0;
      const adjustedSeed = seedValue + velocityBoost + (attempts * 0.1);
      familyIndex = Math.floor(adjustedSeed * families.length) % families.length;
    } else { // sign
      // Sign: weight toward Constellation/Radiance if contemplative depth is high
      const contemplativeBoost = (contentAnalysis.lexicon?.contemplative || 0) > 0.3 ? 0.2 : 0;
      const adjustedSeed = seedValue + contemplativeBoost + (attempts * 0.1);
      familyIndex = Math.floor(adjustedSeed * families.length) % families.length;
    }
    
    selectedFamily = families[familyIndex];
    attempts++;
    
  } while (usedFamilies.has(selectedFamily) && attempts < maxAttempts);
  
  // If still colliding after max attempts, force diversity by index
  if (usedFamilies.has(selectedFamily)) {
    const availableFamilies = families.filter(f => !usedFamilies.has(f));
    selectedFamily = availableFamilies[0] || families[0]; // Fallback to first if all used
  }
  
  usedFamilies.add(selectedFamily);
  return selectedFamily;
}

// Contract clamping - enforce visual discipline per specification section 2
function clampContract(em) {
  const clamp = (x, min, max) => Math.min(max, Math.max(min, x || 0));
  
  return {
    ...em,
    // MM fields clamped for aesthetic discipline
    texture: {
      ...em.texture,
      structural_complexity: clamp(em.texture.structural_complexity, 0.25, 0.85)
    },
    dynamics: {
      ...em.dynamics,
      velocity: clamp(em.dynamics.velocity, 0.25, 0.95),
      entropy: clamp(em.dynamics.entropy, 0.15, 0.8),
      polarity: clamp(em.dynamics.polarity, 0, 1)
    },
    intent: {
      ...em.intent,
      contemplative: clamp(em.intent.contemplative, 0, 1),
      ritual: clamp(em.intent.ritual, 0, 1),
      contested: clamp(em.intent.contested, 0, 1)
    }
  };
}

// Safe rendering with enhanced fallback handling
function safeRender(ctx, out, opts = {}) {
  const render = getRenderer(out.family);
  
  try {
    if (opts.motion && !prefersReducedMotion()) {
      render(ctx, out);
    } else {
      // Render dry pull (first frame) for reduced motion
      render(ctx, out);
    }
  } catch (err) {
    console.warn(`[TriptychRenderer] ${out.family} renderer failed: ${err.message}`);
    
    if (err.name === 'IndexSizeError' || err.message.includes('canvas') || err.message.includes('Flow')) {
      renderStaticFallback(ctx, 'renderer-error', out.seed);
    } else {
      // Unknown error - still render fallback to maintain layout
      renderStaticFallback(ctx, 'unknown-error', out.seed);
    }
  }
}

// 3. ERROR HANDLING & FALLBACK - Enhanced graceful degradation
function renderStaticFallback(ctx, reason, seedTag = '') {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  
  if (reason === 'insufficient-content') {
    // Subtle "•••" placeholder for empty content
    ctx.fillStyle = 'rgba(107, 120, 134, 0.4)';
    ctx.font = `${Math.min(w, h) * 0.15}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('•••', w / 2, h / 2);
  } else {
    // Fallback rectangle with seed tag for renderer failures
    ctx.strokeStyle = 'rgba(67, 70, 72, 0.2)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(w * 0.1, h * 0.1, w * 0.8, h * 0.8);
    
    // Seed tag in corner if provided
    if (seedTag) {
      ctx.fillStyle = 'rgba(107, 120, 134, 0.3)';
      ctx.font = '8px monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(seedTag.slice(-6), w * 0.05, h * 0.05);
    }
  }
}

// Content threshold checker
function hasMinimalContent(text, confidence) {
  const MIN_CONTENT_LENGTH = 30;
  const MIN_CONFIDENCE = 0.5;
  return text && text.length >= MIN_CONTENT_LENGTH && confidence >= MIN_CONFIDENCE;
}

// Motion preference detection
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Structured logging & observability
const log = (lvl, msg, data = {}) => {
  const payload = { 
    t: Date.now(), 
    lvl, 
    msg, 
    data: { ...data, contract: 'triptych@1.0.0' } 
  };
  console[lvl === 'error' ? 'error' : 'info']('[Triptych]', payload);
  // Future: enqueue for /_telemetry endpoint (debounced)
};

// Health status management
function setTriptychStatus(element, status, reason = '') {
  element.setAttribute('data-status', status);
  if (reason) element.setAttribute('data-status-reason', reason);
  log('info', 'Status updated', { 
    status, 
    reason, 
    id: element.getAttribute('data-id') 
  });
}

// UCE Integration - Event bus & context units
const BUS = window.UCE?.bus || new EventTarget();

// guard CustomEvent in older browsers (defensive)
const makeEvt = (name, detail) => {
  try { return new CustomEvent(name, { detail, bubbles:false }); }
  catch { const e = document.createEvent('CustomEvent'); e.initCustomEvent(name, false, false, detail); return e; }
};

function emitUCE(evt, detail){
  try { BUS.dispatchEvent(makeEvt(evt, detail)); } catch {/* never break paint */}
}

function emitContextUnit(element, mm, results) {
  const cu = {
    unit_type: 'visual_sigil_triptych',
    contract: element.getAttribute('data-contract') || 'triptych@1.0.0',
    id: element.getAttribute('data-id'),
    facets: {
      palette: 'sacred/default', // TODO: read from YAML
      style: 'balance', // TODO: read from YAML  
      seed: baseSeed,
      panes: Object.keys(results),
      families: Object.values(results)
    },
    provenance: {
      renderer: element.getAttribute('data-renderer') || 'v2.5.1',
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      evidence_count: mm.features?.council ? 
        Object.values(mm.features.council.byType || {}).reduce((n,arr)=>n+arr.length,0) : 0
    }
  };
  
  emitUCE('sigil:triptych:rendered', cu);
  log('info', 'Context unit emitted', { id: cu.id, families: cu.facets.families });
}

// Ready Gates - DOM + presence + analyzers
const whenDOMReady = () => new Promise(r => {
  if (document.readyState !== 'loading') return r();
  document.addEventListener('DOMContentLoaded', r, {once: true});
});

function whenTriptychPresent() {
  return new Promise(resolve => {
    const has = () => !!document.querySelector('[data-triptych]');
    if (has()) return resolve();
    const mo = new MutationObserver(() => { 
      if (has()) { 
        mo.disconnect(); 
        resolve(); 
      }
    });
    mo.observe(document.documentElement, {childList: true, subtree: true});
    // Timeout fallback
    setTimeout(() => { mo.disconnect(); resolve(); }, 5000);
  });
}

async function readyAnalyzers() {
  if (typeof council !== 'undefined' && council.whenReady) {
    await council.whenReady({ min: 5, timeoutMs: 3000 });
  }
}

// DPR-aware canvas sizing with resize observer
function sizeCanvasFor(pane, canvas) {
  const rect = pane.getBoundingClientRect();
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));
  
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w; 
    canvas.height = h;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }
  return { width: w, height: h };
}

function attachResize(pane, canvas, redrawFn) {
  const ro = new ResizeObserver(() => { 
    const size = sizeCanvasFor(pane, canvas);
    if (redrawFn && size.width > 1 && size.height > 1) {
      redrawFn();
    }
  });
  ro.observe(pane);
  return ro;
}

// Self-healing canvas - union selector + auto-inject + normalize
function ensurePaneCanvas(paneEl) {
  let c = paneEl.querySelector('[data-triptych-canvas], .triptych__canvas, canvas');
  if (!c) {
    c = document.createElement('canvas');
    c.setAttribute('data-triptych-canvas', '1');
    paneEl.appendChild(c);
    log('info', 'Injected canvas', { pane: paneEl.getAttribute('data-triptych-pane') });
  }
  
  // Normalize canvas attributes for legacy compatibility
  c.setAttribute('data-triptych-canvas', '1');
  c.classList.add('triptych__canvas'); // Keep for legacy selectors
  return c;
}

// Colophon announcements - specification section 8
function announceColophon(hostElement, mm, out, pane) {
  const colophon = hostElement.querySelector('.triptych__colophon');
  if (!colophon) return;
  
  // Accumulate pane results
  if (!hostElement.__triptychResults) {
    hostElement.__triptychResults = {};
  }
  hostElement.__triptychResults[pane] = out.family;
  
  // Update colophon when all three panes are complete
  const results = hostElement.__triptychResults;
  if (Object.keys(results).length === 3) {
    const evidenceCount = mm.features?.council ? 
      Object.values(mm.features.council.byType || {}).reduce((n,arr)=>n+arr.length,0) : 0;
    
    const seedDisplay = String(mm.meta.seed).slice(-6);
    const families = `${results.ground} / ${results.energy} / ${results.sign}`;
    
    colophon.textContent = `Device set • Seed '${seedDisplay}' • Families: ${families} • Evidence: ${evidenceCount}`;
  }
}

// Core rendering function - tightened API (Prime Directive)
async function renderTriptychPane(args) {
  const { host, paneEl, canvas } = args || {};
  let { mm, em, seed, forcedFamily } = args || {};

  // Canvas guards
  if (!canvas || typeof canvas.getContext !== 'function') {
    console.warn('[TriptychRenderer] invalid canvas; abort pane');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) { console.warn('[TriptychRenderer] 2D ctx unavailable'); return; }

  // If caller didn't supply models, resolve now
  if (!mm || !em) {
    const content = await (window.ContentResolver?.resolve?.() ?? Promise.resolve({ text: '' }));
    const resolved = await resolveModels({ contentSource: content });
    mm = mm || resolved.mm;
    em = em || resolved.em;
    seed = seed || resolved.seed;
  }

  // Normalize
  forcedFamily = (forcedFamily ? String(forcedFamily).toLowerCase() : '') || null;

  const safeEM = em || {};
  const dyn = safeEM.dynamics || {};
  const tex = safeEM.texture || {};
  const velocity = Number.isFinite(dyn.velocity) ? dyn.velocity : 0.5;
  const scomp    = Number.isFinite(tex.structural_complexity) ? tex.structural_complexity : 0.5;

  const family = forcedFamily ||
    (typeof selectTriptychFamily === 'function'
      ? selectTriptychFamily(paneEl?.dataset?.triptychPane, { mm, em, seed })
      : 'flow');

  // Use {mm, em, seed, family, velocity, scomp} safely below
  const pane = paneEl?.dataset?.triptychPane || 'unknown';
  
  try {
    // DPR-aware sizing
    const size = sizeCanvasFor(paneEl, canvas);
    if (size.width <= 1 || size.height <= 1) {
      console.warn('[TriptychRenderer] Canvas too small, deferring');
      requestAnimationFrame(() => renderTriptychPane(args));
      return null;
    }

    // Safe binding and render
    const fromEM = bindingFor(family);
    const contractEM = {
      ...em,
      seed: seed || 'fallback',
      family: family,
      dynamics: { velocity, entropy: dyn.entropy || 0.5, polarity: dyn.polarity || 0.5 },
      texture: { structural_complexity: scomp }
    };
    
    const out = fromEM(contractEM);
    out.family = family;
    out.seed = seed;

    safeRender(ctx, out, { motion: !prefersReducedMotion() });

    TriptychIpc.emit('render:ok', { pane, host: host?.id, family, seed });
    return out;

  } catch (error) {
    console.error(`[TriptychRenderer] ${pane} pane failed:`, error);
    renderStaticFallback(ctx, pane);
    TriptychIpc.emit('render:fallback', { pane, host: host?.id, error: error.message });
    return null; // Don't throw, return null for graceful handling
  }
}

// Ornament rules - specification section 11
function applyOrnamentRules(hostElement, mm) {
  // Apply at most one per article
  if (mm.intent.ritual >= 0.7) {
    hostElement.classList.add('has-ritual-ornament');
  } else if (mm.texture.structural_complexity >= 0.95) {
    hostElement.classList.add('has-structural-rule');
  } else if (mm.intent.contemplative >= 0.8) {
    hostElement.classList.add('has-constellation-glint');
  }
}

// 4. DIAGNOSTIC HOOKS - Integration with glyph diagnostic console
function triptychPeek(hostElement, pane) {
  if (!hostElement.__mm || !hostElement.__seeds || !hostElement.__triptychResults) {
    console.log(`[TriptychPeek] ${pane}: Not yet rendered or data missing`);
    return;
  }
  
  const mm = hostElement.__mm;
  const seeds = hostElement.__seeds;
  const results = hostElement.__triptychResults;
  const evidenceCount = mm.features?.council ? 
    Object.values(mm.features.council.byType || {}).reduce((n,arr)=>n+arr.length,0) : 0;
  
  console.log(`[TriptychPeek] ${pane}:`, {
    family: results[pane],
    seed: String(seeds[pane]?.str).slice(-8),
    evidence: evidenceCount,
    contentAnalysis: {
      structural_complexity: mm.texture.structural_complexity.toFixed(3),
      velocity: mm.dynamics.velocity.toFixed(3),
      contemplative: mm.intent.contemplative.toFixed(3)
    },
    usedFamilies: Array.from(hostElement.__usedFamilies || [])
  });
}

// Global diagnostic exposure
if (typeof window !== 'undefined') {
  window.triptychPeek = (selector = '[data-triptych="true"]', pane = 'all') => {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`[TriptychPeek] No triptych found with selector: ${selector}`);
      return;
    }
    
    if (pane === 'all') {
      ['ground', 'energy', 'sign'].forEach(p => triptychPeek(element, p));
    } else {
      triptychPeek(element, pane);
    }
  };
}

// Hardened boot function with ready gates and comprehensive error handling
async function bootTriptychs(options = {}) {
  const {
    mountSelector = '[data-triptych]',
    contentSource = defaultContentSource,
    onRendered = null
  } = options;
  
  try {
    // Ready gates - ensure all prerequisites are met
    await whenDOMReady();
    await readyAnalyzers();
    await whenTriptychPresent();
    
    log('info', 'Boot sequence started', { selector: mountSelector });
    
    const triptychNodes = document.querySelectorAll(mountSelector);
    let successCount = 0;
    let errorCount = 0;
    
    // Process each triptych with comprehensive error handling
    for (const [index, hostElement] of triptychNodes.entries()) {
      try {
        // Set initial status
        setTriptychStatus(hostElement, 'initializing');
        
        // Validate contract and structure  
        const contract = hostElement.getAttribute('data-contract');
        if (contract && !contract.startsWith('triptych@1.')) {
          log('warn', 'Unsupported contract version', { contract, id: hostElement.getAttribute('data-id') });
        }
        
        const panes = hostElement.querySelectorAll('[data-triptych-pane]');
        
        // Validate pane structure
        if (panes.length !== 3) {
          log('error', 'Invalid pane count', { 
            expected: 3, 
            found: panes.length,
            id: hostElement.getAttribute('data-id')
          });
          setTriptychStatus(hostElement, 'degraded', `${panes.length} panes`);
        }

        // Process each pane with self-healing
        const results = {};
        const resizeObservers = [];
        
        for (const paneElement of panes) {
          try {
            // Self-healing canvas injection
            const canvas = ensurePaneCanvas(paneElement);
            if (!canvas) {
              log('error', 'Canvas creation failed', { 
                pane: paneElement.dataset.triptychPane 
              });
              continue;
            }

            const pane = paneElement.dataset.triptychPane || 'unknown';
            
            // Attach resize observer for responsive rendering
            const redrawFn = async () => {
              const resolved = await resolveModels({ 
                opts: options, 
                contentSource: defaultContentSource 
              });
              renderTriptychPane({
                host: hostElement,
                paneEl: paneElement,
                canvas: canvas,
                mm: resolved.mm,
                em: resolved.em,
                seed: resolved.seed,
                forcedFamily: options?.forcedFamily
              });
            };
            const ro = attachResize(paneElement, canvas, redrawFn);
            resizeObservers.push(ro);
            
            // Initial render with resolved models
            const resolved = await resolveModels({ 
              opts: options, 
              contentSource: defaultContentSource 
            });
            const result = await renderTriptychPane({
              host: hostElement,
              paneEl: paneElement,
              canvas: canvas,
              mm: resolved.mm,
              em: resolved.em,
              seed: resolved.seed,
              forcedFamily: options?.forcedFamily
            });
            if (result) {
              results[pane] = result;
            }
            
          } catch (paneError) {
            log('error', 'Pane render failed', { 
              pane: paneElement.dataset.triptychPane,
              error: paneError.message 
            });
            errorCount++;
            
            // Render fallback to maintain layout
            const canvas = paneElement.querySelector('[data-triptych-canvas], canvas');
            if (canvas) {
              renderStaticFallback(canvas.getContext('2d'), 'pane-error', paneError.message.slice(0, 10));
            }
          }
        }
        
        // Store resize observers for cleanup
        hostElement.__resizeObservers = resizeObservers;

        // Determine final status
        const paneCount = Object.keys(results).length;
        if (paneCount === 3) {
          setTriptychStatus(hostElement, 'ok');
          successCount++;
          
          // Emit context unit for successful renders
          const mm = hostElement.__mm;
          if (mm) {
            emitContextUnit(hostElement, mm, results);
          }
          
        } else if (paneCount > 0) {
          setTriptychStatus(hostElement, 'degraded', `${paneCount}/3 panes`);
        } else {
          setTriptychStatus(hostElement, 'fail', 'No panes rendered');
          errorCount++;
        }

        // Callback for successful renders
        if (onRendered && paneCount > 0) {
          onRendered({
            element: hostElement,
            index,
            results,
            families: Object.values(results).map(r => r.family),
            status: hostElement.getAttribute('data-status')
          });
        }

      } catch (error) {
        log('error', 'Triptych render failed', { 
          index, 
          error: error.message,
          id: hostElement.getAttribute('data-id')
        });
        setTriptychStatus(hostElement, 'fail', error.message.slice(0, 20));
        errorCount++;
      }
    }
    
    // Final boot summary
    log('info', 'Boot sequence completed', {
      total: triptychNodes.length,
      success: successCount,
      errors: errorCount,
      errorRate: errorCount / Math.max(1, triptychNodes.length)
    });
    
    // Error budget check
    const errorRate = errorCount / Math.max(1, triptychNodes.length);
    if (errorRate > 0.1) {
      log('error', 'Error budget exceeded', { 
        errorRate, 
        threshold: 0.1,
        recommendation: 'Check triptych infrastructure'
      });
    }

  } catch (bootError) {
    log('error', 'Boot sequence failed', { error: bootError.message });
    throw bootError;
  }
}

// Integration handled by orchestrator - no auto-boot needed

// Expose rescanAndRender API for console debugging + kill switches
if (typeof window !== 'undefined') {
  window.TriptychRenderer = Object.assign(window.TriptychRenderer || {}, {
    rescanAndRender: bootTriptychs,  // Main entry point for rescanning
    renderPane: renderTriptychPane,   // Individual pane rendering
    peek: triptychPeek,              // Debug inspection
    version: '2.5.1+prime-guards',   // Version info
    bootTriptychs,                   // Direct access to boot function
    
    // Kill switches for production migration
    setFlags: (newFlags) => Object.assign(FLAGS, newFlags),
    getFlags: () => ({ ...FLAGS }),
    
    // Observability hooks
    onCompat: (fn) => window.addEventListener('triptych:normalize:compat-used', fn),
    onRender: (fn) => window.addEventListener('triptych:render:ok', fn)
  });
}

// Single canonical export surface (Prime Directive)
export {
  resolveModels,
  renderTriptychPane,
  bootTriptychs,
  // Testing and extension utilities
  selectTriptychFamily,
  deriveTriptychSeeds,
  clampContract,
  safeRender,
  triptychPeek
};