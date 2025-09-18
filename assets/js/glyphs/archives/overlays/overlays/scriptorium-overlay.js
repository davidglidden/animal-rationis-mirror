// Scriptorium Overlay System - Medieval manuscript marginalia and incipits
// Triggered by intimacy/trace lexica hits, adds scholarly manuscript elements

const ScriptoriumOverlay = {
  // Check if overlay should be applied
  shouldApply(lexicaHits, metadata) {
    // Trigger on intimacy/trace lexica patterns
    const intimacyMarkers = ['personal', 'intimate', 'private', 'diary', 'memoir', 'confession'];
    const traceMarkers = ['trace', 'mark', 'inscription', 'writing', 'manuscript', 'palimpsest'];
    const scholarlyMarkers = ['scholar', 'study', 'research', 'academic', 'medieval', 'scribe'];
    
    const hasIntimacy = intimacyMarkers.some(marker => 
      lexicaHits.some(hit => hit.toLowerCase().includes(marker))
    );
    const hasTrace = traceMarkers.some(marker => 
      lexicaHits.some(hit => hit.toLowerCase().includes(marker))
    );
    const hasScholarly = scholarlyMarkers.some(marker => 
      lexicaHits.some(hit => hit.toLowerCase().includes(marker))
    );
    
    // Also check metadata for scholarly content types
    const isScholarly = metadata?.class === 'essay' || 
                       metadata?.class === 'meditation' ||
                       (metadata?.title && metadata.title.toLowerCase().includes('study'));
    
    return hasIntimacy || hasTrace || hasScholarly || isScholarly;
  },

  // Generate overlay parameters
  generate(params, seed) {
    const rng = this.createSeededRNG(seed + ':scriptorium');
    
    return {
      overlay: 'scriptorium',
      opacity: 0.12 + rng() * 0.08,  // 0.12-0.20 range
      
      // Incipit (manuscript opening) styling
      incipit: {
        enabled: rng() > 0.3,  // 70% chance
        style: this.selectIncipitStyle(rng),
        position: this.selectIncipitPosition(rng),
        illumination: rng() > 0.6  // 40% chance of illuminated initial
      },
      
      // Marginalia elements
      marginalia: {
        enabled: rng() > 0.2,  // 80% chance
        density: 0.1 + rng() * 0.3,  // Light to moderate marginalia
        runeType: this.selectRuneType(rng),
        placement: this.selectMarginaliaPlacement(rng),
        annotations: this.generateAnnotationPattern(rng)
      },
      
      // Manuscript styling
      manuscript: {
        ruling: rng() > 0.4,  // 60% chance of ruled lines
        border: this.selectBorderStyle(rng),
        texture: this.selectTexturePattern(rng),
        aging: 0.1 + rng() * 0.3  // Subtle aging effect
      },

      // Color adjustments for manuscript feel
      colorAdjustments: {
        warmth: 0.15 + rng() * 0.2,  // Warmer, parchment-like
        sepia: 0.08 + rng() * 0.12,   // Subtle sepia tone
        vignette: 0.05 + rng() * 0.1  // Light edge darkening
      }
    };
  },

  // Helper methods
  selectIncipitStyle(rng) {
    const styles = ['gothic', 'carolingian', 'uncial', 'romanesque', 'humanistic'];
    return styles[Math.floor(rng() * styles.length)];
  },

  selectIncipitPosition(rng) {
    const positions = ['top-left', 'center-top', 'embedded'];
    return positions[Math.floor(rng() * positions.length)];
  },

  selectRuneType(rng) {
    const types = ['marginal-notes', 'pointing-hands', 'nota-bene', 'correction-marks', 'cross-references'];
    return types[Math.floor(rng() * types.length)];
  },

  selectMarginaliaPlacement(rng) {
    const placements = ['right-margin', 'left-margin', 'both-margins', 'interlinear'];
    return placements[Math.floor(rng() * placements.length)];
  },

  generateAnnotationPattern(rng) {
    return {
      density: 0.05 + rng() * 0.15,
      style: rng() > 0.5 ? 'scholarly' : 'personal',
      language: rng() > 0.7 ? 'latin' : 'vernacular'
    };
  },

  selectBorderStyle(rng) {
    const styles = ['simple-rule', 'decorated-border', 'illuminated-frame', 'minimal'];
    return styles[Math.floor(rng() * styles.length)];
  },

  selectTexturePattern(rng) {
    const textures = ['parchment', 'vellum', 'paper', 'papyrus'];
    return textures[Math.floor(rng() * textures.length)];
  },

  // Simple seeded RNG for deterministic results
  createSeededRNG(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return function() {
      hash = Math.imul(hash, 0x9E3779B9);
      hash ^= hash >>> 16;
      return (hash >>> 0) / 0x100000000;
    };
  }
};

// ES Module export
export function applyScriptoriumOverlay(ctx, bindingOutput) {
  // For now, simple condition based on palette intent
  if (bindingOutput.palette?.intent === 'scholarly' || 
      bindingOutput.palette?.name === 'manuscript') {
    ScriptoriumOverlay.applyOverlay(ctx, bindingOutput, { opacity: 0.15 });
  }
}

// Export overlay object for advanced usage
export default ScriptoriumOverlay;

// ES Module exports only - no globals
console.log('📜 Scriptorium overlay system loaded (ESM)');