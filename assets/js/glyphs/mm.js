// Meaning Model (MM) — renderer-agnostic, interpretable semantic state
// Input: existing analyzers + optional editorial priors
// Output: Canonical semantic representation for all organs

export function buildMM({ rawText, analyzers, priors = {} }) {
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
  
  // Intent layer - what the text wants to do
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
  
  // Texture layer - how the text feels
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
  
  // Dynamics layer - how the text moves
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
  
  // Log MM construction for diagnostics
  if (typeof window !== 'undefined' && window.console) {
    console.log('🧬 MM constructed:', {
      intent: Object.entries(intent).map(([k,v]) => `${k}:${v.toFixed(2)}`).join(', '),
      texture: Object.entries(texture).map(([k,v]) => `${k}:${v.toFixed(2)}`).join(', '),
      dynamics: Object.entries(dynamics).map(([k,v]) => `${k}:${v.toFixed(2)}`).join(', '),
      seed: meta.seed
    });
  }
  
  return { intent, texture, dynamics, meta };
}

// Export to global scope
if (typeof window !== 'undefined') {
  window.buildMM = buildMM;
  console.log('🧬 Meaning Model (MM) builder loaded');
}