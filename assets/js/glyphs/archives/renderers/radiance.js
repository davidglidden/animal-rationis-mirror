// Radiance Family Renderer - v2.5.1
// Reads from binding output knobs only
import { registerRenderer } from './index.js';
import { createSeededRNG } from '../util-seed.esm.js';

export function renderRadiance(ctx, bindingOutput) {
  const { knobs, seed, scale, palette } = bindingOutput;
  const { intensity, rayCount, glow, burst } = knobs;
  
  // Contract-compliant deterministic seeded RNG
  const rng = createSeededRNG(seed);
  
  const canvas = ctx.canvas;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.min(canvas.width, canvas.height) * 0.4 * scale;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Core radial glow
  const glowGradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, maxRadius * glow
  );
  
  // Use palette colors if available, otherwise fallback
  const coreColor = palette?.colors?.primary || '#FFD700';
  const edgeColor = palette?.colors?.secondary || '#FFA500';
  
  glowGradient.addColorStop(0, `${coreColor}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`);
  glowGradient.addColorStop(0.5, `${edgeColor}${Math.floor(intensity * 127).toString(16).padStart(2, '0')}`);
  glowGradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = glowGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Emanating rays
  ctx.strokeStyle = coreColor;
  ctx.lineWidth = 2;
  
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2;
    const rayLength = maxRadius * (0.6 + rng() * 0.4);
    const rayIntensity = intensity * (0.7 + rng() * 0.3);
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    
    // Add some burst variation
    if (i % burst === 0) {
      ctx.lineWidth = 4;
      ctx.globalAlpha = rayIntensity * 1.2;
    } else {
      ctx.lineWidth = 2;
      ctx.globalAlpha = rayIntensity;
    }
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(rayLength, 0);
    ctx.stroke();
    
    ctx.restore();
  }
  
  // Central core
  const coreRadius = 8 * scale;
  const coreGradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, coreRadius
  );
  coreGradient.addColorStop(0, '#FFFFFF');
  coreGradient.addColorStop(1, coreColor);
  
  ctx.fillStyle = coreGradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
  ctx.fill();
}


registerRenderer('Radiance', renderRadiance);