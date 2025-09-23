const TOPIC = "uce.cu";
const subs = new Set();

export function subscribe(fn) {
  subs.add(fn);
  return () => subs.delete(fn);
}

export function publish(cu) {
  for (const fn of subs) { try { fn(cu); } catch(e){ console.warn('[CU bus] sub error', e); } }
  window.__CUs__ = window.__CUs__ || [];
  window.__CUs__.push(cu);
  document.dispatchEvent(new CustomEvent(TOPIC, { detail: cu }));
}