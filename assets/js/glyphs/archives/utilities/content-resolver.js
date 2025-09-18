// Content Resolver - Prime Directive Content Resolution Contract
// Ensures analyzers receive clean markdown/text, not HTML or slugs

// Lightweight HTML → Markdown converter (dependency-free)
export function htmlToMarkdownLite(html) {
  let s = html
    // Block-level → line breaks
    .replace(/<\/(p|div|section|article)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    // Headings
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
    // Lists
    .replace(/<li[^>]*>\s*/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    // Emphasis
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    // Blockquotes
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (m, inner) =>
      inner.split('\n').map(l => `> ${l}`).join('\n') + '\n\n'
    )
    // Strip remaining tags
    .replace(/<[^>]+>/g, '')
    // Whitespace normalize
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return s.normalize('NFC');
}

// HTML detection
export function looksLikeHTML(s) { 
  return /<\/?[a-z][\s>]/i.test(s); 
}

// Text normalization
export function normalizeText(s) {
  return s.normalize('NFC')
    .replace(/\u00A0/g, ' ')      // nbsp → space
    .replace(/[ \t]+\n/g, '\n')    // trailing whitespace
    .replace(/\n{3,}/g, '\n\n')    // excessive newlines
    .trim();
}

// Content selectors in priority order
const CONTENT_SELECTORS = [
  '[data-glyph-content]',
  '[data-article]',
  'article',
  'main',
  '.prose',
  '.entry-content',
  '.post-body',
  '.program-notes',
  '.content',
  '.post-content'
];

// Fetch helper for external sources
async function fetchText(url) {
  try {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`fetch ${url} ${res.status}`);
    return await res.text();
  } catch (e) {
    console.warn('[ContentResolver] fetch failed:', e);
    return null;
  }
}

// Prime Directive Content Resolution
export async function resolveGlyphContent(host) {
  // 0) Explicit data-glyph-content attribute
  const direct = host.getAttribute('data-glyph-content');
  if (direct && direct.trim().length > 0) {
    const text = normalizeText(
      looksLikeHTML(direct) ? htmlToMarkdownLite(direct) : direct
    );
    return { text, provenance: 'data-glyph-content', confidence: 1.0 };
  }
  
  // 1) External source (Markdown or HTML)
  const src = host.getAttribute('data-glyph-source') || 
              host.getAttribute('data-source-url');
  if (src) {
    const raw = await fetchText(src);
    if (raw) {
      const text = normalizeText(
        looksLikeHTML(raw) ? htmlToMarkdownLite(raw) : raw
      );
      return { text, provenance: `external:${src}`, confidence: 0.95 };
    }
  }
  
  // 2) Search DOM for content containers
  for (const selector of CONTENT_SELECTORS) {
    // Try multiple search strategies
    const node = host.closest(selector) || 
                 host.parentElement?.querySelector(selector) || 
                 document.querySelector(selector);
    
    if (node && node !== host) {
      // Get content, preferring textContent unless we need to process HTML
      const raw = node.innerHTML && looksLikeHTML(node.innerHTML) 
        ? htmlToMarkdownLite(node.innerHTML) 
        : (node.textContent || '');
      
      const text = normalizeText(raw);
      
      // Only accept substantial content
      if (text.length > 60) {
        return { 
          text, 
          provenance: `selector:${selector}`, 
          confidence: 0.8 
        };
      }
    }
  }
  
  // 3) Fallback to host element content
  if (host.textContent || host.innerHTML) {
    const raw = host.innerHTML && looksLikeHTML(host.innerHTML)
      ? htmlToMarkdownLite(host.innerHTML)
      : (host.textContent || '');
    
    const text = normalizeText(raw);
    
    if (text.length > 30) {
      return { 
        text, 
        provenance: 'host-fallback', 
        confidence: 0.5 
      };
    }
  }
  
  // 4) Last resort: empty content but preserve slug for seeding
  const slug = host.getAttribute('data-glyph') || 
               host.getAttribute('data-slug') || 
               host.id || 
               '';
  
  console.warn('[ContentResolver] No substantial content found, using slug:', slug);
  
  return { 
    text: '', 
    provenance: 'empty', 
    slug,
    confidence: 0.0 
  };
}

// Content Source Contract v1.0.0
export class ContentSource {
  constructor() {
    this.version = '1.0.0';
  }
  
  async resolve(host) {
    const result = await resolveGlyphContent(host);
    
    // Emit telemetry
    const preview = (result.text || '').slice(0, 120).replace(/\n/g, '⏎');
    console.log(
      '[ContentSource] resolved: bytes=%d from=%s conf=%s :: "%s"',
      result.text.length,
      result.provenance,
      result.confidence.toFixed(2),
      preview
    );
    
    return result;
  }
}

// Export default instance
export const defaultContentSource = new ContentSource();

console.log('📄 Content Resolver loaded (ESM) - HTML→Markdown conversion ready');