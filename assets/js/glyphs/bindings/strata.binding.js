// Strata renderer binding - translates EM energies to Strata parameters

const StrataBinding = {
  // Renderer selection logic
  choose() { 
    return 'Strata'; 
  },
  
  // Parameter derivation from EM
  params({ families, cadence, scale, seed }) {
    // Layer count from stratification energy
    const layers = 3 + Math.round(7 * families.stratification);
    
    // Drift increases with pulse (breathing layers)
    const drift = 0.01 + 0.08 * cadence.pulse;
    
    // Opacity variation inversely related to granularity
    const opacityVar = 0.05 + 0.25 * (1 - scale.granularity);
    
    // Fossil links when grid energy present but less than stratification
    const fossilLinks = families.gridness > 0.3 && 
                        families.gridness < families.stratification;
    
    // Erosion effect from flux energy
    const erosion = Math.max(0, Math.min(1,
      0.1 + 0.6 * families.flux
    ));
    
    // Layer thickness variation
    const thicknessVariation = Math.max(0.1, Math.min(0.8,
      0.1 + 0.7 * scale.density
    ));
    
    // Temporal markers from historical depth
    const temporalMarkers = families.stratification > 0.6;
    
    // Sediment texture from contemplative energy
    const sedimentGranularity = Math.max(0.2, Math.min(0.9,
      0.2 + 0.7 * families.constellation
    ));
    
    return {
      layers,
      drift,
      opacityVar,
      fossilLinks,
      erosion,
      thicknessVariation,
      temporalMarkers,
      sedimentGranularity,
      animationSpeed: 0.1 + 0.2 * drift,
      seed: window.hashSeedNumeric ? window.hashSeedNumeric(seed + ':Strata') : seed,
      paletteIntent: 'sediment'
    };
  }
};

// Export to global scope
if (typeof window !== 'undefined') {
  window.StrataBinding = StrataBinding;
}