// Threshold Family Binding - v2.5.1
// Maps EM energies to threshold-specific parameters
import { validateFamilyBinding } from '../contracts.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const quantize = (x, min, max) => Math.round(min + (max - min) * clamp(x, 0, 1));

export function fromEM(em) {
  if (!em || !em.families) {
    throw new Error('[ThresholdBinding] Invalid EM object - missing families');
  }
  
  // Core binding outputs
  const scale = clamp(em.scale?.density || 0.5, 0.5, 2.0);
  const seed = String(em.seed);
  
  // Sacred Palette integration - threshold uses liminal palette
  const palette = {
    name: 'liminal',
    intent: 'threshold'
  };
  
  // Map EM energies to threshold-specific knobs
  const knobs = {
    edgeStrength: clamp(0.5 + 0.5 * (em.families?.gridness || em.cadence?.anisotropy || 0.4), 0, 1),
    contrast: clamp(0.4 + 0.6 * (em.scale?.density || 0.5), 0, 1),
    bandCount: quantize(em.scale?.granularity || 0.5, 4, 24)
  };
  
  // Secondary family micro-blending
  const secondary = em.secondary_affinity > 0.65 ? {
    family: getSecondaryFamily(em),
    strength: Math.min(0.2, em.secondary_affinity - 0.65)
  } : undefined;
  
  const out = {
    family: 'Threshold',
    seed,
    palette,
    scale,
    knobs,
    secondary,
    __contract: 'binding-2.5.1'
  };
  
  validateFamilyBinding('Threshold', out);
  
  console.log(`[ThresholdBinding] Generated parameters:`, {
    family: out.family,
    seed: out.seed,
    edgeStrength: knobs.edgeStrength.toFixed(2),
    bandCount: knobs.bandCount,
    secondary: secondary?.family || null
  });
  
  return out;
}

function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}