import { normalizeCU, validateCU } from './cu-schema.js';
import { subscribe } from './cu-bus.js';

(() => {
  window.__CUs__ = window.__CUs__ || [];
  subscribe((raw) => {
    const cu = normalizeCU(raw);
    if (!validateCU(cu)) return;
    const byId = new Set(window.__CUs__.map(x => x.id));
    if (!byId.has(cu.id)) window.__CUs__.push(cu);
    ensureBundleTags(window.__CUs__);
  });

  function ensureBundleTags(bundle){
    // live bundle for in-browser inspector
    upsert('script[type="application/ld+json"][data-cu="bundle"]',
      () => JSON.stringify({ version: '1.0', items: bundle }));

    // static mirror for post-build extractor (plain array)
    upsert('script[type="application/json"][data-cu="bundle-static"]',
      () => JSON.stringify(bundle).replace(/</g, "\\u003c"));
  }

  function upsert(sel, mkJson){
    let tag = document.querySelector(sel);
    const [type] = sel.match(/type="([^"]+)"/) || [];
    const json = mkJson();
    if (!tag){
      tag = document.createElement('script');
      tag.setAttribute('data-cu', sel.includes('bundle-static') ? 'bundle-static' : 'bundle');
      tag.type = sel.includes('application/json') ? 'application/json' : 'application/ld+json';
      tag.textContent = json;
      document.body.appendChild(tag);
    } else {
      tag.textContent = json;
    }
  }
})();