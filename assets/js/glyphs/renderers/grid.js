// Grid Family Renderer - v2.5.1
// Reads from binding output knobs only
import { registerRenderer } from './index.js';

export function renderGrid(ctx, bindingOutput) {
  const { knobs, seed, scale, palette } = bindingOutput;
  const { gridness, granularity, orthogonality } = knobs;
  
  // Deterministic seeded RNG
  const seedNum = typeof seed === 'string' ? hashString(seed) : seed;
  const rng = seededRng(seedNum);
  
  const canvas = ctx.canvas;
  const cellSize = Math.floor(20 + granularity * 40) * scale;
  const jitter = (1 - orthogonality) * 0.3;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Grid colors from palette
  const lineColor = palette?.colors?.primary || '#666666';
  const accentColor = palette?.colors?.secondary || '#999999';
  
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = Math.max(1, scale);
  
  // Vertical lines
  for (let x = 0; x < canvas.width + cellSize; x += cellSize) {
    const offsetX = x + (rng() - 0.5) * cellSize * jitter;
    const intensity = gridness * (0.7 + rng() * 0.3);
    
    ctx.globalAlpha = intensity;
    ctx.beginPath();
    ctx.moveTo(offsetX, 0);
    ctx.lineTo(offsetX, canvas.height);
    ctx.stroke();
  }
  
  // Horizontal lines
  for (let y = 0; y < canvas.height + cellSize; y += cellSize) {
    const offsetY = y + (rng() - 0.5) * cellSize * jitter;
    const intensity = gridness * (0.7 + rng() * 0.3);
    
    ctx.globalAlpha = intensity;
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(canvas.width, offsetY);
    ctx.stroke();
  }
  
  // Accent nodes at intersections
  ctx.fillStyle = accentColor;
  ctx.globalAlpha = gridness * 0.6;
  
  const nodeSize = 2 * scale;
  for (let x = 0; x < canvas.width; x += cellSize) {
    for (let y = 0; y < canvas.height; y += cellSize) {
      if (rng() < granularity) {
        const offsetX = x + (rng() - 0.5) * cellSize * jitter;
        const offsetY = y + (rng() - 0.5) * cellSize * jitter;
        
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  
  ctx.globalAlpha = 1;
}

// Simple hash function for seeds
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Simple seeded RNG
function seededRng(seed) {
  let state = seed;
  return function() {
    state = (1664525 * state + 1013904223) % 0x100000000;
    return state / 0x100000000;
  };
}

registerRenderer('Grid', renderGrid);