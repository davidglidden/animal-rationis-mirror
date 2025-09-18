# Glyph Overlay Systems Documentation
**Version**: 1.0  
**Date**: September 11, 2025  
**Status**: Implemented, Ready for Template Integration

## 🎨 Overlay System Architecture

The overlay system provides contextual visual enhancements triggered by lexical analysis of content. Overlays add thematic visual elements without changing the core renderer family selection.

## 📜 Scriptorium Overlay System

### Purpose
Adds medieval manuscript and scholarly visual elements to content with academic, personal, or historical characteristics.

### File Location
`/assets/js/glyphs/overlays/scriptorium-overlay.js`

### Triggering Conditions
The overlay activates when content contains lexica from these categories:

**Intimacy Markers**:
- personal, intimate, private, diary, memoir, confession, secret

**Trace Markers**:  
- trace, mark, inscription, writing, manuscript, palimpsest, scribe

**Scholarly Markers**:
- scholar, study, research, academic, medieval, analysis, treatise

**Metadata Triggers**:
- `metadata.class === 'essay'` or `metadata.class === 'meditation'`
- `metadata.title` contains 'study'

### Visual Elements

#### Incipit (Manuscript Opening)
```javascript
incipit: {
  enabled: 70% chance,
  style: ['gothic', 'carolingian', 'uncial', 'romanesque', 'humanistic'],
  position: ['top-left', 'center-top', 'embedded'],
  illumination: 40% chance of illuminated initial
}
```

#### Marginalia (Scholarly Annotations)
```javascript
marginalia: {
  enabled: 80% chance,
  density: 0.1-0.3 range,
  runeType: ['marginal-notes', 'pointing-hands', 'nota-bene', 'correction-marks'],
  placement: ['right-margin', 'left-margin', 'both-margins', 'interlinear'],
  annotations: {
    density: 0.05-0.15,
    style: 'scholarly' or 'personal',
    language: 'latin' (30%) or 'vernacular' (70%)
  }
}
```

#### Manuscript Styling
```javascript
manuscript: {
  ruling: 60% chance of ruled lines,
  border: ['simple-rule', 'decorated-border', 'illuminated-frame', 'minimal'],
  texture: ['parchment', 'vellum', 'paper', 'papyrus'],
  aging: 0.1-0.3 subtle aging effect
}
```

#### Color Adjustments
```javascript
colorAdjustments: {
  warmth: 0.15-0.35,    // Warmer, parchment-like
  sepia: 0.08-0.20,     // Subtle sepia tone  
  vignette: 0.05-0.15   // Light edge darkening
}
```

### Opacity Range
**0.12 - 0.20** (subtle overlay that doesn't dominate the base glyph)

---

## 🏛️ Seal/Insignia Overlay System

### Purpose
Adds official, archival, and bureaucratic visual elements to content dealing with authority, documentation, or contested material.

### File Location
`/assets/js/glyphs/overlays/seal-insignia-overlay.js`

### Triggering Conditions

**Archive Markers**:
- archive, document, record, preservation, collection, catalog, vault

**Postal Markers**:
- post, mail, letter, correspondence, dispatch, delivery, envelope

**Authority Markers**:  
- seal, stamp, official, certification, validation, authority, government

**Bureaucratic Markers**:
- bureaucrat, office, administration, procedure, form, protocol, regulation

**Contested Intent Trigger**:
- `mm.intent.contested > 0.6` (high contestation level)

**Metadata Triggers**:
- `metadata.class === 'chamber'`
- `metadata.title` contains 'archive'

### Visual Elements

#### Seals and Stamps
```javascript
seals: {
  enabled: 80% chance,
  count: 1-4 (increases with contested level),
  style: ['circular-seal', 'coat-of-arms', 'institutional-stamp', 'government-seal'],
  placement: ['corner-stamp', 'center-seal', 'margin-mark', 'diagonal-stamp'],
  authority: ['local', 'regional', 'national', 'imperial', 'ecclesiastical', 'corporate']
}
```

#### Postal and Shipping Marks
```javascript
postal: {
  enabled: 60% chance,
  markType: ['postmark', 'cancellation', 'routing-stamp', 'customs-mark'],
  cancellation: {
    style: 'circular-postmark' or 'linear-cancellation',
    density: 0.3-0.7,
    angle: -30° to +30°,
    clarity: 0.2-0.8
  },
  routing: {
    enabled: 40% chance,
    count: 1-3,
    style: 'transit-stamps' or 'routing-numbers'
  },
  dates: {
    enabled: 70% chance,
    dateFormat: 'european' or 'american', 
    year: 1880-1980 range for vintage feel
  }
}
```

#### Bureaucratic Elements
```javascript
bureaucratic: {
  enabled: More likely with contested content,
  stamps: ['approved', 'denied', 'pending', 'classified', 'confidential', 
           'urgent', 'priority', 'received', 'filed', 'processed'],
  redactions: { // Only when contested level > 0.7
    enabled: true,
    style: 'black-bars' or 'blacked-out',
    density: 0.1-0.3,
    angle: -5° to +5°
  },
  classifications: {
    'public': contested < 0.3,
    'internal': contested 0.3-0.5, 
    'restricted': contested 0.5-0.7,
    'confidential/classified': contested > 0.7
  }
}
```

#### Archive Preservation Marks
```javascript
archival: {
  enabled: 50% chance,
  preservationMarks: ['acid-free', 'archival-quality', 'temperature-controlled', 
                     'digitized', 'fragile'],
  cataloguing: {
    enabled: 60% chance,
    number: 'PREFIX-NNNN' + optional letter suffix,
    prefixes: ['MS', 'DOC', 'REC', 'ARC', 'FILE']
  },
  condition: ['excellent', 'good', 'fair', 'poor', 'fragile', 'damaged'],
  provenance: {
    enabled: 30% chance,
    depth: 1-3 provenance marks,
    institutional: 60% chance
  }
}
```

#### Visual Characteristics
```javascript
characteristics: {
  age: 0.2-0.8,         // How weathered/aged marks appear
  clarity: 0.4-0.8,     // How sharp/blurred impressions are
  layering: 1-3,        // How many mark layers overlap
  authenticity: 0.6-1.0 // How official/legitimate they appear
}
```

#### Color Adjustments
```javascript
colorAdjustments: {
  inkStaining: 0.1-0.3,                    // Ink bleed and staining
  redInk: 0.1-0.2 (normal) or 0.3-0.7 (contested), // Official red ink
  oxidation: 0.05-0.20,                    // Metal stamp oxidation
  fading: 0.1-0.4                          // Ink fading over time
}
```

### Opacity Range
**0.12 - 0.20** (consistent with scriptorium overlay)

---

## 🎲 Deterministic Generation

Both overlay systems use **deterministic seeded RNG** for consistent results:

```javascript
// Seed format: base_seed + ':overlay_name'
const rng = createSeededRNG(seed + ':scriptorium');
const rng = createSeededRNG(seed + ':seal-insignia');

// Simple seeded RNG implementation
createSeededRNG(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return function() {
    hash = Math.imul(hash, 0x9E3779B9);
    hash ^= hash >>> 16;
    return (hash >>> 0) / 0x100000000;
  };
}
```

**Benefits**:
- Same content + same seed = identical overlay
- Deterministic reload behavior
- Reproducible results for testing

---

## 🔧 Integration with Orchestrator

### Application Flow
```javascript
// In glyph-orchestrator-v2.5.js selectRendererFromMeaningModel():

1. Generate base parameters via binding
2. Extract lexica hits from rawText  
3. Check scriptorium overlay conditions
4. Check seal/insignia overlay conditions
5. Apply overlays if conditions met
6. Continue with micro-blending and logging
```

### Integration Code
```javascript
// Extract lexica hits from raw text
const lexicaHits = this.extractLexicaHits(rawText);

// Apply overlays
params = this.applyOverlays(params, lexicaHits, mm, metadata, em.seed);

// Apply overlays method:
if (window.ScriptoriumOverlay && window.ScriptoriumOverlay.shouldApply(lexicaHits, metadata)) {
  const scriptoriumOverlay = window.ScriptoriumOverlay.generate(params, seed);
  overlayParams.scriptoriumOverlay = scriptoriumOverlay;
}

if (window.SealInsigniaOverlay && window.SealInsigniaOverlay.shouldApply(lexicaHits, mm, metadata)) {
  const sealOverlay = window.SealInsigniaOverlay.generate(params, mm, seed);
  overlayParams.sealInsigniaOverlay = sealOverlay;
}
```

---

## 📊 Logging Integration

Overlay applications are logged in comprehensive glyph generation logs:

```javascript
overlays: {
  scriptorium: !!params.scriptoriumOverlay,
  sealInsignia: !!params.sealInsigniaOverlay
},
lexicaTriggered: lexicaHits.map(hit => `${hit.category}:${hit.marker}`)
```

**Console Output Examples**:
```
📜 Scriptorium overlay applied: {incipit: true, marginalia: true, opacity: 0.15}
🏛️ Seal/insignia overlay applied: {seals: true, postal: false, bureaucratic: true, opacity: 0.18}
```

---

## 🚨 Current Status: CRITICAL ISSUE

**Problem**: Overlay systems are **implemented and integrated** in the orchestrator, but **NOT loaded in templates**.

**Template Integration Required**:
```html
<script src="/assets/js/glyphs/overlays/scriptorium-overlay.js?v=19"></script>
<script src="/assets/js/glyphs/overlays/seal-insignia-overlay.js?v=19"></script>
```

**Loading Order**: Must be loaded **before** the orchestrator so the `window.ScriptoriumOverlay` and `window.SealInsigniaOverlay` objects are available.

**Impact**: Without template loading, overlays will never trigger, reducing visual distinctiveness.

---

## 📋 Testing and Validation

### Test Content for Scriptorium Overlay
```
"Personal diary entries inscribed by medieval scholars in manuscript marginalia reveal intimate traces of academic life."
```
**Expected**: Incipit, marginalia, parchment styling

### Test Content for Seal/Insignia Overlay  
```
"Official government documents with postal stamps and archival seals demonstrate bureaucratic authority validation procedures."
```
**Expected**: Official seals, postal marks, bureaucratic stamps

### Test Content for Both Overlays
```
"Private research manuscripts containing postal correspondence reveal archival traces of scholarly bureaucratic networks."
```
**Expected**: Both overlay systems may trigger

### Validation via SSIM Testing
Use `validation/ssim-tester.js` to verify overlays create visual distinctiveness:
- Overlay-triggered content should be visually distinct from non-overlay content
- Different overlay combinations should produce different visual signatures

---

*This documentation covers the complete overlay system architecture implemented as part of the Prime Directive Renderer Enhancement. The systems are ready for production use once integrated into the template loading sequence.*