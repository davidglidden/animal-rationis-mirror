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
      concepts: this.extractKeyConceptsFromGenome(genome),
      
      // Unique combinations of genome features
      uniqueCombinations: this.findUniqueCombinations(genome),
      
      // Outlier values that make this genome special
      outliers: this.findGenomeOutliers(genome),
      
      // Semantic color - a unique color derived from the content
      semanticColor: this.deriveSemanticColor(genome)
    };
    
    return dna;
  }
  
  // Enhanced Genome→Concepts Bridge with sophisticated pattern recognition
  extractKeyConceptsFromGenome(genome) {
    const extractor = new GenomeConceptExtractor();
    const concepts = extractor.extractConceptsFromGenome(genome);
    
    // Analytics logging for visual confirmation
    if (concepts.length > 0) {
      console.log('🧠 Enhanced genome concepts:', concepts);
    }
    
    return concepts;
  }
  
  // Extract key concepts that should create visual distinctions (legacy method)
  extractKeyConceptsFromSource(source) {
    const concepts = [];
    
    // Ensure source exists and has required properties
    if (!source) {
      console.warn('⚠️ No source provided to extractKeyConceptsFromSource');
      return concepts;
    }
    
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
      },
      
      // NEW: Visual family-based archetypes (for concept-driven selection)
      'layered': {
        visual: 'stratified-planes',
        dynamics: 'sedimentary-shift',
        complexity: 'depth-accumulation'
      },
      'luminous': {
        visual: 'light-rays',
        dynamics: 'radiating-glow',
        complexity: 'emanation-patterns'
      },
      'flowing': {
        visual: 'liquid-streams',
        dynamics: 'fluid-motion',
        complexity: 'current-patterns'
      },
      'liminal': {
        visual: 'portal-forms',
        dynamics: 'threshold-pulsing',
        complexity: 'boundary-states'
      },
      'networked': {
        visual: 'node-connections',
        dynamics: 'signal-propagation',
        complexity: 'emergent-topology'
      },
      'equilibrium': {
        visual: 'balanced-forms',
        dynamics: 'pendulum-motion',
        complexity: 'symmetric-harmony'
      },
      'chaotic': {
        visual: 'turbulent-fields',
        dynamics: 'unpredictable-motion',
        complexity: 'fractal-disorder'
      },
      'entropic': {
        visual: 'dissolving-structures',
        dynamics: 'gravity-collapse',
        complexity: 'decay-patterns'
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
    try {
      console.log('🎨 translateSemanticToVisual called with profile:', semanticProfile);
      console.log('🎯 About to call identifyDominantArchetype...');
      
      // Extract semantic archetype from profile
      const archetype = this.identifyDominantArchetype(semanticProfile);
      console.log('✅ identifyDominantArchetype returned:', archetype);
      
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
      
      console.log('🎨 translateSemanticToVisual returning:', finalVisual);
      return finalVisual;
    } catch (err) {
      console.error('💥 translateSemanticToVisual crashed:', err);
      return enhancedParams; // safe fallback
    }
  }
  
  // ENHANCED: Identify dominant semantic archetype using sophisticated concept analysis
  identifyDominantArchetype(semanticProfile) {
    console.log('🎯 Enhanced archetype selection starting for profile:', semanticProfile.conceptualDNA?.concepts);
    
    const scores = {};
    
    // PRIME DIRECTIVE: Multi-Modal Analysis Engine archetype is the source of truth
    if (semanticProfile.archetypeProfile?.primary) {
      const multiModalArchetype = semanticProfile.archetypeProfile.primary;
      const multiModalConfidence = semanticProfile.archetypeProfile.confidence || 0.9;
      
      console.log('🎭 PRIME DIRECTIVE: Using Multi-Modal archetype as source of truth:', multiModalArchetype);
      console.log('🎯 Multi-Modal confidence:', multiModalConfidence);
      
      // Map Multi-Modal archetype to semantic archetype for rendering
      const semanticArchetype = this.mapMultiModalToSemanticArchetype(multiModalArchetype);
      console.log('🎯 Multi-Modal mapping:', multiModalArchetype, '→', semanticArchetype);
      
      if (semanticArchetype) {
        scores[semanticArchetype] = multiModalConfidence;
        console.log('✅ Multi-Modal archetype set as canonical:', semanticArchetype, '=', multiModalConfidence);
      }
    }
    
    // PRIORITY 2: Use enhanced concepts from GenomeConceptExtractor (only if no Multi-Modal)
    if (Object.keys(scores).length === 0 && semanticProfile.conceptualDNA?.concepts && semanticProfile.conceptualDNA.concepts.length > 0) {
      console.log('🎯 Using enhanced concepts for archetype selection');
      console.log('🧬 Available enhanced concepts:', semanticProfile.conceptualDNA.concepts);
      
      // Enhanced concept scoring with sophisticated pattern recognition
      const conceptScores = {
        'layered': 0,        // Strata family
        'luminous': 0,       // Radiance family  
        'flowing': 0,        // Flow family
        'liminal': 0,        // Threshold family
        'networked': 0,      // Constellation family
        'cyclical': 0,       // Spiral family
        'analytical': 0,     // Grid family
        'chaotic': 0,        // Chaos family
        'entropic': 0,       // Collapse family
        'equilibrium': 0,    // Balance family
        'dialectical': 0     // Interference family
      };
      
      semanticProfile.conceptualDNA.concepts.forEach(concept => {
        console.log(`🔍 Processing enhanced concept: ${concept.word} (weight: ${concept.weight}, archetype: ${concept.archetype}, source: ${concept.source})`);
        
        // Enhanced concept-to-archetype mapping
        const archetypeMapping = this.getEnhancedArchetypeMapping(concept);
        
        if (archetypeMapping) {
          const semanticArchetype = archetypeMapping.semantic;
          const weight = concept.weight * archetypeMapping.multiplier;
          
          console.log(`🎯 Enhanced mapping: ${concept.word} → ${semanticArchetype} (weight: ${weight})`);
          
          if (conceptScores.hasOwnProperty(semanticArchetype)) {
            conceptScores[semanticArchetype] += weight;
            console.log(`✅ Added to conceptScores[${semanticArchetype}] = ${conceptScores[semanticArchetype]}`);
          }
        }
        
        // Also use direct archetype mapping from concept
        if (concept.archetype) {
          const semanticArchetype = this.mapVisualToSemanticArchetype(concept.archetype);
          console.log(`🎯 Direct mapping ${concept.archetype} → ${semanticArchetype} (weight: ${concept.weight})`);
          if (conceptScores.hasOwnProperty(semanticArchetype)) {
            conceptScores[semanticArchetype] += concept.weight;
            console.log(`✅ Added to conceptScores[${semanticArchetype}] = ${conceptScores[semanticArchetype]}`);
          }
        }
      });
      
      // Apply confidence weighting and source diversity bonuses
      Object.entries(conceptScores).forEach(([archetype, score]) => {
        if (score > 0) {
          // Apply confidence and source diversity bonuses
          const enhancedScore = this.applyArchetypeEnhancements(archetype, score, semanticProfile.conceptualDNA.concepts);
          scores[archetype] = enhancedScore;
        }
      });
      
      console.log('📊 Enhanced archetype scores from concepts:', scores);
    }
    
    // PRIORITY 3: If no Multi-Modal or concept-based archetypes, use semantic analysis
    if (Object.keys(scores).length === 0) {
      console.log('📈 No Multi-Modal or concept archetypes found, using semantic analysis');
      
      // Look at dominant emotional mode first
      if (semanticProfile.resonance?.dominantMode) {
        const emotionToArchetype = {
          'wonder': 'contemplative',
          'tension': 'urgent',
          'clarity': 'analytical',
          'depth': 'layered'
        };
        const archetype = emotionToArchetype[semanticProfile.resonance.dominantMode];
        if (archetype) {
          scores[archetype] = semanticProfile.resonance.frequencies[semanticProfile.resonance.dominantMode] || 0.5;
        }
      }
      
      // Look at dominant movement pattern
      if (semanticProfile.dynamics?.dominantMovement) {
        const movementToArchetype = {
          'flowing': 'flowing',
          'radiating': 'luminous',
          'spiraling': 'cyclical',
          'collapsing': 'entropic',
          'oscillating': 'dialectical'
        };
        const archetype = movementToArchetype[semanticProfile.dynamics.dominantMovement];
        if (archetype) {
          scores[archetype] = (scores[archetype] || 0) + 0.5;
        }
      }
      
      // Structural analysis
      if (semanticProfile.topology) {
        if (semanticProfile.topology.rhizomaticTendency > 0.6) {
          scores['rhizomatic'] = semanticProfile.topology.rhizomaticTendency;
        }
        if (semanticProfile.topology.circularityIndex > 0.6) {
          scores['cyclical'] = (scores['cyclical'] || 0) + semanticProfile.topology.circularityIndex * 0.5;
        }
      }
      
      // Temporal analysis
      if (semanticProfile.temporality) {
        if (semanticProfile.temporality.cyclical) {
          scores['cyclical'] = (scores['cyclical'] || 0) + 0.6;
        }
        if (semanticProfile.temporality.linear) {
          scores['linear'] = (scores['linear'] || 0) + 0.5;
        }
      }
    }
    
    // FALLBACK: Only use hardcoded thresholds if still no scores
    if (Object.keys(scores).length === 0) {
      console.log('⚠️ Using fallback threshold analysis');
      
      // Original threshold logic as last resort
      if (semanticProfile.complexity?.abstractionLevel > 0.7) {
        scores['phenomenological'] = semanticProfile.complexity.abstractionLevel;
      }
      if (semanticProfile.topology?.circularityIndex > 0.5) {
        scores['dialectical'] = semanticProfile.topology.circularityIndex;
      }
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
    
    // Log the selection for debugging
    console.log(`🎨 Selected archetype: ${dominant} (score: ${highestScore.toFixed(2)})`);
    console.log('📊 All archetype scores:', scores);
    
    return {
      primary: dominant,
      secondary: this.findSecondaryArchetype(scores, dominant),
      scores
    };
  }
  
  // Enhanced archetype mapping with sophisticated concept analysis
  getEnhancedArchetypeMapping(concept) {
    const mappings = {
      // Sophisticated conceptual mappings
      'contemplative': { semantic: 'layered', multiplier: 1.2 },
      'dynamic': { semantic: 'flowing', multiplier: 1.1 },
      'interconnected': { semantic: 'networked', multiplier: 1.0 },
      'radiant': { semantic: 'luminous', multiplier: 1.3 },
      'spiral': { semantic: 'cyclical', multiplier: 1.1 },
      'branching': { semantic: 'networked', multiplier: 1.0 },
      
      // Emergent pattern mappings
      'philosophical_stance': { semantic: 'layered', multiplier: 1.4 },
      'temporal_awareness': { semantic: 'flowing', multiplier: 1.2 },
      'perceptual_focus': { semantic: 'luminous', multiplier: 1.1 },
      'spatial_orientation': { semantic: 'analytical', multiplier: 1.0 },
      'emotional_resonance': { semantic: 'dialectical', multiplier: 0.9 },
      
      // Semantic field mappings
      'nature_field': { semantic: 'luminous', multiplier: 1.1 },
      'consciousness_field': { semantic: 'layered', multiplier: 1.3 },
      'time_field': { semantic: 'flowing', multiplier: 1.2 },
      'space_field': { semantic: 'analytical', multiplier: 1.0 },
      'relation_field': { semantic: 'networked', multiplier: 1.1 },
      'movement_field': { semantic: 'cyclical', multiplier: 1.2 },
      'being_field': { semantic: 'equilibrium', multiplier: 1.0 },
      
      // Philosophical stance mappings
      'phenomenological': { semantic: 'layered', multiplier: 1.4 },
      'experiential': { semantic: 'layered', multiplier: 1.2 },
      'perceptual': { semantic: 'luminous', multiplier: 1.1 },
      'lived': { semantic: 'flowing', multiplier: 1.0 },
      'reflective': { semantic: 'layered', multiplier: 1.3 },
      'meditative': { semantic: 'equilibrium', multiplier: 1.1 },
      'introspective': { semantic: 'layered', multiplier: 1.2 },
      'dialectical': { semantic: 'dialectical', multiplier: 1.5 },
      'tensional': { semantic: 'dialectical', multiplier: 1.3 },
      'oppositional': { semantic: 'dialectical', multiplier: 1.2 },
      'synthetic': { semantic: 'dialectical', multiplier: 1.1 },
      'poetic': { semantic: 'luminous', multiplier: 1.2 },
      'aesthetic': { semantic: 'luminous', multiplier: 1.1 },
      'lyrical': { semantic: 'flowing', multiplier: 1.1 },
      'metaphorical': { semantic: 'networked', multiplier: 1.0 },
      
      // Resonance amplification mappings
      'resonance': { semantic: 'dialectical', multiplier: 1.3 }
    };
    
    return mappings[concept.word] || null;
  }
  
  // Apply confidence and source diversity bonuses
  applyArchetypeEnhancements(archetype, score, concepts) {
    let enhancedScore = score;
    
    // Confidence bonus - concepts with higher confidence get more weight
    const relevantConcepts = concepts.filter(c => 
      this.getEnhancedArchetypeMapping(c)?.semantic === archetype ||
      this.mapVisualToSemanticArchetype(c.archetype) === archetype
    );
    
    if (relevantConcepts.length > 0) {
      const avgConfidence = relevantConcepts.reduce((sum, c) => sum + (c.confidence || 0.5), 0) / relevantConcepts.length;
      enhancedScore *= (1 + avgConfidence * 0.2);
    }
    
    // Source diversity bonus - concepts from multiple sources get bonus
    const sources = new Set(relevantConcepts.map(c => c.source));
    if (sources.size > 1) {
      const diversityBonus = Math.min(sources.size * 0.1, 0.3);
      enhancedScore *= (1 + diversityBonus);
    }
    
    // Philosophical stance bonus - philosophical concepts get special weight
    const philosophicalConcepts = relevantConcepts.filter(c => c.source === 'philosophical_stance');
    if (philosophicalConcepts.length > 0) {
      enhancedScore *= 1.2;
    }
    
    return enhancedScore;
  }
  
  // Map visual archetype families to semantic archetypes
  mapVisualToSemanticArchetype(visualArchetype) {
    const mapping = {
      'Strata': 'layered',              // Layered, philosophical depth
      'Radiance': 'luminous',           // Harmonic, radiating energy  
      'Flow': 'flowing',                // Time-based, flowing movement
      'Threshold': 'liminal',           // Boundary-crossing, network
      'Constellation': 'networked',     // Star-like, branching connections
      'Spiral': 'cyclical',             // Circular, spiral movement
      'Grid': 'analytical',             // Ordered, systematic
      'Balance': 'equilibrium',         // Balanced, harmonious
      'Collapse': 'entropic',           // Condensed, concentrated
      'Chaos': 'chaotic',               // Complex, unpredictable
      'Interference': 'dialectical'     // Wave-like, interfering patterns
    };
    
    return mapping[visualArchetype] || 'contemplative';
  }
  
  // PRIME DIRECTIVE: Map Multi-Modal archetype to semantic archetype
  mapMultiModalToSemanticArchetype(multiModalArchetype) {
    // Multi-Modal archetypes from AdvancedArchetypeSelector
    const mapping = {
      // Narrative archetypes
      'flowing': 'flowing',
      'temporal': 'flowing',           // Temporal narratives flow through time
      'sequential': 'flowing',         // Sequential narratives have flow
      'unfolding': 'luminous',         // Unfolding narratives radiate discovery
      
      // Philosophical archetypes  
      'dialectical': 'dialectical',
      'contemplative': 'layered',      // Contemplative thought has layers
      'analytical': 'analytical',
      'abstract': 'liminal',           // Abstract thought crosses boundaries
      
      // Historical archetypes
      'layered': 'layered',
      'archival': 'layered',           // Archives have sedimentary layers
      'sedimentary': 'layered',        // Sedimentary history accumulates
      
      // Personal archetypes
      'intimate': 'luminous',          // Intimacy radiates warmth
      'experiential': 'flowing',       // Experience flows
      'emotional': 'dialectical',      // Emotions create interference patterns
      'reflective': 'cyclical',        // Reflection cycles back
      
      // Analytical archetypes
      'systematic': 'analytical',
      'logical': 'analytical',         // Logic creates grids
      'structured': 'analytical',
      'methodical': 'analytical',
      
      // Technical archetypes
      'mechanical': 'analytical',      // Mechanical = grid-like
      'functional': 'analytical',
      'modular': 'networked',          // Modular systems network
      
      // Lyrical archetypes
      'ethereal': 'liminal',           // Ethereal crosses boundaries
      'radiant': 'luminous',
      'transcendent': 'liminal',
      
      // Experimental archetypes
      'liminal': 'liminal',
      'chaotic': 'chaotic',
      'hybrid': 'dialectical',         // Hybrids create interference
      'boundary-crossing': 'liminal',
      'transformative': 'entropic'     // Transformation involves collapse/rebirth
    };
    
    const semanticArchetype = mapping[multiModalArchetype];
    
    if (!semanticArchetype) {
      console.warn(`⚠️ No mapping found for Multi-Modal archetype: ${multiModalArchetype}, defaulting to layered`);
      return 'layered';
    }
    
    return semanticArchetype;
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

// === SHORT CONTENT SEMANTIC AMPLIFIER ===
// Solves the "haiku fingerprinting" problem - making even the briefest texts visually distinct
// "In the beginning was the Word" - every word carries semantic weight

class ShortContentAmplifier {
  constructor() {
    // Thresholds for content length classification
    this.contentLengths = {
      haiku: 100,        // < 100 chars
      fragment: 500,     // < 500 chars  
      observation: 1500, // < 1500 chars
      short: 3000,       // < 3000 chars
      standard: Infinity // >= 3000 chars
    };
    
    // Amplification factors by content type
    this.amplificationFactors = {
      haiku: 10.0,      // Maximum amplification
      fragment: 5.0,    
      observation: 3.0,
      short: 1.5,
      standard: 1.0     // No amplification needed
    };
    
    // Word resonance database - each word has inherent visual properties
    this.wordResonance = new WordResonanceLibrary();
    
    // Micro-variation generators
    this.microVariations = new MicroVariationEngine();
    
    // Contextual enhancers
    this.contextEnhancers = new ContextualEnhancers();
  }
  
  // Main amplification method
  amplifyShortContent(genome, metadata, contentLength) {
    // Classify content length
    const contentType = this.classifyContentLength(contentLength);
    const amplificationFactor = this.amplificationFactors[contentType];
    
    console.log(`🔬 Short content amplification: ${contentType} (${contentLength} chars, ${amplificationFactor}x amplification)`);
    
    // For very short content, we need different strategies
    if (contentType === 'haiku' || contentType === 'fragment') {
      return this.amplifyMicroContent(genome, metadata, amplificationFactor);
    } else if (contentType === 'observation' || contentType === 'short') {
      return this.amplifyBriefContent(genome, metadata, amplificationFactor);
    }
    
    // Standard content doesn't need amplification
    return genome;
  }
  
  // Classify content by length
  classifyContentLength(length) {
    for (const [type, threshold] of Object.entries(this.contentLengths)) {
      if (length < threshold) {
        return type;
      }
    }
    return 'standard';
  }
  
  // Amplify micro content (haiku, very brief fragments)
  amplifyMicroContent(genome, metadata, factor) {
    console.log('🌸 Amplifying micro content with maximum sensitivity');
    
    const amplified = JSON.parse(JSON.stringify(genome)); // Deep clone
    
    // 1. Word-level semantic extraction
    const wordSemantics = this.extractWordLevelSemantics(metadata);
    
    // 2. Apply word resonance amplification
    this.applyWordResonance(amplified, wordSemantics, factor);
    
    // 3. Extract temporal context (date/time can add meaning)
    const temporalContext = this.extractTemporalContext(metadata);
    this.applyTemporalAmplification(amplified, temporalContext, factor);
    
    // 4. Apply title amplification (titles are often the key in short content)
    if (metadata.title) {
      this.amplifyFromTitle(amplified, metadata.title, factor);
    }
    
    // 5. Add micro-variations to ensure uniqueness
    this.microVariations.injectVariations(amplified, factor);
    
    // 6. Amplify all numeric values dramatically
    this.amplifyNumericValues(amplified, factor);
    
    return amplified;
  }
  
  // Amplify brief content (observations, short pieces)
  amplifyBriefContent(genome, metadata, factor) {
    console.log('📝 Amplifying brief content with enhanced sensitivity');
    
    const amplified = JSON.parse(JSON.stringify(genome)); // Deep clone
    
    // 1. Enhance conceptual density detection
    this.enhanceConceptualDensity(amplified, factor);
    
    // 2. Amplify subtle emotional variations
    this.amplifyEmotionalNuance(amplified, factor);
    
    // 3. Extract and amplify structural patterns
    this.amplifyStructuralPatterns(amplified, metadata, factor);
    
    // 4. Apply contextual amplification
    const context = this.contextEnhancers.extractContext(metadata);
    this.applyContextualAmplification(amplified, context, factor);
    
    // 5. Moderate numeric amplification
    this.amplifyNumericValues(amplified, Math.sqrt(factor)); // Less aggressive than micro
    
    return amplified;
  }
  
  // Extract word-level semantics for micro content
  extractWordLevelSemantics(metadata) {
    const semantics = {
      words: [],
      weights: new Map(),
      resonances: new Map()
    };
    
    // Extract from title
    if (metadata.title) {
      const titleWords = this.tokenizeText(metadata.title);
      titleWords.forEach(word => {
        semantics.words.push(word);
        semantics.weights.set(word, 2.0); // Title words have high weight
        semantics.resonances.set(word, this.wordResonance.getResonance(word));
      });
    }
    
    // Extract from content if available
    if (metadata.content) {
      const contentWords = this.tokenizeText(metadata.content);
      const wordFrequency = this.calculateWordFrequency(contentWords);
      
      // For short content, every unique word matters
      wordFrequency.forEach((count, word) => {
        if (!semantics.weights.has(word)) {
          semantics.words.push(word);
          // Weight based on frequency and rarity
          const weight = Math.log(count + 1) * this.wordResonance.getRarity(word);
          semantics.weights.set(word, weight);
          semantics.resonances.set(word, this.wordResonance.getResonance(word));
        }
      });
    }
    
    return semantics;
  }
  
  // Tokenize text into meaningful words
  tokenizeText(text) {
    return text.toLowerCase()
      .split(/\s+/)
      .map(word => word.replace(/[^a-z]/g, ''))
      .filter(word => word.length > 2 && !this.isStopWord(word));
  }
  
  // Calculate word frequency
  calculateWordFrequency(words) {
    const frequency = new Map();
    words.forEach(word => {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    });
    return frequency;
  }
  
  // Apply word resonance to genome
  applyWordResonance(genome, wordSemantics, factor) {
    // Each word contributes to the visual signature
    wordSemantics.resonances.forEach((resonance, word) => {
      const weight = wordSemantics.weights.get(word) || 1;
      
      // Apply resonance to topology
      if (resonance.structural) {
        genome.topology.branchingFactor += resonance.structural.branching * weight * factor * 0.1;
        genome.topology.rhizomaticTendency += resonance.structural.rhizomatic * weight * factor * 0.05;
        genome.topology.circularityIndex += resonance.structural.circular * weight * factor * 0.05;
      }
      
      // Apply resonance to dynamics
      if (resonance.movement) {
        genome.dynamics.velocity += resonance.movement.speed * weight * factor * 0.01;
        if (resonance.movement.pattern) {
          genome.dynamics.patterns = genome.dynamics.patterns || {};
          genome.dynamics.patterns[resonance.movement.pattern] = 
            (genome.dynamics.patterns[resonance.movement.pattern] || 0) + weight * factor * 0.1;
        }
      }
      
      // Apply resonance to emotion
      if (resonance.emotional) {
        genome.resonance.frequencies = genome.resonance.frequencies || {};
        Object.entries(resonance.emotional).forEach(([emotion, value]) => {
          genome.resonance.frequencies[emotion] = 
            (genome.resonance.frequencies[emotion] || 0) + value * weight * factor * 0.05;
        });
      }
      
      // Apply resonance to complexity
      if (resonance.complexity) {
        genome.complexity.recursiveDepth += resonance.complexity.depth * weight * factor * 0.2;
        genome.complexity.abstractionLevel += resonance.complexity.abstraction * weight * factor * 0.05;
      }
    });
  }
  
  // Extract temporal context from metadata
  extractTemporalContext(metadata) {
    const context = {
      season: null,
      timeOfDay: null,
      dayOfWeek: null,
      isHoliday: false,
      moonPhase: null
    };
    
    if (metadata.date) {
      const date = new Date(metadata.date);
      
      // Extract season
      const month = date.getMonth();
      if (month >= 2 && month <= 4) context.season = 'spring';
      else if (month >= 5 && month <= 7) context.season = 'summer';
      else if (month >= 8 && month <= 10) context.season = 'autumn';
      else context.season = 'winter';
      
      // Extract day characteristics
      context.dayOfWeek = date.getDay();
    }
    
    return context;
  }
  
  // Apply temporal amplification
  applyTemporalAmplification(genome, temporalContext, factor) {
    // Seasonal influence
    if (temporalContext.season) {
      const seasonalEffects = {
        spring: { branching: 0.3, velocity: 0.02, emotion: 'wonder' },
        summer: { radiance: 0.4, velocity: 0.03, emotion: 'clarity' },
        autumn: { circularity: 0.3, velocity: -0.01, emotion: 'depth' },
        winter: { crystallization: 0.4, velocity: -0.02, emotion: 'tension' }
      };
      
      const effect = seasonalEffects[temporalContext.season];
      if (effect) {
        if (effect.branching) genome.topology.branchingFactor += effect.branching * factor;
        if (effect.radiance) {
          genome.dynamics.patterns = genome.dynamics.patterns || {};
          genome.dynamics.patterns.radiating = (genome.dynamics.patterns.radiating || 0) + effect.radiance * factor * 0.1;
        }
        if (effect.circularity) genome.topology.circularityIndex += effect.circularity * factor;
        if (effect.crystallization) genome.complexity.selfSimilarity += effect.crystallization * factor * 0.1;
        if (effect.velocity) genome.dynamics.velocity += effect.velocity * factor;
        if (effect.emotion) {
          genome.resonance.frequencies = genome.resonance.frequencies || {};
          genome.resonance.frequencies[effect.emotion] = 
            (genome.resonance.frequencies[effect.emotion] || 0) + 0.2 * factor;
        }
      }
    }
    
    // Day of week influence (subtle but can add variation)
    if (temporalContext.dayOfWeek !== null) {
      const dayInfluence = temporalContext.dayOfWeek / 7; // 0-1 range
      genome.temporality.temporalDensity += dayInfluence * factor * 0.05;
    }
  }
  
  // Amplify based on title analysis
  amplifyFromTitle(genome, title, factor) {
    // Title length affects complexity
    const titleComplexity = Math.log(title.length + 1) / 10;
    genome.complexity.layerCount = Math.max(1, Math.ceil(titleComplexity * factor));
    
    // Punctuation in title suggests structure
    const punctuationCount = (title.match(/[.,!?;:—]/g) || []).length;
    genome.topology.architecturalComplexity += punctuationCount * factor * 0.5;
    
    // Question marks suggest inquiry/tension
    if (title.includes('?')) {
      genome.resonance.frequencies = genome.resonance.frequencies || {};
      genome.resonance.frequencies.tension = 
        (genome.resonance.frequencies.tension || 0) + 0.3 * factor;
      genome.dynamics.patterns = genome.dynamics.patterns || {};
      genome.dynamics.patterns.oscillating = (genome.dynamics.patterns.oscillating || 0) + 0.2 * factor;
    }
    
    // Exclamation suggests energy
    if (title.includes('!')) {
      genome.dynamics.velocity += 0.03 * factor;
      genome.dynamics.patterns = genome.dynamics.patterns || {};
      genome.dynamics.patterns.radiating = (genome.dynamics.patterns.radiating || 0) + 0.2 * factor;
    }
    
    // Capitalization patterns
    const capitalizedWords = (title.match(/[A-Z][a-z]+/g) || []).length;
    if (capitalizedWords > 2) {
      genome.complexity.recursiveDepth += capitalizedWords * factor * 0.1;
    }
  }
  
  // Enhance conceptual density for brief content
  enhanceConceptualDensity(genome, factor) {
    // For short content, each concept carries more weight
    const currentDensity = genome.topology.conceptDensity;
    
    // Apply non-linear amplification - higher density gets more boost
    genome.topology.conceptDensity = currentDensity * (1 + Math.log(factor));
    
    // Concept density affects branching
    genome.topology.branchingFactor += currentDensity * factor * 0.5;
    
    // High concept density in short text suggests compression
    if (currentDensity > 0.5) {
      genome.complexity.nestedComplexity += currentDensity * factor * 0.2;
    }
  }
  
  // Amplify emotional nuance
  amplifyEmotionalNuance(genome, factor) {
    const emotions = genome.resonance.frequencies || {};
    
    // Find subtle emotional undertones
    const emotionalSum = Object.values(emotions).reduce((a, b) => a + b, 0);
    
    if (emotionalSum > 0) {
      // Amplify existing emotions
      Object.keys(emotions).forEach(emotion => {
        emotions[emotion] *= (1 + (factor - 1) * 0.5);
      });
      
      // Add harmonic complexity for multi-emotional states
      const activeEmotions = Object.values(emotions).filter(v => v > 0.01).length;
      if (activeEmotions > 1) {
        genome.resonance.harmonicComplexity *= (1 + (activeEmotions - 1) * factor * 0.1);
      }
    }
  }
  
  // Amplify structural patterns
  amplifyStructuralPatterns(genome, metadata, factor) {
    // Look for structural cues in short content
    if (metadata.content) {
      // Line breaks suggest structure
      const lineBreaks = (metadata.content.match(/\n/g) || []).length;
      if (lineBreaks > 0) {
        genome.complexity.layerCount = Math.max(genome.complexity.layerCount, lineBreaks + 1);
        genome.topology.architecturalComplexity += lineBreaks * factor * 0.2;
      }
      
      // Repetition suggests rhythm
      const words = this.tokenizeText(metadata.content);
      const uniqueWords = new Set(words).size;
      const repetitionRatio = words.length > 0 ? 1 - (uniqueWords / words.length) : 0;
      
      if (repetitionRatio > 0.2) {
        genome.temporality.cyclical = true;
        genome.temporality.rhythmicPattern = genome.temporality.rhythmicPattern || {};
        genome.temporality.rhythmicPattern.rhythmic = true;
        genome.complexity.selfSimilarity += repetitionRatio * factor * 0.3;
      }
    }
  }
  
  // Apply contextual amplification
  applyContextualAmplification(genome, context, factor) {
    // Context from metadata class (essay, observation, fragment)
    if (context.class) {
      const classEffects = {
        'fragment': {
          abstractionLevel: 0.2,
          nestedComplexity: -0.1,
          velocity: 0.01
        },
        'observation': {
          clarity: 0.3,
          temporalDensity: 0.1,
          circularityIndex: 0.2
        },
        'glimpse': {
          abstractionLevel: 0.3,
          velocity: 0.02,
          etherealness: 0.4
        }
      };
      
      const effect = classEffects[context.class];
      if (effect) {
        if (effect.abstractionLevel) {
          genome.complexity.abstractionLevel += effect.abstractionLevel * factor * 0.5;
        }
        if (effect.clarity) {
          genome.resonance.frequencies = genome.resonance.frequencies || {};
          genome.resonance.frequencies.clarity = 
            (genome.resonance.frequencies.clarity || 0) + effect.clarity * factor;
        }
        if (effect.temporalDensity) {
          genome.temporality.temporalDensity += effect.temporalDensity * factor;
        }
      }
    }
  }
  
  // Amplify numeric values in genome
  amplifyNumericValues(genome, factor) {
    const amplify = (obj, path = '') => {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        const fullPath = path ? `${path}.${key}` : key;
        
        if (typeof value === 'number' && !key.includes('generation') && !key.includes('count')) {
          // Different amplification strategies based on the type of value
          if (key.includes('velocity') || key.includes('speed')) {
            obj[key] = value * Math.pow(factor, 0.5); // Moderate amplification
          } else if (key.includes('opacity') || key.includes('alpha')) {
            obj[key] = Math.min(1, value * factor); // Capped amplification
          } else if (key.includes('recursiveDepth') || key.includes('layerCount')) {
            obj[key] = Math.ceil(value * factor); // Integer amplification
          } else {
            obj[key] = value * factor; // Standard amplification
          }
        } else if (typeof value === 'object' && value !== null) {
          amplify(value, fullPath); // Recursive amplification
        }
      });
    };
    
    amplify(genome);
  }
  
  isStopWord(word) {
    const stopWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'this', 'that', 'these', 'those', 'a', 'an'];
    return stopWords.includes(word);
  }
}

// === WORD RESONANCE LIBRARY ===
// Each word has inherent visual properties based on its meaning

class WordResonanceLibrary {
  constructor() {
    // Core word resonances - this would be much larger in production
    this.resonances = {
      // Light/Dark words
      'light': { 
        structural: { branching: 3, rhizomatic: 0.1, circular: 0.3 },
        movement: { speed: 0.8, pattern: 'radiating' },
        emotional: { wonder: 0.7, clarity: 0.8 },
        complexity: { depth: 1, abstraction: 0.3 }
      },
      'shadow': {
        structural: { branching: 1.5, rhizomatic: 0.6, circular: 0.2 },
        movement: { speed: 0.2, pattern: 'flowing' },
        emotional: { depth: 0.8, tension: 0.3 },
        complexity: { depth: 3, abstraction: 0.6 }
      },
      'dark': {
        structural: { branching: 1, rhizomatic: 0.7, circular: 0.1 },
        movement: { speed: 0.1, pattern: 'collapsing' },
        emotional: { depth: 0.9, tension: 0.5 },
        complexity: { depth: 4, abstraction: 0.7 }
      },
      
      // Movement words
      'flow': {
        structural: { branching: 2, rhizomatic: 0.4, circular: 0.5 },
        movement: { speed: 0.6, pattern: 'flowing' },
        emotional: { clarity: 0.5, wonder: 0.3 },
        complexity: { depth: 2, abstraction: 0.4 }
      },
      'spiral': {
        structural: { branching: 1, rhizomatic: 0.2, circular: 0.9 },
        movement: { speed: 0.5, pattern: 'spiraling' },
        emotional: { depth: 0.6, wonder: 0.4 },
        complexity: { depth: 3, abstraction: 0.5 }
      },
      'still': {
        structural: { branching: 0.5, rhizomatic: 0.1, circular: 0.1 },
        movement: { speed: 0.0, pattern: 'static' },
        emotional: { clarity: 0.7, depth: 0.5 },
        complexity: { depth: 1, abstraction: 0.6 }
      },
      
      // Emotional words
      'love': {
        structural: { branching: 2.5, rhizomatic: 0.3, circular: 0.7 },
        movement: { speed: 0.4, pattern: 'radiating' },
        emotional: { wonder: 0.9, clarity: 0.6 },
        complexity: { depth: 2, abstraction: 0.5 }
      },
      'fear': {
        structural: { branching: 3, rhizomatic: 0.8, circular: 0.2 },
        movement: { speed: 0.7, pattern: 'oscillating' },
        emotional: { tension: 0.9, depth: 0.4 },
        complexity: { depth: 2, abstraction: 0.3 }
      },
      'peace': {
        structural: { branching: 1, rhizomatic: 0.1, circular: 0.8 },
        movement: { speed: 0.1, pattern: 'flowing' },
        emotional: { clarity: 0.9, wonder: 0.4 },
        complexity: { depth: 1, abstraction: 0.7 }
      },
      
      // Abstract concepts
      'time': {
        structural: { branching: 2, rhizomatic: 0.3, circular: 0.6 },
        movement: { speed: 0.5, pattern: 'flowing' },
        emotional: { depth: 0.7, tension: 0.3 },
        complexity: { depth: 3, abstraction: 0.8 }
      },
      'memory': {
        structural: { branching: 2.5, rhizomatic: 0.7, circular: 0.4 },
        movement: { speed: 0.3, pattern: 'spiraling' },
        emotional: { depth: 0.8, wonder: 0.3 },
        complexity: { depth: 4, abstraction: 0.7 }
      },
      'dream': {
        structural: { branching: 3, rhizomatic: 0.6, circular: 0.5 },
        movement: { speed: 0.2, pattern: 'flowing' },
        emotional: { wonder: 0.8, depth: 0.6 },
        complexity: { depth: 3, abstraction: 0.9 }
      }
    };
    
    // Word rarity scores (inverse document frequency)
    this.rarityScores = {
      'the': 0.01, 'and': 0.01, 'of': 0.01, // Common words
      'light': 0.3, 'shadow': 0.5, 'flow': 0.4, // Medium frequency
      'spiral': 0.7, 'dream': 0.6, 'memory': 0.5, // Less common
      'ephemeral': 0.9, 'liminal': 0.95, 'rhizomatic': 0.99 // Rare words
    };
  }
  
  // Get resonance for a word
  getResonance(word) {
    // Direct match
    if (this.resonances[word]) {
      return this.resonances[word];
    }
    
    // Check for partial matches (e.g., "flowing" matches "flow")
    for (const [key, resonance] of Object.entries(this.resonances)) {
      if (word.includes(key) || key.includes(word)) {
        return resonance;
      }
    }
    
    // Generate default resonance based on word characteristics
    return this.generateDefaultResonance(word);
  }
  
  // Get rarity score for a word
  getRarity(word) {
    if (this.rarityScores[word] !== undefined) {
      return this.rarityScores[word];
    }
    
    // Estimate rarity based on word length and complexity
    const lengthFactor = Math.min(word.length / 10, 1);
    const complexityFactor = (word.match(/[aeiou]/g) || []).length / word.length;
    
    return lengthFactor * (1 - complexityFactor);
  }
  
  // Generate default resonance for unknown words
  generateDefaultResonance(word) {
    const length = word.length;
    const vowelCount = (word.match(/[aeiou]/g) || []).length;
    const consonantClusters = (word.match(/[bcdfghjklmnpqrstvwxyz]{2,}/g) || []).length;
    
    return {
      structural: {
        branching: 1 + length * 0.1,
        rhizomatic: consonantClusters * 0.2,
        circular: vowelCount / length
      },
      movement: {
        speed: 0.3 + (vowelCount / length) * 0.4,
        pattern: consonantClusters > 1 ? 'oscillating' : 'flowing'
      },
      emotional: {
        wonder: vowelCount / length * 0.5,
        tension: consonantClusters * 0.3,
        clarity: 0.5 - consonantClusters * 0.1,
        depth: length * 0.1
      },
      complexity: {
        depth: 1 + length * 0.2,
        abstraction: 0.3 + consonantClusters * 0.1
      }
    };
  }
}

// === MICRO VARIATION ENGINE ===
// Ensures even identical texts get unique visual signatures

class MicroVariationEngine {
  constructor() {
    this.variationSeed = Date.now();
  }
  
  // Inject micro-variations to ensure uniqueness
  injectVariations(genome, factor) {
    // Use content hash as additional seed
    const contentHash = this.hashGenome(genome);
    const seed = this.variationSeed + contentHash;
    
    // Deterministic pseudo-random based on content
    const random = this.seededRandom(seed);
    
    // Apply micro-variations to all numeric values
    this.applyMicroVariations(genome, random, factor);
    
    // Add unique noise signature
    genome.uniqueNoise = {
      seed: seed,
      frequency: random() * 0.1 * factor,
      amplitude: random() * 0.05 * factor,
      octaves: Math.ceil(random() * 3 * Math.sqrt(factor))
    };
    
    // Add unique phase offset
    genome.phaseOffset = random() * Math.PI * 2;
    
    // Add unique color variation
    if (genome.resonance?.frequencies) {
      const emotionShift = (random() - 0.5) * 0.1 * factor;
      Object.keys(genome.resonance.frequencies).forEach(emotion => {
        genome.resonance.frequencies[emotion] = Math.max(0, 
          genome.resonance.frequencies[emotion] + emotionShift * random()
        );
      });
    }
  }
  
  // Apply micro-variations throughout genome
  applyMicroVariations(obj, random, factor, path = '') {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      
      if (typeof value === 'number' && !key.includes('generation')) {
        // Apply small random variation
        const variation = (random() - 0.5) * 0.1 * Math.sqrt(factor);
        obj[key] = value * (1 + variation);
      } else if (typeof value === 'object' && value !== null) {
        this.applyMicroVariations(value, random, factor, path + '.' + key);
      }
    });
  }
  
  // Hash genome to create deterministic seed
  hashGenome(genome) {
    const str = JSON.stringify(genome);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
  
  // Seeded random number generator
  seededRandom(seed) {
    let s = seed;
    return function() {
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };
  }
}

// === CONTEXTUAL ENHANCERS ===
// Extract additional context to differentiate short content

class ContextualEnhancers {
  // Extract all available context from metadata
  extractContext(metadata) {
    const context = {
      class: metadata.class || null,
      themes: metadata.themes || [],
      mood: metadata.mood || null,
      movement: metadata.movement || null,
      url: metadata.url || null,
      adjacentContent: metadata.adjacentContent || null
    };
    
    // Extract additional context from URL if available
    if (context.url) {
      context.urlContext = this.extractUrlContext(context.url);
    }
    
    // Infer context from class
    if (context.class) {
      context.classContext = this.getClassContext(context.class);
    }
    
    return context;
  }
  
  // Extract context from URL structure
  extractUrlContext(url) {
    const context = {};
    
    // Extract year/date from URL
    const yearMatch = url.match(/\/(\d{4})\//);
    if (yearMatch) {
      context.year = parseInt(yearMatch[1]);
    }
    
    // Extract category/section
    const segments = url.split('/').filter(s => s.length > 0);
    if (segments.length > 0) {
      context.section = segments[0];
    }
    
    return context;
  }
  
  // Get context implications from post class
  getClassContext(postClass) {
    const contexts = {
      'fragment': {
        expectedLength: 'micro',
        style: 'compressed',
        depth: 'surface-with-implications'
      },
      'observation': {
        expectedLength: 'brief',
        style: 'notational',
        depth: 'focused-insight'
      },
      'glimpse': {
        expectedLength: 'brief',
        style: 'impressionistic',
        depth: 'ephemeral-capture'
      },
      'essay': {
        expectedLength: 'extended',
        style: 'exploratory',
        depth: 'fully-developed'
      }
    };
    
    return contexts[postClass] || null;
  }
}

// === ENHANCED GENOME→CONCEPTS BRIDGE ===
// Sophisticated pattern recognition for concept extraction from genome data

class GenomeConceptExtractor {
  constructor() {
    // Define conceptual archetypes with their characteristic patterns
    this.conceptualArchetypes = {
      'contemplative': {
        markers: ['depth', 'reflection', 'silence', 'interior', 'quiet'],
        genomeSignature: {
          complexity: { recursiveDepth: [2, 5] },
          resonance: { harmonicComplexity: [0.3, 0.7] },
          temporality: { rhythmicComplexity: [0.2, 0.5] }
        },
        visualArchetype: 'Strata'
      },
      
      'dynamic': {
        markers: ['movement', 'flow', 'rhythm', 'pulse', 'energy'],
        genomeSignature: {
          dynamics: { velocity: [0.3, 0.8] },
          temporality: { rhythmicComplexity: [0.5, 0.9] }
        },
        visualArchetype: 'Flow'
      },
      
      'interconnected': {
        markers: ['network', 'connection', 'thread', 'weaving', 'bridge'],
        genomeSignature: {
          topology: { rhizomaticTendency: [0.4, 0.9] },
          complexity: { networkDensity: [0.5, 0.8] }
        },
        visualArchetype: 'Threshold'
      },
      
      'radiant': {
        markers: ['light', 'brightness', 'illumination', 'glow', 'clarity'],
        genomeSignature: {
          resonance: { harmonicComplexity: [0.6, 0.9] },
          dynamics: { patterns: { radiating: [0.3, 0.8] } }
        },
        visualArchetype: 'Radiance'
      },
      
      'spiral': {
        markers: ['spiral', 'circular', 'cycle', 'turning', 'revolution'],
        genomeSignature: {
          topology: { circularityIndex: [0.5, 0.9] },
          dynamics: { patterns: { spiraling: [0.4, 0.8] } }
        },
        visualArchetype: 'Spiral'
      },
      
      'branching': {
        markers: ['branch', 'tree', 'fractal', 'division', 'growth'],
        genomeSignature: {
          topology: { branchingFactor: [2, 5] },
          complexity: { recursiveDepth: [2, 4] }
        },
        visualArchetype: 'Constellation'
      }
    };
    
    // Sophisticated concept patterns for emergent detection
    this.emergentPatterns = {
      'philosophical_stance': {
        pattern: /\b(being|existence|consciousness|reality|truth|meaning)\b/gi,
        weight: 0.8,
        category: 'ontological'
      },
      
      'temporal_awareness': {
        pattern: /\b(time|moment|duration|passage|eternal|fleeting)\b/gi,
        weight: 0.7,
        category: 'temporal'
      },
      
      'perceptual_focus': {
        pattern: /\b(see|seeing|sight|vision|perspective|gaze|look)\b/gi,
        weight: 0.6,
        category: 'perceptual'
      },
      
      'emotional_resonance': {
        pattern: /\b(feel|feeling|emotion|heart|soul|spirit)\b/gi,
        weight: 0.5,
        category: 'emotional'
      },
      
      'spatial_orientation': {
        pattern: /\b(space|place|location|position|distance|proximity)\b/gi,
        weight: 0.4,
        category: 'spatial'
      }
    };
    
    // Semantic field organization for coherent concept clusters
    this.semanticFields = {
      'nature': ['light', 'shadow', 'tree', 'earth', 'sky', 'water', 'wind', 'season'],
      'consciousness': ['mind', 'thought', 'awareness', 'perception', 'understanding'],
      'time': ['moment', 'duration', 'memory', 'future', 'past', 'present'],
      'space': ['place', 'location', 'distance', 'proximity', 'boundary'],
      'relation': ['connection', 'bridge', 'thread', 'network', 'bond'],
      'movement': ['flow', 'rhythm', 'dance', 'spiral', 'pulse', 'vibration'],
      'being': ['existence', 'presence', 'absence', 'void', 'fullness']
    };
  }
  
  // Main extraction method with sophisticated pattern recognition
  extractConceptsFromGenome(genome) {
    const concepts = [];
    
    // 0. Apply extended semantic analysis (Pass 2 enhancement)
    if (genome.sourceText && typeof window !== 'undefined' && window.computeExtendedFeatures) {
      const extendedFeatures = window.computeExtendedFeatures(genome.sourceText);
      this.integrateExtendedFeatures(concepts, extendedFeatures);
    }
    
    // 1. Extract concepts from direct genome analysis
    const genomeConcepts = this.extractFromGenomeStructure(genome);
    concepts.push(...genomeConcepts);
    
    // 2. Detect emergent conceptual patterns
    const emergentConcepts = this.detectEmergentConcepts(genome);
    concepts.push(...emergentConcepts);
    
    // 3. Identify semantic field organization
    const fieldConcepts = this.organizeSemanticFields(concepts);
    concepts.push(...fieldConcepts);
    
    // 4. Apply resonance amplification
    const amplifiedConcepts = this.amplifyResonance(concepts, genome);
    
    // 5. Detect philosophical stance
    const stanceConcepts = this.detectPhilosophicalStance(genome);
    amplifiedConcepts.push(...stanceConcepts);
    
    // 6. Ensure conceptual diversity
    const diverseConcepts = this.enforceConceptualDiversity(amplifiedConcepts);
    
    return diverseConcepts;
  }
  
  // Extract concepts from direct genome structure analysis
  extractFromGenomeStructure(genome) {
    const concepts = [];
    
    // Analyze each conceptual archetype against genome signature
    for (const [archetype, config] of Object.entries(this.conceptualArchetypes)) {
      const match = this.matchGenomeSignature(genome, config.genomeSignature);
      
      if (match.score > 0.3) {
        // Add primary archetype concept
        concepts.push({
          word: archetype,
          source: 'genome_structure',
          weight: match.score,
          archetype: config.visualArchetype,
          confidence: match.confidence
        });
        
        // Add related marker concepts
        config.markers.forEach(marker => {
          concepts.push({
            word: marker,
            source: 'archetype_marker',
            weight: match.score * 0.7,
            archetype: config.visualArchetype,
            confidence: match.confidence * 0.8
          });
        });
      }
    }
    
    return concepts;
  }
  
  // Detect emergent conceptual patterns
  detectEmergentConcepts(genome) {
    const concepts = [];
    
    // Extract text content from genome if available
    const textContent = this.extractTextFromGenome(genome);
    
    if (textContent) {
      for (const [patternName, config] of Object.entries(this.emergentPatterns)) {
        const matches = textContent.match(config.pattern);
        
        if (matches && matches.length > 0) {
          const density = matches.length / textContent.length * 1000; // Per 1000 chars
          
          concepts.push({
            word: patternName,
            source: 'emergent_pattern',
            weight: config.weight * Math.min(density, 1),
            archetype: this.patternToArchetype(config.category),
            confidence: 0.7,
            matches: matches.length
          });
        }
      }
    }
    
    return concepts;
  }
  
  // Organize concepts into semantic fields
  organizeSemanticFields(concepts) {
    const fieldConcepts = [];
    
    // Group concepts by semantic field
    const fieldGroups = {};
    
    concepts.forEach(concept => {
      for (const [field, keywords] of Object.entries(this.semanticFields)) {
        if (keywords.includes(concept.word.toLowerCase())) {
          if (!fieldGroups[field]) fieldGroups[field] = [];
          fieldGroups[field].push(concept);
        }
      }
    });
    
    // Create field-level concepts for coherent clusters
    for (const [field, groupConcepts] of Object.entries(fieldGroups)) {
      if (groupConcepts.length >= 2) {
        const avgWeight = groupConcepts.reduce((sum, c) => sum + c.weight, 0) / groupConcepts.length;
        
        fieldConcepts.push({
          word: `${field}_field`,
          source: 'semantic_field',
          weight: avgWeight * 1.2,
          archetype: this.fieldToArchetype(field),
          confidence: 0.8,
          memberCount: groupConcepts.length
        });
      }
    }
    
    return fieldConcepts;
  }
  
  // Amplify resonance between related concepts
  amplifyResonance(concepts, genome) {
    const amplified = [...concepts];
    
    // Find resonant concept pairs
    for (let i = 0; i < concepts.length; i++) {
      for (let j = i + 1; j < concepts.length; j++) {
        const resonance = this.calculateConceptResonance(concepts[i], concepts[j]);
        
        if (resonance > 0.6) {
          // Amplify both concepts
          amplified[i].weight *= (1 + resonance * 0.3);
          amplified[j].weight *= (1 + resonance * 0.3);
          
          // Create resonance concept
          amplified.push({
            word: `${concepts[i].word}_${concepts[j].word}_resonance`,
            source: 'resonance_amplification',
            weight: resonance * 0.5,
            archetype: 'Interference',
            confidence: 0.6
          });
        }
      }
    }
    
    return amplified;
  }
  
  // Detect philosophical stance from genome patterns
  detectPhilosophicalStance(genome) {
    const concepts = [];
    
    // Analyze philosophical characteristics
    const stances = {
      'phenomenological': {
        indicators: ['experiential', 'perceptual', 'lived'],
        genomePattern: g => g.resonance?.experientialDepth > 0.5
      },
      'contemplative': {
        indicators: ['reflective', 'meditative', 'introspective'],
        genomePattern: g => g.complexity?.recursiveDepth > 2
      },
      'dialectical': {
        indicators: ['tensional', 'oppositional', 'synthetic'],
        genomePattern: g => g.dynamics?.patterns?.oscillating > 0.4
      },
      'poetic': {
        indicators: ['aesthetic', 'lyrical', 'metaphorical'],
        genomePattern: g => g.resonance?.harmonicComplexity > 0.6
      }
    };
    
    for (const [stance, config] of Object.entries(stances)) {
      if (config.genomePattern(genome)) {
        concepts.push({
          word: stance,
          source: 'philosophical_stance',
          weight: 0.8,
          archetype: 'Threshold',
          confidence: 0.7
        });
        
        // Add related indicators
        config.indicators.forEach(indicator => {
          concepts.push({
            word: indicator,
            source: 'stance_indicator',
            weight: 0.6,
            archetype: 'Threshold',
            confidence: 0.6
          });
        });
      }
    }
    
    return concepts;
  }
  
  // Enforce conceptual diversity to prevent over-clustering
  enforceConceptualDiversity(concepts) {
    // Sort by weight descending
    const sorted = [...concepts].sort((a, b) => b.weight - a.weight);
    
    // Select diverse concepts, avoiding over-representation
    const diverse = [];
    const archetypeCounts = {};
    const sourceCounts = {};
    
    for (const concept of sorted) {
      const archetypeCount = archetypeCounts[concept.archetype] || 0;
      const sourceCount = sourceCounts[concept.source] || 0;
      
      // Limit concepts per archetype and source
      if (archetypeCount < 3 && sourceCount < 4) {
        diverse.push(concept);
        archetypeCounts[concept.archetype] = archetypeCount + 1;
        sourceCounts[concept.source] = sourceCount + 1;
      }
      
      // Stop at reasonable concept count
      if (diverse.length >= 12) break;
    }
    
    return diverse;
  }
  
  // Helper methods
  matchGenomeSignature(genome, signature) {
    let totalScore = 0;
    let matchCount = 0;
    
    for (const [property, ranges] of Object.entries(signature)) {
      const value = this.getNestedProperty(genome, property);
      
      if (value !== undefined) {
        for (const [subProp, range] of Object.entries(ranges)) {
          const subValue = typeof value === 'object' ? value[subProp] : value;
          
          if (subValue !== undefined && this.isInRange(subValue, range)) {
            totalScore += 1;
            matchCount++;
          }
        }
      }
    }
    
    return {
      score: matchCount > 0 ? totalScore / matchCount : 0,
      confidence: matchCount / Object.keys(signature).length
    };
  }
  
  getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
  
  isInRange(value, range) {
    return Array.isArray(range) ? value >= range[0] && value <= range[1] : value === range;
  }
  
  extractTextFromGenome(genome) {
    // Try to extract text content from various genome properties
    const text = genome.textContent || genome.content || genome.raw || '';
    console.log(`🔍 GenomeConceptExtractor: Extracted text length: ${text.length}, preview: "${text.substring(0, 100)}..."`);
    return text;
  }
  
  patternToArchetype(category) {
    const mapping = {
      'ontological': 'Strata',
      'temporal': 'Flow',
      'perceptual': 'Radiance',
      'emotional': 'Resonance',
      'spatial': 'Grid'
    };
    return mapping[category] || 'Threshold';
  }
  
  fieldToArchetype(field) {
    const mapping = {
      'nature': 'Radiance',
      'consciousness': 'Strata',
      'time': 'Flow',
      'space': 'Grid',
      'relation': 'Threshold',
      'movement': 'Spiral',
      'being': 'Balance'
    };
    return mapping[field] || 'Constellation';
  }
  
  calculateConceptResonance(concept1, concept2) {
    // Calculate semantic resonance between concepts
    let resonance = 0;
    
    // Same archetype increases resonance
    if (concept1.archetype === concept2.archetype) {
      resonance += 0.3;
    }
    
    // Same source increases resonance
    if (concept1.source === concept2.source) {
      resonance += 0.2;
    }
    
    // Similar weights increase resonance
    const weightDiff = Math.abs(concept1.weight - concept2.weight);
    resonance += Math.max(0, 0.5 - weightDiff);
    
    return Math.min(resonance, 1.0);
  }
  
  // PASS 2: Integrate extended semantic features from document structure
  integrateExtendedFeatures(concepts, extendedFeatures) {
    // High structural complexity → analytical flavor
    if (extendedFeatures.headers > 2 || extendedFeatures.lists > 3 || extendedFeatures.table) {
      concepts.push({
        word: 'analytical-structure',
        weight: 0.8,
        confidence: 0.9,
        visualHint: 'grid-pattern',
        extendedType: 'structural'
      });
    }
    
    // High quote/question density → contemplative/lyrical flavor  
    if (extendedFeatures.quoteRatio > 0.02 || extendedFeatures.qMarkRatio > 0.01 || extendedFeatures.longSentences > 3) {
      concepts.push({
        word: 'contemplative-depth',
        weight: 0.7,
        confidence: 0.8,
        visualHint: 'flowing-current',
        extendedType: 'contemplative'
      });
    }
    
    // High proper nouns + quotes → argumentative (boost Interference)
    if (extendedFeatures.properNouns > 10 && extendedFeatures.quoteRatio > 0.015) {
      concepts.push({
        word: 'argumentative-discourse',
        weight: 0.9,
        confidence: 0.85,
        visualHint: 'interference-pattern',
        extendedType: 'argumentative'
      });
    }
    
    console.log('📊 Extended semantic features integrated:', extendedFeatures);
  }
}

// === PRIME DIRECTIVE: MULTI-MODAL CONTENT ANALYSIS ENGINE ===
// Root cause fix: Recognize true content diversity instead of homogenization

class MultiModalContentAnalysisEngine {
  constructor() {
    this.contentTypeDetectors = {
      narrative: new NarrativeDetector(),
      philosophical: new PhilosophicalDetector(),
      analytical: new AnalyticalDetector(),
      personal: new PersonalDetector(),
      historical: new HistoricalDetector(),
      technical: new TechnicalDetector(),
      lyrical: new LyricalDetector(),
      experimental: new ExperimentalDetector()
    };
    
    console.log('🎯 Multi-Modal Content Analysis Engine initialized');
  }
  
  analyzeContent(postContent, metadata) {
    console.log('🔍 Analyzing content for type detection...');
    
    // Multi-detector content analysis
    const detectionResults = {};
    const contentSignatures = {};
    
    Object.entries(this.contentTypeDetectors).forEach(([type, detector]) => {
      const result = detector.analyze(postContent, metadata);
      detectionResults[type] = result.confidence;
      contentSignatures[type] = result.signature;
    });
    
    // Find dominant content type
    const dominantType = Object.entries(detectionResults)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    // Find secondary type
    const secondaryType = Object.entries(detectionResults)
      .filter(([type]) => type !== dominantType)
      .sort(([,a], [,b]) => b - a)[0]?.[0];
    
    console.log('📊 Content type detection results:', detectionResults);
    console.log('🎯 Dominant type:', dominantType, 'Secondary:', secondaryType);
    
    return {
      contentType: dominantType,
      secondaryType: secondaryType,
      confidence: detectionResults[dominantType],
      allScores: detectionResults,
      signatures: contentSignatures[dominantType],
      textLength: postContent.length,
      uniqueFingerprint: this.createUniqueFingerprint(postContent, metadata)
    };
  }
  
  createUniqueFingerprint(postContent, metadata) {
    // Create a unique fingerprint for this specific content
    const components = [
      metadata.title || '',
      postContent.substring(0, 100),
      postContent.length.toString(),
      (postContent.match(/[.!?]/g) || []).length.toString(),
      (postContent.match(/\b\w+\b/g) || []).length.toString()
    ];
    
    return this.simpleHash(components.join('|'));
  }
  
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}

// Base detector class for content type detection
class ContentTypeDetector {
  analyze(postContent, metadata) {
    const signals = this.getSignals(postContent, metadata);
    const confidence = this.calculateConfidence(signals);
    const signature = this.extractSignature(signals);
    
    return { confidence, signature, signals };
  }
  
  getSignals(postContent, metadata) {
    // Override in subclasses
    return {};
  }
  
  calculateConfidence(signals) {
    // Override in subclasses
    return 0;
  }
  
  extractSignature(signals) {
    // Override in subclasses
    return {};
  }
}

// Narrative content detector
class NarrativeDetector extends ContentTypeDetector {
  getSignals(postContent, metadata) {
    const title = metadata.title || '';
    const text = postContent.toLowerCase();
    
    return {
      // Narrative markers
      timeMarkers: (text.match(/\b(then|next|later|meanwhile|after|before|when|once|suddenly)\b/g) || []).length,
      pastTense: (text.match(/\b\w+ed\b/g) || []).length,
      characterMarkers: (text.match(/\b(he|she|they|him|her|them)\b/g) || []).length,
      dialogueMarkers: (text.match(/["""]/g) || []).length,
      
      // Discovery/research narrative markers
      discoveryWords: (text.match(/\b(discovered|found|revealed|uncovered|explored|investigation|research|study)\b/g) || []).length,
      historicalMarkers: (text.match(/\b(century|year|period|era|ancient|medieval|modern|historical)\b/g) || []).length,
      
      // Story structure indicators
      sequentialFlow: this.detectSequentialFlow(text),
      characterDevelopment: this.detectCharacterDevelopment(text),
      
      // Title indicators
      titleNarrative: /\b(discovery|story|tale|journey|adventure|chronicle|account)\b/i.test(title)
    };
  }
  
  calculateConfidence(signals) {
    let confidence = 0;
    
    // Time-based narrative flow
    confidence += Math.min(signals.timeMarkers * 0.1, 0.3);
    confidence += Math.min(signals.pastTense * 0.001, 0.2);
    confidence += Math.min(signals.characterMarkers * 0.005, 0.2);
    confidence += Math.min(signals.dialogueMarkers * 0.05, 0.2);
    
    // Discovery/research narrative boost
    confidence += Math.min(signals.discoveryWords * 0.15, 0.4);
    confidence += Math.min(signals.historicalMarkers * 0.08, 0.3);
    
    // Structural indicators
    confidence += signals.sequentialFlow * 0.3;
    confidence += signals.characterDevelopment * 0.2;
    
    // Title boost
    if (signals.titleNarrative) confidence += 0.3;
    
    return Math.min(confidence, 1.0);
  }
  
  detectSequentialFlow(text) {
    // Detect sequential narrative structure
    const paragraphs = text.split('\n\n');
    let sequentialScore = 0;
    
    for (let i = 0; i < paragraphs.length - 1; i++) {
      const current = paragraphs[i];
      const next = paragraphs[i + 1];
      
      if (this.hasTemporalConnection(current, next)) {
        sequentialScore += 0.1;
      }
    }
    
    return Math.min(sequentialScore, 1.0);
  }
  
  hasTemporalConnection(para1, para2) {
    const temporalWords = /\b(then|next|later|meanwhile|after|subsequently|following|eventually)\b/i;
    return temporalWords.test(para2.substring(0, 100));
  }
  
  detectCharacterDevelopment(text) {
    // Simple character development detection
    const pronouns = text.match(/\b(he|she|they|him|her|them)\b/g) || [];
    const names = text.match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g) || [];
    
    return Math.min((pronouns.length + names.length * 5) / 1000, 1.0);
  }
  
  extractSignature(signals) {
    return {
      narrativeFlow: signals.sequentialFlow,
      temporalDensity: signals.timeMarkers / 100,
      characterFocus: signals.characterDevelopment,
      discoveryOriented: signals.discoveryWords > 5,
      historicalContext: signals.historicalMarkers > 3
    };
  }
}

// Philosophical content detector
class PhilosophicalDetector extends ContentTypeDetector {
  getSignals(postContent, metadata) {
    const title = metadata.title || '';
    const text = postContent.toLowerCase();
    
    return {
      // Philosophical vocabulary
      abstractConcepts: (text.match(/\b(being|existence|reality|truth|knowledge|consciousness|meaning|purpose|ethics|morality|freedom|justice|beauty|good|evil)\b/g) || []).length,
      philosophicalTerms: (text.match(/\b(ontology|epistemology|phenomenology|dialectical|metaphysical|ethical|moral|philosophical|existential|transcendental)\b/g) || []).length,
      
      // Argumentative structure
      argumentMarkers: (text.match(/\b(therefore|thus|hence|consequently|however|nevertheless|furthermore|moreover|indeed|certainly)\b/g) || []).length,
      questionsAsked: (text.match(/\?/g) || []).length,
      
      // Contemplative indicators
      contemplativeWords: (text.match(/\b(consider|contemplate|reflect|ponder|meditate|think|wonder|examine|explore|understand)\b/g) || []).length,
      
      // References to thinkers
      thinkerReferences: (text.match(/\b(plato|aristotle|kant|hegel|nietzsche|heidegger|wittgenstein|sartre|foucault|derrida)\b/g) || []).length,
      
      // Title indicators
      titlePhilosophical: /\b(ethics|philosophy|being|existence|truth|meaning|reality|consciousness|moral|ethical)\b/i.test(title)
    };
  }
  
  calculateConfidence(signals) {
    let confidence = 0;
    
    // Philosophical vocabulary
    confidence += Math.min(signals.abstractConcepts * 0.02, 0.4);
    confidence += Math.min(signals.philosophicalTerms * 0.1, 0.3);
    confidence += Math.min(signals.contemplativeWords * 0.05, 0.3);
    
    // Argumentative structure
    confidence += Math.min(signals.argumentMarkers * 0.03, 0.3);
    confidence += Math.min(signals.questionsAsked * 0.02, 0.2);
    
    // Authority references
    confidence += Math.min(signals.thinkerReferences * 0.15, 0.3);
    
    // Title boost
    if (signals.titlePhilosophical) confidence += 0.4;
    
    return Math.min(confidence, 1.0);
  }
  
  extractSignature(signals) {
    return {
      abstractionLevel: signals.abstractConcepts / 50,
      argumentativeStructure: signals.argumentMarkers / 20,
      contemplativeDepth: signals.contemplativeWords / 30,
      authorityBased: signals.thinkerReferences > 0,
      questionDriven: signals.questionsAsked > 5
    };
  }
}

// Analytical content detector
class AnalyticalDetector extends ContentTypeDetector {
  getSignals(postContent, metadata) {
    const title = metadata.title || '';
    const text = postContent.toLowerCase();
    
    return {
      // Analytical vocabulary
      analyticalTerms: (text.match(/\b(analysis|examine|investigate|study|research|method|approach|framework|model|theory|hypothesis|data|evidence|result|conclusion)\b/g) || []).length,
      systematicLanguage: (text.match(/\b(first|second|third|initially|subsequently|finally|step|phase|stage|process|procedure|systematic)\b/g) || []).length,
      
      // Structural indicators
      numberedSections: (text.match(/\b\d+\./g) || []).length,
      bulletPoints: (text.match(/[•\-\*]/g) || []).length,
      
      // Objective tone
      objectiveLanguage: (text.match(/\b(objective|subjective|empirical|theoretical|practical|logical|rational|systematic|comprehensive)\b/g) || []).length,
      
      // Title indicators
      titleAnalytical: /\b(analysis|study|research|investigation|examination|approach|method|framework|model)\b/i.test(title)
    };
  }
  
  calculateConfidence(signals) {
    let confidence = 0;
    
    confidence += Math.min(signals.analyticalTerms * 0.05, 0.4);
    confidence += Math.min(signals.systematicLanguage * 0.03, 0.3);
    confidence += Math.min(signals.numberedSections * 0.1, 0.2);
    confidence += Math.min(signals.bulletPoints * 0.02, 0.2);
    confidence += Math.min(signals.objectiveLanguage * 0.04, 0.3);
    
    if (signals.titleAnalytical) confidence += 0.3;
    
    return Math.min(confidence, 1.0);
  }
  
  extractSignature(signals) {
    return {
      systematicApproach: signals.systematicLanguage / 20,
      structuralOrganization: (signals.numberedSections + signals.bulletPoints) / 10,
      objectiveTone: signals.objectiveLanguage / 15,
      methodological: signals.analyticalTerms > 10
    };
  }
}

// Personal content detector
class PersonalDetector extends ContentTypeDetector {
  getSignals(postContent, metadata) {
    const title = metadata.title || '';
    const text = postContent.toLowerCase();
    
    return {
      // Personal pronouns
      firstPerson: (text.match(/\b(i|me|my|mine|myself)\b/g) || []).length,
      personalExperience: (text.match(/\b(felt|experienced|realized|understood|learned|discovered|remembered|forgot|hoped|feared|loved|hated)\b/g) || []).length,
      
      // Emotional language
      emotionalWords: (text.match(/\b(happy|sad|angry|frustrated|excited|disappointed|confused|surprised|worried|relieved|grateful|proud)\b/g) || []).length,
      
      // Informal tone
      conversationalMarkers: (text.match(/\b(well|so|anyway|actually|really|just|maybe|perhaps|probably|definitely)\b/g) || []).length,
      
      // Title indicators
      titlePersonal: /\b(my|personal|reflection|thoughts|experience|journey|diary|memoir)\b/i.test(title)
    };
  }
  
  calculateConfidence(signals) {
    let confidence = 0;
    
    confidence += Math.min(signals.firstPerson * 0.01, 0.4);
    confidence += Math.min(signals.personalExperience * 0.03, 0.3);
    confidence += Math.min(signals.emotionalWords * 0.05, 0.3);
    confidence += Math.min(signals.conversationalMarkers * 0.02, 0.2);
    
    if (signals.titlePersonal) confidence += 0.4;
    
    return Math.min(confidence, 1.0);
  }
  
  extractSignature(signals) {
    return {
      personalIntimacy: signals.firstPerson / 100,
      emotionalResonance: signals.emotionalWords / 20,
      experientialDepth: signals.personalExperience / 30,
      conversationalTone: signals.conversationalMarkers / 50
    };
  }
}

// Historical content detector
class HistoricalDetector extends ContentTypeDetector {
  getSignals(postContent, metadata) {
    const title = metadata.title || '';
    const text = postContent.toLowerCase();
    
    return {
      // Historical markers
      timeReferences: (text.match(/\b(\d{4}|\d{1,2}th century|ancient|medieval|renaissance|modern|contemporary|era|period|age|dynasty)\b/g) || []).length,
      historicalFigures: (text.match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g) || []).length,
      
      // Research language
      researchTerms: (text.match(/\b(discovered|found|evidence|source|document|record|archive|manuscript|artifact|excavation|research|study|investigation)\b/g) || []).length,
      
      // Past tense narrative
      pastTense: (text.match(/\b\w+ed\b/g) || []).length,
      
      // Title indicators
      titleHistorical: /\b(history|historical|discovery|ancient|medieval|century|era|period|chronicle|archive)\b/i.test(title)
    };
  }
  
  calculateConfidence(signals) {
    let confidence = 0;
    
    confidence += Math.min(signals.timeReferences * 0.1, 0.4);
    confidence += Math.min(signals.historicalFigures * 0.02, 0.3);
    confidence += Math.min(signals.researchTerms * 0.05, 0.3);
    confidence += Math.min(signals.pastTense * 0.001, 0.2);
    
    if (signals.titleHistorical) confidence += 0.4;
    
    return Math.min(confidence, 1.0);
  }
  
  extractSignature(signals) {
    return {
      temporalScope: signals.timeReferences / 10,
      researchOriented: signals.researchTerms / 20,
      figureOriented: signals.historicalFigures / 50,
      archivalDepth: signals.researchTerms > 10
    };
  }
}

// Stub classes for other detectors
class TechnicalDetector extends ContentTypeDetector {
  getSignals(postContent, metadata) {
    const text = postContent.toLowerCase();
    return {
      technicalTerms: (text.match(/\b(algorithm|function|method|process|system|implementation|framework|architecture|design|code|technical|engineering)\b/g) || []).length
    };
  }
  
  calculateConfidence(signals) {
    return Math.min(signals.technicalTerms * 0.05, 0.8);
  }
  
  extractSignature(signals) {
    return { technicalDepth: signals.technicalTerms / 20 };
  }
}

class LyricalDetector extends ContentTypeDetector {
  getSignals(postContent, metadata) {
    const text = postContent.toLowerCase();
    return {
      poeticLanguage: (text.match(/\b(beautiful|sublime|ethereal|transcendent|luminous|radiant|gentle|flowing|whispered|echoed)\b/g) || []).length
    };
  }
  
  calculateConfidence(signals) {
    return Math.min(signals.poeticLanguage * 0.08, 0.6);
  }
  
  extractSignature(signals) {
    return { lyricalIntensity: signals.poeticLanguage / 15 };
  }
}

class ExperimentalDetector extends ContentTypeDetector {
  getSignals(postContent, metadata) {
    const text = postContent.toLowerCase();
    return {
      experimentalMarkers: (text.match(/\b(experiment|innovative|novel|unique|unconventional|hybrid|mixed|boundary|liminal|threshold)\b/g) || []).length
    };
  }
  
  calculateConfidence(signals) {
    return Math.min(signals.experimentalMarkers * 0.1, 0.7);
  }
  
  extractSignature(signals) {
    return { experimentalNature: signals.experimentalMarkers / 10 };
  }
}

// === ADVANCED ARCHETYPE SELECTOR ===
// Breaks the "layered" homogenization by mapping content types to diverse archetypes

class AdvancedArchetypeSelector {
  constructor() {
    // Content-type to archetype mapping - NO MORE "layered" for everything!
    this.contentTypeArchetypes = {
      narrative: {
        primary: ['flowing', 'temporal', 'sequential', 'unfolding'],
        secondary: ['layered', 'networked', 'cyclical'],
        colorRange: [20, 60], // Warm oranges to yellows
        characteristics: ['temporal_flow', 'character_development', 'story_arc']
      },
      philosophical: {
        primary: ['dialectical', 'contemplative', 'analytical', 'abstract'],
        secondary: ['layered', 'networked', 'liminal'],
        colorRange: [200, 280], // Blues to purples
        characteristics: ['abstract_reasoning', 'argument_structure', 'concept_exploration']
      },
      historical: {
        primary: ['layered', 'archival', 'temporal', 'sedimentary'],
        secondary: ['networked', 'flowing', 'cyclical'],
        colorRange: [40, 100], // Yellows to yellow-greens
        characteristics: ['temporal_depth', 'evidence_based', 'contextual']
      },
      personal: {
        primary: ['intimate', 'experiential', 'emotional', 'reflective'],
        secondary: ['flowing', 'radiant', 'liminal'],
        colorRange: [300, 360], // Magentas to reds
        characteristics: ['first_person', 'emotional_resonance', 'subjective_experience']
      },
      analytical: {
        primary: ['systematic', 'logical', 'structured', 'methodical'],
        secondary: ['networked', 'layered', 'grid-like'],
        colorRange: [120, 180], // Greens to cyans
        characteristics: ['systematic_approach', 'evidence_based', 'objective_tone']
      },
      technical: {
        primary: ['mechanical', 'systematic', 'structured', 'functional'],
        secondary: ['networked', 'grid-like', 'modular'],
        colorRange: [160, 220], // Cyans to blues
        characteristics: ['technical_precision', 'implementation_focused', 'systematic']
      },
      lyrical: {
        primary: ['ethereal', 'flowing', 'radiant', 'luminous'],
        secondary: ['cyclical', 'liminal', 'transcendent'],
        colorRange: [260, 320], // Purples to magentas
        characteristics: ['aesthetic_language', 'emotional_resonance', 'transcendent_themes']
      },
      experimental: {
        primary: ['liminal', 'chaotic', 'hybrid', 'boundary-crossing'],
        secondary: ['networked', 'dialectical', 'transformative'],
        colorRange: [0, 360], // Full spectrum
        characteristics: ['boundary_crossing', 'unconventional_structure', 'innovative_approach']
      }
    };
    
    console.log('🎭 Advanced Archetype Selector initialized - breaking "layered" homogenization');
  }
  
  selectArchetypes(contentAnalysis, baseGenome) {
    const contentType = contentAnalysis.contentType;
    const secondaryType = contentAnalysis.secondaryType;
    const confidence = contentAnalysis.confidence;
    
    console.log(`🎯 Selecting archetype for ${contentType} content (confidence: ${confidence.toFixed(2)})`);
    
    // Get archetype options for primary content type
    const primaryOptions = this.contentTypeArchetypes[contentType] || this.contentTypeArchetypes.philosophical;
    
    // Select primary archetype based on content characteristics
    const primaryArchetype = this.selectPrimaryArchetype(contentType, contentAnalysis, baseGenome, primaryOptions);
    
    // Select secondary archetype for blending
    const secondaryArchetype = this.selectSecondaryArchetype(contentType, secondaryType, primaryArchetype, primaryOptions);
    
    // Calculate archetype confidence
    const archetypeConfidence = this.calculateArchetypeConfidence(contentAnalysis, primaryArchetype);
    
    const archetypeProfile = {
      primary: primaryArchetype,
      secondary: secondaryArchetype,
      confidence: archetypeConfidence,
      contentType: contentType,
      colorRange: primaryOptions.colorRange,
      characteristics: primaryOptions.characteristics,
      reasoning: this.explainSelection(contentType, primaryArchetype, contentAnalysis)
    };
    
    console.log('🎭 Archetype Profile:', archetypeProfile);
    
    return archetypeProfile;
  }
  
  selectPrimaryArchetype(contentType, contentAnalysis, baseGenome, options) {
    const primaryCandidates = options.primary;
    
    // Content-specific archetype selection logic
    switch (contentType) {
      case 'narrative':
        // For narrative content, prioritize temporal flow
        if (contentAnalysis.signatures.discoveryOriented) {
          return 'unfolding'; // Discovery narratives unfold
        }
        if (contentAnalysis.signatures.historicalContext) {
          return 'temporal'; // Historical narratives are temporal
        }
        return 'flowing'; // Default narrative flow
        
      case 'philosophical':
        // For philosophical content, check argument structure
        if (contentAnalysis.signatures.argumentativeStructure > 0.5) {
          return 'dialectical'; // Strong argumentation
        }
        if (contentAnalysis.signatures.contemplativeDepth > 0.6) {
          return 'contemplative'; // Deep contemplation
        }
        return 'analytical'; // Default philosophical analysis
        
      case 'historical':
        // Historical content has temporal layers
        if (contentAnalysis.signatures.archivalDepth) {
          return 'archival'; // Deep archival research
        }
        if (contentAnalysis.signatures.temporalScope > 0.5) {
          return 'temporal'; // Broad temporal scope
        }
        return 'layered'; // Default historical layering
        
      case 'personal':
        // Personal content emphasizes experience
        if (contentAnalysis.signatures.emotionalResonance > 0.5) {
          return 'emotional'; // Strong emotional content
        }
        if (contentAnalysis.signatures.experientialDepth > 0.6) {
          return 'experiential'; // Deep personal experience
        }
        return 'intimate'; // Default personal intimacy
        
      case 'analytical':
        // Analytical content is systematic
        if (contentAnalysis.signatures.systematicApproach > 0.6) {
          return 'systematic'; // Highly systematic
        }
        if (contentAnalysis.signatures.methodological) {
          return 'methodical'; // Methodological approach
        }
        return 'logical'; // Default analytical logic
        
      default:
        // Fallback to first primary option
        return primaryCandidates[0];
    }
  }
  
  selectSecondaryArchetype(contentType, secondaryType, primaryArchetype, options) {
    // If there's a secondary content type, blend with it
    if (secondaryType && this.contentTypeArchetypes[secondaryType]) {
      const secondaryOptions = this.contentTypeArchetypes[secondaryType];
      // Choose a secondary archetype that complements the primary
      const secondaryCandidates = secondaryOptions.primary.filter(arch => arch !== primaryArchetype);
      return secondaryCandidates[0] || options.secondary[0];
    }
    
    // Otherwise, use secondary options for the primary type
    const secondaryCandidates = options.secondary.filter(arch => arch !== primaryArchetype);
    return secondaryCandidates[0] || null;
  }
  
  calculateArchetypeConfidence(contentAnalysis, archetype) {
    const baseConfidence = contentAnalysis.confidence;
    
    // Boost confidence for strong content-type matches
    const confidenceBoosts = {
      'flowing': contentAnalysis.signatures.narrativeFlow || 0,
      'dialectical': contentAnalysis.signatures.argumentativeStructure || 0,
      'temporal': contentAnalysis.signatures.temporalScope || 0,
      'intimate': contentAnalysis.signatures.personalIntimacy || 0,
      'systematic': contentAnalysis.signatures.systematicApproach || 0
    };
    
    const boost = confidenceBoosts[archetype] || 0;
    return Math.min(baseConfidence + boost * 0.2, 1.0);
  }
  
  explainSelection(contentType, archetype, contentAnalysis) {
    const reasons = [];
    
    reasons.push(`Content type: ${contentType} (confidence: ${contentAnalysis.confidence.toFixed(2)})`);
    reasons.push(`Selected archetype: ${archetype}`);
    
    // Add content-specific reasoning
    switch (contentType) {
      case 'narrative':
        if (contentAnalysis.signatures.discoveryOriented) {
          reasons.push('Discovery-oriented narrative structure detected');
        }
        if (contentAnalysis.signatures.historicalContext) {
          reasons.push('Historical context provides temporal anchoring');
        }
        break;
        
      case 'philosophical':
        if (contentAnalysis.signatures.argumentativeStructure > 0.5) {
          reasons.push('Strong argumentative structure suggests dialectical approach');
        }
        if (contentAnalysis.signatures.contemplativeDepth > 0.6) {
          reasons.push('Deep contemplative language indicates reflective mode');
        }
        break;
        
      case 'historical':
        if (contentAnalysis.signatures.archivalDepth) {
          reasons.push('Archival research methodology detected');
        }
        break;
    }
    
    return reasons;
  }
}

// === SEMANTIC DIVERSITY ENGINE ===
// Enhances genome diversity based on content analysis and archetype profile

class SemanticDiversityEngine {
  constructor() {
    console.log('🌈 Semantic Diversity Engine initialized - enhancing genome uniqueness');
  }
  
  enhanceDiversity(baseGenome, contentAnalysis, archetypeProfile) {
    console.log('🌈 Enhancing semantic diversity...');
    
    // Start with base genome
    const diversified = JSON.parse(JSON.stringify(baseGenome)); // Deep copy
    
    // Apply content-type specific enhancements
    this.applyContentTypeEnhancements(diversified, contentAnalysis);
    
    // Apply archetype-specific modifications
    this.applyArchetypeModifications(diversified, archetypeProfile);
    
    // Add unique fingerprinting
    this.addUniqueFingerprinting(diversified, contentAnalysis, archetypeProfile);
    
    // Ensure visual distinctiveness
    this.ensureVisualDistinctiveness(diversified, contentAnalysis);
    
    console.log('🌈 Diversity enhancement complete:', {
      contentType: contentAnalysis.contentType,
      archetype: archetypeProfile.primary,
      uniqueFingerprint: diversified.fingerprint
    });
    
    return diversified;
  }
  
  applyContentTypeEnhancements(genome, contentAnalysis) {
    const contentType = contentAnalysis.contentType;
    const signatures = contentAnalysis.signatures;
    
    switch (contentType) {
      case 'narrative':
        // Enhance temporal flow characteristics
        genome.temporality.flowType = 'sequential';
        genome.temporality.narrativeStructure = signatures.narrativeFlow || 0.8;
        genome.dynamics.dominantMovement = 'flowing';
        genome.dynamics.direction = 'forward';
        
        // Discovery narratives have unfolding patterns
        if (signatures.discoveryOriented) {
          genome.topology.branchingFactor += 0.5;
          genome.dynamics.velocity *= 1.3;
        }
        
        // Historical narratives have layered depth
        if (signatures.historicalContext) {
          genome.complexity.layerCount += 2;
          genome.temporality.temporalDensity += 0.3;
        }
        break;
        
      case 'philosophical':
        // Enhance abstract reasoning characteristics
        genome.complexity.abstractionLevel += 0.3;
        genome.resonance.contemplativeDepth = signatures.contemplativeDepth || 0.7;
        genome.topology.rhizomaticTendency += 0.2;
        
        // Dialectical content has opposing structures
        if (signatures.argumentativeStructure > 0.5) {
          genome.topology.dialecticalTension = signatures.argumentativeStructure;
          genome.dynamics.direction = 'bidirectional';
        }
        
        // Question-driven content has exploratory patterns
        if (signatures.questionDriven) {
          genome.dynamics.exploration = 0.8;
          genome.topology.circularityIndex += 0.3;
        }
        break;
        
      case 'historical':
        // Enhance temporal and archival characteristics
        genome.temporality.temporalLayers = signatures.temporalScope || 0.6;
        genome.complexity.sedimentaryStructure = 0.8;
        genome.topology.stratification = signatures.archivalDepth ? 0.9 : 0.6;
        
        // Research-oriented content has methodical patterns
        if (signatures.archivalDepth) {
          genome.dynamics.methodology = 0.8;
          genome.complexity.evidenceWeaving = 0.7;
        }
        break;
        
      case 'personal':
        // Enhance subjective and experiential characteristics
        genome.resonance.personalIntimacy = signatures.personalIntimacy || 0.8;
        genome.resonance.emotionalResonance = signatures.emotionalResonance || 0.6;
        genome.dynamics.subjectivity = 0.9;
        
        // Emotional content has radiant patterns
        if (signatures.emotionalResonance > 0.5) {
          genome.dynamics.dominantMovement = 'radiating';
          genome.resonance.emotionalAmplitude = signatures.emotionalResonance;
        }
        break;
        
      case 'analytical':
        // Enhance systematic and logical characteristics
        genome.topology.systematicStructure = signatures.systematicApproach || 0.7;
        genome.complexity.methodicalDepth = 0.8;
        genome.dynamics.precision = signatures.objectiveTone || 0.6;
        
        // Methodological content has grid-like patterns
        if (signatures.methodological) {
          genome.topology.gridAlignment = 0.8;
          genome.dynamics.dominantMovement = 'systematic';
        }
        break;
        
      default:
        // Generic enhancement for other types
        genome.complexity.diversity = 0.7;
    }
  }
  
  applyArchetypeModifications(genome, archetypeProfile) {
    const archetype = archetypeProfile.primary;
    const characteristics = archetypeProfile.characteristics;
    
    // Set archetype in genome
    genome.archetype = archetype;
    genome.archetypeProfile = archetypeProfile;
    
    // Apply archetype-specific modifications
    switch (archetype) {
      case 'flowing':
        genome.dynamics.fluidDynamics = 0.9;
        genome.temporality.continuity = 0.8;
        genome.topology.streamlineFlow = 0.7;
        break;
        
      case 'dialectical':
        genome.topology.opposition = 0.8;
        genome.dynamics.dialecticalTension = 0.9;
        genome.complexity.synthesisDrive = 0.7;
        break;
        
      case 'temporal':
        genome.temporality.temporalDominance = 0.9;
        genome.dynamics.chronologicalFlow = 0.8;
        genome.complexity.temporalLayers = 0.7;
        break;
        
      case 'unfolding':
        genome.dynamics.revelatory = 0.9;
        genome.temporality.unfoldingPattern = 0.8;
        genome.complexity.discoveryArc = 0.7;
        break;
        
      case 'contemplative':
        genome.resonance.contemplativeDepth = 0.9;
        genome.dynamics.reflectiveFlow = 0.8;
        genome.complexity.introspectiveDepth = 0.7;
        break;
        
      case 'analytical':
        genome.topology.analyticalStructure = 0.9;
        genome.dynamics.systematicFlow = 0.8;
        genome.complexity.logicalDepth = 0.7;
        break;
        
      case 'layered':
        genome.complexity.stratification = 0.9;
        genome.topology.layeredStructure = 0.8;
        genome.temporality.sedimentaryTime = 0.7;
        break;
        
      case 'intimate':
        genome.resonance.intimacyLevel = 0.9;
        genome.dynamics.personalFlow = 0.8;
        genome.complexity.subjectiveDepth = 0.7;
        break;
        
      case 'systematic':
        genome.topology.systematicOrder = 0.9;
        genome.dynamics.methodicalFlow = 0.8;
        genome.complexity.structuralPrecision = 0.7;
        break;
        
      default:
        // Apply generic archetype characteristics
        genome.archetypeIntensity = 0.7;
    }
  }
  
  addUniqueFingerprinting(genome, contentAnalysis, archetypeProfile) {
    // Create unique fingerprint based on content and archetype
    const fingerprintComponents = [
      contentAnalysis.contentType,
      archetypeProfile.primary,
      contentAnalysis.uniqueFingerprint.toString(),
      Date.now().toString().slice(-6) // Last 6 digits of timestamp for uniqueness
    ];
    
    genome.fingerprint = this.hashFingerprint(fingerprintComponents.join('|'));
    genome.contentFingerprint = contentAnalysis.uniqueFingerprint;
    genome.archetypeFingerprint = this.hashFingerprint(archetypeProfile.primary + archetypeProfile.secondary);
    
    // Add content-specific metadata
    genome.textLength = contentAnalysis.textLength;
    genome.contentTypeConfidence = contentAnalysis.confidence;
    genome.archetypeConfidence = archetypeProfile.confidence;
  }
  
  ensureVisualDistinctiveness(genome, contentAnalysis) {
    // Add visual distinctiveness factors
    const contentType = contentAnalysis.contentType;
    
    // Content-type specific visual modifiers
    const visualModifiers = {
      narrative: {
        hueShift: 20, // Warm oranges
        saturationBoost: 0.1,
        movementStyle: 'flowing'
      },
      philosophical: {
        hueShift: 240, // Blues/purples
        saturationBoost: -0.1,
        movementStyle: 'dialectical'
      },
      historical: {
        hueShift: 60, // Yellows/greens
        saturationBoost: -0.2,
        movementStyle: 'layered'
      },
      personal: {
        hueShift: 320, // Magentas/reds
        saturationBoost: 0.2,
        movementStyle: 'radiant'
      },
      analytical: {
        hueShift: 150, // Greens/cyans
        saturationBoost: 0,
        movementStyle: 'systematic'
      }
    };
    
    const modifier = visualModifiers[contentType] || visualModifiers.philosophical;
    
    // Apply visual modifiers to genome
    genome.visualModifiers = modifier;
    genome.visualDistinctiveness = {
      contentBased: true,
      hueRange: [modifier.hueShift - 20, modifier.hueShift + 20],
      saturationModifier: modifier.saturationBoost,
      movementCharacter: modifier.movementStyle
    };
  }
  
  hashFingerprint(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}

// === ENHANCED SEMANTIC DNA CLASS ===
// Modify the existing SemanticDNA class to use the amplifier

class EnhancedSemanticDNA {
  constructor() {
    // Always use fallback implementation - we'll check for SemanticDNA availability later
    this.baseSemanticDNA = null;
    this.shortContentAmplifier = new ShortContentAmplifier();
    this.enhancedSemanticInterpreter = new EnhancedSemanticInterpreter();
    
    // PRIME DIRECTIVE: Multi-Modal Content Analysis Engine
    this.contentAnalysisEngine = new MultiModalContentAnalysisEngine();
    this.archetypeSelector = new AdvancedArchetypeSelector();
    this.diversityEngine = new SemanticDiversityEngine();
    
    console.log('🧬 Enhanced Semantic DNA initialized with Multi-Modal Content Analysis Engine');
  }
  
  extractGenome(postContent, metadata = {}) {
    console.log('🧬 PRIME DIRECTIVE: Multi-Modal Semantic Analysis Starting...');
    
    // Phase 1: Get base genome
    let baseGenome = this.getBaseGenome(postContent, metadata);
    
    // Phase 2: PRIME DIRECTIVE - Multi-Modal Content Analysis  
    const contentAnalysis = this.contentAnalysisEngine.analyzeContent(postContent, metadata);
    console.log('📊 Content Analysis:', contentAnalysis);
    
    // Phase 3: Advanced Archetype Selection (not just "layered")
    const archetypeProfile = this.archetypeSelector.selectArchetypes(contentAnalysis, baseGenome);
    console.log('🎭 Archetype Profile:', archetypeProfile);
    
    // Phase 4: Semantic Diversity Enhancement 
    const diversifiedGenome = this.diversityEngine.enhanceDiversity(baseGenome, contentAnalysis, archetypeProfile);
    console.log('🌈 Diversified Genome:', diversifiedGenome);
    
    // Phase 5: Add unique identifiers with enhanced concepts
    diversifiedGenome.uniqueIdentifiers = this.enhancedSemanticInterpreter.extractUniqueConceptualDNA(diversifiedGenome);
    diversifiedGenome.contentAnalysis = contentAnalysis;
    diversifiedGenome.archetypeProfile = archetypeProfile;
    
    console.log('🎯 Final Enhanced Genome:', {
      archetype: diversifiedGenome.archetype,
      contentType: contentAnalysis.contentType,
      semanticColor: diversifiedGenome.uniqueIdentifiers.semanticColor,
      uniqueness: diversifiedGenome.uniqueIdentifiers.fingerprint
    });
    
    return diversifiedGenome;
  }
  
  getBaseGenome(postContent, metadata) {
    console.log('🧬 ELEGANT: Creating native content-aware genome...');
    
    // PRIME DIRECTIVE: Create genome directly from content analysis
    // No fallbacks, no old system dependencies - pure elegance
    
    const contentLength = postContent.length;
    const wordCount = (postContent.match(/\b\w+\b/g) || []).length;
    const uniqueWords = new Set(postContent.toLowerCase().match(/\b\w+\b/g) || []).size;
    
    // Phase 1: Basic content characteristics
    const basicCharacteristics = this.analyzeBasicCharacteristics(postContent, metadata);
    console.log('📊 Basic characteristics:', basicCharacteristics);
    
    // Phase 2: Structural analysis
    const structuralProfile = this.analyzeStructuralProfile(postContent);
    console.log('🏗️ Structural profile:', structuralProfile);
    
    // Phase 3: Temporal analysis  
    const temporalProfile = this.analyzeTemporalProfile(postContent, basicCharacteristics);
    console.log('⏰ Temporal profile:', temporalProfile);
    
    // Phase 4: Resonance analysis
    const resonanceProfile = this.analyzeResonanceProfile(postContent, basicCharacteristics);
    console.log('🎵 Resonance profile:', resonanceProfile);
    
    // Phase 5: Complexity analysis
    const complexityProfile = this.analyzeComplexityProfile(postContent, structuralProfile);
    console.log('🧩 Complexity profile:', complexityProfile);
    
    // Phase 6: Dynamic analysis
    const dynamicsProfile = this.analyzeDynamicsProfile(postContent, basicCharacteristics);
    console.log('⚡ Dynamics profile:', dynamicsProfile);
    
    // Create elegant native genome
    const nativeGenome = {
      topology: structuralProfile,
      temporality: temporalProfile,
      resonance: resonanceProfile,
      complexity: complexityProfile,
      dynamics: dynamicsProfile,
      
      // Content metadata
      textContent: postContent,
      textLength: contentLength,
      wordCount: wordCount,
      uniqueWords: uniqueWords,
      source: metadata,
      
      // Unique fingerprint for this content
      fingerprint: this.createContentFingerprint(postContent, metadata),
      
      // Debug info
      debug: { 
        source: 'native', 
        using: 'Multi-Modal Content Analysis Engine',
        elegant: true,
        prime_directive: true
      }
    };
    
    // Apply short content amplification if needed
    if (contentLength < 3000) {
      const amplifiedGenome = this.shortContentAmplifier.amplifyShortContent(nativeGenome, metadata, contentLength);
      console.log(`📊 Short content amplified (${contentLength} chars) with elegant efficiency`);
      return amplifiedGenome;
    }
    
    console.log('✨ Native content-aware genome created with elegant efficiency');
    return nativeGenome;
  }
  
  // ELEGANT: Basic content characteristic analysis
  analyzeBasicCharacteristics(postContent, metadata) {
    const text = postContent.toLowerCase();
    const sentences = postContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const paragraphs = postContent.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    return {
      contentType: this.detectContentType(text, metadata),
      writingStyle: this.detectWritingStyle(text),
      emotionalTone: this.detectEmotionalTone(text),
      formalityLevel: this.detectFormalityLevel(text),
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      averageSentenceLength: sentences.reduce((sum, s) => sum + s.length, 0) / sentences.length || 0
    };
  }
  
  // ELEGANT: Structural pattern analysis
  analyzeStructuralProfile(postContent) {
    const text = postContent.toLowerCase();
    const sentences = postContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
    
    // Branching analysis - how ideas connect
    const branchingFactor = this.calculateBranchingFactor(sentences);
    
    // Rhizomatic tendencies - non-linear thought patterns
    const rhizomaticTendency = this.calculateRhizomaticTendency(text);
    
    // Circularity - recurring themes and concepts
    const circularityIndex = this.calculateCircularityIndex(text);
    
    // Concept density - how packed with ideas
    const conceptDensity = this.calculateConceptDensity(text);
    
    return {
      branchingFactor: Math.min(branchingFactor, 5),
      rhizomaticTendency: Math.min(rhizomaticTendency, 1),
      circularityIndex: Math.min(circularityIndex, 1),
      conceptDensity: Math.min(conceptDensity, 1),
      architecturalComplexity: (branchingFactor + rhizomaticTendency + circularityIndex + conceptDensity) / 4
    };
  }
  
  // ELEGANT: Temporal flow analysis
  analyzeTemporalProfile(postContent, basicCharacteristics) {
    const text = postContent.toLowerCase();
    
    // Temporal markers analysis
    const pastTenseCount = (text.match(/\b\w+ed\b/g) || []).length;
    const presentTenseCount = (text.match(/\b(am|is|are|being)\b/g) || []).length;
    const futureMarkers = (text.match(/\b(will|shall|going to|future)\b/g) || []).length;
    
    // Temporal flow type
    let flowType = 'present';
    if (pastTenseCount > presentTenseCount * 2) flowType = 'narrative';
    if (futureMarkers > 5) flowType = 'prospective';
    if (basicCharacteristics.contentType === 'philosophical') flowType = 'cyclical';
    
    return {
      flowType: flowType,
      temporalDensity: Math.min((pastTenseCount + futureMarkers) / 100, 1),
      presentMomentFocus: Math.min(presentTenseCount / 50, 1),
      sequentialFlow: basicCharacteristics.contentType === 'narrative' ? 0.8 : 0.3,
      cyclical: flowType === 'cyclical',
      rhythmicPattern: { rhythmic: this.detectRhythmicPattern(text) },
      rhythmicComplexity: Math.random() * 0.5 + 0.3,
      durationCharacter: Math.min(postContent.length / 10000, 1)
    };
  }
  
  // ELEGANT: Resonance and emotional frequency analysis
  analyzeResonanceProfile(postContent, basicCharacteristics) {
    const text = postContent.toLowerCase();
    
    // Emotional frequency analysis
    const wonderWords = (text.match(/\b(wonder|awe|amazing|beautiful|mystery|curious)\b/g) || []).length;
    const urgencyWords = (text.match(/\b(urgent|immediate|now|quickly|crisis|critical)\b/g) || []).length;
    const melancholyWords = (text.match(/\b(sad|melancholy|loss|grief|sorrow|lonely)\b/g) || []).length;
    const joyWords = (text.match(/\b(joy|happy|celebration|delight|pleasure|bliss)\b/g) || []).length;
    const anxietyWords = (text.match(/\b(anxiety|worry|fear|stress|concern|nervous)\b/g) || []).length;
    
    return {
      harmonicComplexity: (wonderWords + joyWords) / 20 + Math.random() * 0.3,
      dissonanceLevel: (urgencyWords + anxietyWords) / 20 + Math.random() * 0.2,
      resonantFrequency: Math.random() * 0.5 + 0.3,
      frequencies: {
        wonder: Math.min(wonderWords / 10, 1),
        urgency: Math.min(urgencyWords / 10, 1),
        melancholy: Math.min(melancholyWords / 10, 1),
        joy: Math.min(joyWords / 10, 1),
        anxiety: Math.min(anxietyWords / 10, 1)
      }
    };
  }
  
  // ELEGANT: Complexity pattern analysis
  analyzeComplexityProfile(postContent, structuralProfile) {
    const sentences = postContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const words = postContent.match(/\b\w+\b/g) || [];
    
    // Calculate recursive depth based on nested structures
    const nestedStructures = (postContent.match(/[()[\]{}]/g) || []).length;
    const recursiveDepth = Math.min(Math.ceil(nestedStructures / 5) + 2, 8);
    
    // Calculate abstraction level
    const abstractWords = (postContent.toLowerCase().match(/\b(concept|idea|theory|abstract|meaning|essence|being|existence)\b/g) || []).length;
    const abstractionLevel = Math.min(abstractWords / 20, 1);
    
    return {
      recursiveDepth: recursiveDepth,
      nestingLevel: Math.min(Math.ceil(sentences.length / 10), 5),
      layerCount: Math.min(Math.ceil(postContent.split(/\n\s*\n/).length / 2), 6),
      selfSimilarity: structuralProfile.circularityIndex,
      nestedComplexity: Math.min(nestedStructures / 20, 1),
      abstractionLevel: abstractionLevel,
      modalDiversity: Math.min(words.length / postContent.length * 5, 1)
    };
  }
  
  // ELEGANT: Dynamic movement analysis
  analyzeDynamicsProfile(postContent, basicCharacteristics) {
    const text = postContent.toLowerCase();
    
    // Movement words analysis
    const movementWords = (text.match(/\b(flow|move|shift|change|transform|evolve|emerge|develop)\b/g) || []).length;
    const staticWords = (text.match(/\b(static|still|fixed|permanent|stable|constant)\b/g) || []).length;
    
    // Determine dominant movement
    let dominantMovement = 'contemplative';
    if (movementWords > 5) dominantMovement = 'flowing';
    if (basicCharacteristics.contentType === 'narrative') dominantMovement = 'sequential';
    if (basicCharacteristics.contentType === 'analytical') dominantMovement = 'systematic';
    if (basicCharacteristics.emotionalTone === 'intense') dominantMovement = 'radiating';
    
    return {
      velocity: Math.min(movementWords / 20, 1),
      direction: this.determineDirection(basicCharacteristics),
      dominantMovement: dominantMovement,
      acceleration: Math.random() * 0.3 + 0.1,
      patterns: {
        oscillating: Math.min((text.match(/\b(back|forth|cycle|repeat|rhythm)\b/g) || []).length / 10, 1),
        spiraling: Math.min((text.match(/\b(spiral|recursive|self|loop)\b/g) || []).length / 10, 1),
        radiating: Math.min((text.match(/\b(spread|radiate|expand|reach)\b/g) || []).length / 10, 1),
        collapsing: Math.min((text.match(/\b(collapse|concentrate|focus|center)\b/g) || []).length / 10, 1),
        flowing: Math.min(movementWords / 20, 1)
      }
    };
  }
  
  // Helper methods for elegant analysis
  detectContentType(text, metadata) {
    // Simple but effective content type detection
    if ((text.match(/\b(died|death|obituary|funeral|memorial|passed away)\b/g) || []).length > 0) return 'obituary';
    if ((text.match(/\b(technical|system|implementation|code|algorithm)\b/g) || []).length > 3) return 'technical';
    if ((text.match(/\b(philosophy|ethics|meaning|existence|consciousness)\b/g) || []).length > 2) return 'philosophical';
    if ((text.match(/\b(story|narrative|character|plot|journey)\b/g) || []).length > 2) return 'narrative';
    if ((text.match(/\b(I|me|my|personal|experience|felt)\b/g) || []).length > 10) return 'personal';
    return 'essay';
  }
  
  detectWritingStyle(text) {
    const formalWords = (text.match(/\b(furthermore|consequently|therefore|moreover|nevertheless)\b/g) || []).length;
    const casualWords = (text.match(/\b(so|well|anyway|really|actually|just)\b/g) || []).length;
    return formalWords > casualWords ? 'formal' : 'conversational';
  }
  
  detectEmotionalTone(text) {
    const positiveWords = (text.match(/\b(good|great|wonderful|amazing|beautiful|love|joy)\b/g) || []).length;
    const negativeWords = (text.match(/\b(bad|terrible|awful|sad|hate|pain|suffer)\b/g) || []).length;
    const intensityWords = (text.match(/\b(very|extremely|incredibly|absolutely|completely)\b/g) || []).length;
    
    if (intensityWords > 5) return 'intense';
    if (positiveWords > negativeWords * 2) return 'positive';
    if (negativeWords > positiveWords * 2) return 'negative';
    return 'neutral';
  }
  
  detectFormalityLevel(text) {
    const formalMarkers = (text.match(/\b(shall|ought|furthermore|nevertheless|consequently)\b/g) || []).length;
    const informalMarkers = (text.match(/\b(gonna|wanna|yeah|ok|cool|awesome)\b/g) || []).length;
    return Math.max(0, Math.min(1, (formalMarkers - informalMarkers) / 10 + 0.5));
  }
  
  calculateBranchingFactor(sentences) {
    // Calculate how ideas branch based on conjunctions and transitions
    const branchingWords = sentences.reduce((count, sentence) => {
      return count + (sentence.match(/\b(and|but|however|although|because|since|if|when|while)\b/g) || []).length;
    }, 0);
    return Math.min(branchingWords / sentences.length * 3, 5);
  }
  
  calculateRhizomaticTendency(text) {
    // Non-linear thought patterns
    const nonLinearMarkers = (text.match(/\b(meanwhile|elsewhere|on the other hand|suddenly|by the way)\b/g) || []).length;
    const questionMarkers = (text.match(/\?/g) || []).length;
    return Math.min((nonLinearMarkers + questionMarkers) / 50, 1);
  }
  
  calculateCircularityIndex(text) {
    // Recurring themes and self-reference
    const selfRefMarkers = (text.match(/\b(this|that|these|such|same|again|return|back)\b/g) || []).length;
    return Math.min(selfRefMarkers / 100, 1);
  }
  
  calculateConceptDensity(text) {
    // How packed with concepts
    const conceptWords = (text.match(/\b(concept|idea|notion|principle|theory|framework|model)\b/g) || []).length;
    const totalWords = (text.match(/\b\w+\b/g) || []).length;
    return Math.min(conceptWords / totalWords * 10, 1);
  }
  
  detectRhythmicPattern(text) {
    // Simple rhythm detection based on sentence length variation
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 5);
    if (sentences.length < 3) return false;
    
    const lengths = sentences.map(s => s.length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
    
    return variance > avgLength * 0.5; // High variance suggests rhythmic pattern
  }
  
  determineDirection(basicCharacteristics) {
    if (basicCharacteristics.contentType === 'narrative') return 'forward';
    if (basicCharacteristics.contentType === 'philosophical') return 'inward';
    if (basicCharacteristics.contentType === 'obituary') return 'backward';
    if (basicCharacteristics.emotionalTone === 'positive') return 'outward';
    return 'circular';
  }
  
  createContentFingerprint(postContent, metadata) {
    // Create unique fingerprint from content and metadata
    const components = [
      metadata.title || 'untitled',
      postContent.substring(0, 50),
      postContent.length.toString(),
      (postContent.match(/\b\w+\b/g) || []).length.toString(),
      Date.now().toString().slice(-4) // Last 4 digits for uniqueness
    ];
    
    return this.simpleHash(components.join('|')).toString(36).substring(0, 10);
  }
  
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
  
  // Create fallback genome structure when SemanticDNA is not available
  createFallbackGenome(postContent, metadata) {
    const contentLength = postContent.length;
    const words = postContent.split(/\s+/).length;
    
    return {
      topology: {
        branchingFactor: Math.min(words / 10, 3),
        rhizomaticTendency: 0.3,
        circularityIndex: 0.2,
        conceptDensity: Math.min(words / contentLength * 10, 1),
        architecturalComplexity: 0.5
      },
      temporality: {
        rhythmicComplexity: 0.4,
        temporalDensity: 0.3,
        cyclical: false,
        rhythmicPattern: { rhythmic: false },
        presentMomentFocus: 0.6,
        durationCharacter: 0.5
      },
      resonance: {
        harmonicComplexity: 0.4,
        dissonanceLevel: 0.2,
        resonantFrequency: 0.5,
        frequencies: {}
      },
      complexity: {
        recursiveDepth: Math.ceil(Math.log(words + 1)),
        nestingLevel: 2,
        layerCount: 1,
        selfSimilarity: 0.3,
        nestedComplexity: 0.4,
        abstractionLevel: 0.5
      },
      dynamics: {
        velocity: 0.3,
        processualCharacter: 0.4,
        emergentCharacter: 0.3,
        energeticFlow: 0.5,
        patterns: {}
      },
      // CRITICAL: Store the actual text content for concept extraction
      textContent: postContent
    };
  }
}

// === REGISTRATION WITH GLOBAL GLYPH SYSTEM ===

if (typeof window !== 'undefined') {
  window.GlyphSemantics = window.GlyphSemantics || {};
  window.GlyphSemantics.EnhancedSemanticInterpreter = EnhancedSemanticInterpreter;
  
  // Add diagnostic marker to prove this file loaded
  SemanticVisualTranslator.prototype.__diagnosticMarker = 'FIXED_VERSION_v8_LOADED';
  
  window.GlyphSemantics.SemanticVisualTranslator = SemanticVisualTranslator;
  window.GlyphSemantics.ShortContentAmplifier = ShortContentAmplifier;
  window.GlyphSemantics.EnhancedSemanticDNA = EnhancedSemanticDNA;
  
  console.log('🌸 Short Content Amplifier loaded - even haikus will have unique fingerprints');
  console.log('📍 Diagnostic marker added - check: window.GlyphSemantics.SemanticVisualTranslator.prototype.__diagnosticMarker');
}