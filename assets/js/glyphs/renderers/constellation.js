function seeded(seed) {
  let h = 2166136261 >>> 0;
  const s = String(seed||"triptych");
  return () => {
    for (let i=0;i<s.length;i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    h = Math.imul(h ^ (h>>>13), 0x85ebca6b);
    return (h>>>0)/0xffffffff;
  };
}

export const ConstellationBinding = {
  id: "constellation",
  fromEM({ em, seed, canvas }) {
    const prng = seeded(seed);
    const count = 16 + Math.floor((em?.texture?.density || 0.5) * 24);
    const pts = Array.from({length: count}, () => ({
      x: prng() * canvas.width,
      y: prng() * canvas.height
    }));
    return { pts };
  },
  draw({ pts }, canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha = 0.8;
    // points
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI*2);
      ctx.fill();
    }
    // a few lines
    for (let i=0;i<pts.length-1;i+=2) {
      ctx.beginPath();
      ctx.moveTo(pts[i].x, pts[i].y);
      ctx.lineTo(pts[i+1].x, pts[i+1].y);
      ctx.stroke();
    }
    canvas.dataset.painted = "1";
  }
};
