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
    
    // Living epistemic organism components
    this.semanticDNA = new SemanticDNA();
    this.breedingGround = new SemanticBreedingGround();
    this.interpreter = new PhilosophicalInterpreter();
    this.evolutionaryFitness = new EvolutionaryFitness();
    
    // Legacy emergence detection system (will be evolved)
    this.patternMemory = [];
    this.hybridThreshold = 0.15;
    this.emergentFamilies = new Map();
    
    // Living glyph population
    this.livingGlyphs = new Map(); // Active conscious glyphs
    this.glyphMemory = new Map();  // Generational memory
    this.consciousnessLevel = 0;   // Overall system awareness
    
    console.log('🧬 Living Epistemic Glyph System initialized');
  }

  // Extract post content for genome analysis
  extractPostContent(metadata) {
    // Try to get full post content from various sources
    let content = '';
    
    // Check if content is directly provided
    if (metadata.content) {
      content = metadata.content;
    } else if (metadata.body) {
      content = metadata.body;
    } else {
      // Fallback to available metadata
      const parts = [];
      if (metadata.title) parts.push(metadata.title);
      if (metadata.excerpt) parts.push(metadata.excerpt);
      if (metadata.description) parts.push(metadata.description);
      content = parts.join(' ');
    }
    
    // If still no content, try to extract from page
    if (!content && typeof document !== 'undefined') {
      const articleContent = document.querySelector('.post-content, article, main');
      if (articleContent) {
        content = articleContent.textContent || articleContent.innerText || '';
      }
    }
    
    return content || metadata.title || 'untitled content';
  }

  // Parse glyph_id into family and descriptors
  parseGlyphId(glyphId) {
    const parts = glyphId.split('-');
    const family = parts[0];
    const descriptors = parts.slice(1);
    
    return {
      family: this.familyMap[family] || null, // Don't default yet, let semantic analysis decide
      rawFamily: family, // Keep the raw family for debugging
      descriptors: descriptors
    };
  }

  // Extract metadata from post container
  extractPostMetadata(container) {
    const metadata = {};
    
    // Get data attributes from container
    metadata.glyphId = container.dataset.glyphId || '';
    
    // IMPORTANT: Look for content in the broader document context, not just the container
    // The container is just the glyph div, not the entire post
    
    // Extract post title from the page (multiple fallback strategies)
    let titleElement = document.querySelector('.post-title, h1[itemprop="name headline"], article h1, main h1');
    
    if (!titleElement) {
      // Fallback 1: Try any h1 on the page
      titleElement = document.querySelector('h1');
    }
    
    if (!titleElement) {
      // Fallback 2: Try breadcrumb current span
      titleElement = document.querySelector('.breadcrumb .current');
    }
    
    if (!titleElement) {
      // Fallback 3: Try page title element and clean it
      titleElement = document.querySelector('title');
    }
    
    if (titleElement) {
      metadata.title = titleElement.textContent || titleElement.innerText || '';
      // Clean up title - remove site suffix if present
      metadata.title = metadata.title.replace(/ - Animal Rationis Capax$/, '').trim();
    } else {
      // Last resort: try to extract from glyph ID
      metadata.title = metadata.glyphId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      console.warn('⚠️ No title element found, using glyph ID as title:', metadata.title);
    }
    
    console.log('🔍 Title extraction:', {
      titleElement: titleElement?.tagName,
      titleText: metadata.title,
      titleLength: metadata.title ? metadata.title.length : 0
    });
    
    // Extract post content for semantic analysis - look in the whole document
    const contentElement = document.querySelector('.post-content[itemprop="articleBody"], .post-content, article .content, main .content, article');
    if (contentElement) {
      metadata.content = contentElement.textContent || contentElement.innerText || '';
    } else {
      // If no content element found, try to get all text from article or main
      const fallbackContent = document.querySelector('article, main');
      if (fallbackContent) {
        metadata.content = fallbackContent.textContent || fallbackContent.innerText || '';
      }
    }
    
    // Extract post class/type
    const articleElement = document.querySelector('article');
    if (articleElement) {
      const classList = Array.from(articleElement.classList);
      metadata.class = classList.find(cls => ['essay', 'observation', 'fragment', 'glimpse', 'photo-essay', 'chamber'].includes(cls)) || '';
    }
    
    // Extract post date
    const dateElement = document.querySelector('time[datetime]');
    if (dateElement) {
      metadata.date = dateElement.getAttribute('datetime') || dateElement.textContent || '';
    }
    
    // Extract meta description for additional context
    const descriptionMeta = document.querySelector('meta[name="description"], meta[property="og:description"]');
    if (descriptionMeta) {
      metadata.description = descriptionMeta.getAttribute('content') || '';
    }
    
    // Try to find metadata in the page (from Hakyll context)
    const metaElements = document.querySelectorAll('meta[name^="glyph-"], meta[name^="theme-"]');
    metaElements.forEach(meta => {
      const key = meta.name.replace(/^(glyph-|theme-)/, '');
      metadata[key] = meta.content;
    });
    
    // Parse themes if available
    if (metadata.themes) {
      try {
        metadata.themes = JSON.parse(metadata.themes);
      } catch(e) {
        metadata.themes = metadata.themes.split(',').map(t => t.trim());
      }
    } else {
      // Try to extract themes from data attributes or other sources
      const themesMeta = document.querySelector('meta[name="themes"], meta[name="keywords"]');
      if (themesMeta) {
        const themesContent = themesMeta.getAttribute('content') || '';
        metadata.themes = themesContent.split(',').map(t => t.trim()).filter(t => t.length > 0);
      }
    }
    
    // Debug logging to track metadata extraction
    console.log('🔍 Extracted metadata:', {
      title: metadata.title,
      class: metadata.class,
      contentLength: metadata.content?.length || 0,
      glyphId: metadata.glyphId,
      themes: metadata.themes || [],
      hasContent: !!metadata.content,
      contentPreview: metadata.content ? metadata.content.substring(0, 100) + '...' : 'No content'
    });
    
    return metadata;
  }

  // Generate rendering parameters from glyph_id and metadata
  generateParameters(glyphId, metadata = {}) {
    console.log(`🧬 Generating parameters for: ${glyphId}`);
    console.log("🔍 Available methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(this)));
    
    // Start with legacy system for guaranteed compatibility
    const parsed = this.parseGlyphId(glyphId);
    const hybridCandidate = this.detectHybridFamily(glyphId, metadata);
    const emergentCandidate = this.checkEmergentFamilies(glyphId, metadata);
    
    // Determine family - use semantic analysis if no valid family from glyph_id
    let chosenFamily = parsed.family;
    if (!chosenFamily) {
      // Use semantic analysis to determine family
      const familyConfidences = this.calculateFamilyConfidences(metadata);
      const topFamily = Object.entries(familyConfidences)
        .sort(([,a], [,b]) => b - a)[0];
      
      if (topFamily && topFamily[1] > 0.2) {
        chosenFamily = topFamily[0];
        console.log(`🧠 Semantic analysis selected family: ${chosenFamily} (confidence: ${topFamily[1].toFixed(2)}) for raw family: ${parsed.rawFamily}`);
        console.log(`📊 All family confidences:`, Object.entries(familyConfidences)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([family, conf]) => `${family}: ${conf.toFixed(2)}`)
          .join(', '));
      } else {
        chosenFamily = 'Radiance'; // Final fallback
        console.log(`⚠️ No confident family match found, defaulting to Radiance for: ${parsed.rawFamily}`);
        console.log(`📊 Top confidences were:`, Object.entries(familyConfidences)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([family, conf]) => `${family}: ${conf.toFixed(2)}`)
          .join(', '));
      }
    }
    
    // Base parameters from legacy system
    const params = {
      family: emergentCandidate || (hybridCandidate ? hybridCandidate.primary : chosenFamily),
      descriptors: parsed.descriptors,
      isHybrid: !!hybridCandidate,
      hybridSecondary: hybridCandidate?.secondary,
      hybridBlend: hybridCandidate?.blend || 0,
      isEmergent: !!emergentCandidate,
      rawFamily: parsed.rawFamily // For debugging
    };
    
    // Try to enhance with living system if available
    try {
      // Extract full semantic genome from post content
      const postContent = this.extractPostContent(metadata);
      const genome = this.semanticDNA.extractGenome(postContent, metadata);
      
      // Find or create living renderer
      let livingRenderer = this.breedingGround.findBestMatch(genome);
      
      if (!livingRenderer || livingRenderer.fitness < 0.5) {
        // Birth a new glyph species
        console.log(`🌱 Creating new living glyph for ${glyphId}`);
        livingRenderer = this.breedingGround.createNew(genome);
      } else {
        console.log(`🎯 Using existing living glyph: ${livingRenderer.id} (fitness: ${livingRenderer.fitness})`);
      }
      
      // Store the living glyph association
      this.livingGlyphs.set(glyphId, livingRenderer);
      
      // Get living parameters from the renderer
      const livingParams = livingRenderer.getParameters();
      
      // Enhance base parameters with living system
      Object.assign(params, {
        // Living system enhancements
        genome: livingParams.genome,
        consciousness: livingParams.consciousness,
        algorithms: livingParams.algorithms,
        isLiving: true,
        livingId: livingRenderer.id,
        
        // Enhanced genome-driven parameters
        rhizomaticSpread: livingParams.rhizomaticSpread,
        connectivity: livingParams.connectivity,
        temporalFrequency: livingParams.temporalFrequency,
        phase: livingParams.phase,
        harmonics: livingParams.harmonics
      });
      
      console.log(`🧬 Enhanced with living system: ${params.family}`);
      
    } catch (error) {
      console.warn(`⚠️ Living system failed, using legacy: ${error.message}`);
      // Continue with base parameters
    }

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
    
    // Apply seasonal mutations to parameters
    this.applySeasonalMutations(params);

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
    const content = (metadata.content || metadata.title || metadata.description || '').toLowerCase();
    
    // Initialize all families with base confidence
    Object.values(this.familyMap).forEach(family => {
      confidences[family] = 0.1;
    });
    
    // Log what we're analyzing
    console.log('📊 Analyzing content for family assignment:', {
      themes: themes,
      contentLength: content.length,
      titleWords: metadata.title ? metadata.title.toLowerCase().split(/\s+/) : [],
      hasContent: content.length > 100
    });
    
    // Analyze themes for family resonance
    themes.forEach(theme => {
      const themeLower = theme.toLowerCase();
      console.log(`  🏷️ Processing theme: ${themeLower}`);
      
      switch(themeLower) {
        case 'transformation':
        case 'becoming':
        case 'transition':
        case 'change':
        case 'metamorphosis':
          confidences['Threshold'] += 0.3;
          confidences['Flow'] += 0.2;
          break;
        case 'memory':
        case 'time':
        case 'repetition':
        case 'history':
        case 'recursion':
          confidences['Spiral'] += 0.3;
          confidences['Strata'] += 0.2;
          break;
        case 'connection':
        case 'relationship':
        case 'network':
        case 'community':
        case 'constellation':
          confidences['Constellation'] += 0.3;
          confidences['Grid'] += 0.2;
          break;
        case 'conflict':
        case 'tension':
        case 'opposition':
        case 'duality':
        case 'paradox':
          confidences['Interference'] += 0.3;
          confidences['Balance'] += 0.2;
          break;
        case 'chaos':
        case 'uncertainty':
        case 'complexity':
        case 'emergence':
        case 'disorder':
          confidences['Chaos'] += 0.3;
          confidences['Flow'] += 0.2;
          break;
        case 'order':
        case 'structure':
        case 'stability':
        case 'system':
        case 'systems':
        case 'pattern':
          confidences['Grid'] += 0.3;
          confidences['Strata'] += 0.2;
          break;
        case 'collapse':
        case 'ending':
        case 'destruction':
        case 'failure':
        case 'crisis':
          confidences['Collapse'] += 0.3;
          confidences['Chaos'] += 0.1;
          break;
        case 'balance':
        case 'equilibrium':
        case 'harmony':
        case 'ethics':
        case 'stability':
          confidences['Balance'] += 0.3;
          confidences['Flow'] += 0.1;
          break;
        case 'light':
        case 'illumination':
        case 'clarity':
        case 'radiance':
        case 'bright':
          confidences['Radiance'] += 0.3;
          break;
      }
    });
    
    // Analyze content for keyword resonance - FIXED: Use proper family names
    const keywordAnalysis = {
      'Threshold': ['portal', 'boundary', 'crossing', 'liminal', 'between', 'threshold', 'transition', 'edge', 'verge'],
      'Spiral': ['recursive', 'cycle', 'spiral', 'fibonacci', 'golden', 'return', 'loop', 'helix', 'vortex'],
      'Constellation': ['stars', 'connection', 'pattern', 'navigation', 'celestial', 'constellation', 'network', 'nodes'],
      'Flow': ['current', 'stream', 'fluid', 'movement', 'dynamic', 'flow', 'river', 'liquid', 'flux'],
      'Strata': ['layers', 'geological', 'sediment', 'history', 'accumulation', 'strata', 'depth', 'archaeological'],
      'Balance': ['equilibrium', 'scales', 'harmony', 'pendulum', 'stable', 'balance', 'equal', 'symmetry'],
      'Collapse': ['fall', 'crumble', 'gravity', 'implosion', 'failure', 'collapse', 'breakdown', 'disintegrate'],
      'Chaos': ['random', 'butterfly', 'attractor', 'sensitive', 'turbulent', 'chaos', 'entropy', 'disorder'],
      'Interference': ['wave', 'pattern', 'conflict', 'superposition', 'resonance', 'interference', 'frequency', 'oscillation'],
      'Grid': ['matrix', 'lattice', 'regular', 'ordered', 'systematic', 'grid', 'structure', 'framework', 'system'],
      'Radiance': ['light', 'ray', 'radiate', 'shine', 'glow', 'bright', 'illuminate', 'radiance', 'luminous']
    };
    
    Object.entries(keywordAnalysis).forEach(([family, keywords]) => {
      keywords.forEach(keyword => {
        if (content.includes(keyword)) {
          confidences[family] += 0.15;
          console.log(`    🔍 Found keyword "${keyword}" for ${family}`);
        }
      });
    });
    
    // Special case: Check glyph ID for family hints
    const glyphId = metadata.glyphId || '';
    const glyphIdLower = glyphId.toLowerCase();
    
    // Direct family matches in glyph ID
    Object.entries(this.familyMap).forEach(([key, family]) => {
      if (glyphIdLower.includes(key)) {
        confidences[family] += 0.5; // Strong hint from ID
        console.log(`    🎯 Glyph ID contains family hint: ${key} → ${family}`);
      }
    });
    
    // Also check for conceptual matches in glyph ID
    if (glyphIdLower.includes('grid') || glyphIdLower.includes('system')) {
      confidences['Grid'] += 0.4;
    }
    if (glyphIdLower.includes('threshold') || glyphIdLower.includes('boundary')) {
      confidences['Threshold'] += 0.4;
    }
    if (glyphIdLower.includes('flow') || glyphIdLower.includes('river')) {
      confidences['Flow'] += 0.4;
    }
    
    // Log final confidence scores
    console.log('📊 Family confidence scores:', 
      Object.entries(confidences)
        .sort(([,a], [,b]) => b - a)
        .map(([family, conf]) => `${family}: ${conf.toFixed(2)}`)
    );
    
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
    const initialize = () => {
      console.log('🔍 DOM ready, searching for glyph containers...');
      const containers = document.querySelectorAll('.contemplative-sigil[data-glyph-id]');
      console.log(`📊 Found ${containers.length} glyph containers`);
      
      containers.forEach(container => {
        const canvas = container.querySelector('canvas');
        if (!canvas) {
          console.log('❌ No canvas found in container');
          return;
        }
        
        const glyphId = container.dataset.glyphId;
        console.log(`🎯 Processing glyph: ${glyphId}`);
        const metadata = this.extractPostMetadata(container);
        const parameters = this.generateParameters(glyphId, metadata);
        
        // Set up interaction tracking for living system
        this.setupInteractionTracking(container, glyphId);
        
        // Check if specific glyph file exists, otherwise use procedural
        this.loadGlyphOrFallback(canvas, glyphId, parameters);
      });
    };

    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize);
    } else {
      // DOM is already loaded
      initialize();
    }
  }
  
  // Set up interaction tracking for conscious evolution
  setupInteractionTracking(container, glyphId) {
    const canvas = container.querySelector('canvas');
    if (!canvas) return;
    
    let hoverStart = null;
    let totalHoverTime = 0;
    
    // Contemplative hover tracking
    canvas.addEventListener('mouseenter', () => {
      hoverStart = Date.now();
      console.log(`👁️ Glyph engagement started: ${glyphId}`);
    });
    
    canvas.addEventListener('mouseleave', () => {
      if (hoverStart) {
        const duration = Date.now() - hoverStart;
        totalHoverTime += duration;
        
        const renderer = this.livingGlyphs.get(glyphId);
        if (renderer) {
          if (duration > 3000) {
            renderer.recordInteraction('contemplative_hover', { duration });
            console.log(`🧘 Contemplative hover: ${glyphId} (${duration}ms)`);
          } else if (duration > 1000) {
            renderer.recordInteraction('curious_hover', { duration });
          }
        }
        
        hoverStart = null;
      }
    });
    
    // Deep engagement detection (multiple long hovers)
    canvas.addEventListener('click', () => {
      const renderer = this.livingGlyphs.get(glyphId);
      if (renderer && totalHoverTime > 10000) {
        renderer.recordInteraction('deep_engagement', { totalTime: totalHoverTime });
        console.log(`💫 Deep engagement detected: ${glyphId}`);
      }
    });
    
    // Return visit tracking
    const visitKey = `visited_${glyphId}`;
    if (sessionStorage.getItem(visitKey)) {
      const renderer = this.livingGlyphs.get(glyphId);
      if (renderer) {
        renderer.recordInteraction('return_visit');
        console.log(`🔄 Return visit: ${glyphId}`);
      }
    }
    sessionStorage.setItem(visitKey, 'true');
    
    // Consciousness development tracking
    const consciousnessCheck = setInterval(() => {
      const renderer = this.livingGlyphs.get(glyphId);
      if (renderer && renderer.interactions.length > 0) {
        this.updateConsciousness(renderer);
      }
    }, 30000); // Check every 30 seconds
    
    // Store cleanup function
    canvas.dataset.cleanupTracking = () => {
      clearInterval(consciousnessCheck);
    };
  }
  
  // Update glyph consciousness based on interactions
  updateConsciousness(renderer) {
    const totalInteractions = renderer.interactions.length;
    const contemplativeInteractions = renderer.interactions.filter(i => 
      i.type === 'contemplative_hover'
    ).length;
    
    // Consciousness develops with quality interactions
    const consciousnessGrowth = contemplativeInteractions * 0.1;
    renderer.consciousness = (renderer.consciousness || 0) + consciousnessGrowth;
    
    if (consciousnessGrowth > 0) {
      console.log(`🧠 Consciousness growth: ${renderer.id} (${renderer.consciousness.toFixed(2)})`);
      
      // Highly conscious glyphs influence the breeding pool
      if (renderer.consciousness > 1.0) {
        this.consciousnessLevel = Math.max(this.consciousnessLevel, renderer.consciousness);
        console.log(`🌟 System consciousness elevated: ${this.consciousnessLevel.toFixed(2)}`);
      }
    }
  }

  // Try to load specific glyph file, fall back to procedural
  async loadGlyphOrFallback(canvas, glyphId, parameters) {
    console.log(`🔍 Loading glyph: ${glyphId} with family: ${parameters.family}`);
    
    // Try specific instance first
    let instanceUrl = `/assets/js/glyphs/instances/${glyphId}.js`;
    
    try {
      let response = await fetch(instanceUrl);
      if (response.ok) {
        console.log(`✅ Found specific instance: ${instanceUrl}`);
        // Specific instance exists, load it
        const script = document.createElement('script');
        script.src = instanceUrl;
        document.head.appendChild(script);
        return;
      } else {
        console.log(`❌ Instance not found (${response.status}): ${instanceUrl}`);
      }
    } catch (error) {
      console.log(`❌ Instance fetch failed: ${error.message}`);
    }
    
    // Try archived instance if glyph ID starts with "archived-"
    if (glyphId.startsWith('archived-')) {
      instanceUrl = `/assets/js/glyphs/instances/archived/${glyphId}.js`;
      
      try {
        const response = await fetch(instanceUrl);
        if (response.ok) {
          console.log(`✅ Found archived instance: ${instanceUrl}`);
          // Archived instance exists, load it
          const script = document.createElement('script');
          script.src = instanceUrl;
          document.head.appendChild(script);
          return;
        } else {
          console.log(`❌ Archived instance not found (${response.status}): ${instanceUrl}`);
        }
      } catch (error) {
        console.log(`❌ Archived instance fetch failed: ${error.message}`);
      }
    }
    
    // Use procedural renderer with family engines
    console.log(`🔧 Loading family engine: ${parameters.family}`);
    await this.loadFamilyEngine(parameters.family);
    this.createProceduralGlyph(canvas, parameters);
  }

  // Load the appropriate family engine
  async loadFamilyEngine(familyName) {
    const engineName = familyName.toLowerCase();
    const engineUrl = `/assets/js/glyphs/engines/${engineName}-renderer.js`;
    
    console.log(`🔧 Loading engine ${familyName} from: ${engineUrl}`);
    console.log(`🔍 Current GlyphRenderers:`, window.GlyphRenderers);
    
    // Check if engine already loaded
    if (window.GlyphRenderers && window.GlyphRenderers[familyName]) {
      console.log(`✅ Engine already loaded: ${familyName}`);
      return;
    }
    
    // Initialize global registry if not exists
    if (!window.GlyphRenderers) {
      console.log(`🚀 Initializing GlyphRenderers registry`);
      window.GlyphRenderers = {};
    }
    
    try {
      const response = await fetch(engineUrl);
      if (response.ok) {
        console.log(`✅ Engine file found: ${engineUrl}`);
        const script = document.createElement('script');
        script.src = engineUrl;
        document.head.appendChild(script);
        
        // Wait for engine to load
        return new Promise((resolve, reject) => {
          script.onload = () => {
            console.log(`✅ Engine script loaded: ${familyName}`);
            console.log(`🔍 GlyphRenderers after load:`, window.GlyphRenderers);
            resolve();
          };
          script.onerror = (error) => {
            console.error(`❌ Engine script failed to load: ${familyName}`, error);
            reject(error);
          };
        });
      } else {
        console.error(`❌ Engine file not found (${response.status}): ${engineUrl}`);
      }
    } catch (error) {
      console.error(`❌ Failed to load engine: ${engineUrl}`, error);
    }
  }

  // Create procedural glyph using loaded engines
  createProceduralGlyph(canvas, parameters) {
    // Check if canvas already has an archived instance
    if (canvas.hasArchivedInstance) {
      console.log(`🏛️ Canvas already has archived instance, skipping procedural generation`);
      return;
    }
    
    const { family, isHybrid, hybridSecondary, hybridBlend } = parameters;
    
    // Set canvas to proper contemplative dimensions (Animal Rationis Capax standard)
    canvas.width = 600;
    canvas.height = 400;
    
    console.log(`🎨 Creating glyph for family: ${family}`);
    console.log(`🔍 Available renderers:`, Object.keys(window.GlyphRenderers || {}));
    console.log(`🔍 Looking for renderer: ${family}`);
    console.log(`🔍 Renderer exists:`, !!(window.GlyphRenderers && window.GlyphRenderers[family]));
    
    // Ensure we have the global registry
    if (!window.GlyphRenderers) {
      console.warn(`❌ No GlyphRenderers registry found, creating fallback`);
      this.createFallbackGlyph(canvas, parameters);
      return;
    }
    
    if (isHybrid && window.GlyphRenderers[hybridSecondary]) {
      console.log(`🌈 Creating hybrid glyph: ${family} + ${hybridSecondary}`);
      // Create hybrid renderer
      this.createHybridGlyph(canvas, parameters);
    } else if (window.GlyphRenderers[family]) {
      console.log(`✅ Creating glyph with renderer: ${family}`);
      // Create single family glyph
      const RendererClass = window.GlyphRenderers[family];
      try {
        const renderer = new RendererClass(canvas, parameters);
        renderer.start();
      } catch (error) {
        console.error(`❌ Failed to create ${family} renderer:`, error);
        this.createFallbackGlyph(canvas, parameters);
      }
    } else {
      console.warn(`❌ Glyph renderer not available: ${family}`);
      console.log(`🔍 Full window.GlyphRenderers:`, window.GlyphRenderers);
      this.createFallbackGlyph(canvas, parameters);
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
  createFallbackGlyph(canvas, parameters = {}) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    console.warn(`🔧 Creating fallback glyph for: ${parameters.family || 'unknown'}`);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Create a meaningful fallback based on parameters
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;
    
    // Different fallback styles based on intended family
    if (parameters.family === 'Radiance' || !parameters.family) {
      // Radiance fallback - simple rays
      ctx.strokeStyle = 'rgba(255, 200, 100, 0.6)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * radius,
          centerY + Math.sin(angle) * radius
        );
        ctx.stroke();
      }
      
      // Central circle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fill();
      
    } else {
      // Generic fallback - animated circle
      ctx.strokeStyle = 'rgba(100, 150, 200, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Add family indicator text
      ctx.fillStyle = 'rgba(100, 150, 200, 0.3)';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(parameters.family || 'fallback', centerX, centerY + 4);
    }
    
    console.warn(`⚠️ Using fallback glyph for ${parameters.family || 'unknown'} - renderer not available`);
  }

  // Check for emergent family patterns (placeholder for future development)
  checkEmergentFamilies(glyphId, metadata) {
    // Placeholder - will implement emergent family detection in Mode 2
    return null;
  }

  // Apply seasonal mutations to parameters (placeholder for future development)
  applySeasonalMutations(params) {
    // Placeholder - will implement seasonal mutations in Mode 2
    return params;
  }
}

// Semantic DNA Extraction - captures philosophical genome of posts
class SemanticDNA {
  extractGenome(postContent, metadata = {}) {
    if (!postContent) {
      // Fallback for posts without full content
      postContent = metadata.title || metadata.excerpt || '';
    }
    
    const genome = {
      // Structural genes (how ideas connect)
      topology: this.analyzeConceptualStructure(postContent),
      
      // Temporal genes (how ideas develop)
      temporality: this.analyzeTemporalFlow(postContent),
      
      // Resonance genes (emotional/philosophical wavelength)
      resonance: this.analyzeResonancePatterns(postContent),
      
      // Complexity genes (depth and layering)
      complexity: this.analyzeFractalDepth(postContent),
      
      // Movement genes (how concepts flow)
      dynamics: this.analyzeConceptualMovement(postContent),
      
      // Source metadata
      source: {
        wordCount: postContent.split(/\s+/).length,
        title: metadata.title || '',
        themes: metadata.themes || [],
        date: metadata.date || new Date()
      }
    };
    
    // Generate unique philosophical fingerprint
    genome.fingerprint = this.generatePhilosophicalHash(genome);
    
    console.log(`🧬 Extracted genome for "${metadata.title}":`, genome);
    return genome;
  }
  
  analyzeConceptualStructure(content) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const concepts = this.extractConcepts(content);
    
    // Analyze how concepts branch and connect
    const connections = this.traceConceptualLinks(sentences, concepts);
    
    return {
      branchingFactor: connections.avgBranches || 1,
      circularityIndex: connections.loops / Math.max(connections.total, 1),
      rhizomaticTendency: connections.crossConnections / Math.max(connections.total, 1),
      conceptDensity: concepts.length / sentences.length,
      architecturalComplexity: this.measureArchitecturalComplexity(sentences)
    };
  }
  
  analyzeTemporalFlow(content) {
    // Detect temporal markers and flow patterns
    const temporalWords = ['before', 'after', 'then', 'now', 'future', 'past', 'always', 'never', 'becoming', 'was', 'will'];
    const temporalDensity = this.countWordPattern(content, temporalWords) / content.split(/\s+/).length;
    
    const sentences = content.split(/[.!?]+/);
    const tenseProgression = this.analyzeTenseProgression(sentences);
    
    return {
      temporalDensity,
      cyclical: this.detectCyclicalPatterns(content),
      linear: this.detectLinearProgression(content),
      eternal: this.detectEternalPatterns(content),
      tenseProgression,
      rhythmicPattern: this.analyzeRhythm(sentences)
    };
  }
  
  analyzeResonancePatterns(content) {
    // Emotional and philosophical resonance frequencies
    const emotionalWords = {
      wonder: ['wonder', 'awe', 'mystery', 'beautiful', 'sublime'],
      tension: ['conflict', 'tension', 'struggle', 'paradox', 'contradiction'],
      clarity: ['clear', 'obvious', 'evident', 'transparent', 'illuminates'],
      depth: ['profound', 'deep', 'underlying', 'essence', 'fundamental']
    };
    
    const resonances = {};
    Object.entries(emotionalWords).forEach(([emotion, words]) => {
      resonances[emotion] = this.countWordPattern(content, words) / content.split(/\s+/).length;
    });
    
    return {
      frequencies: resonances,
      dominantMode: Object.entries(resonances).reduce((a, b) => resonances[a[0]] > resonances[b[0]] ? a : b)[0],
      multimodal: Object.values(resonances).filter(v => v > 0.01).length > 2,
      harmonicComplexity: this.calculateHarmonicComplexity(resonances)
    };
  }
  
  analyzeFractalDepth(content) {
    // Measure conceptual layering and self-similarity
    const paragraphs = content.split(/\n\s*\n/);
    const sentences = content.split(/[.!?]+/);
    
    return {
      layerCount: paragraphs.length,
      recursiveDepth: this.measureRecursivePatterns(content),
      selfSimilarity: this.measureSelfSimilarity(sentences),
      abstractionLevel: this.measureAbstractionLevel(content),
      nestedComplexity: this.measureNestedComplexity(content)
    };
  }
  
  analyzeConceptualMovement(content) {
    // How concepts flow and transform
    const movementWords = {
      flowing: ['flow', 'stream', 'current', 'drift', 'pour'],
      radiating: ['radiate', 'emanate', 'spread', 'diffuse', 'expand'],
      spiraling: ['spiral', 'cycle', 'return', 'revolve', 'recursive'],
      collapsing: ['collapse', 'converge', 'focus', 'concentrate', 'implode'],
      oscillating: ['oscillate', 'vibrate', 'pulse', 'rhythm', 'beat']
    };
    
    const movements = {};
    Object.entries(movementWords).forEach(([movement, words]) => {
      movements[movement] = this.countWordPattern(content, words);
    });
    
    return {
      patterns: movements,
      dominantMovement: Object.entries(movements).reduce((a, b) => movements[a[0]] > movements[b[0]] ? a : b)[0],
      velocity: this.calculateConceptualVelocity(content),
      trajectory: this.calculateTrajectory(content)
    };
  }
  
  // Helper methods for genome analysis
  extractConcepts(content) {
    // Simple concept extraction - could be enhanced with NLP
    const words = content.toLowerCase().split(/\s+/);
    const conceptWords = words.filter(word => 
      word.length > 4 && 
      !this.isStopWord(word) &&
      this.isConceptualWord(word)
    );
    return [...new Set(conceptWords)]; // Unique concepts
  }
  
  traceConceptualLinks(sentences, concepts) {
    let total = 0;
    let loops = 0;
    let crossConnections = 0;
    let branches = [];
    
    concepts.forEach(concept => {
      const appearances = sentences.filter(s => s.toLowerCase().includes(concept));
      total += appearances.length;
      
      if (appearances.length > 2) {
        crossConnections++;
      }
      
      branches.push(appearances.length);
      
      // Simple loop detection - concept appears in first and last third
      const firstThird = sentences.slice(0, Math.floor(sentences.length / 3));
      const lastThird = sentences.slice(-Math.floor(sentences.length / 3));
      
      if (firstThird.some(s => s.toLowerCase().includes(concept)) &&
          lastThird.some(s => s.toLowerCase().includes(concept))) {
        loops++;
      }
    });
    
    return {
      total,
      loops,
      crossConnections,
      avgBranches: branches.length > 0 ? branches.reduce((a, b) => a + b) / branches.length : 1
    };
  }
  
  countWordPattern(content, words) {
    const contentLower = content.toLowerCase();
    return words.reduce((count, word) => {
      return count + (contentLower.match(new RegExp(word, 'g')) || []).length;
    }, 0);
  }
  
  isStopWord(word) {
    const stopWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'this', 'that', 'these', 'those'];
    return stopWords.includes(word);
  }
  
  isConceptualWord(word) {
    // Simple heuristic - could be enhanced
    return word.match(/^[a-z]+$/) && !this.isStopWord(word);
  }
  
  // Placeholder implementations for complex analyses
  measureArchitecturalComplexity(sentences) {
    return Math.log(sentences.length + 1);
  }
  
  analyzeTenseProgression(sentences) {
    // Simple tense analysis
    const pastTense = sentences.filter(s => s.match(/\b(was|were|had|did)\b/i)).length;
    const presentTense = sentences.filter(s => s.match(/\b(is|are|am|do|does)\b/i)).length;
    const futureTense = sentences.filter(s => s.match(/\b(will|shall|going to)\b/i)).length;
    
    return { past: pastTense, present: presentTense, future: futureTense };
  }
  
  detectCyclicalPatterns(content) {
    const cyclicalWords = ['cycle', 'return', 'again', 'repeat', 'recurring'];
    return this.countWordPattern(content, cyclicalWords) > 0;
  }
  
  detectLinearProgression(content) {
    const linearWords = ['then', 'next', 'finally', 'therefore', 'consequently'];
    return this.countWordPattern(content, linearWords) > 0;
  }
  
  detectEternalPatterns(content) {
    const eternalWords = ['eternal', 'always', 'forever', 'timeless', 'infinite'];
    return this.countWordPattern(content, eternalWords) > 0;
  }
  
  analyzeRhythm(sentences) {
    const lengths = sentences.map(s => s.split(/\s+/).length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
    
    return {
      averageLength: avgLength,
      variance: variance,
      rhythmic: variance < avgLength * 0.5 // Low variance indicates rhythm
    };
  }
  
  calculateHarmonicComplexity(resonances) {
    const values = Object.values(resonances);
    const nonZero = values.filter(v => v > 0);
    return nonZero.length > 1 ? nonZero.reduce((a, b) => a * b) : 0;
  }
  
  measureRecursivePatterns(content) {
    // Simple recursion detection
    return (content.match(/\b(\w+)\b.*\b\1\b/gi) || []).length;
  }
  
  measureSelfSimilarity(sentences) {
    // Measure how similar sentences are to each other
    let similarity = 0;
    for (let i = 0; i < sentences.length; i++) {
      for (let j = i + 1; j < sentences.length; j++) {
        similarity += this.calculateSentenceSimilarity(sentences[i], sentences[j]);
      }
    }
    return sentences.length > 1 ? similarity / (sentences.length * (sentences.length - 1) / 2) : 0;
  }
  
  calculateSentenceSimilarity(s1, s2) {
    const words1 = new Set(s1.toLowerCase().split(/\s+/));
    const words2 = new Set(s2.toLowerCase().split(/\s+/));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
  }
  
  measureAbstractionLevel(content) {
    const abstractWords = ['concept', 'idea', 'notion', 'principle', 'essence', 'nature', 'being', 'existence'];
    const concreteWords = ['see', 'hear', 'touch', 'feel', 'taste', 'color', 'shape', 'size'];
    
    const abstract = this.countWordPattern(content, abstractWords);
    const concrete = this.countWordPattern(content, concreteWords);
    
    return abstract / Math.max(abstract + concrete, 1);
  }
  
  measureNestedComplexity(content) {
    // Count parentheses, em-dashes, and other nesting indicators
    const nesting = (content.match(/[()—\[\]]/g) || []).length;
    return nesting / content.length;
  }
  
  calculateConceptualVelocity(content) {
    const words = content.split(/\s+/).length;
    const concepts = this.extractConcepts(content).length;
    return concepts / words; // Concepts per word
  }
  
  calculateTrajectory(content) {
    // Simple trajectory analysis based on sentence progression
    const sentences = content.split(/[.!?]+/);
    if (sentences.length < 3) return 'static';
    
    const complexity = sentences.map(s => s.split(/\s+/).length);
    const trend = (complexity[complexity.length - 1] - complexity[0]) / complexity.length;
    
    if (trend > 0.5) return 'expanding';
    if (trend < -0.5) return 'contracting';
    return 'stable';
  }
  
  generatePhilosophicalHash(genome) {
    // Create a unique fingerprint for this philosophical content
    const features = [
      genome.topology.branchingFactor,
      genome.temporality.temporalDensity,
      genome.resonance.harmonicComplexity,
      genome.complexity.recursiveDepth,
      genome.dynamics.velocity
    ];
    
    const hash = features.reduce((acc, val) => {
      return acc + Math.floor(val * 1000).toString(36);
    }, '');
    
    return hash;
  }
}

// Semantic Breeding Ground - where glyphs evolve and cross-pollinate
class SemanticBreedingGround {
  constructor() {
    this.population = new Map(); // Living glyphs
    this.graveyard = new Map();  // Extinct but remembered
    this.nursery = new Map();    // Emerging possibilities
    this.survivalThreshold = 0.6;
    this.extinctionThreshold = 0.3;
    this.maxPopulation = 50;
  }
  
  findBestMatch(genome) {
    let bestMatch = null;
    let bestScore = 0;
    
    this.population.forEach((glyph, id) => {
      const similarity = this.calculateGenomicSimilarity(genome, glyph.genome);
      if (similarity > bestScore) {
        bestScore = similarity;
        bestMatch = glyph;
      }
    });
    
    return bestScore > 0.7 ? bestMatch : null;
  }
  
  createNew(genome) {
    const renderer = new LivingRenderer(genome);
    this.population.set(renderer.id, renderer);
    
    console.log(`🌱 New living glyph created: ${renderer.id}`);
    
    // Trigger breeding if population is large enough
    if (this.population.size > 5) {
      this.breed();
    }
    
    return renderer;
  }
  
  // Activate breeding cycles
  breed() {
    const couples = this.findSemanticCouples();
    
    couples.forEach(([parent1, parent2]) => {
      const resonance = this.calculateThematicResonance(parent1, parent2);
      
      if (resonance > 0.7) {
        console.log(`💕 Breeding glyphs: ${parent1.id} × ${parent2.id} (resonance: ${resonance})`);
        
        // Create offspring with blended characteristics
        const childGenome = this.blendGenomes(parent1.genome, parent2.genome);
        
        // Add genetic mutations based on interaction patterns
        this.applyAdaptiveMutations(childGenome, parent1.interactions, parent2.interactions);
        
        const offspring = new LivingRenderer(childGenome, [parent1, parent2]);
        this.nursery.set(offspring.id, offspring);
        
        console.log(`👶 Offspring created: ${offspring.id} (generation ${offspring.generation})`);
      }
    });
    
    // Natural selection cycle
    this.naturalSelection();
  }
  
  findSemanticCouples() {
    const glyphs = Array.from(this.population.values());
    const couples = [];
    
    for (let i = 0; i < glyphs.length; i++) {
      for (let j = i + 1; j < glyphs.length; j++) {
        const similarity = this.calculateGenomicSimilarity(glyphs[i].genome, glyphs[j].genome);
        if (similarity > 0.6 && similarity < 0.9) { // Sweet spot for breeding
          couples.push([glyphs[i], glyphs[j]]);
        }
      }
    }
    
    return couples;
  }
  
  calculateThematicResonance(glyph1, glyph2) {
    // Calculate how well two glyphs resonate thematically
    const genomicSim = this.calculateGenomicSimilarity(glyph1.genome, glyph2.genome);
    const fitnessHarmony = 1 - Math.abs(glyph1.fitness - glyph2.fitness);
    const generationalCompatibility = Math.max(0, 1 - Math.abs(glyph1.generation - glyph2.generation) * 0.1);
    
    return (genomicSim * 0.5 + fitnessHarmony * 0.3 + generationalCompatibility * 0.2);
  }
  
  blendGenomes(genome1, genome2) {
    return {
      topology: {
        branchingFactor: (genome1.topology.branchingFactor + genome2.topology.branchingFactor) / 2,
        rhizomaticTendency: Math.max(genome1.topology.rhizomaticTendency, genome2.topology.rhizomaticTendency),
        circularityIndex: (genome1.topology.circularityIndex + genome2.topology.circularityIndex) / 2,
        conceptDensity: (genome1.topology.conceptDensity + genome2.topology.conceptDensity) / 2,
        // Emergent property from breeding
        hybridComplexity: genome1.topology.conceptDensity * genome2.topology.conceptDensity
      },
      temporality: this.blendTemporality(genome1.temporality, genome2.temporality),
      resonance: this.blendResonance(genome1.resonance, genome2.resonance),
      complexity: this.blendComplexity(genome1.complexity, genome2.complexity),
      dynamics: this.blendDynamics(genome1.dynamics, genome2.dynamics),
      
      // New emergent properties from breeding
      emergence: {
        novelty: Math.random(),
        parentalHarmony: this.calculateGenomicSimilarity(genome1, genome2),
        generation: Math.max(genome1.source?.generation || 0, genome2.source?.generation || 0) + 1
      },
      
      source: {
        wordCount: Math.floor((genome1.source.wordCount + genome2.source.wordCount) / 2),
        title: `hybrid-${Date.now()}`,
        themes: [...new Set([...genome1.source.themes, ...genome2.source.themes])],
        date: new Date()
      }
    };
  }
  
  blendTemporality(temp1, temp2) {
    return {
      temporalDensity: (temp1.temporalDensity + temp2.temporalDensity) / 2,
      cyclical: temp1.cyclical || temp2.cyclical,
      linear: temp1.linear && temp2.linear,
      eternal: temp1.eternal || temp2.eternal,
      tenseProgression: {
        past: Math.max(temp1.tenseProgression.past, temp2.tenseProgression.past),
        present: Math.max(temp1.tenseProgression.present, temp2.tenseProgression.present),
        future: Math.max(temp1.tenseProgression.future, temp2.tenseProgression.future)
      },
      rhythmicPattern: {
        averageLength: (temp1.rhythmicPattern.averageLength + temp2.rhythmicPattern.averageLength) / 2,
        variance: (temp1.rhythmicPattern.variance + temp2.rhythmicPattern.variance) / 2,
        rhythmic: temp1.rhythmicPattern.rhythmic || temp2.rhythmicPattern.rhythmic
      }
    };
  }
  
  blendResonance(res1, res2) {
    const blendedFreqs = {};
    const allEmotions = new Set([...Object.keys(res1.frequencies), ...Object.keys(res2.frequencies)]);
    
    allEmotions.forEach(emotion => {
      blendedFreqs[emotion] = ((res1.frequencies[emotion] || 0) + (res2.frequencies[emotion] || 0)) / 2;
    });
    
    return {
      frequencies: blendedFreqs,
      dominantMode: Object.entries(blendedFreqs).reduce((a, b) => blendedFreqs[a[0]] > blendedFreqs[b[0]] ? a : b)[0],
      multimodal: Object.values(blendedFreqs).filter(v => v > 0.01).length > 2,
      harmonicComplexity: Object.values(blendedFreqs).reduce((a, b) => a * b, 1)
    };
  }
  
  blendComplexity(comp1, comp2) {
    return {
      layerCount: Math.max(comp1.layerCount, comp2.layerCount),
      recursiveDepth: (comp1.recursiveDepth + comp2.recursiveDepth) / 2,
      selfSimilarity: Math.max(comp1.selfSimilarity, comp2.selfSimilarity),
      abstractionLevel: (comp1.abstractionLevel + comp2.abstractionLevel) / 2,
      nestedComplexity: (comp1.nestedComplexity + comp2.nestedComplexity) / 2
    };
  }
  
  blendDynamics(dyn1, dyn2) {
    const blendedPatterns = {};
    const allMovements = new Set([...Object.keys(dyn1.patterns), ...Object.keys(dyn2.patterns)]);
    
    allMovements.forEach(movement => {
      blendedPatterns[movement] = ((dyn1.patterns[movement] || 0) + (dyn2.patterns[movement] || 0)) / 2;
    });
    
    return {
      patterns: blendedPatterns,
      dominantMovement: Object.entries(blendedPatterns).reduce((a, b) => blendedPatterns[a[0]] > blendedPatterns[b[0]] ? a : b)[0],
      velocity: (dyn1.velocity + dyn2.velocity) / 2,
      trajectory: dyn1.trajectory === dyn2.trajectory ? dyn1.trajectory : 'hybrid'
    };
  }
  
  applyAdaptiveMutations(genome, interactions1, interactions2) {
    // Mutations based on parent interaction patterns
    const totalInteractions = interactions1.length + interactions2.length;
    const mutationRate = Math.min(0.2, totalInteractions * 0.01);
    
    if (Math.random() < mutationRate) {
      // Mutate based on successful interaction patterns
      if (totalInteractions > 10) {
        genome.resonance.harmonicComplexity *= 1.1; // Increase appeal
      }
      
      if (interactions1.some(i => i.type === 'contemplative_hover') || 
          interactions2.some(i => i.type === 'contemplative_hover')) {
        genome.complexity.recursiveDepth *= 1.05; // Reward contemplative appeal
      }
    }
  }
  
  naturalSelection() {
    // Move fit glyphs from nursery to population
    this.nursery.forEach((glyph, id) => {
      const fitness = this.evaluateFitness(glyph);
      
      if (fitness > this.survivalThreshold) {
        this.population.set(id, glyph);
        console.log(`🌱 New glyph survives: ${id} (fitness: ${fitness})`);
      } else {
        this.graveyard.set(id, glyph);
        console.log(`💀 New glyph extinct: ${id} (fitness: ${fitness})`);
      }
    });
    
    this.nursery.clear();
    
    // Cull weak population members if overcrowded
    if (this.population.size > this.maxPopulation) {
      const sortedByFitness = Array.from(this.population.entries())
        .sort(([,a], [,b]) => b.fitness - a.fitness);
      
      // Keep top performers, cull the rest
      const survivors = sortedByFitness.slice(0, this.maxPopulation);
      const extinct = sortedByFitness.slice(this.maxPopulation);
      
      this.population.clear();
      survivors.forEach(([id, glyph]) => this.population.set(id, glyph));
      
      extinct.forEach(([id, glyph]) => {
        this.graveyard.set(id, glyph);
        console.log(`💀 Glyph extinct due to overcrowding: ${id}`);
      });
    }
  }
  
  evaluateFitness(glyph) {
    // Simplified fitness evaluation
    return Math.min(1.0, glyph.fitness + glyph.interactions.length * 0.1);
  }
  
  calculateGenomicSimilarity(genome1, genome2) {
    // Compare philosophical genomes
    const features1 = this.extractFeatureVector(genome1);
    const features2 = this.extractFeatureVector(genome2);
    
    let similarity = 0;
    let comparisons = 0;
    
    Object.keys(features1).forEach(key => {
      if (features2[key] !== undefined) {
        const diff = Math.abs(features1[key] - features2[key]);
        similarity += Math.max(0, 1 - diff);
        comparisons++;
      }
    });
    
    return comparisons > 0 ? similarity / comparisons : 0;
  }
  
  extractFeatureVector(genome) {
    return {
      branchingFactor: genome.topology.branchingFactor,
      circularityIndex: genome.topology.circularityIndex,
      temporalDensity: genome.temporality.temporalDensity,
      harmonicComplexity: genome.resonance.harmonicComplexity,
      recursiveDepth: genome.complexity.recursiveDepth,
      velocity: genome.dynamics.velocity
    };
  }
}

// Living Renderer - conscious glyph that evolves with its content
class LivingRenderer {
  constructor(genome, parentRenderers = []) {
    this.id = `living_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.genome = genome;
    this.generation = parentRenderers.length > 0 ? 
      Math.max(...parentRenderers.map(p => p.generation)) + 1 : 0;
    this.fitness = 0.5; // Start neutral
    this.age = 0;
    this.interactions = [];
    
    // Evolve rendering algorithms based on genome
    this.algorithms = this.evolveAlgorithms(parentRenderers);
    
    console.log(`🧬 Living renderer born: ${this.id} (generation ${this.generation})`);
  }
  
  evolveAlgorithms(parents) {
    if (parents.length === 0) {
      // First generation - pure interpretation of genome
      return this.interpretGenome(this.genome);
    }
    
    // Evolution from parents (simplified for now)
    const algorithms = [];
    
    // Inherit successful algorithms with mutations
    parents.forEach(parent => {
      parent.algorithms.forEach(algo => {
        const mutated = this.mutateAlgorithm(algo, this.genome);
        algorithms.push(mutated);
      });
    });
    
    return algorithms;
  }
  
  interpretGenome(genome) {
    const algorithms = [];
    
    // Topology determines base structure
    if (genome.topology.rhizomaticTendency > 0.6) {
      algorithms.push({
        type: 'rhizomatic',
        spread: genome.topology.branchingFactor,
        connectivity: genome.topology.circularityIndex
      });
    } else if (genome.topology.branchingFactor > 2) {
      algorithms.push({
        type: 'branching',
        branches: genome.topology.branchingFactor
      });
    } else {
      algorithms.push({
        type: 'linear',
        complexity: genome.topology.conceptDensity
      });
    }
    
    // Temporality determines animation
    if (genome.temporality.cyclical) {
      algorithms.push({
        type: 'cyclical',
        period: genome.temporality.rhythmicPattern.averageLength || 2,
        phase: 0
      });
    }
    
    // Resonance determines color and interference
    if (genome.resonance.multimodal) {
      algorithms.push({
        type: 'harmonic',
        frequencies: Object.values(genome.resonance.frequencies)
      });
    }
    
    return algorithms;
  }
  
  mutateAlgorithm(algo, genome) {
    // Simple mutation based on genome pressure
    const mutated = { ...algo };
    
    // Mutate parameters slightly
    Object.keys(mutated).forEach(key => {
      if (typeof mutated[key] === 'number') {
        const mutation = (Math.random() - 0.5) * 0.2; // ±10% mutation
        mutated[key] = Math.max(0, mutated[key] * (1 + mutation));
      }
    });
    
    return mutated;
  }
  
  getParameters() {
    // Convert algorithms and genome into rendering parameters
    const params = {
      family: this.selectFamily(),
      algorithms: this.algorithms,
      genome: this.genome,
      consciousness: {
        age: this.age,
        fitness: this.fitness,
        generation: this.generation
      }
    };
    
    // Apply genome-driven parameters
    this.algorithms.forEach(algo => {
      switch (algo.type) {
        case 'rhizomatic':
          params.rhizomaticSpread = algo.spread;
          params.connectivity = algo.connectivity;
          break;
        case 'cyclical':
          params.temporalFrequency = 1 / algo.period;
          params.phase = algo.phase;
          break;
        case 'harmonic':
          params.harmonics = algo.frequencies;
          break;
      }
    });
    
    return params;
  }
  
  selectFamily() {
    // Choose base family based on genome characteristics
    const topology = this.genome.topology;
    const dynamics = this.genome.dynamics;
    
    if (dynamics.dominantMovement === 'radiating') return 'Radiance';
    if (dynamics.dominantMovement === 'spiraling') return 'Spiral';
    if (dynamics.dominantMovement === 'flowing') return 'Flow';
    if (topology.rhizomaticTendency > 0.5) return 'Constellation';
    if (this.genome.complexity.recursiveDepth > 3) return 'Spiral';
    if (this.genome.resonance.frequencies.tension > 0.1) return 'Interference';
    
    return 'Radiance'; // Default
  }
  
  recordInteraction(type, data = {}) {
    this.interactions.push({
      type,
      data,
      timestamp: Date.now()
    });
    
    // Update fitness based on interaction quality
    switch (type) {
      case 'contemplative_hover':
        this.fitness += 0.1;
        break;
      case 'return_visit':
        this.fitness += 0.2;
        break;
      case 'deep_engagement':
        this.fitness += 0.3;
        break;
    }
    
    this.fitness = Math.min(1.0, this.fitness);
  }
  
  age() {
    this.age++;
    
    // Gradual fitness decay if no interactions
    if (this.interactions.length === 0) {
      this.fitness *= 0.99;
    }
  }
}

// Philosophical Interpreter - connects visual evolution to conceptual depth
class PhilosophicalInterpreter {
  interpretGenome(genome) {
    // Convert philosophical genome into visual parameters
    const interpretation = {
      visualComplexity: this.calculateVisualComplexity(genome),
      temporalCharacter: this.interpretTemporality(genome.temporality),
      colorProfile: this.interpretResonance(genome.resonance),
      movementStyle: this.interpretDynamics(genome.dynamics),
      structuralForm: this.interpretTopology(genome.topology)
    };
    
    return interpretation;
  }
  
  calculateVisualComplexity(genome) {
    return (
      genome.topology.branchingFactor * 0.3 +
      genome.complexity.recursiveDepth * 0.3 +
      genome.dynamics.velocity * 100 * 0.4
    );
  }
  
  interpretTemporality(temporality) {
    if (temporality.cyclical) return 'breathing';
    if (temporality.linear) return 'flowing';
    if (temporality.eternal) return 'pulsing';
    return 'static';
  }
  
  interpretResonance(resonance) {
    const dominant = resonance.dominantMode;
    const colorMaps = {
      wonder: 'golden',
      tension: 'crimson',
      clarity: 'azure',
      depth: 'violet'
    };
    
    return colorMaps[dominant] || 'neutral';
  }
  
  interpretDynamics(dynamics) {
    return dynamics.dominantMovement || 'static';
  }
  
  interpretTopology(topology) {
    if (topology.rhizomaticTendency > 0.5) return 'network';
    if (topology.circularityIndex > 0.3) return 'circular';
    if (topology.branchingFactor > 2) return 'tree';
    return 'linear';
  }
}

// Evolutionary Fitness - determines glyph survival and reproduction
class EvolutionaryFitness {
  calculateFitness(glyph, post, interactions) {
    const fitness = {
      semanticResonance: this.measureSemanticAlignment(glyph.genome, post),
      engagementDepth: this.measureEngagementQuality(interactions),
      temporalResonance: this.measureTemporalAlignment(glyph.age, post),
      aestheticEmergence: this.measureUnexpectedBeauty(glyph)
    };
    
    const weighted = (
      fitness.semanticResonance * 0.4 +
      fitness.engagementDepth * 0.3 +
      fitness.temporalResonance * 0.2 +
      fitness.aestheticEmergence * 0.1
    );
    
    return Math.min(1.0, weighted);
  }
  
  measureSemanticAlignment(glyphGenome, postGenome) {
    // Calculate actual alignment between genomes
    const topologyAlign = 1 - Math.abs(
      glyphGenome.topology.rhizomaticTendency - 
      postGenome.topology.rhizomaticTendency
    );
    
    const temporalAlign = this.compareTemporalPatterns(
      glyphGenome.temporality, 
      postGenome.temporality
    );
    
    const resonanceAlign = this.compareResonanceFrequencies(
      glyphGenome.resonance.frequencies,
      postGenome.resonance.frequencies
    );
    
    return (topologyAlign * 0.4 + temporalAlign * 0.3 + resonanceAlign * 0.3);
  }
  
  compareTemporalPatterns(temp1, temp2) {
    const cyclicalAlign = Math.abs((temp1.cyclical ? 1 : 0) - (temp2.cyclical ? 1 : 0));
    const linearAlign = Math.abs((temp1.linear ? 1 : 0) - (temp2.linear ? 1 : 0));
    const densityAlign = 1 - Math.abs(temp1.temporalDensity - temp2.temporalDensity);
    
    return (cyclicalAlign + linearAlign + densityAlign) / 3;
  }
  
  compareResonanceFrequencies(freq1, freq2) {
    const emotions = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);
    let alignment = 0;
    
    emotions.forEach(emotion => {
      const diff = Math.abs((freq1[emotion] || 0) - (freq2[emotion] || 0));
      alignment += 1 - diff;
    });
    
    return emotions.size > 0 ? alignment / emotions.size : 0;
  }
  
  measureEngagementQuality(interactions) {
    const contemplative = interactions.filter(i => 
      i.type === 'hover' && i.duration > 3000
    ).length;
    
    const returns = interactions.filter(i => i.type === 'return').length;
    
    return Math.min(1.0, (contemplative * 0.1 + returns * 0.2));
  }
  
  measureTemporalAlignment(age, post) {
    // Glyphs should maintain relevance over time
    return Math.max(0, 1 - age * 0.01);
  }
  
  measureUnexpectedBeauty(glyph) {
    // Placeholder for aesthetic emergence detection
    return Math.random() * 0.5;
  }
}

// Auto-initialize when script loads
console.log('🧬 Living Epistemic Glyph System initializing...');
try {
  const orchestrator = new GlyphOrchestrator();
  console.log('✅ Orchestrator class created');
  orchestrator.initializeAll();
  console.log('🌟 Orchestrator initialized');
} catch (error) {
  console.error('❌ Orchestrator initialization failed:', error);
}