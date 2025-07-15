// Spiral Family Glyph Renderer
// Creates various spiral patterns - fibonacci, archimedean, logarithmic
class SpiralRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.visualParams = params;
    // Semantic integration initialized
    this.params = {
      spiralType: params.spiralType || 'fibonacci', // fibonacci, archimedean, logarithmic
      arms: params.arms || 3,
      growth: params.growth || 0.2,
      rotationSpeed: params.rotationSpeed || (window.SacredPalette?.timing?.breathRate || 0.001) * 5,
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
      
      // SEMANTIC COLOR INTEGRATION
      let primaryColor, secondaryColor, accentColor;
      const alpha = Math.sin(particle.life * Math.PI) * 0.8;
      
      if (this.visualParams && this.visualParams.semanticColor) {
        // Use semantically extracted colors filtered through AldineXXI aesthetic harmonizer
        primaryColor = this.visualParams.getHarmonizedRgba(alpha);
        secondaryColor = this.visualParams.getHarmonizedRgba(alpha * 0.6);
        accentColor = this.visualParams.getHarmonizedRgba(alpha * 0.8);
      } else {
        // Fallback to Sacred Palette spiral colors
        const palette = window.SacredPalette?.families?.spiral || {
          primary: '#8B4513', secondary: '#CD853F', accent: '#D2691E'
        };
        
        // Cycle through spiral colors based on position and time
        const colorPhase = (index * 137.5 + this.time * 50) % 360; // Golden angle
        let color;
        if (colorPhase < 120) {
          color = palette.primary;
        } else if (colorPhase < 240) {
          color = palette.secondary;
        } else {
          color = palette.accent;
        }
        
        // Apply life-based alpha and slight weathering
        const weathering = window.SacredPalette?.utilities?.weatherColor ? 
          window.SacredPalette.utilities.weatherColor(color, particle.life * 0.3) : color;
        
        primaryColor = weathering.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
        secondaryColor = weathering.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
        accentColor = weathering.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
      }
      
      // Use primary color for particles
      this.ctx.fillStyle = primaryColor;
      
      // Draw particle with size based on life
      const size = 2 + particle.life * 4;
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw connecting lines between nearby particles
      if (index > 0 && index % 3 === 0) {
        const prevPos = this.getSpiralPosition(this.particles[index - 1].angle, index - 1);
        
        // Use accent color for connections
        let connectionColor;
        if (this.visualParams && this.visualParams.semanticColor) {
          connectionColor = this.visualParams.getHarmonizedRgba(0.3);
        } else {
          // Fallback to Sacred Palette
          const palette = window.SacredPalette?.families?.spiral || {
            primary: '#8B4513', secondary: '#CD853F', accent: '#D2691E'
          };
          connectionColor = palette.accent.replace('rgb', 'rgba').replace(')', ', 0.3)');
        }
        
        this.ctx.strokeStyle = connectionColor;
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