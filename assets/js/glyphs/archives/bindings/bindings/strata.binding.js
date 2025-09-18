// Strata Family Binding - v2.5.1
// Maps EM energies to strata-specific parameters
import { validateFamilyBinding } from '../contracts.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const quantize = (x, min, max) => Math.round(min + (max - min) * clamp(x, 0, 1));

export function fromEM(em) {
  if (!em || !em.families) {
    throw new Error('[StrataBinding] Invalid EM object - missing families');
  }
  
  // Core binding outputs
  const scale = clamp(em.scale?.density || 0.5, 0.5, 2.0);
  const seed = String(em.seed);
  
  // Sacred Palette integration - strata uses geological palette
  const palette = {
    name: 'geological',
    intent: 'strata'
  };
  
  // Map EM energies to strata-specific knobs
  const knobs = {
    layers: quantize(em.families?.stratification || 0.5, 4, 16),
    depth: clamp(0.2 + 0.7 * (em.families?.stratification || 0.5), 0.2, 0.9),
    density: clamp(em.scale?.density || 0.5, 0, 1)
  };
  
  // Secondary family micro-blending
  const secondary = em.secondary_affinity > 0.65 ? {
    family: getSecondaryFamily(em),
    strength: Math.min(0.2, em.secondary_affinity - 0.65)
  } : undefined;
  
  const out = {
    family: 'Strata',
    seed,
    palette,
    scale,
    knobs,
    secondary,
    __contract: 'binding-2.5.1'
  };
  
  validateFamilyBinding('Strata', out);
  
  console.log(`[StrataBinding] Generated parameters:`, {
    family: out.family,
    seed: out.seed,
    layers: knobs.layers,
    depth: knobs.depth.toFixed(2),
    secondary: secondary?.family || null
  });
  
  return out;
}

function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}