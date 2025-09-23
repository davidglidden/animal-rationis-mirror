// Threshold Family Renderer - v2.5.1
import { registerRenderer } from './index.js';

export function renderThreshold(ctx, bindingOutput) {
  const { knobs, scale, palette } = bindingOutput;
  const { edgeStrength, contrast, bandCount } = knobs;
  
  const canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Threshold bands
  const bandHeight = canvas.height / bandCount;
  const baseColor = palette?.colors?.primary || '#4B0082';
  
  for (let i = 0; i < bandCount; i++) {
    const y = i * bandHeight;
    const bandContrast = contrast * (i % 2 === 0 ? 1 : 0.5);
    const alpha = edgeStrength * bandContrast;
    
    ctx.fillStyle = `${baseColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
    ctx.fillRect(0, y, canvas.width, bandHeight);
  }
  
  // Edge lines
  ctx.strokeStyle = palette?.colors?.secondary || '#8A2BE2';
  ctx.lineWidth = edgeStrength * 2 * scale;
  
  for (let i = 1; i < bandCount; i++) {
    const y = i * bandHeight;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

registerRenderer('Threshold', renderThreshold);