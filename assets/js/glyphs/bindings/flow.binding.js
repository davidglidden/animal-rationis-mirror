// assets/js/glyphs/bindings/flow.binding.js
export const FlowBinding = {
  id: "flow",
  fromEM({ em, seed, canvas }) {
    let h = 2166136261, s = String(seed || "triptych");
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    const lines = 150 + (h >>> 0) % 100;
    return { lines, canvas };
  },
  draw({ lines, canvas }) {
    const ctx = canvas.getContext("2d");
    const { width: w, height: h } = canvas;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < lines; i++) {
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      const x1 = Math.random() * w, y1 = Math.random() * h;
      const x2 = Math.random() * w, y2 = Math.random() * h;
      ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
  },
};