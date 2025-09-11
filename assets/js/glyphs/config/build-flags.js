// Build Safety Flags - v2.5.1
// Prime Directive: Keep prod safe during implementation rollout

// All 11 families - shrink this set during rollout if needed
export const PROD_SUPPORTED = new Set([
  'Flow', 'Grid', 'Strata', 'Constellation',
  'Radiance', 'Interference', 'Spiral', 'Balance', 
  'Chaos', 'Collapse', 'Threshold'
]);

// Set to true in prod, can flip to false in dev for testing unsupported families
export const FAIL_UNSUPPORTED = true;

// For debugging
export function getSupportedFamilies() {
  return Array.from(PROD_SUPPORTED).sort();
}

export function isFamilySupported(family) {
  return PROD_SUPPORTED.has(family);
}

export function shouldFailOnUnsupported() {
  return FAIL_UNSUPPORTED;
}

console.log(`[BuildFlags] Production families: ${Array.from(PROD_SUPPORTED).join(', ')}`);