// Threshold Family Glyph Renderer
// Creates liminal space patterns - portals, membranes, phase boundaries
class ThresholdRenderer {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.visualParams = params;
    
    // PRIME DIRECTIVE: Use semantic parameters for dramatic structural differentiation
    this.semanticParams = this.extractSemanticParameters(params);
    
    // Apply legacy semantic enhancements for backward compatibility
    this.enhancedParams = this.applySemanticEnhancements(params);
    
    this.params = {
      thresholdType: this.semanticParams.thresholdType,
      permeability: this.semanticParams.permeability,
      transitionSpeed: this.semanticParams.transitionSpeed,
      dimensionalOverlap: this.semanticParams.dimensionalOverlap,
      boundaryTension: this.semanticParams.boundaryTension,
      phaseDensity: this.semanticParams.phaseDensity,
      temporalShift: this.semanticParams.temporalShift,
      particleCount: this.semanticParams.particleCount,
      thresholdCount: this.semanticParams.thresholdCount,
      portalRadius: this.semanticParams.portalRadius,
      ...params,
      ...this.enhancedParams // Legacy enhancements take precedence
    };
    this.time = 0;
    this.thresholds = [];
    this.particles = [];
    this.animationId = null;
    
    console.log(`🎨 Threshold renderer initialized with semantic differentiation:`, {
      type: this.semanticParams.thresholdType,
      permeability: this.semanticParams.permeability,
      particles: this.semanticParams.particleCount,
      thresholds: this.semanticParams.thresholdCount,
      entropy: this.semanticParams.entropyScore
    });
    
    // Store semantic data for rendering decisions
    this.semanticData = {
      archetype: params.semanticArchetype,
      entropyLevel: params.entropyLevel || 0.5,
      temporalLayers: params.temporalLayers || [],
      anaphoricReferences: params.anaphoricReferences || [],
      semanticallyEnhanced: params.semanticallyEnhanced || false
    };
    
    this.initThresholds();
    this.initTransitionParticles();
  }
  
  // Extract semantic parameters for dramatic visual differentiation
  extractSemanticParameters(params) {
    // Get semantic genome data
    const genome = params.genome || {};
    const archetype = params.archetype || 'liminal';
    const entropyScore = params.entropyScore || 0.5;
    const conceptualDNA = params.conceptualDNA || [];
    
    // Base parameters influenced by semantic content
    const baseSpeed = (window.SacredPalette?.timing?.breathRate || 0.001) * 20;
    
    // Dramatically different patterns based on semantic content
    const semanticInfluences = {
      // Threshold type based on boundary patterns and conceptual DNA
      thresholdType: this.selectThresholdType(genome, conceptualDNA),
      
      // Permeability based on entropy and openness
      permeability: 0.3 + (entropyScore * 0.5) + 
                   (genome.topology?.rhizomaticTendency || 0.2) * 0.3, // 0.3-1.0
      
      // Transition speed based on temporal dynamics
      transitionSpeed: baseSpeed * (1 + (genome.temporality?.velocity || 0) * 3 + 
                                    (genome.dynamics?.acceleration || 0.1) * 2), // Variable speed
      
      // Dimensional overlap based on complexity layering
      dimensionalOverlap: 0.2 + (genome.complexity?.nestedComplexity || 0) * 0.4 + 
                         (genome.complexity?.layerCount || 1) * 0.1, // 0.2-0.8
      
      // Boundary tension based on structural resistance
      boundaryTension: 0.5 + (genome.resonance?.dissonanceLevel || 0.2) * 1.0 + 
                      (1 - entropyScore) * 0.8, // 0.5-2.3
      
      // Phase density based on material thickness
      phaseDensity: 0.5 + (genome.complexity?.nestedComplexity || 0) * 0.4 + 
                   (genome.dynamics?.acceleration || 0.1) * 0.2, // 0.5-1.1
      
      // Temporal shift based on temporal flow
      temporalShift: 0.05 + (genome.temporality?.sequentialFlow || 0.1) * 0.25, // 0.05-0.3
      
      // Particle count based on activity and complexity
      particleCount: Math.floor(30 + (entropyScore * 70) + 
                               (genome.dynamics?.velocity || 0) * 50), // 30-150
      
      // Threshold count based on complexity
      thresholdCount: Math.floor(1 + (genome.complexity?.nestingLevel || 3) * 0.5 + 
                                 (genome.topology?.branchingFactor || 1) * 0.7), // 1-5
      
      // Portal radius based on scope and reach
      portalRadius: 40 + (genome.complexity?.nestingLevel || 3) * 8 + 
                   (entropyScore * 30), // 40-110
      
      // Store for later use
      entropyScore: entropyScore,
      genome: genome,
      archetype: archetype
    };
    
    return semanticInfluences;
  }
  
  // Select threshold type based on semantic content
  selectThresholdType(genome, conceptualDNA) {
    const dynamics = genome.dynamics || {};
    const topology = genome.topology || {};
    
    // PRIME DIRECTIVE: Use base semantic renderer for consistent analysis
    const baseRenderer = new (window.BaseSemanticRenderer || function(){})();
    
    // Define semantic analysis configuration
    const thresholdAnalysis = {
      hasPortal: {
        family: 'liminal',
        keywords: ['portal', 'opening', 'gateway', 'passage', 'door', 'threshold', 'entry'],
        threshold: 0.6
      },
      hasMembrane: {
        family: 'boundary',
        keywords: ['membrane', 'boundary', 'surface', 'skin', 'interface', 'barrier', 'film'],
        threshold: 0.6
      },
      hasPhase: {
        family: 'transitional',
        keywords: ['phase', 'transition', 'state', 'change', 'shift', 'transformation', 'metamorphosis'],
        threshold: 0.6
      },
      hasGateway: {
        family: 'architectural',
        keywords: ['gateway', 'arch', 'frame', 'structure', 'entrance', 'edifice', 'construct'],
        threshold: 0.6
      }
    };
    
    // Perform semantic analysis
    const results = baseRenderer.analyzeConceptsWithFamilies ? 
      baseRenderer.analyzeConceptsWithFamilies(conceptualDNA, thresholdAnalysis) :
      { hasPortal: false, hasMembrane: false, hasPhase: false, hasGateway: false };
    
    // Threshold type selection based on semantic analysis
    if (results.hasPortal || (topology.circularityIndex > 0.4 && dynamics.acceleration > 0.3)) {
      return 'portal';
    } else if (results.hasMembrane || (topology.rhizomaticTendency > 0.4)) {
      return 'membrane';
    } else if (results.hasPhase || (dynamics.velocity > 0.3 && genome.temporality?.velocity > 0.2)) {
      return 'phase';
    } else if (results.hasGateway || (genome.complexity?.nestingLevel > 4)) {
      return 'gateway';
    } else {
      // Default based on structural characteristics
      if (topology.circularityIndex > 0.3) {
        return 'portal';
      } else if (dynamics.velocity > 0.4) {
        return 'phase';
      } else if (topology.rhizomaticTendency > 0.3) {
        return 'membrane';
      } else {
        return 'gateway';
      }
    }
  }

  initThresholds() {
    this.thresholds = [];
    const { width, height } = this.canvas;
    
    switch (this.params.thresholdType) {
      case 'portal':
        // Central portal with rotating boundary
        const portalRadius = this.params.portalRadius;
        this.thresholds.push({
          x: width / 2,
          y: height / 2,
          innerRadius: portalRadius * 0.5,
          outerRadius: portalRadius,
          rotationSpeed: 0.01 * (1 + this.params.transitionSpeed * 0.1),
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
        // Multiple phase boundaries based on semantic parameters
        const phaseCount = this.params.thresholdCount;
        for (let i = 0; i < phaseCount; i++) {
          this.thresholds.push({
            x: width * (0.1 + i * (0.8 / (phaseCount - 1))),
            y: height / 2,
            width: 30 + (this.params.phaseDensity * 30),
            height: height * 0.8,
            phaseShift: i * Math.PI / phaseCount,
            density: this.params.phaseDensity,
            transitionZone: 10 + (this.params.permeability * 20)
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
    const particleCount = this.params.particleCount;
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
    
    // Use Sacred Palette threshold colors for liminal spaces
    const palette = window.SacredPalette?.families?.threshold || {
      primary: '#B89B9B', secondary: '#E8DCC6', accent: '#7B6D8D'
    };
    const groundColor = window.SacredPalette?.ground?.vellum || '#FAF8F3';
    
    // Before-space (left/background) - bone color
    const beforeGradient = this.ctx.createLinearGradient(0, 0, width / 2, 0);
    const beforeRgb = window.SacredPalette?.utils?.hexToRgb(palette.secondary);
    const groundRgb = window.SacredPalette?.utils?.hexToRgb(groundColor);
    
    if (beforeRgb && groundRgb) {
      beforeGradient.addColorStop(0, `rgba(${beforeRgb.r}, ${beforeRgb.g}, ${beforeRgb.b}, 0.3)`);
      beforeGradient.addColorStop(1, `rgba(${groundRgb.r}, ${groundRgb.g}, ${groundRgb.b}, 0.1)`);
      this.ctx.fillStyle = beforeGradient;
      this.ctx.fillRect(0, 0, width / 2, height);
    }
    
    // After-space (right/foreground) - dusty rose
    const afterGradient = this.ctx.createLinearGradient(width / 2, 0, width, 0);
    const afterRgb = window.SacredPalette?.utils?.hexToRgb(palette.primary);
    
    if (afterRgb && groundRgb) {
      afterGradient.addColorStop(0, `rgba(${afterRgb.r}, ${afterRgb.g}, ${afterRgb.b}, 0.1)`);
      afterGradient.addColorStop(1, `rgba(${afterRgb.r}, ${afterRgb.g}, ${afterRgb.b}, 0.3)`);
      this.ctx.fillStyle = afterGradient;
      this.ctx.fillRect(width / 2, 0, width / 2, height);
    }
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
    const palette = window.SacredPalette?.families?.threshold || { primary: '#C4A183', secondary: '#E8DCC6', accent: '#7B6D8D' };
    
    // Portal rim using Sacred Palette threshold colors
    const rimGradient = this.ctx.createRadialGradient(
      portal.x, portal.y, portal.innerRadius,
      portal.x, portal.y, portal.outerRadius
    );
    
    const twilightRgb = window.SacredPalette?.utils?.hexToRgb(palette.accent); // Twilight
    const dustyRgb = window.SacredPalette?.utils?.hexToRgb(palette.primary);    // Dusty rose
    const boneRgb = window.SacredPalette?.utils?.hexToRgb(palette.secondary);  // Bone
    
    if (twilightRgb && dustyRgb && boneRgb) {
      rimGradient.addColorStop(0, `rgba(${twilightRgb.r}, ${twilightRgb.g}, ${twilightRgb.b}, 0.8)`);
      rimGradient.addColorStop(0.5, `rgba(${dustyRgb.r}, ${dustyRgb.g}, ${dustyRgb.b}, 0.6)`);
      rimGradient.addColorStop(1, `rgba(${boneRgb.r}, ${boneRgb.g}, ${boneRgb.b}, 0.2)`);
      
      this.ctx.fillStyle = rimGradient;
      this.ctx.beginPath();
      this.ctx.arc(portal.x, portal.y, portal.outerRadius, 0, Math.PI * 2);
      this.ctx.arc(portal.x, portal.y, portal.innerRadius, 0, Math.PI * 2, true);
      this.ctx.fill();
    }
    
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
    const palette = window.SacredPalette?.families?.threshold || { primary: '#C4A183', secondary: '#E8DCC6', accent: '#7B6D8D' };
    this.particles.forEach(particle => {
      const interaction = this.checkThresholdInteraction(particle);
      
      // Calculate rendering properties using Sacred Palette threshold colors
      let alpha = particle.opacity;
      let size = particle.size;
      
      // Use threshold palette colors instead of HSL hue
      const colors = [palette.secondary, palette.primary, palette.accent]; // Bone -> Dusty rose -> Twilight
      let particleColor = colors[Math.floor(particle.hue / 120) % colors.length];
      
      if (particle.transitionProgress > 0) {
        // Particle is transitioning - enhance properties
        alpha *= (1 + Math.sin(particle.transitionProgress * Math.PI) * 0.5);
        size *= (1 + particle.transitionProgress * 0.5);
        
        // Color shifts through threshold palette during transition
        const transitionIndex = Math.floor(particle.transitionProgress * (colors.length - 1));
        particleColor = colors[transitionIndex] || particleColor;
      }
      
      if (interaction.crossing) {
        alpha += interaction.intensity * 0.3;
        size += interaction.intensity * 2;
      }
      
      // Phase-based color shift using Sacred Palette
      if (particle.phase === 'after') {
        // Switch to a different palette color for "after" phase
        const phaseIndex = (Math.floor(particle.hue / 120) + 1) % colors.length;
        particleColor = colors[phaseIndex];
      }
      
      // Draw particle using Sacred Palette threshold colors
      const particleRgb = window.SacredPalette?.utils?.hexToRgb(particleColor);
      if (particleRgb) {
        this.ctx.fillStyle = `rgba(${particleRgb.r}, ${particleRgb.g}, ${particleRgb.b}, ${alpha})`;
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
          auraGradient.addColorStop(0, `rgba(${particleRgb.r}, ${particleRgb.g}, ${particleRgb.b}, 0.3)`);
          auraGradient.addColorStop(1, `rgba(${particleRgb.r}, ${particleRgb.g}, ${particleRgb.b}, 0)`);
          
          this.ctx.fillStyle = auraGradient;
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, auraRadius, 0, Math.PI * 2);
          this.ctx.fill();
        }
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

  // Apply semantic visual language enhancements to parameters
  applySemanticEnhancements(params) {
    const enhanced = {};
    
    // If not semantically enhanced, return empty enhancements
    if (!params.semanticallyEnhanced) {
      return enhanced;
    }
    
    console.log('🎨 Applying threshold-specific semantic enhancements...');
    
    // Semantic archetype influences threshold type
    if (params.semanticArchetype) {
      switch (params.semanticArchetype.primary) {
        case 'phenomenological':
          enhanced.thresholdType = 'membrane';
          enhanced.permeability = 0.7;
          enhanced.dimensionalOverlap = 0.5;
          break;
        case 'existential':
          enhanced.thresholdType = 'portal';
          enhanced.dimensionalOverlap = 0.8;
          enhanced.boundaryTension = 0.3;
          break;
        case 'dialectical':
          enhanced.thresholdType = 'phase';
          enhanced.phaseDensity = 0.9;
          enhanced.transitionSpeed = 0.03;
          break;
        case 'contemplative':
          enhanced.thresholdType = 'gateway';
          enhanced.permeability = 0.3;
          enhanced.boundaryTension = 1.2;
          break;
      }
    }
    
    // Entropy level affects transition characteristics
    if (params.entropyLevel !== undefined) {
      if (params.entropyLevel > 0.7) {
        // High entropy = chaotic, rapid transitions
        enhanced.transitionSpeed = (params.transitionSpeed || 0.02) * (1 + params.entropyLevel);
        enhanced.permeability = Math.min(1, (params.permeability || 0.5) + params.entropyLevel * 0.3);
      } else if (params.entropyLevel < 0.3) {
        // Low entropy = stable, slow transitions
        enhanced.transitionSpeed = (params.transitionSpeed || 0.02) * (0.5 + params.entropyLevel);
        enhanced.boundaryTension = (params.boundaryTension || 1.0) * (1 + (1 - params.entropyLevel) * 0.5);
      }
    }
    
    // Temporal layers affect dimensional overlap
    if (params.temporalLayers && params.temporalLayers.length > 0) {
      // More temporal layers = more dimensional overlap
      enhanced.dimensionalOverlap = Math.min(1, 0.2 + params.temporalLayers.length * 0.15);
      
      // Past-heavy content gets more membrane-like behavior
      const pastWeight = params.temporalLayers.find(l => l.type === 'memory')?.weight || 0;
      if (pastWeight > 0.4) {
        enhanced.temporalShift = (params.temporalShift || 0.1) + pastWeight * 0.2;
      }
    }
    
    // Movement system affects transition patterns
    if (params.movementSystem) {
      switch (params.movementSystem.primaryMovement?.type) {
        case 'flowing':
          enhanced.transitionSpeed = (params.transitionSpeed || 0.02) * 1.2;
          enhanced.thresholdType = enhanced.thresholdType || 'membrane';
          break;
        case 'radiating':
          enhanced.thresholdType = enhanced.thresholdType || 'portal';
          enhanced.dimensionalOverlap = Math.max(enhanced.dimensionalOverlap || 0.3, 0.6);
          break;
        case 'spiraling':
          enhanced.temporalShift = (params.temporalShift || 0.1) * 1.5;
          break;
      }
    }
    
    // Content-specific hints affect visual style
    if (params.contentSpecificHints) {
      params.contentSpecificHints.forEach(hint => {
        if (hint.texture === 'gradient') {
          enhanced.permeability = Math.max(enhanced.permeability || 0.5, 0.7);
        }
        if (hint.edges === 'angular') {
          enhanced.boundaryTension = (enhanced.boundaryTension || 1.0) * 1.3;
        }
        if (hint.motion === 'blur') {
          enhanced.transitionSpeed = (enhanced.transitionSpeed || 0.02) * 1.4;
        }
      });
    }
    
    console.log(`🎨 Threshold semantic enhancements applied:`, enhanced);
    return enhanced;
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