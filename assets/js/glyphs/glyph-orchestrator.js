// Glyph Orchestrator - Bridge between metadata and procedural renderer
// Parses glyph_id and post metadata to generate rendering parameters

class GlyphOrchestrator {
  constructor() {
    this.familyMap = {
      'radiance': 'Radiance',
      'interference': 'Interference', 
      'spiral': 'Spiral',
      'constellation': 'Constellation',
      'flow': 'Flow',
      'strata': 'Strata',
      'balance': 'Balance',
      'collapse': 'Collapse',
      'grid': 'Grid',
      'chaos': 'Chaos',
      'threshold': 'Threshold'
    };
    
    this.seasonMap = {
      '○': 'winter',   // Winter
      '△': 'spring',   // Spring  
      '□': 'summer',   // Summer
      '▽': 'autumn'    // Autumn
    };
    
    // Emergence detection system
    this.patternMemory = [];
    this.hybridThreshold = 0.15; // Confidence similarity threshold for hybrid detection
    this.emergentFamilies = new Map(); // Discovered family patterns
  }

  // Parse glyph_id into family and descriptors
  parseGlyphId(glyphId) {
    const parts = glyphId.split('-');
    const family = parts[0];
    const descriptors = parts.slice(1);
    
    return {
      family: this.familyMap[family] || 'Radiance',
      descriptors: descriptors
    };
  }

  // Extract metadata from post container
  extractPostMetadata(container) {
    const metadata = {};
    
    // Get data attributes from container
    metadata.glyphId = container.dataset.glyphId || '';
    
    // Try to find metadata in the page (from Hakyll context)
    const metaElements = document.querySelectorAll('meta[name^="glyph-"]');
    metaElements.forEach(meta => {
      const key = meta.name.replace('glyph-', '');
      metadata[key] = meta.content;
    });
    
    // Parse themes if available
    if (metadata.themes) {
      try {
        metadata.themes = JSON.parse(metadata.themes);
      } catch(e) {
        metadata.themes = metadata.themes.split(',').map(t => t.trim());
      }
    }
    
    return metadata;
  }

  // Generate rendering parameters from glyph_id and metadata
  generateParameters(glyphId, metadata = {}) {
    const parsed = this.parseGlyphId(glyphId);
    
    // Check for hybrid family potential
    const hybridCandidate = this.detectHybridFamily(glyphId, metadata);
    
    // Base parameters
    const params = {
      family: hybridCandidate ? hybridCandidate.primary : parsed.family,
      descriptors: parsed.descriptors,
      isHybrid: !!hybridCandidate,
      hybridSecondary: hybridCandidate?.secondary,
      hybridBlend: hybridCandidate?.blend || 0
    };

    // Map mood to intensity and style
    switch(metadata.mood) {
      case 'anticipatory':
        params.intensity = 0.6;
        params.temporalFrequency = 0.02;
        params.pulseMode = true;
        break;
      case 'contemplative':
        params.intensity = 0.4;
        params.temporalFrequency = 0.01;
        params.pulseMode = false;
        break;
      case 'urgent':
        params.intensity = 0.8;
        params.temporalFrequency = 0.03;
        params.pulseMode = true;
        break;
      default:
        params.intensity = 0.5;
        params.temporalFrequency = 0.015;
        params.pulseMode = false;
    }

    // Map movement to animation style
    switch(metadata.movement) {
      case 'radiating':
        params.radiusVariation = 0.3;
        params.expansionRate = 0.02;
        break;
      case 'flowing':
        params.flowDirection = 'outward';
        params.streamCount = 8;
        break;
      case 'pulsing':
        params.pulseAmplitude = 0.4;
        params.pulseFrequency = 0.025;
        break;
      default:
        params.radiusVariation = 0.2;
        params.expansionRate = 0.01;
    }

    // Get current season from seasonal glyph
    const seasonalGlyph = document.querySelector('.seasonal-geometry');
    if (seasonalGlyph) {
      params.season = this.seasonMap[seasonalGlyph.textContent.trim()] || 'spring';
    } else {
      params.season = 'spring';
    }

    // Family-specific parameters
    if (parsed.family === 'Radiance') {
      params.rayCount = 12;
      params.coreRadius = 20;
      params.maxRadius = 200;
      
      // Descriptor-specific adjustments
      if (parsed.descriptors.includes('threshold')) {
        params.layerCount = 3;
        params.transparencyGradient = true;
      }
      if (parsed.descriptors.includes('birth')) {
        params.emergenceEffect = true;
        params.particleEmission = true;
      }
    }

    // Record this pattern for emergence detection
    this.recordPattern(glyphId, metadata, params);
    
    return params;
  }

  // Detect potential hybrid families based on content analysis
  detectHybridFamily(glyphId, metadata) {
    const familyConfidences = this.calculateFamilyConfidences(metadata);
    
    // Sort by confidence
    const sorted = Object.entries(familyConfidences)
      .sort(([,a], [,b]) => b - a);
    
    if (sorted.length >= 2) {
      const [first, second] = sorted;
      const confidenceDiff = first[1] - second[1];
      
      // If top two families are very close, create hybrid
      if (confidenceDiff < this.hybridThreshold) {
        return {
          primary: first[0],
          secondary: second[0],
          blend: 0.5 + (confidenceDiff / this.hybridThreshold) * 0.3
        };
      }
    }
    
    return null;
  }

  // Calculate confidence scores for each family based on metadata
  calculateFamilyConfidences(metadata) {
    const confidences = {};
    const themes = metadata.themes || [];
    const content = (metadata.content || '').toLowerCase();
    
    // Initialize all families with base confidence
    Object.values(this.familyMap).forEach(family => {
      confidences[family] = 0.1;
    });
    
    // Analyze themes for family resonance
    themes.forEach(theme => {
      switch(theme.toLowerCase()) {
        case 'transformation':
        case 'becoming':
        case 'transition':
          confidences['Threshold'] += 0.3;
          confidences['Flow'] += 0.2;
          break;
        case 'memory':
        case 'time':
        case 'repetition':
          confidences['Spiral'] += 0.3;
          confidences['Strata'] += 0.2;
          break;
        case 'connection':
        case 'relationship':
        case 'network':
          confidences['Constellation'] += 0.3;
          confidences['Grid'] += 0.2;
          break;
        case 'conflict':
        case 'tension':
        case 'opposition':
          confidences['Interference'] += 0.3;
          confidences['Balance'] += 0.2;
          break;
        case 'chaos':
        case 'uncertainty':
        case 'complexity':
          confidences['Chaos'] += 0.3;
          confidences['Flow'] += 0.2;
          break;
        case 'order':
        case 'structure':
        case 'stability':
          confidences['Grid'] += 0.3;
          confidences['Strata'] += 0.2;
          break;
        case 'collapse':
        case 'ending':
        case 'destruction':
          confidences['Collapse'] += 0.3;
          confidences['Chaos'] += 0.1;
          break;
        case 'balance':
        case 'equilibrium':
        case 'harmony':
          confidences['Balance'] += 0.3;
          confidences['Flow'] += 0.1;
          break;
      }
    });
    
    // Analyze content for keyword resonance
    const keywordAnalysis = {
      'threshold': ['portal', 'boundary', 'crossing', 'liminal', 'between'],
      'spiral': ['recursive', 'cycle', 'spiral', 'fibonacci', 'golden'],
      'constellation': ['stars', 'connection', 'pattern', 'navigation', 'celestial'],
      'flow': ['current', 'stream', 'fluid', 'movement', 'dynamic'],
      'strata': ['layers', 'geological', 'sediment', 'history', 'accumulation'],
      'balance': ['equilibrium', 'scales', 'harmony', 'pendulum', 'stable'],
      'collapse': ['fall', 'crumble', 'gravity', 'implosion', 'failure'],
      'chaos': ['random', 'butterfly', 'attractor', 'sensitive', 'turbulent'],
      'interference': ['wave', 'pattern', 'conflict', 'superposition', 'resonance'],
      'grid': ['matrix', 'lattice', 'regular', 'ordered', 'systematic']
    };
    
    Object.entries(keywordAnalysis).forEach(([family, keywords]) => {
      const familyClass = this.familyMap[family];
      if (familyClass) {
        keywords.forEach(keyword => {
          if (content.includes(keyword)) {
            confidences[familyClass] += 0.15;
          }
        });
      }
    });
    
    return confidences;
  }

  // Record pattern for emergence detection
  recordPattern(glyphId, metadata, params) {
    const pattern = {
      glyphId,
      metadata,
      params,
      timestamp: Date.now(),
      engagement: 0 // Will be updated by interaction tracking
    };
    
    this.patternMemory.push(pattern);
    
    // Keep memory size manageable
    if (this.patternMemory.length > 1000) {
      this.patternMemory = this.patternMemory.slice(-800);
    }
    
    // Check for emergent family potential
    this.detectEmergentFamily();
  }

  // Detect emergent family patterns using clustering
  detectEmergentFamily() {
    if (this.patternMemory.length < 20) return;
    
    // Group patterns by parameter similarity
    const clusters = this.clusterPatterns(this.patternMemory.slice(-50));
    
    // Look for clusters that don't fit existing families well
    clusters.forEach(cluster => {
      if (cluster.length >= 5 && cluster.coherence > 0.7) {
        const avgParams = this.averageParameters(cluster);
        const familyFit = this.calculateFamilyFit(avgParams);
        
        // If no existing family fits well, this might be emergent
        if (Math.max(...Object.values(familyFit)) < 0.5) {
          this.proposeEmergentFamily(cluster, avgParams);
        }
      }
    });
  }

  // Simple clustering algorithm for pattern detection
  clusterPatterns(patterns) {
    const clusters = [];
    const visited = new Set();
    
    patterns.forEach((pattern, index) => {
      if (visited.has(index)) return;
      
      const cluster = [pattern];
      visited.add(index);
      
      patterns.forEach((other, otherIndex) => {
        if (visited.has(otherIndex)) return;
        
        const similarity = this.calculateParameterSimilarity(
          pattern.params, other.params
        );
        
        if (similarity > 0.6) {
          cluster.push(other);
          visited.add(otherIndex);
        }
      });
      
      // Calculate cluster coherence
      cluster.coherence = this.calculateClusterCoherence(cluster);
      clusters.push(cluster);
    });
    
    return clusters;
  }

  // Calculate similarity between parameter sets
  calculateParameterSimilarity(params1, params2) {
    const keys = new Set([...Object.keys(params1), ...Object.keys(params2)]);
    let similarity = 0;
    let comparisons = 0;
    
    keys.forEach(key => {
      if (key in params1 && key in params2) {
        comparisons++;
        if (typeof params1[key] === 'number' && typeof params2[key] === 'number') {
          const diff = Math.abs(params1[key] - params2[key]);
          similarity += Math.max(0, 1 - diff);
        } else if (params1[key] === params2[key]) {
          similarity += 1;
        }
      }
    });
    
    return comparisons > 0 ? similarity / comparisons : 0;
  }

  // Calculate cluster coherence
  calculateClusterCoherence(cluster) {
    if (cluster.length < 2) return 0;
    
    let totalSimilarity = 0;
    let comparisons = 0;
    
    for (let i = 0; i < cluster.length; i++) {
      for (let j = i + 1; j < cluster.length; j++) {
        totalSimilarity += this.calculateParameterSimilarity(
          cluster[i].params, cluster[j].params
        );
        comparisons++;
      }
    }
    
    return comparisons > 0 ? totalSimilarity / comparisons : 0;
  }

  // Average parameters across cluster
  averageParameters(cluster) {
    const avgParams = {};
    const keys = new Set();
    
    cluster.forEach(pattern => {
      Object.keys(pattern.params).forEach(key => keys.add(key));
    });
    
    keys.forEach(key => {
      const values = cluster
        .map(pattern => pattern.params[key])
        .filter(val => typeof val === 'number');
      
      if (values.length > 0) {
        avgParams[key] = values.reduce((a, b) => a + b, 0) / values.length;
      }
    });
    
    return avgParams;
  }

  // Calculate how well parameters fit existing families
  calculateFamilyFit(params) {
    const fit = {};
    
    Object.values(this.familyMap).forEach(family => {
      // This would be enhanced with actual family parameter profiles
      fit[family] = Math.random() * 0.8; // Placeholder
    });
    
    return fit;
  }

  // Propose a new emergent family
  proposeEmergentFamily(cluster, avgParams) {
    const familyId = `emergent_${Date.now()}`;
    
    console.log(`🌱 Emergent family detected: ${familyId}`, {
      clusterSize: cluster.length,
      avgParams,
      examples: cluster.slice(0, 3).map(p => p.glyphId)
    });
    
    this.emergentFamilies.set(familyId, {
      id: familyId,
      cluster,
      avgParams,
      discovered: Date.now(),
      stability: 0.1 // Will increase with more observations
    });
  }

  // Initialize glyph rendering for all containers on page
  initializeAll() {
    document.addEventListener('DOMContentLoaded', () => {
      const containers = document.querySelectorAll('.philosophical-glyph[data-glyph-id]');
      
      containers.forEach(container => {
        const canvas = container.querySelector('#glyph-canvas');
        if (!canvas) return;
        
        const glyphId = container.dataset.glyphId;
        const metadata = this.extractPostMetadata(container);
        const parameters = this.generateParameters(glyphId, metadata);
        
        // Check if specific glyph file exists, otherwise use procedural
        this.loadGlyphOrFallback(canvas, glyphId, parameters);
      });
    });
  }

  // Try to load specific glyph file, fall back to procedural
  async loadGlyphOrFallback(canvas, glyphId, parameters) {
    // Try specific instance first
    const instanceUrl = `/assets/js/glyphs/instances/${glyphId}.js`;
    
    try {
      const response = await fetch(instanceUrl);
      if (response.ok) {
        // Specific instance exists, load it
        const script = document.createElement('script');
        script.src = instanceUrl;
        document.head.appendChild(script);
        return;
      }
    } catch (error) {
      // Instance doesn't exist, continue to procedural
    }
    
    // Use procedural renderer with family engines
    await this.loadFamilyEngine(parameters.family);
    this.createProceduralGlyph(canvas, parameters);
  }

  // Load the appropriate family engine
  async loadFamilyEngine(familyName) {
    const engineName = familyName.toLowerCase();
    const engineUrl = `/assets/js/glyphs/engines/${engineName}-renderer.js`;
    
    // Check if engine already loaded
    if (window.GlyphRenderers && window.GlyphRenderers[familyName]) {
      return;
    }
    
    try {
      const response = await fetch(engineUrl);
      if (response.ok) {
        const script = document.createElement('script');
        script.src = engineUrl;
        document.head.appendChild(script);
        
        // Wait for engine to load
        return new Promise((resolve) => {
          script.onload = resolve;
        });
      }
    } catch (error) {
      console.warn(`Failed to load engine: ${engineUrl}`, error);
    }
  }

  // Create procedural glyph using loaded engines
  createProceduralGlyph(canvas, parameters) {
    const { family, isHybrid, hybridSecondary, hybridBlend } = parameters;
    
    if (isHybrid && window.GlyphRenderers[hybridSecondary]) {
      // Create hybrid renderer
      this.createHybridGlyph(canvas, parameters);
    } else if (window.GlyphRenderers && window.GlyphRenderers[family]) {
      // Create single family glyph
      const RendererClass = window.GlyphRenderers[family];
      const renderer = new RendererClass(canvas, parameters);
      renderer.start();
    } else {
      console.warn(`Glyph renderer not available: ${family}`);
      this.createFallbackGlyph(canvas);
    }
  }

  // Create hybrid glyph blending two families
  createHybridGlyph(canvas, parameters) {
    const { family, hybridSecondary, hybridBlend } = parameters;
    
    // Create two renderers with adjusted parameters
    const primaryParams = { ...parameters, opacity: hybridBlend };
    const secondaryParams = { ...parameters, opacity: 1 - hybridBlend };
    
    const PrimaryRenderer = window.GlyphRenderers[family];
    const SecondaryRenderer = window.GlyphRenderers[hybridSecondary];
    
    if (PrimaryRenderer && SecondaryRenderer) {
      // Create composite canvas for blending
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      
      const primaryRenderer = new PrimaryRenderer(canvas, primaryParams);
      const secondaryRenderer = new SecondaryRenderer(tempCanvas, secondaryParams);
      
      // Start both renderers
      primaryRenderer.start();
      secondaryRenderer.start();
      
      // Blend secondary onto primary
      setInterval(() => {
        const ctx = canvas.getContext('2d');
        ctx.globalAlpha = 1 - hybridBlend;
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.globalAlpha = 1.0;
      }, 50);
      
      console.log(`🎨 Hybrid glyph: ${family} + ${hybridSecondary} (${(hybridBlend * 100).toFixed(0)}%)`);
    }
  }

  // Fallback for when no renderer is available
  createFallbackGlyph(canvas) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Simple geometric fallback
    ctx.strokeStyle = 'rgba(100, 150, 200, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) / 3, 0, Math.PI * 2);
    ctx.stroke();
    
    console.warn('Using fallback glyph - no renderer available');
  }
}

// Auto-initialize when script loads
const orchestrator = new GlyphOrchestrator();
orchestrator.initializeAll();