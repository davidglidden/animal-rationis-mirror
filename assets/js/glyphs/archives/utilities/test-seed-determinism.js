// Deterministic Seed Unit Tests
// Validates contract compliance for reproducible rendering

import { 
  hashSeed, 
  hashSeedNumeric, 
  deterministicSeed, 
  createSeededRNG,
  testSeedDeterminism
} from './util-seed.esm.js';

// Test results aggregator
let testResults = [];

function assert(condition, message) {
  const result = { condition, message, passed: !!condition };
  testResults.push(result);
  console.log(`${result.passed ? '✅' : '❌'} ${message}`);
  if (!result.passed) {
    console.error(`    Expected: true, Got: ${condition}`);
  }
  return result.passed;
}

function assertEquals(actual, expected, message) {
  const passed = actual === expected;
  const result = { condition: passed, message, passed, actual, expected };
  testResults.push(result);
  console.log(`${passed ? '✅' : '❌'} ${message}`);
  if (!passed) {
    console.error(`    Expected: ${expected}, Got: ${actual}`);
  }
  return passed;
}

// Test 1: Hash Determinism - Same input produces same output
function testHashDeterminism() {
  console.log('\n🧪 Test 1: Hash Determinism');
  
  const input = 'test:Flow';
  const hash1 = hashSeed(input);
  const hash2 = hashSeed(input);
  const hash3 = hashSeed(input);
  
  assert(hash1 === hash2 && hash2 === hash3, 
    'Same input produces identical hashes across multiple calls');
  
  // Test numeric variant too
  const num1 = hashSeedNumeric(input);
  const num2 = hashSeedNumeric(input);
  
  assertEquals(num1, num2, 'Numeric hash is also deterministic');
}

// Test 2: Hash Divergence - Different inputs produce different outputs  
function testHashDivergence() {
  console.log('\n🧪 Test 2: Hash Divergence');
  
  const inputs = [
    'test:Flow', 'test:Grid', 'test:Strata', 'test:Constellation',
    'different:Flow', 'analytical:Grid', 'contemplative:Strata'
  ];
  
  const hashes = inputs.map(input => hashSeed(input));
  const uniqueHashes = new Set(hashes);
  
  assertEquals(hashes.length, uniqueHashes.size, 
    'All different inputs produce unique hashes');
  
  // Test specific pairs for sufficient difference
  const flowHash = hashSeed('test:Flow');
  const gridHash = hashSeed('test:Grid');
  
  assert(flowHash !== gridHash, 
    'Different renderer IDs produce different seeds');
}

// Test 3: Cross-platform Consistency
function testCrossPlatformConsistency() {
  console.log('\n🧪 Test 3: Cross-platform Consistency');
  
  // Test Unicode normalization  
  const input1 = 'test:café'; // é as single character
  const input2 = 'test:cafe\u0301'; // e + combining acute accent
  
  const hash1 = hashSeed(input1);
  const hash2 = hashSeed(input2);
  
  assertEquals(hash1, hash2, 
    'Unicode normalization ensures cross-platform consistency');
}

// Test 4: Contract Compliance - deterministicSeed format
function testContractCompliance() {
  console.log('\n🧪 Test 4: Contract Compliance');
  
  const mmSeed = 'sha256-abc123';
  const rendererId = 'Flow';
  
  const contractSeed = deterministicSeed(mmSeed, rendererId);
  const expectedInput = `${mmSeed}:${rendererId}`;
  const expectedHash = hashSeed(expectedInput);
  
  assertEquals(contractSeed, expectedHash,
    'deterministicSeed follows contract format: hash(mmSeed + ":" + rendererId)');
  
  // Test different renderers produce different seeds
  const gridSeed = deterministicSeed(mmSeed, 'Grid');
  assert(contractSeed !== gridSeed,
    'Same MM seed with different renderer IDs produce different seeds');
}

// Test 5: Seeded RNG Determinism
function testSeededRNGDeterminism() {
  console.log('\n🧪 Test 5: Seeded RNG Determinism');
  
  const seed = 'test:Flow:12345';
  const rng1 = createSeededRNG(seed);
  const rng2 = createSeededRNG(seed);
  
  // Generate sequences from both RNGs
  const sequence1 = Array.from({length: 10}, () => rng1());
  const sequence2 = Array.from({length: 10}, () => rng2());
  
  const sequencesMatch = sequence1.every((val, i) => val === sequence2[i]);
  assert(sequencesMatch, 'Same seed produces identical RNG sequences');
  
  // Test that different seeds produce different sequences
  const rng3 = createSeededRNG('different:seed');
  const sequence3 = Array.from({length: 10}, () => rng3());
  
  const sequencesDiffer = !sequence1.every((val, i) => val === sequence3[i]);
  assert(sequencesDiffer, 'Different seeds produce different RNG sequences');
}

// Test 6: Golden Fixtures - Known good values
function testGoldenFixtures() {
  console.log('\n🧪 Test 6: Golden Fixtures');
  
  // These are reference values that should never change
  const fixtures = [
    { input: 'sha256:abc123:Flow', expected: '3744467682' },
    { input: 'sha256:def456:Grid', expected: '1647317709' },
    { input: 'sha256:ghi789:Strata', expected: '2891108448' }
  ];
  
  for (const { input, expected } of fixtures) {
    const actual = hashSeed(input);
    assertEquals(actual, expected, `Golden fixture: ${input} → ${expected}`);
  }
}

// Test 7: Renderer Integration Test  
function testRendererIntegration() {
  console.log('\n🧪 Test 7: Renderer Integration');
  
  // Simulate the full contract flow
  const mmSeed = 'sha256:content-hash-12345';
  
  const renderers = ['Flow', 'Grid', 'Strata', 'Constellation', 'Radiance'];
  const seeds = renderers.map(rendererId => deterministicSeed(mmSeed, rendererId));
  
  // All seeds should be different
  const uniqueSeeds = new Set(seeds);
  assertEquals(seeds.length, uniqueSeeds.size, 
    'Each renderer gets a unique deterministic seed');
  
  // Each seed should produce a consistent RNG
  for (let i = 0; i < renderers.length; i++) {
    const rng1 = createSeededRNG(seeds[i]);
    const rng2 = createSeededRNG(seeds[i]);
    
    const val1 = rng1();
    const val2 = rng2(); 
    
    assertEquals(val1, val2, 
      `${renderers[i]} renderer seed produces consistent RNG`);
  }
}

// Main test runner
export function runSeedDeterminismTests() {
  console.log('🌱 Running Deterministic Seed Unit Tests...\n');
  
  testResults = []; // Reset results
  
  testHashDeterminism();
  testHashDivergence();
  testCrossPlatformConsistency();  
  testContractCompliance();
  testSeededRNGDeterminism();
  testGoldenFixtures();
  testRendererIntegration();
  
  // Run built-in test from util-seed
  console.log('\n🧪 Test 8: Built-in Determinism Test');
  const builtinResult = testSeedDeterminism();
  assert(builtinResult, 'Built-in testSeedDeterminism() passes');
  
  // Summary
  const passed = testResults.filter(r => r.passed).length;
  const total = testResults.length;
  const allPassed = passed === total;
  
  console.log(`\n🌱 Test Results: ${passed}/${total} passed`);
  
  if (allPassed) {
    console.log('✅ All deterministic seed tests PASSED - Contract compliant!');
  } else {
    console.error('❌ Some tests FAILED - Contract violations detected!');
    const failures = testResults.filter(r => !r.passed);
    failures.forEach(f => console.error(`   • ${f.message}`));
  }
  
  return { passed, total, allPassed, results: testResults };
}

// Auto-run if loaded directly (not as import)
if (typeof window !== 'undefined' && window.location) {
  // Browser environment - export to global for manual testing
  window.runSeedDeterminismTests = runSeedDeterminismTests;
  console.log('🌱 Seed determinism tests available at: window.runSeedDeterminismTests()');
}

// Export for other modules
export default runSeedDeterminismTests;