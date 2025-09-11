// Flow Family Binding - v2.5.1
// Maps EM energies to flow-specific parameters
import { validateFamilyBinding } from '../contracts.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));

export function fromEM(em) {
  if (!em || !em.families) {
    throw new Error('[FlowBinding] Invalid EM object - missing families');
  }
  
  // Core binding outputs
  const scale = clamp(em.scale?.density || 0.5, 0.5, 2.0);
  const seed = String(em.seed);
  
  // Sacred Palette integration - flow uses oceanic palette
  const palette = {
    name: 'oceanic',
    intent: 'flow'
  };
  
  // Map EM energies to flow-specific knobs
  const velocity = clamp(em.families?.flux || 0.5, 0, 1);
  const turbulence = clamp(0.05 + 0.6 * (em.families?.flux || 0.5), 0.05, 0.65);
  const directionality = clamp(em.cadence?.anisotropy || 0.5, 0, 1);
  
  const knobs = {
    velocity,
    turbulence,
    direction: directionality
  };
  
  // Secondary family micro-blending
  const secondary = em.secondary_affinity > 0.65 ? {
    family: getSecondaryFamily(em),
    strength: Math.min(0.2, em.secondary_affinity - 0.65)
  } : undefined;
  
  const out = {
    family: 'Flow',
    seed,
    palette,
    scale,
    knobs,
    secondary,
    __contract: 'binding-2.5.1'
  };
  
  validateFamilyBinding('Flow', out);
  
  console.log(`[FlowBinding] Generated parameters:`, {
    family: out.family,
    seed: out.seed,
    velocity: knobs.velocity.toFixed(2),
    turbulence: knobs.turbulence.toFixed(2),
    secondary: secondary?.family || null
  });
  
  return out;
}

function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}