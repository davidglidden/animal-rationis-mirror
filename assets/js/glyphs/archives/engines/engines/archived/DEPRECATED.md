# Legacy Engines - DEPRECATED v2.5.1

These engine files have been superseded by the new **MM→EM→Binding→Renderer** architecture as of v2.5.1.

## What Changed

- **Old Architecture**: `MM → EM → Engine` (11 engines, 7 orphaned)
- **New Architecture**: `MM → EM → Binding → Renderer` (11 bindings, all supported)

## Migration Path

Each legacy engine has been replaced by:
1. **Family Binding**: `/assets/js/glyphs/bindings/{family}.binding.js`
2. **Family Renderer**: `/assets/js/glyphs/renderers/{family}.js`

## Files Archived

- `radiance-renderer.js` → `radiance.binding.js` + `radiance.js`
- `interference-renderer.js` → `interference.binding.js` + `interference.js`
- `spiral-renderer.js` → `spiral.binding.js` + `spiral.js`
- `balance-renderer.js` → `balance.binding.js` + `balance.js`
- `chaos-renderer.js` → `chaos.binding.js` + `chaos.js`
- `collapse-renderer.js` → `collapse.binding.js` + `collapse.js`
- `threshold-renderer.js` → `threshold.binding.js` + `threshold.js`
- `flow-renderer.js` → Updated to v2.5.1 contract
- `grid-renderer.js` → Updated to v2.5.1 contract
- `strata-renderer.js` → Updated to v2.5.1 contract
- `constellation-renderer.js` → Updated to v2.5.1 contract

## Prime Directive Compliance

This migration was done **once, correctly, with lasting integrity**:
- Clean contracts with validation
- No legacy pathways in production
- Fail-loud error handling
- Complete SSIM visual testing
- Durable modular architecture

**Do not restore these files.** Use the new binding+renderer system.

---
*Archived: 2025-09-11*  
*Superseded by: Glyph Orchestrator v2.5.1*