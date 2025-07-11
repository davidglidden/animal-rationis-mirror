// Threshold Family Glyph Renderer
// Creates liminal space patterns - portals, membranes, phase boundaries
class ThresholdRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      thresholdType: params.thresholdType || 'portal', // portal, membrane, phase, gateway
      permeability: params.permeability || 0.5,
      transitionSpeed: params.transitionSpeed || 0.02,
      dimensionalOverlap: params.dimensionalOverlap || 0.3,
      boundaryTension: params.boundaryTension || 1.0,
      phaseDensity: params.phaseDensity || 0.7,
      temporalShift: params.temporalShift || 0.1,
      ...params
    };
    this.time = 0;
    this.thresholds = [];
    this.particles = [];
    this.animationId = null;
    this.initThresholds();
    this.initTransitionParticles();
  }

  initThresholds() {
    this.thresholds = [];
    const { width, height } = this.canvas;
    
    switch (this.params.thresholdType) {
      case 'portal':
        // Central portal with rotating boundary
        this.thresholds.push({
          x: width / 2,
          y: height / 2,
          innerRadius: 30,
          outerRadius: 60,
          rotationSpeed: 0.01,
          permeability: this.params.permeability,
          phase: 0
        });
        break;
        
      case 'membrane':
        // Flexible membrane across canvas
        const points = 12;
        for (let i = 0; i <= points; i++) {
          this.thresholds.push({
            x: (i / points) * width,
            y: height / 2,
            baseY: height / 2,
            amplitude: 20,
            frequency: 0.02 + i * 0.001,
            phase: i * Math.PI / 6,
            tension: this.params.boundaryTension
          });
        }
        break;
        
      case 'phase':
        // Multiple phase boundaries
        for (let i = 0; i < 3; i++) {
          this.thresholds.push({
            x: width * (0.2 + i * 0.3),
            y: height / 2,
            width: 40,
            height: height * 0.8,
            phaseShift: i * Math.PI / 3,
            density: this.params.phaseDensity,
            transitionZone: 15
          });
        }
        break;
        
      case 'gateway':
        // Architectural gateway structure
        this.thresholds.push({
          x: width / 2,
          y: height / 2,
          archWidth: 100,
          archHeight: 120,
          pillars: [
            { x: width / 2 - 50, y: height / 2, height: 100 },
            { x: width / 2 + 50, y: height / 2, height: 100 }
          ],
          keystone: { x: width / 2, y: height / 2 - 60 }
        });
        break;
    }
  }

  initTransitionParticles() {
    this.particles = [];
    const particleCount = 50;
    const { width, height } = this.canvas;
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        phase: Math.random() < 0.5 ? 'before' : 'after',
        transitionProgress: 0,
        size: 2 + Math.random() * 3,
        hue: Math.random() * 60 + 180, // Blue to cyan range
        opacity: 0.7 + Math.random() * 0.3
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
    this.time += this.params.transitionSpeed;
    this.updateThresholds();
    this.updateParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateThresholds() {
    switch (this.params.thresholdType) {
      case 'portal':
        this.thresholds.forEach(threshold => {
          threshold.phase += threshold.rotationSpeed;
          // Breathing portal effect
          threshold.innerRadius = 30 + Math.sin(this.time * 2) * 5;
          threshold.outerRadius = 60 + Math.cos(this.time * 1.5) * 8;
        });
        break;
        
      case 'membrane':
        this.thresholds.forEach((point, index) => {
          point.y = point.baseY + 
            Math.sin(this.time * point.frequency + point.phase) * point.amplitude +
            Math.sin(this.time * 0.5 + index * 0.2) * point.amplitude * 0.3;
        });
        break;
        
      case 'phase':
        this.thresholds.forEach(boundary => {
          boundary.phaseShift += 0.01;
        });
        break;
        
      case 'gateway':
        // Subtle gateway breathing
        const gateway = this.thresholds[0];
        gateway.archHeight = 120 + Math.sin(this.time) * 5;
        break;
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      // Move particle
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Check threshold interactions
      const interaction = this.checkThresholdInteraction(particle);
      
      if (interaction.crossing) {
        // Begin transition
        if (particle.transitionProgress === 0) {
          particle.transitionProgress = 0.01;
        }
      }
      
      // Update transition
      if (particle.transitionProgress > 0) {
        particle.transitionProgress += this.params.transitionSpeed * 2;
        
        if (particle.transitionProgress >= 1) {
          // Complete transition
          particle.phase = particle.phase === 'before' ? 'after' : 'before';
          particle.transitionProgress = 0;
          particle.hue = (particle.hue + 180) % 360; // Color shift
        }
      }
      
      // Boundary wrapping
      const { width, height } = this.canvas;
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;
    });
  }

  checkThresholdInteraction(particle) {
    let crossing = false;
    let intensity = 0;
    
    switch (this.params.thresholdType) {
      case 'portal':
        const portal = this.thresholds[0];
        const distance = Math.sqrt(
          (particle.x - portal.x) ** 2 + (particle.y - portal.y) ** 2
        );
        crossing = distance > portal.innerRadius && distance < portal.outerRadius;
        intensity = crossing ? (1 - Math.abs(distance - (portal.innerRadius + portal.outerRadius) / 2) / 
          ((portal.outerRadius - portal.innerRadius) / 2)) : 0;
        break;
        
      case 'membrane':
        // Check distance to membrane curve
        let minDistance = Infinity;
        for (let i = 0; i < this.thresholds.length - 1; i++) {
          const p1 = this.thresholds[i];
          const p2 = this.thresholds[i + 1];
          const distance = this.distanceToLine(particle, p1, p2);
          minDistance = Math.min(minDistance, distance);
        }
        crossing = minDistance < 10;
        intensity = crossing ? Math.max(0, 1 - minDistance / 10) : 0;
        break;
        
      case 'phase':
        this.thresholds.forEach(boundary => {
          const distance = Math.abs(particle.x - boundary.x);
          if (distance < boundary.transitionZone) {
            crossing = true;
            intensity = Math.max(intensity, 1 - distance / boundary.transitionZone);
          }
        });
        break;
        
      case 'gateway':
        const gateway = this.thresholds[0];
        const inGateway = Math.abs(particle.x - gateway.x) < gateway.archWidth / 2 &&
                         Math.abs(particle.y - gateway.y) < gateway.archHeight / 2;
        crossing = inGateway;
        intensity = crossing ? 0.8 : 0;
        break;
    }
    
    return { crossing, intensity };
  }

  distanceToLine(point, lineStart, lineEnd) {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) param = dot / lenSq;
    
    let xx, yy;
    if (param < 0) {
      xx = lineStart.x;
      yy = lineStart.y;
    } else if (param > 1) {
      xx = lineEnd.x;
      yy = lineEnd.y;
    } else {
      xx = lineStart.x + param * C;
      yy = lineStart.y + param * D;
    }
    
    const dx = point.x - xx;
    const dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw dimensional background layers
    this.renderDimensionalLayers();
    
    // Draw threshold structures
    this.renderThresholds();
    
    // Draw transition particles
    this.renderParticles();
    
    // Draw threshold effects
    this.renderThresholdEffects();
  }

  renderDimensionalLayers() {
    const { width, height } = this.canvas;
    
    // Before-space (left/background)
    const beforeGradient = this.ctx.createLinearGradient(0, 0, width / 2, 0);
    beforeGradient.addColorStop(0, 'rgba(20, 20, 50, 0.3)');
    beforeGradient.addColorStop(1, 'rgba(40, 40, 80, 0.1)');
    this.ctx.fillStyle = beforeGradient;
    this.ctx.fillRect(0, 0, width / 2, height);
    
    // After-space (right/foreground)  
    const afterGradient = this.ctx.createLinearGradient(width / 2, 0, width, 0);
    afterGradient.addColorStop(0, 'rgba(80, 40, 40, 0.1)');
    afterGradient.addColorStop(1, 'rgba(50, 20, 20, 0.3)');
    this.ctx.fillStyle = afterGradient;
    this.ctx.fillRect(width / 2, 0, width / 2, height);
  }

  renderThresholds() {
    switch (this.params.thresholdType) {
      case 'portal':
        this.renderPortal();
        break;
      case 'membrane':
        this.renderMembrane();
        break;
      case 'phase':
        this.renderPhaseBoundaries();
        break;
      case 'gateway':
        this.renderGateway();
        break;
    }
  }

  renderPortal() {
    const portal = this.thresholds[0];
    
    // Portal rim
    const rimGradient = this.ctx.createRadialGradient(
      portal.x, portal.y, portal.innerRadius,
      portal.x, portal.y, portal.outerRadius
    );
    rimGradient.addColorStop(0, 'rgba(100, 200, 255, 0.8)');
    rimGradient.addColorStop(0.5, 'rgba(200, 100, 255, 0.6)');
    rimGradient.addColorStop(1, 'rgba(100, 200, 255, 0.2)');
    
    this.ctx.fillStyle = rimGradient;
    this.ctx.beginPath();
    this.ctx.arc(portal.x, portal.y, portal.outerRadius, 0, Math.PI * 2);
    this.ctx.arc(portal.x, portal.y, portal.innerRadius, 0, Math.PI * 2, true);
    this.ctx.fill();
    
    // Portal energy rings
    for (let i = 0; i < 3; i++) {
      const ringRadius = portal.innerRadius + i * 10 + Math.sin(this.time * 2 + i) * 3;
      this.ctx.strokeStyle = `rgba(150, 150, 255, ${0.4 - i * 0.1})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(portal.x, portal.y, ringRadius, 0, Math.PI * 2);
      this.ctx.stroke();
    }
  }

  renderMembrane() {
    // Draw membrane curve
    this.ctx.strokeStyle = 'rgba(180, 180, 255, 0.7)';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    
    this.thresholds.forEach((point, index) => {
      if (index === 0) {
        this.ctx.moveTo(point.x, point.y);
      } else {
        this.ctx.lineTo(point.x, point.y);
      }
    });
    this.ctx.stroke();
    
    // Membrane tension visualizers
    this.thresholds.forEach((point, index) => {
      if (index % 3 === 0) {
        const tensionGradient = this.ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, 15
        );
        tensionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        tensionGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.ctx.fillStyle = tensionGradient;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }

  renderPhaseBoundaries() {
    this.thresholds.forEach(boundary => {
      // Phase boundary core
      this.ctx.fillStyle = `rgba(200, 150, 255, ${boundary.density * 0.3})`;
      this.ctx.fillRect(
        boundary.x - boundary.width / 2, 
        boundary.y - boundary.height / 2,
        boundary.width, 
        boundary.height
      );
      
      // Phase distortion effect
      const distortion = Math.sin(this.time * 3 + boundary.phaseShift) * 5;
      this.ctx.strokeStyle = `rgba(255, 200, 150, 0.6)`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(boundary.x + distortion, boundary.y - boundary.height / 2);
      this.ctx.lineTo(boundary.x - distortion, boundary.y + boundary.height / 2);
      this.ctx.stroke();
    });
  }

  renderGateway() {
    const gateway = this.thresholds[0];
    
    // Draw pillars
    gateway.pillars.forEach(pillar => {
      this.ctx.fillStyle = 'rgba(150, 150, 180, 0.8)';
      this.ctx.fillRect(
        pillar.x - 8, 
        pillar.y - pillar.height / 2, 
        16, 
        pillar.height
      );
    });
    
    // Draw arch
    this.ctx.strokeStyle = 'rgba(180, 180, 200, 0.9)';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.arc(
      gateway.x, 
      gateway.y - gateway.archHeight / 4, 
      gateway.archWidth / 2, 
      0, 
      Math.PI
    );
    this.ctx.stroke();
    
    // Draw keystone
    this.ctx.fillStyle = 'rgba(200, 200, 220, 0.9)';
    this.ctx.fillRect(gateway.keystone.x - 6, gateway.keystone.y - 4, 12, 8);
  }

  renderParticles() {
    this.particles.forEach(particle => {
      const interaction = this.checkThresholdInteraction(particle);
      
      // Calculate rendering properties based on phase and transition
      let alpha = particle.opacity;
      let size = particle.size;
      let hue = particle.hue;
      
      if (particle.transitionProgress > 0) {
        // Particle is transitioning
        alpha *= (1 + Math.sin(particle.transitionProgress * Math.PI) * 0.5);
        size *= (1 + particle.transitionProgress * 0.5);
        hue = (particle.hue + particle.transitionProgress * 60) % 360;
      }
      
      if (interaction.crossing) {
        alpha += interaction.intensity * 0.3;
        size += interaction.intensity * 2;
      }
      
      // Phase-based color shift
      if (particle.phase === 'after') {
        hue = (hue + 30) % 360;
      }
      
      this.ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw transition aura
      if (particle.transitionProgress > 0) {
        const auraRadius = size * (2 + particle.transitionProgress * 3);
        const auraGradient = this.ctx.createRadialGradient(
          particle.x, particle.y, size,
          particle.x, particle.y, auraRadius
        );
        auraGradient.addColorStop(0, `hsla(${hue}, 80%, 80%, 0.3)`);
        auraGradient.addColorStop(1, `hsla(${hue}, 80%, 80%, 0)`);
        
        this.ctx.fillStyle = auraGradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, auraRadius, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }

  renderThresholdEffects() {
    // Draw dimensional overlap regions
    const { width, height } = this.canvas;
    
    // Overlap shimmer effect
    const shimmer = Math.sin(this.time * 4) * 0.1 + 0.1;
    this.ctx.fillStyle = `rgba(255, 255, 255, ${shimmer * this.params.dimensionalOverlap})`;
    
    switch (this.params.thresholdType) {
      case 'portal':
        const portal = this.thresholds[0];
        this.ctx.beginPath();
        this.ctx.arc(portal.x, portal.y, portal.outerRadius + 10, 0, Math.PI * 2);
        this.ctx.fill();
        break;
        
      case 'membrane':
        // Shimmer along membrane
        this.ctx.fillRect(0, height / 2 - 20, width, 40);
        break;
        
      case 'phase':
        this.thresholds.forEach(boundary => {
          this.ctx.fillRect(
            boundary.x - boundary.transitionZone,
            0,
            boundary.transitionZone * 2,
            height
          );
        });
        break;
        
      case 'gateway':
        const gateway = this.thresholds[0];
        this.ctx.fillRect(
          gateway.x - gateway.archWidth / 2 - 10,
          gateway.y - gateway.archHeight / 2 - 10,
          gateway.archWidth + 20,
          gateway.archHeight + 20
        );
        break;
    }
  }

  destroy() {
    this.stop();
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.Threshold = ThresholdRenderer;
}