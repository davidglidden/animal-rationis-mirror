# UCE Contracts — v1 (MM/EM)

## Meaning Model (MM) — canonical semantic state

The Meaning Model provides a renderer-agnostic, interpretable representation of semantic content.

```yaml
mm_contract_v1:
  intent:
    analytical: float      # 0..1 — argument, taxonomy, operators, structured analysis
    contemplative: float   # 0..1 — reflection, meditation, lyrical depth
    ritual: float          # 0..1 — ceremony, pattern, cyclical meaning
    contested: float       # 0..1 — debate, conflict, multiple perspectives
  texture:
    structural_complexity: float   # headings/roman numerals/lists/tables/parallelism
    historical_depth: float        # dates, citations, genealogies, strata language
    personal_intimacy: float       # I/you density, address, deixis
    cyclicality: float             # repetition, anaphora, refrains
  dynamics:
    velocity: float                # sentence cadence variance, aspect
    entropy: float                 # topic/embedding drift
    polarity: float                # affect balance
  meta:
    seed: string                   # deterministic seed base
    length_words: integer          # word count for scaling
    timestamp: integer             # construction timestamp
```

## Expression Model (EM) — renderer-neutral energies

The Expression Model translates semantic meaning into neutral energies that any renderer or organ can consume.

```yaml
em_contract_v1:
  families:
    gridness: float        # from analytical + structural_complexity
    stratification: float  # from historical_depth + contemplative + cyclicality
    flux: float            # from velocity + entropy + contested
    constellation: float   # from ritual + cyclicality + contemplative
  cadence:
    pulse: float           # repetition / stanzaic rhythm
    anisotropy: float      # directionality from argument structure
  scale:
    density: float         # concept density
    granularity: float     # paragraph vs aphorism grain (structural_complexity)
  seed: string             # inherited from MM
```

## Editorial Inputs

Content creators can influence the semantic analysis through front-matter:

```yaml
# Priors (nudges, not hard overrides) - typical range ±0.05 to ±0.15
glyph_priors:
  analytical: float        # boost/reduce analytical detection
  contemplative: float     # boost/reduce contemplative detection
  ritual: float           # boost/reduce ritual detection
  contested: float        # boost/reduce contested detection

# Hard override (rare, editorial control)
glyph_family: enum(grid|strata|flow|constellation)

# Upstream MM injection (from other organs - if present, use as-is)
mm:
  intent: { analytical: 0.82, contemplative: 0.41, ritual: 0.28, contested: 0.12 }
  texture: { structural_complexity: 0.77, historical_depth: 0.66, personal_intimacy: 0.21, cyclicality: 0.34 }
  dynamics: { velocity: 0.48, entropy: 0.29, polarity: 0.12 }
  meta: { seed: "sha256(content…)", length_words: 1850 }
```

## Determinism

All organs and renderers must derive their seeds deterministically:

- **Seed format**: `hash(mm.meta.seed + ':' + organOrRendererId)`
- **Same input → Same output**: Identical MM should produce identical EM and parameters
- **Different content → Different results**: Similar content should produce distinguishable outputs

## Logging

Each renderer emits exactly one diagnostic line:

```
🧭 MM→EM→Render { 
  mm: { intent: "analytical:0.82,contemplative:0.41", texture: "structural:0.77", dynamics: "velocity:0.48" },
  em: { families: "gridness:0.76,stratification:0.53", cadence: "pulse:0.34", scale: "density:0.29" },
  family: "grid", 
  chosen: "Grid",
  paramsSummary: { columns: 6, cellSize: 18, jitter: 0.03 }
}
```

## Tests — minimum requirements

1. **Golden fixtures**: Representative essays (analytical, contemplative, ritual)
2. **Determinism**: Same input → identical parameters  
3. **Divergence**: Different content of same type → distinguishable parameters (≥15% difference)
4. **Family selection**: "Ritual of Choosing" → grid/strata (not flow), "Vespers with Jordi" → strata

## Binding Output Contract v2.5.1

Each family binding exports `fromEM(em)` and MUST return:

```javascript
{
  family: "<FamilyName>",                // exact family string
  seed: string,                          // deterministic seed
  palette: { name: string, ... },        // sacred-palette selection
  scale: number,                         // 0.5–2.0

  // Required family knobs (examples; see per-family list)
  knobs: { ... },                        // flat; all required present

  // Optional
  secondary?: { family: string, strength: number },  // if EM.secondary_affinity>0.65
  __contract: "binding-2.5.1"
}
```

### Per-Family Required Knobs

- **Flow**: velocity, turbulence, direction
- **Grid**: gridness, granularity, orthogonality
- **Strata**: layers, depth, density
- **Constellation**: starCount, brightness, connections
- **Radiance**: intensity, rayCount, glow, burst
- **Interference**: waveCount, phase, amplitude
- **Spiral**: turns, tightness, armCount
- **Balance**: axisTilt, weights, tension
- **Chaos**: noiseScale, entropy
- **Collapse**: centerBias, decayRate, fragmentation
- **Threshold**: edgeStrength, contrast, bandCount

### Validation

All bindings are validated using `assertBindingOutput()` from `contracts.js`:

```javascript
import { validateFamilyBinding } from './contracts.js';

export function fromEM(em) {
  const out = { family: 'Example', seed, palette, scale, knobs, __contract: 'binding-2.5.1' };
  validateFamilyBinding('Example', out);
  return out;
}
```

## Architecture Benefits

1. **Separation of concerns**: Semantic analysis separate from visual rendering
2. **Extensibility**: New organs only need to produce/adjust MM fields
3. **Testability**: Each layer independently testable
4. **Consistency**: All organs speak the same semantic language
5. **Editorial control**: Front-matter overrides without touching code

## Future Organs

- **Ritual**: Adjusts MM intent.ritual and texture.cyclicality
- **Atlas/Temporal**: Modifies MM texture.historical_depth and dynamics.velocity  
- **Palette/Identity**: Consumes EM for color/typography decisions
- **Chamber**: Injects upstream MM from philosophical dialogues

All organs follow the same contract: produce or consume MM/EM, never touch renderers directly.

---

**Version**: UCE v1.0  
**Last updated**: 2025-09-10  
**Compatibility**: Requires deterministic seed hashing and structured logging