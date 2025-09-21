export async function analyzeStructure({ text }) {
  // very lite heuristics
  const headingsCount = (text.match(/\n#+\s/g) || []).length; // markdown-style fallback
  const paraCount = (text.split(/\n{2,}/g) || []).length;
  return { structure: { headingsCount, paraCount } };
}
