// AldineXXI Triptych Renderer - Specification-compliant implementation
// Three-pane living abstracts: Ground/Energy/Sign pattern with guaranteed diversity

import { deterministicSeed } from './util-seed.esm.js';
import { buildMM } from './mm.js';
import { buildEM } from './em.js';
import { bindingFor } from './glyph-orchestrator-v2.5.1.js';
import { getRenderer } from './renderers/index.js';
import { defaultContentSource } from './content-resolver.js';

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

// Core rendering function - enhanced with missing mechanics
async function renderTriptychPane(canvas, hostElement, pane) {
  try {
    // 0) Device pixel ratio sizing (prevents zero/too-small draw buffers)
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width  = Math.max(1, Math.floor(rect.width  * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width <= 0 || canvas.height <= 0) {
      console.warn(`[TriptychRenderer] ${pane} pane canvas has zero dimensions, deferring`);
      requestAnimationFrame(() => renderTriptychPane(canvas, hostElement, pane));
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
      renderStaticFallback(canvas.getContext('2d'), 'insufficient-content');
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
    
    const mm = hostElement.__mm;
    const em = hostElement.__em;

    // 3) Seeds & family selection with diversity enforcement
    if (!hostElement.__seeds) {
      hostElement.__seeds = deriveTriptychSeeds(mm.meta.seed, text);
    }
    
    if (!hostElement.__usedFamilies) {
      hostElement.__usedFamilies = new Set();
    }
    
    const seeds = hostElement.__seeds;
    const paneSeed = seeds[pane];
    
    const contentAnalysis = {
      structure: { complexity: mm.texture.structural_complexity },
      temporal: { velocity: mm.dynamics.velocity },
      lexicon: { contemplative: mm.intent.contemplative }
    };
    
    const forcedFamily = selectTriptychFamily(pane, paneSeed, contentAnalysis, hostElement.__usedFamilies);

    // 4) Contract EM → binding input with clamps & pane seed injection
    const contractEM = clampContract({
      ...em,
      seed: paneSeed.str, // CRITICAL: Replace with pane-specific seed
      family: forcedFamily.toLowerCase() // EM expects lowercase token internally
    });

    // 5) Binding + renderer
    const fromEM = bindingFor(forcedFamily);
    const out = fromEM(contractEM);
    out.family = forcedFamily; // normalize for renderer registry lookup
    out.seed = paneSeed.str; // Ensure seed is pane-specific

    // 6) Render with enhanced error handling
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    safeRender(ctx, out, { motion: !prefersReducedMotion() });

    // 7) Enhanced logging with diagnostics
    const evidenceCount = mm.features?.council ? 
      Object.values(mm.features.council.byType || {}).reduce((n,arr)=>n+arr.length,0) : 0;
    
    console.log(`🎭 Triptych ${pane} rendered:`, {
      family: out.family,
      seed: String(paneSeed.str).slice(-8),
      pane,
      contentLen: text.length,
      evidence: evidenceCount,
      usedFamilies: Array.from(hostElement.__usedFamilies)
    });
    
    announceColophon(hostElement, mm, out, pane);
    
    // Apply ornament classes based on content
    applyOrnamentRules(hostElement, mm);
    
    return out;

  } catch (error) {
    console.error(`[TriptychRenderer] ${pane} pane failed:`, error);
    renderStaticFallback(canvas.getContext('2d'), pane);
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

// Public API with enhanced error handling
export function bootTriptychs(options = {}) {
  const {
    mountSelector = '[data-triptych="true"]',
    contentSource = defaultContentSource,
    onRendered = null
  } = options;
  
  console.log('[TriptychRenderer] Scanning for triptych sigils...');
  
  const triptychNodes = document.querySelectorAll(mountSelector);
  
  triptychNodes.forEach(async (hostElement, index) => {
    try {
      const panes = hostElement.querySelectorAll('[data-triptych-pane]');
      
      if (panes.length !== 3) {
        console.warn(`[TriptychRenderer] Expected 3 panes, found ${panes.length}`);
        // Still try to render what we have to maintain layout
      }

      // Process each pane with guaranteed fallback
      const results = {};
      for (const paneElement of panes) {
        const canvas = paneElement.querySelector('.triptych__canvas');
        if (!canvas) {
          console.warn('[TriptychRenderer] No canvas found in pane', paneElement);
          continue;
        }

        const pane = paneElement.dataset.triptychPane || 'unknown';
        try {
          const result = await renderTriptychPane(canvas, hostElement, pane);
          if (result) results[pane] = result;
        } catch (paneError) {
          console.error(`[TriptychRenderer] Pane ${pane} failed, rendering fallback:`, paneError.message);
          renderStaticFallback(canvas.getContext('2d'), 'pane-error', `${pane}:err`);
        }
      }

      if (onRendered && Object.keys(results).length > 0) {
        onRendered({
          element: hostElement,
          index,
          results,
          families: Object.values(results).map(r => r.family)
        });
      }

    } catch (error) {
      console.error(`[TriptychRenderer] Failed to render triptych ${index}:`, error);
      // Ensure we never break the layout - render fallbacks for all panes
      const panes = hostElement.querySelectorAll('.triptych__canvas');
      panes.forEach((canvas, i) => {
        renderStaticFallback(canvas.getContext('2d'), 'host-error', `err:${i}`);
      });
    }
  });

  console.log(`[TriptychRenderer] Processed ${triptychNodes.length} triptych sigils`);
}

// Integration handled by orchestrator - no auto-boot needed

// Exports for testing and extension
export { 
  renderTriptychPane, 
  selectTriptychFamily, 
  deriveTriptychSeeds,
  clampContract,
  safeRender,
  triptychPeek
};