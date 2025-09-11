// Universal Parameter Adapter (UPA) - Bridge EM → legacy engines for orphaned families
// Provides deterministic parameter mapping for families without dedicated bindings
// Status: Temporary bridge - to be replaced with proper bindings per family

// Constants and helpers
const tau = Math.PI * 2;
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const quantize = (x, min, max) => Math.round(min + (max - min) * clamp(x, 0, 1));

// Base parameters common to all families
function baseCommon(em) {
  return {
    // Core deterministic parameters
    seed: em.seed,
    
    // Palette discipline (will be enhanced with sacred-palette integration)
    paletteIntent: getFamilyPaletteIntent(em.family),
    
    // Scale and transformations
    scale: clamp(em.scale?.density || 0.5, 0.5, 2.0),
    opacity: 0.7 + (em.scale?.granularity || 0.3) * 0.2,
    
    // Secondary family micro-blending (when affinity > 0.65, cap at 0.2)
    secondary: em.secondary_affinity > 0.65 ? {
      family: getSecondaryFamily(em),
      strength: Math.min(0.2, em.secondary_affinity - 0.65)
    } : null,
    
    // Animation timing
    animationSpeed: 0.3 + (em.cadence?.pulse || 0.5) * 0.4
  };
}

// Get palette intent per family
function getFamilyPaletteIntent(family) {
  const paletteMap = {
    'radiance': 'luminous',
    'interference': 'wave', 
    'spiral': 'golden',
    'balance': 'equilibrium',
    'chaos': 'chaotic',
    'collapse': 'monochrome',
    'threshold': 'liminal'
  };
  return paletteMap[family] || 'default';
}

// Determine secondary family from EM energies
function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}

// Family-specific parameter adapters
const familyAdapters = {
  radiance(em, base) {
    return {
      ...base,
      intensity: clamp(em.cadence?.pulse || 0.5, 0, 1),
      rays: quantize(em.scale?.granularity || 0.4, 16, 128), 
      glow: clamp(em.scale?.density || 0.5, 0, 1),
      burst: Math.round(3 + 5 * (em.cadence?.pulse || 0.5))
    };
  },
  
  interference(em, base) {
    return {
      ...base,
      frequencyA: 2 + Math.round(10 * (em.scale?.granularity || 0.5)),
      frequencyB: 3 + Math.round(12 * (em.cadence?.anisotropy || 0.5)),
      phase: tau * (em.cadence?.pulse || 0.0),
      amplitude: clamp(em.families?.flux || 0.5, 0, 1)
    };
  },
  
  spiral(em, base) {
    return {
      ...base,
      turns: 2 + Math.round(6 * (em.scale?.density || 0.5)),
      tightness: clamp(1 - (em.scale?.granularity || 0.5), 0.1, 0.95),
      armCount: 1 + Math.round(3 * (base.secondary?.strength || 0.0))
    };
  },
  
  balance(em, base) {
    return {
      ...base,
      axisTilt: (em.cadence?.anisotropy || 0.5) * 45, // degrees
      weights: clamp(em.scale?.density || 0.5, 0, 1),
      tension: clamp(em.cadence?.pulse || 0.5, 0, 1)
    };
  },
  
  chaos(em, base) {
    return {
      ...base,
      noiseScale: 0.25 + 1.75 * (em.scale?.granularity || 0.5),
      seedJitter: Math.floor(1000 * (em.families?.flux || 0.5)),
      entropy: clamp(0.35 + 0.6 * (em.cadence?.anisotropy || 0.5), 0, 1)
    };
  },
  
  collapse(em, base) {
    return {
      ...base,
      centerBias: clamp(em.scale?.density || 0.5, 0, 1),
      decayRate: clamp(0.2 + 0.7 * (em.cadence?.pulse || 0.5), 0, 1),
      fragmentation: quantize(em.cadence?.anisotropy || 0.5, 3, 9)
    };
  },
  
  threshold(em, base) {
    return {
      ...base,
      edgeStrength: clamp(0.5 + 0.5 * (em.families?.gridness || em.cadence?.anisotropy || 0.4), 0, 1),
      contrast: clamp(0.4 + 0.6 * (em.scale?.density || 0.5), 0, 1),
      bandCount: quantize(em.scale?.granularity || 0.5, 4, 24)
    };
  }
};

// Parameter validation contracts per family
function assertParams(params, family) {
  const required = {
    radiance: ['intensity', 'rays', 'glow', 'burst', 'seed', 'paletteIntent'],
    interference: ['frequencyA', 'frequencyB', 'phase', 'amplitude', 'seed', 'paletteIntent'],
    spiral: ['turns', 'tightness', 'armCount', 'seed', 'paletteIntent'],
    balance: ['axisTilt', 'weights', 'tension', 'seed', 'paletteIntent'],
    chaos: ['noiseScale', 'seedJitter', 'entropy', 'seed', 'paletteIntent'],
    collapse: ['centerBias', 'decayRate', 'fragmentation', 'seed', 'paletteIntent'],
    threshold: ['edgeStrength', 'contrast', 'bandCount', 'seed', 'paletteIntent']
  }[family];
  
  if (!required) {
    throw new Error(`[UPA] No validation contract for family: ${family}`);
  }
  
  for (const key of required) {
    if (params[key] === undefined) {
      throw new Error(`[UPA] ${family} missing required parameter: ${key}`);
    }
  }
}

// Main UPA interface
export const UPA = {
  fromEM(em) {
    if (!em || !em.families) {
      throw new Error('[UPA] Invalid EM object - missing families');
    }
    
    // Determine family from EM (should match orchestrator logic)
    const family = em.family || this.deriveFamilyFromEM(em);
    
    // Get base common parameters
    const base = baseCommon({ ...em, family });
    
    // Apply family-specific adapter
    const adapter = familyAdapters[family];
    if (!adapter) {
      throw new Error(`[UPA] No adapter for family: ${family}`);
    }
    
    const params = adapter(em, base);
    
    // Add source tracking for deprecation metrics
    params.__source = 'UPA';
    params.__family = family;
    params.__timestamp = Date.now();
    
    // Validate required parameters
    assertParams(params, family);
    
    console.log(`[UPA] Generated parameters for ${family}:`, {
      family,
      seed: params.seed,
      paletteIntent: params.paletteIntent,
      secondary: params.secondary?.family || null,
      keyParams: Object.keys(params).filter(k => !k.startsWith('__')).slice(0, 5)
    });
    
    return params;
  },
  
  // Derive family from EM energies (fallback if not provided)
  deriveFamilyFromEM(em) {
    const families = em.families || {};
    const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
    const topFamily = ranked[0];
    
    if (!topFamily) {
      throw new Error('[UPA] No family energies found in EM');
    }
    
    // Map EM family names to renderer names
    const familyMap = {
      'gridness': 'grid',
      'stratification': 'strata', 
      'flux': 'flow',
      'constellation': 'constellation'
    };
    
    return familyMap[topFamily[0]] || topFamily[0];
  }
};

// Global registration for backward compatibility
if (typeof window !== 'undefined') {
  window.UPA = UPA;
  console.log('[UPA] Universal Parameter Adapter loaded - bridge for orphaned families');
}