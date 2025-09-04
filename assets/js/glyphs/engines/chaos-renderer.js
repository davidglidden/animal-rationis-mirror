// Chaos Family Glyph Renderer
// Creates chaotic patterns - strange attractors, butterfly effects, turbulence
class ChaosRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.visualParams = params;
    
    // PRIME DIRECTIVE: Use semantic parameters for dramatic structural differentiation
    this.semanticParams = this.extractSemanticParameters(params);
    
    this.params = {
      chaosType: this.semanticParams.chaosType,
      attractorScale: this.semanticParams.attractorScale,
      sensitivityRate: this.semanticParams.sensitivityRate,
      evolutionSpeed: this.semanticParams.evolutionSpeed,
      trailLength: this.semanticParams.trailLength,
      colorChaos: this.semanticParams.colorChaos,
      perturbationStrength: this.semanticParams.perturbationStrength,
      systemCount: this.semanticParams.systemCount,
      turbulenceIntensity: this.semanticParams.turbulenceIntensity,
      ...params
    };
    this.time = 0;
    this.systems = [];
    this.animationId = null;
    
    console.log(`🎨 Chaos renderer initialized with semantic differentiation:`, {
      type: this.semanticParams.chaosType,
      systems: this.semanticParams.systemCount,
      sensitivity: this.semanticParams.sensitivityRate,
      evolution: this.semanticParams.evolutionSpeed,
      entropy: this.semanticParams.entropyScore
    });
    
    this.initChaosSystems();
  }
  
  // Extract semantic parameters for dramatic visual differentiation
  extractSemanticParameters(params) {
    // Get semantic genome data
    const genome = params.genome || {};
    const archetype = params.archetype || 'chaotic';
    const entropyScore = params.entropyScore || 0.5;
    const conceptualDNA = params.conceptualDNA || [];
    
    // Base parameters influenced by semantic content
    const baseSpeed = (window.SacredPalette?.timing?.candleFlicker || 0.003) * 33;
    
    // Dramatically different patterns based on semantic content
    const semanticInfluences = {
      // Chaos type based on dynamic patterns and conceptual DNA
      chaosType: this.selectChaosType(genome, conceptualDNA),
      
      // Attractor scale based on scope and complexity
      attractorScale: 3 + (genome.complexity?.nestingLevel || 3) * 2 + 
                     (entropyScore * 5), // 3-18 scale
      
      // Sensitivity rate based on entropy and dissonance
      sensitivityRate: 0.005 + (entropyScore * 0.05) + 
                       (genome.resonance?.dissonanceLevel || 0.2) * 0.045, // 0.005-0.1
      
      // Evolution speed based on temporal dynamics
      evolutionSpeed: baseSpeed * (1 + (genome.temporality?.velocity || 0) * 4 + 
                                   (genome.dynamics?.acceleration || 0.1) * 6), // Variable speed
      
      // Trail length based on temporal continuity
      trailLength: 0.9 + (genome.temporality?.sequentialFlow || 0.1) * 0.08, // 0.9-0.98
      
      // Color chaos enabled for higher entropy
      colorChaos: entropyScore > 0.3,
      
      // Perturbation strength based on chaos and dynamics
      perturbationStrength: 0.0005 + (entropyScore * 0.0015) + 
                           (genome.dynamics?.acceleration || 0.1) * 0.002, // 0.0005-0.004
      
      // System count based on complexity
      systemCount: this.calculateSystemCount(genome, conceptualDNA, entropyScore),
      
      // Turbulence intensity based on chaos level
      turbulenceIntensity: 10 + (entropyScore * 30) + 
                          (genome.resonance?.dissonanceLevel || 0.2) * 20, // 10-50
      
      // Store for later use
      entropyScore: entropyScore,
      genome: genome,
      archetype: archetype
    };
    
    return semanticInfluences;
  }
  
  // Select chaos type based on semantic content
  selectChaosType(genome, conceptualDNA) {
    const dynamics = genome.dynamics || {};
    const complexity = genome.complexity || {};
    
    // PRIME DIRECTIVE: Use base semantic renderer for consistent analysis
    const baseRenderer = new (window.BaseSemanticRenderer || function(){})();
    
    // Define semantic analysis configuration
    const chaosAnalysis = {
      hasLorenz: {
        family: 'dynamic',
        keywords: ['lorenz', 'attractor', 'butterfly', 'weather', 'meteorology', 'chaos', 'strange'],
        threshold: 0.6
      },
      hasHenon: {
        family: 'mathematical',
        keywords: ['discrete', 'map', 'iteration', 'henon', 'nonlinear', 'fractal', 'recursive'],
        threshold: 0.6
      },
      hasRossler: {
        family: 'systemic',
        keywords: ['rossler', 'chemical', 'reaction', 'oscillation', 'continuous', 'periodic', 'cycle'],
        threshold: 0.6
      },
      hasTurbulent: {
        family: 'flow',
        keywords: ['turbulent', 'fluid', 'flow', 'vortex', 'swirl', 'eddy', 'stream'],
        threshold: 0.6
      }
    };
    
    // Perform semantic analysis
    const results = baseRenderer.analyzeConceptsWithFamilies ? 
      baseRenderer.analyzeConceptsWithFamilies(conceptualDNA, chaosAnalysis) :
      {
        hasLorenz: false,
        hasHenon: false,
        hasRossler: false,
        hasTurbulent: false
      };
    
    // Chaos type selection based on semantic analysis
    if (results.hasLorenz || (dynamics.acceleration > 0.4 && complexity.nestingLevel > 4)) {
      return 'lorenz';
    } else if (results.hasHenon || complexity.selfSimilarity > 0.5) {
      return 'henon';
    } else if (results.hasRossler || (dynamics.velocity > 0.3 && genome.resonance?.harmonicComplexity > 0.3)) {
      return 'rossler';
    } else if (results.hasTurbulent || (dynamics.acceleration > 0.5 && genome.topology?.rhizomaticTendency > 0.4)) {
      return 'turbulent';
    } else {
      // Default based on structural characteristics
      if (dynamics.acceleration > 0.4) {
        return 'lorenz';
      } else if (complexity.selfSimilarity > 0.4) {
        return 'henon';
      } else if (dynamics.velocity > 0.3) {
        return 'rossler';
      } else {
        return 'turbulent';
      }
    }
  }
  
  // Calculate system count based on semantic content
  calculateSystemCount(genome, conceptualDNA, entropyScore) {
    const complexity = genome.complexity || {};
    const topology = genome.topology || {};
    
    // Base count varies by chaos type
    let baseCount = 3;
    
    // Turbulent systems need more particles
    if (this.selectChaosType(genome, conceptualDNA) === 'turbulent') {
      baseCount = 30 + Math.floor(entropyScore * 40) + 
                  Math.floor((complexity.nestedComplexity || 0) * 30); // 30-100
    } else {
      baseCount = 2 + Math.floor((topology.branchingFactor || 1) * 2) + 
                  Math.floor(entropyScore * 5); // 2-12
    }
    
    return baseCount;
  }

  initChaosSystems() {
    this.systems = [];
    const { width, height } = this.canvas;
    const systemCount = this.params.systemCount;
    
    for (let i = 0; i < systemCount; i++) {
      const system = {
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 20 - 10,
        vx: 0,
        vy: 0,
        vz: 0,
        colorIndex: i % 3, // For Sacred Palette cycling
        trail: [],
        sensitivity: 1 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2
      };
      
      // Initialize based on chaos type
      switch (this.params.chaosType) {
        case 'lorenz':
          system.x = (Math.random() - 0.5) * 20;
          system.y = (Math.random() - 0.5) * 20;
          system.z = Math.random() * 40;
          break;
        case 'henon':
          system.x = Math.random() * 2 - 1;
          system.y = Math.random() * 2 - 1;
          break;
        case 'rossler':
          system.x = Math.random() * 10 - 5;
          system.y = Math.random() * 10 - 5;
          system.z = Math.random() * 10;
          break;
        case 'turbulent':
          system.vx = (Math.random() - 0.5) * 2;
          system.vy = (Math.random() - 0.5) * 2;
          break;
      }
      
      this.systems.push(system);
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
    this.time += this.params.evolutionSpeed;
    this.updateChaos();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateChaos() {
    const dt = 0.01;
    const perturbation = Math.sin(this.time) * this.params.perturbationStrength;
    
    this.systems.forEach((system, index) => {
      let dx, dy, dz;
      
      switch (this.params.chaosType) {
        case 'lorenz':
          // Lorenz attractor: dx/dt = σ(y-x), dy/dt = x(ρ-z)-y, dz/dt = xy-βz
          const sigma = 10;
          const rho = 28;
          const beta = 8/3;
          
          dx = sigma * (system.y - system.x);
          dy = system.x * (rho - system.z) - system.y;
          dz = system.x * system.y - beta * system.z;
          
          // Add sensitive dependence
          dx += perturbation * system.sensitivity;
          dy += perturbation * system.sensitivity * 0.7;
          dz += perturbation * system.sensitivity * 0.5;
          break;
          
        case 'henon':
          // Henon map: x_{n+1} = 1 - ax_n^2 + y_n, y_{n+1} = bx_n
          const a = 1.4;
          const b = 0.3;
          
          const newX = 1 - a * system.x * system.x + system.y + perturbation * system.sensitivity;
          const newY = b * system.x + perturbation * system.sensitivity * 0.5;
          
          dx = (newX - system.x) * 10; // Scale for smooth animation
          dy = (newY - system.y) * 10;
          dz = 0;
          break;
          
        case 'rossler':
          // Rössler attractor: dx/dt = -y-z, dy/dt = x+ay, dz/dt = b+z(x-c)
          const rA = 0.2;
          const rB = 0.2;
          const rC = 5.7;
          
          dx = -system.y - system.z;
          dy = system.x + rA * system.y;
          dz = rB + system.z * (system.x - rC);
          
          dx += perturbation * system.sensitivity;
          dy += perturbation * system.sensitivity * 0.8;
          dz += perturbation * system.sensitivity * 0.6;
          break;
          
        case 'turbulent':
          // Turbulent flow with vortices and random perturbations
          const { width, height } = this.canvas;
          const centerX = width / 2;
          const centerY = height / 2;
          
          // Distance from center influences flow
          const distFromCenter = Math.sqrt((system.x - centerX) ** 2 + (system.y - centerY) ** 2);
          const angle = Math.atan2(system.y - centerY, system.x - centerX);
          
          // Vortex field with semantic intensity
          const vortexStrength = (100 + this.params.turbulenceIntensity) / (distFromCenter + 10);
          dx = -Math.sin(angle) * vortexStrength;
          dy = Math.cos(angle) * vortexStrength;
          
          // Turbulent perturbations with semantic scaling
          const turbulence = this.params.turbulenceIntensity;
          dx += (Math.random() - 0.5) * turbulence + perturbation * system.sensitivity * (100 + this.params.turbulenceIntensity);
          dy += (Math.random() - 0.5) * turbulence + perturbation * system.sensitivity * (100 + this.params.turbulenceIntensity);
          dz = 0;
          
          // Add noise field with semantic scaling
          const noiseScale = 0.01 + (this.params.turbulenceIntensity * 0.0002);
          dx += Math.sin(system.x * noiseScale + this.time) * (10 + this.params.turbulenceIntensity * 0.2);
          dy += Math.cos(system.y * noiseScale + this.time) * (10 + this.params.turbulenceIntensity * 0.2);
          break;
          
        default:
          dx = dy = dz = 0;
      }
      
      // Update system state
      system.x += dx * dt;
      system.y += dy * dt;
      system.z += dz * dt;
      
      // Map 3D coordinates to 2D canvas for rendering
      if (this.params.chaosType !== 'turbulent') {
        const { width, height } = this.canvas;
        system.canvasX = width / 2 + system.x * this.params.attractorScale;
        system.canvasY = height / 2 + system.y * this.params.attractorScale;
      } else {
        system.canvasX = system.x;
        system.canvasY = system.y;
        
        // Wrap around edges for turbulent flow
        if (system.canvasX < 0) system.canvasX = this.canvas.width;
        if (system.canvasX > this.canvas.width) system.canvasX = 0;
        if (system.canvasY < 0) system.canvasY = this.canvas.height;
        if (system.canvasY > this.canvas.height) system.canvasY = 0;
      }
      
      // Update trail
      system.trail.push({
        x: system.canvasX,
        y: system.canvasY,
        intensity: Math.sqrt(dx * dx + dy * dy + dz * dz)
      });
      
      if (system.trail.length > 100) {
        system.trail.shift();
      }
      
      // Update color based on motion
      if (this.params.colorChaos) {
        const motion = Math.sqrt(dx * dx + dy * dy + dz * dz);
        system.hue = (system.hue + motion * 2) % 360;
      }
    });
  }

  render() {
    const { width, height } = this.canvas;
    
    // Apply trail effect
    // SEMANTIC COLOR INTEGRATION for background
    let backgroundFillColor;
    if (this.visualParams && this.visualParams.semanticColor) {
      backgroundFillColor = this.visualParams.getHarmonizedRgba(1 - this.params.trailLength);
    } else {
      // Fallback to Sacred Palette ground
      const groundColor = window.SacredPalette?.ground?.vellum || '#FAF8F3';
      const groundRgb = window.SacredPalette?.utils?.hexToRgb(groundColor);
      
      if (groundRgb) {
        backgroundFillColor = `rgba(${groundRgb.r}, ${groundRgb.g}, ${groundRgb.b}, ${1 - this.params.trailLength})`;
      }
    }
    
    if (backgroundFillColor) {
      this.ctx.fillStyle = backgroundFillColor;
      this.ctx.fillRect(0, 0, width, height);
    }
    
    // Draw chaos systems
    this.systems.forEach(system => {
      // Draw trail
      system.trail.forEach((point, index) => {
        const alpha = (index / system.trail.length) * 0.6;
        const intensity = Math.min(point.intensity * 0.1, 1);
        
        // SEMANTIC COLOR INTEGRATION for trail
        let trailFillColor;
        if (this.visualParams && this.visualParams.semanticColor) {
          // Use different alpha variations for different trail systems
          const trailAlpha = alpha * intensity * (0.6 + (system.colorIndex * 0.1));
          trailFillColor = this.visualParams.getHarmonizedRgba(trailAlpha);
        } else {
          // Fallback to Sacred Palette chaos colors
          const palette = window.SacredPalette?.families?.chaos || { primary: '#8B4513', secondary: '#CD853F', accent: '#D2B48C' };
          const colors = [palette.primary, palette.secondary, palette.accent];
          const trailColor = colors[system.colorIndex % colors.length];
          const breathing = window.SacredPalette?.utils?.breathe ?
            window.SacredPalette.utils.breathe(trailColor, this.time + index, intensity * 0.1) : trailColor;
          const trailRgb = window.SacredPalette?.utils?.hexToRgb(breathing);
          
          if (trailRgb) {
            trailFillColor = `rgba(${trailRgb.r}, ${trailRgb.g}, ${trailRgb.b}, ${alpha * intensity})`;
          }
        }
        
        if (trailFillColor) {
          this.ctx.fillStyle = trailFillColor;
          this.ctx.beginPath();
          this.ctx.arc(point.x, point.y, 1 + intensity, 0, Math.PI * 2);
          this.ctx.fill();
        }
      });
      
      // Draw current position
      if (system.canvasX >= 0 && system.canvasX <= width && system.canvasY >= 0 && system.canvasY <= height) {
        const currentIntensity = system.trail.length > 0 ? 
          Math.min(system.trail[system.trail.length - 1].intensity * 0.1, 1) : 0.5;
        
        // SEMANTIC COLOR INTEGRATION for current position
        let currentFillColor;
        if (this.visualParams && this.visualParams.semanticColor) {
          // Use different alpha variations for different chaos systems
          const currentAlpha = 0.9 * (0.6 + (system.colorIndex * 0.1));
          currentFillColor = this.visualParams.getHarmonizedRgba(currentAlpha);
        } else {
          // Fallback to Sacred Palette chaos colors
          const palette = window.SacredPalette?.families?.chaos || { primary: '#8B4513', secondary: '#CD853F', accent: '#D2B48C' };
          const colors = [palette.primary, palette.secondary, palette.accent];
          const currentColor = colors[system.colorIndex % colors.length];
          const weathered = window.SacredPalette?.utils?.weather ?
            window.SacredPalette.utils.weather(currentColor, 0.2) : currentColor;
          const currentRgb = window.SacredPalette?.utils?.hexToRgb(weathered);
          
          if (currentRgb) {
            currentFillColor = `rgba(${currentRgb.r}, ${currentRgb.g}, ${currentRgb.b}, 0.9)`;
          }
        }
        
        if (currentFillColor) {
          this.ctx.fillStyle = currentFillColor;
          this.ctx.beginPath();
          this.ctx.arc(system.canvasX, system.canvasY, 2 + currentIntensity * 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        
        // Draw glow for high-intensity points
        if (currentIntensity > 0.7) {
          const glowGradient = this.ctx.createRadialGradient(
            system.canvasX, system.canvasY, 0,
            system.canvasX, system.canvasY, 10
          );
          
          // SEMANTIC COLOR INTEGRATION for glow
          if (this.visualParams && this.visualParams.semanticColor) {
            const glowCenter = this.visualParams.getHarmonizedRgba(0.6);
            const glowEdge = this.visualParams.getHarmonizedRgba(0);
            glowGradient.addColorStop(0, glowCenter);
            glowGradient.addColorStop(1, glowEdge);
          } else {
            // Fallback to Sacred Palette for glow
            const palette = window.SacredPalette?.families?.chaos || { primary: '#8B4513', secondary: '#CD853F', accent: '#D2B48C' };
            const glowColor = palette.accent; // Old gold for glow
            const glowRgb = window.SacredPalette?.utils?.hexToRgb(glowColor);
            if (glowRgb) {
              glowGradient.addColorStop(0, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0.6)`);
              glowGradient.addColorStop(1, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0)`);
            }
          }
          
          this.ctx.fillStyle = glowGradient;
          this.ctx.beginPath();
          this.ctx.arc(system.canvasX, system.canvasY, 10, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    });
    
    // Draw phase space indicator
    // SEMANTIC COLOR INTEGRATION for phase space indicator
    let indicatorFillColor, textFillColor;
    if (this.visualParams && this.visualParams.semanticColor) {
      indicatorFillColor = this.visualParams.getHarmonizedRgba(0.1);
      textFillColor = this.visualParams.getHarmonizedRgba(0.7);
    } else {
      // Fallback to Sacred Palette
      const palette = window.SacredPalette?.families?.chaos || {
        primary: '#A67373', secondary: '#4A5A4A', accent: '#B8956A'
      };
      const indicatorColor = palette.secondary;
      const textColor = window.SacredPalette?.base?.graphite || '#4A4A4A';
      const indRgb = window.SacredPalette?.utils?.hexToRgb(indicatorColor);
      const textRgb = window.SacredPalette?.utils?.hexToRgb(textColor);
      
      if (indRgb && textRgb) {
        indicatorFillColor = `rgba(${indRgb.r}, ${indRgb.g}, ${indRgb.b}, 0.1)`;
        textFillColor = `rgba(${textRgb.r}, ${textRgb.g}, ${textRgb.b}, 0.7)`;
      }
    }
    
    if (indicatorFillColor && textFillColor) {
      this.ctx.fillStyle = indicatorFillColor;
      this.ctx.fillRect(width - 60, 10, 50, 30);
      this.ctx.fillStyle = textFillColor;
      this.ctx.font = '10px monospace';
      this.ctx.fillText(this.params.chaosType.toUpperCase(), width - 58, 25);
      this.ctx.fillText(`t: ${this.time.toFixed(1)}`, width - 58, 35);
    }
  }

  destroy() {
    this.stop();
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.Chaos = ChaosRenderer;
}