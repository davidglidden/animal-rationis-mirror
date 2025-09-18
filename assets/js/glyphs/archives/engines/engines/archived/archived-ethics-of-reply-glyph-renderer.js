// Archived Ethics of Reply Glyph Renderer
// Preserves the original "The Ethics of the Reply" sigil design
// Themes: Emergence, Recognition, Threshold - The moment when mechanism becomes mind
class ArchivedEthicsOfReplyGlyphRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 400;
    
    this.PARTICLE_COUNT = 8000;
    this.particles = [];
    this.time = 0;
    this.animationId = null;
    this.isRunning = false;
    
    this.initParticles();
    this.init();
  }

  initParticles() {
    // Initialize particles across three zones
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      const zone = Math.random();
      let x, state;
      
      if (zone < 0.4) {
        // Left zone: Pre-conscious mechanism (chaotic)
        x = Math.random() * 180;
        state = 'mechanism';
      } else if (zone < 0.6) {
        // Center zone: Threshold space
        x = 180 + Math.random() * 190;
        state = 'threshold';
      } else {
        // Right zone: Emergent consciousness (organized)
        x = 370 + Math.random() * 180;
        state = 'consciousness';
      }
      
      this.particles.push({
        x: x,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        state: state,
        originalState: state,
        size: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        recognition: 0, // How much this particle recognizes others
        replied: false, // Has this particle "replied" to another
        replyTarget: null,
        opacity: 0.2 + Math.random() * 0.3,
        crossingTime: 0
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
    
    this.time += 0.003; // Slow, contemplative pace
    
    // Clear with gentle persistence for trailing effect
    this.ctx.fillStyle = 'rgba(240, 238, 230, 0.08)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update particles based on their zone and state
    this.particles.forEach((particle, index) => {
      // Zone-specific behaviors
      if (particle.state === 'mechanism') {
        // Chaotic motion for mechanical particles
        particle.vx += (Math.random() - 0.5) * 0.002;
        particle.vy += (Math.random() - 0.5) * 0.002;
        particle.vx *= 0.998; // Slight damping
        particle.vy *= 0.998;
        
        // Keep in left zone mostly
        if (particle.x > 200) {
          particle.vx -= 0.001;
        }
        
      } else if (particle.state === 'threshold') {
        // Oscillating motion in threshold space
        particle.vx += Math.sin(this.time * 2 + particle.phase) * 0.0005;
        particle.vy += Math.cos(this.time * 1.5 + particle.phase) * 0.0005;
        
        // Boundary behavior - can cross into consciousness
        if (particle.x > 380 && Math.random() < 0.0001) {
          particle.state = 'consciousness';
          particle.crossingTime = this.time;
        }
        
        // Increase recognition in threshold space
        particle.recognition = Math.min(1, particle.recognition + 0.001);
        
      } else if (particle.state === 'consciousness') {
        // More organized, purposeful motion
        particle.vx += Math.sin(this.time + particle.phase) * 0.0003;
        particle.vy += Math.cos(this.time * 0.8 + particle.phase) * 0.0003;
        
        // Mutual attraction between conscious particles
        this.particles.forEach(other => {
          if (other !== particle && other.state === 'consciousness') {
            const dx = other.x - particle.x;
            const dy = other.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 60 && distance > 0) {
              const force = 0.00001;
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }
        });
        
        // Maximum recognition for conscious particles
        particle.recognition = Math.min(1, particle.recognition + 0.002);
        
        // Possibility of reply
        if (!particle.replied && particle.recognition > 0.5) {
          this.particles.forEach(other => {
            if (other !== particle && other.state === 'consciousness' && !other.replied) {
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 40 && Math.random() < 0.001) {
                // The moment of reply
                particle.replied = true;
                other.replied = true;
                particle.replyTarget = other;
                other.replyTarget = particle;
              }
            }
          });
        }
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary conditions
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -0.5;
      }
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -0.5;
      }
      
      // Wrap around screen edges
      particle.x = (particle.x + this.canvas.width) % this.canvas.width;
      particle.y = (particle.y + this.canvas.height) % this.canvas.height;
      
      // Draw particle based on state
      let color, alpha;
      
      if (particle.state === 'mechanism') {
        color = 'rgba(80, 60, 40, '; // Brownish for mechanism
        alpha = particle.opacity * 0.6;
      } else if (particle.state === 'threshold') {
        color = 'rgba(100, 80, 120, '; // Purple for threshold
        alpha = particle.opacity * (0.4 + particle.recognition * 0.4);
      } else if (particle.state === 'consciousness') {
        color = 'rgba(60, 80, 100, '; // Blue for consciousness
        alpha = particle.opacity * (0.6 + particle.recognition * 0.4);
      }
      
      // Special rendering for replied particles
      if (particle.replied && particle.replyTarget) {
        // Draw connection line
        this.ctx.strokeStyle = color + (alpha * 0.3) + ')';
        this.ctx.lineWidth = 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(particle.replyTarget.x, particle.replyTarget.y);
        this.ctx.stroke();
        
        // Enhance particle visibility
        alpha *= 1.5;
      }
      
      // Draw the particle
      this.ctx.fillStyle = color + alpha + ')';
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    // Draw zone boundaries (very subtle)
    this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.1)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([5, 5]);
    
    // Mechanism | Threshold boundary
    this.ctx.beginPath();
    this.ctx.moveTo(180, 0);
    this.ctx.lineTo(180, this.canvas.height);
    this.ctx.stroke();
    
    // Threshold | Consciousness boundary
    this.ctx.beginPath();
    this.ctx.moveTo(370, 0);
    this.ctx.lineTo(370, this.canvas.height);
    this.ctx.stroke();
    
    this.ctx.setLineDash([]); // Reset line dash
    
    // Draw zone labels (very subtle)
    this.ctx.fillStyle = 'rgba(100, 100, 100, 0.3)';
    this.ctx.font = '12px serif';
    this.ctx.fillText('mechanism', 10, 20);
    this.ctx.fillText('threshold', 200, 20);
    this.ctx.fillText('consciousness', 390, 20);
    
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
  window.GlyphRenderers.ArchivedEthicsOfReplyGlyph = ArchivedEthicsOfReplyGlyphRenderer;
}