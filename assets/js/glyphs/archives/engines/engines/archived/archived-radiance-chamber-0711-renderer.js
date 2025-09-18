// Archived Radiance Chamber 0711 Renderer
// Preserves the original chamber session sigil design
class ArchivedRadianceChamber0711Renderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 400;
    
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    
    this.config = {
      rayCount: 12,
      coreRadius: 18,
      maxRadius: 180,
      intensity: 0.4,
      temporalFreq: 0.015,
      radiusVariation: 0.2
    };
    
    this.time = 0;
    this.animationId = null;
    this.isRunning = false;
    this.init();
  }

  init() {
    this.start();
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.render();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  render() {
    if (!this.isRunning) return;
    
    // Clear with subtle background
    this.ctx.fillStyle = 'rgba(240, 238, 230, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Breathing cycle based on mood
    const breathCycle = Math.sin(this.time * this.config.temporalFreq) * 0.2 + 0.8;
    
    // Draw radiating rays
    this.ctx.strokeStyle = `rgba(100, 80, 60, ${this.config.intensity * 0.6})`;
    this.ctx.lineWidth = 1.5;
    
    for (let ray = 0; ray < this.config.rayCount; ray++) {
      const angle = (ray / this.config.rayCount) * Math.PI * 2;
      const rayLength = this.config.maxRadius * breathCycle + Math.sin(this.time * 0.02 + ray) * this.config.radiusVariation * 40;
      
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.centerX + Math.cos(angle) * this.config.coreRadius,
        this.centerY + Math.sin(angle) * this.config.coreRadius
      );
      this.ctx.lineTo(
        this.centerX + Math.cos(angle) * rayLength,
        this.centerY + Math.sin(angle) * rayLength
      );
      this.ctx.stroke();
    }
    
    // Central core
    const coreSize = this.config.coreRadius * breathCycle;
    const gradient = this.ctx.createRadialGradient(this.centerX, this.centerY, 0, this.centerX, this.centerY, coreSize);
    gradient.addColorStop(0, `rgba(150, 130, 110, ${this.config.intensity})`);
    gradient.addColorStop(1, `rgba(100, 80, 60, ${this.config.intensity * 0.2})`);
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, coreSize, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.time += 16;
    this.animationId = requestAnimationFrame(() => this.render());
  }

  destroy() {
    this.stop();
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.ArchivedRadianceChamber0711 = ArchivedRadianceChamber0711Renderer;
}