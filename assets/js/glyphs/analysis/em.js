// Map MM+CA → EM (families map, deterministic defaults)
export function buildEM(mm, ca) {
  // soft affinities: grid likes structure, constellation likes rarity, radiance likes "energy"
  const s = ca?.structure?.headingsCount || 0;
  const r = ca?.lexicon?.rarity || 0;

  const families = {
    flow: 0.4,                 // baseline
    grid: Math.min(1, s / 8),  // more headings -> more grid
    constellation: Math.min(1, r * 1.2),
    radiance: Math.min(1, (mm?.dynamics?.entropy || 0.4) * 1.1),
  };

  return {
    families,
    dynamics: { velocity: 0.5 + 0.3 * (mm?.dynamics?.entropy || 0.4) },
    texture: { density: 0.5 + 0.4 * (mm?.texture?.structural_complexity || 0) }
  };
}

// select max-weight family with fallback
export function selectFamily(em, forced) {
  if (forced) return forced.toLowerCase();
  const entries = Object.entries(em?.families || {});
  if (!entries.length) return "flow";
  entries.sort((a,b) => b[1]-a[1]);
  return entries[0][0] || "flow";
}
