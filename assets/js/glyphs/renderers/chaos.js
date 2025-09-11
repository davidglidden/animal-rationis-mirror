// Chaos Family Renderer - v2.5.1
import { registerRenderer } from './index.js';
import { createSeededRNG } from '../util-seed.esm.js';

export function renderChaos(ctx, bindingOutput) {
  const { knobs, seed, scale, palette } = bindingOutput;
  const { noiseScale, entropy } = knobs;
  
  const canvas = ctx.canvas;
  // Contract-compliant deterministic seeded RNG
  const rng = createSeededRNG(seed);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Chaotic particles
  const particleCount = Math.floor(100 * entropy * scale);
  ctx.fillStyle = palette?.colors?.primary || '#8B0000';
  
  for (let i = 0; i < particleCount; i++) {
    const x = rng() * canvas.width;
    const y = rng() * canvas.height;
    const size = rng() * noiseScale * 5;
    const alpha = rng() * entropy;
    
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.globalAlpha = 1;
}


registerRenderer('Chaos', renderChaos);