// Interference Family Renderer - v2.5.1
// Reads from binding output knobs only
import { registerRenderer } from './index.js';
import { createSeededRNG } from '../util-seed.esm.js';

export function renderInterference(ctx, bindingOutput) {
  const { knobs, seed, scale, palette } = bindingOutput;
  const { waveCount, phase, amplitude } = knobs;
  
  // Contract-compliant deterministic seeded RNG
  const rng = createSeededRNG(seed);
  
  const canvas = ctx.canvas;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Wave colors from palette
  const waveColor = palette?.colors?.primary || '#00CED1';
  const interferenceColor = palette?.colors?.secondary || '#20B2AA';
  
  // Create wave interference pattern
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;
  
  // Wave sources
  const sources = [];
  for (let i = 0; i < waveCount; i++) {
    const angle = (i / waveCount) * Math.PI * 2;
    const radius = 30 + rng() * 50;
    sources.push({
      x: centerX + Math.cos(angle) * radius * scale,
      y: centerY + Math.sin(angle) * radius * scale,
      frequency: 0.02 + rng() * 0.03,
      phase: phase + i * Math.PI / 3
    });
  }
  
  // Calculate interference at each pixel
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      let totalAmplitude = 0;
      
      // Sum waves from all sources
      for (const source of sources) {
        const distance = Math.sqrt((x - source.x) ** 2 + (y - source.y) ** 2);
        const waveValue = Math.sin(distance * source.frequency + source.phase);
        totalAmplitude += waveValue * amplitude;
      }
      
      // Normalize and convert to color
      const intensity = Math.abs(totalAmplitude / waveCount);
      const colorValue = Math.floor(intensity * 255);
      
      const pixelIndex = (y * canvas.width + x) * 4;
      
      // Use interference colors based on wave intensity
      if (intensity > 0.5) {
        // High interference - use interference color
        data[pixelIndex] = parseInt(interferenceColor.slice(1, 3), 16);     // R
        data[pixelIndex + 1] = parseInt(interferenceColor.slice(3, 5), 16); // G
        data[pixelIndex + 2] = parseInt(interferenceColor.slice(5, 7), 16); // B
      } else {
        // Low interference - use wave color
        data[pixelIndex] = parseInt(waveColor.slice(1, 3), 16);     // R
        data[pixelIndex + 1] = parseInt(waveColor.slice(3, 5), 16); // G
        data[pixelIndex + 2] = parseInt(waveColor.slice(5, 7), 16); // B
      }
      
      data[pixelIndex + 3] = colorValue; // Alpha
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  // Draw wave source markers
  ctx.fillStyle = waveColor;
  for (const source of sources) {
    ctx.beginPath();
    ctx.arc(source.x, source.y, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
}


registerRenderer('Interference', renderInterference);