// Strata Family Glyph Renderer
// Creates geological layer patterns - sedimentary, fault lines, erosion
class StrataRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      layerCount: params.layerCount || 12,
      erosionRate: params.erosionRate || 0.3,
      faultLines: params.faultLines || 2,
      compressionForce: params.compressionForce || 0.1,
      timeScale: params.timeScale || 1000,
      colorVariation: params.colorVariation || 30,
      animationSpeed: params.animationSpeed || 0.001,
      ...params
    };
    this.time = 0;
    this.layers = [];
    this.faults = [];
    this.animationId = null;
    this.initLayers();
    this.initFaults();
  }

  initLayers() {
    this.layers = [];
    const { height } = this.canvas;
    const baseHue = 30; // Earthy brown/orange base
    
    for (let i = 0; i < this.params.layerCount; i++) {
      const age = i / this.params.layerCount;
      const thickness = 20 + Math.random() * (height / this.params.layerCount);
      
      this.layers.push({
        age: age,
        thickness: thickness,
        baseY: (height / this.params.layerCount) * i,
        hue: baseHue + (Math.random() - 0.5) * this.params.colorVariation,
        saturation: 40 + Math.random() * 30,
        lightness: 20 + age * 40,
        hardness: Math.random(), // Resistance to erosion
        compression: 0,
        folds: []
      });
    }
  }

  initFaults() {
    this.faults = [];
    const { width, height } = this.canvas;
    
    for (let i = 0; i < this.params.faultLines; i++) {
      this.faults.push({
        x: Math.random() * width,
        angle: (Math.random() - 0.5) * Math.PI / 4, // ±45 degrees
        displacement: (Math.random() - 0.5) * 50,
        width: 2 + Math.random() * 3,
        activity: Math.random()
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
    this.time += this.params.animationSpeed;
    this.updateGeology();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateGeology() {
    // Simulate slow geological processes
    this.layers.forEach((layer, index) => {
      // Apply compression forces
      layer.compression += this.params.compressionForce * Math.sin(this.time + index);
      
      // Create folds from compression
      if (Math.abs(layer.compression) > 0.5 && Math.random() < 0.001) {
        layer.folds.push({
          x: Math.random() * this.canvas.width,
          amplitude: layer.compression * 10,
          wavelength: 50 + Math.random() * 100,
          phase: Math.random() * Math.PI * 2
        });
      }
    });
    
    // Update fault activity
    this.faults.forEach(fault => {
      fault.activity += (Math.random() - 0.5) * 0.01;
      fault.activity = Math.max(0, Math.min(1, fault.activity));
    });
  }

  getLayerHeight(layer, x) {
    let height = layer.baseY;
    
    // Apply folding
    layer.folds.forEach(fold => {
      const distance = Math.abs(x - fold.x);
      if (distance < fold.wavelength) {
        const foldEffect = Math.cos((distance / fold.wavelength) * Math.PI) * fold.amplitude;
        height += foldEffect;
      }
    });
    
    // Apply fault displacement
    this.faults.forEach(fault => {
      const faultX = fault.x + Math.tan(fault.angle) * (height - this.canvas.height / 2);
      if (x > faultX) {
        height += fault.displacement * fault.activity;
      }
    });
    
    return height;
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw background gradient (deep earth)
    const bgGradient = this.ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#1a1a2e');
    bgGradient.addColorStop(1, '#2d1b0e');
    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw layers from bottom to top
    for (let layerIndex = this.layers.length - 1; layerIndex >= 0; layerIndex--) {
      const layer = this.layers[layerIndex];
      const nextLayer = this.layers[layerIndex - 1];
      
      this.ctx.beginPath();
      
      // Create layer path considering geological deformation
      for (let x = 0; x <= width; x += 2) {
        const y = this.getLayerHeight(layer, x);
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      
      // Complete the layer polygon
      if (nextLayer) {
        for (let x = width; x >= 0; x -= 2) {
          const y = this.getLayerHeight(nextLayer, x);
          this.ctx.lineTo(x, y);
        }
      } else {
        this.ctx.lineTo(width, 0);
        this.ctx.lineTo(0, 0);
      }
      
      this.ctx.closePath();
      
      // Fill layer with color
      const erosion = Math.sin(this.time * this.params.erosionRate + layerIndex) * 0.1 + 0.9;
      const lightness = layer.lightness * erosion;
      this.ctx.fillStyle = `hsl(${layer.hue}, ${layer.saturation}%, ${lightness}%)`;
      this.ctx.fill();
      
      // Add layer texture
      this.ctx.strokeStyle = `hsl(${layer.hue}, ${layer.saturation}%, ${lightness * 0.7}%)`;
      this.ctx.lineWidth = 0.5;
      this.ctx.stroke();
    }
    
    // Draw fault lines
    this.faults.forEach(fault => {
      this.ctx.strokeStyle = `rgba(200, 50, 50, ${fault.activity * 0.8})`;
      this.ctx.lineWidth = fault.width;
      this.ctx.setLineDash([5, 5]);
      
      this.ctx.beginPath();
      const x1 = fault.x;
      const y1 = 0;
      const x2 = fault.x + Math.tan(fault.angle) * height;
      const y2 = height;
      
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
      
      this.ctx.setLineDash([]);
    });
    
    // Add surface erosion effects
    const surfaceLayer = this.layers[0];
    if (surfaceLayer) {
      this.ctx.strokeStyle = 'rgba(139, 69, 19, 0.3)';
      this.ctx.lineWidth = 1;
      
      for (let x = 0; x < width; x += 5) {
        const erosionNoise = Math.sin(x * 0.01 + this.time * 2) * Math.cos(x * 0.007 + this.time * 1.5);
        const erosionDepth = erosionNoise * this.params.erosionRate * 5;
        const y = this.getLayerHeight(surfaceLayer, x) + erosionDepth;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + Math.abs(erosionDepth) + 2);
        this.ctx.stroke();
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
  window.GlyphRenderers.Strata = StrataRenderer;
}