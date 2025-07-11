// Balance Family Glyph Renderer
// Creates equilibrium patterns - scales, pendulums, harmonics
class BalanceRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.params = {
      balanceType: params.balanceType || 'scales', // scales, pendulum, harmonic, orbital
      elements: params.elements || 3,
      symmetry: params.symmetry || true,
      perturbation: params.perturbation || 0.1,
      restoreForce: params.restoreForce || 0.02,
      damping: params.damping || 0.98,
      animationSpeed: params.animationSpeed || 0.01,
      ...params
    };
    this.time = 0;
    this.balanceElements = [];
    this.animationId = null;
    this.initBalanceSystem();
  }

  initBalanceSystem() {
    this.balanceElements = [];
    const { width, height } = this.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    
    switch (this.params.balanceType) {
      case 'scales':
        // Create balance scale with weights
        for (let i = 0; i < this.params.elements; i++) {
          const side = i % 2 === 0 ? -1 : 1;
          const distance = 80 + (Math.floor(i / 2) * 40);
          
          this.balanceElements.push({
            x: centerX + side * distance,
            y: centerY,
            targetY: centerY,
            weight: 0.5 + Math.random() * 0.5,
            velocity: 0,
            side: side,
            distance: distance
          });
        }
        break;
        
      case 'pendulum':
        // Create pendulum system
        for (let i = 0; i < this.params.elements; i++) {
          const angle = (i / this.params.elements) * Math.PI * 2;
          const length = 60 + i * 20;
          
          this.balanceElements.push({
            angle: angle,
            targetAngle: angle,
            length: length,
            velocity: 0,
            mass: 1 + Math.random()
          });
        }
        break;
        
      case 'harmonic':
        // Create harmonic oscillators
        for (let i = 0; i < this.params.elements; i++) {
          const baseY = centerY + (i - this.params.elements / 2) * 40;
          
          this.balanceElements.push({
            x: centerX,
            y: baseY,
            baseY: baseY,
            amplitude: 0,
            phase: i * Math.PI / 3,
            frequency: 1 + i * 0.2,
            velocity: 0
          });
        }
        break;
        
      case 'orbital':
        // Create orbital balance system
        for (let i = 0; i < this.params.elements; i++) {
          const radius = 40 + i * 30;
          const angle = (i / this.params.elements) * Math.PI * 2;
          
          this.balanceElements.push({
            angle: angle,
            radius: radius,
            baseRadius: radius,
            angularVelocity: 0.02 * (1 + i * 0.1),
            mass: 1,
            perturbedRadius: radius
          });
        }
        break;
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
    this.updateBalance();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateBalance() {
    const perturbationForce = Math.sin(this.time * 2) * this.params.perturbation;
    
    switch (this.params.balanceType) {
      case 'scales':
        this.updateScales(perturbationForce);
        break;
      case 'pendulum':
        this.updatePendulum(perturbationForce);
        break;
      case 'harmonic':
        this.updateHarmonic(perturbationForce);
        break;
      case 'orbital':
        this.updateOrbital(perturbationForce);
        break;
    }
  }

  updateScales(perturbation) {
    // Calculate total weight on each side
    let leftWeight = 0, rightWeight = 0;
    this.balanceElements.forEach(element => {
      if (element.side < 0) leftWeight += element.weight;
      else rightWeight += element.weight;
    });
    
    // Calculate balance tilt
    const weightDiff = rightWeight - leftWeight;
    const tilt = Math.atan(weightDiff * 0.1 + perturbation);
    
    // Update element positions based on tilt
    this.balanceElements.forEach(element => {
      const tiltEffect = Math.sin(tilt) * element.distance * 0.3;
      element.targetY = this.canvas.height / 2 + element.side * tiltEffect;
      
      // Apply spring physics
      const force = (element.targetY - element.y) * this.params.restoreForce;
      element.velocity += force;
      element.velocity *= this.params.damping;
      element.y += element.velocity;
    });
  }

  updatePendulum(perturbation) {
    this.balanceElements.forEach(element => {
      // Apply gravitational restoring force
      const force = -Math.sin(element.angle) * this.params.restoreForce + perturbation;
      element.velocity += force;
      element.velocity *= this.params.damping;
      element.angle += element.velocity;
    });
  }

  updateHarmonic(perturbation) {
    this.balanceElements.forEach(element => {
      // Simple harmonic motion with coupling
      const displacement = element.y - element.baseY;
      const force = -displacement * this.params.restoreForce + perturbation;
      element.velocity += force;
      element.velocity *= this.params.damping;
      element.y += element.velocity;
    });
  }

  updateOrbital(perturbation) {
    this.balanceElements.forEach(element => {
      element.angle += element.angularVelocity;
      
      // Apply perturbations to orbital radius
      const radiusForce = perturbation * Math.sin(this.time + element.angle);
      element.perturbedRadius += radiusForce;
      
      // Restore to base radius
      const restoreForce = (element.baseRadius - element.perturbedRadius) * this.params.restoreForce;
      element.perturbedRadius += restoreForce;
      element.perturbedRadius *= this.params.damping;
    });
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw central pivot/anchor
    this.ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    this.ctx.fill();
    
    switch (this.params.balanceType) {
      case 'scales':
        this.renderScales(centerX, centerY);
        break;
      case 'pendulum':
        this.renderPendulum(centerX, centerY);
        break;
      case 'harmonic':
        this.renderHarmonic(centerX, centerY);
        break;
      case 'orbital':
        this.renderOrbital(centerX, centerY);
        break;
    }
    
    // Draw equilibrium indicators
    this.drawEquilibriumIndicators();
  }

  renderScales(centerX, centerY) {
    // Draw balance beam
    const beam = this.balanceElements[0];
    const beamTilt = beam ? Math.atan2(beam.y - centerY, beam.x - centerX) : 0;
    
    this.ctx.strokeStyle = 'rgba(150, 150, 150, 0.8)';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(centerX - 120, centerY);
    this.ctx.lineTo(centerX + 120, centerY);
    this.ctx.stroke();
    
    // Draw weights
    this.balanceElements.forEach((element, index) => {
      const hue = element.side < 0 ? 240 : 0; // Blue for left, red for right
      const saturation = 70 + element.weight * 30;
      const lightness = 50 + Math.sin(this.time + index) * 10;
      
      this.ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      // Draw connecting line
      this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.6)';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(element.x, centerY);
      this.ctx.lineTo(element.x, element.y);
      this.ctx.stroke();
      
      // Draw weight
      const size = 8 + element.weight * 10;
      this.ctx.beginPath();
      this.ctx.arc(element.x, element.y, size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = 'rgba(50, 50, 50, 0.8)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });
  }

  renderPendulum(centerX, centerY) {
    this.balanceElements.forEach((element, index) => {
      const x = centerX + Math.sin(element.angle) * element.length;
      const y = centerY + Math.cos(element.angle) * element.length;
      
      const hue = (index * 60) % 360;
      const alpha = 0.7 + Math.sin(this.time + index) * 0.3;
      
      // Draw pendulum rod
      this.ctx.strokeStyle = `hsla(${hue}, 50%, 60%, ${alpha})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      
      // Draw pendulum bob
      this.ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 6 + element.mass * 3, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  renderHarmonic(centerX, centerY) {
    // Draw oscillation traces
    this.ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
    this.ctx.lineWidth = 1;
    
    this.balanceElements.forEach((element, index) => {
      const hue = (index * 120) % 360;
      
      // Draw spring connection
      this.ctx.strokeStyle = `hsla(${hue}, 60%, 60%, 0.6)`;
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([3, 3]);
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, element.baseY);
      this.ctx.lineTo(element.x, element.y);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
      
      // Draw oscillator
      this.ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;
      this.ctx.beginPath();
      this.ctx.arc(element.x, element.y, 8, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  renderOrbital(centerX, centerY) {
    this.balanceElements.forEach((element, index) => {
      const x = centerX + Math.cos(element.angle) * element.perturbedRadius;
      const y = centerY + Math.sin(element.angle) * element.perturbedRadius;
      
      const hue = (index * 72) % 360; // Golden angle distribution
      
      // Draw orbital path
      this.ctx.strokeStyle = `hsla(${hue}, 40%, 50%, 0.2)`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, element.baseRadius, 0, Math.PI * 2);
      this.ctx.stroke();
      
      // Draw orbital body
      this.ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5 + element.mass * 2, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw trail
      const trailLength = 20;
      for (let i = 1; i <= trailLength; i++) {
        const trailAngle = element.angle - i * element.angularVelocity;
        const trailX = centerX + Math.cos(trailAngle) * element.perturbedRadius;
        const trailY = centerY + Math.sin(trailAngle) * element.perturbedRadius;
        const alpha = (trailLength - i) / trailLength * 0.3;
        
        this.ctx.fillStyle = `hsla(${hue}, 50%, 60%, ${alpha})`;
        this.ctx.beginPath();
        this.ctx.arc(trailX, trailY, 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }

  drawEquilibriumIndicators() {
    // Draw equilibrium state indicator
    const isBalanced = this.checkEquilibrium();
    const { width, height } = this.canvas;
    
    this.ctx.fillStyle = isBalanced ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 100, 0, 0.2)';
    this.ctx.fillRect(width - 20, 10, 10, 10);
    
    // Draw balance meter
    this.ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(width - 40, 30, 30, 100);
    
    const balanceLevel = this.getBalanceLevel();
    this.ctx.fillStyle = `hsla(${120 - Math.abs(balanceLevel) * 120}, 70%, 50%, 0.6)`;
    this.ctx.fillRect(width - 39, 30 + (1 - balanceLevel) * 50, 28, Math.abs(balanceLevel) * 50);
  }

  checkEquilibrium() {
    const tolerance = 0.1;
    return this.getBalanceLevel() < tolerance;
  }

  getBalanceLevel() {
    // Calculate overall system balance (0 = perfect balance, 1 = maximum imbalance)
    switch (this.params.balanceType) {
      case 'scales':
        let leftWeight = 0, rightWeight = 0;
        this.balanceElements.forEach(element => {
          if (element.side < 0) leftWeight += element.weight;
          else rightWeight += element.weight;
        });
        return Math.abs(rightWeight - leftWeight) / (rightWeight + leftWeight);
        
      case 'pendulum':
        const avgAngle = this.balanceElements.reduce((sum, el) => sum + Math.abs(el.angle), 0) / this.balanceElements.length;
        return Math.min(avgAngle / Math.PI, 1);
        
      case 'harmonic':
        const avgDisplacement = this.balanceElements.reduce((sum, el) => sum + Math.abs(el.y - el.baseY), 0) / this.balanceElements.length;
        return Math.min(avgDisplacement / 50, 1);
        
      case 'orbital':
        const avgRadiusDeviation = this.balanceElements.reduce((sum, el) => sum + Math.abs(el.perturbedRadius - el.baseRadius), 0) / this.balanceElements.length;
        return Math.min(avgRadiusDeviation / 20, 1);
        
      default:
        return 0;
    }
  }

  destroy() {
    this.stop();
  }
}

// Register with global glyph system
if (typeof window !== 'undefined') {
  window.GlyphRenderers = window.GlyphRenderers || {};
  window.GlyphRenderers.Balance = BalanceRenderer;
}