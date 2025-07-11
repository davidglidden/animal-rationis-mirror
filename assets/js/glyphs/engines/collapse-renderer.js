// Collapse Family Glyph Renderer
// Creates collapse patterns - gravitational, structural, systemic
class CollapseRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      collapseType: params.collapseType || 'gravitational', // gravitational, structural, cascade
      particleCount: params.particleCount || 150,
      collapseSpeed: params.collapseSpeed || 0.02,
      centerMass: params.centerMass || 5,
      eventHorizon: params.eventHorizon || 30,
      shearForce: params.shearForce || 0.1,
      fragmentationRate: params.fragmentationRate || 0.01,
      ...params
    };
    this.time = 0;
    this.particles = [];
    this.collapseCenter = { x: 0, y: 0 };
    this.animationId = null;
    this.initParticles();
    this.initCollapseCenter();
  }

  initCollapseCenter() {
    const { width, height } = this.canvas;
    this.collapseCenter = {
      x: width / 2,
      y: height / 2
    };
  }

  initParticles() {
    this.particles = [];
    const { width, height } = this.canvas;
    
    for (let i = 0; i < this.params.particleCount; i++) {
      // Start particles in various formations based on collapse type
      let x, y, vx, vy, mass, structural;
      
      switch (this.params.collapseType) {
        case 'gravitational':
          // Particles start in loose orbits
          const angle = Math.random() * Math.PI * 2;
          const radius = 80 + Math.random() * 120;
          x = width / 2 + Math.cos(angle) * radius;
          y = height / 2 + Math.sin(angle) * radius;
          vx = Math.sin(angle) * 0.5;
          vy = -Math.cos(angle) * 0.5;
          mass = 0.5 + Math.random() * 1.5;
          structural = 1;
          break;
          
        case 'structural':
          // Particles start in structured grid
          const cols = Math.ceil(Math.sqrt(this.params.particleCount));
          const gridX = (i % cols) / cols;
          const gridY = Math.floor(i / cols) / cols;
          x = gridX * width * 0.8 + width * 0.1;
          y = gridY * height * 0.8 + height * 0.1;
          vx = (Math.random() - 0.5) * 0.1;
          vy = (Math.random() - 0.5) * 0.1;
          mass = 1;
          structural = 0.8 + Math.random() * 0.4; // Structural integrity
          break;
          
        case 'cascade':
          // Particles start in cascading layers
          const layer = Math.floor(i / (this.params.particleCount / 5));
          x = Math.random() * width;
          y = layer * (height / 5) + Math.random() * (height / 5);
          vx = (Math.random() - 0.5) * 0.2;
          vy = Math.random() * 0.1;
          mass = 1 - layer * 0.1;
          structural = 1 - layer * 0.15;
          break;
          
        default:
          x = Math.random() * width;
          y = Math.random() * height;
          vx = (Math.random() - 0.5) * 0.5;
          vy = (Math.random() - 0.5) * 0.5;
          mass = 1;
          structural = 1;
      }
      
      this.particles.push({
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        mass: mass,
        structural: structural,
        collapsed: false,
        fragmentTime: 0,
        hue: Math.random() * 60 + 300, // Purple to red range
        life: 1,
        trail: []
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
    this.time += this.params.collapseSpeed;
    this.updateCollapse();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateCollapse() {
    this.particles.forEach(particle => {
      if (particle.collapsed) {
        particle.fragmentTime += 0.01;
        return;
      }
      
      const dx = this.collapseCenter.x - particle.x;
      const dy = this.collapseCenter.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      switch (this.params.collapseType) {
        case 'gravitational':
          this.updateGravitationalCollapse(particle, dx, dy, distance);
          break;
        case 'structural':
          this.updateStructuralCollapse(particle, dx, dy, distance);
          break;
        case 'cascade':
          this.updateCascadeCollapse(particle, dx, dy, distance);
          break;
      }
      
      // Check for collapse threshold
      if (distance < this.params.eventHorizon) {
        particle.collapsed = true;
        particle.life = 0.5;
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Add to trail
      particle.trail.push({ x: particle.x, y: particle.y, alpha: particle.life });
      if (particle.trail.length > 20) {
        particle.trail.shift();
      }
      
      // Apply damping based on structural integrity
      particle.vx *= (0.99 - particle.structural * 0.01);
      particle.vy *= (0.99 - particle.structural * 0.01);
    });
  }

  updateGravitationalCollapse(particle, dx, dy, distance) {
    // Gravitational attraction with relativistic effects near center
    const force = this.params.centerMass / (distance * distance + 1);
    const forceX = (dx / distance) * force;
    const forceY = (dy / distance) * force;
    
    particle.vx += forceX * 0.01;
    particle.vy += forceY * 0.01;
    
    // Tidal forces cause stretching
    if (distance < this.params.eventHorizon * 2) {
      const tidalForce = this.params.shearForce / distance;
      particle.vx += (Math.random() - 0.5) * tidalForce;
      particle.vy += (Math.random() - 0.5) * tidalForce;
      particle.structural *= 0.999;
    }
  }

  updateStructuralCollapse(particle, dx, dy, distance) {
    // Structural failure propagates stress
    particle.structural -= this.params.fragmentationRate;
    
    if (particle.structural < 0.3) {
      // Apply collapse forces toward center
      const collapseForce = (1 - particle.structural) * 0.05;
      particle.vx += (dx / distance) * collapseForce;
      particle.vy += (dy / distance) * collapseForce;
      
      // Random structural failure vectors
      particle.vx += (Math.random() - 0.5) * this.params.shearForce;
      particle.vy += (Math.random() - 0.5) * this.params.shearForce;
    }
  }

  updateCascadeCollapse(particle, dx, dy, distance) {
    // Cascade effect - particles influence nearby ones
    let neighborInfluence = 0;
    this.particles.forEach(other => {
      if (other !== particle && !other.collapsed) {
        const otherDx = other.x - particle.x;
        const otherDy = other.y - particle.y;
        const otherDistance = Math.sqrt(otherDx * otherDx + otherDy * otherDy);
        
        if (otherDistance < 50 && other.structural < particle.structural) {
          neighborInfluence += (1 - other.structural) * 0.1;
        }
      }
    });
    
    particle.structural -= neighborInfluence;
    
    // Apply cascade forces
    if (particle.structural < 0.7) {
      const cascadeForce = (0.7 - particle.structural) * 0.03;
      particle.vx += (dx / distance) * cascadeForce;
      particle.vy += (dy / distance) * cascadeForce;
      particle.vy += this.params.collapseSpeed * 2; // Gravity effect
    }
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw background with collapse distortion
    const gradient = this.ctx.createRadialGradient(
      this.collapseCenter.x, this.collapseCenter.y, 0,
      this.collapseCenter.x, this.collapseCenter.y, 200
    );
    gradient.addColorStop(0, 'rgba(50, 0, 0, 0.3)');
    gradient.addColorStop(0.5, 'rgba(20, 0, 20, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw event horizon
    this.ctx.strokeStyle = 'rgba(255, 100, 100, 0.3)';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    this.ctx.beginPath();
    this.ctx.arc(this.collapseCenter.x, this.collapseCenter.y, this.params.eventHorizon, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    
    // Draw particles
    this.particles.forEach(particle => {
      // Draw trail
      particle.trail.forEach((point, index) => {
        const alpha = (index / particle.trail.length) * particle.life * 0.3;
        this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 50%, ${alpha})`;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        this.ctx.fill();
      });
      
      if (particle.collapsed) {
        // Render as fragments/energy
        const fragmentSize = Math.sin(particle.fragmentTime * 10) * 2 + 1;
        this.ctx.fillStyle = `hsla(${particle.hue + 60}, 90%, 70%, ${particle.life})`;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, fragmentSize, 0, Math.PI * 2);
        this.ctx.fill();
        
        particle.life *= 0.98;
      } else {
        // Render as particle with structural integrity
        const size = 2 + particle.mass * 2;
        const structuralHue = particle.hue + (1 - particle.structural) * 60;
        const alpha = particle.structural * 0.8 + 0.2;
        
        // Draw particle glow
        const glowGradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 2
        );
        glowGradient.addColorStop(0, `hsla(${structuralHue}, 80%, 60%, ${alpha})`);
        glowGradient.addColorStop(1, `hsla(${structuralHue}, 60%, 40%, 0)`);
        
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw particle core
        this.ctx.fillStyle = `hsla(${structuralHue}, 90%, 70%, ${alpha})`;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw stress indicators for low structural integrity
        if (particle.structural < 0.5) {
          this.ctx.strokeStyle = `hsla(0, 90%, 60%, ${1 - particle.structural})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, size + 2, 0, Math.PI * 2);
          this.ctx.stroke();
        }
      }
    });
    
    // Draw collapse center
    const centerPulse = Math.sin(this.time * 5) * 0.3 + 0.7;
    this.ctx.fillStyle = `rgba(255, 0, 0, ${centerPulse * 0.8})`;
    this.ctx.beginPath();
    this.ctx.arc(this.collapseCenter.x, this.collapseCenter.y, 8 * centerPulse, 0, Math.PI * 2);
    this.ctx.fill();
  }

  destroy() {
    this.stop();
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.Collapse = CollapseRenderer;
}