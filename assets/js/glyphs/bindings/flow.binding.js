// Flow renderer binding - translates EM energies to Flow parameters

const FlowBinding = {
  // Renderer selection logic
  choose() { 
    return 'Flow'; 
  },
  
  // Parameter derivation from EM
  params({ families, cadence, scale, seed }) {
    const circularity = Math.max(0, Math.min(1, cadence.pulse));
    const velocity = families.flux;
    const density = scale.density;
    
    // Pattern selection based on energies
    const pattern = (circularity > 0.7) ? 'spiral'
                  : (velocity > 0.6) ? 'jet'
                  : (density > 0.55) ? 'eddy' 
                  : 'laminar';
    
    // Particle count scales with granularity
    const particleCount = Math.max(200, Math.min(1400, 
      Math.round(200 + 1200 * scale.granularity)
    ));
    
    // Turbulence increases with flux
    const turbulence = Math.max(0.05, Math.min(0.65, 
      0.05 + 0.6 * families.flux
    ));
    
    // Viscosity decreases with anisotropy (more directed = less viscous)
    const viscosity = Math.max(0.65, Math.min(0.98, 
      0.65 + 0.3 * (1 - cadence.anisotropy)
    ));
    
    // Trail length from contemplative energy
    const trailLength = Math.max(0.3, Math.min(0.95,
      0.3 + 0.65 * families.stratification
    ));
    
    return {
      pattern,
      particleCount,
      turbulence,
      viscosity,
      trailLength,
      animationSpeed: 0.5 + 0.5 * velocity,
      seed: window.hashSeedNumeric ? window.hashSeedNumeric(seed + ':Flow') : seed,
      paletteIntent: families.flux > 0.6 ? 'fire' : 'water'
    };
  }
};

// Export to global scope
if (typeof window !== 'undefined') {
  window.FlowBinding = FlowBinding;
}