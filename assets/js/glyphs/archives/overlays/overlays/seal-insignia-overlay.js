// Seal/Insignia Overlay System - Postal marks, cancellations, and archival seals
// Triggered by archive/postal lexica hits or contested intent

const SealInsigniaOverlay = {
  // Check if overlay should be applied
  shouldApply(lexicaHits, mm, metadata) {
    // Trigger on archive/postal lexica patterns
    const archiveMarkers = ['archive', 'document', 'record', 'preservation', 'collection'];
    const postalMarkers = ['post', 'mail', 'letter', 'correspondence', 'dispatch', 'delivery'];
    const authorityMarkers = ['seal', 'stamp', 'official', 'certification', 'validation', 'authority'];
    
    const hasArchive = archiveMarkers.some(marker => 
      lexicaHits.some(hit => hit.toLowerCase().includes(marker))
    );
    const hasPostal = postalMarkers.some(marker => 
      lexicaHits.some(hit => hit.toLowerCase().includes(marker))
    );
    const hasAuthority = authorityMarkers.some(marker => 
      lexicaHits.some(hit => hit.toLowerCase().includes(marker))
    );
    
    // Also trigger on contested intent (bureaucratic/official resistance)
    const hasContestedIntent = mm?.intent?.contested > 0.6;
    
    // Check for archival metadata markers
    const isArchival = metadata?.class === 'chamber' ||
                      (metadata?.title && metadata.title.toLowerCase().includes('archive'));
    
    return hasArchive || hasPostal || hasAuthority || hasContestedIntent || isArchival;
  },

  // Generate overlay parameters  
  generate(params, mm, seed) {
    const rng = this.createSeededRNG(seed + ':seal-insignia');
    const contestedLevel = mm?.intent?.contested || 0;
    
    return {
      overlay: 'seal-insignia',
      opacity: 0.12 + rng() * 0.08,  // 0.12-0.20 range
      
      // Primary seal/stamp elements
      seals: {
        enabled: rng() > 0.2,  // 80% chance
        count: Math.max(1, Math.min(4, Math.round(1 + rng() * 2 + contestedLevel))),
        style: this.selectSealStyle(rng, contestedLevel),
        placement: this.selectSealPlacement(rng),
        authority: this.selectAuthorityLevel(rng, contestedLevel)
      },
      
      // Postal/shipping marks
      postal: {
        enabled: rng() > 0.4,  // 60% chance
        markType: this.selectPostalMarkType(rng),
        cancellation: this.generateCancellationPattern(rng),
        routing: this.generateRoutingMarks(rng),
        dates: this.generatePostalDates(rng)
      },
      
      // Bureaucratic elements
      bureaucratic: {
        enabled: contestedLevel > 0.4 || rng() > 0.6,  // More likely with contested content
        stamps: this.selectBureaucraticStamps(rng, contestedLevel),
        redactions: contestedLevel > 0.7 ? this.generateRedactionPattern(rng) : null,
        classifications: this.selectClassificationMarks(rng, contestedLevel)
      },
      
      // Archive preservation marks
      archival: {
        enabled: rng() > 0.5,  // 50% chance
        preservationMarks: this.selectPreservationMarks(rng),
        cataloguing: this.generateCatalogueNumbers(rng),
        condition: this.assessConditionMarks(rng),
        provenance: this.generateProvenanceChain(rng)
      },

      // Visual characteristics
      characteristics: {
        age: 0.2 + rng() * 0.6,  // How weathered/aged the marks appear
        clarity: 0.4 + rng() * 0.4,  // How sharp/blurred the impressions are
        layering: Math.floor(1 + rng() * 3),  // How many mark layers overlap
        authenticity: 0.6 + rng() * 0.4  // How official/legitimate they appear
      },

      // Color adjustments
      colorAdjustments: {
        inkStaining: 0.1 + rng() * 0.2,  // Ink bleed and staining
        redInk: contestedLevel > 0.5 ? 0.3 + rng() * 0.4 : 0.1 + rng() * 0.2,
        oxidation: 0.05 + rng() * 0.15,  // Metal stamp oxidation
        fading: 0.1 + rng() * 0.3  // Ink fading over time
      }
    };
  },

  // Helper methods
  selectSealStyle(rng, contestedLevel) {
    const officialStyles = ['circular-seal', 'coat-of-arms', 'institutional-stamp', 'government-seal'];
    const personalStyles = ['signet-ring', 'personal-mark', 'notary-seal', 'guild-mark'];
    
    // More official styles with higher contested levels
    const styles = contestedLevel > 0.5 ? officialStyles : [...officialStyles, ...personalStyles];
    return styles[Math.floor(rng() * styles.length)];
  },

  selectSealPlacement(rng) {
    const placements = ['corner-stamp', 'center-seal', 'margin-mark', 'diagonal-stamp', 'edge-seal'];
    return placements[Math.floor(rng() * placements.length)];
  },

  selectAuthorityLevel(rng, contestedLevel) {
    const levels = ['local', 'regional', 'national', 'imperial', 'ecclesiastical', 'corporate'];
    // Higher authority with more contested content
    const minIndex = Math.floor(contestedLevel * 3);
    const maxIndex = Math.min(levels.length - 1, minIndex + 3);
    return levels[minIndex + Math.floor(rng() * (maxIndex - minIndex + 1))];
  },

  selectPostalMarkType(rng) {
    const types = ['postmark', 'cancellation', 'routing-stamp', 'customs-mark', 'delivery-confirmation'];
    return types[Math.floor(rng() * types.length)];
  },

  generateCancellationPattern(rng) {
    return {
      style: rng() > 0.5 ? 'circular-postmark' : 'linear-cancellation',
      density: 0.3 + rng() * 0.4,
      angle: -30 + rng() * 60,  // -30° to +30°
      clarity: 0.2 + rng() * 0.6
    };
  },

  generateRoutingMarks(rng) {
    return {
      enabled: rng() > 0.6,
      count: Math.floor(1 + rng() * 3),
      style: rng() > 0.5 ? 'transit-stamps' : 'routing-numbers',
      legibility: 0.3 + rng() * 0.5
    };
  },

  generatePostalDates(rng) {
    const baseYear = 1880 + Math.floor(rng() * 100);  // 1880-1980 range for vintage feel
    return {
      enabled: rng() > 0.3,
      dateFormat: rng() > 0.5 ? 'european' : 'american',
      year: baseYear,
      legibility: 0.4 + rng() * 0.4
    };
  },

  selectBureaucraticStamps(rng, contestedLevel) {
    const stamps = [
      'approved', 'denied', 'pending', 'classified', 'confidential', 
      'urgent', 'priority', 'received', 'filed', 'processed'
    ];
    
    const count = Math.min(3, Math.floor(contestedLevel * 2 + rng() * 2));
    const selected = [];
    for (let i = 0; i < count; i++) {
      const stamp = stamps[Math.floor(rng() * stamps.length)];
      if (!selected.includes(stamp)) selected.push(stamp);
    }
    
    return selected;
  },

  generateRedactionPattern(rng) {
    return {
      enabled: true,
      style: rng() > 0.5 ? 'black-bars' : 'blacked-out',
      density: 0.1 + rng() * 0.3,
      angle: -5 + rng() * 10
    };
  },

  selectClassificationMarks(rng, contestedLevel) {
    if (contestedLevel < 0.3) return 'public';
    if (contestedLevel < 0.5) return 'internal';
    if (contestedLevel < 0.7) return 'restricted';
    return rng() > 0.5 ? 'confidential' : 'classified';
  },

  selectPreservationMarks(rng) {
    const marks = ['acid-free', 'archival-quality', 'temperature-controlled', 'digitized', 'fragile'];
    return marks[Math.floor(rng() * marks.length)];
  },

  generateCatalogueNumbers(rng) {
    const prefix = ['MS', 'DOC', 'REC', 'ARC', 'FILE'][Math.floor(rng() * 5)];
    const number = Math.floor(1000 + rng() * 8999);
    const suffix = rng() > 0.7 ? String.fromCharCode(65 + Math.floor(rng() * 26)) : '';
    
    return {
      enabled: rng() > 0.4,
      number: `${prefix}-${number}${suffix}`,
      legibility: 0.6 + rng() * 0.3
    };
  },

  assessConditionMarks(rng) {
    const conditions = ['excellent', 'good', 'fair', 'poor', 'fragile', 'damaged'];
    return conditions[Math.floor(rng() * conditions.length)];
  },

  generateProvenanceChain(rng) {
    return {
      enabled: rng() > 0.7,
      depth: Math.floor(1 + rng() * 3),  // 1-3 provenance marks
      institutional: rng() > 0.6
    };
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
export function applySealInsigniaOverlay(ctx, bindingOutput) {
  // For now, simple condition based on palette intent  
  if (bindingOutput.palette?.intent === 'archival' ||
      bindingOutput.palette?.name === 'bureaucratic') {
    SealInsigniaOverlay.applyOverlay(ctx, bindingOutput, { opacity: 0.18 });
  }
}

// Export overlay object for advanced usage
export default SealInsigniaOverlay;

// ES Module exports only - no globals
console.log('🏛️ Seal/insignia overlay system loaded (ESM)');