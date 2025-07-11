// Chaos Family Glyph Renderer
// Creates chaotic patterns - strange attractors, butterfly effects, turbulence
class ChaosRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      chaosType: params.chaosType || 'lorenz', // lorenz, henon, rossler, turbulent
      attractorScale: params.attractorScale || 5,
      sensitivityRate: params.sensitivityRate || 0.01,
      evolutionSpeed: params.evolutionSpeed || 0.1,
      trailLength: params.trailLength || 0.98,
      colorChaos: params.colorChaos || true,
      perturbationStrength: params.perturbationStrength || 0.001,
      ...params
    };
    this.time = 0;
    this.systems = [];
    this.animationId = null;
    this.initChaosSystems();
  }

  initChaosSystems() {
    this.systems = [];
    const { width, height } = this.canvas;
    const systemCount = this.params.chaosType === 'turbulent' ? 50 : 3;
    
    for (let i = 0; i < systemCount; i++) {
      const system = {
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 20 - 10,
        vx: 0,
        vy: 0,
        vz: 0,
        hue: (i * 137.5) % 360, // Golden angle distribution
        trail: [],
        sensitivity: 1 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2
      };
      
      // Initialize based on chaos type
      switch (this.params.chaosType) {
        case 'lorenz':
          system.x = (Math.random() - 0.5) * 20;
          system.y = (Math.random() - 0.5) * 20;
          system.z = Math.random() * 40;
          break;
        case 'henon':
          system.x = Math.random() * 2 - 1;
          system.y = Math.random() * 2 - 1;
          break;
        case 'rossler':
          system.x = Math.random() * 10 - 5;
          system.y = Math.random() * 10 - 5;
          system.z = Math.random() * 10;
          break;
        case 'turbulent':
          system.vx = (Math.random() - 0.5) * 2;
          system.vy = (Math.random() - 0.5) * 2;
          break;
      }
      
      this.systems.push(system);
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
    this.time += this.params.evolutionSpeed;
    this.updateChaos();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateChaos() {
    const dt = 0.01;
    const perturbation = Math.sin(this.time) * this.params.perturbationStrength;
    
    this.systems.forEach((system, index) => {
      let dx, dy, dz;
      
      switch (this.params.chaosType) {
        case 'lorenz':
          // Lorenz attractor: dx/dt = σ(y-x), dy/dt = x(ρ-z)-y, dz/dt = xy-βz
          const sigma = 10;
          const rho = 28;
          const beta = 8/3;
          
          dx = sigma * (system.y - system.x);
          dy = system.x * (rho - system.z) - system.y;
          dz = system.x * system.y - beta * system.z;
          
          // Add sensitive dependence
          dx += perturbation * system.sensitivity;
          dy += perturbation * system.sensitivity * 0.7;
          dz += perturbation * system.sensitivity * 0.5;
          break;
          
        case 'henon':
          // Henon map: x_{n+1} = 1 - ax_n^2 + y_n, y_{n+1} = bx_n
          const a = 1.4;
          const b = 0.3;
          
          const newX = 1 - a * system.x * system.x + system.y + perturbation * system.sensitivity;
          const newY = b * system.x + perturbation * system.sensitivity * 0.5;
          
          dx = (newX - system.x) * 10; // Scale for smooth animation
          dy = (newY - system.y) * 10;
          dz = 0;
          break;
          
        case 'rossler':
          // Rössler attractor: dx/dt = -y-z, dy/dt = x+ay, dz/dt = b+z(x-c)
          const rA = 0.2;
          const rB = 0.2;
          const rC = 5.7;
          
          dx = -system.y - system.z;
          dy = system.x + rA * system.y;
          dz = rB + system.z * (system.x - rC);
          
          dx += perturbation * system.sensitivity;
          dy += perturbation * system.sensitivity * 0.8;
          dz += perturbation * system.sensitivity * 0.6;
          break;
          
        case 'turbulent':
          // Turbulent flow with vortices and random perturbations
          const { width, height } = this.canvas;
          const centerX = width / 2;
          const centerY = height / 2;
          
          // Distance from center influences flow
          const distFromCenter = Math.sqrt((system.x - centerX) ** 2 + (system.y - centerY) ** 2);
          const angle = Math.atan2(system.y - centerY, system.x - centerX);
          
          // Vortex field
          const vortexStrength = 100 / (distFromCenter + 10);
          dx = -Math.sin(angle) * vortexStrength;
          dy = Math.cos(angle) * vortexStrength;
          
          // Turbulent perturbations
          const turbulence = 20;
          dx += (Math.random() - 0.5) * turbulence + perturbation * system.sensitivity * 100;
          dy += (Math.random() - 0.5) * turbulence + perturbation * system.sensitivity * 100;
          dz = 0;
          
          // Add noise field
          const noiseScale = 0.01;
          dx += Math.sin(system.x * noiseScale + this.time) * 10;
          dy += Math.cos(system.y * noiseScale + this.time) * 10;
          break;
          
        default:
          dx = dy = dz = 0;
      }
      
      // Update system state
      system.x += dx * dt;
      system.y += dy * dt;
      system.z += dz * dt;
      
      // Map 3D coordinates to 2D canvas for rendering
      if (this.params.chaosType !== 'turbulent') {
        const { width, height } = this.canvas;
        system.canvasX = width / 2 + system.x * this.params.attractorScale;
        system.canvasY = height / 2 + system.y * this.params.attractorScale;
      } else {
        system.canvasX = system.x;
        system.canvasY = system.y;
        
        // Wrap around edges for turbulent flow
        if (system.canvasX < 0) system.canvasX = this.canvas.width;
        if (system.canvasX > this.canvas.width) system.canvasX = 0;
        if (system.canvasY < 0) system.canvasY = this.canvas.height;
        if (system.canvasY > this.canvas.height) system.canvasY = 0;
      }
      
      // Update trail
      system.trail.push({
        x: system.canvasX,
        y: system.canvasY,
        intensity: Math.sqrt(dx * dx + dy * dy + dz * dz)
      });
      
      if (system.trail.length > 100) {
        system.trail.shift();
      }
      
      // Update color based on motion
      if (this.params.colorChaos) {
        const motion = Math.sqrt(dx * dx + dy * dy + dz * dz);
        system.hue = (system.hue + motion * 2) % 360;
      }
    });
  }

  render() {
    const { width, height } = this.canvas;
    
    // Apply trail effect
    this.ctx.fillStyle = `rgba(0, 0, 0, ${1 - this.params.trailLength})`;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw chaos systems
    this.systems.forEach(system => {
      // Draw trail
      system.trail.forEach((point, index) => {
        const alpha = (index / system.trail.length) * 0.6;
        const intensity = Math.min(point.intensity * 0.1, 1);
        
        if (this.params.colorChaos) {
          const trailHue = (system.hue + index * 2) % 360;
          this.ctx.fillStyle = `hsla(${trailHue}, 80%, 60%, ${alpha * intensity})`;
        } else {
          this.ctx.fillStyle = `rgba(100, 150, 255, ${alpha * intensity})`;
        }
        
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 1 + intensity, 0, Math.PI * 2);
        this.ctx.fill();
      });
      
      // Draw current position
      if (system.canvasX >= 0 && system.canvasX <= width && system.canvasY >= 0 && system.canvasY <= height) {
        const currentIntensity = system.trail.length > 0 ? 
          Math.min(system.trail[system.trail.length - 1].intensity * 0.1, 1) : 0.5;
        
        if (this.params.colorChaos) {
          this.ctx.fillStyle = `hsla(${system.hue}, 90%, 70%, 0.9)`;
        } else {
          this.ctx.fillStyle = `rgba(150, 200, 255, 0.9)`;
        }
        
        this.ctx.beginPath();
        this.ctx.arc(system.canvasX, system.canvasY, 2 + currentIntensity * 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw glow for high-intensity points
        if (currentIntensity > 0.7) {
          const glowGradient = this.ctx.createRadialGradient(
            system.canvasX, system.canvasY, 0,
            system.canvasX, system.canvasY, 10
          );
          
          if (this.params.colorChaos) {
            glowGradient.addColorStop(0, `hsla(${system.hue}, 80%, 80%, 0.6)`);
            glowGradient.addColorStop(1, `hsla(${system.hue}, 60%, 60%, 0)`);
          } else {
            glowGradient.addColorStop(0, 'rgba(150, 200, 255, 0.6)');
            glowGradient.addColorStop(1, 'rgba(150, 200, 255, 0)');
          }
          
          this.ctx.fillStyle = glowGradient;
          this.ctx.beginPath();
          this.ctx.arc(system.canvasX, system.canvasY, 10, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    });
    
    // Draw phase space indicator
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.fillRect(width - 60, 10, 50, 30);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.ctx.font = '10px monospace';
    this.ctx.fillText(this.params.chaosType.toUpperCase(), width - 58, 25);
    this.ctx.fillText(`t: ${this.time.toFixed(1)}`, width - 58, 35);
  }

  destroy() {
    this.stop();
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.Chaos = ChaosRenderer;
}