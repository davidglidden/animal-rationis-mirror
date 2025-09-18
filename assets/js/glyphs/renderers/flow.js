// assets/js/glyphs/renderers/flow.js
import { RendererRegistry } from "./index.js";

RendererRegistry.register({
  id: "flow",
  fromEM({ seed, canvas }) {
    let h = 2166136261, s = String(seed||"triptych");
    for (let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    const lines = 200 + (h>>>0)%150;
    return { lines, canvas };
  },
  draw({ lines, canvas }) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i=0;i<lines;i++){
      ctx.globalAlpha = 0.5;
      const x1 = Math.random()*canvas.width,  y1=Math.random()*canvas.height;
      const x2 = Math.random()*canvas.width,  y2=Math.random()*canvas.height;
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    }
    canvas.dataset.painted = '1';
    canvas.classList.add('triptych--painted');
  }
});