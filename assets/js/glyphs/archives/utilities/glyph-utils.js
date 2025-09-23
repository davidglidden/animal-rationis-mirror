(function (root, factory) {
  if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GlyphUtils = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const lerp  = (a, b, t) => a + (b - a) * t;
  function seededRng(seed) {
    let s = ((seed >>> 0) || 0xA53A9D1B) >>> 0;
    return function () { s = (1664525 * s + 1013904223) >>> 0; return s / 0x1_0000_0000; };
  }
  function hasStorageManager() {
    return typeof navigator !== 'undefined' &&
           navigator.storage && typeof navigator.storage.estimate === 'function';
  }
  return { clamp, lerp, seededRng, hasStorageManager };
}));