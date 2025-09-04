// === SEMANTIC ANALYSIS UTILITIES ===
// PRIME DIRECTIVE: Do it well, the right way, do it once
// Shared utilities for all renderers to analyze rich conceptualDNA structure
// Eliminates code duplication and ensures consistent semantic analysis

class SemanticAnalysisUtils {
  // Check if conceptualDNA has the rich structure (vs legacy array)
  static hasRichConceptData(conceptualDNA) {
    return conceptualDNA && 
           conceptualDNA.concepts && 
           Array.isArray(conceptualDNA.concepts) &&
           conceptualDNA.semanticSimilarity;
  }

  // Find semantic relatedness between concepts and keywords
  static findSemanticRelatedness(conceptualDNA, semanticFamily, keywords, threshold = 0.6) {
    // Handle null/undefined
    if (!conceptualDNA) {
      return false;
    }

    // Check if we have rich concept data or legacy string array
    const hasRichData = this.hasRichConceptData(conceptualDNA);
    
    if (hasRichData) {
      // Direct semantic family matching
      if (conceptualDNA.semanticSimilarity && conceptualDNA.semanticSimilarity.has(semanticFamily)) {
        const familyConcepts = conceptualDNA.semanticSimilarity.get(semanticFamily);
        if (familyConcepts && familyConcepts.length > 0) {
          console.log(`🎯 Found semantic family match: ${semanticFamily}`, familyConcepts.map(c => c.word));
          return true;
        }
      }
      
      // Weighted concept matching with confidence scoring
      let totalWeight = 0;
      let matchWeight = 0;
      
      conceptualDNA.concepts.forEach(concept => {
        const weight = (concept.weight || 0.5) * (concept.confidence || 0.5);
        totalWeight += weight;
        
        // Check for keyword matches with fuzzy matching
        const word = (concept.word || '').toLowerCase();
        const hasKeywordMatch = keywords.some(keyword => 
          word.includes(keyword) || keyword.includes(keyword) || 
          this.calculateWordSimilarity(word, keyword) > 0.7
        );
        
        if (hasKeywordMatch) {
          matchWeight += weight;
          console.log(`🎯 Keyword match: ${word} → ${semanticFamily} (weight: ${weight})`);
        }
      });
      
      // Calculate confidence-weighted match ratio
      const matchRatio = totalWeight > 0 ? matchWeight / totalWeight : 0;
      const hasMatch = matchRatio >= threshold;
      
      if (hasMatch) {
        console.log(`✅ Semantic match: ${semanticFamily} (ratio: ${matchRatio.toFixed(2)}, threshold: ${threshold})`);
      }
      
      return hasMatch;
      
    } else {
      // Fallback to legacy string matching for backward compatibility
      const legacyDNA = conceptualDNA.legacy || conceptualDNA || [];
      const legacyArray = Array.isArray(legacyDNA) ? legacyDNA : [];
      
      return legacyArray.some(concept => 
        concept && typeof concept === 'string' && 
        keywords.some(keyword => concept.toLowerCase().includes(keyword))
      );
    }
  }

  // Calculate word similarity using simple string distance
  static calculateWordSimilarity(word1, word2) {
    const longer = word1.length > word2.length ? word1 : word2;
    const shorter = word1.length > word2.length ? word2 : word1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.calculateLevenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }
  
  // Calculate Levenshtein distance for word similarity
  static calculateLevenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  }

  // Get concepts as a normalized array (handles both rich and legacy formats)
  static getConceptsArray(conceptualDNA) {
    if (!conceptualDNA) return [];
    
    // Rich format
    if (this.hasRichConceptData(conceptualDNA)) {
      return conceptualDNA.concepts || [];
    }
    
    // Legacy format - could be direct array or in legacy property
    const legacy = conceptualDNA.legacy || conceptualDNA;
    return Array.isArray(legacy) ? legacy : [];
  }

  // Check if any concept matches keywords (simplified helper)
  static hasConceptMatch(conceptualDNA, keywords) {
    const concepts = this.getConceptsArray(conceptualDNA);
    
    return concepts.some(concept => {
      const word = (concept.word || concept || '').toString().toLowerCase();
      return keywords.some(keyword => word.includes(keyword.toLowerCase()));
    });
  }

  // Get weighted concept score for a set of keywords
  static getConceptScore(conceptualDNA, keywords) {
    if (!this.hasRichConceptData(conceptualDNA)) {
      // Simple binary score for legacy format
      return this.hasConceptMatch(conceptualDNA, keywords) ? 1.0 : 0.0;
    }
    
    let totalWeight = 0;
    let matchWeight = 0;
    
    conceptualDNA.concepts.forEach(concept => {
      const weight = (concept.weight || 0.5) * (concept.confidence || 0.5);
      totalWeight += weight;
      
      const word = (concept.word || '').toLowerCase();
      if (keywords.some(keyword => word.includes(keyword.toLowerCase()))) {
        matchWeight += weight;
      }
    });
    
    return totalWeight > 0 ? matchWeight / totalWeight : 0;
  }
}

// Export for use in renderers
if (typeof window !== 'undefined') {
  window.SemanticAnalysisUtils = SemanticAnalysisUtils;
}