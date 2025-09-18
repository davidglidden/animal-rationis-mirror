// RendererRegistry - Baseline for UCE Glyphs
// Minimal registry with window attachment for global access

import { FlowBinding } from '../bindings/flow.binding.js';

const _map = new Map();

export const RendererRegistry = {
  register: binding => _map.set(String(binding.id || '').toLowerCase(), binding),
  get: id => _map.get(String(id || '').toLowerCase()),
  getDefault: () => _map.get('flow') || [..._map.values()][0],
  keys: () => [..._map.keys()],
  debug: () => ({ registered: [..._map.keys()], size: _map.size })
};

// Register Flow binding
RendererRegistry.register(FlowBinding);

// Attach to window for global access
if (typeof window !== 'undefined') {
  window.RendererRegistry = RendererRegistry;
}

console.info('[RendererRegistry] Registry initialized and attached to window');
console.info('[RendererRegistry] Registered bindings:', RendererRegistry.keys());