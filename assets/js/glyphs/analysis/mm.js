import { analyzeStructure } from "./analyzers/structure.js";
import { analyzeLexicon } from "./analyzers/lexicon.js";

// Simple stable hash → base36
function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i=0;i<str.length;i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h>>>0).toString(36);
}

export async function computeCA(content) {
  const parts = await Promise.all([
    analyzeStructure(content),
    analyzeLexicon(content),
  ]);
  return parts.reduce((acc, p) => Object.assign(acc, p), {});
}

export function buildMM(ca, seedHint) {
  const raw = JSON.stringify(ca);
  const seed = seedHint || fnv1a(raw) || "triptych";
  // simple "intent/texture/dynamics" placeholders—expand later
  return {
    seed,
    intent: { contemplative: 0.5, analytical: 0.5 },
    texture: { structural_complexity: Math.min(1, (ca?.structure?.headingsCount || 0) / 10) },
    dynamics: { entropy: ca?.lexicon?.rarity ?? 0.4 }
  };
}
