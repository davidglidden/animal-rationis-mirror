// Strata Family Glyph Renderer
// Creates geological layer patterns - sedimentary, fault lines, erosion
class StrataRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.visualParams = params;
    
    // PRIME DIRECTIVE: Use semantic parameters for dramatic structural differentiation
    this.semanticParams = this.extractSemanticParameters(params);
    
    this.params = {
      layerCount: this.semanticParams.layerCount,
      erosionRate: this.semanticParams.erosionRate,
      faultLines: this.semanticParams.faultLines,
      compressionForce: this.semanticParams.compressionForce,
      timeScale: this.semanticParams.timeScale,
      colorVariation: this.semanticParams.colorVariation,
      animationSpeed: this.semanticParams.animationSpeed,
      ...params
    };
    this.time = 0;
    this.layers = [];
    this.faults = [];
    this.animationId = null;
    
    console.log(`🎨 Strata renderer initialized with semantic differentiation:`, {
      layers: this.semanticParams.layerCount,
      erosion: this.semanticParams.erosionRate,
      faults: this.semanticParams.faultLines,
      compression: this.semanticParams.compressionForce,
      entropy: this.semanticParams.entropyScore
    });
    
    this.initLayers();
    this.initFaults();
  }
  
  // Extract semantic parameters for dramatic visual differentiation
  extractSemanticParameters(params) {
    // Get semantic genome data
    const genome = params.genome || {};
    const archetype = params.archetype || 'layered';
    const entropyScore = params.entropyScore || 0.5;
    const conceptualDNA = params.conceptualDNA || [];
    
    // Base parameters influenced by semantic content
    const baseSpeed = (window.SacredPalette?.timing?.breathRate || 0.001);
    
    // Dramatically different patterns based on semantic content
    const semanticInfluences = {
      // Layer count based on complexity and nesting
      layerCount: Math.floor(6 + (genome.complexity?.nestingLevel || 3) * 2 + 
                            (genome.complexity?.layerCount || 1) * 4), // 6-24 layers
      
      // Erosion rate based on temporal dynamics and weathering
      erosionRate: 0.1 + (genome.temporality?.velocity || 0) * 0.4 + 
                  (entropyScore * 0.3), // 0.1-0.8
      
      // Fault lines based on dissonance and structural tension
      faultLines: Math.floor(1 + (genome.resonance?.dissonanceLevel || 0.2) * 4 + 
                           (genome.dynamics?.acceleration || 0.1) * 3), // 1-8 faults
      
      // Compression force based on structural pressure
      compressionForce: 0.05 + (genome.complexity?.nestedComplexity || 0) * 0.25 + 
                       (genome.topology?.branchingFactor || 1) * 0.05, // 0.05-0.35
      
      // Time scale based on temporal density and flow
      timeScale: 500 + (genome.temporality?.temporalDensity || 0.5) * 2000, // 500-2500
      
      // Color variation based on conceptual diversity
      colorVariation: 15 + (entropyScore * 45), // 15-60
      
      // Animation speed based on temporal velocity
      animationSpeed: baseSpeed * (1 + (genome.temporality?.velocity || 0) * 3), // Variable speed
      
      // Store for later use
      entropyScore: entropyScore,
      genome: genome,
      archetype: archetype
    };
    
    return semanticInfluences;
  }

  initLayers() {
    this.layers = [];
    const { height } = this.canvas;
    
    // Initialize base colors for layers
    let baseColors;
    if (this.visualParams && this.visualParams.semanticColor) {
      // Use semantic color as base for layer variations
      baseColors = [0, 1, 2]; // Indices for different alpha/intensity variations
    } else {
      // Use Sacred Palette strata family - "geological memory"
      const palette = window.SacredPalette?.families?.strata || {
        primary: '#D4C5A0', secondary: '#8B8680', accent: '#B8956A'
      };
      baseColors = [palette.primary, palette.secondary, palette.accent];
    }
    
    for (let i = 0; i < this.params.layerCount; i++) {
      const age = i / this.params.layerCount;
      const thickness = 20 + Math.random() * (height / this.params.layerCount);
      
      this.layers.push({
        age: age,
        thickness: thickness,
        baseY: (height / this.params.layerCount) * i,
        color: baseColors[i % baseColors.length],
        colorIndex: i % baseColors.length,
        weathering: age * 0.4, // Older layers more weathered
        hardness: Math.random(), // Resistance to erosion
        compression: 0,
        folds: []
      });
    }
  }

  initFaults() {
    this.faults = [];
    const { width, height } = this.canvas;
    
    for (let i = 0; i < this.params.faultLines; i++) {
      this.faults.push({
        x: Math.random() * width,
        angle: (Math.random() - 0.5) * Math.PI / 4, // ±45 degrees
        displacement: (Math.random() - 0.5) * 50,
        width: 2 + Math.random() * 3,
        activity: Math.random()
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
    this.time += this.params.animationSpeed;
    this.updateGeology();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateGeology() {
    // Simulate slow geological processes
    this.layers.forEach((layer, index) => {
      // Apply compression forces
      layer.compression += this.params.compressionForce * Math.sin(this.time + index);
      
      // Create folds from compression
      if (Math.abs(layer.compression) > 0.5 && Math.random() < 0.001) {
        layer.folds.push({
          x: Math.random() * this.canvas.width,
          amplitude: layer.compression * 10,
          wavelength: 50 + Math.random() * 100,
          phase: Math.random() * Math.PI * 2
        });
      }
    });
    
    // Update fault activity
    this.faults.forEach(fault => {
      fault.activity += (Math.random() - 0.5) * 0.01;
      fault.activity = Math.max(0, Math.min(1, fault.activity));
    });
  }

  getLayerHeight(layer, x) {
    let height = layer.baseY;
    
    // Apply folding
    layer.folds.forEach(fold => {
      const distance = Math.abs(x - fold.x);
      if (distance < fold.wavelength) {
        const foldEffect = Math.cos((distance / fold.wavelength) * Math.PI) * fold.amplitude;
        height += foldEffect;
      }
    });
    
    // Apply fault displacement
    this.faults.forEach(fault => {
      const faultX = fault.x + Math.tan(fault.angle) * (height - this.canvas.height / 2);
      if (x > faultX) {
        height += fault.displacement * fault.activity;
      }
    });
    
    return height;
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw background gradient
    const bgGradient = this.ctx.createLinearGradient(0, 0, 0, height);
    
    // SEMANTIC COLOR INTEGRATION for background
    if (this.visualParams && this.visualParams.semanticColor) {
      const backgroundTop = this.visualParams.getHarmonizedRgba(0.3);
      const backgroundBottom = this.visualParams.getHarmonizedRgba(0.6);
      bgGradient.addColorStop(0, backgroundTop);
      bgGradient.addColorStop(1, backgroundBottom);
    } else {
      // Fallback to Sacred Palette ground colors
      const groundColor = window.SacredPalette?.ground?.fresco || '#F5F0E6';
      const deepColor = window.SacredPalette?.families?.strata?.secondary || '#8B8680';
      
      bgGradient.addColorStop(0, groundColor);
      bgGradient.addColorStop(1, deepColor);
    }
    
    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw layers from bottom to top
    for (let layerIndex = this.layers.length - 1; layerIndex >= 0; layerIndex--) {
      const layer = this.layers[layerIndex];
      const nextLayer = this.layers[layerIndex - 1];
      
      this.ctx.beginPath();
      
      // Create layer path considering geological deformation
      for (let x = 0; x <= width; x += 2) {
        const y = this.getLayerHeight(layer, x);
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      
      // Complete the layer polygon
      if (nextLayer) {
        for (let x = width; x >= 0; x -= 2) {
          const y = this.getLayerHeight(nextLayer, x);
          this.ctx.lineTo(x, y);
        }
      } else {
        this.ctx.lineTo(width, 0);
        this.ctx.lineTo(0, 0);
      }
      
      this.ctx.closePath();
      
      // Fill layer with geological colors
      const erosion = Math.sin(this.time * this.params.erosionRate + layerIndex) * 0.1 + 0.9;
      
      // SEMANTIC COLOR INTEGRATION for layers
      let layerFillColor, layerStrokeColor;
      if (this.visualParams && this.visualParams.semanticColor) {
        // Use semantically extracted colors with varying alpha for different layers
        const layerAlpha = erosion * (0.6 + (layer.colorIndex * 0.1));
        layerFillColor = this.visualParams.getHarmonizedRgba(layerAlpha);
        layerStrokeColor = this.visualParams.getHarmonizedRgba(layerAlpha * 0.7);
      } else {
        // Fallback to Sacred Palette geological colors
        let layerColor = layer.color;
        if (window.SacredPalette?.utils?.weather) {
          layerColor = window.SacredPalette.utils.weather(layerColor, layer.weathering);
        }
        if (window.SacredPalette?.utils?.breathe) {
          layerColor = window.SacredPalette.utils.breathe(layerColor, this.time + layerIndex, erosion * 0.1);
        }
        
        // Convert to rgba for filling
        const rgb = window.SacredPalette?.utils?.hexToRgb(layerColor);
        if (rgb) {
          layerFillColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${erosion})`;
          layerStrokeColor = `rgba(${rgb.r * 0.7}, ${rgb.g * 0.7}, ${rgb.b * 0.7}, ${erosion * 0.8})`;
        }
      }
      
      if (layerFillColor && layerStrokeColor) {
        this.ctx.fillStyle = layerFillColor;
        this.ctx.fill();
        
        // Add layer texture with darker version
        this.ctx.strokeStyle = layerStrokeColor;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
      }
    }
    
    // Draw fault lines
    this.faults.forEach(fault => {
      const alpha = fault.activity * 0.8;
      
      // SEMANTIC COLOR INTEGRATION for fault lines
      let faultStrokeColor;
      if (this.visualParams && this.visualParams.semanticColor) {
        faultStrokeColor = this.visualParams.getHarmonizedRgba(alpha);
      } else {
        // Fallback to Sacred Palette
        const faultColor = window.SacredPalette?.base?.graphite || '#4A4A4A';
        const rgb = window.SacredPalette?.utils?.hexToRgb(faultColor);
        if (rgb) {
          faultStrokeColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        }
      }
      
      if (faultStrokeColor) {
        this.ctx.strokeStyle = faultStrokeColor;
        this.ctx.lineWidth = fault.width;
        this.ctx.setLineDash([5, 5]);
        
        this.ctx.beginPath();
        const x1 = fault.x;
        const y1 = 0;
        const x2 = fault.x + Math.tan(fault.angle) * height;
        const y2 = height;
        
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
      }
    });
    
    // Add surface erosion effects
    const surfaceLayer = this.layers[0];
    if (surfaceLayer) {
      // SEMANTIC COLOR INTEGRATION for surface erosion
      let erosionStrokeColor;
      if (this.visualParams && this.visualParams.semanticColor) {
        erosionStrokeColor = this.visualParams.getHarmonizedRgba(0.3);
      } else {
        // Fallback to Sacred Palette
        const erosionColor = window.SacredPalette?.base?.umber || '#826B4F';
        const rgb = window.SacredPalette?.utils?.hexToRgb(erosionColor);
        if (rgb) {
          erosionStrokeColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
        }
      }
      
      if (erosionStrokeColor) {
        this.ctx.strokeStyle = erosionStrokeColor;
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x < width; x += 5) {
          const erosionNoise = Math.sin(x * 0.01 + this.time * 2) * Math.cos(x * 0.007 + this.time * 1.5);
          const erosionDepth = erosionNoise * this.params.erosionRate * 5;
          const y = this.getLayerHeight(surfaceLayer, x) + erosionDepth;
          
          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
          this.ctx.lineTo(x, y + Math.abs(erosionDepth) + 2);
          this.ctx.stroke();
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
  window.GlyphRenderers.Strata = StrataRenderer;
}