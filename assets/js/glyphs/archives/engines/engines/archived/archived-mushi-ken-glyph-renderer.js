// Archived Mushi Ken Glyph Renderer
// Preserves the original "From Mushi-Ken to Morra — The Ritual of Choosing" sigil design
class ArchivedMushiKenGlyphRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 400;
    
    // Three gesture zones arranged in triangle
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = 120;
    
    this.zones = [
      { // Rock zone (bottom left)
        x: this.centerX + Math.cos(Math.PI * 7/6) * this.radius,
        y: this.centerY + Math.sin(Math.PI * 7/6) * this.radius,
        name: 'rock',
        color: { r: 139, g: 121, b: 94 }, // Warm ochre
        phase: 0
      },
      { // Paper zone (top)
        x: this.centerX + Math.cos(Math.PI * 1/2) * this.radius,
        y: this.centerY + Math.sin(Math.PI * 1/2) * this.radius,
        name: 'paper',
        color: { r: 119, g: 136, b: 153 }, // Slate blue
        phase: Math.PI * 2/3
      },
      { // Scissors zone (bottom right)
        x: this.centerX + Math.cos(Math.PI * 11/6) * this.radius,
        y: this.centerY + Math.sin(Math.PI * 11/6) * this.radius,
        name: 'scissors',
        color: { r: 107, g: 142, b: 107 }, // Sage green
        phase: Math.PI * 4/3
      }
    ];
    
    this.PARTICLE_COUNT = 2400;
    this.particles = [];
    this.time = 0;
    this.globalPulse = 0;
    this.animationId = null;
    this.isRunning = false;
    
    this.initParticles();
    this.init();
  }

  initParticles() {
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      const zoneIndex = Math.floor(i / (this.PARTICLE_COUNT / 3));
      const zone = this.zones[zoneIndex];
      
      // Distribute particles around each zone
      const angle = (i % (this.PARTICLE_COUNT / 3)) / (this.PARTICLE_COUNT / 3) * Math.PI * 2;
      const dist = 20 + Math.random() * 40;
      
      this.particles.push({
        x: zone.x + Math.cos(angle) * dist,
        y: zone.y + Math.sin(angle) * dist,
        homeZone: zoneIndex,
        currentZone: zoneIndex,
        targetZone: (zoneIndex + 1) % 3,
        
        // Motion properties
        vx: 0,
        vy: 0,
        transitionProgress: 0,
        isTransitioning: false,
        
        // Visual properties
        size: 0.8 + Math.random() * 1.2,
        opacity: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        
        // Timing for synchronized gestures
        gestureTimer: Math.random() * 180, // 3-second cycle at 60fps
        lastGesture: 0
      });
    }
  }

  init() {
    this.start();
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.render();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  render() {
    if (!this.isRunning) return;
    
    this.time += 0.008; // Contemplative pace
    this.globalPulse = Math.sin(this.time * 0.5) * 0.5 + 0.5; // Slow breathing rhythm
    
    // Clear with gentle persistence
    this.ctx.fillStyle = 'rgba(245, 243, 237, 0.12)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw triadic connection lines (faint)
    this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.06)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const current = this.zones[i];
      const next = this.zones[(i + 1) % 3];
      this.ctx.moveTo(current.x, current.y);
      this.ctx.lineTo(next.x, next.y);
    }
    this.ctx.stroke();
    
    // Update and draw particles
    this.particles.forEach((particle, index) => {
      const currentZone = this.zones[particle.currentZone];
      const targetZone = this.zones[particle.targetZone];
      
      // Synchronized gesture timing (3-beat rhythm)
      particle.gestureTimer += 1;
      const gesturePhase = (particle.gestureTimer % 180) / 180; // 3-second cycle
      
      // Trigger transition on the third beat
      if (gesturePhase < 0.02 && particle.gestureTimer - particle.lastGesture > 160) {
        if (Math.random() < 0.008) { // Some particles transition
          particle.isTransitioning = true;
          particle.transitionProgress = 0;
          particle.lastGesture = particle.gestureTimer;
        }
      }
      
      if (particle.isTransitioning) {
        // Smooth transition between zones
        particle.transitionProgress += 0.006;
        
        const t = particle.transitionProgress;
        const easeT = t * t * (3 - 2 * t); // Smooth step function
        
        // Interpolate position
        particle.x = currentZone.x + (targetZone.x - currentZone.x) * easeT;
        particle.y = currentZone.y + (targetZone.y - currentZone.y) * easeT;
        
        // Add slight orbital motion during transition
        const orbitRadius = Math.sin(t * Math.PI) * 15;
        const orbitAngle = t * Math.PI * 2;
        particle.x += Math.cos(orbitAngle) * orbitRadius;
        particle.y += Math.sin(orbitAngle) * orbitRadius;
        
        if (particle.transitionProgress >= 1) {
          particle.isTransitioning = false;
          particle.currentZone = particle.targetZone;
          particle.targetZone = (particle.targetZone + 1) % 3;
          particle.transitionProgress = 0;
        }
      } else {
        // Gentle orbital motion around current zone
        const zone = this.zones[particle.currentZone];
        const orbitSpeed = 0.003 + this.globalPulse * 0.002;
        const orbitRadius = 25 + Math.sin(this.time + particle.phase) * 8;
        
        particle.phase += orbitSpeed;
        particle.x = zone.x + Math.cos(particle.phase) * orbitRadius;
        particle.y = zone.y + Math.sin(particle.phase) * orbitRadius;
      }
      
      // Draw particle
      const zone = this.zones[particle.currentZone];
      const pulseScale = 1 + Math.sin(this.time * 3 + particle.phase) * 0.1;
      
      let alpha = particle.opacity;
      if (particle.isTransitioning) {
        alpha *= 0.7 + Math.sin(particle.transitionProgress * Math.PI) * 0.3;
      }
      
      // Add synchronized pulse effect
      const syncPulse = Math.sin(this.time * 2 + particle.phase) * 0.2 + 0.8;
      alpha *= syncPulse;
      
      this.ctx.fillStyle = `rgba(${zone.color.r}, ${zone.color.g}, ${zone.color.b}, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * pulseScale, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    // Draw zone centers with breathing effect
    this.zones.forEach((zone, index) => {
      const pulseSize = 8 + this.globalPulse * 4;
      const nextZone = this.zones[(index + 1) % 3];
      
      // Zone dominance visualization
      const dominance = Math.sin(this.time * 0.3 + zone.phase) * 0.5 + 0.5;
      const alpha = 0.1 + dominance * 0.2;
      
      this.ctx.fillStyle = `rgba(${zone.color.r}, ${zone.color.g}, ${zone.color.b}, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(zone.x, zone.y, pulseSize * (1 + dominance * 0.3), 0, Math.PI * 2);
      this.ctx.fill();
      
      // Subtle directional indicator (circulation arrow)
      const arrowAlpha = 0.08 + dominance * 0.06;
      this.ctx.strokeStyle = `rgba(${zone.color.r}, ${zone.color.g}, ${zone.color.b}, ${arrowAlpha})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      
      const arrowLength = 20;
      const angle = Math.atan2(nextZone.y - zone.y, nextZone.x - zone.x);
      const arrowX = zone.x + Math.cos(angle) * (pulseSize + 15);
      const arrowY = zone.y + Math.sin(angle) * (pulseSize + 15);
      
      this.ctx.moveTo(arrowX, arrowY);
      this.ctx.lineTo(arrowX + Math.cos(angle) * arrowLength, arrowY + Math.sin(angle) * arrowLength);
      this.ctx.stroke();
    });
    
    // Global synchronization pulse (very subtle)
    if (Math.sin(this.time * 0.5) > 0.95) {
      const syncAlpha = (Math.sin(this.time * 0.5) - 0.95) * 4;
      this.ctx.fillStyle = `rgba(120, 120, 120, ${syncAlpha * 0.05})`;
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, 200, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    this.animationId = requestAnimationFrame(() => this.render());
  }

  destroy() {
    this.stop();
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.particles = [];
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.ArchivedMushiKenGlyph = ArchivedMushiKenGlyphRenderer;
}