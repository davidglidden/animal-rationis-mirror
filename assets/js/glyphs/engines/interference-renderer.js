// Interference Family Glyph Renderer
// Creates wave interference patterns - constructive and destructive
class InterferenceRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.visualParams = params;
    
    // PRIME DIRECTIVE: Use semantic parameters for dramatic structural differentiation
    this.semanticParams = this.extractSemanticParameters(params);
    
    this.params = {
      waveCount: this.semanticParams.waveCount,
      frequency: this.semanticParams.frequency,
      amplitude: this.semanticParams.amplitude,
      phase: this.semanticParams.phase,
      interferenceType: this.semanticParams.interferenceType,
      colorIntensity: this.semanticParams.colorIntensity,
      animationSpeed: this.semanticParams.animationSpeed,
      sourceSpacing: this.semanticParams.sourceSpacing,
      resolution: this.semanticParams.resolution,
      waveDecay: this.semanticParams.waveDecay,
      ...params
    };
    this.time = 0;
    this.animationId = null;
    
    console.log(`🎨 Interference renderer initialized with semantic differentiation:`, {
      type: this.semanticParams.interferenceType,
      waves: this.semanticParams.waveCount,
      frequency: this.semanticParams.frequency,
      amplitude: this.semanticParams.amplitude,
      entropy: this.semanticParams.entropyScore
    });
  }
  
  // Extract semantic parameters for dramatic visual differentiation
  extractSemanticParameters(params) {
    // Get semantic genome data
    const genome = params.genome || {};
    const archetype = params.archetype || 'interfering';
    const entropyScore = params.entropyScore || 0.5;
    const conceptualDNA = params.conceptualDNA || [];
    
    // Base parameters influenced by semantic content
    const baseSpeed = (window.SacredPalette?.timing?.shiftRate || 0.0005) * 20;
    
    // Dramatically different patterns based on semantic content
    const semanticInfluences = {
      // Interference type based on resonance patterns
      interferenceType: this.selectInterferenceType(genome, conceptualDNA),
      
      // Wave count based on complexity and branching
      waveCount: Math.floor(2 + (genome.topology?.branchingFactor || 1) * 2 + 
                           (genome.complexity?.nestingLevel || 3) * 0.5), // 2-8 waves
      
      // Frequency based on temporal velocity and resonance
      frequency: 0.01 + (genome.temporality?.velocity || 0) * 0.03 + 
                 (genome.resonance?.resonantFrequency || 0.5) * 0.04, // 0.01-0.08
      
      // Amplitude based on intensity and dynamics
      amplitude: 20 + (genome.dynamics?.acceleration || 0.1) * 40 + 
                 (genome.resonance?.harmonicComplexity || 0.3) * 30, // 20-80
      
      // Phase based on temporal flow and entropy
      phase: (entropyScore * Math.PI * 2) + 
             (genome.temporality?.sequentialFlow || 0.1) * Math.PI, // 0-3π
      
      // Color intensity based on resonance and visibility
      colorIntensity: 0.5 + (genome.resonance?.harmonicComplexity || 0.3) * 0.5, // 0.5-1.0
      
      // Animation speed based on temporal dynamics
      animationSpeed: baseSpeed * (1 + (genome.temporality?.velocity || 0) * 3), // Variable speed
      
      // Source spacing based on topology
      sourceSpacing: 40 + (genome.topology?.branchingFactor || 1) * 30, // 40-100
      
      // Resolution based on complexity (lower = higher detail)
      resolution: Math.max(1, Math.floor(4 - (genome.complexity?.nestedComplexity || 0) * 3)), // 1-4
      
      // Wave decay based on temporal persistence
      waveDecay: 0.1 + (1 - (genome.temporality?.sequentialFlow || 0.1)) * 0.4, // 0.1-0.5
      
      // Store for later use
      entropyScore: entropyScore,
      genome: genome,
      archetype: archetype
    };
    
    return semanticInfluences;
  }
  
  // Select interference type based on semantic content
  selectInterferenceType(genome, conceptualDNA) {
    const resonance = genome.resonance || {};
    const dynamics = genome.dynamics || {};
    
    // PRIME DIRECTIVE: Use base semantic renderer for consistent analysis
    const baseRenderer = new (window.BaseSemanticRenderer || function(){})();
    
    // Define semantic analysis configuration
    const interferenceAnalysis = {
      hasConstructive: {
        family: 'harmonic',
        keywords: ['constructive', 'harmony', 'amplification', 'resonance', 'coherence', 'synchrony', 'alignment'],
        threshold: 0.6
      },
      hasDestructive: {
        family: 'oppositional',
        keywords: ['destructive', 'cancellation', 'opposing', 'discord', 'interference', 'conflict', 'negation'],
        threshold: 0.6
      },
      hasMixed: {
        family: 'complex',
        keywords: ['mixed', 'complex', 'varied', 'chaotic', 'turbulent', 'heterogeneous', 'composite'],
        threshold: 0.6
      }
    };
    
    // Perform semantic analysis
    const results = baseRenderer.analyzeConceptsWithFamilies ? 
      baseRenderer.analyzeConceptsWithFamilies(conceptualDNA, interferenceAnalysis) :
      { hasConstructive: false, hasDestructive: false, hasMixed: false };
    
    // Interference type selection based on semantic analysis
    if (results.hasConstructive || (resonance.harmonicComplexity || 0) > 0.6) {
      return 'constructive';
    } else if (results.hasDestructive || (resonance.dissonanceLevel || 0) > 0.4) {
      return 'destructive';
    } else if (results.hasMixed || dynamics.acceleration > 0.3) {
      return 'mixed';
    } else {
      // Default based on structural characteristics
      if ((resonance.harmonicComplexity || 0) > 0.4) {
        return 'constructive';
      } else if ((resonance.dissonanceLevel || 0) > 0.3) {
        return 'destructive';
      } else {
        return 'mixed';
      }
    }
  }

  start() {
    if (this.animationId) this.stop();
    this.animate();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  animate() {
    this.render();
    this.time += this.params.animationSpeed;
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create interference pattern with semantic resolution
    const resolution = this.params.resolution;
    for (let x = 0; x < width; x += resolution) {
      for (let y = 0; y < height; y += resolution) {
        let amplitude = 0;
        
        // Calculate interference from multiple wave sources
        for (let i = 0; i < this.params.waveCount; i++) {
          const sourceAngle = i * Math.PI * 2 / this.params.waveCount;
          const sourceX = centerX + Math.cos(sourceAngle) * this.params.sourceSpacing;
          const sourceY = centerY + Math.sin(sourceAngle) * this.params.sourceSpacing;
          
          const distance = Math.sqrt((x - sourceX) ** 2 + (y - sourceY) ** 2);
          const decayFactor = Math.exp(-distance * this.params.waveDecay * 0.01);
          const wave = Math.sin(distance * this.params.frequency + this.time + this.params.phase + i * Math.PI / 4) * decayFactor;
          
          // Apply semantic interference patterns
          switch (this.params.interferenceType) {
            case 'destructive':
              amplitude += wave * (i % 2 === 0 ? 1 : -1);
              break;
            case 'mixed':
              amplitude += wave * (Math.sin(i * Math.PI / 3) > 0 ? 1 : -0.7);
              break;
            default: // constructive
              amplitude += wave;
          }
        }
        
        // Normalize and apply interference colors
        const intensity = Math.abs(amplitude) / this.params.waveCount;
        const alpha = intensity * this.params.colorIntensity;
        
        // SEMANTIC COLOR INTEGRATION
        let pixelColor;
        if (this.visualParams && this.visualParams.semanticColor) {
          // Use semantically extracted colors filtered through AldineXXI aesthetic harmonizer
          if (intensity > 0.7) {
            pixelColor = this.visualParams.getHarmonizedRgba(alpha);
          } else if (intensity > 0.4) {
            pixelColor = this.visualParams.getHarmonizedRgba(alpha * 0.8);
          } else {
            pixelColor = this.visualParams.getHarmonizedRgba(alpha * 0.6);
          }
        } else {
          // Fallback to Sacred Palette interference colors - "necessary discord, weathered"
          const palette = window.SacredPalette?.families?.interference || {
            primary: '#A67373', secondary: '#6B6B6B', accent: '#8B7D8B'
          };
          
          // Choose color based on interference pattern intensity
          let baseColor;
          if (intensity > 0.7) {
            baseColor = palette.primary; // Muted crimson for high intensity
          } else if (intensity > 0.4) {
            baseColor = palette.accent;   // Bruised plum for medium
          } else {
            baseColor = palette.secondary; // Graphite for low
          }
          
          // Apply breathing and weathering effects
          const weathered = window.SacredPalette?.utils?.weather ?
            window.SacredPalette.utils.weather(baseColor, 0.3) : baseColor;
          const breathed = window.SacredPalette?.utils?.breathe ?
            window.SacredPalette.utils.breathe(weathered, this.time, intensity * 0.1) : weathered;
          
          // Convert hex to rgba with intensity-based alpha
          const rgb = window.SacredPalette?.utils?.hexToRgb(breathed);
          if (rgb) {
            pixelColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
          }
        }
        
        if (pixelColor) {
          this.ctx.fillStyle = pixelColor;
          this.ctx.fillRect(x, y, resolution, resolution);
        }
      }
    }
  }

  destroy() {
    this.stop();
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.Interference = InterferenceRenderer;
}