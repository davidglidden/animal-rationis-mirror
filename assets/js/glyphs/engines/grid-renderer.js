// Grid Family Glyph Renderer
// Creates systematic patterns - logic, structure, organized thought
class GridRenderer {
  deriveGridParams(vp){
    const g=vp.genome||{}, topo=g.topology||{}, cx=g.complexity||{}, res=g.resonance||{};
    const arch = topo.architecturalComplexity ?? 0.5;
    const cell = 6 + Math.floor((1-arch) * 24);       // smaller cells for more structure
    const jitter = (Math.abs(res.dissonanceLevel ?? 0) * 0.4);
    const stroke = 0.5 + (cx.selfSimilarity ?? 0.5) * 1.0;
    const orth = (window.GlyphUtils?.clamp || ((x,a,b)=>Math.max(a,Math.min(b,x))))(1 - (topo.rhizomaticTendency ?? (topo.branchingFactor ?? 1)/3), 0, 1);
    return { cellSize:cell, gridJitter:jitter, strokeWidth:stroke, orthogonality:orth, paletteIntent:'earth' };
  }
  
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = params;
    const fp = (params?.genome?.uniqueIdentifiers?.fingerprint ?? params?.uniqueness ?? 0) >>> 0;
    this._seed = fp;
    this._rng  = (window.GlyphUtils?.seededRng || ((s)=>()=>((s=(1664525*s+1013904223)>>>0)/0x1_0000_0000)))(fp || 0xA53A9D1B);
    
    const P = this.deriveGridParams(this.params);
    this.params = { ...this.params, ...P };
    console.debug('♍ SIGIL Grid', { seed:this._seed, ...P });
    
    this.params = {
      gridType: this.semanticParams.gridType,
      density: this.semanticParams.density,
      regularity: this.semanticParams.regularity,
      perturbation: this.semanticParams.perturbation,
      connectionProbability: this.semanticParams.connectionProbability,
      geometricComplexity: this.semanticParams.geometricComplexity,
      logicalDepth: this.semanticParams.logicalDepth,
      animationSpeed: this.semanticParams.animationSpeed,
      ...params
    };
    this.time = 0;
    this.gridPoints = [];
    this.connections = [];
    this.animationId = null;
    
    console.log(`🎨 Grid renderer initialized with semantic differentiation:`, {
      type: this.semanticParams.gridType,
      density: this.semanticParams.density,
      regularity: this.semanticParams.regularity,
      logicalDepth: this.semanticParams.logicalDepth,
      entropy: this.semanticParams.entropyScore
    });
    
    this.initGrid();
  }
  
  // Extract semantic parameters for dramatic visual differentiation
  extractSemanticParameters(params) {
    // Get semantic genome data
    const genome = params.genome || {};
    const archetype = params.archetype || 'logical';
    const entropyScore = params.entropyScore || 0.5;
    const conceptualDNA = params.conceptualDNA || [];
    
    // Base parameters influenced by semantic content
    const baseSpeed = (window.SacredPalette?.timing?.breathRate || 0.001);
    
    // Dramatically different patterns based on semantic content
    const semanticInfluences = {
      // Grid type based on structural topology and conceptual DNA
      gridType: this.selectGridType(genome, conceptualDNA),
      
      // Density based on conceptual complexity
      density: Math.floor(4 + (entropyScore * 12)), // 4-16 density
      
      // Regularity based on logical structure
      regularity: 0.7 + (genome.complexity?.selfSimilarity || 0.2) * 0.3, // 0.7-1.0
      
      // Perturbation based on chaos and disorder
      perturbation: (genome.dynamics?.acceleration || 0.1) * 0.3, // 0-0.3
      
      // Connection probability based on rhizomatic tendency
      connectionProbability: 0.2 + (genome.topology?.rhizomaticTendency || 0.1) * 0.6, // 0.2-0.8
      
      // Geometric complexity based on nested complexity
      geometricComplexity: genome.complexity?.nestedComplexity || 0.5,
      
      // Logical depth based on recursive depth
      logicalDepth: Math.min(Math.floor(genome.complexity?.recursiveDepth || 3), 6), // 1-6
      
      // Animation speed based on temporal dynamics
      animationSpeed: baseSpeed * (1 + (genome.temporality?.velocity || 0) * 2),
      
      // Store for later use
      entropyScore: entropyScore,
      genome: genome,
      archetype: archetype
    };
    
    return semanticInfluences;
  }
  
  // Select grid type based on semantic content
  selectGridType(genome, conceptualDNA) {
    const topology = genome.topology || {};
    const complexity = genome.complexity || {};
    
    // PRIME DIRECTIVE: Use base semantic renderer for consistent analysis
    const baseRenderer = new (window.BaseSemanticRenderer || function(){})();
    
    // Define semantic analysis configuration
    const gridAnalysis = {
      hasPolar: {
        family: 'spatial',
        keywords: ['circular', 'radial', 'center', 'polar', 'orbit', 'spiral', 'centripetal', 'vortex'],
        threshold: 0.6
      },
      hasHexagonal: {
        family: 'natural',
        keywords: ['hexagonal', 'organic', 'natural', 'honeycomb', 'cellular', 'crystalline', 'lattice'],
        threshold: 0.6
      },
      hasTriangular: {
        family: 'structural',
        keywords: ['triangular', 'sharp', 'angular', 'geometric', 'faceted', 'pyramid', 'apex'],
        threshold: 0.6
      }
    };
    
    // Perform semantic analysis
    const results = baseRenderer.analyzeConceptsWithFamilies ? 
      baseRenderer.analyzeConceptsWithFamilies(conceptualDNA, gridAnalysis) :
      { hasPolar: false, hasHexagonal: false, hasTriangular: false };
    
    // Grid type selection based on semantic analysis
    if (results.hasPolar || topology.circularityIndex > 0.4) {
      return 'polar';
    } else if (results.hasHexagonal || (complexity.selfSimilarity > 0.3 && topology.branchingFactor > 1.5)) {
      return 'hexagonal';
    } else if (results.hasTriangular || topology.branchingFactor > 2.0) {
      return 'triangular';
    } else {
      // Default based on structural characteristics
      if (topology.circularityIndex > 0.2) {
        return 'polar';
      } else if (complexity.nestingLevel > 4) {
        return 'hexagonal';
      } else if (topology.branchingFactor > 1.8) {
        return 'triangular';
      } else {
        return 'cartesian';
      }
    }
  }

  initGrid() {
    this.gridPoints = [];
    this.connections = [];
    const { width, height } = this.canvas;
    
    switch (this.params.gridType) {
      case 'cartesian':
        this.initCartesianGrid(width, height);
        break;
      case 'polar':
        this.initPolarGrid(width, height);
        break;
      case 'hexagonal':
        this.initHexagonalGrid(width, height);
        break;
      case 'triangular':
        this.initTriangularGrid(width, height);
        break;
    }
    
    this.generateConnections();
  }

  initCartesianGrid(width, height) {
    const stepX = width / this.params.density;
    const stepY = height / this.params.density;
    
    for (let i = 0; i <= this.params.density; i++) {
      for (let j = 0; j <= this.params.density; j++) {
        const baseX = i * stepX;
        const baseY = j * stepY;
        
        // Add regularity-based perturbation
        const perturbX = (Math.random() - 0.5) * stepX * (1 - this.params.regularity);
        const perturbY = (Math.random() - 0.5) * stepY * (1 - this.params.regularity);
        
        this.gridPoints.push({
          x: baseX + perturbX,
          y: baseY + perturbY,
          baseX: baseX,
          baseY: baseY,
          gridI: i,
          gridJ: j,
          logicalValue: Math.random(),
          phase: Math.random() * Math.PI * 2,
          stability: this.params.regularity
        });
      }
    }
  }

  initPolarGrid(width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 * 0.8;
    const rings = this.params.density;
    const pointsPerRing = this.params.density * 2;
    
    // Center point
    this.gridPoints.push({
      x: centerX,
      y: centerY,
      baseX: centerX,
      baseY: centerY,
      ring: 0,
      angle: 0,
      logicalValue: 1,
      phase: 0,
      stability: 1
    });
    
    for (let ring = 1; ring <= rings; ring++) {
      const radius = (ring / rings) * maxRadius;
      const points = Math.floor(pointsPerRing * (ring / rings)) + 6;
      
      for (let p = 0; p < points; p++) {
        const angle = (p / points) * Math.PI * 2;
        const perturbRadius = radius + (Math.random() - 0.5) * maxRadius * (1 - this.params.regularity) * 0.1;
        const perturbAngle = angle + (Math.random() - 0.5) * (1 - this.params.regularity) * 0.3;
        
        const x = centerX + Math.cos(perturbAngle) * perturbRadius;
        const y = centerY + Math.sin(perturbAngle) * perturbRadius;
        
        this.gridPoints.push({
          x: x,
          y: y,
          baseX: centerX + Math.cos(angle) * radius,
          baseY: centerY + Math.sin(angle) * radius,
          ring: ring,
          angle: angle,
          logicalValue: Math.random(),
          phase: angle + ring,
          stability: this.params.regularity
        });
      }
    }
  }

  initHexagonalGrid(width, height) {
    const spacing = Math.min(width, height) / (this.params.density + 2);
    const hexHeight = spacing * Math.sqrt(3) / 2;
    const rows = Math.floor(height / hexHeight);
    const cols = this.params.density;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offset = (row % 2) * spacing / 2;
        const x = col * spacing + offset + spacing;
        const y = row * hexHeight + spacing;
        
        if (x < width - spacing && y < height - spacing) {
          const perturbX = (Math.random() - 0.5) * spacing * (1 - this.params.regularity) * 0.3;
          const perturbY = (Math.random() - 0.5) * hexHeight * (1 - this.params.regularity) * 0.3;
          
          this.gridPoints.push({
            x: x + perturbX,
            y: y + perturbY,
            baseX: x,
            baseY: y,
            hexRow: row,
            hexCol: col,
            logicalValue: Math.random(),
            phase: (row + col) * 0.5,
            stability: this.params.regularity
          });
        }
      }
    }
  }

  initTriangularGrid(width, height) {
    const spacing = Math.min(width, height) / (this.params.density + 2);
    const triHeight = spacing * Math.sqrt(3) / 2;
    const rows = Math.floor(height / triHeight);
    
    for (let row = 0; row < rows; row++) {
      const cols = this.params.density - Math.floor(row / 2);
      for (let col = 0; col < cols; col++) {
        const x = col * spacing + (row % 2) * spacing / 2 + spacing;
        const y = row * triHeight + spacing;
        
        if (x < width - spacing) {
          const perturbX = (Math.random() - 0.5) * spacing * (1 - this.params.regularity) * 0.3;
          const perturbY = (Math.random() - 0.5) * triHeight * (1 - this.params.regularity) * 0.3;
          
          this.gridPoints.push({
            x: x + perturbX,
            y: y + perturbY,
            baseX: x,
            baseY: y,
            triRow: row,
            triCol: col,
            logicalValue: Math.random(),
            phase: (row + col) * 0.7,
            stability: this.params.regularity
          });
        }
      }
    }
  }

  generateConnections() {
    this.connections = [];
    
    for (let i = 0; i < this.gridPoints.length; i++) {
      for (let j = i + 1; j < this.gridPoints.length; j++) {
        const p1 = this.gridPoints[i];
        const p2 = this.gridPoints[j];
        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        
        // Connect based on logical proximity and geometric distance
        const logicalDistance = Math.abs(p1.logicalValue - p2.logicalValue);
        const connectionProbability = this.params.connectionProbability * 
          (1 - distance / 200) * (1 - logicalDistance);
        
        if (Math.random() < connectionProbability && this.isLogicalConnection(p1, p2)) {
          this.connections.push({
            from: i,
            to: j,
            strength: connectionProbability,
            logicalType: this.getLogicalType(p1, p2)
          });
        }
      }
    }
  }

  isLogicalConnection(p1, p2) {
    // Define logical connection rules based on grid type
    switch (this.params.gridType) {
      case 'cartesian':
        return Math.abs(p1.gridI - p2.gridI) <= 1 && Math.abs(p1.gridJ - p2.gridJ) <= 1;
      case 'polar':
        return (p1.ring === p2.ring) || Math.abs(p1.ring - p2.ring) === 1;
      case 'hexagonal':
        return Math.abs(p1.hexRow - p2.hexRow) <= 1 && Math.abs(p1.hexCol - p2.hexCol) <= 1;
      case 'triangular':
        return Math.abs(p1.triRow - p2.triRow) <= 1 && Math.abs(p1.triCol - p2.triCol) <= 1;
      default:
        return true;
    }
  }

  getLogicalType(p1, p2) {
    const logicalDiff = Math.abs(p1.logicalValue - p2.logicalValue);
    if (logicalDiff < 0.2) return 'equivalence';
    if (logicalDiff < 0.5) return 'implication';
    return 'contrast';
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
    this.updateLogic();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateLogic() {
    // Update logical values with systematic progression
    this.gridPoints.forEach(point => {
      const logicalPerturbation = Math.sin(this.time + point.phase) * this.params.perturbation;
      point.logicalValue = Math.max(0, Math.min(1, 
        point.logicalValue + logicalPerturbation * 0.01
      ));
      
      // Systematic position breathing
      const positionPerturbation = Math.sin(this.time * 0.5 + point.phase) * 
        (1 - this.params.regularity) * 5;
      point.x = point.baseX + positionPerturbation;
      point.y = point.baseY + positionPerturbation * 0.7;
    });
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    // Optional illumination overlay
    if (window.drawIlluminationOverlay) {
      window.drawIlluminationOverlay(this.ctx, this.params, this._rng);
    }
    
    // Draw background grid lines for structure
    this.renderGridStructure();
    
    // Draw logical connections
    this.renderConnections();
    
    // Draw grid points with logical state
    this.renderGridPoints();
    
    // Draw systematic overlays
    this.renderLogicalOverlays();
  }

  renderGridStructure() {
    // SEMANTIC COLOR INTEGRATION
    // Use semantic colors if available, otherwise fallback to Sacred Palette
    let strokeColor;
    
    if (this.visualParams && this.visualParams.semanticColor) {
      // Use semantically extracted colors filtered through AldineXXI aesthetic harmonizer
      strokeColor = this.visualParams.getHarmonizedRgba(0.15);
    } else {
      // Fallback to Sacred Palette grid colors
      const palette = window.SacredPalette || { 
        families: { grid: { primary: '#778899' } },
        utils: { mix: (a,b,r) => a }
      };
      
      const gridColors = palette.families.grid;
      strokeColor = palette.utils.mix(gridColors.primary, palette.ground?.vellum || '#FAF8F3', 0.85);
    }
    
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = 1;
    
    if (this.params.gridType === 'cartesian') {
      // Draw grid lines
      const stepX = this.canvas.width / this.params.density;
      const stepY = this.canvas.height / this.params.density;
      
      for (let i = 0; i <= this.params.density; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(i * stepX, 0);
        this.ctx.lineTo(i * stepX, this.canvas.height);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, i * stepY);
        this.ctx.lineTo(this.canvas.width, i * stepY);
        this.ctx.stroke();
      }
    }
  }

  renderConnections() {
    this.connections.forEach(connection => {
      const p1 = this.gridPoints[connection.from];
      const p2 = this.gridPoints[connection.to];
      
      const alpha = connection.strength * 0.4; // More subtle than before
      let baseColor;
      
      // SEMANTIC COLOR INTEGRATION
      if (this.visualParams && this.visualParams.semanticColor) {
        // Use semantically extracted colors filtered through AldineXXI aesthetic harmonizer
        switch (connection.logicalType) {
          case 'equivalence':
            baseColor = this.visualParams.getHarmonizedRgba(alpha * 0.8);
            break;
          case 'implication':
            baseColor = this.visualParams.getHarmonizedRgba(alpha * 1.0);
            break;
          case 'contrast':
            baseColor = this.visualParams.getHarmonizedRgba(alpha * 0.6);
            break;
          default:
            baseColor = this.visualParams.getHarmonizedRgba(alpha * 0.4);
        }
      } else {
        // Fallback to Sacred Palette grid colors
        const palette = window.SacredPalette || { families: { grid: {} } };
        const gridColors = palette.families.grid;
        
        // Use sacred palette colors, muted and contemplative
        switch (connection.logicalType) {
          case 'equivalence':
            baseColor = gridColors.accent || '#8FA68E'; // Moss hint
            break;
          case 'implication':
            baseColor = gridColors.primary || '#778899'; // Slate blue
            break;
          case 'contrast':
            baseColor = gridColors.secondary || '#A8A8A8'; // Warm grey
            break;
          default:
            baseColor = palette.base?.ash || '#9B9B9B'; // Gentle grey
        }
        
        // Convert hex to rgba with contemplative alpha
        const rgb = palette.utils?.hexToRgb(baseColor) || {r: 120, g: 136, b: 153};
        baseColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
      }
      
      this.ctx.strokeStyle = baseColor;
      this.ctx.lineWidth = 0.5 + connection.strength * 0.5; // Thinner, more subtle
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    });
  }

  renderGridPoints() {
    this.gridPoints.forEach(point => {
      const logicalIntensity = point.logicalValue;
      const stabilityIndicator = point.stability;
      
      // Breathing animation using sacred timing
      const palette = window.SacredPalette || { timing: { breathRate: 0.001 } };
      const breathPhase = this.time * (palette.timing?.breathRate || 0.001) + point.phase;
      const breathAlpha = 0.3 + Math.sin(breathPhase) * 0.15; // Gentle contemplative pulse
      
      let fillColor;
      
      // SEMANTIC COLOR INTEGRATION
      if (this.visualParams && this.visualParams.semanticColor) {
        // Use semantically extracted colors filtered through AldineXXI aesthetic harmonizer
        // Vary alpha based on logical intensity for depth
        const intensityAlpha = breathAlpha * (0.5 + logicalIntensity * 0.5);
        fillColor = this.visualParams.getHarmonizedRgba(intensityAlpha);
      } else {
        // Fallback to Sacred Palette grid colors with complex blending
        const gridColors = palette.families?.grid || {};
        
        // Use sacred palette grid colors for contemplative gradation
        const primaryRgb = palette.utils?.hexToRgb(gridColors.primary || '#778899') || {r: 119, g: 136, b: 153};
        const secondaryRgb = palette.utils?.hexToRgb(gridColors.secondary || '#A8A8A8') || {r: 168, g: 168, b: 168};
        const accentRgb = palette.utils?.hexToRgb(gridColors.accent || '#8FA68E') || {r: 143, g: 166, b: 142};
        
        // Blend between primary -> accent -> secondary based on logical intensity
        let r, g, b;
        if (logicalIntensity < 0.5) {
          // Blend primary to accent (contemplative progression)
          const t = logicalIntensity * 2;
          r = primaryRgb.r + (accentRgb.r - primaryRgb.r) * t;
          g = primaryRgb.g + (accentRgb.g - primaryRgb.g) * t;
          b = primaryRgb.b + (accentRgb.b - primaryRgb.b) * t;
        } else {
          // Blend accent to secondary (deepening thought)
          const t = (logicalIntensity - 0.5) * 2;
          r = accentRgb.r + (secondaryRgb.r - accentRgb.r) * t;
          g = accentRgb.g + (secondaryRgb.g - accentRgb.g) * t;
          b = accentRgb.b + (secondaryRgb.b - accentRgb.b) * t;
        }
        
        fillColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${breathAlpha})`;
      }
      
      this.ctx.fillStyle = fillColor;
      
      // Point size based on logical certainty - modest sizing
      const size = 2 + logicalIntensity * 3 + stabilityIndicator * 1.5;
      
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Subtle logical state indicator
      if (this.params.geometricComplexity > 0.5) {
        let indicatorColor;
        
        if (this.visualParams && this.visualParams.semanticColor) {
          // Use semantic color with reduced alpha for indicator
          indicatorColor = this.visualParams.getHarmonizedRgba(0.4);
        } else {
          // Fallback to Sacred Palette indicator
          const gridColors = palette.families?.grid || {};
          const indicatorColorHex = palette.utils?.weather(gridColors.primary || '#778899', 0.5) || '#5A6A79';
          const indicatorRgb = palette.utils?.hexToRgb(indicatorColorHex) || {r: 90, g: 106, b: 121};
          indicatorColor = `rgba(${indicatorRgb.r}, ${indicatorRgb.g}, ${indicatorRgb.b}, 0.4)`;
        }
        
        this.ctx.strokeStyle = indicatorColor;
        this.ctx.lineWidth = 0.5;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, size + 1, 0, Math.PI * 2);
        this.ctx.stroke();
      }
    });
  }

  renderLogicalOverlays() {
    if (this.params.logicalDepth < 2) return;
    
    // Draw logical regions
    const { width, height } = this.canvas;
    
    // SEMANTIC COLOR INTEGRATION
    // Truth value gradient overlay
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    
    if (this.visualParams && this.visualParams.semanticColor) {
      // Use semantically extracted colors filtered through AldineXXI aesthetic harmonizer
      const overlayColor1 = this.visualParams.getHarmonizedRgba(0.1);
      const overlayColor2 = this.visualParams.getHarmonizedRgba(0.05);
      const overlayColor3 = this.visualParams.getHarmonizedRgba(0.08);
      
      gradient.addColorStop(0, overlayColor1);
      gradient.addColorStop(0.5, overlayColor2);
      gradient.addColorStop(1, overlayColor3);
    } else {
      // Fallback to hardcoded gradient colors
      gradient.addColorStop(0, 'rgba(100, 100, 255, 0.1)');
      gradient.addColorStop(0.5, 'rgba(150, 150, 150, 0.05)');
      gradient.addColorStop(1, 'rgba(255, 100, 100, 0.1)');
    }
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // System coherence indicator
    const coherence = this.calculateSystemCoherence();
    
    if (this.visualParams && this.visualParams.semanticColor) {
      // Use semantic colors for coherence indicator
      const baseColor = this.visualParams.getHarmonizedRgba(coherence * 0.1);
      const activeColor = this.visualParams.getHarmonizedRgba(coherence * 0.8);
      
      this.ctx.fillStyle = baseColor;
      this.ctx.fillRect(width - 20, 10, 10, 100);
      
      this.ctx.fillStyle = activeColor;
      this.ctx.fillRect(width - 19, 10 + (1 - coherence) * 100, 8, coherence * 100);
    } else {
      // Fallback to hardcoded coherence colors
      this.ctx.fillStyle = `rgba(255, 255, 255, ${coherence * 0.1})`;
      this.ctx.fillRect(width - 20, 10, 10, 100);
      
      this.ctx.fillStyle = `rgba(100, 255, 100, ${coherence * 0.8})`;
      this.ctx.fillRect(width - 19, 10 + (1 - coherence) * 100, 8, coherence * 100);
    }
  }

  calculateSystemCoherence() {
    if (this.gridPoints.length === 0) return 0;
    
    // Calculate overall logical consistency
    let totalCoherence = 0;
    let comparisons = 0;
    
    this.connections.forEach(connection => {
      const p1 = this.gridPoints[connection.from];
      const p2 = this.gridPoints[connection.to];
      const logicalDistance = Math.abs(p1.logicalValue - p2.logicalValue);
      
      // Lower distance = higher coherence for connected points
      totalCoherence += (1 - logicalDistance) * connection.strength;
      comparisons += connection.strength;
    });
    
    return comparisons > 0 ? totalCoherence / comparisons : 0.5;
  }

  destroy() {
    this.stop();
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.Grid = GridRenderer;
}