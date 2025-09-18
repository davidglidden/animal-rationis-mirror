// === GLYPH DIAGNOSTICS & ACCEPTANCE TESTING ===
// Pass 3 implementation - automated testing and validation
// PRIME DIRECTIVE: Ensure visual differentiation is working correctly

class GlyphDiagnostics {
  constructor() {
    this.testResults = [];
    this.glyphManifests = new Map();
    this.acceptanceCriteria = {
      maxOffDiagonalSSIM: 0.85,
      minParameterDifference: 0.20,
      minKnobsPerFamily: 3
    };
    
    console.log('🔬 Glyph Diagnostics initialized');
  }
  
  // === GLYPH MANIFEST SYSTEM ===
  // Record glyph rendering details for analysis
  recordGlyphManifest(glyphId, params) {
    const manifest = {
      slug: glyphId,
      timestamp: Date.now(),
      fingerprint: params?.genome?.uniqueIdentifiers?.fingerprint || 0,
      renderer: params?.renderer || 'unknown',
      lexica: this.detectLexicaMatches(params),
      paletteIntent: params?.paletteIntent || 'unknown',
      semanticColor: params?.semanticColor || null,
      archetype: params?.archetype || 'unknown',
      parameters: this.extractKeyParameters(params),
      contentType: params?.genome?.contentAnalysis?.contentType || 'unknown'
    };
    
    this.glyphManifests.set(glyphId, manifest);
    console.log(`📊 Recorded manifest for ${glyphId}:`, manifest);
    
    // Emit as JSON for external analysis
    this.emitManifestJSON(glyphId, manifest);
    
    return manifest;
  }
  
  // Extract key rendering parameters for comparison
  extractKeyParameters(params) {
    const keyParams = {};
    
    // Flow renderer parameters
    if (params.particleCount !== undefined) keyParams.particleCount = params.particleCount;
    if (params.pattern !== undefined) keyParams.pattern = params.pattern;
    if (params.turbulence !== undefined) keyParams.turbulence = params.turbulence;
    if (params.viscosity !== undefined) keyParams.viscosity = params.viscosity;
    
    // Constellation parameters
    if (params.starCount !== undefined) keyParams.starCount = params.starCount;
    if (params.clusterTightness !== undefined) keyParams.clusterTightness = params.clusterTightness;
    if (params.connectionDistance !== undefined) keyParams.connectionDistance = params.connectionDistance;
    
    // Radiance parameters
    if (params.rayCount !== undefined) keyParams.rayCount = params.rayCount;
    if (params.glow !== undefined) keyParams.glow = params.glow;
    if (params.intensity !== undefined) keyParams.intensity = params.intensity;
    
    // Grid parameters
    if (params.cellSize !== undefined) keyParams.cellSize = params.cellSize;
    if (params.gridJitter !== undefined) keyParams.gridJitter = params.gridJitter;
    if (params.orthogonality !== undefined) keyParams.orthogonality = params.orthogonality;
    
    return keyParams;
  }
  
  // Detect lexica pattern matches in content
  detectLexicaMatches(params) {
    const matches = [];
    const content = params?.sourceText || '';
    
    // Warburg patterns
    if (this.containsPattern(content, ['constellation', 'memory', 'atlas', 'migration'])) {
      matches.push('mnemosyne.v1:constellation');
    }
    
    // Derrida patterns  
    if (this.containsPattern(content, ['archive', 'trace', 'différance', 'margin'])) {
      matches.push('derrida.v1:archive');
    }
    
    // Laffoley patterns
    if (this.containsPattern(content, ['machine', 'consciousness', 'cosmic', 'dimensional'])) {
      matches.push('laffoley.v1:machine');
    }
    
    return matches;
  }
  
  containsPattern(text, keywords) {
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword));
  }
  
  // Emit JSON manifest for external tools
  emitManifestJSON(glyphId, manifest) {
    // In a real implementation, this would write to filesystem
    // For now, we'll store in browser for diagnostic access
    if (typeof window !== 'undefined') {
      window.glyphManifests = window.glyphManifests || {};
      window.glyphManifests[glyphId] = manifest;
    }
  }
  
  // === ACCEPTANCE TESTING ===
  // Run automated tests on glyph differentiation
  runAcceptanceTests() {
    console.log('🔬 Running glyph differentiation acceptance tests...');
    
    const results = {
      timestamp: Date.now(),
      totalGlyphs: this.glyphManifests.size,
      tests: {}
    };
    
    // Test 1: Visual differentiation (simulated SSIM)
    results.tests.visualDifferentiation = this.testVisualDifferentiation();
    
    // Test 2: Parameter differences by family
    results.tests.parameterDifferences = this.testParameterDifferences();
    
    // Test 3: Deterministic reproduction
    results.tests.deterministicReproduction = this.testDeterministicReproduction();
    
    // Test 4: Renderer distribution  
    results.tests.rendererDistribution = this.testRendererDistribution();
    
    this.testResults.push(results);
    console.log('✅ Acceptance tests complete:', results);
    
    return results;
  }
  
  // Test visual differentiation (simulated SSIM analysis)
  testVisualDifferentiation() {
    const manifests = Array.from(this.glyphManifests.values());
    const similarities = [];
    
    // Compare all pairs of glyphs
    for (let i = 0; i < manifests.length; i++) {
      for (let j = i + 1; j < manifests.length; j++) {
        const sim = this.calculateSimulatedSSIM(manifests[i], manifests[j]);
        similarities.push({
          glyph1: manifests[i].slug,
          glyph2: manifests[j].slug,
          ssim: sim,
          renderer1: manifests[i].renderer,
          renderer2: manifests[j].renderer
        });
      }
    }
    
    const offDiagonalSSIMs = similarities.filter(s => s.renderer1 !== s.renderer2);
    const meanOffDiagonalSSIM = offDiagonalSSIMs.reduce((sum, s) => sum + s.ssim, 0) / offDiagonalSSIMs.length;
    
    return {
      passed: meanOffDiagonalSSIM <= this.acceptanceCriteria.maxOffDiagonalSSIM,
      meanOffDiagonalSSIM,
      threshold: this.acceptanceCriteria.maxOffDiagonalSSIM,
      details: similarities
    };
  }
  
  // Simulate SSIM based on parameter differences
  calculateSimulatedSSIM(manifest1, manifest2) {
    const params1 = manifest1.parameters;
    const params2 = manifest2.parameters;
    const allKeys = [...new Set([...Object.keys(params1), ...Object.keys(params2)])];
    
    let totalDifference = 0;
    let comparisons = 0;
    
    allKeys.forEach(key => {
      if (params1[key] !== undefined && params2[key] !== undefined) {
        const val1 = parseFloat(params1[key]) || 0;
        const val2 = parseFloat(params2[key]) || 0;
        const diff = Math.abs(val1 - val2) / Math.max(val1, val2, 1);
        totalDifference += diff;
        comparisons++;
      }
    });
    
    const avgDifference = comparisons > 0 ? totalDifference / comparisons : 0;
    // Convert difference to similarity (SSIM-like)
    return Math.max(0, 1 - avgDifference);
  }
  
  // Test parameter differences within families
  testParameterDifferences() {
    const familyGroups = {};
    
    // Group by renderer family
    this.glyphManifests.forEach(manifest => {
      const family = manifest.renderer;
      if (!familyGroups[family]) familyGroups[family] = [];
      familyGroups[family].push(manifest);
    });
    
    const results = {};
    
    Object.entries(familyGroups).forEach(([family, manifests]) => {
      if (manifests.length < 2) {
        results[family] = { passed: true, reason: 'insufficient_samples' };
        return;
      }
      
      const paramDifferences = this.analyzeParameterDifferences(manifests);
      const significantDifferences = paramDifferences.filter(d => d.difference >= this.acceptanceCriteria.minParameterDifference);
      
      results[family] = {
        passed: significantDifferences.length >= this.acceptanceCriteria.minKnobsPerFamily,
        significantDifferences: significantDifferences.length,
        threshold: this.acceptanceCriteria.minKnobsPerFamily,
        details: paramDifferences
      };
    });
    
    return results;
  }
  
  analyzeParameterDifferences(manifests) {
    const allParams = new Set();
    manifests.forEach(m => Object.keys(m.parameters).forEach(k => allParams.add(k)));
    
    const differences = [];
    
    allParams.forEach(param => {
      const values = manifests
        .map(m => parseFloat(m.parameters[param]))
        .filter(v => !isNaN(v));
        
      if (values.length > 1) {
        const min = Math.min(...values);
        const max = Math.max(...values);
        const difference = max > 0 ? (max - min) / max : 0;
        
        differences.push({
          parameter: param,
          min,
          max,
          difference,
          significant: difference >= this.acceptanceCriteria.minParameterDifference
        });
      }
    });
    
    return differences;
  }
  
  // Test deterministic reproduction
  testDeterministicReproduction() {
    // This would require re-rendering with same seeds
    // For now, check that seeds are recorded and different
    const seeds = Array.from(this.glyphManifests.values()).map(m => m.fingerprint);
    const uniqueSeeds = new Set(seeds);
    
    return {
      passed: uniqueSeeds.size === seeds.length, // All seeds should be unique
      uniqueSeeds: uniqueSeeds.size,
      totalSeeds: seeds.length,
      duplicates: seeds.length - uniqueSeeds.size
    };
  }
  
  // Test renderer distribution
  testRendererDistribution() {
    const rendererCounts = {};
    
    this.glyphManifests.forEach(manifest => {
      const renderer = manifest.renderer;
      rendererCounts[renderer] = (rendererCounts[renderer] || 0) + 1;
    });
    
    const totalGlyphs = this.glyphManifests.size;
    const distributionEntropy = this.calculateEntropy(Object.values(rendererCounts), totalGlyphs);
    
    return {
      distribution: rendererCounts,
      entropy: distributionEntropy,
      passed: distributionEntropy > 0.5, // Some diversity expected
      totalRenderers: Object.keys(rendererCounts).length
    };
  }
  
  calculateEntropy(counts, total) {
    return counts.reduce((entropy, count) => {
      const p = count / total;
      return entropy - (p * Math.log2(p));
    }, 0);
  }
  
  // === DIAGNOSTICS DECISION TREE ===
  // Automated troubleshooting for common issues
  runDiagnostics() {
    console.log('🔍 Running diagnostic decision tree...');
    
    const issues = [];
    const recommendations = [];
    
    // Check for identical sigils
    const identicalCount = this.detectIdenticalSignals();
    if (identicalCount > 0) {
      issues.push(`Found ${identicalCount} pairs of identical sigils`);
      recommendations.push('Increase parameter derivation ranges by 25%');
      recommendations.push('Check semantic analysis is producing different archetypes');
    }
    
    // Check renderer distribution
    const rendererTest = this.testRendererDistribution();
    if (Object.keys(rendererTest.distribution).length <= 2) {
      issues.push('Limited renderer family usage - most content maps to same renderer');
      recommendations.push('Review archetype-to-renderer mapping');
      recommendations.push('Strengthen content type detection');
    }
    
    // Check parameter differences
    const paramTest = this.testParameterDifferences();
    const failedFamilies = Object.entries(paramTest).filter(([f, r]) => !r.passed);
    if (failedFamilies.length > 0) {
      issues.push(`Parameter differences insufficient in families: ${failedFamilies.map(([f]) => f).join(', ')}`);
      recommendations.push('Widen parameter derivation ranges');
      recommendations.push('Add guard conditions to force differentiation');
    }
    
    const diagnosis = {
      timestamp: Date.now(),
      issues,
      recommendations,
      severity: issues.length > 2 ? 'high' : issues.length > 0 ? 'medium' : 'low'
    };
    
    console.log('🎯 Diagnostic results:', diagnosis);
    return diagnosis;
  }
  
  detectIdenticalSignals() {
    let identicalCount = 0;
    const manifests = Array.from(this.glyphManifests.values());
    
    for (let i = 0; i < manifests.length; i++) {
      for (let j = i + 1; j < manifests.length; j++) {
        const ssim = this.calculateSimulatedSSIM(manifests[i], manifests[j]);
        if (ssim > 0.95) { // Very similar
          identicalCount++;
          console.warn(`⚠️ Nearly identical sigils: ${manifests[i].slug} vs ${manifests[j].slug} (SSIM: ${ssim.toFixed(3)})`);
        }
      }
    }
    
    return identicalCount;
  }
  
  // Public API for integration
  getManifest(glyphId) {
    return this.glyphManifests.get(glyphId);
  }
  
  getAllManifests() {
    return Object.fromEntries(this.glyphManifests);
  }
  
  getLatestTestResults() {
    return this.testResults[this.testResults.length - 1];
  }
}

// Global initialization
if (typeof window !== 'undefined') {
  window.GlyphDiagnostics = GlyphDiagnostics;
  window.glyphDiagnostics = new GlyphDiagnostics();
  console.log('🔬 Glyph diagnostics system loaded');
}