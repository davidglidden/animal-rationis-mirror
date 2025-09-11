// Deterministic seed hashing utility - ES Module Version
// Ensures stable, reproducible seeds across all organs and renderers

/**
 * Deterministic seed generator using FNV-1a hash
 * @param {string} s - Input string to hash
 * @returns {string} - Deterministic seed string
 */
export function hashSeed(s) {
  // Normalize input for cross-platform consistency
  const normalized = s.normalize('NFC');
  
  // FNV-1a hash for deterministic string → integer conversion
  let hash = 0x811c9dc5;
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return `${hash >>> 0}`;
}

/**
 * Numeric seed variant for legacy compatibility
 * @param {string} s - Input string to hash
 * @returns {number} - Deterministic numeric seed
 */
export function hashSeedNumeric(s) {
  const normalized = s.normalize('NFC');
  let hash = 0x811c9dc5;
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Contract-compliant deterministic seed generation
 * Format: hash(mm.meta.seed + ':' + organOrRendererId)
 * @param {string} mmSeed - Base seed from MM.meta.seed
 * @param {string} rendererId - Renderer/organ identifier
 * @returns {string} - Deterministic seed for this renderer
 */
export function deterministicSeed(mmSeed, rendererId) {
  const combined = `${mmSeed}:${rendererId}`;
  return hashSeed(combined);
}

/**
 * Create seeded RNG from deterministic seed
 * @param {string} seed - Deterministic seed string
 * @returns {function} - Seeded random number generator (0-1)
 */
export function createSeededRNG(seed) {
  let state = hashSeedNumeric(seed);
  return function() {
    // Linear Congruential Generator (Park and Miller)
    state = Math.imul(16807, state) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

/**
 * Test determinism - verify same input produces same output
 * @returns {boolean} - True if deterministic, false if broken
 */
export function testSeedDeterminism() {
  const test1 = hashSeed('test:Flow');
  const test2 = hashSeed('test:Flow');
  const test3 = hashSeed('test:Grid');
  
  console.log('🌱 Seed determinism test (ESM):');
  console.log(`  'test:Flow' → ${test1}`);
  console.log(`  'test:Flow' → ${test2} (should match above)`);
  console.log(`  'test:Grid' → ${test3} (should differ)`);
  
  const deterministicTest = test1 === test2 && test1 !== test3;
  
  // Test seeded RNG consistency
  const rng1 = createSeededRNG('test:Flow');
  const rng2 = createSeededRNG('test:Flow');
  const val1 = rng1();
  const val2 = rng2();
  const rngTest = val1 === val2;
  
  console.log(`  RNG consistency: ${val1} === ${val2} → ${rngTest}`);
  
  return deterministicTest && rngTest;
}