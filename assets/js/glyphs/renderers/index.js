// assets/js/glyphs/renderers/index.js
const _m = new Map();

export const RendererRegistry = {
  register: (b) => _m.set(b.id.toLowerCase(), b),
  get: (id) => _m.get(String(id || "").toLowerCase()),
  getDefault: () => _m.get("flow") || [..._m.values()][0],
  keys: () => [..._m.keys()],
};

// Attach to window for sanity/debug
if (typeof window !== "undefined") window.RendererRegistry = RendererRegistry;

// Register Flow binding (side effect)
import { FlowBinding } from "../bindings/flow.binding.js";
RendererRegistry.register(FlowBinding);

// (Optional) Legacy alias to avoid breaking older imports:
export const registerRenderer = (b) => RendererRegistry.register(b);