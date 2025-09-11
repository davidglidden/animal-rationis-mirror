// Strata Family Renderer - v2.5.1
import { registerRenderer } from './index.js';

export function renderStrata(ctx, bindingOutput) {
  const { knobs, seed, scale, palette } = bindingOutput;
  const { layers, depth, density } = knobs;
  
  const canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const layerHeight = canvas.height / layers;
  const baseColor = palette?.colors?.primary || '#8B7355';
  
  for (let i = 0; i < layers; i++) {
    const layerY = i * layerHeight;
    const layerAlpha = 0.3 + (depth * 0.5);
    const layerDensity = density * (0.7 + Math.sin(i) * 0.3);
    
    ctx.fillStyle = `${baseColor}${Math.floor(layerAlpha * 255).toString(16).padStart(2, '0')}`;
    ctx.fillRect(0, layerY, canvas.width, layerHeight * layerDensity);
  }
}

registerRenderer('Strata', renderStrata);