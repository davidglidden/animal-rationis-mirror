// Constellation Family Renderer - v2.5.1
import { registerRenderer } from './index.js';

export function renderConstellation(ctx, bindingOutput) {
  const { knobs, seed, scale, palette } = bindingOutput;
  const { starCount, brightness, connections } = knobs;
  
  const canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const stars = [];
  const seedNum = typeof seed === 'string' ? hashString(seed) : seed;
  const rng = seededRng(seedNum);
  
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

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRng(seed) {
  let state = seed;
  return () => {
    state = (1664525 * state + 1013904223) % 0x100000000;
    return state / 0x100000000;
  };
}

registerRenderer('Constellation', renderConstellation);