// Binding Contract Validation - v2.5.1
// Prime Directive: Single source of truth for binding output requirements

export function assertBindingOutput(family, out, requiredKeys) {
  if (!out || typeof out !== 'object') {
    throw new Error(`[Binding] ${family}: output not an object`);
  }
  
  const keys = new Set(Object.keys(out));
  
  // Validate core structure
  for (const coreKey of ['family', 'seed', 'palette', 'scale', 'knobs']) {
    if (!keys.has(coreKey)) {
      throw new Error(`[Binding] ${family}: missing ${coreKey}`);
    }
  }
  
  // Validate contract version
  if (out.__contract !== 'binding-2.5.1' && out.__contract !== 'binding-2.5.1-adapted') {
    throw new Error(`[Binding] ${family}: invalid contract version: ${out.__contract}`);
  }
  
  // Validate knobs structure
  if (!out.knobs || typeof out.knobs !== 'object') {
    throw new Error(`[Binding] ${family}: knobs must be an object`);
  }
  
  // Validate required family-specific knobs
  if (requiredKeys) {
    for (const knobKey of requiredKeys) {
      if (!(knobKey in out.knobs)) {
        throw new Error(`[Binding] ${family}: missing required knob ${knobKey}`);
      }
    }
  }
  
  // Validate core field types
  if (typeof out.family !== 'string') {
    throw new Error(`[Binding] ${family}: family must be string`);
  }
  
  if (typeof out.seed !== 'string' && typeof out.seed !== 'number') {
    throw new Error(`[Binding] ${family}: seed must be string or number`);
  }
  
  if (typeof out.scale !== 'number' || out.scale < 0.5 || out.scale > 2.0) {
    throw new Error(`[Binding] ${family}: scale must be number between 0.5-2.0, got ${out.scale}`);
  }
  
  // Validate secondary family if present
  if (out.secondary) {
    if (typeof out.secondary !== 'object' || 
        typeof out.secondary.family !== 'string' || 
        typeof out.secondary.strength !== 'number') {
      throw new Error(`[Binding] ${family}: invalid secondary structure`);
    }
    if (out.secondary.strength < 0 || out.secondary.strength > 0.2) {
      throw new Error(`[Binding] ${family}: secondary strength must be 0-0.2, got ${out.secondary.strength}`);
    }
  }
  
  console.log(`[Contracts] ✓ ${family} binding output validated`);
}

// Family-specific required knob definitions
export const FAMILY_KNOBS = {
  Flow: ['velocity', 'turbulence', 'direction'],
  Grid: ['gridness', 'granularity', 'orthogonality'],
  Strata: ['layers', 'depth', 'density'],
  Constellation: ['starCount', 'brightness', 'connections'],
  Radiance: ['intensity', 'rayCount', 'glow', 'burst'],
  Interference: ['waveCount', 'phase', 'amplitude'],
  Spiral: ['turns', 'tightness', 'armCount'],
  Balance: ['axisTilt', 'weights', 'tension'],
  Chaos: ['noiseScale', 'entropy'],
  Collapse: ['centerBias', 'decayRate', 'fragmentation'],
  Threshold: ['edgeStrength', 'contrast', 'bandCount']
};

// Validation helper for specific families
export function validateFamilyBinding(family, out) {
  const requiredKeys = FAMILY_KNOBS[family];
  if (!requiredKeys) {
    throw new Error(`[Contracts] Unknown family: ${family}`);
  }
  assertBindingOutput(family, out, requiredKeys);
}

// ES Module exports only - no globals
console.log('[Contracts] Binding validation loaded (ESM)');