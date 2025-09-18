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
    const dpr = Math.max(1, Math.min(3, window.devicePixelRatio||1));
    const r = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, (r.width*dpr)|0);
    canvas.height = Math.max(1, (r.height*dpr)|0);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i=0;i<lines;i++){
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.moveTo(Math.random()*canvas.width,  Math.random()*canvas.height);
      ctx.lineTo(Math.random()*canvas.width,  Math.random()*canvas.height);
      ctx.stroke();
    }
    canvas.dataset.painted = "1";
    canvas.classList.add("triptych--painted");
  }
});