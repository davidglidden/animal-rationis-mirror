// Grid renderer binding - translates EM energies to Grid parameters

const GridBinding = {
  // Renderer selection logic - Grid or Weave variant
  choose({ families }) { 
    return families.gridness >= 0.5 ? 'Grid' : 'Weave'; 
  },
  
  // Parameter derivation from EM
  params({ families, cadence, scale, seed }) {
    // Column count increases with gridness
    const columns = 3 + Math.round(5 * families.gridness);
    const rows = Math.max(3, Math.round(columns * 0.8)); // Slightly fewer rows
    
    // Cell aspect ratio - more anisotropic = more rectangular
    const cellAspect = 0.6 + 0.6 * cadence.anisotropy;
    
    // Jitter decreases with anisotropy (more ordered)
    const jitter = 0.02 + 0.06 * (1 - cadence.anisotropy);
    
    // Line weight pulses with cadence
    const weight = 0.4 + 0.4 * cadence.pulse;
    
    // Cell size inversely related to density
    const cellSize = Math.max(6, Math.min(30, 
      Math.round(30 - 24 * scale.density)
    ));
    
    // Orthogonality from analytical intent
    const orthogonality = Math.max(0.3, Math.min(1.0,
      0.3 + 0.7 * families.gridness
    ));
    
    // Connection probability from constellation energy
    const connectionProbability = Math.max(0.05, Math.min(0.4,
      0.05 + 0.35 * families.constellation
    ));
    
    return {
      columns,
      rows,
      cellSize,
      cellAspect,
      gridJitter: jitter,
      strokeWidth: weight,
      orthogonality,
      connectionProbability,
      animationSpeed: 0.3 + 0.3 * cadence.pulse,
      seed: window.hashSeedNumeric ? window.hashSeedNumeric(seed + ':Grid') : seed,
      paletteIntent: 'earth'
    };
  }
};

// Export to global scope
if (typeof window !== 'undefined') {
  window.GridBinding = GridBinding;
}