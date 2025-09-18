// Analyzer Council - Evidence-Based Semantic Analysis System
// Prime Directive: Nuanced, span-level evidence with provenance, not flattened scores

// Evidence contract
/**
 * @typedef {Object} Evidence
 * @property {string} id - stable per detection
 * @property {string} type - e.g., "poetics:haiku", "music:form:passacaglia"
 * @property {Object} [span] - { start: number, end: number }
 * @property {Object} [region] - { blockId?: string, line?: number }
 * @property {Object} payload - detection-specific data
 * @property {number} confidence - 0..1
 * @property {Object} provenance - { analyzer, version, method, timestamp }
 */

/**
 * @typedef {Object} AnalyzerOutput
 * @property {Object} summary - analyzer-specific summary data
 * @property {Evidence[]} evidence - span-level evidence array
 * @property {string[]} [warnings] - optional warnings
 */

// Parser & AST infrastructure
export function parseMarkdown(rawText) {
  // Simple parser for now - will enhance with mdast if needed
  const lines = rawText.split('\n');
  const blocks = [];
  let currentBlock = null;
  let lineNumber = 0;
  
  for (const line of lines) {
    lineNumber++;
    
    if (line.trim() === '') {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }
    
    if (line.startsWith('#')) {
      if (currentBlock) blocks.push(currentBlock);
      const level = line.match(/^#+/)[0].length;
      currentBlock = {
        type: 'heading',
        level,
        text: line.substring(level).trim(),
        line: lineNumber,
        blockId: stableBlockId(line, lineNumber)
      };
    } else if (line.match(/^[-*+]\s/)) {
      if (currentBlock?.type !== 'list') {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'list', items: [], line: lineNumber };
      }
      currentBlock.items.push(line.substring(2).trim());
    } else if (line.startsWith('>')) {
      if (currentBlock?.type !== 'blockquote') {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'blockquote', content: [], line: lineNumber };
      }
      currentBlock.content.push(line.substring(1).trim());
    } else {
      if (currentBlock?.type !== 'paragraph') {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'paragraph', content: [], line: lineNumber };
      }
      currentBlock.content.push(line);
    }
  }
  
  if (currentBlock) blocks.push(currentBlock);
  
  // Build index
  const index = buildIndex(blocks, rawText);
  const ast = { type: 'root', children: blocks };
  
  // Debug: Log parse results
  if (blocks.length === 0 && rawText.length > 100) {
    console.warn('[parseMarkdown] No blocks parsed from', rawText.length, 'chars of text');
  }
  
  return { ast, index };
}

function stableBlockId(text, line) {
  const content = text.trim().toLowerCase().replace(/\s+/g, '-');
  return hashString(`${content}:${line}`);
}

function buildIndex(blocks, rawText) {
  const byType = {};
  const byBlock = {};
  const spans = [];
  
  let charOffset = 0;
  
  for (const block of blocks) {
    const blockText = getBlockText(block);
    const span = { start: charOffset, end: charOffset + blockText.length };
    
    (byType[block.type] ||= []).push(block);
    byBlock[block.blockId] = { block, span };
    spans.push({ blockId: block.blockId, ...span });
    
    charOffset += blockText.length + 1; // +1 for newline
  }
  
  return { byType, byBlock, spans };
}

function getBlockText(block) {
  switch (block.type) {
    case 'heading': return '#'.repeat(block.level) + ' ' + block.text;
    case 'paragraph': return block.content.join('\n');
    case 'list': return block.items.map(item => '- ' + item).join('\n');
    case 'blockquote': return block.content.map(line => '> ' + line).join('\n');
    default: return JSON.stringify(block);
  }
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

// Analyzer Council Singleton Class
class AnalyzerCouncil {
  constructor() {
    this.registry = new Map();
    this._readyResolvers = [];
  }
  
  register(name, version, fn) {
    this.registry.set(name, { name, version, fn });
    console.log(`[AnalyzerCouncil] Registered: ${name} v${version}`);
    // ping waiters
    this._readyResolvers.forEach(r => r());
  }
  
  list() { 
    return Array.from(this.registry.entries()).map(([name, mod]) => ({
      name,
      version: mod.version
    }));
  }
  
  size() {
    return this.registry.size;
  }
  
  getAnalyzers() {
    return this.registry;
  }

  /**
   * Resolve when at least `min` analyzers are registered (or on next tick if already met).
   */
  whenReady({ min = 1, timeoutMs = 2000 } = {}) {
    if (this.registry.size >= min) return Promise.resolve();
    return new Promise((resolve) => {
      const t = setTimeout(resolve, timeoutMs);
      const tick = () => {
        if (this.registry.size >= min) {
          clearTimeout(t);
          resolve();
        }
      };
      this._readyResolvers.push(tick);
      queueMicrotask(tick);
    });
  }
}

// —— Canonical global singleton ——
const root = (typeof window !== 'undefined') ? window : globalThis;
if (!root.__GlyphAnalyzerCouncil__) {
  root.__GlyphAnalyzerCouncil__ = new AnalyzerCouncil();
}

export const council = root.__GlyphAnalyzerCouncil__;

// Legacy compatibility exports that use the singleton
export function registerAnalyzer({ name, version, fn }) {
  council.register(name, version, fn);
}

// Self-verification functions for dev diagnostics
export function listAnalyzers() {
  return council.list();
}

export function countAnalyzers() {
  return council.size();
}

export async function runAnalyzers(ctx) {
  const outputs = [];
  const analyzers = council.getAnalyzers();
  
  // Debug: Log input context
  if (ctx.rawText?.length > 100) {
    console.log(`[AnalyzerCouncil] Running ${analyzers.size} analyzers on ${ctx.rawText.length} chars, sample: "${ctx.rawText.slice(0,50)}..."`);
  }
  
  for (const [name, mod] of analyzers) {
    try {
      const result = await mod.fn(ctx);
      
      // Debug: Check if analyzer returned anything
      const evidenceCount = result?.evidence?.length || 0;
      if (evidenceCount === 0 && ctx.rawText?.length > 100) {
        console.log(`[AnalyzerCouncil] ${name} found 0 evidence`);
      }
      
      outputs.push({ 
        name, 
        version: mod.version, 
        summary: result.summary || {},
        evidence: result.evidence || [],
        warnings: result.warnings || []
      });
    } catch (error) {
      console.warn(`[AnalyzerCouncil] ${name} failed:`, error);
      outputs.push({
        name,
        version: mod.version,
        summary: {},
        evidence: [],
        warnings: [`Analyzer failed: ${error.message}`]
      });
    }
  }
  return outputs;
}

// Evidence merger - preserves spans and provenance
export function mergeCouncil(outputs) {
  const byType = {};
  const byBlock = {};
  const versions = {};
  const summary = {};
  
  for (const output of outputs) {
    versions[output.name] = output.version;
    
    // Merge evidence by type
    for (const evidence of output.evidence) {
      (byType[evidence.type] ||= []).push(evidence);
      
      // Index by block if region specified
      if (evidence.region?.blockId) {
        (byBlock[evidence.region.blockId] ||= []).push(evidence);
      }
    }
    
    // Merge summary with namespacing
    Object.assign(summary, nestSummary(output.summary, output.name));
  }
  
  // Stable ordering by type, then span, then id
  for (const type in byType) {
    byType[type].sort((a, b) => {
      const spanA = a.span?.start ?? 0;
      const spanB = b.span?.start ?? 0;
      return spanA - spanB || a.id.localeCompare(b.id);
    });
  }
  
  return {
    byType,
    byBlock,
    summary,
    versions,
    confidenceCalibration: 'symbolic-cal-2025-09-11'
  };
}

function nestSummary(summary, analyzerName) {
  const nested = {};
  for (const [key, value] of Object.entries(summary)) {
    nested[`${analyzerName}:${key}`] = value;
  }
  return nested;
}

// Guess language for analyzer context
export function guessLang(rawText) {
  const text = rawText.toLowerCase();
  
  // Romance language detection
  if (text.match(/\b(la|el|les?|du|des?|un[ae]?)\b/g)?.length > 3) {
    if (text.includes('però') || text.includes('però')) return 'ca'; // Catalan
    if (text.includes('mais') || text.includes('avec')) return 'fr'; // French  
    if (text.includes('pero') || text.includes('con')) return 'es'; // Spanish
    return 'fr'; // default Romance
  }
  
  return 'en'; // default
}

// Stable text hash for caching & determinism
export function stableTextHash(text) {
  const normalized = text.normalize('NFC').trim();
  return hashString(normalized);
}

console.log('📊 Analyzer Council infrastructure loaded (ESM)');