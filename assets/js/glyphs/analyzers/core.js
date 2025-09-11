// Core Analyzers - Structure, Rhetoric, Poetics, Intertext, Temporal, Voice
// Each analyzer emits span-level evidence with provenance

import { registerAnalyzer } from '../analyzer-council.js';

// Structure Analyzer - AST-aware structural elements
registerAnalyzer({
  name: 'structure',
  version: '1.2.0',
  fn: async ({ rawText, ast, index }) => {
    const evidence = [];
    const summary = { headings: 0, lists: 0, blockquotes: 0, paragraphs: 0 };
    
    for (const block of ast.children) {
      const span = index.byBlock[block.blockId]?.span;
      
      if (block.type === 'heading') {
        summary.headings++;
        evidence.push({
          id: `structure:heading:${block.blockId}`,
          type: 'structure:heading',
          span,
          region: { blockId: block.blockId, line: block.line },
          payload: { level: block.level, text: block.text },
          confidence: 0.95,
          provenance: {
            analyzer: 'structure',
            version: '1.2.0',
            method: 'ast',
            timestamp: new Date().toISOString()
          }
        });
      }
      
      if (block.type === 'list') {
        summary.lists++;
        evidence.push({
          id: `structure:list:${block.blockId}`,
          type: 'structure:list',
          span,
          region: { blockId: block.blockId, line: block.line },
          payload: { itemCount: block.items.length, items: block.items.slice(0, 3) },
          confidence: 0.9,
          provenance: {
            analyzer: 'structure',
            version: '1.2.0', 
            method: 'ast',
            timestamp: new Date().toISOString()
          }
        });
      }
      
      if (block.type === 'blockquote') {
        summary.blockquotes++;
        evidence.push({
          id: `structure:blockquote:${block.blockId}`,
          type: 'structure:blockquote',
          span,
          region: { blockId: block.blockId, line: block.line },
          payload: { lineCount: block.content.length, preview: block.content[0] },
          confidence: 0.92,
          provenance: {
            analyzer: 'structure',
            version: '1.2.0',
            method: 'ast', 
            timestamp: new Date().toISOString()
          }
        });
      }
      
      if (block.type === 'paragraph') {
        summary.paragraphs++;
      }
    }
    
    return { summary, evidence };
  }
});

// Rhetoric Analyzer - Questions, imperatives, hedging, patterns
registerAnalyzer({
  name: 'rhetoric',
  version: '1.1.0',
  fn: async ({ rawText }) => {
    const evidence = [];
    const summary = { questions: 0, imperatives: 0, hedging: 0, triads: 0 };
    
    // Questions
    const questionMatches = rawText.matchAll(/[.!]\s*([^.!?]*\?)/g);
    for (const match of questionMatches) {
      summary.questions++;
      evidence.push({
        id: `rhetoric:question:${match.index}`,
        type: 'rhetoric:question',
        span: { start: match.index, end: match.index + match[0].length },
        payload: { question: match[1].trim() },
        confidence: 0.85,
        provenance: {
          analyzer: 'rhetoric',
          version: '1.1.0',
          method: 'regex',
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // Imperatives - simple heuristic
    const imperativePatterns = /\b(consider|imagine|think|look|see|remember|note|observe)\b/gi;
    const imperativeMatches = rawText.matchAll(imperativePatterns);
    for (const match of imperativeMatches) {
      summary.imperatives++;
      evidence.push({
        id: `rhetoric:imperative:${match.index}`,
        type: 'rhetoric:imperative',
        span: { start: match.index, end: match.index + match[0].length },
        payload: { verb: match[0].toLowerCase() },
        confidence: 0.6,
        provenance: {
          analyzer: 'rhetoric',
          version: '1.1.0',
          method: 'regex',
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // Hedging - modal verbs and uncertainty
    const hedgePatterns = /\b(might|could|perhaps|possibly|maybe|seems?|appears?|tends?)\b/gi;
    const hedgeMatches = rawText.matchAll(hedgePatterns);
    for (const match of hedgeMatches) {
      summary.hedging++;
      evidence.push({
        id: `rhetoric:hedge:${match.index}`,
        type: 'rhetoric:hedge',
        span: { start: match.index, end: match.index + match[0].length },
        payload: { hedge: match[0].toLowerCase() },
        confidence: 0.7,
        provenance: {
          analyzer: 'rhetoric',
          version: '1.1.0',
          method: 'regex',
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // Triads - three-part patterns
    const triadPattern = /\b(\w+),\s+(\w+),?\s+and\s+(\w+)\b/gi;
    const triadMatches = rawText.matchAll(triadPattern);
    for (const match of triadMatches) {
      summary.triads++;
      evidence.push({
        id: `rhetoric:triad:${match.index}`,
        type: 'rhetoric:triad',
        span: { start: match.index, end: match.index + match[0].length },
        payload: { 
          elements: [match[1], match[2], match[3]],
          pattern: match[0]
        },
        confidence: 0.8,
        provenance: {
          analyzer: 'rhetoric',
          version: '1.1.0',
          method: 'regex',
          timestamp: new Date().toISOString()
        }
      });
    }
    
    return { summary, evidence };
  }
});

// Poetics Analyzer - Haiku, line breaks, repetition, rhythm
registerAnalyzer({
  name: 'poetics',
  version: '0.9.3', 
  fn: async ({ rawText, ast }) => {
    const evidence = [];
    const summary = { lineBreaks: 0, refrains: 0, haikuCandidates: 0 };
    
    // Line break patterns - significant whitespace
    const lineBreakPattern = /\n\s*\n/g;
    const lineBreaks = rawText.matchAll(lineBreakPattern);
    for (const match of lineBreaks) {
      summary.lineBreaks++;
      evidence.push({
        id: `poetics:linebreak:${match.index}`,
        type: 'poetics:linebreak',
        span: { start: match.index, end: match.index + match[0].length },
        payload: { type: 'paragraph-break' },
        confidence: 0.9,
        provenance: {
          analyzer: 'poetics',
          version: '0.9.3',
          method: 'regex',
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // Simple haiku detection - 3 lines with approximate syllable counts
    const lines = rawText.split(/\n/);
    for (let i = 0; i <= lines.length - 3; i++) {
      const potentialHaiku = [lines[i], lines[i+1], lines[i+2]]
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      if (potentialHaiku.length === 3) {
        const syllables = potentialHaiku.map(estimateSyllables);
        
        // 5-7-5 pattern with tolerance
        if (Math.abs(syllables[0] - 5) <= 1 &&
            Math.abs(syllables[1] - 7) <= 1 &&
            Math.abs(syllables[2] - 5) <= 1) {
          summary.haikuCandidates++;
          
          const start = rawText.indexOf(potentialHaiku[0]);
          const end = rawText.indexOf(potentialHaiku[2]) + potentialHaiku[2].length;
          
          evidence.push({
            id: `poetics:haiku:${start}`,
            type: 'poetics:haiku',
            span: { start, end },
            payload: { 
              lines: potentialHaiku,
              syllables,
              pattern: `${syllables[0]}-${syllables[1]}-${syllables[2]}`
            },
            confidence: syllables.every(s => s >= 3 && s <= 9) ? 0.75 : 0.5,
            provenance: {
              analyzer: 'poetics',
              version: '0.9.3',
              method: 'syllable-estimation',
              timestamp: new Date().toISOString()
            }
          });
        }
      }
    }
    
    return { summary, evidence };
  }
});

// Simple syllable estimation (English-focused)
function estimateSyllables(text) {
  return text.toLowerCase()
    .replace(/[^a-z]/g, '')
    .replace(/[^aeiouy]+/g, 'c')
    .replace(/[aeiouy]+/g, 'v')
    .replace(/c*v/g, 'x')
    .length || 1;
}

// Voice Analyzer - Person, register, address patterns
registerAnalyzer({
  name: 'voice',
  version: '1.0.1',
  fn: async ({ rawText }) => {
    const evidence = [];
    const summary = { firstPerson: 0, secondPerson: 0, thirdPerson: 0 };
    
    // First person markers
    const firstPersonPattern = /\b(I|me|my|mine|myself|we|us|our|ours|ourselves)\b/gi;
    const firstPersonMatches = rawText.matchAll(firstPersonPattern);
    for (const match of firstPersonMatches) {
      summary.firstPerson++;
      evidence.push({
        id: `voice:first-person:${match.index}`,
        type: 'voice:first-person',
        span: { start: match.index, end: match.index + match[0].length },
        payload: { pronoun: match[0].toLowerCase() },
        confidence: 0.9,
        provenance: {
          analyzer: 'voice',
          version: '1.0.1',
          method: 'regex',
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // Second person markers
    const secondPersonPattern = /\b(you|your|yours|yourself|yourselves)\b/gi;
    const secondPersonMatches = rawText.matchAll(secondPersonPattern);
    for (const match of secondPersonMatches) {
      summary.secondPerson++;
      evidence.push({
        id: `voice:second-person:${match.index}`,
        type: 'voice:second-person', 
        span: { start: match.index, end: match.index + match[0].length },
        payload: { pronoun: match[0].toLowerCase() },
        confidence: 0.9,
        provenance: {
          analyzer: 'voice',
          version: '1.0.1',
          method: 'regex',
          timestamp: new Date().toISOString()
        }
      });
    }
    
    return { summary, evidence };
  }
});

// Temporal Analyzer - Dates, time references, temporal flow
registerAnalyzer({
  name: 'temporal',
  version: '1.0.2',
  fn: async ({ rawText }) => {
    const evidence = [];
    const summary = { dates: 0, timewords: 0 };
    
    // Year patterns
    const yearPattern = /\b(19|20)\d{2}\b/g;
    const yearMatches = rawText.matchAll(yearPattern);
    for (const match of yearMatches) {
      summary.dates++;
      evidence.push({
        id: `temporal:year:${match.index}`,
        type: 'temporal:year',
        span: { start: match.index, end: match.index + match[0].length },
        payload: { year: parseInt(match[0]) },
        confidence: 0.95,
        provenance: {
          analyzer: 'temporal',
          version: '1.0.2',
          method: 'regex',
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // Temporal words
    const timePattern = /\b(today|yesterday|tomorrow|now|then|before|after|during|while|when|until|since|always|never|often|sometimes|usually|recently|soon|later|earlier)\b/gi;
    const timeMatches = rawText.matchAll(timePattern);
    for (const match of timeMatches) {
      summary.timewords++;
      evidence.push({
        id: `temporal:timeword:${match.index}`,
        type: 'temporal:timeword',
        span: { start: match.index, end: match.index + match[0].length },
        payload: { word: match[0].toLowerCase() },
        confidence: 0.75,
        provenance: {
          analyzer: 'temporal',
          version: '1.0.2',
          method: 'regex',
          timestamp: new Date().toISOString()
        }
      });
    }
    
    return { summary, evidence };
  }
});

console.log('📊 Core analyzers loaded (Structure, Rhetoric, Poetics, Voice, Temporal)');