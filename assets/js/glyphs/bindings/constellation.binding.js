// Constellation renderer binding - translates EM energies to Constellation parameters

const ConstellationBinding = {
  // Renderer selection logic
  choose() { 
    return 'Constellation'; 
  },
  
  // Parameter derivation from EM
  params({ families, cadence, scale, seed }) {
    // Star count from constellation energy
    const starCount = 80 + Math.round(240 * families.constellation);
    
    // Clustering increases with pulse (rhythmic grouping)
    const clustering = 0.15 + 0.5 * cadence.pulse;
    
    // Graph bias from anisotropy (directional connections)
    const graphBias = cadence.anisotropy;
    
    // Connection distance from stratification (temporal links)
    const connectionDistance = Math.max(50, Math.min(200,
      50 + 150 * families.stratification
    ));
    
    // Brightness variation from flux
    const brightnessVariation = Math.max(0.2, Math.min(0.8,
      0.2 + 0.6 * families.flux
    ));
    
    // Pulse speed from velocity
    const pulseSpeed = 0.5 + 1.0 * scale.density;
    
    // Drift from contemplative energy
    const driftSpeed = Math.max(0.1, Math.min(0.5,
      0.1 + 0.4 * families.stratification
    ));
    
    // Connection probability based on gridness
    const connectionProbability = Math.max(0.1, Math.min(0.4,
      0.1 + 0.3 * families.gridness
    ));
    
    // Constellation pattern type
    const constellationPattern = 
      families.constellation > 0.7 ? 'mythic' :
      families.gridness > 0.5 ? 'geometric' :
      families.flux > 0.5 ? 'dynamic' : 'organic';
    
    return {
      starCount,
      clusterTightness: clustering,
      connectionDistance,
      connectionProbability,
      pulseSpeed,
      driftSpeed,
      brightness: 0.4 + 0.4 * brightnessVariation,
      constellationPattern,
      graphBias,
      animationSpeed: 0.3 + 0.4 * pulseSpeed,
      seed: window.hashSeedNumeric ? window.hashSeedNumeric(seed + ':Constellation') : seed,
      paletteIntent: 'astral'
    };
  }
};

// Export to global scope
if (typeof window !== 'undefined') {
  window.ConstellationBinding = ConstellationBinding;
}