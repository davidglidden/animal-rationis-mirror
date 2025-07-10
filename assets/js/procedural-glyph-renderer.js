// Procedural Glyph Renderer - The Hands of the Symbolic Engine
// Transforms symbolic parameters into living visual forms

class ProceduralGlyphRenderer {
  constructor(canvas, parameters) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = parameters;
    this.time = 0;
    this.animationId = null;
    
    // Set canvas dimensions
    this.canvas.width = 550;
    this.canvas.height = 550;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }
  
  // Main rendering dispatch based on family
  render() {
    switch(this.params.family) {
      case 'Interference':
        return this.renderInterference();
      case 'Spiral':
        return this.renderSpiral();
      case 'Constellation':
        return this.renderConstellation();
      case 'Radiance':
        return this.renderRadiance();
      case 'Flow':
        return this.renderFlow();
      case 'Strata':
        return this.renderStrata();
      case 'Balance':
        return this.renderBalance();
      case 'Collapse':
        return this.renderCollapse();
      case 'Grid':
        return this.renderGrid();
      case 'Chaos':
        return this.renderChaos();
      default:
        return this.renderDefault();
    }
  }
  
  // Interference Family: Duality + Recurrence + Field Effects
  renderInterference() {
    const animate = () => {
      this.ctx.fillStyle = '#F0EEE6';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      const sources = this.params.waveSources || 3;
      const frequency = this.params.temporalFrequency || 0.01;
      
      // Create wave sources
      for (let sourceA = 0; sourceA < sources; sourceA++) {
        for (let sourceB = sourceA + 1; sourceB < sources; sourceB++) {
          this.drawInterferencePattern(sourceA, sourceB, frequency);
        }
      }
      
      this.time += frequency;
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  drawInterferencePattern(sourceA, sourceB, frequency) {
    const posA = this.getSourcePosition(sourceA, this.params.waveSources);
    const posB = this.getSourcePosition(sourceB, this.params.waveSources);
    
    // Draw interference field
    const resolution = 4;
    for (let x = 0; x < this.canvas.width; x += resolution) {
      for (let y = 0; y < this.canvas.height; y += resolution) {
        const distA = Math.sqrt((x - posA.x) ** 2 + (y - posA.y) ** 2);
        const distB = Math.sqrt((x - posB.x) ** 2 + (y - posB.y) ** 2);
        
        const waveA = Math.sin(distA * 0.02 - this.time * 3);
        const waveB = Math.sin(distB * 0.02 - this.time * 3 + this.params.phaseShift);
        
        const interference = (waveA + waveB) / 2;
        const opacity = Math.abs(interference) * this.params.intensity || 0.3;
        
        if (opacity > 0.1) {
          this.ctx.fillStyle = `rgba(51, 51, 51, ${opacity})`;
          this.ctx.fillRect(x, y, resolution, resolution);
        }
      }
    }
  }
  
  // Spiral Family: Rotation + Growth + Return
  renderSpiral() {
    const animate = () => {
      this.ctx.fillStyle = '#F0EEE6';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      const arms = this.params.spiralArms || 3;
      const growthRate = this.params.growthRate || 1.0;
      const rotationSpeed = this.params.rotationSpeed || 0.01;
      
      for (let arm = 0; arm < arms; arm++) {
        this.drawSpiralArm(arm, arms, growthRate, rotationSpeed);
      }
      
      this.time += this.params.temporalFrequency || 0.01;
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  drawSpiralArm(armIndex, totalArms, growthRate, rotationSpeed) {
    const points = 200;
    const armOffset = (armIndex / totalArms) * Math.PI * 2;
    
    this.ctx.strokeStyle = `rgba(51, 51, 51, ${this.params.opacity || 0.6})`;
    this.ctx.lineWidth = this.params.lineWidth || 2;
    this.ctx.beginPath();
    
    for (let i = 0; i < points; i++) {
      const t = i / points;
      const angle = t * Math.PI * 4 + armOffset + this.time * rotationSpeed;
      const radius = t * 200 * growthRate;
      
      // Add golden ratio influence if specified
      const spiralRadius = this.params.goldenRatio ? 
        radius * Math.pow(1.618, t * 2) / 10 : radius;
      
      const x = this.centerX + Math.cos(angle) * spiralRadius;
      const y = this.centerY + Math.sin(angle) * spiralRadius;
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    
    this.ctx.stroke();
  }
  
  // Constellation Family: Points + Connections + Emergence
  renderConstellation() {
    if (!this.nodes) {
      this.initializeNodes();
    }
    
    const animate = () => {
      this.ctx.fillStyle = '#F0EEE6';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.updateNodeActivity();
      this.drawConnections();
      this.drawNodes();
      
      this.time += this.params.temporalFrequency || 0.015;
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  initializeNodes() {
    const count = this.params.nodeCount || 40;
    this.nodes = [];
    
    for (let i = 0; i < count; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        activity: Math.random(),
        phase: Math.random() * Math.PI * 2,
        connections: []
      });
    }
    
    // Create connections
    this.nodes.forEach((node, i) => {
      this.nodes.forEach((other, j) => {
        if (i !== j) {
          const dist = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
          if (dist < (this.params.connectionThreshold || 120) && Math.random() < (this.params.connectionProbability || 0.3)) {
            node.connections.push(j);
          }
        }
      });
    });
  }
  
  updateNodeActivity() {
    this.nodes.forEach((node, i) => {
      node.activity = 0.3 + Math.sin(this.time + node.phase) * 0.4 + 
                     Math.sin(this.time * 0.3 + i * 0.1) * 0.3;
    });
  }
  
  drawConnections() {
    this.nodes.forEach((node, i) => {
      node.connections.forEach(connIndex => {
        const target = this.nodes[connIndex];
        const avgActivity = (node.activity + target.activity) / 2;
        
        this.ctx.strokeStyle = `rgba(51, 51, 51, ${avgActivity * 0.5})`;
        this.ctx.lineWidth = avgActivity * 2;
        this.ctx.beginPath();
        this.ctx.moveTo(node.x, node.y);
        this.ctx.lineTo(target.x, target.y);
        this.ctx.stroke();
      });
    });
  }
  
  drawNodes() {
    this.nodes.forEach(node => {
      const size = 2 + node.activity * 4;
      const opacity = 0.4 + node.activity * 0.6;
      
      this.ctx.fillStyle = `rgba(51, 51, 51, ${opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
  
  // Radiance Family: Center + Emanation + Infinite Extension
  renderRadiance() {
    const animate = () => {
      this.ctx.fillStyle = '#F0EEE6';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      const rayCount = this.params.rayCount || 24;
      const centerStrength = this.params.centerStrength || 0.8;
      const pulseFreq = this.params.pulseFrequency || 0.02;
      
      // Central pulse
      const pulse = 0.5 + Math.sin(this.time * pulseFreq) * 0.3;
      
      // Draw rays
      for (let i = 0; i < rayCount; i++) {
        this.drawRadianceRay(i, rayCount, pulse, centerStrength);
      }
      
      // Central source
      this.drawCentralSource(pulse, centerStrength);
      
      this.time += this.params.temporalFrequency || 0.01;
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  drawRadianceRay(rayIndex, totalRays, pulse, centerStrength) {
    const angle = (rayIndex / totalRays) * Math.PI * 2;
    const length = 200 + Math.sin(this.time + rayIndex * 0.2) * 50;
    
    this.ctx.strokeStyle = `rgba(51, 51, 51, ${0.3 + pulse * 0.3})`;
    this.ctx.lineWidth = 1 + pulse * 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY);
    this.ctx.lineTo(
      this.centerX + Math.cos(angle) * length * pulse,
      this.centerY + Math.sin(angle) * length * pulse
    );
    this.ctx.stroke();
    
    // Ray endpoint particles
    this.ctx.fillStyle = `rgba(51, 51, 51, ${0.4 + pulse * 0.4})`;
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX + Math.cos(angle) * length * pulse,
      this.centerY + Math.sin(angle) * length * pulse,
      2 + pulse * 2, 0, Math.PI * 2
    );
    this.ctx.fill();
  }
  
  drawCentralSource(pulse, centerStrength) {
    this.ctx.fillStyle = `rgba(51, 51, 51, ${centerStrength * (0.6 + pulse * 0.4)})`;
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, 8 + pulse * 6, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  // Additional families would be implemented here...
  // Flow, Strata, Balance, Collapse, Grid, Chaos
  
  // Utility methods
  getSourcePosition(sourceIndex, totalSources) {
    const angle = (sourceIndex / totalSources) * Math.PI * 2;
    const radius = 150;
    return {
      x: this.centerX + Math.cos(angle) * radius,
      y: this.centerY + Math.sin(angle) * radius
    };
  }
  
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  // Color palette generation based on mood and season
  generateColorPalette(mood, season) {
    const palettes = {
      contemplative: {
        winter: ['#4a5568', '#718096', '#a0aec0'],
        spring: ['#38a169', '#68d391', '#9ae6b4'],
        summer: ['#d69e2e', '#f6e05e', '#faf089'],
        autumn: ['#c53030', '#fc8181', '#feb2b2']
      },
      urgent: {
        winter: ['#2d3748', '#4a5568', '#718096'],
        spring: ['#276749', '#38a169', '#48bb78'],
        summer: ['#b7791f', '#d69e2e', '#ecc94b'],
        autumn: ['#9b2c2c', '#c53030', '#e53e3e']
      }
      // Additional mood-season combinations...
    };
    
    return palettes[mood]?.[season] || ['#333333', '#666666', '#999999'];
  }
}

// Factory function for creating procedural glyphs
function createProceduralGlyph(canvas, parameters) {
  const renderer = new ProceduralGlyphRenderer(canvas, parameters);
  renderer.render();
  return renderer;
}

// Export for use in glyph system
if (typeof window !== 'undefined') {
  window.ProceduralGlyphRenderer = ProceduralGlyphRenderer;
  window.createProceduralGlyph = createProceduralGlyph;
}

// Example usage:
/*
const parameters = {
  family: 'Interference',
  waveSources: 4,
  temporalFrequency: 0.015,
  phaseShift: Math.PI / 3,
  intensity: 0.4,
  mood: 'contemplative',
  season: 'winter'
};

const canvas = document.getElementById('glyph-canvas');
const glyph = createProceduralGlyph(canvas, parameters);
*/