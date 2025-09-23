// Interference Family Binding - v2.5.1
// Maps EM energies to interference-specific parameters
import { validateFamilyBinding } from '../contracts.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const quantize = (x, min, max) => Math.round(min + (max - min) * clamp(x, 0, 1));

export function fromEM(em) {
  if (!em || !em.families) {
    throw new Error('[InterferenceBinding] Invalid EM object - missing families');
  }
  
  // Core binding outputs
  const scale = clamp(em.scale?.density || 0.5, 0.5, 2.0);
  const seed = String(em.seed);
  
  // Sacred Palette integration - interference uses wave palette
  const palette = {
    name: 'wave',
    intent: 'interference'
  };
  
  // Map EM energies to interference-specific knobs
  const knobs = {
    waveCount: quantize(em.scale?.granularity || 0.5, 2, 6),
    phase: (em.cadence?.pulse || 0.0) * Math.PI * 2,
    amplitude: clamp(em.families?.flux || 0.5, 0, 1)
  };
  
  // Secondary family micro-blending
  const secondary = em.secondary_affinity > 0.65 ? {
    family: getSecondaryFamily(em),
    strength: Math.min(0.2, em.secondary_affinity - 0.65)
  } : undefined;
  
  const out = {
    family: 'Interference',
    seed,
    palette,
    scale,
    knobs,
    secondary,
    __contract: 'binding-2.5.1'
  };
  
  validateFamilyBinding('Interference', out);
  
  console.log(`[InterferenceBinding] Generated parameters:`, {
    family: out.family,
    seed: out.seed,
    waveCount: knobs.waveCount,
    phase: knobs.phase.toFixed(2),
    secondary: secondary?.family || null
  });
  
  return out;
}

function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}