// RendererRegistry — single source of truth
const __bindings = new Map();

export const RendererRegistry = {
  register(b){
    if (!b?.id || typeof b.fromEM !== 'function' || typeof b.draw !== 'function') {
      console.warn('[RendererRegistry] invalid binding', b);
      return;
    }
    __bindings.set(String(b.id).toLowerCase(), b);
  },
  get(id){ return __bindings.get(String(id || '').toLowerCase()); },
  getDefault(){ return __bindings.get('flow') || [...__bindings.values()][0]; },
  keys(){ return [...__bindings.keys()]; }
};

// Side-effect: load bindings to self-register
import './flow.js';
import './grid.js';