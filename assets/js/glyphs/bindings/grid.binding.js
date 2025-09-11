// Grid Family Binding - v2.5.1
// Maps EM energies to grid-specific parameters
import { validateFamilyBinding } from '../contracts.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));

export function fromEM(em) {
  if (!em || !em.families) {
    throw new Error('[GridBinding] Invalid EM object - missing families');
  }
  
  // Core binding outputs
  const scale = clamp(em.scale?.density || 0.5, 0.5, 2.0);
  const seed = String(em.seed);
  
  // Sacred Palette integration - grid uses structural palette
  const palette = {
    name: 'structural',
    intent: 'grid'
  };
  
  // Map EM energies to grid-specific knobs
  const knobs = {
    gridness: clamp(em.families?.gridness || 0.5, 0, 1),
    granularity: clamp(em.scale?.granularity || 0.5, 0, 1),
    orthogonality: clamp(0.3 + 0.7 * (em.families?.gridness || 0.5), 0.3, 1.0)
  };
  
  // Secondary family micro-blending
  const secondary = em.secondary_affinity > 0.65 ? {
    family: getSecondaryFamily(em),
    strength: Math.min(0.2, em.secondary_affinity - 0.65)
  } : undefined;
  
  const out = {
    family: 'Grid',
    seed,
    palette,
    scale,
    knobs,
    secondary,
    __contract: 'binding-2.5.1'
  };
  
  validateFamilyBinding('Grid', out);
  
  console.log(`[GridBinding] Generated parameters:`, {
    family: out.family,
    seed: out.seed,
    gridness: knobs.gridness.toFixed(2),
    orthogonality: knobs.orthogonality.toFixed(2),
    secondary: secondary?.family || null
  });
  
  return out;
}

function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}