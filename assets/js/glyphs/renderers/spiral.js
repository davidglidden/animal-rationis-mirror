// Spiral Family Renderer - v2.5.1
import { registerRenderer } from './index.js';

export function renderSpiral(ctx, bindingOutput) {
  const { knobs, scale, palette } = bindingOutput;
  const { turns, tightness, armCount } = knobs;
  
  const canvas = ctx.canvas;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = palette?.colors?.primary || '#DAA520';
  ctx.lineWidth = 2 * scale;
  
  for (let arm = 0; arm < armCount; arm++) {
    ctx.beginPath();
    const baseAngle = (arm / armCount) * Math.PI * 2;
    
    for (let t = 0; t < turns * Math.PI * 2; t += 0.1) {
      const radius = t * tightness * 10 * scale;
      const x = centerX + Math.cos(baseAngle + t) * radius;
      const y = centerY + Math.sin(baseAngle + t) * radius;
      
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

registerRenderer('Spiral', renderSpiral);