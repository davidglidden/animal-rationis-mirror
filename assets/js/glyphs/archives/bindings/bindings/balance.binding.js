// Balance Family Binding - v2.5.1
// Maps EM energies to balance-specific parameters
import { validateFamilyBinding } from '../contracts.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));

export function fromEM(em) {
  if (!em || !em.families) {
    throw new Error('[BalanceBinding] Invalid EM object - missing families');
  }
  
  // Core binding outputs
  const scale = clamp(em.scale?.density || 0.5, 0.5, 2.0);
  const seed = String(em.seed);
  
  // Sacred Palette integration - balance uses equilibrium palette
  const palette = {
    name: 'equilibrium',
    intent: 'balance'
  };
  
  // Map EM energies to balance-specific knobs
  const knobs = {
    axisTilt: (em.cadence?.anisotropy || 0.5) * 45, // degrees
    weights: clamp(em.scale?.density || 0.5, 0, 1),
    tension: clamp(em.cadence?.pulse || 0.5, 0, 1)
  };
  
  // Secondary family micro-blending
  const secondary = em.secondary_affinity > 0.65 ? {
    family: getSecondaryFamily(em),
    strength: Math.min(0.2, em.secondary_affinity - 0.65)
  } : undefined;
  
  const out = {
    family: 'Balance',
    seed,
    palette,
    scale,
    knobs,
    secondary,
    __contract: 'binding-2.5.1'
  };
  
  validateFamilyBinding('Balance', out);
  
  console.log(`[BalanceBinding] Generated parameters:`, {
    family: out.family,
    seed: out.seed,
    axisTilt: knobs.axisTilt.toFixed(1),
    tension: knobs.tension.toFixed(2),
    secondary: secondary?.family || null
  });
  
  return out;
}

function getSecondaryFamily(em) {
  const families = { ...em.families };
  const ranked = Object.entries(families).sort(([,a], [,b]) => b - a);
  return ranked[1] ? ranked[1][0] : null;
}