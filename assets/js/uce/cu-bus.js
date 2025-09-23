const TOPIC = "uce.cu";
const subs = new Set();
// Queue events until at least one subscriber is present (prevents races).
window.__CU_QUEUE__ = Array.isArray(window.__CU_QUEUE__) ? window.__CU_QUEUE__ : [];

export function subscribe(fn) {
  subs.add(fn);
  // Drain any queued events safely
  try {
    if (window.__CU_QUEUE__ && window.__CU_QUEUE__.length) {
      const q = window.__CU_QUEUE__.splice(0, window.__CU_QUEUE__.length);
      for (const cu of q) { try { fn(cu); } catch(e){ console.warn('[CU bus] sub error', e); } }
    }
  } catch(e) { /* no-op */ }
  return () => subs.delete(fn);
}

export function publish(cu) {
  if (subs.size === 0) {
    // No subscribers yet; queue it and continue mirroring below.
    window.__CU_QUEUE__.push(cu);
  } else {
    for (const fn of subs) { try { fn(cu); } catch(e){ console.warn('[CU bus] sub error', e); } }
  }
  // mirror to DOM for passive collectors / offline build tooling
  window.__CUs__ = window.__CUs__ || [];
  window.__CUs__.push(cu);
  dispatchDomEvent(cu);
}

function dispatchDomEvent(cu) {
  document.dispatchEvent(new CustomEvent(TOPIC, { detail: cu }));
}