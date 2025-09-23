import { createSeededRNG } from '../util-seed.esm.js';

export const FlowBinding = {
  id: 'flow',
  fromEM({ em, seed, canvas }) {
    const rng = createSeededRNG(String(seed || 'triptych'));
    const lines = 120 + Math.floor(rng() * 80);
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.round((canvas.clientWidth || canvas.width) * dpr));
    const h = Math.max(1, Math.round((canvas.clientHeight || canvas.height) * dpr));
    return { lines, w, h, dpr, seed: String(seed || 'triptych') };
  },
  draw({ lines, w, h, dpr, seed }, canvas) {
    // size target canvas
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    ctx.clearRect(0, 0, w, h);

    // visible style
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.max(1, Math.round(1.0 * dpr));

    // deterministic rng for geometry
    const rng = createSeededRNG(seed);
    for (let i = 0; i < lines; i++) {
      const x1 = Math.floor(rng() * w), y1 = Math.floor(rng() * h);
      const x2 = Math.floor(rng() * w), y2 = Math.floor(rng() * h);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // sentinel
    canvas.dataset.painted = '1';
  }
};

export default FlowBinding;