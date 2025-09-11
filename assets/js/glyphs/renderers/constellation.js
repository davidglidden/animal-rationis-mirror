// Constellation Family Renderer - v2.5.1
import { registerRenderer } from './index.js';
import { createSeededRNG } from '../util-seed.esm.js';

export function renderConstellation(ctx, bindingOutput) {
  const { knobs, seed, scale, palette } = bindingOutput;
  const { starCount, brightness, connections } = knobs;
  
  const canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const stars = [];
  // Contract-compliant deterministic seeded RNG
  const rng = createSeededRNG(seed);
  
  // Generate stars
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: rng() * canvas.width,
      y: rng() * canvas.height,
      size: (1 + rng() * 3) * scale,
      brightness: brightness * (0.7 + rng() * 0.3)
    });
  }
  
  // Draw connections
  ctx.strokeStyle = palette?.colors?.secondary || '#87CEEB';
  ctx.lineWidth = 1;
  ctx.globalAlpha = connections * 0.5;
  
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const distance = Math.sqrt((stars[i].x - stars[j].x) ** 2 + (stars[i].y - stars[j].y) ** 2);
      if (distance < 100 * scale && rng() < connections) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }
  
  // Draw stars
  ctx.fillStyle = palette?.colors?.primary || '#FFFACD';
  ctx.globalAlpha = 1;
  
  stars.forEach(star => {
    ctx.globalAlpha = star.brightness;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
}


registerRenderer('Constellation', renderConstellation);