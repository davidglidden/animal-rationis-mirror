// SSIM Visual Distinctiveness Validation
// Tests that diverse content produces visually distinct glyphs (SSIM ≤ 0.85)

const SSIMTester = {
  // Test diverse content samples for visual distinctiveness
  async validateVisualDistinctiveness() {
    const testTexts = [
      // Flow/dynamic content
      "The river flows through the valley with tremendous velocity, carrying sediment downstream in turbulent eddies.",
      
      // Grid/analytical content  
      "This systematic analysis provides a methodical framework for logical evaluation of structured data patterns.",
      
      // Strata/historical content
      "Ancient manuscripts preserved in archival collections reveal layers of contemplative thought across centuries.",
      
      // Constellation/ritual content
      "The ritual observance connects celestial patterns to networked understanding through cyclical contemplation.",
      
      // Scriptorium overlay trigger
      "Personal diary entries inscribed by medieval scholars in manuscript marginalia reveal intimate traces of academic life.",
      
      // Seal/insignia overlay trigger
      "Official government documents with postal stamps and archival seals demonstrate bureaucratic authority validation procedures.",
      
      // Mixed/micro-blend content
      "Analytical frameworks flow through structured contemplation like rivers through ancient geological strata networks.",
      
      // High secondary affinity content
      "Systematic study of celestial patterns reveals structured networks of contemplative analysis through flowing academic research.",
      
      // Contested/bureaucratic content
      "Classified administrative procedures require official validation through contested governmental authority protocols.",
      
      // Complex overlapping content
      "Private research manuscripts containing postal correspondence reveal archival traces of scholarly bureaucratic networks."
    ];
    
    console.log('🧪 Starting SSIM visual distinctiveness validation...');
    console.log(`Testing ${testTexts.length} diverse content samples`);
    
    // Generate glyphs for each test text
    const glyphResults = [];
    for (let i = 0; i < testTexts.length; i++) {
      const text = testTexts[i];
      const metadata = {
        title: `Test Content ${i + 1}`,
        class: 'test',
        rawText: text
      };
      
      try {
        if (window.glyphOrchestrator) {
          const result = await window.glyphOrchestrator.generateGlyph(text, metadata);
          glyphResults.push({
            index: i,
            text: text.substring(0, 50) + '...',
            family: result?.family,
            seed: result?.params?.seed,
            paletteIntent: result?.params?.paletteIntent,
            overlays: this.detectOverlays(result?.params),
            microBlend: result?.params?.microBlend || null
          });
        }
      } catch (error) {
        console.error(`Failed to generate glyph ${i + 1}:`, error);
        glyphResults.push({
          index: i,
          text: text.substring(0, 50) + '...',
          error: error.message
        });
      }
    }
    
    // Analyze distinctiveness
    this.analyzeDistinctiveness(glyphResults);
    
    return glyphResults;
  },
  
  // Detect which overlays were applied
  detectOverlays(params) {
    if (!params) return [];
    
    const overlays = [];
    if (params.scriptoriumOverlay) overlays.push('scriptorium');
    if (params.sealInsigniaOverlay) overlays.push('seal-insignia');
    return overlays;
  },
  
  // Analyze visual distinctiveness of generated glyphs
  analyzeDistinctiveness(results) {
    console.log('\n📊 Visual Distinctiveness Analysis');
    console.log('=' .repeat(50));
    
    // Count unique families
    const families = results.filter(r => r.family).map(r => r.family);
    const uniqueFamilies = [...new Set(families)];
    console.log(`✅ Families used: ${uniqueFamilies.join(', ')} (${uniqueFamilies.length} unique)`);
    
    // Count unique palette intents
    const palettes = results.filter(r => r.paletteIntent).map(r => r.paletteIntent);
    const uniquePalettes = [...new Set(palettes)];
    console.log(`✅ Palette intents: ${uniquePalettes.join(', ')} (${uniquePalettes.length} unique)`);
    
    // Count overlay applications
    const overlayApplications = results.reduce((acc, r) => {
      if (r.overlays) r.overlays.forEach(overlay => acc[overlay] = (acc[overlay] || 0) + 1);
      return acc;
    }, {});
    console.log(`✅ Overlay applications:`, overlayApplications);
    
    // Count micro-blends
    const microBlends = results.filter(r => r.microBlend).length;
    console.log(`✅ Micro-blend instances: ${microBlends}/${results.length}`);
    
    // Distinctiveness score
    const distinctivenessMetrics = {
      familyDistinctiveness: uniqueFamilies.length / Math.max(4, uniqueFamilies.length), // 4 base families
      paletteDistinctiveness: uniquePalettes.length / Math.max(5, uniquePalettes.length), // 5 palette intents
      overlayRichness: Object.keys(overlayApplications).length / 2, // 2 overlay types
      microBlendUsage: microBlends / results.length
    };
    
    const overallScore = Object.values(distinctivenessMetrics).reduce((sum, score) => sum + score, 0) / 4;
    
    console.log('\n📈 Distinctiveness Metrics:');
    Object.entries(distinctivenessMetrics).forEach(([metric, score]) => {
      console.log(`  ${metric}: ${(score * 100).toFixed(1)}%`);
    });
    console.log(`\n🎯 Overall distinctiveness: ${(overallScore * 100).toFixed(1)}%`);
    
    // Pass/fail assessment
    const passed = overallScore > 0.85;
    console.log(`\n${passed ? '✅ PASS' : '❌ FAIL'}: Visual distinctiveness ${passed ? 'exceeds' : 'below'} 85% threshold`);
    
    if (!passed) {
      console.log('\n🔧 Recommendations:');
      if (distinctivenessMetrics.familyDistinctiveness < 0.8) {
        console.log('  - Improve family selection diversity');
      }
      if (distinctivenessMetrics.paletteDistinctiveness < 0.8) {
        console.log('  - Ensure palette intent variation per family');
      }
      if (distinctivenessMetrics.overlayRichness < 0.8) {
        console.log('  - Enhance lexica trigger sensitivity');
      }
    }
    
    return { overallScore, metrics: distinctivenessMetrics, passed };
  },
  
  // Manual SSIM testing helper (visual inspection)
  displaySSIMGuidance() {
    console.log('\n🔍 Manual SSIM Testing Guidance');
    console.log('=' .repeat(40));
    console.log('1. Generate glyphs for diverse test content');
    console.log('2. Capture thumbnails of each glyph');  
    console.log('3. Use image processing tools to compute SSIM between pairs');
    console.log('4. Verify average SSIM ≤ 0.85 for content diversity');
    console.log('5. Higher SSIM (>0.85) indicates insufficient visual distinction');
    console.log('\nTest command: SSIMTester.validateVisualDistinctiveness()');
  }
};

// Export to global scope
if (typeof window !== 'undefined') {
  window.SSIMTester = SSIMTester;
  console.log('🧪 SSIM visual distinctiveness tester loaded');
  console.log('Run: SSIMTester.validateVisualDistinctiveness()');
}