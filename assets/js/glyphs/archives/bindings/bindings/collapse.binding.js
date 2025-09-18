// Collapse Family Binding - v2.5.1
// Maps EM energies to collapse-specific parameters
import { validateFamilyBinding } from '../contracts.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const quantize = (x, min, max) => Math.round(min + (max - min) * clamp(x, 0, 1));

export function fromEM(em) {
  if (!em || !em.families) {
    throw new Error('[CollapseBinding] Invalid EM object - missing families');
  }
  
  // Core binding outputs
  const scale = clamp(em.scale?.density || 0.5, 0.5, 2.0);
  const seed = String(em.seed);
  
  // Sacred Palette integration - collapse uses monochrome palette
  const palette = {
    name: 'monochrome',
    intent: 'collapse'
  };
  
  // Map EM energies to collapse-specific knobs
  const knobs = {
    centerBias: clamp(em.scale?.density || 0.5, 0, 1),
    decayRate: clamp(0.2 + 0.7 * (em.cadence?.pulse || 0.5), 0, 1),
    fragmentation: quantize(em.cadence?.anisotropy || 0.5, 3, 9)
  };
  
  // Secondary family micro-blending
  const secondary = em.secondary_affinity > 0.65 ? {
    family: getSecondaryFamily(em),
    strength: Math.min(0.2, em.secondary_affinity - 0.65)
  } : undefined;
  
  const out = {
    family: 'Collapse',
    seed,
    palette,
    scale,
    knobs,
    secondary,
    __contract: 'binding-2.5.1'
  };
  
  validateFamilyBinding('Collapse', out);
  
  console.log(`[CollapseBinding] Generated parameters:`, {
    family: out.family,
    seed: out.seed,
    decayRate: knobs.decayRate.toFixed(2),
    fragmentation: knobs.fragmentation,
    secondary: secondary?.family || null
  });
  
  return out;
}

function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}