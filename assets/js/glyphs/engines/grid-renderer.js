// Grid Family Glyph Renderer
// Creates systematic patterns - logic, structure, organized thought
class GridRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      gridType: params.gridType || 'cartesian', // cartesian, polar, hexagonal, triangular
      density: params.density || 8,
      regularity: params.regularity || 0.9,
      perturbation: params.perturbation || 0.1,
      connectionProbability: params.connectionProbability || 0.3,
      geometricComplexity: params.geometricComplexity || 0.5,
      logicalDepth: params.logicalDepth || 3,
      animationSpeed: params.animationSpeed || (window.SacredPalette?.timing?.breathRate || 0.001),
      ...params
    };
    this.time = 0;
    this.gridPoints = [];
    this.connections = [];
    this.animationId = null;
    this.initGrid();
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
    // Use sacred palette if available
    const palette = window.SacredPalette || { 
      families: { grid: { primary: '#778899' } },
      utils: { mix: (a,b,r) => a }
    };
    
    const gridColors = palette.families.grid;
    this.ctx.strokeStyle = palette.utils.mix(gridColors.primary, palette.ground?.vellum || '#FAF8F3', 0.85);
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
    const palette = window.SacredPalette || { families: { grid: {} } };
    const gridColors = palette.families.grid;
    
    this.connections.forEach(connection => {
      const p1 = this.gridPoints[connection.from];
      const p2 = this.gridPoints[connection.to];
      
      const alpha = connection.strength * 0.4; // More subtle than before
      let baseColor;
      
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
      this.ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
      this.ctx.lineWidth = 0.5 + connection.strength * 0.5; // Thinner, more subtle
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    });
  }

  renderGridPoints() {
    const palette = window.SacredPalette || { families: { grid: {} } };
    const gridColors = palette.families.grid;
    
    this.gridPoints.forEach(point => {
      const logicalIntensity = point.logicalValue;
      const stabilityIndicator = point.stability;
      
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
      
      // Breathing animation using sacred timing
      const breathPhase = this.time * (palette.timing?.breathRate || 0.001) + point.phase;
      const breathAlpha = 0.3 + Math.sin(breathPhase) * 0.15; // Gentle contemplative pulse
      
      this.ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${breathAlpha})`;
      
      // Point size based on logical certainty - modest sizing
      const size = 2 + logicalIntensity * 3 + stabilityIndicator * 1.5;
      
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Subtle logical state indicator
      if (this.params.geometricComplexity > 0.5) {
        const indicatorColor = palette.utils?.weather(gridColors.primary || '#778899', 0.5) || '#5A6A79';
        const indicatorRgb = palette.utils?.hexToRgb(indicatorColor) || {r: 90, g: 106, b: 121};
        this.ctx.strokeStyle = `rgba(${indicatorRgb.r}, ${indicatorRgb.g}, ${indicatorRgb.b}, 0.4)`;
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
    
    // Truth value gradient overlay
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(100, 100, 255, 0.1)');
    gradient.addColorStop(0.5, 'rgba(150, 150, 150, 0.05)');
    gradient.addColorStop(1, 'rgba(255, 100, 100, 0.1)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // System coherence indicator
    const coherence = this.calculateSystemCoherence();
    this.ctx.fillStyle = `rgba(255, 255, 255, ${coherence * 0.1})`;
    this.ctx.fillRect(width - 20, 10, 10, 100);
    
    this.ctx.fillStyle = `rgba(100, 255, 100, ${coherence * 0.8})`;
    this.ctx.fillRect(width - 19, 10 + (1 - coherence) * 100, 8, coherence * 100);
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