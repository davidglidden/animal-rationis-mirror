// Constellation Family Glyph Renderer - ACTIVE ENGINE (v2.5) - Do not archive
// Creates star field patterns with connecting lines and pulsing nodes
class ConstellationRenderer {
  deriveConstellationParams(vp) {
    const g = vp.genome||{}, topo = g.topology||{}, cx = g.complexity||{}, res = g.resonance||{};
    const branch = topo.branchingFactor ?? 1.0;
    const nested = cx.nestedComplexity ?? 0.5;
    const harmonic = res.harmonicComplexity ?? 0.3;
    const arch = topo.architecturalComplexity ?? 0.4;
    
    const starCount = Math.floor(40 + branch * 40 + nested * 220); // 40-300 stars
    const clusterTightness = (window.GlyphUtils?.clamp || ((x,a,b)=>Math.max(a,Math.min(b,x))))(0.2 + arch * 0.6, 0.1, 0.9);
    const connectionProb = 0.15 + harmonic * 0.25;
    const pulseRate = 0.8 + nested * 1.2;
    
    return {
      starCount,
      clusterTightness,
      connectionDistance: clusterTightness * 120,
      connectionProbability: connectionProb,
      pulseSpeed: pulseRate,
      paletteIntent: 'astral'
    };
  }
  
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = params;
    const fp = (params?.genome?.uniqueIdentifiers?.fingerprint ?? params?.uniqueness ?? 0) >>> 0;
    this._seed = fp;
    this._rng = (window.GlyphUtils?.seededRng || ((s)=>()=>((s=(1664525*s+1013904223)>>>0)/0x1_0000_0000)))(fp || 0xA53A9D1B);
    
    const P = this.deriveConstellationParams(this.params);
    this.params = { ...this.params, ...P };
    console.debug('♍ SIGIL Constellation', { seed:this._seed, ...P });
    
    this.visualParams = params;
    
    // PRIME DIRECTIVE: Use semantic parameters for dramatic structural differentiation
    this.semanticParams = this.extractSemanticParameters(params);
    
    // Use derived parameters combined with semantic ones
    this.params = {
      ...this.params, // Already contains derived params
      driftSpeed: this.semanticParams.driftSpeed,
      brightness: this.semanticParams.brightness,
      constellationPattern: this.semanticParams.constellationPattern
    };
    this.time = 0;
    this.stars = [];
    this.animationId = null;
    
    console.log(`🎨 Constellation renderer initialized with semantic differentiation:`, {
      pattern: this.semanticParams.constellationPattern,
      stars: this.semanticParams.starCount,
      connections: this.semanticParams.connectionDistance,
      brightness: this.semanticParams.brightness,
      entropy: this.semanticParams.entropyScore
    });
    
    this.initStars();
  }
  
  // Extract semantic parameters for dramatic visual differentiation
  extractSemanticParameters(params) {
    // Get semantic genome data
    const genome = params.genome || {};
    const archetype = params.archetype || 'networked';
    const entropyScore = params.entropyScore || 0.5;
    const conceptualDNA = params.conceptualDNA || [];
    
    // Dramatically different patterns based on semantic content
    const semanticInfluences = {
      // Constellation pattern based on structural organization
      constellationPattern: this.selectConstellationPattern(genome, conceptualDNA),
      
      // Star count based on conceptual complexity and branching
      starCount: Math.floor(20 + (entropyScore * 60) + 
                           (genome.topology?.branchingFactor || 1) * 30), // 20-140 stars
      
      // Connection distance based on rhizomatic tendency
      connectionDistance: 40 + (genome.topology?.rhizomaticTendency || 0.2) * 120, // 40-160 distance
      
      // Pulse speed based on temporal velocity and resonance
      pulseSpeed: 0.01 + (genome.temporality?.velocity || 0) * 0.05 + 
                  (genome.resonance?.resonantFrequency || 0.5) * 0.03, // 0.01-0.09
      
      // Drift speed based on dynamics and circularity
      driftSpeed: 0.1 + (genome.dynamics?.velocity || 0) * 0.8 + 
                  (genome.topology?.circularityIndex || 0.1) * 0.4, // 0.1-1.3
      
      // Brightness based on harmonic complexity
      brightness: 0.5 + (genome.resonance?.harmonicComplexity || 0.3) * 0.5, // 0.5-1.0
      
      // Store for later use
      entropyScore: entropyScore,
      genome: genome,
      archetype: archetype
    };
    
    return semanticInfluences;
  }
  
  // Select constellation pattern based on semantic content
  selectConstellationPattern(genome, conceptualDNA) {
    const topology = genome.topology || {};
    const complexity = genome.complexity || {};
    
    // PRIME DIRECTIVE: Use base semantic renderer for consistent analysis
    const baseRenderer = new (window.BaseSemanticRenderer || function(){})();
    
    // Define semantic analysis configuration
    const constellationAnalysis = {
      hasCircular: {
        family: 'spatial',
        keywords: ['circular', 'radial', 'orbital', 'cyclic', 'ring', 'wheel', 'mandala'],
        threshold: 0.6
      },
      hasGrid: {
        family: 'structural',
        keywords: ['grid', 'matrix', 'systematic', 'ordered', 'regular', 'lattice', 'array'],
        threshold: 0.6
      },
      hasRandom: {
        family: 'chaotic',
        keywords: ['random', 'scattered', 'chaotic', 'dispersed', 'irregular', 'stochastic', 'entropy'],
        threshold: 0.6
      }
    };
    
    // Perform semantic analysis
    const results = baseRenderer.analyzeConceptsWithFamilies ? 
      baseRenderer.analyzeConceptsWithFamilies(conceptualDNA, constellationAnalysis) :
      { hasCircular: false, hasGrid: false, hasRandom: false };
    
    // Pattern selection based on semantic analysis
    if (results.hasCircular || topology.circularityIndex > 0.4) {
      return 'circular';
    } else if (results.hasGrid || (complexity.selfSimilarity > 0.6 && topology.branchingFactor < 1.5)) {
      return 'grid';
    } else if (results.hasRandom || topology.rhizomaticTendency > 0.4) {
      return 'random';
    } else {
      // Default based on structural characteristics
      if (topology.circularityIndex > 0.2) {
        return 'circular';
      } else if (complexity.selfSimilarity > 0.4) {
        return 'grid';
      } else {
        return 'random';
      }
    }
  }

  initStars() {
    this.stars = [];
    const { width, height } = this.canvas;
    
    for (let i = 0; i < this.params.starCount; i++) {
      let x, y;
      
      switch (this.params.constellationPattern) {
        case 'circular':
          const angle = (i / this.params.starCount) * Math.PI * 2;
          const radius = 50 + Math.random() * Math.min(width, height) * 0.3;
          x = width / 2 + Math.cos(angle) * radius;
          y = height / 2 + Math.sin(angle) * radius;
          break;
        case 'grid':
          const cols = Math.ceil(Math.sqrt(this.params.starCount));
          const rows = Math.ceil(this.params.starCount / cols);
          x = (i % cols) * (width / cols) + Math.random() * 20 - 10;
          y = Math.floor(i / cols) * (height / rows) + Math.random() * 20 - 10;
          break;
        default: // random
          x = Math.random() * width;
          y = Math.random() * height;
      }
      
      this.stars.push({
        x: x,
        y: y,
        originalX: x,
        originalY: y,
        brightness: 0.3 + Math.random() * 0.7,
        pulsePhase: Math.random() * Math.PI * 2,
        driftPhase: Math.random() * Math.PI * 2,
        size: 1 + Math.random() * 3,
        colorIndex: Math.floor(Math.random() * 3) // For Sacred Palette color cycling
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
    this.time += this.params.pulseSpeed;
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    // Optional illumination overlay
    if (window.drawIlluminationOverlay) {
      window.drawIlluminationOverlay(this.ctx, this.params, this._rng);
    }
    
    // Add subtle background using Sacred Palette ground colors
    const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    
    // SEMANTIC COLOR INTEGRATION for background
    if (this.visualParams && this.visualParams.semanticColor) {
      const backgroundPrimary = this.visualParams.getHarmonizedRgba(0.15);
      const backgroundSecondary = this.visualParams.getHarmonizedRgba(0.95);
      gradient.addColorStop(0, backgroundPrimary);
      gradient.addColorStop(1, backgroundSecondary);
    } else {
      // Fallback to Sacred Palette constellation colors
      const palette = window.SacredPalette?.families?.constellation || {
        primary: '#2F4F4F', secondary: '#708090', accent: '#B0C4DE'
      };
      const groundColor = window.SacredPalette?.ground?.manuscript || '#F7F3E9';
      
      gradient.addColorStop(0, palette.primary.replace('rgb', 'rgba').replace(')', ', 0.15)'));
      gradient.addColorStop(1, groundColor.replace('rgb', 'rgba').replace(')', ', 0.95)'));
    }
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Update star positions with gentle drift
    this.stars.forEach(star => {
      star.x = star.originalX + Math.sin(this.time * this.params.driftSpeed + star.driftPhase) * 15;
      star.y = star.originalY + Math.cos(this.time * this.params.driftSpeed + star.driftPhase) * 10;
    });
    
    // Draw connections between nearby stars
    this.ctx.lineWidth = 1;
    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        const star1 = this.stars[i];
        const star2 = this.stars[j];
        const distance = Math.sqrt((star1.x - star2.x) ** 2 + (star1.y - star2.y) ** 2);
        
        if (distance < this.params.connectionDistance) {
          const alpha = (1 - distance / this.params.connectionDistance) * 0.3;
          
          // SEMANTIC COLOR INTEGRATION for connections
          let connectionColor;
          if (this.visualParams && this.visualParams.semanticColor) {
            connectionColor = this.visualParams.getHarmonizedRgba(alpha);
          } else {
            // Fallback to Sacred Palette constellation colors
            const palette = window.SacredPalette?.families?.constellation || {
              primary: '#2F4F4F', secondary: '#708090', accent: '#B0C4DE'
            };
            connectionColor = palette.accent.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
          }
          
          this.ctx.strokeStyle = connectionColor;
          this.ctx.beginPath();
          this.ctx.moveTo(star1.x, star1.y);
          this.ctx.lineTo(star2.x, star2.y);
          this.ctx.stroke();
        }
      }
    }
    
    // Draw stars with pulsing effect
    this.stars.forEach(star => {
      const pulse = Math.sin(this.time + star.pulsePhase) * 0.3 + 0.7;
      const brightness = star.brightness * pulse * this.params.brightness;
      const size = star.size * (0.8 + pulse * 0.4);
      
      // SEMANTIC COLOR INTEGRATION for stars
      let starColor, starGlowColor, starCoreColor;
      if (this.visualParams && this.visualParams.semanticColor) {
        starColor = this.visualParams.getHarmonizedRgba(brightness);
        starGlowColor = this.visualParams.getHarmonizedRgba(brightness * 0.5);
        starCoreColor = this.visualParams.getHarmonizedRgba(brightness);
      } else {
        // Fallback to Sacred Palette constellation colors
        const palette = window.SacredPalette?.families?.constellation || {
          primary: '#2F4F4F', secondary: '#708090', accent: '#B0C4DE'
        };
        const colors = [palette.primary, palette.secondary, palette.accent];
        const baseColor = colors[star.colorIndex % colors.length];
        
        // Apply breathing effect if available
        const breathedColor = window.SacredPalette?.utilities?.breatheColor ?
          window.SacredPalette.utilities.breatheColor(baseColor, pulse) : baseColor;
        
        starColor = breathedColor.replace('rgb', 'rgba').replace(')', `, ${brightness})`);
        starGlowColor = breathedColor.replace('rgb', 'rgba').replace(')', `, ${brightness * 0.5})`);
        starCoreColor = breathedColor.replace('rgb', 'rgba').replace(')', `, ${brightness})`);
      }
      
      // Draw star glow
      const gradient = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, size * 3);
      gradient.addColorStop(0, starColor);
      gradient.addColorStop(0.5, starGlowColor);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, size * 3, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw star core
      this.ctx.fillStyle = starCoreColor;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  destroy() {
    this.stop();
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.Constellation = ConstellationRenderer;
  console.log('[Glyph] Registered engine: Constellation');
}