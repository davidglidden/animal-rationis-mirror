// Flow Family Renderer - v2.5.1
// Reads from binding output knobs only
import { registerRenderer } from './index.js';

export function renderFlow(ctx, bindingOutput) {
  const { knobs, seed, scale, palette } = bindingOutput;
  const { velocity, turbulence, direction } = knobs;
  
  // Deterministic seeded RNG
  const seedNum = typeof seed === 'string' ? hashString(seed) : seed;
  const rng = seededRng(seedNum);
  
  const canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Flow colors from palette
  const flowColor = palette?.colors?.primary || '#4A90E2';
  const edgeColor = palette?.colors?.secondary || '#7BB3F0';
  
  // Create flowing curves
  const streamCount = Math.floor(3 + turbulence * 5);
  const baseDirection = direction * Math.PI * 2;
  
  for (let i = 0; i < streamCount; i++) {
    const startX = rng() * canvas.width;
    const startY = rng() * canvas.height;
    
    // Stream properties
    const streamDirection = baseDirection + (rng() - 0.5) * turbulence * Math.PI;
    const streamLength = (50 + velocity * 150) * scale;
    const streamWidth = (2 + rng() * 4) * scale;
    const streamIntensity = 0.3 + velocity * 0.5;
    
    ctx.strokeStyle = `${flowColor}${Math.floor(streamIntensity * 255).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = streamWidth;
    ctx.lineCap = 'round';
    
    // Draw flowing curve
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    
    let currentX = startX;
    let currentY = startY;
    let currentDirection = streamDirection;
    
    const segments = Math.floor(10 + turbulence * 20);
    for (let j = 0; j < segments; j++) {
      const segmentLength = streamLength / segments;
      
      // Add turbulence to direction
      currentDirection += (rng() - 0.5) * turbulence * 0.5;
      
      currentX += Math.cos(currentDirection) * segmentLength;
      currentY += Math.sin(currentDirection) * segmentLength;
      
      ctx.lineTo(currentX, currentY);
    }
    
    ctx.stroke();
    
    // Add flow particles
    if (velocity > 0.5) {
      ctx.fillStyle = edgeColor;
      const particleCount = Math.floor(velocity * 10);
      
      for (let p = 0; p < particleCount; p++) {
        const t = rng();
        const particleX = startX + Math.cos(streamDirection) * streamLength * t;
        const particleY = startY + Math.sin(streamDirection) * streamLength * t;
        const particleSize = (1 + rng() * 2) * scale;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
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

registerRenderer('Flow', renderFlow);