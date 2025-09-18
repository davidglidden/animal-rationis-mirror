// Archived Radiance Threshold Birth Renderer
// Preserves the original "The Threshold Breath" sigil design
class ArchivedRadianceThresholdBirthRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 400;
    
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    
    // Radiance parameters based on metadata
    this.config = {
      rayCount: 12,
      coreRadius: 15,
      maxRadius: 180,
      layerCount: 3,          // threshold effect
      intensity: 0.6,         // anticipatory mood
      emergenceRate: 0.02,    // birth descriptor
      radiationAmplitude: 0.3 // radiating movement
    };
    
    this.time = 0;
    this.particles = [];
    this.animationId = null;
    this.isRunning = false;
    
    this.initParticles();
    this.init();
  }

  initParticles() {
    // Initialize birth particles
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: this.config.coreRadius + Math.random() * 20,
        life: Math.random(),
        birthDelay: Math.random() * 3000 // Staggered emergence
      });
    }
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
    
    // Breathing pulse for anticipatory mood
    const breathCycle = Math.sin(this.time * 0.015) * 0.2 + 0.8;
    
    // Draw threshold layers (3 concentric zones)
    for (let layer = 0; layer < this.config.layerCount; layer++) {
      const layerRadius = this.config.coreRadius + (layer * 60) * breathCycle;
      const opacity = (1 - layer * 0.3) * 0.4;
      
      // Radiating rays for each layer
      this.ctx.strokeStyle = `rgba(100, 80, 60, ${opacity})`;
      this.ctx.lineWidth = 2 - layer * 0.5;
      
      for (let ray = 0; ray < this.config.rayCount; ray++) {
        const angle = (ray / this.config.rayCount) * Math.PI * 2;
        const rayLength = layerRadius + Math.sin(this.time * 0.02 + ray) * this.config.radiationAmplitude * 30;
        
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
    }
    
    // Birth emergence particles
    this.particles.forEach(particle => {
      if (this.time > particle.birthDelay) {
        particle.life += this.config.emergenceRate;
        particle.radius += 0.8;
        
        const alpha = Math.max(0, 1 - particle.life);
        if (alpha > 0) {
          this.ctx.fillStyle = `rgba(120, 100, 80, ${alpha * 0.6})`;
          this.ctx.beginPath();
          this.ctx.arc(
            this.centerX + Math.cos(particle.angle) * particle.radius,
            this.centerY + Math.sin(particle.angle) * particle.radius,
            2,
            0,
            Math.PI * 2
          );
          this.ctx.fill();
        }
        
        // Reset particle when it fades out
        if (particle.life > 1) {
          particle.life = 0;
          particle.radius = this.config.coreRadius + Math.random() * 20;
          particle.angle = Math.random() * Math.PI * 2;
          particle.birthDelay = this.time + Math.random() * 2000;
        }
      }
    });
    
    // Central threshold core - the breath itself
    const coreSize = this.config.coreRadius * breathCycle;
    const gradient = this.ctx.createRadialGradient(this.centerX, this.centerY, 0, this.centerX, this.centerY, coreSize);
    gradient.addColorStop(0, 'rgba(150, 130, 110, 0.8)');
    gradient.addColorStop(0.7, 'rgba(120, 100, 80, 0.4)');
    gradient.addColorStop(1, 'rgba(100, 80, 60, 0.1)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, coreSize, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.time += 16; // ~60fps
    this.animationId = requestAnimationFrame(() => this.render());
  }

  destroy() {
    this.stop();
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.particles = [];
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.ArchivedRadianceThresholdBirth = ArchivedRadianceThresholdBirthRenderer;
}