// Radiance Family Glyph Renderer
// Creates emanation patterns - source, spiritual center, infinite reach
class RadianceRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      rayCount: params.rayCount || 12,
      coreRadius: params.coreRadius || 20,
      maxRadius: params.maxRadius || 200,
      pulseFrequency: params.pulseFrequency || (window.SacredPalette?.timing?.breathRate || 0.001),
      rayType: params.rayType || 'classic', // classic, spiral, fibonacci, burst
      intensity: params.intensity || 0.8,
      centerStrength: params.centerStrength || 1.0,
      breathingAmplitude: params.breathingAmplitude || 0.3,
      emanationSpeed: params.emanationSpeed || 0.5,
      spiritualResonance: params.spiritualResonance || 0.7,
      ...params
    };
    this.time = 0;
    this.rays = [];
    this.particles = [];
    this.animationId = null;
    this.center = { x: 0, y: 0 };
    this.initRadiance();
  }

  initRadiance() {
    const { width, height } = this.canvas;
    this.center = {
      x: width / 2,
      y: height / 2
    };
    
    this.initRays();
    this.initEmanationParticles();
  }

  initRays() {
    this.rays = [];
    
    switch (this.params.rayType) {
      case 'classic':
        this.initClassicRays();
        break;
      case 'spiral':
        this.initSpiralRays();
        break;
      case 'fibonacci':
        this.initFibonacciRays();
        break;
      case 'burst':
        this.initBurstRays();
        break;
    }
  }

  initClassicRays() {
    for (let i = 0; i < this.params.rayCount; i++) {
      const angle = (i / this.params.rayCount) * Math.PI * 2;
      
      this.rays.push({
        angle: angle,
        baseAngle: angle,
        length: this.params.maxRadius,
        intensity: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        thickness: 2 + Math.random() * 3,
        type: 'primary'
      });
      
      // Add secondary rays between primaries
      if (this.params.rayCount <= 8) {
        const secondaryAngle = angle + (Math.PI / this.params.rayCount);
        this.rays.push({
          angle: secondaryAngle,
          baseAngle: secondaryAngle,
          length: this.params.maxRadius * 0.6,
          intensity: 0.2 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
          thickness: 1 + Math.random() * 2,
          type: 'secondary'
        });
      }
    }
  }

  initSpiralRays() {
    const spiralArms = Math.min(this.params.rayCount, 5);
    const raysPerArm = Math.ceil(this.params.rayCount / spiralArms);
    
    for (let arm = 0; arm < spiralArms; arm++) {
      for (let r = 0; r < raysPerArm; r++) {
        const baseAngle = (arm / spiralArms) * Math.PI * 2;
        const spiralOffset = (r / raysPerArm) * Math.PI * 4; // Two full rotations
        const angle = baseAngle + spiralOffset;
        const distance = (r / raysPerArm) * this.params.maxRadius;
        
        this.rays.push({
          angle: angle,
          baseAngle: baseAngle,
          spiralDistance: distance,
          length: this.params.maxRadius - distance * 0.3,
          intensity: 1 - (r / raysPerArm) * 0.6,
          phase: r * 0.5,
          thickness: 3 - (r / raysPerArm) * 2,
          type: 'spiral',
          armIndex: arm
        });
      }
    }
  }

  initFibonacciRays() {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
    
    for (let i = 0; i < this.params.rayCount; i++) {
      const angle = i * goldenAngle;
      const radius = Math.sqrt(i) * (this.params.maxRadius / Math.sqrt(this.params.rayCount));
      
      this.rays.push({
        angle: angle,
        baseAngle: angle,
        fibonacciIndex: i,
        fibonacciRadius: radius,
        length: this.params.maxRadius - radius * 0.2,
        intensity: 0.8 - (radius / this.params.maxRadius) * 0.5,
        phase: i * 0.1,
        thickness: 2 + (1 - radius / this.params.maxRadius) * 2,
        type: 'fibonacci'
      });
    }
  }

  initBurstRays() {
    const burstCount = 3;
    const raysPerBurst = Math.ceil(this.params.rayCount / burstCount);
    
    for (let burst = 0; burst < burstCount; burst++) {
      const burstAngle = (burst / burstCount) * Math.PI * 2;
      const burstSpread = Math.PI / 6; // 30 degree spread
      
      for (let r = 0; r < raysPerBurst; r++) {
        const angle = burstAngle + (Math.random() - 0.5) * burstSpread;
        const burstIntensity = 1 - (r / raysPerBurst) * 0.7;
        
        this.rays.push({
          angle: angle,
          baseAngle: burstAngle,
          burstIndex: burst,
          length: this.params.maxRadius * (0.5 + Math.random() * 0.5),
          intensity: burstIntensity,
          phase: burst + r * 0.3,
          thickness: 1 + burstIntensity * 3,
          type: 'burst'
        });
      }
    }
  }

  initEmanationParticles() {
    this.particles = [];
    const particleCount = Math.floor(this.params.rayCount * 2);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: this.params.coreRadius + Math.random() * 50,
        speed: 0.5 + Math.random() * 1.5,
        life: Math.random(),
        maxLife: 100 + Math.random() * 200,
        size: 1 + Math.random() * 2,
        intensity: Math.random()
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
    this.time += this.params.pulseFrequency;
    this.updateRadiance();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateRadiance() {
    // Update core breathing
    const breathing = Math.sin(this.time * 2) * this.params.breathingAmplitude;
    const currentCoreRadius = this.params.coreRadius * (1 + breathing);
    
    // Update ray dynamics
    this.rays.forEach(ray => {
      switch (ray.type) {
        case 'spiral':
          ray.angle = ray.baseAngle + this.time * 0.5 + ray.spiralDistance * 0.01;
          break;
        case 'fibonacci':
          ray.angle = ray.baseAngle + this.time * 0.2 * ray.fibonacciIndex * 0.1;
          break;
        case 'burst':
          const burstPulse = Math.sin(this.time * 3 + ray.burstIndex * 2) * 0.1;
          ray.length = ray.length * (1 + burstPulse);
          break;
        default:
          // Classic ray breathing
          ray.angle = ray.baseAngle + Math.sin(this.time + ray.phase) * 0.1;
      }
      
      // Universal intensity pulsing
      const pulse = Math.sin(this.time * 2 + ray.phase) * 0.3 + 0.7;
      ray.currentIntensity = ray.intensity * pulse * this.params.intensity;
    });
    
    // Update emanation particles
    this.particles.forEach(particle => {
      particle.distance += particle.speed * this.params.emanationSpeed;
      particle.life++;
      
      // Reset particles that travel too far
      if (particle.distance > this.params.maxRadius || particle.life > particle.maxLife) {
        particle.distance = currentCoreRadius;
        particle.angle = Math.random() * Math.PI * 2;
        particle.life = 0;
        particle.intensity = Math.random();
      }
    });
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw radial background
    this.renderRadialBackground();
    
    // Draw emanation particles
    this.renderEmanationParticles();
    
    // Draw rays
    this.renderRays();
    
    // Draw central core
    this.renderCore();
    
    // Draw spiritual resonance effects
    this.renderSpiritualResonance();
  }

  renderRadialBackground() {
    const { width, height } = this.canvas;
    const maxDimension = Math.max(width, height);
    
    const gradient = this.ctx.createRadialGradient(
      this.center.x, this.center.y, 0,
      this.center.x, this.center.y, maxDimension / 2
    );
    
    const coreAlpha = this.params.centerStrength * 0.1;
    // Use Sacred Palette radiance colors (candlelight on vellum)
    const palette = window.SacredPalette || { families: { radiance: {} } };
    const colors = palette.families.radiance;
    const primaryRgb = palette.utils?.hexToRgb(colors.primary || '#B89968') || {r: 184, g: 153, b: 104};
    const accentRgb = palette.utils?.hexToRgb(colors.accent || '#D4A574') || {r: 212, g: 165, b: 116};
    
    gradient.addColorStop(0, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${coreAlpha})`);
    gradient.addColorStop(0.3, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${coreAlpha * 0.5})`);
    gradient.addColorStop(0.7, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${coreAlpha * 0.2})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
  }

  renderRays() {
    this.rays.forEach(ray => {
      const endX = this.center.x + Math.cos(ray.angle) * ray.length;
      const endY = this.center.y + Math.sin(ray.angle) * ray.length;
      
      // Ray gradient
      const rayGradient = this.ctx.createLinearGradient(
        this.center.x, this.center.y, endX, endY
      );
      
      // Sacred Palette radiance ray colors
      const palette = window.SacredPalette || { families: { radiance: {} } };
      const colors = palette.families.radiance;
      const alpha = (ray.currentIntensity || ray.intensity) * 0.6; // More contemplative
      
      const primaryRgb = palette.utils?.hexToRgb(colors.primary || '#B89968') || {r: 184, g: 153, b: 104};
      const accentRgb = palette.utils?.hexToRgb(colors.accent || '#D4A574') || {r: 212, g: 165, b: 116};
      
      rayGradient.addColorStop(0, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${alpha})`);
      rayGradient.addColorStop(0.7, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${alpha * 0.6})`);
      rayGradient.addColorStop(1, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0)`);
      
      this.ctx.strokeStyle = rayGradient;
      this.ctx.lineWidth = ray.thickness;
      this.ctx.lineCap = 'round';
      
      this.ctx.beginPath();
      this.ctx.moveTo(this.center.x, this.center.y);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
      
      // Add ray glow for primary rays
      if (ray.type === 'primary' || ray.type === 'spiral') {
        this.ctx.strokeStyle = `rgba(255, 255, 200, ${alpha * 0.3})`;
        this.ctx.lineWidth = ray.thickness + 4;
        this.ctx.beginPath();
        this.ctx.moveTo(this.center.x, this.center.y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
      }
    });
  }

  renderCore() {
    const breathing = Math.sin(this.time * 2) * this.params.breathingAmplitude;
    const currentRadius = this.params.coreRadius * (1 + breathing);
    
    // Core glow
    const glowGradient = this.ctx.createRadialGradient(
      this.center.x, this.center.y, 0,
      this.center.x, this.center.y, currentRadius * 3
    );
    
    const glowIntensity = this.params.centerStrength * 0.8;
    glowGradient.addColorStop(0, `rgba(255, 255, 255, ${glowIntensity})`);
    glowGradient.addColorStop(0.3, `rgba(255, 200, 100, ${glowIntensity * 0.6})`);
    glowGradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
    
    this.ctx.fillStyle = glowGradient;
    this.ctx.beginPath();
    this.ctx.arc(this.center.x, this.center.y, currentRadius * 3, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Core center
    const coreGradient = this.ctx.createRadialGradient(
      this.center.x, this.center.y, 0,
      this.center.x, this.center.y, currentRadius
    );
    
    coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    coreGradient.addColorStop(0.7, 'rgba(255, 200, 100, 0.9)');
    coreGradient.addColorStop(1, 'rgba(255, 150, 50, 0.7)');
    
    this.ctx.fillStyle = coreGradient;
    this.ctx.beginPath();
    this.ctx.arc(this.center.x, this.center.y, currentRadius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  renderEmanationParticles() {
    this.particles.forEach(particle => {
      const x = this.center.x + Math.cos(particle.angle) * particle.distance;
      const y = this.center.y + Math.sin(particle.angle) * particle.distance;
      
      const lifeRatio = particle.life / particle.maxLife;
      const alpha = (1 - lifeRatio) * particle.intensity * 0.8;
      const size = particle.size * (1 - lifeRatio * 0.5);
      
      this.ctx.fillStyle = `rgba(255, 200, 100, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  renderSpiritualResonance() {
    if (this.params.spiritualResonance < 0.5) return;
    
    // Spiritual resonance rings
    const ringCount = 3;
    for (let i = 0; i < ringCount; i++) {
      const ringRadius = this.params.coreRadius * (2 + i) + 
        Math.sin(this.time * 2 - i * 0.5) * 10;
      const alpha = this.params.spiritualResonance * (1 - i * 0.3) * 0.3;
      
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(this.center.x, this.center.y, ringRadius, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    
    // Divine light emanation
    const divineIntensity = Math.sin(this.time * 0.5) * 0.2 + 0.3;
    const divineGradient = this.ctx.createRadialGradient(
      this.center.x, this.center.y, 0,
      this.center.x, this.center.y, this.params.maxRadius
    );
    
    divineGradient.addColorStop(0, `rgba(255, 255, 255, ${divineIntensity * this.params.spiritualResonance})`);
    divineGradient.addColorStop(0.1, `rgba(255, 255, 200, ${divineIntensity * 0.5})`);
    divineGradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
    
    this.ctx.fillStyle = divineGradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  destroy() {
    this.stop();
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.Radiance = RadianceRenderer;
}