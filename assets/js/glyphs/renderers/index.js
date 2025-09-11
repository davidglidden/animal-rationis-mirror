// Renderer Registry - v2.5.1
// Central registry for all family renderers
// Prime Directive: Single source of truth for renderer lookup

const registry = new Map();

export function registerRenderer(name, fn) {
  if (typeof fn !== 'function') {
    throw new Error(`[RendererRegistry] Invalid renderer function for ${name}`);
  }
  registry.set(name, fn);
  console.log(`[RendererRegistry] Registered: ${name}`);
}

export function getRenderer(name) {
  const fn = registry.get(name);
  if (typeof fn !== 'function') {
    throw new Error(`[RendererRegistry] Missing family renderer: ${name}`);
  }
  return fn;
}

export function listRenderers() {
  return Array.from(registry.keys()).sort();
}

export function hasRenderer(name) {
  return registry.has(name);
}

// For debugging
export function getRegistrySize() {
  return registry.size;
}