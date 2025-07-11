// Spiral Family Glyph Renderer
// Creates various spiral patterns - fibonacci, archimedean, logarithmic
class SpiralRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      spiralType: params.spiralType || 'fibonacci', // fibonacci, archimedean, logarithmic
      arms: params.arms || 3,
      growth: params.growth || 0.2,
      rotationSpeed: params.rotationSpeed || 0.005,
      particleCount: params.particleCount || 200,
      trailLength: params.trailLength || 0.95,
      colorShift: params.colorShift || 0,
      ...params
    };
    this.time = 0;
    this.particles = [];
    this.animationId = null;
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.params.particleCount; i++) {
      this.particles.push({
        angle: (i / this.params.particleCount) * Math.PI * 2 * this.params.arms,
        radius: i * 0.5,
        life: Math.random(),
        speed: 0.5 + Math.random() * 0.5
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
    this.time += this.params.rotationSpeed;
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  getSpiralPosition(angle, index) {
    let radius;
    const { width, height } = this.canvas;
    const scale = Math.min(width, height) * 0.3;
    
    switch (this.params.spiralType) {
      case 'fibonacci':
        const phi = (1 + Math.sqrt(5)) / 2;
        radius = Math.sqrt(index) * this.params.growth * phi;
        break;
      case 'archimedean':
        radius = this.params.growth * angle;
        break;
      case 'logarithmic':
        radius = Math.exp(angle * this.params.growth * 0.1);
        break;
      default:
        radius = index * this.params.growth;
    }
    
    return {
      x: width / 2 + Math.cos(angle + this.time) * radius * scale / 100,
      y: height / 2 + Math.sin(angle + this.time) * radius * scale / 100
    };
  }

  render() {
    const { width, height } = this.canvas;
    
    // Apply trail effect
    this.ctx.fillStyle = `rgba(0, 0, 0, ${1 - this.params.trailLength})`;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw spiral particles
    this.particles.forEach((particle, index) => {
      const pos = this.getSpiralPosition(particle.angle, index);
      
      // Update particle
      particle.life += particle.speed * 0.01;
      if (particle.life > 1) particle.life = 0;
      
      // Color based on position in spiral and time
      const hue = (index * 137.5 + this.time * 50 + this.params.colorShift) % 360; // Golden angle
      const saturation = 70 + particle.life * 30;
      const lightness = 40 + particle.life * 40;
      const alpha = Math.sin(particle.life * Math.PI) * 0.8;
      
      this.ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
      
      // Draw particle with size based on life
      const size = 2 + particle.life * 4;
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw connecting lines between nearby particles
      if (index > 0 && index % 3 === 0) {
        const prevPos = this.getSpiralPosition(this.particles[index - 1].angle, index - 1);
        this.ctx.strokeStyle = `hsla(${hue}, 50%, 60%, 0.3)`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(prevPos.x, prevPos.y);
        this.ctx.lineTo(pos.x, pos.y);
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
  window.GlyphRenderers.Spiral = SpiralRenderer;
}