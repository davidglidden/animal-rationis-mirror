// Archived Grid Systems Change Renderer
// Preserves the original "The Ethics of the Reply, Part II: On Abdication and Fidelity" sigil design
class ArchivedGridSystemsChangeRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 400;
    
    this.gridRenderer = null;
    this.animationId = null;
    this.isRunning = false;
    this.init();
  }

  async init() {
    // Create grid renderer with urgent system-in-crisis parameters
    if (window.GlyphRenderers && window.GlyphRenderers.Grid) {
      this.gridRenderer = new window.GlyphRenderers.Grid(this.canvas, {
        // Cartesian grid representing systematic architecture
        gridType: 'cartesian',
        
        // High density for complex system representation
        density: 12,
        
        // Lower regularity - systems breaking down
        regularity: 0.6,
        
        // High perturbation - urgent crisis state
        perturbation: 0.3,
        
        // Increased connections - everything affects everything
        connectionProbability: 0.5,
        
        // Complex geometry for ethical complexity
        geometricComplexity: 0.8,
        
        // Deep logical analysis required
        logicalDepth: 3,
        
        // Faster animation for urgency
        animationSpeed: 0.02,
        
        // Custom parameters for this specific essay
        ethicalCrisis: true,
        systemicFailure: 0.7,
        radiatingConsequences: true
      });
      
      this.start();
    } else {
      // Fallback visualization if Grid engine not available
      this.renderFallback();
    }
  }

  start() {
    if (this.gridRenderer && !this.isRunning) {
      this.isRunning = true;
      this.gridRenderer.start();
    } else if (!this.gridRenderer) {
      this.renderFallback();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.gridRenderer) {
      this.gridRenderer.stop();
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  renderFallback() {
    // Fallback visualization if engine fails to load
    this.ctx.strokeStyle = 'rgba(255, 100, 100, 0.6)';
    this.ctx.lineWidth = 2;
    
    // Create urgent grid pattern manually
    const spacing = 40;
    const perturbation = 0.3;
    
    // Draw disrupted grid
    for (let x = 0; x <= this.canvas.width; x += spacing) {
      const offsetX = x + (Math.random() - 0.5) * spacing * perturbation;
      this.ctx.beginPath();
      this.ctx.moveTo(offsetX, 0);
      this.ctx.lineTo(offsetX, this.canvas.height);
      this.ctx.stroke();
    }
    
    for (let y = 0; y <= this.canvas.height; y += spacing) {
      const offsetY = y + (Math.random() - 0.5) * spacing * perturbation;
      this.ctx.beginPath();
      this.ctx.moveTo(0, offsetY);
      this.ctx.lineTo(this.canvas.width, offsetY);
      this.ctx.stroke();
    }
    
    // Add crisis indicators
    this.ctx.fillStyle = 'rgba(255, 80, 80, 0.3)';
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 15, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  destroy() {
    this.stop();
    if (this.gridRenderer) {
      this.gridRenderer.destroy();
      this.gridRenderer = null;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.ArchivedGridSystemsChange = ArchivedGridSystemsChangeRenderer;
}