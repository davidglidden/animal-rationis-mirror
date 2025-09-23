# Living Epistemic Glyph System Architecture
**Version**: 2.5.1 (Post-Prime Directive Renderer Enhancement)  
**Date**: September 11, 2025  
**Status**: Production Active with MM→EM→Binding Pipeline + Overlay Systems

## 🏗️ System Architecture Overview

The Living Epistemic Glyph System has evolved into a sophisticated MM→EM→Binding pipeline with overlay systems and micro-blending capabilities. The system now achieves visual distinctiveness through specialized renderer bindings rather than proliferating renderer families.

```
Raw Content
     ↓
┌─────────────────┐
│  Meaning Model  │ ← Semantic analysis of content intent, texture, dynamics
│      (MM)       │
└─────────────────┘
     ↓
┌─────────────────┐
│ Expression Model│ ← Renderer-neutral energies (families, cadence, scale)
│      (EM)       │
└─────────────────┘
     ↓
┌─────────────────┐
│ Renderer Binding│ ← Family-specific parameter derivation
│   (Flow/Grid/   │
│ Strata/Constell)│
└─────────────────┘
     ↓
┌─────────────────┐
│ Overlay Systems │ ← Contextual visual enhancements (lexica-triggered)
│ (Scriptorium/   │
│  Seal-Insignia) │
└─────────────────┘
     ↓
┌─────────────────┐
│  Micro-blend    │ ← Secondary family influence (≤20% strength)
│   Secondary     │
└─────────────────┘
     ↓
┌─────────────────┐
│ Visual Rendering│ ← Final glyph generation
│ (Canvas/WebGL)  │
└─────────────────┘
```

## 🧬 Active System Components

### Core Pipeline
1. **`mm.js`** - Meaning Model builder (semantic analysis)
2. **`em.js`** - Expression Model derivation (EM from MM)
3. **`bindings/*.binding.js`** - Renderer-specific parameter derivation
4. **`glyph-orchestrator-v2.5.js`** - System orchestration and pipeline management

### Overlay Systems (NEW)
5. **`overlays/scriptorium-overlay.js`** - Manuscript/scholarly visual enhancements
6. **`overlays/seal-insignia-overlay.js`** - Archival/postal/bureaucratic visual elements

### Validation & Diagnostics
7. **`validation/ssim-tester.js`** - Visual distinctiveness validation
8. **`glyph-diagnostics.js`** - System diagnostic utilities
9. **`diagnostic-console.js`** - Console diagnostic interface

### Support Systems
10. **`util-seed.js`** - Deterministic seed hashing
11. **`sacred-palette.js`** - Color palette management
12. **`semantic-analysis-utils.js`** - Text analysis utilities
13. **`base-semantic-renderer.js`** - Base rendering class
14. **`semantic-visual-translator.js`** - Enhanced semantic interpretation

### Legacy Compatibility
15. **`glyph-utils.js`** - Utility functions
16. **`illumination-overlay.js`** - Legacy overlay system
17. **`extended-semantics.js`** - Extended semantic analysis

## 📊 Renderer Family Architecture

The system now uses **4 specialized renderer families** with distinct EM field usage:

### Flow Family (Oceanic Palette)
- **Primary Knobs**: flux→velocity/turbulence, density→particles, anisotropy→coherence
- **Specialization**: Fluid dynamics, movement, temporal flow
- **Visual Characteristics**: Flowing patterns, particle systems, directional streams

### Grid Family (Earth Palette) 
- **Primary Knobs**: gridness→structure, granularity→precision, pulse→rhythm
- **Specialization**: Analytical structure, systematic organization
- **Visual Characteristics**: Grid patterns, geometric organization, rhythmic modularity

### Strata Family (Sediment Palette)
- **Primary Knobs**: stratification→layers, density→compression, anisotropy→drift
- **Specialization**: Historical depth, geological layering, temporal stratification
- **Visual Characteristics**: Horizontal layers, weathering effects, temporal markers

### Constellation Family (Astral Palette)
- **Primary Knobs**: constellation→stars, pulse→pulsation, granularity→complexity
- **Specialization**: Network connections, cosmic patterns, stellar relationships
- **Visual Characteristics**: Star fields, connection lines, celestial navigation

## 🎨 Overlay Systems

### Scriptorium Overlay
- **Triggers**: Intimacy/trace/scholarly lexica hits
- **Features**: Manuscript incipit, marginalia runes, medieval styling
- **Opacity**: 0.12-0.20 range
- **Use Cases**: Academic content, personal writing, historical analysis

### Seal/Insignia Overlay
- **Triggers**: Archive/postal/authority lexica OR contested intent >0.6
- **Features**: Official seals, postal marks, bureaucratic stamps, redactions
- **Opacity**: 0.12-0.20 range
- **Use Cases**: Official documents, archival content, contested material

Both overlays use deterministic seeded RNG for consistent results.

## 🌈 Micro-blend Secondary Families

When `EM.secondary_affinity > 0.65`, the system applies subtle secondary family influences:
- **Blend Strength**: Capped at ≤0.2 (20%) per specification
- **Application**: Subtle parameter adjustments based on secondary family characteristics
- **Examples**: Flow+Grid creates structured streams, Strata+Constellation adds stellar layering

## 📝 Logging & Validation

### Per-Glyph Logging
Comprehensive diagnostic output including:
- Family selection and primary parameters
- Overlay applications and triggers
- Micro-blend secondary influences
- Lexica hits and semantic signatures

### SSIM Validation
- **Tool**: `validation/ssim-tester.js`
- **Target**: Visual distinctiveness with SSIM ≤ 0.85 
- **Method**: 10 diverse content samples producing visibly distinct glyphs

## 📂 File Classification & Archival Status

### ✅ ACTIVE PRODUCTION FILES
**Core System (13 files)**:
```
/assets/js/glyphs/
├── glyph-orchestrator-v2.5.js     ✅ Main orchestrator
├── mm.js                          ✅ Meaning Model builder  
├── em.js                          ✅ Expression Model derivation
├── util-seed.js                   ✅ Deterministic seeding
├── bindings/
│   ├── flow.binding.js            ✅ Flow renderer binding
│   ├── grid.binding.js            ✅ Grid renderer binding
│   ├── strata.binding.js          ✅ Strata renderer binding
│   └── constellation.binding.js   ✅ Constellation renderer binding
├── overlays/
│   ├── scriptorium-overlay.js     ✅ Manuscript overlay system
│   └── seal-insignia-overlay.js   ✅ Archival/postal overlay system
├── validation/
│   └── ssim-tester.js             ✅ Visual distinctiveness testing
└── CONTRACTS.md                   ✅ System contracts documentation
```

**Support Systems (8 files)**:
```
├── glyph-diagnostics.js           ✅ System diagnostics
├── diagnostic-console.js          ✅ Console interface
├── sacred-palette.js              ✅ Color management
├── semantic-analysis-utils.js     ✅ Text analysis
├── base-semantic-renderer.js      ✅ Base rendering class
├── semantic-visual-translator.js  ✅ Enhanced semantic interpretation
├── glyph-utils.js                 ✅ Utility functions
├── extended-semantics.js          ✅ Extended semantic analysis
└── illumination-overlay.js        ✅ Legacy overlay (keep for compatibility)
```

### 📦 ARCHIVAL CANDIDATES (Safe to Archive)

**Legacy System Files (21 files)** - These are superseded by MM→EM→Binding pipeline:
```
├── legacy/                        📦 Already archived (4 files)
│   ├── glyph-4-particle-cylinder.js
│   ├── glyph-11-glowing-eye.js  
│   ├── glyph-19-quantum-foam.js
│   └── glyph-27-neural-network.js
├── legacy/orchestrator-versions/  📦 Already archived (3 files)
│   ├── glyph-orchestrator.js
│   ├── glyph-orchestrator-v2.js
│   └── glyph-orchestrator-v2-backup.js
├── instances/archived/            📦 Already archived (5 files)
│   ├── archived-ethics-of-reply-glyph.js
│   ├── archived-grid-systems-change.js
│   ├── archived-mushi-ken-glyph.js
│   ├── archived-radiance-chamber-0711.js
│   └── archived-radiance-threshold-birth.js
├── engines/archived-*.js          📦 Ready for archival (5 files)
└── backups/                       📦 Keep for reference (1 file)
    └── glyph-orchestrator-v2.5-backup-20250713-190829.js
```

**Individual Renderer Engines (11 files)** - **CRITICAL ASSESSMENT NEEDED**:
```
├── engines/
│   ├── balance-renderer.js        🤔 NOT loaded in templates - ARCHIVE?
│   ├── chaos-renderer.js          🤔 NOT loaded in templates - ARCHIVE?
│   ├── collapse-renderer.js       🤔 NOT loaded in templates - ARCHIVE?
│   ├── constellation-renderer.js  🤔 NOT loaded in templates - ARCHIVE?
│   ├── flow-renderer.js           🤔 NOT loaded in templates - ARCHIVE?
│   ├── grid-renderer.js           🤔 NOT loaded in templates - ARCHIVE?
│   ├── interference-renderer.js   🤔 NOT loaded in templates - ARCHIVE?
│   ├── radiance-renderer.js       🤔 NOT loaded in templates - ARCHIVE?
│   ├── spiral-renderer.js         🤔 NOT loaded in templates - ARCHIVE?
│   ├── strata-renderer.js         🤔 NOT loaded in templates - ARCHIVE?
│   └── threshold-renderer.js      🤔 NOT loaded in templates - ARCHIVE?
```

### 🚨 CRITICAL FINDING: Renderer Engine Status

**Issue Discovered**: The individual renderer engines in `/engines/` are **NOT being loaded** in the current templates. Only the **binding files** are loaded.

**Investigation Required**:
1. Are the renderer engines dynamically loaded by the orchestrator?
2. Are they vestigial from the pre-MM→EM→Binding architecture?
3. Should they be archived or are they still needed for the Living System features?

**Templates Analysis**:
- `templates/default.html` loads only binding files, not renderer engines
- This suggests the MM→EM→Binding pipeline may have superseded direct renderer usage
- The orchestrator may be using a different rendering approach

## 🔬 System Dependencies

### Template Loading Order (Critical):
```html
<!-- Core utilities first -->
<script src="/assets/js/glyphs/glyph-utils.js?v=19"></script>
<script src="/assets/js/glyphs/illumination-overlay.js?v=19"></script>
<script src="/assets/js/glyphs/extended-semantics.js?v=19"></script>
<script src="/assets/js/glyphs/sacred-palette.js?v=19"></script>
<script src="/assets/js/glyphs/semantic-analysis-utils.js?v=19"></script>
<script src="/assets/js/glyphs/base-semantic-renderer.js?v=19"></script>
<script src="/assets/js/glyphs/semantic-visual-translator.js?v=19"></script>

<!-- MM→EM→Binding pipeline -->
<script src="/assets/js/glyphs/util-seed.js?v=19"></script>
<script src="/assets/js/glyphs/mm.js?v=19"></script>
<script src="/assets/js/glyphs/em.js?v=19"></script>
<script src="/assets/js/glyphs/bindings/flow.binding.js?v=19"></script>
<script src="/assets/js/glyphs/bindings/grid.binding.js?v=19"></script>
<script src="/assets/js/glyphs/bindings/strata.binding.js?v=19"></script>
<script src="/assets/js/glyphs/bindings/constellation.binding.js?v=19"></script>

<!-- Diagnostics and orchestrator -->
<script src="/assets/js/glyphs/glyph-diagnostics.js?v=19"></script>
<script src="/assets/js/glyphs/diagnostic-console.js?v=19"></script>
<script src="/assets/js/glyphs/glyph-orchestrator-v2.5.js?v=19"></script>
```

### ⚠️ MISSING FROM TEMPLATES:
- `overlays/scriptorium-overlay.js` - **NEEDS ADDING**
- `overlays/seal-insignia-overlay.js` - **NEEDS ADDING**  
- `validation/ssim-tester.js` - Development tool, not needed in production

## 📋 Recommended Actions

### Immediate (Critical):
1. **Add overlay systems to templates** - They're implemented but not loaded
2. **Investigate renderer engine usage** - Determine if `/engines/*.js` are still needed
3. **Update template cache version** - Force reload after overlay addition

### Short-term:
1. **Archive unused renderer engines** if confirmed vestigial
2. **Clean up directory structure** per archival candidates
3. **Update MANIFEST.md** to reflect current architecture

### Documentation:
1. **Archive old MANIFEST.md** as it references obsolete Living System features
2. **Create new documentation** reflecting MM→EM→Binding architecture
3. **Document overlay integration** and triggering systems

## 🎯 System Health Assessment

**Status**: 🟡 **OPERATIONAL with Critical Gap**

**Strengths**:
- ✅ MM→EM→Binding pipeline fully operational
- ✅ Four renderer families with distinct parameter spaces
- ✅ Comprehensive logging and validation systems
- ✅ Deterministic seeding and reproducible results

**Critical Issues**:
- 🚨 Overlay systems implemented but not loaded in templates
- 🤔 Renderer engine files may be vestigial (investigation needed)
- ⚠️ Directory structure contains archival candidates

**Recommended Priority**: **HIGH** - Add overlay systems to templates for full functionality.

---

*This audit represents the state of the system after the Prime Directive Renderer Enhancement (Sept 11, 2025). The system has evolved significantly from its original Living Epistemic design toward a more focused MM→EM→Binding architecture with contextual overlays.*