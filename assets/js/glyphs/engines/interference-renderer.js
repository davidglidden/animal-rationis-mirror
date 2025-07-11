// Interference Family Glyph Renderer
// Creates wave interference patterns - constructive and destructive
class InterferenceRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      waveCount: params.waveCount || 3,
      frequency: params.frequency || 0.02,
      amplitude: params.amplitude || 30,
      phase: params.phase || 0,
      interferenceType: params.interferenceType || 'constructive', // constructive, destructive, mixed
      colorIntensity: params.colorIntensity || 0.7,
      animationSpeed: params.animationSpeed || 0.01,
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
        
        // Normalize and apply color
        const intensity = Math.abs(amplitude) / this.params.waveCount;
        const hue = this.params.interferenceType === 'destructive' ? 
          (intensity * 60 + 200) % 360 : // Blue-purple for destructive
          (intensity * 60 + 320) % 360;  // Purple-red for constructive
        
        this.ctx.fillStyle = `hsla(${hue}, 70%, ${50 + intensity * 20}%, ${intensity * this.params.colorIntensity})`;
        this.ctx.fillRect(x, y, 2, 2);
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