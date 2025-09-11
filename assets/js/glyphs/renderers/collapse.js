// Collapse Family Renderer - v2.5.1
import { registerRenderer } from './index.js';

export function renderCollapse(ctx, bindingOutput) {
  const { knobs, scale, palette } = bindingOutput;
  const { centerBias, decayRate, fragmentation } = knobs;
  
  const canvas = ctx.canvas;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Collapsing fragments
  const maxRadius = Math.min(canvas.width, canvas.height) * 0.4 * scale;
  
  for (let i = 0; i < fragmentation; i++) {
    const angle = (i / fragmentation) * Math.PI * 2;
    const distance = maxRadius * (1 - centerBias) * decayRate;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    const size = (10 - i * 2) * scale;
    const alpha = 1 - (i / fragmentation) * decayRate;
    
    ctx.fillStyle = palette?.colors?.primary || '#2F2F2F';
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.globalAlpha = 1;
}

registerRenderer('Collapse', renderCollapse);