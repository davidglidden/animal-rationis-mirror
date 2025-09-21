import { createSeededRNG } from '../util-seed.esm.js';

export const GridBinding = {
  id: 'grid',
  fromEM({ em, seed, canvas }) {
    const rng = createSeededRNG(String(seed || 'triptych'));
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.round((canvas.clientWidth || canvas.width) * dpr));
    const h = Math.max(1, Math.round((canvas.clientHeight || canvas.height) * dpr));

    // choose coarse/fine by EM families (fallback deterministic)
    const affinity = (em?.families?.grid ?? 0);
    const cols = affinity >= 0.5 ? 12 : 8;
    const rows = affinity >= 0.5 ? 8 : 6;

    return { cols, rows, w, h, dpr };
  },
  draw({ cols, rows, w, h, dpr }, canvas) {
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { alpha: true });
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(0,0,0,0.45)';
    ctx.lineWidth = Math.max(1, Math.round(0.75 * dpr));

    const dx = Math.floor(w / Math.max(1, cols));
    const dy = Math.floor(h / Math.max(1, rows));

    // verticals
    for (let c = 0; c <= cols; c++) {
      const x = Math.min(w - 1, c * dx);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    // horizontals
    for (let r = 0; r <= rows; r++) {
      const y = Math.min(h - 1, r * dy);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    canvas.dataset.painted = '1';
  }
};

export default GridBinding;