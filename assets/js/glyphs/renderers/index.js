// idempotent module-level registry
const _reg = new Map();
export const RendererRegistry = {
  register(b){ if (!b?.id) return; _reg.set(String(b.id).toLowerCase(), b); },
  get(id){ return _reg.get(String(id||'').toLowerCase()); },
  getDefault(){ return _reg.get('flow') || [..._reg.values()][0]; },
  keys(){ return [..._reg.keys()]; },
};
export default RendererRegistry;

// Import bindings (no renderer imports this file)
import { FlowBinding } from './flow.js';
import { GridBinding } from './grid.js';
import { ConstellationBinding } from './constellation.js';
import { RadianceBinding } from './radiance.js';

// Register bindings
RendererRegistry.register(FlowBinding);
RendererRegistry.register(GridBinding);
RendererRegistry.register(ConstellationBinding);
RendererRegistry.register(RadianceBinding);

// Explicit exports (no wildcard re-exports)
export { FlowBinding, GridBinding, ConstellationBinding, RadianceBinding };