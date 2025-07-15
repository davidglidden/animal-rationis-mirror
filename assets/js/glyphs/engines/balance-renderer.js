// Balance Family Glyph Renderer
// Creates equilibrium patterns - scales, pendulums, harmonics
class BalanceRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.visualParams = params;
    // Semantic integration initialized
    this.params = {
      balanceType: params.balanceType || 'scales', // scales, pendulum, harmonic, orbital
      elements: params.elements || 3,
      symmetry: params.symmetry || true,
      perturbation: params.perturbation || 0.1,
      restoreForce: params.restoreForce || 0.02,
      damping: params.damping || 0.98,
      animationSpeed: params.animationSpeed || (window.SacredPalette?.timing?.breathRate || 0.001) * 10,
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
    // SEMANTIC COLOR INTEGRATION for pivot
    let pivotFillColor;
    if (this.visualParams && this.visualParams.semanticColor) {
      pivotFillColor = this.visualParams.getHarmonizedRgba(0.8);
    } else {
      // Fallback to Sacred Palette
      const pivotColor = window.SacredPalette?.base?.graphite || '#4A4A4A';
      const rgb = window.SacredPalette?.utils?.hexToRgb(pivotColor);
      if (rgb) {
        pivotFillColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
      }
    }
    
    if (pivotFillColor) {
      this.ctx.fillStyle = pivotFillColor;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
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
    
    // SEMANTIC COLOR INTEGRATION for beam
    let beamStrokeColor;
    if (this.visualParams && this.visualParams.semanticColor) {
      beamStrokeColor = this.visualParams.getHarmonizedRgba(0.8);
    } else {
      // Fallback to Sacred Palette
      const palette = window.SacredPalette?.families?.balance || { primary: '#8FA68E', secondary: '#B8A890', accent: '#D6D6CE' };
      const beamColor = palette.secondary; // Warm taupe
      const beamRgb = window.SacredPalette?.utils?.hexToRgb(beamColor);
      if (beamRgb) {
        beamStrokeColor = `rgba(${beamRgb.r}, ${beamRgb.g}, ${beamRgb.b}, 0.8)`;
      }
    }
    
    if (beamStrokeColor) {
      this.ctx.strokeStyle = beamStrokeColor;
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX - 120, centerY);
      this.ctx.lineTo(centerX + 120, centerY);
      this.ctx.stroke();
    }
    
    // Draw weights
    this.balanceElements.forEach((element, index) => {
      // SEMANTIC COLOR INTEGRATION for weights
      let weightFillColor, weightLineColor, weightStrokeColor;
      if (this.visualParams && this.visualParams.semanticColor) {
        // Use different alpha values for left and right sides
        const weightAlpha = element.side < 0 ? 0.8 : 0.6;
        weightFillColor = this.visualParams.getHarmonizedRgba(weightAlpha);
        weightLineColor = this.visualParams.getHarmonizedRgba(0.6);
        weightStrokeColor = this.visualParams.getHarmonizedRgba(0.8);
      } else {
        // Fallback to Sacred Palette balance colors
        const palette = window.SacredPalette?.families?.balance || { primary: '#8FA68E', secondary: '#B8A890', accent: '#D6D6CE' };
        const weightColor = element.side < 0 ? palette.primary : palette.accent;
        const breathing = window.SacredPalette?.utils?.breathe ?
          window.SacredPalette.utils.breathe(weightColor, this.time + index, 0.1) : weightColor;
        
        const weightRgb = window.SacredPalette?.utils?.hexToRgb(breathing);
        if (weightRgb) {
          weightFillColor = `rgba(${weightRgb.r}, ${weightRgb.g}, ${weightRgb.b}, 0.8)`;
          
          // Draw connecting line
          const lineColor = palette.secondary;
          const lineRgb = window.SacredPalette?.utils?.hexToRgb(lineColor);
          if (lineRgb) {
            weightLineColor = `rgba(${lineRgb.r}, ${lineRgb.g}, ${lineRgb.b}, 0.6)`;
          }
          
          // Outline with darker version
          const darkRgb = { r: weightRgb.r * 0.6, g: weightRgb.g * 0.6, b: weightRgb.b * 0.6 };
          weightStrokeColor = `rgba(${darkRgb.r}, ${darkRgb.g}, ${darkRgb.b}, 0.8)`;
        }
      }
      
      if (weightFillColor && weightLineColor && weightStrokeColor) {
        this.ctx.fillStyle = weightFillColor;
        
        // Draw connecting line
        this.ctx.strokeStyle = weightLineColor;
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
        
        // Outline with darker version
        this.ctx.strokeStyle = weightStrokeColor;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    });
  }

  renderPendulum(centerX, centerY) {
    this.balanceElements.forEach((element, index) => {
      const x = centerX + Math.sin(element.angle) * element.length;
      const y = centerY + Math.cos(element.angle) * element.length;
      
      // SEMANTIC COLOR INTEGRATION for pendulum
      let pendulumStrokeColor, pendulumFillColor;
      const alpha = 0.7 + Math.sin(this.time + index) * 0.3;
      
      if (this.visualParams && this.visualParams.semanticColor) {
        // Use different alpha variations for different pendulum elements
        const pendulumAlpha = alpha * (0.6 + (index * 0.1));
        pendulumStrokeColor = this.visualParams.getHarmonizedRgba(pendulumAlpha);
        pendulumFillColor = this.visualParams.getHarmonizedRgba(pendulumAlpha);
      } else {
        // Fallback to Sacred Palette balance colors
        const palette = window.SacredPalette?.families?.balance || { primary: '#8FA68E', secondary: '#B8A890', accent: '#D6D6CE' };
        const colors = [palette.primary, palette.secondary, palette.accent];
        const pendulumColor = colors[index % colors.length];
        
        // Breathe the color
        const breathing = window.SacredPalette?.utils?.breathe ?
          window.SacredPalette.utils.breathe(pendulumColor, this.time + index, 0.1) : pendulumColor;
        const rgb = window.SacredPalette?.utils?.hexToRgb(breathing);
        
        if (rgb) {
          pendulumStrokeColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
          pendulumFillColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        }
      }
      
      if (pendulumStrokeColor && pendulumFillColor) {
        // Draw pendulum rod
        this.ctx.strokeStyle = pendulumStrokeColor;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        
        // Draw pendulum bob
        this.ctx.fillStyle = pendulumFillColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 6 + element.mass * 3, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }

  renderHarmonic(centerX, centerY) {
    this.balanceElements.forEach((element, index) => {
      // SEMANTIC COLOR INTEGRATION for harmonic oscillators
      let harmonicStrokeColor, harmonicFillColor;
      
      if (this.visualParams && this.visualParams.semanticColor) {
        // Use different alpha variations for different harmonic elements
        const harmonicAlpha = 0.6 + (index * 0.05);
        harmonicStrokeColor = this.visualParams.getHarmonizedRgba(harmonicAlpha);
        harmonicFillColor = this.visualParams.getHarmonizedRgba(harmonicAlpha + 0.2);
      } else {
        // Fallback to Sacred Palette balance colors
        const palette = window.SacredPalette?.families?.balance || { primary: '#8FA68E', secondary: '#B8A890', accent: '#D6D6CE' };
        const colors = [palette.primary, palette.secondary, palette.accent];
        const oscColor = colors[index % colors.length];
        const rgb = window.SacredPalette?.utils?.hexToRgb(oscColor);
        
        if (rgb) {
          harmonicStrokeColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
          
          // Draw oscillator with breathing
          const breathing = window.SacredPalette?.utils?.breathe ?
            window.SacredPalette.utils.breathe(oscColor, this.time + index, 0.1) : oscColor;
          const breathRgb = window.SacredPalette?.utils?.hexToRgb(breathing);
          if (breathRgb) {
            harmonicFillColor = `rgba(${breathRgb.r}, ${breathRgb.g}, ${breathRgb.b}, 0.8)`;
          }
        }
      }
      
      if (harmonicStrokeColor && harmonicFillColor) {
        // Draw spring connection
        this.ctx.strokeStyle = harmonicStrokeColor;
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([3, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, element.baseY);
        this.ctx.lineTo(element.x, element.y);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Draw oscillator
        this.ctx.fillStyle = harmonicFillColor;
        this.ctx.beginPath();
        this.ctx.arc(element.x, element.y, 8, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });
  }

  renderOrbital(centerX, centerY) {
    this.balanceElements.forEach((element, index) => {
      const x = centerX + Math.cos(element.angle) * element.perturbedRadius;
      const y = centerY + Math.sin(element.angle) * element.perturbedRadius;
      
      // SEMANTIC COLOR INTEGRATION for orbital elements
      let orbitalStrokeColor, orbitalFillColor, orbitalTrailColor;
      
      if (this.visualParams && this.visualParams.semanticColor) {
        // Use different alpha variations for different orbital elements
        const orbitalAlpha = 0.2 + (index * 0.05);
        orbitalStrokeColor = this.visualParams.getHarmonizedRgba(orbitalAlpha);
        orbitalFillColor = this.visualParams.getHarmonizedRgba(orbitalAlpha + 0.6);
        orbitalTrailColor = this.visualParams.getHarmonizedRgba(orbitalAlpha + 0.1);
      } else {
        // Fallback to Sacred Palette balance colors
        const palette = window.SacredPalette?.families?.balance || { primary: '#8FA68E', secondary: '#B8A890', accent: '#D6D6CE' };
        const colors = [palette.primary, palette.secondary, palette.accent];
        const orbitalColor = colors[index % colors.length];
        const rgb = window.SacredPalette?.utils?.hexToRgb(orbitalColor);
        
        if (rgb) {
          orbitalStrokeColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
          
          // Draw orbital body with breathing
          const breathing = window.SacredPalette?.utils?.breathe ?
            window.SacredPalette.utils.breathe(orbitalColor, this.time + index, 0.1) : orbitalColor;
          const breathRgb = window.SacredPalette?.utils?.hexToRgb(breathing);
          if (breathRgb) {
            orbitalFillColor = `rgba(${breathRgb.r}, ${breathRgb.g}, ${breathRgb.b}, 0.8)`;
          }
          
          orbitalTrailColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, [ALPHA])`;
        }
      }
      
      if (orbitalStrokeColor && orbitalFillColor) {
        // Draw orbital path
        this.ctx.strokeStyle = orbitalStrokeColor;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, element.baseRadius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Draw orbital body
        this.ctx.fillStyle = orbitalFillColor;
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
          
          let trailFillColor;
          if (this.visualParams && this.visualParams.semanticColor) {
            trailFillColor = this.visualParams.getHarmonizedRgba(alpha);
          } else {
            trailFillColor = orbitalTrailColor.replace('[ALPHA]', alpha.toString());
          }
          
          this.ctx.fillStyle = trailFillColor;
          this.ctx.beginPath();
          this.ctx.arc(trailX, trailY, 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    });
  }

  drawEquilibriumIndicators() {
    // Draw equilibrium state indicator
    const isBalanced = this.checkEquilibrium();
    const { width, height } = this.canvas;
    
    // SEMANTIC COLOR INTEGRATION for equilibrium indicators
    let indicatorFillColor, meterStrokeColor, levelFillColor;
    
    if (this.visualParams && this.visualParams.semanticColor) {
      indicatorFillColor = this.visualParams.getHarmonizedRgba(0.3);
      meterStrokeColor = this.visualParams.getHarmonizedRgba(0.5);
      levelFillColor = this.visualParams.getHarmonizedRgba(0.6);
    } else {
      // Fallback to Sacred Palette for equilibrium indicators
      const palette = window.SacredPalette?.families?.balance || { primary: '#8FA68E', secondary: '#B8A890', accent: '#D6D6CE' };
      
      const indicatorColor = isBalanced ? palette.primary : palette.accent;
      const indRgb = window.SacredPalette?.utils?.hexToRgb(indicatorColor);
      if (indRgb) {
        indicatorFillColor = `rgba(${indRgb.r}, ${indRgb.g}, ${indRgb.b}, 0.3)`;
      }
      
      // Draw balance meter
      const meterColor = palette.secondary;
      const meterRgb = window.SacredPalette?.utils?.hexToRgb(meterColor);
      if (meterRgb) {
        meterStrokeColor = `rgba(${meterRgb.r}, ${meterRgb.g}, ${meterRgb.b}, 0.5)`;
      }
      
      const balanceLevel = this.getBalanceLevel();
      const levelColor = balanceLevel < 0.1 ? palette.primary : palette.accent;
      const levelRgb = window.SacredPalette?.utils?.hexToRgb(levelColor);
      if (levelRgb) {
        levelFillColor = `rgba(${levelRgb.r}, ${levelRgb.g}, ${levelRgb.b}, 0.6)`;
      }
    }
    
    if (indicatorFillColor) {
      this.ctx.fillStyle = indicatorFillColor;
      this.ctx.fillRect(width - 20, 10, 10, 10);
    }
    
    if (meterStrokeColor && levelFillColor) {
      this.ctx.strokeStyle = meterStrokeColor;
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(width - 40, 30, 30, 100);
      
      const balanceLevel = this.getBalanceLevel();
      this.ctx.fillStyle = levelFillColor;
      this.ctx.fillRect(width - 39, 30 + (1 - balanceLevel) * 50, 28, Math.abs(balanceLevel) * 50);
    }
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