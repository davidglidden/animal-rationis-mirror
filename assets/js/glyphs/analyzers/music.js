// Music-Aware Analyzers - Forms, Forces, Practice, Sources, Venues
// Lexicon-driven with conservative confidence scoring

console.log('🎵 Music analyzers module loading...');
import { registerAnalyzer } from '../analyzer-council.js';
console.log('🎵 Music analyzers registerAnalyzer imported successfully');

// Music lexicons - will load from JSON files
const MUSIC_LEXICONS = {
  forms: [
    // Baroque forms
    'passacaglia', 'chaconne', 'ricercar', 'tiento', 'fantasia',
    'toccata', 'prelude', 'fugue', 'invention', 'sinfonia',
    // Sacred forms
    'motet', 'vespers', 'magnificat', 'mass', 'requiem', 'kyrie', 'gloria',
    'sanctus', 'agnus dei', 'te deum', 'miserere',
    // Dance forms
    'sarabande', 'courante', 'allemande', 'gigue', 'bourée', 'gavotte',
    'minuet', 'pavane', 'galliard', 'saltarello'
  ],
  
  forces: [
    // Early strings
    'viola da gamba', 'violone', 'lute', 'theorbo', 'chitarrone', 
    'viol consort', 'lyra viol', 'division viol',
    // Winds
    'cornett', 'cornetto', 'sackbut', 'dulcian', 'crumhorn', 
    'recorder', 'traverso', 'flute à bec',
    // Keyboard & continuo
    'harpsichord', 'clavichord', 'organ', 'continuo', 'basso continuo',
    'organ continuo', 'figured bass',
    // Vocal
    'soprano', 'alto', 'tenor', 'bass', 'SATB', 'choir', 'chorus',
    'ripieno', 'concertino', 'cappella'
  ],
  
  practice: [
    // Performance practice
    'inégalité', 'notes inégales', 'affekt', 'affect', 'tactus',
    'musica ficta', 'ornamentation', 'diminution', 'coloratura',
    'style brisé', 'style luthé', 'agrements',
    // Notation & theory
    'mensural', 'modal', 'hexachord', 'solmization',
    // Temperament
    'meantone', 'well-tempered', 'Kirnberger', 'Werckmeister',
    'equal temperament', 'just intonation'
  ],
  
  sources: [
    // Catalog systems
    'BWV', 'ZWV', 'RV', 'K.', 'Hob.', 'D.', 'Op.',
    'H.', 'RISM', 'NTUA',
    // Source types
    'manuscript', 'autograph', 'tablature', 'partbook',
    'Stimmbücher', 'partitura'
  ],
  
  venues: [
    // Acoustic descriptors  
    'reverb', 'reverberation', 'acoustic', 'acoustics',
    'stone nave', 'vaulted', 'cathedral', 'basilica', 'chapel',
    'dry studio', 'live room', 'chamber', 'salon',
    // Specific venues
    'Santes Creus', 'Fontfroide', 'Poblet', 'Cardona'
  ],
  
  ensembles: [
    'Le Concert des Nations', 'Les Musiciens du Louvre',
    'Hespèrion', 'La Capella Reial', 'Jordi Savall',
    'Monteverdi Choir', 'English Baroque Soloists',
    'Academy of Ancient Music', 'Orchestra of the Age of Enlightenment'
  ]
};

// Music Form & Genre Analyzer
registerAnalyzer({
  name: 'music-form',
  version: '0.4.0',
  fn: async ({ rawText, lang }) => {
    const evidence = [];
    const summary = { forms: [], formCount: 0 };
    
    for (const form of MUSIC_LEXICONS.forms) {
      // Multi-language pattern matching
      const patterns = createMusicPatterns(form, lang);
      
      for (const pattern of patterns) {
        const matches = rawText.matchAll(new RegExp(`\\b${escapeRegex(pattern)}\\b`, 'gi'));
        
        for (const match of matches) {
          const contextMatch = getContext(rawText, match.index, 50);
          const confidence = calculateMusicConfidence(match[0], contextMatch, 'form');
          
          if (confidence > 0.5) {
            summary.formCount++;
            if (!summary.forms.includes(form)) summary.forms.push(form);
            
            evidence.push({
              id: `music:form:${form}:${match.index}`,
              type: `music:form:${form}`,
              span: { start: match.index, end: match.index + match[0].length },
              payload: { 
                form,
                matched: match[0],
                context: contextMatch,
                era: getEra(form),
                cues: getFormCues(form)
              },
              confidence,
              provenance: {
                analyzer: 'music-form',
                version: '0.4.0',
                method: 'lexicon',
                timestamp: new Date().toISOString()
              }
            });
          }
        }
      }
    }
    
    return { summary, evidence };
  }
});

// Music Forces & Instrumentation Analyzer
registerAnalyzer({
  name: 'music-forces',
  version: '0.4.0', 
  fn: async ({ rawText, lang }) => {
    const evidence = [];
    const summary = { instruments: [], ensembleTypes: [] };
    
    for (const instrument of MUSIC_LEXICONS.forces) {
      const patterns = createMusicPatterns(instrument, lang);
      
      for (const pattern of patterns) {
        const matches = rawText.matchAll(new RegExp(`\\b${escapeRegex(pattern)}\\b`, 'gi'));
        
        for (const match of matches) {
          const contextMatch = getContext(rawText, match.index, 40);
          const confidence = calculateMusicConfidence(match[0], contextMatch, 'instrument');
          
          if (confidence > 0.5) {
            if (!summary.instruments.includes(instrument)) {
              summary.instruments.push(instrument);
            }
            
            evidence.push({
              id: `music:forces:${instrument.replace(/\s+/g, '-')}:${match.index}`,
              type: `music:forces:${getInstrumentFamily(instrument)}`,
              span: { start: match.index, end: match.index + match[0].length },
              payload: {
                instrument,
                matched: match[0],
                family: getInstrumentFamily(instrument),
                period: getInstrumentPeriod(instrument),
                tessitura: getTessitura(instrument),
                context: contextMatch
              },
              confidence,
              provenance: {
                analyzer: 'music-forces',
                version: '0.4.0',
                method: 'lexicon',
                timestamp: new Date().toISOString()
              }
            });
          }
        }
      }
    }
    
    return { summary, evidence };
  }
});

// Performance Practice Analyzer
registerAnalyzer({
  name: 'music-practice',
  version: '0.3.1',
  fn: async ({ rawText, lang }) => {
    const evidence = [];
    const summary = { practices: [], concepts: [] };
    
    for (const practice of MUSIC_LEXICONS.practice) {
      const patterns = createMusicPatterns(practice, lang);
      
      for (const pattern of patterns) {
        const matches = rawText.matchAll(new RegExp(`\\b${escapeRegex(pattern)}\\b`, 'gi'));
        
        for (const match of matches) {
          const contextMatch = getContext(rawText, match.index, 60);
          const confidence = calculateMusicConfidence(match[0], contextMatch, 'practice');
          
          if (confidence > 0.55) {
            if (!summary.practices.includes(practice)) {
              summary.practices.push(practice);
            }
            
            evidence.push({
              id: `music:practice:${practice.replace(/\s+/g, '-')}:${match.index}`,
              type: `music:practice:${getPracticeCategory(practice)}`,
              span: { start: match.index, end: match.index + match[0].length },
              payload: {
                practice,
                matched: match[0],
                category: getPracticeCategory(practice),
                period: getPracticePeriod(practice),
                context: contextMatch
              },
              confidence,
              provenance: {
                analyzer: 'music-practice',
                version: '0.3.1',
                method: 'lexicon',
                timestamp: new Date().toISOString()
              }
            });
          }
        }
      }
    }
    
    return { summary, evidence };
  }
});

// Source & Attribution Analyzer
registerAnalyzer({
  name: 'music-source',
  version: '0.2.5',
  fn: async ({ rawText }) => {
    const evidence = [];
    const summary = { catalogNumbers: [], sourceTypes: [] };
    
    // Catalog number patterns
    const catalogPatterns = [
      /\bBWV\s*\d+/gi,
      /\bZWV\s*\d+/gi, 
      /\bRV\s*\d+/gi,
      /\bH\.\s*\d+/gi,
      /\bOp\.\s*\d+/gi
    ];
    
    for (const pattern of catalogPatterns) {
      const matches = rawText.matchAll(pattern);
      for (const match of matches) {
        summary.catalogNumbers.push(match[0]);
        
        evidence.push({
          id: `music:source:catalog:${match.index}`,
          type: 'music:source:catalog',
          span: { start: match.index, end: match.index + match[0].length },
          payload: {
            catalogNumber: match[0],
            system: match[0].match(/^[A-Z]+/)[0],
            context: getContext(rawText, match.index, 30)
          },
          confidence: 0.9,
          provenance: {
            analyzer: 'music-source',
            version: '0.2.5',
            method: 'regex',
            timestamp: new Date().toISOString()
          }
        });
      }
    }
    
    return { summary, evidence };
  }
});

// Venue & Ensemble Analyzer
registerAnalyzer({
  name: 'music-venue',
  version: '0.2.0',
  fn: async ({ rawText }) => {
    const evidence = [];
    const summary = { venues: [], ensembles: [] };
    
    // Venue analysis
    for (const venue of MUSIC_LEXICONS.venues) {
      const matches = rawText.matchAll(new RegExp(`\\b${escapeRegex(venue)}\\b`, 'gi'));
      
      for (const match of matches) {
        const contextMatch = getContext(rawText, match.index, 50);
        const confidence = venue.length > 10 ? 0.8 : 0.6; // Longer venue names more confident
        
        evidence.push({
          id: `music:venue:${venue.replace(/\s+/g, '-')}:${match.index}`,
          type: venue.includes('reverb') || venue.includes('acoustic') ? 
                'music:venue:acoustic' : 'music:venue:location',
          span: { start: match.index, end: match.index + match[0].length },
          payload: {
            venue,
            matched: match[0],
            type: getVenueType(venue),
            context: contextMatch
          },
          confidence,
          provenance: {
            analyzer: 'music-venue',
            version: '0.2.0',
            method: 'lexicon',
            timestamp: new Date().toISOString()
          }
        });
      }
    }
    
    // Ensemble analysis
    for (const ensemble of MUSIC_LEXICONS.ensembles) {
      const matches = rawText.matchAll(new RegExp(`\\b${escapeRegex(ensemble)}\\b`, 'gi'));
      
      for (const match of matches) {
        summary.ensembles.push(ensemble);
        
        evidence.push({
          id: `music:ensemble:${ensemble.replace(/\s+/g, '-')}:${match.index}`,
          type: ensemble.includes('Savall') ? 'music:director:savall' : 'music:ensemble:early',
          span: { start: match.index, end: match.index + match[0].length },
          payload: {
            ensemble,
            matched: match[0],
            context: getContext(rawText, match.index, 40)
          },
          confidence: 0.85,
          provenance: {
            analyzer: 'music-venue',
            version: '0.2.0',
            method: 'lexicon',
            timestamp: new Date().toISOString()
          }
        });
      }
    }
    
    return { summary, evidence };
  }
});

// Helper functions for music analysis
function createMusicPatterns(term, lang) {
  const patterns = [term];
  
  // Add common variants
  if (term.includes(' ')) {
    patterns.push(term.replace(/\s+/g, '-'));
  }
  
  // Language-specific variants
  switch (lang) {
    case 'fr':
      if (term === 'viola da gamba') patterns.push('viole de gambe');
      if (term === 'harpsichord') patterns.push('clavecin');
      break;
    case 'es':
      if (term === 'viola da gamba') patterns.push('viola de gamba');
      break;
    case 'ca':
      if (term === 'choir') patterns.push('cor');
      break;
  }
  
  return patterns;
}

function calculateMusicConfidence(match, context, type) {
  let confidence = 0.6; // Base confidence for lexicon match
  
  // Boost confidence for multi-word terms
  if (match.includes(' ')) confidence += 0.1;
  
  // Boost for music context words
  const musicContextWords = ['music', 'concert', 'performance', 'recording', 'album', 'piece', 'work', 'composition'];
  if (musicContextWords.some(word => context.toLowerCase().includes(word))) {
    confidence += 0.15;
  }
  
  // Boost for specific patterns
  if (type === 'form' && context.match(/\bin\s+[a-z]\s+(minor|major)/i)) {
    confidence += 0.2;
  }
  
  return Math.min(confidence, 0.95);
}

function getContext(text, index, radius) {
  const start = Math.max(0, index - radius);
  const end = Math.min(text.length, index + radius);
  return text.slice(start, end);
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getEra(form) {
  const baroque = ['passacaglia', 'chaconne', 'ricercar', 'tiento', 'toccata'];
  const renaissance = ['motet', 'mass', 'magnificat'];
  
  if (baroque.includes(form)) return 'Baroque';
  if (renaissance.includes(form)) return 'Renaissance';
  return 'Early';
}

function getFormCues(form) {
  const cues = {
    'passacaglia': ['ostinato', 'ground bass', 'variations'],
    'chaconne': ['variations', 'ground bass'], 
    'fugue': ['counterpoint', 'subject', 'episodes'],
    'motet': ['polyphony', 'sacred text'],
    'vespers': ['psalms', 'magnificat', 'evening prayer']
  };
  return cues[form] || [];
}

function getInstrumentFamily(instrument) {
  if (['viola da gamba', 'violone', 'lute', 'theorbo'].includes(instrument)) return 'strings';
  if (['cornett', 'sackbut', 'recorder'].includes(instrument)) return 'winds';
  if (['harpsichord', 'organ', 'clavichord'].includes(instrument)) return 'keyboard';
  if (['soprano', 'alto', 'tenor', 'bass'].includes(instrument)) return 'vocal';
  return 'other';
}

function getInstrumentPeriod(instrument) {
  const early = ['viola da gamba', 'lute', 'theorbo', 'cornett', 'sackbut'];
  return early.includes(instrument) ? 'early' : 'baroque';
}

function getTessitura(instrument) {
  const tessituras = {
    'soprano': 'high',
    'alto': 'medium-high', 
    'tenor': 'medium',
    'bass': 'low',
    'violone': 'low'
  };
  return tessituras[instrument] || 'medium';
}

function getPracticeCategory(practice) {
  const ornaments = ['inégalité', 'notes inégales', 'ornamentation', 'diminution'];
  const theory = ['mensural', 'modal', 'hexachord', 'solmization'];
  const tuning = ['meantone', 'well-tempered', 'Kirnberger', 'equal temperament'];
  
  if (ornaments.includes(practice)) return 'ornamentation';
  if (theory.includes(practice)) return 'theory';
  if (tuning.includes(practice)) return 'temperament';
  return 'performance';
}

function getPracticePeriod(practice) {
  const renaissance = ['mensural', 'modal', 'hexachord'];
  const baroque = ['inégalité', 'style brisé', 'affekt'];
  
  if (renaissance.includes(practice)) return 'Renaissance';
  if (baroque.includes(practice)) return 'Baroque'; 
  return 'Early';
}

function getVenueType(venue) {
  if (venue.includes('reverb') || venue.includes('acoustic')) return 'acoustic';
  if (venue.includes('cathedral') || venue.includes('chapel')) return 'sacred';
  if (venue.includes('studio')) return 'recording';
  return 'historic';
}

console.log('🎵 Music-aware analyzers loaded (Form, Forces, Practice, Source, Venue)');