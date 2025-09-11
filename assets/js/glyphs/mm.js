// Meaning Model (MM) — renderer-agnostic, interpretable semantic state
// Input: existing analyzers + optional editorial priors
// Output: Canonical semantic representation for all organs

import { parseMarkdown, runAnalyzers, mergeCouncil, guessLang, stableTextHash } from './analyzer-council.js';
import { htmlToMarkdownLite, looksLikeHTML } from './content-resolver.js';

export async function buildMM(input) {
  let rawText, analyzers, priors;

  if (typeof input === 'string') {
    rawText   = input;
    analyzers = undefined; // will run council
    priors    = {};
  } else if (input && typeof input === 'object') {
    rawText   = (input.rawText ?? '').toString();
    analyzers = input.analyzers; // if provided, use as-is
    priors    = input.priors ?? {};
  } else {
    rawText   = '';
    analyzers = undefined;
    priors    = {};
  }

  rawText = rawText.normalize('NFC');
  
  // Guard: if HTML slipped through, convert it
  if (looksLikeHTML(rawText)) {
    console.warn('[MM] HTML detected in input, converting to markdown');
    rawText = htmlToMarkdownLite(rawText);
  }
  
  // Parse once  
  const { ast, index } = parseMarkdown(rawText);
  
  // Parser smoke - verify AST structure
  const countNodes = (n) => { let c=1; (n.children||[]).forEach(ch=>c+=countNodes(ch)); return c; };
  console.log('[MM] parseMarkdown: chars=%d nodes=%d', rawText.length, countNodes(ast));
  
  // Run analyzers (council) if not provided
  if (!analyzers) {
    const councilOutputs = await runAnalyzers({ 
      rawText, ast, index, 
      lang: guessLang(rawText), 
      meta: priors?.meta 
    });
    
    if (priors?.analyzers?.__inject) {
      councilOutputs.push(...priors.analyzers.__inject);
    }
    
    const council = mergeCouncil(councilOutputs);
    
    // Council merge verification - check evidence survival  
    const ledger = Object.fromEntries(
      Object.entries(council.byType).map(([k, arr]) => [k, arr.length])
    );
    console.log('[Council] evidence counts byType:', ledger);
    const totalEvidence = Object.values(council.byType).reduce((n,arr)=>n+arr.length,0);
    console.log('[Council] total evidence pieces:', totalEvidence);
    
    // Flag if no evidence on meaningful content
    if (totalEvidence === 0 && rawText.length > 20) {
      console.warn('[Council] NO EVIDENCE detected on substantial content - analyzer regex/Unicode issue');
    }
    
    // Convert council evidence to legacy analyzer format for compatibility
    analyzers = councilToLegacyAnalyzers(council, rawText);
  }
  
  const { 
    multiModal, 
    contentType, 
    structure = {}, 
    lexicon = {}, 
    temporal = {}, 
    resonance = {}, 
    topology = {}, 
    textStats = {},
    extendedSemantics = {}
  } = analyzers;
  
  // Clamp to 0..1 range
  const c01 = x => Math.max(0, Math.min(1, x ?? 0));
  
  // Treat Multi-Modal as a prior only when very confident
  const mmPrior = {
    structural:    (multiModal?.primary === 'structural'    && multiModal.confidence >= 0.95) ? 1 : 0,
    temporal:      (multiModal?.primary === 'temporal'      && multiModal.confidence >= 0.95) ? 1 : 0,
    mythic:        (multiModal?.primary === 'mythic'        && multiModal.confidence >= 0.95) ? 1 : 0,
    contemplative: (multiModal?.primary === 'contemplative' && multiModal.confidence >= 0.95) ? 1 : 0
  };
  
  // STRENGTHENED ANALYTICAL DETECTION from Pass 2
  // Use extended semantics to boost analytical detection for structured content
  const structuralBoost = extendedSemantics?.headers > 2 || extendedSemantics?.lists > 3 ? 0.25 : 0;
  const analyticalFromStructure = c01(
    (structure.analyticalScore || 0) + 
    structuralBoost + 
    (extendedSemantics?.table ? 0.15 : 0)
  );
  
  // Helper functions to create zero-filled objects
  const zeroIntent = () => ({ analytical: 0, contemplative: 0, ritual: 0, contested: 0 });
  const zeroTexture = () => ({ structural_complexity: 0, historical_depth: 0, personal_intimacy: 0, cyclicality: 0 });
  const zeroDynamics = () => ({ velocity: 0, entropy: 0, polarity: 0 });
  
  // Pretty formatters for logs (do NOT store these in mm.*)
  const formatIntent = (i) => `analytical:${i.analytical.toFixed(2)}, contemplative:${i.contemplative.toFixed(2)}, ritual:${i.ritual.toFixed(2)}, contested:${i.contested.toFixed(2)}`;
  const formatTexture = (t) => `structural_complexity:${t.structural_complexity.toFixed(2)}, historical_depth:${t.historical_depth.toFixed(2)}, personal_intimacy:${t.personal_intimacy.toFixed(2)}, cyclicality:${t.cyclicality.toFixed(2)}`;
  const formatDynamics = (d) => `velocity:${d.velocity.toFixed(2)}, entropy:${d.entropy.toFixed(2)}, polarity:${d.polarity.toFixed(2)}`;

  // Intent layer - what the text wants to do (OBJECTS, not strings)
  const intent = {
    analytical: c01(
      0.45 * analyticalFromStructure + 
      0.35 * c01(lexicon.analytical || 0) + 
      0.20 * mmPrior.structural + 
      (priors.analytical ?? 0)
    ),
    contemplative: c01(
      0.50 * c01(lexicon.contemplative || 0) + 
      0.30 * c01(temporal.lyricality || 0) + 
      0.20 * mmPrior.contemplative + 
      (priors.contemplative ?? 0)
    ),
    ritual: c01(
      0.55 * c01(lexicon.ritual || 0) + 
      0.25 * c01(structure.cyclicality || 0) + 
      0.20 * mmPrior.mythic + 
      (priors.ritual ?? 0)
    ),
    contested: c01(
      0.60 * c01(lexicon.contested || 0) + 
      0.20 * c01(temporal.debate || 0) + 
      0.20 * c01(resonance.dissonanceLevel || 0) + 
      (priors.contested ?? 0)
    )
  };
  
  // Texture layer - how the text feels (OBJECTS, not strings)
  const texture = {
    structural_complexity: c01(
      structure.complexity || 
      (extendedSemantics?.headers > 0 ? 0.3 : 0) + 
      (extendedSemantics?.lists > 0 ? 0.2 : 0)
    ),
    historical_depth: c01(temporal.historicalDepth || 0),
    personal_intimacy: c01(lexicon.personal || 0),
    cyclicality: c01(structure.cyclicality || 0),
  };
  
  // Dynamics layer - how the text moves (OBJECTS, not strings)
  const dynamics = {
    velocity: c01(temporal.velocity || 0),
    entropy: c01(topology.topicEntropy || 0),
    polarity: c01(resonance.affectPolarity || 0),
  };
  
  // Metadata for determinism and diagnostics
  const meta = {
    seed: String(analyzers.seed || analyzers.fingerprint || 'mm:seed'),
    length_words: textStats.wordCount || 0,
    timestamp: Date.now()
  };
  
  // Enhanced MM with council data
  const mm = {
    intent, texture, dynamics, meta,
    // Add council features if available
    features: analyzers.__council ? { council: analyzers.__council } : undefined
  };
  
  // Semantic validation - only minimal tie-breaking for truly empty content
  const semanticEnergy = Object.values(intent).concat(Object.values(texture), Object.values(dynamics)).reduce((a,b)=>a+b,0);
  if (semanticEnergy === 0 && analyzers.__council && !Object.keys(analyzers.__council.byType).length) {
    console.warn('[MM] No semantic analysis detected - text may be too minimal or analyzers failed');
    // Only minimal tie-breaking for truly empty content (single emoji, etc.)
    // Real content should produce meaningful semantic vectors through evidence pipeline
    if (rawText.length < 10) {
      const hashNum = parseInt(meta.seed.slice(-6), 36) / Math.pow(36, 6);
      mm.intent.analytical = c01(0.01 + 0.02 * hashNum); // minimal tie-breaker only
      console.log('[MM] Minimal tie-breaker applied for empty content');
    }
  }
  
  // Log MM construction for diagnostics (using pretty formatters)
  if (typeof window !== 'undefined' && window.console) {
    console.log('🧬 MM constructed:', {
      intent: formatIntent(intent),
      texture: formatTexture(texture), 
      dynamics: formatDynamics(dynamics),
      seed: meta.seed,
      council: mm.features?.council ? 'evidence-based' : 'legacy'
    });
  }
  
  return mm;
}

// Helper for council prefix lookups (wildcards don't work on exact keys)
function getByTypePrefix(council, prefix) {
  const out = [];
  const T = council.byType || {};
  for (const k in T) if (k.startsWith(prefix)) out.push(...T[k]);
  return out;
}

// Convert council evidence to legacy analyzer format for MM compatibility
function councilToLegacyAnalyzers(council, rawText) {
  const wordCount = rawText.trim().split(/\s+/).filter(Boolean).length || 0;
  const sentenceCount = rawText.split(/[.!?]+/).filter(Boolean).length || 0;
  
  // Extract evidence counts and values using prefix helper
  const structureEvidence = (council.byType['structure:heading'] || []);
  const musicFormEvidence = getByTypePrefix(council, 'music:form:');
  const rhetoricEvidence = getByTypePrefix(council, 'rhetoric:');
  const poeticsEvidence = (council.byType['poetics:haiku'] || []);
  const temporalEvidence = getByTypePrefix(council, 'temporal:');
  const voiceEvidence = getByTypePrefix(council, 'voice:');
  
  console.log('[LegacyAnalyzers] evidence counts:', {
    structure: structureEvidence.length,
    musicForm: musicFormEvidence.length,
    rhetoric: rhetoricEvidence.length,
    poetics: poeticsEvidence.length,
    temporal: temporalEvidence.length,
    voice: voiceEvidence.length
  });
  
  // Map evidence to analyzer values (0..1 range)
  const clamp = x => Math.max(0, Math.min(1, x));
  
  return {
    // Store council for features
    __council: council,
    
    contentType: 'text',
    multiModal: null,
    
    // Structure analysis - with all MM-expected properties
    structure: {
      headingCount: structureEvidence.length,
      listCount: (council.byType['structure:list'] || []).length,
      complexity: clamp(structureEvidence.length / 10), // normalize
      analyticalScore: clamp((council.byType['rhetoric:question'] || []).length / 15), // questions drive analytical
      cyclicality: clamp(musicFormEvidence.length / 10) // musical forms suggest cyclical structure
    },
    
    // Lexicon analysis - with all MM-expected properties for intent calculation
    lexicon: {
      musicForms: musicFormEvidence.length,
      dominantForm: musicFormEvidence[0]?.type.split(':')[2] || null,
      analytical: clamp((council.byType['rhetoric:question'] || []).length / 10),
      contemplative: clamp(poeticsEvidence.length / 5 + voiceEvidence.filter(e => e.type === 'voice:first-person').length / 10),
      ritual: clamp(musicFormEvidence.filter(e => 
        ['vespers', 'magnificat', 'mass', 'motet'].includes(e.payload?.form)
      ).length / 3),
      contested: clamp(rhetoricEvidence.filter(e => 
        e.type === 'rhetoric:imperative' || e.type === 'rhetoric:hedge'
      ).length / 8),
      personal: clamp(voiceEvidence.filter(e => e.type === 'voice:first-person').length / 15)
    },
    
    // Temporal analysis - with all MM-expected properties
    temporal: {
      velocity: clamp(temporalEvidence.length / 20), // more temporal words = faster
      dateReferences: (council.byType['temporal:year'] || []).length,
      lyricality: clamp(poeticsEvidence.length / 5), // poetic elements suggest lyrical time
      debate: clamp((council.byType['rhetoric:question'] || []).length / 12), // questions suggest debate
      historicalDepth: clamp((council.byType['temporal:year'] || []).length / 5) // years suggest historical depth
    },
    
    // Resonance - rhetoric and poetics with all MM-expected properties
    resonance: {
      questionDensity: clamp((council.byType['rhetoric:question'] || []).length / 10),
      poeticElements: poeticsEvidence.length,
      affectPolarity: clamp(rhetoricEvidence.length / 15),
      dissonanceLevel: clamp((council.byType['rhetoric:hedge'] || []).length / 10) // hedging suggests dissonance
    },
    
    // Topology - derived from structure and content
    topology: {
      paragraphCount: (council.byType['structure:paragraph'] || []).length || 1,
      topicEntropy: clamp(Object.keys(council.byType).length / 20), // diversity of evidence types
      averageSentenceLength: wordCount / Math.max(1, sentenceCount)
    },
    
    // Text stats  
    textStats: { 
      wordCount, 
      sentenceCount, 
      characterCount: rawText.length 
    },
    
    // Extended semantics - evidence-enriched
    extendedSemantics: {
      evidenceTypes: Object.keys(council.byType).length,
      musicAware: musicFormEvidence.length > 0,
      ritualContent: musicFormEvidence.some(e => 
        ['vespers', 'magnificat', 'mass', 'motet'].includes(e.payload?.form)
      ),
      analyticalContent: (council.byType['rhetoric:question'] || []).length > 2,
      contemplativeContent: poeticsEvidence.length > 0 || 
                          voiceEvidence.filter(e => e.type === 'voice:first-person').length > 2
    },
    
    // Deterministic seed from content
    seed: stableTextHash(rawText),
    fingerprint: stableTextHash(rawText)
  };
}

// minimal fallback: counts only, used if no analyzers supplied
function minimalAnalyzersFrom(content) {
  const wordCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const sentenceCount = content ? content.split(/[.!?]+/).filter(Boolean).length : 0;
  return {
    contentType: 'text',
    textStats: { wordCount, sentenceCount, characterCount: content.length },
    extendedSemantics: {}
  };
}

// ES Module exports only - no globals
console.log('🧬 Meaning Model (MM) builder loaded (ESM)');