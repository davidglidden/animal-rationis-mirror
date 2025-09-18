// Radiance Family Binding - v2.5.1
// Maps EM energies to radiance-specific parameters
import { validateFamilyBinding } from '../contracts.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const quantize = (x, min, max) => Math.round(min + (max - min) * clamp(x, 0, 1));

export function fromEM(em) {
  if (!em || !em.families) {
    throw new Error('[RadianceBinding] Invalid EM object - missing families');
  }
  
  // Core binding outputs
  const scale = clamp(em.scale?.density || 0.5, 0.5, 2.0);
  const seed = String(em.seed);
  
  // Sacred Palette integration - radiance uses luminous palette
  const palette = {
    name: 'luminous',
    intent: 'radiance'
  };
  
  // Map EM energies to radiance-specific knobs
  const knobs = {
    intensity: clamp(em.cadence?.pulse || 0.5, 0, 1),
    rayCount: quantize(em.scale?.granularity || 0.4, 16, 128),
    glow: clamp(em.scale?.density || 0.5, 0, 1),
    burst: quantize(em.cadence?.pulse || 0.5, 3, 8)
  };
  
  // Secondary family micro-blending (when affinity > 0.65, cap at 0.2)
  const secondary = em.secondary_affinity > 0.65 ? {
    family: getSecondaryFamily(em),
    strength: Math.min(0.2, em.secondary_affinity - 0.65)
  } : undefined;
  
  const out = {
    family: 'Radiance',
    seed,
    palette,
    scale,
    knobs,
    secondary,
    __contract: 'binding-2.5.1'
  };
  
  validateFamilyBinding('Radiance', out);
  
  console.log(`[RadianceBinding] Generated parameters:`, {
    family: out.family,
    seed: out.seed,
    rayCount: knobs.rayCount,
    intensity: knobs.intensity,
    secondary: secondary?.family || null
  });
  
  return out;
}

// Helper to determine secondary family from EM energies
function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}