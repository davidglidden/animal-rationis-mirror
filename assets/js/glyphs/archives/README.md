# Archive Directory

The `archives/` directory preserves legacy glyph code from the pre-baseline system.

## ⚠️ Important Notices

- **Do not import these files** in templates or runtime code
- **Do not modify archived files** - they are preserved for reference only
- **To restore a component**: Move it back to its original path and open a PR explaining the necessity

## Archive Structure

All files are organized by functional category:
- `bindings/` - Parameter translation layers
- `diagnostics/` - Health monitoring and testing
- `documentation/` - Specifications and guides
- `engines/` - Core rendering engines
- `instances/` - Specific implementations
- `legacy/` - Historical versions
- `orchestrators/` - Coordination systems
- `overlays/` - Visual enhancements
- `renderers/` - Canvas API implementations
- `utilities/` - Support functions and tools

## Baseline Files (Active)

The current baseline consists of only these essential files:
- `../triptych-renderer.js` - Main renderer with per-pane processing
- `../renderers/index.js` - RendererRegistry for binding management
- `../renderers/flow.js` - Essential flow renderer for baseline
- `../util-seed.esm.js` - Deterministic seeding

## Restoration Process

If you need to restore archived functionality:

1. Identify the specific file(s) from `MANIFEST-2025-09-18.md`
2. Move the file(s) back to their original location in the glyph system
3. Update imports in relevant files
4. Test thoroughly
5. Open a PR with clear justification for the restoration

## Archive Date

This archive was created on 2025-09-18 as part of the UCE Clean Baseline establishment.