function seeded(seed) {
  let h = 2166136261 >>> 0;
  const s = String(seed||'triptych');
  return () => {
    for (let i=0;i<s.length;i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    h = Math.imul(h ^ (h>>>13), 0x85ebca6b);
    return (h>>>0)/0xffffffff;
  };
}

export const RadianceBinding = {
  id: 'radiance',
  fromEM({ em, seed, canvas }) {
    const pr = seeded(seed);
    const rays = 24 + Math.floor((em?.dynamics?.velocity || 0.5) * 40);
    return { rays, pr };
  },
  draw({ rays, pr }, canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const cx = canvas.width/2, cy = canvas.height/2;
    const radius = Math.min(cx, cy)*0.9;
    for (let i=0;i<rays;i++) {
      const a = (i / rays) * Math.PI*2 + pr()*0.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a)*radius, cy + Math.sin(a)*radius);
      ctx.stroke();
    }
    canvas.dataset.painted = '1';
  }
};