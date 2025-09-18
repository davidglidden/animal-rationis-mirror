// === BASE SEMANTIC RENDERER ===
// PRIME DIRECTIVE: Durable, thoughtful solution for semantic analysis in all renderers
// Provides consistent semantic concept analysis across all glyph families
// "Measure, proportion, and what is fitting give rise to beauty and goodness everywhere"

class BaseSemanticRenderer {
  // Analyze semantic concepts with full richness preservation
  analyzeSemanticConcepts(conceptualDNA, semanticFamily, keywords, threshold = 0.6) {
    const utils = window.SemanticAnalysisUtils;
    
    if (utils && utils.findSemanticRelatedness) {
      // Use sophisticated semantic analysis with confidence weighting
      return utils.findSemanticRelatedness(conceptualDNA, semanticFamily, keywords, threshold);
    } else {
      // Robust fallback handling for both rich and legacy formats
      return this.legacyConceptMatch(conceptualDNA, keywords);
    }
  }
  
  // Legacy concept matching for backward compatibility
  legacyConceptMatch(conceptualDNA, keywords) {
    // Handle null/undefined
    if (!conceptualDNA) return false;
    
    // Extract concept array from various formats
    let conceptArray = [];
    
    // Try rich format first
    if (conceptualDNA.concepts && Array.isArray(conceptualDNA.concepts)) {
      conceptArray = conceptualDNA.concepts;
    } 
    // Try legacy property
    else if (conceptualDNA.legacy && Array.isArray(conceptualDNA.legacy)) {
      conceptArray = conceptualDNA.legacy;
    }
    // Direct array
    else if (Array.isArray(conceptualDNA)) {
      conceptArray = conceptualDNA;
    }
    
    // Match against keywords
    return conceptArray.some(concept => {
      const word = (concept?.word || concept || '').toString().toLowerCase();
      return keywords.some(keyword => {
        const keywordLower = keyword.toLowerCase();
        return word.includes(keywordLower) || keywordLower.includes(word);
      });
    });
  }
  
  // Get weighted score for concept matching
  getConceptScore(conceptualDNA, keywords) {
    const utils = window.SemanticAnalysisUtils;
    
    if (utils && utils.getConceptScore) {
      return utils.getConceptScore(conceptualDNA, keywords);
    } else {
      // Simple binary score for fallback
      return this.legacyConceptMatch(conceptualDNA, keywords) ? 1.0 : 0.0;
    }
  }
  
  // Check for any concept match (simple helper)
  hasConceptMatch(conceptualDNA, keywords) {
    const utils = window.SemanticAnalysisUtils;
    
    if (utils && utils.hasConceptMatch) {
      return utils.hasConceptMatch(conceptualDNA, keywords);
    } else {
      return this.legacyConceptMatch(conceptualDNA, keywords);
    }
  }
  
  // Enhanced concept analysis with semantic families
  analyzeConceptsWithFamilies(conceptualDNA, analysisMap) {
    // analysisMap format: { variableName: { family: 'spatial', keywords: [...], threshold: 0.6 } }
    const results = {};
    
    for (const [key, config] of Object.entries(analysisMap)) {
      results[key] = this.analyzeSemanticConcepts(
        conceptualDNA, 
        config.family, 
        config.keywords, 
        config.threshold || 0.6
      );
    }
    
    return results;
  }
}

// Export for use in renderers
if (typeof window !== 'undefined') {
  window.BaseSemanticRenderer = BaseSemanticRenderer;
}

// Mixin helper for adding these methods to existing renderer classes
function addSemanticAnalysisMethods(RendererClass) {
  const baseMethods = Object.getOwnPropertyNames(BaseSemanticRenderer.prototype)
    .filter(name => name !== 'constructor');
  
  baseMethods.forEach(methodName => {
    if (!RendererClass.prototype[methodName]) {
      RendererClass.prototype[methodName] = BaseSemanticRenderer.prototype[methodName];
    }
  });
}

if (typeof window !== 'undefined') {
  window.addSemanticAnalysisMethods = addSemanticAnalysisMethods;
}