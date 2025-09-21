// RendererRegistry — single source of truth
export const RendererRegistry = (() => {
  const _m = new Map();
  return {
    register: (b) => _m.set(String(b.id).toLowerCase(), b),
    get: (id) => _m.get(String(id || '').toLowerCase()),
    getDefault: () => _m.get('flow') || [..._m.values()][0],
    keys: () => [..._m.keys()],
  };
})();

// Import bindings (no renderer imports this file)
import { FlowBinding } from './flow.js';
import { GridBinding } from './grid.js';

// Register bindings
RendererRegistry.register(FlowBinding);
RendererRegistry.register(GridBinding);

// Explicit exports (no wildcard re-exports)
export { FlowBinding, GridBinding };