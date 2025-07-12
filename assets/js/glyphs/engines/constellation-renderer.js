// Constellation Family Glyph Renderer
// Creates star field patterns with connecting lines and pulsing nodes
class ConstellationRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      starCount: params.starCount || 50,
      connectionDistance: params.connectionDistance || 80,
      pulseSpeed: params.pulseSpeed || 0.02,
      driftSpeed: params.driftSpeed || 0.3,
      brightness: params.brightness || 0.8,
      constellationPattern: params.constellationPattern || 'random', // random, circular, grid
      ...params
    };
    this.time = 0;
    this.stars = [];
    this.animationId = null;
    this.initStars();
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
    
    // Add subtle background using Sacred Palette ground colors
    const palette = window.SacredPalette?.families?.constellation || {
      primary: '#2F4F4F', secondary: '#708090', accent: '#B0C4DE'
    };
    const groundColor = window.SacredPalette?.ground?.manuscript || '#F7F3E9';
    
    const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    gradient.addColorStop(0, palette.primary.replace('rgb', 'rgba').replace(')', ', 0.15)'));
    gradient.addColorStop(1, groundColor.replace('rgb', 'rgba').replace(')', ', 0.95)'));
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Update star positions with gentle drift
    this.stars.forEach(star => {
      star.x = star.originalX + Math.sin(this.time * this.params.driftSpeed + star.driftPhase) * 15;
      star.y = star.originalY + Math.cos(this.time * this.params.driftSpeed + star.driftPhase) * 10;
    });
    
    // Draw connections between nearby stars using Sacred Palette
    const connectionColor = palette.accent;
    this.ctx.lineWidth = 1;
    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        const star1 = this.stars[i];
        const star2 = this.stars[j];
        const distance = Math.sqrt((star1.x - star2.x) ** 2 + (star1.y - star2.y) ** 2);
        
        if (distance < this.params.connectionDistance) {
          const alpha = (1 - distance / this.params.connectionDistance) * 0.3;
          this.ctx.strokeStyle = connectionColor.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
          this.ctx.beginPath();
          this.ctx.moveTo(star1.x, star1.y);
          this.ctx.lineTo(star2.x, star2.y);
          this.ctx.stroke();
        }
      }
    }
    
    // Draw stars with pulsing effect using Sacred Palette
    this.stars.forEach(star => {
      const pulse = Math.sin(this.time + star.pulsePhase) * 0.3 + 0.7;
      const brightness = star.brightness * pulse * this.params.brightness;
      const size = star.size * (0.8 + pulse * 0.4);
      
      // Get star color from Sacred Palette constellation family
      const colors = [palette.primary, palette.secondary, palette.accent];
      const starColor = colors[star.colorIndex % colors.length];
      
      // Apply breathing effect if available
      const breathedColor = window.SacredPalette?.utilities?.breatheColor ?
        window.SacredPalette.utilities.breatheColor(starColor, pulse) : starColor;
      
      // Draw star glow
      const gradient = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, size * 3);
      gradient.addColorStop(0, breathedColor.replace('rgb', 'rgba').replace(')', `, ${brightness})`));
      gradient.addColorStop(0.5, breathedColor.replace('rgb', 'rgba').replace(')', `, ${brightness * 0.5})`));
      gradient.addColorStop(1, breathedColor.replace('rgb', 'rgba').replace(')', ', 0)'));
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, size * 3, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw star core
      this.ctx.fillStyle = breathedColor.replace('rgb', 'rgba').replace(')', `, ${brightness})`);
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
}