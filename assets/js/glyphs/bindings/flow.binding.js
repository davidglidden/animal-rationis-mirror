// Flow Binding - Minimal baseline implementation
// Draws flowing lines into canvas based on seed

export const FlowBinding = {
  id: 'flow',
  
  fromEM({ em, seed, canvas }) {
    // Derive deterministic count from seed
    let h = 2166136261;
    const s = String(seed || 'triptych');
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const lines = 150 + (h >>> 0) % 100;
    
    return { lines, canvas, seed: s };
  },
  
  draw({ lines, canvas }) {
    const ctx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, w, h);
    
    // Set consistent style
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 1;
    
    // Draw flowing lines
    for (let i = 0; i < lines; i++) {
      ctx.globalAlpha = 0.3 + Math.random() * 0.4;
      ctx.beginPath();
      
      const x1 = Math.random() * w;
      const y1 = Math.random() * h;
      const x2 = Math.random() * w;
      const y2 = Math.random() * h;
      
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
};