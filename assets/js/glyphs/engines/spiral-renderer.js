// Spiral Family Glyph Renderer
// Creates various spiral patterns - fibonacci, archimedean, logarithmic
class SpiralRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.visualParams = params;
    
    // PRIME DIRECTIVE: Use semantic parameters for dramatic structural differentiation
    this.semanticParams = this.extractSemanticParameters(params);
    
    this.params = {
      spiralType: this.semanticParams.spiralType,
      arms: this.semanticParams.arms,
      growth: this.semanticParams.growth,
      rotationSpeed: this.semanticParams.rotationSpeed,
      particleCount: this.semanticParams.particleCount,
      trailLength: this.semanticParams.trailLength,
      colorShift: this.semanticParams.colorShift,
      ...params
    };
    this.time = 0;
    this.particles = [];
    this.animationId = null;
    
    console.log(`🎨 Spiral renderer initialized with semantic differentiation:`, {
      type: this.semanticParams.spiralType,
      arms: this.semanticParams.arms,
      growth: this.semanticParams.growth,
      particles: this.semanticParams.particleCount,
      entropy: this.semanticParams.entropyScore
    });
    
    this.initParticles();
  }
  
  // Extract semantic parameters for dramatic visual differentiation
  extractSemanticParameters(params) {
    // Get semantic genome data
    const genome = params.genome || {};
    const archetype = params.archetype || 'spiral';
    const entropyScore = params.entropyScore || 0.5;
    const conceptualDNA = params.conceptualDNA || [];
    
    // Base parameters influenced by semantic content
    const baseSpeed = (window.SacredPalette?.timing?.breathRate || 0.001) * 5;
    
    // Dramatically different patterns based on semantic content
    const semanticInfluences = {
      // Spiral type based on growth patterns and conceptual DNA
      spiralType: this.selectSpiralType(genome, conceptualDNA),
      
      // Arms based on branching factor and complexity
      arms: Math.floor(1 + (genome.topology?.branchingFactor || 1) * 3), // 1-7 arms
      
      // Growth rate based on temporal dynamics and self-similarity
      growth: 0.1 + (genome.complexity?.selfSimilarity || 0.2) * 0.4, // 0.1-0.5
      
      // Rotation speed based on temporal velocity and circularity
      rotationSpeed: baseSpeed * (1 + (genome.temporality?.velocity || 0) * 4) * 
                     (1 + (genome.topology?.circularityIndex || 0.1) * 2), // Variable speed
      
      // Particle count based on complexity and entropy
      particleCount: Math.floor(100 + (entropyScore * 300) + 
                                (genome.complexity?.nestedComplexity || 0) * 200), // 100-600 particles
      
      // Trail length based on temporal flow and memory
      trailLength: 0.9 + (genome.temporality?.sequentialFlow || 0.1) * 0.08, // 0.9-0.98
      
      // Color shift based on resonance and dynamics
      colorShift: (genome.resonance?.resonantFrequency || 0.5) * 
                  (genome.dynamics?.acceleration || 0.1) * 10, // 0-10 shift
      
      // Store for later use
      entropyScore: entropyScore,
      genome: genome,
      archetype: archetype
    };
    
    return semanticInfluences;
  }
  
  // Select spiral type based on semantic content
  selectSpiralType(genome, conceptualDNA) {
    const complexity = genome.complexity || {};
    const dynamics = genome.dynamics || {};
    
    // Analyze conceptual DNA for spiral type hints
    const hasFibonacci = conceptualDNA.some(concept => 
      concept && typeof concept === 'string' && 
      ['fibonacci', 'golden', 'natural', 'organic', 'growth'].includes(concept.toLowerCase())
    );
    const hasArchimedean = conceptualDNA.some(concept => 
      concept && typeof concept === 'string' && 
      ['linear', 'uniform', 'regular', 'constant', 'steady'].includes(concept.toLowerCase())
    );
    const hasLogarithmic = conceptualDNA.some(concept => 
      concept && typeof concept === 'string' && 
      ['exponential', 'accelerating', 'explosive', 'expanding', 'infinite'].includes(concept.toLowerCase())
    );
    
    // Spiral type selection based on semantic analysis
    if (hasFibonacci || (complexity.selfSimilarity > 0.4 && complexity.nestingLevel > 3)) {
      return 'fibonacci';
    } else if (hasArchimedean || complexity.selfSimilarity > 0.6) {
      return 'archimedean';
    } else if (hasLogarithmic || dynamics.acceleration > 0.3) {
      return 'logarithmic';
    } else {
      // Default based on structural characteristics
      if (complexity.selfSimilarity > 0.5) {
        return 'fibonacci';
      } else if (dynamics.acceleration > 0.2) {
        return 'logarithmic';
      } else {
        return 'archimedean';
      }
    }
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.params.particleCount; i++) {
      this.particles.push({
        angle: (i / this.params.particleCount) * Math.PI * 2 * this.params.arms,
        radius: i * 0.5,
        life: Math.random(),
        speed: 0.5 + Math.random() * 0.5
      });
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
    this.time += this.params.rotationSpeed;
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  getSpiralPosition(angle, index) {
    let radius;
    const { width, height } = this.canvas;
    const scale = Math.min(width, height) * 0.3;
    
    switch (this.params.spiralType) {
      case 'fibonacci':
        const phi = (1 + Math.sqrt(5)) / 2;
        radius = Math.sqrt(index) * this.params.growth * phi;
        break;
      case 'archimedean':
        radius = this.params.growth * angle;
        break;
      case 'logarithmic':
        radius = Math.exp(angle * this.params.growth * 0.1);
        break;
      default:
        radius = index * this.params.growth;
    }
    
    return {
      x: width / 2 + Math.cos(angle + this.time) * radius * scale / 100,
      y: height / 2 + Math.sin(angle + this.time) * radius * scale / 100
    };
  }

  render() {
    const { width, height } = this.canvas;
    
    // Apply trail effect
    this.ctx.fillStyle = `rgba(0, 0, 0, ${1 - this.params.trailLength})`;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw spiral particles
    this.particles.forEach((particle, index) => {
      const pos = this.getSpiralPosition(particle.angle, index);
      
      // Update particle
      particle.life += particle.speed * 0.01;
      if (particle.life > 1) particle.life = 0;
      
      // SEMANTIC COLOR INTEGRATION
      let primaryColor, secondaryColor, accentColor;
      const alpha = Math.sin(particle.life * Math.PI) * 0.8;
      
      if (this.visualParams && this.visualParams.semanticColor) {
        // Use semantically extracted colors filtered through AldineXXI aesthetic harmonizer
        primaryColor = this.visualParams.getHarmonizedRgba(alpha);
        secondaryColor = this.visualParams.getHarmonizedRgba(alpha * 0.6);
        accentColor = this.visualParams.getHarmonizedRgba(alpha * 0.8);
      } else {
        // Fallback to Sacred Palette spiral colors
        const palette = window.SacredPalette?.families?.spiral || {
          primary: '#8B4513', secondary: '#CD853F', accent: '#D2691E'
        };
        
        // Cycle through spiral colors based on position and time
        const colorPhase = (index * 137.5 + this.time * 50) % 360; // Golden angle
        let color;
        if (colorPhase < 120) {
          color = palette.primary;
        } else if (colorPhase < 240) {
          color = palette.secondary;
        } else {
          color = palette.accent;
        }
        
        // Apply life-based alpha and slight weathering
        const weathering = window.SacredPalette?.utilities?.weatherColor ? 
          window.SacredPalette.utilities.weatherColor(color, particle.life * 0.3) : color;
        
        primaryColor = weathering.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
        secondaryColor = weathering.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
        accentColor = weathering.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
      }
      
      // Use primary color for particles
      this.ctx.fillStyle = primaryColor;
      
      // Draw particle with size based on life
      const size = 2 + particle.life * 4;
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw connecting lines between nearby particles
      if (index > 0 && index % 3 === 0) {
        const prevPos = this.getSpiralPosition(this.particles[index - 1].angle, index - 1);
        
        // Use accent color for connections
        let connectionColor;
        if (this.visualParams && this.visualParams.semanticColor) {
          connectionColor = this.visualParams.getHarmonizedRgba(0.3);
        } else {
          // Fallback to Sacred Palette
          const palette = window.SacredPalette?.families?.spiral || {
            primary: '#8B4513', secondary: '#CD853F', accent: '#D2691E'
          };
          connectionColor = palette.accent.replace('rgb', 'rgba').replace(')', ', 0.3)');
        }
        
        this.ctx.strokeStyle = connectionColor;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(prevPos.x, prevPos.y);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
      }
    });
  }

  destroy() {
    this.stop();
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.Spiral = SpiralRenderer;
}