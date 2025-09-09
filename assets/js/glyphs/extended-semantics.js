function computeExtendedFeatures(text) {
  const lines = text.split(/\r?\n/);
  const headerCount = lines.filter(l => /^#{1,3}\s|\S+\n[-=]{3,}$/.test(l)).length;
  const listCount = lines.filter(l => /^\s*([-*]|\d+\.)\s/.test(l)).length;
  const tableLike = lines.some(l => /\|.+\|/.test(l));
  const quoteRatio = (text.match(/"|"|"|''|--/g) || []).length / Math.max(1, text.length);
  const qMarkRatio = (text.match(/\?/g) || []).length / Math.max(1, text.length);
  const longSentences = (text.match(/[^.!?]{140,}[.!?]/g) || []).length;
  const properNouns = (text.match(/\b[A-Z][a-z]{2,}\b/g) || []).length;
  
  return {
    headers: headerCount,
    lists: listCount,
    table: tableLike,
    quoteRatio,
    qMarkRatio,
    longSentences,
    properNouns
  };
}

// Make available globally for the semantic visual translator
if (typeof window !== 'undefined') {
  window.computeExtendedFeatures = computeExtendedFeatures;
  console.log('📊 Extended semantics helper loaded - structural analysis enabled');
}