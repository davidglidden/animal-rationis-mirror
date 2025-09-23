/**
 * UCE Collector (single writer)
 * - Subscribes to CU bus, normalizes, *hard-dedupes* by id
 * - Writes exactly ONE <script type="application/json" data-cu="bundle">{"items":[...]}</script>
 * - Overwrites existing tag content instead of appending
 */
import { normalizeCU, validateCU } from './cu-schema.js';
import { subscribe } from './cu-bus.js';

(() => {
  // ---- Singleton guard ----
  if (window.__CU_COLLECTOR_ACTIVE__) return;
  window.__CU_COLLECTOR_ACTIVE__ = true;

  // Single in-page store + dedup set
  window.__CUs__ = window.__CUs__ || [];
  // Initialize global key set; tolerate missing/invalid prior state
  ensureKeySet();

  const BUNDLE_SEL = 'script[type="application/json"][data-cu="bundle"]';
  const BUNDLE_ID  = 'cu-bundle';

  // Ensure a single bundle tag exists; create if missing, otherwise reuse.
  function ensureBundleTag() {
    // Remove any stray duplicates except the first canonical one
    const all = Array.from(document.querySelectorAll(BUNDLE_SEL));
    let tag = all.find(t => t.id === BUNDLE_ID) || all[0];
    if (all.length > 1) {
      for (const t of all) { if (t !== tag) t.remove(); }
    }
    // Create canonical tag if absent
    if (!tag) {
      tag = document.createElement('script');
      tag.type = 'application/json';
      tag.setAttribute('data-cu', 'bundle');
      tag.id = BUNDLE_ID;
      tag.textContent = '{"items":[]}';
      // Prefer body; if unavailable (very early), append to head
      (document.body || document.head || document.documentElement).appendChild(tag);
    }
    return tag;
  }

  // Write the bundle by overwriting textContent
  function writeBundle() {
    const tag = ensureBundleTag();
    // Do NOT include @context/ld+json; we keep this as plain JSON for robustness
    const json = JSON.stringify({ items: window.__CUs__ });
    // Defend against HTML parsers by escaping <
    tag.textContent = json.replace(/</g, "\\u003c");
  }

  function ensureKeySet() {
    if (!(window.__CU_KEYS__ instanceof Set)) {
      const seed = Array.isArray(window.__CUs__) ? window.__CUs__.map(x => x?.id).filter(Boolean) : [];
      window.__CU_KEYS__ = new Set(seed);
    }
  }

  // Defensive key extraction
  function cuKey(cu) { return cu?.id || null; }

  // Subscribe once; normalize + validate + dedupe by id
  subscribe((raw) => {
    try {
      ensureKeySet(); // re-check before each use (bulletproof)
      const cu = normalizeCU(raw || {});
      if (!validateCU(cu)) return;
      const key = cuKey(cu);
      if (!key) return;
      if (!window.__CU_KEYS__.has(key)) {
        window.__CU_KEYS__.add(key);
        window.__CUs__.push(cu);
        writeBundle();
      }
    } catch (e) {
      // Keep it quiet in prod, informative in dev
      if (window?.console?.debug) console.debug('[CU collector] skipped CU', e);
    }
  });

  // Initialize a clean bundle tag at startup (handles pages that pre-had CUs)
  writeBundle();
})();