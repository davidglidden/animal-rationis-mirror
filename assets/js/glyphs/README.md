# Philosophical Glyph System - Runtime Components

This directory contains the **runtime JavaScript system** for procedural glyph rendering.

## Quick Reference

```
engines/     # 11 procedural family renderers
instances/   # Specific post glyph implementations  
legacy/      # Preserved original numbered glyphs
```

## 📚 Complete Documentation

For comprehensive system documentation, see:
**[/docs/glyph-engine/](../../docs/glyph-engine/README.md)**

- System architecture and philosophy
- Family definitions and parameters  
- Haskell integration code
- Chamber integration protocols
- Evolution and emergence mechanisms

## Usage

The `glyph-orchestrator.js` handles all coordination automatically:
1. Analyzes post `glyph_id` and metadata
2. Loads appropriate engine or instance
3. Detects hybrid family potential
4. Records patterns for emergence detection

---

*This is the runtime implementation. For the complete sacred instrument documentation, see `/docs/glyph-engine/`.*