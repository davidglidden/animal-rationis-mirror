// Flow Family Renderer - v2.5.1
// Reads from binding output knobs only
import { registerRenderer } from './index.js';
import { createSeededRNG } from '../util-seed.esm.js';

// Safe parameter clamping utility
const EPS = 1e-6;
const clamp01 = (x) => Math.min(1 - EPS, Math.max(0, Number.isFinite(x) ? x : 0));
const clampPos = (x, min = EPS) => Math.max(min, Number.isFinite(x) ? x : min);

export function renderFlow(ctx, bindingOutput) {
  const { knobs, seed, scale, palette } = bindingOutput;
  
  // Canvas safety guard - avoid IndexSizeError on tiny canvases
  const { width: W, height: H } = ctx.canvas;
  if (W < 2 || H < 2) return; // avoid IndexSizeError on small/zero buffers
  
  // Clamp all inputs to safe ranges
  const velocity = clamp01(knobs.velocity);
  const turbulence = clamp01(knobs.turbulence);
  const direction = clamp01(knobs.direction || 0);
  const safeScale = clampPos(scale || 1, 0.1);
  
  // Contract-compliant deterministic seeded RNG
  const rng = createSeededRNG(seed);
  
  const canvas = ctx.canvas;
  
  // Ensure canvas has valid dimensions
  if (canvas.width <= 0 || canvas.height <= 0) {
    console.warn('[Flow] Canvas has zero size, skipping render');
    return;
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Flow colors from palette
  const flowColor = palette?.colors?.primary || '#4A90E2';
  const edgeColor = palette?.colors?.secondary || '#7BB3F0';
  
  // Create flowing curves with safe parameters
  const streamCount = Math.max(1, Math.floor(3 + turbulence * 5));
  const baseDirection = direction * Math.PI * 2;
  
  for (let i = 0; i < streamCount; i++) {
    const startX = rng() * canvas.width;
    const startY = rng() * canvas.height;
    
    // Stream properties - all clamped to safe ranges
    const streamDirection = baseDirection + (rng() - 0.5) * turbulence * Math.PI;
    const streamLength = clampPos((50 + velocity * 150) * safeScale, 1);
    const streamWidth = clampPos((2 + rng() * 4) * safeScale, 0.5);
    const streamIntensity = clamp01(0.3 + velocity * 0.5);
    
    ctx.strokeStyle = `${flowColor}${Math.floor(streamIntensity * 255).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = streamWidth;
    ctx.lineCap = 'round';
    
    // Draw flowing curve
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    
    let currentX = startX;
    let currentY = startY;
    let currentDirection = streamDirection;
    
    const segments = Math.max(1, Math.floor(10 + turbulence * 20));
    for (let j = 0; j < segments; j++) {
      const segmentLength = streamLength / segments;
      
      // Add turbulence to direction
      currentDirection += (rng() - 0.5) * turbulence * 0.5;
      
      currentX += Math.cos(currentDirection) * segmentLength;
      currentY += Math.sin(currentDirection) * segmentLength;
      
      ctx.lineTo(currentX, currentY);
    }
    
    ctx.stroke();
    
    // Add flow particles with safe parameters
    if (velocity > 0.5) {
      ctx.fillStyle = edgeColor;
      const particleCount = Math.max(1, Math.floor(velocity * 10));
      
      for (let p = 0; p < particleCount; p++) {
        const t = rng();
        const particleX = startX + Math.cos(streamDirection) * streamLength * t;
        const particleY = startY + Math.sin(streamDirection) * streamLength * t;
        // CRITICAL FIX: Ensure particle size is always positive and finite
        const particleSize = clampPos((1 + rng() * 2) * safeScale, 0.5);
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

registerRenderer('Flow', renderFlow);