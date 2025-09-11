// Chaos Family Binding - v2.5.1
// Maps EM energies to chaos-specific parameters
import { validateFamilyBinding } from '../contracts.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));

export function fromEM(em) {
  if (!em || !em.families) {
    throw new Error('[ChaosBinding] Invalid EM object - missing families');
  }
  
  // Core binding outputs
  const scale = clamp(em.scale?.density || 0.5, 0.5, 2.0);
  const seed = String(em.seed);
  
  // Sacred Palette integration - chaos uses chaotic palette
  const palette = {
    name: 'chaotic',
    intent: 'chaos'
  };
  
  // Map EM energies to chaos-specific knobs
  const knobs = {
    noiseScale: 0.25 + 1.75 * (em.scale?.granularity || 0.5),
    entropy: clamp(0.35 + 0.6 * (em.cadence?.anisotropy || 0.5), 0, 1)
  };
  
  // Secondary family micro-blending
  const secondary = em.secondary_affinity > 0.65 ? {
    family: getSecondaryFamily(em),
    strength: Math.min(0.2, em.secondary_affinity - 0.65)
  } : undefined;
  
  const out = {
    family: 'Chaos',
    seed,
    palette,
    scale,
    knobs,
    secondary,
    __contract: 'binding-2.5.1'
  };
  
  validateFamilyBinding('Chaos', out);
  
  console.log(`[ChaosBinding] Generated parameters:`, {
    family: out.family,
    seed: out.seed,
    noiseScale: knobs.noiseScale.toFixed(2),
    entropy: knobs.entropy.toFixed(2),
    secondary: secondary?.family || null
  });
  
  return out;
}

function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}