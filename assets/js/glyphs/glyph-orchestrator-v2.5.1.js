// Glyph Orchestrator v2.5.1 - ES Module Entrypoint
// Prime Directive: Single clean path, explicit imports, no globals

import { assertBindingOutput } from './contracts.js';
import { deterministicSeed } from './util-seed.esm.js';

// Version consistency - single source of truth
const ASSETS_VER = '21';

// Load analyzers - versioned and explicit to ensure execution
import './analyzer-council.js?v=21';
import { CORE_ANALYZERS_LOADED } from './analyzers/core.js?v=21'; 
import { MUSIC_ANALYZERS_LOADED } from './analyzers/music.js?v=21';
import { listAnalyzers, countAnalyzers, runAnalyzers } from './analyzer-council.js?v=21';
import { parseMarkdown } from './analyzer-council.js?v=21';

// Verify analyzers loaded and registered
console.log('[Orchestrator] Analyzers loaded flags:', {
  core: CORE_ANALYZERS_LOADED,
  music: MUSIC_ANALYZERS_LOADED
});
console.log('[AnalyzerCouncil] Total analyzers:', countAnalyzers(), listAnalyzers());

// Council smoke test - known-good evidence detection
async function __councilSmoke() {
  const smoke = [
    'A chaconne for viola da gamba with notes inégales at Santes Creus.',
    'Vespers Magnificat BWV 243.'
  ].join(' ');
  const { ast, index } = parseMarkdown(smoke);
  const outs = await runAnalyzers({ rawText: smoke, ast, index, lang: 'en' });
  const evidenceCount = outs.reduce((n,o)=>n+(o.evidence?.length||0),0);
  console.log('[CouncilSmoke] analyzers=%d, evidence=%d', outs.length, evidenceCount, outs);
}
__councilSmoke().catch(e => console.warn('[CouncilSmoke] failed:', e));

// Dynamic fallback for resilience (usually no-op)
(async () => {
  try {
    if (!CORE_ANALYZERS_LOADED) {
      const m = await import(/* @vite-ignore */ `./analyzers/core.js?v=${ASSETS_VER}`);
      console.log('[Orchestrator] Fallback imported core analyzers:', !!m.CORE_ANALYZERS_LOADED);
    }
    if (!MUSIC_ANALYZERS_LOADED) {
      const m = await import(/* @vite-ignore */ `./analyzers/music.js?v=${ASSETS_VER}`);
      console.log('[Orchestrator] Fallback imported music analyzers:', !!m.MUSIC_ANALYZERS_LOADED);
    }
  } catch (e) {
    console.error('[Orchestrator] Dynamic import fallback failed:', e);
  }
})();

// Bindings
import * as Flow from './bindings/flow.binding.js';
import * as Grid from './bindings/grid.binding.js';
import * as Strata from './bindings/strata.binding.js';
import * as Constellation from './bindings/constellation.binding.js';
import * as Radiance from './bindings/radiance.binding.js';
import * as Interference from './bindings/interference.binding.js';
import * as Spiral from './bindings/spiral.binding.js';
import * as Balance from './bindings/balance.binding.js';
import * as Chaos from './bindings/chaos.binding.js';
import * as Collapse from './bindings/collapse.binding.js';
import * as Threshold from './bindings/threshold.binding.js';

// Renderers (self-register to the registry)
import { getRenderer } from './renderers/index.js';
import './renderers/flow.js';
import './renderers/grid.js';
import './renderers/strata.js';
import './renderers/constellation.js';
import './renderers/radiance.js';
import './renderers/interference.js';
import './renderers/spiral.js';
import './renderers/balance.js';
import './renderers/chaos.js';
import './renderers/collapse.js';
import './renderers/threshold.js';

// Overlays
import { applyScriptoriumOverlay } from './overlays/scriptorium-overlay.js';
import { applySealInsigniaOverlay } from './overlays/seal-insignia-overlay.js';

// Pipeline
import { buildMM } from './mm.js';
import { buildEM, familyFromEM } from './em.js';
import { pickPalette } from './sacred-palette.js';

// Binding map
const Bindings = {
  Flow, Grid, Strata, Constellation,
  Radiance, Interference, Spiral, Balance, Chaos, Collapse, Threshold
};

function bindingFor(family) {
  const mod = Bindings[family];
  if (!mod?.fromEM) throw new Error(`[Binding] Missing fromEM for ${family}`);
  return mod.fromEM;
}

// Main glyph rendering function
async function renderGlyph(canvas, content) {
  try {
    // 0. Sanity probe - content extraction verification
    const preview = (content || '').slice(0, 160).replace(/\n/g,'⏎');
    console.log('[Orchestrator] glyph content bytes/preview:', content?.length || 0, '::', preview);
    
    // 1. MM→EM pipeline (MM now handles input normalization and council analysis)
    const mm = await buildMM(content);
    const em = buildEM(mm);
    
    // 2. Family selection and binding  
    const familyName = familyFromEM(em);
    const family = familyName.charAt(0).toUpperCase() + familyName.slice(1);
    const fromEM = bindingFor(family);
    
    // 3. Generate contract-compliant seed and binding output
    const rendererId = family; // Use family name as renderer ID
    const seedPackage = deterministicSeed(mm.meta.seed, rendererId);
    
    // Update EM with contract-compliant seed string
    const contractEM = { ...em, seed: seedPackage.str };
    const out = fromEM(contractEM);
    
    // 4. Validate contract
    assertBindingOutput(out.family, out, Object.keys(out.knobs || {}));
    
    // 5. Render
    const ctx = canvas.getContext('2d');
    const render = getRenderer(out.family);
    render(ctx, out);
    
    // 6. Apply overlays if conditions are met
    applyScriptoriumOverlay(ctx, out);
    applySealInsigniaOverlay(ctx, out);
    
    // 7. Diagnostic logging
    console.log('🧭 ESM MM→EM→Render', {
      family: out.family,
      knobs: Object.keys(out.knobs).slice(0, 3).join(','),
      seed: String(out.seed).slice(0, 8),
      contract: out.__contract
    });
    
    return out;
    
  } catch (error) {
    console.error('[Glyph] Render failed:', error);
    renderFallback(canvas, error.message);
    throw error;
  }
}

// Fallback renderer for errors
function renderFallback(canvas, errorMsg) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#FF6B6B';
  ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '12px monospace';
  ctx.fillText('Render Error', 20, 30);
  ctx.fillText(errorMsg.slice(0, 30), 20, 50);
}

// Boot function - scan for glyphs and render them
export function bootGlyphs() {
  console.log('[Glyph] ESM Boot v2.5.1 - scanning for glyphs...');
  
  // Find all glyph targets
  const glyphNodes = document.querySelectorAll('[data-glyph], .glyph-canvas, canvas[data-content]');
  
  glyphNodes.forEach((node, index) => {
    try {
      // Extract content for MM analysis
      const content = node.getAttribute('data-glyph') || 
                     node.getAttribute('data-content') || 
                     node.textContent || 
                     `default-glyph-${index}`;
      
      // Find or create canvas
      let canvas;
      if (node.tagName === 'CANVAS') {
        canvas = node;
      } else {
        canvas = node.querySelector('canvas');
        if (!canvas) {
          console.warn(`[Glyph] No canvas found for node`, node);
          return;
        }
      }
      
      // Render glyph asynchronously
      renderGlyph(canvas, content).catch(error => {
        console.error(`[Glyph] Failed to render glyph ${index}:`, error);
      });
      
    } catch (error) {
      console.error(`[Glyph] Failed to render glyph ${index}:`, error);
    }
  });
  
  console.log(`[Glyph] ESM Boot complete - rendered ${glyphNodes.length} glyphs`);
}

// Optional auto-boot (can be disabled by importing modules manually)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootGlyphs);
} else {
  // DOM already loaded - defer boot to next tick to allow all imports to resolve
  setTimeout(bootGlyphs, 0);
}

// Export functions for manual control if needed
export { renderGlyph, bindingFor };