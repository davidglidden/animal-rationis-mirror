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
      'chaos': 'Chaos'
    };
    
    this.seasonMap = {
      '○': 'winter',   // Winter
      '△': 'spring',   // Spring  
      '□': 'summer',   // Summer
      '▽': 'autumn'    // Autumn
    };
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
    
    // Base parameters
    const params = {
      family: parsed.family,
      descriptors: parsed.descriptors
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

    return params;
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
    const specificGlyphUrl = `/assets/js/glyphs/${glyphId}.js`;
    
    try {
      // Try to load specific glyph file
      const response = await fetch(specificGlyphUrl);
      if (response.ok) {
        // Specific glyph exists, load it
        const script = document.createElement('script');
        script.src = specificGlyphUrl;
        document.head.appendChild(script);
        return;
      }
    } catch (error) {
      // File doesn't exist, continue to procedural
    }
    
    // Use procedural renderer
    if (window.createProceduralGlyph) {
      window.createProceduralGlyph(canvas, parameters);
    } else {
      console.warn('Procedural glyph renderer not available');
    }
  }
}

// Auto-initialize when script loads
const orchestrator = new GlyphOrchestrator();
orchestrator.initializeAll();