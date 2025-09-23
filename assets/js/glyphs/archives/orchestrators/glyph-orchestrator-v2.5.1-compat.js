// Glyph Orchestrator v2.5.1 - Single MM→EM→Binding→Renderer Path (Script Compatible)
// Prime Directive: Clean, durable architecture with no legacy paths

class GlyphOrchestratorV251 {
  constructor() {
    // Binding registry - single source of truth
    this.bindings = {};
    this.renderers = new Map();
    this.ready = false;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }
  }
  
  initialize() {
    // Register all bindings (will be populated by binding files)
    this.loadBindings();
    this.loadRenderers();
    
    console.log('[GlyphOrchestrator] v2.5.1 initialized - single MM→EM→Binding path');
    this.ready = true;
  }
  
  // Load bindings from global scope
  loadBindings() {
    const bindingNames = ['Flow', 'Grid', 'Strata', 'Constellation', 'Radiance', 'Interference', 'Spiral', 'Balance', 'Chaos', 'Collapse', 'Threshold'];
    
    bindingNames.forEach(name => {
      const globalName = `${name}Binding`;
      if (window[globalName]) {
        this.bindings[name] = window[globalName];
        console.log(`[GlyphOrchestrator] Loaded binding: ${name}`);
      } else {
        console.warn(`[GlyphOrchestrator] Missing binding: ${name}`);
      }
    });
  }
  
  // Register renderers
  loadRenderers() {
    // Renderers will register themselves via registerRenderer calls
    if (window.GlyphRenderers) {
      Object.keys(window.GlyphRenderers).forEach(name => {
        this.renderers.set(name, window.GlyphRenderers[name]);
        console.log(`[GlyphOrchestrator] Loaded renderer: ${name}`);
      });
    }
  }
  
  // Main rendering method - single clean path
  renderGlyph(canvas, glyphId, postMeta) {
    if (!this.ready) {
      throw new Error('[GlyphOrchestrator] Not ready - call initialize() first');
    }
    
    try {
      // 1. Build MM (Meaning Model) from post metadata
      const mm = this.buildMM(postMeta);
      
      // 2. Build EM (Expression Model) from MM
      const em = this.buildEM(mm);
      
      // 3. Select family and get binding
      const family = this.selectFamily(em);
      const binding = this.getBinding(family);
      
      // 4. Safety check
      this.validateFamilySupport(family);
      
      // 5. Generate binding output (convert old-style binding to new contract)
      const bindingOutput = this.adaptBinding(binding, em, family);
      
      // 6. Get renderer and render
      const renderer = this.getRenderer(bindingOutput.family);
      const ctx = canvas.getContext('2d');
      
      if (typeof renderer === 'function') {
        renderer(ctx, bindingOutput);
      } else if (renderer.render) {
        // Handle legacy renderer classes
        const rendererInstance = new renderer(canvas, bindingOutput.knobs);
        rendererInstance.render();
      } else {
        throw new Error(`Invalid renderer for ${bindingOutput.family}`);
      }
      
      // 7. Log diagnostic
      this.logRender(mm, em, family, bindingOutput);
      
      return bindingOutput;
      
    } catch (error) {
      console.error('[GlyphOrchestrator] Render failed:', error);
      this.renderFallback(canvas, error.message);
      throw error;
    }
  }
  
  // Adapt old binding format to new v2.5.1 contract
  adaptBinding(binding, em, family) {
    if (binding.fromEM) {
      // New v2.5.1 binding
      return binding.fromEM(em);
    } else if (binding.params) {
      // Old binding format - adapt to new contract
      const params = binding.params(em);
      
      return {
        family: family,
        seed: String(params.seed || em.seed),
        palette: { 
          name: params.paletteIntent || 'default',
          intent: family.toLowerCase()
        },
        scale: Math.max(0.5, Math.min(2.0, em.scale?.density || 1.0)),
        knobs: this.extractKnobs(params, family),
        __contract: 'binding-2.5.1-adapted'
      };
    } else {
      throw new Error(`Invalid binding format for ${family}`);
    }
  }
  
  // Extract knobs from legacy parameter format
  extractKnobs(params, family) {
    switch (family) {
      case 'Flow':
        return {
          velocity: params.velocity || 0.5,
          turbulence: params.turbulence || 0.3,
          direction: params.directionality || 0.5
        };
      case 'Grid':
        return {
          gridness: params.orthogonality || 0.5,
          granularity: (params.cellSize ? 1 - (params.cellSize / 30) : 0.5),
          orthogonality: params.orthogonality || 0.5
        };
      case 'Strata':
        return {
          layers: params.layers || 8,
          depth: params.temporalDepth || 0.5,
          density: params.layerCompression || 0.5
        };
      case 'Constellation':
        return {
          starCount: params.starCount || 60,
          brightness: params.cosmicDensity || 0.5,
          connections: params.connectionComplexity || 0.3
        };
      default:
        // For new families, return all non-seed parameters as knobs
        const knobs = { ...params };
        delete knobs.seed;
        delete knobs.animationSpeed;
        delete knobs.paletteIntent;
        return knobs;
    }
  }
  
  // Build Meaning Model from post metadata
  buildMM(postMeta) {
    if (!window.buildMM) {
      throw new Error('[GlyphOrchestrator] buildMM not available - check mm.js loading');
    }
    
    return window.buildMM(postMeta);
  }
  
  // Build Expression Model from MM
  buildEM(mm) {
    if (!window.buildEM) {
      throw new Error('[GlyphOrchestrator] buildEM not available - check em.js loading');
    }
    
    return window.buildEM(mm);
  }
  
  // Select family from EM energies
  selectFamily(em) {
    if (!window.familyFromEM) {
      throw new Error('[GlyphOrchestrator] familyFromEM not available - check em.js loading');
    }
    
    const family = window.familyFromEM(em);
    
    // Capitalize family name for binding lookup
    return family.charAt(0).toUpperCase() + family.slice(1);
  }
  
  // Get binding for family
  getBinding(family) {
    const binding = this.bindings[family];
    if (!binding) {
      throw new Error(`[GlyphOrchestrator] No binding available for family: ${family}`);
    }
    return binding;
  }
  
  // Get renderer for family
  getRenderer(family) {
    const renderer = this.renderers.get(family) || (window.GlyphRenderers && window.GlyphRenderers[family]);
    if (!renderer) {
      throw new Error(`[GlyphOrchestrator] No renderer available for family: ${family}`);
    }
    return renderer;
  }
  
  // Validate family is supported in current build
  validateFamilySupport(family) {
    // For now, allow all families - safety flags will be implemented later
    const supportedFamilies = ['Flow', 'Grid', 'Strata', 'Constellation', 'Radiance', 'Interference', 'Spiral', 'Balance', 'Chaos', 'Collapse', 'Threshold'];
    
    if (!supportedFamilies.includes(family)) {
      throw new Error(`[GlyphOrchestrator] Family not supported: ${family}`);
    }
  }
  
  // Diagnostic logging
  logRender(mm, em, family, bindingOutput) {
    const mmSummary = {
      intent: `analytical:${mm.intent.analytical.toFixed(2)},contemplative:${mm.intent.contemplative.toFixed(2)}`,
      texture: `structural:${mm.texture.structural_complexity.toFixed(2)}`,
      dynamics: `velocity:${mm.dynamics.velocity.toFixed(2)}`
    };
    
    const emSummary = {
      families: Object.entries(em.families)
        .map(([k,v]) => `${k}:${v.toFixed(2)}`)
        .slice(0, 2)
        .join(','),
      cadence: `pulse:${em.cadence.pulse.toFixed(2)}`,
      scale: `density:${em.scale.density.toFixed(2)}`
    };
    
    const knobsSummary = Object.entries(bindingOutput.knobs)
      .slice(0, 3)
      .map(([k,v]) => `${k}:${typeof v === 'number' ? v.toFixed(2) : v}`)
      .join(',');
    
    console.log('🧭 MM→EM→Render', {
      mm: mmSummary,
      em: emSummary,
      family,
      chosen: bindingOutput.family,
      knobsSummary
    });
  }
  
  // Fallback renderer for errors
  renderFallback(canvas, errorMsg) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Simple error indicator
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '12px monospace';
    ctx.fillText('Render Error', 20, 30);
    ctx.fillText(errorMsg.slice(0, 30), 20, 50);
  }
  
  // Public API methods for testing
  listSupportedFamilies() {
    return Object.keys(this.bindings);
  }
}

// Global registration
if (typeof window !== 'undefined') {
  window.GlyphOrchestratorV251 = GlyphOrchestratorV251;
  window.glyphOrchestrator = new GlyphOrchestratorV251();
  console.log('[GlyphOrchestrator] v2.5.1 registered globally');
}