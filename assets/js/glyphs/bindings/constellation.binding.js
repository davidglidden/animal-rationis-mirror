// Constellation Family Binding - v2.5.1
// Maps EM energies to constellation-specific parameters
import { validateFamilyBinding } from '../contracts.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const quantize = (x, min, max) => Math.round(min + (max - min) * clamp(x, 0, 1));

export function fromEM(em) {
  if (!em || !em.families) {
    throw new Error('[ConstellationBinding] Invalid EM object - missing families');
  }
  
  // Core binding outputs
  const scale = clamp(em.scale?.density || 0.5, 0.5, 2.0);
  const seed = String(em.seed);
  
  // Sacred Palette integration - constellation uses cosmic palette
  const palette = {
    name: 'cosmic',
    intent: 'constellation'
  };
  
  // Map EM energies to constellation-specific knobs
  const knobs = {
    starCount: quantize(em.families?.constellation || 0.5, 20, 100),
    brightness: clamp(0.2 + 0.8 * (em.families?.constellation || 0.5), 0.2, 1.0),
    connections: clamp(0.05 + 0.4 * (em.scale?.granularity || 0.5), 0.05, 0.45)
  };
  
  // Secondary family micro-blending
  const secondary = em.secondary_affinity > 0.65 ? {
    family: getSecondaryFamily(em),
    strength: Math.min(0.2, em.secondary_affinity - 0.65)
  } : undefined;
  
  const out = {
    family: 'Constellation',
    seed,
    palette,
    scale,
    knobs,
    secondary,
    __contract: 'binding-2.5.1'
  };
  
  validateFamilyBinding('Constellation', out);
  
  console.log(`[ConstellationBinding] Generated parameters:`, {
    family: out.family,
    seed: out.seed,
    starCount: knobs.starCount,
    brightness: knobs.brightness.toFixed(2),
    secondary: secondary?.family || null
  });
  
  return out;
}

function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}