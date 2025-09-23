// Expression Model (EM) — neutral energies any renderer/organ can consume
// Input: Meaning Model (MM)
// Output: Renderer-neutral energies for visual/typographic/sonic expression

// Defensive coercion functions for resilience
function coerceIntent(x) {
  if (x && typeof x === 'object') return x;
  // tolerate legacy string "analytical:0.00, ..."
  if (typeof x === 'string') {
    const out = { analytical: 0, contemplative: 0, ritual: 0, contested: 0 };
    x.split(',').forEach(pair => {
      const [k, v] = pair.split(':').map(s => s.trim());
      if (k in out) out[k] = Number(v) || 0;
    });
    return out;
  }
  return { analytical: 0, contemplative: 0, ritual: 0, contested: 0 };
}

function coerceTexture(x) {
  const base = { structural_complexity: 0, historical_depth: 0, personal_intimacy: 0, cyclicality: 0 };
  if (x && typeof x === 'object') return { ...base, ...x };
  if (typeof x === 'string') {
    x.split(',').forEach(pair => {
      const [k, v] = pair.split(':').map(s => s.trim());
      if (k in base) base[k] = Number(v) || 0;
    });
  }
  return base;
}

function coerceDynamics(x) {
  const base = { velocity: 0, entropy: 0, polarity: 0 };
  if (x && typeof x === 'object') return { ...base, ...x };
  if (typeof x === 'string') {
    x.split(',').forEach(pair => {
      const [k, v] = pair.split(':').map(s => s.trim());
      if (k in base) base[k] = Number(v) || 0;
    });
  }
  return base;
}

export function buildEM(mm) {
  const c01 = x => Math.max(0, Math.min(1, x ?? 0));
  
  // Defensive coercion - ensure we have objects, not strings
  const intent = coerceIntent(mm.intent);
  const texture = coerceTexture(mm.texture);
  const dynamics = coerceDynamics(mm.dynamics);
  
  // Family energies - which renderer family best expresses this meaning
  const gridness = c01(
    0.65 * intent.analytical + 
    0.35 * texture.structural_complexity
  );
  
  const stratification = c01(
    0.55 * texture.historical_depth + 
    0.35 * intent.contemplative + 
    0.10 * texture.cyclicality
  );
  
  const flux = c01(
    0.50 * dynamics.velocity + 
    0.30 * dynamics.entropy + 
    0.20 * intent.contested
  );
  
  const constellation = c01(
    0.60 * intent.ritual + 
    0.30 * texture.cyclicality + 
    0.10 * intent.contemplative
  );
  
  // Cadence energies - rhythm and directionality
  const cadence = {
    pulse: c01(texture.cyclicality),
    anisotropy: c01(0.2 + 0.8 * intent.analytical) // argument directionality proxy
  };
  
  // Scale energies - density and granularity
  const scale = {
    density: c01(dynamics.entropy),
    granularity: c01(0.25 + 0.75 * texture.structural_complexity)
  };
  
  // Calculate secondary affinity for micro-blending
  const familyValues = [gridness, stratification, flux, constellation];
  familyValues.sort((a, b) => b - a);
  const secondary_affinity = familyValues[1] || 0; // Second highest family strength
  
  // Package for consumption
  const em = {
    families: { gridness, stratification, flux, constellation },
    cadence,
    scale,
    secondary_affinity,
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

// ES Module exports only - no globals
console.log('⚡ Expression Model (EM) builder loaded (ESM)');