import { RendererRegistry } from './index.js';

function seededRand(seed){
  let h = 2166136261 >>> 0;
  for (let i=0;i<seed.length;i++){ h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => ((h = Math.imul(h ^ (h>>>15), 2246822507) ^ Math.imul(h ^ (h>>>13), 3266489909)) >>> 0) / 2**32;
}

const FlowBinding = {
  id: 'flow',
  fromEM({ em, seed, canvas }){
    const r = seededRand(String(seed || 'triptych'));
    const lines = 140 + Math.floor(r()*60);
    return { lines, w: canvas.width, h: canvas.height };
  },
  draw({ lines, w, h, target }){
    const ctx = target.getContext('2d');
    ctx.clearRect(0,0,w,h);
    for (let i=0;i<lines;i++){
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      const x1 = Math.random()*w, y1=Math.random()*h;
      const x2 = Math.random()*w, y2=Math.random()*h;
      ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
      ctx.stroke();
    }
  }
};

RendererRegistry.register(FlowBinding);
export { FlowBinding };