// === DIAGNOSTIC CONSOLE COMMANDS ===
// Console interface for running glyph diagnostics and acceptance tests
// Usage: Run in browser console after page load

// Global diagnostic functions for console use
if (typeof window !== 'undefined') {
  
  // Run all acceptance tests
  window.runGlyphTests = function() {
    if (!window.glyphDiagnostics) {
      console.error('❌ Glyph diagnostics not initialized');
      return;
    }
    
    console.log('🔬 Running comprehensive glyph acceptance tests...');
    const results = window.glyphDiagnostics.runAcceptanceTests();
    
    // Pretty print results
    console.log('\n📊 ACCEPTANCE TEST RESULTS:');
    console.log('=' .repeat(50));
    
    Object.entries(results.tests).forEach(([testName, testResult]) => {
      const status = testResult.passed ? '✅' : '❌';
      console.log(`${status} ${testName.toUpperCase()}:`);
      
      if (testName === 'visualDifferentiation') {
        console.log(`   Mean off-diagonal SSIM: ${testResult.meanOffDiagonalSSIM.toFixed(3)} (threshold: ${testResult.threshold})`);
      } else if (testName === 'parameterDifferences') {
        Object.entries(testResult).forEach(([family, familyResult]) => {
          if (typeof familyResult === 'object' && familyResult.passed !== undefined) {
            const familyStatus = familyResult.passed ? '✅' : '❌';
            console.log(`   ${familyStatus} ${family}: ${familyResult.significantDifferences || 0} significant differences`);
          }
        });
      } else if (testName === 'deterministicReproduction') {
        console.log(`   Unique seeds: ${testResult.uniqueSeeds}/${testResult.totalSeeds} (duplicates: ${testResult.duplicates})`);
      } else if (testName === 'rendererDistribution') {
        console.log(`   Renderers used: ${testResult.totalRenderers}, entropy: ${testResult.entropy.toFixed(3)}`);
        console.log('   Distribution:', testResult.distribution);
      }
    });
    
    return results;
  };
  
  // Run diagnostic decision tree
  window.runGlyphDiagnostics = function() {
    if (!window.glyphDiagnostics) {
      console.error('❌ Glyph diagnostics not initialized');
      return;
    }
    
    console.log('🔍 Running diagnostic decision tree...');
    const diagnosis = window.glyphDiagnostics.runDiagnostics();
    
    console.log('\n🎯 DIAGNOSTIC RESULTS:');
    console.log('=' .repeat(50));
    console.log(`Severity: ${diagnosis.severity.toUpperCase()}`);
    
    if (diagnosis.issues.length > 0) {
      console.log('\n⚠️  ISSUES DETECTED:');
      diagnosis.issues.forEach((issue, i) => console.log(`${i + 1}. ${issue}`));
    }
    
    if (diagnosis.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      diagnosis.recommendations.forEach((rec, i) => console.log(`${i + 1}. ${rec}`));
    }
    
    if (diagnosis.issues.length === 0) {
      console.log('✅ No issues detected - glyph differentiation working correctly!');
    }
    
    return diagnosis;
  };
  
  // Get all recorded manifests
  window.getGlyphManifests = function() {
    if (!window.glyphDiagnostics) {
      console.error('❌ Glyph diagnostics not initialized');
      return;
    }
    
    const manifests = window.glyphDiagnostics.getAllManifests();
    console.log('📊 Recorded glyph manifests:', manifests);
    return manifests;
  };
  
  // Compare two specific glyphs
  window.compareGlyphs = function(glyphId1, glyphId2) {
    if (!window.glyphDiagnostics) {
      console.error('❌ Glyph diagnostics not initialized');
      return;
    }
    
    const manifest1 = window.glyphDiagnostics.getManifest(glyphId1);
    const manifest2 = window.glyphDiagnostics.getManifest(glyphId2);
    
    if (!manifest1 || !manifest2) {
      console.error('❌ One or both glyphs not found');
      return;
    }
    
    console.log('\n🔍 GLYPH COMPARISON:');
    console.log('=' .repeat(50));
    console.log(`${glyphId1}:`);
    console.log(`  Renderer: ${manifest1.renderer}`);
    console.log(`  Archetype: ${manifest1.archetype}`);
    console.log(`  Content Type: ${manifest1.contentType}`);
    console.log(`  Parameters:`, manifest1.parameters);
    
    console.log(`\n${glyphId2}:`);
    console.log(`  Renderer: ${manifest2.renderer}`);
    console.log(`  Archetype: ${manifest2.archetype}`);
    console.log(`  Content Type: ${manifest2.contentType}`);
    console.log(`  Parameters:`, manifest2.parameters);
    
    // Calculate similarity
    const ssim = window.glyphDiagnostics.calculateSimulatedSSIM(manifest1, manifest2);
    console.log(`\n🎯 Simulated SSIM: ${ssim.toFixed(3)} ${ssim > 0.85 ? '(too similar!)' : '(good differentiation)'}`);
    
    return { manifest1, manifest2, ssim };
  };
  
  // Show help
  window.glyphDiagnosticsHelp = function() {
    console.log('\n🔬 GLYPH DIAGNOSTICS CONSOLE COMMANDS:');
    console.log('=' .repeat(50));
    console.log('runGlyphTests()           - Run all acceptance tests');
    console.log('runGlyphDiagnostics()     - Run diagnostic decision tree');
    console.log('getGlyphManifests()       - Get all recorded glyph data');
    console.log('compareGlyphs(id1, id2)   - Compare two specific glyphs');
    console.log('glyphDiagnosticsHelp()    - Show this help message');
    console.log('\nExample usage:');
    console.log('  runGlyphTests()');
    console.log('  compareGlyphs("from-mushiken-to-morra-glyph", "vespers-for-the-living-glyph")');
  };
  
  console.log('🔬 Glyph diagnostic console loaded. Type glyphDiagnosticsHelp() for commands.');
}