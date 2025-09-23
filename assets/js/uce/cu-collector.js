import { normalizeCU, validateCU } from './cu-schema.js';
import { subscribe } from './cu-bus.js';

(() => {
  // Start clean on each page load; the collector is the only writer.
  window.__CUs__     = [];
  window.__CU_IDS__  = new Set();
  window.__CU_KEYS__ = new Set();

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

    if (window.__CU_IDS__.has(cu.id) || window.__CU_KEYS__.has(key)) return;
    window.__CU_IDS__.add(cu.id);
    window.__CU_KEYS__.add(key);
    window.__CUs__.push(cu);
    ensureBundleTag(window.__CUs__);
  });

  function ensureBundleTag(bundle){
    const sel = 'script[type="application/json"][data-cu="bundle"]';
    let tag = document.querySelector(sel);
    const json = JSON.stringify({ version: '1.0', items: bundle });
    if (!tag){
      tag = document.createElement('script');
      tag.type = 'application/json';
      tag.setAttribute('data-cu', 'bundle');
      tag.textContent = json;
      document.body.appendChild(tag);
    } else {
      tag.textContent = json;
    }
  }
})();