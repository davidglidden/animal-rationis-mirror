// Expression Model (EM) — neutral energies any renderer/organ can consume
// Input: Meaning Model (MM)
// Output: Renderer-neutral energies for visual/typographic/sonic expression

export function buildEM(mm) {
  const c01 = x => Math.max(0, Math.min(1, x ?? 0));
  
  // Family energies - which renderer family best expresses this meaning
  const gridness = c01(
    0.65 * mm.intent.analytical + 
    0.35 * mm.texture.structural_complexity
  );
  
  const stratification = c01(
    0.55 * mm.texture.historical_depth + 
    0.35 * mm.intent.contemplative + 
    0.10 * mm.texture.cyclicality
  );
  
  const flux = c01(
    0.50 * mm.dynamics.velocity + 
    0.30 * mm.dynamics.entropy + 
    0.20 * mm.intent.contested
  );
  
  const constellation = c01(
    0.60 * mm.intent.ritual + 
    0.30 * mm.texture.cyclicality + 
    0.10 * mm.intent.contemplative
  );
  
  // Cadence energies - rhythm and directionality
  const cadence = {
    pulse: c01(mm.texture.cyclicality),
    anisotropy: c01(0.2 + 0.8 * mm.intent.analytical) // argument directionality proxy
  };
  
  // Scale energies - density and granularity
  const scale = {
    density: c01(mm.dynamics.entropy),
    granularity: c01(0.25 + 0.75 * mm.texture.structural_complexity)
  };
  
  // Package for consumption
  const em = {
    families: { gridness, stratification, flux, constellation },
    cadence,
    scale,
    seed: mm.meta.seed
  };
  
  // Log EM construction for diagnostics
  if (typeof window !== 'undefined' && window.console) {
    console.log('⚡ EM constructed:', {
      families: Object.entries(em.families).map(([k,v]) => `${k}:${v.toFixed(2)}`).join(', '),
      cadence: `pulse:${cadence.pulse.toFixed(2)}, anisotropy:${cadence.anisotropy.toFixed(2)}`,
      scale: `density:${scale.density.toFixed(2)}, granularity:${scale.granularity.toFixed(2)}`
    });
  }
  
  return em;
}

// Utility: Select dominant family from EM
export function familyFromEM(em) {
  const f = em.families;
  const ranked = Object.entries(f).sort((a, b) => b[1] - a[1]);
  const [topName, topScore] = ranked[0];
  
  // Map to renderer family names
  const familyMap = {
    'gridness': 'grid',
    'stratification': 'strata',
    'flux': 'flow',
    'constellation': 'constellation'
  };
  
  return familyMap[topName] || 'flow'; // default fallback
}

// Export to global scope
if (typeof window !== 'undefined') {
  window.buildEM = buildEM;
  window.familyFromEM = familyFromEM;
  console.log('⚡ Expression Model (EM) builder loaded');
}