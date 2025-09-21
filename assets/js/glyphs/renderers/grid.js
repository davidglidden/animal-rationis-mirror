export const GridBinding = {
  id: 'grid',
  fromEM({ em, seed, canvas }){
    const density = em?.texture?.density ?? 0.5;
    const cols = Math.max(4, Math.round(8 + density * 8));
    const rows = cols;
    return { cols, rows, w: canvas.width, h: canvas.height, canvas };
  },
  draw({ cols, rows, w, h, canvas }){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,w,h);
    const dx = w / cols, dy = h / rows;
    ctx.globalAlpha = 0.6;
    for (let c=1;c<cols;c++){ ctx.beginPath(); ctx.moveTo(c*dx,0); ctx.lineTo(c*dx,h); ctx.stroke(); }
    for (let r=1;r<rows;r++){ ctx.beginPath(); ctx.moveTo(0,r*dy); ctx.lineTo(w,r*dy); ctx.stroke(); }
  }
};

export default GridBinding;