// Balance Family Renderer - v2.5.1
import { registerRenderer } from './index.js';

export function renderBalance(ctx, bindingOutput) {
  const { knobs, scale, palette } = bindingOutput;
  const { axisTilt, weights, tension } = knobs;
  
  const canvas = ctx.canvas;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = palette?.colors?.primary || '#708090';
  ctx.lineWidth = 3 * scale;
  
  // Balance beam
  const beamLength = 100 * scale;
  const tiltRad = (axisTilt * Math.PI) / 180;
  
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(tiltRad);
  
  ctx.beginPath();
  ctx.moveTo(-beamLength, 0);
  ctx.lineTo(beamLength, 0);
  ctx.stroke();
  
  // Weight indicators
  const leftWeight = -beamLength + beamLength * weights;
  const rightWeight = beamLength - beamLength * weights;
  
  ctx.fillStyle = palette?.colors?.secondary || '#A0A0A0';
  ctx.fillRect(leftWeight - 10, -5, 20, 10 * tension);
  ctx.fillRect(rightWeight - 10, -5, 20, 10 * tension);
  
  ctx.restore();
}

registerRenderer('Balance', renderBalance);