// Interference Family Glyph Renderer
// Creates wave interference patterns - constructive and destructive
class InterferenceRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.visualParams = params;
    // Semantic integration initialized
    this.params = {
      waveCount: params.waveCount || 3,
      frequency: params.frequency || 0.02,
      amplitude: params.amplitude || 30,
      phase: params.phase || 0,
      interferenceType: params.interferenceType || 'constructive', // constructive, destructive, mixed
      colorIntensity: params.colorIntensity || 0.7,
      animationSpeed: params.animationSpeed || (window.SacredPalette?.timing?.shiftRate || 0.0005) * 20,
      ...params
    };
    this.time = 0;
    this.animationId = null;
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
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create interference pattern
    for (let x = 0; x < width; x += 2) {
      for (let y = 0; y < height; y += 2) {
        let amplitude = 0;
        
        // Calculate interference from multiple wave sources
        for (let i = 0; i < this.params.waveCount; i++) {
          const sourceX = centerX + Math.cos(i * Math.PI * 2 / this.params.waveCount) * 60;
          const sourceY = centerY + Math.sin(i * Math.PI * 2 / this.params.waveCount) * 60;
          
          const distance = Math.sqrt((x - sourceX) ** 2 + (y - sourceY) ** 2);
          const wave = Math.sin(distance * this.params.frequency + this.time + this.params.phase);
          
          if (this.params.interferenceType === 'destructive') {
            amplitude += wave * (i % 2 === 0 ? 1 : -1);
          } else {
            amplitude += wave;
          }
        }
        
        // Normalize and apply interference colors
        const intensity = Math.abs(amplitude) / this.params.waveCount;
        const alpha = intensity * this.params.colorIntensity;
        
        // SEMANTIC COLOR INTEGRATION
        let pixelColor;
        if (this.visualParams && this.visualParams.semanticColor) {
          // Use semantically extracted colors filtered through AldineXXI aesthetic harmonizer
          if (intensity > 0.7) {
            pixelColor = this.visualParams.getHarmonizedRgba(alpha);
          } else if (intensity > 0.4) {
            pixelColor = this.visualParams.getHarmonizedRgba(alpha * 0.8);
          } else {
            pixelColor = this.visualParams.getHarmonizedRgba(alpha * 0.6);
          }
        } else {
          // Fallback to Sacred Palette interference colors - "necessary discord, weathered"
          const palette = window.SacredPalette?.families?.interference || {
            primary: '#A67373', secondary: '#6B6B6B', accent: '#8B7D8B'
          };
          
          // Choose color based on interference pattern intensity
          let baseColor;
          if (intensity > 0.7) {
            baseColor = palette.primary; // Muted crimson for high intensity
          } else if (intensity > 0.4) {
            baseColor = palette.accent;   // Bruised plum for medium
          } else {
            baseColor = palette.secondary; // Graphite for low
          }
          
          // Apply breathing and weathering effects
          const weathered = window.SacredPalette?.utils?.weather ?
            window.SacredPalette.utils.weather(baseColor, 0.3) : baseColor;
          const breathed = window.SacredPalette?.utils?.breathe ?
            window.SacredPalette.utils.breathe(weathered, this.time, intensity * 0.1) : weathered;
          
          // Convert hex to rgba with intensity-based alpha
          const rgb = window.SacredPalette?.utils?.hexToRgb(breathed);
          if (rgb) {
            pixelColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
          }
        }
        
        if (pixelColor) {
          this.ctx.fillStyle = pixelColor;
          this.ctx.fillRect(x, y, 2, 2);
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
  window.GlyphRenderers.Interference = InterferenceRenderer;
}