// === SEMANTIC VISUAL TRANSLATOR ===
// Solves the "same-family-face-blind" problem by creating dramatic visual differences
// within family resemblance based on actual semantic content
// 
// Prime Directive: Do it well, the right way, do it once
// - Modular architecture for maintainability
// - Clear separation of concerns
// - Comprehensive documentation
// - Built for permanence

// === PHASE 1: ENHANCED SEMANTIC INTERPRETER ===
// Amplifies differences and adds content-specific elements

class EnhancedSemanticInterpreter {
  constructor() {
    // Amplification factors for making differences visible
    this.amplificationCurves = {
      linear: (x) => x,
      quadratic: (x) => x * x,
      exponential: (x) => Math.pow(2, x) - 1,
      logarithmic: (x) => Math.log(1 + x * 10) / Math.log(11),
      sigmoid: (x) => 1 / (1 + Math.exp(-10 * (x - 0.5)))
    };
    
    // Content-specific visual vocabularies
    this.conceptualSignatures = new Map();
  }
  
  // Main method: Convert genome to highly differentiated visual parameters
  interpretGenomeWithFidelity(genome, family) {
    const baseParams = this.getBaseParamsForFamily(family);
    
    // Extract unique conceptual signatures from the genome
    const signatures = this.extractConceptualSignatures(genome);
    
    // Apply dramatic amplification to ensure visual distinctiveness
    const amplifiedParams = this.amplifyDifferences(baseParams, signatures);
    
    // Add content-specific visual elements
    const enrichedParams = this.addContentSpecificElements(amplifiedParams, genome);
    
    // Ensure minimum perceptual distance from other glyphs
    const distinctParams = this.ensurePerceptualDistinctiveness(enrichedParams);
    
    return distinctParams;
  }
  
  // Extract unique conceptual signatures that should drive visual differences
  extractConceptualSignatures(genome) {
    const signatures = {
      // Structural signatures - how the text thinks
      structuralFingerprint: this.computeStructuralFingerprint(genome.topology),
      
      // Temporal signatures - how the text moves through time
      temporalRhythm: this.computeTemporalRhythm(genome.temporality),
      
      // Emotional signatures - the text's feeling landscape
      emotionalTexture: this.computeEmotionalTexture(genome.resonance),
      
      // Complexity signatures - depth patterns
      complexityProfile: this.computeComplexityProfile(genome.complexity),
      
      // Movement signatures - conceptual dynamics
      dynamicCharacter: this.computeDynamicCharacter(genome.dynamics),
      
      // Unique conceptual elements
      conceptualDNA: this.extractUniqueConceptualDNA(genome)
    };
    
    return signatures;
  }
  
  // Compute structural fingerprint with high sensitivity
  computeStructuralFingerprint(topology) {
    // Create a multi-dimensional fingerprint that captures structural uniqueness
    const fingerprint = {
      // How ideas branch - affects visual branching patterns
      branchingPattern: {
        angle: (topology.branchingFactor - 1) * 30, // 0-120 degrees
        recursion: Math.floor(topology.branchingFactor),
        asymmetry: topology.rhizomaticTendency, // 0-1
        density: topology.conceptDensity * 5 // Amplified for visibility
      },
      
      // How ideas connect - affects connection rendering
      connectionStyle: {
        curveIntensity: topology.circularityIndex, // How curved connections are
        connectionWidth: 1 + topology.rhizomaticTendency * 3,
        nodeSize: 3 + topology.conceptDensity * 10,
        connectionOpacity: 0.3 + topology.circularityIndex * 0.5
      },
      
      // Unique structural elements based on actual values
      uniqueElements: this.generateUniqueStructuralElements(topology)
    };
    
    return fingerprint;
  }
  
  // Generate unique visual elements based on topology
  generateUniqueStructuralElements(topology) {
    const elements = [];
    
    // High rhizomatic tendency = web-like patterns
    if (topology.rhizomaticTendency > 0.6) {
      elements.push({
        type: 'web',
        density: topology.rhizomaticTendency,
        irregularity: Math.random() * 0.3 + 0.7
      });
    }
    
    // High circularity = orbital elements
    if (topology.circularityIndex > 0.3) {
      elements.push({
        type: 'orbital',
        layers: Math.ceil(topology.circularityIndex * 5),
        eccentricity: 1 - topology.circularityIndex
      });
    }
    
    // High branching = fractal elements
    if (topology.branchingFactor > 2.5) {
      elements.push({
        type: 'fractal',
        iterations: Math.floor(topology.branchingFactor),
        angle: topology.branchingFactor * 15
      });
    }
    
    return elements;
  }
  
  // Compute temporal rhythm for animation uniqueness
  computeTemporalRhythm(temporality) {
    const rhythm = {
      // Base tempo - how fast things move
      tempo: this.amplificationCurves.exponential(temporality.temporalDensity),
      
      // Rhythm pattern - how movement varies
      pattern: {
        type: temporality.cyclical ? 'cyclical' : (temporality.linear ? 'linear' : 'chaotic'),
        period: temporality.rhythmicPattern.averageLength * 1000, // Convert to milliseconds
        variance: temporality.rhythmicPattern.variance,
        phases: []
      },
      
      // Unique temporal behaviors
      behaviors: []
    };
    
    // Add phase-based animations for cyclical patterns
    if (temporality.cyclical) {
      const phases = Math.ceil(temporality.tenseProgression.past + 
                               temporality.tenseProgression.present + 
                               temporality.tenseProgression.future);
      for (let i = 0; i < phases; i++) {
        rhythm.pattern.phases.push({
          offset: (i / phases) * Math.PI * 2,
          amplitude: 0.5 + (i / phases) * 0.5,
          frequency: 1 + (temporality.temporalDensity * i)
        });
      }
    }
    
    // Add unique behaviors based on temporal characteristics
    if (temporality.eternal) {
      rhythm.behaviors.push({
        type: 'eternal_pulse',
        intensity: 0.3,
        frequency: 0.1
      });
    }
    
    if (temporality.linear && temporality.temporalDensity > 0.1) {
      rhythm.behaviors.push({
        type: 'directional_flow',
        speed: temporality.temporalDensity * 5,
        direction: temporality.tenseProgression.future > temporality.tenseProgression.past ? 1 : -1
      });
    }
    
    return rhythm;
  }
  
  // Compute emotional texture for color and intensity
  computeEmotionalTexture(resonance) {
    const emotions = resonance.frequencies;
    const texture = {
      // Primary color based on dominant emotion
      primaryColor: this.emotionToColor(resonance.dominantMode, 1.0),
      
      // Secondary colors for multimodal resonance
      secondaryColors: [],
      
      // Texture patterns based on emotional complexity
      patterns: [],
      
      // Intensity variations
      intensityMap: this.createIntensityMap(emotions),
      
      // Harmonic overlays
      harmonics: []
    };
    
    // Add secondary colors for all significant emotions
    Object.entries(emotions).forEach(([emotion, value]) => {
      if (value > 0.01 && emotion !== resonance.dominantMode) {
        texture.secondaryColors.push({
          color: this.emotionToColor(emotion, value),
          weight: value,
          blendMode: this.getEmotionalBlendMode(emotion)
        });
      }
    });
    
    // Create texture patterns based on emotional interplay
    if (resonance.multimodal) {
      texture.patterns.push({
        type: 'interference',
        frequency: resonance.harmonicComplexity * 10,
        amplitude: 0.3
      });
    }
    
    // Add harmonic overlays for complex emotional states
    if (resonance.harmonicComplexity > 0.1) {
      const harmonicCount = Math.ceil(resonance.harmonicComplexity * 5);
      for (let i = 0; i < harmonicCount; i++) {
        texture.harmonics.push({
          frequency: (i + 1) * resonance.harmonicComplexity,
          amplitude: 1 / (i + 1),
          phase: Math.random() * Math.PI * 2
        });
      }
    }
    
    return texture;
  }
  
  // Enhanced color mapping with more variation
  emotionToColor(emotion, intensity) {
    const baseColors = {
      wonder: { h: 45, s: 70, l: 60 },    // Golden
      tension: { h: 350, s: 80, l: 50 },  // Crimson
      clarity: { h: 200, s: 50, l: 70 },  // Azure
      depth: { h: 270, s: 60, l: 40 }     // Violet
    };
    
    const base = baseColors[emotion] || { h: 0, s: 0, l: 50 };
    
    // Add variation based on intensity
    return {
      h: base.h + (intensity * 30 - 15), // ±15 degree variation
      s: base.s + (intensity * 20 - 10), // ±10% saturation variation
      l: base.l + (intensity * 20 - 10), // ±10% lightness variation
      a: 0.3 + intensity * 0.7 // Alpha based on intensity
    };
  }
  
  // Create intensity map for gradient effects
  createIntensityMap(emotions) {
    const map = [];
    const total = Object.values(emotions).reduce((sum, val) => sum + val, 0);
    
    Object.entries(emotions).forEach(([emotion, value]) => {
      if (value > 0) {
        map.push({
          emotion,
          intensity: value / total,
          position: map.length / Object.keys(emotions).length
        });
      }
    });
    
    return map;
  }
  
  // Get blend mode based on emotion type
  getEmotionalBlendMode(emotion) {
    const blendModes = {
      wonder: 'screen',
      tension: 'multiply',
      clarity: 'overlay',
      depth: 'soft-light'
    };
    return blendModes[emotion] || 'normal';
  }
  
  // Compute complexity profile for structural depth
  computeComplexityProfile(complexity) {
    const profile = {
      // Layer structure
      layers: Math.ceil(complexity.layerCount * this.amplificationCurves.quadratic(complexity.recursiveDepth / 5)),
      
      // Recursive patterns
      recursion: {
        depth: Math.floor(complexity.recursiveDepth),
        scale: 0.5 + complexity.selfSimilarity * 0.3,
        rotation: complexity.nestedComplexity * 180,
        opacity: 1 - (complexity.abstractionLevel * 0.5)
      },
      
      // Nested elements
      nesting: this.generateNestingPattern(complexity),
      
      // Unique complexity signatures
      signatures: this.extractComplexitySignatures(complexity)
    };
    
    return profile;
  }
  
  // Generate nesting patterns based on complexity
  generateNestingPattern(complexity) {
    const patterns = [];
    
    if (complexity.nestedComplexity > 0.1) {
      patterns.push({
        type: 'concentric',
        levels: Math.ceil(complexity.nestedComplexity * 10),
        scaling: 0.8,
        rotation: complexity.selfSimilarity * 30
      });
    }
    
    if (complexity.recursiveDepth > 2) {
      patterns.push({
        type: 'fractal',
        iterations: Math.floor(complexity.recursiveDepth),
        angleDelta: 360 / complexity.recursiveDepth,
        scaleDelta: 0.7
      });
    }
    
    return patterns;
  }
  
  // Extract unique signatures from complexity
  extractComplexitySignatures(complexity) {
    const signatures = [];
    
    // High abstraction = ethereal elements
    if (complexity.abstractionLevel > 0.6) {
      signatures.push({
        type: 'ethereal',
        opacity: 1 - complexity.abstractionLevel,
        blur: complexity.abstractionLevel * 5,
        glow: complexity.abstractionLevel * 10
      });
    }
    
    // High self-similarity = repeating motifs
    if (complexity.selfSimilarity > 0.5) {
      signatures.push({
        type: 'motif',
        count: Math.ceil(complexity.selfSimilarity * 8),
        variation: 1 - complexity.selfSimilarity,
        distribution: 'golden-spiral'
      });
    }
    
    return signatures;
  }
  
  // Compute dynamic character for movement patterns
  computeDynamicCharacter(dynamics) {
    const character = {
      // Primary movement type with amplified parameters
      primaryMovement: {
        type: dynamics.dominantMovement,
        velocity: this.amplificationCurves.exponential(dynamics.velocity * 10),
        trajectory: this.trajectoryToPath(dynamics.trajectory),
        turbulence: 0
      },
      
      // Secondary movements for richness
      secondaryMovements: [],
      
      // Particle systems for dynamic effects
      particles: this.generateParticleSystem(dynamics),
      
      // Force fields affecting movement
      forces: this.generateForceFields(dynamics)
    };
    
    // Add secondary movements based on pattern strengths
    Object.entries(dynamics.patterns).forEach(([movement, strength]) => {
      if (strength > 0 && movement !== dynamics.dominantMovement) {
        character.secondaryMovements.push({
          type: movement,
          strength: this.amplificationCurves.quadratic(strength / 10),
          phase: Math.random() * Math.PI * 2
        });
      }
    });
    
    // Add turbulence for chaotic movements
    if (dynamics.patterns.oscillating > 0) {
      character.primaryMovement.turbulence = dynamics.patterns.oscillating / 5;
    }
    
    return character;
  }
  
  // Convert trajectory to visual path
  trajectoryToPath(trajectory) {
    const paths = {
      expanding: {
        type: 'spiral-out',
        rate: 1.2,
        angle: 0.1
      },
      contracting: {
        type: 'spiral-in',
        rate: 0.8,
        angle: -0.1
      },
      stable: {
        type: 'circular',
        rate: 1.0,
        angle: 0
      },
      hybrid: {
        type: 'lissajous',
        rate: 1.1,
        angle: 0.05
      }
    };
    
    return paths[trajectory] || paths.stable;
  }
  
  // Generate particle system based on dynamics
  generateParticleSystem(dynamics) {
    const particles = {
      enabled: dynamics.velocity > 0.01,
      count: Math.ceil(dynamics.velocity * 1000),
      behavior: dynamics.dominantMovement,
      properties: {}
    };
    
    // Configure particle properties based on movement type
    switch (dynamics.dominantMovement) {
      case 'flowing':
        particles.properties = {
          lifespan: 3000,
          speed: dynamics.velocity * 50,
          spread: 0.2,
          gravity: 0.1
        };
        break;
      case 'radiating':
        particles.properties = {
          lifespan: 2000,
          speed: dynamics.velocity * 100,
          spread: Math.PI * 2,
          gravity: 0
        };
        break;
      case 'spiraling':
        particles.properties = {
          lifespan: 4000,
          speed: dynamics.velocity * 30,
          spread: 0.5,
          gravity: -0.05,
          spiral: true
        };
        break;
      default:
        particles.properties = {
          lifespan: 2500,
          speed: dynamics.velocity * 40,
          spread: 1,
          gravity: 0.05
        };
    }
    
    return particles;
  }
  
  // Generate force fields for complex movements
  generateForceFields(dynamics) {
    const fields = [];
    
    // Attractor fields for collapsing movements
    if (dynamics.patterns.collapsing > 0) {
      fields.push({
        type: 'attractor',
        strength: dynamics.patterns.collapsing,
        position: { x: 0.5, y: 0.5 },
        radius: 0.3
      });
    }
    
    // Repulsor fields for radiating movements
    if (dynamics.patterns.radiating > 0) {
      fields.push({
        type: 'repulsor',
        strength: dynamics.patterns.radiating,
        position: { x: 0.5, y: 0.5 },
        radius: 0.1
      });
    }
    
    // Vortex fields for spiraling movements
    if (dynamics.patterns.spiraling > 0) {
      fields.push({
        type: 'vortex',
        strength: dynamics.patterns.spiraling,
        position: { x: 0.5, y: 0.5 },
        radius: 0.5,
        clockwise: Math.random() > 0.5
      });
    }
    
    return fields;
  }
  
  // Extract unique conceptual DNA - the most important part
  extractUniqueConceptualDNA(genome) {
    // This is where we capture what makes this text truly unique
    const dna = {
      // Unique identifier based on all genome values
      fingerprint: genome.fingerprint,
      
      // Conceptual keywords that should drive unique visuals
      concepts: this.extractKeyConceptsFromSource(genome.source),
      
      // Unique combinations of genome features
      uniqueCombinations: this.findUniqueCombinations(genome),
      
      // Outlier values that make this genome special
      outliers: this.findGenomeOutliers(genome),
      
      // Semantic color - a unique color derived from the content
      semanticColor: this.deriveSemanticColor(genome)
    };
    
    return dna;
  }
  
  // Extract key concepts that should create visual distinctions
  extractKeyConceptsFromSource(source) {
    const concepts = [];
    
    // Extract from title
    if (source.title) {
      const titleWords = source.title.toLowerCase().split(/\s+/)
        .filter(word => word.length > 4 && !this.isCommonWord(word));
      
      titleWords.forEach(word => {
        concepts.push({
          word,
          weight: 1.0,
          visualHint: this.wordToVisualHint(word)
        });
      });
    }
    
    // Extract from themes with lower weight
    if (source.themes) {
      source.themes.forEach(theme => {
        concepts.push({
          word: theme,
          weight: 0.7,
          visualHint: this.themeToVisualHint(theme)
        });
      });
    }
    
    return concepts;
  }
  
  // Convert words to visual hints
  wordToVisualHint(word) {
    // This could be expanded with a comprehensive mapping
    const hints = {
      // Texture hints
      'rough': { texture: 'noise', intensity: 0.8 },
      'smooth': { texture: 'gradient', intensity: 0.2 },
      'sharp': { edges: 'angular', sharpness: 1.0 },
      'soft': { edges: 'rounded', blur: 0.3 },
      
      // Movement hints
      'fast': { speed: 2.0, motion: 'blur' },
      'slow': { speed: 0.5, motion: 'smooth' },
      'chaos': { randomness: 0.9, jitter: 0.5 },
      'order': { randomness: 0.1, grid: true },
      
      // Structure hints
      'complex': { layers: 5, detail: 0.9 },
      'simple': { layers: 1, detail: 0.1 },
      'deep': { depth: 0.9, shadows: true },
      'surface': { depth: 0.1, flat: true }
    };
    
    // Check if word contains any hint keywords
    for (const [key, value] of Object.entries(hints)) {
      if (word.includes(key)) {
        return value;
      }
    }
    
    // Default hint based on word characteristics
    return {
      complexity: word.length / 10,
      uniqueness: 1 - this.getWordFrequency(word)
    };
  }
  
  // Theme to visual hint mapping
  themeToVisualHint(theme) {
    const themeHints = {
      'technology': { style: 'digital', precision: 0.9 },
      'nature': { style: 'organic', variation: 0.7 },
      'philosophy': { style: 'abstract', depth: 0.8 },
      'emotion': { style: 'fluid', intensity: 0.8 },
      'logic': { style: 'geometric', precision: 0.95 },
      'mystery': { style: 'ethereal', opacity: 0.6 }
    };
    
    return themeHints[theme.toLowerCase()] || { style: 'neutral', weight: 0.5 };
  }
  
  // Find unique combinations in genome
  findUniqueCombinations(genome) {
    const combinations = [];
    
    // Look for unusual combinations of high/low values
    if (genome.topology.rhizomaticTendency > 0.7 && genome.temporality.linear) {
      combinations.push({
        type: 'rhizomatic-linear',
        rarity: 0.9,
        visual: { pattern: 'directed-network', emphasis: 'flow' }
      });
    }
    
    if (genome.complexity.abstractionLevel > 0.8 && genome.dynamics.velocity > 0.05) {
      combinations.push({
        type: 'abstract-dynamic',
        rarity: 0.8,
        visual: { pattern: 'ethereal-motion', blur: 0.4 }
      });
    }
    
    if (genome.resonance.multimodal && genome.complexity.recursiveDepth > 3) {
      combinations.push({
        type: 'multimodal-recursive',
        rarity: 0.85,
        visual: { pattern: 'harmonic-fractal', layers: 'interference' }
      });
    }
    
    return combinations;
  }
  
  // Find outlier values that make this genome unique
  findGenomeOutliers(genome) {
    const outliers = [];
    const threshold = 0.8; // Values above 80th percentile
    
    // Check all numeric values in genome
    const checkValue = (value, path, expected = 0.5) => {
      const deviation = Math.abs(value - expected);
      if (deviation > threshold) {
        outliers.push({
          path,
          value,
          deviation,
          direction: value > expected ? 'high' : 'low',
          impact: this.outlierToVisualImpact(path, value, deviation)
        });
      }
    };
    
    // Scan genome for outliers
    checkValue(genome.topology.rhizomaticTendency, 'topology.rhizomatic', 0.3);
    checkValue(genome.topology.branchingFactor, 'topology.branching', 2.0);
    checkValue(genome.temporality.temporalDensity, 'temporality.density', 0.1);
    checkValue(genome.complexity.recursiveDepth, 'complexity.recursion', 2.0);
    checkValue(genome.dynamics.velocity, 'dynamics.velocity', 0.02);
    
    return outliers;
  }
  
  // Convert outliers to visual impact
  outlierToVisualImpact(path, value, deviation) {
    const impacts = {
      'topology.rhizomatic': {
        high: { connections: 'dense-web', opacity: 0.8 },
        low: { connections: 'sparse', opacity: 0.3 }
      },
      'topology.branching': {
        high: { branches: Math.ceil(value), angle: value * 15 },
        low: { branches: 2, angle: 90 }
      },
      'temporality.density': {
        high: { speed: value * 10, trails: true },
        low: { speed: 0.1, static: true }
      },
      'complexity.recursion': {
        high: { iterations: Math.floor(value), scale: 0.618 },
        low: { iterations: 1, scale: 0.9 }
      },
      'dynamics.velocity': {
        high: { particles: Math.ceil(value * 1000), speed: value * 100 },
        low: { particles: 0, speed: 0 }
      }
    };
    
    const direction = value > 0.5 ? 'high' : 'low';
    return impacts[path]?.[direction] || { intensity: deviation };
  }
  
  // Derive a unique semantic color from the genome
  deriveSemanticColor(genome) {
    // Create a color that represents this specific genome
    const h = (genome.topology.rhizomaticTendency * 120 + 
               genome.temporality.temporalDensity * 120 +
               genome.dynamics.velocity * 120) % 360;
    
    const s = 30 + (genome.resonance.harmonicComplexity * 40) +
              (genome.complexity.abstractionLevel * 30);
    
    const l = 40 + (genome.complexity.recursiveDepth * 5) -
              (genome.topology.circularityIndex * 10);
    
    return {
      primary: { h, s: Math.min(100, s), l: Math.min(80, Math.max(20, l)) },
      secondary: { 
        h: (h + 180) % 360, 
        s: Math.min(100, s * 0.7), 
        l: Math.min(80, Math.max(20, l + 20)) 
      },
      accent: {
        h: (h + genome.resonance.frequencies.wonder * 60) % 360,
        s: Math.min(100, s * 1.2),
        l: Math.min(80, Math.max(20, l - 10))
      }
    };
  }
  
  // Check if word is common (would need a frequency database)
  isCommonWord(word) {
    const common = ['that', 'this', 'with', 'from', 'have', 'been', 'were', 'their', 'they', 'what', 'when', 'where', 'which', 'while'];
    return common.includes(word);
  }
  
  // Get word frequency (placeholder - would need corpus data)
  getWordFrequency(word) {
    // In reality, this would check against a frequency database
    return 0.5; // Placeholder
  }
  
  // Apply dramatic amplification to ensure differences are visible
  amplifyDifferences(baseParams, signatures) {
    const amplified = { ...baseParams };
    
    // Apply structural amplifications
    if (signatures.structuralFingerprint) {
      amplified.branchAngle = signatures.structuralFingerprint.branchingPattern.angle;
      amplified.connectionCurve = signatures.structuralFingerprint.connectionStyle.curveIntensity;
      amplified.nodeScale = signatures.structuralFingerprint.connectionStyle.nodeSize;
      amplified.structuralElements = signatures.structuralFingerprint.uniqueElements;
    }
    
    // Apply temporal amplifications
    if (signatures.temporalRhythm) {
      amplified.animationSpeed = signatures.temporalRhythm.tempo;
      amplified.animationPattern = signatures.temporalRhythm.pattern;
      amplified.temporalBehaviors = signatures.temporalRhythm.behaviors;
    }
    
    // Apply emotional amplifications
    if (signatures.emotionalTexture) {
      amplified.colorScheme = signatures.emotionalTexture;
      amplified.emotionalPatterns = signatures.emotionalTexture.patterns;
      amplified.harmonicOverlays = signatures.emotionalTexture.harmonics;
    }
    
    // Apply complexity amplifications
    if (signatures.complexityProfile) {
      amplified.layerCount = signatures.complexityProfile.layers;
      amplified.recursionDepth = signatures.complexityProfile.recursion.depth;
      amplified.nestingPatterns = signatures.complexityProfile.nesting;
      amplified.complexitySignatures = signatures.complexityProfile.signatures;
    }
    
    // Apply movement amplifications
    if (signatures.dynamicCharacter) {
      amplified.movementSystem = signatures.dynamicCharacter;
      amplified.particleSystem = signatures.dynamicCharacter.particles;
      amplified.forceFields = signatures.dynamicCharacter.forces;
    }
    
    // Apply unique DNA
    if (signatures.conceptualDNA) {
      amplified.uniqueIdentifiers = signatures.conceptualDNA;
      amplified.semanticColors = signatures.conceptualDNA.semanticColor;
      amplified.conceptualElements = signatures.conceptualDNA.concepts;
    }
    
    return amplified;
  }
  
  // Add content-specific visual elements
  addContentSpecificElements(params, genome) {
    const enriched = { ...params };
    
    // Add visual elements based on specific concepts
    if (enriched.conceptualElements) {
      enriched.conceptualElements.forEach(concept => {
        if (concept.visualHint) {
          // Apply visual hints to parameters
          Object.entries(concept.visualHint).forEach(([key, value]) => {
            enriched[`concept_${concept.word}_${key}`] = value;
          });
        }
      });
    }
    
    // Add unique visual markers for outliers
    if (enriched.uniqueIdentifiers?.outliers) {
      enriched.outlierMarkers = enriched.uniqueIdentifiers.outliers.map(outlier => ({
        ...outlier,
        visualElement: this.createOutlierVisualElement(outlier)
      }));
    }
    
    // Add combination-specific patterns
    if (enriched.uniqueIdentifiers?.uniqueCombinations) {
      enriched.combinationPatterns = enriched.uniqueIdentifiers.uniqueCombinations.map(combo => ({
        ...combo,
        implementation: this.implementCombinationPattern(combo)
      }));
    }
    
    return enriched;
  }
  
  // Create visual element for outlier
  createOutlierVisualElement(outlier) {
    return {
      type: 'marker',
      style: outlier.direction === 'high' ? 'emphasis' : 'subtle',
      ...outlier.impact,
      renderPriority: outlier.deviation
    };
  }
  
  // Implement combination pattern
  implementCombinationPattern(combination) {
    const implementations = {
      'rhizomatic-linear': {
        render: 'directed-graph',
        nodeStyle: 'flow-points',
        edgeStyle: 'gradient-curves'
      },
      'abstract-dynamic': {
        render: 'particle-field',
        opacity: 'variable',
        motion: 'ethereal-drift'
      },
      'multimodal-recursive': {
        render: 'interference-fractal',
        layers: 'harmonic',
        blending: 'additive'
      }
    };
    
    return implementations[combination.type] || { render: 'default' };
  }
  
  // Ensure perceptual distinctiveness from other glyphs
  ensurePerceptualDistinctiveness(params) {
    // This would ideally check against other rendered glyphs
    // For now, we'll add some final randomization to ensure uniqueness
    
    const distinct = { ...params };
    
    // Add unique noise pattern
    distinct.noisePattern = {
      seed: Math.random() * 10000,
      scale: 0.1 + Math.random() * 0.2,
      intensity: 0.05 + Math.random() * 0.1
    };
    
    // Add unique rotation offset
    distinct.rotationOffset = Math.random() * 360;
    
    // Add unique phase offset for animations
    distinct.phaseOffset = Math.random() * Math.PI * 2;
    
    // Add unique scale variations
    distinct.scaleVariation = 0.9 + Math.random() * 0.2;
    
    return distinct;
  }
  
  // Get base parameters for family (simplified version)
  getBaseParamsForFamily(family) {
    const familyParams = {
      'Threshold': {
        baseStructure: 'portal',
        baseAnimation: 'pulse',
        baseComplexity: 3
      },
      'Grid': {
        baseStructure: 'lattice',
        baseAnimation: 'shift',
        baseComplexity: 4
      },
      'Flow': {
        baseStructure: 'stream',
        baseAnimation: 'flow',
        baseComplexity: 2
      },
      'Radiance': {
        baseStructure: 'rays',
        baseAnimation: 'rotate',
        baseComplexity: 2
      },
      'Spiral': {
        baseStructure: 'helix',
        baseAnimation: 'spiral',
        baseComplexity: 3
      },
      'Constellation': {
        baseStructure: 'network',
        baseAnimation: 'twinkle',
        baseComplexity: 4
      },
      'Interference': {
        baseStructure: 'waves',
        baseAnimation: 'oscillate',
        baseComplexity: 3
      },
      'Balance': {
        baseStructure: 'symmetry',
        baseAnimation: 'sway',
        baseComplexity: 2
      },
      'Chaos': {
        baseStructure: 'scatter',
        baseAnimation: 'jitter',
        baseComplexity: 5
      },
      'Collapse': {
        baseStructure: 'implosion',
        baseAnimation: 'fall',
        baseComplexity: 3
      },
      'Strata': {
        baseStructure: 'layers',
        baseAnimation: 'slide',
        baseComplexity: 4
      }
    };
    
    return familyParams[family] || familyParams['Radiance'];
  }
}

// === PHASE 2: SEMANTIC VISUAL TRANSLATOR ===
// Maps semantic archetypes to visual archetypes with temporal awareness

class SemanticVisualTranslator {
  constructor() {
    // Semantic to visual archetype mappings
    this.archetypeMap = {
      // Philosophical archetypes
      'dialectical': {
        visual: 'double-helix',
        dynamics: 'counter-rotating',
        complexity: 'interweaving'
      },
      'phenomenological': {
        visual: 'nested-spheres',
        dynamics: 'breathing',
        complexity: 'layered-transparency'
      },
      'analytical': {
        visual: 'crystalline-lattice',
        dynamics: 'systematic-growth',
        complexity: 'precise-angles'
      },
      'existential': {
        visual: 'void-and-form',
        dynamics: 'emerging-collapsing',
        complexity: 'figure-ground'
      },
      'pragmatic': {
        visual: 'mechanical-flow',
        dynamics: 'functional-movement',
        complexity: 'modular-assembly'
      },
      
      // Emotional archetypes
      'contemplative': {
        visual: 'ripple-patterns',
        dynamics: 'slow-expansion',
        complexity: 'quiet-depth'
      },
      'urgent': {
        visual: 'lightning-branches',
        dynamics: 'rapid-propagation',
        complexity: 'sharp-energy'
      },
      'melancholic': {
        visual: 'falling-leaves',
        dynamics: 'gentle-descent',
        complexity: 'soft-dissolution'
      },
      'ecstatic': {
        visual: 'radial-burst',
        dynamics: 'explosive-joy',
        complexity: 'overflow-patterns'
      },
      
      // Structural archetypes
      'rhizomatic': {
        visual: 'underground-network',
        dynamics: 'multi-directional-growth',
        complexity: 'non-hierarchical'
      },
      'hierarchical': {
        visual: 'tree-structure',
        dynamics: 'vertical-flow',
        complexity: 'ordered-levels'
      },
      'cyclical': {
        visual: 'ouroboros-forms',
        dynamics: 'eternal-return',
        complexity: 'self-reference'
      },
      'linear': {
        visual: 'arrow-paths',
        dynamics: 'directed-flow',
        complexity: 'sequential-progress'
      }
    };
    
    // Temporal layers for multi-dimensional rendering
    this.temporalLayers = {
      'immediate': { speed: 1.0, opacity: 1.0, blur: 0 },
      'recent': { speed: 0.7, opacity: 0.7, blur: 2 },
      'memory': { speed: 0.4, opacity: 0.4, blur: 5 },
      'archetypal': { speed: 0.1, opacity: 0.2, blur: 10 }
    };
    
    // Visual anaphora patterns (visual callbacks to earlier elements)
    this.anaphoraLibrary = new Map();
    
    // Entropy scaling functions
    this.entropyFunctions = {
      'order': (t) => Math.max(0, 1 - t * 0.1),
      'chaos': (t) => Math.min(1, t * 0.2),
      'oscillating': (t) => 0.5 + 0.5 * Math.sin(t * 0.5),
      'punctuated': (t) => (t % 10 < 1) ? 0.9 : 0.2
    };
  }
  
  // Main translation method
  translateSemanticToVisual(semanticProfile, enhancedParams) {
    // Extract semantic archetype from profile
    const archetype = this.identifyDominantArchetype(semanticProfile);
    
    // Get base visual translation
    const baseVisual = this.getVisualArchetype(archetype);
    
    // Apply temporal layering
    const temporalVisual = this.applyTemporalLayering(baseVisual, semanticProfile);
    
    // Add visual anaphora (references to other glyphs)
    const anaphoricVisual = this.addVisualAnaphora(temporalVisual, semanticProfile);
    
    // Apply entropy scaling
    const entropicVisual = this.applyEntropyScaling(anaphoricVisual, semanticProfile);
    
    // Merge with enhanced parameters from Phase 1 and include archetype
    const finalVisual = this.mergeWithEnhancedParams(entropicVisual, enhancedParams, archetype);
    
    return finalVisual;
  }
  
  // Identify dominant semantic archetype from profile
  identifyDominantArchetype(semanticProfile) {
    const scores = {};
    
    // Philosophical dimension
    if (semanticProfile.complexity?.abstractionLevel > 0.7) {
      scores['phenomenological'] = semanticProfile.complexity.abstractionLevel;
    }
    if (semanticProfile.topology?.circularityIndex > 0.5) {
      scores['dialectical'] = semanticProfile.topology.circularityIndex;
    }
    if (semanticProfile.dynamics?.patterns?.oscillating > 0.05) {
      scores['dialectical'] = (scores['dialectical'] || 0) + semanticProfile.dynamics.patterns.oscillating;
    }
    
    // Emotional dimension
    if (semanticProfile.resonance?.dominantMode === 'wonder') {
      scores['contemplative'] = semanticProfile.resonance.frequencies.wonder;
    }
    if (semanticProfile.resonance?.dominantMode === 'tension') {
      scores['urgent'] = semanticProfile.resonance.frequencies.tension;
    }
    
    // Structural dimension
    if (semanticProfile.topology?.rhizomaticTendency > 0.6) {
      scores['rhizomatic'] = semanticProfile.topology.rhizomaticTendency;
    }
    if (semanticProfile.temporality?.cyclical) {
      scores['cyclical'] = 0.8;
    }
    if (semanticProfile.temporality?.linear) {
      scores['linear'] = 0.7;
    }
    
    // Find highest scoring archetype
    let dominant = 'contemplative'; // default
    let highestScore = 0;
    
    for (const [archetype, score] of Object.entries(scores)) {
      if (score > highestScore) {
        dominant = archetype;
        highestScore = score;
      }
    }
    
    return {
      primary: dominant,
      secondary: this.findSecondaryArchetype(scores, dominant),
      scores
    };
  }
  
  // Find secondary archetype for blending
  findSecondaryArchetype(scores, primary) {
    let secondary = null;
    let highestScore = 0;
    
    for (const [archetype, score] of Object.entries(scores)) {
      if (archetype !== primary && score > highestScore) {
        secondary = archetype;
        highestScore = score;
      }
    }
    
    return secondary;
  }
  
  // Get visual translation for archetype
  getVisualArchetype(archetypeData) {
    const primary = this.archetypeMap[archetypeData.primary] || this.archetypeMap['contemplative'];
    const secondary = archetypeData.secondary ? this.archetypeMap[archetypeData.secondary] : null;
    
    const visual = {
      primary: {
        structure: primary.visual,
        dynamics: primary.dynamics,
        complexity: primary.complexity,
        weight: 0.7
      }
    };
    
    if (secondary) {
      visual.secondary = {
        structure: secondary.visual,
        dynamics: secondary.dynamics,
        complexity: secondary.complexity,
        weight: 0.3
      };
    }
    
    // Add archetype-specific rendering instructions
    visual.renderInstructions = this.generateRenderInstructions(archetypeData);
    
    return visual;
  }
  
  // Generate specific rendering instructions for archetype
  generateRenderInstructions(archetypeData) {
    const instructions = {
      blendMode: 'normal',
      layerOrder: [],
      specialEffects: []
    };
    
    switch (archetypeData.primary) {
      case 'dialectical':
        instructions.blendMode = 'difference';
        instructions.layerOrder = ['thesis', 'antithesis', 'synthesis'];
        instructions.specialEffects.push({
          type: 'counter-rotation',
          speed: 0.02,
          layers: [0, 1]
        });
        break;
        
      case 'phenomenological':
        instructions.blendMode = 'screen';
        instructions.layerOrder = ['essence', 'appearance', 'consciousness'];
        instructions.specialEffects.push({
          type: 'transparency-wave',
          frequency: 0.1,
          amplitude: 0.3
        });
        break;
        
      case 'rhizomatic':
        instructions.blendMode = 'multiply';
        instructions.layerOrder = ['nodes', 'connections', 'emergent-patterns'];
        instructions.specialEffects.push({
          type: 'growth-propagation',
          speed: 0.05,
          branching: true
        });
        break;
        
      case 'existential':
        instructions.blendMode = 'overlay';
        instructions.layerOrder = ['void', 'form', 'tension'];
        instructions.specialEffects.push({
          type: 'void-breathing',
          period: 4000,
          depth: 0.6
        });
        break;
    }
    
    return instructions;
  }
  
  // Apply temporal layering for depth
  applyTemporalLayering(visual, semanticProfile) {
    const layered = { ...visual, temporalLayers: [] };
    
    // Determine temporal composition based on tense progression
    const tenseProgression = semanticProfile.temporality?.tenseProgression || {
      past: 0.33,
      present: 0.33,
      future: 0.33
    };
    
    // Create layers based on temporal weight
    if (tenseProgression.past > 0.1) {
      layered.temporalLayers.push({
        type: 'memory',
        weight: tenseProgression.past,
        ...this.temporalLayers.memory,
        visual: this.createMemoryLayer(visual)
      });
    }
    
    if (tenseProgression.present > 0.1) {
      layered.temporalLayers.push({
        type: 'immediate',
        weight: tenseProgression.present,
        ...this.temporalLayers.immediate,
        visual: this.createImmediateLayer(visual)
      });
    }
    
    if (tenseProgression.future > 0.1) {
      layered.temporalLayers.push({
        type: 'anticipation',
        weight: tenseProgression.future,
        speed: 1.5,
        opacity: 0.6,
        blur: 3,
        visual: this.createAnticipationLayer(visual)
      });
    }
    
    // Add archetypal layer if high abstraction
    if (semanticProfile.complexity?.abstractionLevel > 0.7) {
      layered.temporalLayers.push({
        type: 'archetypal',
        weight: semanticProfile.complexity.abstractionLevel * 0.3,
        ...this.temporalLayers.archetypal,
        visual: this.createArchetypalLayer(visual)
      });
    }
    
    return layered;
  }
  
  // Create memory layer (past-oriented visuals)
  createMemoryLayer(visual) {
    return {
      ...visual,
      modifications: {
        opacity: 0.6,
        blur: 5,
        sepia: 0.3,
        fragmentationLevel: 0.2,
        echoCount: 3,
        echoDecay: 0.5
      }
    };
  }
  
  // Create immediate layer (present-focused visuals)
  createImmediateLayer(visual) {
    return {
      ...visual,
      modifications: {
        contrast: 1.2,
        saturation: 1.1,
        sharpness: 1.5,
        pulseIntensity: 0.8,
        glowRadius: 10
      }
    };
  }
  
  // Create anticipation layer (future-oriented visuals)
  createAnticipationLayer(visual) {
    return {
      ...visual,
      modifications: {
        vectorization: 0.7,
        directionality: 1.5,
        acceleration: 0.3,
        particleTrails: true,
        convergencePoints: 3
      }
    };
  }
  
  // Create archetypal layer (timeless patterns)
  createArchetypalLayer(visual) {
    return {
      ...visual,
      modifications: {
        symbolization: 0.8,
        geometricPurity: 0.9,
        sacredGeometry: true,
        mandalicTendency: 0.6,
        fractalDepth: 3
      }
    };
  }
  
  // Add visual anaphora (references to other glyphs)
  addVisualAnaphora(visual, semanticProfile) {
    const anaphoric = { ...visual, anaphoricElements: [] };
    
    // Check for conceptual references that should create visual callbacks
    if (semanticProfile.source?.themes) {
      semanticProfile.source.themes.forEach(theme => {
        const existingPattern = this.anaphoraLibrary.get(theme);
        
        if (existingPattern) {
          // Reference existing visual pattern
          anaphoric.anaphoricElements.push({
            type: 'callback',
            theme,
            pattern: existingPattern,
            transformation: this.generateAnaphoricTransformation(theme),
            opacity: 0.3,
            blendMode: 'soft-light'
          });
        } else {
          // Create new pattern for future reference
          const newPattern = this.createAnaphoricPattern(visual, theme);
          this.anaphoraLibrary.set(theme, newPattern);
          
          anaphoric.anaphoricElements.push({
            type: 'establishment',
            theme,
            pattern: newPattern,
            emphasis: 1.2
          });
        }
      });
    }
    
    // Add cross-references based on shared concepts
    if (semanticProfile.uniqueIdentifiers?.concepts) {
      const concepts = semanticProfile.uniqueIdentifiers.concepts;
      concepts.forEach(concept => {
        if (concept.weight > 0.7) {
          anaphoric.anaphoricElements.push({
            type: 'conceptual-echo',
            concept: concept.word,
            visualHint: concept.visualHint,
            intensity: concept.weight
          });
        }
      });
    }
    
    return anaphoric;
  }
  
  // Generate transformation for anaphoric reference
  generateAnaphoricTransformation(theme) {
    const transformations = {
      'memory': { scale: 0.8, rotation: 15, opacity: 0.6 },
      'time': { scale: 1.2, rotation: -30, opacity: 0.4 },
      'consciousness': { scale: 1.5, rotation: 0, opacity: 0.3 },
      'language': { scale: 0.9, rotation: 45, opacity: 0.5 },
      'technology': { scale: 1.1, rotation: 90, opacity: 0.7 }
    };
    
    return transformations[theme] || { scale: 1, rotation: 0, opacity: 0.5 };
  }
  
  // Create new anaphoric pattern
  createAnaphoricPattern(visual, theme) {
    return {
      baseStructure: visual.primary.structure,
      themeModifier: this.getThemeModifier(theme),
      timestamp: Date.now(),
      usageCount: 1
    };
  }
  
  // Get visual modifier for theme
  getThemeModifier(theme) {
    const modifiers = {
      'memory': { type: 'fragmentation', intensity: 0.3 },
      'time': { type: 'spiral', intensity: 0.5 },
      'consciousness': { type: 'radiance', intensity: 0.7 },
      'language': { type: 'tessellation', intensity: 0.4 },
      'technology': { type: 'grid', intensity: 0.6 },
      'nature': { type: 'organic', intensity: 0.5 },
      'philosophy': { type: 'recursive', intensity: 0.8 }
    };
    
    return modifiers[theme] || { type: 'default', intensity: 0.5 };
  }
  
  // Apply entropy scaling based on semantic disorder
  applyEntropyScaling(visual, semanticProfile) {
    const entropic = { ...visual, entropyEffects: {} };
    
    // Calculate semantic entropy
    const entropy = this.calculateSemanticEntropy(semanticProfile);
    
    // Determine entropy pattern
    const entropyPattern = this.determineEntropyPattern(semanticProfile);
    
    // Apply entropy effects
    entropic.entropyEffects = {
      level: entropy,
      pattern: entropyPattern,
      effects: []
    };
    
    // High entropy = more disorder, randomness
    if (entropy > 0.7) {
      entropic.entropyEffects.effects.push({
        type: 'disintegration',
        intensity: entropy - 0.7,
        particleCount: Math.floor((entropy - 0.7) * 100),
        dispersalPattern: 'explosive'
      });
    }
    
    // Medium entropy = dynamic balance
    if (entropy > 0.3 && entropy <= 0.7) {
      entropic.entropyEffects.effects.push({
        type: 'fluctuation',
        intensity: entropy,
        waveFrequency: entropy * 10,
        waveAmplitude: entropy * 0.2
      });
    }
    
    // Low entropy = high order, crystallization
    if (entropy <= 0.3) {
      entropic.entropyEffects.effects.push({
        type: 'crystallization',
        intensity: 1 - entropy,
        symmetryOrder: Math.ceil((1 - entropy) * 8),
        rigidity: 1 - entropy
      });
    }
    
    // Apply entropy function over time
    entropic.entropyEffects.temporalFunction = this.entropyFunctions[entropyPattern];
    
    return entropic;
  }
  
  // Calculate semantic entropy from profile
  calculateSemanticEntropy(profile) {
    let entropy = 0;
    let factors = 0;
    
    // Complexity contributes to entropy
    if (profile.complexity) {
      entropy += profile.complexity.nestedComplexity * 0.3;
      entropy += (1 - profile.complexity.selfSimilarity) * 0.2;
      factors += 2;
    }
    
    // Movement chaos contributes to entropy
    if (profile.dynamics?.patterns) {
      entropy += (profile.dynamics.patterns.oscillating || 0) * 0.4;
      entropy += (profile.dynamics.patterns.collapsing || 0) * 0.6;
      factors += 2;
    }
    
    // Multimodal resonance increases entropy
    if (profile.resonance?.multimodal) {
      entropy += 0.3;
      factors += 1;
    }
    
    // Rhizomatic topology increases entropy
    if (profile.topology?.rhizomaticTendency > 0.5) {
      entropy += profile.topology.rhizomaticTendency * 0.3;
      factors += 1;
    }
    
    return factors > 0 ? entropy / factors : 0.5;
  }
  
  // Determine entropy pattern over time
  determineEntropyPattern(profile) {
    if (profile.temporality?.cyclical) {
      return 'oscillating';
    }
    
    if (profile.dynamics?.trajectory === 'contracting') {
      return 'order';
    }
    
    if (profile.dynamics?.trajectory === 'expanding') {
      return 'chaos';
    }
    
    if (profile.complexity?.recursiveDepth > 3) {
      return 'punctuated';
    }
    
    return 'oscillating'; // default
  }
  
  // Merge semantic visual with enhanced parameters
  mergeWithEnhancedParams(semanticVisual, enhancedParams, archetype) {
    const merged = {
      ...enhancedParams,
      ...semanticVisual,
      
      // Preserve enhanced parameters that shouldn't be overwritten
      colorScheme: enhancedParams.colorScheme || semanticVisual.colorScheme,
      particleSystem: enhancedParams.particleSystem || semanticVisual.particleSystem,
      
      // Merge arrays
      specialEffects: [
        ...(enhancedParams.specialEffects || []),
        ...(semanticVisual.renderInstructions?.specialEffects || [])
      ],
      
      // Merge temporal layers
      layers: [
        ...(enhancedParams.layers || []),
        ...(semanticVisual.temporalLayers || [])
      ],
      
      // Add semantic-specific properties - FIXED: use actual archetype data
      semanticArchetype: archetype,
      anaphoricReferences: semanticVisual.anaphoricElements,
      entropyDynamics: semanticVisual.entropyEffects
    };
    
    // Apply final optimization
    return this.optimizeForRendering(merged);
  }
  
  // Optimize visual parameters for actual rendering
  optimizeForRendering(visual) {
    const optimized = { ...visual };
    
    // Limit layer count for performance
    if (optimized.layers && optimized.layers.length > 5) {
      // Sort by weight and keep top 5
      optimized.layers = optimized.layers
        .sort((a, b) => (b.weight || 1) - (a.weight || 1))
        .slice(0, 5);
    }
    
    // Limit particle count
    if (optimized.particleSystem?.count > 1000) {
      optimized.particleSystem.count = 1000;
    }
    
    // Limit anaphoric elements
    if (optimized.anaphoricReferences?.length > 3) {
      optimized.anaphoricReferences = optimized.anaphoricReferences
        .sort((a, b) => (b.intensity || 1) - (a.intensity || 1))
        .slice(0, 3);
    }
    
    // Add performance hints
    optimized.performanceHints = {
      gpuAcceleration: optimized.layers?.length > 3,
      offscreenCanvas: optimized.particleSystem?.count > 500,
      reducedMotion: false,
      cacheStrategy: 'aggressive'
    };
    
    return optimized;
  }
  
  // Get visual distance between two semantic profiles (for ensuring distinctiveness)
  getVisualDistance(profile1, profile2) {
    const visual1 = this.translateSemanticToVisual(profile1, {});
    const visual2 = this.translateSemanticToVisual(profile2, {});
    
    let distance = 0;
    
    // Compare archetypes
    if (visual1.primary.structure !== visual2.primary.structure) {
      distance += 0.3;
    }
    
    // Compare dynamics
    if (visual1.primary.dynamics !== visual2.primary.dynamics) {
      distance += 0.2;
    }
    
    // Compare entropy levels
    const entropyDiff = Math.abs(
      (visual1.entropyDynamics?.level || 0) - 
      (visual2.entropyDynamics?.level || 0)
    );
    distance += entropyDiff * 0.2;
    
    // Compare temporal composition
    const temporal1 = this.getTemporalSignature(visual1);
    const temporal2 = this.getTemporalSignature(visual2);
    distance += this.compareTemporalSignatures(temporal1, temporal2) * 0.3;
    
    return Math.min(1, distance);
  }
  
  // Get temporal signature for comparison
  getTemporalSignature(visual) {
    const signature = { past: 0, present: 0, future: 0, archetypal: 0 };
    
    if (visual.temporalLayers) {
      visual.temporalLayers.forEach(layer => {
        signature[layer.type] = layer.weight || 0;
      });
    }
    
    return signature;
  }
  
  // Compare temporal signatures
  compareTemporalSignatures(sig1, sig2) {
    let diff = 0;
    const keys = ['past', 'present', 'future', 'archetypal'];
    
    keys.forEach(key => {
      diff += Math.abs((sig1[key] || 0) - (sig2[key] || 0));
    });
    
    return diff / keys.length;
  }
}

// === REGISTRATION WITH GLOBAL GLYPH SYSTEM ===

if (typeof window !== 'undefined') {
  window.GlyphSemantics = window.GlyphSemantics || {};
  window.GlyphSemantics.EnhancedSemanticInterpreter = EnhancedSemanticInterpreter;
  window.GlyphSemantics.SemanticVisualTranslator = SemanticVisualTranslator;
}