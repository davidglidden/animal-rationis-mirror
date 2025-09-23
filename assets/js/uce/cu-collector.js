import { normalizeCU, validateCU } from './cu-schema.js';
import { subscribe } from './cu-bus.js';

(() => {
  window.__CUs__ = window.__CUs__ || [];
  window.__CU_IDS__  = window.__CU_IDS__  || new Set();
  window.__CU_KEYS__ = window.__CU_KEYS__ || new Set();

  subscribe((raw) => {
    const cu = normalizeCU(raw);
    if (!validateCU(cu)) return;
    const key = cuKey(cu);
    if (window.__CU_IDS__.has(cu.id) || window.__CU_KEYS__.has(key)) return;
    window.__CU_IDS__.add(cu.id);
    window.__CU_KEYS__.add(key);
    window.__CUs__.push(cu);
    ensureBundleTags(window.__CUs__);
  });

  function cuKey(cu){
    const sig = {
      kind: cu.kind,
      modality: cu.modality,
      source: { url: cu.source?.url, title: cu.source?.title, work_id: cu.source?.work_id },
      context: { page: cu.context?.page, pane: cu.context?.pane, seed: cu.context?.seed, family: cu.context?.family },
      provenance: { engine: cu.provenance?.engine }
    };
    return JSON.stringify(sig);
  }

  function ensureBundleTags(bundle){
    // Standardize on application/json (safer; not actual LD+JSON)
    // live bundle for in-browser inspector
    upsert('script[type="application/json"][data-cu="bundle"]',
      () => JSON.stringify({ version: '1.0', items: bundle }));

    // static mirror for post-build extractor (plain array)
    upsert('script[type="application/json"][data-cu="bundle-static"]',
      () => JSON.stringify(bundle).replace(/</g, "\\u003c"));
  }

  function upsert(sel, mkJson){
    let tag = document.querySelector(sel);
    const json = mkJson();
    if (!tag){
      tag = document.createElement('script');
      tag.setAttribute('data-cu', sel.includes('bundle-static') ? 'bundle-static' : 'bundle');
      tag.type = 'application/json';
      tag.textContent = json;
      document.body.appendChild(tag);
    } else {
      tag.textContent = json;
    }
  }
})();