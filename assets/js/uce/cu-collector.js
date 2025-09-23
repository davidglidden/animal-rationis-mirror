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
  const __DEDUP = new Set(window.__CUs__.map(x => x.id));

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

  subscribe((raw) => {
    const cu = normalizeCU(raw);
    if (!validateCU(cu)) return;

    // Signature for logical dedupe (same pane/seed/family/source/work → collapse)
    const sig = {
      kind: cu.kind, modality: cu.modality,
      source: { url: cu.source?.url, title: cu.source?.title, work_id: cu.source?.work_id },
      context: { page: cu.context?.page, pane: cu.context?.pane, seed: cu.context?.seed, family: cu.context?.family },
      provenance: { engine: cu.provenance?.engine }
    };
    const key = JSON.stringify(sig);

    if (__DEDUP.has(cu.id) || window.__CU_KEYS__.has(key)) return;
    __DEDUP.add(cu.id);
    window.__CU_KEYS__.add(key);
    window.__CUs__.push(cu);
    writeBundle();
  });

  // Initialize a clean bundle tag at startup (handles pages that pre-had CUs)
  writeBundle();
})();