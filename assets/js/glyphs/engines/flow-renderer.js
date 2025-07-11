// Flow Family Glyph Renderer
// Creates fluid dynamics patterns - currents, eddies, streams
class FlowRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      particleCount: params.particleCount || 300,
      flowSpeed: params.flowSpeed || 1,
      turbulence: params.turbulence || 0.1,
      viscosity: params.viscosity || 0.98,
      flowPattern: params.flowPattern || 'vortex', // vortex, stream, turbulent
      colorFlow: params.colorFlow || true,
      trailLength: params.trailLength || 0.95,
      ...params
    };
    this.time = 0;
    this.particles = [];
    this.flowField = [];
    this.animationId = null;
    this.initParticles();
    this.generateFlowField();
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
    
    // Apply trail effect
    this.ctx.fillStyle = `rgba(0, 5, 15, ${1 - this.params.trailLength})`;
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
      
      if (this.params.colorFlow) {
        // Color based on velocity
        const hue = (particle.hue + speed * 20) % 360;
        this.ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
      } else {
        this.ctx.fillStyle = `rgba(100, 150, 255, ${alpha})`;
      }
      
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