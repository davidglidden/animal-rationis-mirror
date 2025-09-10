// Deterministic seed hashing utility
// Ensures stable, reproducible seeds across all organs and renderers

export function hashSeed(s) {
  // FNV-1a hash for deterministic string → integer conversion
  let t = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    t ^= s.charCodeAt(i);
    t = Math.imul(t, 0x01000193);
  }
  return `${t >>> 0}`; // string seed
}

// Alternative: numeric seed if needed by legacy renderers
export function hashSeedNumeric(s) {
  let t = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    t ^= s.charCodeAt(i);
    t = Math.imul(t, 0x01000193);
  }
  return t >>> 0; // numeric seed
}

// Export to global scope for bindings
if (typeof window !== 'undefined') {
  window.hashSeed = hashSeed;
  window.hashSeedNumeric = hashSeedNumeric;
  
  // Test determinism
  window.testSeedDeterminism = function() {
    const test1 = hashSeed('test:Flow');
    const test2 = hashSeed('test:Flow');
    const test3 = hashSeed('test:Grid');
    console.log('🌱 Seed determinism test:');
    console.log(`  'test:Flow' → ${test1}`);
    console.log(`  'test:Flow' → ${test2} (should match above)`);
    console.log(`  'test:Grid' → ${test3} (should differ)`);
    return test1 === test2 && test1 !== test3;
  };
}