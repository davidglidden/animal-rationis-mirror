// Flow Family Glyph Renderer
// Creates fluid dynamics patterns - currents, eddies, streams
class FlowRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.visualParams = params;
    
    // PRIME DIRECTIVE: Use semantic parameters for dramatic structural differentiation
    this.semanticParams = this.extractSemanticParameters(params);
    
    this.params = {
      particleCount: this.semanticParams.particleCount,
      flowSpeed: this.semanticParams.flowSpeed,
      turbulence: this.semanticParams.turbulence,
      viscosity: this.semanticParams.viscosity,
      flowPattern: this.semanticParams.flowPattern,
      colorFlow: params.colorFlow || true,
      trailLength: this.semanticParams.trailLength,
      ...params
    };
    this.time = 0;
    this.particles = [];
    this.flowField = [];
    this.animationId = null;
    
    console.log(`🎨 Flow renderer initialized with semantic differentiation:`, {
      pattern: this.semanticParams.flowPattern,
      particles: this.semanticParams.particleCount,
      turbulence: this.semanticParams.turbulence,
      entropy: this.semanticParams.entropyScore
    });
    
    this.initParticles();
    this.generateFlowField();
  }
  
  // Extract semantic parameters for dramatic visual differentiation
  extractSemanticParameters(params) {
    // Get semantic genome data
    const genome = params.genome || {};
    const archetype = params.archetype || 'flowing';
    const entropyScore = params.entropyScore || 0.5;
    const conceptualDNA = params.conceptualDNA || [];
    
    // Base parameters influenced by semantic content
    const baseSpeed = (window.SacredPalette?.timing?.breathRate || 0.001) * 1000;
    
    // Dramatically different patterns based on semantic content
    const semanticInfluences = {
      // Particle density based on conceptual complexity
      particleCount: Math.floor(200 + (entropyScore * 400)), // 200-600 particles
      
      // Flow speed based on temporal dynamics
      flowSpeed: baseSpeed * (0.5 + (genome.temporality?.velocity || 0) * 2),
      
      // Turbulence based on complexity and chaos
      turbulence: (genome.complexity?.nestedComplexity || 0.1) * 0.5,
      
      // Viscosity based on resonance harmony
      viscosity: 0.9 + (genome.resonance?.harmonicComplexity || 0.1) * 0.08,
      
      // Trail length based on temporal flow
      trailLength: 0.85 + (genome.temporality?.sequentialFlow || 0.1) * 0.1,
      
      // Flow pattern based on structural topology
      flowPattern: this.selectFlowPattern(genome, conceptualDNA),
      
      // Store for later use
      entropyScore: entropyScore,
      genome: genome,
      archetype: archetype
    };
    
    return semanticInfluences;
  }
  
  // Select flow pattern based on semantic content
  selectFlowPattern(genome, conceptualDNA) {
    const topology = genome.topology || {};
    const dynamics = genome.dynamics || {};
    
    // PRIME DIRECTIVE: Use base semantic renderer for consistent analysis
    const baseRenderer = new (window.BaseSemanticRenderer || function(){})();
    
    // Define semantic analysis configuration
    const flowAnalysis = {
      hasCircular: {
        family: 'cyclical',
        keywords: ['circular', 'cycle', 'spiral', 'orbit', 'rotation', 'vortex', 'whirlpool'],
        threshold: 0.6
      },
      hasLinear: {
        family: 'directional',
        keywords: ['linear', 'stream', 'flow', 'sequence', 'progression', 'current', 'river'],
        threshold: 0.6
      },
      hasChaotic: {
        family: 'turbulent',
        keywords: ['chaotic', 'turbulent', 'random', 'disorder', 'complex', 'fractal', 'eddy'],
        threshold: 0.6
      }
    };
    
    // Perform semantic analysis
    const results = baseRenderer.analyzeConceptsWithFamilies ? 
      baseRenderer.analyzeConceptsWithFamilies(conceptualDNA, flowAnalysis) :
      { hasCircular: false, hasLinear: false, hasChaotic: false };
    
    // Pattern selection based on semantic analysis
    if (results.hasCircular || topology.circularityIndex > 0.3) {
      return 'vortex';
    } else if (results.hasLinear || dynamics.dominantMovement === 'linear') {
      return 'stream';
    } else if (results.hasChaotic || topology.branchingFactor > 2.5) {
      return 'turbulent';
    } else {
      // Default based on structural complexity
      if (topology.branchingFactor > 1.8) {
        return 'turbulent';
      } else if (topology.circularityIndex > 0.15) {
        return 'vortex';
      } else {
        return 'stream';
      }
    }
  }

  initParticles() {
    this.particles = [];
    const { width, height } = this.canvas;
    
    for (let i = 0; i < this.params.particleCount; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        life: Math.random(),
        maxLife: 100 + Math.random() * 200,
        hue: Math.random() * 60 + 180 // Blue to cyan range
      });
    }
  }

  generateFlowField() {
    const { width, height } = this.canvas;
    this.flowField = [];
    const resolution = 10;
    
    for (let x = 0; x < width; x += resolution) {
      for (let y = 0; y < height; y += resolution) {
        const centerX = width / 2;
        const centerY = height / 2;
        let angle;
        
        switch (this.params.flowPattern) {
          case 'vortex':
            const dx = x - centerX;
            const dy = y - centerY;
            angle = Math.atan2(dy, dx) + Math.PI / 2;
            // Add some noise for turbulence
            angle += (Math.random() - 0.5) * this.params.turbulence;
            break;
          case 'stream':
            angle = Math.sin(y * 0.01) * 0.5 + Math.cos(x * 0.008) * 0.3;
            break;
          case 'turbulent':
            const noise1 = Math.sin(x * 0.01 + this.time) * Math.cos(y * 0.01);
            const noise2 = Math.cos(x * 0.008 + this.time * 0.7) * Math.sin(y * 0.012);
            angle = (noise1 + noise2) * Math.PI;
            break;
          default:
            angle = Math.random() * Math.PI * 2;
        }
        
        this.flowField.push({
          x: x,
          y: y,
          angle: angle,
          strength: 0.1 + Math.random() * 0.2
        });
      }
    }
  }

  getFlowAt(x, y) {
    const resolution = 10;
    const gridX = Math.floor(x / resolution) * resolution;
    const gridY = Math.floor(y / resolution) * resolution;
    
    const field = this.flowField.find(f => f.x === gridX && f.y === gridY);
    if (field) {
      return {
        vx: Math.cos(field.angle) * field.strength * this.params.flowSpeed,
        vy: Math.sin(field.angle) * field.strength * this.params.flowSpeed
      };
    }
    return { vx: 0, vy: 0 };
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
    this.time += 0.01;
    
    // Regenerate flow field occasionally for dynamic patterns
    if (this.time % 5 < 0.02) {
      this.generateFlowField();
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  render() {
    const { width, height } = this.canvas;
    
    // SEMANTIC COLOR INTEGRATION - Background trail effect
    let backgroundTrail;
    
    if (this.visualParams && this.visualParams.semanticColor) {
      // Use semantically extracted colors filtered through AldineXXI aesthetic harmonizer
      backgroundTrail = this.visualParams.getHarmonizedRgba(1 - this.params.trailLength);
    } else {
      // Fallback to Sacred Palette flow background - oxidized metal tones
      const palette = window.SacredPalette || { families: { flow: {} } };
      const groundRgb = palette.utils?.hexToRgb(palette.ground?.vellum || '#FAF8F3') || {r: 250, g: 248, b: 243};
      backgroundTrail = `rgba(${groundRgb.r}, ${groundRgb.g}, ${groundRgb.b}, ${1 - this.params.trailLength})`;
    }
    
    // Apply trail effect with warm background
    this.ctx.fillStyle = backgroundTrail;
    this.ctx.fillRect(0, 0, width, height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      // Get flow influence
      const flow = this.getFlowAt(particle.x, particle.y);
      
      // Apply flow to velocity
      particle.vx += flow.vx;
      particle.vy += flow.vy;
      
      // Apply viscosity (damping)
      particle.vx *= this.params.viscosity;
      particle.vy *= this.params.viscosity;
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Update life
      particle.life++;
      
      // Wrap around edges or reset if too old
      if (particle.x < 0 || particle.x > width || particle.y < 0 || particle.y > height || particle.life > particle.maxLife) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.vx = 0;
        particle.vy = 0;
        particle.life = 0;
        if (this.params.colorFlow) {
          particle.hue = Math.random() * 60 + 180;
        }
      }
      
      // Draw particle
      const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
      const alpha = Math.min(speed * 5, 1) * (1 - particle.life / particle.maxLife);
      
      let particleColor;
      
      // SEMANTIC COLOR INTEGRATION - Particle colors
      if (this.visualParams && this.visualParams.semanticColor) {
        // Use semantically extracted colors filtered through AldineXXI aesthetic harmonizer
        if (this.params.colorFlow) {
          // Vary semantic color intensity based on speed
          const speedRatio = Math.min(speed * 2, 1);
          const intensityAlpha = alpha * (0.6 + speedRatio * 0.4); // More intensity with speed
          particleColor = this.visualParams.getHarmonizedRgba(intensityAlpha);
        } else {
          // Static semantic color
          particleColor = this.visualParams.getHarmonizedRgba(alpha * 0.8);
        }
      } else {
        // Fallback to Sacred Palette flow colors - oxidized copper, rust, tarnished bronze
        const palette = window.SacredPalette || { families: { flow: {} } };
        const flowColors = palette.families.flow;
        const primaryRgb = palette.utils?.hexToRgb(flowColors.primary || '#A67B5B') || {r: 166, g: 123, b: 91};
        const secondaryRgb = palette.utils?.hexToRgb(flowColors.secondary || '#8B6F47') || {r: 139, g: 111, b: 71};
        const accentRgb = palette.utils?.hexToRgb(flowColors.accent || '#6B8E6B') || {r: 107, g: 142, b: 107};
        
        if (this.params.colorFlow) {
          // Blend between oxidized metal tones based on speed
          const speedRatio = Math.min(speed * 2, 1);
          const r = primaryRgb.r + (secondaryRgb.r - primaryRgb.r) * speedRatio;
          const g = primaryRgb.g + (secondaryRgb.g - primaryRgb.g) * speedRatio;
          const b = primaryRgb.b + (secondaryRgb.b - primaryRgb.b) * speedRatio;
          particleColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
        } else {
          particleColor = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${alpha})`;
        }
      }
      
      this.ctx.fillStyle = particleColor;
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, 1 + speed * 2, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw velocity line for fast particles
      if (speed > 0.5) {
        this.ctx.strokeStyle = this.ctx.fillStyle;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(particle.x - particle.vx * 10, particle.y - particle.vy * 10);
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
  window.GlyphRenderers.Flow = FlowRenderer;
}