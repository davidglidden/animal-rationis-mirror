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

// --- seed utils (compat + fallback) -----------------------------------------
function textHash(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
}

function deriveSeed({ host, mm, content }) {
  const fromMM   = mm?.meta?.seed ?? mm?.seed;         // ← compat: meta.seed OR top-level seed
  const fromHost = host?.getAttribute?.('data-id') || host?.id;
  const fromText = content ? textHash(content) : undefined;
  return String(fromMM ?? fromHost ?? fromText ?? ('s' + Date.now().toString(36)));
}

/** Normalize mm/em so the renderer never crashes on missing fields. */
function normalizeModels({ host, mm, em, content }) {
  const seed = deriveSeed({ host, mm, content });
  // ensure mm/meta exists and carries the resolved seed (non-breaking)
  const mmOut = Object.assign({}, mm || {});
  mmOut.meta = Object.assign({ source: 'uce/cie', seed }, mmOut.meta || {}, { seed });
  // minimal em guards (keep your existing defaults too)
  const emOut = Object.assign(
    { texture: {}, families: {}, cadence: {}, scale: {} },
    em || {}
  );
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

function emit(evt, detail) {
  BUS.dispatchEvent(new CustomEvent(evt, { detail, bubbles: false }));
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
  
  emit('sigil:triptych:rendered', cu);
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

// Core rendering function - Prime Directive normalized parameters
async function renderTriptychPane(args = {}) {
  // Normalize parameters (support both old and new calling conventions)
  const paneEl = args.paneEl || args.pane || args.canvas?.parentElement;
  const hostElement = args.host || args.hostElement;
  const pane = args.paneName || paneEl?.getAttribute('data-triptych-pane') || 'unknown';
  
  if (!(paneEl instanceof Element)) {
    throw new Error('renderTriptychPane: pane element missing');
  }
  
  const canvasEl = ensureCanvas(paneEl, args.canvasEl || args.canvas);
  const ctx = canvasEl.getContext('2d'); // never reassign canvasEl
  
  // Normalize models with seed compatibility shim
  const articleText = document.querySelector('article')?.innerText?.slice(0, 10000) || '';
  let { mm, em, seed: baseSeed } = normalizeModels({ 
    host: hostElement, 
    mm: args.mm || (typeof window !== 'undefined' ? window.MM?.current : null), 
    em: args.em || (typeof window !== 'undefined' ? window.EM?.current : null), 
    content: articleText 
  });
  
  const options = args.options || {};
  
  try {
    // 0) DPR-aware sizing with proper error handling
    const size = sizeCanvasFor(paneEl, canvasEl);

    if (size.width <= 1 || size.height <= 1) {
      log('warn', 'Canvas too small, deferring', { 
        pane, 
        size, 
        id: hostElement.getAttribute('data-id') 
      });
      requestAnimationFrame(() => renderTriptychPane(args));
      return null;
    }

    // 1) Resolve content once per host (cached)
    if (!hostElement.__contentResolved) {
      const resolved = await defaultContentSource.resolve(hostElement);
      hostElement.__contentResolved = resolved;
    }
    
    const { text, slug, confidence } = hostElement.__contentResolved;
    
    // Enhanced content threshold checking
    if (!hasMinimalContent(text, confidence)) {
      console.warn(`[TriptychRenderer] ${pane} pane: insufficient content (${text?.length || 0} chars, ${confidence || 0} confidence)`);
      renderStaticFallback(ctx, 'insufficient-content');
      return null;
    }

    // 2) Build MM/EM once per host; cache on host
    if (!hostElement.__mm) {
      hostElement.__mm = await buildMM({ 
        rawText: text, 
        analyzers: undefined,
        priors: { seedTag: slug || undefined } 
      });
    }
    
    if (!hostElement.__em) {
      hostElement.__em = buildEM(hostElement.__mm);
    }
    
    // Use models from args if provided, otherwise use cached
    const mmFinal = mm || hostElement.__mm;
    const emFinal = em || hostElement.__em;

    // 3) Seeds & family selection with diversity enforcement
    if (!hostElement.__seeds) {
      hostElement.__seeds = deriveTriptychSeeds(baseSeed, text);
    }
    
    if (!hostElement.__usedFamilies) {
      hostElement.__usedFamilies = new Set();
    }
    
    const seeds = hostElement.__seeds;
    const paneSeed = seeds[pane];
    
    const contentAnalysis = {
      structure: { complexity: mmFinal?.texture?.structural_complexity || 0.5 },
      temporal: { velocity: mmFinal?.dynamics?.velocity || 0.5 },
      lexicon: { contemplative: mmFinal?.intent?.contemplative || 0.5 }
    };
    
    const forcedFamily = selectTriptychFamily(pane, paneSeed, contentAnalysis, hostElement.__usedFamilies);

    // 4) Contract EM → binding input with clamps & pane seed injection
    const contractEM = clampContract({
      ...emFinal,
      seed: paneSeed.str, // CRITICAL: Replace with pane-specific seed
      family: forcedFamily.toLowerCase() // EM expects lowercase token internally
    });

    // 5) Binding + renderer
    const fromEM = bindingFor(forcedFamily);
    const out = fromEM(contractEM);
    out.family = forcedFamily; // normalize for renderer registry lookup
    out.seed = paneSeed.str; // Ensure seed is pane-specific

    // 6) Render with enhanced error handling (ctx already created above)
    safeRender(ctx, out, { motion: !prefersReducedMotion() });

    // 7) Enhanced logging with structured data
    const evidenceCount = mmFinal?.features?.council ? 
      Object.values(mm.features.council.byType || {}).reduce((n,arr)=>n+arr.length,0) : 0;
    
    log('info', 'Pane rendered successfully', {
      pane,
      family: out.family,
      seed: String(paneSeed.str).slice(-8),
      contentLen: text.length,
      evidence: evidenceCount,
      usedFamilies: Array.from(hostElement.__usedFamilies),
      id: hostElement.getAttribute('data-id')
    });
    
    announceColophon(hostElement, mmFinal, out, pane);
    
    // Apply ornament classes based on content
    applyOrnamentRules(hostElement, mmFinal);
    
    return out;

  } catch (error) {
    console.error(`[TriptychRenderer] ${pane} pane failed:`, error);
    renderStaticFallback(ctx, pane);
    throw error;
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
            const redrawFn = () => {
              const content = document.querySelector('article')?.innerText?.slice(0, 10000) || '';
              const norm = normalizeModels({ host: hostElement, mm: options?.mm, em: options?.em, content });
              renderTriptychPane({
                paneEl: paneElement,
                canvasEl: canvas,
                host: hostElement,
                paneName: pane,
                em: norm.em,
                mm: norm.mm
              });
            };
            const ro = attachResize(paneElement, canvas, redrawFn);
            resizeObservers.push(ro);
            
            // Initial render with normalized models
            const content = document.querySelector('article')?.innerText?.slice(0, 10000) || '';
            const norm = normalizeModels({ host: hostElement, mm: options?.mm, em: options?.em, content });
            const result = await renderTriptychPane({
              paneEl: paneElement,
              canvasEl: canvas,
              host: hostElement,
              paneName: pane,
              em: norm.em,
              mm: norm.mm
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

// Expose rescanAndRender API for console debugging
if (typeof window !== 'undefined') {
  window.TriptychRenderer = Object.assign(window.TriptychRenderer || {}, {
    rescanAndRender: bootTriptychs,  // Main entry point for rescanning
    renderPane: renderTriptychPane,   // Individual pane rendering
    peek: triptychPeek,              // Debug inspection
    version: '2.5.1+prime-guards',   // Version info
    bootTriptychs                    // Direct access to boot function
  });
}

// Exports for testing and extension
export { 
  renderTriptychPane, 
  selectTriptychFamily, 
  deriveTriptychSeeds,
  clampContract,
  safeRender,
  triptychPeek,
  bootTriptychs  // Export main function for API
};